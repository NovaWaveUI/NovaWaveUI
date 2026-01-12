# dtcg2css

The `dtcg2css` tool is a command-line utility / library for converting DTCG (Design Token Community Group) standard files into CSS variables.

## DTCG

DTCG is a newly stable standard for design tokens, which are a way to store design-related information (like colors, typography, spacing, etc.) in a structured format. DTCG files are JSON files that follow a specific schema defined by the DTCG specification. They can be used to define design tokens in a way that is consistent and reusable across different platforms and tools.

### Specification

The specification can be found at [https://www.designtokens.org/tr/2025.10/](https://www.designtokens.org/tr/2025.10/).

## Usage

To use `dtcg2css`, you can run it from the command line, providing the path to your DTCG JSON file and the output path for the generated CSS file. For example:

```bash
dtcg2css input.json output.css
```
