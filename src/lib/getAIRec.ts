import axios from "axios";

export const getAIRec = async (text: string) => {
  const url = process.env.NEXT_PUBLIC_WEBAAS_AI_URL;
  const data = {
    info: text,
  };

  // console.log(`url is ${url}`);
  const config = {
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
    return response.data as string;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
