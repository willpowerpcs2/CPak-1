-- Generated SQL schema from Access database
-- Generated on: 2025-03-29 00:06:02

-- Table: city names
CREATE TABLE city names (
    city name VARCHAR(50)
);


-- Table: data table
CREATE TABLE data table (
    Company name VARCHAR(50),
    phone number VARCHAR(50),
    zoning date DATETIME,
    Cost for this month FLOAT,
    Balance due FLOAT,
    Check number 1 VARCHAR(50),
    Check amount 1 FLOAT,
    Date check was received 1 DATETIME,
    Check number 2 VARCHAR(50),
    Check amount 2 FLOAT,
    Date check was received 2 DATETIME,
    Check number 3 VARCHAR(50),
    Check amount 3 FLOAT,
    Date check was received 3 DATETIME,
    Check number 4 VARCHAR(50),
    Check amount 4 FLOAT,
    Date check was received 4 DATETIME,
    Amount Paid FLOAT,
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER,
    Zone 13 INTEGER,
    Zone 14 INTEGER,
    Zone 15 INTEGER,
    Zone 16 INTEGER,
    Zone Cost 1 FLOAT,
    Zone Cost 2 FLOAT,
    Zone Cost 3 FLOAT,
    Zone Cost 4 FLOAT,
    Zone Cost 5 FLOAT,
    Zone Cost 6 FLOAT,
    Zone Cost 7 FLOAT,
    Zone Cost 8 FLOAT,
    Zone Cost 9 FLOAT,
    Zone Cost 10 FLOAT,
    Zone Cost 11 FLOAT,
    Zone Cost 12 FLOAT,
    Zone Cost 13 FLOAT,
    Zone Cost 14 FLOAT,
    Zone Cost 15 FLOAT,
    Zone Cost 16 FLOAT,
    sent BOOLEAN NOT NULL,
    DateSent DATETIME
);

CREATE INDEX Company name ON data table (Company name);
CREATE INDEX phone number ON data table (phone number);
CREATE INDEX Reference ON data table (Company name, phone number);
CREATE INDEX selected ON data table (sent);

-- Table: ink and paper color
CREATE TABLE ink and paper color (
    Paper color VARCHAR(50),
    Ink color VARCHAR(50),
    zone number VARCHAR(255),
    zone date DATETIME,
    company name VARCHAR(50),
    phone number VARCHAR(50)
);

CREATE INDEX company name ON ink and paper color (company name);
CREATE INDEX Reference1 ON ink and paper color (company name, phone number);

-- Table: main_table
CREATE TABLE main_table (
    Company Name VARCHAR(50),
    ID INTEGER,
    reminder merchant INTEGER,
    Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    fax number VARCHAR(50),
    phone number VARCHAR(50),
    toggle button VARCHAR(50),
    type of business VARCHAR(100),
    active BOOLEAN NOT NULL,
    sent BOOLEAN NOT NULL,
    CustomerID INTEGER NOT NULL,
    Do not Bank Bill BOOLEAN NOT NULL,
    Bank Help Notice BOOLEAN NOT NULL,
    sentdate DATETIME
);

CREATE INDEX Company Name ON main_table (Company Name);
CREATE INDEX CustomerID ON main_table (CustomerID);
CREATE INDEX selected ON main_table (sent);

-- Table: months
CREATE TABLE months (
    Month Number INTEGER,
    Month Name VARCHAR(50)
);


-- Table: NotBankBillable
CREATE TABLE NotBankBillable (
    Balance due FLOAT,
    zoning date DATETIME,
    Company Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER,
    Zone 13 INTEGER,
    Zone 14 INTEGER,
    Zone 15 INTEGER,
    Do not Bank Bill BOOLEAN NOT NULL,
    nName VARCHAR(50),
    Serious VARCHAR(255),
    Selected VARCHAR(255)
);


-- Table: old_data table as of 10/22/95
CREATE TABLE old_data table as of 10/22/95 (
    ID INTEGER,
    Company name VARCHAR(255),
    zoning date DATETIME,
    Cost for this month FLOAT,
    Balance due FLOAT,
    Check number 1 VARCHAR(255),
    Check amount 1 FLOAT,
    Date check was received 1 VARCHAR(255),
    Check number 2 VARCHAR(255),
    Check amount 2 FLOAT,
    Date check was received 2 VARCHAR(255),
    Check number 3 VARCHAR(255),
    Check amount 3 FLOAT,
    Date check was received 3 VARCHAR(255),
    Check number 4 VARCHAR(255),
    Check amount 4 FLOAT,
    Date check was received 4 VARCHAR(255),
    Amount Paid FLOAT,
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER,
    Zone Cost 1 FLOAT,
    Zone Cost 2 FLOAT,
    Zone Cost 3 FLOAT,
    Zone Cost 4 FLOAT,
    Zone Cost 5 FLOAT,
    Zone Cost 6 FLOAT,
    Zone Cost 7 FLOAT,
    Zone Cost 8 FLOAT,
    Zone Cost 9 FLOAT,
    Zone Cost 10 FLOAT,
    Zone Cost 11 FLOAT,
    Zone Cost 12 FLOAT
);


