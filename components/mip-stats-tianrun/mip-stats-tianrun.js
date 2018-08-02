/**
 * @file mip-stats-tianrun.js 天润统计组件
 * @author wangqizheng
 */

let { CustomElement, util } = MIP

export default class MipStatsTianrun extends CustomElement {
  constructor (...args) {
    // 继承父类属性、方法
    super(...args)

    // 获取参数
    this.sub = this.element.getAttribute('sub') || 'cl2'
    this.z = this.element.getAttribute('z') || '26'
  }

  connectedCallback () {
    let {sub, z, element} = this

    // 元素需要隐藏
    util.css(element, 'display', 'none')

    // 插入统计脚本
    let insertScript = new Promise((resolve, reject) => {
      let statsScript = document.createElement('script')
      statsScript.type = 'text/javascript'
      statsScript.src = `//${sub}.webterren.com/webdig.js?z=${z}`

      // 脚本加载成功
      statsScript.onload = () => {
        resolve()
      }

      // 脚本加载失败
      statsScript.onerror = () => {
        reject(new Error('天润统计脚本加载失败'))
      }

      element.appendChild(statsScript)
    })

    // 插入天润统计标识
    insertScript.then(() => {
      let trackerScript = document.createElement('script')
      trackerScript.type = 'text/javascript'
      trackerScript.innerHTML = 'wd_paramtracker("_wdxid=000000000000000000000000000000000000000000");'
      element.appendChild(trackerScript)
    }).catch(e => {
      console.log(e)
    })
  }
}
