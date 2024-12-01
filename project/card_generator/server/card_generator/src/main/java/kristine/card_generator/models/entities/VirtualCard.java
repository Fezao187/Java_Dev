package kristine.card_generator.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@Entity
public class VirtualCard {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private BigInteger cardNumber;
    private String expiryDate;
    private Integer cvv;
    @JsonIgnoreProperties("virtualCards")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public VirtualCard(Integer id, String name, BigInteger cardNumber, String expiryDate, Integer cvv, User user) {
        this.id = id;
        this.name = name;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.user = user;
    }

    public VirtualCard() {
    }

    public VirtualCard(Integer id, String name, BigInteger cardNumber, Integer cvv, String expiryDate) {
        this.id = id;
        this.name = name;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
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

    public BigInteger getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(BigInteger cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Integer getCvv() {
        return cvv;
    }

    public void setCvv(Integer cvv) {
        this.cvv = cvv;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
