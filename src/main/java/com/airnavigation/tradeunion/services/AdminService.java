
package com.airnavigation.tradeunion.services;

import com.airnavigation.tradeunion.Repositories.AdminRepository;
import com.airnavigation.tradeunion.Repositories.QuestionnaireRepository;
import com.airnavigation.tradeunion.domain.Gender;
import com.airnavigation.tradeunion.domain.PlainDomain.SearchRequest;
import com.airnavigation.tradeunion.domain.Questionnaire;
import com.airnavigation.tradeunion.domain.Role;
import com.airnavigation.tradeunion.domain.User;
import com.airnavigation.tradeunion.exceptions.EmptyDataFieldsException;
import com.airnavigation.tradeunion.exceptions.IllegalAccessAttemtException;
import com.airnavigation.tradeunion.services.interfaces.AdminServiceInterface;
import com.airnavigation.tradeunion.utilities.EmailServiceImpl;
import com.airnavigation.tradeunion.utilities.FileProcessor;
import com.airnavigation.tradeunion.utilities.Reporter;
import com.airnavigation.tradeunion.utilities.TemporaryPasswordGenerator;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.persistence.NonUniqueResultException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@PreAuthorize("hasRole('ADMINISTRATOR')")
public class AdminService implements AdminServiceInterface {

    private static final Logger LOGGER = Logger.getLogger(AdminService.class);

    private final AdminRepository adminRepository;
    private final QuestionnaireRepository questionnaireRepository;
    private final FileProcessor fileProcessor;
    private final TemporaryPasswordGenerator passwordGenerator;
    private final EmailServiceImpl emailService;
    private final PasswordEncoder passwordEncoder;
    private final Reporter reporter;


    @Autowired
    public AdminService (AdminRepository adminRepository,
                         QuestionnaireRepository questionnaireRepository,
                         FileProcessor fileProcessor,
                         TemporaryPasswordGenerator passwordGenerator,
                         EmailServiceImpl emailService,
                         BCryptPasswordEncoder passwordEncoder,
                         Reporter reporter) {
        this.adminRepository = adminRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.fileProcessor = fileProcessor;
        this.passwordGenerator = passwordGenerator;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.reporter = reporter;
    }

    @Override
    @Transactional
    public User createUser(User user) {
        String accessLevel;
        if(user.getUsername() == null
                || user.getUsername().trim().isEmpty()) {
            LOGGER.warn("METHOD CREATE: The username field is empty!");
            throw new EmptyDataFieldsException("Поле email - порожнє!");
        }

        Optional<User> userForCheckOpt = adminRepository.findByFirstNameAndLastNameIgnoreCase(user.getFirstName().trim(), user.getLastName());
        if(userForCheckOpt.isPresent()) {
            String response = "METHOD CREATE: The user with firstName: " + user.getFirstName().trim() + " and lastName: " + user.getLastName() + " already exist";
            LOGGER.warn(response);
            return userForCheckOpt.get();
        }

        String password;

        user.setUsername(user.getUsername().trim().toLowerCase());
        user.setFirstName(user.getFirstName().trim());
        user.setLastName(user.getLastName().trim());
        if (user.getCount() == null) {
            user.setCount(0.00);
        }
        if (user.getGender() == null) {
            user.setGender(Gender.MALE);
        }
        if(user.getRoles() == null || user.getRoles().isEmpty()) {
            user.setRoles(new HashSet<>(Collections.singletonList(Role.USER)));
            password = passwordGenerator.generateTemporaryPassword(15);
            user.setPassword(passwordEncoder.encode(password));
            accessLevel = Role.USER.name();
        } else if(user.getRoles().contains(Role.ADMINISTRATOR)) {
            password = passwordGenerator.generateTemporaryPassword(30);
            user.setPassword(passwordEncoder.encode(password));
            accessLevel = Role.ADMINISTRATOR.name();
        } else {
            user.getRoles().add(Role.USER);
            accessLevel = Role.USER.name();
            password = passwordGenerator.generateTemporaryPassword(15);
            user.setPassword(passwordEncoder.encode(password));
        }
        adminRepository.save(user);
        try {
            emailService.sendMimeMessage(user.getUsername(),
                    "Реєстрація користувача",
                    "andrewgubarenko@gmail.com",
                    new StringBuilder().append("<html><body>")
                            .append("<img src='cid:logo' alt='Logo' width='128' height='128'/>")
                            .append("<H2>Вітаю! Вас зареєстровано на сайті профспілки Аеронавігація.</H2>")
                            .append("<img src='cid:arrow' alt='Logo' width='200px'/>")
                            .append("<p>Ваш тимчасовий пароль для доступу до особистого кабінету: ")
                                .append(password)
                            .append("</p>")
                            .append("<p>Радимо змінити цей пароль на свій власний. </p>")
                            .append("<p>Також радимо використовувати надійні паролі, наприклад ті, що генеруються Google.</p>")
                            .append("<p>Увага! Цей лист згенеровано автоматично. Не відповідайте на нього.</p>")
                            .append("<img src='cid:arrow' alt='Logo' width='200px'/>")
                            .append("</body></html>").toString(),
                    new ArrayList<>());
        } catch (MessagingException ex) {
            LOGGER.info("Something wrong with email. Unable to send an email to " + user.getUsername() + "\n" + ex.getLocalizedMessage());
        }
        LOGGER.info("METHOD CREATE: User with username: " + user.getUsername() + " and access level:" + accessLevel + " was created");
        return user;
    }

