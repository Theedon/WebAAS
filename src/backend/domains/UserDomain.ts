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
  ) {
    super(id);
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.onboarded = onboarded;
    this.verified = verified;
    this.role = role;
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
  );
};