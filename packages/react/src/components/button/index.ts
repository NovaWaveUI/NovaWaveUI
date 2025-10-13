import { Button as ButtonBase } from './Button';
import { ButtonEndContent } from './ButtonEndContent';
import { ButtonStartContent } from './ButtonStartContent';
import { ButtonText } from './ButtonText';

/**
 * The Button component is a polymorphic component that can be used
 * as a button, link or any other element. It is composed of
 * several subcomponents that can be used to customize the
 * appearance and behavior of the button.
 *
 * @example
 * <Button color="primary" size="md" variant="solid">
 *   <Button.StartContent>
 *     <Icon name="plus" />
 *   </Button.StartContent>
 *   <Button.Text>Add Item</Button.Text>
 *   <Button.EndContent>
 *     <Icon name="arrow-right" />
 *   </Button.EndContent>
 * </Button>
 */
export const Button = Object.assign(ButtonBase, {
  StartContent: ButtonStartContent,
  Text: ButtonText,
  EndContent: ButtonEndContent,
});

export type { ButtonProps } from './Button';
export type { ButtonRenderProps, ButtonStyleProps } from './types';
export {
  ButtonStateContext,
  useButtonState,
  ButtonContext,
  useButtonContextProps,
} from './context';
