import React, { Component } from 'react';
import echart from 'echarts'
class LineChartEchart extends Component {
  componentDidMount() {
    const { data} = this.props;
    var lineChart = echart.init(document.getElementById("lineEchart"))
    const key = Object.keys(data)
    lineChart.setOption({
      // tooltip: {
      //   trigger:"axis"
      // },
      tooltip: false,
      xAxis: {
        data:key
      },
      yAxis: {},
      grid: {
        x: 100,
        x2:0
      },
      series: [{
        name: 'x',
        type: 'line',
        data,
        symbol: 'none'
      }],
      animation:false,
    })
  }
  render() {
    return (
      <div id="lineEchart" style={{ width: 1000, height: 300 }} />
    );
  }
}

export default LineChartEchart;
