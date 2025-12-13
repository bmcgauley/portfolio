"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiBook, FiCalendar, FiX, FiEye } from "react-icons/fi";

// Book/Publication type
interface Publication {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImage?: string;
  jacketImage?: string;
  status: "coming-soon" | "available" | "pre-order";
  releaseDate?: string;
  purchaseLink?: string;
  tags: string[];
  preface?: string;
  series?: string;
}

// Publications data
const publications: Publication[] = [
  {
    id: "github-fundamentals",
    title: "GitHub Fundamentals for Teams",
    subtitle: "Series 1: Version Control for Non-Developers",
    description:
      "A comprehensive guide to Git and GitHub designed for teams transitioning from traditional file sharing to version control. Written for students, early-career professionals, and teams who want to understand the 'why' before the 'how.' Companion to the video course series.",
    jacketImage: "/images/publications/Front-cover_github_fundamentals_for_teams.png",
    status: "coming-soon",
    releaseDate: "2025",
    series: "GitHub Fundamentals",
    tags: ["Version Control", "GitHub", "Team Collaboration", "Non-Technical"],
    preface: `How to Use This Book

If you have ever sent a colleague a file named something like project_final_v2_REALLY_FINAL.zip, this book is for you.

If you have ever opened a shared folder and discovered that your changes vanished overnight, replaced by someone else's older version, you are in the right place.

And if you have ever stared at your computer screen, paralyzed by the fear that one wrong click will erase weeks of work, you are about to discover why millions of professionals have made version control an essential part of their workflow.

Why This Book Exists

Version control systems have been around for decades. Git itself has existed since 2005. GitHub launched in 2008. So why do so many teams still struggle with chaotic file management, lost work, and the dreaded "who changed what?" mystery?

The answer is surprisingly simple: most learning materials about Git and GitHub were written by developers, for developers. They assume you already understand concepts like "the command line," "branching," and "merge conflicts." They dive straight into terminal commands without explaining why those commands matter for your team's productivity.

This book takes a different approach. We start with the business problem, not the technical solution. We explain the "why" before the "how." And we focus on the GitHub web interface rather than the command line, because most non-technical professionals will do their daily work through a browser, not a terminal window.

A Companion to the Video Series

This text serves as the official companion reference to the Series 1: GitHub Fundamentals for Teams video course. It is not a transcript of those videos. Think of the relationship this way:

The videos show you the how. They demonstrate clicking through interfaces, navigating menus, and completing tasks in real time. Video excels at showing movement, process, and sequence.

This book explains the why. It provides the theory behind the practice, the context for the commands, and the reference material you will return to when you need to look something up six months from now. Books excel at explanation, reference, and depth.

Imagine learning to drive. Your driving instructor sits beside you and guides your hands on the wheel. That is the video series. But you also need the owner's manual and the rules of the road. That is this book. You turn to these pages when you need to recall a specific procedure, settle a debate about workflow strategy, or refresh your understanding of a concept before a team discussion.

Who This Book Is For

We wrote this content for readers who fit into two primary categories.

Students and early-career professionals building their portfolios and preparing to enter the workforce. If you are working on your first group project, contributing to open-source software, or simply want to understand how professional teams manage code, this book provides the foundational knowledge you need. Employers increasingly expect familiarity with Git and GitHub, even for non-developer roles like project management, technical writing, and product design.

Teams transitioning from traditional file sharing to version control. If your organization currently relies on shared network drives, Dropbox, Google Drive, or email attachments to collaborate on files, and you have experienced the frustration of overwritten work or conflicting versions, this book provides the "rules of engagement" necessary to make the switch successfully.

What You Will Learn

By the time you finish this book, you will be able to:

• Explain why version control matters for business continuity and risk management
• Create a GitHub account and configure your profile for professional use
• Build a properly structured repository with appropriate documentation
• Use Issues and Pull Requests to coordinate work with teammates
• Implement branching strategies that protect your production code
• Organize projects using GitHub's built-in task management tools
• Configure basic automation workflows that reduce manual overhead
• Execute a complete collaboration workflow from planning through deployment

Prerequisites

Before beginning, ensure you have:

• A computer with internet access and a modern web browser
• An email address you can access for account verification
• Basic familiarity with files and folders on your computer
• Approximately 8 to 12 hours available for reading and practice

No programming experience is required. No command-line knowledge is assumed.`,
  },
];

