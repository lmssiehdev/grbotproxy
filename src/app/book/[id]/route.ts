import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const productId = (await params).id;
  const url = `http://www.amazon.com/dp/${productId}/ref=nosim?tag=goodreadsbotr-20`;

  fetch("https://us.i.posthog.com/capture/", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: process.env.NEXT_PUBLIC_POSTHOG_KEY!,
      distinct_id: "goodread_bots_reloaded",
      event: "amazon_link_click",
      properties: {
        prodcut_id: productId,
        product_url: url,
      },
    }),
  });

  return redirect(url);
}
