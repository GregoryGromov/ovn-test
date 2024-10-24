import { ethers } from "ethers";
import { expect } from "chai";

const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const contractAddress = "0x50f9CA3275E26cC1a89DaF0ce7f4942F3dDA9f61";
const abi = [
  "function provideLiquidity(address poolAdress, uint64 width, uint64 amount0, uint64 amount1) public view returns (uint160, uint256, uint160, uint160, int24, int24)"
];

const contract = new ethers.Contract(contractAddress, abi, provider);

const uniswapPoolAddress = "0xC6962004f452bE9203591991D15f6b388e09E8D0";

export async function getRealWidth(width: number, amount0: number, amount1: number) {
    try {
      const [sqrtPrice, price, sqrtPA, sqrtPB, pATick, pBTick, tick] = await contract.provideLiquidity(uniswapPoolAddress, width, amount0, amount1);
      const pB = sqrtPB * sqrtPB;
      const pA = sqrtPA * sqrtPA;
  
      const realWidth = (Number(pB) - Number(pA)) * 10000 / (Number(pB) + Number(pA));
  
      return realWidth ;
    } catch (error) {
      console.error("Ошибка при вызове функции getRealWidth:", error);
      throw error; 
    }
  }

  export async function getBordersSqrt(width: number, amount0: number, amount1: number) {
    try {
      const [sqrtPrice, price, sqrtPA, sqrtPB, pATick, pBTick, tick] = await contract.provideLiquidity(uniswapPoolAddress, width, amount0, amount1);  
      return {sqrtPA, sqrtPB, sqrtPrice} ;
    } catch (error) {
      console.error("Ошибка при вызове функции getBordersSqrt:", error);
      throw error; 
    }
  }
  
  export async function getTicks(width: number, amount0: number, amount1: number) {
    try {
      const [sqrtPrice, price, sqrtPA, sqrtPB, pATick, pBTick, tick] = await contract.provideLiquidity(uniswapPoolAddress, width, amount0, amount1);  
      return {pATick, pBTick, tick};
    } catch (error) {
      console.error("Ошибка при вызове функции getTicks:", error);
      throw error; 
    }
  }


// 1. Sqrt borders test 
describe("Sqrt from borders test 1", function () {
  it("Should sqrt_lowerPrice <= sqrt_price <= sqrt_upperPrice", async function () {     
    const expectedWidth = 3200;
    const amount0 = 300;
    const amount1 = 4000;

    const {sqrtPA, sqrtPB, sqrtPrice} = await getBordersSqrt(expectedWidth, amount0, amount1);

    console.log(`     sqrtPA: ${sqrtPA}`);
    console.log(`     sqrtPB: ${sqrtPB}`);
    console.log(`     sqrtPrice: ${sqrtPrice}`);
    
    expect(sqrtPA).to.be.at.most(sqrtPrice);
    expect(sqrtPrice).to.be.at.most(sqrtPB);
  });
});


// 2. Ticks tests
describe("Ticks test 1", function () {
  it("Should tick_lowerPrice  <= tick_upperPrice", async function () {     
    const expectedWidth = 3200;
    const amount0 = 300;
    const amount1 = 4000;

    const {pATick, pBTick, tick} = await getTicks(expectedWidth, amount0, amount1);

    console.log(`     pATick: ${pATick}`);
    console.log(`     tick: ${tick}`);
    console.log(`     pBTick: ${pBTick}`);
    
    expect(pATick).to.be.at.most(pBTick);
    // expect(tick).to.be.at.most(pBTick);
  });
});


// 3. Width test
describe("Width testing 1", function () {
    it("The actual width should be approximately equal to the specified one", async function () {     
      const expectedWidth = 3200
      const amount0 = 300
      const amount1 = 4000

      const realWidth = await getRealWidth(expectedWidth, amount0, amount1);
  
      const difference = Math.abs(expectedWidth - realWidth);
      console.log(`     Expected width: ${expectedWidth}`)
      console.log(`     Real width: ${realWidth}`)
      console.log(`     Difference: ${difference}`);
      
      expect(difference).to.be.lessThanOrEqual(100);
    });
});

