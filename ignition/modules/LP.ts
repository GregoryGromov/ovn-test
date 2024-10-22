// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const npmAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

const LPM = buildModule("LP33", (m) => {
  const LP = m.contract("LP", [npmAddress]);

  return { LP };
});

export default LPM;