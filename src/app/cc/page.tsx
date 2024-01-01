"use client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const AUTHOR_NAME = gql`
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

function Page() {
  console.error(
    "This here is the postgresurl",
    process.env.POSTGRES_PRISMA_URL,
  );
  // const { data, error } = useSuspenseQuery<any>(AUTHOR_NAME);
  // console.log(data, error);
  // return <div>{JSON.stringify(data)}</div>;
  return (
    <main className="bg-background"> {process.env.POSTGRES_PRISMA_URL}</main>
  );
}

export default Page;
