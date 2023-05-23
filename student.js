import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      roll_no: {
        type: Number,
        required: true,
        unique: true
      },
      WAD_marks: {
        type: Number
      },
      CC_marks: {
        type: Number
      },
      DSBDA_marks: {
        type: Number
      },
      CNS_marks: {
        type: Number
      },
      AI_marks: {
        type: Number
      },
});


export default mongoose.model("StudentMarks", StudentSchema)