'use client';

import { Button } from '@/components/ui/button';
import { DateTime } from 'luxon';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import resumeEnData from './resume_en.json';
import ResumeZhData from './resume_zh.json';

type TResume = {
  filename: string;
  pageHeader: string;
  name: string;
  location: string;
  email: string;
  github: string;
  summary: string[];
  techStack: {
    title: string;
    items: string[];
  };
  workExperience: {
    title: string;
    items: {
      company: string;
      title: string;
      remote?: boolean;
      start: string;
      end: string;
      description: string | string[];
    }[];
  };
  projectExperience: {
    title: string;
    items: {
      title: string;
      type: string;
      tech: string;
      description: string | string[];
    }[];
  };
  education: {
    title: string;
    items: {
      school: string;
      major: string;
      degree: string;
      certifications: string[];
    }[];
  };
  liveProjects: {
    title: string;
    items: {
      name: string;
      url: string;
      description: string;
    }[];
  };
};

export default function ResumePage() {
  const [locale, setLocale] = useState<'en' | 'zh'>('en');

  const data: TResume = locale === 'zh' ? ResumeZhData : resumeEnData;

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
      document.title = `${data.filename}- ${DateTime.now().toFormat('yyyy-MM-dd')}`;
    };

    const handleAfterPrint = () => {
      document.title = originalTitleRef.current;
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [data.filename]);

  return (
    <>
      <main className="w-full max-w-full bg-white px-4 py-4 text-gray-900 sm:px-6 sm:py-6 md:mx-auto md:min-h-[297mm] md:w-[210mm] md:px-8 md:shadow-lg print:w-full print:px-6 print:py-4 print:text-black print:shadow-none">
        {data.pageHeader && (
          <div className="mb-3 text-center print:hidden">
            <p className="text-xs text-gray-500">{data.pageHeader}</p>
          </div>
        )}

        <div className="mb-4 flex flex-col gap-2 sm:mb-3 sm:flex-row-reverse sm:items-center sm:justify-between print:flex-row">
          <Button variant="outline" onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')} className="print:hidden">
            {locale === 'zh' ? 'English Resume' : '中文简历'}
          </Button>
          <h1 className="text-xl font-bold sm:text-2xl">{data.name}</h1>
        </div>

        <div className="mb-3 space-y-1 text-xs sm:mb-2 sm:flex sm:flex-wrap sm:space-y-0 sm:gap-y-1">
          <p className="break-all sm:break-normal">
            {data.location} | {data.email}&nbsp;
          </p>
          <p className="sm:flex-shrink-0">
            <span className="hidden sm:inline">| </span>
            <a href={data.github} className="break-all text-blue-600 underline">
              {data.github}
            </a>
          </p>
        </div>
        {data.summary.map((paragraph) => (
          <p key={paragraph} className="mb-2 text-sm sm:mb-1">
            {paragraph}
          </p>
        ))}
        <section className="mb-5 sm:mb-4">
          <h2 className="mb-2 border-b border-l-4 border-b-neutral-400 border-l-neutral-400 pl-2 text-base font-semibold sm:text-lg">
            {data.techStack.title}
          </h2>
          <ul className="list-inside list-disc space-y-1 text-xs sm:space-y-0.5">
            {data.techStack.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-5 sm:mb-4">
          <h2 className="mb-2 border-b border-l-4 border-b-neutral-400 border-l-neutral-400 pl-2 text-base font-semibold sm:text-lg">
            {data.workExperience.title}
          </h2>
          {data.workExperience.items.map((job, i) => (
            <div key={i} className="mb-4 sm:mb-3">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-bold break-words">
                    {job.company} | {job.title}
                    {job.remote ? (
                      <span className="ml-2 hidden text-xs font-normal italic md:inline">({locale === 'zh' ? '远程' : 'Remote'})</span>
                    ) : null}
                  </h3>
                  <p className="text-xs italic md:hidden">
                    {job.start} – {job.end}
                  </p>
                </div>
                <div className="ml-4 hidden flex-shrink-0 text-right text-xs italic md:block">
                  {job.start} – {job.end}
                </div>
              </div>{' '}
              <div className="mt-1 text-xs">
                {Array.isArray(job.description) ? (
                  job.description.map((desc, idx) => (
                    <div key={idx} className="prose prose-xs mb-1 max-w-none sm:mb-0.5">
                      <ReactMarkdown>{desc}</ReactMarkdown>
                    </div>
                  ))
                ) : (
                  <div className="prose prose-xs max-w-none">
                    <ReactMarkdown>{job.description}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        <section className="mb-5 sm:mb-4">
          <h2 className="mb-2 border-b border-l-4 border-b-neutral-400 border-l-neutral-400 pl-2 text-base font-semibold sm:text-lg">
            {data.projectExperience.title}
          </h2>
          {data.projectExperience.items.map((item, i) => (
            <div key={i} className="mb-4 sm:mb-3">
              <h3 className="text-sm font-bold break-words">
                {item.title} | {item.type}
              </h3>
              <p className="text-xs italic">{item.tech}</p>{' '}
              <div className="mt-1 text-xs">
                {Array.isArray(item.description) ? (
                  item.description.map((desc, idx) => (
                    <div key={idx} className="prose prose-xs mb-1 max-w-none sm:mb-0.5">
                      <ReactMarkdown>{desc}</ReactMarkdown>
                    </div>
                  ))
                ) : (
                  <div className="prose prose-xs max-w-none">
                    <ReactMarkdown>{item.description}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        <section className="mb-5 sm:mb-4">
          <h2 className="mb-2 border-b border-l-4 border-b-neutral-400 border-l-neutral-400 pl-2 text-base font-semibold sm:text-lg">
            {data.education.title}
          </h2>
          {data.education.items.map((item, i) => (
            <div key={i} className="mb-2 sm:mb-1">
              <h3 className="text-sm break-words">
                {item.school} | {item.major} | {item.degree} | {item.certifications.join(', ')}
              </h3>
            </div>
          ))}
        </section>

        <section className="mb-5 sm:mb-4">
          <h2 className="mb-2 border-b border-l-4 border-b-neutral-400 border-l-neutral-400 pl-2 text-base font-semibold sm:text-lg">
            {data.liveProjects.title}
          </h2>
          <ul className="list-inside list-disc space-y-1 text-xs sm:space-y-0.5">
            {data.liveProjects.items.map((item, i) => (
              <li key={i} className="break-words">
                <a href={item.url} className="break-all text-blue-600 underline" target="_blank">
                  {item.name}
                </a>{' '}
                — {item.description}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <div className="no-print mt-6 px-4 pb-20 text-center md:mx-auto md:max-w-[210mm]">
        <Button onClick={() => window.print()} className="w-full sm:w-auto">
          Print / Save as PDF
        </Button>
      </div>
    </>
  );
}
