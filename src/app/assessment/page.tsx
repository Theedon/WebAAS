import Assessment from "@/components/assessment/Assessment";
import { getClient } from "@/lib/apollo-clients/RSCClient";
import gql from "graphql-tag";
import { merge } from "lodash";
import {
  TestQuestionsQuery,
  TestQuestionsQueryVariables,
} from "./__generated__/page.generated";

export type QuestionType = {
  id: number;
  questionBody: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
};

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

  return (
    <div className="flex flex-col gap-10">
      <Assessment questionsData={merge(data)}></Assessment>
    </div>
  );
}

export default AssessmentPage;
