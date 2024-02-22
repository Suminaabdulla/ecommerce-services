export class RoleDetailsDto {
  id: number;
  name: string;

  static fromRole(role): RoleDetailsDto {
    return {
      id: role?.id,
      name: role?.name,
    };
  }
}
