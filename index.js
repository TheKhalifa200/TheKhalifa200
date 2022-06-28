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
        return app.get('https://jsonplaceholder.typicode.com/todos/1', (req, res) => {
            // check if verification token is correct
            if (req.query.token !== token) {
                return res.sendStatus(401);
            }
        
            // return challenge
            return res.end(req.query.challenge);})

        
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