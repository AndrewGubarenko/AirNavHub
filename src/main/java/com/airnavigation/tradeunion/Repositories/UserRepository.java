package com.airnavigation.tradeunion.Repositories;

import com.airnavigation.tradeunion.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * @author Andrii Hubarenko
 * The repository interface that extends the CrudRepository of Spring JPA. Is useing for ordinary functions.
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