describe("Width testing 2", function () {
    it("The actual width should be approximately equal to the specified one", async function () {     
      const expectedWidth = 800
      const amount0 = 90
      const amount1 = 600

      const realWidth = await getRealWidth(expectedWidth, amount0, amount1);
  
      const difference = Math.abs(expectedWidth - realWidth);
      console.log(`     Expected width: ${expectedWidth}`)
      console.log(`     Real width: ${realWidth}`)
      console.log(`     Difference: ${difference}`);
      
      expect(difference).to.be.lessThanOrEqual(100);
    });
});

describe("Width testing 3", function () {
    it("The actual width should be approximately equal to the specified one", async function () {     
      const expectedWidth = 450
      const amount0 = 90
      const amount1 = 90

      const realWidth = await getRealWidth(expectedWidth, amount0, amount1);
  
      const difference = Math.abs(expectedWidth - realWidth);
      console.log(`     Expected width: ${expectedWidth}`)
      console.log(`     Real width: ${realWidth}`)
      console.log(`     Difference: ${difference}`);
      
      expect(difference).to.be.lessThanOrEqual(100);
    });
});

describe("Width testing 4", function () {
    it("The actual width should be approximately equal to the specified one", async function () {     
      const expectedWidth = 450
      const amount0 = 9
      const amount1 = 9000

      const realWidth = await getRealWidth(expectedWidth, amount0, amount1);
  
      const difference = Math.abs(expectedWidth - realWidth);
      console.log(`     Expected width: ${expectedWidth}`)
      console.log(`     Real width: ${realWidth}`)
      console.log(`     Difference: ${difference}`);
      
      expect(difference).to.be.lessThanOrEqual(100);
    });
});

describe("Width testing 5", function () {
    it("The actual width should be approximately equal to the specified one", async function () {     
      const expectedWidth = 450
      const amount0 = 9000
      const amount1 = 9

      const realWidth = await getRealWidth(expectedWidth, amount0, amount1);
  
      const difference = Math.abs(expectedWidth - realWidth);
      console.log(`     Expected width: ${expectedWidth}`)
      console.log(`     Real width: ${realWidth}`)
      console.log(`     Difference: ${difference}`);
      
      expect(difference).to.be.lessThanOrEqual(100);
    });
});

describe("Width testing 6", function () {
  it("The actual width should be approximately equal to the specified one", async function () {     
    const expectedWidth = 1200
    const amount0 = 10
    const amount1 = 0

    const realWidth = await getRealWidth(expectedWidth, amount0, amount1);

    const difference = Math.abs(expectedWidth - realWidth);
    console.log(`     Expected width: ${expectedWidth}`)
    console.log(`     Real width: ${realWidth}`)
    console.log(`     Difference: ${difference}`);
    
    expect(difference).to.be.lessThanOrEqual(100);
  });
});

describe("Width testing 7", function () {
  it("The actual width should be approximately equal to the specified one", async function () {     
    const expectedWidth = 2600
    const amount0 = 10
    const amount1 = 0

    const realWidth = await getRealWidth(expectedWidth, amount0, amount1);

    const difference = Math.abs(expectedWidth - realWidth);
    console.log(`     Expected width: ${expectedWidth}`)
    console.log(`     Real width: ${realWidth}`)
    console.log(`     Difference: ${difference}`);
    
    expect(difference).to.be.lessThanOrEqual(100);
  });
});


// 4. Incorrect input data test
describe("provideLiquidity revert test", function () {
  it("Should revert when width is 0", async function () {     
    const width = 0; // Incorrect
    const amount0 = 300;
    const amount1 = 4000;

    await expect(contract.provideLiquidity(uniswapPoolAddress, width, amount0, amount1))
      .to.be.revertedWith("Invalid width: the value must be greater than zero.");
  });

  it("Should revert when width is 10000", async function () {     
    const width = 10000; // Incorrect
    const amount0 = 300;
    const amount1 = 4000;

    await expect(contract.provideLiquidity(uniswapPoolAddress, width, amount0, amount1))
      .to.be.revertedWith("Invalid width: the value must not be 10,000.");
  });

  it("Should revert when both amount0 and amount1 are 0", async function () {     
    const width = 3200;
    // Incorrect:
    const amount0 = 0; 
    const amount1 = 0; 

    await expect(contract.provideLiquidity(uniswapPoolAddress, width, amount0, amount1))
      .to.be.revertedWith("Invalid amounts: both amount1 and amount2 must not be zeros.");
  });
});

