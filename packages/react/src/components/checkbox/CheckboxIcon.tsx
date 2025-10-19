import React from 'react';
import { cn } from '../../utils';
import { RenderProps, useRenderProps } from '../../utils/react';
import { Text, TextProps } from '../primitives/text';
import { CheckboxRenderProps } from './types';
import { useCheckboxState } from './context';
import { useCheckboxRenderContext } from './state';
import { CheckIcon, LineIcon } from './icons';

export type CheckboxIconProps<T extends React.ElementType> = Omit<
  TextProps<T>,
  'children' | 'style'
> &
  RenderProps<CheckboxRenderProps>;

export function CheckboxIcon<T extends React.ElementType = 'span'>(
  props: CheckboxIconProps<T>
) {
  const { style, children: childrenProp, ...rest } = props;

  // Get the checkbox state so that we get the current state
  // and data properties
  const checkboxStateCtx = useCheckboxState();

  // Get the data attributes from the context
  const { dataAttrs, renderValues } =
    useCheckboxRenderContext(checkboxStateCtx);

  let children = childrenProp;

  if (!children) {
    children = ({ isIndeterminate }: CheckboxRenderProps) =>
      isIndeterminate ? <LineIcon /> : <CheckIcon />;
  }

  const renderProps = useRenderProps({
    ...rest,
    children,
    className: cn('nw-checkbox-icon', props.className),
    values: renderValues,
    defaultClassName: cn('nw-checkbox-icon', props.className),
  });

  const textIconProps = {
    ...rest,
    ...renderProps,
    ...dataAttrs,
    'aria-hidden': true,
    'data-slot': 'checkbox-icon' as const,
  } as TextProps<T>;

  return <Text {...textIconProps} />;
}

CheckboxIcon.displayName = 'NovaWaveUI.CheckboxIcon';
