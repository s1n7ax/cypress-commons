/// <reference types="cypress" />

import * as DOMCommands from './src/commands/domcommands'

Cypress.Commands.add('vGet', DOMCommands.vGet);
