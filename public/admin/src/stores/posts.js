import {observable, action} from 'mobx'
import { queryPosts, queryTags } from '../services/api';
class Store {
    @observable
    data = {
        list: [],
        tags: []
    }
    @action
    async queryPosts() {
        let result = await queryPosts()
        console.log(this, result);
    }
    async queryTags() {
        let result = await queryTags()
        console.log(this, result);
    }
}

export default new Store()