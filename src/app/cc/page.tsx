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
export const revalidate = 3600;
function Page() {
  const { data, error } = useSuspenseQuery<any>(AUTHOR_NAME);
  console.warn(JSON.stringify(data));
  // return (
  //   <div>
  //     Client Component::::::::: {JSON.stringify(data.allQuestions[0].option_a)}
  //     :::::::::Client Component
  //   </div>
  // );
  return <div>cc</div>;
}

export default Page;
