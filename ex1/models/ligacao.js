const mongoose = require("mongoose")

var ligacaoSchema = new mongoose.Schema({
    _id: String,
    origem: String,
    destino: String,
    distancia: String
})

module.exports = mongoose.model("ligacoes", ligacaoSchema)