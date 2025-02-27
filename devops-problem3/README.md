# NGINX Load Balancer Memory Usage Troubleshooting Guide

## Overview

This guide provides a systematic approach to troubleshoot high memory usage (99%) on an Ubuntu 24.04 VM running NGINX as a load balancer.

## Initial Assessment

### 1. Check Overall System Health

```bash
# Check CPU and memory usage dynamically
htop

# Alternative using top
top

# Check memory usage
free -h

# List processes consuming the most memory
ps aux --sort=-%mem | head -n 10

# Check swap usage
swapon --summary

# Check system uptime and load averages
uptime
```

### 2. Identify Root Causes

#### Cause 1: NGINX Memory Leak or High Connection Load

```bash
# Check NGINX processes and memory usage
ps aux | grep nginx

# View current NGINX connections
ss -ant | grep :80
ss -ant | grep :443

# Check the number of active connections
netstat -anp | grep nginx | wc -l

# Check NGINX error logs
tail -f /var/log/nginx/error.log

# Inspect NGINX worker processes
ps -o pid,user,%mem,command ax | grep nginx

# View NGINX configuration
nginx -T
```

## Potential Root Causes & Solutions

### 1. NGINX Worker Connections Issue

#### Symptoms

- High number of NGINX worker processes
- Large number of concurrent connections

#### Diagnosis

```bash
# Check current NGINX configuration
grep worker_connections /etc/nginx/nginx.conf
grep worker_processes /etc/nginx/nginx.conf
```

#### Solution

```bash
nginx:etc/nginx/nginx.conf
# Optimize worker settings
worker_processes auto;
worker_rlimit_nofile 65535;
worker_connections 1024;  # Adjust based on your needs

# Enable Rate Limiting (if high traffic)
limit_req_zone $binary_remote_addr zone=one:10m rate=100r/s;
```

```bash
sudo systemctl restart nginx
```

### 2. Memory Leak in NGINX Configuration

#### Symptoms

- Gradually increasing memory usage
- No memory release after traffic decrease

#### Diagnosis

```bash
# Monitor memory usage over time
watch -n 1 'free -h'

# Check NGINX access patterns
tail -f /var/log/nginx/access.log | grep -v "health-check"
```

#### Solution

```bash
nginx:etc/nginx/nginx.conf
# Add buffer size limitations
client_body_buffer_size 10K;
client_header_buffer_size 1k;
client_max_body_size 8m;
large_client_header_buffers 2 1k;
```

```bash
sudo systemctl restart nginx
```

### 3. Memory Swapping

#### Symptoms

- High swap usage
- System-wide slowness

#### Diagnosis

```bash
# Check swap usage
swapon --show
free -h

# Check system memory stats
vmstat 1

# View processes by memory usage
ps aux --sort=-%mem | head -n 10
```

#### Solution

```bash
# Add or adjust swap space if needed
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

```bash
# Reduce Swappiness (Long-Term Optimization)
sudo sysctl vm.swappiness=10
```

### 4. System Resource Leak (Zombie Processes or Memory Fragmentation)

#### Symptoms

- High memory usage, but NGINX is not the sole cause
- Many zombie (defunct) processes.
- Memory usage does not drop even after restarting NGINX.

#### Diagnosis

```bash
# Check for zombie processes
ps aux | grep Z

# Check system memory fragmentation
cat /proc/meminfo | grep "Slab|SReclaimable"

# Analyze process tree
pstree -p
```

#### Solution

```bash
# Kill defunct processes
kill -9 <PID>

# Clear unused memory allocations
sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches
```

## Recovery Actions

### Short-term Solutions

- Restart NGINX, clear memory caches, kill zombie processes

### Mid-term Solutions

- Adjust NGINX worker settings, add swap space, limit high connection rates

### Long-term Solutions

- Scale the VM, implement resource limits, monitor logs, set up auto-restart for NGINX failures
