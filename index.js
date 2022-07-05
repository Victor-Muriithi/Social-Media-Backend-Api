const express = require('express');
const app = express();
const {router} = require('./routes/postsRoutes')

require('dotenv').config()

const port = process.env.PORT || 3001;

app.use(express.json())
app.use('/', router)



app.listen(port, ()=>{
    console.log(`Server is running on port:${port}`)
})