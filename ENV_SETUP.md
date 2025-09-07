# Environment Setup Guide

This document explains how the environment variables are set up and used in the Geniral project.

## Environment Files

- `.env` - Contains production environment settings
  - Currently sets `VITE_API_URL=https://geniral-zebd.vercel.app`

- `.env.development` - Contains development environment settings
  - Currently sets `VITE_API_URL=http://localhost:7000`

## How It Works

1. During development (`npm run dev`), the `.env.development` file is used
2. During production build and deployment, the `.env` file is used

## Usage in Code

You can access the API URL in your code in two ways:

### 1. Direct Access

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

### 2. Via Config File

Import from the centralized config file:

```javascript
import { API_URL } from 'src/config/api';
```

## Type Declarations

TypeScript type declarations for the environment variables are provided in `src/env.d.ts`.
