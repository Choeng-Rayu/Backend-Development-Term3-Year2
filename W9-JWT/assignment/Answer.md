# JWT Authentication Assignment - Answers

## EXERCISE 1 – Authentication Implementation

### Q1: Authentication Routes
✅ **COMPLETED**
- Created POST `/api/auth/register` route that accepts name, email, password, and role
- Implemented password hashing using bcryptjs
- Created POST `/api/auth/login` route that validates credentials and returns JWT token
- Both routes are properly documented with Swagger

### Q2: JWT Middleware
✅ **COMPLETED**
- Created `authenticateToken` middleware in `/middlewares/auth.js`
- Middleware extracts token from Authorization header
- Validates token using JWT secret and rejects invalid/expired tokens
- Applied middleware to protect all student, teacher, and course routes

### Q3: Swagger Documentation
✅ **COMPLETED**
- Added JWT security scheme with bearerAuth in Swagger configuration
- Documented all authentication routes with proper request/response schemas
- Protected routes show security requirements in Swagger UI

### Q4: Reflective Questions

**7. What are the main benefits of using JWT for authentication?**

JWT provides several key benefits:
- **Stateless**: No need to store session data on the server, improving scalability
- **Cross-domain support**: Works across different domains and services
- **Self-contained**: Contains all necessary information, reducing database lookups
- **Standardized**: Industry-standard format (RFC 7519) with wide support
- **Flexible**: Can include custom claims and metadata
- **Mobile-friendly**: Ideal for mobile apps and SPAs

**8. Where should you store your JWT secret and why?**

JWT secrets should be stored in:
- **Environment variables** (like .env files) - never in source code
- **Secure configuration management systems** (Azure Key Vault, AWS Secrets Manager)
- **Server-only locations** - never exposed to client-side code

This is critical because:
- If the secret is compromised, attackers can forge valid tokens
- Secrets in source code can be exposed in version control
- Environment variables keep secrets separate from application logic

**9. Why is it important to hash passwords even if the system is protected with JWT?**

Password hashing is essential because:
- **Defense in depth**: Multiple security layers protect against various attack vectors
- **Database breaches**: If database is compromised, hashed passwords remain protected
- **Insider threats**: Even system administrators can't see actual passwords
- **Compliance**: Many regulations require password protection regardless of other security measures
- **User trust**: Users often reuse passwords across systems

**10. What might happen if a protected route does not check the JWT?**

Without JWT verification:
- **Unauthorized access**: Anyone could access protected resources
- **Data breaches**: Sensitive information could be exposed
- **Data manipulation**: Unauthorized users could modify/delete data
- **Privilege escalation**: Users could access resources beyond their permissions
- **Audit trail loss**: No way to track who performed actions

**11. How does Swagger help frontend developers or API consumers?**

Swagger provides:
- **Interactive documentation**: Test API endpoints directly in browser
- **Schema definitions**: Clear request/response formats
- **Authentication guidance**: Shows how to include JWT tokens
- **Code generation**: Auto-generate client SDKs in various languages
- **API discovery**: Easy exploration of available endpoints
- **Reduced integration time**: Less back-and-forth between teams

**12. What tradeoffs come with using token expiration (e.g., 1 hour)?**


**Benefits:**
- **Reduced attack window**: Stolen tokens become useless quickly
- **Automatic cleanup**: No manual token revocation needed
- **Better security**: Forces periodic re-authentication

**Drawbacks:**
- **User experience**: Users must login frequently
- **Implementation complexity**: Need refresh token mechanism
- **Server load**: More authentication requests
- **Mobile challenges**: Apps may lose connectivity during token refresh

---

## EXERCISE 2 – React Frontend Implementation

### Q1: Auth Context
✅ **COMPLETED**
- Created `context/AuthContext.jsx` with auth state management
- Provides auth, setAuth, and loading states globally
- Checks localStorage for existing token on app load
- Integrated with main.jsx as provider

### Q2: Utility Functions
✅ **COMPLETED**
Created `utils/auth.js` with:
- `isAuthenticated()`: Returns decoded token if valid and not expired
- `setToken()`: Stores token in localStorage and updates API headers
- `getToken()`: Retrieves raw JWT from localStorage
- `logout()`: Removes token and clears API headers

### Q3: Navbar Authentication UI
✅ **COMPLETED**
- Shows user email and logout button when authenticated
- Shows Login/Register buttons when not authenticated
- Logout clears token and redirects to login
- Uses AuthContext for state management

### Q4: Login Page Implementation
✅ **COMPLETED**
- Form submits credentials to `/api/auth/login`
- On success: stores JWT, updates auth state, redirects to dashboard
- Handles auto-login from registration
- Shows loading states and error messages

### Q5: Protected Routes
✅ **COMPLETED**
- Created `ProtectedRoute.jsx` component
- Checks auth state from context
- Redirects to login if not authenticated
- Shows loading spinner during auth check
- Applied to all dashboard, courses, teachers, students routes

### Q6: Auto Redirect
✅ **COMPLETED**
- Login page redirects to dashboard if already authenticated
- Registration redirects to login with auto-login data
- App.jsx handles route protection and redirects

### Reflective Questions

**1. Why use localStorage instead of React state for JWT? Advantages and risks?**

**Advantages:**
- **Persistence**: Survives page refreshes and browser restarts
- **Automatic**: No need to manually restore auth state
- **Cross-tab sync**: Works across multiple browser tabs

**Risks:**
- **XSS vulnerability**: Malicious scripts can access localStorage
- **No automatic expiry**: Must manually check token expiration
- **Size limits**: Limited storage capacity (5-10MB)

**Alternatives**: httpOnly cookies (more secure but complex), sessionStorage (tab-specific)

**2. How does AuthContext improve authentication management?**

AuthContext provides:
- **Global state**: Authentication status available anywhere in app
- **Centralized logic**: Single source of truth for auth state
- **Automatic updates**: Components re-render when auth changes
- **Cleaner code**: No prop drilling of auth data
- **Consistent behavior**: All components use same auth logic

**3. What happens if token is expired or tampered with?**

Our app handles this through:
- **Client-side checking**: `isAuthenticated()` validates expiration
- **API interceptors**: Automatically redirect to login on 401/403
- **Graceful degradation**: Clear invalid tokens and show login
- **User feedback**: Clear error messages about authentication issues

**4. How does ProtectedRoute improve UX and security?**

**UX improvements:**
- **Seamless redirects**: Users automatically sent to login
- **Loading states**: Clear feedback during auth checks
- **Consistent behavior**: Same protection logic everywhere

**Security benefits:**
- **Access control**: Prevents unauthorized route access
- **Single point of control**: Easy to modify protection logic
- **Defense in depth**: Client-side protection plus server-side validation

**5. Security implications of showing UI based on token state?**

**Important considerations:**
- **UI hiding ≠ security**: Server must still validate all requests
- **Information leakage**: UI reveals some system structure
- **Client-side bypass**: Attackers can modify client code

**Best practices:**
- **Defense in depth**: Always validate on server
- **Minimal exposure**: Only show what's necessary
- **Sensitive data**: Never rely on client-side protection alone
- **Audit trails**: Log all access attempts server-side

---

## Summary

Both exercises have been successfully implemented with:
- Complete JWT authentication system (backend)
- Full React frontend with context-based auth management
- Protected routes and proper user experience flows
- Comprehensive error handling and security considerations
- Detailed answers to all reflective questions

The implementation follows security best practices and provides a solid foundation for a production-ready authentication system.