import React                    from 'react'
import { BrowserRouter, Match } from 'react-router'

import Header                   from 'components/Header'
import Home                     from 'components/Home'
import Accounts                 from 'components/Accounts'

const Routes = () => <BrowserRouter>
  <div>
    <Match pattern='*' component={Header} />
    <Match exactly pattern='/' component={Home} />
    <Match pattern='/accounts' component={Accounts} />
  </div>
</BrowserRouter>

export default Routes
