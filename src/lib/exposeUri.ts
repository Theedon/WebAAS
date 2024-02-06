export const getEndpoint = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  } else {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
};
