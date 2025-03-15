/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converts a string into camelCase
 *
 * @param str - The string to convert to camelCase
 * @returns The camelCase string
 */
const camelCase = str => {
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
};

/**
 * The list of things to generate using plop.
 */
const generators = ['component', 'hook'];

/**
 * The list of workspaces under packages/*.
 */
const workspaces = ['components', 'core', 'utils', 'hooks', 'docs'];

/**
 * The output directories for different generators.
 */
const outputDirs = {
  component: 'components',
  package: 'utils',
  hook: 'hooks',
};

/**
 * Initializes the plop generator.
 *
 * @param plop - The NodePlopAPI instance.
 */
export default function (plop) {
  plop.setHelper('capitalize', text => {
    return capitalize(camelCase(text));
  });

  plop.setHelper('camelCase', text => {
    return camelCase(text);
  });

  generators.forEach(gen => {
    plop.setGenerator(gen, {
      description: `Generates a ${gen}`,
      prompts: [
        {
          type: 'input',
          name: `${gen}Name`,
          message: `Enter ${gen} name:`,

          validate: value => {
            if (!value) {
              return `${gen} name is required`;
            }

            // Check to make sure the case is correct
            if (value !== value.toLowerCase()) {
              return `${gen} name must be in lowercase`;
            }

            // The name can't have spaces
            if (value.includes(' ')) {
              return `${gen} name cannot have any spaces`;
            }

            // If it is a hook, it must start with use
            if (gen === 'hook' && !value.startsWith('use')) {
              return `Hooks must start with 'use'`;
            }

            return true;
          },
        },
        {
          type: 'input',
          name: 'description',
          message: `The description of this ${gen}:`,
        },
        {
          type: 'list',
          name: 'outDir',
          message: `Where should this ${gen} live?`,
          default: outputDirs[gen],
          choices: workspaces,
          validate: value => {
            if (!value) {
              return 'outDir is required';
            }

            return true;
          },
        },
      ],
      actions(answers) {
        const actions = [];

        if (!answers) return actions;

        const { description, outDir } = answers;
        const generatorName = answers[`${gen}Name`] ?? '';

        const data = {
          [`${gen}Name`]: generatorName,
          description,
          outDir,
        };

        actions.push({
          type: 'addMany',
          templateFiles: `plop/${gen}/**`,
          destination: `./packages/{{outDir}}/{{dashCase ${gen}Name}}`,
          base: `plop/${gen}`,
          data,
          abortOnFail: true,
        });

        return actions;
      },
    });
  });
}
