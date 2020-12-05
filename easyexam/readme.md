前端页面可以显示题目，而且有倒计时。接下来就是完善一下提交后的显示页面。



页面调用eel中有返回值的python函数时，
函数必须使用@eel.expose修饰，
页面必须使用async和await，并且函数后面使用(),如下：
mounted: async function() {
    // eslint-disable-next-line no-undef
    this.topics = await eel.topics()();
  },