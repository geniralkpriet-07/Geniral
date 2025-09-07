// Utility file to handle cache invalidation
import { deleteCache, deleteCacheByPattern } from '../config/redis.js';

// Clear all club-related caches
export const invalidateClubCache = async (clubId) => {
  try {
    // Delete specific club caches
    if (clubId) {
      await deleteCache(`api:/api/clubs/${clubId}`);
      await deleteCache(`api:/api/clubs/${clubId}/members`);
      await deleteCache(`api:/api/clubs/${clubId}/faculty`);
    }
    
    // Delete general club caches
    await deleteCache('api:/api/clubs');
    
    // Delete any pattern-based caches for clubs
    await deleteCacheByPattern('api:*/clubs*');
    
    console.log('Club cache invalidated');
    return true;
  } catch (error) {
    console.error('Error invalidating club cache:', error);
    return false;
  }
};

// Clear all event-related caches
export const invalidateEventCache = async (eventId) => {
  try {
    // Delete specific event caches
    if (eventId) {
      await deleteCache(`api:/api/events/${eventId}`);
    }
    
    // Delete general event caches
    await deleteCache('api:/api/events');
    await deleteCache('api:/api/events/featured');
    
    // Delete any pattern-based caches for events
    await deleteCacheByPattern('api:*/events*');
    
    console.log('Event cache invalidated');
    return true;
  } catch (error) {
    console.error('Error invalidating event cache:', error);
    return false;
  }
};

// Clear all association member related caches
export const invalidateAssociationMemberCache = async (memberId) => {
  try {
    // Delete specific member caches
    if (memberId) {
      await deleteCache(`api:/api/association-members/id/${memberId}`);
    }
    
    // Delete general association member caches
    await deleteCache('api:/api/association-members');
    
    // Delete role-based caches
    await deleteCacheByPattern('api:*/association-members/role/*');
    
    // Delete any pattern-based caches
    await deleteCacheByPattern('api:*/association-members*');
    
    console.log('Association member cache invalidated');
    return true;
  } catch (error) {
    console.error('Error invalidating association member cache:', error);
    return false;
  }
};

// Clear all executive member related caches
export const invalidateExecutiveMemberCache = async (memberId) => {
  try {
    // Delete specific member caches
    if (memberId) {
      await deleteCache(`api:/api/executive-members/${memberId}`);
    }
    
    // Delete general executive member caches
    await deleteCache('api:/api/executive-members');
    
    // Delete any pattern-based caches
    await deleteCacheByPattern('api:*/executive-members*');
    
    console.log('Executive member cache invalidated');
    return true;
  } catch (error) {
    console.error('Error invalidating executive member cache:', error);
    return false;
  }
};

export default {
  invalidateClubCache,
  invalidateEventCache,
  invalidateAssociationMemberCache,
  invalidateExecutiveMemberCache
};
