'use strict';

const assert = require('assert');
const mocha = require('mocha');

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

        it('Should kill a live cell if overpopulated (more than 3 neighbours)', () => {
            // Given
            const initialState = [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 1]
            ];

            // When
            const evolvedState = evolve(initialState);

            // Then
            const expectedState  = [
                [0, 1, 1],
                [1, 0, 0],
                [0, 1, 1]
            ];

            assert.deepEqual(
                evolvedState,
                expectedState,
                'Expected middle cell to be killed due to overpopulation'
            );
        });

        it('Should let the cell survive if it has exactly 2 neighbours', () => {
            // Given
            const initialState = [
                [0, 0, 0],
                [0, 0, 1],
                [0, 1, 1]
            ];

            // When
            const evolvedState = evolve(initialState);

            // Then
            const expectedState  = [
                [0, 0, 0],
                [0, 1, 1],
                [0, 1, 1]
            ];

            assert.deepEqual(
                evolvedState,
                expectedState,
                'Expected all cells to survive'
            );
        });

        it('Should let the cell survive if it has exactly 3 neighbours', () => {
            // Given
            const initialState = [
                [0, 1, 1],
                [0, 1, 1],
                [0, 0, 0]
            ];

            // When
            const evolvedState = evolve(initialState);

            // Then
            const expectedState  = [
                [0, 1, 1],
                [0, 1, 1],
                [0, 0, 0]
            ];

            assert.deepEqual(
                evolvedState,
                expectedState,
                'Expected all cells to survive'
            );
        });

        it('Should revive a dead cell if it has exactly 3 neighbours', () => {
            // Given
            const initialState = [
                [0, 1, 0],
                [1, 1, 0],
                [0, 0, 0]
            ];

            // When
            const evolvedState = evolve(initialState);

            // Then
            const expectedState  = [
                [1, 1, 0],
                [1, 1, 0],
                [0, 0, 0]
            ];

            assert.deepEqual(
                evolvedState,
                expectedState,
                'Expected a fourth cell to be set to alive'
            );
        });

        it('Should spin 3 vertical live cells to be horizontal (blinker)', () => {
            // Given
            const initialState = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];

            // When
            const evolvedState = evolve(initialState);

            // Then
            const expectedState  = [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ];

            assert.deepEqual(
                evolvedState,
                expectedState,
                'Expected spinner to rotate to be horizontal'
            );
        });

        it('Should spin 3 vertical live cells to be horizontal and back (blinker)', () => {
            // Given
            const initialState = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];

            // When
            const firstEvolvedState = evolve(initialState);
            const secondEvolvedState = evolve(firstEvolvedState)

            // Then
            const expectedState  = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];

            assert.deepEqual(
                secondEvolvedState,
                expectedState,
                'Expected spinner to rotate to be horizontal then vertical'
            );
        });

        it('Should oscillate between beacon pattern on 6x6 grid', () => {
            // Given
            const initialState = [
                [0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0],
                [0, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0]
            ];

            // When
            const firstEvolvedState = evolve(initialState);
            const secondEvolvedState = evolve(firstEvolvedState)

            // Then
            const expectedFirstState  = [
                [0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0],
                [0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0],
                [0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0]
            ];

            assert.deepEqual(
                firstEvolvedState,
                expectedFirstState,
                'Expected beacon pattern to oscillate on 6x6'
            );

            const expectedSecondState  = [
                [0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0],
                [0, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0]
            ];

            assert.deepEqual(
                secondEvolvedState,
                expectedSecondState,
                'Expected beacon pattern to oscillate on 6x6'
            );
        });

        it('Should handle more complex grid and larger grid size', () => {
            // Given
            const initialState = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 1, 1, 1, 0]
            ];

            // When
            const evolvedState = evolve(initialState);

            // Then
            const expectedState  = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 1, 0]
            ];

            assert.deepEqual(
                evolvedState,
                expectedState,
                `Expected state to be ${expectedState}`
            );
        });

        it('Should handle still life on larger 6x5 grid (beehive)', () => {
            // Given
            const initialState = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 0],
                [0, 1, 0, 0, 1, 0],
                [0, 0, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ];

            // When
            const evolvedState = evolve(initialState);

            // Then
            const expectedState  = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 0],
                [0, 1, 0, 0, 1, 0],
                [0, 0, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ];

            assert.deepEqual(
                evolvedState,
                expectedState,
                `Expected state to be ${expectedState}`
            );
        });

        it('Should handle still life scenario on smaller grid', () => {
            // Given
            const initialState = [
                [1, 1],
                [1, 1]
            ];

            // When
            const evolvedState = evolve(initialState);

            // Then
            const expectedState  = [
                [1, 1],
                [1, 1]
            ];

            assert.deepEqual(
                evolvedState,
                expectedState,
                'Expected life to remain still on 2x2 grid'
            );
        });
    });
});
