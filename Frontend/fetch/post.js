import axios from "axios";

export async function addNewUser(username, preferences) {
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