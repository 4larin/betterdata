const mongoose = require('mongoose')
const queryConstructor = (query, sortBy, item) => {
    let params = {}

    let array = Object.keys(query)
    for (let i = 0; i < array.length; i++) {
        if (Object.keys(query)[i] === 'id') {
            params["_id"] = mongoose.Types.ObjectId(Object.values(query)[i])
        } else if (Object.keys(query)[i] === 'userId') {
            params[Object.keys(query)[i]] = mongoose.Types.ObjectId(Object.values(query)[i])
        } else {
            params[Object.keys(query)[i]] = Object.values(query)[i]
        }
    }

    let { limit, skip, sort } = params
    limit = limit ? Number(limit) : 50
    skip = skip ? Number(skip) : 0
    skip = limit * skip

    if (sort === 'asc' || sort === 'desc') {
        if (typeof sortBy === 'object') {

            let first = sortBy[Object.keys(sortBy)[0]]
            let second = sortBy[Object.keys(sortBy)[1]]

            sort = sort === 'asc' ? { [first]: 1, [second]: 1 } : { [first]: -1, [second]: -1 }
        } else {
            sort = sort === 'asc' ? { [sortBy]: 1 } : { [sortBy]: -1 }
        }
    } else if (sort == undefined) {
        sort = { [sortBy]: 1 }
    } else {
        return { error: `Unable to find ${item} might be because of invalid params` }
    }

    delete params.limit
    delete params.skip
    delete params.sort
    return { params, limit, skip, sort }
}

module.exports = { queryConstructor }