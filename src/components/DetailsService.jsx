import axios from "axios";

export const chat = async (requestBodyArray) => { 
    return await axios.post(
        `http://localhost:8081/interactions?${requestBodyArray}`
    );
}

export const fetchMsgs = async (alumniAndStudent)=> {
    return await axios.get(
        `http://localhost:8081/fetchMsg?${alumniAndStudent}`
    );
}

export const fetchStd = async (ToName) =>{
    return await axios.get(
        `http://localhost:8081/fetchStd?${ToName}`
    );
}