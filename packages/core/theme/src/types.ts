/**
 * The types file is used to define TypeScript types and interfaces
 * related to the theme of NovaWaveUI.
 */

/**
 * Overrides are used for module augmentation to add custom variants.
 * Users can augment these interfaces in their own projects to add new variants.
 * @example
 * ```
 * declare module '@novawaveui/theme' {
 *   interface NWVariantOverrides {
 *     customVariant: true;
 *   }
 * }
 *```
 *
 * Each component will inherit these overrides for their variant props.
 * Some components may have additional variants defined in their own variant maps.
 *
 * Same applies for other properties that may be present design system wide (e.g., sizes).
 */

export interface NWVariantOverrides {}
export type NWVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'desctructive'
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | keyof NWVariantOverrides;

export interface NWSizeOverrides {}
export type NWSize =
  | 'sm'
  | 'md'
  | 'lg'
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | keyof NWSizeOverrides;
