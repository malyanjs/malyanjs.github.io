const { downloadRepo } = require('./dowload_repo')
const { buildDocs } = require('./build_docs')

downloadRepo({
  onSuccess: function () {
    console.log('success...')
    buildDocs()
  }
})