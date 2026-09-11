import mongoose from "mongoose";

const connectDb = async () => {
    try {
        let url = process.env.MONGODB_URL;
        if (url && url.includes("cluster0.e1emzih.mongodb.net")) {
            const authMatch = url.match(/mongodb\+srv:\/\/([^@]+)@cluster0\.e1emzih\.mongodb\.net\/?([^?]*)/);
            if (authMatch) {
                const creds = authMatch[1];
                const db = authMatch[2] ? authMatch[2].split("?")[0] : "Agent";
                url = `mongodb://${creds}@ac-rzkwh6g-shard-00-00.e1emzih.mongodb.net:27017,ac-rzkwh6g-shard-00-01.e1emzih.mongodb.net:27017,ac-rzkwh6g-shard-00-02.e1emzih.mongodb.net:27017/${db}?ssl=true&replicaSet=atlas-fckf1q-shard-0&authSource=admin&retryWrites=true&w=majority`;
            }
        }
        await mongoose.connect(url)
        console.log("DataBase Connected")
    } catch (error) {
        console.log(`DataBase Error ${error}`)
    }
}

export default connectDb