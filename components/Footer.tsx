import React from 'react';
import { SOCIAL_LINKS, USER_PROFILE } from '../constants';
import { GithubIcon, LinkedinIcon, MailIcon, GitlabIcon, PhoneIcon } from './Icons';

const Footer: React.FC = () => {
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'github': return <GithubIcon className="w-5 h-5" />;
            case 'gitlab': return <GitlabIcon className="w-5 h-5" />;
            case 'linkedin': return <LinkedinIcon className="w-5 h-5" />;
            case 'mail': return <MailIcon className="w-5 h-5" />;
            case 'phone': return <PhoneIcon className="w-5 h-5" />;
            default: return null;
        }
    };

    return (
        <footer id="contact" className="bg-black text-slate-400 py-12 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <span className="text-2xl font-bold text-white tracking-tight">
                            {USER_PROFILE.name.split(' ')[0]}<span className="text-indigo-500">.</span>
                        </span>
                        <p className="text-sm mt-2 text-slate-500">
                            Building robust applications with quality at the core.
                        </p>
                        <div className="mt-4 flex flex-col gap-1 text-sm text-slate-400">
                           {USER_PROFILE.email && (
                             <a href={`mailto:${USER_PROFILE.email}`} className="hover:text-indigo-400 transition-colors">
                               {USER_PROFILE.email}
                             </a>
                           )}
                           {USER_PROFILE.phoneNumber && (
                             <a href={`tel:${USER_PROFILE.phoneNumber.replace(/\s/g, '')}`} className="hover:text-indigo-400 transition-colors">
                               {USER_PROFILE.phoneNumber}
                             </a>
                           )}
                        </div>
                    </div>

                    <div className="flex gap-6">
                        {SOCIAL_LINKS.map(link => (
                            <a 
                                key={link.platform}
                                href={link.url}
                                target={link.icon === 'mail' || link.icon === 'phone' ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors hover:scale-110 transform duration-200"
                                aria-label={link.platform}
                            >
                                {getIcon(link.icon)}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="border-t border-slate-900 mt-8 pt-8 text-center text-sm text-slate-600">
                    &copy; {new Date().getFullYear()} {USER_PROFILE.name}. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;