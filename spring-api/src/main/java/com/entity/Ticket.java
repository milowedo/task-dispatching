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
@Table(name = "ticket")
@Data
@Entity(name = "Ticket")
@AllArgsConstructor
@NoArgsConstructor
public class Ticket extends Resolvable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private int ticketID;

    @Column(name="status")
    private String ticketStatus;

    @Column(name = "short_desc")
    private String descriptionGist;

    @Column(name = "time_created")
    @Temporal(TemporalType.TIMESTAMP)
    private Date timeCreated;
}
