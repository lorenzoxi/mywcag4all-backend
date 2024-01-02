export interface CreateUserDto {
  name: string;
  surname: string;
  username: string;
  studentId: string;
  email: string;
  password: string;
  isAdmin: boolean;
}