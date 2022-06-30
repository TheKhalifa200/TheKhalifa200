const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');
const bent = require('bent');
const axios = require('axios').default;


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
        let ar =[]
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            responseType: 'stream'
          })
            .then(function (response) {
                
                for (var i in response.data)
                {
                    ar[i] = response.data[i]
                }
            });
        agent.add(String(ar[0]))

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