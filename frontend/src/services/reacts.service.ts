import server from "@/middleware/wrappers/server";
import Reacts from "./models/Reacts";

async function createReact (react: Reacts) {
    const response = await server.post("profiles/reacts", react);
    return response.data;
}

export default {
    createReact,
    
}