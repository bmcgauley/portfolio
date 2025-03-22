# Brian McGauley's Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Dark/light mode support
- Dynamic content management
- Fast page navigation with Next.js
- Modern animations with Framer Motion
- Contact form with form validation

## Technologies Used

- **Next.js** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bmcgauley/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app` - Next.js App Router pages
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and data
- `/public` - Static assets like images

## Customization

### Adding Projects

To add or modify projects, edit the `projects` array in `/src/lib/data.ts`.

### Updating Content

Most content can be updated by modifying the data files in `/src/lib/data.ts`.

### Adding Images

Place your images in the appropriate folder under `/public/images/` and reference them in your data files.

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Vercel will automatically build and deploy your site

## License

This project is licensed under the MIT License.

## Acknowledgments

- UI design inspired by modern portfolio websites
- All placeholder images should be replaced with actual content
