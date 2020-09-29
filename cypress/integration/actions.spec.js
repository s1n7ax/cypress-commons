/// <reference types="cypress" />
/// <reference types="../../index.d.ts">

describe('Custom Commands', () => {
	describe('vget()', () => {
		beforeEach(() => {
			cy.visit('http://127.0.0.1:8080/cypress/views/vget.html');
		});

		it('should yield visible elements', () => {
			cy.get('#container-1').within(() => {
				cy.vget('a').should('have.length', 3);
				cy.vget('a').then((el) => {
					expect(el[0].text).to.be.eq('link-1');
					expect(el[1].text).to.be.eq('link-3');
					expect(el[2].text).to.be.eq('link-5');
				});
			});
		});

		it("shouldn't respect the previous subect", () => {
			cy.get('#container-2')
				.vget('a')
				.should('have.length', 6);
		});
	});

	describe('vcontains()', () => {
		beforeEach(() => {
			cy.visit('http://127.0.0.1:8080/cypress/views/vcontains.html');
		});

		it('should yield only one element', () => {
			cy.vcontains('label').should('have.length', 1);
			cy.vcontains('label text 3').should('have.length', 1);

			// with previous subject
			cy.get('#container-2')
				.vcontains('label')
				.should('have.length', 1);
			cy.get('#container-2')
				.vcontains('label text 9')
				.should('have.length', 1);
		});

		it('should get visible elements only', () => {
			cy.vcontains('label').should('have.text', 'label text 3');

			// with previous subject
			cy.get('#container-2')
				.vcontains('label')
				.should('have.text', 'label text 8');
		});

		it('should get visible matching element when the selector is defiend', () => {
			cy.vcontains('span', 'label')
				.should('have.text', 'label text 5')
				.invoke('prop', 'tagName')
				.should('eq', 'SPAN');

			// with previous subject
			cy.get('#container-2')
				.vcontains('span', 'label')
				.should('have.text', 'label text 10')
				.invoke('prop', 'tagName')
				.should('eq', 'SPAN');
		});
	});

	describe('vcontainsNext()', () => {
		beforeEach(() => {
			cy.visit('http://127.0.0.1:8080/cypress/views/vcontains-next.html');
		});

		it('should yield only one element', () => {
			cy.vcontainsNext('label').should('have.length', 1);
			cy.vcontainsNext('label', 'a').should('have.length', 1);
			cy.vcontainsNext('label', '#link-3').should('have.length', 1);

			// with previous subject
			cy.get('#container-2')
				.vcontainsNext('label')
				.should('have.length', 1);
			cy.get('#container-2')
				.vcontainsNext('label', 'a')
				.should('have.length', 1);
			cy.get('#container-2')
				.vcontainsNext('label', '#link-7')
				.should('have.length', 1);
		});

		it('should get next element to the visible element that contains the text', () => {
			cy.get('#container-3')
				.vcontainsNext('text 1')
				.should('have.id', 'link-13');
		});

		it('should get next sibling when nextSelector is not defined', () => {
			cy.vcontainsNext('label').should('have.id', 'link-1');

			// with previous subject
			cy.get('#container-2')
				.vcontainsNext('label')
				.should('have.id', 'link-5');
		});

		it('should get the sibling that matches nextSelector when defined', () => {
			cy.vcontainsNext('label', '#link-2').should('have.id', 'link-2');

			// with previous subject
			cy.get('#container-2')
				.vcontainsNext('label', '#link-7')
				.should('have.id', 'link-7');
		});
	});

	describe('equal()', () => {
		beforeEach(() => {
			cy.visit('http://127.0.0.1:8080/cypress/views/equal.html');
		});

		it('should match any element that has exact text', () => {
			cy.equal('this is a').should('have.text', 'this is a');
			cy.equal('this').should('have.text', 'this');
		});

		it('should yield element that matches the selector and the exact text', () => {
			cy.equal('div', 'this is a')
				.should('have.text', 'this is a')
				.invoke('prop', 'tagName')
				.should('eq', 'DIV');

			cy.equal('div', 'this')
				.should('have.text', 'this')
				.invoke('prop', 'tagName')
				.should('eq', 'DIV');
		});

		it('should trim the value of the element if the trim is true', () => {
			cy.get('#container-1').within(() => {
				cy.equal('this is a', true).should(
					'have.text',
					'\xa0this is a\xa0'
				);

				cy.equal('div', 'this', true).should(
					'have.text',
					'\xa0this\xa0'
				);
			});
		});
	});

	describe('vequal()', () => {
		beforeEach(() => {
			cy.visit('http://127.0.0.1:8080/cypress/views/vequal.html');
		});

		it('should get visible element that matches the exact text', () => {
			cy.vequal('text').should('have.id', 'link-3');
			cy.vequal('text 1').should('have.id', 'link-2');
			cy.vequal('text 1 2').should('have.id', 'link-1');
		});

		it('should execute on previous subject', () => {
			cy.get('#container-2')
				.vequal('text')
				.should('have.id', 'link-6');
			cy.get('#container-2')
				.vequal('text 1')
				.should('have.id', 'link-5');
			cy.get('#container-2')
				.vequal('text 1 2')
				.should('have.id', 'link-4');
		});

		it('should get visible element that matches the exact text and selector', () => {
			cy.vequal('div', 'text').should('have.id', 'div-3');
			cy.vequal('div', 'text 1').should('have.id', 'div-2');
			cy.vequal('div', 'text 1 2').should('have.id', 'div-1');
		});

		it('should trim before matching the text', () => {
			cy.get('#container-4').within(() => {
				cy.vequal('text', true).should('have.id', 'link-9');
				cy.vequal('text 1', true).should('have.id', 'link-8');
				cy.vequal('text 1 2', true).should('have.id', 'link-7');
			});
		});
	});

	describe('vequalNext()', () => {
		beforeEach(() => {
			cy.visit('http://127.0.0.1:8080/cypress/views/vequal-next.html');
		});

		it('should yield only one element', () => {
			cy.vequalNext('text').should('have.length', 1);
			cy.vequalNext('text', '#link-5').should('have.length', 1);
			cy.vequalNext('text 1', '#link-3').should('have.length', 1);

			// with previous subject
			cy.get('#container-2')
				.vequalNext('text')
				.should('have.length', 1);
			cy.get('#container-2')
				.vequalNext('text', 'a')
				.should('have.length', 1);
			cy.get('#container-2')
				.vequalNext('text', '#link-14')
				.should('have.length', 1);
		});

		it('should get next element to the visible element that equal to the text', () => {
			cy.get('#container-3')
				.vcontainsNext('text 1')
				.should('have.id', 'link-13');
		});

		it('should get next sibling when nextSelector is not defined', () => {
			cy.vequalNext('text').should('have.id', 'link-5');

			// with previous subject
			cy.get('#container-2')
				.vequalNext('text')
				.should('have.id', 'link-13');
		});

		it('should get the sibling that matches nextSelector when defined', () => {
			cy.vequalNext('text', '#link-5').should('have.id', 'link-5');
			cy.vequalNext('text', '#link-6').should('have.id', 'link-6');

			// with previous subject
			cy.get('#container-2')
				.vequalNext('text', '#link-14')
				.should('have.id', 'link-14');
		});
	});
});
