--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: items; Type: TABLE; Schema: public; Owner: wmiller; Tablespace: 
--

CREATE TABLE items (
    id integer NOT NULL,
    url character varying(200),
    type character varying(200)
);


ALTER TABLE public.items OWNER TO wmiller;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: wmiller
--

CREATE SEQUENCE items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO wmiller;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wmiller
--

ALTER SEQUENCE items_id_seq OWNED BY items.id;


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wmiller
--

SELECT pg_catalog.setval('items_id_seq', 5, true);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: wmiller
--

ALTER TABLE ONLY items ALTER COLUMN id SET DEFAULT nextval('items_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: wmiller
--

COPY items (id, url, type) FROM stdin;
1	http://www.youtube.com/embed/f0SrZh32GcQ	video
2	http://player.vimeo.com/video/65976376	video
3	http://girlgeekstoronto.com/wp-content/uploads/2012/11/AngelHack-Toronto-logo-450px.png	picture
4	http://www.auby.no/files/video_tests/h264_720p_mp_3.1_3mbps_aac_shrinkage.mp4	mp4
5	http://www.tools4movies.com/dvd_catalyst_profile_samples/Harold%20Kumar%203%20Christmas%20bionic.mp4	mp4
\.


--
-- Name: public; Type: ACL; Schema: -; Owner: wmiller
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM wmiller;
GRANT ALL ON SCHEMA public TO wmiller;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

