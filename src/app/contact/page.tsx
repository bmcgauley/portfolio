"use client";

import ContactForm from '@/components/ContactForm';
import { FiMail, FiLinkedin } from 'react-icons/fi';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Card className="cursor-pointer">
                <CardContent className="flex items-center justify-center p-6">                  <Button variant="ghost" asChild className="w-full">
                    <a href="mailto:brian@mcgauley.com" className="flex items-center">
                      <FiMail className="w-6 h-6 text-primary mr-3" />
                      <span>brian@mcgauley.com</span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent>
              Click to send me an email directly
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Card className="cursor-pointer">
                <CardContent className="flex items-center justify-center p-6">                  <Button variant="ghost" asChild className="w-full">
                    <a
                      href="https://www.linkedin.com/in/bmcgauley/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <FiLinkedin className="w-6 h-6 text-primary mr-3" />
                      <span>LinkedIn Profile</span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent>
              Connect with me on LinkedIn
            </HoverCardContent>
          </HoverCard>
        </div>

        <ContactForm />
      </div>
    </div>
  );
} 