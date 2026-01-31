FROM postgres:9.5
COPY ./docker-entrypoint-initdb.d/createDB.sql /docker-entrypoint-initdb.d/createDB.sql
COPY ./data_example /data_example
