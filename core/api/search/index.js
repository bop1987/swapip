import axiosClient from '@/core/utils/axios'

const get = (slug) => {
  return axiosClient({
    method: 'get',
    url: slug,
  })
}

const search = { get }

export default search
