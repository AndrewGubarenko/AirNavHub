package com.airnavigation.tradeunion.domain.PlainDomain;

import com.airnavigation.tradeunion.domain.File;
import com.airnavigation.tradeunion.domain.News;
import com.airnavigation.tradeunion.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RepresentationContainer {
    User authorizedUser;
    List<File> fileList;
    List<News> newsList;
}
