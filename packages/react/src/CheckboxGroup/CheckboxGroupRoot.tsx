import {
  forwardRefWith,
  Provider,
  useContextProps,
  useDOMRef,
  useRenderProps,
} from '@novawaveui/react-utils';
import { useCheckboxGroupState } from 'react-stately';
import { useCheckboxGroup } from 'react-aria';
import { useMemo } from 'react';
import { cn } from '@novawaveui/utils';
import { LabelContext } from 'src/Label';
import { TextContext } from 'src/Text';
import {
  CheckboxGroupNWStateContextValue,
  CheckboxGroupProps,
  CheckboxGroupRenderProps,
} from './types';
import {
  CheckboxGroupNWStateProvider,
  CheckboxGroupPropsContext,
  CheckboxGroupPropsProvider,
} from './context';

const CheckboxGroupRoot = forwardRefWith.as<'div', CheckboxGroupProps>(
  (props, ref) => {
    // Extract the `as` prop and the rest of the props
    const { as: Component = 'div', ...rest } = props;

    // Get the context props (if there is any), a context may not exist,
    // and merge with the local props
    const [ctxProps, ctxRef] = useContextProps(
      rest,
      ref,
      CheckboxGroupPropsContext
    );

    // Create a valid DOM ref using the merged refs
    const domRef = useDOMRef(ctxRef);

    // Spread out and set default values for the props
    const {
      children,
      className,
      style,
      color = 'neutral',
      size = 'md',
      radius = 'md',
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
    } = ctxProps;

    // Call the React Aria useCheckboxGroup to get the group props
    // This will handle all the accessibility features for us
    const groupState = useCheckboxGroupState(ctxProps);
    const {
      groupProps,
      descriptionProps,
      errorMessageProps,
      isInvalid,
      labelProps,
      validationDetails,
      validationErrors,
    } = useCheckboxGroup(ctxProps, groupState);

    // Construct the value for the checkbox group state
    const checkboxGroupStateCtxValue =
      useMemo<CheckboxGroupNWStateContextValue>(
        () => ({
          color,
          radius,
          size,
          state: groupState,
          isDisabled,
          isReadOnly,
          isRequired,
          isInvalid,
          validationDetails,
          validationErrors,
        }),
        [
          color,
          radius,
          size,
          groupState,
          isDisabled,
          isReadOnly,
          isRequired,
          isInvalid,
          validationDetails,
          validationErrors,
        ]
      );

    // Create the value for the group render props
    const renderPropsValue = useMemo<CheckboxGroupRenderProps>(
      () => ({
        isDisabled,
        isReadOnly,
        isRequired,
        isInvalid,
        state: groupState,
        validationDetails,
        validationErrors,
      }),
      [
        isDisabled,
        isReadOnly,
        isRequired,
        isInvalid,
        groupState,
        validationDetails,
        validationErrors,
      ]
    );

    // Use the render props to get the final children, className and style
    const renderProps = useRenderProps({
      ...ctxProps,
      values: renderPropsValue,
      className: cn('nw-checkbox-group', className),
      style,
      children,
    });

    return (
      <Component
        {...groupProps}
        ref={domRef}
        className={renderProps.className}
        style={renderProps.style}
      >
        <CheckboxGroupPropsProvider value={ctxProps}>
          <CheckboxGroupNWStateProvider value={checkboxGroupStateCtxValue}>
            <Provider
              values={[
                [LabelContext, labelProps],
                [
                  TextContext,
                  {
                    slots: {
                      description: descriptionProps,
                      errorMessage: errorMessageProps,
                    },
                  },
                ],
              ]}
            >
              {renderProps.children}
            </Provider>
          </CheckboxGroupNWStateProvider>
        </CheckboxGroupPropsProvider>
      </Component>
    );
  }
);

CheckboxGroupRoot.displayName = 'NovaWaveUI.CheckboxGroup.Root';

export default CheckboxGroupRoot;
