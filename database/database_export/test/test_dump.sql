--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: NotBankBillable; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."NotBankBillable" (
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Do not Bank Bill" boolean,
    "nName" text,
    "Serious" double precision,
    "Selected" integer
);


--
-- Name: T053000A; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."T053000A" (
    "Field1" integer,
    "Field2" text,
    "Field3" integer,
    "Field4" text,
    "Field5" text,
    "Field6" text,
    "Field7" double precision,
    "Field8" text
);


--
-- Name: bankbillable; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bankbillable (
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Do not Bank Bill" boolean,
    "nName" text,
    "Serious" double precision,
    "Selected" integer
);


--
-- Name: city names; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."city names" (
    "city name" text
);


--
-- Name: city_names; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.city_names (
    city_name character varying(50)
);


--
-- Name: data table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."data table" (
    "Company name" text,
    "phone number" integer,
    "zoning date" text,
    "Cost for this month" double precision,
    "Balance due" double precision,
    "Check number 1" text,
    "Check amount 1" double precision,
    "Date check was received 1" text,
    "Check number 2" text,
    "Check amount 2" double precision,
    "Date check was received 2" text,
    "Check number 3" text,
    "Check amount 3" double precision,
    "Date check was received 3" text,
    "Check number 4" text,
    "Check amount 4" double precision,
    "Date check was received 4" text,
    "Amount Paid" double precision,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Zone 16" double precision,
    "Zone Cost 1" double precision,
    "Zone Cost 2" double precision,
    "Zone Cost 3" double precision,
    "Zone Cost 4" double precision,
    "Zone Cost 5" double precision,
    "Zone Cost 6" double precision,
    "Zone Cost 7" double precision,
    "Zone Cost 8" double precision,
    "Zone Cost 9" double precision,
    "Zone Cost 10" double precision,
    "Zone Cost 11" double precision,
    "Zone Cost 12" double precision,
    "Zone Cost 13" double precision,
    "Zone Cost 14" double precision,
    "Zone Cost 15" double precision,
    "Zone Cost 16" double precision,
    sent boolean,
    "DateSent" text
);


--
-- Name: data table Without Matching main_table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."data table Without Matching main_table" (
    "Company name" text,
    "phone number" text,
    "zoning date" text,
    "Cost for this month" text,
    "Balance due" text,
    "Check number 1" text,
    "Check amount 1" text,
    "Date check was received 1" text,
    "Check number 2" text,
    "Check amount 2" text,
    "Date check was received 2" text,
    "Check number 3" text,
    "Check amount 3" text,
    "Date check was received 3" text,
    "Check number 4" text,
    "Check amount 4" text,
    "Date check was received 4" text,
    "Amount Paid" text,
    "Zone 1" text,
    "Zone 2" text,
    "Zone 3" text,
    "Zone 4" text,
    "Zone 5" text,
    "Zone 6" text,
    "Zone 7" text,
    "Zone 8" text,
    "Zone 9" text,
    "Zone 10" text,
    "Zone 11" text,
    "Zone 12" text,
    "Zone 13" text,
    "Zone 14" text,
    "Zone 15" text,
    "Zone 16" text,
    "Zone Cost 1" text,
    "Zone Cost 2" text,
    "Zone Cost 3" text,
    "Zone Cost 4" text,
    "Zone Cost 5" text,
    "Zone Cost 6" text,
    "Zone Cost 7" text,
    "Zone Cost 8" text,
    "Zone Cost 9" text,
    "Zone Cost 10" text,
    "Zone Cost 11" text,
    "Zone Cost 12" text,
    "Zone Cost 13" text,
    "Zone Cost 14" text,
    "Zone Cost 15" text,
    "Zone Cost 16" text,
    sent text
);


