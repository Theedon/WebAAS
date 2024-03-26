import Onboarding from "@/components/onboarding";
import { Toaster } from "@/components/ui/toaster";
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
    <>
      <div className="grid h-full place-items-center md:w-screen">
        <Onboarding
          firstName={firstName}
          lastName={lastName}
          emailAddress={emailAddress}
          userId={userId}
        />
      </div>
      <Toaster />
    </>
  );
}

export default OnboardingPage;
