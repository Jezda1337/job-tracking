import { EditIcon } from "lucide-react"

type Props = {
	companyName: string
	position: string
	status?: string
	date: string
}

export default function ViewCard({
	companyName,
	position,
	status = "Pending",
	date,
}: Props) {
	return (
		<>
			<tr className="my-3 table-row w-full rounded p-2">
				<td className="py-2 pl-4">{companyName}</td>
				<td>{position}</td>
				<td>{status}</td>
				<td>{date}</td>
				<td className="text-center">
					<button className="">
						<EditIcon className="h-5 w-5 hover:text-blue-600" />
					</button>
				</td>
			</tr>
		</>
	)
}
