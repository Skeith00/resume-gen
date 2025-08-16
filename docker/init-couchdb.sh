#!/bin/bash
set -e

# Start CouchDB in the background
/docker-entrypoint.sh "$@" &

echo "Waiting for CouchDB to be ready..."
until curl -s "http://$COUCHDB_USER:$COUCHDB_PASSWORD@localhost:5984/_up" | grep -q "ok"; do
  sleep 2
done
echo "CouchDB is up. Creating databases..."

curl -X PUT http://$COUCHDB_USER:$COUCHDB_PASSWORD@localhost:5984/_users
curl -X PUT http://$COUCHDB_USER:$COUCHDB_PASSWORD@localhost:5984/_replicator
# Create the "profiles" database if not exists
curl -X PUT http://$COUCHDB_USER:$COUCHDB_PASSWORD@localhost:5984/profiles

# Insert a sample profile
curl -X POST "http://$COUCHDB_USER:$COUCHDB_PASSWORD@localhost:5984/profiles" \
  -H "Content-Type: application/json" \
  -d '{
        "username":"smontanes",
        "name": "Sergi Montañes",
        "title": "Software Engineer",
        "location": "Australia",
        "skills": ["Go", "Java", "React", "Docker"],
        "experience": [
          {
            "company": "PriceKinetics",
            "role": "Backend Developer",
            "years": "2023-Present"
          }
        ]
      }'

wait
