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
import { hasDaysElapsed, stripData } from "@/lib/utils";

import LoadingPage from "../loading";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const GET_RECOMMENDATION = gql`
  query UserAdvice($userId: String!) {
    user(id: $userId) {
      userExamInfo {
        ai_recommendation
        updated_at
      }
      role
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

  if (!data.user.userExamInfo?.ai_recommendation) {
    redirect("/assessment");
  }

  const isUserPriviledged = () => {
    if (
      process.env.NODE_ENV !== "development" &&
      data.user.role !== "admin" &&
      data.user.userExamInfo?.updated_at
    ) {
      const date = new Date(data.user.userExamInfo.updated_at);
      const has20DaysElapsed = hasDaysElapsed(date, 20);
      if (data.user.userExamInfo.ai_recommendation) {
        if (!has20DaysElapsed) {
          return false;
        }
      }
    }

    return true;
  };

  return (
    <>
      {isUserPriviledged() && (
        <div className="flex w-full items-center justify-end">
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/assessment"
          >
            Retake Test
          </Link>
        </div>
      )}
      <h2 className="mb-5 grid place-items-center text-2xl font-bold text-primary-foreground">
        <p>AI Results</p>
      </h2>
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
    </>
  );
}

export default ResultPage;
