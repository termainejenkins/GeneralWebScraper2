# General Web Scraper (GWS)

A powerful desktop application for web scraping and data collection, built with Vue 3, TypeScript, and Electron.

## Author
**Termaine Jenkins (TJ)**  
Founder & Developer at Sentient Solutions LLC

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
