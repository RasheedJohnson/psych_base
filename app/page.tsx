import HomeModeSelect from "@/components/HomeModeSelect";
import { getChapters } from "@/lib/chapters";

/** Home is only the Cards vs Questions picker. */
export default function Home() {
  const chapters = getChapters();

  return (
    <main>
      <HomeModeSelect chapters={chapters} />
    </main>
  );
}
