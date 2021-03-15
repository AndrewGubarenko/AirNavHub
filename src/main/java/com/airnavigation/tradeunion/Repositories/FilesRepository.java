package com.airnavigation.tradeunion.Repositories;

import com.airnavigation.tradeunion.domain.File;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

/**
 * @author Andrii Hubarenko
 * The repository interface that extends the CrudRepository of Spring JPA. Is useing for operations with File objects
 */
public interface FilesRepository extends CrudRepository<File, Long> {
    ArrayList<File> findAll();
}
