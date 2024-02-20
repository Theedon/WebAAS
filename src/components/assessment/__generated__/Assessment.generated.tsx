import * as Types from "../../../app/types";

export type SaveExamMutationVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
  assessmentInfo: Array<Types.AssessmentInfoInput> | Types.AssessmentInfoInput;
}>;

export type SaveExamMutation = { __typename?: "Mutation"; saveExam: string };
