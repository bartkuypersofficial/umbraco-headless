import React from "react";
import { TemplateProps } from "../types/content";

// Import all template components
import OverviewTemplate from "../templates/overview/overview";
import IndexTemplate from "../templates/index/index";
import ContactTemplate from "../templates/contact/contact";
import ProjectTemplate from "../templates/project/project";
import ArticleTemplate from "../templates/article/article";
import ReferenceTemplate from "../templates/reference/reference";

// Template mapping based on contentType
const templateMap: Record<string, React.ComponentType<TemplateProps>> = {
  "overviewTemp": OverviewTemplate,
  "indexTemp": IndexTemplate,
  "contactTemp": ContactTemplate,
  "projectTemp": ProjectTemplate,
  "articleTemp": ArticleTemplate,
  "referenceTemp": ReferenceTemplate,
};

// Default fallback template
const DefaultTemplate: React.FC<TemplateProps> = ({ data, nav }) => (
  <main>
    {nav}
    <h1>Template not found</h1>
    <p>Content type: {data.contentType}</p>
    <p>No template available for this content type.</p>
  </main>
);

export function getTemplate(contentType: string): React.ComponentType<TemplateProps> {
  return templateMap[contentType] || DefaultTemplate;
}

export function renderTemplate(contentType: string, props: TemplateProps): React.ReactElement {
  const Template = getTemplate(contentType);
  return <Template {...props} />;
}