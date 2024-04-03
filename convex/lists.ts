import {v} from "convex/values"

import { mutation, query } from "./_generated/server"


import {Doc, Id} from "./_generated/dataModel"

import { auth } from "@/auth";
import { useCurrentUser } from "@/hooks/use-current-user";




export const create = mutation({

  args: {
    title: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const list = await ctx.db.insert("lists", {
      title: args.title,
      userId: args.userId,

      finished: false,



    });

    return list;
  }
});






export const getList = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
  

    const lists = await ctx.db
      .query("lists")
      .withIndex("by_user", (q) =>
        q
          .eq("userId", args.userId)
      )
     
      .order("desc")
      .collect();

    return lists;
  },
});





export const getById = query({
  args : {
    documentId: v.id("lists"),
    userId: v.string()
  },
  handler: async(ctx,args) =>{
    const list = await ctx.db.get(args.documentId)

    if (!list){
      throw new Error("Not Found")
    }

  

    if(list.userId !== args.userId){
      throw new Error("Unauthorized")

    }

    return list;
    


  }
})



export const update = mutation({
  args: {
    id: v.id("lists"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),



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


export const remove = mutation({
  args: {id: v.id("lists")},
  handler: async (ctx,args)=>{
    const existingDocument = await ctx.db.get(args.id)


    if (!existingDocument) {
      throw new Error("Not Found")
    }

    const document = await ctx.db.delete(args.id)

    return document
  }
})

export const getDone = mutation({
  args: {id: v.id("lists")},
  handler: async (ctx,args)=>{
    const existingDocument  = await ctx.db.get(args.id);

    if(!existingDocument){
      throw new Error ("Not Found!")
    }

   

    const document = await ctx.db.patch(args.id,{
      finished: true
    })



    return document;
  }
})


export const notDone = mutation({
  args: {id: v.id("lists")},
  handler: async (ctx,args)=>{
    const existingDocument  = await ctx.db.get(args.id);

    if(!existingDocument){
      throw new Error ("Not Found!")
    }

   

    const document = await ctx.db.patch(args.id,{
      finished: false
    })



    return document;
  }
})