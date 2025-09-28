import {
  ContextValue,
  forwardRefWith,
  RenderProps,
  useContextProps,
  useDOMRef,
  useRenderProps,
} from '@novawaveui/react-utils';
import React, { ElementType, useMemo } from 'react';
import Label, { LabelContext, LabelProps } from 'src/Label';
import type { LabelContextValue } from 'src/Label';
import { CheckboxGroupRenderProps } from './types';
import { getCheckboxGroupDataAttrs, useCheckboxGroupNWState } from './context';

export type CheckboxGroupLabelProps<T extends ElementType = 'span'> =
  LabelProps<T> & RenderProps<CheckboxGroupRenderProps>;

const CheckboxGroupLabel = forwardRefWith.as<
  'span',
  CheckboxGroupLabelProps<'span'>
>((props, ref) => {
  // Get the context props, if any, and merge them with the original props
  const [ctxProps, ctxRef] = useContextProps(
    props,
    ref,
    LabelContext as React.Context<
      ContextValue<LabelContextValue<'span'>, HTMLSpanElement>
    >
  );

  // Create a valid DOM ref using the merged refs
  const domRef = useDOMRef(ctxRef);

  // Extract children and the rest of the props
  const { children, className, style, ...otherProps } = ctxProps;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupNWState();

  // Create a render props value
  const renderValues = useMemo<CheckboxGroupRenderProps>(
    () => ({
      isDisabled: nwGroupState?.isDisabled,
      isReadOnly: nwGroupState?.isReadOnly,
      isRequired: nwGroupState?.isRequired,
      isInvalid: nwGroupState?.isInvalid,
      state: nwGroupState?.state,
    }),
    [
      nwGroupState?.isDisabled,
      nwGroupState?.isReadOnly,
      nwGroupState?.isRequired,
      nwGroupState?.isInvalid,
      nwGroupState?.state,
    ]
  );

  const dataAttrs = getCheckboxGroupDataAttrs(nwGroupState);

  const renderProps = useRenderProps({
    className: className,
    style: style,
    children: children,
    values: renderValues,
    defaultClassName: className,
  });

  return (
    <Label
      ref={domRef}
      {...renderProps}
      {...dataAttrs}
      {...otherProps}
      data-slot="label"
    />
  );
});

CheckboxGroupLabel.displayName = 'NovaWaveUI.CheckboxGroup.Label';

export default CheckboxGroupLabel;
