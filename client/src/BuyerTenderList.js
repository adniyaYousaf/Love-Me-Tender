import { useEffect, useState } from "react";

const BuyerTenderList = (props) => {
    const [loading, setLoading] = useState(true);
    const [buyerTenders, setBuyerTenders] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    function dateFormat(date) {
        return date.split("T")[0];
    }

    useEffect(() => {
        const fetchBuyerTenders = async () => {
            try {
                const response = await fetch(`api/buyerTender/${props.buyerID}`);
                if (!response.ok) {
                    throw new Error("Buyer tenders not found!");
                }
                const data = await response.json();
                setLoading(false);
                setBuyerTenders(data);
            } catch (error) {
                setErrorMsg(error.message);
            }
        };
        fetchBuyerTenders();
    }, [props.buyerID]);

    if (errorMsg !== null) {
        return <div>Something went wrong!</div>;
    }

    if (loading) {
        return <div>Loading!!</div>;
    }

    return (
        <>
            <h1>Buyer Tender List</h1>
            <div className="tender-container"> {buyerTenders.slice(0, 24).map((tender, index) =>
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

export default BuyerTenderList;
