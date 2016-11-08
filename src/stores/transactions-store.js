import { observable } from 'mobx'

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
    "accountId": "57e3b951a746a0f62525f820",
    "transactionDateTime": new Date(),
    "transactionAmount": 400,
    "accountBalance": 13186.43,
    "transactionType": "D/D",
    "transactionDescription": "NATWEST MORTGAGES LIMITED",
    "syntheticId": "57e3b9545fcd0537745f428f",
    "category": "clothing"
  }
}
export default TransanctionsStore
