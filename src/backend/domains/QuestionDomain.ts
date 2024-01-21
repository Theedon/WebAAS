import BaseDomain from "./BaseDomain";

class QuestionDomain extends BaseDomain {
  constructor(
    public id: string,
    public option_a: string,
    public option_b: string,
    public option_c: string,
    public option_d: string,
    public subject_id: string,
    public question: string,
    public correct_option: string,
  ) {
    super(id);
    this.id = id;
    this.option_a = option_a;
    this.option_b = option_b;
    this.option_c = option_c;
    this.option_d = option_d;
    this.subject_id = subject_id;
    this.question = question;
    this.correct_option = correct_option;
  }
}

export default QuestionDomain;
