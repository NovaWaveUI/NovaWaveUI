import React from 'react';
import { forwardRefWith, useDOMRef } from '@novawaveui/react-utils';
import { CheckboxRootProps } from './types';
import { CheckIcon } from './CheckIcon';
import { LineIcon } from './LineIcon';
import CheckboxRoot from './CheckboxRoot';
import CheckboxIndicator from './CheckboxIndicator';
import CheckboxLabel from './CheckboxLabel';
import CheckboxIcon from './CheckboxIcon';

export interface CheckboxProps extends CheckboxRootProps {
  checkboxIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
}

const Checkbox = Object.assign(
  forwardRefWith.ref<'label', CheckboxProps>((props, ref) => {
    const {
      checkboxIcon = <CheckIcon />,
      indeterminateIcon = <LineIcon />,
      children,
      ...restProps
    } = props;

    const domRef = useDOMRef(ref);

    return (
      <CheckboxRoot ref={domRef} {...restProps}>
        <CheckboxIndicator>
          <CheckboxIcon>
            {({ isIndeterminate }) =>
              isIndeterminate ? <>{indeterminateIcon}</> : <>{checkboxIcon}</>
            }
          </CheckboxIcon>
        </CheckboxIndicator>
        <CheckboxLabel>{children}</CheckboxLabel>
      </CheckboxRoot>
    );
  }),
  {
    Root: CheckboxRoot,
    Indicator: CheckboxIndicator,
    Label: CheckboxLabel,
    Icon: CheckboxIcon,
  }
);

Checkbox.displayName = 'NovaWaveUI.Checkbox';

export default Checkbox;
