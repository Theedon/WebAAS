import { checkIfUserRegistered } from "@/backend/data-sources/checkIfUserRegistered";
import getCurrentUserId from "@/lib/globalUserContext";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";

const query = gql`
  query AllQuestions {
    allQuestions {
      id
      option_a
      option_b
      option_c
      option_d
      question
      subject_id
    }
  }
`;

export default async function Home() {
  try {
    let isUserRegistered = await checkIfUserRegistered(getCurrentUserId());
    console.log(isUserRegistered);
  } catch (error: any) {
    if ((error.code = "P2025")) {
      redirect("/onboarding");
    } else {
      // Handle other errors appropriately, e.g., logging or displaying an error message
      console.error("Error checking user registration:", error);
    }
  }

  return <main></main>;
}
