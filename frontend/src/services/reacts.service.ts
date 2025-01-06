import server from "@/middleware/wrappers/server";
import Reacts, { ReactResponse } from "./models/Reacts";

async function createReact (react: Reacts) {
    const response = await server.post("profiles/reacts", react);
    return response.data;
}

async function fetchOutgoingReacts () {
    const response = await server.get<ReactResponse[]>("profiles/reacts");
    return response.data;
}

export default {
    createReact,
    fetchOutgoingReacts,
}