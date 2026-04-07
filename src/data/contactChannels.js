import { bio } from './experience';

export const contactMailtoHref = `mailto:${bio.email}?subject=${encodeURIComponent('Hello via portfolio')}&body=${encodeURIComponent('Hi Prasanna,\n\n')}`;

export const contactChannels = [
  {
    id: 'email',
    title: 'Email',
    value: bio.email,
    hint: 'Best for longer messages & attachments',
    icon: 'mail',
    href: contactMailtoHref,
    external: false,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    value: 'in/prasannawarad',
    hint: 'Networking & recruiter messages',
    icon: 'work',
    href: bio.linkedin,
    external: true,
  },
  {
    id: 'github',
    title: 'GitHub',
    value: 'prasannawarad',
    hint: 'Repositories & collaboration',
    icon: 'code',
    href: bio.github,
    external: true,
  },
  {
    id: 'phone',
    title: 'Phone',
    value: bio.phone,
    hint: 'Voice / SMS (please text first)',
    icon: 'call',
    href: `tel:${bio.phone.replace(/\D/g, '')}`,
    external: false,
  },
];
