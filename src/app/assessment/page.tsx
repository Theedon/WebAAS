import Assessment from "@/components/assessment/Assessment";
import { getClient } from "@/lib/apollo-clients/RSCClient";
import gql from "graphql-tag";
import {
  TestQuestionsQuery,
  TestQuestionsQueryVariables,
} from "./__generated__/page.generated";
import getCurrentUserId from "@/lib/globalUserContext";

const query = gql`
  query TestQuestions($faculty: String!) {
    testQuestions(faculty: $faculty) {
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
  const { data, error } = await getClient().query<
    TestQuestionsQuery,
    TestQuestionsQueryVariables
  >({
    query,
    variables: { faculty: "SCI" },
  });
  const userId = getCurrentUserId();

  return (
    <div className="flex flex-col gap-10">
      <Assessment userId={userId ?? "hgh"} questionsData={data}></Assessment>
    </div>
  );
}

export default AssessmentPage;
