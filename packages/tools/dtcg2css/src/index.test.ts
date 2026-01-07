import { describe, it, expect } from "vitest";
import { convertDTCGToCSS } from "./index.js";

describe("convertDTCGToCSS", () => {
  it("should convert simple color tokens to CSS variables", () => {
    const tokens = {
      color: {
        primary: {
          $type: "color",
          $value: "#0066cc",
        },
      },
    };

    const result = convertDTCGToCSS(tokens);

    expect(result).toContain(":root {");
    expect(result).toContain("--color-primary: #0066cc;");
  });

  it("should convert dimension tokens with px units", () => {
    const tokens = {
      spacing: {
        sm: {
          $type: "dimension",
          $value: 8,
        },
      },
    };

    const result = convertDTCGToCSS(tokens);

    expect(result).toContain("--spacing-sm: 8px;");
  });

  it("should handle nested token groups", () => {
    const tokens = {
      color: {
        brand: {
          primary: {
            $type: "color",
            $value: "#0066cc",
          },
          secondary: {
            $type: "color",
            $value: "#ff6600",
          },
        },
      },
    };

    const result = convertDTCGToCSS(tokens);

    expect(result).toContain("--color-brand-primary: #0066cc;");
    expect(result).toContain("--color-brand-secondary: #ff6600;");
  });

  it("should convert token references to CSS var() syntax", () => {
    const tokens = {
      color: {
        primary: {
          $type: "color",
          $value: "#0066cc",
        },
        accent: {
          $type: "color",
          $value: "{color.primary}",
        },
      },
    };

    const result = convertDTCGToCSS(tokens);

    expect(result).toContain("--color-primary: #0066cc;");
    expect(result).toContain("--color-accent: var(--color-primary);");
  });

  it("should skip special $ properties", () => {
    const tokens = {
      color: {
        primary: {
          $type: "color",
          $value: "#0066cc",
          $description: "Primary brand color",
        },
      },
    };

    const result = convertDTCGToCSS(tokens);

    expect(result).not.toContain("$schema");
    expect(result).not.toContain("$description");
    expect(result).toContain("--color-primary: #0066cc;");
  });
});
