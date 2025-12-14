import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { contactConfig } from '@/lib/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  
  return {
    title: `${t('footer.terms')} - Neco`,
    description: 'Terms and Conditions for Neco web development services',
  };
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0D1117] py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Terms and Conditions
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing and using Neco's services, you agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Neco provides web development services including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Custom website design and development</li>
              <li>Website hosting services</li>
              <li>Technical support and maintenance</li>
              <li>SEO optimization</li>
              <li>Domain assistance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Pricing and Payment
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All prices are listed in USD and are subject to the package selected. 
              Payment is required before project commencement unless otherwise agreed in writing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Lifetime Hosting and Support
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our lifetime hosting and support services include server maintenance, security updates, 
              bug fixes, and technical assistance for as long as you use our hosting services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Upon full payment, you own the rights to your website content and design. 
              Neco retains the right to showcase your website in our portfolio unless otherwise requested.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Refund Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We offer a satisfaction guarantee. If you are not satisfied with our work before the final delivery, 
              you may request revisions or a refund as per our refund policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Neco shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
              resulting from your use or inability to use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Changes to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right to modify these terms at any time. 
              Changes will be effective immediately upon posting on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <ul className="list-none text-gray-700 dark:text-gray-300 space-y-2">
              <li>Email: <a href={`mailto:${contactConfig.email}`} className="text-primary hover:underline">{contactConfig.email}</a></li>
              <li>Telegram: <a href={contactConfig.telegram.url} className="text-primary hover:underline">@{contactConfig.telegram.handle}</a></li>
              <li>Phone: <a href={`tel:${contactConfig.phoneFormatted}`} className="text-primary hover:underline">{contactConfig.phone}</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

