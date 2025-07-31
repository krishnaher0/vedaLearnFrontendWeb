import usePayments from "../../hooks/usePayments";

export default function AdminPayments() {
  const { data: payments, isLoading, isError } = usePayments();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading payments.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">Payment Records</h2>
      <table>
        <thead>
          <tr>
            <th>PID</th>
            <th>Amount</th>
            <th>Ref ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.pid}</td>
              <td>{payment.amt}</td>
              <td>{payment.refId}</td>
              <td>{new Date(payment.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
