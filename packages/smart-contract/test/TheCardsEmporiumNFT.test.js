const { BigNumber, ZeroAddress } = require('ethers');
const { expect } = require('chai');

describe("TheCardsEmporium", function () {
  let [deployer, firstAccount, secondAccount, fakeOwner] = []
  let theCardsEmporiumNFTContract;

  it('retrieve deployed contracts', async () => {
    [deployer, firstAccount, secondAccount, fakeOwner] = await ethers.getSigners();
    const TheCardsEmporiumNFT = await ethers.getContractFactory("TheCardsEmporiumNFT")
    theCardsEmporiumNFTContract = await TheCardsEmporiumNFT.deploy();
    expect(theCardsEmporiumNFTContract.runner.address).to.be.not.equal(ZeroAddress);
    expect(theCardsEmporiumNFTContract.runner.address).to.match(/0x[0-9a-fA-F]{40}/);
    console.log("Watchain deployed to:", theCardsEmporiumNFTContract.runner.address);
  })

  describe('minting', function () {
    it('users can NOT mint tokens', async function () {
      await expect(theCardsEmporiumNFTContract.connect(firstAccount).mint(firstAccount.address, "https://")).to.be.revertedWithCustomError(theCardsEmporiumNFTContract, 'OwnableUnauthorizedAccount');
    })

    it('creator can mint 1 token for other account', async function () {
      expect(await theCardsEmporiumNFTContract.connect(deployer).mint(firstAccount.address, "https://"))
        .to.emit(theCardsEmporiumNFTContract, "TransferSingle").withArgs(deployer.address, ZeroAddress, firstAccount.address, "https://");
    });

    it('other2 can transfer their tokens', async function () {
      await theCardsEmporiumNFTContract.connect(firstAccount).safeTransferFrom(firstAccount.address, secondAccount.address, 0);

      expect(await theCardsEmporiumNFTContract.balanceOf(firstAccount.address)).to.equal(0);
      expect(await theCardsEmporiumNFTContract.balanceOf(secondAccount.address)).to.equal(1);
    })

    it('deployer can burn the token', async function () {
      await theCardsEmporiumNFTContract.connect(deployer).burn(0);

      expect(await theCardsEmporiumNFTContract.balanceOf(secondAccount.address)).to.equal(0);
      expect(await theCardsEmporiumNFTContract.balanceOf(firstAccount.address)).to.equal(0);
      expect(await theCardsEmporiumNFTContract.balanceOf(deployer.address)).to.equal(0);
    })
  })
});
