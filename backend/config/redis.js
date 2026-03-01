// Redis / Upstash removed — all functions are no-ops
export const getCache = async () => null;
export const setCache = async () => false;
export const deleteCache = async () => false;
export const deleteCacheByPattern = async () => false;
export const redis = null;
export default { getCache, setCache, deleteCache, deleteCacheByPattern, redis };
