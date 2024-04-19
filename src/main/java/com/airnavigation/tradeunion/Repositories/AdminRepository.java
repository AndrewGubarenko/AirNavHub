package com.airnavigation.tradeunion.Repositories;

import com.airnavigation.tradeunion.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * @author Andrii Hubarenko
 * The repository interface that extends the CrudRepository of Spring JPA. Is useing for administrative functions
 */
@Repository
public interface AdminRepository extends CrudRepository<User, Long> {
    /**
     * Method for retrieving of user by it`s first name and last name
     * @param firstName user`s first name
     * @param lastName user`s last name
     * @return Optional of user
     */
    Optional<User> findByFirstNameAndLastNameIgnoreCase (String firstName, String lastName);

    /**
     * Method for retrieving of all users from the data base
     * @return List of users
     */
    List<User> findAll();

    /**
     * Method for retrieving user by it`s username, that is used as login
     * @param username unique user`s username (email)
     * @return Optional of user
     */
    Optional<User> findByUsername (String username);

    /**
     * Method for serching user by it`s username, firstName or lastName
     * @param username unique user`s username (email)
     * @param firstName user`s first name
     * @param lastName user`s last name
     * @return List of found users
     */
    List<User> findAllByUsernameOrFirstNameOrLastNameIgnoreCase (String username, String firstName, String lastName);
}
