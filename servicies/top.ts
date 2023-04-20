import { load } from 'cheerio'

import { createQuery } from '@/react-query-kit'
import { request } from '@/utils/request'

import { parseRank } from './helper'

export const useTopRich = createQuery({
  primaryKey: `useTopRich`,
  queryFn: async () => {
    const { data } = await request(`/top/rich`, {
      responseType: 'text',
    })
    return parseRank(load(data))
  },
})

export const useTopPlayer = createQuery({
  primaryKey: `useTopPlayer`,
  queryFn: async () => {
    const { data } = await request(`/top/player`, {
      responseType: 'text',
    })
    return parseRank(load(data))
  },
})
