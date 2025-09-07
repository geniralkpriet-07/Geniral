import { getCache, setCache } from '../config/redis.js';

/**
 * Cache middleware that checks Redis before continuing to controller
 * @param {number} ttl - Time to live in seconds (optional)
 * @returns {Function} - Express middleware
 */
export const cacheMiddleware = (ttl) => {
  return async (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    // Create a cache key based on the route and query parameters
    const cacheKey = `api:${req.originalUrl}`;
    
    try {
      // Try to get data from cache
      const cachedData = await getCache(cacheKey);
      
      if (cachedData) {
        console.log(`Cache hit for ${cacheKey}`);
        return res.status(200).json(JSON.parse(cachedData));
      }
      
      // Store the original json method
      const originalJson = res.json;
      
      // Override res.json method to cache the response before sending
      res.json = function(data) {
        // Store response in cache
        setCache(cacheKey, JSON.stringify(data), ttl)
          .then(success => {
            if (success) {
              console.log(`Cached ${cacheKey}`);
            }
          })
          .catch(err => console.error('Cache error:', err));
          
        // Call the original json method
        return originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

export default cacheMiddleware;
