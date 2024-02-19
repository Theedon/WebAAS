import { getClient } from "@/lib/apollo-clients/RSCClient";
import gql from "graphql-tag";
import React from "react";
import getCurrentUserId from "@/lib/globalUserContext";
import Markdown from "react-markdown";
import { redirect } from "next/navigation";
import {
  UserAdviceQuery,
  UserAdviceQueryVariables,
} from "./__generated__/page.generated";
import { stripData } from "@/lib/utils";

const GET_RECOMMENDATION = gql`
  query UserAdvice($userId: String!) {
    userAdvice(userId: $userId) {
      ai_recommendation
    }
    user(id: $userId) {
      ai_recommendation
    }
  }
`;

async function ResultPage() {
  const { data, error } = await getClient().query<
    UserAdviceQuery,
    UserAdviceQueryVariables
  >({
    query: GET_RECOMMENDATION,
    variables: { userId: getCurrentUserId() as string },
  });

  if (!data.user.ai_recommendation) redirect("/assessment");

  return (
    <div>
      {data?.userAdvice?.ai_recommendation ? (
        <Markdown>{stripData(data.userAdvice.ai_recommendation)}</Markdown>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

export default ResultPage;
