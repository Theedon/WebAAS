import { getCourseFromFaculty } from "@/lib/utils";
import SubjectCard from "./SubjectCard";

type SubjectSectionProps = {
  header: string;
  course_1: string;
  course_2: string;
  course_3: string;
};

function SubjectSection({
  header,
  course_1,
  course_2,
  course_3,
}: SubjectSectionProps) {
  return (
    <div>
      <h2 className="text-center text-lg text-primary">{header}</h2>
      <section className="flex flex-col items-center justify-center gap-5 md:flex-row">
        {[course_1, course_2, course_3].map((subject, index) => (
          <SubjectCard
            key={index}
            course={getCourseFromFaculty(subject).course}
            faculty={getCourseFromFaculty(subject).faculty}
          />
        ))}
      </section>
    </div>
  );
}

export default SubjectSection;
