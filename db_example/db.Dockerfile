FROM postgres:latest
COPY ./docker-entrypoint-initdb.d/createDB.sql /docker-entrypoint-initdb.d/createDB.sql
COPY ./data_example /data_example
