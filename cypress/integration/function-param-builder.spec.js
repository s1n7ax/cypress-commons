/// <reference types="cypress" />

import FunctionParams from '../../src/commands/function-params';

describe('function parameter builder', () => {
	let fpb = new FunctionParams();
	fpb.addParamRule([
		{
			name: 'content',
			type: 'string',
		},
	])
		.addParamRule([
			{ name: 'content', type: 'string' },
			{ name: 'options', type: 'object' },
		])
		.addParamRule([
			{
				name: 'selector',
				type: 'string',
			},
			{
				name: 'content',
				type: 'string',
			},
		])
		.addParamRule([
			{ name: 'selector', type: 'string' },
			{ name: 'content', type: 'string' },
			{ name: 'options', type: 'object' },
		]);

	it('should resolve parameters correctly', () => {
		let result;
		let keys;

		// contains(content)
		result = fpb.resolve(['hello']);
		keys = Object.keys(result);

		expect(keys).to.have.deep.eq(['order', 'content']);
		expect(result).to.have.property('content', 'hello');
		expect(result).to.have.deep.property('order', ['content']);

		// contains(content, options)
		result = fpb.resolve(['hello', { timeout: 1000 }]);
		keys = Object.keys(result);

		expect(keys).to.have.deep.eq(['order', 'content', 'options']);
		expect(result).to.have.property('content', 'hello');
		expect(result).to.have.deep.property('options', { timeout: 1000 });
		expect(result).to.have.deep.property('order', ['content', 'options']);

		// contains(selector, content)
		result = fpb.resolve(['input', 'hello']);
		keys = Object.keys(result);

		expect(keys).to.have.deep.eq(['order', 'selector', 'content']);
		expect(result).to.have.property('selector', 'input');
		expect(result).to.have.property('content', 'hello');
		expect(result).to.have.deep.property('order', ['selector', 'content']);

		// contains(selector, content, options)
		result = fpb.resolve(['input', 'hello', { log: false }]);
		keys = Object.keys(result);

		expect(keys).to.have.deep.eq([
			'order',
			'selector',
			'content',
			'options',
		]);
		expect(result).to.have.property('selector', 'input');
		expect(result).to.have.property('content', 'hello');
		expect(result).to.have.deep.property('options', { log: false });
		expect(result).to.have.deep.property('order', [
			'selector',
			'content',
			'options',
		]);
	});

	it('should return undefined when no rules are matched', () => {
		let result;

		result = fpb.resolve(['test', 'test', 'test']);
		expect(result).to.be.eq(undefined);

		result = fpb.resolve([{ log: false }]);
		expect(result).to.be.eq(undefined);

		result = fpb.resolve([{ log: false }, 'test']);
		expect(result).to.be.eq(undefined);
	});

	it('should return the help text', () => {
		const helpText = fpb.getHelpText();
		const expectedHelpText = `Syntax:
		content { string }
		content { string }, options { object }
		selector { string }, content { string }
		selector { string }, content { string }, options { object }
		`.replaceAll('\t', '');

		expect(helpText).to.be.eq(expectedHelpText);
	});

	it('should support all the types', () => {
		const fpb = FunctionParams.init()
			.addParamRule([{ name: 'function', type: 'function' }])
			.addParamRule([{ name: 'array', type: 'array' }])
			.addParamRule([{ name: 'object', type: 'object' }])
			.addParamRule([{ name: 'string', type: 'string' }])
			.addParamRule([{ name: 'number', type: 'number' }])
			.addParamRule([{ name: 'boolean', type: 'boolean' }]);

		const expected = [
			{ function: () => {} },
			{ array: [1, 2, 3] },
			{ object: { name: 'Srinesh' } },
			{ string: 'string' },
			{ number: 123 },
			{ boolean: true },
		];

		for (let item of expected) {
			const key = Object.keys(item)[0];
			const value = item[key];

			const prop = fpb.resolve([value]);
			const keys = Object.keys(prop);

			console.log(item);
			expect(keys).to.be.deep.eq(['order', key]);
			expect(prop).to.have.property(key, value);
		}
	});
});
