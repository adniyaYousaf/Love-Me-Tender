DROP TABLE IF EXISTS users cascade;


DROP TABLE IF EXISTS admins;


DROP TABLE IF EXISTS bidder cascade;


DROP TABLE IF EXISTS skill cascade;


DROP TABLE IF EXISTS contractor cascade;


DROP TABLE IF EXISTS bids cascade;


DROP TABLE IF EXISTS tender cascade;


DROP TABLE IF EXISTS tender_skill cascade;


DROP TABLE IF EXISTS bidder_skill cascade;





CREATE TABLE users (id PRIMARY KEY AUTO INCREMENT,
                                          email VARCHAR(120) NOT NULL UNIQUE,
                                                            password_hash VARCHAR(60) NOT NULL,
                                                                FOREIGN KEY user_type VARCHAR(30) NOT NULL);


CREATE TABLE admins (id PRIMARY KEY,
                                    first_name VARCHAR(100),
                                                        last-name VARCHAR(100),
                                                                 cyf_role VARCHAR(100),
                                                                                last_update TIMESTAMP,
                                                                                                user_id integer references users(id));


CREATE TABLE bidder (user_id PRIMARY KEY,
                                         user_name VARCHAR(100),
                                                            first_name VARCHAR(100),
                                                                            last_name VARCHAR(100),
                                                                                            last_update TIMESTAMP,
                                                                                                    FOREIGN KEY user_id REFERENCES users(id) FOREIGN KEY);


create table skill (skill_id INT PRIMARY KEY AUTO INCREMENT,
                                                    skill_name VARCHAR(50));


CREATE TABLE contractor (user_id PRIMARY KEY,
                                       company VARCHAR(100) NOT NULL,
                                                       description VARCHAR(255) NOT NULL,
                                                                                   _address VARCHAR(255) NOT NULL,
                                                                                                    last_update TIMESTAMP,
                                                                                                                  FOREIGN KEY  user_id REFERENCES users(id));

CREATE TABLE tender (id INT PRIMARY KEY AUTO INCREMENT,
                                    title VARCHAR(100),
                                            creation_date DATE,
                                                            announcment_date DATE,
                                                                        deadline DATE,
                                                                                    description VARCHAR(255),
                                                                                                        cost INT,
                                                                                                            statu BOOLEAN,
                                                                                                                        last_update TIMESTAMP,
                                                                                                                                        FOREIGN KEY co );
                                                                                




CREATE TABLE tender_skill (tender_id,
                                    skill_id INT,
                                            PRIMARY KEY (tender_id, skill_id),
                                                            FOREIGN KEY skill_id REFERENCES skill(id),
                                                                        FOREIGN KEY tender_id REFERENCES tender(id) );
                                                                                