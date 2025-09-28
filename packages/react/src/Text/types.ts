import { ElementType } from 'react';
import { PolymorphicProps } from '@novawaveui/react-utils';

export type TextProps<T extends ElementType = 'span'> = PolymorphicProps<T, {}>;

export type TextContextValue = TextProps;
