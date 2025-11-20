import { supabase } from "./supabaseClient.js"

const form = document.getElementById("curso-form")
const inputId = document.getElementById("id")
const inputCodigo = document.getElementById("codigo")
const inputNombre = document.getElementById("nombre")
const inputCreditos = document.getElementById("creditos")
const btnSave = document.getElementById("btn-save")
const btnCancel = document.getElementById("btn-cancel")
const statusDiv = document.getElementById("status")
const editando = false
const listaCursos = document.getElementById("lista")

//========================
//Eventos
//========================
form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const codigo = inputCodigo.value.trim()
  const nombre = inputNombre.value.trim()
  const creditos = Number.parseInt(inputCreditos.value.trim())

  if (editando) {
  } else {
    await crearCurso(codigo, nombre, creditos)
  }

  form.reset()
})

listaCursos.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = e.target.getAttribute("data-id")
    await eliminarCursos(id)
    await cargarCursos()
  }
})

//===================================
//CRUD (CREATE-READ-UPDATE-DELETE)
//===================================
async function cargarCursos() {
  const { data: cursos, error } = await supabase.from("Cursos").select("*")
  console.log("[v0] Cursos cargados:", cursos)

  if (error) {
    console.error("[v0] Error al cargar cursos:", error)
    statusDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`
    return
  }

  listaCursos.innerHTML = ""

  if (cursos && cursos.length > 0) {
    cursos.forEach((curso) => {
      const li = document.createElement("li")
      li.className = "list-group-item"
      li.innerHTML = `
                <span>${curso.codigo} - ${curso.nombre} [${curso.creditos} Créditos]</span>
                <button class="btn-delete" data-id="${curso.id}">Eliminar</button>
            `
      listaCursos.appendChild(li)
    })
    statusDiv.innerHTML = ""
  } else {
    const li = document.createElement("li")
    li.className = "list-group-item text-muted"
    li.textContent = "No hay cursos registrados"
    listaCursos.appendChild(li)
  }
}

async function crearCurso(codigo, nombre, creditos) {
  const curso = { codigo, nombre, creditos }
  const { error } = await supabase.from("Cursos").insert([curso])

  if (error) {
    console.error("[v0] Error al crear curso:", error)
    statusDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`
  } else {
    console.log("[v0] Curso creado exitosamente")
    statusDiv.innerHTML = `<p style="color: green;">Curso creado exitosamente</p>`
    await cargarCursos()
    setTimeout(() => {
      statusDiv.innerHTML = ""
    }, 2000)
  }
}

async function eliminarCursos(id) {
  const { error } = await supabase.from("Cursos").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error al eliminar curso:", error)
    statusDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`
  } else {
    console.log("[v0] Curso eliminado exitosamente")
    statusDiv.innerHTML = `<p style="color: green;">Curso eliminado</p>`
    setTimeout(() => {
      statusDiv.innerHTML = ""
    }, 2000)
  }
}

cargarCursos()
