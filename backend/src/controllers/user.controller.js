import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const AccessToken = await user.generateAccessToken();
    const RefreshToken = await user.generateRefreshToken();
    user.refreshToken = RefreshToken;
    await user.save({ validateBeforeSave: true });

    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new Error("Something went wrong while generating tokens");
  }
};

const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
};

const registerUser = asyncHandler(async (req, res) => {
  const {
    fullname,
    email,
    password,
    skills,
    interests,
    linkedin,
    website = "",
    bio = "",
  } = req.body;

  if ([fullname, email, password, linkedin].some((field) => !field?.trim())) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All required fields must be provided and valid"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json(new ApiResponse(409, null, "Email already exists"));
  }

  const avatar = getInitials(fullname);

  const newUser = new User({
    fullname,
    email,
    password,
    avatar,
    bio,
    website,
    linkedin,
    skills,
    interests,
  });

  const accessToken = await newUser.generateAccessToken();
  const refreshToken = await newUser.generateRefreshToken();
  newUser.refreshToken = refreshToken;

  await newUser.save();

  const userToReturn = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user: userToReturn,
        accessToken,
        refreshToken,
      },
      "User registered successfully"
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not registered"));
  }

  const checkPass = await user.isPasswordCorrect(password);
  if (!checkPass) {
    return res.status(401).json(new ApiResponse(401, null, "Invalid user credentials"));
  }

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("AccessToken", AccessToken, options)
    .cookie("RefreshToken", RefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          AccessToken,
          RefreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: { refreshToken: undefined },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.RefreshToken || req.body.RefreshToken;

  if (!incomingRefreshToken) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "No refresh token provided"));
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid user or unauthorized"));
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Refresh token is expired"));
    }

    const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    };

    return res
      .status(200)
      .cookie("AccessToken", AccessToken, options)
      .cookie("RefreshToken", RefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken: AccessToken },
          "User refreshed successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, error?.message || "Invalid refresh token"));
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, confirmPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json(new ApiResponse(400, null, "Confirm password does not match"));
  }

  if (oldPassword === confirmPassword) {
    return res.status(400).json(new ApiResponse(400, null, "Please provide a new password"));
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    return res.status(401).json(new ApiResponse(401, null, "User not found"));
  }

  const isMatch = await user.isPasswordCorrect(oldPassword);
  if (!isMatch) {
    return res.status(400).json(new ApiResponse(400, null, "Old password is incorrect"));
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User data retrieved successfully"));
});

const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id || req.params.id;

  if (!userId) {
    return res.status(400).json(new ApiResponse(400, null, "User ID is required"));
  }

  const user = await User.findById(userId).select(
    "-password -refreshToken -__v"
  );

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details retrieved successfully"));
});

const updatedAccountDetails = asyncHandler(async (req, res) => {
  const {
    fullname,
    email,
    avatar,
    bio,
    skills,
    interests,
    linkedin,
    website,
  } = req.body;

  if (!fullname || !email || !linkedin) {
    return res.status(400).json(new ApiResponse(400, null, "Fullname, email, and LinkedIn are required"));
  }

  const existUser = await User.findOne({
    email: email,
    _id: { $ne: req.user._id },
  });

  if (existUser) {
    return res.status(400).json(new ApiResponse(400, null, "This email already exists"));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullname,
        email,
        avatar,
        bio,
        skills,
        interests,
        linkedin,
        website,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  if (!avatarLocalPath) {
    return res.status(400).json(new ApiResponse(400, null, "Avatar is required"));
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    return res.status(400).json(new ApiResponse(400, null, "Error while uploading avatar"));
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

export {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updatedAccountDetails,
  updateUserAvatar,
  getUserDetails
};
