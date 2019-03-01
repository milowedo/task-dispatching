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

    @Column
    private int priority;

    @Column
    private String assigned;

    @Temporal(TemporalType.TIMESTAMP)
    @Column
    private Date created;

    @Temporal(TemporalType.TIMESTAMP)
    @Column
    private Date updated;

}
