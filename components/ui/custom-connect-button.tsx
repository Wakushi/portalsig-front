import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "./button"
export default function CustomConnectButton() {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				mounted
			}) => {
				const ready = mounted
				const connected = ready && account && chain
				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none"
							}
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<Button onClick={openConnectModal}>
										Connect Wallet
									</Button>
								)
							}
							if (chain.unsupported) {
								return (
									<Button onClick={openChainModal}>
										Wrong network
									</Button>
								)
							}
							return (
								<div
									style={{
										display: "flex",
										gap: "0.5rem",
										border: "1px solid #F8FAFC",
										padding: "0 0 0 0.5rem",
										borderRadius: "14px",
										backgroundColor: "#020817"
									}}
								>
									<button
										onClick={openChainModal}
										style={{
											display: "flex",
											alignItems: "center",
											color: "#fff",
											fontSize: "1rem"
										}}
									>
										{chain.hasIcon && (
											<div
												style={{
													background:
														chain.iconBackground,
													width: 12,
													height: 12,
													borderRadius: 999,
													overflow: "hidden",
													marginRight: 4
												}}
											>
												{chain.iconUrl && (
													<img
														alt={
															chain.name ??
															"Chain icon"
														}
														src={chain.iconUrl}
														style={{
															width: 12,
															height: 12
														}}
													/>
												)}
											</div>
										)}
										{chain.name}
									</button>
									<Button onClick={openAccountModal}>
										{account.displayName}
										{account.displayBalance
											? ` (${account.displayBalance})`
											: ""}
									</Button>
								</div>
							)
						})()}
					</div>
				)
			}}
		</ConnectButton.Custom>
	)
}
