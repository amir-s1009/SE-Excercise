import db from "../DB/DBClient";

export class KeyValueService {
  public static getAllKeyValues() {
    return db.findAll();
  }

  public static getKeyValueByKey(key: KeyValue["key"]) {
    const keyValue = db.findUnique(key);
    return keyValue;
  }

  public static createKeyValue(keyValue: KeyValue) {
    const keyValueCreated = db.create(keyValue);
    return keyValueCreated;
  }

  public static deleteKeyValue(key: KeyValue["key"]) {
    const keyValueDeleted = db.delete(key);
    return keyValueDeleted;
  }
}
