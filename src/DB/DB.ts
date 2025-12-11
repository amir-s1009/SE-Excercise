class DB {
  constructor() {
    this.memory = [];
  }
  private memory: KeyValue[];

  public findAll() {
    return this.memory;
  }

  public findUnique(key: KeyValue["key"]) {
    const keyValueFound = this.memory.find((keyValue) => keyValue.key === key);
    if (!keyValueFound)
      throw new Error(`ME1001: Object with the key ${key} is not existing.`);
    return keyValueFound;
  }

  public create(keyValue: KeyValue) {
    const keyIsExisting = !!this.memory.find(
      (item) => item.key === keyValue.key
    );
    if (keyIsExisting)
      throw new Error("ME1002: Failed unique constraint field 'key'.");
    this.memory.push(keyValue);
    return keyValue;
  }

  public delete(key: KeyValue["key"]) {
    try {
      const keyValue = this.findUnique(key);
      const keyValueIndex = this.memory.indexOf(keyValue);
      this.memory.splice(keyValueIndex, 1);
      return keyValue;
    } catch {
      throw new Error(`ME1001: Object with the key ${key} is not existing.`);
    }
  }
}
