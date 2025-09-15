import { forwardRefWith, useDOMRef } from '@novawaveui/react-utils';
import { useButton } from '@react-aria/button';
import { ButtonContextValue, ButtonProps } from './types';

export const Button = forwardRefWith.as<'button', ButtonProps>((props, ref) => {
  const ctx = props as ButtonContextValue;
  const buttonRef = useDOMRef(ref);
  const { buttonProps, isPressed } = useButton(props, buttonRef);

  return <button ref={buttonRef} {...buttonProps} />;
});
