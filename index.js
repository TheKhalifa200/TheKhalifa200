const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');
const rp = require('request-promise-native');


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
      var url = 'https://jsonplaceholder.typicode.com/todos/1';
         var options = {
        uri: url,
        json: true
        };
        return rp.get( options )
        .then( body => {
      agent.add("Got a response: "+body);
    })
        .error( err => {
        agent.add("Got an error: " + err);
    });
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