import { getCollection, getEntry } from 'astro:content';

export async function getGeneral() {
  const entry = await getEntry('general', 'general');
  if (!entry) throw new Error('Missing required content: general/general.md');
  return entry.data;
}

export async function getHours() {
  const entry = await getEntry('hours', 'hours');
  if (!entry) throw new Error('Missing required content: hours/hours.json');
  return entry.data;
}

export async function getDelivery() {
  const entry = await getEntry('delivery', 'delivery');
  if (!entry) throw new Error('Missing required content: delivery/delivery.json');
  return entry.data;
}

export async function getCategoriesSorted() {
  const all = await getCollection('categories');
  return all.sort((a, b) => a.data.ordre - b.data.ordre);
}

export async function getDishesAvailable() {
  const all = await getCollection('dishes');
  return all.filter((d) => d.data.disponible !== false);
}

function categorySlug(id: string): string {
  return id.replace(/\.md$/, '');
}

export async function getDishesByCategory() {
  const [categories, dishes] = await Promise.all([
    getCategoriesSorted(),
    getDishesAvailable(),
  ]);
  return categories.map((cat) => ({
    category: cat,
    slug: categorySlug(cat.id),
    dishes: dishes.filter((d) => d.data.categorie === categorySlug(cat.id)),
  }));
}
