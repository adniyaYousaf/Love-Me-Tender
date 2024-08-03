import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get } from "./TenderClient";

const BuyerTenderList = () => {
	const { pageNumber } = useParams();
	const currentPage = pageNumber ? parseInt(pageNumber, 10) : 1;
	const [buyerTenders, setBuyerTender] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState({
		itemsPerPage: 25,
		currentPage: currentPage,
		totalPages: 1,
	});

	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const fetchBuyerTenders = async (page) => {
		setLoading(true);
		try {
			const data = await get(`/api/buyer-tender?page=${page}`);
			if (data && data.results && data.pagination) {
				setBuyerTender(data.results);
				setPagination(data.pagination);
				setError(null);
			} else {
				throw new Error("Server error");
			}
		} catch (error) {
			setError("Error fetching tenders: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	console.log(buyerTenders);
	useEffect(() => {
		fetchBuyerTenders(currentPage);
	}, [currentPage]);

	const loadNextPage = () => {
		if (pagination.currentPage < pagination.totalPages && !loading) {
			navigate(`/dashboard/page/${pagination.currentPage + 1}`);
		}
	};

	const loadPreviousPage = () => {
		if (pagination.currentPage > 1 && !loading) {
			navigate(`/dashboard/page/${pagination.currentPage - 1}`);
		}
	};

	return (
		<main>
			<div className="tenders-container">
				<h2>My Tenders</h2>
				{error && <p className="error-message">{error}</p>}
				<table className="tenders-table">
					<thead>
						<tr>
							<th>Tender ID</th>
							<th>Tender Title</th>
							<th>Tender Created Date</th>
							<th>Tender Announcement Date</th>
							<th>Tender Project Deadline Date</th>
							<th>Tender Status</th>
						</tr>
					</thead>
					<tbody>
						{buyerTenders.map((tender) => (
							<tr key={tender.id}>
								<td>{tender.id}</td>
								<td>{tender.title}</td>
								<td>{new Date(tender.creation_date).toLocaleDateString()}</td>
								<td>
									{new Date(tender.announcement_date).toLocaleDateString()}
								</td>
								<td>{new Date(tender.deadline).toLocaleDateString()}</td>
								<td>{tender.status}</td>
							</tr>
						))}
					</tbody>
				</table>
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
