import { fillQuestionsWithId } from "./utils";
import { Accounting } from "./Accounting";
import { QuestionType } from "./utils";
import { Physics } from "./Physics";
import { Biology } from "./Biology";
import { Bookkeeping } from "./Book-keeping";
import { BusinessStudies } from "./Business-studies";
import { Chemistry } from "./Chemistry";
import { Commerce } from "./Commerce";
import { CulturalAndCreativeArts } from "./Cultural-and-Creative-Arts";
import { English } from "./English";
import { Law } from "./Law";
import { Linguistics } from "./Linguistics";
import { LiteratureInEnglish } from "./Literature";
import { Mathematics } from "./Mathematics";

const mergedQuestions: QuestionType[] = [
  ...Accounting,
  ...Physics,
  ...Biology,
  ...Bookkeeping,
  ...BusinessStudies,
  ...Chemistry,
  ...Commerce,
  ...CulturalAndCreativeArts,
  ...English,
  ...Law,
  ...Linguistics,
  ...LiteratureInEnglish,
  ...Mathematics,
];

export const getQuestions = async () => {
  const subjects = await fillQuestionsWithId(mergedQuestions);
  return subjects;
};
