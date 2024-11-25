import { sendAnalyticsEvent } from "@/utils/analytics";
import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const productId = (await params).id;
  const url = `http://www.amazon.com/dp/${productId}/ref=nosim?tag=goodreadsbotr-20`;

  const paylod = {
    event: "amazon_link_click",
    properties: {
      prodcut_id: productId,
      product_url: url,
    },
  };

  sendAnalyticsEvent(paylod);

  return redirect(url);
}
