export interface CreateUserDto {
  name: string;
  surname: string;
  username: string;
  student_id: string;
  email: string;
  password: string;
  is_admin: boolean;
}