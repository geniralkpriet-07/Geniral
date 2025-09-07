/**
 * This file provides utilities for working with environment variables in a frontend application.
 * It centralizes configuration values and provides defaults for missing values.
 */

// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000';
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

// Authentication
export const AUTH_STORAGE_KEY = import.meta.env.VITE_AUTH_STORAGE_KEY || 'geniral_auth_token';
export const TOKEN_EXPIRY_WARNING = parseInt(import.meta.env.VITE_TOKEN_EXPIRY_WARNING || '1800000');

// Features
export const ENABLE_ANALYTICS = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
export const ENABLE_THEME_SWITCHER = import.meta.env.VITE_ENABLE_THEME_SWITCHER === 'true';

// Avatars and Images
export const DEFAULT_AVATAR_API = import.meta.env.VITE_DEFAULT_AVATAR_API || 'https://randomuser.me/api/portraits';
export const MAX_IMAGE_SIZE = parseInt(import.meta.env.VITE_MAX_IMAGE_SIZE || '2097152');
export const MAX_FILE_UPLOAD = parseInt(import.meta.env.VITE_MAX_FILE_UPLOAD || '10485760');

// Application Info
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Geniral';
export const ORGANIZATION = import.meta.env.VITE_ORGANIZATION || 'KPRIET';
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'geniral.kpriet@gmail.com';

// Social Media
export const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/company/kpriet';
export const FACEBOOK_URL = import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com/kpriet';
export const TWITTER_URL = import.meta.env.VITE_TWITTER_URL || 'https://twitter.com/kpriet';

// Misc
export const INITIAL_LOADING_DURATION = parseInt(import.meta.env.VITE_INITIAL_LOADING_DURATION || '3000');
export const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === 'true';
