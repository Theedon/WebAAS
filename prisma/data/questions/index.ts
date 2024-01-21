import { Accounting } from "./Accounting";
import { QuestionType } from "./utils";
import { fillQuestionsWithId } from "./utils";

const mergedQuestions: QuestionType[] = [...Accounting];

export const getQuestions = async () => {
  const subjects = await fillQuestionsWithId(mergedQuestions);
  return subjects;
};
