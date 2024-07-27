/* eslint-disable indent */
import { Router } from "express";
import db from "./db";

const router = Router();

router.get("/", (_, res) => {
	res.status(200).json({ message: "WELCOME TO LOVE ME TENDER SITE" });
});

router.get("/skills", (req, res) => {
	const skills = [
		"Website",
		"Android",
		"iOS",
		"Backend",
		"Frontend",
		"Full-stack",
	];

	skills.sort();

	res.status(200).json({ skills });
});

router.post("/publish-tenders", (req, res) => {
	const formData = req.body;

	const newErrors = [];

	if (
		!formData.title ||
		formData.title.length < 10 ||
		formData.title.length > 50
	) {
		newErrors.push("Tender Title must be between 10 and 50 characters.");
	}

	if (
		!formData.description ||
		formData.description.length < 100 ||
		formData.description.length > 7500
	) {
		newErrors.push(
			"Tender Description must be between 100 and 7500 characters."
		);
	}

	const today = new Date().toISOString().split("T")[0];
	if (formData.closingDate < today) {
		newErrors.push("Tender Closing Date cannot be in the past.");
	}

	if (formData.announcementDate > formData.closingDate) {
		newErrors.push("Tender Announcement Date must be before the Closing Date.");
	}

	if (formData.deadlineDate < formData.announcementDate) {
		newErrors.push(
			"Tender Project Deadline Date must be after the Announcement Date."
		);
	}

	if (formData.selectedSkills.length === 0) {
		newErrors.push("Please select at least one skill.");
	}

	if (newErrors.length > 0) {
		return res.status(400).json({ errors: newErrors });
	}

	res.status(200).json({ message: "Form submitted successfully!" });
});

router.get("/buyer-tender", async (req, res) => {
	const buyerId = 1;
	let page = parseInt(req.query.page) || 1;
	const itemsPerPage = 25;

	const offset = (page - 1) * itemsPerPage;
	const result = await db.query(
		"SELECT * FROM tender WHERE buyer_id = $1 LIMIT $2 OFFSET $3",
		[buyerId, itemsPerPage, offset]
	);
	result
		? res.send(result.rows)
		: res.status(500).send({ code: "SERVER_ERROR" });
});

router.get("/bidder-bid", async (req, res) => {
	const bidderId = 1;
	let page = parseInt(req.query.page) || 1;
	const itemsPerPage = 25;

	const offset = (page - 1) * itemsPerPage;
	const result = await db.query(
		"SELECT * FROM bid WHERE bidder_id = $1 LIMIT $2 OFFSET $3",
		[bidderId, itemsPerPage, offset]
	);
	result
		? res.send(result.rows)
		: res.status(500).send({ code: "SERVER_ERROR" });
});

router.get("/tenders", async (req, res) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = 25;
	const offset = (page - 1) * limit;

	const countSql = "SELECT COUNT(*) FROM tender";
	const dataSql = `
		SELECT id, title, creation_date, announcement_date, deadline, status 
		FROM tender 
		ORDER BY creation_date DESC 
		LIMIT $1 OFFSET $2
	`;
	try {
		const countResult = await db.query(countSql);
		const totalItems = parseInt(countResult.rows[0].count, 10);
		const totalPages = Math.ceil(totalItems / limit);

		const dataResult = await db.query(dataSql, [limit, offset]);
		const tenders = dataResult.rows;

		res.status(200).json({
			results: tenders,
			pagination: {
				itemsPerPage: limit,
				currentPage: page,
				totalPages,
			},
		});
	} catch (err) {
		res.status(500).json({ code: "SERVER_ERROR" });
	}
});

router.get("/tender/:id", async (req, res) => {
	const tenderID = parseInt(req.params.id);
	let page = parseInt(req.query.page) || 1;
	const itemsPerPage = 10;
	const totalBids = await db.query(
		"SELECT COUNT(tender_id) FROM bid WHERE tender_id = $1",
		[tenderID]
	);
	const totalPages = Math.ceil(totalBids.rows[0].count / itemsPerPage);
	const offset = (page - 1) * itemsPerPage;

	const result = await db.query(
		"SELECT * FROM bid WHERE tender_id = $1 LIMIT $2 OFFSET $3",
		[tenderID, itemsPerPage, offset]
	);
	result
		? res.send({
				results: result.rows,
				pagination: {
					itemsPerPage: 10,
					currentPage: page,
					totalPages: totalPages,
				},
		  })
		: res.status(500).send({ code: "SERVER_ERROR" });
});

router.post("/bid/:bidId/status", async (req, res) => {
	const bidId = parseInt(req.params.bidId, 10);
	const status = req.body.status;
	const validStatuses = ["Awarded", "Rejected", "Withdraw", "In review"];

	if (!validStatuses.includes(status)) {
		return res.status(400).send({ code: "INVALID_STATUS" });
	}

	try {
		await db.query("BEGIN");

		const tenderResult = await db.query(
			"SELECT tender_id FROM bid WHERE bid_id = $1;",
			[bidId]
		);

		if (tenderResult.rowCount === 0) {
			await db.query("ROLLBACK");
			return res.status(404).send({ code: "BID_NOT_FOUND" });
		}

		const tenderId = parseInt(tenderResult.rows[0].tender_id, 10);

		if (status === "Awarded") {
			const rejectStatus = "Rejected";

			const awardBidResult = await db.query(
				"UPDATE bid SET status = $1 WHERE tender_id = $2 AND bid_id = $3;",
				[status, tenderId, bidId]
			);

			const rejectOtherBidsResult = await db.query(
				"UPDATE bid SET status = $1 WHERE tender_id = $2 AND bid_id != $3;",
				[rejectStatus, tenderId, bidId]
			);

			if (awardBidResult.rowCount > 0 && rejectOtherBidsResult.rowCount > 0) {
				await db.query("COMMIT");
				return res.status(200).send({ code: "Success" });
			} else {
				await db.query("ROLLBACK");
				return res.status(500).send({ code: "SERVER_ERROR" });
			}
		} else {
			const updateBidResult = await db.query(
				"UPDATE bid SET status = $1 WHERE tender_id = $2 AND bid_id = $3;",
				[status, tenderId, bidId]
			);

			if (updateBidResult.rowCount > 0) {
				await db.query("COMMIT");
				return res.status(200).send({ code: "Success" });
			} else {
				await db.query("ROLLBACK");
				return res.status(500).send({ code: "SERVER_ERROR" });
			}
		}
	} catch (error) {
		await db.query("ROLLBACK");
		return res.status(500).send({ code: "SERVER_ERROR", error: error.message });
	}
});

export default router;
