import React                      from 'react';
import Dimensions                 from 'react-dimensions'
import { Pies, Chart, Transform } from 'rumble-charts'

class UsageChart extends React.Component {
  render(){
    return <Chart width={this.props.containerWidth}
                  height={150}
                  series={this.props.series}
                  className="chart"
                  minY={0}>
      <Transform method={['stack','rotate']}>
        <Pies combined={true} innerPadding='3%' innerRadius='70%' />
      </Transform>
    </Chart>
  }
}

export default Dimensions()(UsageChart)
