import { inject as Se, defineComponent as ue, openBlock as g, createElementBlock as M, createBlock as Y, unref as b, toDisplayString as O, ref as I, watch as We, computed as W, reactive as pe, resolveDirective as lt, Fragment as fe, createElementVNode as S, createVNode as B, withDirectives as Ve, withCtx as Z, createCommentVNode as U, renderList as me, normalizeStyle as Ye, createTextVNode as Be, renderSlot as K, normalizeClass as Re, isRef as Ct, withModifiers as xt, createSlots as qe, normalizeProps as He, guardReactiveProps as Ke, onMounted as St } from "vue";
import rt from "primevue/datatable";
import Me from "primevue/column";
import ae from "primevue/button";
import we from "primevue/inputtext";
import st from "primevue/iconfield";
import it from "primevue/inputicon";
import ut from "primevue/tag";
import Ee from "dayjs";
import dt from "primevue/dialog";
import Qe from "primevue/inputnumber";
import Et from "primevue/textarea";
import Pt from "primevue/select";
import ct from "primevue/autocomplete";
import Ge from "primevue/datepicker";
import Vt from "primevue/toggleswitch";
import Mt from "primevue/colorpicker";
import At from "primevue/password";
import { useToast as Ft } from "primevue/usetoast";
import { useConfirm as Yt } from "primevue/useconfirm";
const je = Symbol("w-axios"), Ue = Symbol("w-config");
function Tt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ne = { exports: {} }, Rt = Ne.exports, _e;
function It() {
  return _e || (_e = 1, (function(e, t) {
    (function(a, o) {
      e.exports = o();
    })(Rt, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, o = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, r = /\d/, i = /\d\d/, c = /\d\d?/, h = /\d*[^-_:/,()\s\d]+/, m = {}, w = function(l) {
        return (l = +l) + (l > 68 ? 1900 : 2e3);
      }, E = function(l) {
        return function(p) {
          this[l] = +p;
        };
      }, L = [/[+-]\d\d:?(\d\d)?|Z/, function(l) {
        (this.zone || (this.zone = {})).offset = (function(p) {
          if (!p || p === "Z") return 0;
          var D = p.match(/([+-]|\d\d)/g), u = 60 * D[1] + (+D[2] || 0);
          return u === 0 ? 0 : D[0] === "+" ? -u : u;
        })(l);
      }], j = function(l) {
        var p = m[l];
        return p && (p.indexOf ? p : p.s.concat(p.f));
      }, V = function(l, p) {
        var D, u = m.meridiem;
        if (u) {
          for (var k = 1; k <= 24; k += 1) if (l.indexOf(u(k, 0, p)) > -1) {
            D = k > 12;
            break;
          }
        } else D = l === (p ? "pm" : "PM");
        return D;
      }, R = { A: [h, function(l) {
        this.afternoon = V(l, !1);
      }], a: [h, function(l) {
        this.afternoon = V(l, !0);
      }], Q: [r, function(l) {
        this.month = 3 * (l - 1) + 1;
      }], S: [r, function(l) {
        this.milliseconds = 100 * +l;
      }], SS: [i, function(l) {
        this.milliseconds = 10 * +l;
      }], SSS: [/\d{3}/, function(l) {
        this.milliseconds = +l;
      }], s: [c, E("seconds")], ss: [c, E("seconds")], m: [c, E("minutes")], mm: [c, E("minutes")], H: [c, E("hours")], h: [c, E("hours")], HH: [c, E("hours")], hh: [c, E("hours")], D: [c, E("day")], DD: [i, E("day")], Do: [h, function(l) {
        var p = m.ordinal, D = l.match(/\d+/);
        if (this.day = D[0], p) for (var u = 1; u <= 31; u += 1) p(u).replace(/\[|\]/g, "") === l && (this.day = u);
      }], w: [c, E("week")], ww: [i, E("week")], M: [c, E("month")], MM: [i, E("month")], MMM: [h, function(l) {
        var p = j("months"), D = (j("monthsShort") || p.map((function(u) {
          return u.slice(0, 3);
        }))).indexOf(l) + 1;
        if (D < 1) throw new Error();
        this.month = D % 12 || D;
      }], MMMM: [h, function(l) {
        var p = j("months").indexOf(l) + 1;
        if (p < 1) throw new Error();
        this.month = p % 12 || p;
      }], Y: [/[+-]?\d+/, E("year")], YY: [i, function(l) {
        this.year = w(l);
      }], YYYY: [/\d{4}/, E("year")], Z: L, ZZ: L };
      function N(l) {
        var p, D;
        p = l, D = m && m.formats;
        for (var u = (l = p.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(n, f, F) {
          var C = F && F.toUpperCase();
          return f || D[F] || a[F] || D[C].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(q, G, _) {
            return G || _.slice(1);
          }));
        }))).match(o), k = u.length, A = 0; A < k; A += 1) {
          var Q = u[A], T = R[Q], d = T && T[0], $ = T && T[1];
          u[A] = $ ? { regex: d, parser: $ } : Q.replace(/^\[|\]$/g, "");
        }
        return function(n) {
          for (var f = {}, F = 0, C = 0; F < k; F += 1) {
            var q = u[F];
            if (typeof q == "string") C += q.length;
            else {
              var G = q.regex, _ = q.parser, oe = n.slice(C), ee = G.exec(oe)[0];
              _.call(f, ee), n = n.replace(ee, "");
            }
          }
          return (function(le) {
            var re = le.afternoon;
            if (re !== void 0) {
              var H = le.hours;
              re ? H < 12 && (le.hours += 12) : H === 12 && (le.hours = 0), delete le.afternoon;
            }
          })(f), f;
        };
      }
      return function(l, p, D) {
        D.p.customParseFormat = !0, l && l.parseTwoDigitYear && (w = l.parseTwoDigitYear);
        var u = p.prototype, k = u.parse;
        u.parse = function(A) {
          var Q = A.date, T = A.utc, d = A.args;
          this.$u = T;
          var $ = d[1];
          if (typeof $ == "string") {
            var n = d[2] === !0, f = d[3] === !0, F = n || f, C = d[2];
            f && (C = d[2]), m = this.$locale(), !n && C && (m = D.Ls[C]), this.$d = (function(oe, ee, le, re) {
              try {
                if (["x", "X"].indexOf(ee) > -1) return new Date((ee === "X" ? 1e3 : 1) * oe);
                var H = N(ee)(oe), te = H.year, ve = H.month, Ae = H.day, Pe = H.hours, de = H.minutes, ce = H.seconds, se = H.milliseconds, ne = H.zone, ge = H.week, $e = /* @__PURE__ */ new Date(), he = Ae || (te || ve ? 1 : $e.getDate()), De = te || $e.getFullYear(), ye = 0;
                te && !ve || (ye = ve > 0 ? ve - 1 : $e.getMonth());
                var be, Ce = Pe || 0, xe = de || 0, y = ce || 0, s = se || 0;
                return ne ? new Date(Date.UTC(De, ye, he, Ce, xe, y, s + 60 * ne.offset * 1e3)) : le ? new Date(Date.UTC(De, ye, he, Ce, xe, y, s)) : (be = new Date(De, ye, he, Ce, xe, y, s), ge && (be = re(be).week(ge).toDate()), be);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(Q, $, T, D), this.init(), C && C !== !0 && (this.$L = this.locale(C).$L), F && Q != this.format($) && (this.$d = /* @__PURE__ */ new Date("")), m = {};
          } else if ($ instanceof Array) for (var q = $.length, G = 1; G <= q; G += 1) {
            d[1] = $[G - 1];
            var _ = D.apply(this, d);
            if (_.isValid()) {
              this.$d = _.$d, this.$L = _.$L, this.init();
              break;
            }
            G === q && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else k.call(this, A);
        };
      };
    }));
  })(Ne)), Ne.exports;
}
var Lt = It();
const Nt = /* @__PURE__ */ Tt(Lt);
Ee.extend(Nt);
function ft(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const t = Ee(e, "YYYY-MM-DD", !0);
  return t.isValid() ? t.toDate() : Ee(e).toDate();
}
function mt(e) {
  return e ? typeof e == "string" ? e : Ee(e).format("YYYY-MM-DD") : null;
}
function pt(e) {
  return e ? typeof e == "string" ? e : Ee(e).toISOString() : null;
}
function zt(e, t = "DD/MM/YYYY") {
  return e ? Ee(e).format(t) : "—";
}
function jt(e) {
  return e ? Ee(e).format("DD/MM/YYYY HH:mm") : "—";
}
function ke(e) {
  return e.replace(/\D/g, "");
}
function vt(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function gt(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function Ut(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length === 11 ? vt(e) : t.length === 14 ? gt(e) : e;
}
function Ot(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function ht(e) {
  if (!e) return null;
  const t = ke(e);
  if (t.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(t)) return "CPF inválido.";
  let a = 0;
  for (let c = 0; c < 9; c++) a += parseInt(t[c]) * (10 - c);
  let o = a % 11;
  const r = o < 2 ? 0 : 11 - o;
  if (parseInt(t[9]) !== r) return "CPF inválido.";
  a = 0;
  for (let c = 0; c < 10; c++) a += parseInt(t[c]) * (11 - c);
  o = a % 11;
  const i = o < 2 ? 0 : 11 - o;
  return parseInt(t[10]) !== i ? "CPF inválido." : null;
}
function yt(e) {
  if (!e) return null;
  const t = ke(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let o = 0;
  for (let m = 0; m < 12; m++) o += parseInt(t[m]) * a[m];
  let r = o % 11;
  const i = r < 2 ? 0 : 11 - r;
  if (parseInt(t[12]) !== i) return "CNPJ inválido.";
  const c = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  o = 0;
  for (let m = 0; m < 13; m++) o += parseInt(t[m]) * c[m];
  r = o % 11;
  const h = r < 2 ? 0 : 11 - r;
  return parseInt(t[13]) !== h ? "CNPJ inválido." : null;
}
function Wt(e) {
  if (!e) return null;
  const t = ke(e);
  return t.length === 11 ? ht(e) : t.length === 14 ? yt(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const ze = /* @__PURE__ */ new Map();
function et(e, t) {
  const a = `${e}-${t}`;
  let o = ze.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }), ze.set(a, o)), o;
}
function Bt(e, t) {
  const a = `${e}-${t}`;
  let o = ze.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    style: "currency",
    currency: t
  }), ze.set(a, o)), o;
}
function Ze() {
  const e = Se(Ue, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), t = (e == null ? void 0 : e.locale) ?? "pt-BR", a = (e == null ? void 0 : e.currency) ?? "BRL";
  function o(m) {
    return m == null ? "—" : Bt(t, a).format(m);
  }
  function r(m, w = 2) {
    return m == null ? "—" : et(t, w).format(m);
  }
  function i(m, w) {
    return zt(m, w ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function c(m) {
    return jt(m);
  }
  function h(m) {
    return m == null ? "—" : `${et(t, 2).format(m)}%`;
  }
  return {
    formatCurrency: o,
    formatNumber: r,
    formatDate: i,
    formatDateTime: c,
    formatPercent: h,
    formatCpf: vt,
    formatCnpj: gt,
    formatCpfCnpj: Ut,
    formatTelefone: Ot,
    validateCpf: ht,
    validateCnpj: yt,
    validateCpfCnpj: Wt,
    parseDate: ft,
    toDateString: mt,
    toDateTimeString: pt
  };
}
const qt = {
  key: 0,
  class: "text-muted-color text-xs"
}, Ht = ["src", "alt"], Kt = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, Zt = {
  key: 4,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, Jt = {
  key: 5,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, Xt = {
  key: 6,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, Qt = {
  key: 7,
  class: "text-[0.8125rem]"
}, Je = /* @__PURE__ */ ue({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: o, formatNumber: r } = Ze();
    return (i, c) => e.value == null ? (g(), M("span", qt, "—")) : e.column.type === "image" ? (g(), M("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, Ht)) : e.column.type === "boolean" ? (g(), Y(b(ut), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (g(), M("span", Kt, O(b(t)(e.value)), 1)) : e.column.type === "datetime" ? (g(), M("span", Zt, O(b(a)(e.value)), 1)) : e.column.type === "currency" ? (g(), M("span", Jt, O(b(o)(e.value)), 1)) : e.column.type === "number" ? (g(), M("span", Xt, O(e.column.format ? e.column.format(e.value, e.rowData) : b(r)(e.value, e.column.decimals ?? 0)), 1)) : (g(), M("span", Qt, O(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var Gt = Object.defineProperty, _t = (e, t, a) => t in e ? Gt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, Te = (e, t, a) => _t(e, typeof t != "symbol" ? t + "" : t, a);
const tt = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, at = (e, t, a) => e.replaceAll(t, "").replace(a, ".").replace("..", ".").replace(/[^.\d]/g, ""), ot = (e, t, a) => {
  var o;
  return new Intl.NumberFormat(((o = a.number) == null ? void 0 : o.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
}, ea = (e, t = !0, a) => {
  var o, r, i, c;
  const h = ((o = a.number) == null ? void 0 : o.unsigned) !== !0 && e.startsWith("-") ? "-" : "", m = ((r = a.number) == null ? void 0 : r.fraction) ?? 0;
  let w = ot(0, m, a);
  const E = w.formatToParts(1000.12), L = ((i = E.find((l) => l.type === "group")) == null ? void 0 : i.value) ?? " ", j = ((c = E.find((l) => l.type === "decimal")) == null ? void 0 : c.value) ?? ".", V = at(e, L, j);
  if (Number.isNaN(parseFloat(V))) return h;
  const R = V.split(".");
  if (R[1] != null && R[1].length >= 1) {
    const l = R[1].length <= m ? R[1].length : m;
    w = ot(l, m, a);
  }
  let N = w.format(parseFloat(V));
  return t ? m > 0 && V.endsWith(".") && !V.slice(0, -1).includes(".") && (N += j) : N = at(N, L, j), h + N;
}, bt = (e) => JSON.parse(e.replaceAll("'", '"')), ta = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = aa(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = Le(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = Le(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = Le(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = oa(e.dataset.maskaTokens));
  const o = {};
  return e.dataset.maskaNumberLocale != null && (o.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (o.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (o.unsigned = Le(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(o).length > 0) && (a.number = o), a;
}, Le = (e) => e !== "" ? !!JSON.parse(e) : !0, aa = (e) => e.startsWith("[") && e.endsWith("]") ? bt(e) : e, oa = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return bt(e);
  const t = {};
  return e.split("|").forEach((a) => {
    const o = a.split(":");
    t[o[0]] = {
      pattern: wt() ? new RegExp(o[1], "u") : new RegExp(o[1]),
      optional: o[2] === "optional",
      multiple: o[2] === "multiple",
      repeated: o[2] === "repeated"
    };
  }), t;
}, wt = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class na {
  constructor(t = {}) {
    Te(this, "opts", {}), Te(this, "memo", /* @__PURE__ */ new Map());
    const a = { ...t };
    if (a.tokens != null) {
      a.tokens = a.tokensReplace ? { ...a.tokens } : { ...tt, ...a.tokens };
      for (const o of Object.values(a.tokens))
        typeof o.pattern == "string" && (o.pattern = wt() ? new RegExp(o.pattern, "u") : new RegExp(o.pattern));
    } else
      a.tokens = tt;
    Array.isArray(a.mask) && (a.mask.length > 1 ? a.mask = [...a.mask].sort((o, r) => o.length - r.length) : a.mask = a.mask[0] ?? ""), a.mask === "" && (a.mask = null), this.opts = a;
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
    const o = this.process(String(t), a).length;
    return typeof this.opts.mask == "string" ? o >= this.opts.mask.length : o >= a.length;
  }
  findMask(t) {
    const a = this.opts.mask;
    if (a == null)
      return null;
    if (typeof a == "string")
      return a;
    if (typeof a == "function")
      return a(t);
    const o = this.process(t, a.slice(-1).pop() ?? "", !1);
    return a.find((r) => this.process(t, r, !1).length >= o.length) ?? "";
  }
  escapeMask(t) {
    const a = [], o = [];
    return t.split("").forEach((r, i) => {
      r === "!" && t[i - 1] !== "!" ? o.push(i - o.length) : a.push(r);
    }), { mask: a.join(""), escaped: o };
  }
  process(t, a, o = !0) {
    if (this.opts.number != null) return ea(t, o, this.opts);
    if (a == null) return t;
    const r = `v=${t},mr=${a},m=${o ? 1 : 0}`;
    if (this.memo.has(r)) return this.memo.get(r);
    const { mask: i, escaped: c } = this.escapeMask(a), h = [], m = this.opts.tokens != null ? this.opts.tokens : {}, w = this.isReversed() ? -1 : 1, E = this.isReversed() ? "unshift" : "push", L = this.isReversed() ? 0 : i.length - 1, j = this.isReversed() ? () => l > -1 && p > -1 : () => l < i.length && p < t.length, V = (u) => !this.isReversed() && u <= L || this.isReversed() && u >= L;
    let R, N = -1, l = this.isReversed() ? i.length - 1 : 0, p = this.isReversed() ? t.length - 1 : 0, D = !1;
    for (; j(); ) {
      const u = i.charAt(l), k = m[u], A = (k == null ? void 0 : k.transform) != null ? k.transform(t.charAt(p)) : t.charAt(p);
      if (!c.includes(l) && k != null ? (A.match(k.pattern) != null ? (h[E](A), k.repeated ? (N === -1 ? N = l : l === L && l !== N && (l = N - w), L === N && (l -= w)) : k.multiple && (D = !0, l -= w), l += w) : k.multiple ? D && (l += w, p -= w, D = !1) : A === R ? R = void 0 : k.optional && (l += w, p -= w), p += w) : (o && !this.isEager() && h[E](u), A === u && !this.isEager() ? p += w : R = u, this.isEager() || (l += w)), this.isEager())
        for (; V(l) && (m[i.charAt(l)] == null || c.includes(l)); ) {
          if (o) {
            if (h[E](i.charAt(l)), t.charAt(p) === i.charAt(l)) {
              l += w, p += w;
              continue;
            }
          } else i.charAt(l) === t.charAt(p) && (p += w);
          l += w;
        }
    }
    return this.memo.set(r, h.join("")), this.memo.get(r);
  }
}
class la {
  constructor(t, a = {}) {
    Te(this, "items", /* @__PURE__ */ new Map()), Te(this, "eventAbortController"), Te(this, "onInput", (o) => {
      if (o instanceof CustomEvent && o.type === "input" && !o.isTrusted && !o.bubbles)
        return;
      const r = o.target, i = this.items.get(r);
      if (i === void 0) return;
      const c = "inputType" in o && o.inputType.startsWith("delete"), h = i.isEager(), m = c && h && i.unmasked(r.value) === "" ? "" : r.value;
      this.fixCursor(r, c, () => this.setValue(r, m));
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
    for (const o of t) {
      if (!this.items.has(o)) {
        const { signal: i } = this.eventAbortController;
        o.addEventListener("input", this.onInput, { capture: !0, signal: i });
      }
      const r = new na(ta(o, a));
      this.items.set(o, r), queueMicrotask(() => this.updateValue(o)), o.selectionStart === null && r.isEager() && console.warn("Maska: input of `%s` type is not supported", o.type);
    }
  }
  getInputs(t) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t];
  }
  getOptions(t) {
    const { onMaska: a, preProcess: o, postProcess: r, ...i } = t;
    return i;
  }
  fixCursor(t, a, o) {
    var r, i;
    const c = t.selectionStart, h = t.value;
    if (o(), c === null || c === h.length && !a) return;
    const m = t.value, w = h.slice(0, c), E = m.slice(0, c), L = (r = this.processInput(t, w)) == null ? void 0 : r.unmasked, j = (i = this.processInput(t, E)) == null ? void 0 : i.unmasked;
    if (L === void 0 || j === void 0) return;
    let V = c;
    w !== E && (V += a ? m.length - h.length : L.length - j.length), t.setSelectionRange(V, V);
  }
  setValue(t, a) {
    const o = this.processInput(t, a);
    o !== void 0 && (t.value = o.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((r) => r(o)) : this.options.onMaska(o)), t.dispatchEvent(new CustomEvent("maska", { detail: o })), t.dispatchEvent(new CustomEvent("input", { detail: o.masked })));
  }
  processInput(t, a) {
    const o = this.items.get(t);
    if (o === void 0) return;
    let r = a ?? t.value;
    this.options.preProcess != null && (r = this.options.preProcess(r));
    let i = o.masked(r);
    return this.options.postProcess != null && (i = this.options.postProcess(i)), {
      masked: i,
      unmasked: o.unmasked(r),
      completed: o.completed(r)
    };
  }
}
const Oe = /* @__PURE__ */ new WeakMap(), ra = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, nt = (e, t) => {
  var a;
  const o = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (o == null || (o == null ? void 0 : o.type) === "file") return;
  let r = {};
  if (t.value != null && (r = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const i = (c) => {
      const h = t.modifiers.unmasked ? c.unmasked : t.modifiers.completed ? c.completed : c.masked;
      ra(t, h);
    };
    r.onMaska = r.onMaska == null ? i : Array.isArray(r.onMaska) ? [...r.onMaska, i] : [r.onMaska, i];
  }
  Oe.has(o) ? (a = Oe.get(o)) == null || a.update(r) : Oe.set(o, new la(o, r));
}, sa = {
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
function ia(e) {
  var o;
  const t = sa[e.type] ?? "text", a = {
    field: e.name,
    label: e.label,
    type: t,
    required: e.required ?? !1
  };
  return (e.type === "decimal" || e.type === "float") && (a.minFractionDigits = 2, a.maxFractionDigits = 2), e.type === "boolean" && (a.defaultValue = !1), e.type === "choice" && ((o = e.choices) != null && o.length) && (a.options = e.choices.map((r) => ({
    label: r.label,
    value: r.value
  }))), e.type === "fk" && (a.endpoint = e.endpoint, e.option_label && (a.optionLabel = e.option_label), e.option_value && (a.optionValue = e.option_value)), a;
}
function ua(e) {
  return e.filter((t) => !t.read_only && t.name !== "id").map(ia);
}
const da = {
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
  decimal: "number",
  float: "number",
  integer: "number"
};
function ca(e) {
  return {
    field: e.type === "fk" ? `${e.name}_nome` : e.name,
    header: e.label,
    type: da[e.type],
    sortable: !0
  };
}
function fa(e, t = 6) {
  return e.filter((a) => !a.read_only && a.name !== "id").slice(0, t).map(ca);
}
function kt() {
  const e = Ft();
  function t(i, c = "Sucesso") {
    e.add({ severity: "success", summary: c, detail: i, life: 3e3 });
  }
  function a(i, c = "Erro") {
    e.add({ severity: "error", summary: c, detail: i, life: 5e3 });
  }
  function o(i, c = "Atenção") {
    e.add({ severity: "warn", summary: c, detail: i, life: 4e3 });
  }
  function r(i, c = "Info") {
    e.add({ severity: "info", summary: c, detail: i, life: 3e3 });
  }
  return { success: t, error: a, warn: o, info: r };
}
function $t() {
  const e = Yt();
  function t(o, r = "Deseja realmente excluir este registro?") {
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
      accept: o
    });
  }
  function a(o, r, i = "Confirmação") {
    e.require({
      message: o,
      header: i,
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
function ma(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function pa(e) {
  if (typeof e == "string")
    return e;
  if (Array.isArray(e)) {
    const t = e.filter((a) => typeof a == "string");
    return t.length > 0 ? t.join(" ") : null;
  }
  if (typeof e == "object" && e !== null) {
    const t = e;
    if (Array.isArray(t.non_field_errors) && t.non_field_errors.length > 0)
      return t.non_field_errors.filter((o) => typeof o == "string").join(" ");
    const a = [];
    for (const [o, r] of Object.entries(t)) {
      if (o === "non_field_errors") continue;
      const i = ma(o);
      if (Array.isArray(r)) {
        const c = r.filter((h) => typeof h == "string");
        c.length > 0 && a.push(`${i}: ${c.join(" ")}`);
      } else typeof r == "string" && a.push(`${i}: ${r}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function Ie(e, t = "Erro inesperado") {
  var i;
  if (!e || typeof e != "object") return t;
  const a = e, o = (i = a.response) == null ? void 0 : i.data;
  if (!o || typeof o != "object")
    return a.message || t;
  const r = o.detail ?? o;
  return pa(r) || t;
}
function Wo() {
  return { extractApiError: Ie };
}
const va = { class: "w-autocompletefk" }, ga = ["disabled"], ha = { class: "w-autocompletefk-toolbar" }, ya = { class: "w-autocompletefk-toolbar-actions" }, ba = { class: "flex items-center justify-end gap-1" }, wa = { class: "w-autocompletefk-footer" }, Dt = /* @__PURE__ */ ue({
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
    const a = e, o = t, r = Se(je);
    if (!r)
      throw new Error("[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin.");
    const i = r, c = kt(), { confirmDelete: h } = $t(), m = I(null), w = I([]), E = I(!1);
    let L = null;
    async function j(s) {
      try {
        const v = await i.get(`${a.endpoint}${s}/`);
        m.value = v.data;
      } catch {
        m.value = null;
      }
    }
    async function V(s) {
      E.value = !0;
      try {
        const v = { page_size: 20 };
        s && (v.search = s);
        const x = (await i.get(a.endpoint, { params: v })).data;
        w.value = x.data ?? x.results ?? x;
      } catch {
        w.value = [];
      } finally {
        E.value = !1;
      }
    }
    function R(s) {
      const v = s.query || "";
      if (v.length < a.minLength) {
        w.value = [];
        return;
      }
      L && clearTimeout(L), L = setTimeout(() => V(v), 300);
    }
    function N(s) {
      m.value = s.value, o("update:modelValue", s.value);
    }
    function l() {
      m.value = null, o("update:modelValue", null);
    }
    We(
      () => a.modelValue,
      async (s) => {
        if (s != null) {
          if (typeof s == "object" && s !== null && a.optionLabel in s) {
            m.value = s;
            return;
          }
          (!m.value || m.value[a.optionValue] !== s) && await j(s);
        } else
          m.value = null;
      },
      { immediate: !0 }
    );
    const p = I(!1), D = I([]), u = I(!1), k = I(""), A = I(1), Q = I(15), T = I(0), d = I(null), $ = I(null), n = I(0);
    let f = null;
    const F = I([]), C = W(() => {
      var s;
      return (s = a.crudFields) != null && s.length ? !0 : F.value.length > 0;
    }), q = W(() => a.canCreate ?? C.value), G = W(() => a.canEdit ?? C.value), _ = W(() => a.canDelete ?? C.value), oe = W(() => G.value || _.value), ee = W(() => {
      var s;
      return (s = a.crudFields) != null && s.length ? a.crudFields : ua(F.value);
    }), le = W(() => {
      var s, v;
      return (s = a.crudColumns) != null && s.length ? a.crudColumns : (v = a.columns) != null && v.length ? a.columns.map((P) => ({
        field: P.field,
        header: P.header,
        sortable: !0
      })) : F.value.length ? fa(F.value) : [{ field: a.optionLabel, header: a.optionLabel, sortable: !0 }];
    });
    async function re() {
      var s, v, P;
      u.value = !0;
      try {
        const x = {
          page: A.value,
          page_size: Q.value
        };
        k.value && (x.search = k.value), $.value && n.value !== 0 && (x.ordering = n.value === -1 ? `-${$.value}` : $.value);
        const z = (await i.get(a.endpoint, { params: x })).data;
        D.value = z.data ?? z.results ?? z, T.value = z.count ?? z.rows ?? 0, (s = z.extras) != null && s.fields && !((v = a.columns) != null && v.length) && !((P = a.crudFields) != null && P.length) && (F.value = z.extras.fields);
      } catch {
        D.value = [], T.value = 0;
      } finally {
        u.value = !1;
      }
    }
    function H() {
      a.disabled || (k.value = "", A.value = 1, $.value = null, n.value = 0, d.value = null, p.value = !0, re());
    }
    function te(s) {
      A.value = s.page + 1, Q.value = s.rows, re();
    }
    function ve(s) {
      $.value = s.sortField ?? null, n.value = s.sortOrder ?? 0, A.value = 1, re();
    }
    function Ae() {
      d.value && (m.value = d.value, o("update:modelValue", d.value), p.value = !1);
    }
    function Pe(s) {
      m.value = s.data, o("update:modelValue", s.data), p.value = !1;
    }
    We(k, () => {
      f && clearTimeout(f), f = setTimeout(() => {
        A.value = 1, re();
      }, 300);
    });
    const de = I(!1), ce = I(!1), se = I(null), ne = pe({}), ge = W(() => se.value !== null), $e = W(
      () => ge.value ? "Editar Registro" : "Novo Registro"
    );
    function he() {
      const s = {};
      for (const v of ee.value)
        s[v.field] = v.defaultValue !== void 0 ? typeof v.defaultValue == "function" ? v.defaultValue() : v.defaultValue : null;
      return s;
    }
    function De() {
      const s = he();
      for (const v of Object.keys(ne))
        delete ne[v];
      for (const [v, P] of Object.entries(s))
        ne[v] = P;
    }
    function ye() {
      se.value = null, De(), de.value = !0;
    }
    function be(s) {
      se.value = s;
      for (const v of ee.value)
        ne[v.field] = s[v.field] !== void 0 ? s[v.field] : null;
      de.value = !0;
    }
    function Ce(s, v) {
      ne[s] = v;
    }
    async function xe() {
      ce.value = !0;
      try {
        const s = { ...ne };
        for (const P of ee.value) {
          const x = s[P.field];
          if (P.type === "fk" && x !== null && typeof x == "object") {
            const J = P.optionValue || "id";
            s[P.field] = x[J] ?? x;
          }
        }
        let v;
        if (ge.value && se.value) {
          const P = se.value[a.optionValue];
          v = await i.patch(
            `${a.endpoint}${P}/`,
            s
          );
          const x = D.value.findIndex(
            (J) => J[a.optionValue] === P
          );
          x !== -1 && (D.value[x] = v.data), c.success("Registro atualizado com sucesso");
        } else
          v = await i.post(a.endpoint, s), D.value.unshift(v.data), T.value++, c.success("Registro criado com sucesso");
        de.value = !1, se.value = null, d.value = v.data;
      } catch (s) {
        c.error(Ie(s, "Erro ao salvar registro"));
      } finally {
        ce.value = !1;
      }
    }
    function y(s) {
      h(async () => {
        try {
          const v = s[a.optionValue];
          await i.delete(`${a.endpoint}${v}/`);
          const P = D.value.findIndex(
            (x) => x[a.optionValue] === v
          );
          P !== -1 && (D.value.splice(P, 1), T.value--), m.value && m.value[a.optionValue] === v && (m.value = null, o("update:modelValue", null)), d.value && d.value[a.optionValue] === v && (d.value = null), c.success("Registro excluído com sucesso");
        } catch (v) {
          c.error(Ie(v, "Erro ao excluir registro"));
        }
      });
    }
    return (s, v) => {
      const P = lt("tooltip");
      return g(), M(fe, null, [
        S("div", va, [
          B(b(ct), {
            "model-value": m.value,
            suggestions: w.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: E.value,
            fluid: "",
            onComplete: R,
            onItemSelect: N,
            onClear: l
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          Ve((g(), M("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: H
          }, [...v[6] || (v[6] = [
            S("i", { class: "pi pi-search" }, null, -1)
          ])], 8, ga)), [
            [
              P,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        B(b(dt), {
          visible: p.value,
          "onUpdate:visible": v[4] || (v[4] = (x) => p.value = x),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: Z(() => [
            S("div", wa, [
              B(b(ae), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: v[3] || (v[3] = (x) => p.value = !1)
              }),
              B(b(ae), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !d.value,
                onClick: Ae
              }, null, 8, ["disabled"])
            ])
          ]),
          default: Z(() => [
            S("div", ha, [
              B(b(st), { class: "w-autocompletefk-toolbar-search" }, {
                default: Z(() => [
                  B(b(it), { class: "pi pi-search" }),
                  B(b(we), {
                    modelValue: k.value,
                    "onUpdate:modelValue": v[0] || (v[0] = (x) => k.value = x),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              S("div", ya, [
                q.value ? (g(), Y(b(ae), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: ye
                })) : U("", !0)
              ])
            ]),
            B(b(rt), {
              selection: d.value,
              "onUpdate:selection": v[1] || (v[1] = (x) => d.value = x),
              value: D.value,
              loading: u.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: Q.value,
              "total-records": T.value,
              "sort-field": $.value ?? void 0,
              "sort-order": n.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: te,
              onSort: v[2] || (v[2] = (x) => ve({ sortField: x.sortField, sortOrder: x.sortOrder })),
              onRowDblclick: Pe
            }, {
              empty: Z(() => [...v[7] || (v[7] = [
                S("div", { class: "w-autocompletefk-empty" }, " Nenhum registro encontrado ", -1)
              ])]),
              default: Z(() => [
                B(b(Me), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (g(!0), M(fe, null, me(le.value, (x) => (g(), Y(b(Me), {
                  key: x.field,
                  field: x.field,
                  header: x.header,
                  sortable: x.sortable ?? !0,
                  style: Ye(x.style)
                }, {
                  body: Z(({ data: J }) => [
                    x.type ? (g(), Y(Je, {
                      key: 0,
                      column: x,
                      value: J[x.field],
                      "row-data": J
                    }, null, 8, ["column", "value", "row-data"])) : (g(), M(fe, { key: 1 }, [
                      Be(O(J[x.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                oe.value ? (g(), Y(b(Me), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: Z(({ data: x }) => [
                    S("div", ba, [
                      G.value ? Ve((g(), Y(b(ae), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (J) => be(x)
                      }, null, 8, ["onClick"])), [
                        [
                          P,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : U("", !0),
                      _.value ? Ve((g(), Y(b(ae), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (J) => y(x)
                      }, null, 8, ["onClick"])), [
                        [
                          P,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : U("", !0)
                    ])
                  ]),
                  _: 1
                })) : U("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        C.value ? (g(), Y(Xe, {
          key: 0,
          visible: de.value,
          title: $e.value,
          fields: ee.value,
          "form-data": ne,
          "is-editing": ge.value,
          saving: ce.value,
          width: e.dialogWidth,
          "onUpdate:visible": v[5] || (v[5] = (x) => {
            de.value = x, x || (se.value = null);
          }),
          "onUpdate:field": Ce,
          onSave: xe
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : U("", !0)
      ], 64);
    };
  }
}), ka = { class: "w-crud-form-fields" }, $a = {
  key: 0,
  class: "w-crud-form-switch"
}, Da = { class: "w-crud-form-switch-label" }, Ca = {
  key: 1,
  class: "w-crud-form-col-full"
}, xa = { class: "w-crud-form-label" }, Sa = {
  key: 0,
  class: "w-crud-form-required"
}, Ea = { class: "w-crud-form-color-row" }, Pa = {
  key: 2,
  class: "w-crud-form-col-full"
}, Va = { class: "w-crud-form-label" }, Ma = ["accept", "disabled", "onChange"], Aa = { class: "w-crud-form-label" }, Fa = {
  key: 0,
  class: "w-crud-form-required"
}, Ya = {
  key: 14,
  class: "w-crud-form-error"
}, Ta = /* @__PURE__ */ ue({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const o = e, r = a, i = pe({}), c = W(
      () => o.fields.filter((d) => d.visible === void 0 || d.visible === !0 ? !0 : typeof d.visible == "function" ? d.visible(o.formData, o.isEditing) : d.visible)
    );
    function h(d) {
      return o.disabled || d.disabledOnEdit && o.isEditing ? !0 : typeof d.disabled == "function" ? d.disabled(o.formData, o.isEditing) : !!d.disabled;
    }
    function m(d) {
      return Ct(d) ? d.value : d;
    }
    const w = W(() => {
      const d = o.isEditing ? "edit" : "create", $ = o.fields.find(
        (f) => f.autofocus === !0 || f.autofocus === d
      );
      if ($) return $.field;
      const n = c.value.find((f) => !(f.type === "switch" || f.type === "fk" || f.type === "select" || f.type === "image" || f.disabled === !0 || f.disabledOnEdit && o.isEditing));
      return (n == null ? void 0 : n.field) ?? null;
    });
    function E(d) {
      return d.field === w.value;
    }
    function L(d) {
      if (d)
        return d.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function j(d) {
      if (!d) return "";
      const $ = String(d).replace(/\D/g, "").slice(0, 14);
      return $.length <= 11 ? $.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : $.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function V(d, $) {
      const n = $.target.value.replace(/\D/g, "").slice(0, 14);
      r("update:field", d, n);
    }
    const R = pe({});
    function N(d) {
      const $ = o.formData[d.field];
      if ($ == null) return null;
      const n = d.optionValue || "value";
      return (m(d.options) || []).find(
        (F) => F[n] === $
      ) ?? null;
    }
    function l(d) {
      return R[d.field] || [];
    }
    function p(d, $) {
      const n = ($.query || "").toLowerCase(), f = m(d.options) || [], F = d.optionLabel || "label";
      R[d.field] = f.filter(
        (C) => String(C[F] || "").toLowerCase().includes(n)
      );
    }
    function D(d, $) {
      const n = d.optionValue || "value";
      r("update:field", d.field, $.value[n]);
    }
    function u(d) {
      const $ = o.formData[d.field];
      return $ ? String($).replace("#", "") : "FFFFFF";
    }
    function k(d, $) {
      r("update:field", d.field, `#${$}`);
    }
    function A(d) {
      if (typeof d.validate == "function") {
        const $ = d.validate(o.formData[d.field]);
        i[d.field] = $ || null;
      }
    }
    function Q() {
      const d = [];
      for (const $ of o.fields)
        if (typeof $.validate == "function") {
          const n = $.validate(o.formData[$.field]);
          i[$.field] = n || null, n && d.push(n);
        }
      return d;
    }
    function T() {
      Object.keys(i).forEach((d) => delete i[d]);
    }
    return t({ validateAll: Q, clearErrors: T }), (d, $) => (g(), M("div", ka, [
      (g(!0), M(fe, null, me(c.value, (n) => K(d.$slots, `field-${n.field}`, {
        key: n.field,
        field: n,
        formData: e.formData,
        isEditing: e.isEditing,
        setFormField: (f, F) => r("update:field", f, F)
      }, () => [
        n.type === "switch" ? (g(), M("div", $a, [
          B(b(Vt), {
            "model-value": e.formData[n.field],
            disabled: h(n),
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
          S("label", Da, O(n.switchLabel || n.label), 1)
        ])) : n.type === "color" ? (g(), M("div", Ca, [
          S("label", xa, [
            Be(O(n.label) + " ", 1),
            n.required ? (g(), M("span", Sa, "*")) : U("", !0)
          ]),
          S("div", Ea, [
            B(b(Mt), {
              "model-value": u(n),
              disabled: h(n),
              "onUpdate:modelValue": (f) => k(n, f)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
            B(b(we), {
              "model-value": e.formData[n.field],
              class: "w-28",
              maxlength: "7",
              placeholder: "#000000",
              disabled: h(n),
              "onUpdate:modelValue": (f) => r("update:field", n.field, f)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
          ])
        ])) : n.type === "image" ? (g(), M("div", Pa, [
          S("label", Va, O(n.label), 1),
          K(d.$slots, `image-${n.field}`, {
            field: n,
            formData: e.formData
          }, () => [
            S("input", {
              type: "file",
              accept: n.accept || "image/*",
              disabled: h(n),
              onChange: (f) => {
                var C;
                const F = ((C = f.target.files) == null ? void 0 : C[0]) ?? null;
                r("update:field", n.field, F);
              }
            }, null, 40, Ma)
          ])
        ])) : (g(), M("div", {
          key: 3,
          class: Re(n.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
        }, [
          S("label", Aa, [
            Be(O(n.label) + " ", 1),
            n.required ? (g(), M("span", Fa, "*")) : U("", !0)
          ]),
          (!n.type || n.type === "text") && n.mask ? Ve((g(), Y(b(we), {
            key: 0,
            "model-value": e.formData[n.field],
            fluid: "",
            autofocus: E(n) || void 0,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
            [b(nt), { mask: L(n.mask) }]
          ]) : !n.type || n.type === "text" ? (g(), Y(b(we), {
            key: 1,
            "model-value": e.formData[n.field],
            fluid: "",
            autofocus: E(n) || void 0,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "email" ? (g(), Y(b(we), {
            key: 2,
            "model-value": e.formData[n.field],
            type: "email",
            fluid: "",
            autofocus: E(n) || void 0,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "password" ? (g(), Y(b(At), {
            key: 3,
            "model-value": e.formData[n.field],
            fluid: "",
            "toggle-mask": "",
            feedback: n.feedback !== !1,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "number" ? (g(), Y(b(Qe), {
            key: 4,
            "model-value": e.formData[n.field],
            fluid: "",
            locale: "pt-BR",
            min: n.min,
            max: n.max,
            "min-fraction-digits": n.minFractionDigits,
            "max-fraction-digits": n.maxFractionDigits,
            suffix: n.suffix,
            prefix: n.prefix,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "currency" ? (g(), Y(b(Qe), {
            key: 5,
            "model-value": e.formData[n.field],
            fluid: "",
            mode: "currency",
            currency: "BRL",
            locale: "pt-BR",
            min: n.min,
            max: n.max,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "select" ? (g(), Y(b(Pt), {
            key: 6,
            "model-value": e.formData[n.field],
            fluid: "",
            options: m(n.options),
            "option-label": n.optionLabel || "label",
            "option-value": n.optionValue || "value",
            "show-clear": n.showClear !== !1,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "autocomplete" ? (g(), Y(b(ct), {
            key: 7,
            "model-value": N(n),
            fluid: "",
            suggestions: l(n),
            "option-label": n.optionLabel || "label",
            placeholder: n.placeholder,
            disabled: h(n),
            onComplete: (f) => p(n, f),
            onItemSelect: (f) => D(n, f),
            onClear: (f) => r("update:field", n.field, null)
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : n.type === "fk" ? (g(), Y(Dt, {
            key: 8,
            "model-value": e.formData[n.field],
            endpoint: n.endpoint,
            "option-label": n.optionLabel || "nome",
            placeholder: n.placeholder,
            disabled: h(n),
            "show-clear": n.showClear !== !1,
            "dialog-header": n.label,
            "crud-fields": n.crudFields,
            "crud-columns": n.crudColumns,
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "endpoint", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : n.type === "date" ? (g(), Y(b(Ge), {
            key: 9,
            "model-value": e.formData[n.field],
            fluid: "",
            "date-format": n.dateFormat || "dd/mm/yy",
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "datetime" ? (g(), Y(b(Ge), {
            key: 10,
            "model-value": e.formData[n.field],
            fluid: "",
            "show-time": "",
            "hour-format": n.hourFormat || "24",
            "date-format": n.dateFormat || "dd/mm/yy",
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "cpf_cnpj" ? (g(), Y(b(we), {
            key: 11,
            "model-value": j(e.formData[n.field]),
            fluid: "",
            maxlength: "18",
            placeholder: n.placeholder || "000.000.000-00",
            disabled: h(n),
            invalid: !!i[n.field],
            onInput: (f) => V(n.field, f),
            onBlur: (f) => A(n)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : n.type === "mask" ? Ve((g(), Y(b(we), {
            key: 12,
            "model-value": e.formData[n.field],
            fluid: "",
            placeholder: n.placeholder,
            disabled: h(n),
            invalid: !!i[n.field],
            "onUpdate:modelValue": (f) => r("update:field", n.field, f),
            onBlur: (f) => A(n)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
            [b(nt), { mask: L(n.mask) }]
          ]) : n.type === "textarea" ? (g(), Y(b(Et), {
            key: 13,
            "model-value": e.formData[n.field],
            fluid: "",
            autofocus: E(n) || void 0,
            rows: n.rows || 3,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (f) => r("update:field", n.field, f)
          }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : U("", !0),
          i[n.field] ? (g(), M("small", Ya, O(i[n.field]), 1)) : U("", !0)
        ], 2))
      ])), 128))
    ]));
  }
}), Ra = { class: "w-crud-form-footer" }, Xe = /* @__PURE__ */ ue({
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
    const a = e, o = t, r = I(null);
    function i() {
      r.value ? r.value.validateAll().length === 0 && o("save") : o("save");
    }
    return We(
      () => a.visible,
      (c) => {
        c && r.value && r.value.clearErrors();
      }
    ), (c, h) => (g(), Y(b(dt), {
      visible: e.visible,
      header: e.title,
      style: Ye({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": h[2] || (h[2] = (m) => o("update:visible", m))
    }, {
      default: Z(() => [
        S("form", {
          class: "w-crud-form",
          onSubmit: xt(i, ["prevent"])
        }, [
          B(Ta, {
            ref_key: "rendererRef",
            ref: r,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            "onUpdate:field": h[0] || (h[0] = (m, w) => o("update:field", m, w))
          }, qe({ _: 2 }, [
            me(e.fields, (m) => ({
              name: `field-${m.field}`,
              fn: Z((w) => [
                K(c.$slots, `field-${m.field}`, He(Ke(w)))
              ])
            })),
            me(e.fields.filter((m) => m.type === "image"), (m) => ({
              name: `image-${m.field}`,
              fn: Z((w) => [
                K(c.$slots, `image-${m.field}`, He(Ke(w)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing"]),
          S("div", Ra, [
            K(c.$slots, "footer", { saving: e.saving }, () => [
              B(b(ae), {
                type: "button",
                label: "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: h[1] || (h[1] = (m) => o("update:visible", !1))
              }, null, 8, ["disabled"]),
              B(b(ae), {
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
}), Ia = { class: "w-crud" }, La = {
  key: 0,
  class: "w-crud-header"
}, Na = { class: "w-crud-header-content" }, za = { class: "w-crud-title" }, ja = {
  key: 0,
  class: "w-crud-subtitle"
}, Ua = { class: "w-crud-header-actions" }, Oa = {
  key: 0,
  class: "w-crud-kpis"
}, Wa = { class: "w-crud-kpi-content" }, Ba = { class: "w-crud-kpi-label" }, qa = { class: "w-crud-kpi-value" }, Ha = { class: "w-crud-table" }, Ka = { class: "w-crud-toolbar" }, Za = { class: "w-crud-toolbar-start" }, Ja = { class: "w-crud-toolbar-end" }, Xa = { class: "w-crud-actions" }, Qa = /* @__PURE__ */ ue({
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
    const a = e, o = t, { formatNumber: r } = Ze(), i = I({}), c = W(
      () => a.crud.config.columns.filter((l) => l.visible !== !1).map((l) => l.type === "number" && !l.align ? { ...l, align: "right" } : l.type === "currency" && !l.align ? { ...l, align: "right" } : l)
    );
    function h(l) {
      if (l.align === "right") return "text-right";
      if (l.align === "center") return "text-center";
    }
    const m = W(() => {
      const l = [];
      return a.crud.config.canCreate !== !1 && a.crud.config.canEdit !== !1 && l.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canDelete !== !1 && l.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), l;
    }), w = W(
      () => a.crud.config.rowActions ?? m.value
    ), E = W(() => w.value.length > 0);
    function L(l, p) {
      l.action === "edit" ? a.crud.openEditDialog(p) : l.action === "delete" ? a.crud.confirmDelete(p) : l.handler && l.handler(p);
    }
    function j(l, p) {
      return l.visible ? l.visible(p) : !0;
    }
    function V(l, p) {
      return l.disabled ? l.disabled(p) : !1;
    }
    const R = W(() => {
      const l = [];
      return a.showKpi && l.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: r(a.crud.pagination.rows, 0)
      }), l.push(...a.extraKpis), l;
    });
    W(() => a.crud.config.labels ?? {});
    const N = W(() => a.crud.config.canCreate !== !1);
    return St(() => {
      a.autoInit && a.crud.init();
    }), (l, p) => {
      const D = lt("tooltip");
      return g(), M("div", Ia, [
        e.showHeader ? (g(), M("div", La, [
          S("div", Na, [
            S("h1", za, O(e.title), 1),
            e.subtitle ? (g(), M("p", ja, O(e.subtitle), 1)) : U("", !0)
          ]),
          S("div", Ua, [
            K(l.$slots, "header-actions"),
            N.value ? (g(), Y(b(ae), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: p[0] || (p[0] = (u) => e.crud.openCreateDialog())
            })) : U("", !0)
          ])
        ])) : U("", !0),
        K(l.$slots, "before-table", {}, () => [
          R.value.length ? (g(), M("div", Oa, [
            (g(!0), M(fe, null, me(R.value, (u, k) => (g(), M("div", {
              key: k,
              class: "w-crud-kpi"
            }, [
              S("div", {
                class: Re(["w-crud-kpi-icon", u.severity ? `w-crud-kpi-icon--${u.severity}` : ""])
              }, [
                S("i", {
                  class: Re([u.icon]),
                  style: Ye(u.color ? `color: ${u.color}` : "")
                }, null, 6)
              ], 2),
              S("div", Wa, [
                S("div", Ba, O(u.label), 1),
                S("div", qa, O(u.value), 1)
              ])
            ]))), 128))
          ])) : U("", !0)
        ]),
        S("div", Ha, [
          B(b(rt), {
            value: e.crud.items.value,
            loading: e.crud.loading.value,
            "expanded-rows": i.value,
            "onUpdate:expandedRows": p[2] || (p[2] = (u) => i.value = u),
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
            onSort: p[3] || (p[3] = (u) => e.crud.onSort({ sortField: u.sortField, sortOrder: u.sortOrder })),
            onRowExpand: p[4] || (p[4] = (u) => o("row-expand", u.data)),
            onRowCollapse: p[5] || (p[5] = (u) => o("row-collapse", u.data))
          }, qe({
            header: Z(() => [
              S("div", Ka, [
                S("div", Za, [
                  e.showSearch ? (g(), Y(b(st), { key: 0 }, {
                    default: Z(() => [
                      B(b(it), { class: "pi pi-search" }),
                      B(b(we), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : U("", !0),
                  K(l.$slots, "toolbar-start"),
                  K(l.$slots, "toolbar-filters")
                ]),
                S("div", Ja, [
                  K(l.$slots, "toolbar-actions"),
                  !e.showHeader && N.value ? (g(), Y(b(ae), {
                    key: 0,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: p[1] || (p[1] = (u) => e.crud.openCreateDialog())
                  })) : U("", !0)
                ])
              ])
            ]),
            empty: Z(() => [
              K(l.$slots, "empty", {}, () => [
                p[9] || (p[9] = S("div", { class: "w-crud-empty" }, [
                  S("div", { class: "w-crud-empty-icon" }, [
                    S("i", { class: "pi pi-inbox" })
                  ]),
                  S("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                  S("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                ], -1))
              ])
            ]),
            default: Z(() => [
              e.expandable ? (g(), Y(b(Me), {
                key: 0,
                expander: "",
                style: { width: "3rem" }
              })) : U("", !0),
              (g(!0), M(fe, null, me(c.value, (u) => (g(), Y(b(Me), {
                key: u.field,
                field: u.field,
                header: u.header,
                sortable: u.sortable,
                style: Ye(u.style),
                "header-class": h(u),
                "body-class": h(u)
              }, {
                body: Z(({ data: k }) => [
                  K(l.$slots, `column-${u.field}`, {
                    data: k,
                    value: k[u.field]
                  }, () => [
                    B(Je, {
                      column: u,
                      value: k[u.field],
                      "row-data": k
                    }, null, 8, ["column", "value", "row-data"])
                  ])
                ]),
                _: 2
              }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
              E.value ? (g(), Y(b(Me), {
                key: 1,
                "header-class": "w-crud-actions-header",
                style: Ye({ width: `${w.value.length * 2.5 + 1}rem` })
              }, {
                body: Z(({ data: u }) => [
                  K(l.$slots, "row-actions", {
                    data: u,
                    crud: e.crud
                  }, () => [
                    S("div", Xa, [
                      (g(!0), M(fe, null, me(w.value, (k) => (g(), M(fe, {
                        key: k.action
                      }, [
                        j(k, u) ? Ve((g(), Y(b(ae), {
                          key: 0,
                          icon: k.icon,
                          text: "",
                          rounded: "",
                          size: "small",
                          severity: k.severity,
                          disabled: V(k, u),
                          onClick: (A) => L(k, u)
                        }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                          [
                            D,
                            k.tooltip,
                            void 0,
                            { top: !0 }
                          ]
                        ]) : U("", !0)
                      ], 64))), 128))
                    ])
                  ])
                ]),
                _: 3
              }, 8, ["style"])) : U("", !0)
            ]),
            _: 2
          }, [
            e.expandable ? {
              name: "expansion",
              fn: Z((u) => [
                K(l.$slots, "expansion", {
                  data: u.data
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "onPage"])
        ]),
        K(l.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => [
          B(Xe, {
            visible: e.crud.dialogVisible.value,
            title: e.crud.dialogTitle.value,
            fields: e.crud.config.form,
            "form-data": e.crud.formData,
            "is-editing": e.crud.isEditing.value,
            saving: e.crud.saving.value,
            width: e.dialogWidth,
            "onUpdate:visible": p[6] || (p[6] = (u) => {
              e.crud.dialogVisible.value = u, u || (e.crud.editingItem.value = null);
            }),
            "onUpdate:field": p[7] || (p[7] = (u, k) => e.crud.setFormField(u, k)),
            onSave: p[8] || (p[8] = (u) => e.crud.save())
          }, qe({ _: 2 }, [
            me(e.crud.config.form, (u) => ({
              name: `field-${u.field}`,
              fn: Z((k) => [
                K(l.$slots, `field-${u.field}`, He(Ke(k)))
              ])
            }))
          ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])
        ])
      ]);
    };
  }
}), Ga = /* @__PURE__ */ ue({
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
    }, o = W(() => (t.map ?? a)[t.value] ?? { label: t.value, severity: "secondary" });
    return (r, i) => (g(), Y(b(ut), {
      value: o.value.label,
      severity: o.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), _a = { class: "w-page-header" }, eo = { class: "w-page-header-content" }, to = { class: "w-page-header-title" }, ao = {
  key: 0,
  class: "w-page-header-subtitle"
}, oo = { class: "w-page-header-actions" }, Bo = /* @__PURE__ */ ue({
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
    return (o, r) => (g(), M("div", _a, [
      S("div", eo, [
        S("h2", to, O(e.title), 1),
        e.subtitle ? (g(), M("p", ao, O(e.subtitle), 1)) : U("", !0)
      ]),
      S("div", oo, [
        K(o.$slots, "actions"),
        e.actionLabel ? (g(), Y(b(ae), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: r[0] || (r[0] = (i) => a("action"))
        }, null, 8, ["label", "icon"])) : U("", !0)
      ])
    ]));
  }
}), no = { class: "w-empty-state" }, lo = { class: "w-empty-state-icon" }, ro = { class: "w-empty-state-title" }, so = {
  key: 0,
  class: "w-empty-state-description"
}, qo = /* @__PURE__ */ ue({
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
    return (o, r) => (g(), M("div", no, [
      S("div", lo, [
        S("i", {
          class: Re(e.icon)
        }, null, 2)
      ]),
      S("p", ro, O(e.title), 1),
      e.description ? (g(), M("p", so, O(e.description), 1)) : U("", !0),
      e.actionLabel ? (g(), Y(b(ae), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: r[0] || (r[0] = (i) => a("action"))
      }, null, 8, ["label", "icon"])) : U("", !0)
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
  return Se(io);
}
const co = { class: "w-detail-header" }, fo = { class: "w-detail-header-left" }, mo = { class: "w-detail-header-content" }, po = { class: "w-detail-header-title" }, vo = {
  key: 0,
  class: "w-detail-header-subtitle"
}, go = { class: "w-detail-header-actions" }, Ho = /* @__PURE__ */ ue({
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
    function o() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (r, i) => (g(), M("div", co, [
      S("div", fo, [
        B(b(ae), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: o
        }),
        e.icon ? (g(), M("i", {
          key: 0,
          class: Re([e.icon, "w-detail-header-icon"])
        }, null, 2)) : U("", !0),
        S("div", mo, [
          S("h2", po, O(e.title), 1),
          e.subtitle ? (g(), M("p", vo, O(e.subtitle), 1)) : U("", !0)
        ]),
        e.status ? (g(), Y(Ga, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : U("", !0)
      ]),
      S("div", go, [
        K(r.$slots, "actions")
      ])
    ]));
  }
}), ho = { class: "w-info-card" }, yo = {
  key: 0,
  class: "w-info-card-title"
}, bo = { class: "w-info-card-grid" }, wo = { class: "w-info-card-label" }, ko = { class: "w-info-card-value" }, Ko = /* @__PURE__ */ ue({
  __name: "WInfoCard",
  props: {
    title: {},
    fields: {}
  },
  setup(e) {
    const { formatCurrency: t, formatDate: a, formatNumber: o } = Ze();
    function r(i) {
      const c = i.value;
      return c == null || c === "" ? "-" : i.format === "currency" ? t(Number(c)) : i.format === "date" ? a(String(c)) : i.format === "datetime" ? a(String(c), "DD/MM/YYYY HH:mm") : i.format === "number" ? o(Number(c)) : String(c);
    }
    return (i, c) => (g(), M("div", ho, [
      e.title ? (g(), M("h3", yo, O(e.title), 1)) : U("", !0),
      S("div", bo, [
        (g(!0), M(fe, null, me(e.fields, (h) => (g(), M("div", {
          key: h.label,
          class: "w-info-card-field"
        }, [
          S("span", wo, O(h.label), 1),
          S("span", ko, O(r(h)), 1)
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
    e.provide(je, t.axios), e.provide(Ue, a), t.registerComponents !== !1 && (e.component("WCrudView", Qa), e.component("WCrudFormDialog", Xe), e.component("WCrudColumnRenderer", Je), e.component("WAutoCompleteFK", Dt));
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
    form: o,
    pk: r = "id",
    searchDebounce: i = 300,
    canCreate: c = !0,
    canEdit: h = !0,
    canDelete: m = !0,
    rowActions: w = void 0,
    filterParams: E = void 0,
    transformPayload: L = void 0,
    onAfterSave: j = void 0,
    onAfterDelete: V = void 0
  } = e, R = Se(je);
  if (!R)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const N = R, l = Se(Ue), p = e.pageSize ?? (l == null ? void 0 : l.defaultPageSize) ?? 20, D = { ...$o, ...e.labels }, u = kt(), { confirmDelete: k } = $t(), A = I([]), Q = I({}), T = I(!1), d = I(!1), $ = I(""), n = I(!1), f = I(null), F = pe({}), C = pe({
    page: 1,
    pageSize: p,
    rows: 0,
    totalPages: 0
  }), q = pe({
    field: null,
    order: 0
  });
  function G() {
    const y = {};
    for (const s of o)
      y[s.field] = s.defaultValue !== void 0 ? typeof s.defaultValue == "function" ? s.defaultValue() : s.defaultValue : null;
    return y;
  }
  const _ = G();
  for (const y of Object.keys(_))
    F[y] = _[y];
  const oe = W(() => f.value !== null), ee = W(
    () => oe.value ? D.editTitle : D.createTitle
  ), le = W(() => C.page <= 1), re = W(() => C.page >= C.totalPages);
  let H = null;
  async function te(y = {}) {
    T.value = !0;
    try {
      const s = {
        page: C.page,
        page_size: C.pageSize,
        ...y
      };
      $.value && (s.search = $.value), q.field && q.order !== 0 && (s.ordering = q.order === -1 ? `-${q.field}` : q.field), E && Object.assign(s, E());
      const P = (await N.get(t, { params: s })).data;
      Array.isArray(P.results) ? (A.value = P.results, C.rows = P.count ?? 0) : (A.value = P.data ?? [], C.rows = P.rows ?? 0), P.extras && (Q.value = P.extras), P.page && (C.page = P.page), P.page_size && (C.pageSize = P.page_size), C.totalPages = Math.ceil(C.rows / C.pageSize) || 0;
    } finally {
      T.value = !1;
    }
  }
  async function ve() {
    await te();
  }
  async function Ae() {
    await te();
  }
  function Pe(y) {
    $.value = y, H && clearTimeout(H), H = setTimeout(() => {
      C.page = 1, te();
    }, i);
  }
  function de(y) {
    const s = y.target;
    Pe(s.value);
  }
  function ce(y) {
    C.page = y, te();
  }
  function se() {
    ce(1);
  }
  function ne() {
    ce(C.totalPages);
  }
  function ge(y) {
    C.page = y.page + 1, C.pageSize = y.rows, te();
  }
  function $e(y) {
    q.field = y.sortField ?? null, q.order = y.sortOrder ?? 0, C.page = 1, te();
  }
  function he() {
    const y = G();
    for (const s of Object.keys(y))
      F[s] = y[s];
  }
  function De(y, s) {
    F[y] = s;
  }
  function ye() {
    f.value = null, he(), n.value = !0;
  }
  function be(y) {
    f.value = y;
    for (const s of o) {
      let v = y[s.field] !== void 0 ? y[s.field] : null;
      v && (s.type === "date" || s.type === "datetime") && typeof v == "string" && (v = ft(v)), F[s.field] = v;
    }
    n.value = !0;
  }
  async function Ce() {
    for (const y of o) {
      if (y.validate) {
        const s = y.validate(F[y.field]);
        if (s)
          return u.error(s), null;
      }
      if (y.required) {
        const s = F[y.field];
        if (s == null || s === "")
          return u.error(`${y.label} é obrigatório`), null;
      }
    }
    d.value = !0;
    try {
      let y = { ...F };
      for (const z of o) {
        const X = y[z.field];
        if (z.type === "date" && X instanceof Date ? y[z.field] = mt(X) : z.type === "datetime" && X instanceof Date && (y[z.field] = pt(X)), z.type === "fk" && X !== null && typeof X == "object") {
          const ie = z.optionValue || "id";
          y[z.field] = X[ie] ?? X;
        }
        (z.type === "mask" || z.type === "cpf_cnpj") && typeof X == "string" && (y[z.field] = ke(X));
      }
      L && (y = L(y, oe.value));
      const s = o.some(
        (z) => z.type === "image" && y[z.field] instanceof File
      );
      let v = y, P;
      if (s) {
        const z = new Set(
          o.filter((ie) => ie.type === "image").map((ie) => ie.field)
        ), X = new FormData();
        for (const [ie, Fe] of Object.entries(y))
          if (Fe != null)
            if (Fe instanceof File)
              X.append(ie, Fe);
            else {
              if (z.has(ie))
                continue;
              X.append(ie, String(Fe));
            }
        v = X, P = { "Content-Type": "multipart/form-data" };
      }
      const x = P ? { headers: P } : void 0;
      let J;
      if (oe.value && f.value) {
        const z = f.value[r];
        J = await N.patch(
          `${t}${z}/`,
          v,
          x
        );
        const X = A.value.findIndex(
          (ie) => ie[r] === z
        );
        X !== -1 && (A.value[X] = J.data), u.success(D.successUpdate);
      } else
        J = await N.post(t, v, x), A.value.unshift(J.data), C.rows++, u.success(D.successCreate);
      return n.value = !1, f.value = null, j && j(J.data, oe.value), J.data;
    } catch (y) {
      return u.error(Ie(y, "Erro ao salvar registro")), null;
    } finally {
      d.value = !1;
    }
  }
  function xe(y) {
    k(async () => {
      try {
        const s = y[r];
        await N.delete(`${t}${s}/`);
        const v = A.value.findIndex(
          (P) => P[r] === s
        );
        v !== -1 && (A.value.splice(v, 1), C.rows--), u.success(D.successDelete), V && V(y);
      } catch (s) {
        u.error(Ie(s, "Erro ao excluir registro"));
      }
    }, D.deleteConfirmMessage);
  }
  return {
    items: A,
    extras: Q,
    loading: T,
    saving: d,
    search: $,
    dialogVisible: n,
    editingItem: f,
    formData: F,
    pagination: C,
    sort: q,
    isEditing: oe,
    dialogTitle: ee,
    isFirstPage: le,
    isLastPage: re,
    init: ve,
    fetchItems: te,
    refresh: Ae,
    setSearch: Pe,
    onSearch: de,
    onPage: ge,
    onSort: $e,
    openCreateDialog: ye,
    openEditDialog: be,
    save: Ce,
    confirmDelete: xe,
    setFormField: De,
    resetForm: he,
    goToPage: ce,
    firstPage: se,
    lastPage: ne,
    config: e
  };
}
function Xo(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: o = !1 } = e, r = Se(je);
  if (!r)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const i = r, c = Se(Ue), h = e.pageSize ?? (c == null ? void 0 : c.defaultPageSize) ?? 20, m = I([]), w = I(!1), E = I(""), L = I({}), j = pe({}), V = pe({
    page: 1,
    pageSize: h,
    rows: 0,
    totalPages: 0
  }), R = pe({
    field: null,
    order: 0
  });
  let N = null;
  async function l(T = {}) {
    w.value = !0;
    try {
      const d = {
        page: V.page,
        page_size: V.pageSize,
        ...T
      };
      E.value && (d.search = E.value), R.field && R.order !== 0 && (d.ordering = R.order === -1 ? `-${R.field}` : R.field);
      for (const [F, C] of Object.entries(j))
        C != null && C !== "" && (d[F] = C);
      const f = (await i.get(t, {
        params: d
      })).data;
      Array.isArray(f.results) ? (m.value = f.results, V.rows = f.count ?? 0) : (m.value = f.data ?? [], V.rows = f.rows ?? 0), f.page && (V.page = f.page), f.page_size && (V.pageSize = f.page_size), V.totalPages = Math.ceil(V.rows / V.pageSize) || 0, L.value = f.extras ?? {};
    } finally {
      w.value = !1;
    }
  }
  async function p() {
    await l();
  }
  function D(T) {
    E.value = T, N && clearTimeout(N), N = setTimeout(() => {
      V.page = 1, l();
    }, a);
  }
  function u(T, d) {
    j[T] = d, V.page = 1, l();
  }
  function k() {
    for (const T of Object.keys(j))
      delete j[T];
    V.page = 1, l();
  }
  function A(T) {
    V.page = T.page + 1, V.pageSize = T.rows, l();
  }
  function Q(T) {
    R.field = T.sortField ?? null, R.order = T.sortOrder ?? 0, V.page = 1, l();
  }
  return o && l(), {
    items: m,
    loading: w,
    search: E,
    pagination: V,
    sort: R,
    extras: L,
    fetchItems: l,
    refresh: p,
    setSearch: D,
    setFilter: u,
    clearFilters: k,
    onPage: A,
    onSort: Q
  };
}
export {
  $o as DEFAULT_CRUD_LABELS,
  Dt as WAutoCompleteFK,
  Je as WCrudColumnRenderer,
  Xe as WCrudFormDialog,
  Qa as WCrudView,
  Ho as WDetailHeader,
  qo as WEmptyState,
  Ta as WFormRenderer,
  Ko as WInfoCard,
  Bo as WPageHeader,
  Zo as WPrimeVuePlugin,
  Ga as WStatusTag,
  je as W_AXIOS_KEY,
  Ue as W_CONFIG_KEY,
  Ie as extractApiError,
  ca as mapApiFieldToColumnDef,
  ia as mapApiFieldToFieldDef,
  fa as mapApiFieldsToColumnDefs,
  ua as mapApiFieldsToFieldDefs,
  Xo as useApi,
  Wo as useApiError,
  $t as useAppConfirm,
  kt as useAppToast,
  Jo as useCrudManager,
  Ze as useFormatters
};
//# sourceMappingURL=index.js.map
