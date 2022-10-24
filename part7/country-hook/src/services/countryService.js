// query countries from countries REST API
import axios from "axios";

const baseUrl =
  "https://restcountries.com/v3.1/name/{COUNTRYHERE}?fullText=true";

const getCountry = async (name) => {
  if (!name) {
    return null;
  }

  const queryUrl = baseUrl.replace("{COUNTRYHERE}", name);
  try {
    const response = await axios.get(queryUrl);
    return response.data ? response.data[0] : null;
  } catch {
    return null;
  }
};

export default { getCountry };
