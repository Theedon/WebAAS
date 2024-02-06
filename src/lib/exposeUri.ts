export const getEndpoint = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  } else {
    return "https://web-aas.vercel.app";
  }
};
