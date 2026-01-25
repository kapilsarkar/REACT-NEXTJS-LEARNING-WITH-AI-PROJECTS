function fetchUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "Kapil Sarkar", url: "https://github.com/kapilsarkar" })
        }, 3000)
    })
}

//fetchUserData();

async function getUserData() {
    try {
        console.log("Fetching User Data...");
        const userData = await fetchUserData()
        console.log("User Data Fetched Successfully");
        console.log("User Data:", userData);
    } catch (error) {
        console.log("Error Fetch Data", error);
    }
}

getUserData();

function fetchPostData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Post Data Fetched");
        }, 2000)
    })
}

function fetchCommentData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Comment Data Fetched");
        }, 3000)
    })
}

async function getBlogData() {
    try {
        console.log("fetching Blog Data")
        // const blogData = await fetchPostData();
        // const commentData = await fetchCommentData();
        const [postData, commentData] = await Promise.all([fetchPostData(), fetchCommentData()])
        console.log(postData);
        console.log(commentData);
        console.log("Fetch Complete");

    }
    catch (error) {
        console.error("Error Fetched Blog Data", error);
    }
}

getBlogData();