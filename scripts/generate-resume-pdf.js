const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');

// Parse markdown and create custom HTML layout
function parseResumeMarkdown(markdown) {
  const lines = markdown.split('\n');
  let sections = {
    name: '',
    title: '',
    summary: '',
    contact: [],
    skills: [],
    experience: [],
    education: [],
    achievements: [],
    projects: [],
    interests: ''
  };
  
  let currentSection = '';
  let buffer = [];
  
  for (let line of lines) {
    if (line.startsWith('# ')) {
      sections.name = line.replace('# ', '').trim();
    } else if (line.startsWith('## ')) {
      const heading = line.replace('## ', '').trim();
      if (heading === 'FULL STACK DEVELOPER') {
        sections.title = heading;
      } else {
        currentSection = heading.toLowerCase().replace(/ /g, '_');
      }
    } else if (line.startsWith('**') && line.includes('|')) {
      // Work experience or project entry
      buffer.push(line);
    } else if (line.trim() && currentSection) {
      buffer.push(line);
    } else if (!line.trim() && buffer.length > 0) {
      // Process buffer
      if (currentSection === 'work_experience') {
        sections.experience.push(buffer.join('\n'));
      } else if (currentSection === 'education') {
        sections.education.push(buffer.join('\n'));
      } else if (currentSection === 'key_achievements') {
        sections.achievements = buffer;
      } else if (currentSection === 'featured_projects') {
        sections.projects.push(buffer.join('\n'));
      } else if (currentSection === 'skills') {
        sections.skills = buffer;
      } else if (currentSection === 'contact') {
        sections.contact = buffer;
      } else if (currentSection === 'interests') {
        sections.interests = buffer.join(' ');
      } else if (!currentSection && !sections.summary) {
        sections.summary = buffer.join(' ');
      }
      buffer = [];
    }
  }
  
  return sections;
}

// Custom CSS for professional two-column resume
const resumeCSS = `
  @page {
    margin: 0.35in 0.5in 0.5in 0.5in;
    size: letter;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.4;
    color: #333;
    font-size: 9pt;
  }
  
  .container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto auto auto;
    gap: 0 20px;
  }
  
  .header {
    grid-column: 1 / -1;
    margin-bottom: 10px;
  }
  
  .left-column {
    grid-column: 1;
    padding-right: 15px;
  }
  
  .right-column {
    grid-column: 2;
    background: #f5f5f5;
    padding: 12px;
    border-radius: 5px;
    align-self: start;
  }
  
  .projects-section {
    grid-column: 1 / -1;
    margin-top: 10px;
  }
  
  h1 {
    font-size: 26pt;
    color: #2c5f7c;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 3px;
  }
  
  .subtitle {
    font-size: 10pt;
    color: #7a9fb5;
    font-weight: 400;
    letter-spacing: 3px;
    margin-bottom: 7px;
  }
  
  .contact-strip {
    display: flex;
    gap: 20px;
    margin-bottom: 7px;
    padding: 5px 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  
  .contact-link {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 8.5pt;
    color: #2c5f7c;
    text-decoration: none;
    font-weight: 500;
  }
  
  .contact-link i {
    font-size: 9pt;
    color: #2c5f7c;
  }
  
  .summary {
    font-size: 8.5pt;
    line-height: 1.45;
    color: #555;
    margin-top: 6px;
  }
  
  h2 {
    font-size: 10pt;
    color: #555;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 8px 0 5px 0;
    padding-bottom: 2px;
    border-bottom: 2px solid #2c5f7c;
  }
  
  h2:first-child {
    margin-top: 0;
  }
  
  .right-column h2 {
    color: #2c5f7c;
    border-bottom-color: #7a9fb5;
  }
  
  .job-title {
    font-weight: 700;
    font-size: 9.5pt;
    color: #333;
    margin-bottom: 1px;
  }
  
  .company {
    font-size: 8.5pt;
    color: #666;
    font-style: italic;
  }
  
  .date {
    font-size: 7.5pt;
    color: #888;
    float: right;
  }
  
  .job-entry {
    margin-bottom: 7px;
    clear: both;
  }
  
  .edu-entry {
    margin-bottom: 6px;
  }
  
  .job-entry ul {
    margin: 2px 0 0 14px;
    list-style: disc;
  }
  
  .job-entry li {
    margin: 0.5px 0;
    font-size: 8pt;
    line-height: 1.3;
  }
  
  .edu-title {
    font-weight: 600;
    font-size: 8.5pt;
    color: #333;
  }
  
  .skill-category {
    margin: 4px 0;
    font-size: 8pt;
    line-height: 1.4;
  }
  
  .skill-category strong {
    color: #2c5f7c;
    font-weight: 600;
  }
  
  /* Full-width projects grid — 4 columns */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px 12px;
  }
  
  .project-entry {
    border-left: 2px solid #2c5f7c;
    padding-left: 6px;
  }
  
  .project-title {
    font-weight: 700;
    font-size: 8pt;
    color: #333;
  }
  
  .project-title a {
    color: #333;
    text-decoration: none;
  }
  
  .project-title a:hover {
    text-decoration: underline;
    color: #2c5f7c;
  }
  
  .project-tech {
    font-size: 7pt;
    color: #2c5f7c;
    font-style: italic;
    margin-top: 1px;
  }
  
  .project-desc {
    font-size: 7pt;
    color: #666;
    margin-top: 1px;
    line-height: 1.3;
  }
  
  .project-url {
    font-size: 6.5pt;
    color: #2c5f7c;
    margin-top: 1px;
  }
  
  .project-url a {
    color: #2c5f7c;
    text-decoration: none;
  }
  
  @media print {
    body {
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
  }
`;

