const mongoose = require("mongoose")
const Cidade = require("../models/cidade")

module.exports.list = () => {
    return Cidade
        .find({}, { _id: 1, nome: 1, distrito: 1 })
        .exec()
}

module.exports.listNames = () => {
    return Cidade
        .find({}, { _id: 0, nome: 1 })
        .sort({ nome: 1 })
        .exec()
}

module.exports.listDistricts = () => {
    return Cidade
        .find({}, { _id: 0, distrito: 1 })
        .sort({ distrito: 1 })
        .exec()
}

module.exports.listByDistrict = nome => {
    return Cidade
        .find({ distrito: nome }, { _id: 1, nome: 1 })
        .exec()
}

module.exports.find = id => {
    return Cidade
        .find({ _id: id }, { _id: 1, nome: 1, distrito: 1 })
        .exec()
}