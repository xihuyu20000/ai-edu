页面调用python函数时，
必须使用async和await，并且函数后面使用(),如下：
mounted: async function() {
    // eslint-disable-next-line no-undef
    this.topics = await eel.topics()();
  },