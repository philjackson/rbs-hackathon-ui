import {observable, computed} from 'mobx';
import _ from 'lodash'


class BalanceStore {
  @observable balance = _.random(3000, 8500)
  @observable mBalance = []
  @observable mIn = []
  @observable mOut = []

  @computed get spent(){
    return _.sum(_.map(this.mOut, 'y'))
  }

  @computed get paid(){
    return _.sum(_.map(this.mIn, 'y'))
  }


  constructor(){
    this.mIn.push({x: Date.now(), y: this.balance})
    this.moneyIn()
    this.moneyOut()
  }

  moneyOut(){
    const delta = _.random(5, 300)
    this.balance -= delta;
    this.mOut.push({x: Date.now(), y: delta})
    this.updateBalance()
    setTimeout(() => this.moneyOut(), _.random(1000, 4000))
  }

  updateBalance(){
    this.mBalance.push({x: Date.now(), y: this.balance})
  }

  moneyIn(){
    const delta = _.random(3000, 3500)
    this.balance += delta
    this.mIn.push({x: Date.now(), y: delta})
    this.updateBalance()
    setTimeout(() => this.moneyIn(), _.random(50000, 100000))
  }

  resetCount(){
    this.mIn.length = 0;
    this.mOut.length = 0;
    this.balance.length = 0;
  }
}

export default BalanceStore
