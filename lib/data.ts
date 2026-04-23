import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'sushil.devspace@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Sushil, I am reaching out to you because...',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/Kumar-Sushil0' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/sushil-kumar-b043ab304/' },
];

export const TECH_STACK_ICONS: Record<string, string> = {
    'MERN': '/logo/mern.svg',
    // Frontend
    'HTML': '/logo/html.svg',
    'CSS': '/logo/css.svg',
    'JavaScript': '/logo/js.png',
    'TypeScript': '/logo/ts.png',
    'React': '/logo/react.png',
    'React.js': '/logo/react.png',
    'Next.js': '/logo/next.png',
    'Redux': '/logo/redux.png',
    'Tailwind CSS': '/logo/tailwind.png',
    'GSAP': '/logo/gsap.png',
    'Framer Motion': '/logo/framer-motion.png',
    'Sass': '/logo/sass.png',
    'Bootstrap': '/logo/bootstrap.svg',
    // Backend
    'Node.js': '/logo/node.png',
    'NestJS': '/logo/nest.svg',
    'Express.js': '/logo/express.png',
    'Python': '/logo/python.svg',
    'Java': '/logo/java.svg',
    // Database
    'MySQL': '/logo/mysql.svg',
    'PostgreSQL': '/logo/postgreSQL.png',
    'MongoDB': '/logo/mongodb.svg',
    'Prisma': '/logo/prisma.png',
    'Firebase': '/logo/firebase.svg',
    // Tools & Platforms
    'Git': '/logo/git.png',
    'Docker': '/logo/docker.svg',
    'AWS': '/logo/aws.png',
    'AWS EC2': '/logo/aws.png',
    'AWS S3': '/logo/aws.png',
    'Google Cloud': '/logo/google-cloud.svg',
    'n8n': '/logo/n8n.png',
    'Shopify': '/logo/shopify.svg',
    'Webflow': '/logo/webflow.svg',
    'WordPress': '/logo/wordpress.svg',
    'Vercel': '/logo/vercel.svg',
    'Hostinger': '/logo/hostinger.svg',
    'GitHub': '/logo/github.png',
};