    @Override
    public Set<User> updateDB(byte[] file, String fileExtension) throws IOException {
        Set<User> result = new LinkedHashSet<>();
        fileProcessor.readFileForDBCreation(file, fileExtension).forEach(user -> {
            if(user.getUsername() == null || user.getUsername().equals("")) {
                LOGGER.warn("METHOD CREATE: User was not created. Username is null or empty");
                return;
            } else if(adminRepository.findByUsername(user.getUsername()).isPresent()) {
                LOGGER.info("METHOD CREATE: User with username " + user.getUsername() + " already exist");
                return;
            }
            User createdUser = this.createUser(user);
            LOGGER.info("METHOD CREATE: User with username " + createdUser.getUsername() + " was successfully created");
            result.add(createdUser);
        });
        return result;
    }

    @Override
    @Transactional
    public ArrayList<String> changeCount(byte[] file, String fileExtension) throws IOException {
        ArrayList<String> report = new ArrayList<>();
        List<String[]> processingResult = fileProcessor.readFileForCountChange(file, fileExtension);
        for(String[] userDataContainer: processingResult) {
            StringBuilder response = new StringBuilder();
            Optional<User> userForUpdateOpt = adminRepository.findByFirstNameAndLastNameIgnoreCase(userDataContainer[0], userDataContainer[1]);
            if(userForUpdateOpt.isPresent()) {
                User userForUpdate = userForUpdateOpt.get();
                userForUpdate.setCount(Double.valueOf(userDataContainer[2]));
                adminRepository.save(userForUpdate);
                response.append("INFO: ")
                        .append("Рахунок для ")
                        .append(userDataContainer[0])
                        .append(" ")
                        .append(userDataContainer[1])
                        .append(" був успішно змінений;");
                report.add(response.toString());
                LOGGER.info(new StringBuilder().append("METHOD CHANGE_COUNT: Count of user with name ")
                                                .append(userDataContainer[0])
                                                .append(" ")
                                                .append(userDataContainer[1])
                                                .append(" has been successfully changed;"));
            } else {
                response.append("WARN: ")
                        .append("Користувач з іменем ")
                        .append(userDataContainer[0])
                        .append(" ")
                        .append(userDataContainer[1])
                        .append(" не був знайдений у базі. Перевірте дані у таблиці;");
                report.add(response.toString());
                LOGGER.warn(new StringBuilder().append("METHOD CHANGE_COUNT: User with name ")
                                                .append(userDataContainer[0])
                                                .append(" ")
                                                .append(userDataContainer[1])
                                                .append(" has been not found in data base. Check input data!"));
            }
        }
        return report;
    }

