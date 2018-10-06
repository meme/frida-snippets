var TARGET = 'libexample.so'

var off = Module.findBaseAddress(TARGET)

console.log(TARGET + ' @ ' + off)

Module.enumerateExports(TARGET, {
  onMatch: function(match) {
    var name = match.name
    var address = match.address

    if(name !== 'VERS_1.0') {
      Interceptor.attach(address, {
        onEnter: function(args) {
          var a = name.split('_')
          var suffix = a[a.length - 1]

          switch(suffix) {
            case 'nativeExample':

              break;
            case 'anotherExample':

              break;
            default:
              console.log(suffix)
              break;
          }
        },

        onLeave: function(ret) { }
      })
    }
  },

  onComplete: function() { }
})
