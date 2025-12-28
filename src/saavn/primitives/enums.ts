import { z } from 'zod';

/**
 * Sort directions used by Saavn
 */
export const SaavnSortOrderSchema = z.enum(['asc', 'desc']);

export type SaavnSortOrder = z.infer<typeof SaavnSortOrderSchema>;

/**
 * Sort keys supported by Saavn
 */
export const SaavnSortBySchema = z.enum(['alphabetical', 'latest', '']);

export type SaavnSortBy = z.infer<typeof SaavnSortBySchema>;

/**
 * Explicit content flag values (as returned by Saavn)
 */
export const SaavnExplicitFlagSchema = z.enum(['0', '1']);

export type SaavnExplicitFlag = z.infer<typeof SaavnExplicitFlagSchema>;
