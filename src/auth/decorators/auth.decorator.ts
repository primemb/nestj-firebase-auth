import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../enums/roles.enum';
import { ROLES_KEY } from '../constants/constants';

export function Auth(...permissions: Roles[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, permissions),
    UseGuards(AuthGuard),
  );
}
