"use client";

import { Button } from "@/components/ui/button";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession, signIn, signOut } from "next-auth/react";

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
  const { data: session } = useSession();
  const { data, error } = useSuspenseQuery<any>(AUTHOR_NAME);
  console.log(JSON.stringify(session));

  return (
    <div>
      <div>Client Component</div>
    </div>
  );
}

export default Page;
