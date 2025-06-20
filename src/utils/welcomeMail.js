import nodemailer from 'nodemailer'
import { generateEmailHeader } from './emailHeader.js'
import { generateEmailFooter } from './emailFooter.js'
import { generateWelcomeContent } from './emailContent.js'

export async function sendEmail(name, email) {

    const config = {
        service: 'gmail',
        auth: {
            user: "rohitkumarchau656@gmail.com",
            pass: "pihc knoi rbca lrif"
        }
    }

    try {
        const createMail = nodemailer.createTransport(config);
        await createMail.sendMail({

            from: { name: "Doctor's Journey", address: 'rohitkumarchau656@gmail.com' },
            to: email.trim(),
            subject: "Welcome to Doctor's Journey",
            html: `<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome Emailer</title>
</head>

<body>
    <div style="width:100%;font-family:arial,'helvetica neue',helvetica,sans-serif;padding:0;Margin:0">
        <div style="background-color:#fff">
            <table cellpadding="0" cellspacing="0"
                style="border-collapse:collapse;border-spacing:0;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#fff"
                width="100%">
                <tbody>
                    <tr>
                        <td style="padding:0;Margin:0" valign="top">
                            <table cellpadding="0" cellspacing="0"
                                style="border-collapse:collapse;border-spacing:0;table-layout:fixed!important;width:100%"
                                align="center">
                                <tbody>
                                    <tr>
                                        <td style="padding:0;Margin:0;background-color:#f7f7f7" align="center"
                                            bgcolor="#f7f7f7">
                                            <table cellpadding="0" cellspacing="0"
                                                style="border-collapse:collapse;border-spacing:0;background-color:transparent;width:600px"
                                                align="center">
                                                <tbody>
                                                    ${generateEmailHeader()}
                                                    ${generateWelcomeContent(name)}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            ${generateEmailFooter()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>`

        })

        return true;

    } catch (error) {

        console.log(error);
        return false;
    }

}