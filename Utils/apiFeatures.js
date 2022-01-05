class ApiFeatures {
    constructor(query, queryStr, req) {
        this.query = query;
        this.queryStr = queryStr;
        this.req = req;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}
 
        console.log(this.req.query);

        this.query = this.query.find({...keyword});
        return this;
    }

    filter() {
        const queryCopy = {...this.queryStr};

        const removeFields = ["keyword", "limit", "page"];
        removeFields.forEach(el => delete queryCopy[el]);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination (ppp) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = ppp * (currentPage - 1);
        this.query = this.query.limit(ppp).skip(skip);
        return this;
    }
}

export default ApiFeatures;