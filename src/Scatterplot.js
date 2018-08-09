import React from "react";
import * as d3 from "d3";

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
        const { x, y, xData, yData, entry, width, height } = this.props,
            { data } = this.state;

        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(data, xData))
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(data, yData))
            .range([0, height]);

        return (
            <g transform={`translate(${x}, ${y})`}>
                {data.map(d =>
                    entry({
                        x: xScale(xData(d)),
                        y: yScale(yData(d))
                    })
                )}
            </g>
        );
    }
}

export default Scatterplot;
