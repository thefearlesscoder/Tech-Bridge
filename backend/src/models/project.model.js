import mongoose from "mongoose";

const Productschema = new mongoose.Schema(
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
    // techStack: {
    //   type: [String],
    //   default: [],
    // },
    category: {
      type: [String],
      enum: [
        "WEB",
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
    viewLogs: [
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
    price: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const Project = mongoose.model("Project", Productschema);
export default Project;
