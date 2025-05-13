const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m'
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function runCommand(command, errorMessage) {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        log(errorMessage, colors.red);
        process.exit(1);
    }
}

// Check Node.js version
const requiredNodeVersion = '18.0.0';
const currentNodeVersion = process.version;
if (currentNodeVersion < requiredNodeVersion) {
    log(`Node.js version ${requiredNodeVersion} or higher is required. Current version: ${currentNodeVersion}`, colors.red);
    process.exit(1);
}

// Install root dependencies
log('Installing root dependencies...', colors.yellow);
runCommand('npm install', 'Failed to install root dependencies');

// Install service dependencies
const services = ['job-board', 'amazon', 'proxy', 'auth'];
services.forEach(service => {
    log(`Installing dependencies for ${service} service...`, colors.yellow);
    const servicePath = path.join(__dirname, '..', 'services', service);
    if (fs.existsSync(servicePath)) {
        runCommand(`cd ${servicePath} && npm install`, `Failed to install dependencies for ${service} service`);
    }
});

// Install frontend dependencies
log('Installing frontend dependencies...', colors.yellow);
const frontendPath = path.join(__dirname, '..', 'frontend');
if (fs.existsSync(frontendPath)) {
    runCommand(`cd ${frontendPath} && npm install`, 'Failed to install frontend dependencies');
}

// Create .env files if they don't exist
const envTemplate = `# Service Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gws
DB_USER=postgres
DB_PASSWORD=postgres

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h
`;

services.forEach(service => {
    const envPath = path.join(__dirname, '..', 'services', service, '.env');
    if (!fs.existsSync(envPath)) {
        fs.writeFileSync(envPath, envTemplate);
        log(`Created .env file for ${service} service`, colors.green);
    }
});

log('\nSetup completed successfully! 🎉', colors.green);
log('\nTo start the application in development mode:', colors.yellow);
log('1. Start Redis server (required for service communication)', colors.yellow);
log('2. Run: npm run dev:desktop', colors.yellow);
log('\nTo start individual services:', colors.yellow);
log('npm run dev:job-board', colors.yellow);
log('npm run dev:amazon', colors.yellow);
log('npm run dev:proxy', colors.yellow);
log('npm run dev:auth', colors.yellow); 