export interface TransparencyPillar {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  details: string[];
}

export interface SupportMethod {
  id: string;
  name: string;
  badge?: string;
  description: string;
  ctaText: string;
  type: 'external' | 'modal' | 'route';
  url?: string;
  accent: string;
  recommended?: boolean;
}

export const SPATIALFLOW_CONFIG = {
  name: 'SpatialFlow',
  version: 'v1.8.1',
  tagline: 'Independent Android Music Experience',
  subheading: 'High-fidelity local playback, online streaming, and intelligent real-time DSP.',
  author: 'MythicalShub (Shubham Karande)',
  appPackage: 'com.codetrio.spatialflow',
  license: 'Apache 2.0 Open Source',
  links: {
    downloadApp: 'https://spatialflow.vercel.app/',
    appWebsite: 'https://spatialflow.vercel.app/',
    telegram: 'https://t.me/SpatialFlow',
    github: 'https://github.com/MythicalShub/SpatialFlow',
    githubReleases: 'https://spatialflow.vercel.app/',
    githubSponsors: 'https://github.com/sponsors/MythicalShub',
    kofi: 'https://ko-fi.com/mythicalshub',
    buyMeACoffee: 'https://buymeacoffee.com/mythicalshub',
    upi: {
      id: 'shubhamjkarande@okicici',
      name: 'Shubham Karande',
      currency: 'INR',
      uri: 'upi://pay?pa=shubhamjkarande@okicici&pn=Shubham%20Karande&cu=INR&tn=SpatialFlow%20Development%20Support'
    }
  }
};

export const TRANSPARENCY_PILLARS: TransparencyPillar[] = [
  {
    id: 'development',
    title: 'Core Development',
    tagline: 'Kotlin & Jetpack Compose architecture',
    description: 'Active engineering of modern Android UI, low-latency audio pipelines, background playback services, and battery-optimized DSP routines.',
    icon: 'code',
    details: [
      'Jetpack Compose Material 3 Expressive UI',
      'ExoPlayer & MediaSession3 integration',
      'Continuous bug fixes and OS compatibility'
    ]
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & APIs',
    tagline: 'Reliable backend & metadata services',
    description: 'Hosting proxies, lyrics provider resolvers, YouTube Music integration endpoints, and automated release delivery pipelines.',
    icon: 'server',
    details: [
      'Multi-provider lyrics synchronization proxy',
      'Artwork and stream metadata caching',
      'In-app release update manifest distribution'
    ]
  },
  {
    id: 'audio-services',
    title: 'Audio Engine & DSP',
    tagline: 'Lossless audio & spatial acoustics',
    description: 'Refining real-time parametric equalization, 8D audio spatialization algorithms, reverb modeling, and lossless Opus/FLAC playback.',
    icon: 'headphones',
    details: [
      'Psychoacoustic 8D panning engine',
      'Parametric equalizer & Bass Boost models',
      'Bit-perfect lossless stream handling'
    ]
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Testing',
    tagline: 'Hardware lab & Android fragmentation',
    description: 'Testing across varied Android OEM skins (One UI, Pixel, OxygenOS, HyperOS) and Android versions (Android 10 through Android 15+).',
    icon: 'shield-check',
    details: [
      'OEM background killer optimization',
      'Bluetooth codec (LDAC, aptX) validation',
      'Long-term open-source sustainability'
    ]
  }
];
