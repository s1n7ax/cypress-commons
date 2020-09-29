import FunctionParams from './function-params';

/**
 * implements all the commands in a reusable way
 * complete logic of all the commands are implemented under command helper
 * reason behind this is, some commands can be reused when creating other commands
 * BUT some parameters like logger has nothing to do with the original command
 * due to this, all the command implementation is written under CommandHelper
 * AND command callback is defined separately
 */
export default {
	Cypress: {
		get: FunctionParams.init()
			.addParamRule([{ name: 'selector', type: 'string' }])
			.addParamRule([{ name: 'alias', type: 'string' }])
			.addParamRule([
				{ name: 'selector', type: 'string' },
				{ name: 'options', type: 'object' },
			])
			.addParamRule([
				{ name: 'alias', type: 'string' },
				{ name: 'options', type: 'object' },
			]),

		contains: FunctionParams.init()
			.addParamRule([{ name: 'text', type: 'string' }])
			.addParamRule([
				{ name: 'text', type: 'string' },
				{ name: 'options', type: 'object' },
			])
			.addParamRule([
				{ name: 'selector', type: 'string' },
				{ name: 'text', type: 'string' },
			])
			.addParamRule([
				{ name: 'selector', type: 'string' },
				{ name: 'text', type: 'string' },
				{ name: 'options', type: 'object' },
			]),
	},

	CypressCommons: {
		vcontainsNext: FunctionParams.init()
			.addParamRule([{ name: 'text', type: 'string' }])
			.addParamRule([
				{ name: 'text', type: 'string' },
				{ name: 'nextSelector', type: 'string' },
			])
			.addParamRule([
				{ name: 'text', type: 'string' },
				{ name: 'options', type: 'object' },
			])
			.addParamRule([
				{ name: 'text', type: 'string' },
				{ name: 'nextSelector', type: 'string' },
				{ name: 'options', type: 'object' },
			]),

		equal: FunctionParams.init()
			.addParamRule([{ name: 'text', type: 'string' }])
			.addParamRule([
				{ name: 'text', type: 'string' },
				{ name: 'trim', type: 'boolean' },
			])
			.addParamRule([
				{ name: 'selector', type: 'string' },
				{ name: 'text', type: 'string' },
			])
			.addParamRule([
				{ name: 'text', type: 'string' },
				{ name: 'options', type: 'object' },
			])
			.addParamRule([
				{ name: 'selector', type: 'string' },
				{ name: 'text', type: 'string' },
				{ name: 'trim', type: 'boolean' },
			])
			.addParamRule([
				{ name: 'selector', type: 'string' },
				{ name: 'text', type: 'string' },
				{ name: 'options', type: 'object' },
			])
			.addParamRule([
				{ name: 'text', type: 'string' },
				{ name: 'trim', type: 'boolean' },
				{ name: 'options', type: 'object' },
			])
			.addParamRule([
				{ name: 'selector', type: 'string' },
				{ name: 'text', type: 'string' },
				{ name: 'trim', type: 'boolean' },
				{ name: 'options', type: 'object' },
			]),
	},
};
