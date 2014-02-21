
/**
 * Hydro configuration
 *
 * @param {Hydro} hydro
 */

module.exports = function(hydro) {
  hydro.set({
    suite: 'method',
    timeout: 500,
    plugins: [
      require('hydro-chai'),
      require('hydro-bdd')
    ],
    chai: {
      chai: require('chai'),
      plugins: [ require('chai-spies') ],
      styles: ['should'],
      global: true,
      stack: true
    }
  })
}
