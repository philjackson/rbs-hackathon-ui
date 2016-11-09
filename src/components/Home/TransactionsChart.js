import React                          from 'react';
import Dimensions                     from 'react-dimensions'
import { Chart, Bars, Ticks, Layer }  from 'rumble-charts'
import moment                         from 'moment'


class TransactionsChart extends React.Component {
  render(){
    return <Chart width={this.props.containerWidth} height={200} series={this.props.series} minY={0}
                  scaleX={{
                    paddingStart: 1.5,
                    paddingEnd: 0.0001
                  }}
                  scaleY={{
                    paddingTop: 10,
                    paddingBottom: 0
                  }}>
      <Layer width='80%' height='90%' position='top center'>
        <Bars colors='category10' // category20, category20b, category20c
              innerPadding='1%'
              groupPadding='0'
              />
        <Ticks
          axis='y'
          lineLength='100%'
          lineVisible={true}
          lineStyle={{stroke:'lightgray'}}
          labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray'}}
          labelAttributes={{x: -5}}
        />
        <Ticks
          axis='x'
          labelFormat={v => moment(v).format('M/Y')}
          labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge',fill:'lightgray'}}
          labelAttributes={{y: 3}}
        />
      </Layer>
    </Chart>
  }
}

export default Dimensions()(TransactionsChart)
