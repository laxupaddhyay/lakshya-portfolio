export type ProjectCategory = 'Distributed systems' | 'Identity' | 'Developer tools' | 'Computer vision' | 'Immersive web' | 'Algorithms'

export type Project = {
  id: string
  number: string
  title: string
  tagline: string
  description: string
  category: ProjectCategory
  stack: string[]
  highlights: string[]
  href: string
  visual: 'stock' | 'identity' | 'limiter' | 'culling' | 'gallery' | 'huffman'
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'flashstock',
    number: '01',
    title: 'FlashStock',
    tagline: 'Inventory that holds up under pressure.',
    description: 'A flash-sale reservation engine built around database correctness. Atomic inventory updates, idempotent reservations, and a durable event pipeline work together to keep stock consistent when traffic spikes.',
    category: 'Distributed systems',
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'RabbitMQ', 'Redis'],
    highlights: ['Conditional SQL prevents overselling', 'Idempotent reservation lifecycle', 'Transactional outbox with retry and deduplication'],
    href: 'https://github.com/laxupaddhyay/flashstock',
    visual: 'stock',
    featured: true,
  },
  {
    id: 'northstar',
    number: '02',
    title: 'Northstar',
    tagline: 'A security-first OAuth and OIDC platform.',
    description: 'An authorization platform with a Spring Authorization Server, a protected resource API, and a browser SPA demonstrating Authorization Code with PKCE.',
    category: 'Identity',
    stack: ['Java 21', 'Spring Boot', 'OAuth 2.0', 'OIDC', 'PostgreSQL'],
    highlights: ['Authorization Code with PKCE', 'Encrypted signing keys and rotation', 'Refresh-token reuse detection'],
    href: 'https://github.com/laxupaddhyay/oauth-jwt-authorization-platform',
    visual: 'identity',
    featured: true,
  },
  {
    id: 'rate-limiter',
    number: '03',
    title: 'Redis Rate Limiter',
    tagline: 'A reusable Spring Boot starter for fair traffic.',
    description: 'A Redis-backed token-bucket starter that applies per-user and per-client limits with an atomic Lua operation and configurable route policies.',
    category: 'Developer tools',
    stack: ['Java 21', 'Spring Boot', 'Redis', 'Spring Security'],
    highlights: ['Atomic multi-bucket decisions', 'Route and client policy overrides', 'Explicit 429 and fail-closed 503 responses'],
    href: 'https://github.com/laxupaddhyay/rate-limiter-service',
    visual: 'limiter',
  },
  {
    id: 'image-culling',
    number: '04',
    title: 'Automated Image Culling',
    tagline: 'Find the keepers in a crowded photo set.',
    description: 'A Python image-ranking tool that scores photos using visual quality signals, feature extraction, and facial-expression analysis, then groups low-scoring images for review.',
    category: 'Computer vision',
    stack: ['Python', 'OpenCV', 'TensorFlow', 'VGG16', 'scikit-image'],
    highlights: ['Combines sharpness, contrast, color, and noise signals', 'Uses VGG16 features and facial-expression detection', 'Applies normalized scoring before review and discard'],
    href: 'https://github.com/laxupaddhyay/Automated-image-culling-system',
    visual: 'culling',
  },
  {
    id: 'virtual-gallery',
    number: '05',
    title: '3D Virtual Art Gallery',
    tagline: 'A walk-through space for art and images.',
    description: 'An immersive browser experience for exploring a virtual gallery, with keyboard movement, mouse-look controls, particle effects, and interactive artwork.',
    category: 'Immersive web',
    stack: ['JavaScript', '3D graphics', 'Canvas', 'Web interaction'],
    highlights: ['Navigate with keyboard and mouse-look controls', 'Explore artwork inside a virtual gallery space', 'Uses particles to add depth and atmosphere'],
    href: 'https://github.com/laxupaddhyay/3D-art-gallery',
    visual: 'gallery',
  },
  {
    id: 'huffman',
    number: '06',
    title: 'Huffman File Compression',
    tagline: 'A classic algorithm, built from the tree up.',
    description: 'A C++ implementation of lossless Huffman encoding that counts character frequencies, builds a Huffman tree, generates variable-length codes, and writes a compressed output.',
    category: 'Algorithms',
    stack: ['C++', 'Huffman coding', 'Binary trees'],
    highlights: ['Builds a Huffman tree from input frequencies', 'Generates variable-length codes per character', 'Encodes text files into a compressed output'],
    href: 'https://github.com/laxupaddhyay/Huffman-file-compression',
    visual: 'huffman',
  },
]

export const skills = [
  { label: 'Backend', items: ['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'Hibernate / JPA'] },
  { label: 'Identity', items: ['OAuth 2.0', 'OpenID Connect', 'SAML', 'MFA', 'Kerberos'] },
  { label: 'Data & messaging', items: ['PostgreSQL', 'Redis', 'RabbitMQ', 'Flyway'] },
  { label: 'Build & cloud', items: ['Docker', 'Kubernetes', 'AWS', 'Maven', 'JUnit'] },
]

export const experience = [
  {
    date: 'JAN 2025 — PRESENT',
    role: 'Software Engineer · SDE-1',
    company: 'miniOrange',
    detail: 'Building enterprise identity-provider capabilities across login policy evaluation, SSO, MFA, and event-driven services.',
    tags: ['Java', 'Spring Boot', 'Identity', 'RabbitMQ'],
  },
  {
    date: 'MAY — JUL 2024',
    role: 'Software Development Intern',
    company: 'Fotographiya',
    detail: 'Built React and Tailwind interfaces, added Flask features for filtering and image analysis, and deployed on AWS.',
    tags: ['React', 'Tailwind', 'Flask', 'AWS'],
  },
  {
    date: 'JUN — AUG 2023',
    role: 'AWS Intern',
    company: 'Linux World',
    detail: 'Worked with AWS services, Linux administration, automation, and security fundamentals.',
    tags: ['AWS', 'Linux', 'Automation'],
  },
]
