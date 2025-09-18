
async function paginate(model, query, options = {}) {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = options.sort || { createdAt: -1 };
    const populate = options.populate || '';

    const [data, total] = await Promise.all([
        model.find(query)
            .populate(populate)
            .sort(sort)
            .skip(skip)
            .limit(limit),
        model.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        data,
        pagination: {
            currentPage: page,
            totalPages,
            totalItems: total,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            nextPage: page < totalPages ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null
        }
    };
}

module.exports = paginate;