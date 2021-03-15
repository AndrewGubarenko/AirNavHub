package com.airnavigation.tradeunion.services;

import com.airnavigation.tradeunion.Repositories.QuestionnaireRepository;
import com.airnavigation.tradeunion.Repositories.UserRepository;
import com.airnavigation.tradeunion.domain.PlainDomain.ChangePassword;
import com.airnavigation.tradeunion.domain.PlainDomain.Feedback;
import com.airnavigation.tradeunion.domain.Questionnaire;
import com.airnavigation.tradeunion.domain.User;
import com.airnavigation.tradeunion.exceptions.EmptyDataFieldsException;
import com.airnavigation.tradeunion.security.Cryptographer;
import com.airnavigation.tradeunion.services.interfaces.UserServiceInterface;
import com.airnavigation.tradeunion.utilities.EmailServiceImpl;
import com.airnavigation.tradeunion.utilities.TemporaryPasswordGenerator;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.util.*;

@Service
public class UserService implements UserServiceInterface {

    private static final Logger LOGGER = Logger.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final QuestionnaireRepository questionnaireRepository;
    private final TemporaryPasswordGenerator passwordGenerator;
    private final EmailServiceImpl emailService;
    private final PasswordEncoder passwordEncoder;
    private final Cryptographer cryptographer;

