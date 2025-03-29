-- Generated SQL schema from Access database
-- Generated on: 2025-03-29 00:23:07

-- Table: city_names
CREATE TABLE city_names (
    city_name VARCHAR(50)
);

-- Table: data_table
CREATE TABLE data_table (
    company_name VARCHAR(50),
    phone_number VARCHAR(50),
    zoning_date DATETIME,
    cost_for_this_month FLOAT,
    balance_due FLOAT,
    check_number_1 VARCHAR(50),
    check_amount_1 FLOAT,
    date_check_received_1 DATETIME,
    check_number_2 VARCHAR(50),
    check_amount_2 FLOAT,
    date_check_received_2 DATETIME,
    check_number_3 VARCHAR(50),
    check_amount_3 FLOAT,
    date_check_received_3 DATETIME,
    check_number_4 VARCHAR(50),
    check_amount_4 FLOAT,
    date_check_received_4 DATETIME,
    amount_paid FLOAT,
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER,
    zone_13 INTEGER,
    zone_14 INTEGER,
    zone_15 INTEGER,
    zone_16 INTEGER,
    zone_cost_1 FLOAT,
    zone_cost_2 FLOAT,
    zone_cost_3 FLOAT,
    zone_cost_4 FLOAT,
    zone_cost_5 FLOAT,
    zone_cost_6 FLOAT,
    zone_cost_7 FLOAT,
    zone_cost_8 FLOAT,
    zone_cost_9 FLOAT,
    zone_cost_10 FLOAT,
    zone_cost_11 FLOAT,
    zone_cost_12 FLOAT,
    zone_cost_13 FLOAT,
    zone_cost_14 FLOAT,
    zone_cost_15 FLOAT,
    zone_cost_16 FLOAT,
    sent BOOLEAN NOT NULL,
    date_sent DATETIME
);

CREATE INDEX idx_company_name ON data_table (company_name);
CREATE INDEX idx_phone_number ON data_table (phone_number);
CREATE INDEX idx_reference ON data_table (company_name, phone_number);
CREATE INDEX idx_selected ON data_table (sent);

-- Table: ink_and_paper_color
CREATE TABLE ink_and_paper_color (
    paper_color VARCHAR(50),
    ink_color VARCHAR(50),
    zone_number VARCHAR(255),
    zone_date DATETIME,
    company_name VARCHAR(50),
    phone_number VARCHAR(50)
);

CREATE INDEX idx_company_name ON ink_and_paper_color (company_name);
CREATE INDEX idx_reference1 ON ink_and_paper_color (company_name, phone_number);

-- Table: main_table
CREATE TABLE main_table (
    company_name VARCHAR(50),
    id INTEGER,
    reminder_merchant INTEGER,
    name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    fax_number VARCHAR(50),
    phone_number VARCHAR(50),
    toggle_button VARCHAR(50),
    type_of_business VARCHAR(100),
    active BOOLEAN NOT NULL,
    sent BOOLEAN NOT NULL,
    customer_id INTEGER NOT NULL,
    do_not_bank_bill BOOLEAN NOT NULL,
    bank_help_notice BOOLEAN NOT NULL,
    sent_date DATETIME
);

CREATE INDEX idx_company_name ON main_table (company_name);
CREATE INDEX idx_customer_id ON main_table (customer_id);
CREATE INDEX idx_selected ON main_table (sent);

-- Table: months
CREATE TABLE months (
    month_number INTEGER,
    month_name VARCHAR(50)
);

-- Table: NotBankBillable
CREATE TABLE NotBankBillable (
    balance_due FLOAT,
    zoning_date DATETIME,
    company_name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER,
    zone_13 INTEGER,
    zone_14 INTEGER,
    zone_15 INTEGER,
    do_not_bank_bill BOOLEAN NOT NULL,
    name VARCHAR(50),
    serious VARCHAR(255),
    selected VARCHAR(255)
);

-- Table: old_data_table_as_of_10_22_95
CREATE TABLE old_data_table_as_of_10_22_95 (
    id INTEGER,
    company_name VARCHAR(255),
    zoning_date DATETIME,
    cost_for_this_month FLOAT,
    balance_due FLOAT,
    check_number_1 VARCHAR(255),
    check_amount_1 FLOAT,
    date_check_received_1 VARCHAR(255),
    check_number_2 VARCHAR(255),
    check_amount_2 FLOAT,
    date_check_received_2 VARCHAR(255),
    check_number_3 VARCHAR(255),
    check_amount_3 FLOAT,
    date_check_received_3 VARCHAR(255),
    check_number_4 VARCHAR(255),
    check_amount_4 FLOAT,
    date_check_received_4 VARCHAR(255),
    amount_paid FLOAT,
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER,
    zone_cost_1 FLOAT,
    zone_cost_2 FLOAT,
    zone_cost_3 FLOAT,
    zone_cost_4 FLOAT,
    zone_cost_5 FLOAT,
    zone_cost_6 FLOAT,
    zone_cost_7 FLOAT,
    zone_cost_8 FLOAT,
    zone_cost_9 FLOAT,
    zone_cost_10 FLOAT,
    zone_cost_11 FLOAT,
    zone_cost_12 FLOAT
);

