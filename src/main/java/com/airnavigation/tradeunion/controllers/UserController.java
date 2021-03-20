package com.airnavigation.tradeunion.controllers;

import com.airnavigation.tradeunion.domain.PlainDomain.ChangePassword;
import com.airnavigation.tradeunion.domain.PlainDomain.Feedback;
import com.airnavigation.tradeunion.domain.Questionnaire;
import com.airnavigation.tradeunion.domain.User;
import com.airnavigation.tradeunion.security.Cryptographer;
import com.airnavigation.tradeunion.services.interfaces.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * @author Andrii Hubarenko
 * The REST controller for processing user`s requests
 */
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserServiceInterface userService;
    private final Cryptographer cryptographer;

    @Autowired
    public UserController (UserServiceInterface userService,
                           Cryptographer cryptographer) {
        this.userService = userService;
        this.cryptographer = cryptographer;
    }

    @GetMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<User> getUser (@PathVariable UUID id) {
        User response = userService.getUser(id);
        String username = cryptographer.encode(response.getUsername());
        response.setUsername(username);
        response.setPassword("");
        response.setQuestionnaire(null);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping(path = "/{id}/password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePassword changePassword,
                                                 @PathVariable UUID id) {
        ChangePassword decodedChangePassword = new ChangePassword();
        decodedChangePassword.setCurrentPassword(cryptographer.decode(changePassword.getCurrentPassword()));
        decodedChangePassword.setNewPassword(cryptographer.decode(changePassword.getNewPassword()));
        return ResponseEntity.status(HttpStatus.OK).body(userService.changePassword(decodedChangePassword, id));
    }

    /**
     * Controller for getting a feedback from user
     */
    @PostMapping(path = "/feedback", consumes = "application/json")
    public ResponseEntity<String> getFeedback (@RequestBody Feedback feedback) {
        String decodedFrom = cryptographer.decode(feedback.getFrom());
        feedback.setFrom(decodedFrom);
        String result = userService.receiveEmailFromUser(feedback);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    /**
     * questionnaire service
     */
    @PostMapping(path = "/{id}/questionnaire", consumes = "application/json")
    public ResponseEntity<Questionnaire> saveQuestionnaire (@RequestBody Questionnaire questionnaire,
                                                            @PathVariable UUID id) {
        Questionnaire result = userService.saveQuestionnaire(id, questionnaire);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    @GetMapping(path = "/{id}/questionnaire")
    public ResponseEntity<Questionnaire> getQuestionnaire (@PathVariable UUID id) {
        Questionnaire result = userService.getQuestionnaire(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
