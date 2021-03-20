package com.airnavigation.tradeunion.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

/**
 * @author Andrii Hubarenko
 * The entity of News
 */
@Entity
@Getter
@Setter
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    UUID id;

    @Column(name = "TITLE")
    String title;

    @Column(name = "TEXT", columnDefinition = "TEXT")
    String text;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof News)) return false;
        News news = (News) o;
        return id == news.id &&
                title.equals(news.title) &&
                text.equals(news.text);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, text);
    }

    @Override
    public String toString() {
        return "News{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                '}';
    }
}