--
-- Name: data_table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.data_table (
    company_name character varying(50),
    phone_number character varying(50),
    zoning_date timestamp without time zone,
    cost_for_this_month double precision,
    balance_due double precision,
    check_number_1 character varying(50),
    check_amount_1 double precision,
    date_check_received_1 timestamp without time zone,
    check_number_2 character varying(50),
    check_amount_2 double precision,
    date_check_received_2 timestamp without time zone,
    check_number_3 character varying(50),
    check_amount_3 double precision,
    date_check_received_3 timestamp without time zone,
    check_number_4 character varying(50),
    check_amount_4 double precision,
    date_check_received_4 timestamp without time zone,
    amount_paid double precision,
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer,
    zone_13 integer,
    zone_14 integer,
    zone_15 integer,
    zone_16 integer,
    zone_cost_1 double precision,
    zone_cost_2 double precision,
    zone_cost_3 double precision,
    zone_cost_4 double precision,
    zone_cost_5 double precision,
    zone_cost_6 double precision,
    zone_cost_7 double precision,
    zone_cost_8 double precision,
    zone_cost_9 double precision,
    zone_cost_10 double precision,
    zone_cost_11 double precision,
    zone_cost_12 double precision,
    zone_cost_13 double precision,
    zone_cost_14 double precision,
    zone_cost_15 double precision,
    zone_cost_16 double precision,
    sent boolean NOT NULL,
    date_sent timestamp without time zone
);


--
-- Name: ink and paper color; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ink and paper color" (
    "Paper color" text,
    "Ink color" text,
    "zone number" integer,
    "zone date" text,
    "company name" text,
    "phone number" integer
);


--
-- Name: ink_and_paper_color; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ink_and_paper_color (
    paper_color character varying(50),
    ink_color character varying(50),
    zone_number character varying(255),
    zone_date timestamp without time zone,
    company_name character varying(50),
    phone_number character varying(50)
);


--
-- Name: main; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.main (
    "Company Name" text,
    "CustomerID" integer,
    "ID" double precision,
    "reminder merchant" double precision,
    "Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" double precision,
    "fax number" double precision,
    "phone number" integer,
    "toggle button" double precision,
    "type of business" text,
    active boolean,
    sent boolean,
    "CustomerID.1" integer,
    "Do not Bank Bill" boolean,
    "Bank Help Notice" boolean,
    sentdate text,
    "nName" text
);


--
-- Name: main_table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.main_table (
    company_name character varying(50),
    id integer,
    reminder_merchant integer,
    name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    fax_number character varying(50),
    phone_number character varying(50),
    toggle_button character varying(50),
    type_of_business character varying(100),
    active boolean NOT NULL,
    sent boolean NOT NULL,
    customer_id integer NOT NULL,
    do_not_bank_bill boolean NOT NULL,
    bank_help_notice boolean NOT NULL,
    sent_date timestamp without time zone
);


--
-- Name: months; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.months (
    month_number integer,
    month_name character varying(50)
);


--
-- Name: notbankbillable; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notbankbillable (
    balance_due double precision,
    zoning_date timestamp without time zone,
    company_name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer,
    zone_13 integer,
    zone_14 integer,
    zone_15 integer,
    do_not_bank_bill boolean NOT NULL,
    name character varying(50),
    serious character varying(255),
    selected character varying(255)
);


--
-- Name: old_data_table_as_of_10_22_95; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.old_data_table_as_of_10_22_95 (
    id integer,
    company_name character varying(255),
    zoning_date timestamp without time zone,
    cost_for_this_month double precision,
    balance_due double precision,
    check_number_1 character varying(255),
    check_amount_1 double precision,
    date_check_received_1 character varying(255),
    check_number_2 character varying(255),
    check_amount_2 double precision,
    date_check_received_2 character varying(255),
    check_number_3 character varying(255),
    check_amount_3 double precision,
    date_check_received_3 character varying(255),
    check_number_4 character varying(255),
    check_amount_4 double precision,
    date_check_received_4 character varying(255),
    amount_paid double precision,
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer,
    zone_cost_1 double precision,
    zone_cost_2 double precision,
    zone_cost_3 double precision,
    zone_cost_4 double precision,
    zone_cost_5 double precision,
    zone_cost_6 double precision,
    zone_cost_7 double precision,
    zone_cost_8 double precision,
    zone_cost_9 double precision,
    zone_cost_10 double precision,
    zone_cost_11 double precision,
    zone_cost_12 double precision
);


