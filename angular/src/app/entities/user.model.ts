export class User extends Object{
  constructor(public id: number,
              public name: string,
              public surname: string,
              public key: string,
              public teamName: string,
              public email: string,
              public image: string) {super()}
}
