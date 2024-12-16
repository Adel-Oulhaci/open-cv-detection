export const drawBoundingBoxes = (context, predictions) => {
  predictions.forEach(prediction => {
    const [x, y, width, height] = prediction.bbox;
    context.strokeStyle = '#00ff00';
    context.lineWidth = 2;
    context.strokeRect(x, y, width, height);
    context.fillStyle = '#00ff00';
    context.fillText(
      `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
      x,
      y > 10 ? y - 5 : 10
    );
  });
};