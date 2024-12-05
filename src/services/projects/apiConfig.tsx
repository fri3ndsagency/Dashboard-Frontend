import axios from "axios";

const BASE_URL = "https://api.airtable.com/v0/appxQbf2VbQQCfnSc";
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;

const airtableApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      //todo pasar a una variable de entorno
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
   },
});

export default airtableApi;
