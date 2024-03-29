"use client"
// React
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

// Components
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import LoaderHive from "@/components/ui/loader-hive/loader-hive"
import CustomToastAction from "@/components/ui/custom-toast-action"
import CreatePortalForm from "@/components/create-portal-form"

// Constants
import { PORTALSIG_FACTORY_CONTRACT_ABI } from "@/constants/constants"

// Wagmi
import { Address, isAddress } from "viem"
import { useAccount } from "wagmi"

// Service
import { ChainContext, ContractCallType } from "@/services/ChainContext"
import { TransactionContext } from "@/services/TransactionsContext"

export default function CreatePage() {
  const { toast } = useToast()
  const { address } = useAccount()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { callContract, getActiveChainData } = useContext(ChainContext)
  const { getExplorerUrl } = useContext(TransactionContext)

  const [ownersAddresses, setOwnersAddresses] = useState<Address[]>([
    "0x",
    "0x",
  ])
  const [numberOfConfirmation, setNumberOfConfirmation] = useState<string>("2")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")

  useEffect(() => {
    if (address) {
      setOwnersAddresses([address, "0x"])
    }
  }, [address])

  function handleAddOwnerInputField(): void {
    setOwnersAddresses((prevOwnersAddresses: Address[]) => [
      ...prevOwnersAddresses,
      "0x",
    ])
  }

  function handleRemoveOwnerInputField(index: number): void {
    setOwnersAddresses((prevOwnersAddresses: Address[]) => {
      const newOwnersInput = [...prevOwnersAddresses]
      newOwnersInput.splice(index, 1)
      return newOwnersInput
    })
  }

  function handleOnOwnerInputChange(index: number, newAddress: Address): void {
    setOwnersAddresses((prevOwnersAddresses: Address[]) => {
      const newOwnersAddresses = [...prevOwnersAddresses]
      newOwnersAddresses[index] = newAddress
      return newOwnersAddresses
    })
  }

  function handleOnConfirmationInputChange(numberOfConfirmation: string): void {
    setNumberOfConfirmation(numberOfConfirmation)
  }

  function handleCreationFormError(
    ownerAddresses: Address[],
    numberOfConfirmation: number
  ): boolean {
    if (ownerAddresses.length < 2) {
      setErrorMsg("You must have at least 2 owners.")
      return false
    } else if (numberOfConfirmation < 2) {
      setErrorMsg("You must have at least 2 confirmations.")
      return false
    } else if (!areAddressesValid(ownerAddresses)) {
      setErrorMsg("Please verify the addresses format.")
      return false
    } else if (numberOfConfirmation > ownerAddresses.length) {
      setErrorMsg("There are more confirmations than owners.")
      return false
    } else if (new Set(ownerAddresses).size !== ownerAddresses.length) {
      setErrorMsg("There are duplicate addresses.")
      return false
    }
    setErrorMsg("")
    return true
  }

  function areAddressesValid(ownerAddresses: Address[]): boolean {
    return ownerAddresses.every((address) => {
      return address.length === 42 && isAddress(address)
    })
  }

  function handleSubmit(): void {
    if (
      handleCreationFormError(ownersAddresses, parseInt(numberOfConfirmation))
    ) {
      createPortalSig()
    }
  }

  async function createPortalSig(): Promise<void> {
    setIsLoading(true)
    try {
      const portalSigFactoryData = getActiveChainData()
      if (!portalSigFactoryData) return
      const {
        portalFactoryAddress,
        ccipRouterAddress,
        linkTokenAddress,
        chainSelector,
      } = portalSigFactoryData
      const result = await callContract({
        contractAddress: portalFactoryAddress,
        abi: PORTALSIG_FACTORY_CONTRACT_ABI,
        method: "deployPortalSigWallet",
        args: [
          ownersAddresses,
          parseInt(numberOfConfirmation.toString()),
          ccipRouterAddress,
          linkTokenAddress,
          chainSelector,
        ],
        type: ContractCallType.WRITE,
      })
      queryClient.invalidateQueries(["portals"])
      toast({
        title: "Wallet created !",
        description: "See on block explorer",
        action: (
          <CustomToastAction
            url={getExplorerUrl(result.transactionHash ?? "")}
          />
        ),
      })
      navigateToPortals()
    } catch (error: any) {
      toast({
        title: "Something went wrong !",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  function navigateToPortals(): void {
    router.push("/portals")
  }

  return (
    <div className="h-screen flex items-center justify-center fade-in">
      {isLoading ? (
        <div className="fade-in">
          <h2 className="translate-y-[150px] text-3xl font-bold">
            opening portal...
          </h2>
          <LoaderHive />
        </div>
      ) : (
        <>
          <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle>Open a new Portal</CardTitle>
              <CardDescription>
                Please configurate your new cross-chain multisig wallet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreatePortalForm
                handleAddOwnerInputField={handleAddOwnerInputField}
                handleRemoveOwnerInputField={handleRemoveOwnerInputField}
                handleOnOwnerInputChange={handleOnOwnerInputChange}
                handleOnConfirmationInputChange={
                  handleOnConfirmationInputChange
                }
                ownersAddresses={ownersAddresses}
              />
            </CardContent>
            <CardFooter>
              {errorMsg && <span className="text-rose-600">{errorMsg}</span>}
              <Button className="ml-auto" onClick={handleSubmit}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}
