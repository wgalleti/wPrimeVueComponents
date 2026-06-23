import { inject as Ie, defineComponent as re, openBlock as s, createElementBlock as p, createBlock as F, unref as v, toDisplayString as T, ref as q, watch as nt, computed as H, reactive as ge, resolveDirective as kt, Fragment as le, createElementVNode as h, createVNode as N, withDirectives as ce, withCtx as ne, createCommentVNode as k, renderList as se, normalizeStyle as je, createTextVNode as Ee, normalizeClass as ie, renderSlot as W, isRef as jt, withModifiers as Ut, createSlots as ot, normalizeProps as lt, guardReactiveProps as st, useSlots as qt, onMounted as Ht, createStaticVNode as Kt } from "vue";
import $t from "primevue/datatable";
import ze from "primevue/column";
import ae from "primevue/button";
import fe from "primevue/inputtext";
import qe from "primevue/iconfield";
import He from "primevue/inputicon";
import Gt from "primevue/paginator";
import Jt from "primevue/contextmenu";
import Ct from "primevue/tag";
import Te from "dayjs";
import Dt from "primevue/dialog";
import ct from "primevue/inputnumber";
import Zt from "primevue/textarea";
import Xt from "primevue/select";
import xt from "primevue/autocomplete";
import ft from "primevue/datepicker";
import Qt from "primevue/toggleswitch";
import _t from "primevue/colorpicker";
import ea from "primevue/password";
import { useToast as ta } from "primevue/usetoast";
import { useConfirm as aa } from "primevue/useconfirm";
import na from "primevue/inputgroup";
import mt from "primevue/inputgroupaddon";
import Ge from "primevue/skeleton";
const oa = Symbol("w-axios"), _e = Symbol("w-data-provider"), et = Symbol("w-config");
function la(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ze = { exports: {} }, sa = Ze.exports, pt;
function ia() {
  return pt || (pt = 1, (function(e, t) {
    (function(a, o) {
      e.exports = o();
    })(sa, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, o = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, l = /\d/, i = /\d\d/, r = /\d\d?/, y = /\d*[^-_:/,()\s\d]+/, d = {}, w = function(g) {
        return (g = +g) + (g > 68 ? 1900 : 2e3);
      }, M = function(g) {
        return function(b) {
          this[g] = +b;
        };
      }, S = [/[+-]\d\d:?(\d\d)?|Z/, function(g) {
        (this.zone || (this.zone = {})).offset = (function(b) {
          if (!b || b === "Z") return 0;
          var $ = b.match(/([+-]|\d\d)/g), V = 60 * $[1] + (+$[2] || 0);
          return V === 0 ? 0 : $[0] === "+" ? -V : V;
        })(g);
      }], Y = function(g) {
        var b = d[g];
        return b && (b.indexOf ? b : b.s.concat(b.f));
      }, z = function(g, b) {
        var $, V = d.meridiem;
        if (V) {
          for (var L = 1; L <= 24; L += 1) if (g.indexOf(V(L, 0, b)) > -1) {
            $ = L > 12;
            break;
          }
        } else $ = g === (b ? "pm" : "PM");
        return $;
      }, Z = { A: [y, function(g) {
        this.afternoon = z(g, !1);
      }], a: [y, function(g) {
        this.afternoon = z(g, !0);
      }], Q: [l, function(g) {
        this.month = 3 * (g - 1) + 1;
      }], S: [l, function(g) {
        this.milliseconds = 100 * +g;
      }], SS: [i, function(g) {
        this.milliseconds = 10 * +g;
      }], SSS: [/\d{3}/, function(g) {
        this.milliseconds = +g;
      }], s: [r, M("seconds")], ss: [r, M("seconds")], m: [r, M("minutes")], mm: [r, M("minutes")], H: [r, M("hours")], h: [r, M("hours")], HH: [r, M("hours")], hh: [r, M("hours")], D: [r, M("day")], DD: [i, M("day")], Do: [y, function(g) {
        var b = d.ordinal, $ = g.match(/\d+/);
        if (this.day = $[0], b) for (var V = 1; V <= 31; V += 1) b(V).replace(/\[|\]/g, "") === g && (this.day = V);
      }], w: [r, M("week")], ww: [i, M("week")], M: [r, M("month")], MM: [i, M("month")], MMM: [y, function(g) {
        var b = Y("months"), $ = (Y("monthsShort") || b.map((function(V) {
          return V.slice(0, 3);
        }))).indexOf(g) + 1;
        if ($ < 1) throw new Error();
        this.month = $ % 12 || $;
      }], MMMM: [y, function(g) {
        var b = Y("months").indexOf(g) + 1;
        if (b < 1) throw new Error();
        this.month = b % 12 || b;
      }], Y: [/[+-]?\d+/, M("year")], YY: [i, function(g) {
        this.year = w(g);
      }], YYYY: [/\d{4}/, M("year")], Z: S, ZZ: S };
      function J(g) {
        var b, $;
        b = g, $ = d && d.formats;
        for (var V = (g = b.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(oe, _, ee) {
          var f = ee && ee.toUpperCase();
          return _ || $[ee] || a[ee] || $[f].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(x, u, n) {
            return u || n.slice(1);
          }));
        }))).match(o), L = V.length, U = 0; U < L; U += 1) {
          var K = V[U], O = Z[K], G = O && O[0], X = O && O[1];
          V[U] = X ? { regex: G, parser: X } : K.replace(/^\[|\]$/g, "");
        }
        return function(oe) {
          for (var _ = {}, ee = 0, f = 0; ee < L; ee += 1) {
            var x = V[ee];
            if (typeof x == "string") f += x.length;
            else {
              var u = x.regex, n = x.parser, m = oe.slice(f), c = u.exec(m)[0];
              n.call(_, c), oe = oe.replace(c, "");
            }
          }
          return (function(I) {
            var A = I.afternoon;
            if (A !== void 0) {
              var j = I.hours;
              A ? j < 12 && (I.hours += 12) : j === 12 && (I.hours = 0), delete I.afternoon;
            }
          })(_), _;
        };
      }
      return function(g, b, $) {
        $.p.customParseFormat = !0, g && g.parseTwoDigitYear && (w = g.parseTwoDigitYear);
        var V = b.prototype, L = V.parse;
        V.parse = function(U) {
          var K = U.date, O = U.utc, G = U.args;
          this.$u = O;
          var X = G[1];
          if (typeof X == "string") {
            var oe = G[2] === !0, _ = G[3] === !0, ee = oe || _, f = G[2];
            _ && (f = G[2]), d = this.$locale(), !oe && f && (d = $.Ls[f]), this.$d = (function(m, c, I, A) {
              try {
                if (["x", "X"].indexOf(c) > -1) return new Date((c === "X" ? 1e3 : 1) * m);
                var j = J(c)(m), de = j.year, pe = j.month, Ne = j.day, Ye = j.hours, he = j.minutes, me = j.seconds, ye = j.milliseconds, ve = j.zone, De = j.week, xe = /* @__PURE__ */ new Date(), Fe = Ne || (de || pe ? 1 : xe.getDate()), ke = de || xe.getFullYear(), Se = 0;
                de && !pe || (Se = pe > 0 ? pe - 1 : xe.getMonth());
                var Pe, Ae = Ye || 0, Re = he || 0, $e = me || 0, C = ye || 0;
                return ve ? new Date(Date.UTC(ke, Se, Fe, Ae, Re, $e, C + 60 * ve.offset * 1e3)) : I ? new Date(Date.UTC(ke, Se, Fe, Ae, Re, $e, C)) : (Pe = new Date(ke, Se, Fe, Ae, Re, $e, C), De && (Pe = A(Pe).week(De).toDate()), Pe);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(K, X, O, $), this.init(), f && f !== !0 && (this.$L = this.locale(f).$L), ee && K != this.format(X) && (this.$d = /* @__PURE__ */ new Date("")), d = {};
          } else if (X instanceof Array) for (var x = X.length, u = 1; u <= x; u += 1) {
            G[1] = X[u - 1];
            var n = $.apply(this, G);
            if (n.isValid()) {
              this.$d = n.$d, this.$L = n.$L, this.init();
              break;
            }
            u === x && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else L.call(this, U);
        };
      };
    }));
  })(Ze)), Ze.exports;
}
var ra = ia();
const ua = /* @__PURE__ */ la(ra);
Te.extend(ua);
function it(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const t = Te(e, "YYYY-MM-DD", !0);
  return t.isValid() ? t.toDate() : Te(e).toDate();
}
function St(e) {
  return e ? typeof e == "string" ? e : Te(e).format("YYYY-MM-DD") : null;
}
function Pt(e) {
  return e ? typeof e == "string" ? e : Te(e).toISOString() : null;
}
function da(e, t = "DD/MM/YYYY") {
  return e ? Te(e).format(t) : "—";
}
function ca(e) {
  return e ? Te(e).format("DD/MM/YYYY HH:mm") : "—";
}
function Me(e) {
  return e.replace(/\D/g, "");
}
function Vt(e) {
  if (!e) return "—";
  const t = Me(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function Et(e) {
  if (!e) return "—";
  const t = Me(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function fa(e) {
  if (!e) return "—";
  const t = Me(e);
  return t.length === 11 ? Vt(e) : t.length === 14 ? Et(e) : e;
}
function ma(e) {
  if (!e) return "—";
  const t = Me(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function Mt(e) {
  if (!e) return null;
  const t = Me(e);
  if (t.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(t)) return "CPF inválido.";
  let a = 0;
  for (let r = 0; r < 9; r++) a += parseInt(t[r]) * (10 - r);
  let o = a % 11;
  const l = o < 2 ? 0 : 11 - o;
  if (parseInt(t[9]) !== l) return "CPF inválido.";
  a = 0;
  for (let r = 0; r < 10; r++) a += parseInt(t[r]) * (11 - r);
  o = a % 11;
  const i = o < 2 ? 0 : 11 - o;
  return parseInt(t[10]) !== i ? "CPF inválido." : null;
}
function Ft(e) {
  if (!e) return null;
  const t = Me(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let o = 0;
  for (let d = 0; d < 12; d++) o += parseInt(t[d]) * a[d];
  let l = o % 11;
  const i = l < 2 ? 0 : 11 - l;
  if (parseInt(t[12]) !== i) return "CNPJ inválido.";
  const r = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  o = 0;
  for (let d = 0; d < 13; d++) o += parseInt(t[d]) * r[d];
  l = o % 11;
  const y = l < 2 ? 0 : 11 - l;
  return parseInt(t[13]) !== y ? "CNPJ inválido." : null;
}
function pa(e) {
  if (!e) return null;
  const t = Me(e);
  return t.length === 11 ? Mt(e) : t.length === 14 ? Ft(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const Xe = /* @__PURE__ */ new Map();
function vt(e, t) {
  const a = `${e}-${t}`;
  let o = Xe.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }), Xe.set(a, o)), o;
}
function va(e, t) {
  const a = `${e}-${t}`;
  let o = Xe.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    style: "currency",
    currency: t
  }), Xe.set(a, o)), o;
}
function rt() {
  const e = Ie(et, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), t = (e == null ? void 0 : e.locale) ?? "pt-BR", a = (e == null ? void 0 : e.currency) ?? "BRL";
  function o(d) {
    return d == null ? "—" : va(t, a).format(d);
  }
  function l(d, w = 2) {
    return d == null ? "—" : vt(t, w).format(d);
  }
  function i(d, w) {
    return da(d, w ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function r(d) {
    return ca(d);
  }
  function y(d) {
    return d == null ? "—" : `${vt(t, 2).format(d)}%`;
  }
  return {
    formatCurrency: o,
    formatNumber: l,
    formatDate: i,
    formatDateTime: r,
    formatPercent: y,
    formatCpf: Vt,
    formatCnpj: Et,
    formatCpfCnpj: fa,
    formatTelefone: ma,
    validateCpf: Mt,
    validateCnpj: Ft,
    validateCpfCnpj: pa,
    parseDate: it,
    toDateString: St,
    toDateTimeString: Pt
  };
}
const ga = {
  key: 0,
  class: "text-muted-color text-xs"
}, ha = ["src", "alt"], ya = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, ba = {
  key: 4,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, wa = {
  key: 5,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, ka = {
  key: 6,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, $a = {
  key: 7,
  class: "text-[0.8125rem]"
}, Qe = /* @__PURE__ */ re({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: o, formatNumber: l } = rt();
    return (i, r) => e.value == null ? (s(), p("span", ga, "—")) : e.column.type === "image" ? (s(), p("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, ha)) : e.column.type === "boolean" ? (s(), F(v(Ct), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (s(), p("span", ya, T(v(t)(e.value)), 1)) : e.column.type === "datetime" ? (s(), p("span", ba, T(v(a)(e.value)), 1)) : e.column.type === "currency" ? (s(), p("span", wa, T(v(o)(e.value)), 1)) : e.column.type === "number" ? (s(), p("span", ka, T(e.column.format ? e.column.format(e.value, e.rowData) : v(l)(e.value, e.column.decimals ?? 0)), 1)) : (s(), p("span", $a, T(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var Ca = Object.defineProperty, Da = (e, t, a) => t in e ? Ca(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, Ue = (e, t, a) => Da(e, typeof t != "symbol" ? t + "" : t, a);
const gt = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, ht = (e, t, a) => e.replaceAll(t, "").replace(a, ".").replace("..", ".").replace(/[^.\d]/g, ""), yt = (e, t, a) => {
  var o;
  return new Intl.NumberFormat(((o = a.number) == null ? void 0 : o.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
}, xa = (e, t = !0, a) => {
  var o, l, i, r;
  const y = ((o = a.number) == null ? void 0 : o.unsigned) !== !0 && e.startsWith("-") ? "-" : "", d = ((l = a.number) == null ? void 0 : l.fraction) ?? 0;
  let w = yt(0, d, a);
  const M = w.formatToParts(1000.12), S = ((i = M.find((g) => g.type === "group")) == null ? void 0 : i.value) ?? " ", Y = ((r = M.find((g) => g.type === "decimal")) == null ? void 0 : r.value) ?? ".", z = ht(e, S, Y);
  if (Number.isNaN(parseFloat(z))) return y;
  const Z = z.split(".");
  if (Z[1] != null && Z[1].length >= 1) {
    const g = Z[1].length <= d ? Z[1].length : d;
    w = yt(g, d, a);
  }
  let J = w.format(parseFloat(z));
  return t ? d > 0 && z.endsWith(".") && !z.slice(0, -1).includes(".") && (J += Y) : J = ht(J, S, Y), y + J;
}, At = (e) => JSON.parse(e.replaceAll("'", '"')), Sa = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = Pa(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = Je(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = Je(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = Je(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = Va(e.dataset.maskaTokens));
  const o = {};
  return e.dataset.maskaNumberLocale != null && (o.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (o.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (o.unsigned = Je(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(o).length > 0) && (a.number = o), a;
}, Je = (e) => e !== "" ? !!JSON.parse(e) : !0, Pa = (e) => e.startsWith("[") && e.endsWith("]") ? At(e) : e, Va = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return At(e);
  const t = {};
  return e.split("|").forEach((a) => {
    const o = a.split(":");
    t[o[0]] = {
      pattern: Rt() ? new RegExp(o[1], "u") : new RegExp(o[1]),
      optional: o[2] === "optional",
      multiple: o[2] === "multiple",
      repeated: o[2] === "repeated"
    };
  }), t;
}, Rt = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class Ea {
  constructor(t = {}) {
    Ue(this, "opts", {}), Ue(this, "memo", /* @__PURE__ */ new Map());
    const a = { ...t };
    if (a.tokens != null) {
      a.tokens = a.tokensReplace ? { ...a.tokens } : { ...gt, ...a.tokens };
      for (const o of Object.values(a.tokens))
        typeof o.pattern == "string" && (o.pattern = Rt() ? new RegExp(o.pattern, "u") : new RegExp(o.pattern));
    } else
      a.tokens = gt;
    Array.isArray(a.mask) && (a.mask.length > 1 ? a.mask = [...a.mask].sort((o, l) => o.length - l.length) : a.mask = a.mask[0] ?? ""), a.mask === "" && (a.mask = null), this.opts = a;
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
    return a.find((l) => this.process(t, l, !1).length >= o.length) ?? "";
  }
  escapeMask(t) {
    const a = [], o = [];
    return t.split("").forEach((l, i) => {
      l === "!" && t[i - 1] !== "!" ? o.push(i - o.length) : a.push(l);
    }), { mask: a.join(""), escaped: o };
  }
  process(t, a, o = !0) {
    if (this.opts.number != null) return xa(t, o, this.opts);
    if (a == null) return t;
    const l = `v=${t},mr=${a},m=${o ? 1 : 0}`;
    if (this.memo.has(l)) return this.memo.get(l);
    const { mask: i, escaped: r } = this.escapeMask(a), y = [], d = this.opts.tokens != null ? this.opts.tokens : {}, w = this.isReversed() ? -1 : 1, M = this.isReversed() ? "unshift" : "push", S = this.isReversed() ? 0 : i.length - 1, Y = this.isReversed() ? () => g > -1 && b > -1 : () => g < i.length && b < t.length, z = (V) => !this.isReversed() && V <= S || this.isReversed() && V >= S;
    let Z, J = -1, g = this.isReversed() ? i.length - 1 : 0, b = this.isReversed() ? t.length - 1 : 0, $ = !1;
    for (; Y(); ) {
      const V = i.charAt(g), L = d[V], U = (L == null ? void 0 : L.transform) != null ? L.transform(t.charAt(b)) : t.charAt(b);
      if (!r.includes(g) && L != null ? (U.match(L.pattern) != null ? (y[M](U), L.repeated ? (J === -1 ? J = g : g === S && g !== J && (g = J - w), S === J && (g -= w)) : L.multiple && ($ = !0, g -= w), g += w) : L.multiple ? $ && (g += w, b -= w, $ = !1) : U === Z ? Z = void 0 : L.optional && (g += w, b -= w), b += w) : (o && !this.isEager() && y[M](V), U === V && !this.isEager() ? b += w : Z = V, this.isEager() || (g += w)), this.isEager())
        for (; z(g) && (d[i.charAt(g)] == null || r.includes(g)); ) {
          if (o) {
            if (y[M](i.charAt(g)), t.charAt(b) === i.charAt(g)) {
              g += w, b += w;
              continue;
            }
          } else i.charAt(g) === t.charAt(b) && (b += w);
          g += w;
        }
    }
    return this.memo.set(l, y.join("")), this.memo.get(l);
  }
}
class Ma {
  constructor(t, a = {}) {
    Ue(this, "items", /* @__PURE__ */ new Map()), Ue(this, "eventAbortController"), Ue(this, "onInput", (o) => {
      if (o instanceof CustomEvent && o.type === "input" && !o.isTrusted && !o.bubbles)
        return;
      const l = o.target, i = this.items.get(l);
      if (i === void 0) return;
      const r = "inputType" in o && o.inputType.startsWith("delete"), y = i.isEager(), d = r && y && i.unmasked(l.value) === "" ? "" : l.value;
      this.fixCursor(l, r, () => this.setValue(l, d));
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
      const l = new Ea(Sa(o, a));
      this.items.set(o, l), queueMicrotask(() => this.updateValue(o)), o.selectionStart === null && l.isEager() && console.warn("Maska: input of `%s` type is not supported", o.type);
    }
  }
  getInputs(t) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t];
  }
  getOptions(t) {
    const { onMaska: a, preProcess: o, postProcess: l, ...i } = t;
    return i;
  }
  fixCursor(t, a, o) {
    var l, i;
    const r = t.selectionStart, y = t.value;
    if (o(), r === null || r === y.length && !a) return;
    const d = t.value, w = y.slice(0, r), M = d.slice(0, r), S = (l = this.processInput(t, w)) == null ? void 0 : l.unmasked, Y = (i = this.processInput(t, M)) == null ? void 0 : i.unmasked;
    if (S === void 0 || Y === void 0) return;
    let z = r;
    w !== M && (z += a ? d.length - y.length : S.length - Y.length), t.setSelectionRange(z, z);
  }
  setValue(t, a) {
    const o = this.processInput(t, a);
    o !== void 0 && (t.value = o.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((l) => l(o)) : this.options.onMaska(o)), t.dispatchEvent(new CustomEvent("maska", { detail: o })), t.dispatchEvent(new CustomEvent("input", { detail: o.masked })));
  }
  processInput(t, a) {
    const o = this.items.get(t);
    if (o === void 0) return;
    let l = a ?? t.value;
    this.options.preProcess != null && (l = this.options.preProcess(l));
    let i = o.masked(l);
    return this.options.postProcess != null && (i = this.options.postProcess(i)), {
      masked: i,
      unmasked: o.unmasked(l),
      completed: o.completed(l)
    };
  }
}
const tt = /* @__PURE__ */ new WeakMap(), Fa = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, at = (e, t) => {
  var a;
  const o = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (o == null || (o == null ? void 0 : o.type) === "file") return;
  let l = {};
  if (t.value != null && (l = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const i = (r) => {
      const y = t.modifiers.unmasked ? r.unmasked : t.modifiers.completed ? r.completed : r.masked;
      Fa(t, y);
    };
    l.onMaska = l.onMaska == null ? i : Array.isArray(l.onMaska) ? [...l.onMaska, i] : [l.onMaska, i];
  }
  tt.has(o) ? (a = tt.get(o)) == null || a.update(l) : tt.set(o, new Ma(o, l));
}, Aa = {
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
function Ra(e) {
  var o;
  const t = Aa[e.type] ?? "text", a = {
    field: e.name,
    label: e.label,
    type: t,
    required: e.required ?? !1
  };
  return (e.type === "decimal" || e.type === "float") && (a.minFractionDigits = 2, a.maxFractionDigits = 2), e.type === "boolean" && (a.defaultValue = !1), e.type === "choice" && ((o = e.choices) != null && o.length) && (a.options = e.choices.map((l) => ({
    label: l.label,
    value: l.value
  }))), e.type === "fk" && (a.endpoint = e.endpoint, e.option_label && (a.optionLabel = e.option_label), e.option_value && (a.optionValue = e.option_value)), a;
}
function Ia(e) {
  return e.filter((t) => !t.read_only && t.name !== "id").map(Ra);
}
const Ta = {
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
  decimal: "number",
  float: "number",
  integer: "number"
};
function La(e) {
  return {
    field: e.type === "fk" ? `${e.name}_nome` : e.name,
    header: e.label,
    type: Ta[e.type],
    sortable: !0
  };
}
function za(e, t = 6) {
  return e.filter((a) => !a.read_only && a.name !== "id").slice(0, t).map(La);
}
function It() {
  const e = ta();
  function t(i, r = "Sucesso") {
    e.add({ severity: "success", summary: r, detail: i, life: 3e3 });
  }
  function a(i, r = "Erro") {
    e.add({ severity: "error", summary: r, detail: i, life: 5e3 });
  }
  function o(i, r = "Atenção") {
    e.add({ severity: "warn", summary: r, detail: i, life: 4e3 });
  }
  function l(i, r = "Info") {
    e.add({ severity: "info", summary: r, detail: i, life: 3e3 });
  }
  return { success: t, error: a, warn: o, info: l };
}
function Tt() {
  const e = aa();
  function t(o, l = "Deseja realmente excluir este registro?") {
    e.require({
      message: l,
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
  function a(o, l, i = "Confirmação") {
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
      accept: l
    });
  }
  return { confirmDelete: t, confirmAction: a };
}
function Na(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function Ya(e) {
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
    for (const [o, l] of Object.entries(t)) {
      if (o === "non_field_errors") continue;
      const i = Na(o);
      if (Array.isArray(l)) {
        const r = l.filter((y) => typeof y == "string");
        r.length > 0 && a.push(`${i}: ${r.join(" ")}`);
      } else typeof l == "string" && a.push(`${i}: ${l}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function Ke(e, t = "Erro inesperado") {
  var i;
  if (!e || typeof e != "object") return t;
  const a = e, o = (i = a.response) == null ? void 0 : i.data;
  if (!o || typeof o != "object")
    return a.message || t;
  const l = o.detail ?? o;
  return Ya(l) || t;
}
function Gl() {
  return { extractApiError: Ke };
}
const Oa = { class: "w-autocompletefk" }, Ba = ["disabled"], Wa = { class: "w-autocompletefk-toolbar" }, ja = { class: "w-autocompletefk-toolbar-actions" }, Ua = { class: "flex items-center justify-end gap-1" }, qa = { class: "w-autocompletefk-footer" }, Lt = /* @__PURE__ */ re({
  __name: "WAutoCompleteFK",
  props: {
    modelValue: {},
    endpoint: {},
    endpointParams: {},
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
    const a = e, o = t, l = Ie(_e);
    if (!l)
      throw new Error(
        "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin."
      );
    const i = l, r = It(), { confirmDelete: y } = Tt(), d = q(null), w = q([]), M = q(!1);
    let S = null;
    async function Y(C) {
      try {
        const P = await i.get(a.endpoint, C);
        d.value = P.data;
      } catch {
        d.value = null;
      }
    }
    async function z(C) {
      M.value = !0;
      try {
        const P = {
          page_size: 20,
          ...a.endpointParams
        };
        C && (P.search = C);
        const te = await i.list(a.endpoint, P);
        w.value = te.data;
      } catch {
        w.value = [];
      } finally {
        M.value = !1;
      }
    }
    function Z(C) {
      const P = C.query || "";
      if (P.length < a.minLength) {
        w.value = [];
        return;
      }
      S && clearTimeout(S), S = setTimeout(() => z(P), 300);
    }
    function J(C) {
      d.value = C.value, o("update:modelValue", C.value);
    }
    function g() {
      d.value = null, o("update:modelValue", null);
    }
    nt(
      () => a.modelValue,
      async (C) => {
        if (C != null) {
          if (typeof C == "object" && C !== null && a.optionLabel in C) {
            d.value = C;
            return;
          }
          (!d.value || d.value[a.optionValue] !== C) && await Y(C);
        } else
          d.value = null;
      },
      { immediate: !0 }
    );
    const b = q(!1), $ = q([]), V = q(!1), L = q(""), U = q(1), K = q(15), O = q(0), G = q(null), X = q(null), oe = q(0);
    let _ = null;
    const ee = q([]), f = H(() => {
      var C;
      return (C = a.crudFields) != null && C.length ? !0 : ee.value.length > 0;
    }), x = H(() => a.canCreate ?? f.value), u = H(() => a.canEdit ?? f.value), n = H(() => a.canDelete ?? f.value), m = H(() => u.value || n.value), c = H(() => {
      var C;
      return (C = a.crudFields) != null && C.length ? a.crudFields : Ia(ee.value);
    }), I = H(() => {
      var C, P;
      return (C = a.crudColumns) != null && C.length ? a.crudColumns : (P = a.columns) != null && P.length ? a.columns.map((te) => ({
        field: te.field,
        header: te.header,
        sortable: !0
      })) : ee.value.length ? za(ee.value) : [
        { field: a.optionLabel, header: a.optionLabel, sortable: !0 }
      ];
    });
    async function A() {
      var C, P, te;
      V.value = !0;
      try {
        const B = {
          page: U.value,
          page_size: K.value,
          ...a.endpointParams
        };
        L.value && (B.search = L.value), X.value && oe.value !== 0 && (B.ordering = oe.value === -1 ? `-${X.value}` : X.value);
        const ue = await i.list(a.endpoint, B);
        $.value = ue.data, O.value = ue.rows, (C = ue.extras) != null && C.fields && !((P = a.columns) != null && P.length) && !((te = a.crudFields) != null && te.length) && (ee.value = ue.extras.fields);
      } catch {
        $.value = [], O.value = 0;
      } finally {
        V.value = !1;
      }
    }
    function j() {
      a.disabled || (L.value = "", U.value = 1, X.value = null, oe.value = 0, G.value = null, b.value = !0, A());
    }
    function de(C) {
      U.value = C.page + 1, K.value = C.rows, A();
    }
    function pe(C) {
      X.value = C.sortField ?? null, oe.value = C.sortOrder ?? 0, U.value = 1, A();
    }
    function Ne() {
      G.value && (d.value = G.value, o("update:modelValue", G.value), b.value = !1);
    }
    function Ye(C) {
      d.value = C.data, o("update:modelValue", C.data), b.value = !1;
    }
    nt(L, () => {
      _ && clearTimeout(_), _ = setTimeout(() => {
        U.value = 1, A();
      }, 300);
    });
    const he = q(!1), me = q(!1), ye = q(null), ve = ge({}), De = H(() => ye.value !== null), xe = H(
      () => De.value ? "Editar Registro" : "Novo Registro"
    );
    function Fe() {
      const C = {};
      for (const P of c.value)
        C[P.field] = P.defaultValue !== void 0 ? typeof P.defaultValue == "function" ? P.defaultValue() : P.defaultValue : null;
      return C;
    }
    function ke() {
      const C = Fe();
      for (const P of Object.keys(ve))
        delete ve[P];
      for (const [P, te] of Object.entries(C))
        ve[P] = te;
    }
    function Se() {
      ye.value = null, ke(), he.value = !0;
    }
    function Pe(C) {
      ye.value = C;
      for (const P of c.value)
        ve[P.field] = C[P.field] !== void 0 ? C[P.field] : null;
      he.value = !0;
    }
    function Ae(C, P) {
      ve[C] = P;
    }
    async function Re() {
      me.value = !0;
      try {
        const C = { ...ve };
        for (const te of c.value) {
          const B = C[te.field];
          if (te.type === "fk" && B !== null && typeof B == "object") {
            const ue = te.optionValue || "id";
            C[te.field] = B[ue] ?? B;
          }
        }
        let P;
        if (De.value && ye.value) {
          const te = ye.value[a.optionValue];
          P = await i.update(
            a.endpoint,
            te,
            C
          );
          const B = $.value.findIndex((ue) => ue[a.optionValue] === te);
          B !== -1 && ($.value[B] = P.data), r.success("Registro atualizado com sucesso");
        } else
          P = await i.create(a.endpoint, C), $.value.unshift(P.data), O.value++, r.success("Registro criado com sucesso");
        he.value = !1, ye.value = null, G.value = P.data;
      } catch (C) {
        r.error(Ke(C, "Erro ao salvar registro"));
      } finally {
        me.value = !1;
      }
    }
    function $e(C) {
      y(async () => {
        try {
          const P = C[a.optionValue];
          await i.delete(a.endpoint, P);
          const te = $.value.findIndex((B) => B[a.optionValue] === P);
          te !== -1 && ($.value.splice(te, 1), O.value--), d.value && d.value[a.optionValue] === P && (d.value = null, o("update:modelValue", null)), G.value && G.value[a.optionValue] === P && (G.value = null), r.success("Registro excluído com sucesso");
        } catch (P) {
          r.error(Ke(P, "Erro ao excluir registro"));
        }
      });
    }
    return (C, P) => {
      const te = kt("tooltip");
      return s(), p(le, null, [
        h("div", Oa, [
          N(v(xt), {
            "model-value": d.value,
            suggestions: w.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: M.value,
            fluid: "",
            onComplete: Z,
            onItemSelect: J,
            onClear: g
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          ce((s(), p("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: j
          }, [...P[6] || (P[6] = [
            h("i", { class: "pi pi-search" }, null, -1)
          ])], 8, Ba)), [
            [
              te,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        N(v(Dt), {
          visible: b.value,
          "onUpdate:visible": P[4] || (P[4] = (B) => b.value = B),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: ne(() => [
            h("div", qa, [
              N(v(ae), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: P[3] || (P[3] = (B) => b.value = !1)
              }),
              N(v(ae), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !G.value,
                onClick: Ne
              }, null, 8, ["disabled"])
            ])
          ]),
          default: ne(() => [
            h("div", Wa, [
              N(v(qe), { class: "w-autocompletefk-toolbar-search" }, {
                default: ne(() => [
                  N(v(He), { class: "pi pi-search" }),
                  N(v(fe), {
                    modelValue: L.value,
                    "onUpdate:modelValue": P[0] || (P[0] = (B) => L.value = B),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              h("div", ja, [
                x.value ? (s(), F(v(ae), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: Se
                })) : k("", !0)
              ])
            ]),
            N(v($t), {
              selection: G.value,
              "onUpdate:selection": P[1] || (P[1] = (B) => G.value = B),
              value: $.value,
              loading: V.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: K.value,
              "total-records": O.value,
              "sort-field": X.value ?? void 0,
              "sort-order": oe.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: de,
              onSort: P[2] || (P[2] = (B) => pe({ sortField: B.sortField, sortOrder: B.sortOrder })),
              onRowDblclick: Ye
            }, {
              empty: ne(() => [...P[7] || (P[7] = [
                h("div", { class: "w-autocompletefk-empty" }, "Nenhum registro encontrado", -1)
              ])]),
              default: ne(() => [
                N(v(ze), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (s(!0), p(le, null, se(I.value, (B) => (s(), F(v(ze), {
                  key: B.field,
                  field: B.field,
                  header: B.header,
                  sortable: B.sortable ?? !0,
                  style: je(B.style)
                }, {
                  body: ne(({ data: ue }) => [
                    B.type ? (s(), F(Qe, {
                      key: 0,
                      column: B,
                      value: ue[B.field],
                      "row-data": ue
                    }, null, 8, ["column", "value", "row-data"])) : (s(), p(le, { key: 1 }, [
                      Ee(T(ue[B.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                m.value ? (s(), F(v(ze), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: ne(({ data: B }) => [
                    h("div", Ua, [
                      u.value ? ce((s(), F(v(ae), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (ue) => Pe(B)
                      }, null, 8, ["onClick"])), [
                        [
                          te,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : k("", !0),
                      n.value ? ce((s(), F(v(ae), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (ue) => $e(B)
                      }, null, 8, ["onClick"])), [
                        [
                          te,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : k("", !0)
                    ])
                  ]),
                  _: 1
                })) : k("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        f.value ? (s(), F(ut, {
          key: 0,
          visible: he.value,
          title: xe.value,
          fields: c.value,
          "form-data": ve,
          "is-editing": De.value,
          saving: me.value,
          width: e.dialogWidth,
          "onUpdate:visible": P[5] || (P[5] = (B) => {
            he.value = B, B || (ye.value = null);
          }),
          "onUpdate:field": Ae,
          onSave: Re
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : k("", !0)
      ], 64);
    };
  }
}), zt = /* @__PURE__ */ re({
  __name: "WMoneyInput",
  props: {
    modelValue: {},
    decimals: { default: 2 },
    currency: { type: Boolean, default: !1 },
    prefix: {},
    suffix: {},
    locale: { default: "pt-BR" },
    disabled: { type: Boolean, default: !1 },
    placeholder: {},
    invalid: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, o = t, l = H(
      () => a.prefix ?? (a.currency ? "R$" : void 0)
    ), i = H(() => !!l.value || !!a.suffix), r = H(() => {
      const d = a.modelValue;
      return d == null || Number.isNaN(d) ? "" : new Intl.NumberFormat(a.locale, {
        minimumFractionDigits: a.decimals,
        maximumFractionDigits: a.decimals
      }).format(d);
    });
    function y(d) {
      const w = d.target.value.replace(/\D/g, "");
      if (!w) {
        o("update:modelValue", null);
        return;
      }
      const M = Number(w) / Math.pow(10, a.decimals);
      o("update:modelValue", M);
    }
    return (d, w) => i.value ? (s(), F(v(na), {
      key: 0,
      class: "w-money-input"
    }, {
      default: ne(() => [
        l.value ? (s(), F(v(mt), { key: 0 }, {
          default: ne(() => [
            Ee(T(l.value), 1)
          ]),
          _: 1
        })) : k("", !0),
        N(v(fe), {
          "model-value": r.value,
          inputmode: "numeric",
          class: "w-money-input__field",
          placeholder: e.placeholder,
          disabled: e.disabled,
          invalid: e.invalid,
          onInput: y
        }, null, 8, ["model-value", "placeholder", "disabled", "invalid"]),
        e.suffix ? (s(), F(v(mt), { key: 1 }, {
          default: ne(() => [
            Ee(T(e.suffix), 1)
          ]),
          _: 1
        })) : k("", !0)
      ]),
      _: 1
    })) : (s(), F(v(fe), {
      key: 1,
      "model-value": r.value,
      inputmode: "numeric",
      fluid: "",
      class: "w-money-input__field",
      placeholder: e.placeholder,
      disabled: e.disabled,
      invalid: e.invalid,
      onInput: y
    }, null, 8, ["model-value", "placeholder", "disabled", "invalid"]));
  }
}), Ha = { class: "w-transfer__pane" }, Ka = { class: "w-transfer__head" }, Ga = { class: "w-transfer__count" }, Ja = { class: "w-transfer__list" }, Za = ["onClick"], Xa = {
  key: 0,
  class: "w-transfer__empty"
}, Qa = { class: "w-transfer__controls" }, _a = { class: "w-transfer__pane" }, en = { class: "w-transfer__head" }, tn = { class: "w-transfer__count" }, an = { class: "w-transfer__list" }, nn = ["onClick"], on = {
  key: 0,
  class: "w-transfer__empty"
}, Nt = /* @__PURE__ */ re({
  __name: "WTransferList",
  props: {
    source: {},
    selected: { default: () => [] },
    trackBy: { default: "id" },
    optionLabel: { default: "nome" },
    searchFields: {},
    disabled: { type: Boolean }
  },
  emits: ["update:selected"],
  setup(e, { emit: t }) {
    const a = e, o = t, l = q(""), i = q(""), r = H(() => new Set(a.selected)), y = H(() => a.searchFields ?? [a.optionLabel]);
    function d(b) {
      return b[a.trackBy];
    }
    function w(b) {
      return String(b[a.optionLabel] ?? "");
    }
    function M(b, $) {
      if (!$) return !0;
      const V = $.toLowerCase();
      return y.value.some(
        (L) => String(b[L] ?? "").toLowerCase().includes(V)
      );
    }
    const S = H(
      () => a.source.filter(
        (b) => !r.value.has(d(b)) && M(b, l.value)
      )
    ), Y = H(
      () => a.source.filter(
        (b) => r.value.has(d(b)) && M(b, i.value)
      )
    );
    function z(b) {
      a.disabled || o("update:selected", [...a.selected, d(b)]);
    }
    function Z(b) {
      if (a.disabled) return;
      const $ = d(b);
      o("update:selected", a.selected.filter((V) => V !== $));
    }
    function J() {
      a.disabled || o("update:selected", a.source.map(d));
    }
    function g() {
      a.disabled || o("update:selected", []);
    }
    return (b, $) => (s(), p("div", {
      class: ie(["w-transfer", { "w-transfer--disabled": e.disabled }])
    }, [
      h("div", Ha, [
        h("div", Ka, [
          $[2] || ($[2] = h("span", { class: "w-transfer__title" }, "Disponíveis", -1)),
          h("span", Ga, T(S.value.length), 1)
        ]),
        N(v(qe), { class: "w-transfer__search" }, {
          default: ne(() => [
            N(v(He), { class: "pi pi-search" }),
            N(v(fe), {
              modelValue: l.value,
              "onUpdate:modelValue": $[0] || ($[0] = (V) => l.value = V),
              placeholder: "Buscar...",
              fluid: ""
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        h("ul", Ja, [
          (s(!0), p(le, null, se(S.value, (V) => (s(), p("li", {
            key: `a-${d(V)}`,
            class: "w-transfer__item",
            onClick: (L) => z(V)
          }, [
            h("span", null, T(w(V)), 1),
            $[3] || ($[3] = h("i", { class: "pi pi-angle-right" }, null, -1))
          ], 8, Za))), 128)),
          S.value.length ? k("", !0) : (s(), p("li", Xa, "Nenhum item"))
        ])
      ]),
      h("div", Qa, [
        N(v(ae), {
          type: "button",
          icon: "pi pi-angle-double-right",
          text: "",
          rounded: "",
          disabled: e.disabled || !S.value.length,
          onClick: J
        }, null, 8, ["disabled"]),
        N(v(ae), {
          type: "button",
          icon: "pi pi-angle-double-left",
          text: "",
          rounded: "",
          disabled: e.disabled || !e.selected.length,
          onClick: g
        }, null, 8, ["disabled"])
      ]),
      h("div", _a, [
        h("div", en, [
          $[4] || ($[4] = h("span", { class: "w-transfer__title" }, "Selecionados", -1)),
          h("span", tn, T(Y.value.length), 1)
        ]),
        N(v(qe), { class: "w-transfer__search" }, {
          default: ne(() => [
            N(v(He), { class: "pi pi-search" }),
            N(v(fe), {
              modelValue: i.value,
              "onUpdate:modelValue": $[1] || ($[1] = (V) => i.value = V),
              placeholder: "Buscar...",
              fluid: ""
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        h("ul", an, [
          (s(!0), p(le, null, se(Y.value, (V) => (s(), p("li", {
            key: `s-${d(V)}`,
            class: "w-transfer__item",
            onClick: (L) => Z(V)
          }, [
            $[5] || ($[5] = h("i", { class: "pi pi-angle-left" }, null, -1)),
            h("span", null, T(w(V)), 1)
          ], 8, nn))), 128)),
          Y.value.length ? k("", !0) : (s(), p("li", on, "Nenhum item"))
        ])
      ])
    ], 2));
  }
});
async function ln(e) {
  const t = e.replace(/\D/g, "");
  if (t.length !== 8) return null;
  try {
    const a = await fetch(`https://viacep.com.br/ws/${t}/json/`);
    if (!a.ok) return null;
    const o = await a.json();
    return o.erro ? null : o;
  } catch {
    return null;
  }
}
const sn = { class: "w-crud-form" }, rn = {
  key: 0,
  class: "w-crud-form-group-header"
}, un = { class: "w-crud-form-group-title" }, dn = {
  key: 0,
  class: "w-crud-form-group-desc"
}, cn = { class: "w-crud-form-fields" }, fn = {
  key: 0,
  class: "w-crud-form-switch"
}, mn = { class: "w-crud-form-switch-label" }, pn = {
  key: 1,
  class: "w-crud-form-col-full"
}, vn = { class: "w-crud-form-label" }, gn = {
  key: 0,
  class: "w-crud-form-required"
}, hn = { class: "w-crud-form-color-row" }, yn = {
  key: 2,
  class: "w-crud-form-col-full"
}, bn = { class: "w-crud-form-label" }, wn = ["accept", "disabled", "onChange"], kn = {
  key: 3,
  class: "w-crud-form-col-full"
}, $n = { class: "w-crud-form-label" }, Cn = {
  key: 0,
  class: "w-crud-form-required"
}, Dn = { class: "w-crud-form-label" }, xn = {
  key: 0,
  class: "w-crud-form-required"
}, Sn = {
  key: 1,
  class: "pi pi-spin pi-spinner w-crud-form-cep-spinner"
}, Pn = {
  key: 16,
  class: "w-crud-form-cep-error"
}, Vn = {
  key: 17,
  class: "w-crud-form-error"
}, En = /* @__PURE__ */ re({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const o = e, l = a, i = ge({}), r = ge({}), y = ge({}), d = ge({});
    function w(f, x) {
      const u = x.target.value, n = u.replace(/\D/g, "");
      l("update:field", f.field, u), y[f.field] = null, d[f.field] && (clearTimeout(d[f.field]), d[f.field] = null), n.length === 8 && (d[f.field] = setTimeout(async () => {
        r[f.field] = !0, y[f.field] = null;
        try {
          const m = await ln(n);
          if (!m)
            y[f.field] = "CEP não encontrado. Preencha os campos manualmente.";
          else {
            const c = f.cepFields || {}, I = Object.keys(c);
            for (const A of I) {
              const j = c[A];
              if (!j) continue;
              const de = o.formData[j];
              (de == null || de === "") && l("update:field", j, m[A] ?? "");
            }
          }
        } finally {
          r[f.field] = !1;
        }
      }, 400));
    }
    const M = H(
      () => o.fields.filter((f) => f.visible === void 0 || f.visible === !0 ? !0 : typeof f.visible == "function" ? f.visible(o.formData, o.isEditing) : f.visible)
    );
    function S(f) {
      return o.disabled || f.disabledOnEdit && o.isEditing ? !0 : typeof f.disabled == "function" ? f.disabled(o.formData, o.isEditing) : !!f.disabled;
    }
    function Y(f) {
      return jt(f) ? f.value : f;
    }
    const z = H(() => {
      const f = o.isEditing ? "edit" : "create", x = o.fields.find(
        (n) => n.autofocus === !0 || n.autofocus === f
      );
      if (x) return x.field;
      const u = M.value.find((n) => !(n.type === "switch" || n.type === "fk" || n.type === "select" || n.type === "image" || n.disabled === !0 || n.disabledOnEdit && o.isEditing));
      return (u == null ? void 0 : u.field) ?? null;
    });
    function Z(f) {
      return f.field === z.value;
    }
    function J(f) {
      if (f)
        return f.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function g(f) {
      if (!f) return "";
      const x = String(f).replace(/\D/g, "").slice(0, 14);
      return x.length <= 11 ? x.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : x.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function b(f, x) {
      const u = x.target.value.replace(/\D/g, "").slice(0, 14);
      l("update:field", f, u);
    }
    const $ = ge({});
    function V(f) {
      const x = o.formData[f.field];
      if (x == null) return null;
      const u = f.optionValue || "value";
      return (Y(f.options) || []).find(
        (m) => m[u] === x
      ) ?? null;
    }
    function L(f) {
      return $[f.field] || [];
    }
    function U(f, x) {
      const u = (x.query || "").toLowerCase(), n = Y(f.options) || [], m = f.optionLabel || "label";
      $[f.field] = n.filter(
        (c) => String(c[m] || "").toLowerCase().includes(u)
      );
    }
    function K(f, x) {
      const u = f.optionValue || "value";
      l("update:field", f.field, x.value[u]);
    }
    function O(f) {
      const x = o.formData[f.field];
      return x ? String(x).replace("#", "") : "FFFFFF";
    }
    function G(f, x) {
      l("update:field", f.field, `#${x}`);
    }
    function X(f) {
      if (typeof f.validate == "function") {
        const x = f.validate(o.formData[f.field]);
        i[f.field] = x || null;
      }
    }
    function oe() {
      const f = [];
      for (const x of o.fields)
        if (typeof x.validate == "function") {
          const u = x.validate(o.formData[x.field]);
          i[x.field] = u || null, u && f.push(u);
        }
      return f;
    }
    function _() {
      Object.keys(i).forEach((f) => delete i[f]);
    }
    const ee = H(() => {
      var n, m, c, I;
      const f = /* @__PURE__ */ new Map(), x = [], u = /* @__PURE__ */ new Map();
      for (const A of M.value) {
        const j = ((n = A.fieldGroup) == null ? void 0 : n.id) ?? "__default__";
        f.has(j) || (f.set(j, {
          id: j,
          title: (m = A.fieldGroup) == null ? void 0 : m.title,
          description: (c = A.fieldGroup) == null ? void 0 : c.description,
          fields: []
        }), x.push(j), ((I = A.fieldGroup) == null ? void 0 : I.order) != null && u.set(j, A.fieldGroup.order)), f.get(j).fields.push(A);
      }
      return x.slice().sort((A, j) => {
        const de = u.get(A), pe = u.get(j);
        return de != null && pe != null ? de - pe : de != null ? -1 : pe != null ? 1 : x.indexOf(A) - x.indexOf(j);
      }).map((A) => f.get(A));
    });
    return t({ validateAll: oe, clearErrors: _ }), (f, x) => (s(), p("div", sn, [
      (s(!0), p(le, null, se(ee.value, (u) => (s(), p("div", {
        key: u.id,
        class: "w-crud-form-group"
      }, [
        u.title ? (s(), p("div", rn, [
          h("h3", un, T(u.title), 1),
          u.description ? (s(), p("p", dn, T(u.description), 1)) : k("", !0)
        ])) : k("", !0),
        h("div", cn, [
          (s(!0), p(le, null, se(u.fields, (n) => W(f.$slots, `field-${n.field}`, {
            key: n.field,
            field: n,
            formData: e.formData,
            isEditing: e.isEditing,
            setFormField: (m, c) => l("update:field", m, c)
          }, () => [
            n.type === "switch" ? (s(), p("div", fn, [
              N(v(Qt), {
                "model-value": e.formData[n.field],
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
              h("label", mn, T(n.switchLabel || n.label), 1)
            ])) : n.type === "color" ? (s(), p("div", pn, [
              h("label", vn, [
                Ee(T(n.label) + " ", 1),
                n.required ? (s(), p("span", gn, "*")) : k("", !0)
              ]),
              h("div", hn, [
                N(v(_t), {
                  "model-value": O(n),
                  disabled: S(n),
                  "onUpdate:modelValue": (m) => G(n, m)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                N(v(fe), {
                  "model-value": e.formData[n.field],
                  class: "w-28",
                  maxlength: "7",
                  placeholder: "#000000",
                  disabled: S(n),
                  "onUpdate:modelValue": (m) => l("update:field", n.field, m)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
              ])
            ])) : n.type === "image" ? (s(), p("div", yn, [
              h("label", bn, T(n.label), 1),
              W(f.$slots, `image-${n.field}`, {
                field: n,
                formData: e.formData
              }, () => [
                h("input", {
                  type: "file",
                  accept: n.accept || "image/*",
                  disabled: S(n),
                  onChange: (m) => {
                    var I;
                    const c = ((I = m.target.files) == null ? void 0 : I[0]) ?? null;
                    l("update:field", n.field, c);
                  }
                }, null, 40, wn)
              ])
            ])) : n.type === "transfer" ? (s(), p("div", kn, [
              h("label", $n, [
                Ee(T(n.label) + " ", 1),
                n.required ? (s(), p("span", Cn, "*")) : k("", !0)
              ]),
              N(Nt, {
                source: Y(n.options) || [],
                selected: e.formData[n.field] || [],
                "track-by": n.optionValue || "id",
                "option-label": n.optionLabel || "nome",
                "search-fields": n.searchFields,
                disabled: S(n),
                "onUpdate:selected": (m) => l("update:field", n.field, m)
              }, null, 8, ["source", "selected", "track-by", "option-label", "search-fields", "disabled", "onUpdate:selected"])
            ])) : (s(), p("div", {
              key: 4,
              class: ie(n.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
            }, [
              h("label", Dn, [
                Ee(T(n.label) + " ", 1),
                n.required ? (s(), p("span", xn, "*")) : k("", !0),
                r[n.field] ? (s(), p("i", Sn)) : k("", !0)
              ]),
              (!n.type || n.type === "text") && n.mask ? ce((s(), F(v(fe), {
                key: 0,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: Z(n) || void 0,
                placeholder: n.placeholder,
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
                [v(at), { mask: J(n.mask) }]
              ]) : !n.type || n.type === "text" ? (s(), F(v(fe), {
                key: 1,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: Z(n) || void 0,
                placeholder: n.placeholder,
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "email" ? (s(), F(v(fe), {
                key: 2,
                "model-value": e.formData[n.field],
                type: "email",
                fluid: "",
                autofocus: Z(n) || void 0,
                placeholder: n.placeholder,
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "password" ? (s(), F(v(ea), {
                key: 3,
                "model-value": e.formData[n.field],
                fluid: "",
                "toggle-mask": "",
                feedback: n.feedback !== !1,
                placeholder: n.placeholder,
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "number" ? (s(), F(v(ct), {
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
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "currency" && n.fillFromRight ? (s(), F(zt, {
                key: 5,
                "model-value": e.formData[n.field],
                decimals: n.decimals ?? 2,
                currency: "",
                prefix: n.prefix,
                suffix: n.suffix,
                placeholder: n.placeholder,
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "decimals", "prefix", "suffix", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "currency" ? (s(), F(v(ct), {
                key: 6,
                "model-value": e.formData[n.field],
                fluid: "",
                mode: "currency",
                currency: "BRL",
                locale: "pt-BR",
                min: n.min,
                max: n.max,
                placeholder: n.placeholder,
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "select" ? (s(), F(v(Xt), {
                key: 7,
                "model-value": e.formData[n.field],
                fluid: "",
                options: Y(n.options),
                "option-label": n.optionLabel || "label",
                "option-value": n.optionValue || "value",
                "show-clear": n.showClear !== !1,
                placeholder: n.placeholder,
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "autocomplete" ? (s(), F(v(xt), {
                key: 8,
                "model-value": V(n),
                fluid: "",
                suggestions: L(n),
                "option-label": n.optionLabel || "label",
                placeholder: n.placeholder,
                disabled: S(n),
                onComplete: (m) => U(n, m),
                onItemSelect: (m) => K(n, m),
                onClear: (m) => l("update:field", n.field, null)
              }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : n.type === "fk" ? (s(), F(Lt, {
                key: 9,
                "model-value": e.formData[n.field],
                endpoint: n.endpoint,
                "endpoint-params": n.endpointParams,
                "option-label": n.optionLabel || "nome",
                placeholder: n.placeholder,
                disabled: S(n),
                "show-clear": n.showClear !== !1,
                "dialog-header": n.label,
                "crud-fields": n.crudFields,
                "crud-columns": n.crudColumns,
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "endpoint", "endpoint-params", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : n.type === "date" ? (s(), F(v(ft), {
                key: 10,
                "model-value": e.formData[n.field],
                fluid: "",
                "date-format": n.dateFormat || "dd/mm/yy",
                placeholder: n.placeholder,
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "datetime" ? (s(), F(v(ft), {
                key: 11,
                "model-value": e.formData[n.field],
                fluid: "",
                "show-time": "",
                "hour-format": n.hourFormat || "24",
                "date-format": n.dateFormat || "dd/mm/yy",
                placeholder: n.placeholder,
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "cpf_cnpj" ? (s(), F(v(fe), {
                key: 12,
                "model-value": g(e.formData[n.field]),
                fluid: "",
                maxlength: "18",
                placeholder: n.placeholder || "000.000.000-00",
                disabled: S(n),
                invalid: !!i[n.field],
                onInput: (m) => b(n.field, m),
                onBlur: (m) => X(n)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : n.type === "mask" ? ce((s(), F(v(fe), {
                key: 13,
                "model-value": e.formData[n.field],
                fluid: "",
                placeholder: n.placeholder,
                disabled: S(n),
                invalid: !!i[n.field],
                "onUpdate:modelValue": (m) => l("update:field", n.field, m),
                onBlur: (m) => X(n)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
                [v(at), { mask: J(n.mask) }]
              ]) : n.type === "cep" ? ce((s(), F(v(fe), {
                key: 14,
                "model-value": e.formData[n.field],
                fluid: "",
                placeholder: n.placeholder || "00000-000",
                disabled: S(n),
                invalid: !!y[n.field],
                onInput: (m) => w(n, m)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput"])), [
                [v(at), { mask: "#####-###" }]
              ]) : n.type === "textarea" ? (s(), F(v(Zt), {
                key: 15,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: Z(n) || void 0,
                rows: n.rows || 3,
                placeholder: n.placeholder,
                disabled: S(n),
                "onUpdate:modelValue": (m) => l("update:field", n.field, m)
              }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : k("", !0),
              y[n.field] ? (s(), p("small", Pn, T(y[n.field]), 1)) : i[n.field] ? (s(), p("small", Vn, T(i[n.field]), 1)) : k("", !0)
            ], 2))
          ])), 128))
        ])
      ]))), 128))
    ]));
  }
}), Mn = { class: "w-crud-form-footer" }, ut = /* @__PURE__ */ re({
  __name: "WCrudFormDialog",
  props: {
    visible: { type: Boolean },
    title: {},
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    saving: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    width: { default: "480px" }
  },
  emits: ["update:visible", "update:field", "save"],
  setup(e, { emit: t }) {
    const a = e, o = t, l = q(null);
    function i() {
      l.value ? l.value.validateAll().length === 0 && o("save") : o("save");
    }
    return nt(
      () => a.visible,
      (r) => {
        r && l.value && l.value.clearErrors();
      }
    ), (r, y) => (s(), F(v(Dt), {
      visible: e.visible,
      header: e.title,
      style: je({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": y[2] || (y[2] = (d) => o("update:visible", d))
    }, {
      default: ne(() => [
        h("form", {
          class: "w-crud-form",
          onSubmit: Ut(i, ["prevent"])
        }, [
          N(En, {
            ref_key: "rendererRef",
            ref: l,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            disabled: e.disabled,
            "onUpdate:field": y[0] || (y[0] = (d, w) => o("update:field", d, w))
          }, ot({ _: 2 }, [
            se(e.fields, (d) => ({
              name: `field-${d.field}`,
              fn: ne((w) => [
                W(r.$slots, `field-${d.field}`, lt(st(w)))
              ])
            })),
            se(e.fields.filter((d) => d.type === "image"), (d) => ({
              name: `image-${d.field}`,
              fn: ne((w) => [
                W(r.$slots, `image-${d.field}`, lt(st(w)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing", "disabled"]),
          h("div", Mn, [
            W(r.$slots, "footer", {
              saving: e.saving,
              disabled: e.disabled
            }, () => [
              N(v(ae), {
                type: "button",
                label: e.disabled ? "Fechar" : "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: y[1] || (y[1] = (d) => o("update:visible", !1))
              }, null, 8, ["label", "disabled"]),
              e.disabled ? k("", !0) : (s(), F(v(ae), {
                key: 0,
                type: "submit",
                label: e.isEditing ? "Atualizar" : "Salvar",
                icon: "pi pi-check",
                loading: e.saving
              }, null, 8, ["label", "loading"]))
            ])
          ])
        ], 32)
      ]),
      _: 3
    }, 8, ["visible", "header", "style"]));
  }
});
function Fn(e, t) {
  const a = t[e.field];
  return e.format ? e.format(a, t) : a == null ? "" : typeof a == "boolean" ? a ? "Sim" : "Não" : String(a);
}
function bt(e, t) {
  return e.includes('"') || e.includes(t) || e.includes(`
`) || e.includes("\r") ? `"${e.replace(/"/g, '""')}"` : e;
}
function An(e, t, a = {}) {
  const o = a.separator ?? ";", l = t.map((r) => bt(r.header, o)).join(o), i = e.map(
    (r) => t.map((y) => bt(Fn(y, r), o)).join(o)
  );
  return "\uFEFF" + [l, ...i].join(`\r
`);
}
function Rn(e, t = "export.csv") {
  const a = new Blob([e], { type: "text/csv;charset=utf-8;" }), o = URL.createObjectURL(a), l = document.createElement("a");
  l.href = o, l.download = t, document.body.appendChild(l), l.click(), document.body.removeChild(l), URL.revokeObjectURL(o);
}
const In = { class: "w-crud" }, Tn = {
  key: 0,
  class: "w-crud-header"
}, Ln = { class: "w-crud-header-content" }, zn = { class: "w-crud-title" }, Nn = {
  key: 0,
  class: "w-crud-subtitle"
}, Yn = { class: "w-crud-header-actions" }, On = {
  key: 0,
  class: "w-crud-kpis"
}, Bn = { class: "w-crud-kpi-content" }, Wn = { class: "w-crud-kpi-label" }, jn = { class: "w-crud-kpi-value" }, Un = { class: "w-crud-content-main" }, qn = {
  key: 0,
  class: "w-crud-table"
}, Hn = { class: "w-crud-toolbar" }, Kn = { class: "w-crud-toolbar-start" }, Gn = { class: "w-crud-toolbar-end" }, Jn = {
  key: 1,
  class: "w-crud-view-toggle"
}, Zn = { class: "w-crud-actions" }, Xn = {
  key: 1,
  class: "w-crud-cards-wrap"
}, Qn = { class: "w-crud-toolbar w-crud-toolbar--standalone" }, _n = { class: "w-crud-toolbar-start" }, eo = { class: "w-crud-toolbar-end" }, to = {
  key: 1,
  class: "w-crud-view-toggle"
}, ao = {
  key: 0,
  class: "w-crud-cards-loading"
}, no = {
  key: 2,
  class: "w-crud-cards"
}, oo = ["onClick", "onDblclick", "onContextmenu"], lo = { class: "w-crud-card-body" }, so = {
  key: 0,
  class: "w-crud-card-label"
}, io = { class: "w-crud-card-value" }, ro = {
  key: 0,
  class: "w-crud-card-actions"
}, uo = {
  key: 0,
  class: "w-crud-rail"
}, co = {
  key: 1,
  class: "w-crud-rail-sep"
}, fo = /* @__PURE__ */ re({
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
    expandable: { type: Boolean, default: !1 },
    viewToggle: { type: Boolean, default: !0 },
    defaultView: { default: "table" },
    cardFields: { default: 4 },
    actionRail: { type: Boolean, default: !0 },
    contextMenu: { type: Boolean, default: !0 },
    exportCsv: { type: Boolean, default: !0 },
    csvFilename: { default: "export.csv" },
    csvScope: { default: "all" },
    csvPageSize: { default: 200 }
  },
  emits: ["row-expand", "row-collapse", "print"],
  setup(e, { emit: t }) {
    const a = e, o = t, l = qt(), { formatNumber: i } = rt(), r = q({}), y = q(a.defaultView);
    function d(u) {
      return y.value === u;
    }
    function w(u) {
      y.value = u;
    }
    const M = H(
      () => (a.crud.pagination.page - 1) * a.crud.pagination.pageSize
    ), S = H(
      () => a.crud.config.columns.filter((u) => u.visible !== !1).map((u) => u.type === "number" && !u.align ? { ...u, align: "right" } : u.type === "currency" && !u.align ? { ...u, align: "right" } : u)
    );
    function Y(u) {
      if (u.align === "right") return "text-right";
      if (u.align === "center") return "text-center";
    }
    const z = H(() => S.value.slice(0, a.cardFields)), Z = H(() => {
      const u = [];
      return a.crud.config.canEdit !== !1 && u.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canCreate !== !1 && u.push({
        action: "duplicate",
        icon: "pi pi-copy",
        tooltip: "Duplicar",
        severity: "info"
      }), a.crud.config.canDelete !== !1 && u.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), u;
    }), J = H(
      () => a.crud.config.rowActions ?? Z.value
    ), g = H(() => J.value.length > 0 || !!l["row-actions"]);
    function b(u, n) {
      if (u.handler) {
        u.handler(n);
        return;
      }
      u.action === "edit" ? a.crud.openEditDialog(n) : u.action === "view" ? a.crud.openViewDialog(n) : u.action === "duplicate" ? a.crud.openDuplicateDialog(n) : u.action === "delete" && a.crud.confirmDelete(n);
    }
    function $(u, n) {
      return u.visible ? u.visible(n) : !0;
    }
    function V(u, n) {
      return u.disabled ? u.disabled(n) : !1;
    }
    const L = H(() => {
      const u = [];
      return a.showKpi && u.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: i(a.crud.pagination.rows, 0)
      }), u.push(...a.extraKpis), u;
    });
    H(() => a.crud.config.labels ?? {});
    const U = H(() => a.crud.config.canCreate !== !1), K = q(null), O = q(null);
    function G(u) {
      K.value = u;
    }
    function X(u) {
      var n;
      a.contextMenu && (K.value = u.data, (n = O.value) == null || n.show(u.originalEvent));
    }
    function oe(u, n) {
      var m;
      a.contextMenu && (u.preventDefault(), K.value = n, (m = O.value) == null || m.show(u));
    }
    const _ = H(() => {
      const u = K.value;
      if (!u) return [];
      const n = [
        {
          label: "Ver detalhes",
          icon: "pi pi-eye",
          command: () => a.crud.openViewDialog(u)
        }
      ];
      for (const m of J.value)
        $(m, u) && n.push({
          label: m.tooltip ?? m.action,
          icon: m.icon,
          class: m.severity === "danger" ? "w-crud-ctx-danger" : void 0,
          disabled: V(m, u),
          command: () => b(m, u)
        });
      return n.push({
        label: "Imprimir",
        icon: "pi pi-print",
        command: () => o("print", u)
      }), a.exportCsv && (n.push({ separator: !0 }), n.push({
        label: a.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
        icon: "pi pi-download",
        command: () => x()
      })), n;
    });
    function ee() {
      K.value && o("print", K.value);
    }
    const f = q(!1);
    async function x() {
      if (!f.value) {
        f.value = !0;
        try {
          const u = a.csvScope === "page" ? a.crud.items.value : await a.crud.fetchAll(a.csvPageSize), n = An(u, S.value);
          Rn(n, a.csvFilename);
        } finally {
          f.value = !1;
        }
      }
    }
    return Ht(() => {
      a.autoInit && a.crud.init();
    }), (u, n) => {
      const m = kt("tooltip");
      return s(), p("div", In, [
        e.showHeader ? (s(), p("div", Tn, [
          h("div", Ln, [
            h("h1", zn, T(e.title), 1),
            e.subtitle ? (s(), p("p", Nn, T(e.subtitle), 1)) : k("", !0)
          ]),
          h("div", Yn, [
            W(u.$slots, "header-actions"),
            U.value ? (s(), F(v(ae), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: n[0] || (n[0] = (c) => e.crud.openCreateDialog())
            })) : k("", !0)
          ])
        ])) : k("", !0),
        W(u.$slots, "before-table", {}, () => [
          L.value.length ? (s(), p("div", On, [
            (s(!0), p(le, null, se(L.value, (c, I) => (s(), p("div", {
              key: I,
              class: "w-crud-kpi"
            }, [
              h("div", {
                class: ie(["w-crud-kpi-icon", c.severity ? `w-crud-kpi-icon--${c.severity}` : ""])
              }, [
                h("i", {
                  class: ie([c.icon]),
                  style: je(c.color ? `color: ${c.color}` : "")
                }, null, 6)
              ], 2),
              h("div", Bn, [
                h("div", Wn, T(c.label), 1),
                h("div", jn, T(c.value), 1)
              ])
            ]))), 128))
          ])) : k("", !0)
        ]),
        h("div", {
          class: ie(["w-crud-content", { "w-crud-content--rail": e.actionRail }])
        }, [
          h("div", Un, [
            y.value === "table" ? (s(), p("div", qn, [
              N(v($t), {
                value: e.crud.items.value,
                loading: e.crud.loading.value,
                "expanded-rows": r.value,
                "onUpdate:expandedRows": n[4] || (n[4] = (c) => r.value = c),
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
                selection: e.actionRail || e.contextMenu ? K.value : void 0,
                "selection-mode": e.actionRail || e.contextMenu ? "single" : void 0,
                "context-menu": e.contextMenu,
                "context-menu-selection": e.contextMenu ? K.value : void 0,
                "onUpdate:selection": n[5] || (n[5] = (c) => K.value = c),
                "onUpdate:contextMenuSelection": n[6] || (n[6] = (c) => K.value = c),
                onRowContextmenu: X,
                onPage: e.crud.onPage,
                onSort: n[7] || (n[7] = (c) => e.crud.onSort({ sortField: c.sortField, sortOrder: c.sortOrder })),
                onRowExpand: n[8] || (n[8] = (c) => o("row-expand", c.data)),
                onRowCollapse: n[9] || (n[9] = (c) => o("row-collapse", c.data))
              }, ot({
                header: ne(() => [
                  h("div", Hn, [
                    h("div", Kn, [
                      e.showSearch ? (s(), F(v(qe), { key: 0 }, {
                        default: ne(() => [
                          N(v(He), { class: "pi pi-search" }),
                          N(v(fe), {
                            "model-value": e.crud.search.value,
                            placeholder: "Buscar...",
                            class: "w-72",
                            onInput: e.crud.onSearch
                          }, null, 8, ["model-value", "onInput"])
                        ]),
                        _: 1
                      })) : k("", !0),
                      W(u.$slots, "toolbar-start"),
                      W(u.$slots, "toolbar-filters")
                    ]),
                    h("div", Gn, [
                      W(u.$slots, "toolbar-actions"),
                      e.exportCsv ? ce((s(), F(v(ae), {
                        key: 0,
                        icon: "pi pi-download",
                        text: "",
                        size: "small",
                        loading: f.value,
                        onClick: x
                      }, null, 8, ["loading"])), [
                        [
                          m,
                          e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : k("", !0),
                      e.viewToggle ? (s(), p("div", Jn, [
                        N(v(ae), {
                          icon: "pi pi-table",
                          size: "small",
                          text: !d("table"),
                          outlined: d("table"),
                          onClick: n[1] || (n[1] = (c) => w("table"))
                        }, null, 8, ["text", "outlined"]),
                        N(v(ae), {
                          icon: "pi pi-th-large",
                          size: "small",
                          text: !d("cards"),
                          outlined: d("cards"),
                          onClick: n[2] || (n[2] = (c) => w("cards"))
                        }, null, 8, ["text", "outlined"])
                      ])) : k("", !0),
                      !e.showHeader && U.value ? (s(), F(v(ae), {
                        key: 2,
                        label: "Novo",
                        icon: "pi pi-plus",
                        onClick: n[3] || (n[3] = (c) => e.crud.openCreateDialog())
                      })) : k("", !0)
                    ])
                  ])
                ]),
                empty: ne(() => [
                  W(u.$slots, "empty", {}, () => [
                    n[17] || (n[17] = h("div", { class: "w-crud-empty" }, [
                      h("div", { class: "w-crud-empty-icon" }, [
                        h("i", { class: "pi pi-inbox" })
                      ]),
                      h("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                      h("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                    ], -1))
                  ])
                ]),
                default: ne(() => [
                  e.expandable ? (s(), F(v(ze), {
                    key: 0,
                    expander: "",
                    style: { width: "3rem" }
                  })) : k("", !0),
                  (s(!0), p(le, null, se(S.value, (c) => (s(), F(v(ze), {
                    key: c.field,
                    field: c.field,
                    header: c.header,
                    sortable: c.sortable,
                    style: je(c.style),
                    "header-class": Y(c),
                    "body-class": Y(c)
                  }, {
                    body: ne(({ data: I }) => [
                      W(u.$slots, `column-${c.field}`, {
                        data: I,
                        value: I[c.field]
                      }, () => [
                        N(Qe, {
                          column: c,
                          value: I[c.field],
                          "row-data": I
                        }, null, 8, ["column", "value", "row-data"])
                      ])
                    ]),
                    _: 2
                  }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
                  g.value && !e.actionRail ? (s(), F(v(ze), {
                    key: 1,
                    "header-class": "w-crud-actions-header",
                    style: je({ width: `${(J.value.length + (v(l)["row-actions"] ? 1 : 0)) * 2.5 + 1}rem` })
                  }, {
                    body: ne(({ data: c }) => [
                      h("div", Zn, [
                        (s(!0), p(le, null, se(J.value, (I) => (s(), p(le, {
                          key: I.action
                        }, [
                          $(I, c) ? ce((s(), F(v(ae), {
                            key: 0,
                            icon: I.icon,
                            text: "",
                            rounded: "",
                            size: "small",
                            severity: I.severity,
                            disabled: V(I, c),
                            onClick: (A) => b(I, c)
                          }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                            [
                              m,
                              I.tooltip,
                              void 0,
                              { top: !0 }
                            ]
                          ]) : k("", !0)
                        ], 64))), 128)),
                        W(u.$slots, "row-actions", {
                          data: c,
                          crud: e.crud
                        })
                      ])
                    ]),
                    _: 3
                  }, 8, ["style"])) : k("", !0)
                ]),
                _: 2
              }, [
                e.expandable ? {
                  name: "expansion",
                  fn: ne((c) => [
                    W(u.$slots, "expansion", {
                      data: c.data
                    })
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "selection", "selection-mode", "context-menu", "context-menu-selection", "onPage"])
            ])) : (s(), p("div", Xn, [
              h("div", Qn, [
                h("div", _n, [
                  e.showSearch ? (s(), F(v(qe), { key: 0 }, {
                    default: ne(() => [
                      N(v(He), { class: "pi pi-search" }),
                      N(v(fe), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : k("", !0),
                  W(u.$slots, "toolbar-start"),
                  W(u.$slots, "toolbar-filters")
                ]),
                h("div", eo, [
                  W(u.$slots, "toolbar-actions"),
                  e.exportCsv ? ce((s(), F(v(ae), {
                    key: 0,
                    icon: "pi pi-download",
                    text: "",
                    size: "small",
                    loading: f.value,
                    onClick: x
                  }, null, 8, ["loading"])), [
                    [
                      m,
                      e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                      void 0,
                      { top: !0 }
                    ]
                  ]) : k("", !0),
                  e.viewToggle ? (s(), p("div", to, [
                    N(v(ae), {
                      icon: "pi pi-table",
                      size: "small",
                      text: !d("table"),
                      outlined: d("table"),
                      onClick: n[10] || (n[10] = (c) => w("table"))
                    }, null, 8, ["text", "outlined"]),
                    N(v(ae), {
                      icon: "pi pi-th-large",
                      size: "small",
                      text: !d("cards"),
                      outlined: d("cards"),
                      onClick: n[11] || (n[11] = (c) => w("cards"))
                    }, null, 8, ["text", "outlined"])
                  ])) : k("", !0),
                  !e.showHeader && U.value ? (s(), F(v(ae), {
                    key: 2,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: n[12] || (n[12] = (c) => e.crud.openCreateDialog())
                  })) : k("", !0)
                ])
              ]),
              e.crud.loading.value ? (s(), p("div", ao, [...n[18] || (n[18] = [
                h("i", { class: "pi pi-spin pi-spinner" }, null, -1)
              ])])) : e.crud.items.value.length ? (s(), p("div", no, [
                (s(!0), p(le, null, se(e.crud.items.value, (c, I) => (s(), p("div", {
                  key: c[e.crud.config.pk || "id"] ?? I,
                  class: ie(["w-crud-card", { "w-crud-card--selected": K.value === c }]),
                  onClick: (A) => G(c),
                  onDblclick: (A) => e.crud.config.canEdit !== !1 && e.crud.openEditDialog(c),
                  onContextmenu: (A) => oe(A, c)
                }, [
                  h("div", lo, [
                    (s(!0), p(le, null, se(z.value, (A, j) => (s(), p("div", {
                      key: A.field,
                      class: ie(["w-crud-card-row", { "w-crud-card-row--title": j === 0 }])
                    }, [
                      j !== 0 ? (s(), p("span", so, T(A.header), 1)) : k("", !0),
                      h("span", io, [
                        W(u.$slots, `column-${A.field}`, {
                          data: c,
                          value: c[A.field]
                        }, () => [
                          N(Qe, {
                            column: A,
                            value: c[A.field],
                            "row-data": c
                          }, null, 8, ["column", "value", "row-data"])
                        ])
                      ])
                    ], 2))), 128))
                  ]),
                  g.value && !e.actionRail ? (s(), p("div", ro, [
                    (s(!0), p(le, null, se(J.value, (A) => (s(), p(le, {
                      key: A.action
                    }, [
                      $(A, c) ? ce((s(), F(v(ae), {
                        key: 0,
                        icon: A.icon,
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: A.severity,
                        disabled: V(A, c),
                        onClick: (j) => b(A, c)
                      }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                        [
                          m,
                          A.tooltip,
                          void 0,
                          { top: !0 }
                        ]
                      ]) : k("", !0)
                    ], 64))), 128)),
                    W(u.$slots, "row-actions", {
                      data: c,
                      crud: e.crud
                    })
                  ])) : k("", !0)
                ], 42, oo))), 128))
              ])) : W(u.$slots, "empty", { key: 1 }, () => [
                n[19] || (n[19] = Kt('<div class="w-crud-empty"><div class="w-crud-empty-icon"><i class="pi pi-inbox"></i></div><p class="w-crud-empty-title">Nenhum registro encontrado</p><p class="w-crud-empty-text">Tente ajustar sua busca ou crie um novo registro</p></div>', 1))
              ]),
              e.crud.items.value.length ? (s(), F(v(Gt), {
                key: 3,
                rows: e.crud.pagination.pageSize,
                "total-records": e.crud.pagination.rows,
                first: M.value,
                "rows-per-page-options": [10, 20, 50],
                template: "CurrentPageReport PrevPageLink NextPageLink",
                "current-page-report-template": "Página {currentPage} de {totalPages}",
                class: "w-crud-paginator",
                onPage: e.crud.onPage
              }, null, 8, ["rows", "total-records", "first", "onPage"])) : k("", !0)
            ]))
          ]),
          e.actionRail ? (s(), p("aside", uo, [
            U.value ? ce((s(), F(v(ae), {
              key: 0,
              icon: "pi pi-plus",
              rounded: "",
              onClick: n[13] || (n[13] = (c) => e.crud.openCreateDialog())
            }, null, 512)), [
              [
                m,
                "Novo",
                void 0,
                { left: !0 }
              ]
            ]) : k("", !0),
            U.value && J.value.length ? (s(), p("div", co)) : k("", !0),
            (s(!0), p(le, null, se(J.value, (c) => (s(), p(le, {
              key: c.action
            }, [
              !K.value || $(c, K.value) ? ce((s(), F(v(ae), {
                key: 0,
                icon: c.icon,
                text: "",
                rounded: "",
                severity: c.severity,
                disabled: !K.value || V(c, K.value),
                onClick: (I) => K.value && b(c, K.value)
              }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                [
                  m,
                  c.tooltip,
                  void 0,
                  { left: !0 }
                ]
              ]) : k("", !0)
            ], 64))), 128)),
            W(u.$slots, "rail-actions", {
              selected: K.value,
              crud: e.crud
            }),
            n[20] || (n[20] = h("div", { class: "w-crud-rail-sep" }, null, -1)),
            ce(N(v(ae), {
              icon: "pi pi-print",
              text: "",
              rounded: "",
              disabled: !K.value,
              onClick: ee
            }, null, 8, ["disabled"]), [
              [
                m,
                "Imprimir",
                void 0,
                { left: !0 }
              ]
            ]),
            e.exportCsv ? ce((s(), F(v(ae), {
              key: 2,
              icon: "pi pi-download",
              text: "",
              rounded: "",
              loading: f.value,
              onClick: x
            }, null, 8, ["loading"])), [
              [
                m,
                e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                void 0,
                { left: !0 }
              ]
            ]) : k("", !0)
          ])) : k("", !0)
        ], 2),
        e.contextMenu ? (s(), F(v(Jt), {
          key: 1,
          ref_key: "cm",
          ref: O,
          model: _.value
        }, null, 8, ["model"])) : k("", !0),
        W(u.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => {
          var c;
          return [
            N(ut, {
              visible: e.crud.dialogVisible.value,
              title: e.crud.dialogTitle.value,
              fields: e.crud.config.form,
              "form-data": e.crud.formData,
              "is-editing": e.crud.isEditing.value,
              saving: e.crud.saving.value,
              disabled: ((c = e.crud.viewMode) == null ? void 0 : c.value) ?? !1,
              width: e.dialogWidth,
              "onUpdate:visible": n[14] || (n[14] = (I) => {
                e.crud.dialogVisible.value = I, I || (e.crud.editingItem.value = null);
              }),
              "onUpdate:field": n[15] || (n[15] = (I, A) => e.crud.setFormField(I, A)),
              onSave: n[16] || (n[16] = (I) => e.crud.save())
            }, ot({ _: 2 }, [
              se(e.crud.config.form, (I) => ({
                name: `field-${I.field}`,
                fn: ne((A) => [
                  W(u.$slots, `field-${I.field}`, lt(st(A)))
                ])
              }))
            ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "disabled", "width"])
          ];
        })
      ]);
    };
  }
}), mo = /* @__PURE__ */ re({
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
    }, o = H(() => (t.map ?? a)[t.value] ?? { label: t.value, severity: "secondary" });
    return (l, i) => (s(), F(v(Ct), {
      value: o.value.label,
      severity: o.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), po = { class: "w-page-header" }, vo = { class: "w-page-header-content" }, go = { class: "w-page-header-title" }, ho = {
  key: 0,
  class: "w-page-header-subtitle"
}, yo = { class: "w-page-header-actions" }, Jl = /* @__PURE__ */ re({
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
    return (o, l) => (s(), p("div", po, [
      h("div", vo, [
        h("h2", go, T(e.title), 1),
        e.subtitle ? (s(), p("p", ho, T(e.subtitle), 1)) : k("", !0)
      ]),
      h("div", yo, [
        W(o.$slots, "actions"),
        e.actionLabel ? (s(), F(v(ae), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: l[0] || (l[0] = (i) => a("action"))
        }, null, 8, ["label", "icon"])) : k("", !0)
      ])
    ]));
  }
}), bo = { class: "w-empty-state" }, wo = { class: "w-empty-state-icon" }, ko = { class: "w-empty-state-title" }, $o = {
  key: 0,
  class: "w-empty-state-description"
}, Zl = /* @__PURE__ */ re({
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
    return (o, l) => (s(), p("div", bo, [
      h("div", wo, [
        h("i", {
          class: ie(e.icon)
        }, null, 2)
      ]),
      h("p", ko, T(e.title), 1),
      e.description ? (s(), p("p", $o, T(e.description), 1)) : k("", !0),
      e.actionLabel ? (s(), F(v(ae), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: l[0] || (l[0] = (i) => a("action"))
      }, null, 8, ["label", "icon"])) : k("", !0)
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
const Co = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
function Do() {
  return Ie(Co);
}
const xo = { class: "w-detail-header" }, So = { class: "w-detail-header-left" }, Po = { class: "w-detail-header-content" }, Vo = { class: "w-detail-header-title" }, Eo = {
  key: 0,
  class: "w-detail-header-subtitle"
}, Mo = { class: "w-detail-header-actions" }, Xl = /* @__PURE__ */ re({
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
    const t = e, a = Do();
    function o() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (l, i) => (s(), p("div", xo, [
      h("div", So, [
        N(v(ae), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: o
        }),
        e.icon ? (s(), p("i", {
          key: 0,
          class: ie([e.icon, "w-detail-header-icon"])
        }, null, 2)) : k("", !0),
        h("div", Po, [
          h("h2", Vo, T(e.title), 1),
          e.subtitle ? (s(), p("p", Eo, T(e.subtitle), 1)) : k("", !0)
        ]),
        e.status ? (s(), F(mo, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : k("", !0)
      ]),
      h("div", Mo, [
        W(l.$slots, "actions")
      ])
    ]));
  }
}), Fo = { class: "w-info-card" }, Ao = {
  key: 0,
  class: "w-info-card-title"
}, Ro = { class: "w-info-card-grid" }, Io = { class: "w-info-card-label" }, To = { class: "w-info-card-value" }, Ql = /* @__PURE__ */ re({
  __name: "WInfoCard",
  props: {
    title: {},
    fields: {}
  },
  setup(e) {
    const { formatCurrency: t, formatDate: a, formatNumber: o } = rt();
    function l(i) {
      const r = i.value;
      return r == null || r === "" ? "-" : i.format === "currency" ? t(Number(r)) : i.format === "date" ? a(String(r)) : i.format === "datetime" ? a(String(r), "DD/MM/YYYY HH:mm") : i.format === "number" ? o(Number(r)) : String(r);
    }
    return (i, r) => (s(), p("div", Fo, [
      e.title ? (s(), p("h3", Ao, T(e.title), 1)) : k("", !0),
      h("div", Ro, [
        (s(!0), p(le, null, se(e.fields, (y) => (s(), p("div", {
          key: y.label,
          class: "w-info-card-field"
        }, [
          h("span", Io, T(y.label), 1),
          h("span", To, T(l(y)), 1)
        ]))), 128))
      ])
    ]));
  }
}), Lo = {
  key: 0,
  class: "w-kpi-card__loading"
}, zo = { class: "w-kpi-card__loading-content" }, No = { class: "w-kpi-card__header" }, Yo = {
  key: 0,
  class: "w-kpi-card__icon"
}, Oo = {
  key: 1,
  class: "w-kpi-card__trend"
}, Bo = { class: "w-kpi-card__content" }, Wo = { class: "w-kpi-card__label" }, jo = { class: "w-kpi-card__value" }, Uo = {
  key: 0,
  class: "w-kpi-card__hint"
}, qo = {
  key: 0,
  class: "w-kpi-card__footer"
}, Ho = /* @__PURE__ */ re({
  __name: "WKpiCard",
  props: {
    label: {},
    value: {},
    icon: {},
    hint: {},
    severity: {},
    trend: {},
    loading: { type: Boolean }
  },
  setup(e) {
    return (t, a) => (s(), p("article", {
      class: ie(["w-kpi-card", e.severity ? `w-kpi-card--${e.severity}` : ""])
    }, [
      e.loading ? (s(), p("div", Lo, [
        N(v(Ge), {
          shape: "circle",
          size: "2.75rem"
        }),
        h("div", zo, [
          N(v(Ge), {
            width: "6rem",
            height: "0.75rem"
          }),
          N(v(Ge), {
            width: "7.5rem",
            height: "1.5rem"
          }),
          N(v(Ge), {
            width: "5rem",
            height: "0.75rem"
          })
        ])
      ])) : (s(), p(le, { key: 1 }, [
        h("div", No, [
          e.icon || t.$slots.icon ? (s(), p("div", Yo, [
            W(t.$slots, "icon", {}, () => [
              e.icon ? (s(), p("i", {
                key: 0,
                class: ie(e.icon)
              }, null, 2)) : k("", !0)
            ])
          ])) : k("", !0),
          e.trend || t.$slots.trend ? (s(), p("div", Oo, [
            W(t.$slots, "trend", {}, () => [
              e.trend ? (s(), p("span", {
                key: 0,
                class: ie(["w-kpi-card__trend-badge", e.trend.direction ? `w-kpi-card__trend-badge--${e.trend.direction}` : ""])
              }, T(e.trend.value), 3)) : k("", !0)
            ])
          ])) : k("", !0)
        ]),
        h("div", Bo, [
          h("p", Wo, T(e.label), 1),
          h("div", jo, [
            W(t.$slots, "value", {}, () => [
              Ee(T(e.value), 1)
            ])
          ]),
          e.hint || t.$slots.hint ? (s(), p("p", Uo, [
            W(t.$slots, "hint", {}, () => [
              Ee(T(e.hint), 1)
            ])
          ])) : k("", !0)
        ]),
        t.$slots.footer ? (s(), p("footer", qo, [
          W(t.$slots, "footer")
        ])) : k("", !0)
      ], 64))
    ], 2));
  }
}), _l = /* @__PURE__ */ re({
  __name: "WKpiGrid",
  props: {
    items: { default: () => [] },
    columns: { default: 4 },
    dense: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = H(() => [
      `w-kpi-grid--cols-${t.columns}`,
      { "w-kpi-grid--dense": t.dense }
    ]);
    return (o, l) => (s(), p("div", {
      class: ie(["w-kpi-grid", a.value])
    }, [
      o.$slots.item ? (s(!0), p(le, { key: 0 }, se(e.items, (i, r) => W(o.$slots, "item", {
        key: r,
        item: i,
        index: r
      })), 128)) : (s(!0), p(le, { key: 1 }, se(e.items, (i, r) => (s(), F(Ho, {
        key: r,
        label: i.label,
        value: i.value,
        icon: i.icon,
        severity: i.severity || "primary",
        hint: i.hint,
        trend: i.trend,
        loading: i.loading
      }, null, 8, ["label", "value", "icon", "severity", "hint", "trend", "loading"]))), 128))
    ], 2));
  }
}), Ko = { class: "w-section-header__main" }, Go = {
  key: 0,
  class: "w-section-header__icon"
}, Jo = { class: "w-section-header__content" }, Zo = { class: "w-section-header__title-row" }, Xo = { class: "w-section-header__title" }, Qo = {
  key: 0,
  class: "w-section-header__subtitle"
}, _o = {
  key: 0,
  class: "w-section-header__actions"
}, es = /* @__PURE__ */ re({
  __name: "WSectionHeader",
  props: {
    title: {},
    subtitle: {},
    icon: {},
    compact: { type: Boolean }
  },
  setup(e) {
    return (t, a) => (s(), p("div", {
      class: ie(["w-section-header", { "w-section-header--compact": e.compact }])
    }, [
      h("div", Ko, [
        e.icon || t.$slots.icon ? (s(), p("div", Go, [
          W(t.$slots, "icon", {}, () => [
            e.icon ? (s(), p("i", {
              key: 0,
              class: ie(e.icon)
            }, null, 2)) : k("", !0)
          ])
        ])) : k("", !0),
        h("div", Jo, [
          h("div", Zo, [
            h("h3", Xo, T(e.title), 1),
            W(t.$slots, "meta")
          ]),
          e.subtitle ? (s(), p("p", Qo, T(e.subtitle), 1)) : k("", !0)
        ])
      ]),
      t.$slots.actions ? (s(), p("div", _o, [
        W(t.$slots, "actions")
      ])) : k("", !0)
    ], 2));
  }
}), el = {
  key: 0,
  class: "w-form-section__header"
}, tl = { class: "w-form-section__content" }, al = { class: "w-form-section__title" }, nl = {
  key: 0,
  class: "w-form-section__description"
}, ol = {
  key: 0,
  class: "w-form-section__actions"
}, ll = { class: "w-form-section__body" }, ts = /* @__PURE__ */ re({
  __name: "WFormSection",
  props: {
    title: {},
    description: {},
    variant: {}
  },
  setup(e) {
    return (t, a) => (s(), p("section", {
      class: ie(["w-form-section", e.variant ? `w-form-section--${e.variant}` : ""])
    }, [
      e.title || e.description || t.$slots.actions ? (s(), p("div", el, [
        h("div", tl, [
          h("h3", al, T(e.title), 1),
          e.description ? (s(), p("p", nl, T(e.description), 1)) : k("", !0)
        ]),
        t.$slots.actions ? (s(), p("div", ol, [
          W(t.$slots, "actions")
        ])) : k("", !0)
      ])) : k("", !0),
      h("div", ll, [
        W(t.$slots, "default")
      ])
    ], 2));
  }
}), sl = {
  key: 0,
  class: "w-action-bar__primary"
}, il = {
  key: 1,
  class: "w-action-bar__filters"
}, rl = {
  key: 2,
  class: "w-action-bar__secondary"
}, as = /* @__PURE__ */ re({
  __name: "WActionBar",
  props: {
    align: { default: "between" },
    stackOnMobile: { type: Boolean, default: !0 }
  },
  setup(e) {
    return (t, a) => (s(), p("div", {
      class: ie(["w-action-bar", [
        `w-action-bar--${e.align}`,
        { "w-action-bar--stack": e.stackOnMobile }
      ]])
    }, [
      t.$slots.primary || t.$slots.default ? (s(), p("div", sl, [
        W(t.$slots, "primary", {}, () => [
          W(t.$slots, "default")
        ])
      ])) : k("", !0),
      t.$slots.filters ? (s(), p("div", il, [
        W(t.$slots, "filters")
      ])) : k("", !0),
      t.$slots.secondary ? (s(), p("div", rl, [
        W(t.$slots, "secondary")
      ])) : k("", !0)
    ], 2));
  }
}), ul = { class: "w-progress-flow__marker" }, dl = { class: "w-progress-flow__content" }, cl = { class: "w-progress-flow__label" }, fl = {
  key: 0,
  class: "w-progress-flow__description"
}, ns = /* @__PURE__ */ re({
  __name: "WProgressFlow",
  props: {
    steps: {},
    currentStep: {},
    orientation: { default: "horizontal" }
  },
  setup(e) {
    const t = e, a = H(
      () => t.steps.findIndex((l) => l.key === t.currentStep)
    );
    function o(l) {
      return l < a.value ? "done" : l === a.value ? "current" : "pending";
    }
    return (l, i) => (s(), p("div", {
      class: ie(["w-progress-flow", `w-progress-flow--${e.orientation}`])
    }, [
      (s(!0), p(le, null, se(e.steps, (r, y) => (s(), p("div", {
        key: r.key,
        class: ie(["w-progress-flow__step", `w-progress-flow__step--${o(y)}`])
      }, [
        W(l.$slots, "step", {
          step: r,
          index: y,
          state: o(y)
        }, () => [
          h("div", ul, [
            h("span", null, T(y + 1), 1)
          ]),
          h("div", dl, [
            h("p", cl, T(r.label), 1),
            r.description ? (s(), p("p", fl, T(r.description), 1)) : k("", !0)
          ])
        ])
      ], 2))), 128))
    ], 2));
  }
});
function ml(e, t, a) {
  const o = e;
  return Array.isArray(o.results) ? {
    data: o.results,
    page: o.page ?? t,
    page_size: o.page_size ?? a,
    rows: o.count ?? 0,
    extras: o.extras ?? {}
  } : Array.isArray(o.data) ? {
    data: o.data,
    page: o.page ?? t,
    page_size: o.page_size ?? a,
    rows: o.rows ?? 0,
    extras: o.extras ?? {}
  } : {
    data: Array.isArray(e) ? e : [],
    page: t,
    page_size: a,
    rows: Array.isArray(e) ? e.length : 0,
    extras: {}
  };
}
function pl(e) {
  return {
    async list(t, a = {}) {
      const o = await e.get(t, { params: a });
      return ml(
        o.data,
        Number(a.page ?? 1),
        Number(a.page_size ?? 20)
      );
    },
    async get(t, a, o) {
      return { data: (await e.get(`${t}${a}/`, o)).data };
    },
    async create(t, a, o) {
      return { data: (await e.post(t, a, o)).data };
    },
    async update(t, a, o, l) {
      return { data: (await e.patch(
        `${t}${a}/`,
        o,
        l
      )).data };
    },
    async delete(t, a) {
      await e.delete(`${t}${a}/`);
    }
  };
}
const os = {
  install(e, t) {
    if (!(t != null && t.axios) && !(t != null && t.dataProvider))
      throw new Error(
        '[wPrimeVueComponents] Informe "axios" ou "dataProvider" ao registrar o WPrimeVuePlugin.'
      );
    const a = t.dataProvider ?? pl(t.axios), o = {
      axios: t.axios,
      dataProvider: a,
      defaultPageSize: t.defaultPageSize ?? 20,
      dateFormat: t.dateFormat ?? "DD/MM/YYYY",
      dateTimeFormat: t.dateTimeFormat ?? "DD/MM/YYYY HH:mm",
      locale: t.locale ?? "pt-BR",
      currency: t.currency ?? "BRL"
    };
    t.axios && e.provide(oa, t.axios), e.provide(_e, a), e.provide(et, o), t.registerComponents !== !1 && (e.component("WCrudView", fo), e.component("WCrudFormDialog", ut), e.component("WCrudColumnRenderer", Qe), e.component("WAutoCompleteFK", Lt), e.component("WMoneyInput", zt), e.component("WTransferList", Nt));
  }
}, vl = {
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
function gl(e, t) {
  const a = {};
  for (const o of Object.keys(t))
    JSON.stringify(e[o]) !== JSON.stringify(t[o]) && (a[o] = t[o]);
  return a;
}
function ls(e) {
  const {
    endpoint: t,
    columns: a,
    form: o,
    pk: l = "id",
    searchDebounce: i = 300,
    partialUpdate: r = !0,
    canCreate: y = !0,
    canEdit: d = !0,
    canDelete: w = !0,
    rowActions: M = void 0,
    filterParams: S = void 0,
    createDefaults: Y = void 0,
    transformPayload: z = void 0,
    onAfterSave: Z = void 0,
    onAfterDelete: J = void 0
  } = e, g = Ie(_e);
  if (!g)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const b = g, $ = Ie(et), V = e.pageSize ?? ($ == null ? void 0 : $.defaultPageSize) ?? 20, L = { ...vl, ...e.labels }, U = It(), { confirmDelete: K } = Tt(), O = q([]), G = q({}), X = q(!1), oe = q(!1), _ = q(""), ee = q(!1), f = q(!1), x = q(null), u = ge({});
  let n = null;
  const m = ge({
    page: 1,
    pageSize: V,
    rows: 0,
    totalPages: 0
  }), c = ge({
    field: null,
    order: 0
  });
  function I() {
    const D = {};
    for (const E of o)
      D[E.field] = E.defaultValue !== void 0 ? typeof E.defaultValue == "function" ? E.defaultValue() : E.defaultValue : null;
    return D;
  }
  const A = I();
  for (const D of Object.keys(A))
    u[D] = A[D];
  const j = H(
    () => x.value !== null && !f.value
  ), de = H(() => f.value), pe = H(
    () => f.value ? L.viewTitle ?? "Visualizar Registro" : j.value ? L.editTitle : L.createTitle
  ), Ne = H(() => m.page <= 1), Ye = H(() => m.page >= m.totalPages);
  let he = null;
  async function me(D = {}) {
    X.value = !0;
    try {
      const E = {
        page: m.page,
        page_size: m.pageSize,
        ...D
      };
      _.value && (E.search = _.value), c.field && c.order !== 0 && (E.ordering = c.order === -1 ? `-${c.field}` : c.field), S && Object.assign(E, S());
      const R = await b.list(t, E);
      O.value = R.data, m.rows = R.rows, G.value = R.extras ?? {}, R.page && (m.page = R.page), R.page_size && (m.pageSize = R.page_size), m.totalPages = Math.ceil(m.rows / m.pageSize) || 0;
    } finally {
      X.value = !1;
    }
  }
  async function ye() {
    await me();
  }
  async function ve() {
    await me();
  }
  async function De(D = 200) {
    const E = {};
    _.value && (E.search = _.value), c.field && c.order !== 0 && (E.ordering = c.order === -1 ? `-${c.field}` : c.field), S && Object.assign(E, S());
    const R = [];
    let Q = 1;
    const Le = 1e4;
    for (; Q <= Le; ) {
      const we = await b.list(t, {
        ...E,
        page: Q,
        page_size: D
      });
      R.push(...we.data);
      const be = we.rows ?? R.length;
      if (we.data.length === 0 || R.length >= be) break;
      Q++;
    }
    return R;
  }
  function xe(D) {
    _.value = D, he && clearTimeout(he), he = setTimeout(() => {
      m.page = 1, me();
    }, i);
  }
  function Fe(D) {
    const E = D.target;
    xe(E.value);
  }
  function ke(D) {
    m.page = D, me();
  }
  function Se() {
    ke(1);
  }
  function Pe() {
    ke(m.totalPages);
  }
  function Ae(D) {
    m.page = D.page + 1, m.pageSize = D.rows, me();
  }
  function Re(D) {
    c.field = D.sortField ?? null, c.order = D.sortOrder ?? 0, m.page = 1, me();
  }
  function $e() {
    const D = I();
    for (const E of Object.keys(D))
      u[E] = D[E];
  }
  function C(D, E) {
    u[D] = E;
  }
  function P() {
    if (f.value = !1, x.value = null, n = null, $e(), Y) {
      const D = Y();
      for (const [E, R] of Object.entries(D))
        u[E] = R;
    }
    ee.value = !0;
  }
  function te(D) {
    const E = {};
    for (const R of o) {
      let Q = D[R.field] !== void 0 ? D[R.field] : null;
      Q && (R.type === "date" || R.type === "datetime") && typeof Q == "string" && (Q = it(Q)), u[R.field] = Q, E[R.field] = Q;
    }
    n = E;
  }
  function B(D) {
    f.value = !1, x.value = D, te(D), ee.value = !0;
  }
  function ue(D) {
    f.value = !0, x.value = D, te(D), ee.value = !0;
  }
  function Ot(D) {
    f.value = !1, x.value = null, n = null, $e();
    for (const E of o) {
      if (E.field === l) continue;
      let R = D[E.field] !== void 0 ? D[E.field] : u[E.field];
      R && (E.type === "date" || E.type === "datetime") && typeof R == "string" && (R = it(R)), u[E.field] = R;
    }
    if (Y) {
      const E = Y();
      for (const [R, Q] of Object.entries(E))
        u[R] = Q;
    }
    ee.value = !0;
  }
  function dt(D) {
    const E = { ...D };
    for (const R of o) {
      const Q = E[R.field];
      if (R.type === "date" && Q instanceof Date ? E[R.field] = St(Q) : R.type === "datetime" && Q instanceof Date && (E[R.field] = Pt(Q)), R.type === "fk" && Q !== null && typeof Q == "object") {
        const Le = R.optionValue || "id";
        E[R.field] = Q[Le] ?? Q;
      }
      (R.type === "mask" || R.type === "cpf_cnpj") && typeof Q == "string" && (E[R.field] = Me(Q));
    }
    return E;
  }
  async function Bt() {
    for (const D of o) {
      if (D.validate) {
        const E = D.validate(u[D.field]);
        if (E)
          return U.error(E), null;
      }
      if (D.required) {
        const E = u[D.field];
        if (E == null || E === "")
          return U.error(`${D.label} é obrigatório`), null;
      }
    }
    oe.value = !0;
    try {
      let D = dt(u);
      if (!j.value && Y && Object.assign(D, Y()), j.value && r && n) {
        const be = dt(n);
        if (D = gl(be, D), Object.keys(D).length === 0 && !z) {
          ee.value = !1;
          const Ve = x.value;
          return x.value = null, n = null, Ve;
        }
      }
      z && (D = z(D, j.value));
      const E = o.some(
        (be) => be.type === "image" && D[be.field] instanceof File
      );
      let R = D, Q;
      if (E) {
        const be = new Set(
          o.filter((Ce) => Ce.type === "image").map((Ce) => Ce.field)
        ), Ve = new FormData();
        for (const [Ce, Oe] of Object.entries(D))
          if (Oe != null)
            if (Oe instanceof File)
              Ve.append(Ce, Oe);
            else {
              if (be.has(Ce))
                continue;
              Ve.append(Ce, String(Oe));
            }
        R = Ve, Q = { "Content-Type": "multipart/form-data" };
      }
      const Le = Q ? { headers: Q } : void 0;
      let we;
      if (j.value && x.value) {
        const be = x.value[l];
        we = await b.update(
          t,
          be,
          R,
          Le
        );
        const Ve = O.value.findIndex((Ce) => Ce[l] === be);
        Ve !== -1 && (O.value[Ve] = we.data), U.success(L.successUpdate);
      } else
        we = await b.create(t, R, Le), O.value.unshift(we.data), m.rows++, U.success(L.successCreate);
      return ee.value = !1, x.value = null, n = null, Z && Z(we.data, j.value), we.data;
    } catch (D) {
      return U.error(Ke(D, "Erro ao salvar registro")), null;
    } finally {
      oe.value = !1;
    }
  }
  function Wt(D) {
    K(async () => {
      try {
        const E = D[l];
        await b.delete(t, E);
        const R = O.value.findIndex((Q) => Q[l] === E);
        R !== -1 && (O.value.splice(R, 1), m.rows--), U.success(L.successDelete), J && J(D);
      } catch (E) {
        U.error(Ke(E, "Erro ao excluir registro"));
      }
    }, L.deleteConfirmMessage);
  }
  return {
    items: O,
    extras: G,
    loading: X,
    saving: oe,
    search: _,
    dialogVisible: ee,
    editingItem: x,
    formData: u,
    pagination: m,
    sort: c,
    isEditing: j,
    isViewing: de,
    viewMode: f,
    dialogTitle: pe,
    isFirstPage: Ne,
    isLastPage: Ye,
    init: ye,
    fetchItems: me,
    fetchAll: De,
    refresh: ve,
    setSearch: xe,
    onSearch: Fe,
    onPage: Ae,
    onSort: Re,
    openCreateDialog: P,
    openEditDialog: B,
    openViewDialog: ue,
    openDuplicateDialog: Ot,
    save: Bt,
    confirmDelete: Wt,
    setFormField: C,
    resetForm: $e,
    goToPage: ke,
    firstPage: Se,
    lastPage: Pe,
    config: e
  };
}
function ss(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: o = !1 } = e, l = Ie(_e);
  if (!l)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const i = l, r = Ie(et), y = e.pageSize ?? (r == null ? void 0 : r.defaultPageSize) ?? 20, d = q([]), w = q(!1), M = q(""), S = q({}), Y = ge({}), z = ge({
    page: 1,
    pageSize: y,
    rows: 0,
    totalPages: 0
  }), Z = ge({
    field: null,
    order: 0
  });
  let J = null;
  async function g(O = {}) {
    w.value = !0;
    try {
      const G = {
        page: z.page,
        page_size: z.pageSize,
        ...O
      };
      M.value && (G.search = M.value), Z.field && Z.order !== 0 && (G.ordering = Z.order === -1 ? `-${Z.field}` : Z.field);
      for (const [oe, _] of Object.entries(Y))
        _ != null && _ !== "" && (G[oe] = _);
      const X = await i.list(t, G);
      d.value = X.data, z.rows = X.rows, X.page && (z.page = X.page), X.page_size && (z.pageSize = X.page_size), z.totalPages = Math.ceil(z.rows / z.pageSize) || 0, S.value = X.extras ?? {};
    } finally {
      w.value = !1;
    }
  }
  async function b() {
    await g();
  }
  function $(O) {
    M.value = O, J && clearTimeout(J), J = setTimeout(() => {
      z.page = 1, g();
    }, a);
  }
  function V(O, G) {
    Y[O] = G, z.page = 1, g();
  }
  function L() {
    for (const O of Object.keys(Y))
      delete Y[O];
    z.page = 1, g();
  }
  function U(O) {
    z.page = O.page + 1, z.pageSize = O.rows, g();
  }
  function K(O) {
    Z.field = O.sortField ?? null, Z.order = O.sortOrder ?? 0, z.page = 1, g();
  }
  return o && g(), {
    items: d,
    loading: w,
    search: M,
    pagination: z,
    sort: Z,
    extras: S,
    fetchItems: g,
    refresh: b,
    setSearch: $,
    setFilter: V,
    clearFilters: L,
    onPage: U,
    onSort: K
  };
}
function hl(e) {
  return e.split("?")[0].replace(/^\/+|\/+$/g, "").replace(/^api\/v\d+\//, "");
}
function yl(e) {
  return typeof e == "string" ? { table: e } : e;
}
function Yt(e, t = 400) {
  return {
    response: {
      status: t,
      data: { detail: e }
    },
    message: e
  };
}
function wt(e) {
  if (e instanceof FormData)
    throw Yt(
      "SupabaseDataProvider nao envia FormData diretamente. Faça upload do arquivo no Storage e envie a URL/caminho no payload."
    );
  return e;
}
function Be(e) {
  throw {
    response: {
      data: {
        detail: (e == null ? void 0 : e.message) ?? "Erro ao consultar Supabase",
        code: e == null ? void 0 : e.code,
        details: e == null ? void 0 : e.details,
        hint: e == null ? void 0 : e.hint
      }
    },
    message: (e == null ? void 0 : e.message) ?? "Erro ao consultar Supabase"
  };
}
function We(e, t) {
  var l, i;
  const a = hl(e), o = (l = t.resources) == null ? void 0 : l[a];
  if (o)
    return yl(o);
  if ((i = t.allowedTables) != null && i.includes(a))
    return { table: a };
  throw Yt(
    `Recurso Supabase nao registrado para o endpoint "${e}".`,
    404
  );
}
function bl(e, t, a) {
  const o = /* @__PURE__ */ new Set(["page", "page_size", "search", "ordering"]), l = { ...a.defaultFilters, ...t };
  for (const [i, r] of Object.entries(l))
    o.has(i) || r === null || r === void 0 || r === "" || (e = e.eq(i, r));
  return e;
}
function wl(e, t, a) {
  if (typeof t != "string" || !t.trim() || !(a != null && a.length))
    return e;
  const o = t.trim().replace(/,/g, "\\,"), l = a.map((i) => `${i}.ilike.%${o}%`).join(",");
  return e.or(l);
}
function kl(e, t) {
  const a = typeof e == "string" && e ? e : t;
  return a ? {
    field: a.startsWith("-") ? a.slice(1) : a,
    ascending: !a.startsWith("-")
  } : null;
}
function $l(e, t) {
  return e ? t.mapListItem ? e.map(
    (a) => {
      var o;
      return (o = t.mapListItem) == null ? void 0 : o.call(t, a);
    }
  ) : e : [];
}
function is(e) {
  const t = e.defaultSelect ?? "*";
  return {
    async list(a, o = {}) {
      var Y;
      const l = We(a, e), i = Math.max(Number(o.page ?? 1), 1), r = Math.max(Number(o.page_size ?? 20), 1), y = (i - 1) * r, d = y + r - 1;
      let w = e.client.from(l.table).select(l.select ?? t, { count: "exact" });
      w = bl(w, o, l), w = wl(w, o.search, l.searchFields);
      const M = kl(o.ordering, l.defaultOrdering);
      M && (w = w.order(M.field, { ascending: M.ascending }));
      const S = await w.range(y, d);
      return S.error && Be(S.error), {
        data: $l(S.data, l),
        page: i,
        page_size: r,
        rows: S.count ?? ((Y = S.data) == null ? void 0 : Y.length) ?? 0,
        extras: {}
      };
    },
    async get(a, o, l) {
      const i = We(a, e), r = i.pk ?? "id", y = await e.client.from(i.table).select(i.select ?? t).eq(r, o).single();
      return y.error && Be(y.error), { data: y.data };
    },
    async create(a, o, l) {
      const i = We(a, e), r = wt(o), y = i.mapPayload ? i.mapPayload(r, "create") : r, d = await e.client.from(i.table).insert(y).select(i.select ?? t).single();
      return d.error && Be(d.error), { data: d.data };
    },
    async update(a, o, l, i) {
      const r = We(a, e), y = r.pk ?? "id", d = wt(l), w = r.mapPayload ? r.mapPayload(d, "update") : d, M = await e.client.from(r.table).update(w).eq(y, o).select(r.select ?? t).single();
      return M.error && Be(M.error), { data: M.data };
    },
    async delete(a, o) {
      const l = We(a, e), i = l.pk ?? "id", r = l.softDelete === !0 ? { is_active: !1 } : typeof l.softDelete == "object" ? l.softDelete : null, y = r ? await e.client.from(l.table).update(r).eq(i, o) : await e.client.from(l.table).delete().eq(i, o);
      y.error && Be(y.error);
    }
  };
}
export {
  vl as DEFAULT_CRUD_LABELS,
  as as WActionBar,
  Lt as WAutoCompleteFK,
  Qe as WCrudColumnRenderer,
  ut as WCrudFormDialog,
  fo as WCrudView,
  Xl as WDetailHeader,
  Zl as WEmptyState,
  En as WFormRenderer,
  ts as WFormSection,
  Ql as WInfoCard,
  Ho as WKpiCard,
  _l as WKpiGrid,
  zt as WMoneyInput,
  Jl as WPageHeader,
  os as WPrimeVuePlugin,
  ns as WProgressFlow,
  es as WSectionHeader,
  mo as WStatusTag,
  Nt as WTransferList,
  oa as W_AXIOS_KEY,
  et as W_CONFIG_KEY,
  _e as W_DATA_PROVIDER_KEY,
  pl as createAxiosDataProvider,
  is as createSupabaseDataProvider,
  Rn as downloadCsv,
  Ke as extractApiError,
  La as mapApiFieldToColumnDef,
  Ra as mapApiFieldToFieldDef,
  za as mapApiFieldsToColumnDefs,
  Ia as mapApiFieldsToFieldDefs,
  An as toCsv,
  ss as useApi,
  Gl as useApiError,
  Tt as useAppConfirm,
  It as useAppToast,
  ls as useCrudManager,
  rt as useFormatters
};
//# sourceMappingURL=index.js.map
