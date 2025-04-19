import Project from "../models/project.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const applyProject=asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;
    const project = await Project.findById(projectId).populate("userId", "email name");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const alreadyApplied = project.interests.find(
      (interest) => interest.userId.toString() === userId.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied to this project" });
    }

    project.interests.push({ userId });
    await project.save();

    const applicant = await User.findById(userId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    const applicantEmail = applicant.email;
    const applicantName = applicant.name;
    const ownerEmail = project.userId.email;
    const projectTitle = project.title;

    await sendEmail({
      to: ownerEmail,
      subject: `New Application for "${projectTitle}"`,
      html: `<p>${applicantName} has applied to collaborate on your project <strong>${projectTitle}</strong>.</p>
             <p>Contact them at: <a href="mailto:${applicantEmail}">${applicantEmail}</a></p>`,
    });

    await sendEmail({
      to: applicantEmail,
      subject: `Application Submitted for "${projectTitle}"`,
      html: `<p>You have successfully applied to the project <strong>${projectTitle}</strong>.</p>
             <p>The project owner will contact you if selected.</p>`,
    });

    res.status(200).json({ message: "Applied successfully and emails sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});
export default applyProject;