import React from 'react'
import BalanceWidget from './BalanceWidget'
import {balanceStore} from 'stores'


class Home extends React.Component {
  render(){
    return <div className="container">
      <div className="box">
        <BalanceWidget balanceStore={balanceStore} />
      </div>
    </div>
  }
}

export default Home
