//f520b951ebbbf1169d4e0aba22b6ef19-us10
//audience key
//3c6d678265
const bodyParser = require("body-parser");
const  express = require("express");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
    app.get("/",(req,res)=>{
        res.sendFile(__dirname+"/index.html");
    })
        app.post("/",(req,res)=>{
            const fname = req.body.fname;
            const lname = req.body.lname;
            const email = req.body.email;
            const dataob  = {
                    members:[
                        {
                    email_address : email,
                    status : "subscribed",
                    merge_fields:{
                        FNAME:fname,
                        LNAME:lname
                    }
                }
                ]
            }
            const JSONdata = JSON.stringify(dataob);
            const url = 'https://us10.api.mailchimp.com/3.0/lists/3c6d678265'
            const option={
                method: "POST",
                auth : "mukul:f520b951ebbbf1169d4e0aba22b6ef19-us10"
            }
            const request = https.request(url,option,function(response){
                if(response.statusCode == 200){
                    res.sendFile(__dirname+"/sucess.html")
                }
                else{
                    res.sendFile(__dirname+"/failure.html");
                    //req.redirect(__dirname+"/")
                    
                    

                }
                response.on("data",function(data){
                    console.log(JSON.parse(data));
                })
            })
            request.write(JSONdata);
            request.end();
        })
        app.post("/failure",function(req,res){
            res.redirect("/");
        });
        app.listen( process.env.PORT || 3000,()=>{
            console.log("server started");
        })
    