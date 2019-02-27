SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


DROP SCHEMA  IF EXISTS `myjira`;
CREATE SCHEMA IF NOT EXISTS `myjira` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `myjira` ;


-- user TABLE
drop table if exists `user`;
drop table if exists `issue`;
drop table if exists `issue_detail`;

create table if not exists `user` (
                                    `user_id` INT(11) not null auto_increment,
                                    `name` VARCHAR(45) not null,
                                    `surname` VARCHAR(45) not null,
                                    `user_key` CHAR(6) not null,
                                    `department` VARCHAR(45) not null,
                                    primary key (`user_id`),
                                    UNIQUE KEY `fullname` (`name`,`surname`),
                                    check (user_key REGEXP '[A-Z]{6}')
)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;

insert into user (user_id, name, surname, user_key, department)
values (1, 'john','locke', 'JOHLOC', 'finances' ),
       (2, 'tyler','game', 'TYLGAM','finances'),
       (3, 'joe','macron', 'JOEMAC','human resources'),
       (4, 'rob','halford', 'ROBHAL','management');

-- ISSUE TABLE
create table if not exists `issue` (
                                     `issue_id` INT(11) not null auto_increment,
                                     `issue_key` varchar(10),
                                     `status` ENUM('To do', 'In progress', 'code review', 'done') not null,
                                     `summary` varchar(100),
                                     `owner` varchar(50),
                                     `project_name` varchar(50),
                                     primary key (`issue_id`),
                                     check ( issue_key REGEXP '[a-zA-Z]{1,5}-[0-9]{1,6}')
)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;

insert into issue values (1, 'KIS-36', 'To do', 'client api does not return proper reservations', 'Mark Twain', 'medic-center');

create table if not exists `issue_detail` (
                                            `issue_id` int(11) not null,
                                            `description` text,
                                            `priority` TINYINT not null,
                                            `assigned` CHAR(6),
                                            `created` timestamp default current_timestamp,
                                            `updated` timestamp default current_timestamp,
                                            foreign key(issue_id) references issue (issue_id),
                                            check ( priority between 1 and 9)
)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4;

insert into issue_detail (issue_id, description, priority, assigned)
values (1,'somebody once told me there was a problem',5,'JOHLOC');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
