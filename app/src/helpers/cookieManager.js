const setCookie = (cname, cvalue, exdays = 365) => {
  var d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

const getCookie = cname => {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

const bookmarkCname = 'salaah-times-bookmarks'

const refreshCookie = () => {
  var cookie = getCookie(bookmarkCname)
  setCookie(bookmarkCname, cookie)
}

const addBookmark = id => {
  const bookmarks = getCookie(bookmarkCname)
    .split('&')
    .filter(el => el !== '')

  if (!bookmarks.includes(id)) {
    bookmarks.push(id)
    const cookie = bookmarks.join('&')
    setCookie(bookmarkCname, cookie)
  }
}

const removeBookmark = id => {
  const bookmarks = getCookie(bookmarkCname)
    .split('&')
    .filter(el => el !== '')
    .filter(el => el !== id)

  const cookie = bookmarks.join('&')
  setCookie(bookmarkCname, cookie)
}

const doesBookmarkExist = id =>
  getCookie(bookmarkCname)
    .split('&')
    .filter(el => el !== '')
    .includes(id)

const toggleBookmark = id => console.log('toggle', id) ||
  doesBookmarkExist(id)
  ? removeBookmark(id)
  : addBookmark(id)


export { setCookie, getCookie, addBookmark, removeBookmark, doesBookmarkExist, refreshCookie, toggleBookmark }
