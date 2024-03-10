"use client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import {
  AllQuestionsQuery,
  AllQuestionsQueryVariables,
} from "./__generated__/page.generated";

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
  const { data, error } = useSuspenseQuery<
    AllQuestionsQuery,
    AllQuestionsQueryVariables
  >(AUTHOR_NAME);

  return (
    <div>
      <div>Client Component</div>
    </div>
  );
}

export default Page;
