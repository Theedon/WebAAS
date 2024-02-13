import Assessment from "@/components/assessment/Assessment";
import { getClient } from "@/lib/apollo-clients/RSCClient";
import gql from "graphql-tag";
import {
  TestQuestionsQuery,
  TestQuestionsQueryVariables,
} from "./__generated__/page.generated";
import getCurrentUserId from "@/lib/globalUserContext";
import { redirect } from "next/navigation";

const query = gql`
  query TestQuestions($userId: String!) {
    user(id: $userId) {
      ai_recommendation
      faculty {
        code
      }
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

  // if (data.user.ai_recommendation) redirect("/results");

  return (
    <div className="flex flex-col gap-10">
      <Assessment userId={userId} questionsData={data}></Assessment>
    </div>
  );
}

export default AssessmentPage;
