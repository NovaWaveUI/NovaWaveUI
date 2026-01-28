/**
 * @fileoverview Types relating to the color token.
 */

/**
 * The supported color spaces for color tokens.
 */
export type ColorSpaces =
  | 'srgb'
  | 'srgb-linear'
  | 'hsl'
  | 'hwb'
  | 'lab'
  | 'lch'
  | 'oklab'
  | 'oklch'
  | 'display-p3'
  | 'a98-rgb'
  | 'prophoto-rgb'
  | 'rec2020'
  | 'xyz-d65'
  | 'xyz-d50';

export const colorSpacesArray: ColorSpaces[] = [
  'srgb',
  'srgb-linear',
  'hsl',
  'hwb',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'display-p3',
  'a98-rgb',
  'prophoto-rgb',
  'rec2020',
  'xyz-d65',
  'xyz-d50',
];

/**
 * An element in a color component array, representing either a numeric value
 * or 'none' to indicate the absence of a component.
 */
export type ColorComponent = number | 'none';

export const colorComponentNone = 'none';

/**
 * Error thrown when a color component is invalid.
 */
export class InvalidColorComponentError extends Error {
  constructor(component: unknown) {
    super(`Invalid color component: ${component}`);
    this.name = 'InvalidColorComponentError';
  }
}

/**
 * Error thrown when a color space is invalid.
 */
export class InvalidColorSpaceError extends Error {
  constructor(colorSpace: unknown) {
    super(`Invalid color space: ${colorSpace}`);
    this.name = 'InvalidColorSpaceError';
  }
}

/**
 * Error thrown when a color component is out of the expected range.
 */
export class ColorComponentOutOfRangeError extends Error {
  constructor(component: number, min: number, max: number) {
    super(
      `Color component ${component} is out of range. Expected between ${min} and ${max}.`,
    );
    this.name = 'ColorComponentOutOfRangeError';
  }
}

/**
 * Error thrown when a color component is missing.
 */
export class MissingColorComponentError extends Error {
  constructor(index: number) {
    super(`Missing color component at index ${index}.`);
    this.name = 'MissingColorComponentError';
  }
}

export class ColorComponentsLengthError extends Error {
  constructor(expectedLength: number, actualLength: number) {
    super(
      `Invalid number of color components: expected ${expectedLength}, got ${actualLength}.`,
    );
    this.name = 'ColorComponentsLengthError';
  }
}

/**
 * A base class representing a value of a color component.
 *
 * Used to help with type checking and validation. Also used
 * to specify the parts of a color component value.
 */
export abstract class ColorComponentValue {
  /**
   * The components of the color in the specified color space.
   */
  readonly components: ColorComponent[];

  /**
   * Default constructor for ColorComponentValue.
   *
   * @param components The components of the color.
   */
  constructor(components: ColorComponent[]) {
    this.components = components;
    this.validate();
  }

  /**
   * Validates the color component values.
   *
   * @throws {InvalidColorComponentError} If any component is invalid.
   * @throws {ColorComponentOutOfRangeError} If any component is out of range.
   */
  abstract validate(): void;
}

export class RGBColorComponentValue extends ColorComponentValue {
  /**
   * The red component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly r: ColorComponent;

  /**
   * The green component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly g: ColorComponent;

  /**
   * The blue component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly b: ColorComponent;

  constructor(r: ColorComponent, g: ColorComponent, b: ColorComponent) {
    super([r, g, b]);
    this.r = r;
    this.g = g;
    this.b = b;
  }

  validate(): void {
    this.components.forEach(component => {
      if (component !== 'none') {
        if (typeof component !== 'number') {
          throw new InvalidColorComponentError(component);
        }
        if (component < 0 || component > 1) {
          throw new ColorComponentOutOfRangeError(component, 0, 1);
        }
      }
    });
  }
}

export class XYZColorComponentValue extends ColorComponentValue {
  /**
   * The X component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly x: ColorComponent;

  /**
   * The Y component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly y: ColorComponent;

  /**
   * The Z component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly z: ColorComponent;

  constructor(x: ColorComponent, y: ColorComponent, z: ColorComponent) {
    super([x, y, z]);
    this.x = x;
    this.y = y;
    this.z = z;
  }

  validate(): void {
    this.components.forEach(component => {
      if (component !== 'none') {
        if (typeof component !== 'number') {
          throw new InvalidColorComponentError(component);
        }
        if (component < 0 || component > 1) {
          throw new ColorComponentOutOfRangeError(component, 0, 1);
        }
      }
    });
  }
}

/**
 * A class representing sRGB color component values.
 */
export class SRGBColorComponentValue extends ColorComponentValue {
  /**
   * The red component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly r: ColorComponent;

  /**
   * The green component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly g: ColorComponent;

  /**
   * The blue component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly b: ColorComponent;

  constructor(r: ColorComponent, g: ColorComponent, b: ColorComponent) {
    super([r, g, b]);
    this.r = r;
    this.g = g;
    this.b = b;
  }

  validate(): void {
    this.components.forEach(component => {
      if (component !== 'none') {
        if (typeof component !== 'number') {
          throw new InvalidColorComponentError(component);
        }
        if (component < 0 || component > 1) {
          throw new ColorComponentOutOfRangeError(component, 0, 1);
        }
      }
    });
  }
}

/**
 * A class representing sRGB Linear color component values.
 */
export class SRGBLinearColorComponentValue extends ColorComponentValue {
  /**
   * The red component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly r: ColorComponent;

  /**
   * The green component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly g: ColorComponent;

  /**
   * The blue component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly b: ColorComponent;

  constructor(r: ColorComponent, g: ColorComponent, b: ColorComponent) {
    super([r, g, b]);
    this.r = r;
    this.g = g;
    this.b = b;
  }

  validate(): void {
    this.components.forEach(component => {
      if (component !== 'none') {
        if (typeof component !== 'number') {
          throw new InvalidColorComponentError(component);
        }
        if (component < 0 || component > 1) {
          throw new ColorComponentOutOfRangeError(component, 0, 1);
        }
      }
    });
  }
}

export class HSLColorComponentValue extends ColorComponentValue {
  /**
   * The hue component of the color.
   * Value must be [0-360) or 'none'.
   */
  readonly h: ColorComponent;

