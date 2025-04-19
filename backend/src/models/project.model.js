import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: [
        "MERN",
        "AI/ML",
        "Blockchain",
        "Web3",
        "DevOps",
        "Mobile",
        "GameDev",
        "Cybersecurity",
        "Other",
      ],
      default: "Other",
    },

    pitchDeckUrl: {
      type: String,
      default: "",
    },
    gitHub: {
      type: String,
      default: "",
    },
    mediaUrls: {
      type: [String],
      default: [],
    },
    lookingForCollaborators: {
      type: Boolean,
      default: false,
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    interests: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;
