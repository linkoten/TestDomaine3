import swell from './client'
import { PRODUCTS_PER_PAGE } from '../constants'

export const getProducts = async ({
  page = 1,
  sort = '',
  filters = {},
  limit = PRODUCTS_PER_PAGE
}) => {
  return await swell.products.list({
    page,
    limit,
    sort,
    $filters: filters,
  })
}

export const getAttributes = async ({
  page = 1,
}) => {
  return await swell.attributes.list({
    page
  })
}

export const getProductBySlugOrId = async slugOrId => {
  return await swell.products.get(slugOrId)
}
