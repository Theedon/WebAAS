import { getClient } from "@/lib/apollo-clients/RSCClient";
import getCurrentUserId from "@/lib/globalUserContext";
import { gql } from "@apollo/client";
import {
  GetSubjectsQuery,
  GetSubjectsQueryVariables,
} from "./__generated__/page.generated";
import { dateWrangler } from "@/lib/utils";
import { AdvisorsDataType, columns } from "@/components/advisors/Columns";
import { DataTable } from "@/components/advisors/DataTable";
import SubjectSection from "@/components/dashboard/SubjectSection";

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
  console.log(data.user.userExamInfo.rec_course_1);

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
        header="Least Recommended"
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
