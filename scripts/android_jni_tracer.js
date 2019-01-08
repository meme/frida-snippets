/* global Module, Interceptor */

const TARGET = 'libexample.so'

const off = Module.findBaseAddress(TARGET)

console.log(`${TARGET} @ ${off}`)

Module.enumerateExports(TARGET, {
  onMatch ({ name, address }) {
    if (name !== 'VERS_1.0') {
      Interceptor.attach(address, {
        onEnter (args) {
          var a = name.split('_')
          var suffix = a[a.length - 1]

          switch (suffix) {
            case 'nativeExample':

              break
            case 'anotherExample':

              break
            default:
              console.log(suffix)
              break
          }
        },

        onLeave (ret) { }
      })
    }
  },

  onComplete () { }
})
