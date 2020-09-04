import axios from 'axios'

export const fetchShow = async () => {
  try {
    const response = await axios(
      'https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes'
    )
    return response.data
  } catch (error) {
    throw error
  }
}
