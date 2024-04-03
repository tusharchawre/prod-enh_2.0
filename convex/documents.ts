import {v} from "convex/values"

import { mutation, query } from "./_generated/server"


import {Doc, Id} from "./_generated/dataModel"

import { auth } from "@/auth";
import { useCurrentUser } from "@/hooks/use-current-user";

export const archive = mutation({
  args: {id: v.id("documents")},
  handler: async (ctx,args)=>{
    const existingDocument  = await ctx.db.get(args.id);

    if(!existingDocument){
      throw new Error ("Not Found!")
    }

   

    const document = await ctx.db.patch(args.id,{
      isArchived: true
    })



    return document;
  }
})


export const getSearch = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx ,args) => {

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) =>
        q
          .eq("userId", args.userId)
      )
      .filter((q) =>
        q.eq(q.field("isArchived"), false)
      )
      .order("desc")
      .collect();

    return documents;
  }
});







export const getSidebar = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
  

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) =>
        q
          .eq("userId", args.userId)
      )
      .filter((q) =>
        q.eq(q.field("isArchived"), false)
      )
      .order("desc")
      .collect();

    return documents;
  },
});





export const create = mutation({

  args: {
    title: v.string(),
    userId: v.string(),


  },
  handler: async (ctx, args) => {


  


    const document = await ctx.db.insert("documents", {
      title: args.title,
      userId: args.userId,

      isArchived: false,
      isPublished: false,
    });

    return document;
  }
});


export const getTrash = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
  

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) =>
        q
          .eq("userId", args.userId)
      )
      .filter((q) =>
        q.eq(q.field("isArchived"), true)
      )
      .order("desc")
      .collect();

    return documents;
  },
});


export const restore = mutation({
  args: {id: v.id("documents")},
  handler: async (ctx,args)=> {

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not Found")
    }

    const option: Partial<Doc<"documents">> = {
      isArchived: false,
    }

    const document = await ctx.db.patch(args.id, option)



    return document

  }
})


export const remove = mutation({
  args: {id: v.id("documents")},
  handler: async (ctx,args)=>{
    const existingDocument = await ctx.db.get(args.id)


    if (!existingDocument) {
      throw new Error("Not Found")
    }

    const document = await ctx.db.delete(args.id)

    return document
  }
})




export const getById = query({
  args : {
    documentId: v.id("documents"),
    userId: v.string()
  },
  handler: async(ctx,args) =>{
    const document = await ctx.db.get(args.documentId)

    if (!document){
      throw new Error("Not Found")
    }

    if (document.isPublished && !document.isArchived){
      return document
    }

    if(document.userId !== args.userId){
      throw new Error("Unauthorized")

    }

    return document;
    


  }
})



export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean())
  },
  handler: async (ctx,args) => {



    const {id , ...rest} = args;

    const existingDocument = await ctx.db.get(args.id);


    if (!existingDocument){
      throw new Error("Not found")
    }


    const document = await ctx.db.patch(args.id,{
      ...rest
    })

    return document;

  }}
)



export const removeIcon = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }


    const document = await ctx.db.patch(args.id, {
      icon: undefined
    });

    return document;
  }
});





export const removeCoverImage = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {


   



    const existingDocument = await ctx.db.get(args.id);

  

    const document = await ctx.db.patch(args.id, {
      coverImage: undefined,
    });

    return document;
  }
});



