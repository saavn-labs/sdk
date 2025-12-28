import z from 'zod';

export const SaavnTrendingBase = z.strictObject({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  header_desc: z.string(),
  type: z.union([z.literal('album'), z.literal('playlist'), z.literal('song')]),
  perma_url: z.string(),
  image: z.string(),
  language: z.string(),
  year: z.string(),
  play_count: z.string(),
  explicit_content: z.string(),
  list_count: z.string(),
  list_type: z.string(),
  list: z.string(),
  button_tooltip_info: z.array(z.any()),
});