  /**
   * The saturation component of the color.
   * Value must be [0-100] or 'none'.
   */
  readonly s: ColorComponent;

  /**
   * The lightness component of the color.
   * Value must be [0-100] or 'none'.
   */
  readonly l: ColorComponent;

  constructor(h: ColorComponent, s: ColorComponent, l: ColorComponent) {
    super([h, s, l]);
    this.h = h;
    this.s = s;
    this.l = l;
  }

  validate(): void {
    this.components.forEach((component, index) => {
      if (component !== 'none') {
        if (typeof component !== 'number') {
          throw new InvalidColorComponentError(component);
        }
        if (index === 0) {
          // Hue
          if (component < 0 || component >= 360) {
            throw new ColorComponentOutOfRangeError(component, 0, 360);
          }
        } else {
          // Saturation and Lightness
          if (component < 0 || component > 100) {
            throw new ColorComponentOutOfRangeError(component, 0, 100);
          }
        }
      }
    });
  }
}

export class HWBColorComponentValue extends ColorComponentValue {
  /**
   * The hue component of the color.
   * Value must be [0-360) or 'none'.
   */
  readonly h: ColorComponent;

  /**
   * The whiteness component of the color.
   * Value must be [0-100] or 'none'.
   */
  readonly w: ColorComponent;

  /**
   * The blackness component of the color.
   * Value must be [0-100] or 'none'.
   */
  readonly b: ColorComponent;

  constructor(h: ColorComponent, w: ColorComponent, b: ColorComponent) {
    super([h, w, b]);
    this.h = h;
    this.w = w;
    this.b = b;
  }

  validate(): void {
    this.components.forEach((component, index) => {
      if (component !== 'none') {
        if (typeof component !== 'number') {
          throw new InvalidColorComponentError(component);
        }
        if (index === 0) {
          // Hue
          if (component < 0 || component >= 360) {
            throw new ColorComponentOutOfRangeError(component, 0, 360);
          }
        } else {
          // Whiteness and Blackness
          if (component < 0 || component > 100) {
            throw new ColorComponentOutOfRangeError(component, 0, 100);
          }
        }
      }
    });
  }
}

export class LabColorComponentValue extends ColorComponentValue {
  /**
   * The L* component of the color.
   * Value must be [0-100] or 'none'.
   */
  readonly l: ColorComponent;

  /**
   * The a* component of the color.
   * Value must be [-Infinity, Infinity] or 'none'.
   * In practice, usually in the range [-160, 160].
   */
  readonly a: ColorComponent;

  /**
   * The b* component of the color.
   * Value must be [-Infinity, Infinity] or 'none'.
   * In practice, usually in the range [-160, 160].
   */
  readonly b: ColorComponent;

  constructor(l: ColorComponent, a: ColorComponent, b: ColorComponent) {
    super([l, a, b]);
    this.l = l;
    this.a = a;
    this.b = b;
  }

  validate(): void {
    this.components.forEach((component, index) => {
      if (component !== 'none') {
        if (typeof component !== 'number') {
          throw new InvalidColorComponentError(component);
        }
        if (index === 0) {
          // L*
          if (component < 0 || component > 100) {
            throw new ColorComponentOutOfRangeError(component, 0, 100);
          }
        } else {
          // a* and b*
          // No specific range check since it's [-Infinity, Infinity]
        }
      }
    });
  }
}

export class LCHColorComponentValue extends ColorComponentValue {
  /**
   * The Lightness component of the color.
   * Value must be [0-100] or 'none'.
   */
  readonly l: ColorComponent;

