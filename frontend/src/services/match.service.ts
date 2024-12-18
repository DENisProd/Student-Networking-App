import server from "@/middleware/wrappers/server";
import { Match } from "./models/Match";

async function fetchMatches() {
    const response = await server.get<Match[]>("profiles/matches");
    return response.data;
}

export default {
    fetchMatches,
}

