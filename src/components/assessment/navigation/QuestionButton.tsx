import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../../ui/button";

// type QuestionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
//   children: ReactNode;
// };

interface QuestionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isAnswered: boolean;
  isSelected: boolean;
}

function QuestionButton({
  children,
  isSelected,
  isAnswered,
  ...props
}: QuestionButtonProps) {
  return (
    <Button
      variant={"outline"}
      className={`w-full rounded-none  ${isAnswered ? "bg-primary" : ""} ${
        isSelected
          ? "animate-bounce rounded-full bg-foreground text-background transition-all duration-200 ease-in-out"
          : ""
      } `}
      {...props}
    >
      {children}
    </Button>
  );
}

export default QuestionButton;
