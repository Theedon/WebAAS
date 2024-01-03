import Image from "next/image";

import { getClient } from "@/lib/apollo-clients/RSCClient";
import { gql } from "@apollo/client";
import {
  AllQuestionsQuery,
  AllQuestionsQueryVariables,
} from "./__generated__/page.generated";

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

export const revalidate = 3600;
export default async function Home() {
  const { data, error } = await getClient().query<
    AllQuestionsQuery,
    AllQuestionsQueryVariables
  >({ query });
  console.table(JSON.stringify(data));
  return (
    <main className="bg-background">
      Server Component::::::::: {JSON.stringify(data.allQuestions[0].option_a)}
      :::::::::Server Component
    </main>
  );
  return <main className="bg-background">WebAAS</main>;
}
