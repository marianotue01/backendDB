/*
==================================================
File: data.js
Summary:
- Input: None; this file defines static CV and career data.
- Process: Provides structured information used across the CV PoC for:
  1. AI prompts
  2. UI rendering
  3. Component display
- Output: Exported constants representing About, Core Competencies, Experience, Certifications, Education, and Languages.
==================================================
*/

// -------------------------------------------------
// About section
// Description: A detailed narrative summary of Mariano's professional background, skills, and personal details.
export const about = `Accomplished Senior Product Manager and Agile Leader with 25+ years of experience delivering transformative solutions across financial services, energy, and IT. 
Skilled at leading cross-functional teams, driving cloud integrations, microservices, and data governance initiatives that enhance efficiency and compliance. 
Proven track record in mentoring teams, executing strategic roadmaps, and delivering measurable, high-impact results.
Italian passport. Based in Poland but willing to relocate.
Born in Argentina, holds dual citizenship (Italian and Argentinian), and is a Systems Engineer.
As of 2025, he is 46 years old.`;

// -------------------------------------------------
// Core Competencies
// Description: Key professional skills and abilities summarized as an array of strings.
export const coreCompetencies = [
  "Proven ability to communicate with impact, engaging and influencing both business partners and client stakeholders to foster alignment and drive collaboration.",
  "Extensive experience in Product Lifecycle Management, leveraging Agile methodologies and tools to deliver continuous value.",
  "Strong balance of technical expertise and strategic business insight, enabling effective decision-making across product development.",
  "Successful track record of leading globally distributed teams across multiple time zones with a focus on collaboration and delivery.",
  "Experienced in formal and informal coaching, helping team members reach their full potential through ongoing mentorship and on-the-job development."
];

// -------------------------------------------------
// Experience
// Description: Work history, roles, periods, and responsibilities.
export const experience = [
  {
    company: "EY Poland",
    role: "Senior Product Manager / People Manager",
    period: "Sept 2022 – Present",
    description: [
      "Led vision, strategy, and multi-year roadmap for a global financial reporting and research platform, serving clients in 40+ countries.",
      "Coordinated and mentored distributed Agile teams (up to 25 members across 5 regions).",
      "Designed and implemented global taxonomy and metadata governance in Atlas and Adobe Experience Manager, standardizing 2,500+ terms and automating validation.",
      "Led CMS migration from Ovitas to Adobe Experience Manager, integrating scripts and Azure DevOps pipelines; increased publishing efficiency by 35%.",
      "Established governance workflows using AEM, Azure AD, RBAC, and Atlas, ensuring regulatory compliance.",
      "Defined and monitored KPIs (NPS, adoption, defect rate) using Power BI dashboards."
    ],
  },
  {
    company: "J.P. Morgan",
    role: "Senior Product Manager / People Manager",
    period: "July 2021 – Aug 2022",
    description: [
      "Led strategy and execution for global network products, ensuring integration and operational efficiency.",
      "Delivered Logical Build Readiness, an event-driven architecture, reducing preparation time by 25% and improving accuracy.",
      "Directed NETL microservices (Java/Python, Docker, Kubernetes) for legacy data ingestion and transformation; reduced latency by ~35%.",
      "Implemented DART (Device Automation, Reporting, Tasking), reducing manual errors by ~30%.",
      "Mentored engineering teams, promoting skills and high performance."
    ],
  },
  {
    company: "ExxonMobil",
    role: "Senior Product Manager",
    period: "Apr 2013 – June 2021",
    description: [
      "Led development of reusable platforms and building blocks, improving adoption and consistency.",
      "Managed a portfolio of 5 products with 95% on-time delivery.",
      "Drove platform standardization and scalability, reducing errors by ~20%.",
      "Collaborated cross-functionally to define strategy, enhance adoption, and implement continuous improvements.",
      "Developed License Automation Tool (LAT), a hybrid solution reducing manual license management effort by ~30%."
    ],
  },
  {
    company: "ExxonMobil",
    role: "Senior Scrum Master (Manager)",
    period: "Mar 2008 – Mar 2013",
    description: [
      "Guided Agile/Scrum adoption, improving sprint completion by 20–25%.",
      "Served as servant leader and Agile coach, facilitating ceremonies and removing impediments.",
      "Tracked metrics, analyzed incidents, and delivered training; reduced recurring incidents by ~15%."
    ],
  },
  {
    company: "IBM",
    role: "Supervisor / Team Lead / Technical Writer",
    period: "Oct 2004 – Feb 2008",
    description: [
      "Built and led Mainframe system programmers team, ensuring staffing and training.",
      "Administered Z/OS systems: upgrades, fixes, monitoring, and automation.",
      "Oversaw SMP, JCL, TSO/E, and batch processes.",
      "Created comprehensive technical documentation for Change & Problem Management, Capacity Planning, SLA, DRP, etc.",
      "Collaborated with teams to standardize documentation and improve usability."
    ],
  }
];

// -------------------------------------------------
// Certifications
// Description: Professional certifications earned by Mariano.
export const certifications = [
  "Certified SAFe® 6 Product Owner/Product Manager",
  "Certified Scrum Product Owner (CSPO)",
  "Scrum Master Certified (SMC)",
  "PMI Agile Certified Practitioner (PMI-ACP)",
  "ITIL 3.0 Fundamentals",
  "Microsoft Certified: Azure Fundamentals"
];

// -------------------------------------------------
// Education
// Description: Academic background of Mariano.
export const education = "Bachelor's and Master’s degrees in Systems Engineering – Universidad Tecnológica Nacional, Argentina";

// -------------------------------------------------
// Languages
// Description: Languages spoken by Mariano with proficiency levels.
export const languages = [
  "English — C1 (Proficient)",
  "Spanish — Native (Mother tongue)",
  "Portuguese — A1 (Beginner)"
];
