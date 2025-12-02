import { Metadata } from "next";
import { SEOMetadata } from "../types/content";

export function generateMetadata(seoData: SEOMetadata): Metadata {
  const robotsConfig: any = {};
  
  if (seoData.metaRobots.includes("Index")) robotsConfig.index = true;
  if (seoData.metaRobots.includes("NoIndex")) robotsConfig.index = false;
  if (seoData.metaRobots.includes("Follow")) robotsConfig.follow = true;
  if (seoData.metaRobots.includes("NoFollow")) robotsConfig.follow = false;

  return {
    title: seoData.metaName,
    description: seoData.metaDescription,
    keywords: seoData.metaKeywords.join(", "),
    robots: robotsConfig,
    openGraph: {
      title: seoData.metaName,
      description: seoData.metaDescription,
    },
    twitter: {
      title: seoData.metaName,
      description: seoData.metaDescription,
    },
  };
}