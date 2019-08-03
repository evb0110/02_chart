import React, { Component } from 'react';

import Chart from './components/Chart';

import './css/main.css';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
  return a - b;
}

export default class App extends Component {
  componentWillMount() {
    this.setState({
      data: [],
      series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
      labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
      colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C'],
    });
  }

  componentDidMount() {
    this.populateArray();
    setInterval(this.populateArray.bind(this), 2000);
  }

  populateArray() {
    const series = 5;
    const serieLength = 5;

    let data = new Array(series).fill(new Array(serieLength).fill(0));
    data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

    this.setState({ data });
  }

  render() {
    const { data, colors, labels, series } = this.state;
    const max = data.reduce(
      (max, serie) =>
        Math.max(
          max,
          serie.reduce((serieMax, item) => Math.max(serieMax, item), 0),
        ),
      0,
    );

    return (
      <section>
        <div className="Charts">
          {data.map((serie, serieIndex) => (
            <Chart
              serie={serie}
              serieIndex={serieIndex}
              compareNumbers={compareNumbers}
              labels={labels}
              colors={colors}
              max={max}
              classType=""
            />
          ))}
        </div>

        <div className="Charts">
          {data.map((serie, serieIndex) => {
            var sortedSerie = serie.slice(0),
              sum;

            sum = serie.reduce((carry, current) => carry + current, 0);
            sortedSerie.sort(compareNumbers);

            return (
              <Chart
                serie={serie}
                serieIndex={serieIndex}
                compareNumbers={compareNumbers}
                labels={labels}
                colors={colors}
                max={max}
                sum={sum}
                classType="stacked"
              />
            );
          })}
        </div>

        <div className="Charts">
          {data.map((serie, serieIndex) => {
            var sortedSerie = serie.slice(0);

            sortedSerie.sort(compareNumbers);
            const right = item =>
              (sortedSerie.indexOf(item) / (serie.length + 1)) * 100 + '%';

            return (
              <Chart
                serie={serie}
                serieIndex={serieIndex}
                compareNumbers={compareNumbers}
                labels={labels}
                colors={colors}
                max={max}
                classType="layered"
                right={right}
              />
            );
          })}
        </div>

        <div className="Charts horizontal">
          {data.map((serie, serieIndex) => {
            return (
              <Chart
              serie={serie}
              series={series}
              serieIndex={serieIndex}
              compareNumbers={compareNumbers}
              labels={labels}
              colors={colors}
              max={max}
              classType=""
              height="auto"
              horizontal={true}
            />
            )
          })}
        </div>

        <div className="Legend">
          {labels.map((label, labelIndex) => {
            return (
              <div>
                <span
                  className="Legend--color"
                  style={{
                    backgroundColor: colors[labelIndex % colors.length],
                  }}
                />
                <span className="Legend--label">{label}</span>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}
