import React from "react"; // Import React
import * as d3 from "d3";

export default function LinePlot({
  data,
  width = 600,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 40,
  marginLeft = 40,
}) {
  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => new Date(d.date)))
    .range([marginLeft, width - marginRight]);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)])
    .range([height - marginBottom, marginTop]);

  const line = d3
    .line()
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.count));

  return (
    <svg width={width} height={height}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data)}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(new Date(d.date))} cy={y(d.count)} r="2.5" />
        ))}
      </g>
      <g
        transform={`translate(0, ${height - marginBottom})`}
        ref={(node) => d3.axisBottom(x)(d3.select(node))}
      />
      <text x={width / 2} y={height - 5} textAnchor="middle" fontSize="14">
        Date
      </text>
      <g
        transform={`translate(${marginLeft}, 0)`}
        ref={(node) => d3.axisLeft(y)(d3.select(node))}
      />
      <text
        x={-height / 2}
        y={10}
        transform="rotate(-90)"
        textAnchor="middle"
        fontSize="14"
      >
        Exercises Completed
      </text>
    </svg>
  );
}
