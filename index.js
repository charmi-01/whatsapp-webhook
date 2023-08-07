const express=require('express');
const body_parser=require("body-parser");
const axios= require('axios')

const app=express().use(body_parser.json()); 

const token="no token here";
const mytoken="billfree";


app.listen(8000,()=>{
    console.log("webhook is listening");
});

//to verify working
app.get('/',(req,res)=>{
    res.status(200).send("api is working")
})

//to verify the callback url from dashboard side -cloud api side 
app.get("/webhook",(req,res)=>{
    let mode=req.query["hub.mode"];
    let challenge=req.query["hub.challenge"];
    let token=req.query["hub.verify_token"];

    if(mode &&token){
        if(mode==="subscribe" && token===mytoken){
            res.status(200).send(challenge);
        }else{
            res.status(403).json({message:"error"}
            )
         }
    }else{
        res.status(200).json({message:"connect to whatsapp api"})
    }
})

app.post("/webhook",(req,res)=>{

    let body_params=req.body;

    console.log(JSON.stringify(body_params,null,2));

    if(body_params.object){
        if(body_params.entry 
            && body_params.entry[0].changes 
            && body_params.entry[0].changes[0].value.message 
            && body_params.entry[0].changes[0].value.message[0])
        {
            let phone_number_id= body_params.entry[0].changes[0].value.metadata.phone_number_id;
            let from= body_params.entry[0].changes[0].values.messages[0].from;
            let msg_body= body_params.entry[0].changes[0].value.messages[0].text.body;

            axios({
                method:"POST",
                url:"https://graph.facebook.com/v13.0/"+phone_number_id+"/messages?access_token="+token,
                data:{
                    messaging_product:"whatsapp",
                    to:from,
                    text:{
                        body:'hii.. i am chirag'+msg_body
                    }
                },
                headers:{
                    "Content-Type":"application/json"
                }
            });

            res.status(200).json({'from':from,"msg":msg_body})
        }else{
            res.sendStatus(404);
        }
    }

})