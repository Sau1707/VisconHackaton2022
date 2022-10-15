import axios from "axios";

export async function getUserExists(username) {
    const data = {
        "Username": username,
        "Exists Test": true,
    }

    return axios({
        method: "get",
        url: "/backend",
        headers: {
            'Content-Type': 'application/json'
        },
        params: data,
        //data: data, // use this when you do a post
    })
}

export async function addNewUser(username, preferences) {
    const data = {
        "Username": username,
        "Exists Test": false,
    }

    return axios({
        method: "get",
        url: "/backend",
        headers: {
            'Content-Type': 'application/json'
        },
        params: data,
        //data: data, // use this when you do a post
    })
}