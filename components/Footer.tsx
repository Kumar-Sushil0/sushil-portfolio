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
            </div>
        </footer>
    );
};

export default Footer;
