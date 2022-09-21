const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const UserSchema = new Schema(
    {
        username: {
            type: String, 
            required: true, 
            unique: true, 
            trim: true
        },
        email: {
            type: String, 
            required: true, 
            unique: true, 
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Valid email is required"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId, 
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId, 
                ref: "User"
            }
        ],
        toJSON: {
            virtuals: true, 
            getters: true
        }, 
        id: false
    }
);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});



const User = model("User", UserSchema);
module.exports = User