import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/Role/role.enum';

export const ROLE_KEY = 'roles'
const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
console.log(Roles);

export {Roles}