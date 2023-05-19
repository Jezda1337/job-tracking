"use client"

import { Job } from "@/types/job"
import { format } from "date-fns"
import EditDialog from "../EditDialog"
import "./viewCard.css"

type Props = {
	job: Job
}
export default function ViewCard(props: Props) {
	const {
		companyName,
		position,
		status,
		link,
		submitedDate,
		id,
		description,
		salary,
	} = props.job

	return (
		<>
			<tr className="test my-3 table-row w-32 rounded p-2">
				<td
					className="max-w-[192px] overflow-hidden text-ellipsis whitespace-nowrap py-2 pl-4"
					title={companyName ?? ""}>
					{companyName}
				</td>
				<td
					className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap pl-4"
					title={position ?? ""}>
					{position}
				</td>
				<td className="pl-4">{salary}</td>
				<td className="pl-2">
					<a
						target="_blank"
						className="hover:text-blue-500 hover:underline"
						href={link ?? undefined}>
						Link
					</a>
				</td>
				<td>
					<div className="relative flex items-center gap-2">
						<p className="first-letter:uppercase">{status}</p>
						<div
							className={`${
								status === ("pending" || "interviewed")
									? "bg-amber-400"
									: status === "accepted"
									? "bg-green-400"
									: "bg-red-500"
							} w-3 h-3 rounded-full absolute right-3`}></div>
					</div>
				</td>
				<td>{format(new Date(submitedDate!), "PPP")}</td>
				<td className="text-center">
					<EditDialog
						companyName={companyName}
						position={position}
						status={status}
						submitedDate={new Date(submitedDate!)}
						link={link}
						id={id}
						description={description}
						salary={salary}
					/>
				</td>
			</tr>
		</>
	)
}