    @Autowired
    public UserService (UserRepository userRepository,
                        QuestionnaireRepository questionnaireRepository,
                        TemporaryPasswordGenerator passwordGenerator,
                        EmailServiceImpl emailService,
                        BCryptPasswordEncoder passwordEncoder,
                        Cryptographer cryptographer) {
        this.userRepository = userRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.passwordGenerator = passwordGenerator;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.cryptographer = cryptographer;
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('USER') and #id == authentication.principal.getId() and #changePassword.currentPassword == authentication.credentials")
    public String changePassword(ChangePassword changePassword, long id) {
        String response;
        Optional<User> userForUpdateOpt = userRepository.findById(id);

        if(!userForUpdateOpt.isPresent()) {
            response = "Користувача не було знайдено";
            LOGGER.warn(response);
            throw new NoSuchElementException(response);
        } else if (changePassword.getNewPassword() == null || changePassword.getNewPassword().trim().isEmpty()) {
            LOGGER.warn("METHOD CHANGE_PASSWORD: New password field is empty");
            throw new EmptyDataFieldsException("ОТ ХАЛЕПА! Поле Новий пароль порожнє");
        } else if(changePassword.getCurrentPassword() == null || changePassword.getCurrentPassword().trim().isEmpty()) {
            LOGGER.warn("METHOD CHANGE_PASSWORD: Current password field is empty");
            throw new EmptyDataFieldsException("ОТ ХАЛЕПА! Поле Поточний пароль порожнє");
        } else if(passwordEncoder.encode(changePassword.getCurrentPassword()).equals(userForUpdateOpt.get().getPassword())) {
            LOGGER.warn("METHOD CHANGE_PASSWORD: Wrong current password");
            throw new EmptyDataFieldsException("Неправильний поточний пароль");
        } else {
            User userForUpdate = userForUpdateOpt.get();
            userForUpdate.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
            userRepository.save(userForUpdate);
            response = "УСПІШНО! Пароль було успішно змінено!";
            try {
                emailService.sendMimeMessage(userForUpdate.getUsername(),
                        "Зміна паролю",
                        "andrewgubarenko@gmail.com",
                        new StringBuilder()
                                .append("<html><body>")
                                .append("<img src='cid:logo' alt='Logo' width='128' height='128'/>")
                                .append("<H2>Вітаю! Ваш пароль на сайті профспілки Аеронавігація було змінено.</H2>")
                                .append("<img src='cid:arrow' alt='Logo' width='200px'/>")
                                .append("<p>З метою забезпечення безпеки Ваш новий пароль для доступу до особистого кабінету не надсилатиметься з електронною поштою.</p>")
                                .append("<p>Якщо ви не виконували цієї дії, негайно зверніться до адміністратора.</p>")
                                .append("<p>вага! Цей лист згенеровано автоматично. Не відповідайте на нього.</p>")
                                .append("<img src='cid:arrow' alt='Logo' width='200px'/>")
                                .append("</body></html>").toString(),
                        new ArrayList<>());
            } catch (MessagingException ex) {
                LOGGER.info("Something wrong with email. Unable to send an email to " + userForUpdate.getUsername() + "\n" + ex.getLocalizedMessage());
            }
            return response;
        }
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('USER') and #id == authentication.principal.getId()")
    @PostAuthorize("returnObject.username == authentication.principal.username")
    public User getUser(long id) {
        Optional<User> foundUserOpt = userRepository.findById(id);
        if(!foundUserOpt.isPresent()) {
            LOGGER.warn("METHOD GET_USER: User with id=" + id + " has been not found!");
            throw new NoSuchElementException("Користувача не було знайдено!");
        }
        return foundUserOpt.get();
    }

    @Override
    @Transactional
    public String resetPassword(String email) {
        Optional<User> foundUserOpt = userRepository.findByUsername(email);
        StringBuilder response = new StringBuilder();
        if(foundUserOpt.isPresent()) {
            User user = foundUserOpt.get();
            String password = passwordGenerator.generateTemporaryPassword(15);
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            try {
                emailService.sendMimeMessage(user.getUsername(),
                        "Відновлення паролю",
                        "andrewgubarenko@gmail.com",
                        new StringBuilder()
                                .append("<html><body>")
                                .append("<img src='cid:logo' alt='Logo' width='128' height='128'/>")
                                .append("<H2>Вітаю! Ваш пароль на сайті профспілки Аеронавігація було перевстановлено.</H2>")
                                .append("<img src='cid:arrow' alt='Logo' width='200px'/>")
                                .append("<p>Ваш новий тимчасовий пароль для доступу до особистого кабінету: </p>")
                                    .append(password)
                                .append("</p>")
                                .append("<p>Якщо ви не виконували цієї дії, негайно зверніться до адміністратора. </p>")
                                .append("<p>Радимо змінити цей пароль на свій власний. </p>")
                                .append("<p>Також радимо використовувати надійні паролі, наприклад ті, що генеруються Google.</p>")
                                .append("<p>Увага! Цей лист згенеровано автоматично. Не відповідайте на нього.</p>")
                                .append("<img src='cid:arrow' alt='Logo' width='200px'/>")
                                .append("</body></html>")
                                .toString(),
                        new ArrayList<>());
            } catch (MessagingException ex) {
                LOGGER.info("Something wrong with email. Unable to send an email to " + user.getUsername() + "\n" + ex.getLocalizedMessage());
            }
            response.append("УСПІШНО: На ваш email ")
                    .append(email)
                    .append(" було відправлено листа. Перевірте пошту.");
            LOGGER.info(response);
        } else {
            response.append("Користувача з email ")
                    .append(email)
                    .append(" не було знайдено!");
            LOGGER.warn(response);
            throw new NoSuchElementException(response.toString());
        }

        return response.toString();
    }


    @Override
    @PreAuthorize("hasRole('USER')")
    public String receiveEmailFromUser(Feedback feedback) {
        String response;
        try {
            emailService.sendMimeMessage("aeronavua@gmail.com",
                    feedback.getTheme(),
                    feedback.getFrom(),
                    feedback.getBody(),
                    feedback.getFiles()
            );
            response = "Листа було успішно надіслано";
        } catch (MessagingException ex) {
            response = "Халепа! Щось пішло не так. Не вдалося надіслати листа";
            LOGGER.info("Something wrong with email. Unable to send an email to administrator.\n" + ex.getLocalizedMessage());
        }
        return response;
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('USER') and #id == authentication.principal.getId()")
    public Questionnaire saveQuestionnaire(long id, Questionnaire questionnaire) {
        StringBuilder response = new StringBuilder();
        Optional<User> userOpt = userRepository.findById(id);
        if(userOpt.isPresent()) {
            User user = userOpt.get();
            Questionnaire userQuestionnaire;
            Optional<Questionnaire> questionnaireOpt = questionnaireRepository.findByUser(user);

            if(questionnaireOpt.isPresent()) {
                userQuestionnaire = questionnaireOpt.get();
            } else {
                userQuestionnaire = new Questionnaire();
                userQuestionnaire.addUser(user);
            }

            userQuestionnaire.setNameUkrainian(questionnaire.getNameUkrainian());
            userQuestionnaire.setNameEnglish(questionnaire.getNameEnglish());
            userQuestionnaire.setFacility(questionnaire.getFacility());
            userQuestionnaire.setPosition(questionnaire.getPosition());
            userQuestionnaire.setShift(questionnaire.getShift());
            userQuestionnaire.setPassportNumber(questionnaire.getPassportNumber());
            userQuestionnaire.setPassportIssue(questionnaire.getPassportIssue());
            userQuestionnaire.setPassportDateIssue(questionnaire.getPassportDateIssue());
            userQuestionnaire.setDoesHaveInternationalPassport(questionnaire.getDoesHaveInternationalPassport());
            userQuestionnaire.setTermInternationalPassport(questionnaire.getTermInternationalPassport());
            userQuestionnaire.setIdentNumber(questionnaire.getIdentNumber());
            userQuestionnaire.setEducation(questionnaire.getEducation());
            userQuestionnaire.setEducationTerm(questionnaire.getEducationTerm());
            userQuestionnaire.setEmail(user.getUsername());
            userQuestionnaire.setHomePhone(questionnaire.getHomePhone());
            userQuestionnaire.setMobilePhone(questionnaire.getMobilePhone());
            userQuestionnaire.setPlaceOfBirth(questionnaire.getPlaceOfBirth());
            userQuestionnaire.setBirthDate(questionnaire.getBirthDate());
            userQuestionnaire.setPassportAddress(questionnaire.getPassportAddress());
            userQuestionnaire.setActualAddress(questionnaire.getActualAddress());
            userQuestionnaire.setEmploymentDate(questionnaire.getEmploymentDate());
            userQuestionnaire.setSeniority(questionnaire.getSeniority());
            userQuestionnaire.setIsMarried(questionnaire.getIsMarried());
            userQuestionnaire.setFamilyComposition(questionnaire.getFamilyComposition());
            userQuestionnaire.setAdditionalInformation(questionnaire.getAdditionalInformation());

            if(userQuestionnaire.getChildren() != null) {
                Map<String, String> decryptedChildren = new LinkedHashMap<>();
                Map<String, String> decryptedIncomeChildren = new LinkedHashMap<>();
                userQuestionnaire.getChildren().forEach((name, date) -> decryptedChildren.put(cryptographer.decode(name), cryptographer.decode(date)));
                questionnaire.getChildren().forEach((name, date) -> decryptedIncomeChildren.put(cryptographer.decode(name), cryptographer.decode(date)));
                decryptedChildren.clear();
                decryptedIncomeChildren.forEach(decryptedChildren::putIfAbsent);

                userQuestionnaire.getChildren().clear();

                decryptedChildren.forEach((name, date) -> userQuestionnaire.getChildren().put(cryptographer.encode(name), cryptographer.encode(date)));
            } else {
                userQuestionnaire.setChildren(questionnaire.getChildren());
            }

            questionnaireRepository.save(userQuestionnaire);

            return userQuestionnaire;
        } else {
            response.append("Користувача з id=")
                    .append(id)
                    .append(" не було знайдено!");
            LOGGER.warn(response);
            throw new NoSuchElementException(response.toString());
        }
    }

    @Override
    @Transactional
    @PreAuthorize("hasRole('USER') and #id == authentication.principal.getId()")
    public Questionnaire getQuestionnaire(long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if(userOpt.isPresent()) {
            User user = userOpt.get();
            if(user.getQuestionnaire() == null) {
                return new Questionnaire();
            } else {
                return user.getQuestionnaire();
            }
        } else {
            return new Questionnaire();
        }
    }
}
