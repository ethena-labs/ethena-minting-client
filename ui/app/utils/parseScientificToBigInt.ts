export function parseScientificToBigInt(sciStr: string) {
  let [coeff, exp]: (string | bigint)[] = sciStr.toLowerCase().split("e");
  const decimalIndex = coeff.indexOf(".");

  if (decimalIndex !== -1) {
    const decimalPlaces = coeff.length - 1 - decimalIndex;
    coeff = coeff.replace(".", "");
    exp = BigInt(exp) - BigInt(decimalPlaces);
  }

  return BigInt(coeff) * BigInt(10) ** BigInt(exp);
}

export const parseScientificOrNonScientificToBigInt = (input: string) => {
  return input.includes("e") ? parseScientificToBigInt(input) : BigInt(input);
};
