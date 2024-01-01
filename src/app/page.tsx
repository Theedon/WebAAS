import Image from "next/image";

import { getClient } from "@/lib/apollo-clients/RSCClient";
import { gql } from "@apollo/client";

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
  // const { data, error } = await getClient().query<>({ query });
  // console.log(JSON.stringify(data));
  return <main className="bg-background">WebAAS</main>;
}
