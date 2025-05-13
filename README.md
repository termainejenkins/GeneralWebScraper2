# General Web Scraper (GWS)

A hybrid application for web scraping and data collection, supporting both desktop and cloud deployments. Built with Vue 3, TypeScript, Electron, and Node.js.

## Author
**Termaine Jenkins (TJ)**  
Founder & Developer at Sentient Solutions LLC

## Architecture
This application follows a hybrid architecture that supports both desktop and cloud deployments:

### Core Components
- **Frontend**: Vue.js 3 application with TypeScript
- **Backend Services**:
  - Job Board Service
  - Amazon Service
  - Proxy Service
  - Auth Service

### Deployment Modes
1. **Desktop Mode**
   - All services run locally using Electron
   - Local database and storage
   - Offline-first capabilities
   - Automatic service discovery

2. **Cloud Mode**
   - Services deployed to cloud infrastructure
   - Containerized using Docker
   - Orchestrated with Kubernetes
   - Scalable and distributed

### Infrastructure
- **Desktop**: Electron + Local Services
- **Cloud**: 
  - Docker containers
  - Kubernetes orchestration
  - Cloud-native design
  - CI/CD pipeline

## Project Structure
```
gws/
├── frontend/              # Vue.js frontend application
├── electron/             # Electron main process and configuration
├── services/
│   ├── job-board/        # Job board scraping service
│   ├── amazon/           # Amazon scraping service
│   ├── proxy/            # Proxy management service
│   └── auth/             # Authentication service
├── infrastructure/
│   ├── kubernetes/       # K8s configuration files
│   ├── docker/           # Docker configuration files
│   └── terraform/        # Infrastructure as Code
├── ci-cd/                # CI/CD pipeline configurations
└── docs/                 # Documentation
```

## Development Setup

### Prerequisites
- Node.js (Latest LTS version)
- Docker (for cloud deployment)
- Kubernetes (for cloud deployment)
- VS Code with recommended extensions

### Local Development (Desktop Mode)
1. Clone the repository
2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install service dependencies
cd services/job-board && npm install
cd ../amazon && npm install
cd ../proxy && npm install
cd ../auth && npm install
```

3. Start the desktop application:
```bash
# Start in desktop mode
npm run dev:desktop

# Or start individual services
npm run dev:job-board
npm run dev:amazon
npm run dev:proxy
npm run dev:auth
```

### Cloud Development
```bash
# Build Docker images
docker-compose build

# Start services in cloud mode
docker-compose up
```

### Kubernetes Deployment
```bash
# Deploy to Kubernetes
kubectl apply -f infrastructure/kubernetes/
```

## Features
- **Hybrid Deployment**: Run locally or in the cloud
- **Offline Support**: Desktop mode works without internet
- **Data Sync**: Optional cloud synchronization
- **Scalable**: Cloud deployment supports horizontal scaling
- **Secure**: JWT authentication and role-based access
- **Modern UI**: Vue.js 3 with TypeScript
- **Type Safety**: Full TypeScript support

## CI/CD Pipeline
The project uses GitHub Actions for:
- Automated testing
- Desktop application building
- Docker image building
- Kubernetes deployment
- Infrastructure provisioning

## Monitoring and Logging
- **Desktop**: Local logging and metrics
- **Cloud**: 
  - Prometheus for metrics
  - Grafana for visualization
  - ELK Stack for logging

## Security
- JWT authentication
- Role-based access control
- API key management
- Rate limiting
- CORS configuration
- Local data encryption

## License
GNU Affero General Public License v3.0 with Proprietary Notice

Copyright (c) 2024 Termaine Jenkins, Sentient Solutions LLC

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

### Proprietary Notice
This software is proprietary and confidential. While released under the AGPL-3.0 license, the following restrictions apply:

1. This software is provided solely for evaluation by potential employers
2. Any commercial use, distribution, or modification requires explicit written permission from Sentient Solutions LLC
3. Any derivative works must also be released under AGPL-3.0 and must include this proprietary notice
4. Any use of this software in a network service must make the source code available to all users
5. No rights are granted for production use without explicit permission

This notice supplements the AGPL-3.0 license and does not limit its terms. Any unauthorized use may result in legal action.

## Contributing
This project is maintained by Sentient Solutions LLC. The code is provided exclusively for evaluation purposes by potential employers. While the AGPL-3.0 license applies, any commercial use, distribution, or modification requires explicit written consent from Sentient Solutions LLC. For any inquiries regarding this software, please contact us through the information provided in the author section.
