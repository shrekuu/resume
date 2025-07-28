export type TResume = {
  lang: string;
  filename: string;
  pageHeader: string;
  pageTitle: string;
  pageDescription: string;
  name: string;
  location: string;
  wechat: string;
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
