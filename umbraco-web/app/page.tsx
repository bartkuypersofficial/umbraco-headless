import { navContent, navComponent } from "./components/navigation";
import { navItem, UmbracoContent } from "./types/content";
import { renderTemplate } from "./lib/templates";
import { generateMetadata as generateSEOMetadata } from "./lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const base = process.env.UMBRACO_API_BASE || '';
  
  // Fetch the root/home page specifically
  const res = await fetch(`${base}/umbraco/delivery/api/v2/content/item/`, { 
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    return {
      title: "Home",
      description: "Welcome to our website",
    };
  }
  
  const homeContent: UmbracoContent = await res.json();

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

  // Fetch home page content specifically (root page)
  const contentRes = await fetch(`${base}/umbraco/delivery/api/v2/content/item/`, { 
    cache: 'no-store' 
  });

  if (!contentRes.ok) {
    return (
      <main>
        {nav}
        <h1>Home page not found</h1>
        <p>Unable to load the home page content.</p>
      </main>
    );
  }

  const homeContent: UmbracoContent = await contentRes.json();

  // Render the appropriate template based on contentType
  return renderTemplate(homeContent.contentType, {
    data: homeContent,
    nav: nav
  });
}