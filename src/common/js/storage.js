import storage from 'good-storage'

const SELLER_KEY = '__seller__'

// 存储
export function saveToLocal(id, key, val) {
   let seller = storage.get(SELLER_KEY, {})
   // 检测id值是否被存储
   if (!seller[id]) {
       seller[id] = {}
   }
   seller[id][key] = val
   // 拼接存储存储对象
   storage.set(SELLER_KEY, seller)
}

// 取值
export function loadFromLocal(id, key, def) {
    let seller = storage.get(SELLER_KEY, {})
    if (!seller[id]) {
        return def
    }
    return seller[id][key] || def
}
