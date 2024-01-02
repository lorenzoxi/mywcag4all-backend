import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from 'src/modules/user/entities/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login-user.dto';
import { DeleteUserDTO } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) { }

  async create(RegisterDTO: CreateUserDto) {
    const { email } = RegisterDTO;
    const user = await this.model.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.model(RegisterDTO);

    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(loginDTO: LoginDTO) {
    const { email, password } = loginDTO;
    const user = await this.model.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  sanitizeUser(user: User) {
    const sanitized = user;
    delete sanitized['password'];
    return sanitized;
  }
  // the new methods
  async findByPayload(payload: any) {
    const { email } = payload;
    return await this.model.findOne({ email });
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async deleteUser(deleteUserDto: DeleteUserDTO) {
    const { email, password } = deleteUserDto;

    const user = await this.model.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return await this.model.findByIdAndDelete(user._id);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async retrieveUsersByTotalScore() {

    const ranking = await this.model.aggregate(
      [
        {
          $lookup: {
            from: "websites",
            localField: "_id",
            foreignField: "user",
            as: "websites"
          }
        },
        {
          $unwind: "$websites"
        },
        {
          $group: {
            _id: "$_id",
            totalScore: { $sum: "$websites.score" },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { totalScore: -1 }
        },
        {
          $project: {
            _id: 1,
            totalScore: 1,
            count: 1,
          }
        }
      ]
    )

    const rankingPopulated = await this.model.populate(ranking, { path: "_id", select: '-_id username' })

    const renamedRanking = rankingPopulated.map((item: any) => {
      return {
        user: item._id,
        totalScore: item.totalScore,
        count: item.count
      };
    });
    return renamedRanking
  }

}