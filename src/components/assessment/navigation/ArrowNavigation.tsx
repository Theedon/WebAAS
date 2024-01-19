import { MouseEvent } from "react";
import { Button } from "../../ui/button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
type ArrowNavigationProps = {
  goToPreviousQuestion: (e: MouseEvent<HTMLButtonElement>) => void;
  goToNextQuestion: (e: MouseEvent<HTMLButtonElement>) => void;
};

function ArrowNavigation({
  goToPreviousQuestion,
  goToNextQuestion,
}: ArrowNavigationProps) {
  return (
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
  );
}

export default ArrowNavigation;
