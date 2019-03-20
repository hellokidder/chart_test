import React, { Component } from 'react';
import G2 from '@antv/g2';
import Slider from '@antv/g2-plugin-slider';
import DataSet from '@antv/data-set';
class LineChartG2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 30000,
      height: 500,
    };

  }
  componentDidMount() {
    const { data } = this.props;
    const ds = new DataSet({
      state: {
        start: 20,
        end: 60
      }
    })
    var chart = new G2.Chart({
      container: document.getElementById('line'),
      animate: false,
      height: 500,
      width: 1000,
      renderer: 'svg'
    });
    chart.source(data);
    chart.axis('data');
    chart.axis('value');
    chart.tooltip({
      crosshairs: {
        type: 'rect'
      }
    });
    chart.line().position('data*value');
    chart.render();
    var slider = new Slider({
      container: 'slider',
      width: 1000,
      height: 30,
      data: data,
      xAxis: "data",
      yAxis: "value",
    })
    slider.render()
  }
  render() {
    return (
      <div>
        <div id="line" />
        <div id="slider" />
      </div>
    );
  }
}

export default LineChartG2;
