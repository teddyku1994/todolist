import service from './src/service'
import io from './src/io'

export const createToDo = async (event, _context) => {
  const input = io.handler.input(event)
  const result = await service(io).create(input)
  if (!result.error) return io.handler.response(200, result)
  return io.handler.response(result.statusCode, result)
}

export const getAll = async (event, _context) => {
  const result = await service(io).fullList()
  if (!result.error) return io.handler.response(200, result)
  return io.handler.response(result.statusCode, result)
}

export const getById = async (event, _context) => {
  const result = await service(io).listSingle(event)
  if (!result.error) return io.handler.response(200, result)
  return io.handler.response(404, { error: "Not Found" })
}

export const updateToDo = async (event, _context) => {
  const result = await service(io).updateSingle(event)
  console.log("RESULT", result)
  if (!result.error) return io.handler.response(200, { status: "Update Successful" })
  return io.handler.response(404, { error: "Not Found" })
}

export const delToDo = async (event, _context) => {
  const result = await service(io).clearAll()
  if (!result.error) return io.handler.response(200, result)
  return io.handler.response(404, { error: "Delete Failed" })
}