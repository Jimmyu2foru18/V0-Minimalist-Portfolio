"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  updated_at: string
}

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([])
  const [isLoadingRepos, setIsLoadingRepos] = useState(true)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/Jimmyu2foru18/repos?sort=updated&per_page=100")
        if (response.ok) {
          const repos = await response.json()
          setGithubRepos(repos)
        }
      } catch (error) {
        console.error("Failed to fetch GitHub repos:", error)
      } finally {
        setIsLoadingRepos(false)
      }
    }

    fetchGitHubRepos()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Removed entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "about", "projects", "work", "education", "certifications", "skills", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header id="intro" ref={(el) => (sectionsRef.current[0] = el)} className="min-h-screen flex items-center">
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  James
                  <br />
                  <span className="text-muted-foreground">McGuigan Jr.</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Aspiring Mathematics Educator & Full-Stack Developer dedicated to
                  <span className="text-foreground"> transforming complex concepts</span> into accessible learning
                  experiences through
                  <span className="text-foreground"> innovative technology</span> and
                  <span className="text-foreground"> thoughtful mentorship</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Open to work
                  </div>
                  <div>West Hempstead, NY</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Mathematics & CIS Tutor</div>
                  <div className="text-muted-foreground">@ SUNY Old Westbury</div>
                  <div className="text-xs text-muted-foreground">Aug 2025 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Java", "Python", "JavaScript", "React", "Node.js", "MySQL"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="about" ref={(el) => (sectionsRef.current[1] = el)} className="py-16 sm:py-24">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">About</h2>

            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm James, a dedicated student at SUNY Old Westbury pursuing a degree in{" "}
                  <span className="text-foreground">Mathematics Education</span>. With a robust foundation in
                  programming, database architecture, and system design, I bring a unique perspective that bridges
                  technical innovation with educational excellence.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Currently, I serve as a Mathematics and CIS tutor, where I refine my pedagogical approach while
                  deepening my technical expertise. My professional certifications in{" "}
                  <span className="text-foreground">networking and cybersecurity</span> complement my passion for
                  solving complex problems—whether in the classroom or in production environments.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Driven by a commitment to{" "}
                  <span className="text-foreground">technology, education, and leadership</span>, I'm building a career
                  at the intersection of technical mastery and transformative teaching. My goal is to empower the next
                  generation of problem-solvers through innovative instruction and mentorship.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 border border-border rounded-lg">
                  <div className="text-3xl font-light text-foreground mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">GitHub Repositories</div>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <div className="text-3xl font-light text-foreground mb-2">80+</div>
                  <div className="text-sm text-muted-foreground">Professional Certifications</div>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <div className="text-3xl font-light text-foreground mb-2">8+</div>
                  <div className="text-sm text-muted-foreground">Years Leadership Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" ref={(el) => (sectionsRef.current[2] = el)} className="py-16 sm:py-24">
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Featured Projects</h2>
              <div className="text-sm text-muted-foreground font-mono">50+ REPOSITORIES</div>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "System Design Project",
                  description:
                    "Comprehensive full-stack system demonstrating advanced architectural patterns, scalable design principles, and modern web development best practices.",
                  tech: ["Next.js", "TypeScript", "System Design"],
                  url: "https://system-design-project.vercel.app",
                  category: "Web Development",
                },
                {
                  title: "Financial Management App",
                  description:
                    "Intelligent finance automation platform featuring real-time budget tracking, expense categorization, and predictive analytics for personal financial optimization.",
                  tech: ["JavaScript", "Automation", "Finance"],
                  url: "https://jimmyu2foru18.github.io/Financial-management-application-with-automation",
                  category: "Applications",
                },
                {
                  title: "A* Pathfinding Algorithm",
                  description:
                    "Dynamic visualization tool showcasing the A* pathfinding algorithm with interactive controls, real-time performance metrics, and educational annotations.",
                  tech: ["JavaScript", "Algorithms", "Visualization"],
                  url: "https://jimmyu2foru18.github.io/A-Pathfinding-Algorithm/demo.html",
                  category: "Algorithms",
                },
                {
                  title: "Tutorial Finder AI",
                  description:
                    "Machine learning-powered recommendation engine that intelligently matches developers with relevant coding tutorials based on skill level and learning objectives.",
                  tech: ["AI", "Python", "Machine Learning"],
                  url: "https://github.com/Jimmyu2foru18/Tutorial-Finder-AI",
                  category: "AI/ML",
                },
                {
                  title: "CarrotQuest Game",
                  description:
                    "Engaging HTML5 platformer featuring responsive character controls, collision detection, progressive difficulty scaling, and immersive gameplay mechanics.",
                  tech: ["JavaScript", "Game Development", "HTML5"],
                  url: "https://jimmyu2foru18.github.io/CarrotQuest/CarrotQuest.html",
                  category: "Games",
                },
                {
                  title: "GitHub Analyzer V2",
                  description:
                    "Advanced repository analysis tool leveraging the GitHub API to deliver comprehensive code quality metrics, contribution insights, and project health assessments.",
                  tech: ["Python", "GitHub API", "Data Analysis"],
                  url: "https://github.com/Jimmyu2foru18/github-analyzerV2",
                  category: "Tools",
                },
              ].map((project, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{project.category}</span>
                      <span>LIVE</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs text-muted-foreground border border-border rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    >
                      <span>View Project</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="space-y-8 mt-16">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <h3 className="text-2xl sm:text-3xl font-light">All Projects</h3>
                <div className="text-sm text-muted-foreground font-mono">
                  {isLoadingRepos ? "LOADING..." : `${githubRepos.length} REPOS`}
                </div>
              </div>

              {isLoadingRepos ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {githubRepos.map((repo) => (
                    <Link
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium group-hover:text-muted-foreground transition-colors duration-300 line-clamp-1">
                            {repo.name}
                          </h4>
                          {repo.stargazers_count > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span>{repo.stargazers_count}</span>
                            </div>
                          )}
                        </div>

                        {repo.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {repo.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          {repo.language && <span className="text-xs text-muted-foreground">{repo.language}</span>}
                          {repo.topics && repo.topics.length > 0 && (
                            <div className="flex gap-1">
                              {repo.topics.slice(0, 2).map((topic) => (
                                <span
                                  key={topic}
                                  className="px-1.5 py-0.5 text-xs bg-muted/30 rounded text-muted-foreground"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center">
              <Link
                href="https://github.com/Jimmyu2foru18"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
              >
                <span>View GitHub Profile</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section id="work" ref={(el) => (sectionsRef.current[3] = el)} className="py-16 sm:py-24">
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2015 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  role: "Mathematics & CIS Tutor",
                  company: "SUNY Old Westbury",
                  period: "Aug 2025 - Present",
                  description:
                    "Deliver personalized instruction in advanced mathematics and computer information systems, translating complex theoretical concepts into accessible learning frameworks. Design adaptive teaching strategies that enhance student comprehension and academic performance.",
                  skills: ["Tutoring", "Curriculum Development", "Problem Solving", "Student Progress Assessment"],
                },
                {
                  year: "2025",
                  role: "Brand Ambassador",
                  company: "Akalade",
                  period: "Apr 2025 - Aug 2025",
                  description:
                    "Drove AT&T product adoption through strategic customer engagement and technical demonstrations at third-party retail locations. Educated consumers on wireless, internet, and television solutions while building brand loyalty through consultative sales approaches.",
                  skills: ["Technical Sales", "Customer Engagement", "Merchandising", "Cross-functional Collaboration"],
                },
                {
                  year: "2025",
                  role: "Network Operations Support",
                  company: "Verizon",
                  period: "Jan 2025 - Apr 2025",
                  description:
                    "Delivered critical technical support by diagnosing complex network infrastructure issues and implementing systematic troubleshooting protocols. Monitored real-time network performance metrics to ensure optimal system reliability and minimize service disruptions.",
                  skills: ["Network Troubleshooting", "Technical Communication", "Data Analysis", "Time Management"],
                },
                {
                  year: "2023",
                  role: "Team Lead Manager",
                  company: "Starbucks",
                  period: "May 2023 - Jan 2025",
                  description:
                    "Orchestrated high-performing team operations while maintaining exceptional customer service standards. Implemented data-driven strategies that elevated customer satisfaction scores and accelerated revenue growth through operational excellence.",
                  skills: ["Leadership", "Sales Strategy", "Staff Training", "Sales Operations"],
                },
                {
                  year: "2022",
                  role: "Sales Expert",
                  company: "T-Mobile",
                  period: "Dec 2022 - Jul 2023",
                  description:
                    "Cultivated lasting customer relationships through consultative communication and attentive service delivery. Analyzed customer feedback patterns to identify service enhancement opportunities and drive continuous improvement initiatives.",
                  skills: ["Communication", "Customer Experience", "Customer Relations", "Sales Support"],
                },
                {
                  year: "2021",
                  role: "Store Manager",
                  company: "Starbucks",
                  period: "Feb 2021 - May 2023",
                  description:
                    "Directed comprehensive store operations encompassing staffing optimization, inventory management, and quality assurance. Architected and executed strategic initiatives that strengthened customer loyalty and maximized revenue performance.",
                  skills: ["Customer Satisfaction", "Customer Service", "High Quality Standards", "Team Leadership"],
                },
                {
                  year: "2020",
                  role: "Manager of Operations",
                  company: "The French Workshop",
                  period: "Nov 2020 - Feb 2023",
                  description:
                    "Partnered with executive leadership to formulate operational strategies aligned with organizational objectives. Orchestrated end-to-end inventory management, procurement processes, and supply chain optimization initiatives.",
                  skills: ["Operations Management", "Inventory Control", "Staff Development", "Strategic Planning"],
                },
                {
                  year: "2020",
                  role: "Assistant Store Manager",
                  company: "Starbucks",
                  period: "Jun 2020 - Jan 2021",
                  description:
                    "Supported daily store management through effective team coordination and inventory oversight. Collaborated with store leadership to uphold operational excellence and maintain consistent service standards.",
                  skills: ["Operations Support", "Customer Service", "Inventory Management", "Team Coordination"],
                },
                {
                  year: "2018",
                  role: "Store Manager",
                  company: "Journeys",
                  period: "Oct 2018 - Nov 2020",
                  description:
                    "Recruited, developed, and mentored high-caliber staff to exceed performance benchmarks and sales objectives. Analyzed market trends and staffing requirements to optimize operational efficiency and drive business results.",
                  skills: [
                    "Competitive Pricing",
                    "Team Leadership",
                    "Sales Process Optimization",
                    "Supplier Negotiation",
                  ],
                },
                {
                  year: "2017",
                  role: "Shift Supervisor",
                  company: "Starbucks",
                  period: "Nov 2017 - Jun 2020",
                  description:
                    "Led shift operations while monitoring team performance and ensuring seamless store functionality. Delivered exceptional customer experiences while fostering team development and operational consistency.",
                  skills: ["Shift Management", "Team Building", "Customer Experience", "Workload Prioritization"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                      <div className="text-xs text-muted-foreground mt-1">{job.period}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:text-foreground transition-colors duration-500"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" ref={(el) => (sectionsRef.current[4] = el)} className="py-16 sm:py-24">
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Education</h2>
              <div className="text-sm text-muted-foreground font-mono">2015 — 2027</div>
            </div>

            <div className="space-y-8">
              {[
                {
                  degree: "Bachelor of Education",
                  field: "Mathematics",
                  school: "State University of New York at Old Westbury",
                  period: "Sep 2025 - May 2027",
                  gpa: "In Progress",
                  description:
                    "Advancing pedagogical expertise and mathematical mastery through rigorous coursework in educational theory, instructional design, and advanced mathematics. Actively engaged in technology-focused student organizations to bridge digital innovation with classroom instruction.",
                  activities: ["Coding Club", "History & Philosophy Club"],
                  skills: [
                    "Curriculum Development",
                    "Tutoring",
                    "Educational Technology",
                    "Collaborative Problem Solving",
                  ],
                },
                {
                  degree: "Bachelor's Degree",
                  field: "Management Information Systems",
                  school: "State University of New York at Old Westbury",
                  period: "Sep 2022 - May 2025",
                  gpa: "3.7",
                  description:
                    "Specialized in enterprise database architecture, software engineering methodologies, and scalable system design. Developed comprehensive technical proficiency across multiple programming paradigms and modern web development frameworks.",
                  activities: ["Coding Club", "Photography Club", "Accounting Society"],
                  skills: [
                    "Database Management",
                    "Software Engineering",
                    "Systems Design",
                    "C#",
                    "Java",
                    "PHP",
                    "Python",
                    "React.js",
                    "Laravel",
                  ],
                },
                {
                  degree: "Bachelor's Degree",
                  field: "Psychology",
                  school: "State University of New York at Old Westbury",
                  period: "Jan 2018 - May 2020",
                  gpa: "3.6",
                  description:
                    "Explored foundational psychological principles, cognitive neuroscience, and behavioral analysis methodologies. Contributed to collaborative research initiatives examining human cognition and decision-making processes.",
                  activities: ["Photography Club", "Gaming Club"],
                  skills: ["Data Research", "Cognitive Psychology", "Applied Behavior Analysis", "Communication"],
                },
                {
                  degree: "Associate of Arts",
                  field: "Liberal Arts",
                  school: "Nassau Community College",
                  period: "Sep 2015 - Dec 2017",
                  gpa: "3.5",
                  description:
                    "Established a comprehensive academic foundation spanning humanities, quantitative sciences, and social studies. Cultivated critical thinking, analytical reasoning, and effective communication skills through interdisciplinary coursework.",
                  activities: ["Game & Coding Club", "Irish Club"],
                  skills: ["Critical Thinking", "Analytical Skills", "Social Collaboration", "Leadership"],
                },
              ].map((edu, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500"
                >
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium">
                          {edu.degree} - {edu.field}
                        </h3>
                        <div className="text-muted-foreground">{edu.school}</div>
                      </div>
                      <div className="text-sm text-muted-foreground font-mono whitespace-nowrap">GPA: {edu.gpa}</div>
                    </div>

                    <div className="text-xs text-muted-foreground">{edu.period}</div>

                    <p className="text-muted-foreground leading-relaxed">{edu.description}</p>

                    {edu.activities.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground font-mono">ACTIVITIES</div>
                        <div className="flex flex-wrap gap-2">
                          {edu.activities.map((activity) => (
                            <span key={activity} className="px-2 py-1 text-xs border border-border rounded">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground font-mono">KEY SKILLS</div>
                      <div className="flex flex-wrap gap-2">
                        {edu.skills.slice(0, 6).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs text-muted-foreground border border-border rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" ref={(el) => (sectionsRef.current[5] = el)} className="py-16 sm:py-24">
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Certifications</h2>
              <div className="text-sm text-muted-foreground font-mono">80+ CERTIFICATIONS</div>
            </div>

            <div className="space-y-8">
              {[
                {
                  category: "Google Professional Certificates",
                  count: "40+",
                  certifications: [
                    "Google Data Analytics",
                    "Google Advanced Data Analytics",
                    "Google Cybersecurity",
                    "Google IT Support",
                    "Google IT Automation with Python",
                    "Google Project Management",
                    "Google Business Intelligence",
                    "Google Digital Marketing & E-commerce",
                    "Google UX Design",
                    "Google AI Essentials",
                  ],
                },
                {
                  category: "AWS Educate",
                  count: "8",
                  certifications: [
                    "AWS Cloud Ops",
                    "AWS Compute",
                    "AWS Databases",
                    "AWS Networking",
                    "AWS Storage",
                    "AWS Cloud 101",
                    "AWS Generative AI",
                    "AWS Machine Learning Foundations",
                  ],
                },
                {
                  category: "CompTIA & Cisco",
                  count: "7",
                  certifications: [
                    "CompTIA A+ (1000 Part 1 & 2)",
                    "CompTIA Security+ (SYO-501)",
                    "CompTIA Cloud (Basic & Advanced)",
                    "CISSP 2024",
                    "Cisco CCNA ICND1 v3",
                    "Cisco CCNA ICND2 v3",
                  ],
                },
                {
                  category: "Specialized Skills",
                  count: "5",
                  certifications: [
                    "Prompt Engineering Basics",
                    "Internet of Things Fundamentals",
                    "MS Office 2013 Transition",
                  ],
                },
              ].map((category, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        {category.category}
                      </h3>
                      <div className="text-sm text-muted-foreground font-mono">{category.count} CERTS</div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {category.certifications.map((cert) => (
                        <div
                          key={cert}
                          className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                        >
                          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="p-6 sm:p-8 bg-muted/30 border border-border rounded-lg">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Commitment to Excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Earned 80+ professional certifications between March and July 2025, demonstrating an unwavering
                  commitment to continuous learning and technical mastery. This comprehensive credential portfolio spans
                  cloud infrastructure, cybersecurity, data science, project management, and full-stack
                  development—reflecting a dedication to staying at the forefront of technological innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" ref={(el) => (sectionsRef.current[6] = el)} className="py-16 sm:py-24">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Technical Skills & Philosophy</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Programming Languages",
                  excerpt:
                    "Proficient in Java, Python, C++, C#, JavaScript, Lua, R, PHP, and Ruby. Currently expanding expertise in Godot game engine and Rust systems programming.",
                  category: "Core Languages",
                  highlight: "Multi-Language",
                },
                {
                  title: "Web Technologies",
                  excerpt:
                    "Comprehensive full-stack development capabilities spanning HTML5, CSS, React, Vue.js, Node.js, Express.js, Laravel, and Ruby on Rails. Experienced in building scalable, production-ready web applications.",
                  category: "Web Development",
                  highlight: "Full-Stack",
                },
                {
                  title: "Database Systems",
                  excerpt:
                    "Advanced proficiency in relational and NoSQL databases including MySQL, PostgreSQL, Redis, and MongoDB. Specialized in database architecture, query optimization, and performance tuning.",
                  category: "Data Management",
                  highlight: "Database Design",
                },
                {
                  title: "Development Philosophy",
                  excerpt:
                    "Advocate for composition over inheritance, clean code principles, comprehensive documentation, DRY methodology, and elegant simplicity. Committed to writing maintainable, scalable, and well-architected software.",
                  category: "Best Practices",
                  highlight: "Clean Code",
                },
              ].map((skill, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{skill.category}</span>
                      <span>{skill.highlight}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {skill.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{skill.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Learn more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-light">Current Focus</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "SQL & Database Management",
                  "Full-Stack Web Development",
                  "Algorithm Implementation",
                  "Software Architecture Design",
                ].map((focus) => (
                  <div key={focus} className="p-4 border border-border rounded-lg text-center">
                    <span className="text-sm text-muted-foreground">{focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[7] = el)} className="py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Actively seeking opportunities in software development, data analysis, and system architecture.
                  Passionate about collaborating on innovative projects and engaging in meaningful conversations about
                  technology's role in education and society.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:james.mcguigan@example.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">james.mcguigan@example.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "GitHub",
                    handle: "@Jimmyu2foru18",
                    url: "https://github.com/Jimmyu2foru18",
                  },
                  {
                    name: "LinkedIn",
                    handle: "james-mcguigan-jr",
                    url: "https://www.linkedin.com/in/james-mcguigan-jr-b26a5b317",
                  },
                  {
                    name: "YouTube",
                    handle: "@th3viousgameus",
                    url: "https://www.youtube.com/@th3viousgameus",
                  },
                  {
                    name: "Instagram",
                    handle: "@jimmyu2foru18",
                    url: "https://www.instagram.com/jimmyu2foru18",
                  },
                  {
                    name: "Twitter",
                    handle: "@th3viousgameus",
                    url: "https://x.com/th3viousgameus",
                  },
                  {
                    name: "TikTok",
                    handle: "@th3viousgameus",
                    url: "https://www.tiktok.com/@th3viousgameus?lang=en",
                  },
                  {
                    name: "Twitch",
                    handle: "@jimmyu2foru18",
                    url: "https://www.twitch.tv/jimmyu2foru18",
                  },
                  {
                    name: "Discord",
                    handle: "Join Server",
                    url: "https://discord.gg/cq792Zsb6C",
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 James McGuigan Jr. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with v0.dev</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
