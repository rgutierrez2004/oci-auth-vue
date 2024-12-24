# OCI Auth Vue - Technical Architecture

## Overview
This document outlines the technical architecture of the OCI Auth Vue application, which implements OpenID Connect (OIDC) and OAuth 2.0 authentication with Oracle Cloud Infrastructure (OCI) in a Vue.js/Nuxt.js application.

## Build System

### Vite Integration
The application uses Vite as its build tool through Nuxt 3, providing:

1. **Development Environment**:
   - Hot Module Replacement (HMR) for instant updates
   - Dual build process:
     - Client build for browser-side code
     - Server build for SSR functionality
   - Fast server startup using native ES modules

2. **Build Optimization**:
   - On-demand compilation
   - Efficient caching strategy
   - Smart code splitting
   - Asset optimization

3. **Development Features**:
   - TypeScript support
   - Vue SFC (Single File Components) compilation
   - Fast feedback loop
   - Intelligent dependency handling

## Backend for Frontend (BFF) Pattern

The application implements the Backend for Frontend (BFF) pattern to ensure secure authentication and proper separation of concerns.

### Security Boundary
- **Server-Side Authentication**:
  - All OAuth/OIDC flows are handled by the backend
  - Sensitive credentials (client secrets, auth tokens) never reach the client
  - Token management and JWT operations happen server-side
  - PKCE flow implementation for enhanced security

### API Abstraction
- **Frontend Integration**:
  - High-level authentication functions exposed to frontend
  - Complex OAuth flows hidden from client-side code
  - User information sanitized and transformed server-side
  - Standardized error handling

### Token Management
- **Secure Token Handling**:
  - Access and ID tokens managed server-side
  - Custom JWT encoding/decoding for session tokens
  - Secure token refresh mechanism
  - Token validation and verification

### Implementation Details
```typescript
// Server-side auth handler (server/api/auth/[...].ts)
- Manages OAuth flow with OCI
- Handles token lifecycle
- Implements security measures
- Provides frontend-friendly endpoints

// Frontend components
- Use abstracted auth methods
- Never directly access OAuth endpoints
- Handle only session-level tokens
- Focus on UI/UX concerns
```

## User Interface

### Navigation Structure
- **Header Component**: 
  - Logo with "OCI Auth" and home badge
  - Navigation menu with:
    1. OAuth 2.0 & OIDC (triggers login flow)
    2. OCI SDK Documentation (external link)
    3. About Auth.js (external link)
  - Dark/Light mode toggle
  - Authentication status display

### Authentication UI States
1. **Unauthenticated**:
   - "OAuth 2.0 & OIDC" menu option available for login
   - No user information displayed

2. **Authenticated**:
   - Username displayed in green
   - Black "Logout" button
   - Full navigation access

## System Architecture

### Technology Stack
- **Frontend**: Vue 3 + Nuxt 3
- **UI Framework**: Nuxt UI
- **Authentication**: NextAuth.js (@sidebase/nuxt-auth)
- **Identity Provider**: Oracle Cloud Infrastructure (OCI)
- **Authentication Protocol**: OpenID Connect (OIDC) with OAuth 2.0

### Authentication Standards
The application implements two complementary authentication standards:
1. **OpenID Connect (OIDC)**:
   - Handles user identity verification
   - Provides ID tokens with verified user information
   - Enables single sign-on (SSO) capabilities
   
2. **OAuth 2.0**:
   - Manages authorization flows
   - Handles access tokens for API access
   - Provides secure token management

### Core Components

#### 1. Authentication Handler (`server/api/auth/[...].ts`)
- Implements NextAuth.js configuration for OIDC/OAuth flow
- Handles JWT token management
- Processes OIDC ID tokens for user identity
- Manages user session and profile data
- Implements custom JWT encoding/decoding to prevent encryption issues

```typescript
// Key Features
- OIDC implementation with ID tokens
- OAuth 2.0 implementation with PKCE
- User profile mapping from ID token claims
- Session management
- Custom JWT handling
- Secure logout process
```

