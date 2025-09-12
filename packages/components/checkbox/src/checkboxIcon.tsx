import { forwardRefWith } from '@novawaveui/react-utils';
import { AriaCheckbox } from '@novawaveui/aria-checkbox';
import { cn } from '@novawaveui/utils';
import { useCheckboxStyleContext } from './checkboxContext';
import { getCheckboxDataProps } from './checkboxData';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const CheckboxIcon = forwardRefWith.as<'div', {}>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useCheckboxStyleContext();

  // Get the data attributes for the icon
  const dataAttributes = getCheckboxDataProps(context);

  return (
    <AriaCheckbox.Icon
      ref={ref}
      className={cn('nw-checkbox', className)}
      {...rest}
      {...dataAttributes}
    >
      {children}
    </AriaCheckbox.Icon>
  );
});

CheckboxIcon.displayName = 'NovawaveUI.Checkbox.Icon';

export default CheckboxIcon;

export { type CheckboxIconProps } from '@novawaveui/aria-checkbox';
