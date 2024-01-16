import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";

// type QuestionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
//   children: ReactNode;
// };

interface QuestionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isAnswered: boolean;
}

function QuestionButton({
  children,
  isAnswered,
  ...props
}: QuestionButtonProps) {
  return (
    <Button
      variant={"outline"}
      className={`w-full rounded-none ${
        isAnswered ? "rounded-md bg-primary" : ""
      }`}
      {...props}
    >
      {children}
    </Button>
  );
}

export default QuestionButton;
