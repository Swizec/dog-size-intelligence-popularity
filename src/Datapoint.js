import React from "react";
import styled from "styled-components";
import chroma from "chroma-js";
import * as d3 from "d3";

import DashboardContext from "./DashboardContext";

const Circle = styled.circle`
    fill: ${({ highlighted }) =>
        highlighted
            ? chroma("#008ae5")
                  .brighten(2)
                  .hex()
            : "#008ae5"}
    fill-opacity: 0.5;
    stroke: #008ae5;
`;

class Datapoint extends React.Component {
    state = {
        highlighted: false
    };

    circleRef = React.createRef();

    highlight = () => {
        this.setState({ highlighted: true });
    };

    unhighlight = () => {
        this.setState({ highlighted: false });
    };

    setUpHover = element => {
        console.log(element);
        // d3.select(el).on("mouseover", () => console.log("hai"));
    };

    render() {
        const { x, y, breed } = this.props,
            { highlighted } = this.state;

        return (
            <DashboardContext.Consumer>
                {({ highlightBreed, highlightedBreed }) => {
                    const highlighted = highlightedBreed === breed;

                    return (
                        <Circle
                            cx={x}
                            cy={y}
                            r={highlighted ? 9 : 5}
                            highlighted={highlighted}
                            onMouseOver={() => highlightBreed(breed)}
                            onMouseOut={() => highlightBreed(null)}
                        />
                    );
                }}
            </DashboardContext.Consumer>
        );
    }
}

export default Datapoint;
