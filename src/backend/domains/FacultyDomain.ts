import BaseDomain from "./BaseDomain";

export class FacultyDomain extends BaseDomain {
  constructor(
    public id: string,
    public name: string,
    public code: string,
  ) {
    super(id);
    this.name = name;
    this.code = code;
  }
}
