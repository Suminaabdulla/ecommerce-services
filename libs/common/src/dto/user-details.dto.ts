import { RoleDetailsDto } from './role-details.dto';

export class UserDetailsDto {
  id: number;
  name: string;
  email: string;
  role: RoleDetailsDto;

  static fromUser(user: any): UserDetailsDto {
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: RoleDetailsDto.fromRole(user.role),
    };
  }
}
