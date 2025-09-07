# Environment Variables Setup for Frontend

This README provides instructions for replacing hardcoded URLs and configurations with environment variables for a better development workflow.

## Setup Overview

1. The `.env` file has been created in the root directory with essential configuration
2. An `api.ts` utility has been created for centralized API requests
3. Configuration values are extracted to `src/config/env.ts`

## Files Updated

- `.env` - Environment variables in root directory
- `src/utils/api.ts` - API utility for making requests
- `src/types/env.d.ts` - TypeScript definitions for environment variables
- `src/config/env.ts` - Centralized config values
- `src/contexts/AuthContext.tsx` - Updated to use env variables and API utility
- `src/pages/Association.jsx` - Updated API calls using apiService
- `src/pages/upcomingevents.tsx` - Updated API calls using apiService

## Files Still Requiring Updates

Several admin components still need to be updated to use the API utility and environment variables:

1. `src/pages/admin/ExecutiveMemberManagement.tsx`
2. `src/pages/admin/AssociationHeadManagement.tsx`
3. `src/pages/admin/EventManagement.tsx`
4. `src/pages/admin/UserManagement.tsx`
5. `src/pages/admin/ClubManagement.tsx`

## How to Update Admin Components

For each admin component, follow these steps:

1. Remove the hardcoded `API_URL` constant
2. Import the API utility: `import apiService from '../../utils/api';`
3. Replace fetch calls with apiService methods:

```typescript
// Before
const response = await fetch(`${API_URL}/admin/resource`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();

// After
const data = await apiService.get('/admin/resource');
```

4. For POST requests:

```typescript
// Before
const response = await fetch(`${API_URL}/admin/resource`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(resourceData)
});

// After
const response = await apiService.post('/admin/resource', resourceData);
```

5. For PUT requests:

```typescript
// Before
const response = await fetch(`${API_URL}/admin/resource/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(resourceData)
});

// After
const response = await apiService.put(`/admin/resource/${id}`, resourceData);
```

6. For DELETE requests:

```typescript
// Before
const response = await fetch(`${API_URL}/admin/resource/${id}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// After
const response = await apiService.delete(`/admin/resource/${id}`);
```

## Benefits of This Approach

- Single source of truth for API URL and other configuration
- Easier environment switching (development, staging, production)
- Centralized error handling and authentication
- Consistent request/response formatting
- Type safety with TypeScript
- Cleaner component code

## Next Steps

1. Update the remaining admin components
2. Consider adding environment-specific builds (development vs production)
3. Add request/response interceptors for better error handling
