/**
 * FunctionParams can be used to interpret the parameters that's being passed to the commands
 * WHEN parameters have different patters, this class can validate/identify certain patterns and provide the param as named params
 *
 */
export default class FunctionParams {
	constructor() {
		this.rules = [];
	}

	static init() {
		return new FunctionParams();
	}

	addParamRule(param) {
		if (!Array.isArray(param))
			throw new Error(
				'parameter should be type: [{name: string, type: string}]'
			);

		// validation
		param.forEach((ele) => {
			if (!ele.name && !ele.type)
				throw new Error(
					'parameter should be type: [{name: string, type: string}]'
				);
		});

		this.rules.push(param);
		return this;
	}

	/**
	 * passed parameters will be sent through the rules and findout the named parameters by the given rules
	 * named parameters will be returned as an object
	 * IF non of the rules mached the passed parameters, resolve will return undefined
	 * IF undefined is returned, you probably want to throw an error from the original function
	 *
	 * @param { Array<any> } all the parameters of the function that should be resolved
	 * @returns { object } named parameters will be returned when matching rule is found
	 * @returns { undefined } parameters doesn't match any of the rules
	 */
	resolve(param) {
		if (!Array.isArray(param))
			throw new Error('parameters should be type an Array<any>');

		// go through all the rules
		for (let rule of this.rules) {
			// IF the parameter length is different it's not the correct rule
			if (rule.length !== param.length) continue;

			// IF any of the types is not matching, it's not the one we are looking. continue to the next loop
			if (
				!rule.every((record, index) => {
					// array type check
					if (record.type === 'array')
						return Array.isArray(param[index]);

					// other types check
					return typeof param[index] === record.type;
				})
			)
				continue;

			// found matching rule
			/*
			 * @TODO - i don't rememer why I put order property
			 * put a comment why the order of the parameters should be passed back
			 */
			const resolved = {
				order: [],
			};

			rule.forEach((ele, index) => {
				resolved[ele.name] = param[index];
				resolved.order.push(ele.name);
			});

			return resolved;
		}
	}

	getHelpText() {
		return 'Syntax:\n' + this.toString();
	}

	toString() {
		let str = '';

		this.rules.forEach((rule) => {
			rule.forEach(({ name, type }, index) => {
				str += `${name} { ${type} }`;

				if (index < rule.length - 1) {
					str += ', ';
				}
			});

			str += '\n';
		});

		return str;
	}
}
