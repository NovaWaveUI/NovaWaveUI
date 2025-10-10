import React from 'react';
import CheckboxGroupRoot from './CheckboxGroupRoot';
import CheckboxGroupLabel from './CheckboxGroupLabel';
import CheckboxGroupDescription from './CheckboxGroupDescription';
import CheckboxGroupError from './CheckboxGroupError';
import CheckboxGroupWrapper from './CheckboxGroupWrapper';
import { CheckboxGroupRootProps } from './types';

export type CheckboxGroupProps<T extends React.ElementType> =
  CheckboxGroupRootProps<T>;

const CheckboxGroup = Object.assign(CheckboxGroupRoot, {
  Label: CheckboxGroupLabel,
  Description: CheckboxGroupDescription,
  Error: CheckboxGroupError,
  Wrapper: CheckboxGroupWrapper,
});

CheckboxGroup.displayName = 'NovaWaveUI.CheckboxGroup';

export default CheckboxGroup;
