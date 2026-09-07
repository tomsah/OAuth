import 'dotenv/config';
import express from 'express'
import path from 'path'

let access_token:string; 

const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/login', (req, res) => {
    // https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1 - Authorization Request
    // Check server details => /.well-known/openid-configuration
  const state= Math.random()
  res.redirect(`${process.env.AUTH0_URL}/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:3000/callback&state=${state}`)
})

app.get('/callback', async (req, res) => {
    const code = req.query.code as string;
    const cbState = req.query.state as string;
    console.log('code:', code);
    // exchange code for access token calling authorisation-server (this  is auth0)
    const response = await fetch(`${process.env.AUTH0_URL}/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            grant_type: "authorization_code",
            client_id: process.env.CLIENT_ID!,
            client_secret: process.env.CLIENT_SECRET!,
            code,
            redirect_uri: 'http://localhost:3000/callback'

        })

    })
    const responseText = await response.json()
    access_token =  responseText.access_token
    console.log('access_token', access_token)
    res.redirect('/my-account')  
})

app.get('/my-account', (req, res) => {
    if(access_token) {
        res.send('my-account')  
    }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})