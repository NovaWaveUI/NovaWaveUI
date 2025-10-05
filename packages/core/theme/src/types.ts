/**
 * Type definitions for the NovaWaveUI design system.
 *
 * Consumers can use `declare module "@novawaveui/theme"` to
 * augment these interfaces in order to add or remove options.
 */

// ---------------- Colors ----------------
export interface NWColorOverride {}
export interface NWColorRemove {}

export type NWColors =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type NWColor =
  | Exclude<
      'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger',
      keyof NWColorRemove
    >
  | NWColorOverride[keyof NWColorOverride];

// ---------------- Variants ----------------
export interface NWVariantOverride {}
export interface NWVariantRemove {}

export type NWVariant =
  | Exclude<
      'solid' | 'bordered' | 'flat' | 'light' | 'ghost',
      keyof NWVariantRemove
    >
  | NWVariantOverride[keyof NWVariantOverride];

// ---------------- Sizes ----------------
export interface NWSizeOverride {}
export interface NWSizeRemove {}

export type NWSize =
  | Exclude<'sm' | 'md' | 'lg', keyof NWSizeRemove>
  | NWSizeOverride[keyof NWSizeOverride];

// ---------------- Radius ----------------
export interface NWRadiusOverride {}
export interface NWRadiusRemove {}

export type NWRadius =
  | Exclude<'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full', keyof NWRadiusRemove>
  | NWRadiusOverride[keyof NWRadiusOverride];

// ---------------- Shadows ----------------
export interface NWShadowOverride {}
export interface NWShadowRemove {}

export type NWShadow =
  | Exclude<'none' | 'sm' | 'md' | 'lg' | 'xl', keyof NWShadowRemove>
  | NWShadowOverride[keyof NWShadowOverride];
