import React                              from 'react';
import Dimensions                         from 'react-dimensions'
import { Chart, Transform, Bars, Ticks }  from 'rumble-charts'

class UsageChart extends React.Component {
  render(){
    return <Chart width={this.props.containerWidth} height={30} series={this.props.series} minY={0}>
      <Transform method={['stack','rotate']}>
        <Bars combined={true} />
        <Ticks
          axis='y'
          lineLength='100%'
          lineVisible={true}
          lineStyle={{stroke:'rgba(0,0,0,.5)'}}
          labelFormat={v => `£${v}`}
          labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'rgba(0,0,0,.5)'}}
          labelAttributes={{y: 15, x: -5}}
        />
      </Transform>
    </Chart>
  }
}

export default Dimensions()(UsageChart)
