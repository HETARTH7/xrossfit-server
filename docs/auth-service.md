# Auth Service

## Strategy Selection

| Strategy | State | Key Stack | Use Case | Rejected Because |
|---|---|---|---|---|
| Session | stateful | `Spring Security`, `HttpSession` | monoliths, server-rendered | h-scaling, session replication |
| Basic Auth | stateless | `Spring Security` | internal APIs, testing | creds per request, no lifecycle |
| **JWT + Refresh** ✓ | stateless | `Spring Security`, `OncePerRequestFilter`, `AuthenticationManager`, `UserDetailsService` | SPA, REST, mobile | — |
| OAuth2 | stateless | `Spring Security OAuth2`, `ResourceServer` | third-party login, enterprise | external dep, added complexity |
| OIDC | stateless | `Keycloak`, `Auth0`, `Okta` | SSO, federated identity | infra overhead, ops cost |

**Selected: JWT + Refresh Token**  
Reasons: stateless backend, SPA frontend, horizontal scalability, no server-side session store.

---

## Architecture

### Login flow

```
POST /auth/login
  └─ AuthenticationManager
       └─ DaoAuthenticationProvider
            └─ UserDetailsService          — loads from users table by email
                 └─ BCryptPasswordEncoder  — verifies password hash
                      └─ JWT Generator
                           ├─ access token  → response body
                           └─ refresh token → HttpOnly Secure cookie (Set-Cookie)
```

### Per-request flow

```
Authorization: Bearer <token>
  └─ JwtFilter (OncePerRequestFilter)
       └─ validate signature + expiry
            └─ SecurityContextHolder.setAuthentication(...)
                 └─ route handler
```

### Session policy

```java
.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
```

No server-side sessions. All state is in the JWT.

---

## Token Reference

| | Access token | Refresh token |
|---|---|---|
| **Transport** | `Authorization: Bearer <token>` | cookie (automatic) |
| **Storage (client)** | memory / `localStorage` | `HttpOnly; Secure` cookie |
| **Lifetime** | short (e.g. 15 min) | long (e.g. 7 days) |
| **Purpose** | API authentication | silent re-auth, new access token |

---

## Component Map

| Component | Class | Role |
|---|---|---|
| Filter chain | `SecurityFilterChain` | route protection, policy |
| JWT validation | `JwtFilter` extends `OncePerRequestFilter` | extract + validate token per request |
| Credential auth | `AuthenticationManager` → `DaoAuthenticationProvider` | authenticate username/password |
| User loading | `UserDetailsService` impl | load `UserDetails` from `users` table by `email` |
| Password hashing | `BCryptPasswordEncoder` | hash on register, verify on login |

---

## Implemented

- [x] BCrypt password hashing
- [x] JWT generation + signature validation
- [x] `OncePerRequestFilter` — JWT extraction and verification
- [x] `SecurityFilterChain` — protected route config
- [x] `SessionCreationPolicy.STATELESS`
- [x] Refresh token in `HttpOnly; Secure` cookie
- [x] `DaoAuthenticationProvider` — DB-backed credential auth
- [x] Auth identifier: `email` field (`users` table)

---

## Gaps

- [ ] `POST /auth/refresh` endpoint — not implemented
- [ ] Token rotation on refresh
- [ ] Token revocation / logout invalidation
- [ ] `@ControllerAdvice` — no centralised exception handler
- [ ] dev vs prod cookie config not separated (`Secure`, `SameSite`, `Domain`)

---

## Planned

### `POST /auth/refresh`
Validate refresh token from cookie → issue new access token (+ rotate refresh token).

### RBAC
```java
.requestMatchers("/admin/**").hasRole("ADMIN")
.requestMatchers("/api/**").hasRole("USER")
```
Roles via `GrantedAuthority`, stored in `users` table, embedded in JWT claims.

### Token revocation
Store refresh token hashes in DB or Redis. On logout: delete entry → token rejected on next use. Enables per-device session management.

### Centralised error handling
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ErrorResponse> handle(...) { ... }
}
```
Standardised `{ "error": "...", "code": "..." }` response shape across all auth errors.

### OAuth2 / OIDC _(future)_
- Google Login, GitHub Login via `spring-boot-starter-oauth2-client`
- Keycloak / Auth0 as OIDC provider for SSO
