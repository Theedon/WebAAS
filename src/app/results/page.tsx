import { getClient } from "@/lib/apollo-clients/RSCClient";
import gql from "graphql-tag";
import React from "react";
import getCurrentUserId from "@/lib/globalUserId";
import Markdown from "react-markdown";

const GET_RECOMMENDATION = gql`
  query UserAdvice($userId: String!) {
    userAdvice(userId: $userId) {
      ai_recommendation
    }
  }
`;

async function ResultPage() {
  const { data, error } = await getClient().query({
    query: GET_RECOMMENDATION,
    variables: { userId: getCurrentUserId() },
  });

  return (
    <div>
      {data.userAdvice.ai_recommendation ? (
        <Markdown>{data.userAdvice.ai_recommendation}</Markdown>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

export default ResultPage;
