import { AriaCheckbox } from '@novawaveui/aria-checkbox';

import { forwardRefWith } from '@novawaveui/react-utils';
import { cn } from '@novawaveui/utils';
import { getCheckboxDataProps } from './checkboxData';
import { useCheckboxStyleContext } from './checkboxContext';

export const CheckboxLabel = forwardRefWith.ref<'label', {}>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useCheckboxStyleContext();

  // Get the data attributes for the label
  const dataAttributes = getCheckboxDataProps(context);

  return (
    <AriaCheckbox.Label
      ref={ref}
      className={cn('nw-checkbox', className)}
      {...rest}
      {...dataAttributes}
    >
      {children}
    </AriaCheckbox.Label>
  );
});

CheckboxLabel.displayName = 'NovawaveUI.Checkbox.Label';

export default CheckboxLabel;

export { type CheckboxLabelProps } from '@novawaveui/aria-checkbox';
