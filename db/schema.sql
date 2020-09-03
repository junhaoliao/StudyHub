/* -------------------------------------------------------------------------------------
   StudyHub MariaDB SQL Schema

   Create Date: September 3, 2020
   Author: Junhao
   ------------------------------------------------------------------------------------- */

CREATE DATABASE IF NOT EXISTS StudyHub;
USE StudyHub;

-- user relation schema
CREATE TABLE IF NOT EXISTS user(
/* -------------------------------------------------------------------------------------
   user identification
   ------------------------------------------------------------------------------------- */
    -- primary key of the table
    user_id INT PRIMARY KEY AUTO_INCREMENT,

    -- must only contain letter and numbers
    -- all letters are stored in lower case
    username VARCHAR(32) NOT NULL UNIQUE CHECK (username NOT LIKE '%[^a-z0-9]%'),

    -- password are encrypted before storing
    password BLOB(8) NOT NULL,

/* -------------------------------------------------------------------------------------
   email address (concatenation of email_localpart+'@'+email_domain)is a secondary key
   refer to https://en.wikipedia.org/wiki/Email_address
   ------------------------------------------------------------------------------------- */
    -- local-part must only contain letter and numbers
    -- all letters are stored in lower case
    email_localpart VARCHAR(64) NOT NULL CHECK (email_localpart NOT LIKE '%[^a-z0-9]%'),

    -- domain must only contain letter and numbers
    -- all letters are stored in lower case
    email_domain VARCHAR(255) NOT NULL CHECK (email_domain NOT LIKE '%[^a-z0-9]%'),

    -- whether the email address is verified
    -- users cannot login until their email address is verified
    account_verified BOOL NOT NULL,

    -- user emails should be unique
    UNIQUE (email_localpart,email_domain),
/* -------------------------------------------------------------------------------------
   user information
   ------------------------------------------------------------------------------------- */
    -- Degree pursuing must be from one of below.
    degree ENUM('Kindergarten','Elementary','Secondary','Undergrad','Master','Doctoral'),

    -- Major pursuing must be from one of below.
    major ENUM('ECE','CS'),

    -- GPA must be a decimal. Only 1 digit after the decimal point is permitted.
    GPA DECIMAL(2,1) CHECK ( GPA >= 0 AND GPA <= 4)
);

-- course relation schema
CREATE TABLE IF NOT EXISTS course(
    -- primary key of the table
    course_id INT PRIMARY KEY AUTO_INCREMENT,

    -- name of the course
    -- special charaters are allowed for now
    course_name VARCHAR(16) NOT NULL,

    -- user who administrates the course
    admin_id INT NOT NULL,

    -- admin_id is a foreign key from user.user_id
    FOREIGN KEY (admin_id) REFERENCES user(user_id)
                                 ON DELETE CASCADE
);

-- course message relation schema (each course can serve as a chatroom)
CREATE TABLE IF NOT EXISTS crs_msg(
    -- primary key of the table
    msg_id INT PRIMARY KEY AUTO_INCREMENT,

    -- message sender's user_id
    sender_id INT NOT NULL,

    -- content of the message. presentation varies according to the type:
    --      text: raw text
    --      image: link to image file
    --      voice: link to recorded audio file
    --      other: reserved
    -- allow null for now
    msg VARCHAR(2048),

    -- type of the message
    type ENUM('text','image','voice','other'),

    -- sender_id is a foreign key from user.user_id
    FOREIGN KEY (sender_id) REFERENCES user(user_id)
                                 ON DELETE CASCADE
);

-- course enrollment relation schema
CREATE TABLE IF NOT EXISTS crs_enroll(
    -- primary key of the table
    enroll_id INT PRIMARY KEY AUTO_INCREMENT,

    -- course_id of this enrollment
    course_id INT NOT NULL,

    -- member who enroll into the course
    member_id INT NOT NULL,

    -- course_id is a foreign key from course.course_id
    FOREIGN KEY (course_id) REFERENCES course(course_id)
                                 ON DELETE CASCADE,

    -- member_id is a foreign key from user.user_id
    FOREIGN KEY (member_id) REFERENCES user(user_id)
                                 ON DELETE CASCADE
);

-- course announcement relation schema
CREATE TABLE IF NOT EXISTS crs_annc(
    -- primary key of the table
    annc_id INT PRIMARY KEY AUTO_INCREMENT,

    -- which course is this announcement from
    course_id INT NOT NULL,

    -- announcement content
    msg VARCHAR(2048),

    -- course_id is a foreign key from course.course_id
    FOREIGN KEY (course_id) REFERENCES course(course_id)
                                 ON DELETE CASCADE
);

-- file relation schema
CREATE TABLE IF NOT EXISTS file(
    -- primary key of the table
    file_id INT PRIMARY KEY AUTO_INCREMENT,

    -- file name
    file_name VARCHAR(255) NOT NULL,

    -- which course does this file belong to
    course_id INT NOT NULL,

    -- when was the file uploaded
    date_upload DATE NOT NULL,

    -- how much is the file size
    file_size BIGINT NOT NULL,

    -- what type of this file is
    -- can be used for displaying previews
    file_type ENUM('txt','c','cpp','h','jpg','png','gif','other') NOT NULL
);
