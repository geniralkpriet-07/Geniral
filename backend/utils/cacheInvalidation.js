// Redis removed — all cache invalidation functions are no-ops
export const invalidateClubCache = async () => true;
export const invalidateEventCache = async () => true;
export const invalidateAssociationMemberCache = async () => true;
export const invalidateExecutiveMemberCache = async () => true;
export default { invalidateClubCache, invalidateEventCache, invalidateAssociationMemberCache, invalidateExecutiveMemberCache };
