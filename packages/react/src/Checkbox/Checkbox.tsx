import type { CheckboxRootProps } from './CheckboxRoot';
import CheckboxRoot from './CheckboxRoot';
import CheckboxIndicator from './CheckboxIndicator';
import CheckboxLabel from './CheckboxLabel';
import CheckboxIcon from './CheckboxIcon';

export type CheckboxProps = CheckboxRootProps;

const Checkbox = Object.assign(CheckboxRoot, {
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
  Icon: CheckboxIcon,
});

Checkbox.displayName = 'NovaWaveUI.Checkbox';

export default Checkbox;
