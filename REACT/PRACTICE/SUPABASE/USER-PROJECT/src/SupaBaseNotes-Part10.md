# 📌 Storage.jsx — Supabase Notes

## 💡 Purpose

- Storage.jsx demonstrates how to work with Supabase Storage instead of the database.

## It covers:

- 📤 Uploading files

- 🔐 User-specific folders

- 🔗 Creating signed URLs

- 📋 Listing a user's files

- 🖼️ Displaying private images

## Your bucket is:

```js
avatars
```

## 1️⃣ Get Current User

- The component repeatedly uses:

```js
const {
  data: { user },
  error: userError,
} = await supabase.auth.getUser();
```

## Purpose:

- Get the currently logged-in user's id.

- That ID is then used to create a user-specific storage path.

## 2️⃣ User-Specific File Path ⭐

```js
const filePath = `${user.id}/${file.name}`;
```

## Example:

```js
user.id = abc123
file.name = photo.jpg

        ↓

abc123/photo.jpg
```

- This creates a folder structure like:

```js
avatars
 ├── abc123/
 │    ├── photo.jpg
 │    └── profile.png
 │
 └── xyz789/
      └── photo.jpg
```

## 🔑 Important Concept

- Each user gets their own folder:

```js
avatars/{user.id}/{filename}
```

- This works together with your Storage RLS policies.

## 3️⃣ Upload File

```js

const { error } = await supabase.storage
  .from("avatars")
  .upload(filePath, file);
```

## Breakdown

```js
.storage
    ↓
Supabase Storage

.from("avatars")
    ↓
Choose bucket

.upload(filePath, file)
    ↓
Upload file to that path
```

## General Pattern

```js
supabase.storage
  .from("bucket-name")
  .upload("path/file.jpg", file);
```

## 4️⃣ Private Bucket

- Your avatars bucket is private.

- Therefore, you cannot simply use a normal public URL to display the image.

- Instead, you create a signed URL.

```js
5️⃣ Create Signed URL ⭐
const { data, error } = await supabase.storage
  .from("avatars")
  .createSignedUrl(filePath, 60 * 60);
```

## 60 * 60 means:

```js
60 seconds × 60
       ↓
3600 seconds
       ↓
1 hour
```

## A signed URL gives temporary access to a private file.

## General Pattern

```js
supabase.storage
  .from("bucket-name")
  .createSignedUrl("file-path", expiryInSeconds);
```

## 6️⃣ Display the Signed URL

```js
setImageUrl(data.signedUrl);
```

- Then:

```js
<img src={imageUrl} />
```

## Flow:

```js
Private file
    ↓
createSignedUrl()
    ↓
Temporary URL
    ↓
React state
    ↓
<img src={imageUrl} />
```

## 7️⃣ List User's Files

## handleViewAll() uses:

```js
const { data: files, error } = await supabase.storage
  .from("avatars")
  .list(user.id);
```

## This lists the files inside the logged-in user's folder.

```js
avatars/
   ↓
user.id/
   ↓
.list(user.id)
   ↓
files belonging to that folder
```

## 8️⃣ Create Signed URLs for All Files

- After getting the file list:

```js
const imageData = await Promise.all(
  files.map(async (file) => {
    const filePath = `${user.id}/${file.name}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .createSignedUrl(filePath, 60 * 60);

    if (error) {
      return null;
    }

    return {
      name: file.name,
      url: data.signedUrl,
    };
  })
);
```

## Why Promise.all()?

- There may be multiple files.

```js
photo1.jpg → signed URL
photo2.jpg → signed URL
photo3.jpg → signed URL
        ↓
    Promise.all()
        ↓
All results together
```

## 9️⃣ Remove Failed URLs

```js
setImages(imageData.filter(Boolean));
```

- filter(Boolean) removes null values.

- So if:

```js
[
  { name: "a.jpg", url: "..." },
  null,
  { name: "c.jpg", url: "..." }
]
```

- becomes:

```js
[
  { name: "a.jpg", url: "..." },
  { name: "c.jpg", url: "..." }
]
```

## 🔟 Display All Uploaded Images

- The component maps over the signed URLs:

```js
{images.map((image) => (
  <div key={image.name}>
    <img src={image.url} />
    <p>{image.name}</p>
  </div>
))}
```

- So:

```js
Storage files
      ↓
.list()
      ↓
File names
      ↓
createSignedUrl()
      ↓
Signed URLs
      ↓
images state
      ↓
.map()
      ↓
Display images
```

## 🧠 Complete Storage Flow

```js
Logged-in User
      ↓
getUser()
      ↓
user.id
      ↓
${user.id}/${file.name}
      ↓
avatars bucket
      ↓
.upload()
      ↓
Private file stored
      ↓
createSignedUrl()
      ↓
Temporary access URL
      ↓
<img src={signedUrl} />
```

## 🔐 Storage Security

- This is one of the most important things you learned.

- Your Storage RLS policy uses the user's ID from the folder:

```js
bucket_id = 'avatars'
AND (storage.foldername(name))[1] = (select auth.uid()::text)
```

## Conceptually:

```js
Logged-in user
     ↓
auth.uid()
     ↓
Must match
     ↓
First folder name
     ↓
user.id
```

## Therefore:

```js
User A → A's folder ✅
User A → B's folder ❌
```

## This is what makes the private storage setup meaningful.

## ⭐ Key Supabase Storage APIs

| Purpose              | API                              |
| -------------------- | -------------------------------- |
| Get current user     | `supabase.auth.getUser()`        |
| Select bucket        | `.storage.from("avatars")`       |
| Upload file          | `.upload(path, file)`            |
| List files           | `.list(user.id)`                 |
| Create temporary URL | `.createSignedUrl(path, expiry)` |

## 🔥 Storage Cheat Sheet

```js
// Upload
supabase.storage
  .from("avatars")
  .upload(filePath, file);

// List
supabase.storage
  .from("avatars")
  .list(user.id);

// Signed URL
supabase.storage
  .from("avatars")
  .createSignedUrl(filePath, 3600);
```

## 🧠 Database vs Storage

- This is worth remembering:

```js
Supabase Database
        ↓
Structured data
        ↓
title, method, rating, user_id


Supabase Storage
        ↓
Files
        ↓
images, PDFs, videos, documents
```

- And both can use the authenticated user's ID for ownership/security.

## 🔑 One-Line Revision

- Supabase Storage uses .upload() to store files, .list() to retrieve files from a folder, and .createSignedUrl() to temporarily access files in a private bucket; user-specific paths + Storage RLS protect ownership.

## 🎯  Supabase Module Is Now Essentially Complete

- Covered the practical concepts you actually used:

```js
SUPABASE CLIENT
      ↓
AUTHENTICATION
      ↓
PROTECTED ROUTES
      ↓
DATABASE
  ├── CREATE → insert()
  ├── READ   → select()
  ├── UPDATE → update()
  └── DELETE → delete()
      ↓
FILTER → eq()
SORT   → order()
SINGLE → single()
      ↓
RLS + auth.uid()
      ↓
STORAGE
  ├── upload()
  ├── list()
  ├── signed URLs
  └── Storage RLS
```
