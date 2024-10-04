import { pgTable, text, uuid, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

// ... (previous schema definitions)

export const promptTemplates = pgTable('prompt_templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  description: text('description'),
  category: text('category'),
  tags: text('tags').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  isPublic: boolean('is_public').default(false),
  version: integer('version').default(1),
  rating: integer('rating').default(0),
  usageCount: integer('usage_count').default(0),
  variables: jsonb('variables'),
});

// ... (other table definitions)