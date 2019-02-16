create temporary table ticket_system.indices
select ticket_id as id,
       (select count(ticket_id)
        from ticket_system.ticket
        where ticket_id < id)+1 as actual_id
from ticket_system.ticket


SET SQL_SAFE_UPDATES = 0;

update ticket_system.ticket set ticket_id =
(select actual_id from ticket_system.indices where id = ticket_id)
where ticket_id is not null 


select * from ticket_system.ticket

drop temporary table ticket_system.indices