const generateColor = (str: string) => {
  const firstCharacter = str[0]?.toLowerCase();
  const asciiCode = firstCharacter?.charCodeAt(0).toString();

  const num = Math.round(
    0xffffff * parseInt(asciiCode + asciiCode + asciiCode)
  );

  const b = num & 255;
  const g = (num >> 8) & 255;
  const r = (num >> 16) & 255;

  return `rgb(${r},${g},${b})`;
};

export default generateColor;
