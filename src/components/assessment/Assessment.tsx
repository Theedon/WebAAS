"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import type { QuestionType } from "@/app/assessment/page";
import ButtonSection from "./navigation/ButtonSection";
import AssesmentNavigation from "./navigation";

type AssessmentProps = {
  questionsData: QuestionType[];
};

type OptionsProp = {
  id: number;
  chosenOption: string;
  correctAnswer: string;
};
function Assessment({ questionsData }: AssessmentProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(0);
  let optionData: OptionsProp[] = questionsData.map((question) => {
    return {
      id: question.id,
      chosenOption: question.correct_option,
      correctAnswer: question.correct_option,
    };
  });
  const [option, setOption] = useState<OptionsProp[]>(optionData);
  const setOptionData = (id: number, newOption: string) => {
    setOption((prevOption) =>
      prevOption.map((opt) =>
        opt.id === id ? { ...opt, chosenOption: newOption } : opt,
      ),
    );
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosenOption = event.target.value;
    setOptionData(currentQuestionId, chosenOption);
    alert("changed");
  };

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-xl font-semibold">
        Question {questionsData[currentQuestionId].id}
      </h2>

      <div className="flex flex-col">
        <p>{questionsData[currentQuestionId].questionBody}</p>
        <RadioGroup
          value={option[currentQuestionId].chosenOption}
          name={`radioGroup${currentQuestionId}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={questionsData[currentQuestionId].option_a}
              id="A"
            />
            <Label htmlFor="A">
              {questionsData[currentQuestionId].option_a}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={questionsData[currentQuestionId].option_b}
              id="B"
            />
            <Label htmlFor="B">
              {questionsData[currentQuestionId].option_b}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={questionsData[currentQuestionId].option_c}
              id="C"
            />
            <Label htmlFor="C">
              {questionsData[currentQuestionId].option_c}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={questionsData[currentQuestionId].option_d}
              id="D"
            />
            <Label htmlFor="D">
              {questionsData[currentQuestionId].option_d}
            </Label>
          </div>
        </RadioGroup>
      </div>
      <AssesmentNavigation
        currentQuestionId={currentQuestionId}
        questionsData={questionsData}
        setCurrentQuestionId={setCurrentQuestionId}
      />
      <button onClick={() => console.table(option)}>
        HELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
      </button>
    </div>
  );
}

export default Assessment;
