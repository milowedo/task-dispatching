SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


DROP SCHEMA  IF EXISTS `ticket_system`;
CREATE SCHEMA IF NOT EXISTS `ticket_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ticket_system` ;


-- EMPLOYEE TABLE
drop table if exists `employee` ;
create table if not exists `employee` (
  `employee_id` INT(11) not null auto_increment,
  `name` VARCHAR(45) not null,
  `department` VARCHAR(45) not null,
  primary key (`employee_id`)
  )
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;

insert into employee (employee_id, name, department) values (1, 'john locke', 'finances' ),(2, 'tyler game', 'finances'),(3, 'joe macron', 'human resources'), (4, 'rob halford', 'management');
    

-- TICKET TABLE
drop table if exists `ticket` ;
create table if not exists `ticket` (
  `ticket_id` INT(11) not null auto_increment,
  `status` VARCHAR(45) not null,
  `time_created` timestamp default current_timestamp,
  `short_desc` varchar(255),
  primary key (`ticket_id`)
  )
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;  
  


drop table if exists `ticket_detail` ;
create table if not exists ticket_detail (
   ticket_id int(11) not null,
   description text,
   category varchar(50),
   owner varchar(50),
   foreign key(ticket_id) references ticket (ticket_id)
)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4;

insert into ticket_detail values
  (1,
  'somebody once told me',
  'money laundering',
  'john berlusco');


-- EMPLOYEE`S TICKETS
drop table if exists `employee_tickets`;
create table if not exists `employee_tickets` (
	`employee_id` INT(11),
  `ticket_id` INT(11),
  foreign key (`employee_id`) references employee (`employee_id`),
  foreign key (`ticket_id`) references ticket (`ticket_id`)
    )
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;  
    
insert into employee_tickets values(1,1);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
