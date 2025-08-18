# 前端增加水印

## 几个关键点

1. canvas画图，体积更小更灵活，使用 background-image 可铺满全屏，适配缩放
2. 窗口缩放时水印要展示比例正常
3. 安全性问题，删除后要重新添加水印

```js
class WatermarkManager {
  constructor(text = 'Watermark', options = {}) {
    this.text = text
    this.id = options.id || 'global-watermark-canvas'
    this.observer = null
    this.canvas = null
    this.parent = options.container || document.body
  }

  createCanvasBase64(text) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 300
    canvas.height = 200
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.rotate((-20 * Math.PI) / 180)
    ctx.font = '16px sans-serif'
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 10, canvas.height / 2)
    return canvas.toDataURL('image/png')
  }

  insert() {
    if (document.getElementById(this.id)) return

    const watermarkDiv = document.createElement('div')
    watermarkDiv.id = this.id
    watermarkDiv.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: ${Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)}px;
      height: ${Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)}px;
      z-index: 9999;
      pointer-events: none;
      background-repeat: repeat;
      background-image: url('${this.createCanvasBase64(this.text)}');
    `
    this.canvas = watermarkDiv
    this.parent.appendChild(watermarkDiv)
    this.observe()
  }

  observe() {
    if (this.observer) return
    this.observer = new MutationObserver(() => {
      if (!document.getElementById(this.id)) {
        console.warn('水印被移除，重新插入')
        this.insert()
      }
    })
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  destroy() {
    if (this.canvas) {
      this.canvas.remove()
      this.canvas = null
    }
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  }

  updateText(newText) {
    this.text = newText
    this.destroy()
    this.insert()
  }

  resize() {
    if (this.canvas) {
      this.canvas.style.width = `${Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)}px`
      this.canvas.style.height = `${Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)}px`
    }
  }

  startAutoResize() {
    window.addEventListener('resize', this.resize.bind(this))
    window.addEventListener('scroll', this.resize.bind(this))
  }

  stopAutoResize() {
    window.removeEventListener('resize', this.resize.bind(this))
    window.removeEventListener('scroll', this.resize.bind(this))
  }
}

```