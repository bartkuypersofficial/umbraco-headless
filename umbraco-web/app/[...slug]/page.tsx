import { notFound } from "next/navigation";
import { Metadata } from "next";
import { navContent, navComponent } from "../components/navigation";
import { navItem, UmbracoContent } from "../types/content";
import { renderTemplate } from "../lib/templates";
import { generateMetadata as generateSEOMetadata } from "../lib/metadata";

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const base = process.env.UMBRACO_API_BASE || '';
  const path = `/${params.slug?.join("/") || ""}`;
  
  try {
    const res = await fetch(`${base}/umbraco/delivery/api/v2/content/item${path}`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) {
      return {
        title: "Page Not Found",
        description: "The requested page could not be found."
      };
    }
    
    const data: UmbracoContent = await res.json();
    return generateSEOMetadata(data.properties);
  } catch (error) {
    return {
      title: "Error",
      description: "An error occurred while loading the page."
    };
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const base = process.env.UMBRACO_API_BASE || '';
  const path = `/${params.slug?.join("/") || ""}`;

  try {
    // Fetch navigation data
    const navRes = await fetch(`${base}/umbraco/delivery/api/v2/content?sort=level:asc&sort=sortOrder:asc`, { 
      cache: 'no-store' 
    });
    const navData = await navRes.json();
    const navItems: navItem[] = navData.items || [];
    const nav = navComponent(navContent(navItems));

    // Fetch page content
    const contentRes = await fetch(`${base}/umbraco/delivery/api/v2/content/item${path}`, { 
      cache: 'no-store' 
    });

    if (!contentRes.ok) {
      notFound();
    }

    const pageContent: UmbracoContent = await contentRes.json();

    // Render the appropriate template based on contentType
    return renderTemplate(pageContent.contentType, {
      data: pageContent,
      nav: nav
    });

  } catch (error) {
    console.error('Error fetching page content:', error);
    notFound();
  }
}