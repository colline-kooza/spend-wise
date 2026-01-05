export function generateInvitationEmail({
  inviterName,
  projectName,
  projectSlug,
  inviteeEmail,
  acceptLink,
  declineLink,
  invitationToken,
}: {
  inviterName: string
  projectName: string
  projectSlug: string
  inviteeEmail: string
  acceptLink: string
  declineLink: string
  invitationToken: string
}): string {
  const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .avatars { display: flex; justify-content: center; gap: 10px; align-items: center; margin-bottom: 20px; }
          .avatar { width: 48px; height: 48px; border-radius: 4px; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-weight: bold; }
          h1 { font-size: 24px; margin: 0 0 10px 0; color: #1f2937; }
          .content { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 30px; margin-bottom: 20px; }
          .project-link { color: #3b82f6; text-decoration: none; font-weight: 600; }
          .buttons { display: flex; gap: 12px; margin: 25px 0; }
          .btn { display: inline-block; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; text-align: center; }
          .btn-accept { background: #3b82f6; color: white; }
          .btn-decline { background: #e5e7eb; color: #333; }
          .expiry { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 4px; margin: 20px 0; font-size: 14px; }
          .footer { color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px; }
          .divider { border-top: 1px solid #e5e7eb; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="avatars">
              <div class="avatar">👤</div>
              <div>+</div>
              <div class="avatar">👥</div>
            </div>
            <h1>${inviterName} has invited you to collaborate on</h1>
            <p style="margin: 0; color: #6b7280;">the</p>
          </div>

          <div class="content">
            <p style="font-size: 18px; color: #3b82f6; font-weight: 600; margin: 0 0 20px 0;">
              <a href="${acceptLink}" class="project-link">${projectSlug} / ${projectName}</a>
            </p>

            <p>You're invited to collaborate on this project. Click the button below to view your invitation:</p>

            <div class="buttons">
              <a href="${acceptLink}" class="btn btn-accept">Accept Invitation</a>
              <a href="${declineLink}" class="btn btn-decline">Decline</a>
            </div>

            <div class="divider"></div>

            <p style="font-size: 14px; color: #6b7280; margin: 15px 0;">
              Or copy and paste this link in your browser:
              <br>
              <code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px; word-break: break-all;">${acceptLink}</code>
            </p>

            <div class="expiry">
              ⏱️ <strong>This invitation will expire on ${expirationDate}</strong>
            </div>

            <div class="divider"></div>

            <p style="font-size: 12px; color: #6b7280; margin: 0;">
              This invitation was sent to <strong>${inviteeEmail}</strong>. If you were not expecting this invitation, you can safely ignore it or contact the sender.
            </p>
          </div>

          <div class="footer">
            <p>© 2025 Project Collaboration. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function generateAcceptanceEmail({
  userName,
  projectName,
}: {
  userName: string
  projectName: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .content { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; border-radius: 6px; text-align: center; }
          h2 { color: #16a34a; margin: 0 0 10px 0; }
          p { color: #6b7280; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <h2>✓ Invitation Accepted</h2>
            <p>${userName} has accepted your invitation to collaborate on <strong>${projectName}</strong>.</p>
            <p>You can now start working together!</p>
          </div>
        </div>
      </body>
    </html>
  `
}
