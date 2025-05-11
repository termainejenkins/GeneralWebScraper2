# General Web Scraper (GWS)

A powerful desktop application for web scraping and data collection, built with Vue 3, TypeScript, and Electron.

## Author
**Termaine Jenkins (TJ)**

## Overview
GWS is a desktop application that combines the power of web scraping with a modern user interface. It's designed to help users collect and process data from various web sources efficiently.

## Features
- Desktop application interface using Electron
- Modern Vue 3 frontend with TypeScript
- Robust backend server with Express
- Web scraping capabilities using Playwright
- Proxy server support for advanced scraping scenarios
- Type-safe development with TypeScript

## Tech Stack
- **Frontend**: Vue 3 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Desktop**: Electron
- **Web Scraping**: Playwright
- **Build Tools**: Vite, TypeScript

## Project Structure
```
src/
├── backend/     # Backend server code
│   ├── routes/      # API endpoints
│   ├── controllers/ # Request handlers
│   ├── services/    # Business logic
│   ├── middlewares/ # Request processing
│   ├── workers/     # Background tasks
│   └── utils/       # Helper functions
├── frontend/    # Vue.js frontend code
├── assets/      # Static assets
└── docs/        # Documentation
```

## Development Setup

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn
- VS Code (recommended)

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Running the Application
Development mode:
```bash
npm run dev
```
This will start:
- Frontend development server
- Backend server
- Electron application

### Building for Production
```bash
npm run build
```

## IDE Setup
Recommended VS Code extensions:
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (Vue 3 support)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- Disable Vetur if installed

## TypeScript Support
The project uses `vue-tsc` for type checking. For optimal TypeScript support in VS Code:
1. Disable the built-in TypeScript Extension
2. Enable Volar's Take Over Mode
3. Reload VS Code window

## License
[Add your license information here]

## Contributing
[Add contribution guidelines if applicable]


test