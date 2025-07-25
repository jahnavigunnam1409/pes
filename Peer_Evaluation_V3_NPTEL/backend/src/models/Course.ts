import { Schema, model, Document, Types } from "mongoose";

console.log('Course model loaded');

export interface ICourse extends Document {
  name: string;
  code: string;
  startDate: Date;
  endDate: Date;
   ta: Types.ObjectId[];
}

const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  ta: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export const Course = model<ICourse>("Course", courseSchema);
