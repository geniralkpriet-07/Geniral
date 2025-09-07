import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Default TTL (Time To Live) for cache in seconds
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '3600', 10);

/**
 * Get data from cache
 * @param {string} key - Cache key
 * @returns {Promise<any>} - Cached data or null
 */
export const getCache = async (key) => {
  try {
    const data = await redis.get(key);
    return data;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
};

/**
 * Set data in cache
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} ttl - Time to live in seconds (optional)
 * @returns {Promise<boolean>} - Success status
 */
export const setCache = async (key, data, ttl = CACHE_TTL) => {
  try {
    await redis.set(key, data, { ex: ttl });
    return true;
  } catch (error) {
    console.error('Redis set error:', error);
    return false;
  }
};

/**
 * Delete data from cache
 * @param {string} key - Cache key
 * @returns {Promise<boolean>} - Success status
 */
export const deleteCache = async (key) => {
  try {
    await redis.del(key);
    return true;
  } catch (error) {
    console.error('Redis delete error:', error);
    return false;
  }
};

/**
 * Delete cache keys by pattern
 * @param {string} pattern - Pattern to match keys
 * @returns {Promise<boolean>} - Success status
 */
export const deleteCacheByPattern = async (pattern) => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await Promise.all(keys.map(key => redis.del(key)));
    }
    return true;
  } catch (error) {
    console.error('Redis delete by pattern error:', error);
    return false;
  }
};

// Export the redis client directly
export { redis };

export default {
  getCache,
  setCache,
  deleteCache,
  deleteCacheByPattern,
  redis
};
