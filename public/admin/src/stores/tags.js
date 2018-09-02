import { observable, action } from "mobx";
import { queryTags } from "../services/api";

class Store {
    @observable
    data = {
        list: []
    }
    @observable 
    status = {
        model: false
    }
    @action
    async query() {
        let result = await queryTags()
        this.data.list = result.info.tags
    }
    @action 
    toggleStatus(type, payload) {
        this.status[type] = payload
    }
}

export default new Store()