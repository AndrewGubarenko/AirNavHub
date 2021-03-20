package com.airnavigation.tradeunion.services;

import com.airnavigation.tradeunion.Repositories.CategoryRepository;
import com.airnavigation.tradeunion.Repositories.FilesRepository;
import com.airnavigation.tradeunion.domain.Category;
import com.airnavigation.tradeunion.domain.File;
import com.airnavigation.tradeunion.exceptions.EmptyDataFieldsException;
import com.airnavigation.tradeunion.exceptions.IllegalAccessAttemtException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@PreAuthorize("isAuthenticated()")
public class FileService {

    private static final Logger LOGGER = Logger.getLogger(FileService.class);

    private final FilesRepository filesRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public FileService(FilesRepository filesRepository,
                       CategoryRepository categoryRepository) {
        this.filesRepository = filesRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public File addFile(File file) {
        file.setSubCategory(file.getSubCategory().trim().toLowerCase());
        Category category = this.createCategoryOrReturnActual(file.getCategory().getName(), file.getSubCategory());
        file.setCategory(category);
        return filesRepository.save(file);
    }

    @Transactional
    public File getSingleFile(UUID id) {
        Optional<File> foundFileOpt = filesRepository.findById(id);
        if (foundFileOpt.isPresent()) {
            return foundFileOpt.get();
        } else {
            throw new NoSuchElementException("Файл з ID=" + id + " не знайдено");
        }
    }

    @Transactional
    public List<File> getFiles() {
        return filesRepository.findAll();
    }

    @Transactional
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public File changeFile(File updatedFile, UUID id) {
        Optional<File> fileForUpdateOpt = filesRepository.findById(id);
        if (fileForUpdateOpt.isPresent()) {
            File fileForUpdate = fileForUpdateOpt.get();
            if(fileForUpdate.getId() != id) {
                LOGGER.warn("METHOD CHANGE_FILE: Unauthorized access attemption! HTTP request was changed! The id in path variable and file id does not match!");
                throw new IllegalAccessAttemtException("Спроба несанкціонованого доступу до даних!");
            }
            fileForUpdate.setName(updatedFile.getName());
            fileForUpdate.setPath(updatedFile.getPath());
            fileForUpdate.setSubCategory(updatedFile.getSubCategory().trim().toLowerCase());
            fileForUpdate.setCategory(this.createCategoryOrReturnActual(updatedFile.getCategory().getName(), updatedFile.getSubCategory()));
            filesRepository.save(fileForUpdate);
            return updatedFile;
        } else {
            LOGGER.warn("METHOD CHANGE_FILE: File with id=" + id + " has been not found");
            throw new NoSuchElementException("Файл з ID=" + id + " не знайдений");
        }
    }

    @Transactional
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public String deleteFile(UUID id) {
        Optional<File> fileForRemoveOpt = filesRepository.findById(id);
        if(fileForRemoveOpt.isPresent()) {
            File fileForRemove = fileForRemoveOpt.get();
            fileForRemove.removeCategory();
            filesRepository.delete(fileForRemove);
            return "Файл успішно видалений";
        }
        return "Щось пішло не так!";
    }

    @Transactional
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    Category createCategoryOrReturnActual(String categoryName, String subCategory) {
        Optional<Category> categoryOpt = categoryRepository.findByName(categoryName.trim().toUpperCase());
        if(categoryOpt.isPresent()) {
            Category result = categoryOpt.get();
            if(result.getSubCategories().contains(subCategory.trim().toLowerCase())) {
                return result;
            } else {
                result.getSubCategories().add(subCategory.trim().toLowerCase());
                return categoryRepository.save(result);
            }

        } else {
            Category category = new Category();
            category.setName(categoryName.trim().toUpperCase());
            category.getSubCategories().add(subCategory.trim().toLowerCase());
            LOGGER.info("Category " + categoryName + " has been created");
            return categoryRepository.save(category);
        }
    }

    @Transactional
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public List<Category> getCategoryList() {
        return categoryRepository.findAll();
    }

    @Transactional
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public Category updateCategoryName(String newCatName, UUID id) {
        if(newCatName == null
                || newCatName.substring(1, newCatName.length() - 1).trim().isEmpty()) {
            LOGGER.warn("METHOD UPDATE_CATEGORY: The category name field is empty!");
            throw new EmptyDataFieldsException("The category name field is empty!");
        }
        StringBuilder loggerResponse = new StringBuilder();
        Optional<Category> resultOpt = categoryRepository.findById(id);
        if(resultOpt.isPresent()) {
            Category category = resultOpt.get();
            category.setName(newCatName.trim().toUpperCase().substring(1, newCatName.length() - 1));
            categoryRepository.save(category);
            loggerResponse.append("The name of category with id: ")
                    .append(id)
                    .append(" has been changed to ")
                    .append(newCatName)
                    .append(".");
            LOGGER.info(loggerResponse);
            return category;
        } else {
            loggerResponse.append("Category with id")
                    .append(id)
                    .append(" has been not found.");
            LOGGER.warn(loggerResponse);
            throw new NoSuchElementException(loggerResponse.toString());
        }
    }

    @Transactional
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public String removeSubCategory(String categoryName, String subCategoryName) {
        StringBuilder response = new StringBuilder();
        Optional<Category> resultOpt = categoryRepository.findByName(categoryName.trim().toUpperCase());
        Category category;
        if(resultOpt.isPresent()) {
            category = resultOpt.get();
            Set<File> fileList = category.getFiles();
            if (fileList.isEmpty()) {
                category.getSubCategories().remove(subCategoryName.trim().toLowerCase());
                categoryRepository.save(category);
                response.append("Sub_category ")
                        .append(subCategoryName.trim().toLowerCase())
                        .append(" was removed");
                return response.toString();
            } else {
                int isReadyForRemove = 0;
                response.append("Files with subCategory ")
                        .append(subCategoryName.trim().toLowerCase())
                        .append(": ");
                for (File file : fileList) {
                    if (file.getSubCategory().equals(subCategoryName.trim().toLowerCase())) {
                        isReadyForRemove++;
                        response.append(file.getName())
                                .append(", ");
                    }
                }
                response.append(" remove them or change it's subCategory before removing subCategory.");
                if(isReadyForRemove != 0) {
                    LOGGER.warn(response);
                    throw new IllegalAccessAttemtException(response.toString());
                } else {
                    return new StringBuilder().append("SubCategory ").append(subCategoryName.trim().toLowerCase()).append(" was removed.").toString();
                }
            }
        } else {
            response.append("Category ")
                    .append(categoryName)
                    .append(" was not found.");
            LOGGER.warn(response);
            throw new NoSuchElementException(response.toString());
        }
    }

    @Transactional
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public String deleteCategory(String categoryName) {
        Optional<Category> resultOpt = categoryRepository.findByName(categoryName.trim().toUpperCase().substring(1, categoryName.length() - 1));
        Category result;
        if(resultOpt.isPresent()) {
            result = resultOpt.get();
        } else {
            LOGGER.warn("Category " + categoryName + " was not found.");
            throw new NoSuchElementException("Category " + categoryName + " was not found.");
        }
        result.getFiles().forEach(file -> this.deleteFile(file.getId()));
        categoryRepository.delete(result);
        return "Category " + categoryName + " was successfully removed with all connected files.";
    }
}
