import { Logger } from './logger';

/**
 * common methods thats being reused throughout commands
 */
export default class Common {
	static getLogger(logger) {
		return logger ?? new Logger();
	}

	static getPrevSubejectWrap(prevSubject, { logger }) {
		const log = this.getLogger(logger);

		if (prevSubject)
			return cy
				.wrap(prevSubject)

				.then((el) => {
					log.setElements(el);
				});

		return cy.document({ log: false }).its('body', { log: false });
	}

	static getVisibleElements(prevSubject, { logger }) {
		const log = this.getLogger(logger);

		if (prevSubject)
			return cy
				.wrap(prevSubject, { log: false })
				.then((el) => {
					log.setElements(el);
				})
				.find(':visible');

		return cy.get(':visible', { log: false }).then((el) => {
			log.setElements(el);
		});
	}

	static escapeRegExp(string) {
		return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
	}

	/* returns the :visible selector of the user defined selector
	 *
	 * some commands have certain behaviours. for example,
	 * cy.contains() prefer some evements over the deepest matching element
	 * so, cy.get().filter(':visible').eq(1) won't give you the same result
	 * in order to get the visible contains text element, :visible is appended to existing selector
	 *
	 * IF selector is not defined by the user :visible will be added
	 * IF selector is defined but :visible selector is not defined, :visisble will be appended
	 */
	static getVisibleSelector(selector) {
		if (!selector) {
			selector = ':visible';
		} else if (!~selector.indexOf(':visible')) {
			selector += ':visible';
		}

		return selector;
	}

	static syntaxValidation(commandName, rule, param, args) {
		if (!param) {
			let error = `Invalid sytax passed to ${commandName}\n`;
			error += 'Actual: ';

			for (let arg of args) {
				error += `${String(arg)} { ${typeof arg} } | `;
			}

			error += '\n';
			error += `${rule.getHelpText()}`;

			throw new Error(error);
		}
	}
}
