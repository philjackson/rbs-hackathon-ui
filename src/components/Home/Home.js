import React                                from 'react'
import BalanceWidget                        from './BalanceWidget'
import TransactionsWidget                   from './TransactionsWidget'
import { balanceStore, transactionsStore }  from 'stores'

class Home extends React.Component {
  render(){
    return <div className="container">
      <div className="box animated fadeInDown">
        <BalanceWidget balanceStore={balanceStore} />
      </div>
      <div className="box animated fadeInDown">
        <TransactionsWidget transactionsStore={transactionsStore} />
      </div>
    </div>
  }
}

export default Home
