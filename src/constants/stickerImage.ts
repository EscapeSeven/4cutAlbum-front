export const STICKER_IMAGES = Array.from(
  { length: 85 },
  (_, i) => `assets/스티커2-${(i + 1 + '').padStart(2, '0')}.png`,
);
