const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');
const axios = require('axios');


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
        let str
          axios
              .get('https://jsonplaceholder.typicode.com/todos/1')
              .then( response => {
                console.log(`Source of Anime Qoutes:`);
                str = console.log( response.data.join('\n') );
              })
              agent.add(str)
    }

    function sayHello(agent){
        agent.add("Hello, this is from heroku :3")
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