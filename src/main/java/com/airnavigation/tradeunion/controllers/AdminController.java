package com.airnavigation.tradeunion.controllers;

import com.airnavigation.tradeunion.domain.Category;
import com.airnavigation.tradeunion.domain.File;
import com.airnavigation.tradeunion.domain.News;
import com.airnavigation.tradeunion.domain.PlainDomain.SearchRequest;
import com.airnavigation.tradeunion.domain.User;
import com.airnavigation.tradeunion.services.FileService;
import com.airnavigation.tradeunion.services.NewsService;
import com.airnavigation.tradeunion.services.interfaces.AdminServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author Andrii Hubarenko
 * Controller for administrator
 */
@RestController
@RequestMapping("/administrator")
public class AdminController {

    private final AdminServiceInterface adminService;
    private final FileService fileService;
    private final NewsService newsService;
    //private final Cryptographer cryptographer;

    @Autowired
    public AdminController(AdminServiceInterface adminService,
                           FileService fileService,
                           NewsService newsService/*,
                           Cryptographer cryptographer*/) {
        this.adminService = adminService;
        this.fileService = fileService;
        this.newsService = newsService;
        //this.cryptographer = cryptographer;
    }

    /**
     * Data base section
     */

    @PutMapping(path = "/data_base", consumes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    public ResponseEntity<Set<User>> updateDatabaseXLSX (@RequestBody byte[] file) throws IOException {
        Set<User> response = adminService.updateDB(file, "xlsx");
        response.forEach(user -> {
            /*String encodedUsername = cryptographer.encode(user.getUsername());
            user.setUsername(encodedUsername);*/
            user.setPassword("");
            user.setQuestionnaire(null);
        });
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/data_base", consumes = "application/vnd.ms-excel")
    public ResponseEntity<Set<User>> updateDatabaseXLS (@RequestBody byte[] file) throws IOException {
        Set<User> response = adminService.updateDB(file, "xls");
        response.forEach(user -> {
            /*String encodedUsername = cryptographer.encode(user.getUsername());
            user.setUsername(encodedUsername);*/
            user.setPassword("");
            user.setQuestionnaire(null);
        });
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * Finance section
     */

    @PutMapping(path = "/finance_data", consumes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    public ResponseEntity<ArrayList<String>> updateFinancialDataXLSX (@RequestBody byte[] file) throws IOException {
        ArrayList<String> response = adminService.changeCount(file, "xlsx");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/finance_data", consumes = "application/vnd.ms-excel")
    public ResponseEntity<ArrayList<String>> updateFinancialDataXLS (@RequestBody byte[] file) throws IOException {
        ArrayList<String> response = adminService.changeCount(file, "xls");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * User section
     */

    @PostMapping(path = "/user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        /*String decodedUsername = cryptographer.decode(user.getUsername());
        user.setUsername(decodedUsername);*/
        User response = adminService.createUser(user);
        /*String encodedUsername = cryptographer.encode(response.getUsername());
        response.setUsername(encodedUsername);*/
        response.setPassword("");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping(path = "/users_list")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> response = adminService.getListOfUsers();
        response.forEach(user -> {
            /*String encodedUsername = cryptographer.encode(user.getUsername());
            user.setUsername(encodedUsername);*/
            user.setPassword("");
            user.setQuestionnaire(null);
        });
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping(path = "/user/filter")
    public ResponseEntity<List<User>> getUser(@RequestBody SearchRequest request) {
        List<User> response = adminService.findUser(request);
        response.forEach(user -> {
            /*String encodedUsername = cryptographer.encode(user.getUsername());
            user.setUsername(encodedUsername);*/
            user.setPassword("");
            user.setQuestionnaire(null);
        });
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/user/{id}")
    @SuppressWarnings("Duplicates")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        /*String decodedUsername = cryptographer.decode(user.getUsername());
        user.setUsername(decodedUsername);*/
        User response = adminService.updateUser(id, user);
        /*String encodedUsername = cryptographer.encode(response.getUsername());
        response.setUsername(encodedUsername);*/
        response.setPassword("");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping(path = "/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        String response = adminService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * File section
     */

    @PostMapping(path = "/file")
    public ResponseEntity<File> saveFile(@RequestBody File file) {
        File response = fileService.addFile(file);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(path = "/files_list")
    public ResponseEntity<List<File>> getFiles() {
        List<File> response = fileService.getFiles();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(path = "/file/{id}")
    public ResponseEntity<File> getSingleFile(@PathVariable Long id) {
        File response = fileService.getSingleFile(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/file/{id}")
    public ResponseEntity<File> updateFile(@RequestBody File file, @PathVariable Long id) {
        File response = fileService.changeFile(file, id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping(path = "/file/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable Long id) {
        String response = fileService.deleteFile(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * Categories section
     */

    @GetMapping(path = "/category_list")
    public ResponseEntity<List<Category>> getCategoryList() {
        List<Category> response = fileService.getCategoryList();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/category/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody String categoryName) {
        Category response = fileService.updateCategoryName(categoryName, id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping(path = "/sub_category")
    public ResponseEntity<String> removeSubCategory(@RequestBody Map<String, String> categoryNames) {
        String response = fileService.removeSubCategory(categoryNames.get("categoryName"), categoryNames.get("subCategoryName"));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping(path = "/category")
    public ResponseEntity<String> deleteCategory(@RequestBody String name) {
        String response = fileService.deleteCategory(name);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * News section
     */

    @PostMapping(path = "/news")
    public ResponseEntity<News> createNews(@RequestBody News news) {
        News response = newsService.createNews(news);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping(path = "/news_list")
    public ResponseEntity<List<News>> getListOfNews() {
        List<News> response = newsService.getListOfNews();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(path = "/news/{id}")
    public ResponseEntity<News> getSingleNews(@PathVariable Long id) {
        News response = newsService.getSingleNews(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/news/{id}")
    public ResponseEntity<News> updateNews(@RequestBody News news, @PathVariable Long id) {
        News response = newsService.changeNews(news, id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping(path = "/news/{id}")
    public ResponseEntity<String> deleteNews(@PathVariable Long id) {
        String response = newsService.deleteNews(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(path = "/logs/{amountOfLogs}")
    public ResponseEntity<List<String>> getLogs(@PathVariable int amountOfLogs) throws IOException {
        List<String> response = adminService.getLogs(amountOfLogs);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * Reports section
     */

    @GetMapping(path = "/full_report")
    public ResponseEntity<byte[]> getFullReport() throws IOException {
        byte[] response = adminService.getFullReport();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(path = "/children_report")
    public ResponseEntity<byte[]> getChildrenReport() throws IOException {
        byte[] response = adminService.getChildrenReport();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