  /**
   * The Chroma component of the color.
   * Value must be [0-Infinity] or 'none'.
   * In practice, usually does not exceed 230.
   */
  readonly c: ColorComponent;

  /**
   * The hue component of the color.
   * Value must be [0-360) or 'none'.
   */
  readonly h: ColorComponent;

  constructor(l: ColorComponent, c: ColorComponent, h: ColorComponent) {
    super([l, c, h]);
    this.l = l;
    this.c = c;
    this.h = h;
  }

  validate(): void {
    this.components.forEach((component, index) => {
      if (component !== 'none') {
        if (typeof component !== 'number') {
          throw new InvalidColorComponentError(component);
        }
        if (index === 0) {
          // Lightness
          if (component < 0 || component > 100) {
            throw new ColorComponentOutOfRangeError(component, 0, 100);
          }
        } else if (index === 2) {
          // Hue
          if (component < 0 || component >= 360) {
            throw new ColorComponentOutOfRangeError(component, 0, 360);
          }
        } else if (index === 3) {
          // Chroma
          if (component < 0) {
            throw new ColorComponentOutOfRangeError(component, 0, Infinity);
          }
        }
      }
    });
  }
}

export class OklabColorComponentValue extends ColorComponentValue {
  /**
   * The Lightness component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly l: ColorComponent;

  /**
   * The a component of the color.
   * Value must be [-Infinity, Infinity] or 'none'.
   * In practice, usually in the range [-0.5, 0.5].
   */
  readonly a: ColorComponent;

  /**
   * The b component of the color.
   * Value must be [-Infinity, Infinity] or 'none'.
   * In practice, usually in the range [-0.5, 0.5].
   */
  readonly b: ColorComponent;

  constructor(l: ColorComponent, a: ColorComponent, b: ColorComponent) {
    super([l, a, b]);
    this.l = l;
    this.a = a;
    this.b = b;
  }

  validate(): void {
    this.components.forEach((component, index) => {
      if (component !== 'none') {
        if (typeof component !== 'number') {
          throw new InvalidColorComponentError(component);
        }
        if (index === 0) {
          // Lightness
          if (component < 0 || component > 1) {
            throw new ColorComponentOutOfRangeError(component, 0, 1);
          }
        } else {
          // a and b
          // No specific range check since it's [-Infinity, Infinity]
        }
      }
    });
  }
}

export class OklchColorComponentValue extends ColorComponentValue {
  /**
   * The Lightness component of the color.
   * Value must be [0-1] or 'none'.
   */
  readonly l: ColorComponent;

  /**
   * The Chroma component of the color.
   * Value must be [0-Infinity] or 'none'.
   * In practice, usually does not exceed 0.5.
   */
  readonly c: ColorComponent;

  /**
   * The hue component of the color.
   * Value must be [0-360) or 'none'.
   */
  readonly h: ColorComponent;

  constructor(l: ColorComponent, c: ColorComponent, h: ColorComponent) {
    super([l, c, h]);
    this.l = l;
    this.c = c;
    this.h = h;
  }

  validate(): void {
    this.components.forEach((component, index) => {
      if (component !== 'none') {
        if (typeof component !== 'number') {
          throw new InvalidColorComponentError(component);
        }
        if (index === 0) {
          // Lightness
          if (component < 0 || component > 1) {
            throw new ColorComponentOutOfRangeError(component, 0, 1);
          }
        } else if (index === 2) {
          // Hue
          if (component < 0 || component >= 360) {
            throw new ColorComponentOutOfRangeError(component, 0, 360);
          }
        } else if (index === 1) {
          // Chroma
          if (component < 0) {
            throw new ColorComponentOutOfRangeError(component, 0, Infinity);
          }
        }
      }
    });
  }
}

export class DisplayP3ColorComponentValue extends RGBColorComponentValue {}

export class A98RGBColorComponentValue extends RGBColorComponentValue {}

export class ProPhotoRGBColorComponentValue extends RGBColorComponentValue {}

export class Rec2020ColorComponentValue extends RGBColorComponentValue {}

export class XYZD65ColorComponentValue extends XYZColorComponentValue {}

export class XYZD50ColorComponentValue extends XYZColorComponentValue {}

/**
 * Union type representing all supported color component value types.
 */
export type ColorComponentValues =
  | SRGBColorComponentValue
  | SRGBLinearColorComponentValue
  | HSLColorComponentValue
  | HWBColorComponentValue
  | LabColorComponentValue
  | LCHColorComponentValue
  | OklabColorComponentValue
  | OklchColorComponentValue
  | DisplayP3ColorComponentValue
  | A98RGBColorComponentValue
  | ProPhotoRGBColorComponentValue
  | Rec2020ColorComponentValue
  | XYZD65ColorComponentValue
  | XYZD50ColorComponentValue;
