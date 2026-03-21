import { createClient } from "@supabase/supabase-js";

export const config = {
    runtime: "edge",
};

export default async function handler(req: Request) {
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
    }

    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return new Response(
                JSON.stringify({ error: "Supabase configuration missing on server" }),
                { status: 500 }
            );
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data, error } = await supabase
            .from("contact_submissions")
            .insert([{ name, email, message }])
            .select();

        if (error) {
            console.error("Supabase Error:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("API Error:", error);
        return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
            status: 500,
        });
    }
}
