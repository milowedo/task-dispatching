package com.entity;

import com.LongPolling.Resolvable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.File;
import java.io.Serializable;
import java.sql.Blob;

@EqualsAndHashCode(callSuper = true)
@Entity(name = "User")
@Table(name="user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User extends Resolvable implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="user_id")
	private int id;

    @Column(name="name")
    private String name;

    @Column(name="surname")
    private String surname;

    @Column(name="user_key")
    private String key;

    @Column(name = "department")
    private String teamName;

    @Column(name = "image")
    private String image;

    @Column(name = "email")
    private String email;
}





