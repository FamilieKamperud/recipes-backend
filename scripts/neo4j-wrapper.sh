#!/bin/bash
type neo4j >/dev/null 2>&1 || { echo >&2 "I require neo4j but it's not installed.  Download from https://neo4j.com/."; exit 1; }

trap 'killall' INT

killall() {
  echo "Stopping neo4j"
  neo4j stop
}

echo "Starting neo4j"
neo4j start
cat # wait forever
