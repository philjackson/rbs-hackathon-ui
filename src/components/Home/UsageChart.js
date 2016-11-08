import React from 'react';
import Dimensions from 'react-dimensions'
import {Chart, Transform, Pies, Lines, Bars, Ticks, DropShadow} from 'rumble-charts'

class UsageChart extends React.Component {
  render(){
    return <Chart width={this.props.containerWidth} height={30} series={this.props.series} minY={0}>
      <Transform method={['stack','rotate']}>
        {/*<Lines*/}
          {/*colors='category10'*/}
        {/*/>*/}
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
      <DropShadow id='foo' />
      </Transform>
    </Chart>
  }
}

export default Dimensions()(UsageChart)
