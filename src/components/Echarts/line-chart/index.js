import React, { Component } from 'react';
import echart from 'echarts'
let t1
let t2
class LineChartEchart extends Component {
  componentWillMount() {
    t1 = window.performance.now()
  }
  componentDidMount() {
    const { data, x } = this.props;
    console.log(data,x)
    var lineChart = echart.init(document.getElementById("lineEchart"))
    lineChart.setOption({
      tooltip: {},
      xAxis: {
        data:x
      },
      yAxis: {},
      grid: {
        x: 100,
        x2:0
      },
      series: [{
        name: 'x',
        type: 'line',
        data: data
      }]
    })
    t2 = window.performance.now()
    console.log("Echart渲染时间：" + (t2 - t1) + "毫秒")
  }
  render() {
    return (
      <div id="lineEchart" style={{ width: 10000, height: 500 }} />
    );
  }
}

export default LineChartEchart;
