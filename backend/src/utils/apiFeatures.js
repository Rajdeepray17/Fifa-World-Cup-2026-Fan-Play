/**
 * ApiFeatures — Reusable query builder for pagination, filtering,
 * sorting, field selection, and text search on Mongoose queries.
 *
 * Usage:
 *   const features = new ApiFeatures(Model.find(), req.query)
 *     .filter()
 *     .search(['name', 'club'])
 *     .sort()
 *     .limitFields()
 *     .paginate();
 *   const docs = await features.query;
 *   const total = await features.countTotal();
 */
export default class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this._model = query.model;
    this._filterObj = {};
  }

  /**
   * Filter — remove reserved params and apply remaining as Mongo filters.
   * Supports operators: gte, gt, lte, lt (e.g., ?fifaRank[lte]=10).
   */
  filter() {
    const excludedFields = ['page', 'limit', 'sort', 'fields', 'search'];
    const queryObj = { ...this.queryString };
    excludedFields.forEach((f) => delete queryObj[f]);

    /* Convert operator notation: { fifaRank: { gte: '5' } } → { fifaRank: { $gte: 5 } } */
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this._filterObj = JSON.parse(queryStr);

    this.query = this.query.find(this._filterObj);
    return this;
  }

  /**
   * Search — regex search across specified fields.
   * Triggered by ?search=keyword query param.
   */
  search(fields = []) {
    if (this.queryString.search && fields.length > 0) {
      const regex = new RegExp(this.queryString.search, 'i');
      const orConditions = fields.map((field) => ({ [field]: regex }));
      this.query = this.query.find({ $or: orConditions });
      this._filterObj.$or = orConditions;
    }
    return this;
  }

  /**
   * Sort — sort by query param or default to createdAt.
   * Usage: ?sort=fifaRank or ?sort=-name (descending).
   */
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('createdAt');
    }
    return this;
  }

  /**
   * Limit fields — select only specified fields.
   * Usage: ?fields=name,code,fifaRank
   */
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  /**
   * Paginate — skip/limit based on ?page=&limit= params.
   * Defaults: page=1, limit=50.
   */
  paginate() {
    const page = Math.max(1, parseInt(this.queryString.page, 10) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(this.queryString.limit, 10) || 50));
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    this._page = page;
    this._limit = limit;
    return this;
  }

  /**
   * Count total documents matching the filter (for pagination metadata).
   */
  async countTotal() {
    return this._model.countDocuments(this._filterObj);
  }

  /**
   * Return pagination metadata.
   */
  getPaginationMeta(total) {
    const page = this._page || 1;
    const limit = this._limit || 50;
    return {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    };
  }
}
