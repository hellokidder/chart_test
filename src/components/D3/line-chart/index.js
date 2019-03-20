import React, { Component } from 'react';
import * as d3 from 'd3';

class LineChartD3 extends Component {

  componentWillMount() {
  }
  componentDidMount() {
    const { data } = this.props
    const width = 10000
    const height = 500
    // console.log(data.length);
    // var setLineArr = []
    // for (let i =0; i < data.length; i += 1){
    //   setLineArr.push(`${i},${data[i]}`)
    // }
    // var setLineData = "M"+setLineArr.join("L")
    d3.select("#line")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    var scaleX = d3.scaleLinear()
      .domain([0,data.length-1])
      .range([0, width])
    var scaleY = d3.scaleLinear()
      .domain([0,d3.max(data)])
      .range([0, height])

    var lineGengeator = d3.line()
      .x(function (d, i) { return scaleX(i) })
    .y(function(d){return scaleY(d)})

    d3.select("svg")
      .append("path")
      .style("fill", "none")
      .style("stroke","#212121")
      .attr("d", lineGengeator(data))

  }
  render() {
    return (
      <div id = "line">
      </div>
    );
  }
}

export default LineChartD3;
