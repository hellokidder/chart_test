import React, { Component } from 'react';
import createG2 from 'g2-react';

class LineChartG2React extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1000,
      height: 500,
    };

  }

  render() {
    const {data} = this.props
    const LineChart = createG2(chart => {
      chart.coord('rect');
      chart.axis('data', {
        title: "data",
      });
      chart.axis('value', {
        title: "value",
      });
      chart.animate(false);
      chart.tooltip(false)
      chart.line().position('data*value');
      chart.render();
    });

    return (
      <div>
        <LineChart
          data={data}
          width={this.state.width}
          height={this.state.height}
          ref="myChart"
        />
      </div>
    );
  }
}

export default LineChartG2React;
