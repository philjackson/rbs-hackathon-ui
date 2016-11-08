import React                    from 'react'
import { BrowserRouter, Match } from 'react-router'

import Header                   from 'components/Header'
import Home                     from 'components/Home'
import Transactions             from 'components/Transactions'

import { transactionsStore }    from 'stores'

const Routes = () => <BrowserRouter>
  <div>
    <Match pattern='*' component={Header} />
    <Match exactly pattern='/' component={Home} />
    <Match pattern='/transactions' render={ renderTransactions } />
  </div>
</BrowserRouter>


function renderTransactions() {
  return <Transactions store={ transactionsStore } />
}

export default Routes
