// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// task('deploy', 'Deploy SBT')
//   .addParam('name', 'SBT name')
//   .addParam('symbol', 'SBT symbol')
//   .addParam('baseUri', 'URI (must end with /) that will be used as prefix when returning tokenURI')
//   .setAction(async (args, hre) => {
//     const sbtContract = await hre.ethers.getContractFactory('SBT')
//     const sbt = await sbtContract.deploy(args.name, args.symbol, args.baseUri)
//     await sbt.deployed()
//     console.log(
//       `SBT was deployed to ${hre.network.name} network and can be interacted with at address ${sbt.address}`
//     )
//   })

// async (args, hre) => {
//   const sbtContract = await hre.ethers.getContractFactory('SBT')
//   const sbt = await sbtContract.deploy(args.name, args.symbol, args.baseUri)
//   await sbt.deployed()
//   console.log(
//     `SBT was deployed to ${hre.network.name} network and can be interacted with at address ${sbt.address}`
//   )
// }

async function main() {
  // console.log("test");
  // async (hre) => {
    // console.log("test2");
    const sbtContract = await hre.ethers.getContractFactory('Certification')
    // console.log(sbtContract);
    const sbt = await sbtContract.deploy()
    // const sbt = await sbtContract.deploy("Certification", "Cert", "http://localhost/")
    console.log(sbt);
    // const sbt = await sbtContract.deploy(args.name, args.symbol, args.baseUri)
    await sbt.deployed()
    console.log(
      `SBT was deployed to ${hre.network.name} network and can be interacted with at address ${sbt.address}`
    )
  // };
  // task('deploy', 'Deploy SBT')
  // // .addParam('name', 'SBT name')
  // // .addParam('symbol', 'SBT symbol')
  // // .addParam('baseUri', 'URI (must end with /) that will be used as prefix when returning tokenURI')
  // .setAction(async (args, hre) => {
  //   const sbtContract = await hre.ethers.getContractFactory('SBT')
  //   const sbt = await sbtContract.deploy("Certification", "Cert", "http://localhost/")
  // await sbt.deployed()
  //   console.log(
  //     `SBT was deployed to ${hre.network.name} network and can be interacted with at address ${sbt.address}`
  //   )
  // })

  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = hre.ethers.parseEther("0.001");

  // const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
  //   value: lockedAmount,
  // });

  // await lock.waitForDeployment();

  // console.log(
  //   `Lock with ${ethers.formatEther(
  //     lockedAmount
  //   )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
