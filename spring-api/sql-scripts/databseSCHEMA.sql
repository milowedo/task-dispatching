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
drop table if exists `credentials`;

create table if not exists `user` (
                                    `user_id` INT(11) not null auto_increment,
                                    `name` VARCHAR(45) not null,
                                    `surname` VARCHAR(45) not null,
                                    `user_key` CHAR(6) not null,
                                    `department` VARCHAR(45) not null,
                                    `image` varchar(100),
                                    `email` varchar(60) not null,
                                    primary key (`user_id`),
                                    UNIQUE KEY `fullname` (`name`,`surname`),
                                    check (user_key REGEXP '[A-Z]{6}')
)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;

insert into user (user_id, name, surname, user_key, department, email)
values (1, 'john','locke', 'JOHLOC', 'finances', 'johnlocke@gmail.com'),
       (2, 'tyler','game', 'TYLGAM','finances', 'tylergame@gmail.com'),
       (3, 'joe','macron', 'JOEMAC','human resources', 'joemacron@gmail.com'),
       (4, 'rob','halford', 'ROBHAL','management', 'robhalford@gmail.com');


create table if not exists `credentials` (
                                    `user_key` CHAR(6) not null,
                                    `password` char(60) not null,
                                    `email` varchar(60) not null,
                                    primary key (`user_key`),
                                    check (user_key REGEXP '[A-Z]{6}')
)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;

insert into credentials values
                               ('JOHLOC', '$2a$10$NZR30j7vc5Nd3UZ1WZQnre3PAkMh1zG.4A3E9FlGbhVaGlT3zfkmK', 'johnlocke@gmail.com'),
                               ('TYLGAM', '$2a$10$NZR30j7vc5Nd3UZ1WZQnre3PAkMh1zG.4A3E9FlGbhVaGlT3zfkmK', 'tylergame@gmail.com'),
                               ('JOEMAC', '$2a$10$NZR30j7vc5Nd3UZ1WZQnre3PAkMh1zG.4A3E9FlGbhVaGlT3zfkmK', 'joemacron@gmail.com'),
                               ('ROBHAL', '$2a$10$NZR30j7vc5Nd3UZ1WZQnre3PAkMh1zG.4A3E9FlGbhVaGlT3zfkmK', 'robhalford@gmail.com');



-- ISSUE TABLE
create table if not exists `issue` (
                                     `issue_id` INT(11) not null auto_increment,
                                     `issue_key` varchar(10),
                                     `status` ENUM('to do', 'in progress', 'code review', 'done') not null,
                                     `summary` varchar(100),
                                     `assigned` CHAR(6),
                                     `priority` TINYINT not null,
                                     `project_name` varchar(50),
                                     primary key (`issue_id`),
                                     check ( issue_key REGEXP '[a-zA-Z]{1,3}-[0-9]{1,2}'),
                                     constraint priority_check check ( priority between 1 and 9)
)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;

insert into issue values (1, 'KIS-36', 'To do', 'client api does not return proper reservations', 'JOHLOC', 4, 'medic-center');

create table if not exists `issue_detail` (
                                            `issue_id` int(11) not null primary key,
                                            `description` text,
                                            `owner` varchar(50),
                                            `created` timestamp default current_timestamp,
                                            `updated` timestamp default current_timestamp
)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8mb4;

insert into issue_detail (issue_id, description,  owner)
values (1,
        'Etiam tristique arcu ante, at elementum erat semper sed. Pellentesque arcu felis, imperdiet sed magna eu, euismod varius elit. Sed cursus ante ut augue scelerisque, vestibulum vulputate erat auctor. Morbi non iaculis tellus. Vestibulum lacus erat, facilisis et orci a, posuere tempor risus. Pellentesque ut elit rhoncus, elementum nibh eget, semper ex. Nam porta finibus sapien, et pulvinar elit bibendum sit amet. Phasellus pretium dictum dolor feugiat feugiat. Nam sagittis, urna vitae massa nunc.',
        'Mark Twain');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
