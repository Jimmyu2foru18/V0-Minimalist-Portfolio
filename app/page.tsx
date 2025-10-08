"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
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
          {["intro", "projects", "work", "skills", "connect"].map((section) => (
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
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
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
                  Full-Stack Developer & Mathematics Tutor focused on advancing knowledge in
                  <span className="text-foreground"> software development</span>,
                  <span className="text-foreground"> web technologies</span>, and
                  <span className="text-foreground"> algorithmic problem-solving</span>.
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

        <section
          id="projects"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Featured Projects</h2>
              <div className="text-sm text-muted-foreground font-mono">50+ REPOSITORIES</div>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "System Design Project",
                  description: "Full-stack system design and architecture implementation with modern web technologies.",
                  tech: ["Next.js", "TypeScript", "System Design"],
                  url: "https://system-design-project.vercel.app",
                  category: "Web Development",
                },
                {
                  title: "Financial Management App",
                  description:
                    "Automated finance management system with JavaScript for personal budgeting and tracking.",
                  tech: ["JavaScript", "Automation", "Finance"],
                  url: "https://jimmyu2foru18.github.io/Financial-management-application-with-automation",
                  category: "Applications",
                },
                {
                  title: "A* Pathfinding Algorithm",
                  description:
                    "Interactive visualization of the A* pathfinding algorithm with real-time demonstration.",
                  tech: ["JavaScript", "Algorithms", "Visualization"],
                  url: "https://jimmyu2foru18.github.io/A-Pathfinding-Algorithm/demo.html",
                  category: "Algorithms",
                },
                {
                  title: "Tutorial Finder AI",
                  description: "AI-powered tool to find coding tutorials and learning resources for developers.",
                  tech: ["AI", "Python", "Machine Learning"],
                  url: "https://github.com/Jimmyu2foru18/Tutorial-Finder-AI",
                  category: "AI/ML",
                },
                {
                  title: "CarrotQuest Game",
                  description: "Interactive platformer game with character control and engaging gameplay mechanics.",
                  tech: ["JavaScript", "Game Development", "HTML5"],
                  url: "https://jimmyu2foru18.github.io/CarrotQuest/CarrotQuest.html",
                  category: "Games",
                },
                {
                  title: "GitHub Analyzer V2",
                  description:
                    "Python tool to analyze GitHub repositories and provide insights on code quality and metrics.",
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

            <div className="text-center">
              <Link
                href="https://github.com/Jimmyu2foru18"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
              >
                <span>View All Projects on GitHub</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section
          id="work"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2016 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  role: "Mathematics & CIS Tutor",
                  company: "SUNY Old Westbury",
                  description:
                    "Provide individualized tutoring in algebra, calculus, statistics, and CIS subjects. Simplify complex concepts and support students with assignments and exam preparation.",
                  tech: ["Mathematics", "Programming", "Database Design"],
                },
                {
                  year: "2023",
                  role: "Team Lead Manager",
                  company: "Starbucks",
                  description:
                    "Supervised team operations to maintain high performance and customer service standards. Implemented strategies to improve customer satisfaction and drive sales.",
                  tech: ["Leadership", "Sales Strategy", "Operations"],
                },
                {
                  year: "2022",
                  role: "Sales Expert",
                  company: "T-Mobile",
                  description:
                    "Built strong relationships with customers through attentive service. Collected and analyzed customer feedback to identify areas for improvement.",
                  tech: ["Customer Relations", "Data Analysis", "Communication"],
                },
                {
                  year: "2021",
                  role: "Store Manager",
                  company: "Starbucks",
                  description:
                    "Managed all aspects of store operations including staffing, inventory, and quality control. Developed strategies to increase customer loyalty and revenue.",
                  tech: ["Operations Management", "Team Leadership", "Analytics"],
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
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="skills"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Technical Skills & Philosophy</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Programming Languages",
                  excerpt: "Java, Python, C++, C#, JavaScript, Lua, R, PHP, Ruby. Currently learning Godot and Rust.",
                  category: "Core Languages",
                  highlight: "Multi-Language",
                },
                {
                  title: "Web Technologies",
                  excerpt:
                    "HTML5, CSS, React, Vue.js, Node.js, Express.js, Laravel, Ruby on Rails. Full-stack development expertise.",
                  category: "Web Development",
                  highlight: "Full-Stack",
                },
                {
                  title: "Database Systems",
                  excerpt: "MySQL, PostgreSQL, Redis, NoSQL, MongoDB. Strong database design and optimization skills.",
                  category: "Data Management",
                  highlight: "Database Design",
                },
                {
                  title: "Development Philosophy",
                  excerpt:
                    "Composition > Inheritance, Clean Code is Good Code, Document Whenever Possible, Use the DRY Principle, Strive for Simplicity.",
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

        <section id="connect" ref={(el) => (sectionsRef.current[4] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Open to opportunities in software development, data analysis, and system design. Always excited to
                  collaborate on innovative projects and discuss technology.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:jimmymcguigan18@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">jimmymcguigan18@gmail.com</span>
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
