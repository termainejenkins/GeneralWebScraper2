# Colors for output
$Green = [System.ConsoleColor]::Green
$Red = [System.ConsoleColor]::Red

# Base URL for services
$BaseUrl = "http://localhost"

# Function to check service health
function Check-Health {
    param (
        [string]$Service,
        [string]$Port
    )
    Write-Host "Checking health of $Service..."
    try {
        $response = Invoke-WebRequest -Uri "$BaseUrl`:$Port/health" -Method GET -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Host "✓ $Service is healthy" -ForegroundColor $Green
            return $true
        }
    }
    catch {
        Write-Host "✗ $Service health check failed" -ForegroundColor $Red
        return $false
    }
}

# Function to test auth service
function Test-Auth {
    Write-Host "Testing Auth Service..."
    
    # Register a new user
    Write-Host "Registering test user..."
    try {
        $registerBody = @{
            email = "test@example.com"
            password = "test123"
        } | ConvertTo-Json
        
        $registerResponse = Invoke-WebRequest -Uri "$BaseUrl`:3003/api/auth/register" `
            -Method POST `
            -ContentType "application/json" `
            -Body $registerBody `
            -UseBasicParsing
        
        if ($registerResponse.Content -match '"email"') {
            Write-Host "✓ User registration successful" -ForegroundColor $Green
        }
        else {
            Write-Host "✗ User registration failed" -ForegroundColor $Red
            return $false
        }
    }
    catch {
        Write-Host "✗ User registration failed: $_" -ForegroundColor $Red
        return $false
    }
    
    # Login
    Write-Host "Testing login..."
    try {
        $loginBody = @{
            email = "test@example.com"
            password = "test123"
        } | ConvertTo-Json
        
        $loginResponse = Invoke-WebRequest -Uri "$BaseUrl`:3003/api/auth/login" `
            -Method POST `
            -ContentType "application/json" `
            -Body $loginBody `
            -UseBasicParsing
        
        if ($loginResponse.Content -match '"token"') {
            Write-Host "✓ Login successful" -ForegroundColor $Green
            $token = ($loginResponse.Content | ConvertFrom-Json).token
        }
        else {
            Write-Host "✗ Login failed" -ForegroundColor $Red
            return $false
        }
    }
    catch {
        Write-Host "✗ Login failed: $_" -ForegroundColor $Red
        return $false
    }
    
    # Test protected endpoint
    Write-Host "Testing protected endpoint..."
    try {
        $profileResponse = Invoke-WebRequest -Uri "$BaseUrl`:3003/api/auth/profile" `
            -Method GET `
            -Headers @{Authorization = "Bearer $token"} `
            -UseBasicParsing
        
        if ($profileResponse.Content -match '"email"') {
            Write-Host "✓ Protected endpoint access successful" -ForegroundColor $Green
        }
        else {
            Write-Host "✗ Protected endpoint access failed" -ForegroundColor $Red
            return $false
        }
    }
    catch {
        Write-Host "✗ Protected endpoint access failed: $_" -ForegroundColor $Red
        return $false
    }
    
    return $true
}

# Function to test proxy service
function Test-Proxy {
    Write-Host "Testing Proxy Service..."
    
    # Add a test proxy
    Write-Host "Adding test proxy..."
    try {
        $proxyBody = @{
            host = "test.proxy.com"
            port = 8080
            isActive = $true
        } | ConvertTo-Json
        
        $proxyResponse = Invoke-WebRequest -Uri "$BaseUrl`:3002/api/proxies" `
            -Method POST `
            -ContentType "application/json" `
            -Body $proxyBody `
            -UseBasicParsing
        
        if ($proxyResponse.Content -match '"id"') {
            Write-Host "✓ Proxy addition successful" -ForegroundColor $Green
        }
        else {
            Write-Host "✗ Proxy addition failed" -ForegroundColor $Red
            return $false
        }
    }
    catch {
        Write-Host "✗ Proxy addition failed: $_" -ForegroundColor $Red
        return $false
    }
    
    # Get all proxies
    Write-Host "Getting all proxies..."
    try {
        $proxiesResponse = Invoke-WebRequest -Uri "$BaseUrl`:3002/api/proxies" `
            -Method GET `
            -UseBasicParsing
        
        if ($proxiesResponse.Content -match '"id"') {
            Write-Host "✓ Get proxies successful" -ForegroundColor $Green
        }
        else {
            Write-Host "✗ Get proxies failed" -ForegroundColor $Red
            return $false
        }
    }
    catch {
        Write-Host "✗ Get proxies failed: $_" -ForegroundColor $Red
        return $false
    }
    
    return $true
}

# Function to test job board service
function Test-JobBoard {
    Write-Host "Testing Job Board Service..."
    
    # Add a test job board
    Write-Host "Adding test job board..."
    try {
        $jobBoardBody = @{
            name = "Test Board"
            url = "https://example.com/jobs"
            selectors = @{
                title = ".job-title"
                company = ".company-name"
            }
        } | ConvertTo-Json
        
        $jobBoardResponse = Invoke-WebRequest -Uri "$BaseUrl`:3001/api/job-boards" `
            -Method POST `
            -ContentType "application/json" `
            -Body $jobBoardBody `
            -UseBasicParsing
        
        if ($jobBoardResponse.Content -match '"id"') {
            Write-Host "✓ Job board addition successful" -ForegroundColor $Green
        }
        else {
            Write-Host "✗ Job board addition failed" -ForegroundColor $Red
            return $false
        }
    }
    catch {
        Write-Host "✗ Job board addition failed: $_" -ForegroundColor $Red
        return $false
    }
    
    # Get all job boards
    Write-Host "Getting all job boards..."
    try {
        $boardsResponse = Invoke-WebRequest -Uri "$BaseUrl`:3001/api/job-boards" `
            -Method GET `
            -UseBasicParsing
        
        if ($boardsResponse.Content -match '"id"') {
            Write-Host "✓ Get job boards successful" -ForegroundColor $Green
        }
        else {
            Write-Host "✗ Get job boards failed" -ForegroundColor $Red
            return $false
        }
    }
    catch {
        Write-Host "✗ Get job boards failed: $_" -ForegroundColor $Red
        return $false
    }
    
    return $true
}

# Function to test amazon service
function Test-Amazon {
    Write-Host "Testing Amazon Service..."
    
    # Search for products
    Write-Host "Searching for products..."
    try {
        $searchResponse = Invoke-WebRequest -Uri "$BaseUrl`:3002/api/amazon/search?query=test" `
            -Method GET `
            -UseBasicParsing
        
        if ($searchResponse.Content -match '"asin"') {
            Write-Host "✓ Product search successful" -ForegroundColor $Green
        }
        else {
            Write-Host "✗ Product search failed" -ForegroundColor $Red
            return $false
        }
    }
    catch {
        Write-Host "✗ Product search failed: $_" -ForegroundColor $Red
        return $false
    }
    
    return $true
}

# Main test execution
Write-Host "Starting service tests..."

# Check health of all services
$healthChecks = @(
    (Check-Health "job-board" "3001"),
    (Check-Health "amazon" "3002"),
    (Check-Health "proxy" "3002"),
    (Check-Health "auth" "3003")
)

if ($healthChecks -contains $false) {
    Write-Host "Health checks failed. Exiting..." -ForegroundColor $Red
    exit 1
}

# Run service tests
$testResults = @(
    (Test-Auth),
    (Test-Proxy),
    (Test-JobBoard),
    (Test-Amazon)
)

if ($testResults -contains $false) {
    Write-Host "Service tests failed. Exiting..." -ForegroundColor $Red
    exit 1
}

Write-Host "All tests completed successfully!" -ForegroundColor $Green 