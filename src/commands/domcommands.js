/// <reference types="cypress" />
/// <reference path="../../index.d.ts" />

import ParamRules from './param-rules';
import Common from './common';

export class CommandHelper {
	static vget({ logger }, ...args) {
		// parameter validation
		const rule = ParamRules.Cypress.get;
		const param = rule.resolve(args);

		Common.syntaxValidation('vget', rule, param, args);

		const log = Common.getLogger(logger);
		return cy
			.get(...args, { log: false })
			.filter(':visible', { log: false })
			.then((el) => {
				log.setElements(el);
				log.getConsoleProp().addDetails(args, el);
			});
	}

	static vcontains({ logger }, prevSubject, ...args) {
		// parameter validation
		const rule = ParamRules.Cypress.contains;
		const param = rule.resolve(args);

		Common.syntaxValidation('vcontains', rule, param, args);

		const log = Common.getLogger(logger);
		let { selector, text, options = {} } = param;

		selector = Common.getVisibleSelector(selector);

		// get the previous subject if there is one
		const wrapper = Common.getPrevSubejectWrap(prevSubject, {
			logger: log,
		});

		return wrapper
			.contains(selector, text, { log: false, ...options })
			.then((el) => {
				log.setElements(el);
				log.getConsoleProp().addDetails(args, el);
			});
	}

	static vcontainsNext = ({ logger }, prevSubject, ...args) => {
		// parameter validation
		const rule = ParamRules.CypressCommons.vcontainsNext;
		const param = rule.resolve(args);

		Common.syntaxValidation('vcontainsNext', rule, param, args);

		let { subject, text, options, nextSelector } = param;
		const log = Common.getLogger(logger);

		/*
		 * construct arguments for vcontains
		 * because parameters are different from vcontainsNext,
		 * relevant params for vcontains has to be constructed and passed
		 */
		const cArg = [];
		subject && cArg.push(subject);
		cArg.push(text);
		options && cArg.push(options);

		return CommandHelper.vcontains({ logger: log }, prevSubject, ...cArg)
			.nextAll(nextSelector, { log: false })
			.eq(0, { log: false });
	};

	static equal({ logger }, prevSubject, ...args) {
		// parameter validation
		const rule = ParamRules.CypressCommons.equal;
		const param = rule.resolve(args);

		Common.syntaxValidation('equal', rule, param, args);

		const log = Common.getLogger(logger);
		let { selector, text, trim = false, options = {} } = param;

		text = Common.escapeRegExp(text);

		const regex = trim
			? new RegExp(`^\\s*${text}\\s*$`)
			: new RegExp(`^${text}$`);

		return cy
			.wrap(prevSubject, { log: false })
			.contains(selector, regex, { log: false })
			.then((el) => {
				log.setElements(el);
				log.getConsoleProp().addDetails(args, el);
			});
	}

	static vequal({ logger }, prevSubject, ...args) {
		// parameter validation
		const rule = ParamRules.CypressCommons.equal;
		const param = rule.resolve(args);

		Common.syntaxValidation('vequal', rule, param, args);

		const log = Common.getLogger(logger);

		let { selector, text, trim = false, options = {} } = param;

		selector = Common.getVisibleSelector(selector);

		return CommandHelper.equal(
			{ logger: log },
			prevSubject,
			selector,
			text,
			trim,
			options
		);
	}

	static vequalNext({ logger }, prevSubject, ...args) {
		// parameter validation
		const rule = ParamRules.CypressCommons.vcontainsNext;
		const param = rule.resolve(args);

		if (!param) {
			const error = `Invalid sytax passed\n${rule.getHelpText()}`;
			throw new Error(error);
		}

		const log = Common.getLogger(logger);
		let { text, nextSelector, options = {} } = param;

		return this.vequal({ logger: log }, prevSubject, text, options)
			.nextAll(nextSelector, { log: false })
			.eq(0, { log: false })
			.then((el) => {
				log.setElements(el);
				log.getConsoleProp().addDetails(args, el);
			});
	}
}

/*
 * commands
 */
export const vget = (prevSubject, ...args) => {
	return CommandHelper.vget({}, prevSubject, ...args);
};

export const vcontains = (prevSubject, ...args) => {
	CommandHelper.vcontains({}, prevSubject, ...args);
};

export const vcontainsNext = (prevSubject, ...args) => {
	CommandHelper.vcontainsNext({}, prevSubject, ...args);
};

export const equal = (prevSubject, ...args) => {
	CommandHelper.equal({}, prevSubject, ...args);
};

export const vequal = (prevSubject, ...args) => {
	CommandHelper.vequal({}, prevSubject, ...args);
};

export const vequalNext = (prevSubject, ...args) => {
	CommandHelper.vequalNext({}, prevSubject, ...args);
};

/*
 * adding commands to runtime
 */
const ignorePrevSub = [vget];
const optionalPrevSub = [vcontains, vcontainsNext, equal, vequal, vequalNext];

ignorePrevSub.forEach((func) => {
	Cypress.Commands.add(func.name, { prevSubject: false }, func);
});

optionalPrevSub.forEach((func) => {
	Cypress.Commands.add(func.name, { prevSubject: 'optional' }, func);
});
