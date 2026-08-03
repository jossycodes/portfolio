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
  MediumIcon,
  XIcon
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
  x: XIcon
}

export const socialLinks = [
  { 
    name: 'GitHub', 
    icon: GithubIcon, 
    href: 'https://github.com/jossycodes',
    color: 'hover:text-white'
  },
  { 
    name: 'Twitter', 
    icon: XIcon, 
    href: 'https://twitter.com/yourhandle',
    color: 'hover:text-blue-400'
  },
]