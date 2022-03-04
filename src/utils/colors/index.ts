import chroma from 'chroma-js';

interface Swatch {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export const generateSwatch = (userColor: string): Swatch => {
  const initialColor = chroma.valid(userColor) ? userColor : '#000';
  const colorHsl = chroma(initialColor).hsl();

  const lightnessMap = [
    0.97, 0.92, 0.84, 0.74, 0.6, 0.48, 0.4, 0.28, 0.16, 0.08,
  ];
  const saturationMap = [0.08, 0.06, 0.04, 0.02, 0, 0, 0.08, 0.18, 0.36, 0.58];

  const yellowHue = 50;
  const yellowHueRange = 20;
  const yellowHueMap = [0, 0, 0, 0, 0, 4, 8, 16, 24, 32];

  const colors = lightnessMap
    .map((l) => chroma.hsl([colorHsl[0], colorHsl[1], l]))
    .map((color, i) => {
      return color.saturate(saturationMap[i] * Math.sqrt(colorHsl[1]));
    })
    .map((color, i) => {
      // Initial color is yellow
      if (
        colorHsl[0] >= yellowHue - yellowHueRange &&
        colorHsl[0] <= yellowHue + yellowHueRange
      ) {
        const ratio =
          Math.sqrt(1 - Math.abs(colorHsl[0] - yellowHue) / yellowHueRange) *
          Math.sqrt(colorHsl[2]);
        return color.set('hsl.h', `-${yellowHueMap[i] * ratio}`);
      }

      // Other colors
      return color;
    })
    .map((color) => color.hex());

  return colors.reduce(
    (swatch, color, i) => ({ ...swatch, [i ? `${i}00` : '50']: color }),
    {} as any
  );
};
