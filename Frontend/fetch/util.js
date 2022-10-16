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

//TODO
export async function getUserPreferences(username) {
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

// TODO
export async function setUserPreferences(username, preferences) {
    const data = {
        "Username": username,
        "Exists Test": true,
        "Is Weekly Update": "true",
        "Opponent": "null",
        "Story": "storia",
    }

    return axios({
        method: "post",
        url: "/backend",
        headers: {
            'Content-Type': 'application/json'
        },
        //params: data,
        data: data, // use this when you do a post
    })
}

// TODO
export async function getUserWeekChalleges(username) {
    const data = {
        "Username": username,
        "Exists Test": true,
        "Is Weekly Update": "true",
        "Opponent": "null",
        "Story": "storia",
    }

    return axios({
        method: "post",
        url: "/backend",
        headers: {
            'Content-Type': 'application/json'
        },
        //params: data,
        data: data, // use this when you do a post
    })
}
