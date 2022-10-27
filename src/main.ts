import type { App } from 'vue'
import { createApp } from 'vue'
import './qiankun'
import type { Router, RouterHistory } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router'
import AppVue from './App.vue'

let app: App | null = null
let router: Router | null = null
let history: RouterHistory | null = null

declare const window: {
  __POWERED_BY_QIANKUN__: boolean
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string
}

/* 修改渲染函数 */
function render(props: any = {}) {
  const { container, routerBase } = props
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? routerBase : '/')
  router = createRouter({ history, routes })

  app = createApp(AppVue)
  app.use(router)
  app.mount(container ? container.querySelector('#app') : '#app')
}

/* 非qiankun模式 独立启动运行子应用 */
if (!window.__POWERED_BY_QIANKUN__)
  render({ container: '', routerBase: '/' })

/* 子应用启动成功钩子 */
export async function bootstrap(props: any) {
  console.log('[vue] vue app bootstraped', props)
}

/* 挂载子应用钩子 */
export async function mount(props: any) {
  render(props)
}

/* 卸载子应用钩子 */
export async function unmount() {
  app?.unmount()
  router = null
  history?.destroy()
}

