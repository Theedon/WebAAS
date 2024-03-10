import SubjectCard from "@/components/dashboard/SubjectCard";
import { getClient } from "@/lib/apollo-clients/RSCClient";
import getCurrentUserId from "@/lib/globalUserContext";
import { gql } from "@apollo/client";
import {
  GetSubjectsQuery,
  GetSubjectsQueryVariables,
} from "./__generated__/page.generated";
import { dateWrangler, getCourseFromFaculty } from "@/lib/utils";
import { AdvisorsDataType, columns } from "@/components/advisors/Columns";
import { DataTable } from "@/components/advisors/DataTable";

const query = gql`
  query GetSubjects($userId: String!) {
    user(id: $userId) {
      userExamInfo {
        rec_course_1
        rec_course_2
        rec_course_3
        anti_course_1
        anti_course_2
        anti_course_3
      }
    }
    allAdvisors {
      id
      firstName
      lastName
      email
      created_at
      updated_at
      faculty {
        name
      }
      phone_no
    }
  }
`;

export default async function Home() {
  const { data, error } = await getClient().query<
    GetSubjectsQuery,
    GetSubjectsQueryVariables
  >({
    query,
    variables: { userId: getCurrentUserId() as string },
  });
  const wrangledData: AdvisorsDataType[] = data.allAdvisors.map((user) => {
    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      created_at: dateWrangler(user.created_at),
      updated_at: dateWrangler(user.updated_at),
      phone_no: user.phone_no ?? "",
      faculty: user.faculty?.name ?? "",
    };
  });
  return (
    <main className="flex flex-col gap-5">
      <SubjectSection
        header="Recommended Subjects"
        course_1={data.user.userExamInfo.rec_course_1 ?? ""}
        course_2={data.user.userExamInfo.rec_course_2 ?? ""}
        course_3={data.user.userExamInfo.rec_course_3 ?? ""}
      />
      <SubjectSection
        header="Not Recommended"
        course_1={data.user.userExamInfo.anti_course_1 ?? ""}
        course_2={data.user.userExamInfo.anti_course_2 ?? ""}
        course_3={data.user.userExamInfo.anti_course_3 ?? ""}
      />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={wrangledData} />
      </div>
    </main>
  );
}

type SubjectSectionProps = {
  course_1: string;
  course_2: string;
  course_3: string;
  header: string;
};
const SubjectSection = ({
  course_1,
  course_2,
  course_3,
  header,
}: SubjectSectionProps) => {
  return (
    <div>
      <h2 className="text-center text-lg text-primary">{header}</h2>
      <section className="flex flex-col items-center justify-center gap-5 md:flex-row">
        {[course_1, course_2, course_3].map((subject, index) => (
          <SubjectCard
            key={index}
            course={getCourseFromFaculty(subject ?? "").course}
            faculty={getCourseFromFaculty(subject ?? "").faculty}
          />
        ))}
      </section>
    </div>
  );
};
