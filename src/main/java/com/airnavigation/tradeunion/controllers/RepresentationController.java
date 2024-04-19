package com.airnavigation.tradeunion.controllers;

import com.airnavigation.tradeunion.domain.PlainDomain.RepresentationContainer;
//import com.airnavigation.tradeunion.security.Cryptographer;
import com.airnavigation.tradeunion.services.RepresentationService;
import com.airnavigation.tradeunion.services.interfaces.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class RepresentationController {

    private final RepresentationService service;
    private final UserServiceInterface userService;

    @Autowired
    public RepresentationController(RepresentationService service,
                                    UserServiceInterface userService) {
        this.service = service;
        this.userService = userService;
    }

    @GetMapping(path = "/main")
    public ResponseEntity<RepresentationContainer> getRepresentation() {
        RepresentationContainer result = service.createOpenRepresentation();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping(path = "/full_main/{id}")
    public ResponseEntity<RepresentationContainer> getRepresentation(@PathVariable Long id) {
        RepresentationContainer result = service.createRestrictRepresentation(id);
        result.getAuthorizedUser().setPassword("");
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PutMapping(path = "/password")
    public ResponseEntity<String> resetPassword(@RequestBody String email) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.resetPassword(email));
    }
}
