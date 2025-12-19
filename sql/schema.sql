CREATE TABLE members (
    member_id INT PRIMARY KEY,
    name VARCHAR(100),
    status VARCHAR(20),
    is_trial_user BOOLEAN,
    converted_from_trial BOOLEAN,
    join_date DATE
);

CREATE TABLE venues (
    venue_id INT PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100)
);

CREATE TABLE bookings (
    booking_id INT PRIMARY KEY,
    venue_id INT REFERENCES venues(venue_id),
    sport_id INT,
    member_id INT REFERENCES members(member_id),
    booking_date TIMESTAMP,
    amount NUMERIC(10,2),
    coupon_code VARCHAR(50),
    status VARCHAR(20)
);

CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id),
    type VARCHAR(50),
    amount NUMERIC(10,2),
    status VARCHAR(20),
    transaction_date DATE
);
