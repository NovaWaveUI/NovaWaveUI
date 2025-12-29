/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converts a string into camelCase
 *
 * @param str - The string to convert to camelCase
 * @returns The camelCase string
 */
const camelCase = (str) => {
	return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
};

/**
 * The list of items that can be generated.
 */
const generators = [
	'headlessComponent',
	'component',
	'lib',
	'reactLib',
	'hook',
];

/**
 * The list of files under packages/*
 */
const packages = ['headless', 'ui', 'core', 'utils', 'hooks'];

/**
 *
 * @param {import('plop').NodePlopAPI} plop - The plop instance
 */
export default function (plop) {
	plop.setHelper('capitalize', (text) => {
		return capitalize(camelCase(text));
	});
	plop.setHelper('camelCase', (text) => {
		return camelCase(text);
	});
	plop.setHelper('kebabCase', (text) => {
		return text
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.replace(/[\s_]+/g, '-')
			.toLowerCase();
	});

	generators.forEach((gen) => {
		plop.setGenerator(gen, {
			description: `Generate a ${gen
				.replace(/([A-Z])/g, ' $1')
				.toLowerCase()}`,
			prompts: [
				{
					type: 'input',
					name: `${gen}Name`,
					message: `What is the name of the ${gen
						.replace(/([A-Z])/g, ' $1')
						.toLowerCase()}?`,
					validate: (value) => {
						if (!value) {
							return `${gen} name is required`;
						}

						// Check to make sure there are no spaces
						if (/\s/.test(value)) {
							return `${gen} name cannot contain spaces`;
						}

						// Check to make sure that the passed name is in camelCase
						if (!/^[a-z][a-zA-Z0-9]*$/.test(value)) {
							return `${gen} name must be in camelCase (e.g. my${capitalize(
								gen.replace('-', '')
							)})`;
						}

						// If it is a hook, make sure it starts with "use"
						if (gen === 'hook' && !value.startsWith('use')) {
							return `Hook name must start with "use" (e.g. useMyHook)`;
						}

						return true;
					},
				},
				{
					type: 'input',
					name: 'description',
					message: `The description of the ${gen
						.replace(/([A-Z])/g, ' $1')
						.toLowerCase()} (for package.json)`,
				},
				{
					type: 'list',
					name: 'outDir',
					message: 'Which package should this be created in?',
					choices: packages,
					validate: (value) => {
						if (!value) {
							return 'You must select a package';
						}
						return true;
					},
				},
			],
			actions(answers) {
				const actions = [];

				if (!answers) return actions;

				const { description, outDir } = answers;
				const generatorName = answers[`${gen}Name`];

				const data = {
					[`${gen}Name`]: generatorName,
					description,
					outDir,
				};

				actions.push({
					type: 'addMany',
					templateFiles: `plop/${gen}/**`,
					destination: `./packages/{{outDir}}/{{kebabCase ${gen}Name}}`,
					base: `plop/${gen}`,
					data,
					abortOnFail: true,
				});
				return actions;
			},
		});
	});
}
