import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post } from "./TenderClient";

const BuyerTenderList = () => {
	const { pageNumber } = useParams();
	const { tenderId } = useParams();
	const currentPage = pageNumber ? parseInt(pageNumber, 10) : 1;
	const [bid, setBid] = useState([]);
	const [updateStatus, setUpdatedStatus] = useState({
		id: 1,
		status: "Active",
	});
	const [errorMsg, setErrorMsg] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const [pagination, setPagination] = useState({
		itemsPerPage: 10,
		currentPage: currentPage,
		totalPages: 1,
	});

	const fetchBids = async (tenderId, page) => {
		setLoading(true);
		try {
			const data = await get(`/api/bid?tender_id=${tenderId}&page=${page}`);
			setBid(data.results);
			setPagination(data.pagination);
			setErrorMsg(null);
		} catch (error) {
			setErrorMsg("Error fetching bids!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBids(tenderId, currentPage);
	}, [currentPage, tenderId]);

	const handleBidStatusChange = async (bidId, status) => {
		const response = await post(`/api/bid/${bidId}/status`, { status });
		if (response.code === "SUCCESS") {
			setUpdatedStatus({ id: bidId, status: status });
		} else {
			setErrorMsg("Error fetching bids!");
		}
	};

	if (bid.length === 0) {
		return <div className="msg">No Bid Submited yet!!</div>;
	}

	const loadNextPage = () => {
		if (pagination.currentPage < pagination.totalPages && !loading) {
			navigate(`/bidding/page/${pagination.currentPage + 1}`);
		}
	};

	const loadPreviousPage = () => {
		if (pagination.currentPage > 1 && !loading) {
			navigate(`/bidding/page/${pagination.currentPage - 1}`);
		}
	};

	if (errorMsg !== null) {
		return <div>{errorMsg}</div>;
	}

	if (loading) {
		return <div>Loading!!</div>;
	}

	return (
		<main>
			<h2 className="heading">Bids</h2>
			<div className="container">
				{errorMsg && <p className="error-message">{errorMsg}</p>}
				{bid.map((bid) => (
					<div className="card" key={bid.bid_id}>
						<p className="posted-on">
							Submited on
							<span className="posted-on-date">
								{new Date(bid.bidding_date).toLocaleDateString()}
							</span>
							<span className="bid-status">
								{updateStatus.id === bid.bid_id
									? updateStatus.status
									: bid.status}
							</span>
						</p>
						<p className="title">
							<strong>Bidder Id:</strong> {bid.bidder_id} |
							<strong>Bidder Name: </strong>
							{bid.first_name + " " + bid.last_name} |
							<strong>Proposed Project Duration: </strong>
							{bid.suggested_duration_days} days
						</p>
						<h4>Cover letter:</h4>
						<p className="cover-letter"> {bid.cover_letter}</p>
						<div className="btn-container">
							{bid.attachment && (
								<button className="btn">
									<a href={bid.attachment} download>
										Download Attachments
									</a>
								</button>
							)}
							<button
								className="btn"
								onClick={() => handleBidStatusChange(bid.bid_id, "Awarded")}
							>
								Accept
							</button>
							<button
								className="btn"
								onClick={() => handleBidStatusChange(bid.bid_id, "Rejected")}
							>
								Reject
							</button>
						</div>
					</div>
				))}

				{loading && <p>Loading...</p>}
				<div className="pagination-buttons">
					{pagination.currentPage > 1 && (
						<button onClick={loadPreviousPage} disabled={loading}>
							Previous Page
						</button>
					)}
					{pagination.currentPage < pagination.totalPages && (
						<button onClick={loadNextPage} disabled={loading}>
							Next Page
						</button>
					)}
				</div>
			</div>
		</main>
	);
};

export default BuyerTenderList;
