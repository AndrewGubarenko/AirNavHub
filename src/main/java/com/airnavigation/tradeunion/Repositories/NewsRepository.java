package com.airnavigation.tradeunion.Repositories;

import com.airnavigation.tradeunion.domain.News;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * @author Andrii Hubarenko
 * The repository interface that extends the CrudRepository of Spring JPA. Is useing for operations with News objects
 */
public interface NewsRepository extends CrudRepository<News, Long> {
    List<News> findAll();
}
