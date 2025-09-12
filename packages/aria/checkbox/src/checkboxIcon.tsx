import React from 'react';
import { forwardRefWith, withAsChild } from '@novawaveui/react-utils';
import { useCheckboxContext } from './checkboxContext';
import { getCheckboxDataProps } from './checkboxData';

export type CheckboxIconProps = {
  /**
   * Class name for the icon element.
   */
  className?: string;

  /**
   * The icon to render.
   */
  children?: React.ReactNode;
};

const CheckboxIcon = forwardRefWith.as<'div', CheckboxIconProps>(
  (props, ref) => {
    const { children, as, asChild, ...rest } = props;
    const context = useCheckboxContext();

    // Determine the component to render, defaulting to 'div'
    const Component = as || 'div';

    // Get the data attributes for the icon
    const dataAttrs = getCheckboxDataProps(context, 'icon');

    const finalProps = {
      'aria-hidden': true,
      ...rest,
      ...dataAttrs,
    };

    const cloned = withAsChild(asChild, children, finalProps, ref);
    if (cloned) return cloned;

    return (
      <Component ref={ref} {...finalProps}>
        {children}
      </Component>
    );
  }
);

CheckboxIcon.displayName = 'NovaWaveUI.AriaCheckbox.Icon';

export default CheckboxIcon;
