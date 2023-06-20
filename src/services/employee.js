import axios from "axios";

const config = ({
    "Access-Control-Allow-Origin": "*",
  })

export const getConges = ()=>{
    return axios.get("https://localhost:44333/api/Conge/GetCongesByIdEmployee?idE=" + localStorage.getItem('IDEmployee'), config)
}