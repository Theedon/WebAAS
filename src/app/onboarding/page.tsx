import Onboarding from "@/components/Onboarding";
import getCurrentUserId from "@/lib/globalUserContext";
import { currentUser } from "@clerk/nextjs";

async function OnboardingPage() {
  const user = await currentUser();
  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const emailAddress = user?.primaryEmailAddressId ?? "";
  const userId = user?.id ?? "";

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
