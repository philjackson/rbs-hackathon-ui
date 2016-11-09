import React                                from 'react'
import BalanceWidget                        from './BalanceWidget'
import TransactionsWidget                   from './TransactionsWidget'
import { balanceStore, transactionsStore }  from 'stores'

class Home extends React.Component {
  render(){
    return <div className="container">
      <div className="box">
        <BalanceWidget balanceStore={balanceStore} transactionsStore={ transactionsStore }/>
      </div>
      <div className="box">
        <TransactionsWidget transactionsStore={transactionsStore} />
      </div>
    </div>
  }
}

export default Home
