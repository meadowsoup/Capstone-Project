import mongoose from "mongoose";


const pairingSchema = new mongoose.Schema({
     animeOrGame: { type: String, required: true },
     drink: { type: mongoose.Schema.Types.ObjectId, ref: "Drink", required: true },
     reason: { type: String, required: true },
}, { timestamps: true });


export default mongoose.model("Pairing", pairingSchema);
// The Pairing model is similar to the Drink model, but it has a reference to the Drink model. 
// This is because each pairing will be associated with a drink. 
// The pairingSchema defines the structure of the Pairing model, including the fields animeOrGame, drink, and reason. 
// The drink field is a reference to the Drink model, which allows us to associate a pairing with a specific drink. 
// The Pairing model is exported as a default module, which can be imported and used in other parts of the application.