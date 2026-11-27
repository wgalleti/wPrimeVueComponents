import { describe, it, expect, vi } from 'vitest'
import type { AxiosInstance } from 'axios'
import { createAxiosDataProvider } from './axiosDataProvider'

function setup() {
  const axios = {
    get: vi.fn().mockResolvedValue({ data: {} }),
    patch: vi.fn().mockResolvedValue({ data: {} }),
    delete: vi.fn().mockResolvedValue({}),
  }
  return { axios, provider: createAxiosDataProvider(axios as unknown as AxiosInstance) }
}

describe('createAxiosDataProvider — id no caminho', () => {
  it.each([
    ['../../x', '..%2F..%2Fx'],
    ['a/b', 'a%2Fb'],
    ['a?b=1', 'a%3Fb%3D1'],
    ['a#b', 'a%23b'],
  ])('codifica %s em get, update e delete', async (id, enc) => {
    const { axios, provider } = setup()
    await provider.get('/itens/', id)
    await provider.update('/itens/', id, {})
    await provider.delete('/itens/', id)
    expect(axios.get).toHaveBeenCalledWith(`/itens/${enc}/`, undefined)
    expect(axios.patch).toHaveBeenCalledWith(`/itens/${enc}/`, {}, undefined)
    expect(axios.delete).toHaveBeenCalledWith(`/itens/${enc}/`)
  })

  it('uuid e número ficam iguais', async () => {
    const { axios, provider } = setup()
    const uuid = '0190a1b2-c3d4-7e5f-8a9b-0c1d2e3f4a5b'
    await provider.get('/itens/', uuid)
    await provider.get('/itens/', 42)
    expect(axios.get).toHaveBeenNthCalledWith(1, `/itens/${uuid}/`, undefined)
    expect(axios.get).toHaveBeenNthCalledWith(2, '/itens/42/', undefined)
  })
})
