/**
 * @type {?*[]} data
 */
let data
/**
 * @type {number} cache key
 */
let key
/**
 * @type {boolean} loading status
 */
let loading

/**
 * Get posts using cache
 * @param {Vue} app
 * @return {Promise<*[]>}
 */
export async function getPosts(app) {
  try {
    // eslint-disable-next-line no-unmodified-loop-condition
    while (loading) {
      await sleep(100)
    }
    if (data && key === makeKey()) {
      // console.log('using cache')
      return data
    } else {
      // console.log('fetch')
      try {
        loading = true
        ;({ data } = await app.$axios.get('/api/v2/items'))
        key = makeKey()
      } finally {
        loading = false
      }
      return data
    }
  } catch (e) {
    //
  }
}

/**
 * @return {number}
 */
function makeKey() {
  return ~~(Date.now() / (1000 * 60 * 3))
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
