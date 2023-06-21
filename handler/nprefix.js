const Josh = require('@joshdb/core')
const JSON = require('@joshdb/json')


const np = new Josh({
  name: 'np',
  provider: JSON,
  providerOptions: {
    dataDir : "./josh-data/np"
  }
})

module.exports = { np }