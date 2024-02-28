import { Role, User } from "@prisma/client";
import BaseDomain from "./BaseDomain";

export class UserDomain extends BaseDomain {
  constructor(
    public id: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public onboarded: boolean,
    public verified: boolean,
    public role: Role,
    public clerk_id: string | null,
    public faculty_id: string,
    public created_at: string,
    public updated_at: string,
    public phone_no: string | null,
  ) {
    super(id);
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.onboarded = onboarded;
    this.verified = verified;
    this.role = role;
    this.clerk_id = clerk_id;
    this.faculty_id = faculty_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.phone_no = phone_no;
  }
}

export const createUserDomain = (data: User) => {
  return new UserDomain(
    data.id,
    data.password,
    data.first_name,
    data.last_name,
    data.email,
    data.onboarded,
    data.verified,
    data.role,
    data.clerk_id,
    data.faculty_id,
    data.created_at.toISOString(),
    data.updated_at.toISOString(),
    data.phone_no,
  );
};
