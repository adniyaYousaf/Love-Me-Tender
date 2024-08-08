const WithdrawBid = ({ bid, handleStatusChange }) => {
	return (
		bid.status !== "Withdrawn" && (
			<button
				className="btn withdraw-btn"
				onClick={() => handleStatusChange(bid.bid_id, "Withdrawn")}
			>
				Withdraw
			</button>
		)
	);
};

export default WithdrawBid;