#### 2. Header (`components/Header.vue`)
- Manages navigation menu
- Integrates with authentication flow
- Provides consistent layout across pages

#### 3. AuthStatus (`components/AuthStatus.vue`)
- Displays authentication state
- Shows username when authenticated
- Provides logout functionality
- Styled for better visibility (green username, black logout button)

## Authentication Flow

1. **Login Process**
   ```
   User -> OAuth 2.0 & OIDC Menu -> OCI Login -> OAuth/OIDC Callback -> Application
   ```

2. **Token Management**
   - ID Token: Contains verified user identity information
   - Access Token: Used for API requests
   - Custom JWT handling for session persistence

3. **Logout Process**
   ```
   User -> Logout Button -> OCI Logout -> Clear Session -> Redirect to Home
   ```

## Protected Routes

The application implements protected routes using Nuxt's built-in middleware system and @sidebase/nuxt-auth integration.

### Protected Page Implementation
```typescript
// pages/protected.vue
definePageMeta({
  middleware: ['auth']  // Built-in auth middleware
})
```

### Route Protection Features
- **Middleware-based Security**:
  - Automatic authentication checks
  - Redirect to home for unauthenticated users
  - Session validation on route access

- **Protected Content**:
  - User profile information
  - Access and ID tokens
  - Complete session data
  - Secure data display

### Access Control Flow
1. User clicks "View Protected Page" button
2. Auth middleware checks authentication status
3. If authenticated: 
   - Allow access to protected route
   - Display sensitive information
4. If not authenticated:
   - Redirect to home page
   - Prevent access to protected content

## Security Considerations

### Backend for Frontend Security
1. **Credential Protection**:
   - Sensitive credentials stored only in backend environment variables
   - No exposure of OCI client secrets to frontend
   - Secure handling of OAuth tokens

2. **Token Security**:
   - Access and ID tokens never exposed to client
   - Session tokens used for frontend communication
   - Server-side token validation and refresh

3. **API Security**:
   - Authentication endpoints protected
   - PKCE flow for enhanced security
   - Proper CORS configuration
   - Rate limiting and security headers

### Environment Variables
Required environment variables for secure operation:

#### Authentication Configuration
- `AUTH_SECRET`: Secret key for JWT operations (server-side only)
- `AUTH_ORIGIN`: Application URL for redirects
- `NEXTAUTH_URL`: Required by next-auth

#### OCI Configuration (Server-Side Only)
- `OCI_CLIENT_ID`: OAuth/OIDC client identifier
- `OCI_CLIENT_SECRET`: OAuth/OIDC client secret (never exposed to client)
- `OCI_DOMAIN_URL`: OCI identity domain URL
- `OCI_WELL_KNOWN_URL`: OIDC configuration endpoint
- `OCI_LOGOUT_URL`: OCI logout endpoint
- `OCI_USERINFO_URL`: OIDC userinfo endpoint
- `OCI_SCOPE`: Required OIDC scopes

## Data Flow

### Authentication Data Flow
```
1. User Authentication
   Browser -> OCI Login -> OAuth Callback -> JWT Creation -> Session Establishment

2. Session Management
   Browser <-> Server: JWT-based session management
   
3. User Info Retrieval
   Server -> OCI UserInfo Endpoint -> User Profile Data
```

## Integration Points

### OCI Integration
- OAuth 2.0 Endpoints
- UserInfo Endpoint
- Logout Endpoint

### Frontend Integration
- Nuxt Auth Module
- Vue Components
- Protected Routes

## Error Handling
- Custom error handling for authentication failures
- Session recovery mechanisms
- Graceful logout handling

## Performance Considerations
- Optimized token handling
- Efficient session management
- Minimal API calls to OCI services

## Development Guidelines

### Code Organization
```
├── components/
│   ├── Header.vue    # Navigation menu component
│   └── AuthStatus.vue    # Authentication UI component
├── server/
│   └── api/
│       └── auth/
│           └── [...].ts  # Auth handler implementation
└── .env                  # Environment configuration
```

### Best Practices
1. Environment Variable Management
2. Secure Token Handling
3. Error Handling
4. Type Safety
5. Code Documentation
