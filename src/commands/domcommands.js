/// <reference types="cypress" />
/// <reference path="../../index.d.ts" />

export const vGet = (...args) => {
	cy.get(...args).filter(':visible', {log: false})
}




export const vContains = (...args) => {
	cy.contains(...args).filter(':visible', {log: false})
}

export const vDo = (...args) => {

}
