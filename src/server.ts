import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";
const PORT = config.port;

async function main(){
    try {
        await prisma.$connect();
        console.log("DB conected successfully");
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        await prisma.$disconnect();
        console.log(`error: ${error}`);
        process.exit(1);
    }
}

main();