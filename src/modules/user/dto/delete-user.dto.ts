export class DeleteUserDTO {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  is_admin: boolean = false;
}
