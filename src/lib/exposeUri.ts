const prodUri = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
const devUri = "http://localhost:3000";
export const endpoint = process.env.NEXT_PUBLIC_VERCEL_URL ? prodUri : devUri;
console.log("endpoint is", endpoint);
