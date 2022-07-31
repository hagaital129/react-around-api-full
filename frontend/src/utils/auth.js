
const BASE_URL = 'http://api.hagaital.students.nomoredomainssbs.ru'



function checkResponse(response) {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(
        `something goes wrong: ${response.status} ${response.statusText}`
    );
}

export async function register(email, password) {

    const response = await fetch(`http://api.hagaital.students.nomoredomainssbs.ru/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })

    return checkResponse(response);
}

export async function logIn(email, password) {

    const response = await fetch(`http://api.hagaital.students.nomoredomainssbs.ru/signin`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
    return checkResponse(response);

}

export async function checkingTokenValidity(jwt) {

    if (!jwt) {
        throw new Error('your token in not valid')
    }
    const response = await fetch(`http://api.hagaital.students.nomoredomainssbs.ru/users/me`, {
        method: 'GET',
        headers:
        {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`
        }
    })
    return checkResponse(response);
}