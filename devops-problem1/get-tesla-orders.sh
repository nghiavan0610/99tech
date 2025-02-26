#!/bin/bash

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "Error: .env file not found"
  exit 1
fi

if [ -z "$API_URL" ]; then
  echo "Error: API_URL not set in .env file"
  exit 1
fi

OUTPUT_FILE="./data/output.txt"

# Clear any existing output file
> $OUTPUT_FILE

# Process the transaction
grep -E '"symbol": "TSLA".*"side": "sell"' ./data/transaction-log.txt | 
grep -o '"order_id": "[^"]*' | 
cut -d'"' -f4 | 
xargs -I{} sh -c 'curl -s "'$API_URL'/{}" >> '$OUTPUT_FILE

echo "Completed processing TSLA sell orders. Results saved to $OUTPUT_FILE"