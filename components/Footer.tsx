import { GENERAL_INFO } from '@/lib/data';
import GitHubCalendarWrapper from '@/components/GitHubCalendarWrapper';

const Footer = async () => {

    return (
        <footer className="text-center pb-5 pt-10" id="contact">
            <div className="container">
                <p className="text-base sm:text-lg">Have a project in mind?</p>
                <a
                    href={`mailto:${GENERAL_INFO.email}`}
                    className="text-xl sm:text-3xl md:text-4xl font-anton inline-block mt-5 mb-10 hover:underline break-all"
                >
                    {GENERAL_INFO.email}
                </a>

                <div className="mb-12 flex justify-center overflow-x-auto">
                    <GitHubCalendarWrapper />
                </div>

                <a
                    href="/Sushil_Kumar_Resume.pdf"
                    download="Sushil_Kumar_Resume.pdf"
                    className="group inline-flex items-center gap-3 mb-8 text-foreground hover:text-primary transition-colors duration-300 text-2xl sm:text-3xl md:text-4xl font-anton"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download CV
                </a>
            </div>
        </footer>
    );
};

export default Footer;
