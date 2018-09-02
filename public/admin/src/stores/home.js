import {observable, action} from 'mobx'
import {queryCounts} from '../services/api'
class Store {
    @observable
    data = {
       posts: 0,
       pv: 0,
       messages: 0 
    }
    @action
    async query() {
        let {counts} = await queryCounts()
        this.data = counts
    }
}

export default new Store