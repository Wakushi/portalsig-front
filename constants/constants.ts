export const CCIP_EXPLORER_URL = "https://ccip.chain.link/tx/"

export const PORTALSIG_FACTORY_CONTRACT_ABI = [
  {
    type: "function",
    name: "deployPortalSigWallet",
    inputs: [
      { name: "_owners", type: "address[]", internalType: "address[]" },
      {
        name: "_requiredConfirmationsAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_ccipRouterAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_linkAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_portalChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getWalletsByOwner",
    inputs: [{ name: "_owner", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "PortalSigWalletDeployed",
    inputs: [
      {
        name: "_owners",
        type: "address[]",
        indexed: true,
        internalType: "address[]",
      },
      {
        name: "_requiredConfirmationsAmount",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "contractAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
]

export const PORTALSIG_WALLET_CONTRACT_ABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_owners", type: "address[]", internalType: "address[]" },
      {
        name: "_requiredConfirmationsAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_ccipRouterAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_linkAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_portalChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "nonpayable",
  },
  { type: "fallback", stateMutability: "payable" },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "CONFIRM_TRANSACTION_METHOD",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "CREATE_TRANSACTION_METHOD",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "EXECUTE_TRANSACTION_METHOD",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "FUJI_PORTALGATE",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MUMBAI_PORTALGATE",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "REVOKE_CONFIRMATION_METHOD",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "SEPOLIA_PORTALGATE",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ccipReceive",
    inputs: [
      {
        name: "any2EvmMessage",
        type: "tuple",
        internalType: "struct Client.Any2EVMMessage",
        components: [
          {
            name: "messageId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "sourceChainSelector",
            type: "uint64",
            internalType: "uint64",
          },
          { name: "sender", type: "bytes", internalType: "bytes" },
          { name: "data", type: "bytes", internalType: "bytes" },
          {
            name: "destTokenAmounts",
            type: "tuple[]",
            internalType: "struct Client.EVMTokenAmount[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "compareStrings",
    inputs: [
      { name: "a", type: "string", internalType: "string" },
      { name: "b", type: "string", internalType: "string" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "confirmTransaction",
    inputs: [
      {
        name: "_transactionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createTransaction",
    inputs: [
      {
        name: "_destination",
        type: "address",
        internalType: "address",
      },
      { name: "_token", type: "address", internalType: "address" },
      {
        name: "_destinationChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_data", type: "bytes", internalType: "bytes" },
      {
        name: "_executesOnRequirementMet",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "_payFeesIn",
        type: "uint8",
        internalType: "enum Portal.PayFeesIn",
      },
      { name: "_gasLimit", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeTransaction",
    inputs: [
      {
        name: "_transactionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getFailedMessagesIds",
    inputs: [],
    outputs: [{ name: "ids", type: "bytes32[]", internalType: "bytes32[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOwners",
    inputs: [],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPortalChainSelector",
    inputs: [],
    outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRequiredConfirmationsAmount",
    inputs: [],
    outputs: [
      {
        name: "requiredConfirmationsAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRouter",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTransaction",
    inputs: [
      {
        name: "_transactionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Portal.Transaction",
        components: [
          {
            name: "destination",
            type: "address",
            internalType: "address",
          },
          { name: "token", type: "address", internalType: "address" },
          {
            name: "initiator",
            type: "address",
            internalType: "address",
          },
          {
            name: "destinationChainSelector",
            type: "uint64",
            internalType: "uint64",
          },
          { name: "id", type: "uint256", internalType: "uint256" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          {
            name: "numberOfConfirmations",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "gasLimit",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "createdAt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "executedAt",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "data", type: "bytes", internalType: "bytes" },
          { name: "executed", type: "bool", internalType: "bool" },
          {
            name: "executesOnRequirementMet",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "payFeesIn",
            type: "uint8",
            internalType: "enum Portal.PayFeesIn",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTransactionCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTransactions",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct Portal.Transaction[]",
        components: [
          {
            name: "destination",
            type: "address",
            internalType: "address",
          },
          { name: "token", type: "address", internalType: "address" },
          {
            name: "initiator",
            type: "address",
            internalType: "address",
          },
          {
            name: "destinationChainSelector",
            type: "uint64",
            internalType: "uint64",
          },
          { name: "id", type: "uint256", internalType: "uint256" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          {
            name: "numberOfConfirmations",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "gasLimit",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "createdAt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "executedAt",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "data", type: "bytes", internalType: "bytes" },
          { name: "executed", type: "bool", internalType: "bool" },
          {
            name: "executesOnRequirementMet",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "payFeesIn",
            type: "uint8",
            internalType: "enum Portal.PayFeesIn",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasEnoughConfirmations",
    inputs: [
      {
        name: "_transactionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isConfirmedByAccount",
    inputs: [
      {
        name: "_transactionId",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "_account", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isOwner",
    inputs: [{ name: "_owner", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "processMessage",
    inputs: [
      {
        name: "any2EvmMessage",
        type: "tuple",
        internalType: "struct Client.Any2EVMMessage",
        components: [
          {
            name: "messageId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "sourceChainSelector",
            type: "uint64",
            internalType: "uint64",
          },
          { name: "sender", type: "bytes", internalType: "bytes" },
          { name: "data", type: "bytes", internalType: "bytes" },
          {
            name: "destTokenAmounts",
            type: "tuple[]",
            internalType: "struct Client.EVMTokenAmount[]",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "retryFailedMessage",
    inputs: [
      { name: "messageId", type: "bytes32", internalType: "bytes32" },
      {
        name: "tokenReceiver",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeConfirmation",
    inputs: [
      {
        name: "_transactionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "s_messageContents",
    inputs: [{ name: "messageId", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      { name: "messageId", type: "bytes32", internalType: "bytes32" },
      {
        name: "sourceChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      { name: "sender", type: "bytes", internalType: "bytes" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [{ name: "interfaceId", type: "bytes4", internalType: "bytes4" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "updateCCIPRouter",
    inputs: [
      {
        name: "_ccipRouterAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "MessageFailed",
    inputs: [
      {
        name: "messageId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "reason",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MessageRecovered",
    inputs: [
      {
        name: "messageId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MessageSent",
    inputs: [
      {
        name: "messageId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "destinationChainSelector",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "receiver",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "payFeesIn",
        type: "uint8",
        indexed: false,
        internalType: "enum Portal.PayFeesIn",
      },
      {
        name: "fees",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransactionConfirmationRevoked",
    inputs: [
      {
        name: "transactionId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransactionConfirmed",
    inputs: [
      {
        name: "transactionId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransactionCreated",
    inputs: [
      {
        name: "destination",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "destinationChainSelector",
        type: "uint64",
        indexed: true,
        internalType: "uint64",
      },
      {
        name: "data",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransactionExecuted",
    inputs: [
      {
        name: "transactionId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "InvalidRouter",
    inputs: [{ name: "router", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "PortalSig__AlreadyConfirmed",
    inputs: [
      {
        name: "transactionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "PortalSig__AlreadyExecuted",
    inputs: [
      {
        name: "transactionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "PortalSig__DestinationChainNotAllowlisted",
    inputs: [
      {
        name: "destinationChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
    ],
  },
  {
    type: "error",
    name: "PortalSig__InvalidConfirmationAmount",
    inputs: [
      {
        name: "requiredConfirmations",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  { type: "error", name: "PortalSig__InvalidOwnerAddress", inputs: [] },
  {
    type: "error",
    name: "PortalSig__InvalidTransactionId",
    inputs: [
      {
        name: "transactionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "PortalSig__MessageNotFailed",
    inputs: [{ name: "messageId", type: "bytes32", internalType: "bytes32" }],
  },
  {
    type: "error",
    name: "PortalSig__NeedAtLeastTwoOwners",
    inputs: [
      { name: "ownersLength", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "PortalSig__NotConfirmed",
    inputs: [
      {
        name: "transactionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "PortalSig__NotEnoughBalanceForFees",
    inputs: [
      {
        name: "currentBalance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "calculatedFees",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "PortalSig__NotEnoughConfirmations",
    inputs: [
      {
        name: "transactionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "PortalSig__NotOwner",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  { type: "error", name: "PortalSig__OnlySelf", inputs: [] },
  { type: "error", name: "PortalSig__OwnerNotUnique", inputs: [] },
  {
    type: "error",
    name: "PortalSig__RequiredConfirmationsGreaterThanOwnersLength",
    inputs: [
      {
        name: "requiredConfirmations",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "ownersLength", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "PortalSig__TransactionExecutionFailed",
    inputs: [
      {
        name: "transactionId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
]

export const PORTALGATE_CONTRACT_ABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_router", type: "address", internalType: "address" },
      { name: "_linkToken", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "STANDARD_GAS_LIMIT",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "confirmTransaction",
    inputs: [
      {
        name: "_portalAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_portalChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_transactionId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_payGateFeesIn",
        type: "uint8",
        internalType: "enum PortalGate.PayFeesIn",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createTransaction",
    inputs: [
      {
        name: "_portalAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_portalChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_destination",
        type: "address",
        internalType: "address",
      },
      { name: "_token", type: "address", internalType: "address" },
      {
        name: "_destinationChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_data", type: "bytes", internalType: "bytes" },
      {
        name: "_executesOnRequirementMet",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "_payFeesIn",
        type: "uint8",
        internalType: "enum PortalGate.PayFeesIn",
      },
      { name: "_gasLimit", type: "uint256", internalType: "uint256" },
      {
        name: "_payGateFeesIn",
        type: "uint8",
        internalType: "enum PortalGate.PayFeesIn",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeTransaction",
    inputs: [
      {
        name: "_portalAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_portalChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_transactionId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_payGateFeesIn",
        type: "uint8",
        internalType: "enum PortalGate.PayFeesIn",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getMessageFee",
    inputs: [
      {
        name: "_destinationChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      { name: "_data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeConfirmation",
    inputs: [
      {
        name: "_portalAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_portalChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_transactionId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_payGateFeesIn",
        type: "uint8",
        internalType: "enum PortalGate.PayFeesIn",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateCCIPRouter",
    inputs: [
      {
        name: "_ccipRouterAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "MessageTransferred",
    inputs: [
      {
        name: "messageId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "destinationChainSelector",
        type: "uint64",
        indexed: true,
        internalType: "uint64",
      },
      {
        name: "receiver",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "feeToken",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "fees",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "PortalGate__NotEnoughBalanceForFees",
    inputs: [
      {
        name: "currentBalance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "calculatedFees",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
]
