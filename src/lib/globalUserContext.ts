import { auth, currentUser } from "@clerk/nextjs";

const getCurrentUserId = () => {
  const { userId, getToken, has, orgRole } = auth();
  return userId;
};

export const getCurrentUserFirstName = async () => {
  const user = await currentUser();
  return user?.firstName;
};

export const getCurrentUserLastName = async () => {
  const user = await currentUser();
  return user?.lastName;
};

export default getCurrentUserId;
