var i18nData = {}

//配置 dom 的哪些改变会触发回调函数
const mutationObserverInitConfig = {
    childList: true,
    subtree: true,
    characterData: true,
}

/* type：变动类型，attributes：特性被修改了，characterData：数据被修改了（文本），childList：添加/删除了子元素*/
const mutationObserCallback = (mutationsList) => {
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
        // 已经翻译过的，避免重复进入翻译
        if (node.vTransed) {
            return
        }
        // 文本节点
        if (node.nodeType === 3 && isNotEmpty(node.nodeValue)) {
            node.nodeValue = checkNodeValue(node)
        }
        // 属性节点，比如input
        if (node.nodeType === 1) {
            handleNodeAttr(node)
        }
        // ...
    }
}

const checkNodeValue = (target) => {
    var isNodeVal = typeof target === 'string'
    var nodeVal = isNodeVal ? target : target.nodeValue

    const nodeArr = nodeVal.trim().split('/')
    if (nodeArr.length === 1) {
        // 没有斜杆，返回原值, 这里对需要保留斜杠显示的做处理
        return nodeVal
    }

    // 如果国际化对象是空的，返回原值
    if (JSON.stringify(i18nData) === '{}') {
        return nodeVal
    }

    var transedVal = getValIn(nodeArr, i18nData)

    if (!isNodeVal && transedVal) {
        setAttr(target)
    }

    return transedVal
}

const handleNodeAttr = (node) => {
    if (node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA') {
        Array.from(node.attributes).forEach((attrItem) => {
            if (attrItem.nodeName === 'placeholder') {
                attrItem.nodeValue = checkNodeValue(attrItem)
            }
        })
    }
}

const isNotEmpty = (val) => {
    return val !== '' && val !== null && val !== undefined
}

// home/menu/account => home.menu.account
const getValIn = (arr, initObj) => {
    return arr.reduce((pre, cur) => {
        return pre && pre[cur] ? pre[cur] : null
    }, initObj)
}

// Add "vTransed" attributes to translated text
const setAttr = (node) => {
    node.vTransed = true
}

const mutionObserver = new MutationObserver(mutationObserCallback)

const vTransDirect = {
    created(el, binding, vnode, prevVnode) {
        // 判断外部有没有传入国际化对象
        if (binding.value && binding.value.i18n) {
            i18nData = Object.assign({}, i18nData, binding.value.i18n)
        }
        // 没有则使用外部的i18n
        handleNode(el)
        // 还需要检测body下除了根节点外的节点变化
        const appSiblingNode = Array.from(document.body.childNodes).filter(
            (node) =>
                node.nodeType === 1 &&
                node.nodeName !== 'SCRIPT' &&
                node.id !== 'app'
        )
        handleNodeLit(appSiblingNode)
    },
    mounted(el) {
        mutionObserver.observe(el, mutationObserverInitConfig)
    },
}

const vueTranslateDirective = {
    installed: false,
    install(app, options) {
        if (this.installed) return
        app.directive('trans', vTransDirect)
    },
}

export default vueTranslateDirective

// 暴露给外部使用，用于手动转换
export const translateKey = (str) => {
    return checkNodeValue(str)
}
