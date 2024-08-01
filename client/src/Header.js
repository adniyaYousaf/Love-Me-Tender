import Logo from "./assets/images/CTY-logo-rectangle.png";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = ({ role }) => {
	return (
		<header className="header">
			<img className="logo" src={Logo} alt="Code Your Future logo" />
			<nav className="nav-list">
				<li>
					<NavLink exact to="/" className="nav-link" activeClassName="active">
						Home{" "}
					</NavLink>
				</li>
				<li>
					<NavLink
						exact
						to="/list-tenders"
						className="nav-link"
						activeClassName="active"
					>
						All Tenders{" "}
					</NavLink>
				</li>

				{role === "admin" && (
					<>
						<NavLink
							exact
							to="/list-tenders"
							className="nav-link"
							activeClassName="active"
						>
							All Tenders{" "}
						</NavLink>
						<>
							<NavLink
								exact
								to="/signup"
								className="nav-link"
								activeClassName="active"
							>
								Grant Access{" "}
							</NavLink>
						</>
					</>
				)}

				{role === "buyer" && (
					<>
						<NavLink
							exact
							to="/list-tenders"
							className="nav-link"
							activeClassName="active"
						>
							All Tenders{" "}
						</NavLink>
						<>
							<NavLink
								exact
								to="/BuyerTenderList"
								className="nav-link"
								activeClassName="active"
							>
								My Tenders{" "}
							</NavLink>
							<NavLink
								exact
								to="/publish-tender"
								className="nav-link"
								activeClassName="active"
							>
								Publish Tenders{" "}
							</NavLink>
						</>
					</>
				)}

				{role === "bidder" && (
					<>
						<NavLink
							exact
							to="/list-tenders"
							className="nav-link"
							activeClassName="active"
						>
							All Tenders{" "}
						</NavLink>
						<>
							<NavLink
								exact
								to="/BidderBiddingList"
								className="nav-link"
								activeClassName="active"
							>
								My bids{" "}
							</NavLink>
						</>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
