import nodemailer from 'nodemailer'

export async function sendEmail(name,email) {

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
                                                    <tr>
                                                        <td style="padding:0;Margin:0" align="left">
                                                            <table cellpadding="0" cellspacing="0"
                                                                style="border-collapse:collapse;border-spacing:0"
                                                                width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:0;Margin:0;width:135px"
                                                                            align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                width="100%" role="presentation">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0;width:175px;font-size:0"
                                                                                            align="center" valign="top">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0;background-color:#fff"
                                                                                                width="100%"
                                                                                                role="presentation"
                                                                                                bgcolor="#ffffff">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;background-color:#d8eaf5"
                                                                                                            align="left"
                                                                                                            bgcolor="#d8eaf5">
                                                                                                            <table
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                                width="100%"
                                                                                                                role="presentation">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="padding:0;Margin:0;width:135px"
                                                                                                                            align="center"
                                                                                                                            valign="top">
                                                                                                                            <table
                                                                                                                                cellpadding="0"
                                                                                                                                cellspacing="0"
                                                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                                                width="100%"
                                                                                                                                role="presentation">
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td style="padding:0;Margin:0;padding-right:5px;padding-bottom:10px;font-size:0"
                                                                                                                                            align="right">
                                                                                                                                            <a href="https://doctorsjourney.in/"
                                                                                                                                                style="text-decoration:underline;color:#666;font-size:14px"
                                                                                                                                                target="_blank"><img
                                                                                                                                                    alt="Doctor logo"
                                                                                                                                                    height="63"
                                                                                                                                                    src="./images/logo.png"
                                                                                                                                                    style="display:block;border:0;outline:0;text-decoration:none"
                                                                                                                                                    width="130"
                                                                                                                                                    align="center"
                                                                                                                                                    data-image-whitelisted=""
                                                                                                                                                    data-bit="iit"></a>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:0;Margin:0;background-color:#d8eaf5"
                                                            align="left" bgcolor="#d8eaf5">
                                                            <table cellpadding="0" cellspacing="0"
                                                                style="border-collapse:collapse;border-spacing:0"
                                                                width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:0;Margin:0;width:600px"
                                                                            align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                width="100%" role="presentation">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0"
                                                                                            align="center">
                                                                                            <img alt="Doctor Journey"
                                                                                                height="245"
                                                                                                src="./images/emailer-banner.png"
                                                                                                style="display:block;border:0;outline:0;text-decoration:none"
                                                                                                width="600"
                                                                                                align="center"
                                                                                                data-image-whitelisted=""
                                                                                                data-bit="iit"
                                                                                                tabindex="0" />

                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:0;Margin:0;padding-top:15px;padding-left:40px;padding-right:40px;background-color:#fff"
                                                            align="left" bgcolor="#ffffff">
                                                            <table cellpadding="0" cellspacing="0"
                                                                style="border-collapse:collapse;border-spacing:0"
                                                                width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:0;Margin:0;width:520px"
                                                                            align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                width="100%" role="presentation">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0;padding-bottom:10px"
                                                                                            align="left">
                                                                                            <p
                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                Dear ${name[0].toUpperCase() + name.slice(1, name.length)},
                                                                                                <br>
                                                                                                <br> Thank you for
                                                                                                joining DoctorsJourney.
                                                                                                <br>
                                                                                                <br> We’re excited to be
                                                                                                part of your
                                                                                                professional journey and
                                                                                                are here to support your
                                                                                                continuous learning with
                                                                                                expert-curated medical
                                                                                                journals and resources.
                                                                                                <br>
                                                                                                <br> To give you a
                                                                                                seamless and enriching
                                                                                                experience, we’ve
                                                                                                created a one-stop
                                                                                                online platform where
                                                                                                you can:
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                width="100%"
                                                                                                role="presentation">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:0;border:0"
                                                                                                            align="left"
                                                                                                            valign="top"
                                                                                                            id="m_2792007221966242393esd-menu-id-0"
                                                                                                            width="100%">
                                                                                                            <p
                                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                                <img alt="Decorative Icon"
                                                                                                                    height="25"
                                                                                                                    src="./images/check.png"
                                                                                                                    style="border:0;outline:0;text-decoration:none;padding-right:5px"
                                                                                                                    width="25"
                                                                                                                    title="Decorative Icon"
                                                                                                                    align="center"
                                                                                                                    data-image-whitelisted=""
                                                                                                                    data-bit="iit">Explore
                                                                                                                Latest
                                                                                                                Medical
                                                                                                                Journals
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                width="100%"
                                                                                                role="presentation">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:0;border:0"
                                                                                                            align="left"
                                                                                                            valign="top"
                                                                                                            id="m_2792007221966242393esd-menu-id-0"
                                                                                                            width="100%">
                                                                                                            <p
                                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                                <img alt="Decorative Icon"
                                                                                                                    height="25"
                                                                                                                    src="./images/check.png"
                                                                                                                    style="border:0;outline:0;text-decoration:none;padding-right:5px"
                                                                                                                    width="25"
                                                                                                                    title="Decorative Icon"
                                                                                                                    align="center"
                                                                                                                    data-image-whitelisted=""
                                                                                                                    data-bit="iit">Access
                                                                                                                Peer-Reviewed
                                                                                                                Articles
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                width="100%"
                                                                                                role="presentation">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:0;border:0"
                                                                                                            align="left"
                                                                                                            valign="top"
                                                                                                            id="m_2792007221966242393esd-menu-id-0"
                                                                                                            width="100%">
                                                                                                            <p
                                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                                <img alt="Decorative Icon"
                                                                                                                    height="25"
                                                                                                                    src="./images/check.png"
                                                                                                                    style="border:0;outline:0;text-decoration:none;padding-right:5px"
                                                                                                                    width="25"
                                                                                                                    title="Download your Policy Certificate / Health ID Card"
                                                                                                                    align="center"
                                                                                                                    data-image-whitelisted=""
                                                                                                                    data-bit="iit">Search
                                                                                                                Speciality-Specific
                                                                                                                Publications
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                width="100%"
                                                                                                role="presentation">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:0;border:0"
                                                                                                            align="left"
                                                                                                            valign="top"
                                                                                                            id="m_2792007221966242393esd-menu-id-0"
                                                                                                            width="100%">
                                                                                                            <p
                                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                                <img alt="Decorative Icon"
                                                                                                                    height="25"
                                                                                                                    src="./images/check.png"
                                                                                                                    style="border:0;outline:0;text-decoration:none;padding-right:5px"
                                                                                                                    width="25"
                                                                                                                    title="Decorative Icon"
                                                                                                                    align="center"
                                                                                                                    data-image-whitelisted=""
                                                                                                                    data-bit="iit">Bookmark
                                                                                                                and Save
                                                                                                                Key
                                                                                                                Resources
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                width="100%"
                                                                                                role="presentation">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:0;border:0"
                                                                                                            align="left"
                                                                                                            valign="top"
                                                                                                            id="m_2792007221966242393esd-menu-id-0"
                                                                                                            width="100%">
                                                                                                            <p
                                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                                <img alt="Decorative Icon"
                                                                                                                    height="25"
                                                                                                                    src="./images/check.png"
                                                                                                                    style="border:0;outline:0;text-decoration:none;padding-right:5px"
                                                                                                                    width="25"
                                                                                                                    title="Decorative Icon"
                                                                                                                    align="center"
                                                                                                                    data-image-whitelisted=""
                                                                                                                    data-bit="iit">Download
                                                                                                                Certificates
                                                                                                                of
                                                                                                                Completion
                                                                                                                (for
                                                                                                                CPD/CME,
                                                                                                                if
                                                                                                                applicable)
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                width="100%"
                                                                                                role="presentation">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:0;border:0"
                                                                                                            align="left"
                                                                                                            valign="top"
                                                                                                            id="m_2792007221966242393esd-menu-id-0"
                                                                                                            width="100%">
                                                                                                            <p
                                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                                <img alt="Decorative Icon"
                                                                                                                    height="25"
                                                                                                                    src="./images/check.png"
                                                                                                                    style="border:0;outline:0;text-decoration:none;padding-right:5px"
                                                                                                                    width="25"
                                                                                                                    title="Decorative Icon"
                                                                                                                    align="center"
                                                                                                                    data-image-whitelisted=""
                                                                                                                    data-bit="iit">Track
                                                                                                                Your
                                                                                                                Reading
                                                                                                                History
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                width="100%"
                                                                                                role="presentation">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0"
                                                                                                            align="left"
                                                                                                            valign="top"
                                                                                                            id="m_2792007221966242393esd-menu-id-0"
                                                                                                            width="100%">
                                                                                                            <p
                                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                                <img alt="Decorative Icon"
                                                                                                                    height="25"
                                                                                                                    src="./images/check.png"
                                                                                                                    style="border:0;outline:0;text-decoration:none;padding-right:5px"
                                                                                                                    width="25"
                                                                                                                    title="Decorative Icon"
                                                                                                                    align="center"
                                                                                                                    data-image-whitelisted=""
                                                                                                                    data-bit="iit">Stay
                                                                                                                Updated
                                                                                                                with the
                                                                                                                Latest
                                                                                                                in
                                                                                                                Medicine
                                                                                                                and
                                                                                                                Healthcare
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0;padding-bottom:10px"
                                                                                            align="left">
                                                                                            <p
                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                Our platform is
                                                                                                accessible anytime
                                                                                                through your browser—no
                                                                                                app needed! If you need
                                                                                                any assistance, feel
                                                                                                free to reach us at:
                                                                                                <a href="mailto:helpdesk@gmail.com"
                                                                                                    style="text-decoration:none;color:#1650e2;font-size:14px"
                                                                                                    target="_blank">helpdesk@gmail.com</a>
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td style="padding:0;Margin:0;padding-left:40px;padding-right:40px;background-color:#fff"
                                                            align="left" bgcolor="#ffffff">
                                                            <table cellpadding="0" cellspacing="0"
                                                                style="border-collapse:collapse;border-spacing:0"
                                                                width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:0;Margin:0;width:520px"
                                                                            align="left">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                width="100%" role="presentation">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px"
                                                                                            align="left">
                                                                                            <p
                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                We’re here to support
                                                                                                your learning and
                                                                                                professional
                                                                                                growth—every step of the
                                                                                                way.
                                                                                                <br>
                                                                                                <br>
                                                                                            </p>
                                                                                            <p
                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                <b>Stay informed, stay
                                                                                                    empowered.</b>
                                                                                            </p>
                                                                                            <p
                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                <b>– Team
                                                                                                    DoctorsJourney</b>
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#fff"
                                                            align="left" bgcolor="#ffffff">
                                                            <table cellpadding="0" cellspacing="0"
                                                                style="border-collapse:collapse;border-spacing:0"
                                                                width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:0;Margin:0;width:560px"
                                                                            align="left">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                width="100%" role="presentation">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0"
                                                                                            align="center" height="15">
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table cellpadding="0" cellspacing="0"
                                style="border-collapse:collapse;border-spacing:0;table-layout:fixed!important;width:100%"
                                align="center">
                                <tbody>
                                    <tr>
                                        <td style="padding:0;Margin:0;background-color:#f7f7f7" align="center"
                                            bgcolor="#f7f7f7">
                                            <table cellpadding="0" cellspacing="0"
                                                style="border-collapse:collapse;border-spacing:0;background-color:#fff;width:600px"
                                                align="center" bgcolor="#ffffff">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding:10px;Margin:0;background-color:#fff"
                                                            align="left" bgcolor="#ffffff">

                                                            <table cellpadding="0" cellspacing="0"
                                                                style="border-collapse:collapse;border-spacing:0;float:left"
                                                                align="left">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:0;Margin:0;width:10px"></td>
                                                                        <td style="padding:0;Margin:0;width:270px"
                                                                            align="left">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                style="border-collapse:separate;border-spacing:0;background-color:#d8eaf5;border-radius:7px"
                                                                                width="100%" role="presentation"
                                                                                bgcolor="#d8eaf5">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0;padding-right:5px;padding-top:10px;padding-left:10px;width:55px;font-size:0"
                                                                                            align="left" valign="top">
                                                                                            <a href="https://doctorsjourney.in/"
                                                                                                style="text-decoration:underline;color:#666;font-size:14px"
                                                                                                target="_blank"><img
                                                                                                    alt="Website"
                                                                                                    height="48"
                                                                                                    src="./images/website.png"
                                                                                                    style="display:block;border:0;outline:0;text-decoration:none"
                                                                                                    width="48"
                                                                                                    align="center"
                                                                                                    data-image-whitelisted=""
                                                                                                    data-bit="iit"></a>
                                                                                        </td>
                                                                                        <td style="padding:0;Margin:0"
                                                                                            align="left">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                width="100%"
                                                                                                role="presentation">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="padding:0;Margin:0;padding-right:10px;padding-top:15px"
                                                                                                            align="left">
                                                                                                            <h3
                                                                                                                style="Margin:0;line-height:18px;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:15px;font-style:normal;font-weight:700;color:#333">
                                                                                                                <a href="https://doctorsjourney.in/"
                                                                                                                    style="text-decoration:none;color:#666;font-size:15px"
                                                                                                                    target="_blank">Website</a>
                                                                                                            </h3>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px"
                                                                                                            align="left">
                                                                                                            <p
                                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                                <a href="https://doctorsjourney.in/"
                                                                                                                    style="text-decoration:none;color:#666;font-size:14px"
                                                                                                                    target="_blank">doctorsjourney.in</a>
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                        <td style="padding:0;Margin:0;width:10px"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <table cellpadding="0" cellspacing="0"
                                                                style="border-collapse:collapse;border-spacing:0;float:left"
                                                                align="left">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:0;Margin:0;width:10px"></td>
                                                                        <td style="padding:0;Margin:0;width:270px"
                                                                            align="left">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                style="border-collapse:separate;border-spacing:0;background-color:#d8eaf5;border-radius:7px"
                                                                                width="100%" role="presentation"
                                                                                bgcolor="#d8eaf5">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0;padding-right:5px;padding-top:10px;padding-left:10px;width:55px;font-size:0"
                                                                                            align="left" valign="top">
                                                                                            <a href="tel:9599155960"
                                                                                                style="text-decoration:underline;color:#666;font-size:14px"
                                                                                                target="_blank"><img
                                                                                                    alt="Toll free"
                                                                                                    height="50"
                                                                                                    src="./images/toll-free.png"
                                                                                                    style="display:block;border:0;outline:0;text-decoration:none"
                                                                                                    width="50"
                                                                                                    align="center"
                                                                                                    data-image-whitelisted=""
                                                                                                    data-bit="iit"></a>
                                                                                        </td>
                                                                                        <td style="padding:0;Margin:0"
                                                                                            align="left">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                width="100%"
                                                                                                role="presentation">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="padding:0;Margin:0;padding-right:10px;padding-top:15px"
                                                                                                            align="left">
                                                                                                            <h3
                                                                                                                style="Margin:0;line-height:18px;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:15px;font-style:normal;font-weight:700;color:#333">
                                                                                                                <a href="tel:9599155960"
                                                                                                                    style="text-decoration:none;color:#666;font-size:15px"
                                                                                                                    target="_blank">Toll-free</a>
                                                                                                            </h3>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px"
                                                                                                            align="left">
                                                                                                            <p
                                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                                <a href="tel:9599155960"
                                                                                                                    style="text-decoration:none;color:#666;font-size:14px"
                                                                                                                    target="_blank">+91
                                                                                                                    9599155960
                                                                                                                </a>
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td style="padding:10px;Margin:0;background-color:#fff"
                                                            align="left" bgcolor="#ffffff">

                                                            <table cellpadding="0" cellspacing="0"
                                                                style="border-collapse:collapse;border-spacing:0;float:left"
                                                                align="left">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:0;Margin:0;width:100px"></td>
                                                                        <td style="padding:0;Margin:0;width:400px"
                                                                            align="left">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                style="border-collapse:separate;border-spacing:0;background-color:#d8eaf5;border-radius:7px"
                                                                                width="100%" role="presentation"
                                                                                bgcolor="#d8eaf5">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0;padding-right:5px;padding-top:10px;padding-left:10px;width:55px;font-size:0"
                                                                                            align="left" valign="top">
                                                                                            <a href="https://doctorsjourney.in/"
                                                                                                style="text-decoration:underline;color:#666;font-size:14px"
                                                                                                target="_blank"><img
                                                                                                    alt="Address"
                                                                                                    height="48"
                                                                                                    src="./images/location.png"
                                                                                                    style="display:block;border:0;outline:0;text-decoration:none"
                                                                                                    width="48"
                                                                                                    align="center"
                                                                                                    data-image-whitelisted=""
                                                                                                    data-bit="iit"></a>
                                                                                        </td>
                                                                                        <td style="padding:0;Margin:0"
                                                                                            align="left">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                width="100%"
                                                                                                role="presentation">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="padding:0;Margin:0;padding-right:10px;padding-top:15px"
                                                                                                            align="left">
                                                                                                            <h3
                                                                                                                style="Margin:0;line-height:18px;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:15px;font-style:normal;font-weight:700;color:#333">
                                                                                                                <a href="https://doctorsjourney.in/"
                                                                                                                    style="text-decoration:none;color:#666;font-size:15px"
                                                                                                                    target="_blank">Address</a>
                                                                                                            </h3>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px"
                                                                                                            align="left">
                                                                                                            <p
                                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333;font-size:14px">
                                                                                                                <a href="https://doctorsjourney.in/"
                                                                                                                    style="text-decoration:none;color:#666;font-size:14px"
                                                                                                                    target="_blank">C-50,
                                                                                                                    Sector-2,
                                                                                                                    Noida
                                                                                                                    -201301
                                                                                                                    (India)</a>
                                                                                                            </p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                        <td style="padding:0;Margin:0;width:100px"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td style="padding:0;Margin:0;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#fff"
                                                            align="left" bgcolor="#ffffff">
                                                            <table cellpadding="0" cellspacing="0"
                                                                style="border-collapse:collapse;border-spacing:0"
                                                                width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:0;Margin:0;width:560px"
                                                                            align="center" valign="top">
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                width="100%" role="presentation">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0;padding-top:5px;padding-bottom:15px;font-size:0"
                                                                                            align="center">
                                                                                            <table cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                style="border-collapse:collapse;border-spacing:0"
                                                                                                width="100%"
                                                                                                role="presentation"
                                                                                                border="0"
                                                                                                height="100%">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td
                                                                                                            style="padding:0;Margin:0;border-bottom:1px solid #ccc;background:0 0;height:1px;width:100%;margin:0">
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>

                                                                                    <tr>
                                                                                        <td style="padding:0;Margin:0">
                                                                                            <p
                                                                                                style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:15px;color:#333;font-size:10px;text-align:justify">
                                                                                                The content provided on
                                                                                                the DoctorsJourney
                                                                                                platform is for
                                                                                                informational and
                                                                                                educational purposes
                                                                                                only. It is not intended
                                                                                                as a substitute for
                                                                                                professional medical
                                                                                                advice, diagnosis, or
                                                                                                treatment. Always
                                                                                                consult a qualified
                                                                                                healthcare provider with
                                                                                                any questions regarding
                                                                                                a medical condition.
                                                                                                DoctorsJourney does not
                                                                                                endorse or guarantee the
                                                                                                accuracy of third-party
                                                                                                content or publications
                                                                                                linked through our
                                                                                                platform.
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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