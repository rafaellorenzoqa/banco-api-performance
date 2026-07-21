import http from 'k6/http'; //allows us to use http requests
import { sleep, check } from 'k6'; //gives us the sleep command

export const options = {
    //define the number of iterations for the test
    iterations: 10,
}

export default function () {
    //this is where our test will go into (only 1 default function per file, meaning only 1 test per file (login.test))
    const url = 'http://localhost:3000/login'; //endpoint we are hitting, in this case: /login

    const payload = JSON.stringify({ //Request body (payload). This is an object, not a JSON. That's why there is a JSON casting JSON.stringfy
        username: 'julio.lima',
        senha: '123456',
    });

    const params = { //Header
        headers: {
        'Content-Type': 'application/json',
    },
};
    const response = http.post(url, payload, params); //Endpoint, body, header

    check(response, { //checks are ONLY used to confirm if the API is working, this is a functional testing, not the performance test itself
        'Validate status equals 200': (r) => r.status === 200,
        'Validate that the token is a string': (r) => typeof(r.json().token) == 'string'
    });

    sleep (1); //simulates real usage, waiting 1s after the request
}