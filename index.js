var request = require('request')
var express = require('express')
var bodyParser = require('body-parser')

var passwordgen = require('./passwordgen')
var password = passwordgen.password
var timestamp = passwordgen.timestamp
var app = express()
app.use(bodyParser.urlencoded({
     extended: true
})); 
app.use(bodyParser.json());


app.get('/access_token',access,(req,res)=>{
    res.status(200).json({access_token:req.access_token})    
})

app.get('/register',access,(req,res)=>{
    url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    auth ="Bearer " + req.access_token
    request(
       {
           url:url,
           method:'POST',
           headers:{
            'Authorization':auth
           },
           json : {
            "ShortCode": "603093",
            "ResponseType": "Complete",
            "ConfirmationURL": "http://996de779.ngrok.io/confirmation",
            "ValidationURL": "http://996de779.ngrok.io/validation"
          }
          
       },
       function (error, response, body) {
           if(error){
            console.log(error)
           }else{
                res.status(200).json(body)
           }
       }
    )

})

app.post('/confirmation',(req,res)=>{
    // mpesa_response = req.body
    console.log("......confirmation......")
    console.log(req.body)
   
})
app.post('/validation',(req,res)=>{
    mpesa_response = req.body
    console.log("......validation......")
    console.log(req.body)
})

app.get('/simulate',access,(req,res)=>{
    url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
    auth ="Bearer " + req.access_token
    request(
       {
           url:url,
           method:'POST',
           headers:{
            'Authorization':auth
           },
           json : {
            "ShortCode":"603093",
            "CommandID":"CustomerPayBillOnline",
            "Amount":"265",
            "Msisdn":"254708374149",
            "BillRefNumber":"TestAPI "
          }
          
       },
       function (error, response, body) {
           if(error){
            console.log(error)
           }else{
                res.status(200).json(body)
           }
       }
    )

})

// mpesa stk push
app.get('/mpesastk',access,(req,res)=>{
    
  url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
  auth ="Bearer " + req.access_token

  request(
      {
    url:url,
    method:'POST',
    headers : {
        "Authorization" : auth
      },
        json : {
            "BusinessShortCode": "174379",
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": "132",
            "PartyA": "254702930617",
            "PartyB": "174379",
            "PhoneNumber": "254702930617",
            "CallBackURL": "http://996de779.ngrok.io/hooks/mpesa",
            "AccountReference": "test ",
            "TransactionDesc": "test"
        }
    },
            function (error, response, body) {
                if(error){
                console.log(error)
                }else{
                    res.status(200).json(body)
                }
            }
       )

})


// mpesa b2c
app.get('/mpesab2c',access,(req,res)=>{

    url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest"
    auth ="Bearer " + req.access_token
    // console.log(auth)
    request(
        {
      url:url,
      method:'POST',
      headers : {
          "Authorization" : auth
        },
          json : {
            "InitiatorName": "safaricom.d",
            "SecurityCredential":"dHwbOWbqtaqj0IRlkNjc4uuNuCgNW88KpZlvdOlqoK/pZSH65NOpqQrajDevrAB/2sjZvOA7q1Sy46OKSHZf3/tCs2AzlRrg36WTMUzxdnu4JCXcvQRs28GUKfKqqI8QqkaE+6yvjjaYSHpzfNo2aKTvNRdHZ2S7onTchbn/TDPP+zVnxzr0qPaO9dVg/zzvRk+CGlcW1hWMAi9bNqwmXvCaFtn/M/IM5dA5CNaNRLbZ/11hxtOLM4cRSEEDHC2Ceqa9f5dZuE18VXnpE9CJHlKscEpVRZW85aWhT3DIUY8vaxRIoCjx517O7x5qWVtwkt60IVi90h6jc6vIHEjnKA==",
            "CommandID": "BusinessPayment",
            "Amount": "1000",
            "PartyA": "603093",
            "PartyB": "254708374149",
            "Remarks": "Testing string",
            "QueueTimeOutURL":"http://996de779.ngrok.io/timeout" ,
            "ResultURL": "http://996de779.ngrok.io/result",
            "Occasion": "testing"
          }
      },
              function (error, response, body) {
                  if(error){
                  console.log(error)
                  }else{
                      res.status(200).json(body)
                  }
              }
         )
  
})

