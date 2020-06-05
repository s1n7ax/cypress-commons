/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		/**
		 * Get one or more visible DOM elements by node name: input, button, etc.
		 * @see https://on.cypress.io/get
		 * @example
		 *    cy.vGet('input').should('be.disabled')
		 *    cy.vGet('button').should('be.visible')
		 */
		vGet<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			options?: Partial<Loggable & Timeoutable & Withinable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

		/**
		 * Get one or more visible DOM elements by selector.
		 * The querying behavior of this command matches exactly how $(…) works in jQuery.
		 * @see https://on.cypress.io/get
		 * @example
		 *    cy.get('.list>li')    // Yield the <li>'s in <.list>
		 *    cy.get('ul li:first').should('have.class', 'active')
		 *    cy.get('.dropdown-menu').click()
		 */
		vGet<E extends Node = HTMLElement>(
			selector: string,
			options?: Partial<Loggable & Timeoutable & Withinable>
		): Chainable<JQuery<E>>;

		/**
		 * Get one or more visible DOM elements by alias.
		 * @see https://on.cypress.io/get#Alias
		 * @example
		 *    // Get the aliased ‘todos’ elements
		 *    cy.get('ul#todos').as('todos')
		 *    //...hack hack hack...
		 *    //later retrieve the todos
		 *    cy.get('@todos')
		 */
		vGet<S = any>(
			alias: string,
			options?: Partial<Loggable & Timeoutable & Withinable>
		): Chainable<S>;

		/**
		 * Get the visible DOM element containing the text.
		 * DOM elements can contain more than the desired text and still match.
		 * Additionally, Cypress prefers some DOM elements over the deepest element found.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vContains('About')
		 *    // Yield first el in document containing 'Hello'
		 *    cy.vContains('Hello')
		 *    // you can use regular expression
		 *    cy.vContains(/^b\w+/)
		 *    // yields <ul>...</ul>
		 *    cy.vContains('ul', 'apples')
		 *    // tries to find the given text for up to 1 second
		 *    cy.vContains('my text to find', {timeout: 1000})
		 */
		vContains(
			content: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<Subject>;

		/**
		 * Get the visible child DOM element that contains given text.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vContains('About')
		 */
		vContains<E extends Node = HTMLElement>(
			content: string | number | RegExp
		): Chainable<JQuery<E>>;

		/**
		 * Get the visible DOM element with name "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    // yields <ul>...</ul>
		 *    cy.vContains('ul', 'apples')
		 */
		vContains<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			text: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

		/**
		 * Get the visible DOM element using CSS "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    // yields <... class="foo">... apples ...</...>
		 *    cy.contains('.foo', 'apples')
		 */
		vContains<E extends Node = HTMLElement>(
			selector: string,
			text: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<E>>;
	}
}
