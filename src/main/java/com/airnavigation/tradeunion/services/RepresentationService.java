package com.airnavigation.tradeunion.services;

import com.airnavigation.tradeunion.domain.News;
import com.airnavigation.tradeunion.domain.PlainDomain.RepresentationContainer;
import com.airnavigation.tradeunion.domain.User;
import com.airnavigation.tradeunion.services.interfaces.UserServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public class RepresentationService {

    private final FileService fileService;
    private final NewsService newsService;
    private final UserServiceInterface userService;

    @Autowired
    public RepresentationService(FileService fileService,
                                 NewsService newsService,
                                 UserServiceInterface userService) {
        this.fileService = fileService;
        this.newsService = newsService;
        this.userService = userService;
    }

    @Transactional
    @PreAuthorize("permitAll()")
    public RepresentationContainer createOpenRepresentation () {
        RepresentationContainer representation = new RepresentationContainer();
        List<News> newsList = newsService.getListOfNews();
        Collections.reverse(newsList);
        representation.setNewsList(newsList);
        return representation;
    }

    @Transactional
    @PreAuthorize("isAuthenticated()")
    public RepresentationContainer createRestrictRepresentation (long id) {
        RepresentationContainer representation = new RepresentationContainer();
        User authenticatedUser = userService.getUser(id);
        List<News> newsList = newsService.getListOfNews();
        Collections.reverse(newsList);
        representation.setAuthorizedUser(authenticatedUser);
        representation.setFileList(fileService.getFiles());
        representation.setNewsList(newsList);
        return representation;
    }
}
