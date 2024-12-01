package kristine.card_generator.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name="users")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private Integer id;
    @NotEmpty
    private String name;
    @NotEmpty
    @Column(unique=true)
    private String username;
    @NotEmpty
    @Column(unique=true)
    private String email;
    @NotEmpty
    private String password;
    @JsonIgnoreProperties("user")
    @OneToMany(mappedBy = "user")
    private List<MyCard> myCards;
    @JsonIgnoreProperties("user")
    @OneToMany(mappedBy = "user")
    private List<VirtualCard> virtualCards;

    public User(Integer id, String username, String email, String password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User(Integer id, String name, String username, String email, String password, List<MyCard> myCards, List<VirtualCard> virtualCards) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.myCards = myCards;
        this.virtualCards = virtualCards;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User() {
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<MyCard> getMyCards() {
        return myCards;
    }

    public void setMyCards(List<MyCard> myCards) {
        this.myCards = myCards;
    }

    public List<VirtualCard> getVirtualCards() {
        return virtualCards;
    }

    public void setVirtualCards(List<VirtualCard> virtualCards) {
        this.virtualCards = virtualCards;
    }
}
