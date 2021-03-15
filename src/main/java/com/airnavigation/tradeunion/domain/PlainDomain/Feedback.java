package com.airnavigation.tradeunion.domain.PlainDomain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Feedback {
    String from;
    String theme;
    String body;
    List<FeedbackFile> files;

}