--
-- Name: old_ink_and_paper_color_as_of_10_22_95; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.old_ink_and_paper_color_as_of_10_22_95 (
    paper_color character varying(255),
    ink_color character varying(255),
    zone_number character varying(255),
    zone_date timestamp without time zone,
    company_name character varying(255),
    id integer
);


--
-- Name: old_main_as_of_10_22_95; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.old_main_as_of_10_22_95 (
    id integer,
    company_name character varying(255),
    reminder_merchant integer,
    name character varying(255),
    street_address character varying(255),
    city character varying(255),
    state character varying(255),
    zip_code character varying(255),
    fax_number character varying(255),
    phone_number character varying(255),
    toggle_button character varying(255),
    type_of_business character varying(255)
);


--
-- Name: past due accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."past due accounts" (
    "Company Name" text,
    "zoning date" text,
    "Cost for this month" double precision,
    "Balance due" double precision,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision
);


--
-- Name: qryReport2030; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."qryReport2030" (
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" integer,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Selected" integer
);


--
-- Name: qryReport3145; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."qryReport3145" (
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Selected" integer
);


--
-- Name: qryReport4689; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."qryReport4689" (
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" integer,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Selected" integer,
    "Selected.1" integer
);


--
-- Name: qryReport90; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."qryReport90" (
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Selected" integer,
    "Serious" double precision
);


--
-- Name: qryReportSeriousFromSmallClaims; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."qryReportSeriousFromSmallClaims" (
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Do not Bank Bill" boolean,
    "nName" text,
    "Serious" double precision,
    "Selected" double precision
);


--
-- Name: qry_Zone Rollup; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."qry_Zone Rollup" (
    "zoning date" text,
    "Zone Cost" double precision
);


--
-- Name: qry_mailing label backup; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."qry_mailing label backup" (
    "Expr1" integer,
    "zoning date" text,
    "Balance due" double precision,
    "Company Name" text,
    "reminder merchant" double precision,
    "Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer
);


--
-- Name: reminder merchant query; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."reminder merchant query" (
    "Company Name" text,
    "Name" text,
    "phone number" integer,
    "reminder merchant" integer,
    "type of business" text
);


--
-- Name: reminder_table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reminder_table (
    company_name character varying(50),
    phone_number character varying(50),
    contact_name character varying(50),
    type_of_business character varying(50),
    zone character varying(50),
    month_date timestamp without time zone,
    information character varying(10485760),
    city character varying(50),
    state character varying(50),
    zip character varying(50),
    street character varying(50),
    key integer NOT NULL
);


--
-- Name: t053000a; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.t053000a (
    field1 character varying(255),
    field2 character varying(255),
    field3 integer,
    field4 character varying(255),
    field5 character varying(255),
    field6 character varying(255),
    field7 character varying(255),
    field8 character varying(255)
);


--
-- Name: tblOverdueReports2030; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tblOverdueReports2030" (
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Selected" integer
);


--
-- Name: tblOverdueReports2030used; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tblOverdueReports2030used" (
    "Selected" integer,
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" integer,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision
);


--
-- Name: tblOverdueReports3145; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tblOverdueReports3145" (
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Selected" integer
);


--
-- Name: tblOverdueReports3145used; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tblOverdueReports3145used" (
    "Selected" integer,
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" double precision,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision
);


--
-- Name: tblOverdueReports4689; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tblOverdueReports4689" (
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" integer,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Selected" integer
);


--
-- Name: tblOverdueReports4689used; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tblOverdueReports4689used" (
    "Selected" integer,
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision
);


--
-- Name: tblOverdueReports90; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tblOverdueReports90" (
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision,
    "Zone 13" double precision,
    "Zone 14" double precision,
    "Zone 15" double precision,
    "Selected" integer,
    "Serious" double precision
);


--
-- Name: tblOverdueReports90SeriousReports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tblOverdueReports90SeriousReports" (
    "Selected" text,
    "Serious" text,
    "Balance due" text,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" text,
    "Zone 1" text,
    "Zone 2" text,
    "Zone 3" text,
    "Zone 4" text,
    "Zone 5" text,
    "Zone 6" text,
    "Zone 7" text,
    "Zone 8" text,
    "Zone 9" text,
    "Zone 10" text,
    "Zone 11" text,
    "Zone 12" text
);


