/**
 * This file contains the type definitions for the design system.
 */

// Color options for components
// This type is used to allow for TypeScript module augmentation
export interface NWColorOverride {}

export interface NWColors {
  neutral: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
}

// The default color options
export type NWColor = keyof NWColors | NWColorOverride[keyof NWColorOverride];

// The variant options for components
// This type is used to allow for TypeScript module augmentation
export type NWVariantOverride = {};

// The default variant options
export type NWVariant =
  | 'solid'
  | 'bordered'
  | 'flat'
  | 'light'
  | 'ghost'
  | NWVariantOverride[keyof NWVariantOverride];

// The size options for components
// This type is used to allow for TypeScript module augmentation
export type NWSizeOverride = {};

// The default size options
export type NWSize = 'sm' | 'md' | 'lg' | NWSizeOverride[keyof NWSizeOverride];

// The radius options for components
// This type is used to allow for TypeScript module augmentation
export type NWRadiusOverride = {};

// The default radius options
export type NWRadius =
  | 'none'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full'
  | NWRadiusOverride[keyof NWRadiusOverride];

// The shadow options for components
// This type is used to allow for TypeScript module augmentation
export type NWShadowOverride = {};

// The default shadow options
export type NWShadow =
  | 'none'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | NWShadowOverride[keyof NWShadowOverride];
