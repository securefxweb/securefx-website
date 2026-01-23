export const NEWSLETTER_TEMPLATE = ({ userName = "Trader" }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecureFX Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #171719; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #171719 0%, #0084FF 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">SecureFX</h1>
                            <p style="margin: 10px 0 0 0; color: #9B9B9B; font-size: 14px;">Your Trusted Trading Partner</p>
                        </td>
                    </tr>

                    <!-- Greeting -->
                    <tr>
                        <td style="padding: 30px 30px 20px 30px;">
                            <h2 style="margin: 0 0 10px 0; color: #ffffff; font-size: 24px;">
                                Hello, ${userName}!
                            </h2>
                            <p style="margin: 0; color: #9B9B9B; font-size: 16px; line-height: 1.6;">
                                Welcome to your weekly market insights and exclusive trading updates.
                            </p>
                        </td>
                    </tr>

                    <!-- Market Highlights -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <div style="background-color: rgba(255, 255, 255, 0.05); padding: 25px; border-left: 4px solid #0084FF;">
                                <h3 style="margin: 0 0 15px 0; color: #ffffff;">📈 This Week's Market Highlights</h3>
                                <ul style="margin: 0; padding-left: 20px; color: #9B9B9B;">
                                    <li>Major currency pairs showing volatility</li>
                                    <li>Gold reaches new support levels</li>
                                    <li>Energy markets respond to global events</li>
                                </ul>
                            </div>
                        </td>
                    </tr>

                    <!-- Stats -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <table width="100%">
                                <tr>
                                    <td width="50%" style="padding-right: 10px;">
                                        <div style="background:#0084FF;padding:20px;text-align:center;border-radius:8px;color:#fff;">
                                            <div style="font-size:32px;font-weight:bold;">0.0</div>
                                            <div>Pips Spread</div>
                                        </div>
                                    </td>
                                    <td width="50%" style="padding-left: 10px;">
                                        <div style="background:#F7541C;padding:20px;text-align:center;border-radius:8px;color:#fff;">
                                            <div style="font-size:32px;font-weight:bold;">2000:1</div>
                                            <div>Max Leverage</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td style="padding: 30px; text-align: center;">
                            <a href="#" style="padding:15px 40px;background:#0084FF;color:#fff;text-decoration:none;border-radius:5px;font-weight:bold;">
                                Start Trading Now
                            </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#171719;padding:30px;text-align:center;color:#9B9B9B;font-size:12px;">
                            © 2025 SecureFX. All rights reserved.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
export const NEWSLETTER_ADMIN_TEMPLATE = ({
	email,
	companyName = "SecureFX",
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Newsletter Subscription</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#171719;border-radius:6px;box-shadow:0 3px 10px rgba(0,0,0,0.3);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:25px;">
              <h2 style="margin:0;color:#ffffff;">
                New Newsletter Subscription
              </h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:20px 40px;">
              <p style="margin:0;color:#9B9B9B;font-size:15px;">
                A new user has subscribed to the newsletter.
              </p>

              <table width="100%" cellpadding="8" cellspacing="0"
                style="margin-top:15px;border-collapse:collapse;font-size:14px;color:#ffffff;">
                <tr>
                  <td style="width:30%;"><strong>Email:</strong></td>
                  <td>${email}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px;text-align:center;background:rgba(255,255,255,0.05);">
              <p style="margin:0;color:#9B9B9B;font-size:12px;">
                ${companyName} – Admin Notification
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const CONTACT_THANK_YOU_TEMPLATE = ({
	userName = "Valued Customer",
	companyName = "SecureFX",
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank You</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
          style="background:#171719;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);">

          <!-- Company Name -->
          <tr>
            <td align="center" style="padding:40px 30px 20px;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:bold;">
                ${companyName}
              </h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:20px 40px;text-align:center;">
              <h2 style="margin:0 0 15px;color:#ffffff;font-size:22px;">
                Thank You, ${userName}!
              </h2>
              <p style="margin:0;color:#9B9B9B;font-size:16px;line-height:1.6;">
                We've received your message and truly appreciate you getting in touch with us.
              </p>
              <p style="margin:15px 0 0;color:#9B9B9B;font-size:16px;line-height:1.6;">
                Our team will review your request and get back to you as soon as possible.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid rgba(255,255,255,0.12);">
            </td>
          </tr>

          <!-- Support Note -->
          <tr>
            <td style="padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#9B9B9B;font-size:14px;">
                If your inquiry is urgent, feel free to reply to this email or contact our support team.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:30px;text-align:center;background:#0084FF;border-radius:0 0 8px 8px;">
              <p style="margin:0;color:#ffffff;font-size:14px;font-weight:bold;">
                ${companyName}
              </p>
              <p style="margin:5px 0 0;color:#ffffff;font-size:12px;">
                Your Trusted Trading Partner
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
export const CONTACT_ADMIN_TEMPLATE = ({
	fullName,
	email,
	phoneNumber,
	message,
	companyName = "SecureFX",
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Request</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:6px;box-shadow:0 3px 10px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:25px;">
              <h2 style="margin:0;color:#1a1a2e;">
                New Contact Form Submission
              </h2>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:20px 40px;">
              <table width="100%" cellpadding="8" cellspacing="0"
                style="border-collapse:collapse;font-size:14px;color:#333;">
                <tr>
                  <td style="width:30%;"><strong>Name:</strong></td>
                  <td>${fullName}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>${email}</td>
                </tr>
                <tr>
                  <td><strong>Phone:</strong></td>
                  <td>${phoneNumber}</td>
                </tr>
                <tr>
                  <td><strong>Message:</strong></td>
                  <td style="word-break: break-word;">${message}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px;text-align:center;background:#f8f9fa;">
              <p style="margin:0;color:#666;font-size:12px;">
                ${companyName} – Admin Notification
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const DEMO_ACCOUNT_USER_TEMPLATE = ({
	userName = "Valued Customer",
	companyName = "SecureFX",
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Demo Account Request</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:40px 30px 20px;">
              <h1 style="margin:0;color:#1a1a2e;font-size:28px;">
                ${companyName}
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:20px 40px;text-align:center;">
              <h2 style="margin-bottom:15px;color:#1a1a2e;">
                Demo Account Request Received
              </h2>
              <p style="color:#555;font-size:16px;line-height:1.6;">
                Hello ${userName},
              </p>
              <p style="color:#555;font-size:16px;line-height:1.6;">
                Thank you for requesting a demo account with ${companyName}.
                Our team is reviewing your request and will get back to you shortly
                with your demo credentials.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:30px;text-align:center;background:#1a1a2e;border-radius:0 0 8px 8px;">
              <p style="margin:0;color:#ffffff;font-size:14px;font-weight:bold;">
                ${companyName}
              </p>
              <p style="margin-top:5px;color:#a8dadc;font-size:12px;">
                Practice trading with confidence
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
export const DEMO_ACCOUNT_ADMIN_TEMPLATE = ({
	prefix,
	fullName,
	email,
	countryCode,
	phoneNumber,
	companyName = "SecureFX",
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Demo Account Request</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:30px;">
              <h2 style="margin:0;color:#1a1a2e;">
                New Demo Account Request
              </h2>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:20px 40px;">
              <table width="100%" cellpadding="8" cellspacing="0"
                style="border-collapse:collapse;font-size:15px;color:#333;">
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>${prefix} ${fullName}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>${email}</td>
                </tr>
                <tr>
                  <td><strong>Phone:</strong></td>
                  <td>${countryCode} ${phoneNumber}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:25px;text-align:center;background:#f8f9fa;border-radius:0 0 8px 8px;">
              <p style="margin:0;color:#666;font-size:13px;">
                ${companyName} Admin Notification
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
export const LIVE_ACCOUNT_ADMIN_TEMPLATE = ({
	prefix,
	fullName,
	email,
	countryCode,
	phoneNumber,
	companyName = "SecureFX",
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Live Account Request</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:30px;">
              <h2 style="margin:0;color:#1a1a2e;">
                New Live Account Request
              </h2>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:20px 40px;">
              <table width="100%" cellpadding="8" cellspacing="0"
                style="border-collapse:collapse;font-size:15px;color:#333;">
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>${prefix} ${fullName}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>${email}</td>
                </tr>
                <tr>
                  <td><strong>Phone:</strong></td>
                  <td>${countryCode} ${phoneNumber}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Security Notice -->
          <tr>
            <td style="padding:15px 40px;text-align:center;background:#fff3cd;color:#856404;font-size:13px;">
              Password received securely but intentionally not displayed.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:25px;text-align:center;background:#f8f9fa;border-radius:0 0 8px 8px;">
              <p style="margin:0;color:#666;font-size:13px;">
                ${companyName} Admin Notification
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
