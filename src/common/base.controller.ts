import { ForbiddenException } from '@nestjs/common';

export abstract class BaseController {
  protected checkPermission(
    userId: string,
    targetUserId: string,
    userRole: string,
  ) {
    if (userRole === 'customer' && userId !== targetUserId) {
      throw new ForbiddenException(
        'Customers can only update their own account',
      );
    }
  }
}
