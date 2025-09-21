import { useMemo } from 'react';
import { cn, filterDOMProps } from '@novawaveui/utils';
import {
  forwardRefWith,
  useContextProps,
  useDOMRef,
  useRenderProps,
} from '@novawaveui/react-utils';
import {
  ButtonGroupContextValue,
  ButtonGroupProps,
  ButtonGroupRenderProps,
} from './types';
import { ButtonGroupPropsContext, ButtonGroupProvider } from './context';

const ButtonGroup = forwardRefWith.as<'div', ButtonGroupProps<'div'>>(
  (props, ref) => {
    // Extract the `as` prop and the rest of the props
    const {
      as: Component = 'div',
      children,
      className,
      style,
      ...rest
    } = props;

    // Next, get the context props (if there is any), and merge it with
    // the local props
    const [ctxProps, ctxRef] = useContextProps(
      rest,
      ref,
      ButtonGroupPropsContext
    );

    // Next, extract out default values for the props
    const {
      isDisabled = false,
      orientation = 'horizontal',
      color = 'neutral',
      size = 'md',
      variant = 'solid',
      radius = 'md',
    } = ctxProps;

    // Merge the refs
    const domRef = useDOMRef(ctxRef);

    // Create a render props value
    const renderValues: ButtonGroupRenderProps = {
      isDisabled,
    };

    // Get the rendered props
    const {
      children: renderPropsChildren,
      className: renderPropsClassName,
      ...renderProps
    } = useRenderProps({
      ...ctxProps,
      values: renderValues,
      children,
      className,
      style,
    });

    // Create a context value for the button group provider
    const contextValue = useMemo<ButtonGroupContextValue>(() => {
      return {
        color,
        size,
        variant,
        radius,
        isDisabled,
        orientation,
      };
    }, [color, size, variant, radius, isDisabled, orientation]);

    const DOMProps = filterDOMProps(ctxProps);

    return (
      <Component
        ref={domRef}
        className={cn('nw-button-group', renderPropsClassName)}
        {...DOMProps}
        {...renderProps}
        role="group"
        data-orientation={orientation}
      >
        <ButtonGroupProvider value={contextValue}>
          {renderPropsChildren}
        </ButtonGroupProvider>
      </Component>
    );
  }
);

ButtonGroup.displayName = 'NovaWaveUI.ButtonGroup';

export default ButtonGroup;
