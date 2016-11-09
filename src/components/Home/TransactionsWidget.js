import React              from 'react';
import { observer }       from 'mobx-react';
import TransactionChart   from './TransactionsChart'

@observer
class TransactionsWidget extends React.Component {

  render(){
    const { transactionsStore } = this.props;

    const balance = []

    const data = transactionsStore.past.slice().map(transaction => {
      balance.push({
        x: new Date(transaction.transactionDateTime),
        y: Number(transaction.accountBalance)
      })

      return {
        x: new Date(transaction.transactionDateTime),
        y: Number(transaction.transactionAmount)
      }
    })

    const series = [{
      name: 'Balance',
      opacity: 0.7,
      data: balance.slice(0, 30)
    }, {
      name: 'Past',
      opacity: 0.7,
      data: data.slice(0, 30)
    }]

    return <div>
      <TransactionChart
        series={series}
      />
    </div>
  }
}

export default TransactionsWidget
