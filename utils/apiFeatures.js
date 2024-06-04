class apiFeatures {
  constructor(query, mongooseQuery) {
    this.query = query;
    this.mongooseQuery = mongooseQuery;
  }

  // 1) filter
  filter() {
    // use {...} to avoid pointer and not update in query params
    const selectedQuery = { ...this.query };
    const executorFields = ["limit", "page", "sort", "fields", "keyword"];
    executorFields.forEach((field) => delete selectedQuery[field]);
    // ({price: {$gte:4} , ratingAvg:{$gte:50}}) converting to string to make replace
    let queryStr = JSON.stringify(selectedQuery);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  // 2) sorting
  sorting() {
    if (this.query.sort) {
      const sortedFields = this.query.sort.replace(/,/g, " ");
      this.mongooseQuery = this.mongooseQuery.sort(sortedFields);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  // 3) select specific fields
  fields() {
    if (this.query.fields) {
      const fields = this.query.fields.replace(/,/g, " ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    }
    return this; // Continue chaining
  }

  // 4) search
  search(modelName) {
    if (this.query.keyword) {
      let query = {};
      if (modelName === "productModel") {
        query.$or = [
          { title: { $regex: this.query.keyword, $options: "i" } },
          { desc: { $regex: this.query.keyword, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: this.query.keyword, $options: "i" } };
      }
      // 'i' option for sensitive  search keywords
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  // 5) pagination
  paginate() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 50;
    const skip = (page - 1) * limit; // (2 - 1 ) * 4 = skip(4)

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }
}

module.exports = apiFeatures;
