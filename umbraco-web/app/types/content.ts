import React from "react";

export interface SEOMetadata {
  metaName: string;
  metaDescription: string;
  metaKeywords: string[];
  metaRobots: string[];
}

export interface ContentProperties extends SEOMetadata {
  title: string;
  [key: string]: any;
}

export interface UmbracoContent {
  id: string;
  name: string;
  contentType: string;
  properties: ContentProperties;
  route: {
    path: string;
    startItem?: {
      id: string;
      path: string;
    };
  };
}

export interface TemplateProps {
  data: UmbracoContent;
  nav: React.ReactElement;
}

export interface navItem {
  id: string;
  name: string;
  route: {
    path: string;
    startItem?: {
      id: string;
      path: string;
    };
  };
  properties?: {
    hideInNavigation?: string[] | null;
    [key: string]: any;
  };
}