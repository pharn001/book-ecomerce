"use server";
export async function GET(response: Response) {
  try {
    const url = new URL(response.url);
    const query = url.searchParams.get("query");
    if (!query) {
      return new Response(JSON.stringify({ error: "Query parameter is required" }), { status: 400 });
    }

    // Simulate fetching data based on the query
    const data = { message: `You searched for: ${query}` };
    
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }

}