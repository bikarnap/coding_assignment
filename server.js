const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express(); 
let emails = require('./emails.json').emails; // to mimic a database

app.use(bodyParser.json()); // To access and parse body of the request
app.use(cors()); // To allow cross-origin resource sharing

/* *
* This route responses with all the data present in that endpoint 
* */
app.get('/api/emails', (_req, res) => {
    return res.json(emails); 
});

/* *
* This function returns an id for email address.
* This is a quick solution. 
* A more robust solution is needed, for example
* to test if an id already exists. 
* */
const getNewId = (emails) => {
    if (emails.length > 0) {
        return emails[emails.length - 1].id + 1
    } else {
        return 1
    }
}

/* *
* Post a new email address
* Here, the email is added as an object with properties id and email.
* Other properties can be added as required.
* */
app.post('/api/emails', (req, res) => {
    const email = req.body.email; 
    if (email == undefined) {
        return res.status(400).json({
            error: 'email missing'
        });
    }
    const newEmail = {
        email: email, 
        id: getNewId(emails)
    };
    emails = emails.concat(newEmail);
    return res.status(201).json(newEmail);
})

/* *
* Server configuration 
* */
const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

/* End of file  */