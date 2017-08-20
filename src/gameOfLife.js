'use strict';

const DEAD = 0;
const LIVE = 1;
const UNDER_POPULATION_THRESHOLD = 2;
const OVER_POPULATION_THRESHOLD = 3;
const LIFE_CREATION_VALUE = 3;

function getLiveNeighbourCount(grid, x, y) {
    let liveNeighbourCount = 0;

    liveNeighbourCount += (grid[x - 1] || [])[y - 1] || 0; // top left
    liveNeighbourCount += (grid[x - 1] || [])[y + 1] || 0; // bottom left
    liveNeighbourCount += grid[x][y - 1] || 0; // above
    liveNeighbourCount += grid[x][y + 1] || 0; // below
    liveNeighbourCount += (grid[x + 1] || [])[y - 1] || 0; // top right
    liveNeighbourCount += (grid[x + 1] || [])[y + 1] || 0; // bottom right
    liveNeighbourCount += (grid[x - 1] || [])[y] || 0; // left of
    liveNeighbourCount += (grid[x + 1] || [])[y] || 0; // right of

    return liveNeighbourCount;
}

module.exports = {
    evolve: function(currentState) {
        const newState = currentState.map(function(row) {
            return row.slice();
        });

        for (let x = 0; x < currentState.length; x++) {
            for (let y = 0; y < currentState[x].length; y++) {
                const numberOfLiveNeighbours = getLiveNeighbourCount(currentState, x, y);

                if (currentState[x][y] === DEAD) {
                    if (numberOfLiveNeighbours === LIFE_CREATION_VALUE) {
                        newState[x][y] = LIVE;
                    }
                } else {
                    if (numberOfLiveNeighbours < UNDER_POPULATION_THRESHOLD) {
                        newState[x][y] = DEAD;
                    } else if (numberOfLiveNeighbours > OVER_POPULATION_THRESHOLD) {
                        newState[x][y] = DEAD;
                    }
                }
            }
        }

        return newState;
    }
}
