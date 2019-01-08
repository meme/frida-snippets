/* global Java */

const TARGET = 'com.example.Class'

function isClassLoaded () {
  var classes = Java.enumerateLoadedClassesSync()

  let val = null

  classes.forEach((klass) => {
    if (klass === TARGET) {
      val = klass
    }
  })

  return val != null
}

if (Java.available) {
  Java.perform(() => {
    const classLoaded = isClassLoaded()

    if (classLoaded) {
      console.log(`${TARGET} found in heap`)
    } else {
      console.log(`${TARGET} is not loaded (expect failure)`)
    }

    // var e = Java.use('com.example.ExampleClass')
    //
    // console.log(e)

    // PRO TIP, when scratching your head as to what has happened leading up to call:
    // console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
    // Throw an exception and check `logcat` to see the call stack!

    // e.methodExample.implementation = function (argument) {
    //     return this.methodExample(argument)
    // }

    // Enumerate class loaders if class cannot be found in heap
    // var found = false
    // Java.enumerateClassLoaders({
    //   onMatch: function(klass) {
    //     console.log(klass)
    //     if(klass.toString().includes('ExampleModuleLoader')) {
    //       Java.classFactory.loader = klass
    //       found = true
    //     }
    //   },
    //
    //   onComplete: function() {
    //     if(found == false) {
    //       console.log('Class loader not found')
    //     }
    //   }
    // })

    // var LoadedClass = Java.use('com.example.LoadedClass')
    // console.log(LoadedClass)
  })
} else {
  console.log('Java is not available (expect failure)')
}
