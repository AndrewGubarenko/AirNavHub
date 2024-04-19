package com.airnavigation.tradeunion.services.interfaces;

import com.airnavigation.tradeunion.domain.PlainDomain.ChangePassword;
import com.airnavigation.tradeunion.domain.PlainDomain.Feedback;
import com.airnavigation.tradeunion.domain.Questionnaire;
import com.airnavigation.tradeunion.domain.User;

import java.util.UUID;

/**
 * @author Andrii Hubarenko
 * The interface for User Service class
 */
public interface UserServiceInterface {

    /**
     * Method for changing of user`s password
     * @param changePassword plain object, that contains old and new password
     * @param id id of user, who is going to change his password
     * @return String message with a status of operation
     */
    String changePassword(ChangePassword changePassword, Long id);

    /**
     * Method for extraction of user by it`s Id
     * @param id id of user, that should be retrieved
     * @return extracted user or throw exception
     */
    User getUser (Long id);

    /**
     * Method that allow to reset the forgotten password for user.
     * @param email the email of user, who forgot the password
     * @return String response success or fail
     */
    String resetPassword(String email);

    /**
     * Method for sending an email to administrator
     * @param feedback the feedback plain object
     * @return String response
     */
    String receiveEmailFromUser(Feedback feedback);

    /**
     * Method for saving or changing questionnaire for user
     * @param id id of questionnaire`s owner
     * @param questionnaire a questionnaire object
     * @return saved questionnaire
     */
    Questionnaire saveQuestionnaire(Long id, Questionnaire questionnaire);

    /**
     * method for getting user's questionnaire
     * @param id id of questionnaire`s owner
     * @return retrieved questionnaire
     */
    Questionnaire getQuestionnaire(Long id);
}
