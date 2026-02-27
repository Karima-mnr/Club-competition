import { sendEvaluationAnnouncement } from "@/utils/sendEvaluationAnnouncement";

export async function GET() {
  try {
    await sendEvaluationAnnouncement("n.bousahba@univ-chlef.dz");

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}