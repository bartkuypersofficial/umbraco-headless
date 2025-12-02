import { navContent, navComponent } from "./components/navigation";
import { navItem, UmbracoContent } from "./types/content";
import { renderTemplate } from "./lib/templates";
import { generateMetadata as generateSEOMetadata } from "./lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const base = process.env.UMBRACO_API_BASE || '';
  const res = await fetch(`${base}/umbraco/delivery/api/v2/content/`, { 
    cache: 'no-store' 
  });
  const data = await res.json();

  // Get the home page or first item
  const homeContent: UmbracoContent = data.items?.[0] || {
    properties: {
      metaName: "Home",
      metaDescription: "Welcome to our website",
      metaKeywords: ["Home", "Umbraco"],
      metaRobots: ["Index", "Follow"],
      title: "Home"
    }
  };

  return generateSEOMetadata(homeContent.properties);
}

export default async function HomePage() {
  const base = process.env.UMBRACO_API_BASE || '';
  
  // Fetch navigation data
  const navRes = await fetch(`${base}/umbraco/delivery/api/v2/content?sort=level:asc&sort=sortOrder:asc`, { 
    cache: 'no-store' 
  });
  const navData = await navRes.json();
  const navItems: navItem[] = navData.items || [];
  const nav = navComponent(navContent(navItems));

  // Fetch home page content
  const contentRes = await fetch(`${base}/umbraco/delivery/api/v2/content/`, { 
    cache: 'no-store' 
  });
  const contentData = await contentRes.json();
  const homeContent: UmbracoContent = contentData.items?.[0];

  if (!homeContent) {
    return (
      <main>
        {nav}
        <h1>No content found</h1>
      </main>
    );
  }

  // Render the appropriate template based on contentType
  return renderTemplate(homeContent.contentType, {
    data: homeContent,
    nav: nav
  });
}