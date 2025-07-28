'use client';

import { Button } from '@/components/ui/button';
import { DateTime } from 'luxon';
import { useEffect, useRef } from 'react';
import Resume from './_components/resume';
import resumeEnData from './resume_en.json';
import ResumeZhData from './resume_zh.json';

const data = ResumeZhData;

export default function ResumePage() {
  useEffect(() => {
    // Set CSS custom property for page header on locale change
    if (data.pageHeader) {
      document.documentElement.style.setProperty('--page-header', `"${data.pageHeader}"`);
    }
  }, [data.pageHeader]);

  const originalTitleRef = useRef<string>('');

  useEffect(() => {
    const handleBeforePrint = () => {
      originalTitleRef.current = document.title;
      document.title = `${data.filename}_${DateTime.now().toFormat('yyyy-MM-dd')}`;
    };

    const handleAfterPrint = () => {
      document.title = originalTitleRef.current;
    };

    document.title = data.pageTitle;
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [data.filename]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <Resume data={ResumeZhData} />

        {/* print page breaker */}
        <div className="hidden break-after-page print:block"></div>

        <Resume data={resumeEnData} />
      </div>
      <div className="no-print mt-6 px-4 pb-20 text-center md:mx-auto md:max-w-[210mm]">
        <Button onClick={() => window.print()} className="w-full sm:w-auto">
          Print / Save as PDF
        </Button>
      </div>
    </>
  );
}
