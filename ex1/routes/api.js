var express = require('express');
var router = express.Router();
var Cidade = require("../controllers/cidade")
var Ligacao = require("../controllers/ligacao")

router.get('/cidades', function(req, res, next) {
  // Listar por distrito
  if (req.query.distrito) {
    Cidade.listByDistrict(req.query.distrito)
      .then(dados => {
        console.log("Distrito: " + req.query.distrito)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(dados, null, 2));
      })
      .catch(erro => {
        console.log(erro)
        res.status(404).send('Not found');
      })
  }
  // Listar todos
  else {
    Cidade.list()
      .then(dados => {
        console.log("TODOS")
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(dados, null, 2));
      })
      .catch(erro => {
        console.log(erro)
        res.status(404).send('Not found');
      })
  }  
});

router.get('/cidades/nomes', function(req, res, next) {
  Cidade.listNames()
    .then(dados => {
      nomes = []
      dados.forEach(elem => { nomes.push(elem.nome) })
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(nomes, null, 2));
    })
    .catch(erro => {
      console.log(erro)
      res.status(404).send('Not found');
    })
});

router.get('/cidades/:id', function(req, res, next) {
  Cidade.find(req.params.id)
    .then(dados => {
      cidade = dados.length > 0 ? dados[0] : { }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(cidade, null, 2));
    })
    .catch(erro => {
      console.log(erro)
      res.status(404).send('Not found');
    })
});

router.get('/distritos', function(req, res, next) {
  Cidade.listDistricts()
    .then(dados => {
      distritos = [ ]
      distritosLookup = { }
      dados.forEach(elem => { 
        nome = elem.distrito
        if (!(nome in distritosLookup)) {
          dist = { nome: nome, cidades: [] }
          distritosLookup[nome] = dist
          distritos.push(dist)
        }
      })
      Cidade.list()
        .then(dados => {
          dados.forEach(elem => {
            distritosLookup[elem.distrito].cidades.push(elem.nome)
          })
          // Enviar
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(distritos, null, 2));
        })
        .catch(erro => {
          console.log(erro)
          res.status(404).send('Not found');
        })
    })
    .catch(erro => {
      console.log(erro)
      res.status(404).send('Not found');
    })
});

router.get('/ligacoes', function(req, res, next) {
  // Origem
  if (req.query.origem) {
    Cidade.list()
      .then(cidades => {
        Ligacao.listByOrigem(req.query.origem)
          .then(ligacoes => {
            // Adicionar o nome da cidade
            ligacoesProcessadas = []
            ligacoes.forEach(lig => {
              cidades.forEach(cid => {
                if (cid._id == lig.destino) {
                  ligacoesProcessadas.push({
                    _id: lig._id,
                    destino_id: lig.destino,
                    destino_nome: cid.nome

                  })
                }
              })
            })
            // Enviar
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(ligacoesProcessadas, null, 2));
          })
          .catch(erro => {
            console.log(erro)
            res.status(404).send('Not found');
          })
      })
      .catch(erro => {
        console.log(erro)
        res.status(404).send('Not found');
      })
  }
  // Distancia
  else if (req.query.dist) {
    Cidade.list()
      .then(cidades => {
        Ligacao.list()
          .then(ligacoes => {
            // Adicionar o nome da cidade
            ligacoesProcessadas = []
            ligacoes.forEach(lig => {
              if (lig.distancia >= req.query.dist) {
                nome_origem = undefined
                nome_destino = undefined
                cidades.forEach(cid => {
                  if (cid._id == lig.origem) {
                    nome_origem = cid.nome
                  }
                  if (cid._id == lig.destino) {
                    nome_destino = cid.nome
                  }
                  if (nome_origem != undefined && nome_destino != undefined) {
                    ligacoesProcessadas.push({
                      _id: lig._id,
                      distancia: lig.distancia,
                      origem_id: lig.origem,
                      origem_nome: nome_origem,
                      destino_id: lig.destino,
                      destino_nome: nome_destino
                    })
                  }
                })
              }
            })
            // Enviar
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(ligacoesProcessadas, null, 2));
          })
          .catch(erro => {
            console.log(erro)
            res.status(404).send('Not found');
          })
      })
      .catch(erro => {
        console.log(erro)
        res.status(404).send('Not found');
      })
  }
  // Erro
  else {
    res.status(404).send('Not found');
  }
});

module.exports = router;
