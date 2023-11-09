import { User } from 'src/modules/user/entities/user.schema';

export class CreateWebsiteDto {
  name: string;
  is_public: boolean;
  url: string;
  score: number;
  level: string;
  user: User;
}
