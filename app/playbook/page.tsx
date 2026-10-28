import { SEGMENT_STATS } from "@/lib/mock-data";
import { PlaybookClient } from "@/components/PlaybookClient";

export default function PlaybookPage() {
  return <PlaybookClient segments={SEGMENT_STATS} />;
}
