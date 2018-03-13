--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.3

-- Started on 2018-03-13 20:52:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2817 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 197 (class 1259 OID 16406)
-- Name: id_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 5000
    CACHE 1;


ALTER TABLE public.id_sequence OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 16394)
-- Name: mails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mails (
    id smallint DEFAULT nextval('public.id_sequence'::regclass) NOT NULL,
    adress character(100),
    topic character(50),
    user_id integer NOT NULL
);


ALTER TABLE public.mails OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16421)
-- Name: mails_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mails_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mails_user_id_seq OWNER TO postgres;

--
-- TOC entry 2818 (class 0 OID 0)
-- Dependencies: 200
-- Name: mails_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mails_user_id_seq OWNED BY public.mails.user_id;


--
-- TOC entry 198 (class 1259 OID 16409)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id smallint NOT NULL,
    name character(100),
    surname character(512)
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16412)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 2819 (class 0 OID 0)
-- Dependencies: 199
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 2680 (class 2604 OID 16423)
-- Name: mails user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mails ALTER COLUMN user_id SET DEFAULT nextval('public.mails_user_id_seq'::regclass);


--
-- TOC entry 2681 (class 2604 OID 16414)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2805 (class 0 OID 16394)
-- Dependencies: 196
-- Data for Name: mails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mails (id, adress, topic, user_id) FROM stdin;
9	cosktos@gmial                                                                                       	blacharz                                          	1
\.


--
-- TOC entry 2807 (class 0 OID 16409)
-- Dependencies: 198
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, surname) FROM stdin;
\.


--
-- TOC entry 2820 (class 0 OID 0)
-- Dependencies: 197
-- Name: id_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.id_sequence', 9, true);


--
-- TOC entry 2821 (class 0 OID 0)
-- Dependencies: 200
-- Name: mails_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mails_user_id_seq', 1, false);


--
-- TOC entry 2822 (class 0 OID 0)
-- Dependencies: 199
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- TOC entry 2683 (class 2606 OID 16398)
-- Name: mails mails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mails
    ADD CONSTRAINT mails_pkey PRIMARY KEY (id);


-- Completed on 2018-03-13 20:52:02

--
-- PostgreSQL database dump complete
--

