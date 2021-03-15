package com.airnavigation.tradeunion.Repositories;

import com.airnavigation.tradeunion.domain.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

/**
 * @author Andrii Hubarenko
 * The repository interface that extends the CrudRepository of Spring JPA. Is useing for operations with categories in data base
 */
@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    Optional<Category> findByName(String name);
    ArrayList<Category> findAll();
}
