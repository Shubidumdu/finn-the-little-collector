export const drawSky = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  hueRotate = 0,
) => {
  context.beginPath();
  const grad1 = context.createLinearGradient(0, 0, 0, 300);
  grad1.addColorStop(0, '#afe8f8');
  grad1.addColorStop(0.4, '#fff');
  grad1.addColorStop(0.5, '#fff');
  grad1.addColorStop(1, '#cff7fd');
  context.filter = `hue-rotate(${hueRotate}deg)`;
  context.fillStyle = grad1;
  context.fillRect(0, 0, canvas.width, 160);
  context.filter = 'none';
  context.closePath();
};
