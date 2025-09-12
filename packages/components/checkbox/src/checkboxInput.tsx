import { AriaCheckbox } from '@novawaveui/aria-checkbox';
import { forwardRefWith } from '@novawaveui/react-utils';
import { cn } from '@novawaveui/utils';
import { useCheckboxStyleContext } from './checkboxContext';
import { getCheckboxDataProps } from './checkboxData';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const CheckboxInput = forwardRefWith.ref<'input', {}>((props, ref) => {
  const { className, ...rest } = props;
  const context = useCheckboxStyleContext();

  // Get the data attributes for the input
  const dataAttributes = getCheckboxDataProps(context);

  return (
    <AriaCheckbox.Input
      ref={ref}
      className={cn('nw-checkbox', className)}
      {...rest}
      {...dataAttributes}
    />
  );
});

CheckboxInput.displayName = 'NovawaveUI.Checkbox.Input';

export default CheckboxInput;

export { type CheckboxInputProps } from '@novawaveui/aria-checkbox';
