import Axios from "axios";

const qodURL = "http://quotes.rest/qod.json"

export function getQod(queryParameters, callback) {
    Axios.get(
        qodURL,
        {
            params: queryParameters
        }
    ).then(response => {
        callback(true, response, null)
    })
    .catch(e => {
        callback(true, e.response, JSON.stringify(e))
    });
}