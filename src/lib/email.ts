import mailjet from 'node-mailjet';
import { nanoid } from 'nanoid';

const client = mailjet.connect(
    process.env.MAILJET_API_KEY!,
    process.env.MAILJET_API_SECRET!,
);

export const sendEmail = async (
    recipient: { email: string; name?: string },
    subject: string,
    content: { html: string; text: string },
) => {
    const response = await client.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'info@nieky.dev',
                    Name: 'Nieky',
                },
                To: [
                    {
                        Email: recipient.email,
                        Name: recipient.name,
                    },
                ],
                Subject: subject,
                TextPart: content.text,
                HTMLPart: content.html,
                CustomID: nanoid(),
            },
        ],
    });

    return response;
};

export const sendLoginEmail = async (email: string, userInputCode: string) => {
    const content = {
        html: `<h3>Welcome to Watch What?</h3><p>Use this code to authenticate: ${userInputCode}</p>`,
        text: `Welcome to Watch What?\n\nUse this code to authenticate: ${userInputCode}`,
    };

    const resp = await sendEmail({ email }, 'Welcome to Watch What?', content);

    return resp;
};
