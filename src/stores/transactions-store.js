import { observable } from 'mobx'
import { finance, commerce, company } from 'faker'

class TransanctionsStore {

  @observable
  past = []

  @observable
  future = []

  constructor() {
    setInterval(() => {
      this.past.unshift(pastTransaction())
    }, 4000)
  }
}

function pastTransaction() {
  const unfamiliar = Math.random() < 0.7
  return Object.assign(transaction(), { unfamiliar })
}

function futureTransaction() {
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
