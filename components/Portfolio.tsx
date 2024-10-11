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
      description: "This project performs sentiment analysis on text extracted from specified URLs. It evaluates the sentiment of the content and calculates various readability metrics. The results are saved in a structured format for further analysis",
      technologies: ["Python", "Pandas", "NLTK", "Beautiful Soup", "Requests"],
    },
    {
      title: "Reconstruction of image",
      href: "https://github.com/Himanshu040604/Reconstruction-of-image",
      dates: "June 2024 - July 2024",
      description: "This project builds an image autoencoder using PyTorch to compress and reconstruct images. It includes an encoder, decoder, and custom loss functions like Binary Cross-Entropy and LPIPS for enhanced perceptual similarity. With support for batch processing and data visualization, it enables efficient image compression and feature extraction, making it a practical tool for image-based tasks.",
      technologies: ["PyTorch", "NumPy", "Pillow (PIL)", "Matplotlib", "LPIPS"],
    },
    {
      title: "Binary image autoencoder",
      href: "https://github.com/Himanshu040604/Binary-Image-Autoencoder",
      dates: "June 2024 - July 2024",
      description: "This project uses advanced machine learning techniques to transform binary data into visual representations (images) and then reconstructs these images back into their original binary form. It utilizes convolutional layers to extract meaningful features from images and fully connected layers to encode and decode data.",
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
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 transition-all duration-300 ease-in-out bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow sticky top-0 z-20">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Portfolio</h1>
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
          {/* Introduction Section */}
          <AnimatedSection id="intro">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:mr-6 mb-4 md:mb-0">
                  <h2 className="text-3xl font-bold mb-2 text-green-600 dark:text-green-400">Hi, I am Himanshu 👋</h2>
                  <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                    As a third-year Electronics and Computer Science Engineering student at KIIT, I specialize in AI and machine learning, with hands-on experience in GANs, LLMs, and data science. Through projects and a summer internship at IIT Bhilai, I have applied my skills to real-world challenges. I am driven by a passion for learning and developing innovative, impactful solutions.
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

          {/* About Section */}
          <AnimatedSection id="about">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">About</h2>
              <p className="text-gray-600 dark:text-gray-300">
                In August 2024, I completed a 3-month internship at IIT Bhilai, where I gained hands-on experience with neural networks, deep learning concepts like UNet, and specialized in AI tools. I have also been actively expanding my expertise in GANs, LLMs, and RAG models and have participated in 4 hackathons, enhancing my problem-solving skills and applying technical knowledge in real-world challenges.
              </p>
            </section>
          </AnimatedSection>

          {/* Work Experience Section */}
          <AnimatedSection id="experience">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Work Experience</h2>
              <div className="border-l-2 border-green-500 pl-4">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">Research Intern</h3>
                <p className="text-gray-600 dark:text-gray-300">Indian Institute of Technology, Bhilai</p>
                <p className="text-gray-500 dark:text-gray-400">May 2024 - August 2024 | On-site</p>
                <p className="mt-2 text-gray-700 dark:text-gray-200">
                  Implemented and worked on a project entitled Self recovery watermarking scheme. I developed a self-recovery watermarking scheme using an autoencoder and UNet model. Latent features from the autoencoder, combined with the original image, are used to reconstruct the image. The process optimizes reconstruction accuracy with L1 and perceptual LPIPS loss, embedding watermarking information.
                </p>
              </div>
            </section>
          </AnimatedSection>

          {/* Projects Section */}
          <AnimatedSection id="projects">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Projects</h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-6 last:mb-0 border-l-2 border-green-500 pl-4">
                  <button
                    onClick={() => toggleProject(index)}
                    aria-expanded={expandedProject === index}
                    aria-controls={`project-description-${index}`}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-xl font-semibold">
                      <a href={project.href} className="text-green-600 dark:text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">{project.title}</a>
                    </h3>
                    {expandedProject === index ? <ChevronUp className="text-green-500" /> : <ChevronDown className="text-green-500" />}
                  </button>
                  <p className="text-gray-500 dark:text-gray-400">{project.dates}</p>
                  <div
                    id={`project-description-${index}`}
                    className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${expandedProject === index ? 'max-h-96' : 'max-h-0'}`}
                  >
                    <p className="text-gray-700 dark:text-gray-200 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-green-100 dark:bg-green-800 text-green-800  dark:text-green-200 rounded-full px-3 py-1 text-sm font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </AnimatedSection>

          {/* Education Section */}
          <AnimatedSection id="education">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300  hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Education</h2>
              {[
                {
                  school: "Geeks for geeks",
                  href: "https://www.geeksforgeeks.org/",
                  degree: "Machine learning and Data Science",
                  logoUrl: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png",
                  start: "2024",
                },
                {
                  school: "Kalinga Institute of Industrial Technology",
                  href: "https://kiit.ac.in/",
                  degree: "BTECH Degree of Electronics and Computer Science (ECS)",
                  logoUrl: "https://kiit.ac.in/wp-content/uploads/2022/09/KIIT-Logo-1-1024x1024.png",
                  start: "2022",
                  end: "2026",
                },
              ].map((edu, index) => (
                <div key={index} className="flex items-center mb-4 last:mb-0">
                  <Image src={edu.logoUrl} alt={edu.school} width={50} height={50} className="mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold">
                      <a href={edu.href} className="text-green-600 dark:text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">{edu.school}</a>
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200">{edu.degree}</p>
                    <p className="text-gray-500 dark:text-gray-400">{edu.start} - {edu.end || 'Present'}</p>
                  </div>
                </div>
              ))}
            </section>
          </AnimatedSection>

          {/* Skills Section */}
          <AnimatedSection id="skills">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full px-3 py-1 text-sm font-semibold transition-all duration-300 hover:bg-green-200 dark:hover:bg-green-700">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </AnimatedSection>

          {/* Resume Section */}
          <AnimatedSection id="resume">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Resume</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                View or download my full resume to learn more about my qualifications, experience, and skills.
              </p>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
              >
                <FileText className="mr-2" />
                View Resume (PDF)
              </a>
            </section>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection id="contact">
            <section className="bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <a href="mailto:hs262764@gmail.com" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300">
                  <Mail className="mr-2" /> hs262764@gmail.com
                </a>
                <a href="tel:+917223969645" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300">
                  <Phone className="mr-2" /> +91-7223969645
                </a>
                <a href="https://x.com/hs262764?t=UebnNttVd5TWibsHHHMuIw&s=09" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  <Twitter className="mr-2" /> @hs262764
                </a>
                <a href="https://linkedin.com/in/himanshu040604" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  <Linkedin className="mr-2" /> /in/himanshu040604
                </a>
                <a href="https://github.com/Himanshu040604" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300">
                  <Github className="mr-2" /> /Himanshu040604
                </a>
              </div>
              <form className="mt-6">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
                </div>
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300">
                  Send Message
                </button>
              </form>
            </section>
          </AnimatedSection>
        </main>
      </div>
    </div>
  )
}