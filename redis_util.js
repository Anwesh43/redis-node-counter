const {promisify} = require('util')
const redis = require('redis')
const client = redis.createClient()
client.on('error', console.error)
const getAsync = promisify(client.get).bind(client)

const getValue = (key) => getAsync(key)

const setValue = (key, value, cb) => {
    return new Promise((resolve, reject) => {
        client.set(key, value, (err) => {
            if (err == null) {
                resolve("success")
            } else {
                reject("error")
            }
        })
    })

}

module.exports = {getValue, setValue}
