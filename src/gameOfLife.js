'use strict';

const DEAD = 0;
const LIVE = 1;
const UNDER_POPULATION_THRESHOLD = 2;

function getLiveNeighbourCount(grid, x, y) {
    let liveNeighbourCount = 0;

    liveNeighbourCount += grid[x - 1][y - 1]; // top left
    liveNeighbourCount += grid[x - 1][y + 1]; // bottom left
    liveNeighbourCount += grid[x][y - 1]; // above
    liveNeighbourCount += grid[x][y + 1]; // below
    liveNeighbourCount += grid[x + 1][y - 1]; // top right
    liveNeighbourCount += grid[x + 1][y + 1]; // bottom right
    liveNeighbourCount += grid[x - 1][y]; // left of
    liveNeighbourCount += grid[x + 1][y]; // right of

    console.log('count!', liveNeighbourCount);
    return liveNeighbourCount;
}

module.exports = {
    evolve: function(currentState) {
        const newState = currentState.map(function(row) {
            return row.slice();
        });

        for (let x = 0; x < newState.length; x++) {
            for (let y = 0; y < newState[x].length; y++) {
                if (newState[x][y] === DEAD) {
                    continue;
                }

                const numberOfLiveNeighbours = getLiveNeighbourCount(newState, x, y);

                if (numberOfLiveNeighbours < UNDER_POPULATION_THRESHOLD) {
                    newState[x][y] = DEAD;
                }
            }
        }

        return newState;
    }
}
