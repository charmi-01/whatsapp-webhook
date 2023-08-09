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

app.post("/webhook", async (req, res) => {
    try {
        const body_params = JSON.stringify(req.body, null, 2);
        console.log(body_params);
        const parsed = JSON.parse(body_params);
        console.log(1)
        if (parsed.entry) {
            console.log(2);
            console.log(parsed.entry[0].changes[0])
            console.log(3)
            let phone_number_id = parsed.entry[0].changes[0].value.metadata.phone_number_id;
            console.log(phone_number_id)
            let from = parsed.entry[0].changes[0].value.messages[0].from;
            console.log(from)
            let msg_body = parsed.entry[0].changes[0].value.messages[0].text.body;
            console.log(msg_body)
            var data = JSON.stringify({
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": '918924893308',
                "type": "text",
                "text": {
                    "body": "YOUR_MESSAGE_CONTENT:"
                }
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://graph.facebook.com/v17.0/114778888258379/messages?access-token='+token,
                headers: {
                    // 'Authorization': token,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    } catch (error) {
        console.error("Error:", error);
        res.sendStatus(500);
    }
})