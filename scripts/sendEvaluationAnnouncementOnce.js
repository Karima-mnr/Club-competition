import connectDB from "../lib/mongodb.js";
import Student from "../models/Student.js";
import { sendEvaluationAnnouncement } from "../utils/sendEvaluationAnnouncement.js";

async function run() {
  try {
    await connectDB();

    const students = await Student.find({});

    console.log(`Found ${students.length} students.`);

    for (const student of students) {
      await sendEvaluationAnnouncement(student.email);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    console.log("✅ Announcement sent to all current students.");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

run();