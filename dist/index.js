import { inject as xe, defineComponent as ie, openBlock as g, createElementBlock as M, createBlock as Y, unref as b, toDisplayString as B, ref as L, watch as Oe, computed as q, reactive as ce, resolveDirective as nt, Fragment as ue, createElementVNode as S, createVNode as K, withDirectives as Pe, withCtx as J, createCommentVNode as O, renderList as de, normalizeStyle as Fe, createTextVNode as We, renderSlot as Z, normalizeClass as Ne, isRef as Dt, withModifiers as Ct, createSlots as Be, normalizeProps as qe, guardReactiveProps as He, onMounted as xt } from "vue";
import lt from "primevue/datatable";
import Ve from "primevue/column";
import ae from "primevue/button";
import ye from "primevue/inputtext";
import rt from "primevue/iconfield";
import st from "primevue/inputicon";
import it from "primevue/tag";
import Se from "dayjs";
import ut from "primevue/dialog";
import Xe from "primevue/inputnumber";
import St from "primevue/textarea";
import Et from "primevue/select";
import dt from "primevue/autocomplete";
import Qe from "primevue/datepicker";
import Pt from "primevue/toggleswitch";
import Vt from "primevue/colorpicker";
import Mt from "primevue/password";
import { useToast as At } from "primevue/usetoast";
import { useConfirm as Ft } from "primevue/useconfirm";
const ze = Symbol("w-axios"), je = Symbol("w-config");
function Yt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ie = { exports: {} }, Tt = Ie.exports, Ge;
function Rt() {
  return Ge || (Ge = 1, (function(e, t) {
    (function(a, n) {
      e.exports = n();
    })(Tt, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, n = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, r = /\d/, s = /\d\d/, d = /\d\d?/, h = /\d*[^-_:/,()\s\d]+/, f = {}, w = function(l) {
        return (l = +l) + (l > 68 ? 1900 : 2e3);
      }, E = function(l) {
        return function(m) {
          this[l] = +m;
        };
      }, N = [/[+-]\d\d:?(\d\d)?|Z/, function(l) {
        (this.zone || (this.zone = {})).offset = (function(m) {
          if (!m || m === "Z") return 0;
          var C = m.match(/([+-]|\d\d)/g), i = 60 * C[1] + (+C[2] || 0);
          return i === 0 ? 0 : C[0] === "+" ? -i : i;
        })(l);
      }], j = function(l) {
        var m = f[l];
        return m && (m.indexOf ? m : m.s.concat(m.f));
      }, V = function(l, m) {
        var C, i = f.meridiem;
        if (i) {
          for (var k = 1; k <= 24; k += 1) if (l.indexOf(i(k, 0, m)) > -1) {
            C = k > 12;
            break;
          }
        } else C = l === (m ? "pm" : "PM");
        return C;
      }, R = { A: [h, function(l) {
        this.afternoon = V(l, !1);
      }], a: [h, function(l) {
        this.afternoon = V(l, !0);
      }], Q: [r, function(l) {
        this.month = 3 * (l - 1) + 1;
      }], S: [r, function(l) {
        this.milliseconds = 100 * +l;
      }], SS: [s, function(l) {
        this.milliseconds = 10 * +l;
      }], SSS: [/\d{3}/, function(l) {
        this.milliseconds = +l;
      }], s: [d, E("seconds")], ss: [d, E("seconds")], m: [d, E("minutes")], mm: [d, E("minutes")], H: [d, E("hours")], h: [d, E("hours")], HH: [d, E("hours")], hh: [d, E("hours")], D: [d, E("day")], DD: [s, E("day")], Do: [h, function(l) {
        var m = f.ordinal, C = l.match(/\d+/);
        if (this.day = C[0], m) for (var i = 1; i <= 31; i += 1) m(i).replace(/\[|\]/g, "") === l && (this.day = i);
      }], w: [d, E("week")], ww: [s, E("week")], M: [d, E("month")], MM: [s, E("month")], MMM: [h, function(l) {
        var m = j("months"), C = (j("monthsShort") || m.map((function(i) {
          return i.slice(0, 3);
        }))).indexOf(l) + 1;
        if (C < 1) throw new Error();
        this.month = C % 12 || C;
      }], MMMM: [h, function(l) {
        var m = j("months").indexOf(l) + 1;
        if (m < 1) throw new Error();
        this.month = m % 12 || m;
      }], Y: [/[+-]?\d+/, E("year")], YY: [s, function(l) {
        this.year = w(l);
      }], YYYY: [/\d{4}/, E("year")], Z: N, ZZ: N };
      function z(l) {
        var m, C;
        m = l, C = f && f.formats;
        for (var i = (l = m.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(o, c, x) {
          var F = x && x.toUpperCase();
          return c || C[x] || a[x] || C[F].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(_, G, Q) {
            return G || Q.slice(1);
          }));
        }))).match(n), k = i.length, A = 0; A < k; A += 1) {
          var X = i[A], T = R[X], u = T && T[0], $ = T && T[1];
          i[A] = $ ? { regex: u, parser: $ } : X.replace(/^\[|\]$/g, "");
        }
        return function(o) {
          for (var c = {}, x = 0, F = 0; x < k; x += 1) {
            var _ = i[x];
            if (typeof _ == "string") F += _.length;
            else {
              var G = _.regex, Q = _.parser, fe = o.slice(F), ee = G.exec(fe)[0];
              Q.call(c, ee), o = o.replace(ee, "");
            }
          }
          return (function(ne) {
            var te = ne.afternoon;
            if (te !== void 0) {
              var H = ne.hours;
              te ? H < 12 && (ne.hours += 12) : H === 12 && (ne.hours = 0), delete ne.afternoon;
            }
          })(c), c;
        };
      }
      return function(l, m, C) {
        C.p.customParseFormat = !0, l && l.parseTwoDigitYear && (w = l.parseTwoDigitYear);
        var i = m.prototype, k = i.parse;
        i.parse = function(A) {
          var X = A.date, T = A.utc, u = A.args;
          this.$u = T;
          var $ = u[1];
          if (typeof $ == "string") {
            var o = u[2] === !0, c = u[3] === !0, x = o || c, F = u[2];
            c && (F = u[2]), f = this.$locale(), !o && F && (f = C.Ls[F]), this.$d = (function(fe, ee, ne, te) {
              try {
                if (["x", "X"].indexOf(ee) > -1) return new Date((ee === "X" ? 1e3 : 1) * fe);
                var H = z(ee)(fe), we = H.year, me = H.month, Ee = H.day, Me = H.hours, le = H.minutes, ke = H.seconds, re = H.milliseconds, oe = H.zone, pe = H.week, ve = /* @__PURE__ */ new Date(), $e = Ee || (we || me ? 1 : ve.getDate()), De = we || ve.getFullYear(), ge = 0;
                we && !me || (ge = me > 0 ? me - 1 : ve.getMonth());
                var he, Ce = Me || 0, y = le || 0, P = ke || 0, p = re || 0;
                return oe ? new Date(Date.UTC(De, ge, $e, Ce, y, P, p + 60 * oe.offset * 1e3)) : ne ? new Date(Date.UTC(De, ge, $e, Ce, y, P, p)) : (he = new Date(De, ge, $e, Ce, y, P, p), pe && (he = te(he).week(pe).toDate()), he);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(X, $, T, C), this.init(), F && F !== !0 && (this.$L = this.locale(F).$L), x && X != this.format($) && (this.$d = /* @__PURE__ */ new Date("")), f = {};
          } else if ($ instanceof Array) for (var _ = $.length, G = 1; G <= _; G += 1) {
            u[1] = $[G - 1];
            var Q = C.apply(this, u);
            if (Q.isValid()) {
              this.$d = Q.$d, this.$L = Q.$L, this.init();
              break;
            }
            G === _ && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else k.call(this, A);
        };
      };
    }));
  })(Ie)), Ie.exports;
}
var It = Rt();
const Lt = /* @__PURE__ */ Yt(It);
Se.extend(Lt);
function ct(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const t = Se(e, "YYYY-MM-DD", !0);
  return t.isValid() ? t.toDate() : Se(e).toDate();
}
function ft(e) {
  return e ? typeof e == "string" ? e : Se(e).format("YYYY-MM-DD") : null;
}
function mt(e) {
  return e ? typeof e == "string" ? e : Se(e).toISOString() : null;
}
function Nt(e, t = "DD/MM/YYYY") {
  return e ? Se(e).format(t) : "—";
}
function zt(e) {
  return e ? Se(e).format("DD/MM/YYYY HH:mm") : "—";
}
function be(e) {
  return e.replace(/\D/g, "");
}
function pt(e) {
  if (!e) return "—";
  const t = be(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function vt(e) {
  if (!e) return "—";
  const t = be(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function jt(e) {
  if (!e) return "—";
  const t = be(e);
  return t.length === 11 ? pt(e) : t.length === 14 ? vt(e) : e;
}
function Ut(e) {
  if (!e) return "—";
  const t = be(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function gt(e) {
  if (!e) return null;
  const t = be(e);
  if (t.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(t)) return "CPF inválido.";
  let a = 0;
  for (let d = 0; d < 9; d++) a += parseInt(t[d]) * (10 - d);
  let n = a % 11;
  const r = n < 2 ? 0 : 11 - n;
  if (parseInt(t[9]) !== r) return "CPF inválido.";
  a = 0;
  for (let d = 0; d < 10; d++) a += parseInt(t[d]) * (11 - d);
  n = a % 11;
  const s = n < 2 ? 0 : 11 - n;
  return parseInt(t[10]) !== s ? "CPF inválido." : null;
}
function ht(e) {
  if (!e) return null;
  const t = be(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let n = 0;
  for (let f = 0; f < 12; f++) n += parseInt(t[f]) * a[f];
  let r = n % 11;
  const s = r < 2 ? 0 : 11 - r;
  if (parseInt(t[12]) !== s) return "CNPJ inválido.";
  const d = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  n = 0;
  for (let f = 0; f < 13; f++) n += parseInt(t[f]) * d[f];
  r = n % 11;
  const h = r < 2 ? 0 : 11 - r;
  return parseInt(t[13]) !== h ? "CNPJ inválido." : null;
}
function Ot(e) {
  if (!e) return null;
  const t = be(e);
  return t.length === 11 ? gt(e) : t.length === 14 ? ht(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const Le = /* @__PURE__ */ new Map();
function _e(e, t) {
  const a = `${e}-${t}`;
  let n = Le.get(a);
  return n || (n = new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }), Le.set(a, n)), n;
}
function Wt(e, t) {
  const a = `${e}-${t}`;
  let n = Le.get(a);
  return n || (n = new Intl.NumberFormat(e, {
    style: "currency",
    currency: t
  }), Le.set(a, n)), n;
}
function Ke() {
  const e = xe(je, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), t = (e == null ? void 0 : e.locale) ?? "pt-BR", a = (e == null ? void 0 : e.currency) ?? "BRL";
  function n(f) {
    return f == null ? "—" : Wt(t, a).format(f);
  }
  function r(f, w = 2) {
    return f == null ? "—" : _e(t, w).format(f);
  }
  function s(f, w) {
    return Nt(f, w ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function d(f) {
    return zt(f);
  }
  function h(f) {
    return f == null ? "—" : `${_e(t, 2).format(f)}%`;
  }
  return {
    formatCurrency: n,
    formatNumber: r,
    formatDate: s,
    formatDateTime: d,
    formatPercent: h,
    formatCpf: pt,
    formatCnpj: vt,
    formatCpfCnpj: jt,
    formatTelefone: Ut,
    validateCpf: gt,
    validateCnpj: ht,
    validateCpfCnpj: Ot,
    parseDate: ct,
    toDateString: ft,
    toDateTimeString: mt
  };
}
const Bt = {
  key: 0,
  class: "text-muted-color text-xs"
}, qt = ["src", "alt"], Ht = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, Kt = {
  key: 4,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, Zt = {
  key: 5,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, Jt = {
  key: 6,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, Xt = {
  key: 7,
  class: "text-[0.8125rem]"
}, Ze = /* @__PURE__ */ ie({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: n, formatNumber: r } = Ke();
    return (s, d) => e.value == null ? (g(), M("span", Bt, "—")) : e.column.type === "image" ? (g(), M("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, qt)) : e.column.type === "boolean" ? (g(), Y(b(it), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (g(), M("span", Ht, B(b(t)(e.value)), 1)) : e.column.type === "datetime" ? (g(), M("span", Kt, B(b(a)(e.value)), 1)) : e.column.type === "currency" ? (g(), M("span", Zt, B(b(n)(e.value)), 1)) : e.column.type === "number" ? (g(), M("span", Jt, B(e.column.format ? e.column.format(e.value, e.rowData) : b(r)(e.value, e.column.decimals ?? 0)), 1)) : (g(), M("span", Xt, B(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var Qt = Object.defineProperty, Gt = (e, t, a) => t in e ? Qt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, Ye = (e, t, a) => Gt(e, typeof t != "symbol" ? t + "" : t, a);
const et = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, tt = (e, t, a) => e.replaceAll(t, "").replace(a, ".").replace("..", ".").replace(/[^.\d]/g, ""), at = (e, t, a) => {
  var n;
  return new Intl.NumberFormat(((n = a.number) == null ? void 0 : n.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
}, _t = (e, t = !0, a) => {
  var n, r, s, d;
  const h = ((n = a.number) == null ? void 0 : n.unsigned) !== !0 && e.startsWith("-") ? "-" : "", f = ((r = a.number) == null ? void 0 : r.fraction) ?? 0;
  let w = at(0, f, a);
  const E = w.formatToParts(1000.12), N = ((s = E.find((l) => l.type === "group")) == null ? void 0 : s.value) ?? " ", j = ((d = E.find((l) => l.type === "decimal")) == null ? void 0 : d.value) ?? ".", V = tt(e, N, j);
  if (Number.isNaN(parseFloat(V))) return h;
  const R = V.split(".");
  if (R[1] != null && R[1].length >= 1) {
    const l = R[1].length <= f ? R[1].length : f;
    w = at(l, f, a);
  }
  let z = w.format(parseFloat(V));
  return t ? f > 0 && V.endsWith(".") && !V.slice(0, -1).includes(".") && (z += j) : z = tt(z, N, j), h + z;
}, yt = (e) => JSON.parse(e.replaceAll("'", '"')), ea = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = ta(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = Re(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = Re(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = Re(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = aa(e.dataset.maskaTokens));
  const n = {};
  return e.dataset.maskaNumberLocale != null && (n.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (n.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (n.unsigned = Re(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(n).length > 0) && (a.number = n), a;
}, Re = (e) => e !== "" ? !!JSON.parse(e) : !0, ta = (e) => e.startsWith("[") && e.endsWith("]") ? yt(e) : e, aa = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return yt(e);
  const t = {};
  return e.split("|").forEach((a) => {
    const n = a.split(":");
    t[n[0]] = {
      pattern: bt() ? new RegExp(n[1], "u") : new RegExp(n[1]),
      optional: n[2] === "optional",
      multiple: n[2] === "multiple",
      repeated: n[2] === "repeated"
    };
  }), t;
}, bt = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class oa {
  constructor(t = {}) {
    Ye(this, "opts", {}), Ye(this, "memo", /* @__PURE__ */ new Map());
    const a = { ...t };
    if (a.tokens != null) {
      a.tokens = a.tokensReplace ? { ...a.tokens } : { ...et, ...a.tokens };
      for (const n of Object.values(a.tokens))
        typeof n.pattern == "string" && (n.pattern = bt() ? new RegExp(n.pattern, "u") : new RegExp(n.pattern));
    } else
      a.tokens = et;
    Array.isArray(a.mask) && (a.mask.length > 1 ? a.mask = [...a.mask].sort((n, r) => n.length - r.length) : a.mask = a.mask[0] ?? ""), a.mask === "" && (a.mask = null), this.opts = a;
  }
  masked(t) {
    return this.process(String(t), this.findMask(String(t)));
  }
  unmasked(t) {
    return this.process(String(t), this.findMask(String(t)), !1);
  }
  isEager() {
    return this.opts.eager === !0;
  }
  isReversed() {
    return this.opts.reversed === !0;
  }
  completed(t) {
    const a = this.findMask(String(t));
    if (this.opts.mask == null || a == null) return !1;
    const n = this.process(String(t), a).length;
    return typeof this.opts.mask == "string" ? n >= this.opts.mask.length : n >= a.length;
  }
  findMask(t) {
    const a = this.opts.mask;
    if (a == null)
      return null;
    if (typeof a == "string")
      return a;
    if (typeof a == "function")
      return a(t);
    const n = this.process(t, a.slice(-1).pop() ?? "", !1);
    return a.find((r) => this.process(t, r, !1).length >= n.length) ?? "";
  }
  escapeMask(t) {
    const a = [], n = [];
    return t.split("").forEach((r, s) => {
      r === "!" && t[s - 1] !== "!" ? n.push(s - n.length) : a.push(r);
    }), { mask: a.join(""), escaped: n };
  }
  process(t, a, n = !0) {
    if (this.opts.number != null) return _t(t, n, this.opts);
    if (a == null) return t;
    const r = `v=${t},mr=${a},m=${n ? 1 : 0}`;
    if (this.memo.has(r)) return this.memo.get(r);
    const { mask: s, escaped: d } = this.escapeMask(a), h = [], f = this.opts.tokens != null ? this.opts.tokens : {}, w = this.isReversed() ? -1 : 1, E = this.isReversed() ? "unshift" : "push", N = this.isReversed() ? 0 : s.length - 1, j = this.isReversed() ? () => l > -1 && m > -1 : () => l < s.length && m < t.length, V = (i) => !this.isReversed() && i <= N || this.isReversed() && i >= N;
    let R, z = -1, l = this.isReversed() ? s.length - 1 : 0, m = this.isReversed() ? t.length - 1 : 0, C = !1;
    for (; j(); ) {
      const i = s.charAt(l), k = f[i], A = (k == null ? void 0 : k.transform) != null ? k.transform(t.charAt(m)) : t.charAt(m);
      if (!d.includes(l) && k != null ? (A.match(k.pattern) != null ? (h[E](A), k.repeated ? (z === -1 ? z = l : l === N && l !== z && (l = z - w), N === z && (l -= w)) : k.multiple && (C = !0, l -= w), l += w) : k.multiple ? C && (l += w, m -= w, C = !1) : A === R ? R = void 0 : k.optional && (l += w, m -= w), m += w) : (n && !this.isEager() && h[E](i), A === i && !this.isEager() ? m += w : R = i, this.isEager() || (l += w)), this.isEager())
        for (; V(l) && (f[s.charAt(l)] == null || d.includes(l)); ) {
          if (n) {
            if (h[E](s.charAt(l)), t.charAt(m) === s.charAt(l)) {
              l += w, m += w;
              continue;
            }
          } else s.charAt(l) === t.charAt(m) && (m += w);
          l += w;
        }
    }
    return this.memo.set(r, h.join("")), this.memo.get(r);
  }
}
class na {
  constructor(t, a = {}) {
    Ye(this, "items", /* @__PURE__ */ new Map()), Ye(this, "eventAbortController"), Ye(this, "onInput", (n) => {
      if (n instanceof CustomEvent && n.type === "input" && !n.isTrusted && !n.bubbles)
        return;
      const r = n.target, s = this.items.get(r);
      if (s === void 0) return;
      const d = "inputType" in n && n.inputType.startsWith("delete"), h = s.isEager(), f = d && h && s.unmasked(r.value) === "" ? "" : r.value;
      this.fixCursor(r, d, () => this.setValue(r, f));
    }), this.options = a, this.eventAbortController = new AbortController(), this.init(this.getInputs(t));
  }
  update(t = {}) {
    this.options = { ...t }, this.init(Array.from(this.items.keys()));
  }
  updateValue(t) {
    var a;
    t.value !== "" && t.value !== ((a = this.processInput(t)) == null ? void 0 : a.masked) && this.setValue(t, t.value);
  }
  destroy() {
    this.eventAbortController.abort(), this.items.clear();
  }
  init(t) {
    const a = this.getOptions(this.options);
    for (const n of t) {
      if (!this.items.has(n)) {
        const { signal: s } = this.eventAbortController;
        n.addEventListener("input", this.onInput, { capture: !0, signal: s });
      }
      const r = new oa(ea(n, a));
      this.items.set(n, r), queueMicrotask(() => this.updateValue(n)), n.selectionStart === null && r.isEager() && console.warn("Maska: input of `%s` type is not supported", n.type);
    }
  }
  getInputs(t) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t];
  }
  getOptions(t) {
    const { onMaska: a, preProcess: n, postProcess: r, ...s } = t;
    return s;
  }
  fixCursor(t, a, n) {
    var r, s;
    const d = t.selectionStart, h = t.value;
    if (n(), d === null || d === h.length && !a) return;
    const f = t.value, w = h.slice(0, d), E = f.slice(0, d), N = (r = this.processInput(t, w)) == null ? void 0 : r.unmasked, j = (s = this.processInput(t, E)) == null ? void 0 : s.unmasked;
    if (N === void 0 || j === void 0) return;
    let V = d;
    w !== E && (V += a ? f.length - h.length : N.length - j.length), t.setSelectionRange(V, V);
  }
  setValue(t, a) {
    const n = this.processInput(t, a);
    n !== void 0 && (t.value = n.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((r) => r(n)) : this.options.onMaska(n)), t.dispatchEvent(new CustomEvent("maska", { detail: n })), t.dispatchEvent(new CustomEvent("input", { detail: n.masked })));
  }
  processInput(t, a) {
    const n = this.items.get(t);
    if (n === void 0) return;
    let r = a ?? t.value;
    this.options.preProcess != null && (r = this.options.preProcess(r));
    let s = n.masked(r);
    return this.options.postProcess != null && (s = this.options.postProcess(s)), {
      masked: s,
      unmasked: n.unmasked(r),
      completed: n.completed(r)
    };
  }
}
const Ue = /* @__PURE__ */ new WeakMap(), la = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, ot = (e, t) => {
  var a;
  const n = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (n == null || (n == null ? void 0 : n.type) === "file") return;
  let r = {};
  if (t.value != null && (r = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const s = (d) => {
      const h = t.modifiers.unmasked ? d.unmasked : t.modifiers.completed ? d.completed : d.masked;
      la(t, h);
    };
    r.onMaska = r.onMaska == null ? s : Array.isArray(r.onMaska) ? [...r.onMaska, s] : [r.onMaska, s];
  }
  Ue.has(n) ? (a = Ue.get(n)) == null || a.update(r) : Ue.set(n, new na(n, r));
}, ra = {
  string: "text",
  integer: "number",
  decimal: "number",
  float: "number",
  boolean: "switch",
  choice: "select",
  fk: "fk",
  date: "date",
  datetime: "datetime",
  email: "email",
  url: "text",
  slug: "text",
  text: "textarea"
};
function sa(e) {
  var n;
  const t = ra[e.type] ?? "text", a = {
    field: e.name,
    label: e.label,
    type: t,
    required: e.required ?? !1
  };
  return (e.type === "decimal" || e.type === "float") && (a.minFractionDigits = 2, a.maxFractionDigits = 2), e.type === "boolean" && (a.defaultValue = !1), e.type === "choice" && ((n = e.choices) != null && n.length) && (a.options = e.choices.map((r) => ({
    label: r.label,
    value: r.value
  }))), e.type === "fk" && (a.endpoint = e.endpoint, e.option_label && (a.optionLabel = e.option_label), e.option_value && (a.optionValue = e.option_value)), a;
}
function ia(e) {
  return e.filter((t) => !t.read_only && t.name !== "id").map(sa);
}
const ua = {
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
  decimal: "number",
  float: "number",
  integer: "number"
};
function da(e) {
  return {
    field: e.type === "fk" ? `${e.name}_nome` : e.name,
    header: e.label,
    type: ua[e.type],
    sortable: !0
  };
}
function ca(e, t = 6) {
  return e.filter((a) => !a.read_only && a.name !== "id").slice(0, t).map(da);
}
function wt() {
  const e = At();
  function t(s, d = "Sucesso") {
    e.add({ severity: "success", summary: d, detail: s, life: 3e3 });
  }
  function a(s, d = "Erro") {
    e.add({ severity: "error", summary: d, detail: s, life: 5e3 });
  }
  function n(s, d = "Atenção") {
    e.add({ severity: "warn", summary: d, detail: s, life: 4e3 });
  }
  function r(s, d = "Info") {
    e.add({ severity: "info", summary: d, detail: s, life: 3e3 });
  }
  return { success: t, error: a, warn: n, info: r };
}
function kt() {
  const e = Ft();
  function t(n, r = "Deseja realmente excluir este registro?") {
    e.require({
      message: r,
      header: "Confirmar Exclusão",
      icon: "pi pi-trash",
      rejectLabel: "Cancelar",
      rejectProps: {
        severity: "secondary",
        text: !0
      },
      acceptLabel: "Excluir",
      acceptProps: {
        severity: "danger"
      },
      accept: n
    });
  }
  function a(n, r, s = "Confirmação") {
    e.require({
      message: n,
      header: s,
      icon: "pi pi-question-circle",
      rejectLabel: "Cancelar",
      rejectProps: {
        severity: "secondary",
        text: !0
      },
      acceptLabel: "Confirmar",
      accept: r
    });
  }
  return { confirmDelete: t, confirmAction: a };
}
function fa(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function ma(e) {
  if (typeof e == "string")
    return e;
  if (Array.isArray(e)) {
    const t = e.filter((a) => typeof a == "string");
    return t.length > 0 ? t.join(" ") : null;
  }
  if (typeof e == "object" && e !== null) {
    const t = e;
    if (Array.isArray(t.non_field_errors) && t.non_field_errors.length > 0)
      return t.non_field_errors.filter((n) => typeof n == "string").join(" ");
    const a = [];
    for (const [n, r] of Object.entries(t)) {
      if (n === "non_field_errors") continue;
      const s = fa(n);
      if (Array.isArray(r)) {
        const d = r.filter((h) => typeof h == "string");
        d.length > 0 && a.push(`${s}: ${d.join(" ")}`);
      } else typeof r == "string" && a.push(`${s}: ${r}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function Te(e, t = "Erro inesperado") {
  var s;
  if (!e || typeof e != "object") return t;
  const a = e, n = (s = a.response) == null ? void 0 : s.data;
  if (!n || typeof n != "object")
    return a.message || t;
  const r = n.detail ?? n;
  return ma(r) || t;
}
function Wo() {
  return { extractApiError: Te };
}
const pa = { class: "w-autocompletefk" }, va = ["disabled"], ga = { class: "w-autocompletefk-toolbar" }, ha = { class: "w-autocompletefk-toolbar-actions" }, ya = { class: "flex items-center justify-end gap-1" }, ba = { class: "w-autocompletefk-footer" }, $t = /* @__PURE__ */ ie({
  __name: "WAutoCompleteFK",
  props: {
    modelValue: {},
    endpoint: {},
    optionLabel: { default: "nome" },
    optionValue: { default: "id" },
    placeholder: { default: "Buscar..." },
    disabled: { type: Boolean, default: !1 },
    showClear: { type: Boolean, default: !0 },
    forceSelection: { type: Boolean, default: !0 },
    columns: {},
    minLength: { default: 0 },
    dialogHeader: {},
    canCreate: { type: Boolean, default: void 0 },
    canEdit: { type: Boolean, default: void 0 },
    canDelete: { type: Boolean, default: void 0 },
    crudFields: {},
    crudColumns: {},
    dialogWidth: { default: "480px" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, r = xe(ze);
    if (!r)
      throw new Error("[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin.");
    const s = r, d = wt(), { confirmDelete: h } = kt(), f = L(null), w = L([]), E = L(!1);
    let N = null;
    async function j(p) {
      try {
        const v = await s.get(`${a.endpoint}${p}/`);
        f.value = v.data;
      } catch {
        f.value = null;
      }
    }
    async function V(p) {
      E.value = !0;
      try {
        const v = { page_size: 20 };
        p && (v.search = p);
        const D = (await s.get(a.endpoint, { params: v })).data;
        w.value = D.data ?? D.results ?? D;
      } catch {
        w.value = [];
      } finally {
        E.value = !1;
      }
    }
    function R(p) {
      const v = p.query || "";
      if (v.length < a.minLength) {
        w.value = [];
        return;
      }
      N && clearTimeout(N), N = setTimeout(() => V(v), 300);
    }
    function z(p) {
      f.value = p.value, n("update:modelValue", p.value);
    }
    function l() {
      f.value = null, n("update:modelValue", null);
    }
    Oe(
      () => a.modelValue,
      async (p) => {
        if (p != null) {
          if (typeof p == "object" && p !== null && a.optionLabel in p) {
            f.value = p;
            return;
          }
          (!f.value || f.value[a.optionValue] !== p) && await j(p);
        } else
          f.value = null;
      },
      { immediate: !0 }
    );
    const m = L(!1), C = L([]), i = L(!1), k = L(""), A = L(1), X = L(15), T = L(0), u = L(null), $ = L(null), o = L(0);
    let c = null;
    const x = L([]), F = q(() => {
      var p;
      return (p = a.crudFields) != null && p.length ? !0 : x.value.length > 0;
    }), _ = q(() => a.canCreate ?? F.value), G = q(() => a.canEdit ?? F.value), Q = q(() => a.canDelete ?? F.value), fe = q(() => G.value || Q.value), ee = q(() => {
      var p;
      return (p = a.crudFields) != null && p.length ? a.crudFields : ia(x.value);
    }), ne = q(() => {
      var p, v;
      return (p = a.crudColumns) != null && p.length ? a.crudColumns : (v = a.columns) != null && v.length ? a.columns.map((U) => ({
        field: U.field,
        header: U.header,
        sortable: !0
      })) : x.value.length ? ca(x.value) : [{ field: a.optionLabel, header: a.optionLabel, sortable: !0 }];
    });
    async function te() {
      var p, v, U;
      i.value = !0;
      try {
        const D = {
          page: A.value,
          page_size: X.value
        };
        k.value && (D.search = k.value), $.value && o.value !== 0 && (D.ordering = o.value === -1 ? `-${$.value}` : $.value);
        const W = (await s.get(a.endpoint, { params: D })).data;
        C.value = W.data ?? W.results ?? W, T.value = W.count ?? W.rows ?? 0, (p = W.extras) != null && p.fields && !((v = a.columns) != null && v.length) && !((U = a.crudFields) != null && U.length) && (x.value = W.extras.fields);
      } catch {
        C.value = [], T.value = 0;
      } finally {
        i.value = !1;
      }
    }
    function H() {
      a.disabled || (k.value = "", A.value = 1, $.value = null, o.value = 0, u.value = null, m.value = !0, te());
    }
    function we(p) {
      A.value = p.page + 1, X.value = p.rows, te();
    }
    function me(p) {
      $.value = p.sortField ?? null, o.value = p.sortOrder ?? 0, A.value = 1, te();
    }
    function Ee() {
      u.value && (f.value = u.value, n("update:modelValue", u.value), m.value = !1);
    }
    function Me(p) {
      f.value = p.data, n("update:modelValue", p.data), m.value = !1;
    }
    Oe(k, () => {
      c && clearTimeout(c), c = setTimeout(() => {
        A.value = 1, te();
      }, 300);
    });
    const le = L(!1), ke = L(!1), re = L(null), oe = ce({}), pe = q(() => re.value !== null), ve = q(
      () => pe.value ? "Editar Registro" : "Novo Registro"
    );
    function $e() {
      const p = {};
      for (const v of ee.value)
        p[v.field] = v.defaultValue !== void 0 ? typeof v.defaultValue == "function" ? v.defaultValue() : v.defaultValue : null;
      return p;
    }
    function De() {
      const p = $e();
      for (const v of Object.keys(oe))
        delete oe[v];
      for (const [v, U] of Object.entries(p))
        oe[v] = U;
    }
    function ge() {
      re.value = null, De(), le.value = !0;
    }
    function he(p) {
      re.value = p;
      for (const v of ee.value)
        oe[v.field] = p[v.field] !== void 0 ? p[v.field] : null;
      le.value = !0;
    }
    function Ce(p, v) {
      oe[p] = v;
    }
    async function y() {
      ke.value = !0;
      try {
        const p = { ...oe };
        for (const U of ee.value) {
          const D = p[U.field];
          if (U.type === "fk" && D !== null && typeof D == "object") {
            const I = U.optionValue || "id";
            p[U.field] = D[I] ?? D;
          }
        }
        let v;
        if (pe.value && re.value) {
          const U = re.value[a.optionValue];
          v = await s.patch(
            `${a.endpoint}${U}/`,
            p
          );
          const D = C.value.findIndex(
            (I) => I[a.optionValue] === U
          );
          D !== -1 && (C.value[D] = v.data), d.success("Registro atualizado com sucesso");
        } else
          v = await s.post(a.endpoint, p), C.value.unshift(v.data), T.value++, d.success("Registro criado com sucesso");
        le.value = !1, re.value = null, u.value = v.data;
      } catch (p) {
        d.error(Te(p, "Erro ao salvar registro"));
      } finally {
        ke.value = !1;
      }
    }
    function P(p) {
      h(async () => {
        try {
          const v = p[a.optionValue];
          await s.delete(`${a.endpoint}${v}/`);
          const U = C.value.findIndex(
            (D) => D[a.optionValue] === v
          );
          U !== -1 && (C.value.splice(U, 1), T.value--), f.value && f.value[a.optionValue] === v && (f.value = null, n("update:modelValue", null)), u.value && u.value[a.optionValue] === v && (u.value = null), d.success("Registro excluído com sucesso");
        } catch (v) {
          d.error(Te(v, "Erro ao excluir registro"));
        }
      });
    }
    return (p, v) => {
      const U = nt("tooltip");
      return g(), M(ue, null, [
        S("div", pa, [
          K(b(dt), {
            "model-value": f.value,
            suggestions: w.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: E.value,
            fluid: "",
            onComplete: R,
            onItemSelect: z,
            onClear: l
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          Pe((g(), M("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: H
          }, [...v[6] || (v[6] = [
            S("i", { class: "pi pi-search" }, null, -1)
          ])], 8, va)), [
            [
              U,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        K(b(ut), {
          visible: m.value,
          "onUpdate:visible": v[4] || (v[4] = (D) => m.value = D),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: J(() => [
            S("div", ba, [
              K(b(ae), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: v[3] || (v[3] = (D) => m.value = !1)
              }),
              K(b(ae), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !u.value,
                onClick: Ee
              }, null, 8, ["disabled"])
            ])
          ]),
          default: J(() => [
            S("div", ga, [
              K(b(rt), { class: "w-autocompletefk-toolbar-search" }, {
                default: J(() => [
                  K(b(st), { class: "pi pi-search" }),
                  K(b(ye), {
                    modelValue: k.value,
                    "onUpdate:modelValue": v[0] || (v[0] = (D) => k.value = D),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              S("div", ha, [
                _.value ? (g(), Y(b(ae), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: ge
                })) : O("", !0)
              ])
            ]),
            K(b(lt), {
              selection: u.value,
              "onUpdate:selection": v[1] || (v[1] = (D) => u.value = D),
              value: C.value,
              loading: i.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: X.value,
              "total-records": T.value,
              "sort-field": $.value ?? void 0,
              "sort-order": o.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: we,
              onSort: v[2] || (v[2] = (D) => me({ sortField: D.sortField, sortOrder: D.sortOrder })),
              onRowDblclick: Me
            }, {
              empty: J(() => [...v[7] || (v[7] = [
                S("div", { class: "w-autocompletefk-empty" }, " Nenhum registro encontrado ", -1)
              ])]),
              default: J(() => [
                K(b(Ve), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (g(!0), M(ue, null, de(ne.value, (D) => (g(), Y(b(Ve), {
                  key: D.field,
                  field: D.field,
                  header: D.header,
                  sortable: D.sortable ?? !0,
                  style: Fe(D.style)
                }, {
                  body: J(({ data: I }) => [
                    D.type ? (g(), Y(Ze, {
                      key: 0,
                      column: D,
                      value: I[D.field],
                      "row-data": I
                    }, null, 8, ["column", "value", "row-data"])) : (g(), M(ue, { key: 1 }, [
                      We(B(I[D.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                fe.value ? (g(), Y(b(Ve), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: J(({ data: D }) => [
                    S("div", ya, [
                      G.value ? Pe((g(), Y(b(ae), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (I) => he(D)
                      }, null, 8, ["onClick"])), [
                        [
                          U,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : O("", !0),
                      Q.value ? Pe((g(), Y(b(ae), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (I) => P(D)
                      }, null, 8, ["onClick"])), [
                        [
                          U,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : O("", !0)
                    ])
                  ]),
                  _: 1
                })) : O("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        F.value ? (g(), Y(Je, {
          key: 0,
          visible: le.value,
          title: ve.value,
          fields: ee.value,
          "form-data": oe,
          "is-editing": pe.value,
          saving: ke.value,
          width: e.dialogWidth,
          "onUpdate:visible": v[5] || (v[5] = (D) => {
            le.value = D, D || (re.value = null);
          }),
          "onUpdate:field": Ce,
          onSave: y
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : O("", !0)
      ], 64);
    };
  }
}), wa = { class: "w-crud-form-fields" }, ka = {
  key: 0,
  class: "w-crud-form-switch"
}, $a = { class: "w-crud-form-switch-label" }, Da = {
  key: 1,
  class: "w-crud-form-col-full"
}, Ca = { class: "w-crud-form-label" }, xa = {
  key: 0,
  class: "w-crud-form-required"
}, Sa = { class: "w-crud-form-color-row" }, Ea = {
  key: 2,
  class: "w-crud-form-col-full"
}, Pa = { class: "w-crud-form-label" }, Va = ["accept", "disabled", "onChange"], Ma = { class: "w-crud-form-label" }, Aa = {
  key: 0,
  class: "w-crud-form-required"
}, Fa = {
  key: 14,
  class: "w-crud-form-error"
}, Ya = /* @__PURE__ */ ie({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const n = e, r = a, s = ce({}), d = q(
      () => n.fields.filter((u) => u.visible === void 0 || u.visible === !0 ? !0 : typeof u.visible == "function" ? u.visible(n.formData, n.isEditing) : u.visible)
    );
    function h(u) {
      return n.disabled || u.disabledOnEdit && n.isEditing ? !0 : typeof u.disabled == "function" ? u.disabled(n.formData, n.isEditing) : !!u.disabled;
    }
    function f(u) {
      return Dt(u) ? u.value : u;
    }
    const w = q(() => {
      const u = n.isEditing ? "edit" : "create", $ = n.fields.find(
        (c) => c.autofocus === !0 || c.autofocus === u
      );
      if ($) return $.field;
      const o = d.value.find((c) => !(c.type === "switch" || c.type === "fk" || c.type === "select" || c.type === "image" || c.disabled === !0 || c.disabledOnEdit && n.isEditing));
      return (o == null ? void 0 : o.field) ?? null;
    });
    function E(u) {
      return u.field === w.value;
    }
    function N(u) {
      if (u)
        return u.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function j(u) {
      if (!u) return "";
      const $ = String(u).replace(/\D/g, "").slice(0, 14);
      return $.length <= 11 ? $.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : $.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function V(u, $) {
      const o = $.target.value.replace(/\D/g, "").slice(0, 14);
      r("update:field", u, o);
    }
    const R = ce({});
    function z(u) {
      const $ = n.formData[u.field];
      if ($ == null) return null;
      const o = u.optionValue || "value";
      return (f(u.options) || []).find(
        (x) => x[o] === $
      ) ?? null;
    }
    function l(u) {
      return R[u.field] || [];
    }
    function m(u, $) {
      const o = ($.query || "").toLowerCase(), c = f(u.options) || [], x = u.optionLabel || "label";
      R[u.field] = c.filter(
        (F) => String(F[x] || "").toLowerCase().includes(o)
      );
    }
    function C(u, $) {
      const o = u.optionValue || "value";
      r("update:field", u.field, $.value[o]);
    }
    function i(u) {
      const $ = n.formData[u.field];
      return $ ? String($).replace("#", "") : "FFFFFF";
    }
    function k(u, $) {
      r("update:field", u.field, `#${$}`);
    }
    function A(u) {
      if (typeof u.validate == "function") {
        const $ = u.validate(n.formData[u.field]);
        s[u.field] = $ || null;
      }
    }
    function X() {
      const u = [];
      for (const $ of n.fields)
        if (typeof $.validate == "function") {
          const o = $.validate(n.formData[$.field]);
          s[$.field] = o || null, o && u.push(o);
        }
      return u;
    }
    function T() {
      Object.keys(s).forEach((u) => delete s[u]);
    }
    return t({ validateAll: X, clearErrors: T }), (u, $) => (g(), M("div", wa, [
      (g(!0), M(ue, null, de(d.value, (o) => Z(u.$slots, `field-${o.field}`, {
        key: o.field,
        field: o,
        formData: e.formData,
        isEditing: e.isEditing,
        setFormField: (c, x) => r("update:field", c, x)
      }, () => [
        o.type === "switch" ? (g(), M("div", ka, [
          K(b(Pt), {
            "model-value": e.formData[o.field],
            disabled: h(o),
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
          S("label", $a, B(o.switchLabel || o.label), 1)
        ])) : o.type === "color" ? (g(), M("div", Da, [
          S("label", Ca, [
            We(B(o.label) + " ", 1),
            o.required ? (g(), M("span", xa, "*")) : O("", !0)
          ]),
          S("div", Sa, [
            K(b(Vt), {
              "model-value": i(o),
              disabled: h(o),
              "onUpdate:modelValue": (c) => k(o, c)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
            K(b(ye), {
              "model-value": e.formData[o.field],
              class: "w-28",
              maxlength: "7",
              placeholder: "#000000",
              disabled: h(o),
              "onUpdate:modelValue": (c) => r("update:field", o.field, c)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
          ])
        ])) : o.type === "image" ? (g(), M("div", Ea, [
          S("label", Pa, B(o.label), 1),
          Z(u.$slots, `image-${o.field}`, {
            field: o,
            formData: e.formData
          }, () => [
            S("input", {
              type: "file",
              accept: o.accept || "image/*",
              disabled: h(o),
              onChange: (c) => {
                var F;
                const x = ((F = c.target.files) == null ? void 0 : F[0]) ?? null;
                r("update:field", o.field, x);
              }
            }, null, 40, Va)
          ])
        ])) : (g(), M("div", {
          key: 3,
          class: Ne(o.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
        }, [
          S("label", Ma, [
            We(B(o.label) + " ", 1),
            o.required ? (g(), M("span", Aa, "*")) : O("", !0)
          ]),
          (!o.type || o.type === "text") && o.mask ? Pe((g(), Y(b(ye), {
            key: 0,
            "model-value": e.formData[o.field],
            fluid: "",
            autofocus: E(o) || void 0,
            placeholder: o.placeholder,
            disabled: h(o),
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
            [b(ot), { mask: N(o.mask) }]
          ]) : !o.type || o.type === "text" ? (g(), Y(b(ye), {
            key: 1,
            "model-value": e.formData[o.field],
            fluid: "",
            autofocus: E(o) || void 0,
            placeholder: o.placeholder,
            disabled: h(o),
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "email" ? (g(), Y(b(ye), {
            key: 2,
            "model-value": e.formData[o.field],
            type: "email",
            fluid: "",
            autofocus: E(o) || void 0,
            placeholder: o.placeholder,
            disabled: h(o),
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "password" ? (g(), Y(b(Mt), {
            key: 3,
            "model-value": e.formData[o.field],
            fluid: "",
            "toggle-mask": "",
            feedback: o.feedback !== !1,
            placeholder: o.placeholder,
            disabled: h(o),
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "number" ? (g(), Y(b(Xe), {
            key: 4,
            "model-value": e.formData[o.field],
            fluid: "",
            locale: "pt-BR",
            min: o.min,
            max: o.max,
            "min-fraction-digits": o.minFractionDigits,
            "max-fraction-digits": o.maxFractionDigits,
            suffix: o.suffix,
            prefix: o.prefix,
            placeholder: o.placeholder,
            disabled: h(o),
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "currency" ? (g(), Y(b(Xe), {
            key: 5,
            "model-value": e.formData[o.field],
            fluid: "",
            mode: "currency",
            currency: "BRL",
            locale: "pt-BR",
            min: o.min,
            max: o.max,
            placeholder: o.placeholder,
            disabled: h(o),
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "select" ? (g(), Y(b(Et), {
            key: 6,
            "model-value": e.formData[o.field],
            fluid: "",
            options: f(o.options),
            "option-label": o.optionLabel || "label",
            "option-value": o.optionValue || "value",
            "show-clear": o.showClear !== !1,
            placeholder: o.placeholder,
            disabled: h(o),
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "autocomplete" ? (g(), Y(b(dt), {
            key: 7,
            "model-value": z(o),
            fluid: "",
            suggestions: l(o),
            "option-label": o.optionLabel || "label",
            dropdown: "",
            placeholder: o.placeholder,
            disabled: h(o),
            onComplete: (c) => m(o, c),
            onItemSelect: (c) => C(o, c),
            onClear: (c) => r("update:field", o.field, null)
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : o.type === "fk" ? (g(), Y($t, {
            key: 8,
            "model-value": e.formData[o.field],
            endpoint: o.endpoint,
            "option-label": o.optionLabel || "nome",
            placeholder: o.placeholder,
            disabled: h(o),
            "show-clear": o.showClear !== !1,
            "dialog-header": o.label,
            "crud-fields": o.crudFields,
            "crud-columns": o.crudColumns,
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "endpoint", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : o.type === "date" ? (g(), Y(b(Qe), {
            key: 9,
            "model-value": e.formData[o.field],
            fluid: "",
            "date-format": o.dateFormat || "dd/mm/yy",
            placeholder: o.placeholder,
            disabled: h(o),
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "datetime" ? (g(), Y(b(Qe), {
            key: 10,
            "model-value": e.formData[o.field],
            fluid: "",
            "show-time": "",
            "hour-format": o.hourFormat || "24",
            "date-format": o.dateFormat || "dd/mm/yy",
            placeholder: o.placeholder,
            disabled: h(o),
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "cpf_cnpj" ? (g(), Y(b(ye), {
            key: 11,
            "model-value": j(e.formData[o.field]),
            fluid: "",
            maxlength: "18",
            placeholder: o.placeholder || "000.000.000-00",
            disabled: h(o),
            invalid: !!s[o.field],
            onInput: (c) => V(o.field, c),
            onBlur: (c) => A(o)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : o.type === "mask" ? Pe((g(), Y(b(ye), {
            key: 12,
            "model-value": e.formData[o.field],
            fluid: "",
            placeholder: o.placeholder,
            disabled: h(o),
            invalid: !!s[o.field],
            "onUpdate:modelValue": (c) => r("update:field", o.field, c),
            onBlur: (c) => A(o)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
            [b(ot), { mask: N(o.mask) }]
          ]) : o.type === "textarea" ? (g(), Y(b(St), {
            key: 13,
            "model-value": e.formData[o.field],
            fluid: "",
            autofocus: E(o) || void 0,
            rows: o.rows || 3,
            placeholder: o.placeholder,
            disabled: h(o),
            "onUpdate:modelValue": (c) => r("update:field", o.field, c)
          }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : O("", !0),
          s[o.field] ? (g(), M("small", Fa, B(s[o.field]), 1)) : O("", !0)
        ], 2))
      ])), 128))
    ]));
  }
}), Ta = { class: "w-crud-form-footer" }, Je = /* @__PURE__ */ ie({
  __name: "WCrudFormDialog",
  props: {
    visible: { type: Boolean },
    title: {},
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    saving: { type: Boolean },
    width: { default: "480px" }
  },
  emits: ["update:visible", "update:field", "save"],
  setup(e, { emit: t }) {
    const a = e, n = t, r = L(null);
    function s() {
      r.value ? r.value.validateAll().length === 0 && n("save") : n("save");
    }
    return Oe(
      () => a.visible,
      (d) => {
        d && r.value && r.value.clearErrors();
      }
    ), (d, h) => (g(), Y(b(ut), {
      visible: e.visible,
      header: e.title,
      style: Fe({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": h[2] || (h[2] = (f) => n("update:visible", f))
    }, {
      default: J(() => [
        S("form", {
          class: "w-crud-form",
          onSubmit: Ct(s, ["prevent"])
        }, [
          K(Ya, {
            ref_key: "rendererRef",
            ref: r,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            "onUpdate:field": h[0] || (h[0] = (f, w) => n("update:field", f, w))
          }, Be({ _: 2 }, [
            de(e.fields, (f) => ({
              name: `field-${f.field}`,
              fn: J((w) => [
                Z(d.$slots, `field-${f.field}`, qe(He(w)))
              ])
            })),
            de(e.fields.filter((f) => f.type === "image"), (f) => ({
              name: `image-${f.field}`,
              fn: J((w) => [
                Z(d.$slots, `image-${f.field}`, qe(He(w)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing"]),
          S("div", Ta, [
            Z(d.$slots, "footer", { saving: e.saving }, () => [
              K(b(ae), {
                type: "button",
                label: "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: h[1] || (h[1] = (f) => n("update:visible", !1))
              }, null, 8, ["disabled"]),
              K(b(ae), {
                type: "submit",
                label: e.isEditing ? "Atualizar" : "Salvar",
                icon: "pi pi-check",
                loading: e.saving
              }, null, 8, ["label", "loading"])
            ])
          ])
        ], 32)
      ]),
      _: 3
    }, 8, ["visible", "header", "style"]));
  }
}), Ra = { class: "w-crud" }, Ia = {
  key: 0,
  class: "w-crud-header"
}, La = { class: "w-crud-header-content" }, Na = { class: "w-crud-title" }, za = {
  key: 0,
  class: "w-crud-subtitle"
}, ja = { class: "w-crud-header-actions" }, Ua = {
  key: 0,
  class: "w-crud-kpis"
}, Oa = { class: "w-crud-kpi-icon" }, Wa = { class: "w-crud-kpi-content" }, Ba = { class: "w-crud-kpi-label" }, qa = { class: "w-crud-kpi-value" }, Ha = { class: "w-crud-table" }, Ka = { class: "w-crud-toolbar" }, Za = { class: "w-crud-toolbar-start" }, Ja = { class: "w-crud-toolbar-end" }, Xa = { class: "w-crud-actions" }, Qa = /* @__PURE__ */ ie({
  __name: "WCrudView",
  props: {
    crud: {},
    title: {},
    subtitle: {},
    showSearch: { type: Boolean, default: !0 },
    showHeader: { type: Boolean, default: !0 },
    dialogWidth: { default: "480px" },
    autoInit: { type: Boolean, default: !0 },
    showKpi: { type: Boolean, default: !1 },
    kpiIcon: { default: "pi pi-list" },
    kpiLabel: { default: "Total de Registros" },
    extraKpis: { default: () => [] },
    expandable: { type: Boolean, default: !1 }
  },
  emits: ["row-expand", "row-collapse"],
  setup(e, { emit: t }) {
    const a = e, n = t, { formatNumber: r } = Ke(), s = L({}), d = q(
      () => a.crud.config.columns.filter((l) => l.visible !== !1).map((l) => l.type === "number" && !l.align ? { ...l, align: "right" } : l.type === "currency" && !l.align ? { ...l, align: "right" } : l)
    );
    function h(l) {
      if (l.align === "right") return "text-right";
      if (l.align === "center") return "text-center";
    }
    const f = q(() => {
      const l = [];
      return a.crud.config.canCreate !== !1 && a.crud.config.canEdit !== !1 && l.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canDelete !== !1 && l.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), l;
    }), w = q(
      () => a.crud.config.rowActions ?? f.value
    ), E = q(() => w.value.length > 0);
    function N(l, m) {
      l.action === "edit" ? a.crud.openEditDialog(m) : l.action === "delete" ? a.crud.confirmDelete(m) : l.handler && l.handler(m);
    }
    function j(l, m) {
      return l.visible ? l.visible(m) : !0;
    }
    function V(l, m) {
      return l.disabled ? l.disabled(m) : !1;
    }
    const R = q(() => {
      const l = [];
      return a.showKpi && l.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: r(a.crud.pagination.rows, 0)
      }), l.push(...a.extraKpis), l;
    });
    q(() => a.crud.config.labels ?? {});
    const z = q(() => a.crud.config.canCreate !== !1);
    return xt(() => {
      a.autoInit && a.crud.init();
    }), (l, m) => {
      const C = nt("tooltip");
      return g(), M("div", Ra, [
        e.showHeader ? (g(), M("div", Ia, [
          S("div", La, [
            S("h1", Na, B(e.title), 1),
            e.subtitle ? (g(), M("p", za, B(e.subtitle), 1)) : O("", !0)
          ]),
          S("div", ja, [
            Z(l.$slots, "header-actions"),
            z.value ? (g(), Y(b(ae), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: m[0] || (m[0] = (i) => e.crud.openCreateDialog())
            })) : O("", !0)
          ])
        ])) : O("", !0),
        Z(l.$slots, "before-table", {}, () => [
          R.value.length ? (g(), M("div", Ua, [
            (g(!0), M(ue, null, de(R.value, (i, k) => (g(), M("div", {
              key: k,
              class: "w-crud-kpi"
            }, [
              S("div", Oa, [
                S("i", {
                  class: Ne([i.icon]),
                  style: Fe(i.color ? `color: ${i.color}` : "")
                }, null, 6)
              ]),
              S("div", Wa, [
                S("div", Ba, B(i.label), 1),
                S("div", qa, B(i.value), 1)
              ])
            ]))), 128))
          ])) : O("", !0)
        ]),
        S("div", Ha, [
          K(b(lt), {
            value: e.crud.items.value,
            loading: e.crud.loading.value,
            "expanded-rows": s.value,
            "onUpdate:expandedRows": m[2] || (m[2] = (i) => s.value = i),
            paginator: "",
            rows: e.crud.pagination.pageSize,
            "total-records": e.crud.pagination.rows,
            "rows-per-page-options": [10, 20, 50],
            "paginator-template": "CurrentPageReport PrevPageLink NextPageLink",
            "current-page-report-template": "Página {currentPage} de {totalPages}",
            pt: { pcPaginator: { root: { class: "w-crud-paginator" } } },
            lazy: "",
            "striped-rows": "",
            "removable-sort": "",
            size: "small",
            "sort-field": e.crud.sort.field ?? void 0,
            "sort-order": e.crud.sort.order,
            "data-key": e.crud.config.pk || "id",
            onPage: e.crud.onPage,
            onSort: m[3] || (m[3] = (i) => e.crud.onSort({ sortField: i.sortField, sortOrder: i.sortOrder })),
            onRowExpand: m[4] || (m[4] = (i) => n("row-expand", i.data)),
            onRowCollapse: m[5] || (m[5] = (i) => n("row-collapse", i.data))
          }, Be({
            header: J(() => [
              S("div", Ka, [
                S("div", Za, [
                  e.showSearch ? (g(), Y(b(rt), { key: 0 }, {
                    default: J(() => [
                      K(b(st), { class: "pi pi-search" }),
                      K(b(ye), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : O("", !0),
                  Z(l.$slots, "toolbar-start"),
                  Z(l.$slots, "toolbar-filters")
                ]),
                S("div", Ja, [
                  Z(l.$slots, "toolbar-actions"),
                  !e.showHeader && z.value ? (g(), Y(b(ae), {
                    key: 0,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: m[1] || (m[1] = (i) => e.crud.openCreateDialog())
                  })) : O("", !0)
                ])
              ])
            ]),
            empty: J(() => [
              Z(l.$slots, "empty", {}, () => [
                m[9] || (m[9] = S("div", { class: "w-crud-empty" }, [
                  S("div", { class: "w-crud-empty-icon" }, [
                    S("i", { class: "pi pi-inbox" })
                  ]),
                  S("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                  S("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                ], -1))
              ])
            ]),
            default: J(() => [
              e.expandable ? (g(), Y(b(Ve), {
                key: 0,
                expander: "",
                style: { width: "3rem" }
              })) : O("", !0),
              (g(!0), M(ue, null, de(d.value, (i) => (g(), Y(b(Ve), {
                key: i.field,
                field: i.field,
                header: i.header,
                sortable: i.sortable,
                style: Fe(i.style),
                "header-class": h(i),
                "body-class": h(i)
              }, {
                body: J(({ data: k }) => [
                  Z(l.$slots, `column-${i.field}`, {
                    data: k,
                    value: k[i.field]
                  }, () => [
                    K(Ze, {
                      column: i,
                      value: k[i.field],
                      "row-data": k
                    }, null, 8, ["column", "value", "row-data"])
                  ])
                ]),
                _: 2
              }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
              E.value ? (g(), Y(b(Ve), {
                key: 1,
                "header-class": "w-crud-actions-header",
                style: Fe({ width: `${w.value.length * 2.5 + 1}rem` })
              }, {
                body: J(({ data: i }) => [
                  Z(l.$slots, "row-actions", {
                    data: i,
                    crud: e.crud
                  }, () => [
                    S("div", Xa, [
                      (g(!0), M(ue, null, de(w.value, (k) => (g(), M(ue, {
                        key: k.action
                      }, [
                        j(k, i) ? Pe((g(), Y(b(ae), {
                          key: 0,
                          icon: k.icon,
                          text: "",
                          rounded: "",
                          size: "small",
                          severity: k.severity,
                          disabled: V(k, i),
                          onClick: (A) => N(k, i)
                        }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                          [
                            C,
                            k.tooltip,
                            void 0,
                            { top: !0 }
                          ]
                        ]) : O("", !0)
                      ], 64))), 128))
                    ])
                  ])
                ]),
                _: 3
              }, 8, ["style"])) : O("", !0)
            ]),
            _: 2
          }, [
            e.expandable ? {
              name: "expansion",
              fn: J((i) => [
                Z(l.$slots, "expansion", {
                  data: i.data
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "onPage"])
        ]),
        Z(l.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => [
          K(Je, {
            visible: e.crud.dialogVisible.value,
            title: e.crud.dialogTitle.value,
            fields: e.crud.config.form,
            "form-data": e.crud.formData,
            "is-editing": e.crud.isEditing.value,
            saving: e.crud.saving.value,
            width: e.dialogWidth,
            "onUpdate:visible": m[6] || (m[6] = (i) => {
              e.crud.dialogVisible.value = i, i || (e.crud.editingItem.value = null);
            }),
            "onUpdate:field": m[7] || (m[7] = (i, k) => e.crud.setFormField(i, k)),
            onSave: m[8] || (m[8] = (i) => e.crud.save())
          }, Be({ _: 2 }, [
            de(e.crud.config.form, (i) => ({
              name: `field-${i.field}`,
              fn: J((k) => [
                Z(l.$slots, `field-${i.field}`, qe(He(k)))
              ])
            }))
          ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])
        ])
      ]);
    };
  }
}), Ga = /* @__PURE__ */ ie({
  __name: "WStatusTag",
  props: {
    value: {},
    map: {}
  },
  setup(e) {
    const t = e, a = {
      ativo: { label: "Ativo", severity: "success" },
      ativa: { label: "Ativa", severity: "success" },
      inativo: { label: "Inativo", severity: "danger" },
      inativa: { label: "Inativa", severity: "danger" },
      suspensa: { label: "Suspensa", severity: "warn" },
      suspenso: { label: "Suspenso", severity: "warn" },
      cancelada: { label: "Cancelada", severity: "danger" },
      cancelado: { label: "Cancelado", severity: "danger" },
      pendente: { label: "Pendente", severity: "warn" },
      confirmada: { label: "Confirmada", severity: "success" },
      confirmado: { label: "Confirmado", severity: "success" },
      vencida: { label: "Vencida", severity: "danger" },
      vencido: { label: "Vencido", severity: "danger" },
      concluido: { label: "Concluído", severity: "success" },
      concluida: { label: "Concluída", severity: "success" },
      em_progresso: { label: "Em Progresso", severity: "info" },
      em_andamento: { label: "Em Andamento", severity: "info" },
      expirado: { label: "Expirado", severity: "secondary" },
      expirada: { label: "Expirada", severity: "secondary" },
      aberto: { label: "Aberto", severity: "info" },
      aberta: { label: "Aberta", severity: "info" },
      fechado: { label: "Fechado", severity: "secondary" },
      fechada: { label: "Fechada", severity: "secondary" },
      pago: { label: "Pago", severity: "success" },
      paga: { label: "Paga", severity: "success" },
      inadimplente: { label: "Inadimplente", severity: "danger" }
    }, n = q(() => (t.map ?? a)[t.value] ?? { label: t.value, severity: "secondary" });
    return (r, s) => (g(), Y(b(it), {
      value: n.value.label,
      severity: n.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), _a = { class: "w-page-header" }, eo = { class: "w-page-header-content" }, to = { class: "w-page-header-title" }, ao = {
  key: 0,
  class: "w-page-header-subtitle"
}, oo = { class: "w-page-header-actions" }, Bo = /* @__PURE__ */ ie({
  __name: "WPageHeader",
  props: {
    title: {},
    subtitle: {},
    actionLabel: {},
    actionIcon: {}
  },
  emits: ["action"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, r) => (g(), M("div", _a, [
      S("div", eo, [
        S("h2", to, B(e.title), 1),
        e.subtitle ? (g(), M("p", ao, B(e.subtitle), 1)) : O("", !0)
      ]),
      S("div", oo, [
        Z(n.$slots, "actions"),
        e.actionLabel ? (g(), Y(b(ae), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: r[0] || (r[0] = (s) => a("action"))
        }, null, 8, ["label", "icon"])) : O("", !0)
      ])
    ]));
  }
}), no = { class: "w-empty-state" }, lo = { class: "w-empty-state-icon" }, ro = { class: "w-empty-state-title" }, so = {
  key: 0,
  class: "w-empty-state-description"
}, qo = /* @__PURE__ */ ie({
  __name: "WEmptyState",
  props: {
    icon: {},
    title: {},
    description: {},
    actionLabel: {},
    actionIcon: {}
  },
  emits: ["action"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, r) => (g(), M("div", no, [
      S("div", lo, [
        S("i", {
          class: Ne(e.icon)
        }, null, 2)
      ]),
      S("p", ro, B(e.title), 1),
      e.description ? (g(), M("p", so, B(e.description), 1)) : O("", !0),
      e.actionLabel ? (g(), Y(b(ae), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: r[0] || (r[0] = (s) => a("action"))
      }, null, 8, ["label", "icon"])) : O("", !0)
    ]));
  }
});
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
const io = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
function uo() {
  return xe(io);
}
const co = { class: "w-detail-header" }, fo = { class: "w-detail-header-left" }, mo = { class: "w-detail-header-content" }, po = { class: "w-detail-header-title" }, vo = {
  key: 0,
  class: "w-detail-header-subtitle"
}, go = { class: "w-detail-header-actions" }, Ho = /* @__PURE__ */ ie({
  __name: "WDetailHeader",
  props: {
    title: {},
    subtitle: {},
    icon: {},
    backRoute: {},
    backTo: {},
    status: {},
    statusMap: {}
  },
  setup(e) {
    const t = e, a = uo();
    function n() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (r, s) => (g(), M("div", co, [
      S("div", fo, [
        K(b(ae), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: n
        }),
        e.icon ? (g(), M("i", {
          key: 0,
          class: Ne([e.icon, "w-detail-header-icon"])
        }, null, 2)) : O("", !0),
        S("div", mo, [
          S("h2", po, B(e.title), 1),
          e.subtitle ? (g(), M("p", vo, B(e.subtitle), 1)) : O("", !0)
        ]),
        e.status ? (g(), Y(Ga, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : O("", !0)
      ]),
      S("div", go, [
        Z(r.$slots, "actions")
      ])
    ]));
  }
}), ho = { class: "w-info-card" }, yo = {
  key: 0,
  class: "w-info-card-title"
}, bo = { class: "w-info-card-grid" }, wo = { class: "w-info-card-label" }, ko = { class: "w-info-card-value" }, Ko = /* @__PURE__ */ ie({
  __name: "WInfoCard",
  props: {
    title: {},
    fields: {}
  },
  setup(e) {
    const { formatCurrency: t, formatDate: a, formatNumber: n } = Ke();
    function r(s) {
      const d = s.value;
      return d == null || d === "" ? "-" : s.format === "currency" ? t(Number(d)) : s.format === "date" ? a(String(d)) : s.format === "datetime" ? a(String(d), "DD/MM/YYYY HH:mm") : s.format === "number" ? n(Number(d)) : String(d);
    }
    return (s, d) => (g(), M("div", ho, [
      e.title ? (g(), M("h3", yo, B(e.title), 1)) : O("", !0),
      S("div", bo, [
        (g(!0), M(ue, null, de(e.fields, (h) => (g(), M("div", {
          key: h.label,
          class: "w-info-card-field"
        }, [
          S("span", wo, B(h.label), 1),
          S("span", ko, B(r(h)), 1)
        ]))), 128))
      ])
    ]));
  }
}), Zo = {
  install(e, t) {
    if (!(t != null && t.axios))
      throw new Error(
        '[wPrimeVueComponents] A opção "axios" é obrigatória. Passe sua instância axios configurada.'
      );
    const a = {
      axios: t.axios,
      defaultPageSize: t.defaultPageSize ?? 20,
      dateFormat: t.dateFormat ?? "DD/MM/YYYY",
      dateTimeFormat: t.dateTimeFormat ?? "DD/MM/YYYY HH:mm",
      locale: t.locale ?? "pt-BR",
      currency: t.currency ?? "BRL"
    };
    e.provide(ze, t.axios), e.provide(je, a), t.registerComponents !== !1 && (e.component("WCrudView", Qa), e.component("WCrudFormDialog", Je), e.component("WCrudColumnRenderer", Ze), e.component("WAutoCompleteFK", $t));
  }
}, $o = {
  createTitle: "Novo Registro",
  editTitle: "Editar Registro",
  createButton: "Novo",
  saveButton: "Salvar",
  updateButton: "Atualizar",
  cancelButton: "Cancelar",
  deleteConfirmTitle: "Confirmar Exclusão",
  deleteConfirmMessage: "Deseja realmente excluir este registro?",
  searchPlaceholder: "Buscar...",
  emptyMessage: "Nenhum registro encontrado",
  successCreate: "Registro criado com sucesso",
  successUpdate: "Registro atualizado com sucesso",
  successDelete: "Registro excluído com sucesso"
};
function Jo(e) {
  const {
    endpoint: t,
    columns: a,
    form: n,
    pk: r = "id",
    searchDebounce: s = 300,
    canCreate: d = !0,
    canEdit: h = !0,
    canDelete: f = !0,
    rowActions: w = void 0,
    filterParams: E = void 0,
    transformPayload: N = void 0,
    onAfterSave: j = void 0,
    onAfterDelete: V = void 0
  } = e, R = xe(ze);
  if (!R)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const z = R, l = xe(je), m = e.pageSize ?? (l == null ? void 0 : l.defaultPageSize) ?? 20, C = { ...$o, ...e.labels }, i = wt(), { confirmDelete: k } = kt(), A = L([]), X = L(!1), T = L(!1), u = L(""), $ = L(!1), o = L(null), c = ce({}), x = ce({
    page: 1,
    pageSize: m,
    rows: 0,
    totalPages: 0
  }), F = ce({
    field: null,
    order: 0
  });
  function _() {
    const y = {};
    for (const P of n)
      y[P.field] = P.defaultValue !== void 0 ? typeof P.defaultValue == "function" ? P.defaultValue() : P.defaultValue : null;
    return y;
  }
  const G = _();
  for (const y of Object.keys(G))
    c[y] = G[y];
  const Q = q(() => o.value !== null), fe = q(
    () => Q.value ? C.editTitle : C.createTitle
  ), ee = q(() => x.page <= 1), ne = q(() => x.page >= x.totalPages);
  let te = null;
  async function H(y = {}) {
    X.value = !0;
    try {
      const P = {
        page: x.page,
        page_size: x.pageSize,
        ...y
      };
      u.value && (P.search = u.value), F.field && F.order !== 0 && (P.ordering = F.order === -1 ? `-${F.field}` : F.field), E && Object.assign(P, E());
      const v = (await z.get(t, { params: P })).data;
      Array.isArray(v.results) ? (A.value = v.results, x.rows = v.count ?? 0) : (A.value = v.data ?? [], x.rows = v.rows ?? 0), v.page && (x.page = v.page), v.page_size && (x.pageSize = v.page_size), x.totalPages = Math.ceil(x.rows / x.pageSize) || 0;
    } finally {
      X.value = !1;
    }
  }
  async function we() {
    await H();
  }
  async function me() {
    await H();
  }
  function Ee(y) {
    u.value = y, te && clearTimeout(te), te = setTimeout(() => {
      x.page = 1, H();
    }, s);
  }
  function Me(y) {
    const P = y.target;
    Ee(P.value);
  }
  function le(y) {
    x.page = y, H();
  }
  function ke() {
    le(1);
  }
  function re() {
    le(x.totalPages);
  }
  function oe(y) {
    x.page = y.page + 1, x.pageSize = y.rows, H();
  }
  function pe(y) {
    F.field = y.sortField ?? null, F.order = y.sortOrder ?? 0, x.page = 1, H();
  }
  function ve() {
    const y = _();
    for (const P of Object.keys(y))
      c[P] = y[P];
  }
  function $e(y, P) {
    c[y] = P;
  }
  function De() {
    o.value = null, ve(), $.value = !0;
  }
  function ge(y) {
    o.value = y;
    for (const P of n) {
      let p = y[P.field] !== void 0 ? y[P.field] : null;
      p && (P.type === "date" || P.type === "datetime") && typeof p == "string" && (p = ct(p)), c[P.field] = p;
    }
    $.value = !0;
  }
  async function he() {
    for (const y of n) {
      if (y.validate) {
        const P = y.validate(c[y.field]);
        if (P)
          return i.error(P), null;
      }
      if (y.required) {
        const P = c[y.field];
        if (P == null || P === "")
          return i.error(`${y.label} é obrigatório`), null;
      }
    }
    T.value = !0;
    try {
      let y = { ...c };
      for (const I of n) {
        const W = y[I.field];
        if (I.type === "date" && W instanceof Date ? y[I.field] = ft(W) : I.type === "datetime" && W instanceof Date && (y[I.field] = mt(W)), I.type === "fk" && W !== null && typeof W == "object") {
          const se = I.optionValue || "id";
          y[I.field] = W[se] ?? W;
        }
        (I.type === "mask" || I.type === "cpf_cnpj") && typeof W == "string" && (y[I.field] = be(W));
      }
      N && (y = N(y, Q.value));
      const P = n.some(
        (I) => I.type === "image" && y[I.field] instanceof File
      );
      let p = y, v;
      if (P) {
        const I = new Set(
          n.filter((se) => se.type === "image").map((se) => se.field)
        ), W = new FormData();
        for (const [se, Ae] of Object.entries(y))
          if (Ae != null)
            if (Ae instanceof File)
              W.append(se, Ae);
            else {
              if (I.has(se))
                continue;
              W.append(se, String(Ae));
            }
        p = W, v = { "Content-Type": "multipart/form-data" };
      }
      const U = v ? { headers: v } : void 0;
      let D;
      if (Q.value && o.value) {
        const I = o.value[r];
        D = await z.patch(
          `${t}${I}/`,
          p,
          U
        );
        const W = A.value.findIndex(
          (se) => se[r] === I
        );
        W !== -1 && (A.value[W] = D.data), i.success(C.successUpdate);
      } else
        D = await z.post(t, p, U), A.value.unshift(D.data), x.rows++, i.success(C.successCreate);
      return $.value = !1, o.value = null, j && j(D.data, Q.value), D.data;
    } catch (y) {
      return i.error(Te(y, "Erro ao salvar registro")), null;
    } finally {
      T.value = !1;
    }
  }
  function Ce(y) {
    k(async () => {
      try {
        const P = y[r];
        await z.delete(`${t}${P}/`);
        const p = A.value.findIndex(
          (v) => v[r] === P
        );
        p !== -1 && (A.value.splice(p, 1), x.rows--), i.success(C.successDelete), V && V(y);
      } catch (P) {
        i.error(Te(P, "Erro ao excluir registro"));
      }
    }, C.deleteConfirmMessage);
  }
  return {
    items: A,
    loading: X,
    saving: T,
    search: u,
    dialogVisible: $,
    editingItem: o,
    formData: c,
    pagination: x,
    sort: F,
    isEditing: Q,
    dialogTitle: fe,
    isFirstPage: ee,
    isLastPage: ne,
    init: we,
    fetchItems: H,
    refresh: me,
    setSearch: Ee,
    onSearch: Me,
    onPage: oe,
    onSort: pe,
    openCreateDialog: De,
    openEditDialog: ge,
    save: he,
    confirmDelete: Ce,
    setFormField: $e,
    resetForm: ve,
    goToPage: le,
    firstPage: ke,
    lastPage: re,
    config: e
  };
}
function Xo(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: n = !1 } = e, r = xe(ze);
  if (!r)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const s = r, d = xe(je), h = e.pageSize ?? (d == null ? void 0 : d.defaultPageSize) ?? 20, f = L([]), w = L(!1), E = L(""), N = L({}), j = ce({}), V = ce({
    page: 1,
    pageSize: h,
    rows: 0,
    totalPages: 0
  }), R = ce({
    field: null,
    order: 0
  });
  let z = null;
  async function l(T = {}) {
    w.value = !0;
    try {
      const u = {
        page: V.page,
        page_size: V.pageSize,
        ...T
      };
      E.value && (u.search = E.value), R.field && R.order !== 0 && (u.ordering = R.order === -1 ? `-${R.field}` : R.field);
      for (const [x, F] of Object.entries(j))
        F != null && F !== "" && (u[x] = F);
      const c = (await s.get(t, {
        params: u
      })).data;
      Array.isArray(c.results) ? (f.value = c.results, V.rows = c.count ?? 0) : (f.value = c.data ?? [], V.rows = c.rows ?? 0), c.page && (V.page = c.page), c.page_size && (V.pageSize = c.page_size), V.totalPages = Math.ceil(V.rows / V.pageSize) || 0, N.value = c.extras ?? {};
    } finally {
      w.value = !1;
    }
  }
  async function m() {
    await l();
  }
  function C(T) {
    E.value = T, z && clearTimeout(z), z = setTimeout(() => {
      V.page = 1, l();
    }, a);
  }
  function i(T, u) {
    j[T] = u, V.page = 1, l();
  }
  function k() {
    for (const T of Object.keys(j))
      delete j[T];
    V.page = 1, l();
  }
  function A(T) {
    V.page = T.page + 1, V.pageSize = T.rows, l();
  }
  function X(T) {
    R.field = T.sortField ?? null, R.order = T.sortOrder ?? 0, V.page = 1, l();
  }
  return n && l(), {
    items: f,
    loading: w,
    search: E,
    pagination: V,
    sort: R,
    extras: N,
    fetchItems: l,
    refresh: m,
    setSearch: C,
    setFilter: i,
    clearFilters: k,
    onPage: A,
    onSort: X
  };
}
export {
  $o as DEFAULT_CRUD_LABELS,
  $t as WAutoCompleteFK,
  Ze as WCrudColumnRenderer,
  Je as WCrudFormDialog,
  Qa as WCrudView,
  Ho as WDetailHeader,
  qo as WEmptyState,
  Ya as WFormRenderer,
  Ko as WInfoCard,
  Bo as WPageHeader,
  Zo as WPrimeVuePlugin,
  Ga as WStatusTag,
  ze as W_AXIOS_KEY,
  je as W_CONFIG_KEY,
  Te as extractApiError,
  da as mapApiFieldToColumnDef,
  sa as mapApiFieldToFieldDef,
  ca as mapApiFieldsToColumnDefs,
  ia as mapApiFieldsToFieldDefs,
  Xo as useApi,
  Wo as useApiError,
  kt as useAppConfirm,
  wt as useAppToast,
  Jo as useCrudManager,
  Ke as useFormatters
};
//# sourceMappingURL=index.js.map
