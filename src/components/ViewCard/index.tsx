"use client"

import { Job } from "@/types/job"
import { format } from "date-fns"
import EditDialog from "../EditDialog"
import "./viewCard.css"

type Props = {
	job: Job
}
export default function ViewCard(props: Props) {
	const { companyName, position, status, link, submitedDate, id } = props.job

	return (
		<>
			<tr className="test my-3 table-row w-32 rounded p-2">
				<td className="py-2 pl-4">{companyName}</td>
				<td>{position}</td>
				<td>
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
								status === "pending"
									? "bg-amber-400"
									: status === "accepted"
									? "bg-green-400"
									: "bg-red-500"
							} w-3 h-3 rounded-full absolute right-7`}></div>
					</div>
				</td>
				<td>{format(new Date(submitedDate as string), "PPP")}</td>
				<td className="text-center">
					<EditDialog
						companyName={companyName}
						position={position}
						status={status}
						submitedDate={new Date(submitedDate!)}
						link={link}
						id={id}
					/>
				</td>
			</tr>
		</>
	)
}
