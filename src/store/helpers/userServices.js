import { history } from "./history";

export const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    // console.log(data,"user service")
    if (!response.ok) {
      if (response.status === 401 || response.status === 400) {
        // localStorage.removeItem("token");
        // history.push("/");
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const getGeolocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');

    console.log("respond of Id:", response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("respond of Id2:", data);
    return data;
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    return null;
  }
};