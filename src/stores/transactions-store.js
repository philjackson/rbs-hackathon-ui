import { observable, computed } from 'mobx'
import { finance, commerce, company, random, date } from 'faker'
import moment from 'moment'
import _ from 'lodash'

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
      , type = 'past'
  return Object.assign(transaction(from, to), { type, unfamiliar })
}

function futureTransaction(from, to) {
  const confidence = Math.random()
      , type = 'future'
  return Object.assign(transaction(from, to), { type, confidence })
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
