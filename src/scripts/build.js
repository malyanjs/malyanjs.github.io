const path = require('path')
const fs = require('fs')
const { downloadRepo } = require('./dowload_repo')
const { buildDocs, removeTemp } = require('./build_docs')

downloadRepo({
  onSuccess: function () {
    buildDocs()
    removeTemp()
  }
})