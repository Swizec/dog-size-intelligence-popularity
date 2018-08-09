import React from "react";
import { keyframes } from "../node_modules/styled-components";

class Scatterplot extends React.Component {
    state = {};

    static getDerivedStateFromProps(props, state) {
        const { data, filter } = props;

        return {
            ...state,
            data: Object.entries(data)
                .filter(([_, val]) => filter(val))
                .reduce((data, [key, value]) => ({ ...data, [key]: value }), {})
        };
    }

    render() {
        const { x, y, xData, yData, entry } = this.props,
            { data } = this.state;

        console.log(data);

        return (
            <g transform={`translate(${x}, ${y})`}>
                {Object.keys(data).map(k => {
                    const d = data[k];

                    return entry({
                        x: xData(d),
                        y: yData(d)
                    });
                })}
            </g>
        );
    }
}

export default Scatterplot;
