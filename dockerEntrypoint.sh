#!/bin/bash

if [ $NODE_ENV = "development" ]; then
  echo "Running Node for development"
  npm run dev
else
  echo "Running Node for production"
  npm start
fi
