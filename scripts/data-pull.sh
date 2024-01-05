#!/bin/bash
POSTGRES_USER="default"
POSTGRES_USER_LOCAL=$USER
POSTGRES_HOST="ep-black-lab-41931945-pooler.us-east-1.postgres.vercel-storage.com"
POSTGRES_PASSWORD="1XAK3n7ZTzdaW2"
POSTGRES_DATABASE="verceldb"
POSTGRES_DATABASE_LOCAL="webaas_development"

# source .env.local
echo "USERNAME IS $POSTGRES_USER_LOCAL"

pg_dump --username=$POSTGRES_USER --host=$POSTGRES_HOST --dbname=$POSTGRES_DATABASE --file=./postgres_dump.sql;

sed "s/\<default\>/$POSTGRES_USER_LOCAL/g" ./postgres_dump.sql > modified_postgres_dump.sql

psql template1 -c "drop database webaas_development";

psql template1 -c "create database webaas_development";

psql -U $POSTGRES_USER_LOCAL -d $POSTGRES_DATABASE_LOCAL < ./modified_postgres_dump.sql;

rm -rf ./modified_postgres_dump.sql ./postgres_dump.sql

# This script exports data from a production PostgreSQL database, modifies 
# the dump to use a local user, drops and recreates the local development
# database, and imports the modified dump into the local database.
