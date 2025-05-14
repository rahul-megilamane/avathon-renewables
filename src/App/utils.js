export function secondsToHoursConversion(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(" ");
}

export function convertSecondsToHours(seconds) {
    return seconds/3600
}

export const CustomizedAxisTick = ({ x, y, payload, width = 80 }) => {
    const words = payload.value.split(' ');
    const lines = [];
    let currentLine = '';
  
    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length > 15) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine);

    const lineHeight = 14; // adjust spacing between lines
    const verticalOffset = 10; // push label down below x-axis line
  
    return (
      <g transform={`translate(${x},${y + verticalOffset})`}>
        {lines.map((line, index) => (
          <text
            key={index}
            x={0}
            y={index * lineHeight}
            textAnchor="middle"
            fill="#666"
            fontSize="12"
          >
            {line}
          </text>
        ))}
      </g>
    );
  };