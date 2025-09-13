import { forwardRefWith } from '@novawaveui/react-utils';
import { useCheckboxStyleContext } from './checkboxContext';
import {
  getCheckboxStateDataProps,
  useCheckboxContext,
} from '@novawaveui/aria-checkbox';
import { getCheckboxDataProps } from './checkboxData';
import { cn } from '@novawaveui/utils';

export type CheckboxIndicatorProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * The `CheckboxIndicator` component is used to display the visual state of the checkbox.
 * This contains the visual representation of the checked, unchecked, and indeterminate states.
 * It is used to display a box and is wrapped around the `CheckboxIcon` component.
 *
 * @example
 * ```tsx
 * <Checkbox>
 *  <CheckboxInput />
 *  <CheckboxIndicator>
 *     <CheckboxIcon />
 *  </CheckboxIndicator>
 * <CheckboxLabel>Label</CheckboxLabel>
 * </Checkbox>
 * ```
 *
 */
export const CheckboxIndicator = forwardRefWith.as<'div', {}>((props, ref) => {
  const { children, className, as, ...rest } = props;
  const styledContext = useCheckboxStyleContext();
  const checkboxContext = useCheckboxContext();

  // Get the data attributes for styling and state
  // We need the state data attributes so that we can style based on the state
  // The state is provided by the headless ui context
  const styledDataAttrs = getCheckboxDataProps(styledContext);
  const stateDataAttrs = getCheckboxStateDataProps(checkboxContext);

  const Component = as || 'div';

  return (
    <Component
      ref={ref}
      className={cn('nw-checkbox', className)}
      {...rest}
      {...styledDataAttrs}
      {...stateDataAttrs}
      aria-hidden="true"
      data-slot="indicator"
    >
      {children}
    </Component>
  );
});

CheckboxIndicator.displayName = 'NovawaveUI.Checkbox.Indicator';

export default CheckboxIndicator;
