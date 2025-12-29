import React from 'react';
import type { PolymorphicProps, RenderProps } from '@novawaveui/react-utils';

export interface ButtonGroupRenderProps {
	/**
	 * Whether or not the group is disabled.
	 * @selector [data-disabled]
	 */
	isDisabled: boolean;
}

export type ButtonGroupProps<T extends React.ElementType> = PolymorphicProps<
	T,
	RenderProps<ButtonGroupRenderProps> & {
		/**
		 * Whether or not the buttons in the group are disabled.
		 */
		isDisabled?: boolean;
	}
>;
