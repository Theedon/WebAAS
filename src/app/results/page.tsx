import { getClient } from "@/lib/apollo-clients/RSCClient";
import gql from "graphql-tag";
import React, { Suspense } from "react";
import getCurrentUserId from "@/lib/globalUserContext";
import Markdown from "react-markdown";
import { redirect } from "next/navigation";
import {
  UserAdviceQuery,
  UserAdviceQueryVariables,
} from "./__generated__/page.generated";
import { stripData } from "@/lib/utils";
import { getUserCoursesAI } from "@/backend/data-sources/getUserCoursesAI";
import { getAIRecommendation } from "@/backend/data-sources/getAIRecommendation";
import LoadingPage from "../loading";

const GET_RECOMMENDATION = gql`
  query UserAdvice($userId: String!) {
    user(id: $userId) {
      userExamInfo {
        test_information
        ai_recommendation
        rec_course_1
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

  const userId = getCurrentUserId() as string;
  if (!data.user.userExamInfo.test_information) {
    redirect("/assessment");
  } else if (!data.user.userExamInfo.ai_recommendation) {
    await getAIRecommendation(userId);
    console.log("done");
    await getUserCoursesAI(userId);
    console.log("second done");
    redirect("results");
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
