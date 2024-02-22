import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { PaginationSearchDto } from '@app/common/dto/pagination-search.dto';
import { UserDetailsDto } from '@app/common/dto/user-details.dto';
import { GetUserDto } from './dto/get-user-dto';
import { RolesRepository } from '../roles/roles.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.validateCreateUserDto(createUserDto);
      const role = await this.rolesRepository.findOne({
        id: createUserDto.roleId,
      });
      const user = new User({
        ...createUserDto,
        email: createUserDto.email.trim().toLowerCase(),
        password: await bcrypt.hash(createUserDto.password, 10),
        role,
      });
      return this.usersRepository.create(user);
    } catch (error) {
      return { isValid: false, err: error };
    }
  }

  async findAll(paginationSearch: PaginationSearchDto<User>) {
    const userList = await this.usersRepository.findWithPagination(
      paginationSearch,
      User.getGenericTextSearchWhere(paginationSearch.search),
      ['role'],
    );
    const userDtoListPromises = userList.data.map(async (user) => {
      return UserDetailsDto.fromUser(user);
    });
    const userDtoList = await Promise.all(userDtoListPromises);

    return {
      statusCode: 200,
      message: 'All users got successfully',
      total: userList.total,
      data: userDtoList,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersRepository.findOneAndUpdate(
      { id },
      updateUserDto,
    );

    return {
      statusCode: 200,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async remove(id: number) {
    const deletedUser = await this.usersRepository.findOneAndUpdate(
      { id },
      { isDeleted: true },
    );
    return {
      statusCode: 204,
      message: 'User ' + deletedUser.name + ' has been deleted successfully',
    };
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already exist');
  }

  async verifyUser(email: string, password: string) {
    const emailProcessed = email.trim().toLowerCase();
    const user = await this.usersRepository.findOne({ email: emailProcessed });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return UserDetailsDto.fromUser(user);
  }

  async getUser(getUserDto: GetUserDto) {
    const user = await this.usersRepository.findOne(getUserDto, ['role']);
    if (user) {
      return UserDetailsDto.fromUser(user);
    }
    return null;
  }
}
