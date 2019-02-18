package com.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "ticketDetail")
@Data
public class ticketDetail {

    @Id
    @Column
    private int ticket_id;

    @Column
    private String description;

    @Column
    private String category;

    @Column
    private String owner;

}
