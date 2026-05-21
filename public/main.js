const containerAdicionar = document.querySelector('.adicionar')
const btnAdicionar = document.querySelector("button")
const inputAdicionar = document.querySelector("input")
const containertarefas = document.querySelector(".tarefas")
const tarefasTemplates = containertarefas.querySelector("template")

function salvarTarefas(){
    const NodeListTarefas = containertarefas.querySelectorAll(":scope > .tarefa span")
    const arrayTarefa = Array.from(NodeListTarefas).map(e1 => e1.textContent.trim())
    const stringTarefas = JSON.stringify(arrayTarefa)
    localStorage.setItem("tarefas", stringTarefas)
}

function carregarTarefas(){
    const stringTarefas = localStorage.getItem("tarefas")
    const arrayTarefas = JSON.parse(stringTarefas)  || []
    arrayTarefas.forEach(e1txt => criarTarefa(e1txt))
}

function criarTarefa(texto){
    if (texto.trim()=="")return
    const tarefa = tarefasTemplates.content.cloneNode(true)
    const btnexcluir = tarefa.querySelector("button")
    const span = tarefa.querySelector("span")

    btnexcluir.addEventListener("click", () => {
        btnexcluir.closest(".tarefa").remove()
        salvarTarefas()
    })
    span.textContent = texto 
    containertarefas.appendChild(tarefa)
    salvarTarefas()
}

btnAdicionar.addEventListener("click", () => {
    const texto = inputAdicionar.value.trim();

    criarTarefa(texto)
    inputAdicionar.value = ""
})

inputAdicionar.addEventListener('keypress', (event) => {
    if (event.key !== 'Enter') return;
    btnAdicionar.click();

       
    
})

carregarTarefas()
