import { useEffect, useState } from "react";

const BidderBiddingList = () => {
    const [loading, setLoading] = useState(true);
    const [bidderList, setBidderList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [page, setPage] = useState(1);

    function dateFormat(date) {
        return date.split("T")[0];
    }

    useEffect(() => {
        const fetchBidderBids = async () => {
            try {
                const response = await fetch(`api/bidder-bid?page=${page}`);
                if (!response.ok) {
                    throw new Error("Problem with the server!");
                }
                const data = await response.json();
                setLoading(false);
                setBidderList(data);
            } catch (error) {
                setErrorMsg(error.message);
            }
        };
        fetchBidderBids();
    }, [page]);

    if (errorMsg !== null) {
        return <div>{errorMsg}</div>;
    }

    if (loading) {
        return <div>Loading!!</div>;
    }

    return (
        <>
            <h1>Buyer Tenders List</h1>
            <div className="bids-container"> {bidderList.map((bid, index) =>
                <div className="bid-card" key={index}>
                    <p>Status: {bid.status}</p>
                    <p>submitted on: {dateFormat(bid.bidding_date)}</p>
                    <p>Bidding Amount: {bid.bidding_amount}</p>
                    <div>Cover Letter:
                        <p>{bid.cover_letter}</p>
                    </div>
                    <p>Completion Time: {bid.suggested_duration_days} days</p>
                </div>
            )}
                <button className={bidderList.length < 25 ? "show" : "hide"} onClick={() => setPage((prev) => prev - 1)}>Back</button>

                <button className={bidderList.length < 25 ? "hide" : "show"} onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
            </div>
        </>
    );
};

export default BidderBiddingList;
