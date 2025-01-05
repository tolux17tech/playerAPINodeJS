class APIFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }

    filter() {
        let newQuery = { ...this.queryString };

        //Fields to exclude
        const excludedQuery = ['sort', 'limit', 'fields', 'page'];
        excludedQuery.forEach(field => delete newQuery[field])
        //Advanced Filtering
        let queryStr = JSON.stringify(newQuery);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        // Query
        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        //Sorting fields
        if (this.queryString.sort) {

            this.query = this.query.sort(this.queryString.sort.split(',').join(' '))
        }
        else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    selectFields() {
        //Cherry Picking
        if (this.queryString.fields) {
            console.log(this.queryString.fields);
            this.query.select(this.queryString.fields.split(',').join(' '))
        }
        return this;
    }

    pagination() {
        //Pagination
        const page = +this.queryString.page || 1;
        const limit = +this.queryString.limit || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = APIFeatures;