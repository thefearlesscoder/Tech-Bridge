# 🚀 Tech-Bridge

A dynamic platform for tech enthusiasts to **showcase their projects**, **find collaborators**, and **raise funds** with ease. Tech-Bridge empowers developers and innovators to connect, collaborate, and grow together.

## 👨‍💻 Collaborators


- [**Sakaray Varsha**](https://github.com/Varshasakaray)  
- [**Vivek Kumar**](https://github.com/thefearlesscoder)  
- [**Kunal Sonkar**](https://github.com/Kunalsonkar07)  
- [**Varun Kumar Sahu**](https://github.com/vks-07)

---

## 🌟 Features

### 🔐 Authentication
- Secure login/signup

### 🧰 Project Management
- Add, edit, and delete projects  
- Update project state based on progress

### 🧑‍💼 User Dashboard
- View all your projects  
- See your collaborators, funders, and buyers

### 🧠 State Management
- Managed using **Redux** for consistent state control

### 🔍 Filters
- Filter projects based on:
  - Collaborators
  - Funders
  - Buyers

### 💸 Payments & Notifications
- Integrated with **Stripe** / **Razorpay**
- Email notifications for every transaction

### 💖 User Engagement
- Wishlist/bookmark projects  
- Like/Unlike projects  
- Comment, rate, and review projects

---

## 🧪 Additional Features

- 🔎 **Skill Requirement Search** — find projects that match your skills  
- 🌐 **Community Page** — buyers can post requirements to attract developers

---

> 🎯 Tech-Bridge is more than a platform. It's a launchpad for ideas and innovation.  
Feel free to contribute, suggest ideas, or reach out to the team!

## Routes Mounting
```
  /api/v1/users
```
```
/api/v1/project
```
```
/api/v1/comments
```
```
/api/v1/community
```
```
/api/v1/apply
```
```
/api/v1/purchase
```

## API Endpoints

**USER**

- User login (POST)
```
/login
```
- user logout (POST)
```
  /logout
```
- Refresh Access Token (POST)
  ```
  `/refresh-token
  ```
- Change-Password (POST)
  ```
    /change-password
  ```
- Get User Details (GET)
  ```
  /user/:id
  ```
- Update Deatils (POST)
    ```
    `/update-details
    ```
**PROJECT ROUTES**

```
("/addproject").post
("/deleteproject/:projectId").delete
("/editproject/:projectId").put
("/myprojects").get
(router.route("/projects").get
("/projects").get
("/addbookmark/:projectId").post
("/removebookmark/:projectId").delete
("/bookmarkedprojects").get
("/collabprojects").get
("/completedprojects").get
```

**COMMUNITY ROUTES**

```
  ("/addpost").post
  ("/getpostofrole").post
  ("/updatepost/:postId").put
  ("/deletepost/:postId").delete
  ("/getmyposts").get
```
**COMMENT ROUTES**

```
  ("/addcomment/:projectId").post
  ("/deletecomment/:commentId").delete
  ("/comments/:projectId").get
```

