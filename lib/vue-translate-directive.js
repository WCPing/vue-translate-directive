var n = {};
const c = {
  childList: !0,
  subtree: !0,
  characterData: !0
}, u = (e) => {
  e.forEach((t) => {
    t.type === "childList" && t.addedNodes && t.addedNodes.length && f(t);
  });
}, f = (e) => {
  i(e.target.childNodes);
}, i = (e) => {
  Array.from(e).forEach(o);
}, o = (e) => {
  e.childNodes && e.childNodes.length ? i(e.childNodes) : (e.nodeType === 3 && N(e.nodeValue) && (e.nodeValue = l(e.nodeValue)), e.nodeType === 1 && h(e));
}, l = (e) => {
  const t = e.trim().split("/");
  return t.length === 1 || JSON.stringify(n) === "{}" ? e : p(t, n);
}, h = (e) => {
  (e.nodeName === "INPUT" || e.nodeName === "TEXTAREA") && Array.from(e.attributes).forEach((t) => {
    t.nodeName === "placeholder" && (t.nodeValue = l(t.nodeValue));
  });
}, N = (e) => e !== "" && e !== null && e !== void 0, p = (e, t) => e.reduce((r, s) => r && r[s] ? r[s] : null, t), v = new MutationObserver(u), y = {
  created(e, t, r, s) {
    t.value && t.value.i18n && (n = Object.assign({}, n, t.value.i18n)), o(e);
    const d = Array.from(document.body.childNodes).filter(
      (a) => a.nodeType === 1 && a.nodeName !== "SCRIPT" && a.id !== "app"
    );
    i(d);
  },
  mounted(e) {
    v.observe(e, c);
  }
}, b = {
  installed: !1,
  install(e, t) {
    this.installed || e.directive("trans", y);
  }
}, m = (e) => l(e);
export {
  b as default,
  m as translateKey
};
