import {updata} from './updata'
import showmes from './showmes'
import store from '../store/index'
export default {
    updata,
    showmes,
    state: store.state,
}