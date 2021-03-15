package com.airnavigation.tradeunion.services.interfaces;

import com.airnavigation.tradeunion.domain.PlainDomain.SearchRequest;
import com.airnavigation.tradeunion.domain.User;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * @author Andrii Hubarenko
 * Interface for Administrator Service class
 */
public interface AdminServiceInterface {

    /**
     * Method for creating user in data base
     * @param user user object
     * @return created user or throw exception
     */
    User createUser (User user);

    /**
     * Method for initial creation and further updating of data base
     * @param file file in byte array
     * @param fileExtension extension of loaded file
     * @return Set of created users
     * @throws IOException when occur the problem with bytes
     */
    Set<User> updateDB(byte[] file, String fileExtension) throws IOException;

    /**
     * Method for changing the amount of money in the account of user
     * @param file file in byte array
     * @throws IOException when occur the problem with bytes
     * @return Array of String messages with status of the operation
     */
    ArrayList<String> changeCount(byte[] file, String fileExtension) throws IOException;

    /**
     * Method for retrieving of all users from the data base
     * @return List of users
     */
    List<User> getListOfUsers();

    /**
     * Method for retrieving a single user
     * @param id id of user, that should be retrieved
     * @return user
     */
    User getUser(long id);

    /**
     * Method for searching user by it`s username, firstName or lastName, that request contains
     * @param request the request plain object, that contains user`s firs and last name, and username, or some of them
     * @return List of found users
     */
    List<User> findUser(SearchRequest request);

    /**
     * Method for updating of user`s first name and last name
     * @param id of user, that should be updated
     * @param updatedUser updated user`s object from client
     * @return the updated user or throw exception
     */
    User updateUser (long id, User updatedUser);

    /**
     * Method for removing user from data base by it`s Id
     * @param id of user, that should be removed
     * @return String message with a status of operation
     */
    String deleteUser (long id);

    /**
     * Method for retrieving server logs
     * @param amountOfLogs the quantity of requested logs from the end of list
     * @return list of logs with length equals amountOfLogs
     * @throws IOException when occur the problem with byte array
     */
    List<String> getLogs(int amountOfLogs) throws IOException;

    /**
     * Method for creating a report about members of trade union
     * @return byte array with base64 encoded file
     * @throws IOException when occur the problem with byte array
     */
    byte[] getFullReport() throws IOException;

    /**
     * Method for creating a report about children of trade union's members
     * @return byte array with base64 encoded file
     * @throws IOException when occur the problem with byte array
     */
    byte[] getChildrenReport() throws IOException;
}
