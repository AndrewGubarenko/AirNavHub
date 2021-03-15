package com.airnavigation.tradeunion.utilities;

import com.airnavigation.tradeunion.Repositories.QuestionnaireRepository;
import com.airnavigation.tradeunion.domain.Gender;
import com.airnavigation.tradeunion.domain.Questionnaire;
import com.airnavigation.tradeunion.security.Cryptographer;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Iterator;
import java.util.Map;

/**
 * @author Andrii Hubarenko
 * The utility for processing of .xml and .xmlx files
 */
@Component
@SuppressWarnings("Duplicates")
public class Reporter {

    private final QuestionnaireRepository questionnaireRepository;
    private final Cryptographer cryptographer;

    @Autowired
    public Reporter (QuestionnaireRepository questionnaireRepository,
                     Cryptographer cryptographer) {
        this.questionnaireRepository = questionnaireRepository;
        this.cryptographer = cryptographer;
    }

    @Transactional
    public byte[] createFullReportFromQuestionnaires() throws IOException {

        Workbook book = new XSSFWorkbook();
        Sheet sheet = book.createSheet("Анкета");

        DataFormat format = book.createDataFormat();
        CellStyle dateStyle = book.createCellStyle();
        CellStyle tableStyle = book.createCellStyle();
        dateStyle.setDataFormat(format.getFormat("dd.mm.yyyy"));

        tableStyle.setBorderRight(BorderStyle.THIN);
        tableStyle.setBorderBottom(BorderStyle.THIN);
        tableStyle.setBorderLeft(BorderStyle.THIN);
        tableStyle.setBorderTop(BorderStyle.THIN);

        Row titleRow = sheet.createRow(0);

        Cell number = titleRow.createCell(0);
        number.setCellValue("№п/п");

        Cell ukrainianNameTitle = titleRow.createCell(1);
        ukrainianNameTitle.setCellValue("Прізвище, ім'я, по-батькові");

        Cell englishNameTitle = titleRow.createCell(2);
        englishNameTitle.setCellValue("Name, Surname");

        Cell placePositionShiftTitle = titleRow.createCell(3);
        placePositionShiftTitle.setCellValue("Об'єкт, посада, зміна");

        Cell passportNumberTitle = titleRow.createCell(4);
        passportNumberTitle.setCellValue("Паспортні дані");

        Cell passportIssueTitle = titleRow.createCell(5);
        passportIssueTitle.setCellValue("Ким виданий");

        Cell passportDateIssueTitle = titleRow.createCell(6);
        passportDateIssueTitle.setCellValue("Дата видачі");

        Cell doesHaveInternationalPassportTitle = titleRow.createCell(7);
        doesHaveInternationalPassportTitle.setCellValue("Наявність закордонного паспорту");
        Cell termInternationalPassportTitle = titleRow.createCell(8);
        termInternationalPassportTitle.setCellValue("Термін дії ЗП");

        Cell identNumberTitle = titleRow.createCell(9);
        identNumberTitle.setCellValue("Ідентифікаційний номер");

        Cell educationTitle = titleRow.createCell(10);
        educationTitle.setCellValue("Освіта");

        Cell educationTermTitle = titleRow.createCell(11);
        educationTermTitle.setCellValue("Дата закінчення ВНЗ");

        Cell emailTitle = titleRow.createCell(12);
        emailTitle.setCellValue("eMail");

        Cell homePhoneTitle = titleRow.createCell(13);
        homePhoneTitle.setCellValue("Домашній телефон");

        Cell mobilePhoneTitle = titleRow.createCell(14);
        mobilePhoneTitle.setCellValue("Мобільний телефон");

        Cell placeOfBirth = titleRow.createCell(15);
        placeOfBirth.setCellValue("Місце народження");

        Cell birthDateTitle = titleRow.createCell(16);
        birthDateTitle.setCellValue("Дата народження");

        Cell passportAddressTitle = titleRow.createCell(17);
        passportAddressTitle.setCellValue("Адреса проживання за пропискою");

        Cell actualAddressTitle = titleRow.createCell(18);
        actualAddressTitle.setCellValue("Фактична адреса проживання");

        Cell employmentDateTitle = titleRow.createCell(19);
        employmentDateTitle.setCellValue("Дата працевлаштування в РСП");

        Cell seniorityTitle = titleRow.createCell(20);
        seniorityTitle.setCellValue("Загальний трудовий стаж");

        Cell isMarriedTitle = titleRow.createCell(21);
        isMarriedTitle.setCellValue("Сімейний стан");

        Cell familyCompositionTitle = titleRow.createCell(22);
        familyCompositionTitle.setCellValue("Склад сім'ї");

        Cell childrenTitle = titleRow.createCell(23);
        childrenTitle.setCellValue("Діти");

        Cell additionalInformationTitle = titleRow.createCell(24);
        additionalInformationTitle.setCellValue("Додаткова інформація");

        Iterator<Cell> cellIterator = titleRow.cellIterator();
        while (cellIterator.hasNext()) {
            Cell cell = cellIterator.next();
            cell.setCellStyle(tableStyle);
            int columnIndex = cell.getColumnIndex();
            sheet.autoSizeColumn(columnIndex);
        }

        int rowNumber = 1;
        Iterable<Questionnaire> iterOfQuest = questionnaireRepository.findAll();
        for (Questionnaire questionnaire : iterOfQuest) {
            Row row = sheet.createRow(rowNumber);

            Cell memberNumber = row.createCell(0);
            memberNumber.setCellValue(rowNumber);

            Cell ukrainianName = row.createCell(1);
            ukrainianName.setCellValue(cryptographer.decode(questionnaire.getNameUkrainian()));

            Cell englishName = row.createCell(2);
            englishName.setCellValue(cryptographer.decode(questionnaire.getNameEnglish()));

            Cell placePositionShift = row.createCell(3);
            placePositionShift.setCellValue(cryptographer.decode(questionnaire.getFacility())
                    + ", " + cryptographer.decode(questionnaire.getPosition())
                    + ", " + cryptographer.decode(questionnaire.getShift()));

            Cell passportNumber = row.createCell(4);
            passportNumber.setCellValue(cryptographer.decode(questionnaire.getPassportNumber()));

            Cell passportIssue = row.createCell(5);
            passportIssue.setCellValue(cryptographer.decode(questionnaire.getPassportIssue()));

            Cell passportDateIssue = row.createCell(6);
            passportDateIssue.setCellStyle(dateStyle);
            passportDateIssue.setCellValue(cryptographer.decode(questionnaire.getPassportDateIssue()));

            Cell doesHaveInternationalPassport = row.createCell(7);
            Cell termInternationalPassport = row.createCell(8);
            if (cryptographer.decode(questionnaire.getDoesHaveInternationalPassport()).equals("true")) {
                doesHaveInternationalPassport.setCellValue("Маю");
                termInternationalPassport.setCellStyle(dateStyle);
                termInternationalPassport.setCellValue(cryptographer.decode(questionnaire.getTermInternationalPassport()));
            } else {
                doesHaveInternationalPassport.setCellValue("Не маю");
                termInternationalPassport.setCellValue("");
            }

            Cell identNumber = row.createCell(9);
            identNumber.setCellValue(cryptographer.decode(questionnaire.getIdentNumber()));

            Cell education = row.createCell(10);
            education.setCellValue(cryptographer.decode(questionnaire.getEducation()));

            Cell educationTerm = row.createCell(11);
            educationTerm.setCellStyle(dateStyle);
            educationTerm.setCellValue(cryptographer.decode(questionnaire.getEducationTerm()));

            Cell email = row.createCell(12);
            email.setCellValue(questionnaire.getUser().getUsername());

            Cell homePhone = row.createCell(13);
            homePhone.setCellValue(cryptographer.decode(questionnaire.getHomePhone()));

            Cell mobilePhone = row.createCell(14);
            mobilePhone.setCellValue(cryptographer.decode(questionnaire.getMobilePhone()));

            Cell userPlaceOfBirth = row.createCell(15);
            userPlaceOfBirth.setCellValue(cryptographer.decode(questionnaire.getPlaceOfBirth()));

            Cell birthDate = row.createCell(16);
            birthDate.setCellStyle(dateStyle);
            birthDate.setCellValue(cryptographer.decode(questionnaire.getBirthDate()));

            Cell passportAddress = row.createCell(17);
            passportAddress.setCellValue(cryptographer.decode(questionnaire.getPassportAddress()));

            Cell actualAddress = row.createCell(18);
            actualAddress.setCellValue(cryptographer.decode(questionnaire.getActualAddress()));

            Cell employmentDate = row.createCell(19);
            employmentDate.setCellStyle(dateStyle);
            employmentDate.setCellValue(cryptographer.decode(questionnaire.getEmploymentDate()));

            Cell seniority = row.createCell(20);
            seniority.setCellValue(cryptographer.decode(questionnaire.getSeniority()));

            Cell isMarried = row.createCell(21);
            if (cryptographer.decode(questionnaire.getIsMarried()).equals("true")) {
                isMarried.setCellValue(questionnaire.getUser().getGender().equals(Gender.MALE) ? "Одружений" : "Заміжня");
            } else {
                isMarried.setCellValue(questionnaire.getUser().getGender().equals(Gender.MALE) ? "Неодружений" : "Незаміжня");
            }

            Cell familyComposition = row.createCell(22);
            familyComposition.setCellValue(cryptographer.decode(questionnaire.getFamilyComposition()));

            Cell children = row.createCell(23);
            StringBuilder childrenCell = new StringBuilder();
            questionnaire.getChildren().forEach((childName, childDate) -> childrenCell.append(cryptographer.decode(childName))
                    .append(": ")
                    .append(cryptographer.decode(childDate))
                    .append("; "));
            children.setCellValue(childrenCell.toString());

            Cell additionalInformation = row.createCell(24);
            additionalInformation.setCellValue(cryptographer.decode(questionnaire.getAdditionalInformation()));

            Iterator<Cell> dataCellIterator = row.cellIterator();
            while (dataCellIterator.hasNext()) {
                Cell cell = dataCellIterator.next();
                cell.setCellStyle(tableStyle);
                sheet.autoSizeColumn(cell.getColumnIndex());
            }

            rowNumber++;
        }

        sheet.autoSizeColumn(1);

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        book.write(stream);
        byte[] encoded = Base64.getEncoder().encode(stream.toByteArray());
        book.close();

        return encoded;
    }

