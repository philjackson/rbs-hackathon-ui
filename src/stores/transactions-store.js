import { observable } from 'mobx'
import { finance, commerce, company } from 'faker'

class TransanctionsStore {

  @observable
  transactions = []

  constructor() {
    setInterval(() => {
      this.transactions.unshift(transaction())
    }, 1000)
  }
}

function transaction() {
  return {
    accountId:  "57e3b951a746a0f62525f820",
    transactionDateTime: new Date(),
    transactionAmount: finance.amount(),
    accountBalance: finance.amount(),
    transactionType: 'D/D',
    transactionDescription: company.catchPhrase(),
    syntheticId: {},
    category: commerce.department()
  }
}

export default TransanctionsStore
