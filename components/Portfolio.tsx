'use client';

import Image from 'next/image'
import { Github, Linkedin, Mail, Phone, Twitter, ChevronDown, ChevronUp, FileText, Menu, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { useInView } from 'react-intersection-observer'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('intro')
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const skills = ['Python', 'Deep Learning', 'Machine Learning', 'Computer Vision', 'GANs', 'LLMs', 'Data Science']

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'about', title: 'About' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'education', title: 'Education' },
    { id: 'skills', title: 'Skills' },
    { id: 'resume', title: 'Resume' },
    { id: 'contact', title: 'Contact' },
  ]

  const projects = [
    {
      title: "Sentimental analysis from url",
      href: "https://github.com/Himanshu040604/sentimental-analysis-from-url-",
      dates: "June 2024 - July 2024",
      description: "This project performs sentiment analysis on text extracted from specified URLs. It evaluates the sentiment of the content and calculates various readability metrics. The results are saved in a structured format for further analysis.",
      technologies: ["Python", "Pandas", "NLTK", "Beautiful Soup", "Requests"],
    },
    {
      title: "Reconstruction of image",
      href: "https://github.com/Himanshu040604/Reconstruction-of-image",
      dates: "June 2024 - July 2024",
      description: "This project builds an image autoencoder using PyTorch to compress and reconstruct images. It includes an encoder, decoder, and custom loss functions like Binary Cross-Entropy and LPIPS for enhanced perceptual similarity.",
      technologies: ["PyTorch", "NumPy", "Pillow (PIL)", "Matplotlib", "LPIPS"],
    },
    {
      title: "Binary image autoencoder",
      href: "https://github.com/Himanshu040604/Binary-Image-Autoencoder",
      dates: "June 2024 - July 2024",
      description: "This project uses machine learning techniques to transform binary data into visual representations (images) and then reconstruct these images back into their original binary form.",
      technologies: ["PyTorch", "NumPy", "Pillow (PIL)", "Matplotlib", "LPIPS", "Torchvision", "Adam Optimizer"],
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      scroll.scrollTo(element.offsetTop, {
        duration: 800,
        smooth: 'easeInOutQuart'
      })
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false)
    }
  }

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  useEffect(() => {
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(darkModePreference)
    if (darkModePreference) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const AnimatedSection = ({ children, id }: { children: React.ReactNode, id: string }) => {
    const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true,
    })

    return (
      <div
        ref={ref}
        id={id}
        className={`transition-opacity duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {children}
      </div>
    )
  }

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <aside className={`w-64 bg-white dark:bg-gray-800 shadow-lg fixed h-full overflow-y-auto transition-all duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:block z-30`}>
        <nav className="p-4">
          <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">Contents</h2>
          <ul>
            {sections.map((section) => (
              <li key={section.id} className="mb-2">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-2 py-1 rounded transition-colors duration-300 ${
                    activeSection === section.id ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 lg:ml-64 transition-all duration-300 ease-in-out bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow sticky top-0 z-20">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Himanshu's Portfolio</h1>
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white mr-4"
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="lg:hidden p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <AnimatedSection id="intro">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:mr-6 mb-4 md:mb-0">
                  <h2 className="text-3xl font-bold mb-2 text-green-600 dark:text-green-400">Hi, I'm Himanshu 👋</h2>
                  <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                    As a third-year Electronics and Computer Science Engineering student at KIIT, I specialize in AI and machine learning, with hands-on experience in GANs, LLMs, and data science.
                  </p>
                </div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202024-10-10%2019.52.27%20-%20A%20cartoon-style%20portrait%20of%20a%20young%20man%20with%20messy%20hair%20and%20a%20beard,%20wearing%20a%20green%20hoodie.%20He%20is%20smiling%20cheerfully,%20waving%20one%20hand%20toward%20the%20came-9x0CAUv8psNBFBhkbK2ZfulBqdQ6JL.webp"
                  alt="Himanshu's cartoon"
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-green-500 shadow-lg transition-transform duration-300 hover:scale-105 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
                />
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection id="about">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">About Me</h2>
              <p className="text-gray-600 dark:text-gray-300">
                With a passion for data science, machine learning, and AI, I have a strong academic background and practical experience from internships at IIT Bhilai and Cosmic365. My journey has involved working on exciting projects, hackathons, and real-world challenges, aiming to make an impact with innovative solutions.
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection id="experience">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">Experience</h2>
              <div>
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Data Science Intern</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Cosmic365 (July 2024 - Present)</p>
                <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                  <li>Collaborating on advanced ML models and deep learning frameworks</li>
                  <li>Analyzing and interpreting complex datasets to optimize decision-making</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">AI Research Intern</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">IIT Bhilai (May 2024 - August 2024)</p>
                <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
                  <li>Developed a self-recovery watermarking scheme using GANs and neural networks</li>
                  <li>Researched and applied advanced machine learning concepts to enhance model robustness</li>
                </ul>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection id="projects">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">Projects</h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <button
                    onClick={() => toggleProject(index)}
                    className="text-lg font-semibold text-gray-700 dark:text-gray-200 w-full text-left"
                  >
                    {project.title}
                    {expandedProject === index ? (
                      <ChevronUp className="inline-block ml-2" />
                    ) : (
                      <ChevronDown className="inline-block ml-2" />
                    )}
                  </button>
                  {expandedProject === index && (
                    <div className="mt-2 text-gray-600 dark:text-gray-300">
                      <p>{project.description}</p>
                      <p className="text-sm text-gray-500">Technologies: {project.technologies.join(', ')}</p>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </AnimatedSection>

          <AnimatedSection id="education">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">Education</h2>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Kalinga Institute of Industrial Technology</strong> - B.Tech in Electronics and Computer Science Engineering (2026)
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection id="skills">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">Skills</h2>
              <div className="flex flex-wrap">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 px-4 py-2 rounded-full mr-2 mb-2">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection id="resume">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">Resume</h2>
              <a
                href="/resume.pdf"
                className="inline-block bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition-colors"
              >
                Download Resume
                <FileText className="inline-block ml-2" />
              </a>
            </section>
          </AnimatedSection>

          <AnimatedSection id="contact">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">Contact Me</h2>
              <p className="text-gray-600 dark:text-gray-300">
                I'm always open to discussing new opportunities, projects, or collaborations! Feel free to reach out to me via email or connect with me on LinkedIn.
              </p>
              <div className="flex items-center space-x-6 mt-4">
                <a href="mailto:hs262764@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="https://github.com/Himanshu040604" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/himanshu040604/" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="tel:7223969645" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                  <Phone className="w-6 h-6" />
                </a>
                <a href="https://twitter.com/Himanshu040604" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </section>
          </AnimatedSection>
        </main>
      </div>
    </div>
  )
}
