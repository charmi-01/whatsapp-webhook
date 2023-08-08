const express = require('express');
const body_parser = require("body-parser");
const axios = require('axios')

const app = express().use(body_parser.json());

const token = "EAAXQdCcZBoocBO7zEzZBpzZBjmoXmA5TleynrxjSp4yLFXs2aWV1qe1ZBRA64ntXY6XVgaXrkEdjQROFmtj313yJtNUctdCFBtCBACKvZBIrzuk33ysGZBfuMSGQtcgA1VZCn5D4ojJrZBwNNgYzdzYGebgvwVfWdqSDZCg76U7IgGEpWLf2YYFtp8EPJjXv9BYEMn62ZCdZC33nw4VedPIqtPklMEHAhbZAirWYvIkZD"
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
        res.status(200).json({ message: "connect to whatsapp api" })
    }
})

app.post("/webhook",  (req, res) => {

    const body_params = JSON.stringify(req.body, null, 2);
    console.log(body_params);
    const parsed=JSON.parse(body_params);
    console.log(1)
    if (parsed.entry) {
        console.log(2);
        console.log(parsed.entry[0].changes[0])
        console.log(3)
        let phone_number_id = parsed.entry[0].changes[0].value.metadata.phone_number_id;
        console.log(phone_number_id)
        let from = parsed.entry[0].changes[0].value.messages[0].from;
        console.log(from)
        let msg_body = parsed.entry[0].changes[0].value.messages;
        console.log(msg_body)
        const response =  axios({
            method: "POST",
            url: "https://graph.facebook.com/v13.0/" + phone_number_id + "/messages?access_token=" + token,
            data: {
                messaging_product: "whatsapp",
                to: from,
                text: {
                    body: 'hii.. i am chirag' + msg_body
                }
            },
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response);
        res.sendStatus(200);
    }

})