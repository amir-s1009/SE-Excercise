class KeyValue {
  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
  public key: string;
  private value: string;

  public getValue() {
    return this.value;
  }
  public updateValue(newValue: string) {
    this.value = newValue;
  }
}
