export const getDominantColor = (canvas) => {
  const context = canvas.getContext('2d');
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let r = 0, g = 0, b = 0;
  const total = pixels.length / 4;

  for (let i = 0; i < pixels.length; i += 4) {
    r += pixels[i];
    g += pixels[i + 1];
    b += pixels[i + 2];
  }

  r = Math.round(r / total);
  g = Math.round(g / total);
  b = Math.round(b / total);

  const color = `rgb(${r},${g},${b})`;
  const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  
  return { color, hexColor };
};