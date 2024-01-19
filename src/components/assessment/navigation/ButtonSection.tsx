import type { QuestionType } from "@/app/assessment/page";
import QuestionButton from "./QuestionButton";
import { Dispatch, SetStateAction } from "react";
type ButtonSectionProps = {
  questionsData: QuestionType[];
  setCurrentQuestionId: Dispatch<SetStateAction<number>>;
};

function ButtonSection({
  questionsData,
  setCurrentQuestionId,
}: ButtonSectionProps) {
  return (
    <section className="my-5 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] place-items-center gap-4 rounded-md border-[5px] border-foreground  p-5 shadow-sm">
      {questionsData.map((question: QuestionType, index: number) => (
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
  );
}

export default ButtonSection;
