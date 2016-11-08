import { observable } from 'mobx'
import { finance, commerce, company, random, date } from 'faker'
import moment from 'moment'
import { range, partial } from 'lodash'

class TransanctionsStore {

  @observable
  past = []

  @observable
  future = []

  lastTick

  constructor() {
    const now = new Date()
        , pastLimit = moment().subtract(2, 'months').toDate()
        , futureLimit = moment().add(2, 'months').toDate()

    this.past = range(0, 50)
      .map(_.partial(pastTransaction, pastLimit, now))
      .sort(byDate)

    this.future = range(0, 50)
      .map(_.partial(futureTransaction, now, futureLimit))
      .sort(byDate)

    this.lastTick = now
  }
}

function byDate(a, b) {
  return a < b
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
function pastTransaction(from, to) {
  const unfamiliar = Math.random() < 0.7
  return Object.assign(transaction(from, to), { unfamiliar })
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
function futureTransaction(from, to) {
  const confidence = Math.random()
  return Object.assign(transaction(from, to), { confidence })
}

function transaction(from, to) {
  return {
    accountId:  "57e3b951a746a0f62525f820",
    transactionDateTime: date.between(from, to),
    transactionAmount: finance.amount(),
    accountBalance: finance.amount(),
    transactionType: _.sample(['D/D', 'S/O', 'C/L']),
    transactionDescription: company.catchPhrase(),
    category: commerce.department(),
    id: random.uuid()
  }
}

export default TransanctionsStore

