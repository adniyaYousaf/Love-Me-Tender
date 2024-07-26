import { useEffect, useState } from "react";


const TenderBiddingList = (id) => {
    const [loading, setLoading] = useState(true);
    const [tenderBids, setTenderbids] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    function dateFormat(date) {
        return date.split("T")[0];
    }

    useEffect(() => {
        const fetchBuyerTenders = async () => {
            try {
                const response = await fetch(`api/single-tender?page=1&id=${id}`);
                if (!response.ok) {
                    throw new Error("Problem with the server!");
                }
                const data = await response.json();
                setLoading(false);
                setTenderbids(data.result);
            } catch (error) {
                setErrorMsg(error.message);
            }
        };
        fetchBuyerTenders();
    }, [id]);

    if (errorMsg !== null) {
        return <div>{errorMsg}</div>;
    }

    if (loading) {
        return <div>Loading!!</div>;
    }

    return (
        <>
            <h1>Tender Biddings</h1>
            <div className="tender-container"> {tenderBids.map((tender, index) =>
                <div className="tender-card" key={index}>
                    <a href="/" className="tender-title">{tender.title}</a>
                    <p>Tender created on: {dateFormat(tender.creation_date)}</p>
                    <div><p>Announcement Date: {dateFormat(tender.announcement_date)}</p><p>Deadline: {dateFormat(tender.deadline)}</p> </div>
                    <p className="tender-description">{tender.description.substring(0, 200)}</p>
                    <p>No of bids: {tender.no_of_bids_recevied}</p>
                    <p>Cost £{tender.cost}</p>
                    <span>Status {tender.status}</span>
                    <span>Last Update: {dateFormat(tender.last_update)}</span>
                </div>
            )}
            </div>
        </>
    );
};

export default TenderBiddingList;
