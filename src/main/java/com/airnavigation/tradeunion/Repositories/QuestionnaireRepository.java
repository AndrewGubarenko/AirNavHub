package com.airnavigation.tradeunion.Repositories;

import com.airnavigation.tradeunion.domain.Questionnaire;
import com.airnavigation.tradeunion.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface QuestionnaireRepository extends CrudRepository<Questionnaire, UUID> {
    Optional<Questionnaire> findByUser(User user);
}
