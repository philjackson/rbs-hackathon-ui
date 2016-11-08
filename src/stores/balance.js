import {observable} from 'mobx';

class BalanceStore {
  @observable balance = {
    in: 0,
    out: 0
  }

  constructor(){
    setInterval(()=> {
      this.balance.in += 100;
      this.balance.out += 90;
    }, 3000)
  }
}

export default BalanceStore
