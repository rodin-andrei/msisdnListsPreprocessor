export class FileMsisdn{
  private _name:string
  private _msisdnList:string[]
  private _unique:string
  private _similar:Map<string,number>
  private _extension:string

  constructor(name, msisdnList) {
    this._name = name;
    this._msisdnList = msisdnList;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get msisdnList(): string[] {
    return this._msisdnList;
  }

  set msisdnList(value: string[]) {
    this._msisdnList = value;
  }

  get unique(): string {
    return this._unique;
  }

  set unique(value: string) {
    this._unique = value;
  }

  get similar(): Map<string, number> {
    return this._similar;
  }

  set similar(value: Map<string, number>) {
    this._similar = value;
  }

  get extension(): string {
    return this._extension;
  }

  set extension(value: string) {
    this._extension = value;
  }
}
