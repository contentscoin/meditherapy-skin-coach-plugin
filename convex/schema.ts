import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  skinCoachEvents: defineTable({
    eventId: v.string(),
    eventType: v.union(
      v.literal("routine_recommendation"),
      v.literal("task_schedule_created"),
      v.literal("checkin"),
      v.literal("routine_adjustment"),
      v.literal("product_feedback"),
      v.literal("ontology_gap")
    ),
    occurredAt: v.string(),
    userHash: v.string(),
    skinType: v.optional(v.string()),
    concerns: v.optional(v.array(v.string())),
    sensitivity: v.optional(v.string()),
    routineId: v.optional(v.string()),
    productIds: v.optional(v.array(v.string())),
    checkinDay: v.optional(v.number()),
    drynessScore: v.optional(v.number()),
    irritationScore: v.optional(v.number()),
    satisfactionScore: v.optional(v.number()),
    action: v.optional(v.string()),
    localeBucket: v.optional(v.string()),
    ontologyGapFields: v.optional(v.array(v.string())),
    metadata: v.optional(v.any()),
  })
    .index("by_event_type", ["eventType"])
    .index("by_occurred_at", ["occurredAt"])
    .index("by_routine", ["routineId"]),
});
