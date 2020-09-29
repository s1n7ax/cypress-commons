/// <reference types="cypress" />

export declare module Cypress {
	interface Chainable {
		//****************************************************************************//
		//                                    VGET                                    //
		//****************************************************************************//

		/**
		 * Get one or more visible DOM elements by node name: input, button, etc.
		 * @see https://on.cypress.io/get
		 * @example
		 *    cy.vget('input').should('be.disabled')
		 *    cy.vget('button').should('be.visible')
		 */
		vget<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			options?: Partial<Loggable & Timeoutable & Withinable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

		/**
		 * Get one or more visible DOM elements by selector.
		 * The querying behavior of this command matches exactly how $(…) works in jQuery.
		 * @see https://on.cypress.io/get
		 * @example
		 *    cy.vget('.list>li')    // Yield the <li>'s in <.list>
		 *    cy.vget('ul li:first').should('have.class', 'active')
		 *    cy.vget('.dropdown-menu').click()
		 */
		vget<E extends Node = HTMLElement>(
			selector: string,
			options?: Partial<Loggable & Timeoutable & Withinable>
		): Chainable<JQuery<E>>;

		/**
		 * Get one or more visible DOM elements by alias.
		 * @see https://on.cypress.io/get#Alias
		 * @example
		 *    // Get the aliased ‘todos’ elements
		 *    cy.vget('ul#todos').as('todos')
		 *    //...hack hack hack...
		 *    //later retrieve the todos
		 *    cy.vget('@todos')
		 */
		vget<S = any>(
			alias: string,
			options?: Partial<Loggable & Timeoutable & Withinable>
		): Chainable<S>;
		/**
		 * Get the next element to the visible DOM element using CSS "selector" containing the text or regular expression.
		 */
		vcontainsNext<E extends Node = HTMLElement>(
			selector: string,
			text: string | number | RegExp,
			nextSelector: string,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<E>>;

		/**
		 * Get the visible DOM element containing the text.
		 * DOM elements can contain more than the desired text and still match.
		 * Additionally, Cypress prefers some DOM elements over the deepest element found.
		 */
		vcontains(
			content: string | number,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<Subject>;

		/**
		 * Get the visible child DOM element that contains given text.
		 */
		vcontains<E extends Node = HTMLElement>(
			content: string | number
		): Chainable<JQuery<E>>;

		/**
		 * Get the visible DOM element with name "selector" containing the text or regular expression.
		 */
		vcontains<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			text: string | number,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;
		/**
		 * Get the next element to the visible DOM element containing the text.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    cy.get('.nav').vcontainsNext('About', 'button')
		 *    cy.vcontainsNext('Hello', 'label')
		 *    cy.vcontainsNext(/^b\w+/, 'input')
		 *    cy.vcontainsNext('ul', 'apples', 'a')
		 *    cy.vcontainsNext('my text to find', 'label', {timeout: 1000})
		 */
		vcontainsNext(
			content: string | number | RegExp,
			nextSelector: string,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<Subject>;

		/**
		 * Get the next element to the visible child DOM element that contains given text.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vcontainsNext('About', 'button')
		 */
		vcontainsNext<E extends Node = HTMLElement>(
			content: string | number | RegExp,
			nextSelector: string
		): Chainable<JQuery<E>>;

		/**
		 * Get the next element to the visible DOM element with name "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    cy.vcontainsNext('ul', 'apples', 'input')
		 */
		vcontainsNext<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			text: string | number | RegExp,
			nextSelector: string,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

		/**
		 * Get the next element to the visible DOM element using CSS "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    cy.vcontainsNext('.foo', 'apples', 'input:visible')
		 */
		vcontainsNext<E extends Node = HTMLElement>(
			selector: string,
			text: string | number | RegExp,
			nextSelector: string,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<E>>;

		/**
		 * Get the DOM element containing the exact text.
		 * Additionally, Cypress prefers some DOM elements over the deepest element found.
		 *
		 * @see https://on.cypress.io/equal
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').equal('About')
		 *    // Yield first el in document containing 'Hello'
		 *    cy.equal('Hello')
		 *    // you can use regular expression
		 *    cy.equal(/^b\w+/)
		 *    // yields <ul>...</ul>
		 *    cy.equal('ul', 'apples')
		 *    // tries to find the given text for up to 1 second
		 *    cy.equal('my text to find', {timeout: 1000})
		 */
		equal(
			content: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<Subject>;

		/**
		 * Get the child DOM element that equal given text.
		 *
		 * @see https://on.cypress.io/equal
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').equal('About')
		 */
		equal<E extends Node = HTMLElement>(
			content: string | number | RegExp
		): Chainable<JQuery<E>>;

		/**
		 * Get the DOM element with name "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/equal
		 * @example
		 *    // yields <ul>...</ul>
		 *    cy.equal('ul', 'apples')
		 */
		equal<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			text: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

		/**
		 * Get the DOM element using CSS "selector" containing the exact text or regular expression.
		 *
		 * @see https://on.cypress.io/equal
		 * @example
		 *    // yields <... class="foo">... apples ...</...>
		 *    cy.equal('.foo', 'apples')
		 */
		equal<E extends Node = HTMLElement>(
			selector: string,
			text: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<E>>;

		/**
		 * Get the visible DOM element containing the text.
		 * DOM elements can contain more than the desired text and still match.
		 * Additionally, Cypress prefers some DOM elements over the deepest element found.
		 *
		 * @see https://on.cypress.io/vequal
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vequal('About')
		 *    // Yield first el in document containing 'Hello'
		 *    cy.vequal('Hello')
		 *    // you can use regular expression
		 *    cy.vequal(/^b\w+/)
		 *    // yields <ul>...</ul>
		 *    cy.vequal('ul', 'apples')
		 *    // tries to find the given text for up to 1 second
		 *    cy.vequal('my text to find', {timeout: 1000})
		 */
		vequal(
			content: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<Subject>;
		/**
		 * Get the visible child DOM element that vequal given text.
		 *
		 * @see https://on.cypress.io/vequal
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vequal('About')
		 */
		vequal<E extends Node = HTMLElement>(
			content: string | number | RegExp
		): Chainable<JQuery<E>>;

		/**
		 * Get the visible DOM element with name "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/vequal
		 * @example
		 *    // yields <ul>...</ul>
		 *    cy.vequal('ul', 'apples')
		 */
		vequal<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			text: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;
		/**
		 * Get the visible DOM element using CSS "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/vequal
		 * @example
		 *    // yields <... class="foo">... apples ...</...>
		 *    cy.vequal('.foo', 'apples')
		 */
		vequal<E extends Node = HTMLElement>(
			selector: string,
			text: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<E>>;

		/**
		 * Get the next element to the visible DOM element using CSS "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    cy.vequalNext('.foo', 'apples')
		 */
		vequalNext<E extends Node = HTMLElement>(
			selector: string,
			text: string | number | RegExp,
			nextSelector: string,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<E>>;

		/**
		 * Get the next element to the visible DOM element containing the text.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    cy.get('.nav').vequalNext('About', 'button')
		 *    cy.vequalNext('Hello', 'label')
		 *    cy.vequalNext(/^b\w+/, 'input')
		 *    cy.vequalNext('ul', 'apples', 'a')
		 *    cy.vequalNext('my text to find', 'label', {timeout: 1000})
		 */
		vequalNext(
			content: string | number | RegExp,
			nextSelector: string,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<Subject>;

		/**
		 * Get the next element to the visible child DOM element that contains given text.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vequalNext('About', 'button')
		 */
		vequalNext<E extends Node = HTMLElement>(
			content: string | number | RegExp,
			nextSelector: string
		): Chainable<JQuery<E>>;

		/**
		 * Get the next element to the visible DOM element with name "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/contains
		 * @example
		 *    cy.vequalNext('ul', 'apples', 'input')
		 */
		vequalNext<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			text: string | number | RegExp,
			nextSelector: string,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;
	}
}
