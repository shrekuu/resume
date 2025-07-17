'use client';

import resumeEnData from "./resume_en.json";
import ResumeZhData from "./resume_zh.json";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type TResume = {
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
    }[]
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
    }[]
  };
};

export default function ResumePage() {
  const [locale, setLocale] = useState('locale');

  const data: TResume = locale === 'zh' ? ResumeZhData : resumeEnData;

  useEffect(() => {
    // Set CSS custom property for page header on locale change
    if (data.pageHeader) {
        document.documentElement.style.setProperty("--page-header", `"${data.pageHeader}"`);
    }
  }, [data.pageHeader]);

  return (
    <>
      <main className="w-full max-w-full px-4 py-4 text-gray-900 print:text-black bg-white print:shadow-none sm:px-6 sm:py-6 md:w-[210mm] md:min-h-[297mm] md:mx-auto md:px-8 md:shadow-lg print:w-full print:px-6 print:py-4">
        {data.pageHeader && (
          <div className="text-center mb-3 print:hidden">
            <p className="text-xs text-gray-500">{data.pageHeader}</p>
          </div>
        )}

        <div className="flex sm:flex-row-reverse flex-col gap-2 mb-4 sm:justify-between sm:items-center sm:mb-3 print:flex-row">
          <Button variant='outline' onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')} className="print:hidden">
            {locale === 'zh' ? 'English Resume' : '中文简历'}
          </Button>
          <h1 className="text-xl font-bold sm:text-2xl">{data.name}</h1>
        </div>

        <div className="text-xs mb-3 sm:mb-2 space-y-1 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-y-1">
          <p className="break-all sm:break-normal">
            {data.location} | {data.email}&nbsp;
          </p>
          <p className="sm:flex-shrink-0">
            <span className="hidden sm:inline">| </span>
            <a href={data.github} className="text-blue-600 underline break-all">
              {data.github}
            </a>
          </p>
        </div>
        {data.summary.map(paragraph => (
          <p key={paragraph} className="text-sm mb-2 sm:mb-1">{paragraph}</p>
        ))}
        <section className="mb-5 sm:mb-4">
          <h2 className="border-l-4 border-l-neutral-400 pl-2 text-base font-semibold border-b mb-2 sm:text-lg border-b-neutral-400">{data.techStack.title}</h2>
          <ul className="list-disc list-inside text-xs space-y-1 sm:space-y-0.5">
            {data.techStack.items.map(item=> (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-5 sm:mb-4">
          <h2 className="border-l-4 border-l-neutral-400 pl-2 text-base font-semibold border-b mb-2 sm:text-lg border-b-neutral-400">{data.workExperience.title}</h2>
          {data.workExperience.items.map((job, i) => (
            <div key={i} className="mb-4 sm:mb-3">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-sm break-words">
                    {job.company} | {job.title}
                    {job.remote ? <span className="hidden md:inline text-xs font-normal italic ml-2">({locale === 'zh' ? '远程' : 'Remote'})</span> : null}
                  </h3>
                  <p className="text-xs italic md:hidden">
                    {job.start} – {job.end}
                  </p>
                </div>
                <div className="hidden md:block text-xs italic text-right flex-shrink-0 ml-4">
                  {job.start} – {job.end}
                </div>
              </div>{" "}
              <div className="text-xs mt-1">
                {Array.isArray(job.description) ? (
                  job.description.map((desc, idx) => (
                    <div key={idx} className="mb-1 sm:mb-0.5 prose prose-xs max-w-none">
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
          <h2 className="border-l-4 border-l-neutral-400 pl-2 text-base font-semibold border-b mb-2 sm:text-lg border-b-neutral-400">{data.projectExperience.title}</h2>
          {data.projectExperience.items.map((item, i) => (
            <div key={i} className="mb-4 sm:mb-3">
              <h3 className="font-bold text-sm break-words">
                {item.title} | {item.type}
              </h3>
              <p className="text-xs italic">{item.tech}</p>{" "}
              <div className="text-xs mt-1">
                {Array.isArray(item.description) ? (
                  item.description.map((desc, idx) => (
                    <div key={idx} className="mb-1 sm:mb-0.5 prose prose-xs max-w-none">
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
          <h2 className="border-l-4 border-l-neutral-400 pl-2 text-base font-semibold border-b mb-2 sm:text-lg border-b-neutral-400">{data.education.title}</h2>
          {data.education.items.map((item, i) => (
            <div key={i} className="mb-2 sm:mb-1">
              <h3 className="text-sm break-words">{item.school} | {item.major} | {item.degree} | {item.certifications.join(", ")}</h3>
            </div>
          ))}
        </section>
        
        <section className="mb-5 sm:mb-4">
          <h2 className="border-l-4 border-l-neutral-400 pl-2 text-base font-semibold border-b mb-2 sm:text-lg border-b-neutral-400">{data.liveProjects.title}</h2>
          <ul className="list-disc list-inside space-y-1 text-xs sm:space-y-0.5">
            {data.liveProjects.items.map((item, i) => (
              <li key={i} className="break-words">
                <a href={item.url} className="text-blue-600 underline break-all" target="_blank">
                  {item.name}
                </a>{" "}
                — {item.description}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <div className="text-center mt-6 no-print md:max-w-[210mm] md:mx-auto pb-20 px-4">
        <Button onClick={() => window.print()} className="w-full sm:w-auto">
          Print / Save as PDF
        </Button>
      </div>
    </>
  );
}
