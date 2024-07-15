import { Router } from "express";
import mail from "./mail.js";
import logger from "./utils/logger";

const router = Router();

router.post("/send-email", async (req, res) => {
	const { email } = req.body;
	if (!email) {
		return res.status(400).send("Email is required.");
	}
	const subject = "New password";
	const recipient = email;
	const message = "Your passwors is ******.";
	try {
		await mail.sendEmail({ recipient, subject, message });
		res.send("Email sent.");
	} catch (error) {
		logger.error("Error sending email:", error);
		res.status(500).send("Failed to send email.");
	}
});

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

export default router;
