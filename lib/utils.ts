import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Address } from "viem"

export const ZERO_ADDRESS: Address =
  "0x0000000000000000000000000000000000000000"

export const DEFAULT_STALE_TIME = 1000

export function getShortenedAddress(address: Address): string {
  return address ? address.slice(0, 6) + "..." + address.slice(-4) : address
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
