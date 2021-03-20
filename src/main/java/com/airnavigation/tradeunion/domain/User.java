package com.airnavigation.tradeunion.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * @author Andrii Hubarenko
 * The entity of User
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "\"User\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @NonNull
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @NonNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NonNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "count" , columnDefinition="Decimal(10,2) default '0.00'")
    private Double count;

    @NonNull
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "USER_ROLE", joinColumns = @JoinColumn(name = "USER_ID"))
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Questionnaire questionnaire;

    public void addQuestionnaire(Questionnaire questionnaire, boolean otherSideHasBeenAlreadySet) {
        this.setQuestionnaire(questionnaire);
        if (otherSideHasBeenAlreadySet) {
            return;
        }
        questionnaire.addUser(this, true);
    }

    public void removeQuestionnaire() {
        removeQuestionnaire(this.questionnaire, false);
    }

    protected void removeQuestionnaire(Questionnaire questionnaire, boolean otherSideHasBeenSet) {
        this.questionnaire = null;
        if(otherSideHasBeenSet) {
            return;
        }
        questionnaire.removeUser(true);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return id == user.id &&
                username.equals(user.username) &&
                gender.equals(user.gender) &&
                roles.equals(user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, gender, roles);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + "secret" + '\'' +
                ", count=" + count + '\'' +
                ", gender=" + gender + '\'' +
                ", roles=" + "[" + roles.stream().map(r -> r.name() + " ").collect(Collectors.joining()) + "]" +
                '}';
    }
}
