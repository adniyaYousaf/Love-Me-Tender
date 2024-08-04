import { useState } from "react";
import "./GrantAccessForm.css";
import { post } from "../TenderClient";
import Logo from "../assets/images/CTY-logo-rectangle.png";

const GrantAccessForm = () => {
	const [role, setRole] = useState("bidder");
	const [buyerDetails, setBuyerDetails] = useState({
		userType: "buyer",
		company: "",
		description: "",
		address: "",
		email: "",
	});

	const [bidderDetails, setBidderDetails] = useState({
		userType: "bidder",
		firstName: "",
		lastName: "",
		email: "",
	});

	const [resgisterStatus, setRegisterStatus] = useState("");

	async function postBuyerDetails(buyerData) {
		try {
			const data = await post("/api/signup", buyerData);
			if (data) {
				setRegisterStatus("Successfully registered.");
			} else {
				setRegisterStatus("Registration failed!");
			}
		} catch (error) {
			setRegisterStatus("Validation Error");
		}
	}

	async function postBidderDetails(bidderData) {
		try {
			const data = await post("/api/signup", bidderData);
			if (data) {
				setRegisterStatus("Successfully registered.");
			} else {
				setRegisterStatus("Registration failed!");
			}
		} catch (error) {
			setRegisterStatus("Validation Error");
		}
	}

	const handleBidderChange = (e) => {
		const { name, value } = e.target;
		setBidderDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	};

	const handleBuyerChange = (e) => {
		const { name, value } = e.target;
		setBuyerDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	};
	const handleBuyerSubmit = (e) => {
		e.preventDefault();
		postBuyerDetails(buyerDetails);
	};

	const handleBidderSubmit = (e) => {
		e.preventDefault();
		postBidderDetails(bidderDetails);
	};

	return (
		<main>
			<div className="container-role" onChange={(e) => setRole(e.target.value)}>
				<label htmlFor="role">Select a role</label>
				<select className="form-input" name="role">
					<option className="grant-access-option" value="buyer">
						Buyer
					</option>
					<option className="grant-access-option" value="bidder">
						Bidder
					</option>
				</select>
			</div>

			{role === "bidder" && (
				<div className="form-container">
					<div className="form-logo">
						<img src={Logo} alt="logo" />
					</div>
					<h1 className="form-heading">Register Bidder</h1>
					<form className="form" onSubmit={handleBidderSubmit}>
						<div className="form-label">
							<label htmlFor="first-name">First Name</label>
							<input
								className="form-input"
								type="text"
								name="first-name"
								placeholder="Enter your first name"
								value={bidderDetails.firstName}
								onChange={handleBidderChange}
								required
							/>
						</div>
						<div className="form-label">
							<label htmlFor="first-name">Last Name</label>
							<input
								className="form-input"
								type="text"
								name="first-name"
								placeholder="Enter your email address"
								value={bidderDetails.firstName}
								onChange={handleBidderChange}
								required
							/>
						</div>
						<div className="form-label">
							<label htmlFor="email">Email</label>
							<input
								className="form-input"
								type="email"
								name="email"
								placeholder="Enter your email address"
								value={bidderDetails.email}
								onChange={handleBidderChange}
								required
							/>
						</div>
						<button className="form-btn grant-access-btn" type="submit">
							Submit
						</button>
					</form>
				</div>
			)}

			{role === "buyer" && (
				<div className="form-container buyer-container">
					<div className="form-logo">
						<img src={Logo} alt="logo" />
					</div>
					<h1 className="form-heading">Register Buyer</h1>
					<form className="form buyer-form" onSubmit={handleBuyerSubmit}>
						<div className="form-label">
							<label htmlFor="company">Company</label>
							<input
								className="form-input"
								type="text"
								id="company"
								name="company"
								placeholder="Enter your company name"
								value={buyerDetails.company}
								onChange={handleBuyerChange}
							/>
						</div>

						<div className="form-label description">
							<label htmlFor="description">Description</label>
							<textarea
								className="form-input textarea"
								type="text"
								id="description"
								name="description"
								placeholder="Enter your company name"
								value={buyerDetails.description}
								onChange={handleBuyerChange}
							/>
						</div>
						<div className="form-label">
							<label htmlFor="email">Email</label>
							<input
								className="form-input"
								type="email"
								id="email"
								name="email"
								placeholder="Enter your email address"
								value={buyerDetails.email}
								onChange={handleBuyerChange}
								required
							/>
						</div>

						<div className="form-label">
							<label htmlFor="address">Address</label>
							<input
								className="form-input"
								type="text"
								id="address"
								name="address"
								placeholder="Enter your address"
								value={buyerDetails.address}
								onChange={handleBuyerChange}
							/>
						</div>
						<button className="form-btn grant-access-btn" type="submit">
							Submit
						</button>
					</form>
				</div>
			)}
			<div>
				<p>{resgisterStatus}</p>
			</div>
		</main>
	);
};

export default GrantAccessForm;