--
-- Name: tblOverdueReports90used; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."tblOverdueReports90used" (
    "Selected" integer,
    "Serious" double precision,
    "Balance due" double precision,
    "zoning date" text,
    "Company Name" text,
    "Street Address" text,
    "City" text,
    "State" text,
    "Zip code" integer,
    "Zone 1" double precision,
    "Zone 2" double precision,
    "Zone 3" double precision,
    "Zone 4" double precision,
    "Zone 5" double precision,
    "Zone 6" double precision,
    "Zone 7" double precision,
    "Zone 8" double precision,
    "Zone 9" double precision,
    "Zone 10" double precision,
    "Zone 11" double precision,
    "Zone 12" double precision
);


--
-- Name: tbloverduereports2030; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbloverduereports2030 (
    balance_due double precision,
    zoning_date timestamp without time zone,
    company_name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer,
    zone_13 integer,
    zone_14 integer,
    zone_15 integer,
    selected character varying(255)
);


--
-- Name: tbloverduereports2030_9_29_97; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbloverduereports2030_9_29_97 (
    selected character varying(255),
    balance_due double precision,
    zoning_date timestamp without time zone,
    company_name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer
);


--
-- Name: tbloverduereports2030used; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbloverduereports2030used (
    selected character varying(255),
    balance_due double precision,
    zoning_date timestamp without time zone,
    company_name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer
);


--
-- Name: tbloverduereports3145; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbloverduereports3145 (
    balance_due double precision,
    zoning_date timestamp without time zone,
    company_name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer,
    zone_13 integer,
    zone_14 integer,
    zone_15 integer,
    selected character varying(255)
);


--
-- Name: tbloverduereports3145used; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbloverduereports3145used (
    selected character varying(255),
    balance_due double precision,
    zoning_date timestamp without time zone,
    company_name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer
);


--
-- Name: tbloverduereports4689; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbloverduereports4689 (
    balance_due double precision,
    zoning_date timestamp without time zone,
    company_name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer,
    zone_13 integer,
    zone_14 integer,
    zone_15 integer,
    selected character varying(255)
);


--
-- Name: tbloverduereports4689used; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbloverduereports4689used (
    selected character varying(255),
    balance_due double precision,
    zoning_date timestamp without time zone,
    company_name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer
);


--
-- Name: tbloverduereports90; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbloverduereports90 (
    balance_due double precision,
    zoning_date timestamp without time zone,
    company_name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer,
    zone_13 integer,
    zone_14 integer,
    zone_15 integer,
    selected character varying(255),
    serious character varying(255)
);


--
-- Name: tbloverduereports90seriousreports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbloverduereports90seriousreports (
    selected character varying(255),
    serious character varying(255),
    balance_due double precision,
    zoning_date timestamp without time zone,
    company_name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer
);


--
-- Name: tbloverduereports90used; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tbloverduereports90used (
    selected character varying(255),
    serious character varying(255),
    balance_due double precision,
    zoning_date timestamp without time zone,
    company_name character varying(50),
    street_address character varying(50),
    city character varying(50),
    state character varying(2),
    zip_code character varying(50),
    zone_1 integer,
    zone_2 integer,
    zone_3 integer,
    zone_4 integer,
    zone_5 integer,
    zone_6 integer,
    zone_7 integer,
    zone_8 integer,
    zone_9 integer,
    zone_10 integer,
    zone_11 integer,
    zone_12 integer
);


--
-- Name: temp table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."temp table" (
    "ID" integer,
    "Month" integer,
    "Zone" integer,
    "Year" integer
);


--
-- Name: temp_table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.temp_table (
    id integer NOT NULL,
    month character varying(50),
    zone character varying(50),
    year character varying(50)
);


--
-- Name: tempdate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tempdate (
    id integer NOT NULL,
    temp_date timestamp without time zone
);


--
-- Name: zonecost; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.zonecost (
    zone_cost integer
);


--
-- Name: zones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.zones (
    zone character varying(50),
    zone_order integer
);


--
-- PostgreSQL database dump complete
--

