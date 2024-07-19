CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(60) NOT NULL,
    user_type VARCHAR(30) NOT NULL
);

CREATE TABLE admins (
    user_id INTEGER,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    cyf_role VARCHAR(100),
    last_update TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE bidder (
    user_id INTEGER PRIMARY KEY,
    user_name VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    last_update TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE skill (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(50)
);

CREATE TABLE buyer (
    user_id INTEGER PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    last_update TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tender (
    tender_id SERIAL PRIMARY KEY,
    buyer_id INT,
    title VARCHAR(100),
    creation_date DATE,
    announcement_date DATE,
    deadline DATE,
    description VARCHAR(2000),
    cost DECIMAL(15, 2) CHECK (cost >= 0),
    status VARCHAR(100),
    no_of_bids_recevied INT,
    last_update TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES buyer (user_id)
);

CREATE TABLE tender_skill (
    tender_id INTEGER,
    skill_id INTEGER,
    PRIMARY KEY (tender_id, skill_id),
    FOREIGN KEY (skill_id) REFERENCES skill(skill_id),
    FOREIGN KEY (tender_id) REFERENCES tender (tender_id)
);

CREATE TABLE bidder_skill (
    bidder_id INTEGER,
    skill_id INTEGER,
    PRIMARY KEY (bidder_id, skill_id),
    FOREIGN KEY (skill_id) REFERENCES skill(skill_id),
    FOREIGN KEY (bidder_id) REFERENCES bidder(user_id)
);

CREATE TABLE bids (
    bid_id SERIAL PRIMARY KEY,
    tender_id INTEGER,
    bidder_id INTEGER,
    buyer_id INTEGER,
    bidding_date DATE,
    status VARCHAR(100),
    bidding_amount DECIMAL(15, 2) CHECK (bidding_amount >= 0),
    cover_letter VARCHAR(255),
    suggested_duration DATE,
    attachments VARCHAR(255),
    FOREIGN KEY (tender_id) REFERENCES tender (tender_id),
    FOREIGN KEY (bidder_id) REFERENCES bidder (user_id),
    FOREIGN KEY (buyer_id) REFERENCES buyer (user_id)
);
