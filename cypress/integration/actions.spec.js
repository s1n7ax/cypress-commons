/// <reference types="cypress" />

context('Actions', () => {
	it('should only get visible element', () => {
		cy.visit('https://www.google.com')
		cy.vDo('abc', [])
	});
})


