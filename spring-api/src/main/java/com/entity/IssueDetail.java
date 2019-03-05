package com.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "issue_detail")
@Data
public class IssueDetail {

    @Id
    @Column(name = "issue_id")
    private int id;

    @Column
    private String description;

    @Column(name = "owner")
    private String owner;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column
    private Date updated =  new Date();
}
