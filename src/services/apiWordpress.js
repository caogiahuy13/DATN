import _ from 'lodash';

import { HOST, API_CMS_URL, mainCategoriesList } from '../constants/index';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  return response.json().then((data) => {
    let error = new Error(data.msg)
    error.response = response
    error.status = response.status
    error.result = data.msg
    throw error
  })
}

function httpWPGetBlog(url) {
  return fetch(url, {
      method: 'GET'
    }).then(checkStatus)
    .then((response) => {
      return response.json().then(data => {
        data.total = +response.headers.get('X-WP-Total');
        data.totalPage = +response.headers.get('X-WP-TotalPages');
        return data
      })
    })
}

function httpWPGet(url) {
  return fetch(url, {
      method: 'GET'
    }).then(checkStatus)
    .then((response) => {
      return response.json()
    })
}

function _getCategory(data) {
	if (!data) {
		return
	}
	let item = data.find((item) => {
		return mainCategoriesList.indexOf(item.id) === -1
	})
	return item ? item : data[0]
}

function _getMainCategory(data) {
	if (!data) {
		return
	}
	let item = data.find((item) => {
		return mainCategoriesList.indexOf(item.id) > -1
	})
	return item ? item : data[0]
}

function convertWptoPost(data) {
  return data.map((item) => {
    return _.merge(_.pick(item, ['id', 'date', 'slug']), {
      title: _.result(item, 'title.rendered'),
      excerpt: _.result(item, 'excerpt.rendered'),
      author: _.pick(_.result(item, '_embedded.author[0]'), ['id', 'name']), //_embedded.author[0].avatar_urls[96]
      category: _getCategory(_.result(item, '_embedded.wp:term[0]')),
      mainCategory: _getMainCategory(_.result(item, '_embedded.wp:term[0]')),
      thumnail: _.result(
        item,
        "_embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url"
      ),
      photo: _.result(
        item,
        "_embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url"
      ),
      metadesc: _.result(item, 'yoast_meta.yoast_wpseo_metadesc') ? _.result(item, 'yoast_meta.yoast_wpseo_metadesc') : _.result(item, 'title.rendered'),
      metatitle: _.result(item, 'yoast_meta.yoast_wpseo_title') ? _.result(item, 'yoast_meta.yoast_wpseo_title') : _.result(item, 'title.rendered')
    })
  })
}

export function getBlogs(page = 1, limit = 4, params = {}){
    params = params || {}
    let url = API_CMS_URL + `posts?_embed&context=embed&page=${page}&per_page=${limit}`
    // url += offset >= 0 ? `&offset=${offset}` : ''
    url += params.categories ? `&categories=${params.categories}` : ''
    url += params.tags ? `&tags=${params.tags}` : ''
    url += params.author ? `&author=${params.author}` : ''
    url += params.exclude ? `&exclude=${params.exclude}` : ''
    url += params.keyword ? `&search=${params.keyword}` : ''

    return httpWPGetBlog(url).then((data) => {
        let res = {}
        res.total = data.total
        res.totalPage = data.totalPage
        res.nextPage = res.totalPage <= page ? null : ++page
        res.data = convertWptoPost(data)
        return res
    })
}
