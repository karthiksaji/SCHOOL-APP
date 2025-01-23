import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(
    studentId: number,
    email: string,
    name: string,
  ): Promise<void> {
    try {
      // Step 1: Generate a verification token for the student
      const token = jwt.sign({ studentId }, 'SECRET_KEY', { expiresIn: '1d' }); // Replace 'SECRET_KEY' with your actual secret key

      // Step 2: Construct the verification link
      const verificationLink = `http://localhost:3000/students/verify?token=${token}`; // Replace with your actual domain if deployed

      // Step 3: Send the email
      await this.mailerService.sendMail({
        to: email, // Recipient's email address
        subject: 'Welcome to School App - Verify Your Email', // Email subject
        template: 'welcome', // The EJS template for the email
        context: {
          name, // Student's name
          verificationLink, // The verification link
        },
      });

      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send welcome email to ${email}:`, error.message);
    }
  }

  // async sendWelcomeEmail(email: string, name: string): Promise<void> {
  //   try {
  //     await this.mailerService.sendMail({
  //       to: email, // Recipient's email
  //       subject: 'Welcome to School App',
  //       template: 'welcome', // The template name without the extension
  //       context: { name }, // Pass context variables to the template
  //     });
  //     console.log(`Email sent to ${email}`);
  //   } catch (error) {
  //     console.error(`Failed to send email to ${email}:`, error.message);
  //   }
  // }
}
