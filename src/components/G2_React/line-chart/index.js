import React, { Component } from 'react';
import createG2 from 'g2-react';

let t1
let t2
class LineChartG2React extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 10000,
      height: 500,
    };

  }
  componentWillMount() {
    t1 = window.performance.now()
  }
  componentDidMount() {
    t2 = window.performance.now()
    console.log("ReactG2渲染时间："+(t2-t1)+"毫秒")
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
