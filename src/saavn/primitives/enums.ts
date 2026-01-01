import { z } from 'zod';

export type SaavnSortOrder = z.infer<typeof SaavnSortOrderSchema>;
export type SaavnSortBy = z.infer<typeof SaavnSortBySchema>;
export type SaavnExplicitFlag = z.infer<typeof SaavnExplicitFlagSchema>;

export const SaavnSortOrderSchema = z.enum(['asc', 'desc']);
export const SaavnSortBySchema = z.enum(['alphabetical', 'latest', '']);
export const SaavnExplicitFlagSchema = z.enum(['0', '1']);
