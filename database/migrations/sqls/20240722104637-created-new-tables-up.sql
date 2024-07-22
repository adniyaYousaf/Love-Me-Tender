CREATE TABLE bid (
    bid_id SERIAL PRIMARY KEY,
    tender_id INTEGER,
    bidder_id INTEGER,
    buyer_id INTEGER,
    bidding_date DATE,
    status VARCHAR(100),
    bidding_amount DECIMAL(15, 2) CHECK (bidding_amount >= 0),
    cover_letter VARCHAR(255),
    suggested_duration INTEGER,
    FOREIGN KEY (tender_id) REFERENCES tender (tender_id),
    FOREIGN KEY (bidder_id) REFERENCES bidder (user_id),
    FOREIGN KEY (buyer_id) REFERENCES buyer (user_id)
);

CREATE TABLE attachments (
    attachment_id SERIAL PRIMARY KEY,
    bid_id INTEGER,
    attachment VARCHAR(2000),
    FOREIGN KEY (bid_id) REFERENCES bid (bid_id)
);

ALTER TABLE tender
ADD COLUMN buyer_id INTEGER;

ALTER TABLE tender
ADD CONSTRAINT fk_buyer_id
FOREIGN KEY (buyer_id) REFERENCES buyer (user_id);

ALTER TABLE tender
ADD COLUMN no_of_bids_received INT;

ALTER TABLE tender
ALTER COLUMN description TYPE VARCHAR(2000);
