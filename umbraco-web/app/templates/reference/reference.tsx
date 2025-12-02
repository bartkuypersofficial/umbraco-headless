import React from "react";
import { TemplateProps } from "../../types/content";

export default function ReferenceTemplate({ data, nav }: TemplateProps) {
  const { contentType, properties } = data;

  return (
    <main>
      {nav}
      <h1>{properties.title}</h1>
      <div>
        <p><strong>Content Type:</strong> {contentType}</p>
        <p><strong>Description:</strong> {properties.metaDescription}</p>
        {properties.metaKeywords && properties.metaKeywords.length > 0 && (
          <p><strong>Keywords:</strong> {properties.metaKeywords.join(", ")}</p>
        )}
      </div>
    </main>
  );
}