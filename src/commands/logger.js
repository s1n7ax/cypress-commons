/**
 * log data in to the cypress log window
 * WHEN a new object is created, a log messge will be added to cypress
 * data of that log can be changed using the setters
 */
export class Logger {
	constructor() {
		this.cyLogger = Cypress.log();
		this.setConsoleProp(new ConsoleProp());
	}

	getCyLogger() {
		return this.cyLogger;
	}

	setName(name) {
		this.getCyLogger().set('name', name);
		return this;
	}

	setMessage(message) {
		this.getCyLogger().set('messsage', message);
		return this;
	}

	setElements(el) {
		this.getCyLogger().set('$el', el);
		return this;
	}

	setDisplayName(name) {
		this.getCyLogger().set('displayName', name);
		return this;
	}

	setConsoleProp(consoleProp) {
		if (!consoleProp instanceof ConsoleProp)
			throw new Error('consoleProp is not an instance of ConsoleProp');

		this.consoleProp = consoleProp;
		this.getCyLogger().set('consoleProps', this.consoleProp.getCallback());
		return this;
	}

	getConsoleProp() {
		return this.consoleProp;
	}
}

/**
 * ConsoleProps are associated with the Logger it self
 * ConsoleProps represent the data that's being output to the JS console when the log is clicked
 */
export class ConsoleProp {
	constructor() {
		this.props = {};
	}

	addProp(name, value) {
		this.props[name] = value;
		return this;
	}

	addDetails(args, el) {
		this.addProp('Yielded', el.toArray())
			.addProp('Elements', el.length)
			.addProp('Selector', ...args);
	}

	getCallback() {
		return () => {
			return this.props;
		};
	}
}
