interface EmailData {
  name: string;
  email: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  timestamp?: string;
  resetLink?: string;
  backupCodes?: string[];
  qrCode?: string;
  attempts?: number;
}

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wafid Admin</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 150px;
      margin-bottom: 20px;
    }
    .content {
      background: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #4f46e5;
      color: #fff;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      font-size: 0.875rem;
      color: #666;
    }
    .alert {
      background-color: #fee2e2;
      border-left: 4px solid #ef4444;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .code {
      font-family: monospace;
      background: #f3f4f6;
      padding: 2px 4px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${process.env.NEXT_PUBLIC_APP_URL}/logo.png" alt="Wafid Admin" class="logo">
  </div>
  <div class="content">
    ${content}
  </div>
  <div class="footer">
    <p>This email was sent by Wafid Admin. If you didn't request this email, please ignore it or contact support.</p>
    <p> Wafid Admin. All rights reserved.</p>
  </div>
</body>
</html>
`;

export const passwordResetTemplate = ({
  name,
  resetLink,
  ipAddress,
  userAgent,
  location,
  timestamp,
}: EmailData) => baseTemplate(`
  <h1>Password Reset Request</h1>
  <p>Hello ${name},</p>
  <p>We received a request to reset your password. Click the button below to create a new password:</p>
  
  <div style="text-align: center;">
    <a href="${resetLink}" class="button">Reset Password</a>
  </div>

  <div class="alert">
    <strong>Security Notice:</strong> If you didn't request this password reset, please contact support immediately.
  </div>

  <div style="margin-top: 30px;">
    <h3>Request Details:</h3>
    <ul>
      <li>Time: ${timestamp}</li>
      <li>IP Address: ${ipAddress}</li>
      <li>Browser: ${userAgent}</li>
      ${location ? `<li>Location: ${location}</li>` : ''}
    </ul>
  </div>
`);

export const passwordChangedTemplate = ({
  name,
  ipAddress,
  userAgent,
  location,
  timestamp,
}: EmailData) => baseTemplate(`
  <h1>Password Changed Successfully</h1>
  <p>Hello ${name},</p>
  <p>Your password has been successfully changed. If you did not make this change, please contact support immediately.</p>

  <div class="alert">
    <strong>Security Alert:</strong>
    <p>For your security, we recommend:</p>
    <ul>
      <li>Enable two-factor authentication if not already enabled</li>
      <li>Review your recent login activity</li>
      <li>Update your security questions</li>
    </ul>
  </div>

  <div style="margin-top: 30px;">
    <h3>Change Details:</h3>
    <ul>
      <li>Time: ${timestamp}</li>
      <li>IP Address: ${ipAddress}</li>
      <li>Browser: ${userAgent}</li>
      ${location ? `<li>Location: ${location}</li>` : ''}
    </ul>
  </div>
`);

export const twoFactorEnabledTemplate = ({
  name,
  backupCodes,
  qrCode,
}: EmailData) => baseTemplate(`
  <h1>Two-Factor Authentication Enabled</h1>
  <p>Hello ${name},</p>
  <p>Two-factor authentication has been successfully enabled for your account.</p>

  <div style="margin: 30px 0;">
    <h3>Your Backup Codes:</h3>
    <p>Please store these backup codes in a secure place. You can use them to access your account if you lose your authentication device.</p>
    <div style="background: #f3f4f6; padding: 15px; border-radius: 6px;">
      ${backupCodes?.map((code) => `<code class="code">${code}</code><br>`).join('')}
    </div>
  </div>

  ${qrCode ? `
    <div style="margin: 30px 0;">
      <h3>QR Code:</h3>
      <p>Scan this QR code with your authenticator app:</p>
      <img src="${qrCode}" alt="2FA QR Code" style="max-width: 200px; margin: 0 auto; display: block;">
    </div>
  ` : ''}

  <div class="alert">
    <strong>Important:</strong>
    <ul>
      <li>Save your backup codes immediately</li>
      <li>Don't share your QR code or backup codes with anyone</li>
      <li>Use an authenticator app like Google Authenticator or Authy</li>
    </ul>
  </div>
`);

export function loginAlertTemplate({
  name,
  attempts = 0,
  timestamp = new Date().toLocaleString(),
}: EmailData) {
  const content = `
    <div class="content">
      <h2>Security Alert: Failed Login Attempts</h2>
      <p>Hello ${name},</p>
      <p>We detected ${attempts} failed login attempts on your account.</p>
      <p>Time: ${timestamp}</p>
      <p>If this wasn't you, we recommend:</p>
      <ul>
        <li>Changing your password immediately</li>
        <li>Enabling two-factor authentication if not already enabled</li>
        <li>Contacting support if you need assistance</li>
      </ul>
      <p>Best regards,<br>Wafid Admin Team</p>
    </div>
  `;
  
  return baseTemplate(content);
}
