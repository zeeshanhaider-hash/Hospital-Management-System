class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            title : {
                $regex : this.queryStr.keyword,
                $options : "i"
            }
        } : {}

        this.query = this.query.find({...keyword});
        return this
    }

    filter(){
        const queryStrCopy = {...this.queryStr}
        console.log(queryStrCopy);
        const removedItems = ["keyword","page","limit"];
        removedItems.forEach(item => delete queryStrCopy[item])
        console.log(queryStrCopy);
        this.query = this.query.find(queryStrCopy);
        return this
    }

    pagination(){
        let productsPerPage = 20;
        const currentPage = this.queryStr.page || 1
        const skip = productsPerPage * (currentPage - 1 );
        this.query = this.query.limit(productsPerPage).skip(skip)
        return this
    }
}

export default ApiFeatures