    @Override
    @Transactional
    public List<User> getListOfUsers() {
        return adminRepository.findAll();
    }

    @Override
    @Transactional
    public User getUser(long id) {
        Optional<User> foundUserOpt = adminRepository.findById(id);
        if(foundUserOpt.isEmpty()) {
            LOGGER.warn("METHOD GET: User with id=" + id + " has been not found!");
            throw new NoSuchElementException("Такого користувача в базі не існує!");
        }
        return foundUserOpt.get();
    }

    @Override
    @Transactional
    public List<User> findUser(SearchRequest request) {
        return adminRepository.findAllByUsernameOrFirstNameOrLastNameIgnoreCase (request.getUsername(), request.getFirstName(), request.getLastName());
    }

    @Override
    @Transactional
    public User updateUser(long id, User updatedUser) {
        if(id != updatedUser.getId()) {
            LOGGER.warn("METHOD UPDATE: Unauthorized access attemption! HTTP request was changed! The id in path variable and user id does not match!");
            throw new IllegalAccessAttemtException("Спроба незаконного доступу до даних!");
        }
        Optional<User> userForUpdateOpt = adminRepository.findById(id);

        if(updatedUser.getFirstName() == null
                || updatedUser.getLastName() == null
                || updatedUser.getFirstName().trim().isEmpty()
                || updatedUser.getLastName().trim().isEmpty()) {
            LOGGER.warn("METHOD UPDATE: The firstName or lastName field , or both are empty!");
            throw new EmptyDataFieldsException("Поля first name або last name, або обидва є порожніми!");
        }
        if(userForUpdateOpt.isEmpty()) {
            LOGGER.warn("METHOD UPDATE: User with username " + updatedUser.getUsername() + " has been not found");
            throw new NoSuchElementException("Такого користувача не знайдено!");
        }

        Optional<User> userForCheckOpt = adminRepository.findByFirstNameAndLastNameIgnoreCase(updatedUser.getFirstName().trim(), updatedUser.getLastName());
        User userForUpdate = userForUpdateOpt.get();
        if(userForCheckOpt.isPresent() && !userForUpdate.getUsername().equals(userForCheckOpt.get().getUsername())) {
            String response = "METHOD UPDATE: The user with firstName: " + updatedUser.getFirstName().trim() + " and lastName: " + updatedUser.getLastName() + " already exist";
            LOGGER.warn(response);
            throw new NonUniqueResultException();
        }


        userForUpdate.setFirstName(updatedUser.getFirstName().trim());
        userForUpdate.setLastName(updatedUser.getLastName().trim());
        userForUpdate.setGender(updatedUser.getGender());
        userForUpdate.setCount(updatedUser.getCount());

        if(!userForUpdate.getRoles().contains(Role.ADMINISTRATOR) && updatedUser.getRoles().contains(Role.ADMINISTRATOR)) {
            userForUpdate.setRoles(updatedUser.getRoles());
            userForUpdate.setPassword(passwordEncoder.encode(passwordGenerator.generateTemporaryPassword(30)));
            adminRepository.save(userForUpdate);

            try {
                emailService.sendMimeMessage(userForUpdate.getUsername(),
                        "Встановлення рівня доступу Адміністратор",
                        "andrewgubarenko@gmail.com",
                        new StringBuilder()
                                .append("<html><body>")
                                .append("<img src='cid:logo' alt='Logo' width='128' height='128'/>")
                                .append("<H2>Ваш рівень доступу на сайті профспілки Аеронавігація було підвищено до рівня Адміністратор.</H2>")
                                .append("<img src='cid:arrow' alt='Logo' width='200px'/>")
                                .append("<p>Ваш пароль на сайті профспілки Аеронавігація було перевстановлено.</p>")
                                .append("<p>Ваш новий пароль для доступу до особистого кабінету: ")
                                    .append(userForUpdate.getPassword())
                                .append("</p>")
                                .append("<p>Увага! Цей лист згенеровано автоматично. Не відповідайте на нього.</p>")
                                .append("<img src='cid:arrow' alt='Logo' width='200px'/>")
                                .append("</body></html>")
                                .toString(),
                        new ArrayList<>());
            } catch (MessagingException ex) {
                LOGGER.info("Something wrong with email. Unable to send an email to " + userForUpdate.getUsername() + "\n" + ex.getLocalizedMessage());
            }

        } else if(userForUpdate.getRoles().contains(Role.ADMINISTRATOR) && !updatedUser.getRoles().contains(Role.ADMINISTRATOR)) {
            userForUpdate.setRoles(updatedUser.getRoles());
        } else {
            userForUpdate.setRoles(updatedUser.getRoles());
            adminRepository.save(userForUpdate);

            try {
                emailService.sendMimeMessage(userForUpdate.getUsername(),
                        "Встановлення рівня доступу Адміністратор",
                        "andrewgubarenko@gmail.com",
                        new StringBuilder()
                                .append("<html><body>")
                                .append("<img src='cid:logo' alt='Logo' width='128' height='128'/>")
                                .append("<H2>Ваш рівень доступу на сайті профспілки Аеронавігація було знижено до рівня Користувач.</H2>")
                                .append("<img src='cid:arrow' alt='Logo' width='200px'/>")
                                .append("<p>Увага! Цей лист згенеровано автоматично. Не відповідайте на нього.</p>")
                                .append("<img src='cid:arrow' alt='Logo' width='200px'/>")
                                .append("</body></html>")
                                .toString(),
                        new ArrayList<>());
            } catch (MessagingException ex) {
                LOGGER.info("Something wrong with email. Unable to send an email to " + userForUpdate.getUsername() + "\n" + ex.getLocalizedMessage());
            }
        }
        LOGGER.info("METHOD UPDATE: User with username " + updatedUser.getUsername() + " was updated");
        return userForUpdate;
    }

