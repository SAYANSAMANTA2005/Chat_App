# MongoDB Connection String for Render Deployment

## Your Connection String:
```
mongodb+srv://sayansamantabirth2005_db_user:<db_password>@cluster0.igj5jll.mongodb.net/?appName=Cluster0
```

## ⚠️ IMPORTANT: Update Required

You need to:
1. Replace `<db_password>` with your actual MongoDB password
2. Add `/chatApp` before the `?` to specify the database name

## Final Connection String Format:
```
mongodb+srv://sayansamantabirth2005_db_user:YOUR_ACTUAL_PASSWORD@cluster0.igj5jll.mongodb.net/chatApp?appName=Cluster0
```

**Example** (if your password was `myPass123`):
```
mongodb+srv://sayansamantabirth2005_db_user:myPass123@cluster0.igj5jll.mongodb.net/chatApp?appName=Cluster0
```

---

## What to do with this:

When deploying to Render, you'll set this as the `MONGO_URI` environment variable in the backend service.

**Steps:**
1. Deploy to Render (I'll guide you)
2. Go to backend service → Environment tab
3. Add environment variable:
   - **Key**: `MONGO_URI`
   - **Value**: Your completed connection string (with actual password)
4. Save and the backend will redeploy automatically

---

**Your actual MongoDB password:** [You should have saved this when creating the database user]

If you don't have the password, you can reset it in MongoDB Atlas:
- Database Access → Your User → Edit → Reset Password
