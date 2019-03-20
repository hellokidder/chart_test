import React, { Component } from 'react';
import G2 from '@antv/g2';
import Slider from '@antv/g2-plugin-slider';
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
    var chart = new G2.Chart({
      container: document.getElementById('line'),
      animate: false,
      height: 500,
      width: 10000,
    });
    chart.source(data);
    chart.axis('data', {
      title: "data",
    });
    chart.axis('value', {
      title: "value",
    });
    chart.tooltip({
      crosshairs: {
        type: 'rect'
      }
    });
    chart.line().position('data*value');
    chart.render();
    var slider = new Slider({
      container: 'slider', // 用于显示该组件的 dom 容器 ID
      width: 800, // 可选，指定滑块的宽度，如果不指定则默认同 chart 相同，如果 chart 自适应宽度，slider 也会自适应宽度
      height: 30, // 指定滑块的高度
      charts: chart, // 滑块控制的 chart 对象，如果有多个使用数组，只有一个传入对象即可
      xDim: 'data', // 滑块控制的维度
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
