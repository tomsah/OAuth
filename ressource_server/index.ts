import 'dotenv/config';
import express from 'express'
import path from 'path'


const app = express()


app.get('/my-account', (req, res) => {
    //Read token from authorisation header
    //check token signature with jwks from auth0
    //optionally jwks url from the url docs 
    //https://www.rfc-editor.org/rfc/rfc9068.html#name-validating-jwt-access-token
    if(req.access_token.access_token) {
        res.send('my-account')  
    }
})

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001')
})