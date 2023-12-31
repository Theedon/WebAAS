import BaseDomain from "./BaseDomain";

class SubjectDomain extends BaseDomain {
  constructor(
    public id: string,
    public name: string,
    public slug: string | null,
  ) {
    super(id);
    this.id = id;
    this.name = name;
    this.slug = slug;
  }
}

export default SubjectDomain;
