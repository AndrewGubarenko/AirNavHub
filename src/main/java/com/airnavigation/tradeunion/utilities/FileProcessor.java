package com.airnavigation.tradeunion.utilities;

import com.airnavigation.tradeunion.domain.Gender;
import com.airnavigation.tradeunion.domain.User;
import org.apache.poi.hssf.record.crypto.Biff8EncryptionKey;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

/**
 * @author Andrii Hubarenko
 * The utility for processing of .xml and .xmlx files
 */
@Component
@SuppressWarnings("Duplicates")
public class FileProcessor {

    public List<String[]> readFileForCountChange(byte[] file, String fileExtension) throws IOException{
        String filePassword = "aero777";
        List<String[]> result = new ArrayList<>();
        ByteArrayInputStream byteArray = new ByteArrayInputStream(file);
        Biff8EncryptionKey.setCurrentUserPassword("aero777");
        if(fileExtension.equals("xlsx")) {
            Workbook workbook = WorkbookFactory.create(byteArray, filePassword);
            Sheet sheet = workbook.getSheet("Список");
            if(sheet == null) {
                throw new NullPointerException("The sheet with name 'Список' has been not found");
            }

            XSSFCell startCell = findXSSFCellIndex(sheet, "Прізвище, ім'я, по-батькові");
            int startRow = startCell.getRowIndex();
            int firstAndLastNameIndex = startCell.getColumnIndex();
            int countIndex = findXSSFCellIndex(sheet, "Залишок").getColumnIndex();

            //TODO:repair this
            if(firstAndLastNameIndex == -1) {
                throw new NullPointerException("Таблиця неправильного формату. Точка входження за іменем не знайдена.");
            } else if(countIndex == -1) {
                throw new NullPointerException("Таблиця неправильного формату. Точка входження для Залишок не знайдена.");
            }

            Iterator rowIter = sheet.rowIterator();
            while (rowIter.hasNext()) {
                XSSFRow row = (XSSFRow) rowIter.next();
                if(row.getRowNum() <= startRow) {
                    continue;
                }
                if(row.getCell(firstAndLastNameIndex) == null || row.getCell(countIndex) == null || row.getCell(firstAndLastNameIndex).getCellType() == CellType.BLANK || row.getCell(countIndex).getCellType() == CellType.BLANK) {
                    continue;
                }

                String[] firstAndLastName = row.getCell(firstAndLastNameIndex).toString().split(" ");
                String firstName = createFirstName(firstAndLastName);
                String[] container = {firstName, firstAndLastName[0], round(row.getCell(countIndex).getNumericCellValue())};
                result.add(container);
            }
        } else if (fileExtension.equals("xls")) {
            HSSFWorkbook workBook = new HSSFWorkbook(byteArray);
            HSSFSheet sheet= workBook.getSheet("Список");
            if(sheet == null) {
                throw new NullPointerException("The sheet with name 'Список' has been not found");
            }

            HSSFCell startCell = findHSSFCellIndex(sheet, "Прізвище, ім'я, по-батькові");
            int startRow = startCell.getRowIndex();
            int firstAndLastNameIndex = startCell.getColumnIndex();
            int countIndex = findHSSFCellIndex(sheet, "Залишок").getColumnIndex();

            //TODO:repair this
            if(firstAndLastNameIndex == -1) {
                throw new NullPointerException("Таблиця неправильного формату. Точка входження за іменем не знайдена.");
            } else if(countIndex == -1) {
                throw new NullPointerException("Таблиця неправильного формату. Точка входження для Залишок не знайдена.");
            }

            Iterator rowIter = sheet.rowIterator();
            while (rowIter.hasNext()) {
                HSSFRow row = (HSSFRow) rowIter.next();
                if(row.getRowNum() <= startRow) {
                    continue;
                }
                if(row.getCell(firstAndLastNameIndex) == null || row.getCell(countIndex) == null || row.getCell(firstAndLastNameIndex).getCellType() == CellType.BLANK || row.getCell(countIndex).getCellType() == CellType.BLANK) {
                    continue;
                }
                String[] firstAndLastName = row.getCell(firstAndLastNameIndex).toString().split(" ");
                String firstName = createFirstName(firstAndLastName);
                String[] container = {firstName, firstAndLastName[0], round(row.getCell(countIndex).getNumericCellValue())};
                result.add(container);
            }
        }

        byteArray.close();
        return result;
    }

