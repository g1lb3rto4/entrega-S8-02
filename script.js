let itens = document.querySelector(".produtos")
let carrinho = document.querySelector(".carrinho ul")

function listarProdutos(listaProdutos, secao){

    secao.innerHTML = ""
    
    if(listaProdutos.length >= 1){

        for(let i = 0; i < listaProdutos.length; i++){

            let produto = listaProdutos[i]

            let cardProduto    = criarCardProduto(produto)
            
            secao.appendChild(cardProduto)
        }
    }
}

listarProdutos(produtos, itens)

function criarCardProduto(produto){

    let lista = document.createElement("li")

    let categoria = produto.categoria
    let Categoria = document.createElement("button")
    Categoria.innerText = categoria
    
    let nome = produto.nome
    let Nome = document.createElement("h2")
    Nome.innerText = nome

    let descricao = produto.descricao
    let Descricao = document.createElement("span")
    Descricao.innerText = descricao

    let preco = produto.preco
    let Preco = document.createElement("p")
    Preco.innerText = `R$ ${preco}`.replace(".",",")
 
    let imagem = document.createElement("img")
    let img = produto.img
    imagem.src = img
    imagem.alt = nome

    let btnComprar = document.createElement("button")
    btnComprar.innerText = "Adicionar carrinho"
   
    let id = produto.id

    if(id != undefined){

        btnComprar.id =  id
    }
    imagem.classList.add("imagemProduto")
    
    lista.append(imagem,Nome,Categoria,Descricao,Preco,btnComprar)

    return lista 
}

itens.addEventListener("click", interceptandoProduto)

let carrinhoCompras = []

function interceptandoProduto(event){

    let compra  = event.target
    
    if(compra.tagName == "BUTTON"){

        let idProduto = compra.id

        let produto = produtos.find(function(produto){

            if(produto.id == idProduto){
                return produto
            }
        })
        adicionar(produto)
    }
}

function adicionar(produto){

    if(produto !== undefined){
        carrinhoCompras.push(produto)

        listarProdutos(carrinhoCompras,carrinho)
    }
}

carrinho.addEventListener("click", concluirTarefa)

function concluirTarefa(event){

    let botaoRemover = event.target

    if(botaoRemover.tagName == "BUTTON"){

        let id = botaoRemover.id

        carrinhoCompras[id].status = true
        
        carrinhoCompras.splice(id,1)

        listarProdutos(carrinhoCompras,carrinho)
    }
}

let inputBusca = document.querySelector(".pesquisa input")
let botaoBusca = document.querySelector(".pesquisa button")

inputBusca.addEventListener("keyup", function(event){
    
    if(event.keyCode == 13){

        let Nomes = inputBusca.value
 
        let resultadoBusca  = busca(Nomes)

        listarProdutos(resultadoBusca, itens)
    }
})

function busca(Pesquisa){
    
    let buscarItens = []

    for(let i = 0; i < produtos.length; i++){
        let pesquisa = Pesquisa.toLowerCase()
        let nomeProduto = produtos[i].nome.toLowerCase()
        let categoria = produtos[i].categoria.toLowerCase()
        
        if(nomeProduto.includes(pesquisa) || categoria.includes(pesquisa)){

            buscarItens.push(produtos[i])
        }
    }
    return buscarItens
}



