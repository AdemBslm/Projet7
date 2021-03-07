CREATE DATABASE groupomania CHARACTER SET 'utf8';
USE groupomania;

CREATE TABLE `user` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(320) NOT NULL UNIQUE,
  `password` char(60) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `avatar` varchar(200)
) ENGINE=InnoDB;

CREATE TABLE `post` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `post` varchar(255),
  `image` varchar(200),
  `date` datetime NOT NULL,
  `user_id` int NOT NULL,
    CONSTRAINT `fk_user_id`    
        FOREIGN KEY (`user_id`)      
        REFERENCES `user`(`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `comment` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `comment` varchar(255),
  `date` datetime NOT NULL,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
    CONSTRAINT `fk_comment_user_id`     
        FOREIGN KEY (`user_id`)       
        REFERENCES `user`(`id`) 
        ON DELETE CASCADE,
    CONSTRAINT `fk_comment_post_id`     
        FOREIGN KEY (`post_id`)       
        REFERENCES `post`(`id`) 
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `likes` (
  `post_id` int,
  `user_id` int,
    Primary Key (`post_id`,`user_id`),
    CONSTRAINT `fk_likes_user_id`     
        FOREIGN KEY (`user_id`)       
        REFERENCES `user`(`id`) 
        ON DELETE CASCADE,
    CONSTRAINT `fk_likes_post_id`     
        FOREIGN KEY (`post_id`)       
        REFERENCES `post`(`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;


