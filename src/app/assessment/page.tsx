import Assessment from "@/components/assessment/Assessment";

function AssessmentPage() {
  return (
    <div className="flex flex-col gap-10">
      <Assessment questionsData={dummyQuestions}></Assessment>
    </div>
  );
}

export default AssessmentPage;

export type QuestionType = {
  id: number;
  questionBody: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
};

const dummyQuestions: QuestionType[] = [
  {
    id: 1,
    questionBody:
      "The order of financial accounting process involves i. recording ii. presenting iii. collecting iv. analyzing",
    option_a: "A",
    option_b: "B",
    option_c: "C",
    option_d: "D",
    correct_option: "A",
  },
  {
    id: 2,
    questionBody: "What is the capital of France?",
    option_a: "Paris",
    option_b: "Berlin",
    option_c: "London",
    option_d: "Rome",
    correct_option: "A",
  },
  {
    id: 3,
    questionBody: "Which planet is known as the Red Planet?",
    option_a: "Venus",
    option_b: "Mars",
    option_c: "Jupiter",
    option_d: "Saturn",
    correct_option: "B",
  },
  {
    id: 4,
    questionBody: "Who wrote 'Romeo and Juliet'?",
    option_a: "Charles Dickens",
    option_b: "William Shakespeare",
    option_c: "Jane Austen",
    option_d: "Mark Twain",
    correct_option: "B",
  },
  {
    id: 5,
    questionBody: "What is the largest mammal on Earth?",
    option_a: "Elephant",
    option_b: "Blue Whale",
    option_c: "Giraffe",
    option_d: "Hippopotamus",
    correct_option: "B",
  },
  {
    id: 6,
    questionBody:
      "Which programming language is often used for web development?",
    option_a: "Python",
    option_b: "Java",
    option_c: "JavaScript",
    option_d: "C++",
    correct_option: "C",
  },
  {
    id: 7,
    questionBody: "What is the powerhouse of the cell?",
    option_a: "Nucleus",
    option_b: "Mitochondria",
    option_c: "Endoplasmic Reticulum",
    option_d: "Golgi Apparatus",
    correct_option: "B",
  },
  {
    id: 8,
    questionBody: "In which year did the World War II end?",
    option_a: "1943",
    option_b: "1945",
    option_c: "1948",
    option_d: "1950",
    correct_option: "B",
  },
  {
    id: 9,
    questionBody: "Who painted the Mona Lisa?",
    option_a: "Vincent van Gogh",
    option_b: "Pablo Picasso",
    option_c: "Leonardo da Vinci",
    option_d: "Claude Monet",
    correct_option: "C",
  },
  {
    id: 10,
    questionBody: "What is the currency of Japan?",
    option_a: "Yuan",
    option_b: "Won",
    option_c: "Yen",
    option_d: "Ringgit",
    correct_option: "C",
  },
];
