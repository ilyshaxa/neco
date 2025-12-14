import React from "react";

interface FooterModernProps {
  logo?: {
    url: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string; onClick?: (e: React.MouseEvent) => void }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  contactLinks?: Array<{
    icon: React.ReactElement;
    text: string;
    href: string;
  }>;
}

export const FooterModern = ({
  logo = {
    url: "/",
    title: "Neco",
  },
  sections = [],
  description = "",
  socialLinks = [],
  copyright = "",
  contactLinks = [],
}: FooterModernProps) => {
  return (
    <footer className="bg-gray-50 dark:bg-[#0D1117] text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start">
          {/* Left Section - Logo & Description */}
          <div className="flex w-full flex-col justify-between gap-6 lg:max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <a href={logo.url} className="text-3xl font-bold">
                <span className="text-gray-900 dark:text-white">N</span>
                <span className="text-primary">{logo.title.slice(1)}</span>
              </a>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {description}
            </p>

            {/* Contact Links */}
            {contactLinks.length > 0 && (
              <ul className="flex flex-col gap-3">
                {contactLinks.map((contact, idx) => (
                  <li key={idx}>
                    <a
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {contact.icon}
                      <span>{contact.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <ul className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                {socialLinks.map((social, idx) => (
                  <li key={idx} className="hover:text-primary transition-colors">
                    <a 
                      href={social.href} 
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Section - Link Columns */}
          <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-gray-900 dark:text-white">{section.title}</h3>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    >
                      <a 
                        href={link.href}
                        onClick={link.onClick}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

