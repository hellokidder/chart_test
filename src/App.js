import React, { Component } from 'react';
import LineChartG2React from './components/G2_React/line-chart'
import LineChartD3 from './components/D3/line-chart'
import LineChartG2 from './components/G2/line-chart'
import LineChartEchart from './components/Echarts/line-chart'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataObject: [],
      dataArr: [],
    };

  }
  componentWillMount() {
    const dataObject = []
    const dataArr = []
    for (let i = 0; i < 100; i += 1){
      const val = Math.floor(Math.random()*100)
      const tmp0 = {
        data: i,
        type: "A",
        value: val
      }
      dataObject.push(tmp0)
      dataArr.push(val)
    }
    this.setState({
      dataObject,
      dataArr,
    })
  }
  render() {
    const { dataObject, dataArr,} = this.state;
    return (
      <div>
        {/* <LineChartG2React data={dataObject} /> */}
        <LineChartG2 data={dataObject} />
        {/* <LineChartEchart data={dataArr}/> */}
        {/* <LineChartD3 data={dataArr}/> */}

      </div>
    );
  }
}

export default App;
