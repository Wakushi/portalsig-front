// React
import { createContext, ReactNode, useContext, useState } from "react"
// Types
import { Portal } from "@/types/Portal"
// Wagmi / Viem
import { fetchBalance } from "@wagmi/core"
import { Address } from "viem"
import { readContract, getNetwork } from "@wagmi/core"
import { useAccount } from "wagmi"
// Utils
import {
  PORTALSIG_FACTORY_CONTRACT_ABI,
  PORTALSIG_WALLET_CONTRACT_ABI,
} from "@/constants/constants"
import { Chain, registeredChains } from "./data/chains"
import { ChainContext } from "./ChainContext"

interface PortalContextProviderProps {
  children: ReactNode
}

interface PortalContextProps {
  currentPortal: Portal | null
  isExternalChain: (chainSelector: string) => boolean
  getPortalNativeBalance: (portalAddress: Address) => Promise<string>
  getAllPortals: () => Promise<Portal[]>
  setCurrentPortalByAddress: (portalAddress: Address) => Promise<void>
}

const PortalContext = createContext<PortalContextProps>({
  currentPortal: null,
  isExternalChain: (chainSelector: string) => false,
  getPortalNativeBalance: (portalAddress: Address) => Promise.resolve(""),
  getAllPortals: () => Promise.resolve([]),
  setCurrentPortalByAddress: (portalAddress: Address) => Promise.resolve(),
})
export default function PortalContextProvider(
  props: PortalContextProviderProps
) {
  const { address } = useAccount()
  const { chain } = getNetwork()
  const [currentPortal, setCurrentPortal] = useState<Portal | null>(null)
  const [portals, setPortals] = useState<Portal[]>([])

  async function getAllPortals(): Promise<Portal[]> {
    const portals: Portal[] = []
    for (let chainPortals of await getPortalAddressesByChainId()) {
      const chainId = chainPortals[0]
      const portalAddresses = chainPortals[1]
      for (let portalAddress of portalAddresses) {
        const portal = await getPortal(chainId, portalAddress)
        portals.push(portal)
      }
    }
    setPortals(portals)
    return portals
  }

  async function getPortalAddressesByChainId(): Promise<Map<number, any[]>> {
    const portalsAddressesByChain: any = new Map<number, any[]>()
    for (let registeredChain of registeredChains) {
      const chainId = +registeredChain.chainId
      const chainPortalsAddresses: any = await readContract({
        address: registeredChain.portalFactoryAddress,
        abi: PORTALSIG_FACTORY_CONTRACT_ABI,
        functionName: "getWalletsByOwner",
        args: [address],
        chainId,
      })
      if (portalsAddressesByChain.has(chainId)) {
        portalsAddressesByChain.set(chainId, [
          ...portalsAddressesByChain.get(chainId),
          ...chainPortalsAddresses,
        ])
      } else {
        portalsAddressesByChain.set(chainId, chainPortalsAddresses)
      }
    }
    return portalsAddressesByChain
  }

  async function getPortal(
    portalChainId: number,
    portalAddress: Address
  ): Promise<Portal> {
    const owners = await getPortalOwners(portalChainId, portalAddress)
    const balance = await getPortalNativeBalance(portalAddress)
    const transactionsCount = await getTransactionsCount(
      portalChainId,
      portalAddress
    )
    const requiredConfirmationsAmount = await getRequiredConfirmationsAmount(
      portalChainId,
      portalAddress
    )
    const portalChainSelector = await getPortalChainSelector(
      portalChainId,
      portalAddress
    )
    const chain = registeredChains.find(
      (registeredChain) => registeredChain.chainSelector === portalChainSelector
    )

    if (!chain) throw new Error("Chain not found")

    return {
      address: portalAddress,
      owners: owners,
      balance: balance,
      numberOfTransactions: transactionsCount,
      requiredConfirmationsAmount: requiredConfirmationsAmount,
      lastTransaction: 0,
      chain,
    }
  }

  async function setCurrentPortalByAddress(
    portalAddress: Address
  ): Promise<void> {
    const portal = portals.find((portal) => portal.address === portalAddress)
    if (portal) setCurrentPortal(portal)
  }

  async function getPortalOwners(
    portalChainId: number,
    portalAddress: Address
  ): Promise<Address[]> {
    const owners: any = await readContract({
      address: portalAddress,
      abi: PORTALSIG_WALLET_CONTRACT_ABI,
      functionName: "getOwners",
      chainId: portalChainId,
    })
    return owners
  }

  async function getPortalNativeBalance(
    portalAddress: Address
  ): Promise<string> {
    const balance: any = await fetchBalance({
      address: portalAddress,
    })
    return balance?.formatted
  }

  async function getTransactionsCount(
    portalChainId: number,
    portalAddress: Address
  ): Promise<string> {
    const transactionCount: any = await readContract({
      address: portalAddress,
      abi: PORTALSIG_WALLET_CONTRACT_ABI,
      functionName: "getTransactionCount",
      chainId: portalChainId,
    })
    return transactionCount.toString()
  }

  async function getRequiredConfirmationsAmount(
    portalChainId: number,
    portalAddress: Address
  ): Promise<string> {
    const requiredConfirmationsAmount: any = await readContract({
      address: portalAddress,
      abi: PORTALSIG_WALLET_CONTRACT_ABI,
      functionName: "getRequiredConfirmationsAmount",
      chainId: portalChainId,
    })
    return requiredConfirmationsAmount.toString()
  }

  async function getPortalChainSelector(
    portalChainId: number,
    portalAddress: Address
  ): Promise<string> {
    const portalChainSelector: any = await readContract({
      address: portalAddress,
      abi: PORTALSIG_WALLET_CONTRACT_ABI,
      functionName: "getPortalChainSelector",
      chainId: portalChainId,
    })
    return portalChainSelector.toString()
  }

  function getPortalChain(): Chain | undefined {
    return registeredChains.find(
      (registeredChain) => +registeredChain.chainId === chain?.id
    )
  }

  function isExternalChain(chainSelector: string): boolean {
    return (
      chainSelector !== "" && chainSelector !== getPortalChain()?.chainSelector
    )
  }

  const context = {
    currentPortal,
    getAllPortals,
    isExternalChain,
    getPortalNativeBalance,
    setCurrentPortalByAddress,
  }

  return (
    <PortalContext.Provider value={context}>
      {props.children}
    </PortalContext.Provider>
  )
}

export { PortalContext }
