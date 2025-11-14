export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MainGain',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
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
