const express = require('express');
const body_parser = require("body-parser");
const axios = require('axios')

const app = express().use(body_parser.json());

const token =process.env.TOKEN
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

      axios({
        method: 'POST',
        url: "https://graph.facebook.com/v17.0/" + phon_no_id + "/messages?access_token=" + token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: {
            body: "Hiiii"
          }
        },
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        console.log(res)
      }
      ).catch(
        err=>{
          console.log("error:")
          console.log(err)
        }
      );

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
})