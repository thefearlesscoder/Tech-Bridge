import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["VC", "Developer", "Collab"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    lookingFor: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    budget: {
      type: Number,
      required: function() { return this.role === "VC"; },  
      min: [0, "Budget cannot be negative"],  
      default: 0, 
    }
  },
  { timestamps: true }
);

const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);
export default CommunityPost;
