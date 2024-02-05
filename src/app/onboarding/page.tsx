import Onboarding from "@/components/onboarding";
import getCurrentUserId from "@/lib/globalUserContext";
import { clerkClient } from "@clerk/nextjs";

async function OnboardingPage() {
  const userId = getCurrentUserId() as string;
  const user = await clerkClient.users.getUser(userId);
  const firstName = user.firstName ?? "";
  const lastName = user.lastName ?? "";
  const emailAddress = user.emailAddresses[0].emailAddress ?? "";

  console.log(firstName, lastName, emailAddress, userId);

  return (
    <Onboarding
      firstName={firstName}
      lastName={lastName}
      emailAddress={emailAddress}
      userId={userId}
    />
  );
}

export default OnboardingPage;
