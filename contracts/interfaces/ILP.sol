// SPDX-License-Identifier: GPL-2.0-or-later

interface ILP {
    function provideLiquidity(
        address poolAdress,
        uint64 width,
        uint64 amount0,
        uint64 amount1
    ) external payable; 

    function test() external pure returns (uint256 num);
}