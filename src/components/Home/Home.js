import React                                from 'react'
import BalanceWidget                        from './BalanceWidget'
import TransactionsWidget                   from './TransactionsWidget'
import { balanceStore, transactionsStore }  from 'stores'

class Home extends React.Component {
  render(){
    return <div className="home-container">
      <BalanceWidget balanceStore={balanceStore} transactionsStore={ transactionsStore }/>
    </div>
  }
}

export default Home
