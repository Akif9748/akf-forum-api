const { Forum } = require(".")
const forum = new Forum("http://localhost:3000");

forum.login("Akif9748", "3131").then(async me => {
    console.log("Logged in as", me.name);
    const thread = await forum.createThread("Thread Opened Via API", "This is a thread opened via API")
    console.log(thread);

})