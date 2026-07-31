// components/SocialIcons.jsx
import { 
  GithubIcon, 
  LinkedinIcon, 
  TwitterIcon, 
  InstagramIcon,
  YoutubeIcon,
  FiverrIcon,
  CodepenIcon,
  DevtoIcon,
  MediumIcon
} from '@/lib/brandIcons'

export const SocialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  fiverr: FiverrIcon,
  codepen: CodepenIcon,
  devto: DevtoIcon,
  medium: MediumIcon,
}

export const socialLinks = [
  { 
    name: 'GitHub', 
    icon: GithubIcon, 
    href: 'https://github.com/jossycodes',
    color: 'hover:text-white'
  },
  { 
    name: 'LinkedIn', 
    icon: LinkedinIcon, 
    href: 'https://www.linkedin.com/in/josiah-adeniyi-329168240',
    color: 'hover:text-blue-400'
  },
  { 
    name: 'Twitter', 
    icon: TwitterIcon, 
    href: 'https://twitter.com/yourhandle',
    color: 'hover:text-blue-400'
  },
  { 
    name: 'Fiverr', 
    icon: FiverrIcon, 
    href: 'https://www.fiverr.com/s/0bGvDDL',
    color: 'hover:text-green-400'
  },
]