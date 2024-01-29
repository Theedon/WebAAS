import { auth } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs";

const getCurrentUserId = () => {
  // const userId = await currentUser();
  const { userId, getToken, has, orgRole } = auth();
  return userId;
};

export default getCurrentUserId;
