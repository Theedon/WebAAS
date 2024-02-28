import { AdvisorsDataType, columns } from "@/components/advisors/Columns";
import { DataTable } from "@/components/advisors/DataTable";
import { getClient } from "@/lib/apollo-clients/RSCClient";
import gql from "graphql-tag";
import {
  AllAdvisorsQuery,
  AllAdvisorsQueryVariables,
} from "./__generated__/page.generated";
import { dateWrangler } from "@/lib/utils";

export default async function AdvisorsPage() {
  const GET_ALL_ADVISORS = gql`
    query AllAdvisors {
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

  const { data, error } = await getClient().query<
    AllAdvisorsQuery,
    AllAdvisorsQueryVariables
  >({
    query: GET_ALL_ADVISORS,
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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={wrangledData} />
    </div>
  );
}
