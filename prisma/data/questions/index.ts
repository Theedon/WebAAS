import { Accounting } from "./Accounting";
import { QuestionType } from "./utils";
import { fillQuestionsWithId } from "./utils";
import { Physics } from "./Physics";

const mergedQuestions: QuestionType[] = [...Accounting, ...Physics];

export const getQuestions = async () => {
  const subjects = await fillQuestionsWithId(mergedQuestions);
  return subjects;
};
