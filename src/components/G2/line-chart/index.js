import React, { Component } from 'react';
import G2 from '@antv/g2';
class LineChartG2 extends Component {
  componentDidMount() {
    const { data } = this.props;
    const height = 300;
    const width = 1000;

    var chart = new G2.Chart({
      container: document.getElementById('line'),
      animate: false,
      height,
      width,
    });
    chart.source(data);
    chart.axis('data', {
      title: "data",
    });
    chart.axis('value', {
      title: "value",
    });
    // chart.tooltip({
    //   crosshairs: {
    //     type: 'rect'
    //   }
    // });
    chart.tooltip(false)
    chart.line().position('data*value');
    chart.render()
  }
  render() {
    return (
      <div>
        <div id="line" />
      </div>
    );
  }
}

export default LineChartG2;
