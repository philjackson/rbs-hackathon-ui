import React from 'react'
import BalanceWidget from './BalanceWidget'
import BalanceStore from '../../stores/balance'

const store = new BalanceStore();

class Home extends React.Component {
  render(){
    return <div className="container">
      <div className="box">
        <BalanceWidget store={store} />
      </div>
    </div>
  }
}

export default Home
