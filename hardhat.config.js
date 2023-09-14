require("@nomicfoundation/hardhat-toolbox");
// import { HardhatUserConfig, task } from 'hardhat/config'
const { HardhatUserConfig, task } = require("hardhat/config");
// import '@nomicfoundation/hardhat-toolbox'
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

// import '@nomiclabs/hardhat-web3'
// import '@nomiclabs/hardhat-ethers'

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.19",
// };

// dotenv.config()
require("dotenv").config();

const commonConfig = {
  gas: 5_000_000,
  accounts: {
    mnemonic: process.env.MNEMONIC || ''
  }
}

// const config: HardhatUserConfig = {
const config = {
  solidity: '0.8.16',
  networks: {
    localhost: {
      gas: 1_400_000
    },
    baobab: {
      url: 'https://api.baobab.klaytn.net:8651',
      ...commonConfig,
      gasPrice: 250_000_000_000
    },
    cypress: {
      url: 'https://public-en-cypress.klaytn.net',
      ...commonConfig,
      gasPrice: 250_000_000_000
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      // gasPrice: 250_000_000_000,
      // accounts: [`0x${process.env.PRIVATE_KEY}`],
      accounts: [process.env.PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.SEPOLIA_API_KEY,
      // gasPrice: 250_000_000_000,
      // accounts: [`0x${process.env.PRIVATE_KEY}`],
      accounts: [process.env.PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
      gasLimit: 5000000,
    },
  },
}

task('address', 'Convert mnemonic to address')
  .addParam('mnemonic', "The account's mnemonic")
  .setAction(async (taskArgs, hre) => {
    const something = hre.ethers.Wallet.fromMnemonic(taskArgs.mnemonic)
    console.log(something.address)
  })

task('balance', "Prints an account's balance")
  .addParam('account', "The account's address")
  .setAction(async (taskArgs, hre) => {
    const account = hre.web3.utils.toChecksumAddress(taskArgs.account)
    const balance = await hre.web3.eth.getBalance(account)
    console.log(hre.web3.utils.fromWei(balance, 'ether'), 'KLAY')
  })

task('deploy', 'Deploy SBT')
  .addParam('name', 'SBT name')
  .addParam('symbol', 'SBT symbol')
  .addParam('baseUri', 'URI (must end with /) that will be used as prefix when returning tokenURI')
  .setAction(async (args, hre) => {
    const sbtContract = await hre.ethers.getContractFactory('SBT')
    const sbt = await sbtContract.deploy(args.name, args.symbol, args.baseUri)
    await sbt.deployed()
    console.log(
      `SBT was deployed to ${hre.network.name} network and can be interacted with at address ${sbt.address}`
    )
  })

task('mint', 'Mint SBT')
  .addParam('address', 'Address of deployed SBT')
  .addParam('to', 'Address receiving SBT token')
  .addParam('tokenId', 'ID of SBT token that is being minted')
  .setAction(async (args, hre) => {
    const sbt = await hre.ethers.getContractAt('Certification', args.address)
    const [owner] = await hre.ethers.getSigners()
    const tx = await (await sbt.safeMint(args.to, args.tokenId)).wait()
    console.log(tx)
    console.log(`SBT with tokenId ${args.tokenId} was minted for address ${args.to}`)
  })

// export default config
module.exports = config
