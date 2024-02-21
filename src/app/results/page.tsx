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

import LoadingPage from "../loading";

const GET_RECOMMENDATION = gql`
  query UserAdvice($userId: String!) {
    user(id: $userId) {
      userExamInfo {
        ai_recommendation
      }
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

  if (!data.user.userExamInfo.ai_recommendation) {
    redirect("/assessment");
  }

  return (
    <div>
      {data.user.userExamInfo.ai_recommendation ? (
        <div>
          {data.user.userExamInfo.ai_recommendation ? (
            <Markdown>
              {stripData(data.user.userExamInfo.ai_recommendation)}
            </Markdown>
          ) : (
            <p>No data</p>
          )}
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
}

export default ResultPage;
