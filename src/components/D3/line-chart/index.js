import React, { Component } from 'react';
import * as d3 from 'd3';

class LineChartD3 extends Component {

  componentWillMount() {
  }
  componentDidMount() {
    const { data } = this.props
    console.log(data)
    const width = 1000
    const height = 300
    const padding = { top: 40, left: 40, right: 40, bottom: 40 }
    const pathwidth = width - padding.left - padding.right
    const pathheight = height -padding.top-padding.bottom
    // const tooltip = d3.select("#line")
    //   .append("div")
    //   .style("position", "absolute")
    //   .style("border-style","outset")
    //   .style("background-color", "cadetblue")
    //   .style("width", " 80px")
    //   .style("height", "50px")
    //   .style("opacity",0)

    d3.select("#line")
      .append("svg")
      .attr("width", width)
      .attr("height", height)


    // 放大器
    var scaleX = d3.scaleLinear()
      .domain([0,data.length]).nice()
      .range([0, pathwidth])

    var scaleY = d3.scaleLinear()
      .domain([0,d3.max(data)]).nice()
      .range([ pathheight,0])

    var lineGengeator = d3.line()
      .x(function (d, i) {
        return scaleX(i)
      })
      .y(function (d) {
        return scaleY(d)
      })

    const x = d3.axisBottom(scaleX)
    const y = d3.axisLeft(scaleY)
    // x折线
    d3.select("svg")
      .append("path")
      .style("fill", "none")
      .style("stroke", "#212121")
      .attr("d", lineGengeator(data))
      .attr("transform", `translate(${padding.left+1},${padding.top})`)
    //   .on("mouseover", function (d) {
    //     const m = d3.mouse(this)
    //     const datax = m[0] * (data.length / pathwidth)
    //     const round = Math.round(datax)
    //     if (Math.abs(round - datax) < 0.3) {
    //       tooltip
    //         .text(`${round}:${data[round]}`)
    //         .style("left",`${m[0]+50}px`)
    //         .style("top",`${m[1]-20}px`)
    //         .style("opacity",1)

    //     } else {
    //       tooltip
    //       .style("opacity",0)
    //     }
    //   })
    // .on("mouseout", function () {
    //   tooltip.style("opacity",0)
    // })
    // X轴
    d3.select("svg")
      .append("g")
      .attr("transform", `translate(${padding.left},${height - padding.bottom})`)
      .call(x)
    // y轴
    d3.select("svg")
      .append("g")
      .attr("transform", `translate(${padding.left},${padding.top})`)
      .call(y)

  }
  render() {
    return (
      <div id = "line" style={{position:"relative"}}>
      </div>
    );
  }
}

export default LineChartD3;
