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


create table client_info (
	client_info_id SERIAL not null,
	client_last_name VARCHAR(50) NOT NULL,
	client_contact_number VARCHAR(15) unique NOT NULL,
	client_zipcode VARCHAR(10) NOT NULL,
	has_wages VARCHAR(3) NOT NULL default 'no',
	has_social_security VARCHAR(3) NOT NULL default 'no',
	has_pension VARCHAR(3) NOT NULL default 'no',
	has_interest VARCHAR(3) NOT NULL default 'no',
	has_dividends VARCHAR(3) NOT NULL default 'no',
	receives_stock_income VARCHAR(3) NOT NULL default 'no',
	receives_unemployment VARCHAR(3) NOT NULL default 'no',
	receives_disability VARCHAR(3) NOT NULL default 'no',
	pays_tuitions VARCHAR(3) NOT NULL default 'no',
	pays_student_loans VARCHAR(3) NOT NULL default 'no',
	has_self_employment_income VARCHAR(3) NOT NULL default 'no',
	pays_rent VARCHAR(3) NOT NULL default 'no',
	has_hobby_income VARCHAR(3) NOT NULL default 'no',
	has_gambling_income VARCHAR(3) NOT NULL default 'no',
	CONSTRAINT client_info_pk PRIMARY KEY(client_info_id),
	CONSTRAINT client_info_fk_clients FOREIGN KEY(client_last_name, client_contact_number, client_zipcode) REFERENCES clients (last_name, contact_number, zipcode)
	
);


INSERT INTO client_info (
    client_last_name,
    client_contact_number,
    client_zipcode,
    has_wages,
    has_social_security,
    has_pension,
    has_interest,
    has_dividends,
    receives_stock_income,
    receives_unemployment,
    receives_disability,
    pays_tuitions,
    pays_student_loans,
    has_self_employment_income,
    pays_rent,
    has_hobby_income,
    has_gambling_income
) VALUES 
    ('Newell', '607-386-5760', '13820', 'Yes', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No'),
    ('Banks', '607-434-1476', '13820', 'No', 'No', 'No', 'No', 'No', 'No', 'Yes', 'No', 'No', 'No', 'No', 'No', 'No', 'No'),
    ('Grant', '607-435-8123', '13820', 'Yes', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No'),
    ('Arnone', '732-546-1040', '12167', 'No', 'Yes', 'No', 'No', 'Yes', 'No', 'Yes', 'No', 'No', 'No', 'No', 'Yes', 'No', 'No'),
    ('Ellis', '607-282-6042', '13320', 'No', 'Yes', 'No', 'No', 'Yes', 'No', 'Yes', 'No', 'No', 'No', 'No', 'Yes', 'No', 'No');

SELECT * from clients RIGHT JOIN client_info on clients.last_name = client_info.client_last_name and clients.contact_number = client_info.client_contact_number and clients.zipcode = client_info.client_zipcode where clients.last_name = 'Newell' and clients.contact_number = '607-386-5760' and clients.zipcode = '13820';