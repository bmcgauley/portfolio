'use client';

import { useState } from 'react';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to send message');
      }

      setStatus('success');
      setMessage('');

      // Reset form status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to send message. Please try again.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message here..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' && (
            <>
              <FiSend className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Sending...
            </>
          )}
          {status === 'success' && (
            <>
              <FiCheck className="-ml-1 mr-3 h-5 w-5" />
              Sent Successfully!
            </>
          )}
          {status === 'error' && (
            <>
              <FiAlertCircle className="-ml-1 mr-3 h-5 w-5" />
              Try Again
            </>
          )}
          {status === 'idle' && (
            <>
              <FiSend className="-ml-1 mr-3 h-5 w-5" />
              Send Message
            </>
          )}
        </button>
      </div>

      {status === 'error' && (
        <div className="text-red-600 dark:text-red-400 text-sm text-center">
          {errorMessage}
        </div>
      )}
    </form>
  );
} 