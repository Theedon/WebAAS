import BaseDomain from "./BaseDomain";

export class EventDomain extends BaseDomain {
  constructor(
    public id: string,
    public creator_id: string,
    public title: string,
    public description: string,
    public event_date: Date,
  ) {
    super(creator_id);
    this.creator_id = creator_id;
    this.title = title;
    this.description = description;
    this.event_date = event_date;
  }
}
