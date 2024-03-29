"use client"
// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import LoaderHive from "../ui/loader-hive/loader-hive"
import CreateTransactionForm from "./create-transaction-form"
import CustomToastAction from "../ui/custom-toast-action"

// React
import { useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

// Wagmi / Viem
import { Address, parseUnits } from "viem"

// Services & Utils
import { PayFeesIn, TokenContext } from "@/services/TokenContext"
import {
  PORTALGATE_CONTRACT_ABI,
  PORTALSIG_WALLET_CONTRACT_ABI,
} from "@/constants/constants"
import { PortalContext } from "@/services/PortalContext"
import { TransactionContext } from "@/services/TransactionsContext"
import { ChainContext, ContractCallType } from "@/services/ChainContext"
import { Chain, DestinationChainsData } from "@/services/data/chains"
import { DEFAULT_STALE_TIME } from "@/lib/utils"

export default function CreateTransactionDialog() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { getTokenByAddress, getSupportedTokens } = useContext(TokenContext)
  const { currentPortal } = useContext(PortalContext)
  const { getExplorerUrl } = useContext(TransactionContext)
  const { callContract, getActiveChainData } = useContext(ChainContext)

  const [open, setOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const chain: Chain | null = getActiveChainData()

  const { data: supportedTokens, isLoading } = useQuery<
    DestinationChainsData[],
    Error
  >(
    ["supportedTokens", currentPortal?.address],
    () => {
      if (!currentPortal?.address) {
        throw new Error("Portal address is undefined")
      }
      return getSupportedTokens()
    },
    {
      enabled: !!currentPortal?.address,
      staleTime: DEFAULT_STALE_TIME,
    }
  )

  async function createTransaction(
    destination: Address,
    destinationChainSelector: string,
    token: Address,
    amount: string,
    data: string,
    executesOnRequirementMet: boolean,
    payFeesIn: string
  ): Promise<void> {
    if (!currentPortal) return
    try {
      const tokenSent = getTokenByAddress(token)
      let result
      if (chain && chain.chainId !== currentPortal.chain.chainId) {
        result = await callContract({
          contractAddress: chain.portalGateAddress,
          abi: PORTALGATE_CONTRACT_ABI,
          method: "createTransaction",
          args: [
            currentPortal.address,
            currentPortal.chain.chainSelector,
            destination,
            token,
            destinationChainSelector,
            parseUnits(amount, tokenSent?.decimals ?? 18),
            data,
            executesOnRequirementMet,
            payFeesIn,
            0,
            PayFeesIn.LINK,
          ],
          type: ContractCallType.WRITE,
        })
      } else {
        result = await callContract({
          contractAddress: currentPortal.address,
          abi: PORTALSIG_WALLET_CONTRACT_ABI,
          method: "createTransaction",
          args: [
            destination,
            token,
            destinationChainSelector,
            parseUnits(amount, tokenSent?.decimals ?? 18),
            data,
            executesOnRequirementMet,
            payFeesIn,
            0,
          ],
          type: ContractCallType.WRITE,
        })
      }
      queryClient.invalidateQueries(["transactions", currentPortal?.address])
      toast({
        title: "Transaction created !",
        description: "See on block explorer",
        action: (
          <CustomToastAction
            url={getExplorerUrl(result.transactionHash ?? "")}
          />
        ),
      })
    } catch (error: any) {
      toast({
        title: "Something went wrong !",
        description: error.message,
      })
    } finally {
      setOpen(false)
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen: boolean) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button>Create transaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] h-[700px] overflow-auto custom-scrollbar">
        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="translate-y-[150px] text-3xl font-bold">
              creating transaction...
            </h2>
            <LoaderHive />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create transaction</DialogTitle>
              <DialogDescription>
                Enter the details of the transaction you want to create.
              </DialogDescription>
            </DialogHeader>
            <CreateTransactionForm
              createTransaction={createTransaction}
              supportedTokens={supportedTokens}
              isLoading={isLoading}
              setIsSubmitting={setIsSubmitting}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
