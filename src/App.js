import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import * as d3 from "d3";
import styled from "styled-components";

import Scatterplot from "./Scatterplot";
import Datapoint from "./Datapoint";
import DashboardContext from "./DashboardContext";

const Svg = styled.svg`
    width: 100%;
    min-height: 1024px;
`;

class App extends Component {
    state = {
        data: null,
        highlightedBreed: null,
        highlightBreed: breed => this.setState({ highlightedBreed: breed })
    };

    componentDidMount() {
        Promise.all([
            d3.csv("/data/breed_info.csv", d => ({
                breed: d["Breed"].toLowerCase(),
                height: [
                    Number(d["height_low_inches"]),
                    Number(d["height_high_inches"])
                ],
                weight: [
                    Number(d["weight_low_lbs"]),
                    Number(d["weight_high_lbs"])
                ]
            })),
            d3.csv("/data/dog_intelligence.csv", d => ({
                breed: d["Breed"].toLowerCase(),
                reps: [Number(d["reps_lower"]), Number(d["reps_higher"])],
                obey: Number(d["obey"].replace("%", ""))
            })),
            d3.csv("/data/dog_sales.csv", d => ({
                breed: d["Primary Breed"].toLocaleLowerCase(),
                sales: Number(d["Num2015"])
            }))
        ]).then(([breeds, intelligence, sales]) => {
            const data = d3
                .nest()
                .key(d => d.breed)
                .entries([...breeds, ...intelligence, ...sales])
                .filter(({ values }) => values.length > 1)
                .reduce(
                    (data, { key, values }) => ({
                        ...data,
                        [key]: values.reduce(
                            (obj, entry) => ({ ...obj, ...entry }),
                            {}
                        )
                    }),
                    {}
                );

            this.setState({ data });
        });
    }

    render() {
        const { data } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    {data === null ? "Loading CSV files ..." : null}
                </p>
                {data !== null ? (
                    <Svg>
                        <DashboardContext.Provider value={this.state}>
                            <Scatterplot
                                data={data}
                                x={100}
                                y={100}
                                width={350}
                                height={350}
                                filter={d =>
                                    d.weight &&
                                    d.height &&
                                    d.weight[0] &&
                                    d.height[0]
                                }
                                xData={d => d.weight[0]}
                                yData={d => d.height[0]}
                                xLabel="Weight (lbs)"
                                yLabel="Height (in)"
                                entry={props => (
                                    <Datapoint
                                        breed={props.d.breed}
                                        {...props}
                                    />
                                )}
                            />

                            <Scatterplot
                                data={data}
                                x={550}
                                y={100}
                                width={350}
                                height={350}
                                filter={d =>
                                    d.weight &&
                                    d.sales &&
                                    d.weight[0] &&
                                    d.height
                                }
                                xData={d => d.height[0]}
                                yData={d => d.sales}
                                xLabel="Height (in)"
                                yLabel="Sales"
                                entry={props => (
                                    <Datapoint
                                        breed={props.d.breed}
                                        {...props}
                                    />
                                )}
                            />

                            <Scatterplot
                                data={data}
                                x={1000}
                                y={100}
                                width={350}
                                height={350}
                                filter={d => d.obey && d.sales}
                                xData={d => d.obey}
                                yData={d => d.sales}
                                xLabel="N(Obey)"
                                yLabel="Sales"
                                entry={props => (
                                    <Datapoint
                                        breed={props.d.breed}
                                        {...props}
                                    />
                                )}
                            />

                            <Scatterplot
                                data={data}
                                x={100}
                                y={550}
                                width={350}
                                height={350}
                                filter={d => d.obey && d.height && d.height[0]}
                                xData={d => d.height[0]}
                                yData={d => d.obey}
                                xLabel="Height (in)"
                                yLabel="N(Obey)"
                                entry={props => (
                                    <Datapoint
                                        breed={props.d.breed}
                                        {...props}
                                    />
                                )}
                            />

                            <Scatterplot
                                data={data}
                                x={550}
                                y={550}
                                width={350}
                                height={350}
                                filter={d => d.obey && d.weight && d.weight[0]}
                                xData={d => d.weight[0]}
                                yData={d => d.obey}
                                xLabel="Weight (in)"
                                yLabel="N(Obey)"
                                entry={props => (
                                    <Datapoint
                                        breed={props.d.breed}
                                        {...props}
                                    />
                                )}
                            />
                        </DashboardContext.Provider>
                    </Svg>
                ) : null}
            </div>
        );
    }
}

export default App;
