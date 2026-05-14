import React from 'react';

interface JsonLdProps {
  /** Single Schema.org object or array of objects */
  data: object | object[];
  /** Optional id for the script tag (helps debugging) */
  id?: string;
}

/**
 * Renders JSON-LD structured data inside a <script type="application/ld+json">.
 * Uses dangerouslySetInnerHTML which is the recommended pattern from Next.js docs.
 */
export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