    @Transactional
    public byte[] createChildrenReportFromQuestionnaires() throws IOException {
        Workbook book = new XSSFWorkbook();
        Sheet sheet = book.createSheet("Список");

        DataFormat format = book.createDataFormat();

        CellStyle tableStyle = book.createCellStyle();
        tableStyle.setBorderRight(BorderStyle.THIN);
        tableStyle.setBorderBottom(BorderStyle.THIN);
        tableStyle.setBorderLeft(BorderStyle.THIN);
        tableStyle.setBorderTop(BorderStyle.THIN);

        CellStyle titleRowCellStyle = book.createCellStyle();
        titleRowCellStyle.setAlignment(HorizontalAlignment.CENTER);

        Row approveRow = sheet.createRow(0);
        Cell approveRowCell = approveRow.createCell(3);
        approveRowCell.setCellValue("ЗАТВЕРДЖУЮ");
        Row headRow = sheet.createRow(1);
        Cell headRowCell = headRow.createCell(3);
        headRowCell.setCellValue("голова ради профспілки \"Аеронавігація\"");
        Row signatureRow = sheet.createRow(2);
        Cell signatureRowCell = signatureRow.createCell(3);
        signatureRowCell.setCellValue("________________________");
        Row nameRow = sheet.createRow(3);
        Cell nameRowCell = nameRow.createCell(3);
        nameRowCell.setCellValue("Аксьонов Д.М.");
        Row titleRow = sheet.createRow(5);
        Cell titleRowCell = titleRow.createCell(1);
        titleRowCell.setCellValue(new StringBuilder().append("Список дітей членів Профспілки \"Аеронавігація\" в ")
                                                    .append(LocalDate.now().minus(1, ChronoUnit.YEARS).getYear())
                                                    .append("-")
                                                    .append(LocalDate.now().getYear())
                                                    .append("р.")
                                                    .toString());
        titleRowCell.setCellStyle(titleRowCellStyle);

        Row tableHeadRow = sheet.createRow(6);
        Cell tableHeadRowCellNum = tableHeadRow.createCell(0);
        tableHeadRowCellNum.setCellValue("№п/п");
        Cell tableHeadRowCellName = tableHeadRow.createCell(1);
        tableHeadRowCellName.setCellValue("Прізвище, ім`я, по-батькові");
        Cell tableHeadRowCellChildName = tableHeadRow.createCell(2);
        tableHeadRowCellChildName.setCellValue("Ім`я дитини");
        Cell tableHeadRowCellSignature = tableHeadRow.createCell(3);
        tableHeadRowCellSignature.setCellValue("Підпис");

        CellStyle titleRowStyle = book.createCellStyle();
        titleRowStyle.cloneStyleFrom(tableStyle);
        Font font = book.createFont();
        font.setBold(true);
        titleRowStyle.setFont(font);

        Iterator<Cell> dataCellIterator = tableHeadRow.cellIterator();
        while (dataCellIterator.hasNext()) {
            Cell cell = dataCellIterator.next();
            cell.setCellStyle(titleRowStyle);
            sheet.autoSizeColumn(cell.getColumnIndex());
        }

        int rowNumber = 7;
        int count = 1;
        Iterable<Questionnaire> iterOfQuest = questionnaireRepository.findAll();
        for (Questionnaire questionnaire : iterOfQuest) {
            if (questionnaire.getChildren() == null) {
                continue;
            }
            Row row = sheet.createRow(rowNumber);
            Cell num = row.createCell(0);
            num.setCellValue(count++);
            num.setCellStyle(tableStyle);
            sheet.autoSizeColumn(num.getColumnIndex());


            String name;
            if (questionnaire.getNameUkrainian() == null || questionnaire.getNameUkrainian().equals("")) {
                name = questionnaire.getUser().getLastName() + " " + questionnaire.getUser().getFirstName();
            } else {
                name = cryptographer.decode(questionnaire.getNameUkrainian());
            }
            Cell parentName = row.createCell(1);
            parentName.setCellValue(name);
            parentName.setCellStyle(tableStyle);
            sheet.autoSizeColumn(parentName.getColumnIndex());

            Iterator<Map.Entry<String, String>> entries = questionnaire.getChildren().entrySet().iterator();
            while (entries.hasNext()) {
                Map.Entry<String, String> entry = entries.next();

                Cell childName = row.createCell(2);
                CellStyle tableDataStyle = book.createCellStyle();
                tableDataStyle.cloneStyleFrom(tableStyle);
                tableDataStyle.setDataFormat(format.getFormat("dd.mm.yyyy"));
                childName.setCellStyle(tableDataStyle);
                sheet.autoSizeColumn(childName.getColumnIndex());
                childName.setCellValue(new StringBuilder().append(cryptographer.decode(entry.getKey()))
                        .append(": ")
                        .append(cryptographer.decode(entry.getValue()))
                        .append("; ")
                        .toString());
                Cell signature = row.createCell(3);
                signature.setCellValue("");
                signature.setCellStyle(tableStyle);

                if (entries.hasNext()) {
                    rowNumber++;
                    row = sheet.createRow(rowNumber);
                    Cell nullNumber = row.createCell(0);
                    nullNumber.setCellValue("");
                    nullNumber.setCellStyle(tableStyle);
                    Cell nullName = row.createCell(1);
                    nullName.setCellValue("");
                    nullName.setCellStyle(tableStyle);
                }
            }

            Cell signature = row.createCell(3);
            signature.setCellValue("");
            signature.setCellStyle(tableStyle);

            rowNumber++;
        }

        sheet.autoSizeColumn(1);
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        book.write(stream);
        byte[] encoded = Base64.getEncoder().encode(stream.toByteArray());
        book.close();

        return encoded;
    }
}
