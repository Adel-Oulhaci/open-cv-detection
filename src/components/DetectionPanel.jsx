import React from 'react';

const DetectionPanel = ({ detections, dominantColor }) => {
  return (
    <div className="detection-panel">
      <h3>Detected Objects:</h3>
      <ul>
        {detections.map((obj, index) => (
          <li key={index}>
            {obj.class} - Confidence: {Math.round(obj.score * 100)}%
          </li>
        ))}
      </ul>

      {dominantColor && (
        <div className="color-info">
          <h3>Dominant Color:</h3>
          <div
            className="color-swatch"
            style={{
              backgroundColor: dominantColor.color,
              width: '50px',
              height: '50px',
              border: '1px solid #000'
            }}
          />
          <p>{dominantColor.name}</p>
        </div>
      )}
    </div>
  );
};

export default DetectionPanel;