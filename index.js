const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');


const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000

app.post('/dialogflow-fulfillment', (request, response) => {
    dialogflowFulfillment(request, response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const dialogflowFulfillment = (request, response) => {
    const agent = new WebhookClient({request, response})

    function membershipno(agent){
        const bent = require('bent')

        const getStream = bent('https://jsonplaceholder.typicode.com/todos/1')

        let stream = await getStream('/json.api')
        // status code
        stream.status // 200
        stream.statusCode // 200
        // optionally decode
        const obj = await stream.json()
        // or
        const str = await stream.text()
        agent.add(obj)
        agent.add(str)
    }

    function sayHello(agent){
        agent.add("Hello, this was a nice tutorial by axlewebtech")
    }
    function faultreply(agent){
        agent.add("That's not how it's said")
    }
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent-L0", sayHello)
    intentMap.set("Default Fallback Intent",faultreply)
    intentMap.set("MembershipNo",membershipno)
    agent.handleRequest(intentMap)


}