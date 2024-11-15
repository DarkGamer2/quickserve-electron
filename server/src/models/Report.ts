import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

interface IReport extends Document {
  reportType: string;
  generationDate: Date;
  status: string;
  requestedInformation: {
    filters: Record<string, any>;
    dateRange: {
      start: Date;
      end: Date;
    };
    fields: string[];
  };
  generatedData: any[]; // You can adjust the type based on your data structure
}

const reportSchema = new Schema<IReport>({
  reportType: {
    type: String,
    required: true,
  },
  generationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Failed"],
    default: "Pending",
  },
  requestedInformation: {
    filters: {
      type: Map,
      of: Schema.Types.Mixed,
      required: true,
    },
    dateRange: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },
    fields: {
      type: [String],
      required: true,
    },
  },
  generatedData: {
    type: [Schema.Types.Mixed] as unknown as any[], // Cast to unknown first, then to any[]
    default: [],
  },
});

const Report = mongoose.model<IReport>("Report", reportSchema);

export default Report;