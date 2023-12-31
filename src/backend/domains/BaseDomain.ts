/**
 * Abstract base class for domain objects.
 * Defines an id property common to all domain objects.
 */
abstract class BaseDomain {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export default BaseDomain;
