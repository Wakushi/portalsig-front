import { Portal } from "@/types/Portal"
import PortalCard from "../portal-card/portal-card"
import { PortalCardView } from "@/types/PortalCardProps"

export default function PortalList({ portals }: { portals: Portal[] }) {
	return (
		<div className="flex items-center justify-center flex-wrap gap-5">
			{portals?.map((portal: Portal) => (
				<PortalCard
					key={portal.address}
					portal={portal}
					view={PortalCardView.SMALL}
				/>
			))}
		</div>
	)
}
