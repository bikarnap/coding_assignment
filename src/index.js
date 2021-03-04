/* *
Form data submission to an api.
Tested with a fake api address, json-server, and a simple local server.
* */

const formElement = document.getElementById('form');
const API_URL = 'http://localhost:3001/api/emails' // Replace with your API
// const API_URL = 'http://localhost:3005/emails' 
// const API_URL = 'https://jsonplaceholder.typicode.com/posts' 

/* *
* Asynchronous function to get form data and post in json format.
* */
const postFormDataAsJson = async ({ url, formData }) => {
    const formDataPlain = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(formDataPlain);

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json",
        },
        body: formDataJson,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

/* *
* Handler to handle the submit action 
* Uses FormData web interface.
* Redirects to another page on succussful submission.
* */
const handleFormSubmit =  async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    let url = API_URL;

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });
        console.log({ responseData });
        window.location.href='/confirmation.html';
    } catch (error) {
        console.error(error);
    }
    document.getElementById('email').value = '';
}

formElement.addEventListener('submit', handleFormSubmit);

/******************************************************************/

/* *
* Function to validate email
* In index.html file, decision is made to select the input type as "email".
* So, html5 takes care of validating the email.
* HTML5 shows any error as a tooltip.
* To show an error for example as a paragraph, this function may be used to 
* validate email 
* */

/* const validateEmail = (email) => {
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
    if(regexEmail.test(email)) {
        return true; 
    } else {
        return false; 
    }
}  */

/* End of file */