import { Dispatch, SetStateAction } from "react";
import { MouseEvent } from "react";
import ArrowNavigation from "./ArrowNavigation";
import ButtonSection from "./ButtonSection";
import { QuestionType } from "../Assessment";

type AssesmentNavigationProps = {
  currentQuestionId: number;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  questionsData: QuestionType[];
};

function AssesmentNavigation({
  currentQuestionId,
  setCurrentQuestionIndex,
  questionsData,
}: AssesmentNavigationProps) {
  const goToPreviousQuestion = (event: MouseEvent<HTMLButtonElement>) => {
    if (currentQuestionId > 0) {
      setCurrentQuestionIndex(currentQuestionId - 1);
    }
  };

  const goToNextQuestion = (event: MouseEvent<HTMLButtonElement>) => {
    if (currentQuestionId < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionId + 1);
    }
  };

  return (
    <div>
      <ArrowNavigation
        goToNextQuestion={goToNextQuestion}
        goToPreviousQuestion={goToPreviousQuestion}
      />

      <ButtonSection
        questionsData={questionsData}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        currentQuestionIndex={currentQuestionId}
      ></ButtonSection>
    </div>
  );
}

export default AssesmentNavigation;
