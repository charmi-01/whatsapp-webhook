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

    let body_params = req.body;

    console.log(body_params);
    console.log(1)
    if (body_params.object) {
        console.log(2);
        console.log(body_params.entry[0])
        // if(body_params.entry && body_params.entry[0].changes && body_params.entry[0].changes[0].value.message && body_params.entry[0].changes[0].value.message[0])
        // {
        //     console.log(3);
        //     let phone_number_id= body_params.entry[0].changes[0].value.metadata.phone_number_id;
        //     let from= body_params.entry[0].changes[0].values.messages[0].from;
        //     let msg_body= body_params.entry[0].changes[0].value.messages[0].text.body;
        //     console.log(msg_body);
        //     let response=await axios({
        //         method:"POST",
        //         url:"https://graph.facebook.com/v13.0/"+phone_number_id+"/messages?access_token="+token,
        //         data:{
        //             messaging_product:"whatsapp",
        //             to:from,
        //             text:{
        //                 body:'hii.. i am chirag'+msg_body
        //             }
        //         },
        //         headers:{
        //             "Content-Type":"application/json"
        //         }
        //     });
        //     console.log(response)

        //     res.sendStatus(200);
        // }else{
        //     res.sendStatus(404);
        // }
        let phone_number_id = body_params.entry[0].changes[0].value.metadata.phone_number_id;
        let from = body_params.entry[0].changes[0].values.messages[0].from;
        let msg_body = body_params.entry[0].changes[0].value.messages[0].text.body;
        console.log(msg_body);
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
        console.log(response)

        res.sendStatus(200);
    }

})