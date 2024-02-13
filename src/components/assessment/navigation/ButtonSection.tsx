import { QuestionType } from "../Assessment";
import QuestionButton from "./QuestionButton";
import { Dispatch, SetStateAction } from "react";
type ButtonSectionProps = {
  questionsData: QuestionType[];
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  currentQuestionIndex: number;
};

function ButtonSection({
  questionsData,
  setCurrentQuestionIndex,
  currentQuestionIndex,
}: ButtonSectionProps) {
  const checkIfAnswered = (
    questionIndex: number,
    questionsData: QuestionType[],
  ) => {
    const isAnswered = questionsData[questionIndex].choice !== "";

    return isAnswered;
  };
  return (
    <section className="my-5 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] place-items-center gap-4 rounded-md border-[5px] border-foreground  p-5 shadow-sm">
      {questionsData.map((question: QuestionType, index: number) => (
        <QuestionButton
          isSelected={currentQuestionIndex == question.index}
          isAnswered={checkIfAnswered(question.index, questionsData)}
          key={question.id}
          onClick={() => {
            console.log(question.index);
            setCurrentQuestionIndex(question.index);
          }}
        >
          {question.index + 1}
        </QuestionButton>
      ))}
    </section>
  );
}

export default ButtonSection;
