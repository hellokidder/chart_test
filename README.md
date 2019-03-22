# React下原生G2、Echarts、D3对比

## 目的

项目需要大规模数据的展示，所以希望对几款主流的数据可视化数据渲染效率做一个简单的测评，包括G2、Echarts和D3,同时G2和Echarts都有对React框架进行封装的的版本，这里选择了使用原生的


## 环境

测试方向：本文只在react下对G2，Echarts,和D3进行对比：一条折线的渲染速度<br />运行环境：chrome访客模式（防止浏览器插件对结果造成影响）<br />数据量：1K,10K,100K,1M

| 库 | 包 | 版本 |
| --- | --- | --- |
| G2 | @antv/g2 | ^3.4.10 |
| Echarts | echarts | ^4.1.0 |
| D3 | d3 | ^5.9.2 |


## 代码
从代码上可以看出：G2和Echarts的实现方式上大致差不多，都是需要先将标签渲染在页面上，再对标签进行操作，所以需要在render之后，也就是需要在componentDidMount()这个生命周期中进行操作，实现上来看G2和Eharts都提供了相似的接口吧实现上比较简单，然后以为Ｇ2和Eharts都默认开启animetion(animate)和tooltip,因为只单纯测试渲染性能所以手动关掉<br />然后说D3,真的太坑了，学习曲线很陡峭，国内D3的资料也比较少，而且跟不上版本，只能看英文文档，实践起来也比较麻烦，基本上每条线每个点都需要手动绘制，但是，自由度极高，功能强大，基本上可以实现任何你想要的效果,emm~~有种"我就是神"的掌控感

### G2
```javascript
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
    chart.tooltip(false)
    chart.line().position('data*value');
    chart.render()
  }
  render() {
    return (
      <div id="line" />
    );
  }
}

export default LineChartG2;


```

### Echarts
```javascript
import React, { Component } from 'react';
import echart from 'echarts'
class LineChartEchart extends Component {
  componentDidMount() {
    const { data} = this.props;
    var lineChart = echart.init(document.getElementById("lineEchart"))
    const key = Object.keys(data)
    lineChart.setOption({
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

```


### D3

```javascript
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
      <div id = "line">
      </div>
    );
  }
}

export default LineChartD3;

```

## 效果

下图是３种库的实现效果：

看起来G2和Echarts更好看一些，D3更单薄一些，是因为对D3在样式上并没有做很多的设置，而G2和Echarts的样式都是默认的

![效果对比.jpg](https://user-gold-cdn.xitu.io/2019/3/22/169a4ac2de90eb2b?w=1499&h=1065&f=jpeg&s=235645)


## 测试方法

简单粗暴：chrome访客模式F12Performance下查看刷新时间，大概是下面这个样子:

![测试实例.jpg](https://user-gold-cdn.xitu.io/2019/3/22/169a4ac2ddefb582?w=1919&h=1069&f=jpeg&s=324219)<br />


## 结果

以下的结果是取１0次测试结果平均数：单位/ms

| 数量级 | G2 | Echarts | D3 |
| --- | --- | --- | --- |
| 1K | 221.12 | 251.21 | 196.88 |
| 10K | 349.66 | 419.98 | 223.68 |
| 100K | 991.35 | 1250.24 | 376.37 |
| 1M | Maximum call stack size exceeded | 页面崩溃 | 1930.59 |

G2数据量超过一个界限就会报错,大概120K到130K之间

Echarts早期１Ｍ数据运行还可以的，但是后来测的时候数据量400K到500K的时候会导致页面崩溃（奇怪）

## 总结
从结果来看就是D3数据量大的时候明显渲染速度要比G2和Echarts快很多，但是考虑到其实G2和Echarts其实里边默认定义了一些样式和属性，而D3就是写什么是什么，而且试验中用到的数据样本每一次测试都是生成一定数量的随机数，所以测试结果只是能描述个大概

看起来G2和Echarts在渲染性能上差不太多，G2稍快一点（结果是以ms为单位的所以实际感受上并没有很大的差别），但是Echarts存在的时间比较早了可能功能上会更胜一筹吧，同时他们学习曲线相对比较平缓一点

D3毫无疑问在渲染速度方面碾压G2和Echarts，但是学习曲线很陡峭，国内D3的资料也比较少，样式上来说G2和Echarts会更容易做的漂亮一点，而D3所有的参数都需要自己设置，所以想要做得漂亮也不是很容易，不过D3熟练度上来后准定可以做到很多G2和Echarts做不到的事

##
源代码： [https://github.com/hellokidder/chart_test](https://github.com/hellokidder/chart_test)
