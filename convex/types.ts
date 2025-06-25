import { v } from "convex/values";

export const serializedRequest = v.object({
  body: v.any(),
  headers: v.record(v.string(), v.string()),
  method: v.string(),
  url: v.string(),
});

export const serializedResponse = v.object({
  body: v.string(),
  status: v.number(),
  headers: v.record(v.string(), v.string()),
});

export type SerializedRequest = typeof serializedRequest.type;
export type SerializedResponse = typeof serializedResponse.type;