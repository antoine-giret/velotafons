import { IconType } from 'react-icons';
import { IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5';

export const links: Array<{ key: string; label: string; to: string }> = [
  { key: 'home', label: 'Accueil', to: '/' },
  { key: 'mission', label: 'Notre mission', to: '/mission' },
  { key: 'blog', label: 'Blog', to: '/blog' },
  { key: 'events', label: 'Évènements', to: '/' },
  { key: 'contact', label: 'Contact', to: '/' },
];

export const socialLinks: Array<{ Icon: IconType; key: string; href: string; label: string }> = [
  {
    key: 'instagram',
    Icon: IoLogoInstagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/velotafons/',
  },
  {
    key: 'linkedin',
    Icon: IoLogoLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/velotafons/',
  },
];
