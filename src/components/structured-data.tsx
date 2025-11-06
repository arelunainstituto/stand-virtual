import { siteConfig } from '@/lib/site-config'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo%20pink%20legion.png`,
  image: `${siteConfig.url}/images/logo%20pink%20legion.png`,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  sameAs: Object.values(siteConfig.socialLinks),
  openingHoursSpecification: siteConfig.openingHours.map((hours) => ({
    '@type': 'OpeningHoursSpecification',
    description: hours,
  })),
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.siteName,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.locale,
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/viaturas?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  )
}

