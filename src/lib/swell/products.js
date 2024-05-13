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

export const getProducts2 = async ({
  page= 2,
  limit = 100,
  sort ='date_created',
  categories =  [],
  filters = {},
  $locale = 'fr'

}) => {
  return await swell.products.get({
    page,
    limit,
    sort,
    categories,
    $filters: {filters},
    expand: ['variants', 'categories', ],
    $locale: $locale

    
  });
}

export const getProducts3 = async ({
  page= 3,
  limit = 100,
  sort ='date_created',
  categories =  [],
  filters = {},
  $locale = 'fr'

}) => {
  return await swell.products.get({
    page,
    limit,
    sort,
    categories,
    $filters: {filters},
    expand: ['variants', 'categories', ],
    $locale: $locale

    
  });
}

export const getProducts4 = async ({
  page= 4,
  limit = 100,
  sort ='date_created',
  categories =  [],
  filters = {},
  $locale = 'fr'

}) => {
  return await swell.products.get({
    page,
    limit,
    sort,
    categories,
    $filters: {filters},
    expand: ['variants', 'categories', ],
    $locale: $locale

    
  });
}

export const getProducts5 = async ({
  page= 5,
  limit = 100,
  sort ='date_created',
  categories =  [],
  filters = {},
  $locale = 'fr'

}) => {
  return await swell.products.get({
    page,
    limit,
    sort,
    categories,
    $filters: {filters},
    expand: ['variants', 'categories', ],
    $locale: $locale

    
  });
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


export const getFrenchProductBySlugOrId = async (slugOrId) => {
  return await swell.products.get(slugOrId, {$locale: 'fr'})
}

export const getEnglishProductBySlugOrId = async (slugOrId) => {
  return await swell.products.get(slugOrId, {$locale: 'en'})
}