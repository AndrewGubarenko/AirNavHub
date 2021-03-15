package com.airnavigation.tradeunion.Repositories;

import com.airnavigation.tradeunion.domain.Questionnaire;
import com.airnavigation.tradeunion.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface QuestionnaireRepository extends CrudRepository<Questionnaire, Long> {
    Optional<Questionnaire> findByUser(User user);
}
