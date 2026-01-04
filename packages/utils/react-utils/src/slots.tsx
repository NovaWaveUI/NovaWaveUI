import React, { createContext, JSX, useContext, useMemo } from 'react';
import { mergeProps } from '@react-aria/utils';
import { mergeRefs } from './ref';

export type SlotConfig = Record<string, object | undefined>;
type SlotValue<T> = T extends object ? T : {};

export interface SlotSystem<TSlots extends SlotConfig> {
	Provider: (props: {
		value: Partial<TSlots>;
		children: React.ReactNode;
	}) => JSX.Element;
	useSlot<Name extends keyof TSlots>(
		name: Name,
		props?: SlotValue<TSlots[Name]> & { ref?: React.Ref<any> }
	): TSlots[Name];
}

export function createSlotSystem<
	TSlots extends SlotConfig,
>(): SlotSystem<TSlots> {
	type SlotName = keyof TSlots;

	const SlotPropsContext = createContext<Partial<TSlots>>({});

	function Provider({
		value,
		children,
	}: {
		value: Partial<TSlots>;
		children: React.ReactNode;
	}) {
		const mergedValue = useMemo(() => value, [value]);

		return (
			<SlotPropsContext.Provider value={mergedValue}>
				{children}
			</SlotPropsContext.Provider>
		);
	}

	function useSlot<Name extends SlotName>(
		name: Name,
		props?: SlotValue<TSlots[Name]> & { ref?: React.Ref<any> }
	): TSlots[Name] {
		const context = useContext(SlotPropsContext);

		const merged = mergeProps({}, context[name] || {}, props || {});

		// Merge refs in order: context ref (if any) -> props.ref
		const ctxRef = (context[name] as any)?.ref as
			| React.Ref<any>
			| undefined;
		const propRef = (props as any)?.ref as React.Ref<any> | undefined;

		// Create a single merged ref that will call context ref and prop ref.
		(merged as any).ref = mergeRefs(ctxRef, propRef);

		return merged as TSlots[Name];
	}

	return {
		Provider,
		useSlot,
	};
}

// Utility type to ensure no extra props are passed
type NeverProps<T> = { [K in keyof T]?: never };

/**
 * Props for a slot that can either render default content or custom children.
 * If `renderDefault` is true or undefined, the slot will render its default content.
 * If `renderDefault` is false, the slot will render the provided `children`.
 */
export type SlotRenderDefaultPropsStrict<TPrimitiveProps> =
	| (TPrimitiveProps & { renderDefault?: true })
	| ({
			renderDefault: false;
			children: React.ReactNode;
	  } & NeverProps<TPrimitiveProps>);
