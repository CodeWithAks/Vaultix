const mongoose = require("mongoose"); 

const accountSchema = new mongoose.Schema({ 
    user:{                                       //that ye acc. kis user se belong krta h 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: [true,"User ID is required"],
        index: true                                //taaki searching fast ho 
    }, 
    status:{ 
        type: String, 
        enum:{ 
            values:["ACTIVE","FROZEN","CLOSED"], 
            message:"Status must be either ACTIVE, FROZEN, or CLOSED" ,
        },
        default:"ACTIVE"
    }, 
    currency:{ 
        type:String, 
        required:[true,"Currency is required for creating an account"], 
        default:"INR" 
    }
}, { 
    timestamps:true 
});

accountSchema.index({ user: 1, status: 1 }); // 2 field pe create kiya -> compound index

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;

//account model banaya h jisme user, status, currency fields h. User field se pata chalta h ki ye account kis user se belong krta h. Status field se pata chalta h ki account active h ya frozen ya closed. Currency field se pata chalta h ki account kis currency me h. Timestamps option se createdAt aur updatedAt fields automatically add ho jate h. Compound index create kiya h user aur status fields pe taaki searching fast ho.