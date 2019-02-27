package com.entity;

import com.LongPolling.Resolvable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Table(name = "issue")
@Data
@Entity(name = "Issue")
@AllArgsConstructor
@NoArgsConstructor
public class Issue extends Resolvable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "issue_id")
    private int id;

    @Column(name="issue_key")
    private String issue_key;

    @Column(name = "status")
    private String status;

    @Column(name = "summary")
    private Date summary;

    @Column(name = "owner")
    private String owner;

    @Column(name = "project_name")
    private String project;
}
