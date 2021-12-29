"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const prisma_1 = require("../components/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sentry_1 = require("../components/sentry");
const nodemailer_1 = __importDefault(require("nodemailer"));
const aws_1 = require("../components/aws");
const aws = __importStar(require("@aws-sdk/client-ses"));
// create Nodemailer SES transporter
let transporter = nodemailer_1.default.createTransport({
    SES: { ses: aws_1.ses, aws },
});
exports.contactService = {
    async makeHash(ip) {
        const salt = await bcryptjs_1.default.genSalt(3);
        const hash = await bcryptjs_1.default.hash(ip, salt);
        prisma_1.prisma.hashes
            .create({
            data: {
                hash: hash,
            },
        })
            .catch((err) => {
            throw new sentry_1.PublicError(err);
        });
        return hash;
    },
    async testHash(hash) {
        const record = await prisma_1.prisma.hashes
            .findUnique({
            where: {
                hash: hash,
            },
        })
            .catch((err) => {
            throw new sentry_1.PublicError(err);
        });
        if (!record)
            return false;
        return record;
    },
    async send(name, email, subject, message, hash, honeypot) {
        // Hidden value filled out is likely spam
        if (honeypot)
            return false;
        const timestamp = await this.testHash(hash);
        if (!timestamp)
            return false;
        const discrepency = Date.now() - new Date(timestamp.timestamp).getTime();
        // Form submitted in under five seconds is likely spam
        if (discrepency / 1000 < 5)
            return false;
        const body = `<p>New message via the contact form at [placeholder domamin].</p>\n<p>From Name: <span style="background: #ffeff0;padding: .1rem .3rem .2rem;border-radius: .2rem;">${name}</span></p>\n<p>From Email: <a href="mailto:${email}" target="_blank" rel="noopener noreferrer" style="background: #ffeff0;padding: .1rem .3rem .2rem;border-radius: .2rem;">${email}</a></p>\n<p>Subject: <span style="background: #ffeff0;padding: .1rem .3rem .2rem;border-radius: .2rem;">${subject}</span></p>\n<p>Message:\n<div style="background: #ffeff0;padding: .1rem .3rem .2rem;border-radius: .2rem;">${message}</div></p>`;
        transporter.sendMail({
            from: "NPHA <noreply@codingprojects.org>",
            to: 'zmontgo@pm.me',
            subject: `New Message - '${subject}'`,
            html: body,
        }, (err, info) => {
            console.log(info);
            if (err) {
                throw new sentry_1.PublicError(err.message);
            }
        });
        return true;
    },
    async sendFeedback(name, email, message, review, hash, honeypot) {
        // Hidden value filled out is likely spam
        if (honeypot)
            return false;
        const timestamp = await this.testHash(hash);
        if (!timestamp)
            return false;
        const discrepency = Date.now() - new Date(timestamp.timestamp).getTime();
        // Form submitted in under five seconds is likely spam
        if (discrepency / 1000 < 5)
            return false;
        const allow = review == "on" ? true : false;
        const body = `<p>New message via the feedback form at [placeholder domamin].</p>\n<p>From Name: <span style="background: #ffeff0;padding: .1rem .3rem .2rem;border-radius: .2rem;">${name}</span></p>\n<p>From Email: <a href="mailto:${email}" target="_blank" rel="noopener noreferrer" style="background: #ffeff0;padding: .1rem .3rem .2rem;border-radius: .2rem;">${email}</a></p>\n<p>Message:\n<div style="background: #ffeff0;padding: .1rem .3rem .2rem;border-radius: .2rem;">${message}</div></p>\n<p>Allows review to be posted: <span style="background: #ffeff0;padding: .1rem .3rem .2rem;border-radius: .2rem;">${allow ? 'yes' : 'no'}</span></p>`;
        transporter.sendMail({
            from: "NPHA <noreply@codingprojects.org>",
            to: 'zmontgo@pm.me',
            subject: `New Feedback`,
            html: body,
        }, (err, info) => {
            console.log(info);
            if (err) {
                throw new sentry_1.PublicError(err.message);
            }
        });
        return true;
    },
};
//# sourceMappingURL=contact.service.js.map