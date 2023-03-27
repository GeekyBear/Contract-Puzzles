const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const x = ethers.provider.getSigner(0);
    const y = ethers.provider.getSigner(1);
    const addressX = await x.getAddress();
    const addressY = await y.getAddress();

    return { game, x, y, addressX, addressY };
  }
  it('should be a winner', async function () {
    const { game, x, y, addressX, addressY } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(x).write(addressY);
    await game.connect(y).write(addressX);

    await game.win(addressY);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
