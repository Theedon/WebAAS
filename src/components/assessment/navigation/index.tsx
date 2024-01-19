import { QuestionType } from "@/app/assessment/page";
import { Dispatch, SetStateAction } from "react";
import { MouseEvent } from "react";
import QuestionButton from "./QuestionButton";
import ArrowNavigation from "./ArrowNavigation";
import ButtonSection from "./ButtonSection";

type AssesmentNavigationProps = {
  currentQuestionId: number;
  setCurrentQuestionId: Dispatch<SetStateAction<number>>;
  questionsData: QuestionType[];
};

function AssesmentNavigation({
  currentQuestionId,
  setCurrentQuestionId,
  questionsData,
}: AssesmentNavigationProps) {
  const goToPreviousQuestion = (event: MouseEvent<HTMLButtonElement>) => {
    if (currentQuestionId > 0) {
      setCurrentQuestionId(currentQuestionId - 1);
    }
  };

  const goToNextQuestion = (event: MouseEvent<HTMLButtonElement>) => {
    if (currentQuestionId < questionsData.length - 1) {
      setCurrentQuestionId(currentQuestionId + 1);
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
        setCurrentQuestionId={setCurrentQuestionId}
      ></ButtonSection>
    </div>
  );
}

export default AssesmentNavigation;
