import { defineCollection, z } from 'astro:content';

const general = defineCollection({
  type: 'content',
  schema: z.object({
    nom: z.string(),
    slogan: z.string(),
    telephone: z.string(),
    email: z.string().email().or(z.literal('')).optional(),
    adresse: z.string(),
    photo_devanture: z.string(),
    facebook_url: z.string().url().or(z.literal('')).optional(),
    instagram_url: z.string().url().or(z.literal('')).optional(),
    google_maps_url: z.string().url().or(z.literal('')).optional(),
  }),
});

const hours = defineCollection({
  type: 'data',
  schema: z.object({
    schedule: z.record(
      z.enum(['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']),
      z.object({
        ferme: z.boolean(),
        ouverture: z.string().regex(/^\d{2}:\d{2}$/),
        fermeture: z.string().regex(/^\d{2}:\d{2}$/),
      }),
    ),
    fermetures_exceptionnelles: z.array(z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      raison: z.string(),
    })).default([]),
  }),
});

const delivery = defineCollection({
  type: 'data',
  schema: z.object({
    uber_eats_url: z.string().url().or(z.literal('')).default(''),
    deliveroo_url: z.string().url().or(z.literal('')).default(''),
    just_eat_url: z.string().url().or(z.literal('')).default(''),
  }),
});

const categories = defineCollection({
  type: 'content',
  schema: z.object({
    nom: z.string(),
    ordre: z.number().int().min(0),
    emoji: z.string().optional(),
  }),
});

const dishes = defineCollection({
  type: 'content',
  schema: z.object({
    nom: z.string(),
    description: z.string().optional(),
    prix: z.number().min(0),
    categorie: z.string(),
    photo: z.string().optional(),
    tags: z.array(z.enum(['populaire', 'nouveau', 'epice', 'vege'])).default([]),
    disponible: z.boolean().default(true),
    variantes: z.array(z.object({
      nom: z.string(),
      prix: z.number().min(0),
    })).optional(),
  }),
});

export const collections = {
  general,
  hours,
  delivery,
  categories,
  dishes,
};
