/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject = any> {
		//****************************************************************************//
		//                                    VGET                                    //
		//****************************************************************************//

		/**
		 * get one or more visible DOM elements by node name: input, button, etc.
		 * @see https://on.cypress.io/get
		 * @example
		 *    cy.vget('input').should('be.disabled')
		 *    cy.vget('button').should('be.visible')
		 */
		vget<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;
		/**
		 * get one or more visible DOM elements by selector.
		 * The querying behavior of this command matches exactly how $(…) works in jQuery.
		 * @see https://on.cypress.io/get
		 * @example
		 *    cy.vget('.list>li')    // Yield the <li>'s in <.list>
		 *    cy.vget('ul li:first').should('have.class', 'active')
		 *    cy.vget('.dropdown-menu').click()
		 */
		vget<E extends Node = HTMLElement>(
			selector: string,
			options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
		): Chainable<JQuery<E>>;
		/**
		 * get one or more visible DOM elements by alias.
		 * @see https://on.cypress.io/get#Alias
		 * @example
		 *    // vget the aliased ‘todos’ elements
		 *    cy.vget('ul#todos').as('todos')
		 *    //...hack hack hack...
		 *    //later retrieve the todos
		 *    cy.vget('@todos')
		 */
		vget<S = any>(
			alias: string,
			options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
		): Chainable<S>;

		//****************************************************************************//
		//                                  VCONTAINS                                 //
		//****************************************************************************//

		/**
		 * Get the visible DOM element containing the text.
		 * DOM elements can contain more than the desired text and still match.
		 * Additionally, Cypress prefers some DOM elements over the deepest element found.
		 *
		 * @see https://on.cypress.io/vcontains
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vcontains('About')
		 *    // Yield first el in document containing 'Hello'
		 *    cy.vcontains('Hello')
		 *    // you can use regular expression
		 *    cy.vcontains(/^b\w+/)
		 *    // yields <ul>...</ul>
		 *    cy.vcontains('ul', 'apples')
		 *    // tries to find the given text for up to 1 second
		 *    cy.vcontains('my text to find', {timeout: 1000})
		 */
		vcontains(
			content: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<Subject>;

		/**
		 * Get the visible child DOM element that contains given text.
		 *
		 * @see https://on.cypress.io/vcontains
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vcontains('About')
		 */
		vcontains<E extends Node = HTMLElement>(
			content: string | number | RegExp
		): Chainable<JQuery<E>>;

		/**
		 * Get the visible DOM element with name "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/vcontains
		 * @example
		 *    // yields <ul>...</ul>
		 *    cy.vcontains('ul', 'apples')
		 */
		vcontains<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			text: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

		/**
		 * Get the visible DOM element using CSS "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/vcontains
		 * @example
		 *    // yields <... class="foo">... apples ...</...>
		 *    cy.vcontains('.foo', 'apples')
		 */
		vcontains<E extends Node = HTMLElement>(
			selector: string,
			text: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<E>>;

		//****************************************************************************//
		//                               VCONTAINS NEXT                               //
		//****************************************************************************//

		/**
		 * Get the next element to the visible DOM element containing the text.
		 * DOM elements can contain more than the desired text and still match.
		 * Additionally, Cypress prefers some DOM elements over the deepest element found.
		 *
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vcontainsNext('About')
		 *    // Yield first el in document containing 'Hello'
		 *    cy.vcontainsNext('Hello')
		 *    // you can use regular expression
		 *    cy.vcontainsNext(/^b\w+/)
		 *    // yields <ul>...</ul>
		 *    cy.vcontainsNext('ul', 'apples')
		 *    // tries to find the given text for up to 1 second
		 *    cy.vcontainsNext('my text to find', {timeout: 1000})
		 */
		vcontainsNext(
			content: string | number | RegExp,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<Subject>;

		/**
		 * Get the visible child DOM element that contains given text.
		 *
		 * @see https://on.cypress.io/vcontainsNext
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vcontainsNext('About')
		 */
		vcontainsNext<E extends Node = HTMLElement>(
			content: string | number | RegExp
		): Chainable<JQuery<E>>;

		/**
		 * Get the visible DOM element with name "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/vcontainsNext
		 * @example
		 *    // yields <ul>...</ul>
		 *    cy.vcontainsNext('ul', 'apples')
		 */
		vcontainsNext<K extends keyof HTMLElementTagNameMap>(
			text: string | number | RegExp,
			nextSelector: K,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

		/**
		 * Get the visible DOM element using CSS "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/vcontainsNext
		 * @example
		 *    // yields <... class="foo">... apples ...</...>
		 *    cy.vcontainsNext('.foo', 'apples')
		 */
		vcontainsNext<E extends Node = HTMLElement>(
			text: string | number | RegExp,
			nextSelector: string,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<E>>;

		//****************************************************************************//
		//                                    EQUAL                                   //
		//****************************************************************************//

		/**
		 * Get the DOM element containing the exact text.
		 * DOM elements can contain more than the desired text and still match.
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
			content: string | number,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<Subject>;

		/**
		 * Get the child DOM element that is equal to given text.
		 *
		 * @see https://on.cypress.io/equal
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').equal('About')
		 */
		equal<E extends Node = HTMLElement>(
			content: string | number
		): Chainable<JQuery<E>>;

		/**
		 * Get the DOM element with name "selector" containing the text
		 *
		 * @see https://on.cypress.io/equal
		 * @example
		 *    // yields <ul>...</ul>
		 *    cy.equal('ul', 'apples')
		 */
		equal<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			text: string | number,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

		/**
		 * Get the DOM element using CSS "selector" containing the text
		 *
		 * @see https://on.cypress.io/equal
		 * @example
		 *    // yields <... class="foo">... apples ...</...>
		 *    cy.equal('.foo', 'apples')
		 */
		equal<E extends Node = HTMLElement>(
			selector: string,
			text: string | number,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<E>>;

		//****************************************************************************//
		//                                   VEQUAL                                   //
		//****************************************************************************//

		/**
		 * Get the visible DOM element containing the exact text.
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
			content: string | number,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<Subject>;

		/**
		 * Get the visible child DOM element that is vequal to given text.
		 *
		 * @see https://on.cypress.io/vequal
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vequal('About')
		 */
		vequal<E extends Node = HTMLElement>(
			content: string | number
		): Chainable<JQuery<E>>;

		/**
		 * Get the visible DOM element with name "selector" containing the text
		 *
		 * @see https://on.cypress.io/vequal
		 * @example
		 *    // yields <ul>...</ul>
		 *    cy.vequal('ul', 'apples')
		 */
		vequal<K extends keyof HTMLElementTagNameMap>(
			selector: K,
			text: string | number,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

		/**
		 * Get the visible DOM element using CSS "selector" containing the text
		 *
		 * @see https://on.cypress.io/vequal
		 * @example
		 *    // yields <... class="foo">... apples ...</...>
		 *    cy.vequal('.foo', 'apples')
		 */
		vequal<E extends Node = HTMLElement>(
			selector: string,
			text: string | number,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<E>>;

		//****************************************************************************//
		//                                 VEQUAL NEXT                                //
		//****************************************************************************//

		/**
		 * Get the next element to the visible DOM element containing the text.
		 * DOM elements can contain more than the desired text and still match.
		 * Additionally, Cypress prefers some DOM elements over the deepest element found.
		 *
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vequalNext('About')
		 *    // Yield first el in document containing 'Hello'
		 *    cy.vequalNext('Hello')
		 *    // you can use regular expression
		 *    cy.vequalNext(/^b\w+/)
		 *    // yields <ul>...</ul>
		 *    cy.vequalNext('ul', 'apples')
		 *    // tries to find the given text for up to 1 second
		 *    cy.vequalNext('my text to find', {timeout: 1000})
		 */
		vequalNext(
			content: string | number,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<Subject>;

		/**
		 * Get the visible child DOM element that contains given text.
		 *
		 * @see https://on.cypress.io/vequalNext
		 * @example
		 *    // Yield el in .nav containing 'About'
		 *    cy.get('.nav').vequalNext('About')
		 */
		vequalNext<E extends Node = HTMLElement>(
			content: string | number
		): Chainable<JQuery<E>>;

		/**
		 * Get the visible DOM element with name "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/vequalNext
		 * @example
		 *    // yields <ul>...</ul>
		 *    cy.vequalNext('ul', 'apples')
		 */
		vequalNext<K extends keyof HTMLElementTagNameMap>(
			text: string | number,
			nextSelector: K,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

		/**
		 * Get the visible DOM element using CSS "selector" containing the text or regular expression.
		 *
		 * @see https://on.cypress.io/vequalNext
		 * @example
		 *    // yields <... class="foo">... apples ...</...>
		 *    cy.vequalNext('.foo', 'apples')
		 */
		vequalNext<E extends Node = HTMLElement>(
			text: string | number,
			nextSelector: string,
			options?: Partial<Loggable & Timeoutable & CaseMatchable>
		): Chainable<JQuery<E>>;
	}
}
