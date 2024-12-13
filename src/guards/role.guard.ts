import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY, ACTION_KEY } from '../decorators';
import { Role, Action } from '../enums';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLE_KEY,
      context.getHandler(),
    );

    const requiredAction = this.reflector.get<Action[]>(
      ACTION_KEY,
      context.getHandler(),
    );

    const { user } = context.switchToHttp().getRequest();

    if (!requiredAction || requiredAction.length === 0) {
      return true;
    }

    if (user && requiredRoles && !requiredRoles.includes(user?.role)) {
      return false;
    }

    // if (
    //   user &&
    //   requiredPermission &&
    //   !requiredPermission.includes(user?.action)
    // ) {
    //   return false;
    // }

    return true;
  }
}
