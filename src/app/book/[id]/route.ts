import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const productId = (await params).id;
  const url = `http://www.amazon.com/dp/${productId}/ref=nosim?tag=goodreadsbotr-20`;
  return redirect(url);
}
