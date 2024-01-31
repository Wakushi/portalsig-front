import { Address } from "viem"

export interface Portal {
	address: Address
	owners: Address[]
	balance: string
	numberOfTransactions: string
	requiredConfirmationsAmount: string
	lastTransaction: number
}
