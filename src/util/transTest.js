import i18nEn from '@/i18n/en/i18n.json'
import i18nZH from '@/i18n/zh/i18n.json'

var i18n = {}

//配置 dom 的哪些改变会触发回调函数
const mutationObserverInitConfig = {
    childList: true,
    subtree: true,
    characterData: true,
}

/* type：变动类型，attributes：特性被修改了，characterData：数据被修改了（文本），childList：添加/删除了子元素*/
const obserCallback = (mutationsList) => {
    console.log(mutationsList)

    mutationsList.forEach((mutationRecord) => {
        // 针对addedNodes测试
        if (
            mutationRecord.type === 'childList' &&
            mutationRecord.addedNodes &&
            mutationRecord.addedNodes.length
        ) {
            handleChildList(mutationRecord)
        }
    })
}

// Element（元素）节点：1, Attribute（属性）节点：2, Text（文本）节点：3, Comment（注释）节点：8
const handleChildList = (mutationRecord) => {
    handleNodeLit(mutationRecord.target.childNodes)
}

const handleNodeLit = (nodeLise) => {
    Array.from(nodeLise).forEach(handleNode)
}

const handleNode = (node) => {
    if (node.childNodes && node.childNodes.length) {
        handleNodeLit(node.childNodes)
    } else {
        // 文本节点
        if (node.nodeType === 3) {
            node.nodeValue = checkNodeValue(node.nodeValue)
        }
        // 属性节点，比如input
        if (node.nodeType === 1) {
            handleNodeAttr(node)
        }
    }
}

const checkNodeValue = (nodeVal) => {
    if (!nodeVal) {
        return nodeVal
    }
    const nodeArr = nodeVal.trim().split('/')
    if (nodeArr.length === 1) {
        // 没有斜杆，返回原值, 这里对需要保留斜杠显示的做处理
        return nodeVal
    }

    // 如果国际化对象是空的，返回原值
    if (JSON.stringify(i18n) === '{}') {
        return nodeVal
    }

    return getValIn(nodeArr, i18n)
}

const handleNodeAttr = (node) => {
    if (node.nodeName === 'INPUT') {
        Array.from(node.attributes).forEach((attrItem) => {
            if (attrItem.nodeName === 'placeholder') {
                attrItem.nodeValue = checkNodeValue(attrItem.nodeValue)
            }
        })
    }
}

// home/menu/account => home.menu.account
const getValIn = (arr, initObj) => {
    return arr.reduce((pre, cur) => {
        return pre && pre[cur] ? pre[cur] : null
    }, initObj)
}

const mutionObserver = new MutationObserver(obserCallback)

// 根据语言
// const curLang = window.sessionStorage.getItem('currentLang') || 'zh'
// if (binding.value && binding.value.key) {
//     console.log(binding.value.key);
// }
// import(`@/i18n/${curLang}/i18n.json`).then((data) => {
//     console.log(data)
//     i18nEn = data
// })

const vSampleTrans = {
    created(el, binding, vnode, prevVnode) {
        // 判断外部有没有传入国际化对象
        if (binding.value && binding.value.i18n) {
            i18n = binding.value.i18n
            handleNode(el)
        } else {
            // 没有则取srci18n/zh/i18n下的文件
            const curLang = window.sessionStorage.getItem('currentLang') || 'zh'
            i18n = curLang === 'zh' ? i18nZH : i18nEn
            handleNode(el)
        }
    },
    mounted(el) {
        mutionObserver.observe(el, mutationObserverInitConfig)
    },
}

const vueSampleDirectTranslate = {
    installed: false,
    install(app, options) {
        if (this.installed) return
        app.directive('trans', vSampleTrans)
    },
}

export default vueSampleDirectTranslate
