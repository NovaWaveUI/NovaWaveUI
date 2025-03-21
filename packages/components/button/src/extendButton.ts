import { createExtendedNonSlotComponent } from '@novawaveui/core';
import { testButtonStyles } from '@novawaveui/theme';
import Button from './Button';

export const extendButton = createExtendedNonSlotComponent(
  Button,
  testButtonStyles,
  'button'
);
