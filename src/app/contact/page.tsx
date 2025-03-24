"use client";

import ContactForm from '@/components/ContactForm';
import { FiMail, FiLinkedin } from 'react-icons/fi';

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <a
            href="mailto:bmcgauley44@gmail.com"
            className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <FiMail className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <span className="text-gray-800 dark:text-gray-200">bmcgauley44@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/brian-mcgauley-1602aa133/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <FiLinkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            <span className="text-gray-800 dark:text-gray-200">LinkedIn Profile</span>
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 