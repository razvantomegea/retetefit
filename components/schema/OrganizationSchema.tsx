import { BASE_URL } from '@/lib/constants';

export function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MainGain',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Healthy recipes under 60 minutes',
    sameAs: [
      // Add your social media URLs here
      // 'https://facebook.com/maingain',
      // 'https://instagram.com/maingain',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Romanian'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema, null, 2) }}
    />
  );
}
