const nodemailer = require('nodemailer');

const { UKR_NET_EMAIL_FROM, UKR_NET_EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
	host: 'smtp.ukr.net',
	port: 465,
	secure: true,
	auth: {
		user: UKR_NET_EMAIL_FROM,
		pass: UKR_NET_EMAIL_PASSWORD,
	},
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendMail = data => {
	const email = { ...data, from: UKR_NET_EMAIL_FROM };
	return transport.sendMail(email);
};

module.exports = sendMail;
