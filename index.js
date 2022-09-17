const fetch = global.fetch || require('node-fetch');

class Forum {
    constructor(URL) {
        this.URL = URL + "/api";
    }
    /**
     * Main fetch function
     * @param {String} path Way for API
     * @param {Object} options fetch options
     * @returns 
     */
    async fetch(path, options = {}) {
        if (typeof options.body == "object")
            options.body = JSON.stringify(options.body);
        const res = await fetch(this.URL + path, {
            ...options,
            headers: {
                username: this.username, password: this.password,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        if (res.error)
            throw new Error(res.error)
        return res

    }

    async login(username, password) {
        this.username = username;
        this.password = password;

        return this.user = await this.fetch("/me");
    }

    async getBans() {
        return await this.fetch("/bans")
    }
    async getBan(ip) {
        return await this.fetch("/bans/" + ip)
    }
    async deleteBan(ip) {
        return await this.fetch("/bans/" + ip, {
            method: "DELETE"
        })
    }
    async ban(ip, reason) {
        return await this.fetch(`/bans/${ip}${reason ? "?reason=" + reason : ""}`, {
            method: "POST"
        })
    }


    async getCategories() {
        return await this.fetch("/categories")
    }

    async getCategory(id) {
        return await this.fetch(`/categories/${id}`)
    }

    async editCategory(id, name, description = "") {
        return await this.fetch(`/categories/${id}`, {
            method: "PATCH",
            body: { name, desp: description }
        })
    }

    async deleteCategory(id) {
        return await this.fetch(`/categories/${id}`, {
            method: "DELETE"
        })
    }
    async createCategory(name, description = "") {
        return await this.fetch("/categories", {
            method: "POST",
            body: { name, desp: description }
        })
    }
    async getMessage(id) {
        return await this.fetch(`/messages/${id}`)
    }
    async deleteMessage(id) {
        return await this.fetch(`/messages/${id}`, {
            method: "DELETE"
        })
    }
    async editMessage(id, content) {
        return await this.fetch(`/messages/${id}`, {
            method: "PATCH",
            body: { content }
        })
    }
    async undeleteMessage(id) {
        return await this.fetch(`/messages/${id}/undelete`, {
            method: "POST"
        })
    }
    async reactMessage(id, like = true) {
        return await this.fetch(`/messages/${id}/react/${like ? "like" : "dislike"}`, {
            method: "POST"
        })
    }
    async createMessage(threadID, content) {
        return await this.fetch(`/messages`, {
            method: "POST",
            body: { threadID, content }
        })
    }

    /**
     * 
     * @param {String} query 
     * @param {({limit:Number, skip:Number})} extra 
     * @returns 
     */
    async findUsers(query, extra) {
        const usp = new URLSearchParams({ q: query, ...extra })
        return await this.fetch(`/search/users?${usp.toString()}`)
    }
    async findThreads(query, extra) {
        const usp = new URLSearchParams({ q: query, ...extra })
        return await this.fetch(`/search/threads?${usp.toString()}`)
    } 
    async findMessages(query, extra) {
        const usp = new URLSearchParams({ q: query, ...extra })
        return await this.fetch(`/search/messages?${usp.toString()}`)
    }


    async getThread(id) {
        return await this.fetch(`/threads/${id}`)
    }
    async deleteThread(id){
        return await this.fetch(`/threads/${id}`, {
            method: "DELETE"
        })
    }
    async editThread(id, title) {
        return await this.fetch(`/threads/${id}`, {
            method: "PATCH",
            body: { title }
        });
    }
    async createThread(title, content) {
        return await this.fetch("/threads", {
            method: "POST",
            body: { title, content }
        })
    }

    async getUser(id) {
        return await this.fetch(`/users/${id}`)
    }
    async deleteUser(id) {
        return await this.fetch(`/users/${id}`, {
            method: "DELETE"
        })
    }
    async editUser(id, body) {
        return await this.fetch(`/users/${id}`, {
            method: "PATCH", body
        })
    }
    async avatarUser(id, avatar) {  
        return "Not implemented"
        return await this.fetch(`/users/${id}/`, {
            method: "PUT", body: { avatar }
        })
    }
}

module.exports = { Forum };