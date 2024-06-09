import { IconType } from 'react-icons';
import { IoLogoDiscord, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5';

export const links: Array<{ key: string; label: string; to: string }> = [
  { key: 'home', label: 'Accueil', to: '/' },
  { key: 'challenges', label: 'Challenges', to: '/challenges' },
  { key: 'mission', label: 'Notre mission', to: '/mission' },
  { key: 'blog', label: 'Blog', to: '/blog' },
  { key: 'contact', label: 'Contact', to: '/contact' },
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
  {
    key: 'discord',
    Icon: IoLogoDiscord,
    label: 'Discord',
    href: 'https://discord.gg/RwAzPgxJEX/',
  },
];
