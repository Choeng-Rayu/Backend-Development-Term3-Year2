# JWT Authentication Assignment

## EXERCISE 1 – Backend Authentication ✅

### Q1: Authentication Routes
- **POST /api/auth/register**: Accepts name, email, password, role; hashes password with bcryptjs
- **POST /api/auth/login**: Validates credentials; returns JWT token with 1-hour expiry

### Q2: JWT Middleware
- Created `authenticateToken` middleware in `/middlewares/auth.js`
- Extracts and verifies JWT from Authorization header
- Applied to all protected routes (students, teachers, courses)

### Q3: Swagger Documentation
- Added bearerAuth security scheme
- Documented all routes with proper schemas
- Protected routes show JWT requirements

### Q4: Reflective Questions

**Q7: Benefits of JWT?**
Stateless, self-contained, cross-domain support, mobile-friendly, standardized format

**Q8: JWT secret storage?**
Environment variables only - never in source code. Compromised secrets = forged tokens

**Q9: Why hash passwords with JWT?**
Defense-in-depth: protects against database breaches, insider threats, compliance requirements

**Q10: No JWT check consequences?**
Unauthorized access, data breaches, privilege escalation, audit trail loss

**Q11: How Swagger helps?**
Interactive docs, clear schemas, auth guidance, code generation, reduced integration time

**Q12: Token expiration tradeoffs?**
Benefits: Limited attack window, auto cleanup
Drawbacks: Frequent re-auth, implementation complexity

---

## EXERCISE 2 – React Frontend ✅

### Q1: Auth Context
Created `context/AuthContext.jsx` with global auth state, checks localStorage on load

### Q2: Utility Functions
`utils/auth.js`: `isAuthenticated()`, `setToken()`, `getToken()`, `logout()`

### Q3: Navbar UI
Shows user email + logout when authenticated, Login/Register when not

### Q4: Login Page
Submits to `/api/auth/login`, stores JWT, updates context, redirects to dashboard

### Q5: Protected Routes
`ProtectedRoute.jsx` component wraps protected pages, redirects to login if unauthenticated

### Q6: Auto Redirect
Login page redirects authenticated users to dashboard automatically

### Reflective Questions

**Q1: localStorage vs React state?**
Advantages: Persistence, cross-tab sync
Risks: XSS vulnerability, manual expiry checking

**Q2: AuthContext benefits?**
Global state, centralized logic, automatic updates, eliminates prop drilling

**Q3: Expired/tampered tokens?**
Client-side validation, API interceptors, graceful degradation, automatic cleanup

**Q4: ProtectedRoute benefits?**
UX: Seamless redirects, loading states
Security: Access control, single point of control

**Q5: UI-based security implications?**
UI hiding ≠ security. Always validate server-side, minimize exposure, defense-in-depth

---

## Summary
✅ Complete JWT authentication system  
✅ React context-based state management  
✅ Protected routing with redirects  
✅ Security best practices implemented
