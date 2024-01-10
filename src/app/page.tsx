import Image from "next/image";

import { getClient } from "@/lib/apollo-clients/RSCClient";
import { gql } from "@apollo/client";
import {
  AllQuestionsQuery,
  AllQuestionsQueryVariables,
} from "./__generated__/page.generated";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
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
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <main></main>;
}
