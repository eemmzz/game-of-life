'use strict';

const assert = require('assert');
const mocha = require('mocha');
const sinon = require('sinon');

const evolve = require('../src/gameOfLife').evolve;

describe('Game of life', () => {
    describe('evolve:', () => {
        it('Should not have any effect on a grid of dead cells', () => {
            // Given
            const initialState = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];

            // When
            const evolvedState = evolve(initialState);

            // Then
            const expectedState  = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];

            assert.deepEqual(
                evolvedState,
                expectedState,
                'Expected evolved state to contain no live cells'
            );
        });

        it('Should kill a live cell if underpopulated (less than 2 neighbours)', () => {
            // Given
            const initialState = [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0]
            ];

            // When
            const evolvedState = evolve(initialState);

            // Then
            const expectedState  = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];

            assert.deepEqual(
                evolvedState,
                expectedState,
                'Expected live cell to be killed due to underpopulation'
            );
        });
    });
});
