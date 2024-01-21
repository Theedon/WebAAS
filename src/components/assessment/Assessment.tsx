"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import AssesmentNavigation from "./navigation";
import { TestQuestionsQuery } from "@/app/assessment/__generated__/page.generated";

type AssessmentProps = {
  // questionsData: Question[];
  questionsData: TestQuestionsQuery;
};

export type QuestionType = {
  id: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  question: string;
  subject_id: string;
  correct_option: string;
  index: number;
  choice: string;
};

function Assessment({ questionsData }: AssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const processQuestionsData = (questionsData: TestQuestionsQuery) => {
    let processedData = [];
    for (let subjectArray of questionsData.testQuestions) {
      processedData.push(...subjectArray);
    }
    const filteredQuestionsData: QuestionType[] = processedData.map(
      (question, index) => {
        return {
          id: question.id,
          option_a: question.option_a ?? "",
          option_b: question.option_b ?? "",
          option_c: question.option_c ?? "",
          option_d: question.option_d ?? "",
          question: question.question!,
          subject_id: question.subject_id ?? "",
          correct_option: question.correct_option ?? "",
          index,
          choice: "",
        };
      },
    );
    return filteredQuestionsData;
  };

  const filteredQuestionsData = processQuestionsData(questionsData);

  const [options, setOptions] = useState<QuestionType[]>(filteredQuestionsData);

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-xl font-semibold">
        Question {filteredQuestionsData[currentQuestionIndex].index + 1}
      </h2>

      <div className="flex flex-col">
        <p>{filteredQuestionsData[currentQuestionIndex]?.question}</p>
        <RadioGroup
          value={
            options.find((opt) => opt.index === currentQuestionIndex)?.choice
          }
          name={`radioGroup${currentQuestionIndex}`}
          onValueChange={(newValue: string) => {
            setOptions((prevOptions) => {
              return prevOptions.map((option) => {
                if (option.index == currentQuestionIndex) {
                  return {
                    ...option,
                    choice: newValue,
                  };
                }
                return option;
              });
            });
          }}
        >
          {[
            filteredQuestionsData[currentQuestionIndex].option_a,
            filteredQuestionsData[currentQuestionIndex].option_b,
            filteredQuestionsData[currentQuestionIndex].option_c,
            filteredQuestionsData[currentQuestionIndex].option_d,
          ].map((option: string) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option}
                id={`${currentQuestionIndex}_${option}`}
              />
              <Label htmlFor={`${currentQuestionIndex}_${option}`}>
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <AssesmentNavigation
        currentQuestionId={currentQuestionIndex}
        questionsData={filteredQuestionsData}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
}

export default Assessment;
