export const isUUID = (str: string) => {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(str);
};

export const generateRandomColor = (text: string) => {
  // Convert the text to a numerical value
  let numericValue = 0;
  for (let i = 0; i < text.length; i++) {
    numericValue += text.charCodeAt(i);
  }

  // Generate RGB values based on the numerical value
  const red = numericValue % 256;
  const green = (numericValue * 2) % 256;
  const blue = (numericValue * 3) % 256;

  // Convert RGB values to hexadecimal
  const redHex = red.toString(16).padStart(2, '0');
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  // Return the generated color as a hexadecimal value
  return `#${redHex}${greenHex}${blueHex}`;
};

export const generatePastelColor = (text: string) => {
  // Convert the text to a numerical value
  let numericValue = 0;
  for (let i = 0; i < text.length; i++) {
    numericValue += text.charCodeAt(i);
  }

  // Generate pastel RGB values based on the numerical value
  const hue = numericValue % 360;
  const saturation = 50 + ((numericValue * 2) % 50); // Limit saturation to a range of 50-100
  const lightness = 70 + ((numericValue * 3) % 10); // Limit lightness to a range of 70-80

  // Convert HSL values to RGB
  const { r, g, b } = hslToRgb(hue, saturation, lightness);

  // Convert RGB values to hexadecimal
  const redHex = Math.round(r).toString(16).padStart(2, '0');
  const greenHex = Math.round(g).toString(16).padStart(2, '0');
  const blueHex = Math.round(b).toString(16).padStart(2, '0');

  // Return the generated color as a hexadecimal value
  return `#${redHex}${greenHex}${blueHex}`;
};

// Helper function to convert HSL to RGB
const hslToRgb = (h: number, s: number, l: number) => {
  const chroma = (1 - Math.abs(2 * (l / 100) - 1)) * (s / 100);
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l / 100 - chroma / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = chroma;
    g = x;
  } else if (60 <= h && h < 120) {
    r = x;
    g = chroma;
  } else if (120 <= h && h < 180) {
    g = chroma;
    b = x;
  } else if (180 <= h && h < 240) {
    g = x;
    b = chroma;
  } else if (240 <= h && h < 300) {
    r = x;
    b = chroma;
  } else if (300 <= h && h < 360) {
    r = chroma;
    b = x;
  }

  r = (r + m) * 255;
  g = (g + m) * 255;
  b = (b + m) * 255;

  return { r, g, b };
};

export const generateDarkColor = (text: string) => {
  // Convert the text to a numerical value
  let numericValue = 0;
  for (let i = 0; i < text.length; i++) {
    numericValue += text.charCodeAt(i);
  }

  // Generate dark RGB values based on the numerical value
  const hue = numericValue % 360;
  const saturation = 50 + ((numericValue * 2) % 50); // Limit saturation to a range of 50-100
  const lightness = 20 + ((numericValue * 3) % 30); // Limit lightness to a range of 20-50

  // Convert HSL values to RGB
  const { r, g, b } = hslToRgb(hue, saturation, lightness);

  // Convert RGB values to hexadecimal
  const redHex = Math.round(r).toString(16).padStart(2, '0');
  const greenHex = Math.round(g).toString(16).padStart(2, '0');
  const blueHex = Math.round(b).toString(16).padStart(2, '0');

  // Return the generated color as a hexadecimal value
  return `#${redHex}${greenHex}${blueHex}`;
};

export const generateColor = generateDarkColor;
