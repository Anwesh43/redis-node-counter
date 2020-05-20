const express = require('express')
const app = express()
const {getValue, setValue} = require('./redis_util')

app.get('/ping', async (req, res) => {
    var count = "0"
    try {
        count = await getValue("counterapp")
        console.log(count)
        if (count == null) {
            count = "0"
        }
    } catch(er) {

    }
    try {
        await setValue("counterapp", parseInt(count) + 1)
        res.send(`${parseInt(count) + 1}`)
    } catch(err) {
        res.send(`error in updating ${count}`)
    }
})

app.listen(8000, () => {
    console.log("listening in port 8000")
})
