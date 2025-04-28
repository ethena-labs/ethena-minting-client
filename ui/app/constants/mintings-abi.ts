export const MINTING-ABI=[
  {
    "name": "name",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0x06fdde03",
    "signature": "name()",
    "stateMutability": "view"
  },
  {
    "name": "approve",
    "type": "function",
    "inputs": [
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0x095ea7b3",
    "signature": "approve(address,uint256)",
    "stateMutability": "nonpayable"
  },
  {
    "name": "totalSupply",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0x18160ddd",
    "signature": "totalSupply()",
    "stateMutability": "view"
  },
  {
    "name": "transferFrom",
    "type": "function",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0x23b872dd",
    "signature": "transferFrom(address,address,uint256)",
    "stateMutability": "nonpayable"
  },
  {
    "name": "decimals",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0x313ce567",
    "signature": "decimals()",
    "stateMutability": "view"
  },
  {
    "name": "initialSupply",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0x378dc3dc",
    "signature": "initialSupply()",
    "stateMutability": "view"
  },
  {
    "name": "updatePrice",
    "type": "function",
    "inputs": [
      {
        "name": "orderId",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "newAmountForOrder",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "payable": null,
    "constant": null,
    "selector": "0x5f704f3e",
    "signature": "updatePrice(bytes32,uint256)",
    "stateMutability": "nonpayable"
  },
  {
    "name": "usdPrice",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0x6619aa86",
    "signature": "usdPrice()",
    "stateMutability": "view"
  },
  {
    "name": "balanceOf",
    "type": "function",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0x70a08231",
    "signature": "balanceOf(address)",
    "stateMutability": "view"
  },
  {
    "name": "printMoney",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "payable": false,
    "constant": false,
    "selector": "0x94655f2b",
    "signature": "printMoney()",
    "stateMutability": "nonpayable"
  },
  {
    "name": "symbol",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0x95d89b41",
    "signature": "symbol()",
    "stateMutability": "view"
  },
  {
    "name": "centralBank",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "constant": true,
    "selector": "0x9a4a0fb2",
    "signature": "centralBank()",
    "stateMutability": "view"
  },
  {
    "name": "transfer",
    "type": "function",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0xa9059cbb",
    "signature": "transfer(address,uint256)",
    "stateMutability": "nonpayable"
  },
  {
    "name": "isOracle",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0xa97e5c93",
    "signature": "isOracle(address)",
    "stateMutability": "view"
  },
  {
    "name": "oracles",
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0xaddd5099",
    "signature": "oracles(address)",
    "stateMutability": "view"
  },
  {
    "name": "inflation",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "payable": null,
    "constant": null,
    "selector": "0xbe0522e0",
    "signature": "inflation()",
    "stateMutability": "nonpayable"
  },
  {
    "name": "allowance",
    "type": "function",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "spender",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "payable": null,
    "constant": null,
    "selector": "0xdd62ed3e",
    "signature": "allowance(address,address)",
    "stateMutability": "view"
  }
]
