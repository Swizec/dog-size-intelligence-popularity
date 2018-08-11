import React from "react";
import styled from "styled-components";
import chroma from "chroma-js";

import DashboardContext from "./DashboardContext";

const Circle = styled.circle`
    fill: ${({ highlighted }) =>
        highlighted
            ? chroma("red")
                  .brighten(2)
                  .hex()
            : "#008ae5"}
    fill-opacity: 0.5;
    stroke: ${({ highlighted }) =>
        highlighted
            ? chroma("red")
                  .brighten(2)
                  .hex()
            : "#008ae5"}
    transition: r .2s ease-in-out;
`;

class Datapoint extends React.Component {
    circleRef = React.createRef();

    render() {
        const { x, y, breed } = this.props;

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
                            ref={this.circleRef}
                        />
                    );
                }}
            </DashboardContext.Consumer>
        );
    }
}

export default Datapoint;
