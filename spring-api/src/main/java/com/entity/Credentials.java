package com.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Table(name = "credentials")
@Data
@Entity(name = "Credentials")
@AllArgsConstructor
@NoArgsConstructor

public class Credentials{

    @Id
    @Column(name = "user_key")
    private String key;

    @Column(name="password")
    private String password;
}
