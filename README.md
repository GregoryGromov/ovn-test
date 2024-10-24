# OVN Test task

Недостаток реализации: из-за округления шаг ширины равняется примерно 200. Поэтому при небольших значения ширины границы рассчитываются некорректно. 

В данный момент в методе  контракте LP.sol происходит только расчет границ. Чтобы осуществить перевод необходимо раскомментировать код: 

```shell
token0.transferFrom(msg.sender, address(this), amount0);
token1.transferFrom(msg.sender, address(this), amount1);

token0.approve(address(nfpManager), amount0);
token1.approve(address(nfpManager), amount1);

nfpManager.mint(
  INonfungiblePositionManager.MintParams(
    address(token0),
    address(token1),
    pool.fee(),
    pATick,
    pBTick,
    amount0,
    amount1,
    0,
    0,
    msg.sender,
    block.timestamp
  )
);
```
