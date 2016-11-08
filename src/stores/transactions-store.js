import { observable } from 'mobx'
import { finance, commerce, company, random } from 'faker'
import _ from 'lodash'

class TransanctionsStore {

  @observable
  past = []

  @observable
  future = []

  constructor() {
    this.past = _.range(0, 5).map(pastTransaction)
    this.future = _.range(0, 5).map(futureTransaction)
  }
}

// [
//     {
//         "accountId": "57e3b951a746a0f62525f820",
//         "transactionDateTime": "2015-12-22T20:58:26.512Z",
//         "transactionAmount": -499.99,
//         "accountBalance": 13186.43,
//         "transactionType": "POS",
//         "transactionDescription": "HARVEY NICHOLS EDINBURGH GB",
//         "id": "57e3b9545fcd0537745f428f",
//         "category": "clothing",
//         "unfamiliar" : "false"
//     },
// ]
function pastTransaction() {
  const unfamiliar = Math.random() < 0.7
  return Object.assign(transaction(), { unfamiliar })
}

// [
//    {
//         "accountId": "57e3b951a746a0f62525f820",
//         "transactionDateTime": "2015-12-22T00:00:00.000Z",
//         "transactionAmount": -400,
//         "accountBalance": 13186.43,
//         "transactionType": "D/D",
//         "transactionDescription": "NATWEST MORTGAGES LIMITED",
//         "id": "57e3b9545fcd0537745f428f",
//         "category": "mortgages",
//         "confidence": 0.8
//     },
// ]
function futureTransaction() {
  const confidence = Math.random()
  return Object.assign(transaction(), { confidence })
}

function transaction() {
  return {
    accountId:  "57e3b951a746a0f62525f820",
    transactionDateTime: new Date(),
    transactionAmount: finance.amount(),
    accountBalance: finance.amount(),
    transactionType: _.sample(['D/D', 'S/O', 'C/L']),
    transactionDescription: company.catchPhrase(),
    category: commerce.department(),
    id: random.uuid()
  }
}

export default TransanctionsStore

