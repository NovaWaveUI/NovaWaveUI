import React from 'react';
import { forwardRefWith, PolymorphicProps } from '@novawaveui/react-utils';
import { useCheckboxContext } from './checkboxContext';
import { getCheckboxStateDataProps } from './checkboxData';

type Props = {
  /**
   * The content of the label.
   */
  children?: React.ReactNode;

  /**
   * Class name for the label element.
   */
  className?: string;
};

export type CheckboxLabelProps = PolymorphicProps<'label', Props>;

const CheckboxLabel = forwardRefWith.ref<'label', Props>((props, ref) => {
  const { children, className } = props;
  const context = useCheckboxContext();

  // Get the label props from context and merge with props
  const labelProps = context.aria.labelProps;
  const mergedLabelProps = { ...labelProps, ...props };

  const dataAttrs = getCheckboxStateDataProps(context);

  return (
    <label
      {...mergedLabelProps}
      ref={ref}
      className={className}
      {...dataAttrs}
      data-slot="label"
    >
      {children}
    </label>
  );
});

CheckboxLabel.displayName = 'NovaWaveUI.AriaCheckbox.Label';

export default CheckboxLabel;
