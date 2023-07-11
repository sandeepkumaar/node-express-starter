#!/bin/sh
curl http://localhost:8000/user/create \
  -H "Content-Type: application/json" \
  -d '{ "name": "sandeep"}' 


