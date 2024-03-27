create database reservation;

create table client (
	client_first_name VARCHAR(50) NOT NULL,
	client_last_name VARCHAR(50) NOT NULL,
	client_phonenum INT UNIQUE NOT NULL,
	client_zipcode INT NOT NULL,
	client_email VARCHAR(100) UNIQUE DEFAULT 'Not Given',
	CONSTRAINT client_pk PRIMARY KEY (client_last_name,client_phonenum, client_zipcode)
	
)


CREATE TABLE reservation (
	reservation_id SERIAL NOT NULL,
	reservation_datetime TIMESTAMP NOT NULL,
	reservation_location VARCHAR(100) NOT NULL,
	level_of_service INT NOT NULL CHECK (level_of_service <= 5),
	client_last_name VARCHAR(50) NOT NULL,
	client_phonenum INT NOT NULL,
	client_zipcode INT NOT NULL,
	CONSTRAINT reservation_pk PRIMARY KEY (reservation_id),
	CONSTRAINT reservation_fk_client FOREIGN KEY (client_last_name, client_phonenum, client_zipcode) REFERENCES client (client_last_name,client_phonenum, client_zipcode)
)

CREATE TABLE form_collections (
	form_collection_id SERIAL NOT NULL,
	client_last_name VARCHAR(50) NOT NULL,
	client_phonenum INT NOT NULL,
	client_zipcode INT NOT NULL,
	has_w2 BOOLEAN DEFAULT FALSE,
	has_1098_T BOOLEAN DEFAULT FALSE,
	has_1099_INT BOOLEAN DEFAULT FALSE,
	has_1099_DIV BOOLEAN DEFAULT FALSE,
	has_1099_G BOOLEAN DEFAULT FALSE,
	has_1099_MISC BOOLEAN DEFAULT FALSE,
	has_1099_NEC BOOLEAN DEFAULT FALSE,
	has_1099_K BOOLEAN DEFAULT FALSE,
	has_1099_S BOOLEAN DEFAULT FALSE,
	has_1099_B BOOLEAN DEFAULT FALSE,
	has_1099_R BOOLEAN DEFAULT FALSE,
	has_SSA_1099 BOOLEAN DEFAULT FALSE,
	has_RRB_1099 BOOLEAN DEFAULT FALSE,
	has_5498_SA BOOLEAN DEFAULT FALSE,
	has_1099_SA BOOLEAN DEFAULT FALSE,
	has_1040_Schedule_D BOOLEAN DEFAULT FALSE,
	CONSTRAINT form_collections_pk PRIMARY KEY (form_collection_id),
	CONSTRAINT form_collections_fk_client FOREIGN KEY (client_last_name, client_phonenum, client_zipcode) REFERENCES client (client_last_name,client_phonenum, client_zipcode)
	
)

CREATE DATABASE appointment;

CREATE TABLE locations (
	location_id SERIAL NOT NULL,
	location_name VARCHAR(100) UNIQUE NOT NULL,
	location_state CHAR(2) NOT NULL CHECK (char_length(location_state) = 2),
	location_city VARCHAR(50) NOT NULL,
	location_zipcode INT NOT NULL,
	CONSTRAINT locations_pk PRIMARY KEY (location_id)
)

CREATE TABLE appointments (
	appointment_id SERIAL NOT NULL,
	location_id INT NOT NULL,
	appointment_datetime TIMESTAMP NOT NULL,
	is_taken BOOLEAN DEFAULT FALSE,
	CONSTRAINT appointments_pk PRIMARY KEY (appointment_id),
	CONSTRAINT appointments_fk_locations FOREIGN KEY (location_id) REFERENCES locations (location_id) 
)


INSERT INTO locations (location_name, location_state, location_city, location_zipcode)
VALUES 
    ('Hartwick College Campus Golisano 2nd Floor', 'NY', 'Oneonta', '13820'),
    ('Huntington Memorial Library', 'NY', 'Oneonta', '13820'),
    ('GHS Federal Credit Union', 'NY', 'Norwich', '13815'),
    ('GHS Federal Credit Union', 'NY', 'Binghamton', '13905'),
    ('Laurens Central School', 'NY', 'Laurens', '13796'),
    ('Tabernacle Baptist Church', 'NY', 'Utica', '13501'),
    ('Charlotte Valley Central School', 'NY', 'Davenport', '13750');


INSERT INTO appointments (location_id, appointment_datetime, is_taken)
VALUES
    (5, '2024-03-01 10:00:00', FALSE),
    (5, '2024-03-01 11:00:00', FALSE),
    (5, '2024-03-02 09:00:00', FALSE),
    (6, '2024-03-05 15:00:00', FALSE),
    (6, '2024-03-07 14:00:00', FALSE),
    (6, '2024-03-08 16:00:00', FALSE),
    (7, '2024-03-01 10:30:00', FALSE),
    (7, '2024-03-03 11:30:00', FALSE),
    (7, '2024-03-05 12:00:00', FALSE),
    (8, '2024-03-05 13:00:00', FALSE),
    (8, '2024-03-07 14:30:00', FALSE),
    (8, '2024-03-09 15:30:00', FALSE),
    (9, '2024-03-02 10:00:00', FALSE),
    (9, '2024-03-02 11:00:00', FALSE),
    (9, '2024-03-02 12:00:00', FALSE),
    (10, '2024-03-01 10:00:00', FALSE),
    (10, '2024-03-01 11:00:00', FALSE),
    (10, '2024-03-01 12:00:00', FALSE),
    (11, '2024-03-05 13:00:00', FALSE),
    (11, '2024-03-06 14:00:00', FALSE),
    (11, '2024-03-07 15:00:00', FALSE);

SELECT *
FROM appointments AS a
JOIN locations AS l ON a.location_id = l.location_id;


SELECT (appointment_id, appointment_datetime, is_taken)
FROM appointments AS a
JOIN locations AS l ON a.location_id = l.location_id
WHERE l.location_id = 5;