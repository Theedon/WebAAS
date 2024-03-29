import Assessment from "@/components/assessment/Assessment";
import { getClient } from "@/lib/apollo-clients/RSCClient";
import gql from "graphql-tag";
import {
  TestQuestionsQuery,
  TestQuestionsQueryVariables,
} from "./__generated__/page.generated";
import getCurrentUserId from "@/lib/globalUserContext";
import { redirect } from "next/navigation";
import { hasDaysElapsed } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const query = gql`
  query TestQuestions($userId: String!) {
    user(id: $userId) {
      faculty {
        code
      }
      userExamInfo {
        ai_recommendation
        updated_at
      }
      role
    }
    testQuestions(userId: $userId) {
      id
      option_a
      option_b
      option_c
      option_d
      subject_id
      question
      correct_option
    }
  }
`;

async function AssessmentPage() {
  const userId = getCurrentUserId() as string;
  const { data, error } = await getClient().query<
    TestQuestionsQuery,
    TestQuestionsQueryVariables
  >({
    query,
    variables: { userId: userId },
  });

  if (process.env.NODE_ENV !== "development" && data.user.role !== "admin") {
    const date = new Date(data.user.userExamInfo.updated_at);
    const has20DaysElapsed = hasDaysElapsed(date, 20);
    if (data.user.userExamInfo.ai_recommendation) {
      if (!has20DaysElapsed) {
        redirect("/results");
      }
    }
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-10">
        <Assessment userId={userId} questionsData={data}></Assessment>
      </div>
    </>
  );
}

export default AssessmentPage;