export const MY_STACK = {
    frontend: [
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Redux',
            icon: '/logo/redux.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'GSAP',
            icon: '/logo/gsap.png',
        },
        {
            name: 'Framer Motion',
            icon: '/logo/framer-motion.png',
        },
        {
            name: 'Sass',
            icon: '/logo/sass.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'NestJS',
            icon: '/logo/nest.svg',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
        {
            name: 'Python',
            icon: '/logo/python.svg',
        },
        {
            name: 'Java',
            icon: '/logo/java.svg',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        {
            name: 'Prisma',
            icon: '/logo/prisma.png',
        },
        {
            name: 'Firebase',
            icon: '/logo/firebase.svg',
        },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
        {
            name: 'Google Cloud',
            icon: '/logo/google-cloud.svg',
        },
        {
            name: 'Cursor',
            icon: '/logo/cursor.png',
        },
        {
            name: 'Kiro',
            icon: '/logo/kiro.svg',
        },
        {
            name: 'n8n',
            icon: '/logo/n8n.png',
        },
        {
            name: 'Shopify',
            icon: '/logo/shopify.svg',
        },
        {
            name: 'Webflow',
            icon: '/logo/webflow.svg',
        },
        {
            name: 'WordPress',
            icon: '/logo/wordpress.svg',
        },
        {
            name: 'Vercel',
            icon: '/logo/vercel.svg',
        },
        {
            name: 'Hostinger',
            icon: '/logo/hostinger.svg',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Lifeidesign',
        slug: 'lifeidesign',
        liveUrl: 'https://app.lifeidesign.games',
        year: 2025,
        description: `
      Lifeidesign is a platform that helps you design and gamify your life — one weekend at a time. It features a collection of games targeting different aspects of life such as time, money, choices, sorrows, and confusions. Each game is paired with a journaling layer so you can reflect on your experiences and track personal growth over time.<br/><br/>

      Key Features:<br/>
      <ul>
        <li>Life Games: Interactive games targeting real-life challenges — finances, decisions, emotions, and more</li>
        <li>Life Journal: Built-in journaling to reflect on game outcomes and personal insights</li>
        <li>Automations: n8n-powered workflows for notifications, reminders, and background tasks</li>
        <li>Cloud Storage: User content and media stored on AWS S3</li>
        <li>Fully Responsive: Seamless experience across all devices</li>
      </ul><br/>

      Technical Highlights:
      <ul>
        <li>Next.js frontend with server-side rendering for fast, SEO-friendly pages</li>
        <li>Node.js + Express REST API backend</li>
        <li>MongoDB for flexible, document-based data storage</li>
        <li>n8n for workflow automation and event-driven triggers</li>
        <li>Deployed on AWS EC2 with static assets and media on S3</li>
      </ul>
      `,
        role: `
      Full-Stack Developer<br/>
      Owned the entire product from concept to deployment:
      <ul>
        <li>Frontend: Built the UI in Next.js with a focus on engaging, game-like interactions</li>
        <li>Backend: Designed and developed the REST API using Node.js and Express</li>
        <li>Database: Modeled and managed data with MongoDB</li>
        <li>Automation: Set up n8n workflows for automated user flows and background tasks</li>
        <li>Infrastructure: Deployed and managed the full stack on AWS EC2, with S3 for content storage</li>
      </ul>
      `,
        techStack: [
            'Next.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'n8n',
            'AWS EC2',
            'AWS S3',
        ],
        thumbnail: '/projects/thumbnail/lifeidesign.png',
        longThumbnail: '/projects/thumbnail/lifeidesign.png',
        images: [
            '/projects/images/lifeidesign/1.jpeg',
            '/projects/images/lifeidesign/2.jpeg',
            '/projects/images/lifeidesign/3.jpeg',
        ],
    },
    {
        title: 'CottonClaws',
        slug: 'cottonclaws',
        liveUrl: 'https://cottonclaws.store',
        year: 2026,
        description: `
      CottonClaws is a streetwear clothing brand with a bold, urban identity. The store is built on Shopify with a fully custom UI — every section, layout, and interaction was hand-coded to match the brand's aesthetic rather than relying on a generic theme.<br/><br/>

      Key Features:
      <ul>
        <li>Custom storefront UI built from scratch on Shopify</li>
        <li>Smooth page and element animations using Framer Motion</li>
        <li>Fully responsive design optimized for mobile-first shopping</li>
        <li>Tailwind CSS utility-first styling for consistent design language</li>
        <li>Custom product pages, collection layouts, and cart interactions</li>
      </ul>
      `,
        role: `
      Frontend Developer & Shopify Developer<br/>
      <ul>
        <li>Designed and built the entire storefront UI using HTML, CSS, and Tailwind CSS</li>
        <li>Implemented custom animations and transitions with Framer Motion</li>
        <li>Customized Shopify Liquid templates to support the bespoke design</li>
        <li>Ensured a seamless, performant shopping experience across all devices</li>
      </ul>
      `,
        techStack: [
            'Shopify',
            'HTML',
            'Tailwind CSS',
            'Framer Motion',
            'CSS',
        ],
        thumbnail: '/projects/thumbnail/cottonclaws.png',
        longThumbnail: '/projects/long/cottonclaws/1.png',
        images: [
            '/projects/images/cottonclaws/1.png',
            '/projects/images/cottonclaws/3.png',
        ],
    },
    {
        title: 'Trunckcall Ai',
        slug: 'trunckcall-ai',
        liveUrl: 'https://trunkcall.ai',
        year: 2026,
        description: `
      Trunkcall AI is a service that generates hyperrealistic AI video ads for brands. I built the marketing website — a polished, animated landing page where potential clients can learn about the service and get in touch.<br/><br/>

      Key Features:
      <ul>
        <li>High-impact landing page with smooth GSAP-powered animations</li>
        <li>Contact form with Node.js email handling on the backend</li>
        <li>reCAPTCHA integration to prevent spam submissions</li>
        <li>Fully responsive layout built with Tailwind CSS</li>
      </ul>
      `,
        role: `
      Frontend Developer<br/>
      <ul>
        <li>Built the entire website using Next.js and Tailwind CSS</li>
        <li>Implemented scroll and entrance animations using GSAP</li>
        <li>Set up a Node.js backend route for email handling via the contact form</li>
        <li>Integrated Google reCAPTCHA for form verification</li>
      </ul>
      `,
        techStack: [
            'Next.js',
            'Tailwind CSS',
            'GSAP',
            'Node.js',
        ],
        thumbnail: '/projects/thumbnail/trunkcall.jpg',
        longThumbnail: '/projects/long/trunckcall-ai/1.png',
        images: [
            '/projects/images/trunckcall-ai/1.png',
        ],
    },
    {
        title: 'Organic Chakki',
        slug: 'organic-chakki',
        liveUrl: 'https://organicchakki.life',
        year: 2026,
        description: `
      Organic Chakki is a Shopify e-commerce store selling organic grains, seeds, and natural food products. Like CottonClaws, the entire storefront UI was custom-coded — no generic theme, just a clean and purposeful design built to match the brand's organic identity.<br/><br/>

      Key Features:
      <ul>
        <li>Custom Shopify storefront UI built from scratch</li>
        <li>Smooth animations and transitions using Framer Motion</li>
        <li>Tailwind CSS for consistent, responsive styling</li>
        <li>Custom product and collection pages tailored to the brand</li>
        <li>Mobile-first design for a seamless shopping experience</li>
      </ul>
      `,
        role: `
      Frontend Developer & Shopify Developer<br/>
      <ul>
        <li>Built the full storefront UI using HTML, CSS, and Tailwind CSS</li>
        <li>Implemented animations and interactions with Framer Motion</li>
        <li>Customized Shopify Liquid templates to support the bespoke design</li>
        <li>Ensured performance and responsiveness across all screen sizes</li>
      </ul>
      `,
        techStack: [
            'Shopify',
            'HTML',
            'Tailwind CSS',
            'Framer Motion',
            'CSS',
        ],
        thumbnail: '/projects/thumbnail/organicchakki.png',
        longThumbnail: '/projects/thumbnail/organicchakki.png',
        images: [
            '/projects/images/organic-chakki/1.png',
            '/projects/images/organic-chakki/2.png',
        ],
    },
    {
        title: 'Pikova',
        slug: 'pikova',
        liveUrl: 'https://pikova.in',
        year: 2026,
        description: `
      Pikova is a subscription-based e-commerce platform for premium spring bottled water. The entire platform is custom-built using the MERN stack — no off-the-shelf solution, just a fully tailored storefront and backend designed around a recurring subscription model.<br/><br/>

      Key Features:
      <ul>
        <li>Subscription-based purchasing flow for recurring water deliveries</li>
        <li>Custom React frontend with a clean, product-focused UI</li>
        <li>Node.js + Express REST API handling orders and subscriptions</li>
        <li>MongoDB for managing users, orders, and subscription data</li>
        <li>Fully responsive design across all devices</li>
      </ul>
      `,
        role: `
      Full-Stack Developer<br/>
      <ul>
        <li>Built the React frontend from scratch with a focus on conversion and UX</li>
        <li>Developed the backend API using Node.js and Express</li>
        <li>Designed the MongoDB schema for users, products, and subscriptions</li>
        <li>Implemented the subscription logic and order management flow end-to-end</li>
      </ul>
      `,
        techStack: [
            'React',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Tailwind CSS',
        ],
        thumbnail: '/projects/thumbnail/pikova.png',
        longThumbnail: '/projects/long/pikova/1.png',
        images: [
            '/projects/images/pikova/1.png',
        ],
    },
    {
        title: 'Alain Store',
        slug: 'alain-store',
        liveUrl: 'https://alainstore.in',
        year: 2025,
        description: `
      Alain Store is a Shopify e-commerce store selling tech products. Like the other Shopify projects, the storefront was fully custom-coded — no default theme, just a clean tech-focused UI built to give the brand its own identity.<br/><br/>

      Key Features:
      <ul>
        <li>Custom Shopify storefront UI built from scratch</li>
        <li>Smooth animations and transitions using Framer Motion</li>
        <li>Tailwind CSS for a consistent, responsive design system</li>
        <li>Custom product and collection pages tailored to tech retail</li>
        <li>Mobile-first, performance-optimized layout</li>
      </ul>
      `,
        role: `
      Frontend Developer & Shopify Developer<br/>
      <ul>
        <li>Built the full storefront UI using HTML, CSS, and Tailwind CSS</li>
        <li>Implemented animations and interactions with Framer Motion</li>
        <li>Customized Shopify Liquid templates to support the bespoke design</li>
        <li>Ensured a fast, responsive experience across all devices</li>
      </ul>
      `,
        techStack: [
            'Shopify',
            'HTML',
            'Tailwind CSS',
            'Framer Motion',
            'CSS',
        ],
        thumbnail: '/projects/thumbnail/alain.png',
        longThumbnail: '/projects/thumbnail/alain.png',
        images: [
            '/projects/images/alain-store/1.png',
            '/projects/images/alain-store/2.png',
        ],
    },
    {
        title: 'Mandale Wellness',
        slug: 'mandale-wellness',
        liveUrl: 'https://mandalewellness.com',
        year: 2025,
        description: `
      Mandale Wellness is a Shopify e-commerce store selling beauty and wellness products. The storefront features a fully custom UI with rich interactive animations — built to feel premium and immersive, matching the brand's wellness identity.<br/><br/>

      Key Features:
      <ul>
        <li>Custom Shopify storefront UI built from scratch</li>
        <li>Interactive GSAP animations for scroll, hover, and entrance effects</li>
        <li>Smooth transitions powered by Framer Motion</li>
        <li>Tailwind CSS for a clean, responsive design system</li>
        <li>Custom product and collection pages with a luxury feel</li>
      </ul>
      `,
        role: `
      Frontend Developer & Shopify Developer<br/>
      <ul>
        <li>Built the full storefront UI using HTML, CSS, and Tailwind CSS</li>
        <li>Implemented complex interactive animations using GSAP</li>
        <li>Added smooth transitions and micro-interactions with Framer Motion</li>
        <li>Customized Shopify Liquid templates to support the bespoke design</li>
        <li>Optimized for performance and responsiveness across all devices</li>
      </ul>
      `,
        techStack: [
            'Shopify',
            'HTML',
            'Tailwind CSS',
            'GSAP',
            'Framer Motion',
            'CSS',
        ],
        thumbnail: '/projects/thumbnail/mandalewellness.png',
        longThumbnail: '/projects/long/mandale-wellness/1.png',
        images: [
            '/projects/long/mandale-wellness/2.png',
        ],
    },
    {
        title: 'The Silent Club',
        slug: 'the-silent-club',
        liveUrl: 'https://thesilent.club',
        year: 2026,
        description: `
      The Silent Club is a booking platform for an exclusive, approval-only silent resort — a place where silence is the rule and guests are encouraged to disconnect. The experience starts on the website itself, where guests can design their entire stay by dragging and dropping activities into a personal timetable.<br/><br/>

      Key Features:
      <ul>
        <li>Approval-only entry flow — guests apply and await confirmation</li>
        <li>Drag-and-drop day planner to build a personal activity schedule</li>
        <li>Activity library curated by the resort, pulled dynamically from the backend</li>
        <li>Full booking management system with user accounts</li>
        <li>Media and assets served via AWS S3 as CDN</li>
        <li>Deployed on AWS EC2 for reliable, scalable hosting</li>
      </ul>
      `,
        role: `
      Full-Stack Developer<br/>
      <ul>
        <li>Built the Next.js frontend including the drag-and-drop timetable UI</li>
        <li>Developed the REST API using Node.js and Express</li>
        <li>Designed MongoDB schemas for users, bookings, and activity data</li>
        <li>Integrated AWS S3 for media storage and CDN delivery</li>
        <li>Deployed and managed the full stack on AWS EC2</li>
      </ul>
      `,
        techStack: [
            'Next.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'AWS EC2',
            'AWS S3',
            'Drag & Drop',
        ],
        thumbnail: '/projects/thumbnail/TheSilentClub.png',
        longThumbnail: '/projects/thumbnail/TheSilentClub.png',
        images: [
            '/projects/images/the-silent-club/1.png',
            '/projects/images/the-silent-club/2.png',
        ],
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Full Stack Developer',
        company: 'Lifeidesign.games',
        duration: 'Apr 2025 - Present',
    },
    {
        title: 'Freelance Developer',
        company: 'Self-employed',
        duration: '2024 - Present',
    },
    {
        title: 'Web Developer',
        company: 'Scaleon Media',
        duration: '2024',
    },
    {
        title: 'Web Developer Intern',
        company: 'Orbiting Infotech',
        duration: 'Jun 2024 - Jul 2024',
    },
];

export const MORE_PROJECTS: { title: string; url: string; tags: string[] }[] = [
    { title: 'Lets Live Tours', url: 'https://letslivetours.com', tags: ['MERN'] },
    { title: 'Oacpens', url: 'https://oacpens.com', tags: ['Shopify'] },
    { title: 'Margikka', url: 'https://margikka.com', tags: ['WordPress'] },
    { title: 'Wikolo', url: 'https://wikolo.com', tags: ['WordPress'] },
    { title: 'Izelli Lifestyle', url: 'https://izellifestyle.com', tags: ['WordPress'] },
    { title: 'The Biryani Baithak', url: 'https://www.thebiryanibaithak.in', tags: ['Next.js'] },
    { title: 'Little Pros Fit', url: 'https://littlepros.fit', tags: ['Next.js'] },
    { title: 'Admit Scholar', url: 'https://admitscholar.com', tags: ['WordPress'] },
    { title: 'Skeft Studios', url: 'https://skeftstudios.com', tags: ['Webflow'] },
    { title: 'Tommy Casa', url: 'https://tommycasa.in', tags: ['Shopify'] },
    { title: 'Mihir Mandviya', url: 'https://mihirmandviya.io', tags: ['Next.js'] },
    { title: 'Sushil Kumar', url: 'https://sushilkumar.space', tags: ['Next.js'] },
];
