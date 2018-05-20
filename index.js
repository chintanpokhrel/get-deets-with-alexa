const express = require('express')
const app = express()

const default_response = require(__dirname + "/data/default_response.js");
const cycle_reporter = require(__dirname + "/cycle_reporter.js");

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/output", express.static(__dirname + "/output"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/report.html')
});

app.post('/', async (req, res) => {
  const req_type = req.body.request.type;
  let json = default_response.getDefaultResponse();

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
  
  res.send(json);
});

function act(intent){
  switch(intent){
  case "CycleRuntimeReport":
    cycle_reporter.generateCycleRunTimeReport();
    break;
  default:
    throw "Unhandled Intent";
  }
}

app.listen(3000, ()=>console.log('Server started. Listening on localhost port 3000')); 
