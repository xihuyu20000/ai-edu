页面调用eel中有返回值的python函数时，
函数必须使用@eel.expose修饰，
页面必须使用async和await，并且函数后面使用(),如下：
mounted: async function() {
    // eslint-disable-next-line no-undef
    this.topics = await eel.topics()();
  },