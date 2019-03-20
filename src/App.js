import React, { Component } from 'react';
import LineChartG2React from './components/G2_React/line-chart'
import LineChartD3 from './components/D3/line-chart'
import LineChartG2 from './components/G2/line-chart'
import LineChartEchart from './components/Echarts/line-chart'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      echartsData: [],
      echartsX: [],
      d3Data:''
    };

  }
  componentWillMount() {
    const data = []
    const echartsData = []
    const echartsX = []
    const d3 = []
    for (let i = 0; i < 1000; i += 1){
      const val = Math.floor(Math.random()*100)
      const tmp0 = {
        data: i,
        type: "A",
        value: val
      }
      data.push(tmp0)
      echartsData.push(val)
      echartsX.push(i)
      d3.push(`${i},${val}`)
    }
    var str = d3.join('L')
    var d3Data = 'M'+str
    this.setState({
      data,
      echartsData,
      echartsX,
      d3Data
    })
  }
  render() {
    const { data, echartsData, echartsX, d3Data } = this.state;
    return (
      <div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header> */}
        {/* <LineChartG2React data={data1W} /> */}
        <LineChartG2 data={data} />
        {/* <LineChartEchart data={echartsData} x={echartsX}/> */}
        {/* <LineChartD3 data={echartsData}/> */}

      </div>
    );
  }
}

export default App;
