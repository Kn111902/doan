package org.example.shop.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "users")
public class Account {
    @Id
    @Column(name = "userId" )
    private String userId;
    @Column(name = "username" , unique = true )
    private String username;
    @Column(name = "password" ,nullable = false)
    private String password;
    @Column(name = "firstName" ,nullable = false)
    private String firstName;
    @Column(name = "lastName" ,nullable = false)
    private String lastName;
    private String phone;
    private String district;
    private String province;
    private String addressDetail;
    private String avatar;
    private String fullName;
    private boolean isSellers;
    private boolean active;

    @PrePersist
    protected void onCreate() {
        userId = UUID.randomUUID().toString();
        fullName= firstName+ " "+lastName;
        active= true;
    }
}