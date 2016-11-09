import { observable, computed } from 'mobx'
import { finance, commerce, company, random, date } from 'faker'
import moment from 'moment'
import _ from 'lodash'
import request from 'superagent'

export default class TransanctionsStore {

  @observable
  past = []

  @observable
  future = []

  @computed
  get next24h() {
    if (_.isEmpty(this.future)) return []
    const now = this.now()
        , from = now
        , to = moment(now).add(24, 'hours').toDate()
    return this.future.filter(withinRange(from, to))
  }

  @computed
  get last24h() {
    if (_.isEmpty(this.past)) return []
    const now = this.now()
        , from = moment(now).subtract(24, 'hours').toDate()
        , to = now
    return this.past.filter(withinRange(from, to))
  }

  @computed
  get nextMonth() {
    if (_.isEmpty(this.future)) return []
    const now = this.now()
        , from = now
        , to = moment(now).add(1, 'months').toDate()
    return this.future.filter(withinRange(from, to))
  }

  @computed
  get lastMonth() {
    if (_.isEmpty(this.past)) return []
    const now = this.now()
        , from = moment(now).subtract(1, 'months').toDate()
        , to = now
    return this.past.filter(withinRange(from, to))
  }

  @computed
  get lastMonthBalance() {
    if (_.isEmpty(this.lastMonth)) return 0
    return _.last(this.lastMonth).accountBalance
  }

  @computed
  get nextMonthBalance() {
    if (_.isEmpty(this.nextMonth)) return 0
    return _.last(this.nextMonth).accountBalance
  }

  @computed
  get lastMonthCreditBalance() {
    if (_.isEmpty(this.lastMonth)) return 0
    return this.lastMonth.reduce((total, { transactionAmount }) => {
      if (transactionAmount < 0) return total
      return total + transactionAmount
    }, 0)
  }

  @computed
  get lastMonthDebitBalance() {
    if (_.isEmpty(this.nextMonth)) return 0
    return this.lastMonth.reduce((total, { transactionAmount }) => {
      if (transactionAmount >= 0) return total
      return total + Math.abs(transactionAmount)
    }, 0)
  }

  @computed
  get nextMonthCreditBalance() {
    if (_.isEmpty(this.nextMonth)) return 0
    return this.nextMonth.reduce((total, { transactionAmount }) => {
      if (transactionAmount < 0) return total
      return total + transactionAmount
    }, 0)
  }

  @computed
  get nextMonthDebitBalance() {
    if (_.isEmpty(this.nextMonth)) return 0
    return this.nextMonth.reduce((total, { transactionAmount }) => {
      if (transactionAmount >= 0) return total
      return total + Math.abs(transactionAmount)
    }, 0)
  }

  @computed
  get accountBalance() {
    if (_.isEmpty(this.past)) return 0
    return _.last(this.past).accountBalance
  }

  now() {
    if (_.isEmpty(this.past)) return new Date()
    return (_.last(this.past)).transactionDateTime
  }

  constructor() {

    Promise.all(
      [ request.get('http://desdesperados.azurewebsites.net/transactions/past')
      , request.get('http://desdesperados.azurewebsites.net/transactions/future')
      ]
      )
      .then(([ past, future ]) => {

        this.past = past.body
          .map(cleanTransactions)
          .sort(byDate)

        this.future = future.body
          .map(cleanTransactions)
          .sort(byDate)

        // const now = this.now()
        //     , pastLimit = moment(now).subtract(2, 'weeks').toDate()
        //     , futureLimit = moment(now).add(2, 'weeks').toDate()

        // this.future = _.range(0, 200)
        //   .map(_.partial(futureTransaction, now, futureLimit))
        //   .sort(byDate)
      })
      .catch(e => {
        console.log('something went wrong')
      })

    // this.past = _.range(0, 200)
    //   .map(_.partial(pastTransaction, pastLimit, now))
    //   .sort(byDate)

    // this.future = _.range(0, 200)
    //   .map(_.partial(futureTransaction, now, futureLimit))
    //   .sort(byDate)
  }
}

function byDate(a, b) {
  if (a.transactionDateTime < b.transactionDateTime) return -1
  if (a.transactionDateTime > b.transactionDateTime) return 1
  return 0
}

const withinRange = (from, to) => ({ transactionDateTime }) =>
  transactionDateTime >= from && transactionDateTime < to

function pastTransaction(from, to) {
  const unfamiliar = Math.random() < 0.8
  return Object.assign(transaction(from, to), { unfamiliar })
}

function futureTransaction(from, to) {
  const confidence = Math.random()
  return Object.assign(transaction(from, to), { confidence })
}

function cleanTransactions(t) {
  t.transactionDateTime = new Date(t.transactionDateTime)
  t.id = t.id || _.uniqueId('generated-id')
  t.accountBalance = t.accountBalance || 0
  return t
}

function transaction(from, to) {

  return {
    accountId:  "57e3b951a746a0f62525f820",
    transactionDateTime: date.between(from, to),
    transactionAmount: finance.amount() * (Math.random() < 0.95 ? -1 : 1),
    accountBalance: finance.amount(),
    transactionType: _.sample(['D/D', 'S/O', 'C/L']),
    transactionDescription: company.catchPhrase(),
    category: commerce.department(),
    id: random.uuid(),
  }
}

// accountId:"123242453"
// category:"mortgage payment"
// confidence:1
// transactionAmount:-850
// transactionDateTime:"2016-11-02T00:00:00.000Z"
// transactionDescription:"Natwest"

// accountBalance:-824.05
// accountId:"123242453"
// category:"food-drink"
// id:"6430fd47-7dfc-44a7-a55f-a7c38159c0c2"
// transactionAmount:-4.2
// transactionDateTime:"2016-06-01T19:01:15+01:00"
// transactionDescription:"Starbucks"
// type:"POS"
// unfamiliar:true
