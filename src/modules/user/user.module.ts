import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/user/entities/user.schema';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (next: any) {
            try {
              if (!this.isModified('password')) {
                return next();
              }
              const hashed = await bcrypt.hash(this['password'], 10);
              this['password'] = hashed;
              return next();
            } catch (err) {
              return next(err);
            }
          });
          return schema;
        },
      },
    ]),
  ],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
