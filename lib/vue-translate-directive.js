var s = {};
const o = {
  childList: !0,
  subtree: !0,
  characterData: !0
}, c = (e) => {
  e.forEach((t) => {
    t.type === "childList" && t.addedNodes && t.addedNodes.length && d(t);
  });
}, d = (e) => {
  i(e.target.childNodes);
}, i = (e) => {
  Array.from(e).forEach(n);
}, n = (e) => {
  e.childNodes && e.childNodes.length ? i(e.childNodes) : (e.nodeType === 3 && (e.nodeValue = l(e.nodeValue)), e.nodeType === 1 && u(e));
}, l = (e) => {
  if (!e)
    return e;
  const t = e.trim().split("/");
  return t.length === 1 || JSON.stringify(s) === "{}" ? e : h(t, s);
}, u = (e) => {
  (e.nodeName === "INPUT" || e.nodeName === "TEXTAREA") && Array.from(e.attributes).forEach((t) => {
    t.nodeName === "placeholder" && (t.nodeValue = l(t.nodeValue));
  });
}, h = (e, t) => e.reduce((r, a) => r && r[a] ? r[a] : null, t), f = new MutationObserver(c), N = {
  created(e, t, r, a) {
    t.value && t.value.i18n && (s = Object.assign({}, s, t.value.i18n)), n(e);
  },
  mounted(e) {
    f.observe(e, o);
  }
}, v = {
  installed: !1,
  install(e, t) {
    this.installed || e.directive("trans", N);
  }
};
export {
  v as default
};
