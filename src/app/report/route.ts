import { sendAnalyticsEvent } from "@/utils/analytics";
import { Redis } from "@upstash/redis";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const permalink = searchParams.get("permalink");

  if (!permalink) {
    return new Response(JSON.stringify({ error: "Wrong params" }));
  }

  const cleandUrl = permalink.split("?")[0];
  const exists = await redis.exists(cleandUrl);

  if (exists) {
    redirect("/thank_you");
  }

  await redis.set(cleandUrl, Date.now());

  sendAnalyticsEvent({
    event: "report_submit",
    properties: {
      cleandUrl,
    },
  });

  redirect(`https://tally.so/r/w5lLWE?permalink=${cleandUrl}`);
}
