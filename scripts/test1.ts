import { ethers } from "hardhat";

async function main() {
    const pool = await ethers.getContractAt("IUniswapV3Pool", "0xC6962004f452bE9203591991D15f6b388e09E8D0");
    const lp = await ethers.getContractAt("ILP", "0x9A213F53334279C128C37DA962E5472eCD90554f");
    
    console.log(await pool.getAddress());

    console.log(await lp.test());

    const poolAddress = "0xC6962004f452bE9203591991D15f6b388e09E8D0";
    const width = 400;
    const amount0 = 30;
    const amount1 = 4000;

    await lp.provideLiquidity(
      poolAddress,
      width, 
      amount0,
      amount1
    )
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});










// // import { expect } from "chai";
// // import { ethers } from "hardhat";

// // const POOL_ADDRESS = "0xC6962004f452bE9203591991D15f6b388e09E8D0"; // Замените на актуальный адрес пула

// // describe("IUniswapV3Pool Test", function () {
// //   it("Should fetch the sqrtPriceX96", async function () {
// //     // Получаем ABI интерфейса IUniswapV3Pool
// //     const poolAbi = [
// //       "function slot0() external view returns (uint160, int24, uint16, uint16, uint16, uint8, bool)"
// //     ];

// //     // Подключаемся к Pool контракту
// //     const provider = ethers.provider;
// //     const poolContract = new ethers.Contract(POOL_ADDRESS, poolAbi, provider);

// //     // Вызов функции slot0
// //     const [sqrtPriceX96] = await poolContract.slot0();

// //     // Простой тест, чтобы убедиться, что мы получили значение
// //     expect(sqrtPriceX96).to.be.a('bigint');
// //     console.log("SqrtPriceX96:", sqrtPriceX96.toString());

// //     // Добавьте сюда дополнительные проверки в соответствии с вашими ожиданиями
// //   });
// // });

// import { ethers } from "hardhat";
// const hre = require("hardhat");

// // Адрес контракта пула
// const POOL_ADDRESS = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";

// // Точный ABI контракта
// const POOL_ABI = [
//   // Правильная сигнатура, проверенная и соответствующая контракту
//   "function getReserves() view returns (uint112, uint112, uint32)"
// ];

// async function main() {
//   // Использование провайдера для подключения к правильной сети
//   const provider = hre.ethers.getDefaultProvider(); 
//   const [signer] = await ethers.getSigners();

//   // Создание объекта контракта для взаимодействия
//   const poolContract = new ethers.Contract(POOL_ADDRESS, POOL_ABI, signer);

//   // Вызов функции из контракта
//   try {
//     const reserves = await poolContract.getReserves();
//     console.log(`Reserves: `, reserves);
//   } catch (error) {
//     console.error("Ошибка при вызове функции контракта:", error);
//   }
// }

// // Запуск скрипта и обработка ошибок
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
