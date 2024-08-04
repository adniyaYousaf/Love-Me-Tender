import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PublishTenderForm from "./PublishTenderForm";
import BuyerTenderList from "./BuyerTenderList";
import BidderBiddingList from "./BidderBiddingList";
import GrantAccessForm from "./pages/GrantAccessForm";
import AdminDashboard from "./pages/AdminDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import BidderDashboard from "./pages/BidderDashboard";
import TendersList from "./TenderList";
import Header from "./Header";
import Footer from "./Footer";

const App = () => (
	<>
		<Header className="header" />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/publish-tender" element={<PublishTenderForm />} />
			<Route path="/BuyerTenderList" element={<BuyerTenderList />} />
			<Route path="/BidderBiddingList" element={<BidderBiddingList />} />
			<Route path="/grant-access" element={<GrantAccessForm />} />
			<Route path="/admin-dashboard" element={<AdminDashboard />} />
			<Route path="/buyer-dashboard" element={<BuyerDashboard />} />
			<Route path="/bidder-dashboard" element={<BidderDashboard />} />
			<Route path="/list-tenders" element={<TendersList />} />
			<Route path="/list-tenders/page/:pageNumber" element={<TendersList />} />
		</Routes>
		<Footer className="footer" />
	</>
);

export default App;