async function generateResumePDF() {
  try {
    console.log('📄 Starting resume PDF generation...');
    
    // Read the markdown file
    const markdownPath = path.join(__dirname, '..', 'RESUME.md');
    const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
    
    console.log('✅ Markdown file loaded');
    
    // Create custom HTML layout
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sushil Kumar - Resume</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>${resumeCSS}</style>
      </head>
      <body>
        <div class="container">

          <!-- HEADER — full width -->
          <div class="header">
            <h1>SUSHIL KUMAR</h1>
            <div class="subtitle">FULL STACK DEVELOPER</div>
            <div class="contact-strip">
              <a href="mailto:sushil.devspace@gmail.com" class="contact-link">
                <i class="fas fa-envelope"></i> sushil.devspace@gmail.com
              </a>
              <a href="https://sushilkumar.space" class="contact-link" target="_blank">
                <i class="fas fa-globe"></i> sushilkumar.space
              </a>
              <a href="https://linkedin.com/in/sushil-kumar-b043ab304" class="contact-link" target="_blank">
                <i class="fab fa-linkedin"></i> LinkedIn
              </a>
              <span class="contact-link">
                <i class="fas fa-map-marker-alt"></i> Pune, Maharashtra
              </span>
              <span class="contact-link">
                <i class="fas fa-phone"></i> +91 9049203298
              </span>
            </div>
            <div class="summary">
              Dynamic Full Stack Developer with 3+ years of experience building high-performance, scalable, and responsive web solutions. Specialized in modern JavaScript frameworks, MERN stack development, and custom e-commerce solutions. Passionate about crafting products at the intersection of clean engineering and thoughtful design.
            </div>
          </div>

          <!-- LEFT COLUMN — Experience -->
          <div class="left-column">
            <h2>WORK EXPERIENCE</h2>

            <div class="job-entry">
              <div class="job-title">Full Stack Developer <span class="date">Apr 2025 - Present</span></div>
              <div class="company">Lifeidesign.games</div>
              <ul>
                <li>Built the entire platform solo — MERN stack, deployed on AWS EC2 with S3 for CDN and n8n for workflow automation</li>
                <li>Owned everything from DB schema to UI, shipping features end-to-end in a fast-paced product environment</li>
              </ul>
            </div>

            <div class="job-entry">
              <div class="job-title">Freelance Developer <span class="date">2024 - Present</span></div>
              <div class="company">Self-employed</div>
              <ul>
                <li>Pitched, closed, and delivered 15+ projects — handling scoping, client comms, and full-stack execution</li>
                <li>Built custom Shopify storefronts, MERN apps, and animated landing pages independently</li>
              </ul>
            </div>

            <div class="job-entry">
              <div class="job-title">Web Developer <span class="date">2024</span></div>
              <div class="company">Scaleon Media</div>
              <ul>
                <li>Delivered e-commerce and marketing sites across Shopify, WordPress, Webflow, and MERN for multiple clients</li>
                <li>Managed timelines and client expectations across concurrent projects</li>
              </ul>
            </div>

            <div class="job-entry">
              <div class="job-title">Web Developer Intern <span class="date">Jun 2024 - Jul 2024</span></div>
              <div class="company">Orbiting Infotech</div>
              <ul>
                <li>Worked on live projects contributing to frontend and backend across the MERN stack</li>
                <li>Collaborated with senior devs, participated in standups, and shipped production-ready features</li>
              </ul>
            </div>
          </div>

          <!-- RIGHT COLUMN — Skills + Education -->
          <div class="right-column">
            <h2>SKILLS</h2>
            <div class="skill-category"><strong>Frontend:</strong> JavaScript, TypeScript, React, Next.js, Redux, Tailwind CSS, GSAP, Framer Motion, Sass, Bootstrap</div>
            <div class="skill-category"><strong>Backend:</strong> Node.js, NestJS, Express.js, Python, Java</div>
            <div class="skill-category"><strong>Database:</strong> MySQL, PostgreSQL, MongoDB, Prisma, Firebase</div>
            <div class="skill-category"><strong>Cloud & DevOps:</strong> AWS, Google Cloud, Docker, Vercel, Hostinger</div>
            <div class="skill-category"><strong>CMS/eCommerce:</strong> Shopify, WordPress, Webflow</div>
            <div class="skill-category"><strong>Tools:</strong> Git, GitHub, Figma, Cursor, Kiro, n8n</div>

            <h2>EDUCATION</h2>
            <div class="edu-entry">
              <p><span class="edu-title">MIT College of Management</span></p>
              <p style="font-size: 7.5pt; margin-top: 2px;">BCA — Computer Applications</p>
              <p style="font-size: 7.5pt;">2022 - 2025 | CGPA: 8.39/10</p>
            </div>
            <div class="edu-entry">
              <p><span class="edu-title">Air Force School Viman Nagar</span></p>
              <p style="font-size: 7.5pt; margin-top: 2px;">Class 12th (CBSE) — 80%</p>
              <p style="font-size: 7.5pt;">Class 10th (CBSE) — 90.10%</p>
            </div>
          </div>

          <!-- PROJECTS — full width, 4-col grid -->
          <div class="projects-section" style="margin-top: 8px;">
            <h2>PROJECTS</h2>
            <div class="projects-grid">

              <div class="project-entry">
                <div class="project-title">Lifeidesign</div>
                <div class="project-tech">Next.js, Node.js, MongoDB, AWS, n8n</div>
                <div class="project-desc">Life gamification platform with games & journaling</div>
                <div class="project-url"><a href="https://app.lifeidesign.games" target="_blank">app.lifeidesign.games</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">The Silent Club</div>
                <div class="project-tech">Next.js, Node.js, MongoDB, AWS EC2/S3</div>
                <div class="project-desc">Exclusive resort booking with drag-and-drop planner</div>
                <div class="project-url"><a href="https://thesilent.club" target="_blank">thesilent.club</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Pikova</div>
                <div class="project-tech">React, Node.js, Express.js, MongoDB</div>
                <div class="project-desc">Subscription-based e-commerce platform</div>
                <div class="project-url"><a href="https://pikova.in" target="_blank">pikova.in</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">CottonClaws</div>
                <div class="project-tech">Shopify, Tailwind CSS, Framer Motion</div>
                <div class="project-desc">Custom streetwear storefront built from scratch</div>
                <div class="project-url"><a href="https://cottonclaws.store" target="_blank">cottonclaws.store</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Mandale Wellness</div>
                <div class="project-tech">Shopify, Tailwind CSS, GSAP, Framer Motion</div>
                <div class="project-desc">Premium beauty & wellness store with rich animations</div>
                <div class="project-url"><a href="https://mandalewellness.com" target="_blank">mandalewellness.com</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Trunkcall AI</div>
                <div class="project-tech">Next.js, Tailwind CSS, GSAP, Node.js</div>
                <div class="project-desc">Marketing site for AI video ad generation service</div>
                <div class="project-url"><a href="https://trunkcall.ai" target="_blank">trunkcall.ai</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Organic Chakki</div>
                <div class="project-tech">Shopify, Tailwind CSS, Framer Motion</div>
                <div class="project-desc">Custom organic food e-commerce storefront</div>
                <div class="project-url"><a href="https://organicchakki.life" target="_blank">organicchakki.life</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Alain Store</div>
                <div class="project-tech">Shopify, Tailwind CSS, Framer Motion</div>
                <div class="project-desc">Custom tech products e-commerce storefront</div>
                <div class="project-url"><a href="https://alainstore.in" target="_blank">alainstore.in</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Lets Live Tours</div>
                <div class="project-tech">MERN Stack</div>
                <div class="project-desc">Tour booking and travel platform</div>
                <div class="project-url"><a href="https://letslivetours.com" target="_blank">letslivetours.com</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Oacpens</div>
                <div class="project-tech">Shopify</div>
                <div class="project-desc">Custom Shopify e-commerce storefront</div>
                <div class="project-url"><a href="https://oacpens.com" target="_blank">oacpens.com</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">The Biryani Baithak</div>
                <div class="project-tech">Next.js</div>
                <div class="project-desc">Restaurant website with menu and ordering</div>
                <div class="project-url"><a href="https://www.thebiryanibaithak.in" target="_blank">thebiryanibaithak.in</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Little Pros Fit</div>
                <div class="project-tech">Next.js</div>
                <div class="project-desc">Kids fitness platform and program showcase</div>
                <div class="project-url"><a href="https://littlepros.fit" target="_blank">littlepros.fit</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Admit Scholar</div>
                <div class="project-tech">WordPress</div>
                <div class="project-desc">Education consultancy and admissions platform</div>
                <div class="project-url"><a href="https://admitscholar.com" target="_blank">admitscholar.com</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Skeft Studios</div>
                <div class="project-tech">Webflow</div>
                <div class="project-desc">Creative agency portfolio and services site</div>
                <div class="project-url"><a href="https://skeftstudios.com" target="_blank">skeftstudios.com</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Tommy Casa</div>
                <div class="project-tech">Shopify</div>
                <div class="project-desc">Custom Shopify storefront for home products</div>
                <div class="project-url"><a href="https://tommycasa.in" target="_blank">tommycasa.in</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Mihir Mandviya</div>
                <div class="project-tech">Next.js</div>
                <div class="project-desc">Personal portfolio and brand website</div>
                <div class="project-url"><a href="https://mihirmandviya.io" target="_blank">mihirmandviya.io</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Margikka</div>
                <div class="project-tech">WordPress</div>
                <div class="project-desc">Business website with custom design</div>
                <div class="project-url"><a href="https://margikka.com" target="_blank">margikka.com</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Wikolo</div>
                <div class="project-tech">WordPress</div>
                <div class="project-desc">Business website with custom design</div>
                <div class="project-url"><a href="https://wikolo.com" target="_blank">wikolo.com</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Izelli Lifestyle</div>
                <div class="project-tech">WordPress</div>
                <div class="project-desc">Lifestyle brand website and blog</div>
                <div class="project-url"><a href="https://izellifestyle.com" target="_blank">izellifestyle.com</a></div>
              </div>

              <div class="project-entry">
                <div class="project-title">Sushil Kumar</div>
                <div class="project-tech">Next.js, GSAP, Framer Motion</div>
                <div class="project-desc">Personal developer portfolio with animations</div>
                <div class="project-url"><a href="https://sushilkumar.space" target="_blank">sushilkumar.space</a></div>
              </div>

            </div>
          </div>

        </div>
      </body>
      </html>
    `;
    
    console.log('✅ HTML generated');
    
    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    console.log('✅ Browser launched');
    
    const page = await browser.newPage();
    await page.setContent(fullHTML, { waitUntil: 'networkidle0' });
    
    console.log('✅ Content loaded in browser');
    
    // Generate PDF
    const outputPath = path.join(__dirname, '..', 'public', 'Sushil_Kumar_Resume.pdf');
    await page.pdf({
      path: outputPath,
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });
    
    await browser.close();
    
    console.log('✅ PDF generated successfully!');
    console.log(`📍 Location: ${outputPath}`);
    
    return outputPath;
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  }
}

// Run the script
if (require.main === module) {
  generateResumePDF()
    .then(() => {
      console.log('\n🎉 Resume PDF generation complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Failed to generate resume PDF:', error);
      process.exit(1);
    });
}

module.exports = { generateResumePDF };
