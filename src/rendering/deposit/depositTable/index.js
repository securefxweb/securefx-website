export default function DepositTable({ data }) {
	if (!data) return null;

	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Deposit</th>
					<th>Withdrawal</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Deposit</td>
					<td>{data.deposit.mode}</td>
					<td>{data.withdrawal.mode || data.withdrawal.currency}</td>
				</tr>
				<tr>
					<td>Fees / Commissions</td>
					<td>{data.deposit.fees}</td>
					<td>{data.withdrawal.fees}</td>
				</tr>
				<tr>
					<td>Processing Time</td>
					<td>{data.deposit.processingTime}</td>
					<td>
						<p>{data.withdrawal.processingTime}</p>
					</td>
				</tr>
				<tr>
					<td>Minimum Amount</td>
					<td>{data.deposit.minimumAmount}</td>
					<td>{data.withdrawal.minimumAmount}</td>
				</tr>
			</tbody>
		</table>
	);
}
