interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
}
export default class EmailService {
    static sendEmail(mailOptions: MailOptions): Promise<void>;
    static sendVerificationEmail(userEmail: string, token: string): Promise<void>;
    static sendResetPasswordEmail(userEmail: string, token: string): Promise<void>;
}
export {};
//# sourceMappingURL=EmailService.d.ts.map