    @Override
    @Transactional
    public String deleteUser(long id) {
        Optional<User> userForDeleteOpt = adminRepository.findById(id);
        StringBuilder response = new StringBuilder();
        if(userForDeleteOpt.isEmpty()) {
            LOGGER.warn(response.append("METHOD DELETE: User with id: ")
                                .append(id)
                                .append(" wasn't found"));
            throw new NoSuchElementException("Такого користувача не знайдено!");
        }
        User userForDelete = userForDeleteOpt.get();
        Questionnaire questionnaireForDelete = userForDelete.getQuestionnaire();
        questionnaireRepository.delete(questionnaireForDelete);
        adminRepository.delete(userForDelete);
        response.append("Користувача з email ")
                .append(userForDeleteOpt.get().getUsername())
                .append(" було успішно видалено!");

        return response.toString();
    }

    @Override
    public List<String> getLogs(int amountOfLogs) throws IOException {
        //TODO: check path on production
        Path path = Paths.get("logs/ProjectLog.log");
        List<String> response = new ArrayList<>(Files.readAllLines(path));
        if(amountOfLogs == 0) {
            return response;
        }
        if(amountOfLogs < response.size()) {
            for(int i = response.size() - amountOfLogs; i > 0; i--) {
                response.remove(0);
            }
        }
        return response;
    }

    @Override
    public byte[] getFullReport() throws IOException{
        return reporter.createFullReportFromQuestionnaires();
    }

    @Override
    public byte[] getChildrenReport() throws IOException{
        return reporter.createChildrenReportFromQuestionnaires();
    }
}
