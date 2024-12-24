# OCI Auth Vue

A Vue.js application implementing secure authentication with Oracle Cloud Infrastructure (OCI) using OpenID Connect (OIDC) and OAuth 2.0.

## Features

- **Secure Authentication**: Full OpenID Connect (OIDC) implementation with OCI
- **Identity Management**: Verified user identity through OIDC ID tokens
- **Protected Routes**: 
  - Middleware-protected pages for authenticated users
  - View session details in protected area
  - Automatic redirection for unauthenticated access
- **Modern UI**: 
  - Clean navigation with OCI Auth, Documentation, and Auth.js links
  - Authentication overview with session status
  - Protected page access button for authenticated users
  - Dark/Light mode toggle
- **Type Safety**: Full TypeScript support
- **Secure Session Handling**: JWT-based session management
- **Backend for Frontend (BFF) Pattern**:
  - Server-side authentication handling
  - Secure token management
  - Protected API endpoints
  - Frontend abstraction of complex auth flows
- **Modern Build System**:
  - Vite-powered development environment
  - Hot Module Replacement (HMR)
  - Optimized production builds
  - Server-Side Rendering (SSR) support

## Architecture Overview

This application follows the Backend for Frontend (BFF) pattern for enhanced security:
- Authentication flows are handled server-side
- Sensitive credentials never reach the client
- Token management is done securely on the backend
- Frontend uses abstracted authentication methods

## Authentication Overview

The application provides two main views:

1. **Main Page**:
   - Authentication status and session information
   - "View Protected Page" button (visible when authenticated)
   - Full session data display
   - Auth provider details

2. **Protected Page** (`/protected`):
   - Only accessible when authenticated
   - Displays detailed user information:
     - User profile data
     - Access token
     - ID token
     - Complete session details
   - Protected by auth middleware

## Prerequisites

- Node.js 18.x or later
- NPM or another package manager
- OCI Account with configured OIDC/OAuth 2.0 application

## Environment Setup

Create a `.env` file with the following required variables:

```bash
# Authentication
AUTH_SECRET=your_auth_secret            # Secret for JWT encoding
AUTH_ORIGIN=http://localhost:3000       # Your application URL
NEXTAUTH_URL=http://localhost:3000      # Required by next-auth

# OCI Configuration
OCI_CLIENT_ID=your_client_id           # OAuth/OIDC client ID
OCI_CLIENT_SECRET=your_client_secret   # OAuth/OIDC client secret
OCI_DOMAIN_URL=your_domain_url         # OCI domain URL
OCI_WELL_KNOWN_URL=/.well-known/openid-configuration
OCI_LOGOUT_URL=/oauth2/v1/userlogout
OCI_USERINFO_URL=/oauth2/v1/userinfo
OCI_SCOPE=openid email profile         # Required OIDC scopes
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run preview
```

## Usage

1. Click "OAuth 2.0 & OIDC" in the top navigation to initiate login
2. After successful authentication:
   - Your name will appear in green
   - A logout button will be available
3. Use the dark/light mode toggle to switch themes
4. Access documentation through the navigation links

## Technical Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed technical documentation.

## Development

### Project Structure
```
├── components/          # Vue components
├── layouts/            # Page layouts
├── pages/             # Application pages
├── public/            # Static assets
├── server/            # Server-side code
└── .env              # Environment variables
```

### Key Components

- `AuthStatus.vue`: Manages authentication UI
- `[...].ts`: Handles authentication logic
- `Header.vue`: Application header with auth status

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT License](LICENSE)
