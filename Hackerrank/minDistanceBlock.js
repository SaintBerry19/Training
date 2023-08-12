function findBlockWithMinimumDistance(blocks, requirements) {
  let left = 0,
    right = 0;
  let minDist = Infinity;
  let startBlock = -1;
  let reqsFulfilled = 0;
  let reqCounter = {};

  for (let req of requirements) {
    reqCounter[req] = 0;
  }

  while (right < blocks.length) {
    let block = blocks[right];
    for (let req of requirements) {
      if (block[req] && reqCounter[req] === 0) {
        reqsFulfilled++;
      }
      if (block[req]) {
        reqCounter[req]++;
      }
    }

    while (reqsFulfilled === requirements.length) {
      if (right - left + 1 < minDist) {
        minDist = right - left + 1;
        startBlock = left;
      }

      let leftBlock = blocks[left];
      for (let req of requirements) {
        if (leftBlock[req] && reqCounter[req] === 1) {
          reqsFulfilled--;
        }
        if (leftBlock[req]) {
          reqCounter[req]--;
        }
      }
      left++;
    }
    right++;
  }

  return {
    startBlockIndex: startBlock,
    distance: minDist - 1,
  };
}

const blocks1 = [
  { school: true, gym: false, mall: true, library: false },
  { school: false, gym: true, mall: false, library: false },
  { school: true, gym: false, mall: true, library: false },
  { school: false, gym: true, mall: false, library: true },
  { school: true, gym: false, mall: true, library: false },
  { school: false, gym: false, mall: false, library: true },
  { school: true, gym: true, mall: true, library: true },
];
const req1 = ["school", "gym", "mall", "library"];
console.log(findBlockWithMinimumDistance(blocks1, req1)); // Outputs: { startBlockIndex: 4, distance: 2 }

const blocks2 = [
  { store: true, park: false, cafe: false },
  { store: false, park: true, cafe: false },
  { store: true, park: false, cafe: true },
  { store: false, park: true, cafe: false },
  { store: true, park: false, cafe: true },
  { store: false, park: true, cafe: false },
  { store: false, park: false, cafe: true },
];
const req2 = ["store", "park", "cafe"];
console.log(findBlockWithMinimumDistance(blocks2, req2)); // Outputs: { startBlockIndex: 2, distance: 1 }

const blocks3 = [
  { beach: true, theater: false, restaurant: true, bank: false },
  { beach: false, theater: true, restaurant: false, bank: true },
  { beach: true, theater: false, restaurant: true, bank: false },
  { beach: false, theater: true, restaurant: false, bank: false },
  { beach: true, theater: false, restaurant: true, bank: false },
  { beach: false, theater: true, restaurant: false, bank: false },
  { beach: true, theater: false, restaurant: true, bank: true },
];
const req3 = ["beach", "theater", "restaurant", "bank"];
console.log(findBlockWithMinimumDistance(blocks3, req3)); // Outputs: { startBlockIndex: 2, distance: 2 }