-- Table: old_ink_and_paper_color_as_of_10_22_95
CREATE TABLE old_ink_and_paper_color_as_of_10_22_95 (
    paper_color VARCHAR(255),
    ink_color VARCHAR(255),
    zone_number VARCHAR(255),
    zone_date DATETIME,
    company_name VARCHAR(255),
    id INTEGER
);

-- Table: old_main_as_of_10_22_95
CREATE TABLE old_main_as_of_10_22_95 (
    id INTEGER,
    company_name VARCHAR(255),
    reminder_merchant INTEGER,
    name VARCHAR(255),
    street_address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(255),
    fax_number VARCHAR(255),
    phone_number VARCHAR(255),
    toggle_button VARCHAR(255),
    type_of_business VARCHAR(255)
);

-- Table: reminder_table
CREATE TABLE reminder_table (
    company_name VARCHAR(50),
    phone_number VARCHAR(50),
    contact_name VARCHAR(50),
    type_of_business VARCHAR(50),
    zone VARCHAR(50),
    month_date DATETIME,
    information VARCHAR(1073741823),
    city VARCHAR(50),
    state VARCHAR(50),
    zip VARCHAR(50),
    street VARCHAR(50),
    key INTEGER NOT NULL
);

CREATE INDEX idx_company_name ON reminder_table (company_name);
CREATE INDEX idx_phone_number ON reminder_table (phone_number);

-- Table: T053000A
CREATE TABLE T053000A (
    field1 VARCHAR(255),
    field2 VARCHAR(255),
    field3 INTEGER,
    field4 VARCHAR(255),
    field5 VARCHAR(255),
    field6 VARCHAR(255),
    field7 VARCHAR(255),
    field8 VARCHAR(255)
);

-- Table: tblOverdueReports2030
CREATE TABLE tblOverdueReports2030 (
    balance_due FLOAT,
    zoning_date DATETIME,
    company_name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER,
    zone_13 INTEGER,
    zone_14 INTEGER,
    zone_15 INTEGER,
    selected VARCHAR(255)
);

-- Table: tblOverdueReports2030_9_29_97
CREATE TABLE tblOverdueReports2030_9_29_97 (
    selected VARCHAR(255),
    balance_due FLOAT,
    zoning_date DATETIME,
    company_name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER
);

-- Table: tblOverdueReports2030used
CREATE TABLE tblOverdueReports2030used (
    selected VARCHAR(255),
    balance_due FLOAT,
    zoning_date DATETIME,
    company_name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER
);

-- Table: tblOverdueReports3145
CREATE TABLE tblOverdueReports3145 (
    balance_due FLOAT,
    zoning_date DATETIME,
    company_name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER,
    zone_13 INTEGER,
    zone_14 INTEGER,
    zone_15 INTEGER,
    selected VARCHAR(255)
);

-- Table: tblOverdueReports3145used
CREATE TABLE tblOverdueReports3145used (
    selected VARCHAR(255),
    balance_due FLOAT,
    zoning_date DATETIME,
    company_name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER
);

-- Table: tblOverdueReports4689
CREATE TABLE tblOverdueReports4689 (
    balance_due FLOAT,
    zoning_date DATETIME,
    company_name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER,
    zone_13 INTEGER,
    zone_14 INTEGER,
    zone_15 INTEGER,
    selected VARCHAR(255)
);

-- Table: tblOverdueReports4689used
CREATE TABLE tblOverdueReports4689used (
    selected VARCHAR(255),
    balance_due FLOAT,
    zoning_date DATETIME,
    company_name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER
);

-- Table: tblOverdueReports90
CREATE TABLE tblOverdueReports90 (
    balance_due FLOAT,
    zoning_date DATETIME,
    company_name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER,
    zone_13 INTEGER,
    zone_14 INTEGER,
    zone_15 INTEGER,
    selected VARCHAR(255),
    serious VARCHAR(255)
);

-- Table: tblOverdueReports90SeriousReports
CREATE TABLE tblOverdueReports90SeriousReports (
    selected VARCHAR(255),
    serious VARCHAR(255),
    balance_due FLOAT,
    zoning_date DATETIME,
    company_name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER
);

-- Table: tblOverdueReports90used
CREATE TABLE tblOverdueReports90used (
    selected VARCHAR(255),
    serious VARCHAR(255),
    balance_due FLOAT,
    zoning_date DATETIME,
    company_name VARCHAR(50),
    street_address VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(2),
    zip_code VARCHAR(50),
    zone_1 INTEGER,
    zone_2 INTEGER,
    zone_3 INTEGER,
    zone_4 INTEGER,
    zone_5 INTEGER,
    zone_6 INTEGER,
    zone_7 INTEGER,
    zone_8 INTEGER,
    zone_9 INTEGER,
    zone_10 INTEGER,
    zone_11 INTEGER,
    zone_12 INTEGER
);

-- Table: temp_table
CREATE TABLE temp_table (
    id INTEGER NOT NULL,
    month VARCHAR(50),
    zone VARCHAR(50),
    year VARCHAR(50)
);

-- Table: tempdate
CREATE TABLE tempdate (
    id INTEGER NOT NULL,
    temp_date DATETIME
);

-- Table: zonecost
CREATE TABLE zonecost (
    zone_cost INTEGER
);

-- Table: zones
CREATE TABLE zones (
    zone VARCHAR(50),
    zone_order INTEGER
);
