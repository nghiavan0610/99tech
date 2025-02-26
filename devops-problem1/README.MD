# Tesla Orders Processing

This repository contains scripts and instructions for processing Tesla (TSLA) sell orders from a transaction log and submitting HTTP GET requests to retrieve order details.

## Options for Processing TSLA Sell Orders

### Option 1: Single CLI Command

You can process TSLA sell orders using a single command in your terminal. This command will extract the order IDs for TSLA sell orders from the `transaction-log.txt` file and submit HTTP GET requests to `https://example.com/api/:order_id`, saving the output to `./data/output.txt`.

Run the following command in your terminal:

```bash
grep -E '"symbol": "TSLA".*"side": "sell"' ./data/transaction-log.txt |
grep -o '"order_id": "[^"]*' |
cut -d'"' -f4 |
xargs -I{} sh -c 'curl -s "https://example.com/api/{}" >> ./data/output.txt'
```

### Option 2: Use the Provided Shell Script

Alternatively, you can use the provided shell script `get-tesla-orders.sh` to automate the process. This script reads the `.env` file for the API URL and processes the transaction log.

#### Steps to Use the Shell Script:

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. **Ensure the `.env` file is set up correctly**: The `.env` file should contain the following line:

   ```
   API_URL=https://example.com/api
   ```

3. **Run the Shell Script**: Execute the script in your terminal:

   ```bash
   ./get-tesla-orders.sh
   ```

   This will process the TSLA sell orders and save the results to `./data/output.txt`.

### Notes

- Ensure you have the necessary permissions to execute the shell script. You may need to run `chmod +x get-tesla-orders.sh` to make it executable.
- Make sure that the `curl` command is installed on your system. You can install it using:

  ```bash
  sudo apt update
  sudo apt install curl
  ```

## Conclusion

You can choose either the single CLI command for a quick one-off execution or the shell script for a more automated approach. Both methods will achieve the same result of retrieving TSLA sell order details.
