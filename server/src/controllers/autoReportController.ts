import Report from "../models/Report";
import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class AutoReportController {
  // Method to generate a report
  public async generateReport(req: Request, res: Response, next: NextFunction) {
    try {
      // Extracting necessary fields from the request body
      const { reportType, category, email, startDate, endDate, fields, status } = req.body;

      // Creating a new report instance with the provided data
      const report = new Report({
        reportType,
        requestedInformation: {
          filters: { category },
          dateRange: { start: new Date(startDate), end: new Date(endDate) },
          fields
        }
      });

      // Setting the initial status of the report and saving it to the database
      report.status = status || "Pending";
      await report.save();

      // Fetching the data based on the provided filters and fields
      const generatedData = await this.fetchData(category, new Date(startDate), new Date(endDate), fields);
      report.generatedData = generatedData;
      report.status = "Completed";
      await report.save();

      // If the report type is "Automatic", send an email with the report
      if (reportType === "Automatic") {
        await this.sendEmail(email, report);
      }

      // Sending a success response with the generated report
      res.status(201).json({ message: "Report generated successfully", report });
    } catch (error) {
      // Handling errors and passing them to the next middleware
      next(error);
    }
  }

  // Method to fetch data based on the provided filters and fields
  private async fetchData(category: string, startDate: Date, endDate: Date, fields: string[]): Promise<any[]> {
    // Replace this with your actual data fetching logic
    // For example, querying a database based on the filters and fields
    const data = await Report.find({ category, startDate, endDate, fields });

    // Filtering data based on category and date range
    const filteredData = data.filter((item: any) => 
      item.category === category && item.date >= startDate && item.date <= endDate
    );

    // Selecting only the requested fields
    const selectedData = filteredData.map((item: any) => {
      const selectedFields: any = {};
      fields.forEach((field: string) => {
        selectedFields[field] = item[field];
      });
      return selectedFields;
    });

    return selectedData;
  }

  // Method to send an email with the generated report
  private async sendEmail(to: string, report: any) {
    // Creating a transporter object with Gmail service credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Defining the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Automatic Report",
      text: `Here is your automatic report: ${JSON.stringify(report.generatedData, null, 2)}`
    };

    // Sending the email
    await transporter.sendMail(mailOptions);
  }
}

// Exporting an instance of the AutoReportController class
export default new AutoReportController();