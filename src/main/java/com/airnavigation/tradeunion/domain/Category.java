package com.airnavigation.tradeunion.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * @author Andrii Hubarenko
 * The entity of Category
 */
@Entity
@Getter
@Setter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private long id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @ElementCollection(targetClass = HashSet.class, fetch = FetchType.EAGER)
    @CollectionTable(name="sub_categories")
    private Set<String> subCategories = new HashSet<>();

    @OneToMany(mappedBy="category", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<File> files = new HashSet<>();


    protected void addFile(File file, boolean otherSideHasBeenSet) {
        this.getFiles().add(file);
        if(otherSideHasBeenSet) {
            return;
        }
        file.setCategory(this, true);
    }

    protected void removeFile(File file, boolean otherSideHasBeenSet) {
        this.getFiles().remove(file);
        if(otherSideHasBeenSet) {
            return;
        }
        file.removeCategory(this, true);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Category)) return false;
        Category category = (Category) o;
        return id == category.id &&
                name.equals(category.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", subCategories=" + subCategories +
                ", files=" + files +
                '}';
    }
}
