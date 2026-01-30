const form = document.getElementById("form")
const description = document.getElementById("description")
const monto = document.getElementById("monto")
const tipo = document.getElementById("tipo")
const lista = document.getElementById("lista")

const balance1 = document.getElementById("balance")
const ingresos1 = document.getElementById("ingresos")
const gastos1 = document.getElementById("gastos")

let movimientos = JSON.parse(localStorage.getItem("movimientos")) || []

form.addEventListener("submit", agregarMovimiento)

function agregarMovimiento (e) {
    e.preventDefault()


const movimiento = {
    id: Date.now(),
    description: description.value,
    monto: +monto.value,
    tipo: tipo.value
}

movimientos.push(movimiento)
guardar()
renderizar() 

form.reset()
}

function renderizar() {
    lista.innerHTML = ""
    
    let ingresos = 0
    let gastos = 0

    movimientos.forEach(mov => {
        const li = document.createElement("li")

        li.innerHTML = `
        ${mov.tipo === "ingreso" ? "🟢" : "🔴"}
        ${mov.description} - ${formatoPesos(mov.monto)}
        <button onclick="eliminar(${mov.id})">❌</button>
        `

        lista.appendChild(li)
        mov.tipo === "ingreso"
        ? ingresos += mov.monto
        : gastos += mov.monto
        })

        const balance = ingresos - gastos

        balance1.textContent = formatoPesos(balance)
        ingresos1.textContent = formatoPesos(ingresos)
        gastos1.textContent = formatoPesos(gastos)
}

function eliminar(id) {
    movimientos = movimientos.filter( m => m.id !== id)
    guardar()
    renderizar()
}

function guardar(){
    localStorage.setItem("movimientos", JSON.stringify(movimientos))
}

renderizar()

function formatoPesos(valor) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
    }).format(valor)
}