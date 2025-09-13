import { forwardRefWith } from '@novawaveui/react-utils';
import { cn } from '@novawaveui/utils';
import { useCheckboxStyleContext } from './checkboxContext';
import { getCheckboxDataProps } from './checkboxData';
import {
  getCheckboxStateDataProps,
  useCheckboxContext,
} from '@novawaveui/aria-checkbox';

export type CheckboxIconProps = React.HTMLAttributes<HTMLSpanElement>;

export const CheckboxIcon = forwardRefWith.as<'span', CheckboxIconProps>(
  (props, ref) => {
    const { children, className, as, ...rest } = props;
    const styledContext = useCheckboxStyleContext();
    const checkboxContext = useCheckboxContext();

    // Get the data attributes for the icon
    const styledDataAttrs = getCheckboxDataProps(styledContext);
    const stateDataAttrs = getCheckboxStateDataProps(checkboxContext);

    const Component = as || 'span';

    return (
      <Component
        ref={ref}
        className={cn('nw-checkbox', className)}
        {...styledDataAttrs}
        {...stateDataAttrs}
        aria-hidden="true"
        data-slot="icon"
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

CheckboxIcon.displayName = 'NovawaveUI.Checkbox.Icon';

export default CheckboxIcon;
