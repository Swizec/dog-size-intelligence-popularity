import React from "react";
import * as d3 from "d3";

import Axis from "./Axis";

class Scatterplot extends React.Component {
    state = {};

    static getDerivedStateFromProps(props, state) {
        const { data, filter } = props;

        return {
            ...state,
            data: Object.entries(data)
                .filter(([_, val]) => filter(val))
                .map(([key, value]) => value)
        };
    }

    render() {
        const {
                x,
                y,
                xData,
                yData,
                entry,
                width,
                height,
                xLabel,
                yLabel
            } = this.props,
            { data } = this.state;

        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(data, xData))
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(data, yData))
            .range([height, 0]);

        return (
            <g transform={`translate(${x}, ${y})`}>
                {data.map(d =>
                    entry({
                        x: xScale(xData(d)),
                        y: yScale(yData(d)),
                        d: d
                    })
                )}
                <Axis
                    scale={xScale}
                    x={0}
                    y={height}
                    type="Bottom"
                    label={xLabel}
                />
                <Axis scale={yScale} x={0} y={0} type="Left" label={yLabel} />
            </g>
        );
    }
}

export default Scatterplot;
