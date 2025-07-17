import { cookies } from "next/headers";
import Resume from "./_components/Resume";

export default async function ResumePage() {
  const cookiesStore = await cookies();

  const initialLocale = cookiesStore.get('locale')?.value as ('en' | 'zh') || 'en';

  return <Resume initialLocale={initialLocale} />;
}
