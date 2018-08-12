import React from "react";
import styled from "styled-components";

import DashboardContext from "./DashboardContext";

const P = styled.p`
    font-size: 1.2em;
`;

const describe = (breed, data) => (
    <React.Fragment>
        <b>{breed}</b> dogs are{" "}
        <code>
            {data.height && data.height[0]}
            in
        </code>{" "}
        to{" "}
        <code>
            {data.height && data.height[1]}
            in
        </code>{" "}
        tall, weigh{" "}
        <code>
            {data.weight && data.weight[0]}
            lbs
        </code>{" "}
        to{" "}
        <code>
            {data.weight && data.weight[1]}
            lbs
        </code>
        , and obey the first command <code>{data.obey}%</code> of the time.
        <br />
        {data.sales} were sold in Toronto in 2015.
    </React.Fragment>
);

const Descriptor = () => (
    <DashboardContext.Consumer>
        {({ highlightedBreed, data }) => (
            <P>
                {highlightedBreed
                    ? describe(highlightedBreed, data[highlightedBreed])
                    : "Mouse over a datapoint"}
            </P>
        )}
    </DashboardContext.Consumer>
);

export default Descriptor;
