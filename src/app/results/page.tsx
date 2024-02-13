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

  const stripData = (recommendation: string) => {
    recommendation = recommendation.trim();

    // Handle the case where all content is within triple quotes
    if (recommendation.startsWith("`") && recommendation.endsWith("`")) {
      // Extract content without leading/trailing whitespaces
      const content = recommendation.slice(3, -3).trim();
      return content;
    }

    // Remove leading and trailing triple quotes without affecting middle occurrences
    if (recommendation.startsWith("```")) {
      recommendation = recommendation.slice(3);
    }
    if (recommendation.endsWith("```")) {
      recommendation = recommendation.slice(0, -3);
    }

    return recommendation;
  };

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