    public Set<User> readFileForDBCreation(byte[] file, String fileExtension) throws IOException{
        String filePassword = "aero777";
        Set<User> result = new LinkedHashSet<>();
        ByteArrayInputStream byteArray = new ByteArrayInputStream(file);
        if(fileExtension.equals("xlsx")) {
            Workbook workbook = WorkbookFactory.create(byteArray, filePassword);
            Sheet sheet = workbook.getSheet("UserList");
            if(sheet == null) {
                throw new NullPointerException("The sheet with name 'Список' has been not found");
            }

            XSSFCell startCell = findXSSFCellIndex(sheet, "Прізвище, ім'я, по-батькові");
            int startRow = startCell.getRowIndex();
            int firstAndLastNameIndex = startCell.getColumnIndex();
            int emailIndex = findXSSFCellIndex(sheet, "eMail").getColumnIndex();
            int genderIndex = findXSSFCellIndex(sheet, "Стать").getColumnIndex();

            //TODO:repair this
            if(firstAndLastNameIndex == -1) {
                throw new NullPointerException("Таблиця неправильного формату. Точка входження за іменем не знайдена.");
            } else if(emailIndex == -1) {
                throw new NullPointerException("Таблиця неправильного формату. Точка входження для eMail не знайдена.");
            } else if(genderIndex == -1) {
                throw new NullPointerException("Таблиця неправильного формату. Точка входження для Статі не знайдена.");
            }

            Iterator rowIter = sheet.rowIterator();
            while (rowIter.hasNext()) {
                XSSFRow row = (XSSFRow) rowIter.next();
                if(row.getRowNum() <= startRow) {
                    continue;
                }
                if(row.getCell(firstAndLastNameIndex) == null || row.getCell(emailIndex) == null || row.getCell(firstAndLastNameIndex).getCellType() == CellType.BLANK || row.getCell(emailIndex).getCellType() == CellType.BLANK) {
                    continue;
                }
                Gender gender;
                if(row.getCell(genderIndex) == null) {
                    gender = Gender.MALE;
                } else {
                    gender = row.getCell(genderIndex).toString().equals("m") ? Gender.MALE : Gender.FEMALE;
                }

                String[] firstAndLastName = row.getCell(firstAndLastNameIndex).toString().split(" ");
                String firstName = createFirstName(firstAndLastName);
                result.add(User.builder()
                        .username(row.getCell(emailIndex).toString())
                        .firstName(firstName)
                        .lastName(firstAndLastName[0].trim())
                        .gender(gender)
                        .build());
            }
        } else if (fileExtension.equals("xls")) {
            Biff8EncryptionKey.setCurrentUserPassword(filePassword);
            HSSFWorkbook workBook = new HSSFWorkbook(byteArray);
            HSSFSheet sheet= workBook.getSheet("UserList");
            Iterator rowIter = sheet.rowIterator();

            HSSFCell startCell = findHSSFCellIndex(sheet, "Прізвище, ім'я, по-батькові");
            int startRow = startCell.getRowIndex();
            int firstAndLastNameIndex = startCell.getColumnIndex();
            int emailIndex = findHSSFCellIndex(sheet, "eMail").getColumnIndex();
            int genderIndex = findHSSFCellIndex(sheet, "Стать").getColumnIndex();

            //TODO:repair this
            if(firstAndLastNameIndex == -1) {
                throw new NullPointerException("Таблиця неправильного формату. Точка входження за іменем не знайдена.");
            } else if(emailIndex == -1) {
                throw new NullPointerException("Таблиця неправильного формату. Точка входження для eMail не знайдена.");
            } else if(genderIndex == -1) {
                throw new NullPointerException("Таблиця неправильного формату. Точка входження для Статі не знайдена.");
            }

            while (rowIter.hasNext()) {
                HSSFRow row = (HSSFRow) rowIter.next();
                if(row.getRowNum() <= startRow) {
                    continue;
                }
                if(row.getCell(firstAndLastNameIndex) == null || row.getCell(emailIndex) == null || row.getCell(firstAndLastNameIndex).getCellType() == CellType.BLANK || row.getCell(emailIndex).getCellType() == CellType.BLANK) {
                    continue;
                }
                Gender gender;
                if(row.getCell(genderIndex) == null) {
                    gender = Gender.MALE;
                } else {
                    gender = row.getCell(genderIndex).toString().equals("m") ? Gender.MALE : Gender.FEMALE;
                }

                String[] firstAndLastName = row.getCell(firstAndLastNameIndex).toString().split(" ");
                String firstName = createFirstName(firstAndLastName);
                result.add(User.builder()
                        .username(row.getCell(emailIndex).toString())
                        .firstName(firstName)
                        .lastName(firstAndLastName[0].trim())
                        .gender(gender)
                        .build());
            }
        }
        byteArray.close();
        return result;
    }

    private String createFirstName(String[] firstAndLastName) {
        StringBuilder firstName = new StringBuilder();
        if(firstAndLastName.length > 2 && !firstAndLastName[2].equalsIgnoreCase("з")) {
            firstName.append(firstAndLastName[1]).append(" ").append(firstAndLastName[2]);
        } else {
            firstName.append(firstAndLastName[1]);
        }
        return firstName.toString().trim();
    }

    private String round(double value) {
        BigDecimal bd = new BigDecimal(Double.toString(value));
        bd = bd.setScale(2, RoundingMode.HALF_UP);
        return Double.toString(bd.doubleValue());
    }

    private XSSFCell findXSSFCellIndex (Sheet sheet, String template) {
        Iterator rowIter = sheet.rowIterator();
        int rowCount = 0;
        while (rowIter.hasNext()) {
            XSSFRow row = (XSSFRow) rowIter.next();
            Iterator cellIter = row.cellIterator();
            int cellCount = 0;
            while(cellIter.hasNext()) {
                XSSFCell cell = (XSSFCell) cellIter.next();
                if (cell != null && cell.toString().equals(template)) {
                    return cell;
                }
                cellCount++;
                if(cellCount >= 20) break;
            }
            rowCount++;
            if(rowCount >= 20) break;
        }
        return null;
    }

    private HSSFCell findHSSFCellIndex (Sheet sheet, String template) {
        Iterator rowIter = sheet.rowIterator();
        int rowCount = 0;
        while (rowIter.hasNext()) {
            HSSFRow row = (HSSFRow) rowIter.next();
            Iterator cellIter = row.cellIterator();
            int cellCount = 0;
            while(cellIter.hasNext()) {
                HSSFCell cell = (HSSFCell) cellIter.next();
                if (cell != null && cell.toString().equals(template)) {
                    return cell;
                }
                cellCount++;
                if(cellCount >= 20) break;
            }
            rowCount++;
            if(rowCount >= 20) break;
        }
        return null;
    }

}
