import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),

    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
  .index("by_user", ["userId"]),

  lists: defineTable({
    title: v.string(),
    userId: v.string(),
    content: v.optional(v.string()),
    deadline: v.optional(v.string()),
    finished: v.boolean()
  })
  .index("by_user", ["userId"]),




});

