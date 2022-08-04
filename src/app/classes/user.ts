export class User {
  constructor(
    username: string,
    password: string,
    email?: string,
    name?: string,
    surname?: string,
    goingToGo?: boolean,
    assisntantNumber?: number
  ) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.goingToGo = goingToGo;
    this.assistantNumber = assisntantNumber;
    this.id = new Date().getTime();
  }

  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  goingToGo: boolean;
  assistantNumber: number;
  password: string;
}
