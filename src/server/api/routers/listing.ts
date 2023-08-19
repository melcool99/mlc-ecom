/* eslint-disable @typescript-eslint/no-unsafe-return */
import { clerkClient } from "@clerk/nextjs";
import { protectedProcedure } from "./../trpc";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.listing.findMany();
  }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.listing.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getMessage: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    const listing = await ctx.prisma.listing.findMany({
      where: {
        userId,
      },
      include: {
        message: true,
      },
    });
    return listing.flatMap((item) => item.message);
  }),

  sendMessage: protectedProcedure
    .input(z.object({ message: z.string(), listingId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const fromUser = await clerkClient.users.getUser(ctx.auth.userId);

      const message = await ctx.prisma.message.create({
        data: {
          fromUser: ctx.auth.userId,
          fromUserName: fromUser.username ?? "unknown",
          listingId: input.listingId,
          message: input.message,
        },
      });
      return message;
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.listing.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
          quantity: 1, // add quantity property
          image: "", // add image property
          category: "", // add category property
        },
      });
    }),
});
