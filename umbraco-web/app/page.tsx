import { navContent, navComponent, navItem } from "./components/navigation";

export default async function HomePage() {
  const base = process.env.UMBRACO_API_BASE || '';
  const res = await fetch(`${base}/umbraco/delivery/api/v2/content?sort=level:asc&sort=sortOrder:asc`, { 
    cache: 'no-store' 
  });
  const data = await res.json();

  const items: navItem[] = data.items || [];
  const nav = navContent(items);

  return (
    <main>
      <h1>Navigation</h1>
      {navComponent(nav)}
    </main>
  );
}