// Preface content renderer with proper typography
function PrefaceRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inBulletList = false;
  let bulletItems: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        elements.push(
          <p key={elements.length} className="text-foreground/85 leading-relaxed mb-4">
            {text}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushBulletList = () => {
    if (bulletItems.length > 0) {
      elements.push(
        <ul key={elements.length} className="space-y-2 mb-6 ml-4">
          {bulletItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-secondary mt-1.5 text-xs">●</span>
              <span className="text-foreground/85 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
      bulletItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Empty line - flush current content
    if (!trimmed) {
      if (inBulletList) {
        flushBulletList();
        inBulletList = false;
      } else {
        flushParagraph();
      }
      return;
    }

    // Bullet point
    if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
      if (!inBulletList) {
        flushParagraph();
        inBulletList = true;
      }
      bulletItems.push(trimmed.replace(/^[•\-*]\s*/, ""));
      return;
    }

    // If we were in a bullet list, flush it
    if (inBulletList) {
      flushBulletList();
      inBulletList = false;
    }

    // Check if this is a header (short line, no ending punctuation, followed by content)
    const isHeader =
      trimmed.length < 60 &&
      !trimmed.endsWith(".") &&
      !trimmed.endsWith(",") &&
      !trimmed.endsWith(":") &&
      index < lines.length - 1 &&
      currentParagraph.length === 0;

    if (isHeader) {
      flushParagraph();
      elements.push(
        <h4
          key={elements.length}
          className="text-lg font-semibold text-foreground mt-8 mb-3 pb-2 border-b border-border/50"
        >
          {trimmed}
        </h4>
      );
      return;
    }

    // Regular text - add to current paragraph
    currentParagraph.push(trimmed);
  });

  // Flush any remaining content
  if (inBulletList) {
    flushBulletList();
  } else {
    flushParagraph();
  }

  return <div className="preface-content">{elements}</div>;
}

const statusConfig = {
  "coming-soon": {
    label: "Coming Soon",
    className: "bg-secondary/20 text-secondary border-secondary/30",
  },
  available: {
    label: "Available Now",
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  "pre-order": {
    label: "Pre-Order",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
};

// Preview Modal Component
function PreviewModal({
  publication,
  onClose,
}: {
  publication: Publication;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4 flex items-start justify-between">
          <div>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border mb-2 ${
                statusConfig[publication.status].className
              }`}
            >
              {statusConfig[publication.status].label}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {publication.title}
            </h2>
            {publication.subtitle && (
              <p className="text-sm text-secondary mt-1">
                {publication.subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Close preview"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 pt-6 pb-16">
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            {/* Book Cover Image */}
            {publication.jacketImage && (
              <div className="relative w-48 sm:w-56 flex-shrink-0 mx-auto sm:mx-0">
                <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-muted shadow-lg">
                  <Image
                    src={publication.jacketImage}
                    alt={`${publication.title} - Book Cover`}
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>
              </div>
            )}

            {/* Quick Info */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-foreground/80 leading-relaxed mb-4">
                {publication.description}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {publication.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-muted text-foreground px-2 py-1 rounded text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-secondary mb-4 flex items-center gap-2">
              <FiBook className="w-5 h-5" />
              Preface Preview
            </h3>
            {publication.preface ? (
              <PrefaceRenderer content={publication.preface} />
            ) : (
              <p className="text-muted-foreground italic">
                Preview content coming soon.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex flex-wrap gap-3 justify-end">
          {publication.purchaseLink && publication.status === "available" && (
            <Link
              href={publication.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/90 text-[#0a1929] font-medium rounded-md transition-colors text-sm"
            >
              <FiBook className="w-4 h-4" />
              Purchase
              <FiExternalLink className="w-3 h-3" />
            </Link>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border hover:border-secondary/50 text-foreground hover:text-secondary rounded-md font-medium transition-colors text-sm"
          >
            Close Preview
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PublicationsPage() {
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Publications</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Books and educational content designed to make complex topics
            accessible. Click any publication to preview the content.
          </p>
        </motion.div>

        {/* Publications Grid */}
        <div className="space-y-12">
          {publications.map((pub, index) => (
            <motion.article
              key={pub.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow"
              onClick={() => setSelectedPublication(pub)}
            >
              <div className="flex flex-col md:flex-row">
                {/* Cover Image - Left Side */}
                {pub.jacketImage && (
                  <div className="relative w-full md:w-80 lg:w-96 flex-shrink-0 bg-muted overflow-hidden">
                    <div className="aspect-[3/4] md:aspect-auto md:h-full relative">
                      <Image
                        src={pub.jacketImage}
                        alt={`${pub.title} - Book Cover`}
                        fill
                        className="object-contain md:object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority={index === 0}
                      />
                      {/* Preview hint overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <span className="flex items-center gap-2 px-4 py-2 bg-secondary text-[#0a1929] rounded-full font-medium">
                          <FiEye className="w-5 h-5" />
                          Preview Book
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content - Right Side */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex flex-wrap gap-2">
                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                          statusConfig[pub.status].className
                        }`}
                      >
                        {statusConfig[pub.status].label}
                      </span>
                      {/* Series Badge */}
                      {pub.series && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border bg-primary/10 text-primary border-primary/30">
                          {pub.series}
                        </span>
                      )}
                    </div>

                    {/* Release Date */}
                    {pub.releaseDate && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FiCalendar className="w-4 h-4" />
                        <span className="text-sm">{pub.releaseDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground group-hover:text-secondary transition-colors">
                    {pub.title}
                  </h2>
                  {pub.subtitle && (
                    <p className="text-lg text-secondary/80 mb-4">{pub.subtitle}</p>
                  )}

                  {/* Description */}
                  <p className="text-foreground/80 leading-relaxed mb-6 flex-grow">
                    {pub.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPublication(pub);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-[#0a1929] font-medium rounded-md transition-colors"
                    >
                      <FiEye className="w-5 h-5" />
                      Read Preview
                    </button>
                    {pub.status === "available" && pub.purchaseLink && (
                      <Link
                        href={pub.purchaseLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-[#0a1929] font-medium rounded-md transition-colors"
                      >
                        <FiBook className="w-5 h-5" />
                        Purchase
                        <FiExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                    {pub.status === "pre-order" && pub.purchaseLink && (
                      <Link
                        href={pub.purchaseLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors"
                      >
                        <FiBook className="w-5 h-5" />
                        Pre-Order Now
                        <FiExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Coming Soon Notice / McGauley Labs Link */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center py-12 px-6 bg-card rounded-xl shadow-md"
        >
          <FiBook className="w-12 h-12 mx-auto mb-4 text-secondary" />
          <h2 className="text-2xl font-bold mb-4">More Coming Soon</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Additional books in the series are in development, including
            command-line Git workflows and advanced GitHub features. Subscribe
            for updates when new publications become available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-secondary/50 text-foreground hover:text-secondary rounded-md font-medium transition-colors"
            >
              Get Notified
            </Link>
          </div>
        </motion.section>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedPublication && (
          <PreviewModal
            publication={selectedPublication}
            onClose={() => setSelectedPublication(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
