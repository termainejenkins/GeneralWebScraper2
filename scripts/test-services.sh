#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Base URL for services
BASE_URL="http://localhost"

# Function to check service health
check_health() {
    local service=$1
    local port=$2
    echo "Checking health of $service..."
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL:$port/health")
    if [ "$response" == "200" ]; then
        echo -e "${GREEN}✓ $service is healthy${NC}"
        return 0
    else
        echo -e "${RED}✗ $service health check failed${NC}"
        return 1
    fi
}

# Function to test auth service
test_auth() {
    echo "Testing Auth Service..."
    
    # Register a new user
    echo "Registering test user..."
    register_response=$(curl -s -X POST -H "Content-Type: application/json" \
        -d '{"email":"test@example.com","password":"test123"}' \
        "$BASE_URL:3003/api/auth/register")
    
    if [[ $register_response == *"email"* ]]; then
        echo -e "${GREEN}✓ User registration successful${NC}"
    else
        echo -e "${RED}✗ User registration failed${NC}"
        return 1
    fi
    
    # Login
    echo "Testing login..."
    login_response=$(curl -s -X POST -H "Content-Type: application/json" \
        -d '{"email":"test@example.com","password":"test123"}' \
        "$BASE_URL:3003/api/auth/login")
    
    if [[ $login_response == *"token"* ]]; then
        echo -e "${GREEN}✓ Login successful${NC}"
        TOKEN=$(echo $login_response | jq -r '.token')
    else
        echo -e "${RED}✗ Login failed${NC}"
        return 1
    fi
    
    # Test protected endpoint
    echo "Testing protected endpoint..."
    profile_response=$(curl -s -H "Authorization: Bearer $TOKEN" \
        "$BASE_URL:3003/api/auth/profile")
    
    if [[ $profile_response == *"email"* ]]; then
        echo -e "${GREEN}✓ Protected endpoint access successful${NC}"
    else
        echo -e "${RED}✗ Protected endpoint access failed${NC}"
        return 1
    fi
}

# Function to test proxy service
test_proxy() {
    echo "Testing Proxy Service..."
    
    # Add a test proxy
    echo "Adding test proxy..."
    proxy_response=$(curl -s -X POST -H "Content-Type: application/json" \
        -d '{"host":"test.proxy.com","port":8080,"isActive":true}' \
        "$BASE_URL:3002/api/proxies")
    
    if [[ $proxy_response == *"id"* ]]; then
        echo -e "${GREEN}✓ Proxy addition successful${NC}"
        PROXY_ID=$(echo $proxy_response | jq -r '.id')
    else
        echo -e "${RED}✗ Proxy addition failed${NC}"
        return 1
    fi
    
    # Get all proxies
    echo "Getting all proxies..."
    proxies_response=$(curl -s "$BASE_URL:3002/api/proxies")
    
    if [[ $proxies_response == *"id"* ]]; then
        echo -e "${GREEN}✓ Get proxies successful${NC}"
    else
        echo -e "${RED}✗ Get proxies failed${NC}"
        return 1
    fi
}

# Function to test job board service
test_job_board() {
    echo "Testing Job Board Service..."
    
    # Add a test job board
    echo "Adding test job board..."
    job_board_response=$(curl -s -X POST -H "Content-Type: application/json" \
        -d '{"name":"Test Board","url":"https://example.com/jobs","selectors":{"title":".job-title","company":".company-name"}}' \
        "$BASE_URL:3001/api/job-boards")
    
    if [[ $job_board_response == *"id"* ]]; then
        echo -e "${GREEN}✓ Job board addition successful${NC}"
        BOARD_ID=$(echo $job_board_response | jq -r '.id')
    else
        echo -e "${RED}✗ Job board addition failed${NC}"
        return 1
    fi
    
    # Get all job boards
    echo "Getting all job boards..."
    boards_response=$(curl -s "$BASE_URL:3001/api/job-boards")
    
    if [[ $boards_response == *"id"* ]]; then
        echo -e "${GREEN}✓ Get job boards successful${NC}"
    else
        echo -e "${RED}✗ Get job boards failed${NC}"
        return 1
    fi
}

# Function to test amazon service
test_amazon() {
    echo "Testing Amazon Service..."
    
    # Search for products
    echo "Searching for products..."
    search_response=$(curl -s "$BASE_URL:3002/api/amazon/search?query=test")
    
    if [[ $search_response == *"asin"* ]]; then
        echo -e "${GREEN}✓ Product search successful${NC}"
    else
        echo -e "${RED}✗ Product search failed${NC}"
        return 1
    fi
}

# Main test execution
echo "Starting service tests..."

# Check health of all services
check_health "job-board" "3001" || exit 1
check_health "amazon" "3002" || exit 1
check_health "proxy" "3002" || exit 1
check_health "auth" "3003" || exit 1

# Run service tests
test_auth || exit 1
test_proxy || exit 1
test_job_board || exit 1
test_amazon || exit 1

echo -e "${GREEN}All tests completed successfully!${NC}" 