import axios from "axios";

export const getAIRec = async (text: string) => {
  const url = "";
  const data = {
    info: text,
  };

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
