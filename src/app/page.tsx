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

export default function Home() {
  return <main>Dashboard</main>;
}
