const mongoose = require("mongoose")
const Ligacao = require("../models/ligacao")

module.exports.list = () => {
    return Ligacao
        .find({})
        .exec()
}

module.exports.listByOrigem = nome => {
    return Ligacao
        .find({ origem: nome }, { _id: 1, destino: 1 })
        .exec()
}