// mpesa b2b
app.get('/mpesab2b',access,(req,res)=>{
    url = "https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest"
    auth ="Bearer " + req.access_token
    // console.log(auth)
    request(
        {
      url:url,
      method:'POST',
      headers : {
          "Authorization" : auth
        },
          json : {
            "Initiator": "safaricom.d",
            "SecurityCredential":"ZLeyps/G6jyl0iF2iQa/P6WEIbPj9Ef3SAZWbKsReJoyMgbOTE60HJNs6wzBBKozlcBiPNUkwjkYljPR4thV/u2V8THprg3zqeClEG3pINzEOoPa6g1XsLbP8iNmH4deECGpCyqZ1nkUkX4jIsTyBhkvg/qCmBjRPKUuBTGo8W7z1QB83oEY0dWeDoAazQMZPjpTsBMr4bTG8QarT162iB7HufrpKd748Hwx7FEm2lF49WVbF1JIj0QdkUBnO3lAzvSYVTpjpVFma/cs4RDJ+WhcfwGp+xsPRnMyAEMuiD4oYTeR/FqraQtpCwozdqmoDW1dQ0RsZtIbiuaoUKvmH9o1l2KEA==/sVJihJysVlgfZwsigaTUzH7/PHY8nnFFNHiV84vCvlh8oTGXzLAnp0C4Sd7zFfGFvTi1fye317Aeh8+PUEmpcr/04wetmT6cajgoiBGB9w403cskNjtI6KHf7NUS9MKEASIgYkeS1WdSOzfjsdYT1fcnMgcrCX7N//e3t6Uaz/e8LxTQ5DQN4HbeKMuRwQ98fypFzwBNpXflbxD5XeEyYIxBe5NnXwM6jpS3eEcQkNRDrU+c8eaHf1X3Y4dDoBgFDqPkEVGNZqse/6mp/vUjDvYvll9QhI24DA==",
            "CommandID": "MerchantToMerchantTransfer",
            "SenderIdentifierType": "4",
            "RecieverIdentifierType": "4",
            "Amount": "1000",
            "PartyA": "603093",
            "PartyB": "600000",
            "AccountReference": " ",
            "Remarks": "Testing string",
            "QueueTimeOutURL":"http://996de779.ngrok.io/timeout" ,
            "ResultURL": "http://996de779.ngrok.io/result",
        
          }
      },
              function (error, response, body) {
                  if(error){
                  console.log(error)
                  }else{
                      res.status(200).json(body)
                  }
              }
         )
  
})

app.get('/mpesa/timeout',(req,res)=>{
    let message = app.get('data')
   
    res.send (["------this is a callback----- \n",JSON.stringify(message,null, 4)])
})
app.get('/mpesa/result',(req,res)=>{
    let message = app.get('resultdata')
   
    res.send (["------this is a callback----- \n",JSON.stringify(message,null, 4)])
})
app.post('/mpesa/timeout',(req,res)=>{
if(req.body.Result.ResultCode === "0"){
    app.set('data', req.body)
}
    
    console.log("--------timedout--------")
    console.log(req.body)

    let message = {
        "ResponseCode": "00000000",
        "ResponseDesc": "success"
      };
    
    // respond to safaricom servers with a success message
    res.json(message);
})
app.post('/timeout',(req, res) =>{
    // app.set('data', req.body);
    console.log("--------timedout--------")
    console.log(req.body)

    let message = {
        "ResponseCode": "00000000",
        "ResponseDesc": "success"
      };
    
    // respond to safaricom servers with a success message
    res.json(message);

})

app.post('/result',(req, res) =>{
    console.log("--------Result--------")
    console.log(req.body)
    app.set('Resultdata', req.body)
    let message = {
        "ResponseCode": "00000000",
        "ResponseDesc": "success"
      };
      
    // respond to safaricom servers with a success message
    res.json(message);
})

//  mpesa logs
app.post('/hooks/mpesa', (req, res) => {
    console.log('-----------Received M-Pesa webhook-----------');
      
    // format and dump the request payload recieved from safaricom in the terminal
    console.log(req.body);
    console.log('-----------------------');
      
    let message = {
        "ResponseCode": "00000000",
        "ResponseDesc": "success"
      };
    // respond to safaricom servers with a success message
    res.json(message);
  });

//  get auth token 
function access(req, res ,next){
    consumer_key = "GtdxksguWyvvGK5o2CF8iNM1ykS81xoM",
    consumer_secret = "KuFtzfOLKshYCF1H",
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    auth = "Basic " + Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

    request(
        {
          url : url,
          headers : {
            "Authorization" : auth
        }
        },
        function (error, response, body) {
            if(error){
               console.log(error) 
            }else{
                req.access_token =JSON.parse(body).access_token
                next()
            }
        }
      )
}
app.listen(3000)































































































// var fs = require('fs')
// var http = require('http')

// var server = http.createServer(function(req,res){
//     console.log('request was made' +req.url)
//     res.writeHead(200,{'content-Type': 'application/json'})
//     var readStream = fs.createReadStream(__dirname +'/readme.txt','utf8')
//     let myObj = {
//         name: 'kamicauze',
//         job:'coder',
//         age:'23'
//     }

//         res.end(JSON.stringify(myObj))
//     // var writeStream = fs.createWriteStream(__dirname + '/Writeme.txt')
    
//     // readStream.pipe(res)
// })

// server.listen(3000,'127.0.0.1')
// console.log("kamicauze is listening to port 3000")




// // readStream.on('data', (chunk)=>{
// //    console.log('new chunk recieved')
// //    writeStream.write(chunk) 
// // })

// // readStream.pipe(writeStream)