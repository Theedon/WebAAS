import { QuestionType } from "@/app/assessment/page";
import { Dispatch, SetStateAction } from "react";
import { useState, MouseEvent, FormEvent } from "react";
import QuestionButton from "@/components/assessment/QuestionButton";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ButtonSectionProps = {
  currentQuestionId: number;
  setCurrentQuestionId: Dispatch<SetStateAction<number>>;
  questionsData: QuestionType[];
};

function ButtonSection({
  currentQuestionId,
  setCurrentQuestionId,
  questionsData,
}: ButtonSectionProps) {
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
      <section className="grid w-full grid-cols-2">
        <Button
          onClick={goToPreviousQuestion}
          variant={"outline"}
          className="mr-auto w-fit p-10"
        >
          <ArrowBigLeft className="size-14" />
        </Button>
        <Button
          onClick={goToNextQuestion}
          variant={"outline"}
          className="ml-auto w-fit p-10"
        >
          <ArrowBigRight className="size-14" />
        </Button>
      </section>
      <section className="my-5 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] place-items-center gap-4 rounded-md border-[5px] border-foreground  p-5 shadow-sm">
        {questionsData.map((question: QuestionType, index) => (
          <QuestionButton
            isSelected={false}
            isAnswered={false}
            key={question.id}
            onClick={() => {
              setCurrentQuestionId(question.id - 1);
            }}
          >
            {question.id}
          </QuestionButton>
        ))}
      </section>
    </div>
  );
}

export default ButtonSection;
