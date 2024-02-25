var a = {};
const u = {
  childList: !0,
  subtree: !0,
  characterData: !0
}, f = (e) => {
  e.forEach((t) => {
    t.type === "childList" && t.addedNodes && t.addedNodes.length && h(t);
  });
}, h = (e) => {
  o(e.target.childNodes);
}, o = (e) => {
  Array.from(e).forEach(c);
}, c = (e) => {
  if (e.childNodes && e.childNodes.length)
    o(e.childNodes);
  else {
    if (e.vTransed)
      return;
    e.nodeType === 3 && v(e.nodeValue) && (e.nodeValue = l(e)), e.nodeType === 1 && N(e);
  }
}, l = (e) => {
  var t = typeof e == "string", r = t ? e : e.nodeValue;
  const n = r.trim().split("/");
  if (n.length === 1 || JSON.stringify(a) === "{}")
    return r;
  var s = p(n, a);
  return !t && s && y(e), s;
}, N = (e) => {
  (e.nodeName === "INPUT" || e.nodeName === "TEXTAREA") && Array.from(e.attributes).forEach((t) => {
    t.nodeName === "placeholder" && (t.nodeValue = l(t));
  });
}, v = (e) => e !== "" && e !== null && e !== void 0, p = (e, t) => e.reduce((r, n) => r && r[n] ? r[n] : null, t), y = (e) => {
  e.vTransed = !0;
}, d = new MutationObserver(f), T = {
  created(e, t, r, n) {
    t.value && t.value.i18n && (a = Object.assign({}, a, t.value.i18n)), c(e);
    const s = Array.from(document.body.childNodes).filter(
      (i) => i.nodeType === 1 && i.nodeName !== "SCRIPT" && i.id !== "app"
    );
    o(s);
  },
  mounted(e) {
    d.observe(e, u);
  },
  beforeUnmount() {
    d.disconnect();
  }
}, b = {
  installed: !1,
  install(e, t) {
    this.installed || e.directive("trans", T);
  }
}, m = (e) => l(e);
export {
  b as default,
  m as translateKey
};
