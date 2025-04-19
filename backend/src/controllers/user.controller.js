import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
const generateAccessAndRefreshToken = async (userId) => {
  try {
    // console.log("cjhb");

    const user = await User.findById(userId);
    // console.log("hfhjhj : ",user);

    const AccessToken = await user.generateAccessToken();
    // console.log("access token : ", AccessToken);

    const RefreshToken = await user.generateRefreshToken();
    // console.log("refresh token : ", RefreshToken);
    user.refreshToken = RefreshToken;
    // console.log("sbchjahxbasbk");

    await user.save({ validateBeforeSave: true });

    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong While generating access and refresh token"
    );
  }
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
    throw new ApiError(400, "All required fields must be provided and valid");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
  if (!avatarUrl?.url) {
    throw new ApiError(500, "Failed to upload avatar to Cloudinary");
  }

  const newUser = new User({
    fullname,
    email,
    password,
    avatar: avatarUrl.url,
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
    throw new ApiError(400, "all fields are required");
  }

  const user = await User.findOne({ $or: [ { email }] });
  if (!user) {
    throw new ApiError(404, "User not Registered");
  }

  const checkPass = await user.isPasswordCorrect(password);
  if (!checkPass) {
    throw new ApiError(401, "Invalid user credentials");
  }
  console.log("before login");

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

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
        "User LoggedIn successfully "
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  await User.findByIdAndUpdate(
    userId,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.RefreshToken || req.body.RefreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "No refresh token provided unAuthorizedm request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid user unauthorized request");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired");
    }
    const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true, 
      secure: true,
    };
    console.log("refresh tokennlkwfklweff");

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
    throw new ApiError(500, error?.message || "inValid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, confirmPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new ApiError(400, "All fields are required");
  }
  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Confirm password does not match");
  }
  if (oldPassword === confirmPassword) {
    throw new ApiError(400, "Please provide a new password");
  }
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  const isMatch = await user.isPasswordCorrect(oldPassword);
  if (!isMatch) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false }); 
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  console.log("Get current user: ", req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User data retrieved successfully"));
});



const updatedAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;
  if (!fullname || !email) {
    throw new ApiError(400, "Fullname and email are required");
  }
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    throw new ApiError(400, "thie email already exists");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    { new: true }
  ).select("-password"); 

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.avatar[0].path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  console.log("hjvhjv:", avatarLocalPath);

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  console.log("ammxsx: ", avatar);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar");
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
    .json(new ApiResponse(200, user, "avatar updated successfully"));
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
};
