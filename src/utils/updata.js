import store from "../store"

export function updata(key, value){
    store.commit({
        type: '_updata',
        data: {
            key,
            value
        }
    })
}