-- Table: old_ink and paper color as of 10/22/95
CREATE TABLE old_ink and paper color as of 10/22/95 (
    Paper color VARCHAR(255),
    Ink color VARCHAR(255),
    zone number VARCHAR(255),
    zone date DATETIME,
    company name VARCHAR(255),
    id INTEGER
);


-- Table: old_main as of 10/22/95
CREATE TABLE old_main as of 10/22/95 (
    ID INTEGER,
    Company Name VARCHAR(255),
    reminder merchant INTEGER,
    Name VARCHAR(255),
    Street Address VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    Zip code VARCHAR(255),
    fax number VARCHAR(255),
    phone number VARCHAR(255),
    toggle button VARCHAR(255),
    type of business VARCHAR(255)
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

CREATE INDEX Company name ON reminder_table (company_name);
CREATE INDEX phone number ON reminder_table (phone_number);

-- Table: T053000A
CREATE TABLE T053000A (
    Field1 VARCHAR(255),
    Field2 VARCHAR(255),
    Field3 INTEGER,
    Field4 VARCHAR(255),
    Field5 VARCHAR(255),
    Field6 VARCHAR(255),
    Field7 VARCHAR(255),
    Field8 VARCHAR(255)
);


-- Table: tblOverdueReports2030
CREATE TABLE tblOverdueReports2030 (
    Balance due FLOAT,
    zoning date DATETIME,
    Company Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER,
    Zone 13 INTEGER,
    Zone 14 INTEGER,
    Zone 15 INTEGER,
    Selected VARCHAR(255)
);


-- Table: tblOverdueReports2030_9/29/97
CREATE TABLE tblOverdueReports2030_9/29/97 (
    Selected VARCHAR(255),
    Balance due FLOAT,
    zoning date DATETIME,
    Company Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER
);


-- Table: tblOverdueReports2030used
CREATE TABLE tblOverdueReports2030used (
    Selected VARCHAR(255),
    Balance due FLOAT,
    zoning date DATETIME,
    Company Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER
);


-- Table: tblOverdueReports3145
CREATE TABLE tblOverdueReports3145 (
    Balance due FLOAT,
    zoning date DATETIME,
    Company Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER,
    Zone 13 INTEGER,
    Zone 14 INTEGER,
    Zone 15 INTEGER,
    Selected VARCHAR(255)
);


-- Table: tblOverdueReports3145used
CREATE TABLE tblOverdueReports3145used (
    Selected VARCHAR(255),
    Balance due FLOAT,
    zoning date DATETIME,
    Company Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER
);


-- Table: tblOverdueReports4689
CREATE TABLE tblOverdueReports4689 (
    Balance due FLOAT,
    zoning date DATETIME,
    Company Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER,
    Zone 13 INTEGER,
    Zone 14 INTEGER,
    Zone 15 INTEGER,
    Selected VARCHAR(255)
);


-- Table: tblOverdueReports4689used
CREATE TABLE tblOverdueReports4689used (
    Selected VARCHAR(255),
    Balance due FLOAT,
    zoning date DATETIME,
    Company Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER
);


-- Table: tblOverdueReports90
CREATE TABLE tblOverdueReports90 (
    Balance due FLOAT,
    zoning date DATETIME,
    Company Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER,
    Zone 13 INTEGER,
    Zone 14 INTEGER,
    Zone 15 INTEGER,
    Selected VARCHAR(255),
    Serious VARCHAR(255)
);


-- Table: tblOverdueReports90SeriousReports
CREATE TABLE tblOverdueReports90SeriousReports (
    Selected VARCHAR(255),
    Serious VARCHAR(255),
    Balance due FLOAT,
    zoning date DATETIME,
    Company Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER
);


-- Table: tblOverdueReports90used
CREATE TABLE tblOverdueReports90used (
    Selected VARCHAR(255),
    Serious VARCHAR(255),
    Balance due FLOAT,
    zoning date DATETIME,
    Company Name VARCHAR(50),
    Street Address VARCHAR(50),
    City VARCHAR(50),
    State VARCHAR(2),
    Zip code VARCHAR(50),
    Zone 1 INTEGER,
    Zone 2 INTEGER,
    Zone 3 INTEGER,
    Zone 4 INTEGER,
    Zone 5 INTEGER,
    Zone 6 INTEGER,
    Zone 7 INTEGER,
    Zone 8 INTEGER,
    Zone 9 INTEGER,
    Zone 10 INTEGER,
    Zone 11 INTEGER,
    Zone 12 INTEGER
);


-- Table: temp table
CREATE TABLE temp table (
    ID INTEGER NOT NULL,
    Month VARCHAR(50),
    Zone VARCHAR(50),
    Year VARCHAR(50)
);


-- Table: tempdate
CREATE TABLE tempdate (
    ID INTEGER NOT NULL,
    tempdate DATETIME
);


-- Table: zonecost
CREATE TABLE zonecost (
    zonecost INTEGER
);


-- Table: zones
CREATE TABLE zones (
    zone VARCHAR(50),
    order INTEGER
);


