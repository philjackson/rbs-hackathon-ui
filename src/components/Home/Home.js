import React                                from 'react'
import BalanceWidget                        from './BalanceWidget'
import TransactionsWidget                   from './TransactionsWidget'
import { balanceStore, transactionsStore }  from 'stores'

class Home extends React.Component {
  render(){
    return <div className="home-container">
      <div className="box">
        <h1 className="title">
          My Dashboard
        </h1>
        <div>
          <BalanceWidget balanceStore={balanceStore} transactionsStore={ transactionsStore }/>
        </div>
        <div>
          <TransactionsWidget transactionsStore={transactionsStore} />
        </div>
      </div>

    </div>
  }
}

export default Home
