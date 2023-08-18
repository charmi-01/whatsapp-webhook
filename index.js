const express = require('express');
const body_parser = require("body-parser");
const axios = require('axios')

const app = express().use(body_parser.json());

const token ='Bearer EAAXQdCcZBoocBO4cHJ7B3tEPbXZBrcz1XrM5DTTDNXwbMm2M4HryOrl090vgfZAY1UboEKruATSTZBTtdnqJoty3Cg7XqNzWR5jBgrs6y1xmUIVZASAInFwLBLGmIVDdRdzKZA9NvlM3c6CddXfQ1XuVOtDhnZCflowtpOGBOwtJWEI3RFDOWgtRp4hRXsB7GRXmji09VRKgflUFL5H'
const mytoken = "billfree";


app.listen(8000, () => {
  console.log("webhook is listening");
});

//to verify working
app.get('/', (req, res) => {
  res.status(200).send("api is working")
})

//to verify the callback url from dashboard side -cloud api side 
app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      res.status(200).send(challenge);
    } else {
      res.status(403).json({ message: "error" }
      )
    }
  } else {
    res.status(200).json({ message: "lets use  whatsapp api" })
  }
})

app.post("/webhook", (req, res) => {
  let body_params = req.body;

  console.log(JSON.stringify(body_params, null, 2));

  if (body_params.object) {
    if (body_params.entry && body_params.entry[0].changes && body_params.entry[0].changes[0].value.messages && body_params.entry[0].changes[0].value.messages[0]) {
      let phon_no_id = body_params.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body_params.entry[0].changes[0].value.messages[0].from;
      let msg_body = body_params.entry[0].changes[0].value.messages[0].text.body;

      let data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": from,
        "type": "text",
        "text": {
            "preview_url": true,
            "body": "your msg is : "+msg_body
        }
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://graph.facebook.com/v16.0/'+phon_no_id+'/messages',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': token
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
})