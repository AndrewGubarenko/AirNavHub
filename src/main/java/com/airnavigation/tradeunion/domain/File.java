package com.airnavigation.tradeunion.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

/**
 * @author Andrii Hubarenko
 * The entity of File
 */
@Entity
@Getter
@Setter
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    UUID id;

    @Column(name = "NAME", nullable = false)
    String name;

    @Column(name = "PATH", nullable = false)
    String path;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    @Column(name = "SUB_CATEGORY", nullable = false)
    String subCategory;

    public void setCategory(Category category) {
        this.setCategory(category, false);
    }

    protected void setCategory(Category category, boolean otherSideHasBeenSet) {
        this.category = category;
        if(otherSideHasBeenSet) {
            return;
        }
        category.addFile(this, true);
    }

    public void removeCategory() {
        removeCategory(this.category, false);
    }

    protected void removeCategory(Category category, boolean otherSideHasBeenSet) {
        this.category = null;
        if(otherSideHasBeenSet) {
            return;
        }
        category.removeFile(this, true);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof File)) return false;
        File file = (File) o;
        return id == file.id &&
                name.equals(file.name) &&
                path.equals(file.path);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, path);
    }

    @Override
    public String toString() {
        return "File{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", category=" + category +
                '}';
    }
}
