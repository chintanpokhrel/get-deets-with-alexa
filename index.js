const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/output", express.static(__dirname + "/output"));

app.get('/', (req, res) => {
  console.dir(req.body);
  res.sendFile(__dirname + '/report.html')
});

let json = {
  "version": "1.0",
  "sessionAttributes": {
    "supportedHoriscopePeriods": {
      "daily": true,
      "weekly": false,
      "monthly": false
    }
  },
  "response": {
    "outputSpeech": {
      "type": "PlainText",
      "text": "Hello there, I'm quite cool."
    },
    "card": {
      "type": "Simple",
      "title": "Horoscope",
      "content": "Today will provide you a new learning opportunity.  Stick with it and the possibilities will be endless."
    },
    "reprompt": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Can I help you with anything else?"
      }
    },
    "shouldEndSession": false
  }
};


app.post('/', async (req, res) => {
  const req_type = req.body.request.type;
  console.log(req_type);

  switch (req_type){
  case "LaunchRequest":
    json.response.outputSpeech.text = "Hi there!, how can I help you ?";
    break;
  case "IntentRequest":
    console.log("correct intent");
    await act(req.body.request.intent.name);
    json.response.outputSpeech.text = "Done. Load the local webpage to see";
    break;
  }
  
  console.log(json);
               
  res.send(json);
});

function act(intent){
  switch(intent){
  case "CycleRuntimeReport":
    generateCycleRunTimeReport();
    break;
  default:
    throw "Unhandled Intent";
  }
}

function generateCycleRunTimeReport(){
  const exec = require('child_process').exec;
  exec("python visualize.py", (error, stdout, stderror)=>{
    if(error){
      console.log("visualize failed with error code: " + err.code);
    }       
    console.log(stdout);
  });
}

app.listen(3000, ()=>console.log('Server started. Listening on localhost port 3000')); 
