package com.airnavigation.tradeunion.services;

import com.airnavigation.tradeunion.Repositories.NewsRepository;
import com.airnavigation.tradeunion.domain.News;
import com.airnavigation.tradeunion.exceptions.IllegalAccessAttemtException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class NewsService {

    private static final Logger LOGGER = Logger.getLogger(NewsService.class);

    private final NewsRepository newsRepository;

    @Autowired
    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @Transactional
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public News createNews(News news) {
        newsRepository.save(news);
        return news;
    }

    @Transactional
    public List<News> getListOfNews() {
        return newsRepository.findAll();
    }

    @Transactional
    public News getSingleNews(Long id) {
        Optional<News> foundNewsOpt = newsRepository.findById(id);
        if(foundNewsOpt.isPresent()) {
            return foundNewsOpt.get();
        } else {
            LOGGER.warn("METHOD GET_SINGLE_NEWS: User with id=" + id + " has been not found");
            throw new NoSuchElementException("Новина з ID=" + id + " не знайдена");
        }
    }

    @Transactional
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public News changeNews(News updatedNews, Long id) {
        Optional<News> newsForUpdateOpt = newsRepository.findById(id);
        if (newsForUpdateOpt.isPresent()) {
            News newsForUpdate = newsForUpdateOpt.get();
            if(newsForUpdate.getId() != id) {
                LOGGER.warn("METHOD CHANGE_NEWS: Unauthorized access attemption! HTTP request was changed! The id in path variable and news id does not match!");
                throw new IllegalAccessAttemtException("The attemption of illegal access to data!");
            }
            newsForUpdate.setTitle(updatedNews.getTitle());
            newsForUpdate.setText(updatedNews.getText());
            newsRepository.save(newsForUpdate);
            return updatedNews;
        } else {
            LOGGER.warn("METHOD CHANGE_NEWS: News with id=" + id + " has been not found");
            throw new NoSuchElementException("Новина з ID=" + id + " не знайдена");
        }
    }

    @Transactional
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public String deleteNews(Long id) {
        newsRepository.deleteById(id);
        return "Новина успішно видалена";
    }
}
