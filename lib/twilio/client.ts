import twilio from 'twilio';

export const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (to: string, body: string) =>
  twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE_NUMBER,
  });

export async function sendVerificationCode(phoneNumber: string) {
  return twilioClient.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_SID as string)
    .verifications.create({ to: phoneNumber, channel: 'sms' });
}

export async function verifyCode(phoneNumber: string, code: string) {
  return twilioClient.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_SID as string)
    .verificationChecks.create({
      to: phoneNumber,
      code: String(code),
    });
}
