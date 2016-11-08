import React from 'react';
import {observer} from 'mobx-react';

@observer
export default class BalanceWidget extends React.Component {
  render(){
    const {store} = this.props;
    return <div>
      <div>
        In: {store.balance.in}
      </div>
      <div>
        Out: {store.balance.out}
      </div>
    </div>
  }
}
