import app from "./app";




const PORT = 3000;
async function main() {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    } catch (error) {
        console.error("Error connecting to the database:", error);
    } 
}

main();