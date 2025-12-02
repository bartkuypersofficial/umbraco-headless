import React from "react";
import { navItem } from "../types/content";

// Remove the duplicate interface since it's now imported


/**
 *  Build a hierarchical navigation 
 *  from a flat array of items.
 */

export function navContent(items: navItem[]) {
  const map: Record<string, any> = {};
  const tree: any[] = [];
  const visible = items.filter(
    (item) => item.properties?.hideInNavigation === null
  );

  visible.forEach((item) => {
    const path = item.route.path.replace(/\/$/, "");
    map[path] = { ...item, children: [] };
  });

  visible.forEach((item) => {
    const path = item.route.path.replace(/\/$/, "");
    const segments = path.split("/").filter(Boolean);

    if (segments.length > 1) {
      const parentPath = "/" + segments.slice(0, -1).join("/");
      const parent = map[parentPath];

      if (parent) {
        parent.children.push(map[path]);
      } else {
        tree.push(map[path]);
      }
    } else {
      tree.push(map[path]);
    }
  });

  return tree;
}


/**
 *  Recursively render the 
 *  navigation as html component.
 */

export function navComponent(items: any[]) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <a href={item.route.path}>{item.name}</a>
          {item.children.length > 0 && navComponent(item.children)}
        </li>
      ))}
    </ul>
  );
}