import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://moazalnor.me'),
  title: {
    default: 'Moaz Alnor | Robotics, CAD, Simulation & Engineering Software',
    template: '%s | Moaz Alnor'
  },
  description:
    'Portfolio of Moaz Alnor, a robotics engineer and mechanical design engineer building CAD systems, simulations, digital twins, robotics workflows, and engineering software.',
  keywords: [
    'Moaz Alnor',
    'Robotics Engineer',
    'Mechanical Design Engineer',
    'SOLIDWORKS',
    'ROS 2',
    'Python Simulation',
    'MATLAB Simulation',
    'Digital Twin',
    'Engineering Software',
    'CAD Design'
  ],
  authors: [{ name: 'Moaz Alnor', url: 'https://moazalnor.me' }],
  creator: 'Moaz Alnor',
  applicationName: 'Moaz Alnor Portfolio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://moazalnor.me',
    title: 'Moaz Alnor | Robotics, CAD, Simulation & Engineering Software',
    description: 'Building engineering systems where mechanical design, robotics, simulation, and software work as one.',
    siteName: 'Moaz Alnor Portfolio',
    images: [
      {
        url: '/assets/images/profile.png',
        width: 1080,
        height: 1440,
        alt: 'Moaz Alnor professional portrait'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moaz Alnor | Robotics, CAD, Simulation & Engineering Software',
    description: 'Building engineering systems where mechanical design, robotics, simulation, and software work as one.',
    images: ['/assets/images/profile.png']
  },
  alternates: {
    canonical: 'https://moazalnor.me'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
