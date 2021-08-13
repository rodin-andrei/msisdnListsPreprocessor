export class FileMsisdn{
  private _name:string
  private _msisdnArr:string[]
  private _unique:number
  private _similar:Map<string,number>
  private _extension:string

  constructor(name, msisdnList,extension) {
    this._name = name;
    this._msisdnArr = msisdnList;
    this._extension = extension
    this.similar = new Map<string, number>()
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get msisdnArr(): string[] {
    return this._msisdnArr;
  }

  set msisdnArr(value: string[]) {
    this._msisdnArr = value;
  }

  get unique(): number {
    return this._unique;
  }

  set unique(value: number) {
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
