/* -------------------------------------------------------------------------------------
   StudyHub MariaDB SQL Schema

   Create Date: September 3, 2020
   Author: Junhao
   ------------------------------------------------------------------------------------- */

CREATE DATABASE IF NOT EXISTS StudyHub;
USE StudyHub;

CREATE TABLE IF NOT EXISTS user(
/* -------------------------------------------------------------------------------------
   user identification
   ------------------------------------------------------------------------------------- */
    -- primary key of the table
    user_id INT PRIMARY KEY AUTO_INCREMENT,

    -- must only contain letter and numbers
    -- all letters are stored in lower case
    username VARCHAR(32) NOT NULL UNIQUE CHECK (username NOT LIKE '%[^a-z0-9]%'),

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
    degree VARCHAR(32) CHECK ( degree LIKE 'Kindergarten' OR
                               degree LIKE 'Elementary' OR
                               degree LIKE 'Secondary' OR
                               degree LIKE 'Undergrad' OR
                               degree LIKE 'Master' OR
                               degree LIKE 'Doctoral'),

    -- Major pursuing must be from one of below.
    major VARCHAR(32) CHECK ( major LIKE 'ECE' OR
                              major LIKE 'CS'),

    -- GPA must be a decimal. Only 1 digit after the decimal point is permitted.
    GPA DECIMAL(2,1)
);

