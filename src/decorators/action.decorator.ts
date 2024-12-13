import { SetMetadata } from '@nestjs/common';
import { Action } from 'src/enums';

export const ACTION_KEY = 'action';

export const Actions = (...actions: Action[]) =>
  SetMetadata(ACTION_KEY, actions);
