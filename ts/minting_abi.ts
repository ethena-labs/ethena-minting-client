export const ETHENA_MINTING_ABI = [
  {
    inputs: [
      {
        internalType: "contract IUSDe",
        name: "_usde",
        type: "address",
      },
      {
        internalType: "contract IWETH9",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_assets",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "enum IEthenaMinting.TokenType",
            name: "tokenType",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "uint128",
            name: "maxMintPerBlock",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "maxRedeemPerBlock",
            type: "uint128",
          },
        ],
        internalType: "struct IEthenaMinting.TokenConfig[]",
        name: "_tokenConfig",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "globalMaxMintPerBlock",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "globalMaxRedeemPerBlock",
            type: "uint128",
          },
        ],
        internalType: "struct IEthenaMinting.GlobalConfig",
        name: "_globalConfig",
        type: "tuple",
      },
      {
        internalType: "address[]",
        name: "_custodians",
        type: "address[]",
      },
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BenefactorNotWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "BeneficiaryNotApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "DelegationNotInitiated",
    type: "error",
  },
  {
    inputs: [],
    name: "GlobalMaxMintPerBlockExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "GlobalMaxRedeemPerBlockExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAdminChange",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAssetAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidBenefactorAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidBeneficiaryAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidCustodianAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEIP1271Signature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEIP712Signature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidNonce",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOrder",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidRoute",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidStablePrice",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidUSDeAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxMintPerBlockExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxRedeemPerBlockExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "NoAssetsProvided",
    type: "error",
  },
  {
    inputs: [],
    name: "NotPendingAdmin",
    type: "error",
  },
  {
    inputs: [],
    name: "SignatureExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "UnknownSignatureType",
    type: "error",
  },
  {
    inputs: [],
    name: "UnsupportedAsset",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "AssetAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "AssetRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "benefactor",
        type: "address",
      },
    ],
    name: "BenefactorAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "benefactor",
        type: "address",
      },
    ],
    name: "BenefactorRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "benefactor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "BeneficiaryAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "benefactor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "BeneficiaryRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "custodian",
        type: "address",
      },
    ],
    name: "CustodianAddressAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "custodian",
        type: "address",
      },
    ],
    name: "CustodianAddressRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CustodyTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
    ],
    name: "DelegatedSignerAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
    ],
    name: "DelegatedSignerInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
    ],
    name: "DelegatedSignerRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldMaxMintPerBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newMaxMintPerBlock",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "MaxMintPerBlockChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldMaxRedeemPerBlock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newMaxRedeemPerBlock",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "MaxRedeemPerBlockChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "order_id",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "benefactor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateral_asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collateral_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "usde_amount",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "Received",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "redeemer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "order_id",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "benefactor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collateral_asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collateral_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "usde_amount",
        type: "uint256",
      },
    ],
    name: "Redeem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenType",
        type: "uint256",
      },
    ],
    name: "TokenTypeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "USDe",
        type: "address",
      },
    ],
    name: "USDeSet",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "custodian",
        type: "address",
      },
    ],
    name: "addCustodianAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        components: [
          {
            internalType: "enum IEthenaMinting.TokenType",
            name: "tokenType",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "uint128",
            name: "maxMintPerBlock",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "maxRedeemPerBlock",
            type: "uint128",
          },
        ],
        internalType: "struct IEthenaMinting.TokenConfig",
        name: "_tokenConfig",
        type: "tuple",
      },
    ],
    name: "addSupportedAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "benefactor",
        type: "address",
      },
    ],
    name: "addWhitelistedBenefactor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_delegatedBy",
        type: "address",
      },
    ],
    name: "confirmDelegatedSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "delegatedSigner",
    outputs: [
      {
        internalType: "enum IEthenaMinting.DelegatedSignerStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disableMintRedeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "order_id",
            type: "string",
          },
          {
            internalType: "enum IEthenaMinting.OrderType",
            name: "order_type",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "expiry",
            type: "uint120",
          },
          {
            internalType: "uint128",
            name: "nonce",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "benefactor",
            type: "address",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateral_asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "collateral_amount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "usde_amount",
            type: "uint128",
          },
        ],
        internalType: "struct IEthenaMinting.Order",
        name: "order",
        type: "tuple",
      },
    ],
    name: "encodeOrder",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getDomainSeparator",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "globalConfig",
    outputs: [
      {
        internalType: "uint128",
        name: "globalMaxMintPerBlock",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "globalMaxRedeemPerBlock",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "order_id",
            type: "string",
          },
          {
            internalType: "enum IEthenaMinting.OrderType",
            name: "order_type",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "expiry",
            type: "uint120",
          },
          {
            internalType: "uint128",
            name: "nonce",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "benefactor",
            type: "address",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateral_asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "collateral_amount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "usde_amount",
            type: "uint128",
          },
        ],
        internalType: "struct IEthenaMinting.Order",
        name: "order",
        type: "tuple",
      },
    ],
    name: "hashOrder",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "benefactor",
        type: "address",
      },
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "isApprovedBeneficiary",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "custodian",
        type: "address",
      },
    ],
    name: "isCustodianAddress",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "isSupportedAsset",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "benefactor",
        type: "address",
      },
    ],
    name: "isWhitelistedBenefactor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "order_id",
            type: "string",
          },
          {
            internalType: "enum IEthenaMinting.OrderType",
            name: "order_type",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "expiry",
            type: "uint120",
          },
          {
            internalType: "uint128",
            name: "nonce",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "benefactor",
            type: "address",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateral_asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "collateral_amount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "usde_amount",
            type: "uint128",
          },
        ],
        internalType: "struct IEthenaMinting.Order",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address[]",
            name: "addresses",
            type: "address[]",
          },
          {
            internalType: "uint128[]",
            name: "ratios",
            type: "uint128[]",
          },
        ],
        internalType: "struct IEthenaMinting.Route",
        name: "route",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "enum IEthenaMinting.SignatureType",
            name: "signature_type",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "signature_bytes",
            type: "bytes",
          },
        ],
        internalType: "struct IEthenaMinting.Signature",
        name: "signature",
        type: "tuple",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "order_id",
            type: "string",
          },
          {
            internalType: "enum IEthenaMinting.OrderType",
            name: "order_type",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "expiry",
            type: "uint120",
          },
          {
            internalType: "uint128",
            name: "nonce",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "benefactor",
            type: "address",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateral_asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "collateral_amount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "usde_amount",
            type: "uint128",
          },
        ],
        internalType: "struct IEthenaMinting.Order",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address[]",
            name: "addresses",
            type: "address[]",
          },
          {
            internalType: "uint128[]",
            name: "ratios",
            type: "uint128[]",
          },
        ],
        internalType: "struct IEthenaMinting.Route",
        name: "route",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "enum IEthenaMinting.SignatureType",
            name: "signature_type",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "signature_bytes",
            type: "bytes",
          },
        ],
        internalType: "struct IEthenaMinting.Signature",
        name: "signature",
        type: "tuple",
      },
    ],
    name: "mintWETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "order_id",
            type: "string",
          },
          {
            internalType: "enum IEthenaMinting.OrderType",
            name: "order_type",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "expiry",
            type: "uint120",
          },
          {
            internalType: "uint128",
            name: "nonce",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "benefactor",
            type: "address",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateral_asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "collateral_amount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "usde_amount",
            type: "uint128",
          },
        ],
        internalType: "struct IEthenaMinting.Order",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "enum IEthenaMinting.SignatureType",
            name: "signature_type",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "signature_bytes",
            type: "bytes",
          },
        ],
        internalType: "struct IEthenaMinting.Signature",
        name: "signature",
        type: "tuple",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collateralManager",
        type: "address",
      },
    ],
    name: "removeCollateralManagerRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "custodian",
        type: "address",
      },
    ],
    name: "removeCustodianAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_removedSigner",
        type: "address",
      },
    ],
    name: "removeDelegatedSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "removeMinterRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "redeemer",
        type: "address",
      },
    ],
    name: "removeRedeemerRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "removeSupportedAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "benefactor",
        type: "address",
      },
    ],
    name: "removeWhitelistedBenefactor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "setApprovedBeneficiary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_delegateTo",
        type: "address",
      },
    ],
    name: "setDelegatedSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "_globalMaxMintPerBlock",
        type: "uint128",
      },
    ],
    name: "setGlobalMaxMintPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "_globalMaxRedeemPerBlock",
        type: "uint128",
      },
    ],
    name: "setGlobalMaxRedeemPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "_maxMintPerBlock",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "setMaxMintPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "_maxRedeemPerBlock",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "setMaxRedeemPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "_stablesDeltaLimit",
        type: "uint128",
      },
    ],
    name: "setStablesDeltaLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "enum IEthenaMinting.TokenType",
        name: "tokenType",
        type: "uint8",
      },
    ],
    name: "setTokenType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stablesDeltaLimit",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenConfig",
    outputs: [
      {
        internalType: "enum IEthenaMinting.TokenType",
        name: "tokenType",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "maxMintPerBlock",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "maxRedeemPerBlock",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "totalPerBlock",
    outputs: [
      {
        internalType: "uint128",
        name: "mintedPerBlock",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "redeemedPerBlock",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "totalPerBlockPerAsset",
    outputs: [
      {
        internalType: "uint128",
        name: "mintedPerBlock",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "redeemedPerBlock",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "transferAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
    ],
    name: "transferToCustody",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usde",
    outputs: [
      {
        internalType: "contract IUSDe",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "nonce",
        type: "uint128",
      },
    ],
    name: "verifyNonce",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "order_id",
            type: "string",
          },
          {
            internalType: "enum IEthenaMinting.OrderType",
            name: "order_type",
            type: "uint8",
          },
          {
            internalType: "uint120",
            name: "expiry",
            type: "uint120",
          },
          {
            internalType: "uint128",
            name: "nonce",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "benefactor",
            type: "address",
          },
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateral_asset",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "collateral_amount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "usde_amount",
            type: "uint128",
          },
        ],
        internalType: "struct IEthenaMinting.Order",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "enum IEthenaMinting.SignatureType",
            name: "signature_type",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "signature_bytes",
            type: "bytes",
          },
        ],
        internalType: "struct IEthenaMinting.Signature",
        name: "signature",
        type: "tuple",
      },
    ],
    name: "verifyOrder",
    outputs: [
      {
        internalType: "bytes32",
        name: "taker_order_hash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address[]",
            name: "addresses",
            type: "address[]",
          },
          {
            internalType: "uint128[]",
            name: "ratios",
            type: "uint128[]",
          },
        ],
        internalType: "struct IEthenaMinting.Route",
        name: "route",
        type: "tuple",
      },
    ],
    name: "verifyRoute",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "collateralAmount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "usdeAmount",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "collateralAsset",
        type: "address",
      },
      {
        internalType: "enum IEthenaMinting.OrderType",
        name: "orderType",
        type: "uint8",
      },
    ],
    name: "verifyStablesLimit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;
