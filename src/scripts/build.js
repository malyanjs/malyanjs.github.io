
const { downloadRepo } = require('./dowload_repo')
const { buildDocs, removeTemp } = require('./build_docs')
const { buildExamples } = require('./build_examples')
downloadRepo({
  onSuccess: function () {
    buildDocs()
    buildExamples()
    removeTemp()
  }
})