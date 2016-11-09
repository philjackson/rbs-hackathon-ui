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
    if (_.isEmpty(this.past))
      throw new Error('Can\'t compute "now" from an empty past')
    return (_.last(this.past)).transactionDateTime
  }

  constructor() {
    const now = new Date()
        , pastLimit = moment().subtract(2, 'weeks').toDate()
        , futureLimit = moment().add(2, 'weeks').toDate()

    // request
    //   .get('http://desdesperados.azurewebsites.net/transactions/past')
    //   .end((err, res) => console.log(res.body))

    this.past = _.range(0, 200)
      .map(_.partial(pastTransaction, pastLimit, now))
      .sort(byDate)

    this.future = _.range(0, 200)
      .map(_.partial(futureTransaction, now, futureLimit))
      .sort(byDate)
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
