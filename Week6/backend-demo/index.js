const express = require("express")
require('dotenv').config()
const app = express();






app.get('/', (req, res) => {
    console.log('Hello World')
    res.send('Hello World')
})


const port = process.env.PORT
console.log(`http://localhost:${port}`);
app.listen(port, () => console.log(`Server is up and running on port ${port}!`))