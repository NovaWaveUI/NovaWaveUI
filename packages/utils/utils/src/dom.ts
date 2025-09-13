/**
 * Given a value, returns a value that can be used as a data attribute in JSX.
 *
 * @param attr - The value of the data attribute to be converted.
 * @returns A value that can be used as a data attribute in JSX.
 */
export const dataAttr = (attr: any) => {
  // If the attribute is a boolean, if it is true leave it, if false return undefined
  if (typeof attr === 'boolean') {
    return attr ? true : undefined;
  }
  // If the attribute is a string or number, return it as is
  if (typeof attr === 'string' || typeof attr === 'number') {
    return attr;
  }
  // For any other type, return undefined
  return;
};

/**
 * Creates a data-* attributes object from a record of states.
 *
 * @example
 * dataProps({ hovered: true, disabled: false, size: "sm" })
 * // => { "data-hovered": true, "data-size": "sm" }
 */
export const dataProps = (props: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(props).map(([key, value]) => [
      `data-${key}`,
      dataAttr(value),
    ])
  );
};

/**
 * Factory to create a data-props getter function scoped to a component.
 *
 * @example
 * const getCheckboxDataProps = createDataPropsGetter<CheckboxContextValue>(
 *   (ctx) => ({
 *     disabled: ctx.isDisabled,
 *     focused: ctx.isFocused,
 *     "focus-visible": ctx.isFocusVisible,
 *     hovered: ctx.isHovered,
 *     pressed: ctx.isPressed,
 *     checked: ctx.isSelected,
 *     indeterminate: ctx.isIndeterminate,
 *     "read-only": ctx.isReadOnly ?? ctx.aria.isReadOnly,
 *     invalid: ctx.isInvalid,
 *   })
 * );
 */
export function createDataPropsGetter<Context>(
  mapper: (ctx: Context) => Record<string, any>
) {
  return (ctx: Context) => {
    return {
      ...dataProps(mapper(ctx)),
    };
  };
}
