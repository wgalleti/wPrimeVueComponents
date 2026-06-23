import { inject as Ie, defineComponent as re, openBlock as s, createElementBlock as c, createBlock as I, unref as g, toDisplayString as R, ref as K, watch as ot, computed as q, reactive as ve, resolveDirective as yt, Fragment as le, createElementVNode as v, createVNode as W, withDirectives as Pe, withCtx as te, createCommentVNode as S, renderList as se, normalizeStyle as Be, createTextVNode as xe, normalizeClass as ue, renderSlot as O, isRef as Wt, withModifiers as Ot, createSlots as nt, normalizeProps as lt, guardReactiveProps as st, useSlots as Bt, onMounted as jt, createStaticVNode as Ut } from "vue";
import bt from "primevue/datatable";
import Le from "primevue/column";
import oe from "primevue/button";
import ce from "primevue/inputtext";
import Ue from "primevue/iconfield";
import _e from "primevue/inputicon";
import _t from "primevue/paginator";
import wt from "primevue/tag";
import Re from "dayjs";
import kt from "primevue/dialog";
import ut from "primevue/inputnumber";
import qt from "primevue/textarea";
import Ht from "primevue/select";
import $t from "primevue/autocomplete";
import dt from "primevue/datepicker";
import Kt from "primevue/toggleswitch";
import Gt from "primevue/colorpicker";
import Jt from "primevue/password";
import { useToast as Zt } from "primevue/usetoast";
import { useConfirm as Xt } from "primevue/useconfirm";
import Qt from "primevue/inputgroup";
import ct from "primevue/inputgroupaddon";
import Ke from "primevue/skeleton";
const ea = Symbol("w-axios"), Qe = Symbol("w-data-provider"), et = Symbol("w-config");
function ta(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Je = { exports: {} }, aa = Je.exports, ft;
function oa() {
  return ft || (ft = 1, (function(e, t) {
    (function(a, o) {
      e.exports = o();
    })(aa, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, o = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, l = /\d/, r = /\d\d/, i = /\d\d?/, y = /\d*[^-_:/,()\s\d]+/, u = {}, k = function(f) {
        return (f = +f) + (f > 68 ? 1900 : 2e3);
      }, M = function(f) {
        return function(b) {
          this[f] = +b;
        };
      }, P = [/[+-]\d\d:?(\d\d)?|Z/, function(f) {
        (this.zone || (this.zone = {})).offset = (function(b) {
          if (!b || b === "Z") return 0;
          var $ = b.match(/([+-]|\d\d)/g), V = 60 * $[1] + (+$[2] || 0);
          return V === 0 ? 0 : $[0] === "+" ? -V : V;
        })(f);
      }], B = function(f) {
        var b = u[f];
        return b && (b.indexOf ? b : b.s.concat(b.f));
      }, Y = function(f, b) {
        var $, V = u.meridiem;
        if (V) {
          for (var T = 1; T <= 24; T += 1) if (f.indexOf(V(T, 0, b)) > -1) {
            $ = T > 12;
            break;
          }
        } else $ = f === (b ? "pm" : "PM");
        return $;
      }, G = { A: [y, function(f) {
        this.afternoon = Y(f, !1);
      }], a: [y, function(f) {
        this.afternoon = Y(f, !0);
      }], Q: [l, function(f) {
        this.month = 3 * (f - 1) + 1;
      }], S: [l, function(f) {
        this.milliseconds = 100 * +f;
      }], SS: [r, function(f) {
        this.milliseconds = 10 * +f;
      }], SSS: [/\d{3}/, function(f) {
        this.milliseconds = +f;
      }], s: [i, M("seconds")], ss: [i, M("seconds")], m: [i, M("minutes")], mm: [i, M("minutes")], H: [i, M("hours")], h: [i, M("hours")], HH: [i, M("hours")], hh: [i, M("hours")], D: [i, M("day")], DD: [r, M("day")], Do: [y, function(f) {
        var b = u.ordinal, $ = f.match(/\d+/);
        if (this.day = $[0], b) for (var V = 1; V <= 31; V += 1) b(V).replace(/\[|\]/g, "") === f && (this.day = V);
      }], w: [i, M("week")], ww: [r, M("week")], M: [i, M("month")], MM: [r, M("month")], MMM: [y, function(f) {
        var b = B("months"), $ = (B("monthsShort") || b.map((function(V) {
          return V.slice(0, 3);
        }))).indexOf(f) + 1;
        if ($ < 1) throw new Error();
        this.month = $ % 12 || $;
      }], MMMM: [y, function(f) {
        var b = B("months").indexOf(f) + 1;
        if (b < 1) throw new Error();
        this.month = b % 12 || b;
      }], Y: [/[+-]?\d+/, M("year")], YY: [r, function(f) {
        this.year = k(f);
      }], YYYY: [/\d{4}/, M("year")], Z: P, ZZ: P };
      function Z(f) {
        var b, $;
        b = f, $ = u && u.formats;
        for (var V = (f = b.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(A, L, X) {
          var d = X && X.toUpperCase();
          return L || $[X] || a[X] || $[d].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(E, F, n) {
            return F || n.slice(1);
          }));
        }))).match(o), T = V.length, j = 0; j < T; j += 1) {
          var w = V[j], h = G[w], U = h && h[0], m = h && h[1];
          V[j] = m ? { regex: U, parser: m } : w.replace(/^\[|\]$/g, "");
        }
        return function(A) {
          for (var L = {}, X = 0, d = 0; X < T; X += 1) {
            var E = V[X];
            if (typeof E == "string") d += E.length;
            else {
              var F = E.regex, n = E.parser, p = A.slice(d), J = F.exec(p)[0];
              n.call(L, J), A = A.replace(J, "");
            }
          }
          return (function(ne) {
            var Q = ne.afternoon;
            if (Q !== void 0) {
              var _ = ne.hours;
              Q ? _ < 12 && (ne.hours += 12) : _ === 12 && (ne.hours = 0), delete ne.afternoon;
            }
          })(L), L;
        };
      }
      return function(f, b, $) {
        $.p.customParseFormat = !0, f && f.parseTwoDigitYear && (k = f.parseTwoDigitYear);
        var V = b.prototype, T = V.parse;
        V.parse = function(j) {
          var w = j.date, h = j.utc, U = j.args;
          this.$u = h;
          var m = U[1];
          if (typeof m == "string") {
            var A = U[2] === !0, L = U[3] === !0, X = A || L, d = U[2];
            L && (d = U[2]), u = this.$locale(), !A && d && (u = $.Ls[d]), this.$d = (function(p, J, ne, Q) {
              try {
                if (["x", "X"].indexOf(J) > -1) return new Date((J === "X" ? 1e3 : 1) * p);
                var _ = Z(J)(p), de = _.year, me = _.month, Ne = _.day, Ye = _.hours, ge = _.minutes, fe = _.seconds, he = _.milliseconds, pe = _.zone, ye = _.week, Ee = /* @__PURE__ */ new Date(), be = Ne || (de || me ? 1 : Ee.getDate()), Me = de || Ee.getFullYear(), $e = 0;
                de && !me || ($e = me > 0 ? me - 1 : Ee.getMonth());
                var De, Fe = Ye || 0, Ce = ge || 0, Ae = fe || 0, D = he || 0;
                return pe ? new Date(Date.UTC(Me, $e, be, Fe, Ce, Ae, D + 60 * pe.offset * 1e3)) : ne ? new Date(Date.UTC(Me, $e, be, Fe, Ce, Ae, D)) : (De = new Date(Me, $e, be, Fe, Ce, Ae, D), ye && (De = Q(De).week(ye).toDate()), De);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(w, m, h, $), this.init(), d && d !== !0 && (this.$L = this.locale(d).$L), X && w != this.format(m) && (this.$d = /* @__PURE__ */ new Date("")), u = {};
          } else if (m instanceof Array) for (var E = m.length, F = 1; F <= E; F += 1) {
            U[1] = m[F - 1];
            var n = $.apply(this, U);
            if (n.isValid()) {
              this.$d = n.$d, this.$L = n.$L, this.init();
              break;
            }
            F === E && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else T.call(this, j);
        };
      };
    }));
  })(Je)), Je.exports;
}
var na = oa();
const la = /* @__PURE__ */ ta(na);
Re.extend(la);
function Dt(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const t = Re(e, "YYYY-MM-DD", !0);
  return t.isValid() ? t.toDate() : Re(e).toDate();
}
function Ct(e) {
  return e ? typeof e == "string" ? e : Re(e).format("YYYY-MM-DD") : null;
}
function St(e) {
  return e ? typeof e == "string" ? e : Re(e).toISOString() : null;
}
function sa(e, t = "DD/MM/YYYY") {
  return e ? Re(e).format(t) : "—";
}
function ra(e) {
  return e ? Re(e).format("DD/MM/YYYY HH:mm") : "—";
}
function Ve(e) {
  return e.replace(/\D/g, "");
}
function Pt(e) {
  if (!e) return "—";
  const t = Ve(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function xt(e) {
  if (!e) return "—";
  const t = Ve(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function ia(e) {
  if (!e) return "—";
  const t = Ve(e);
  return t.length === 11 ? Pt(e) : t.length === 14 ? xt(e) : e;
}
function ua(e) {
  if (!e) return "—";
  const t = Ve(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function Vt(e) {
  if (!e) return null;
  const t = Ve(e);
  if (t.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(t)) return "CPF inválido.";
  let a = 0;
  for (let i = 0; i < 9; i++) a += parseInt(t[i]) * (10 - i);
  let o = a % 11;
  const l = o < 2 ? 0 : 11 - o;
  if (parseInt(t[9]) !== l) return "CPF inválido.";
  a = 0;
  for (let i = 0; i < 10; i++) a += parseInt(t[i]) * (11 - i);
  o = a % 11;
  const r = o < 2 ? 0 : 11 - o;
  return parseInt(t[10]) !== r ? "CPF inválido." : null;
}
function Et(e) {
  if (!e) return null;
  const t = Ve(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let o = 0;
  for (let u = 0; u < 12; u++) o += parseInt(t[u]) * a[u];
  let l = o % 11;
  const r = l < 2 ? 0 : 11 - l;
  if (parseInt(t[12]) !== r) return "CNPJ inválido.";
  const i = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  o = 0;
  for (let u = 0; u < 13; u++) o += parseInt(t[u]) * i[u];
  l = o % 11;
  const y = l < 2 ? 0 : 11 - l;
  return parseInt(t[13]) !== y ? "CNPJ inválido." : null;
}
function da(e) {
  if (!e) return null;
  const t = Ve(e);
  return t.length === 11 ? Vt(e) : t.length === 14 ? Et(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const Ze = /* @__PURE__ */ new Map();
function mt(e, t) {
  const a = `${e}-${t}`;
  let o = Ze.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }), Ze.set(a, o)), o;
}
function ca(e, t) {
  const a = `${e}-${t}`;
  let o = Ze.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    style: "currency",
    currency: t
  }), Ze.set(a, o)), o;
}
function rt() {
  const e = Ie(et, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), t = (e == null ? void 0 : e.locale) ?? "pt-BR", a = (e == null ? void 0 : e.currency) ?? "BRL";
  function o(u) {
    return u == null ? "—" : ca(t, a).format(u);
  }
  function l(u, k = 2) {
    return u == null ? "—" : mt(t, k).format(u);
  }
  function r(u, k) {
    return sa(u, k ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function i(u) {
    return ra(u);
  }
  function y(u) {
    return u == null ? "—" : `${mt(t, 2).format(u)}%`;
  }
  return {
    formatCurrency: o,
    formatNumber: l,
    formatDate: r,
    formatDateTime: i,
    formatPercent: y,
    formatCpf: Pt,
    formatCnpj: xt,
    formatCpfCnpj: ia,
    formatTelefone: ua,
    validateCpf: Vt,
    validateCnpj: Et,
    validateCpfCnpj: da,
    parseDate: Dt,
    toDateString: Ct,
    toDateTimeString: St
  };
}
const fa = {
  key: 0,
  class: "text-muted-color text-xs"
}, ma = ["src", "alt"], pa = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, va = {
  key: 4,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, ga = {
  key: 5,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, ha = {
  key: 6,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, ya = {
  key: 7,
  class: "text-[0.8125rem]"
}, Xe = /* @__PURE__ */ re({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: o, formatNumber: l } = rt();
    return (r, i) => e.value == null ? (s(), c("span", fa, "—")) : e.column.type === "image" ? (s(), c("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, ma)) : e.column.type === "boolean" ? (s(), I(g(wt), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (s(), c("span", pa, R(g(t)(e.value)), 1)) : e.column.type === "datetime" ? (s(), c("span", va, R(g(a)(e.value)), 1)) : e.column.type === "currency" ? (s(), c("span", ga, R(g(o)(e.value)), 1)) : e.column.type === "number" ? (s(), c("span", ha, R(e.column.format ? e.column.format(e.value, e.rowData) : g(l)(e.value, e.column.decimals ?? 0)), 1)) : (s(), c("span", ya, R(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var ba = Object.defineProperty, wa = (e, t, a) => t in e ? ba(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, je = (e, t, a) => wa(e, typeof t != "symbol" ? t + "" : t, a);
const pt = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, vt = (e, t, a) => e.replaceAll(t, "").replace(a, ".").replace("..", ".").replace(/[^.\d]/g, ""), gt = (e, t, a) => {
  var o;
  return new Intl.NumberFormat(((o = a.number) == null ? void 0 : o.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
}, ka = (e, t = !0, a) => {
  var o, l, r, i;
  const y = ((o = a.number) == null ? void 0 : o.unsigned) !== !0 && e.startsWith("-") ? "-" : "", u = ((l = a.number) == null ? void 0 : l.fraction) ?? 0;
  let k = gt(0, u, a);
  const M = k.formatToParts(1000.12), P = ((r = M.find((f) => f.type === "group")) == null ? void 0 : r.value) ?? " ", B = ((i = M.find((f) => f.type === "decimal")) == null ? void 0 : i.value) ?? ".", Y = vt(e, P, B);
  if (Number.isNaN(parseFloat(Y))) return y;
  const G = Y.split(".");
  if (G[1] != null && G[1].length >= 1) {
    const f = G[1].length <= u ? G[1].length : u;
    k = gt(f, u, a);
  }
  let Z = k.format(parseFloat(Y));
  return t ? u > 0 && Y.endsWith(".") && !Y.slice(0, -1).includes(".") && (Z += B) : Z = vt(Z, P, B), y + Z;
}, Mt = (e) => JSON.parse(e.replaceAll("'", '"')), $a = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = Da(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = Ge(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = Ge(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = Ge(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = Ca(e.dataset.maskaTokens));
  const o = {};
  return e.dataset.maskaNumberLocale != null && (o.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (o.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (o.unsigned = Ge(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(o).length > 0) && (a.number = o), a;
}, Ge = (e) => e !== "" ? !!JSON.parse(e) : !0, Da = (e) => e.startsWith("[") && e.endsWith("]") ? Mt(e) : e, Ca = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return Mt(e);
  const t = {};
  return e.split("|").forEach((a) => {
    const o = a.split(":");
    t[o[0]] = {
      pattern: Ft() ? new RegExp(o[1], "u") : new RegExp(o[1]),
      optional: o[2] === "optional",
      multiple: o[2] === "multiple",
      repeated: o[2] === "repeated"
    };
  }), t;
}, Ft = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class Sa {
  constructor(t = {}) {
    je(this, "opts", {}), je(this, "memo", /* @__PURE__ */ new Map());
    const a = { ...t };
    if (a.tokens != null) {
      a.tokens = a.tokensReplace ? { ...a.tokens } : { ...pt, ...a.tokens };
      for (const o of Object.values(a.tokens))
        typeof o.pattern == "string" && (o.pattern = Ft() ? new RegExp(o.pattern, "u") : new RegExp(o.pattern));
    } else
      a.tokens = pt;
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
    return t.split("").forEach((l, r) => {
      l === "!" && t[r - 1] !== "!" ? o.push(r - o.length) : a.push(l);
    }), { mask: a.join(""), escaped: o };
  }
  process(t, a, o = !0) {
    if (this.opts.number != null) return ka(t, o, this.opts);
    if (a == null) return t;
    const l = `v=${t},mr=${a},m=${o ? 1 : 0}`;
    if (this.memo.has(l)) return this.memo.get(l);
    const { mask: r, escaped: i } = this.escapeMask(a), y = [], u = this.opts.tokens != null ? this.opts.tokens : {}, k = this.isReversed() ? -1 : 1, M = this.isReversed() ? "unshift" : "push", P = this.isReversed() ? 0 : r.length - 1, B = this.isReversed() ? () => f > -1 && b > -1 : () => f < r.length && b < t.length, Y = (V) => !this.isReversed() && V <= P || this.isReversed() && V >= P;
    let G, Z = -1, f = this.isReversed() ? r.length - 1 : 0, b = this.isReversed() ? t.length - 1 : 0, $ = !1;
    for (; B(); ) {
      const V = r.charAt(f), T = u[V], j = (T == null ? void 0 : T.transform) != null ? T.transform(t.charAt(b)) : t.charAt(b);
      if (!i.includes(f) && T != null ? (j.match(T.pattern) != null ? (y[M](j), T.repeated ? (Z === -1 ? Z = f : f === P && f !== Z && (f = Z - k), P === Z && (f -= k)) : T.multiple && ($ = !0, f -= k), f += k) : T.multiple ? $ && (f += k, b -= k, $ = !1) : j === G ? G = void 0 : T.optional && (f += k, b -= k), b += k) : (o && !this.isEager() && y[M](V), j === V && !this.isEager() ? b += k : G = V, this.isEager() || (f += k)), this.isEager())
        for (; Y(f) && (u[r.charAt(f)] == null || i.includes(f)); ) {
          if (o) {
            if (y[M](r.charAt(f)), t.charAt(b) === r.charAt(f)) {
              f += k, b += k;
              continue;
            }
          } else r.charAt(f) === t.charAt(b) && (b += k);
          f += k;
        }
    }
    return this.memo.set(l, y.join("")), this.memo.get(l);
  }
}
class Pa {
  constructor(t, a = {}) {
    je(this, "items", /* @__PURE__ */ new Map()), je(this, "eventAbortController"), je(this, "onInput", (o) => {
      if (o instanceof CustomEvent && o.type === "input" && !o.isTrusted && !o.bubbles)
        return;
      const l = o.target, r = this.items.get(l);
      if (r === void 0) return;
      const i = "inputType" in o && o.inputType.startsWith("delete"), y = r.isEager(), u = i && y && r.unmasked(l.value) === "" ? "" : l.value;
      this.fixCursor(l, i, () => this.setValue(l, u));
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
        const { signal: r } = this.eventAbortController;
        o.addEventListener("input", this.onInput, { capture: !0, signal: r });
      }
      const l = new Sa($a(o, a));
      this.items.set(o, l), queueMicrotask(() => this.updateValue(o)), o.selectionStart === null && l.isEager() && console.warn("Maska: input of `%s` type is not supported", o.type);
    }
  }
  getInputs(t) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t];
  }
  getOptions(t) {
    const { onMaska: a, preProcess: o, postProcess: l, ...r } = t;
    return r;
  }
  fixCursor(t, a, o) {
    var l, r;
    const i = t.selectionStart, y = t.value;
    if (o(), i === null || i === y.length && !a) return;
    const u = t.value, k = y.slice(0, i), M = u.slice(0, i), P = (l = this.processInput(t, k)) == null ? void 0 : l.unmasked, B = (r = this.processInput(t, M)) == null ? void 0 : r.unmasked;
    if (P === void 0 || B === void 0) return;
    let Y = i;
    k !== M && (Y += a ? u.length - y.length : P.length - B.length), t.setSelectionRange(Y, Y);
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
    let r = o.masked(l);
    return this.options.postProcess != null && (r = this.options.postProcess(r)), {
      masked: r,
      unmasked: o.unmasked(l),
      completed: o.completed(l)
    };
  }
}
const tt = /* @__PURE__ */ new WeakMap(), xa = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, at = (e, t) => {
  var a;
  const o = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (o == null || (o == null ? void 0 : o.type) === "file") return;
  let l = {};
  if (t.value != null && (l = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const r = (i) => {
      const y = t.modifiers.unmasked ? i.unmasked : t.modifiers.completed ? i.completed : i.masked;
      xa(t, y);
    };
    l.onMaska = l.onMaska == null ? r : Array.isArray(l.onMaska) ? [...l.onMaska, r] : [l.onMaska, r];
  }
  tt.has(o) ? (a = tt.get(o)) == null || a.update(l) : tt.set(o, new Pa(o, l));
}, Va = {
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
function Ea(e) {
  var o;
  const t = Va[e.type] ?? "text", a = {
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
function Ma(e) {
  return e.filter((t) => !t.read_only && t.name !== "id").map(Ea);
}
const Fa = {
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
  decimal: "number",
  float: "number",
  integer: "number"
};
function Aa(e) {
  return {
    field: e.type === "fk" ? `${e.name}_nome` : e.name,
    header: e.label,
    type: Fa[e.type],
    sortable: !0
  };
}
function Ia(e, t = 6) {
  return e.filter((a) => !a.read_only && a.name !== "id").slice(0, t).map(Aa);
}
function At() {
  const e = Zt();
  function t(r, i = "Sucesso") {
    e.add({ severity: "success", summary: i, detail: r, life: 3e3 });
  }
  function a(r, i = "Erro") {
    e.add({ severity: "error", summary: i, detail: r, life: 5e3 });
  }
  function o(r, i = "Atenção") {
    e.add({ severity: "warn", summary: i, detail: r, life: 4e3 });
  }
  function l(r, i = "Info") {
    e.add({ severity: "info", summary: i, detail: r, life: 3e3 });
  }
  return { success: t, error: a, warn: o, info: l };
}
function It() {
  const e = Xt();
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
  function a(o, l, r = "Confirmação") {
    e.require({
      message: o,
      header: r,
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
function Ra(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function Ta(e) {
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
      const r = Ra(o);
      if (Array.isArray(l)) {
        const i = l.filter((y) => typeof y == "string");
        i.length > 0 && a.push(`${r}: ${i.join(" ")}`);
      } else typeof l == "string" && a.push(`${r}: ${l}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function qe(e, t = "Erro inesperado") {
  var r;
  if (!e || typeof e != "object") return t;
  const a = e, o = (r = a.response) == null ? void 0 : r.data;
  if (!o || typeof o != "object")
    return a.message || t;
  const l = o.detail ?? o;
  return Ta(l) || t;
}
function Nl() {
  return { extractApiError: qe };
}
const La = { class: "w-autocompletefk" }, Na = ["disabled"], Ya = { class: "w-autocompletefk-toolbar" }, za = { class: "w-autocompletefk-toolbar-actions" }, Wa = { class: "flex items-center justify-end gap-1" }, Oa = { class: "w-autocompletefk-footer" }, Rt = /* @__PURE__ */ re({
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
    const a = e, o = t, l = Ie(Qe);
    if (!l)
      throw new Error(
        "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin."
      );
    const r = l, i = At(), { confirmDelete: y } = It(), u = K(null), k = K([]), M = K(!1);
    let P = null;
    async function B(D) {
      try {
        const C = await r.get(a.endpoint, D);
        u.value = C.data;
      } catch {
        u.value = null;
      }
    }
    async function Y(D) {
      M.value = !0;
      try {
        const C = {
          page_size: 20,
          ...a.endpointParams
        };
        D && (C.search = D);
        const ee = await r.list(a.endpoint, C);
        k.value = ee.data;
      } catch {
        k.value = [];
      } finally {
        M.value = !1;
      }
    }
    function G(D) {
      const C = D.query || "";
      if (C.length < a.minLength) {
        k.value = [];
        return;
      }
      P && clearTimeout(P), P = setTimeout(() => Y(C), 300);
    }
    function Z(D) {
      u.value = D.value, o("update:modelValue", D.value);
    }
    function f() {
      u.value = null, o("update:modelValue", null);
    }
    ot(
      () => a.modelValue,
      async (D) => {
        if (D != null) {
          if (typeof D == "object" && D !== null && a.optionLabel in D) {
            u.value = D;
            return;
          }
          (!u.value || u.value[a.optionValue] !== D) && await B(D);
        } else
          u.value = null;
      },
      { immediate: !0 }
    );
    const b = K(!1), $ = K([]), V = K(!1), T = K(""), j = K(1), w = K(15), h = K(0), U = K(null), m = K(null), A = K(0);
    let L = null;
    const X = K([]), d = q(() => {
      var D;
      return (D = a.crudFields) != null && D.length ? !0 : X.value.length > 0;
    }), E = q(() => a.canCreate ?? d.value), F = q(() => a.canEdit ?? d.value), n = q(() => a.canDelete ?? d.value), p = q(() => F.value || n.value), J = q(() => {
      var D;
      return (D = a.crudFields) != null && D.length ? a.crudFields : Ma(X.value);
    }), ne = q(() => {
      var D, C;
      return (D = a.crudColumns) != null && D.length ? a.crudColumns : (C = a.columns) != null && C.length ? a.columns.map((ee) => ({
        field: ee.field,
        header: ee.header,
        sortable: !0
      })) : X.value.length ? Ia(X.value) : [
        { field: a.optionLabel, header: a.optionLabel, sortable: !0 }
      ];
    });
    async function Q() {
      var D, C, ee;
      V.value = !0;
      try {
        const z = {
          page: j.value,
          page_size: w.value,
          ...a.endpointParams
        };
        T.value && (z.search = T.value), m.value && A.value !== 0 && (z.ordering = A.value === -1 ? `-${m.value}` : m.value);
        const ie = await r.list(a.endpoint, z);
        $.value = ie.data, h.value = ie.rows, (D = ie.extras) != null && D.fields && !((C = a.columns) != null && C.length) && !((ee = a.crudFields) != null && ee.length) && (X.value = ie.extras.fields);
      } catch {
        $.value = [], h.value = 0;
      } finally {
        V.value = !1;
      }
    }
    function _() {
      a.disabled || (T.value = "", j.value = 1, m.value = null, A.value = 0, U.value = null, b.value = !0, Q());
    }
    function de(D) {
      j.value = D.page + 1, w.value = D.rows, Q();
    }
    function me(D) {
      m.value = D.sortField ?? null, A.value = D.sortOrder ?? 0, j.value = 1, Q();
    }
    function Ne() {
      U.value && (u.value = U.value, o("update:modelValue", U.value), b.value = !1);
    }
    function Ye(D) {
      u.value = D.data, o("update:modelValue", D.data), b.value = !1;
    }
    ot(T, () => {
      L && clearTimeout(L), L = setTimeout(() => {
        j.value = 1, Q();
      }, 300);
    });
    const ge = K(!1), fe = K(!1), he = K(null), pe = ve({}), ye = q(() => he.value !== null), Ee = q(
      () => ye.value ? "Editar Registro" : "Novo Registro"
    );
    function be() {
      const D = {};
      for (const C of J.value)
        D[C.field] = C.defaultValue !== void 0 ? typeof C.defaultValue == "function" ? C.defaultValue() : C.defaultValue : null;
      return D;
    }
    function Me() {
      const D = be();
      for (const C of Object.keys(pe))
        delete pe[C];
      for (const [C, ee] of Object.entries(D))
        pe[C] = ee;
    }
    function $e() {
      he.value = null, Me(), ge.value = !0;
    }
    function De(D) {
      he.value = D;
      for (const C of J.value)
        pe[C.field] = D[C.field] !== void 0 ? D[C.field] : null;
      ge.value = !0;
    }
    function Fe(D, C) {
      pe[D] = C;
    }
    async function Ce() {
      fe.value = !0;
      try {
        const D = { ...pe };
        for (const ee of J.value) {
          const z = D[ee.field];
          if (ee.type === "fk" && z !== null && typeof z == "object") {
            const ie = ee.optionValue || "id";
            D[ee.field] = z[ie] ?? z;
          }
        }
        let C;
        if (ye.value && he.value) {
          const ee = he.value[a.optionValue];
          C = await r.update(
            a.endpoint,
            ee,
            D
          );
          const z = $.value.findIndex((ie) => ie[a.optionValue] === ee);
          z !== -1 && ($.value[z] = C.data), i.success("Registro atualizado com sucesso");
        } else
          C = await r.create(a.endpoint, D), $.value.unshift(C.data), h.value++, i.success("Registro criado com sucesso");
        ge.value = !1, he.value = null, U.value = C.data;
      } catch (D) {
        i.error(qe(D, "Erro ao salvar registro"));
      } finally {
        fe.value = !1;
      }
    }
    function Ae(D) {
      y(async () => {
        try {
          const C = D[a.optionValue];
          await r.delete(a.endpoint, C);
          const ee = $.value.findIndex((z) => z[a.optionValue] === C);
          ee !== -1 && ($.value.splice(ee, 1), h.value--), u.value && u.value[a.optionValue] === C && (u.value = null, o("update:modelValue", null)), U.value && U.value[a.optionValue] === C && (U.value = null), i.success("Registro excluído com sucesso");
        } catch (C) {
          i.error(qe(C, "Erro ao excluir registro"));
        }
      });
    }
    return (D, C) => {
      const ee = yt("tooltip");
      return s(), c(le, null, [
        v("div", La, [
          W(g($t), {
            "model-value": u.value,
            suggestions: k.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: M.value,
            fluid: "",
            onComplete: G,
            onItemSelect: Z,
            onClear: f
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          Pe((s(), c("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: _
          }, [...C[6] || (C[6] = [
            v("i", { class: "pi pi-search" }, null, -1)
          ])], 8, Na)), [
            [
              ee,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        W(g(kt), {
          visible: b.value,
          "onUpdate:visible": C[4] || (C[4] = (z) => b.value = z),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: te(() => [
            v("div", Oa, [
              W(g(oe), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: C[3] || (C[3] = (z) => b.value = !1)
              }),
              W(g(oe), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !U.value,
                onClick: Ne
              }, null, 8, ["disabled"])
            ])
          ]),
          default: te(() => [
            v("div", Ya, [
              W(g(Ue), { class: "w-autocompletefk-toolbar-search" }, {
                default: te(() => [
                  W(g(_e), { class: "pi pi-search" }),
                  W(g(ce), {
                    modelValue: T.value,
                    "onUpdate:modelValue": C[0] || (C[0] = (z) => T.value = z),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              v("div", za, [
                E.value ? (s(), I(g(oe), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: $e
                })) : S("", !0)
              ])
            ]),
            W(g(bt), {
              selection: U.value,
              "onUpdate:selection": C[1] || (C[1] = (z) => U.value = z),
              value: $.value,
              loading: V.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: w.value,
              "total-records": h.value,
              "sort-field": m.value ?? void 0,
              "sort-order": A.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: de,
              onSort: C[2] || (C[2] = (z) => me({ sortField: z.sortField, sortOrder: z.sortOrder })),
              onRowDblclick: Ye
            }, {
              empty: te(() => [...C[7] || (C[7] = [
                v("div", { class: "w-autocompletefk-empty" }, "Nenhum registro encontrado", -1)
              ])]),
              default: te(() => [
                W(g(Le), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (s(!0), c(le, null, se(ne.value, (z) => (s(), I(g(Le), {
                  key: z.field,
                  field: z.field,
                  header: z.header,
                  sortable: z.sortable ?? !0,
                  style: Be(z.style)
                }, {
                  body: te(({ data: ie }) => [
                    z.type ? (s(), I(Xe, {
                      key: 0,
                      column: z,
                      value: ie[z.field],
                      "row-data": ie
                    }, null, 8, ["column", "value", "row-data"])) : (s(), c(le, { key: 1 }, [
                      xe(R(ie[z.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                p.value ? (s(), I(g(Le), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: te(({ data: z }) => [
                    v("div", Wa, [
                      F.value ? Pe((s(), I(g(oe), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (ie) => De(z)
                      }, null, 8, ["onClick"])), [
                        [
                          ee,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : S("", !0),
                      n.value ? Pe((s(), I(g(oe), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (ie) => Ae(z)
                      }, null, 8, ["onClick"])), [
                        [
                          ee,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : S("", !0)
                    ])
                  ]),
                  _: 1
                })) : S("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        d.value ? (s(), I(it, {
          key: 0,
          visible: ge.value,
          title: Ee.value,
          fields: J.value,
          "form-data": pe,
          "is-editing": ye.value,
          saving: fe.value,
          width: e.dialogWidth,
          "onUpdate:visible": C[5] || (C[5] = (z) => {
            ge.value = z, z || (he.value = null);
          }),
          "onUpdate:field": Fe,
          onSave: Ce
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : S("", !0)
      ], 64);
    };
  }
}), Tt = /* @__PURE__ */ re({
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
    const a = e, o = t, l = q(
      () => a.prefix ?? (a.currency ? "R$" : void 0)
    ), r = q(() => !!l.value || !!a.suffix), i = q(() => {
      const u = a.modelValue;
      return u == null || Number.isNaN(u) ? "" : new Intl.NumberFormat(a.locale, {
        minimumFractionDigits: a.decimals,
        maximumFractionDigits: a.decimals
      }).format(u);
    });
    function y(u) {
      const k = u.target.value.replace(/\D/g, "");
      if (!k) {
        o("update:modelValue", null);
        return;
      }
      const M = Number(k) / Math.pow(10, a.decimals);
      o("update:modelValue", M);
    }
    return (u, k) => r.value ? (s(), I(g(Qt), {
      key: 0,
      class: "w-money-input"
    }, {
      default: te(() => [
        l.value ? (s(), I(g(ct), { key: 0 }, {
          default: te(() => [
            xe(R(l.value), 1)
          ]),
          _: 1
        })) : S("", !0),
        W(g(ce), {
          "model-value": i.value,
          inputmode: "numeric",
          class: "w-money-input__field",
          placeholder: e.placeholder,
          disabled: e.disabled,
          invalid: e.invalid,
          onInput: y
        }, null, 8, ["model-value", "placeholder", "disabled", "invalid"]),
        e.suffix ? (s(), I(g(ct), { key: 1 }, {
          default: te(() => [
            xe(R(e.suffix), 1)
          ]),
          _: 1
        })) : S("", !0)
      ]),
      _: 1
    })) : (s(), I(g(ce), {
      key: 1,
      "model-value": i.value,
      inputmode: "numeric",
      fluid: "",
      class: "w-money-input__field",
      placeholder: e.placeholder,
      disabled: e.disabled,
      invalid: e.invalid,
      onInput: y
    }, null, 8, ["model-value", "placeholder", "disabled", "invalid"]));
  }
}), Ba = { class: "w-transfer__pane" }, ja = { class: "w-transfer__head" }, Ua = { class: "w-transfer__count" }, _a = { class: "w-transfer__list" }, qa = ["onClick"], Ha = {
  key: 0,
  class: "w-transfer__empty"
}, Ka = { class: "w-transfer__controls" }, Ga = { class: "w-transfer__pane" }, Ja = { class: "w-transfer__head" }, Za = { class: "w-transfer__count" }, Xa = { class: "w-transfer__list" }, Qa = ["onClick"], eo = {
  key: 0,
  class: "w-transfer__empty"
}, Lt = /* @__PURE__ */ re({
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
    const a = e, o = t, l = K(""), r = K(""), i = q(() => new Set(a.selected)), y = q(() => a.searchFields ?? [a.optionLabel]);
    function u(b) {
      return b[a.trackBy];
    }
    function k(b) {
      return String(b[a.optionLabel] ?? "");
    }
    function M(b, $) {
      if (!$) return !0;
      const V = $.toLowerCase();
      return y.value.some(
        (T) => String(b[T] ?? "").toLowerCase().includes(V)
      );
    }
    const P = q(
      () => a.source.filter(
        (b) => !i.value.has(u(b)) && M(b, l.value)
      )
    ), B = q(
      () => a.source.filter(
        (b) => i.value.has(u(b)) && M(b, r.value)
      )
    );
    function Y(b) {
      a.disabled || o("update:selected", [...a.selected, u(b)]);
    }
    function G(b) {
      if (a.disabled) return;
      const $ = u(b);
      o("update:selected", a.selected.filter((V) => V !== $));
    }
    function Z() {
      a.disabled || o("update:selected", a.source.map(u));
    }
    function f() {
      a.disabled || o("update:selected", []);
    }
    return (b, $) => (s(), c("div", {
      class: ue(["w-transfer", { "w-transfer--disabled": e.disabled }])
    }, [
      v("div", Ba, [
        v("div", ja, [
          $[2] || ($[2] = v("span", { class: "w-transfer__title" }, "Disponíveis", -1)),
          v("span", Ua, R(P.value.length), 1)
        ]),
        W(g(Ue), { class: "w-transfer__search" }, {
          default: te(() => [
            W(g(_e), { class: "pi pi-search" }),
            W(g(ce), {
              modelValue: l.value,
              "onUpdate:modelValue": $[0] || ($[0] = (V) => l.value = V),
              placeholder: "Buscar...",
              fluid: ""
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        v("ul", _a, [
          (s(!0), c(le, null, se(P.value, (V) => (s(), c("li", {
            key: `a-${u(V)}`,
            class: "w-transfer__item",
            onClick: (T) => Y(V)
          }, [
            v("span", null, R(k(V)), 1),
            $[3] || ($[3] = v("i", { class: "pi pi-angle-right" }, null, -1))
          ], 8, qa))), 128)),
          P.value.length ? S("", !0) : (s(), c("li", Ha, "Nenhum item"))
        ])
      ]),
      v("div", Ka, [
        W(g(oe), {
          type: "button",
          icon: "pi pi-angle-double-right",
          text: "",
          rounded: "",
          disabled: e.disabled || !P.value.length,
          onClick: Z
        }, null, 8, ["disabled"]),
        W(g(oe), {
          type: "button",
          icon: "pi pi-angle-double-left",
          text: "",
          rounded: "",
          disabled: e.disabled || !e.selected.length,
          onClick: f
        }, null, 8, ["disabled"])
      ]),
      v("div", Ga, [
        v("div", Ja, [
          $[4] || ($[4] = v("span", { class: "w-transfer__title" }, "Selecionados", -1)),
          v("span", Za, R(B.value.length), 1)
        ]),
        W(g(Ue), { class: "w-transfer__search" }, {
          default: te(() => [
            W(g(_e), { class: "pi pi-search" }),
            W(g(ce), {
              modelValue: r.value,
              "onUpdate:modelValue": $[1] || ($[1] = (V) => r.value = V),
              placeholder: "Buscar...",
              fluid: ""
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        v("ul", Xa, [
          (s(!0), c(le, null, se(B.value, (V) => (s(), c("li", {
            key: `s-${u(V)}`,
            class: "w-transfer__item",
            onClick: (T) => G(V)
          }, [
            $[5] || ($[5] = v("i", { class: "pi pi-angle-left" }, null, -1)),
            v("span", null, R(k(V)), 1)
          ], 8, Qa))), 128)),
          B.value.length ? S("", !0) : (s(), c("li", eo, "Nenhum item"))
        ])
      ])
    ], 2));
  }
});
async function to(e) {
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
const ao = { class: "w-crud-form" }, oo = {
  key: 0,
  class: "w-crud-form-group-header"
}, no = { class: "w-crud-form-group-title" }, lo = {
  key: 0,
  class: "w-crud-form-group-desc"
}, so = { class: "w-crud-form-fields" }, ro = {
  key: 0,
  class: "w-crud-form-switch"
}, io = { class: "w-crud-form-switch-label" }, uo = {
  key: 1,
  class: "w-crud-form-col-full"
}, co = { class: "w-crud-form-label" }, fo = {
  key: 0,
  class: "w-crud-form-required"
}, mo = { class: "w-crud-form-color-row" }, po = {
  key: 2,
  class: "w-crud-form-col-full"
}, vo = { class: "w-crud-form-label" }, go = ["accept", "disabled", "onChange"], ho = {
  key: 3,
  class: "w-crud-form-col-full"
}, yo = { class: "w-crud-form-label" }, bo = {
  key: 0,
  class: "w-crud-form-required"
}, wo = { class: "w-crud-form-label" }, ko = {
  key: 0,
  class: "w-crud-form-required"
}, $o = {
  key: 1,
  class: "pi pi-spin pi-spinner w-crud-form-cep-spinner"
}, Do = {
  key: 16,
  class: "w-crud-form-cep-error"
}, Co = {
  key: 17,
  class: "w-crud-form-error"
}, So = /* @__PURE__ */ re({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const o = e, l = a, r = ve({}), i = ve({}), y = ve({}), u = ve({});
    function k(d, E) {
      const F = E.target.value, n = F.replace(/\D/g, "");
      l("update:field", d.field, F), y[d.field] = null, u[d.field] && (clearTimeout(u[d.field]), u[d.field] = null), n.length === 8 && (u[d.field] = setTimeout(async () => {
        i[d.field] = !0, y[d.field] = null;
        try {
          const p = await to(n);
          if (!p)
            y[d.field] = "CEP não encontrado. Preencha os campos manualmente.";
          else {
            const J = d.cepFields || {}, ne = Object.keys(J);
            for (const Q of ne) {
              const _ = J[Q];
              if (!_) continue;
              const de = o.formData[_];
              (de == null || de === "") && l("update:field", _, p[Q] ?? "");
            }
          }
        } finally {
          i[d.field] = !1;
        }
      }, 400));
    }
    const M = q(
      () => o.fields.filter((d) => d.visible === void 0 || d.visible === !0 ? !0 : typeof d.visible == "function" ? d.visible(o.formData, o.isEditing) : d.visible)
    );
    function P(d) {
      return o.disabled || d.disabledOnEdit && o.isEditing ? !0 : typeof d.disabled == "function" ? d.disabled(o.formData, o.isEditing) : !!d.disabled;
    }
    function B(d) {
      return Wt(d) ? d.value : d;
    }
    const Y = q(() => {
      const d = o.isEditing ? "edit" : "create", E = o.fields.find(
        (n) => n.autofocus === !0 || n.autofocus === d
      );
      if (E) return E.field;
      const F = M.value.find((n) => !(n.type === "switch" || n.type === "fk" || n.type === "select" || n.type === "image" || n.disabled === !0 || n.disabledOnEdit && o.isEditing));
      return (F == null ? void 0 : F.field) ?? null;
    });
    function G(d) {
      return d.field === Y.value;
    }
    function Z(d) {
      if (d)
        return d.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function f(d) {
      if (!d) return "";
      const E = String(d).replace(/\D/g, "").slice(0, 14);
      return E.length <= 11 ? E.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : E.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function b(d, E) {
      const F = E.target.value.replace(/\D/g, "").slice(0, 14);
      l("update:field", d, F);
    }
    const $ = ve({});
    function V(d) {
      const E = o.formData[d.field];
      if (E == null) return null;
      const F = d.optionValue || "value";
      return (B(d.options) || []).find(
        (p) => p[F] === E
      ) ?? null;
    }
    function T(d) {
      return $[d.field] || [];
    }
    function j(d, E) {
      const F = (E.query || "").toLowerCase(), n = B(d.options) || [], p = d.optionLabel || "label";
      $[d.field] = n.filter(
        (J) => String(J[p] || "").toLowerCase().includes(F)
      );
    }
    function w(d, E) {
      const F = d.optionValue || "value";
      l("update:field", d.field, E.value[F]);
    }
    function h(d) {
      const E = o.formData[d.field];
      return E ? String(E).replace("#", "") : "FFFFFF";
    }
    function U(d, E) {
      l("update:field", d.field, `#${E}`);
    }
    function m(d) {
      if (typeof d.validate == "function") {
        const E = d.validate(o.formData[d.field]);
        r[d.field] = E || null;
      }
    }
    function A() {
      const d = [];
      for (const E of o.fields)
        if (typeof E.validate == "function") {
          const F = E.validate(o.formData[E.field]);
          r[E.field] = F || null, F && d.push(F);
        }
      return d;
    }
    function L() {
      Object.keys(r).forEach((d) => delete r[d]);
    }
    const X = q(() => {
      var n, p, J, ne;
      const d = /* @__PURE__ */ new Map(), E = [], F = /* @__PURE__ */ new Map();
      for (const Q of M.value) {
        const _ = ((n = Q.fieldGroup) == null ? void 0 : n.id) ?? "__default__";
        d.has(_) || (d.set(_, {
          id: _,
          title: (p = Q.fieldGroup) == null ? void 0 : p.title,
          description: (J = Q.fieldGroup) == null ? void 0 : J.description,
          fields: []
        }), E.push(_), ((ne = Q.fieldGroup) == null ? void 0 : ne.order) != null && F.set(_, Q.fieldGroup.order)), d.get(_).fields.push(Q);
      }
      return E.slice().sort((Q, _) => {
        const de = F.get(Q), me = F.get(_);
        return de != null && me != null ? de - me : de != null ? -1 : me != null ? 1 : E.indexOf(Q) - E.indexOf(_);
      }).map((Q) => d.get(Q));
    });
    return t({ validateAll: A, clearErrors: L }), (d, E) => (s(), c("div", ao, [
      (s(!0), c(le, null, se(X.value, (F) => (s(), c("div", {
        key: F.id,
        class: "w-crud-form-group"
      }, [
        F.title ? (s(), c("div", oo, [
          v("h3", no, R(F.title), 1),
          F.description ? (s(), c("p", lo, R(F.description), 1)) : S("", !0)
        ])) : S("", !0),
        v("div", so, [
          (s(!0), c(le, null, se(F.fields, (n) => O(d.$slots, `field-${n.field}`, {
            key: n.field,
            field: n,
            formData: e.formData,
            isEditing: e.isEditing,
            setFormField: (p, J) => l("update:field", p, J)
          }, () => [
            n.type === "switch" ? (s(), c("div", ro, [
              W(g(Kt), {
                "model-value": e.formData[n.field],
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
              v("label", io, R(n.switchLabel || n.label), 1)
            ])) : n.type === "color" ? (s(), c("div", uo, [
              v("label", co, [
                xe(R(n.label) + " ", 1),
                n.required ? (s(), c("span", fo, "*")) : S("", !0)
              ]),
              v("div", mo, [
                W(g(Gt), {
                  "model-value": h(n),
                  disabled: P(n),
                  "onUpdate:modelValue": (p) => U(n, p)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                W(g(ce), {
                  "model-value": e.formData[n.field],
                  class: "w-28",
                  maxlength: "7",
                  placeholder: "#000000",
                  disabled: P(n),
                  "onUpdate:modelValue": (p) => l("update:field", n.field, p)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
              ])
            ])) : n.type === "image" ? (s(), c("div", po, [
              v("label", vo, R(n.label), 1),
              O(d.$slots, `image-${n.field}`, {
                field: n,
                formData: e.formData
              }, () => [
                v("input", {
                  type: "file",
                  accept: n.accept || "image/*",
                  disabled: P(n),
                  onChange: (p) => {
                    var ne;
                    const J = ((ne = p.target.files) == null ? void 0 : ne[0]) ?? null;
                    l("update:field", n.field, J);
                  }
                }, null, 40, go)
              ])
            ])) : n.type === "transfer" ? (s(), c("div", ho, [
              v("label", yo, [
                xe(R(n.label) + " ", 1),
                n.required ? (s(), c("span", bo, "*")) : S("", !0)
              ]),
              W(Lt, {
                source: B(n.options) || [],
                selected: e.formData[n.field] || [],
                "track-by": n.optionValue || "id",
                "option-label": n.optionLabel || "nome",
                "search-fields": n.searchFields,
                disabled: P(n),
                "onUpdate:selected": (p) => l("update:field", n.field, p)
              }, null, 8, ["source", "selected", "track-by", "option-label", "search-fields", "disabled", "onUpdate:selected"])
            ])) : (s(), c("div", {
              key: 4,
              class: ue(n.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
            }, [
              v("label", wo, [
                xe(R(n.label) + " ", 1),
                n.required ? (s(), c("span", ko, "*")) : S("", !0),
                i[n.field] ? (s(), c("i", $o)) : S("", !0)
              ]),
              (!n.type || n.type === "text") && n.mask ? Pe((s(), I(g(ce), {
                key: 0,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: G(n) || void 0,
                placeholder: n.placeholder,
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
                [g(at), { mask: Z(n.mask) }]
              ]) : !n.type || n.type === "text" ? (s(), I(g(ce), {
                key: 1,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: G(n) || void 0,
                placeholder: n.placeholder,
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "email" ? (s(), I(g(ce), {
                key: 2,
                "model-value": e.formData[n.field],
                type: "email",
                fluid: "",
                autofocus: G(n) || void 0,
                placeholder: n.placeholder,
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "password" ? (s(), I(g(Jt), {
                key: 3,
                "model-value": e.formData[n.field],
                fluid: "",
                "toggle-mask": "",
                feedback: n.feedback !== !1,
                placeholder: n.placeholder,
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "number" ? (s(), I(g(ut), {
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
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "currency" && n.fillFromRight ? (s(), I(Tt, {
                key: 5,
                "model-value": e.formData[n.field],
                decimals: n.decimals ?? 2,
                currency: "",
                prefix: n.prefix,
                suffix: n.suffix,
                placeholder: n.placeholder,
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "decimals", "prefix", "suffix", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "currency" ? (s(), I(g(ut), {
                key: 6,
                "model-value": e.formData[n.field],
                fluid: "",
                mode: "currency",
                currency: "BRL",
                locale: "pt-BR",
                min: n.min,
                max: n.max,
                placeholder: n.placeholder,
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "select" ? (s(), I(g(Ht), {
                key: 7,
                "model-value": e.formData[n.field],
                fluid: "",
                options: B(n.options),
                "option-label": n.optionLabel || "label",
                "option-value": n.optionValue || "value",
                "show-clear": n.showClear !== !1,
                placeholder: n.placeholder,
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "autocomplete" ? (s(), I(g($t), {
                key: 8,
                "model-value": V(n),
                fluid: "",
                suggestions: T(n),
                "option-label": n.optionLabel || "label",
                placeholder: n.placeholder,
                disabled: P(n),
                onComplete: (p) => j(n, p),
                onItemSelect: (p) => w(n, p),
                onClear: (p) => l("update:field", n.field, null)
              }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : n.type === "fk" ? (s(), I(Rt, {
                key: 9,
                "model-value": e.formData[n.field],
                endpoint: n.endpoint,
                "endpoint-params": n.endpointParams,
                "option-label": n.optionLabel || "nome",
                placeholder: n.placeholder,
                disabled: P(n),
                "show-clear": n.showClear !== !1,
                "dialog-header": n.label,
                "crud-fields": n.crudFields,
                "crud-columns": n.crudColumns,
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "endpoint", "endpoint-params", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : n.type === "date" ? (s(), I(g(dt), {
                key: 10,
                "model-value": e.formData[n.field],
                fluid: "",
                "date-format": n.dateFormat || "dd/mm/yy",
                placeholder: n.placeholder,
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "datetime" ? (s(), I(g(dt), {
                key: 11,
                "model-value": e.formData[n.field],
                fluid: "",
                "show-time": "",
                "hour-format": n.hourFormat || "24",
                "date-format": n.dateFormat || "dd/mm/yy",
                placeholder: n.placeholder,
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "cpf_cnpj" ? (s(), I(g(ce), {
                key: 12,
                "model-value": f(e.formData[n.field]),
                fluid: "",
                maxlength: "18",
                placeholder: n.placeholder || "000.000.000-00",
                disabled: P(n),
                invalid: !!r[n.field],
                onInput: (p) => b(n.field, p),
                onBlur: (p) => m(n)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : n.type === "mask" ? Pe((s(), I(g(ce), {
                key: 13,
                "model-value": e.formData[n.field],
                fluid: "",
                placeholder: n.placeholder,
                disabled: P(n),
                invalid: !!r[n.field],
                "onUpdate:modelValue": (p) => l("update:field", n.field, p),
                onBlur: (p) => m(n)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
                [g(at), { mask: Z(n.mask) }]
              ]) : n.type === "cep" ? Pe((s(), I(g(ce), {
                key: 14,
                "model-value": e.formData[n.field],
                fluid: "",
                placeholder: n.placeholder || "00000-000",
                disabled: P(n),
                invalid: !!y[n.field],
                onInput: (p) => k(n, p)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput"])), [
                [g(at), { mask: "#####-###" }]
              ]) : n.type === "textarea" ? (s(), I(g(qt), {
                key: 15,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: G(n) || void 0,
                rows: n.rows || 3,
                placeholder: n.placeholder,
                disabled: P(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : S("", !0),
              y[n.field] ? (s(), c("small", Do, R(y[n.field]), 1)) : r[n.field] ? (s(), c("small", Co, R(r[n.field]), 1)) : S("", !0)
            ], 2))
          ])), 128))
        ])
      ]))), 128))
    ]));
  }
}), Po = { class: "w-crud-form-footer" }, it = /* @__PURE__ */ re({
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
    const a = e, o = t, l = K(null);
    function r() {
      l.value ? l.value.validateAll().length === 0 && o("save") : o("save");
    }
    return ot(
      () => a.visible,
      (i) => {
        i && l.value && l.value.clearErrors();
      }
    ), (i, y) => (s(), I(g(kt), {
      visible: e.visible,
      header: e.title,
      style: Be({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": y[2] || (y[2] = (u) => o("update:visible", u))
    }, {
      default: te(() => [
        v("form", {
          class: "w-crud-form",
          onSubmit: Ot(r, ["prevent"])
        }, [
          W(So, {
            ref_key: "rendererRef",
            ref: l,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            disabled: e.disabled,
            "onUpdate:field": y[0] || (y[0] = (u, k) => o("update:field", u, k))
          }, nt({ _: 2 }, [
            se(e.fields, (u) => ({
              name: `field-${u.field}`,
              fn: te((k) => [
                O(i.$slots, `field-${u.field}`, lt(st(k)))
              ])
            })),
            se(e.fields.filter((u) => u.type === "image"), (u) => ({
              name: `image-${u.field}`,
              fn: te((k) => [
                O(i.$slots, `image-${u.field}`, lt(st(k)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing", "disabled"]),
          v("div", Po, [
            O(i.$slots, "footer", {
              saving: e.saving,
              disabled: e.disabled
            }, () => [
              W(g(oe), {
                type: "button",
                label: e.disabled ? "Fechar" : "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: y[1] || (y[1] = (u) => o("update:visible", !1))
              }, null, 8, ["label", "disabled"]),
              e.disabled ? S("", !0) : (s(), I(g(oe), {
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
}), xo = { class: "w-crud" }, Vo = {
  key: 0,
  class: "w-crud-header"
}, Eo = { class: "w-crud-header-content" }, Mo = { class: "w-crud-title" }, Fo = {
  key: 0,
  class: "w-crud-subtitle"
}, Ao = { class: "w-crud-header-actions" }, Io = {
  key: 0,
  class: "w-crud-kpis"
}, Ro = { class: "w-crud-kpi-content" }, To = { class: "w-crud-kpi-label" }, Lo = { class: "w-crud-kpi-value" }, No = {
  key: 1,
  class: "w-crud-table"
}, Yo = { class: "w-crud-toolbar" }, zo = { class: "w-crud-toolbar-start" }, Wo = { class: "w-crud-toolbar-end" }, Oo = {
  key: 0,
  class: "w-crud-view-toggle"
}, Bo = { class: "w-crud-actions" }, jo = {
  key: 2,
  class: "w-crud-cards-wrap"
}, Uo = { class: "w-crud-toolbar w-crud-toolbar--standalone" }, _o = { class: "w-crud-toolbar-start" }, qo = { class: "w-crud-toolbar-end" }, Ho = {
  key: 0,
  class: "w-crud-view-toggle"
}, Ko = {
  key: 0,
  class: "w-crud-cards-loading"
}, Go = {
  key: 2,
  class: "w-crud-cards"
}, Jo = ["onDblclick"], Zo = { class: "w-crud-card-body" }, Xo = {
  key: 0,
  class: "w-crud-card-label"
}, Qo = { class: "w-crud-card-value" }, en = {
  key: 0,
  class: "w-crud-card-actions"
}, tn = /* @__PURE__ */ re({
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
    viewToggle: { type: Boolean, default: !1 },
    defaultView: { default: "table" },
    cardFields: { default: 4 }
  },
  emits: ["row-expand", "row-collapse"],
  setup(e, { emit: t }) {
    const a = e, o = t, l = Bt(), { formatNumber: r } = rt(), i = K({}), y = K(a.defaultView);
    function u(w) {
      return y.value === w;
    }
    function k(w) {
      y.value = w;
    }
    const M = q(
      () => (a.crud.pagination.page - 1) * a.crud.pagination.pageSize
    ), P = q(
      () => a.crud.config.columns.filter((w) => w.visible !== !1).map((w) => w.type === "number" && !w.align ? { ...w, align: "right" } : w.type === "currency" && !w.align ? { ...w, align: "right" } : w)
    );
    function B(w) {
      if (w.align === "right") return "text-right";
      if (w.align === "center") return "text-center";
    }
    const Y = q(() => P.value.slice(0, a.cardFields)), G = q(() => {
      const w = [];
      return a.crud.config.canEdit !== !1 && w.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canDelete !== !1 && w.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), w;
    }), Z = q(
      () => a.crud.config.rowActions ?? G.value
    ), f = q(() => Z.value.length > 0 || !!l["row-actions"]);
    function b(w, h) {
      w.action === "edit" ? a.crud.openEditDialog(h) : w.action === "view" ? a.crud.openViewDialog(h) : w.action === "delete" ? a.crud.confirmDelete(h) : w.handler && w.handler(h);
    }
    function $(w, h) {
      return w.visible ? w.visible(h) : !0;
    }
    function V(w, h) {
      return w.disabled ? w.disabled(h) : !1;
    }
    const T = q(() => {
      const w = [];
      return a.showKpi && w.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: r(a.crud.pagination.rows, 0)
      }), w.push(...a.extraKpis), w;
    });
    q(() => a.crud.config.labels ?? {});
    const j = q(() => a.crud.config.canCreate !== !1);
    return jt(() => {
      a.autoInit && a.crud.init();
    }), (w, h) => {
      const U = yt("tooltip");
      return s(), c("div", xo, [
        e.showHeader ? (s(), c("div", Vo, [
          v("div", Eo, [
            v("h1", Mo, R(e.title), 1),
            e.subtitle ? (s(), c("p", Fo, R(e.subtitle), 1)) : S("", !0)
          ]),
          v("div", Ao, [
            O(w.$slots, "header-actions"),
            j.value ? (s(), I(g(oe), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: h[0] || (h[0] = (m) => e.crud.openCreateDialog())
            })) : S("", !0)
          ])
        ])) : S("", !0),
        O(w.$slots, "before-table", {}, () => [
          T.value.length ? (s(), c("div", Io, [
            (s(!0), c(le, null, se(T.value, (m, A) => (s(), c("div", {
              key: A,
              class: "w-crud-kpi"
            }, [
              v("div", {
                class: ue(["w-crud-kpi-icon", m.severity ? `w-crud-kpi-icon--${m.severity}` : ""])
              }, [
                v("i", {
                  class: ue([m.icon]),
                  style: Be(m.color ? `color: ${m.color}` : "")
                }, null, 6)
              ], 2),
              v("div", Ro, [
                v("div", To, R(m.label), 1),
                v("div", Lo, R(m.value), 1)
              ])
            ]))), 128))
          ])) : S("", !0)
        ]),
        y.value === "table" ? (s(), c("div", No, [
          W(g(bt), {
            value: e.crud.items.value,
            loading: e.crud.loading.value,
            "expanded-rows": i.value,
            "onUpdate:expandedRows": h[4] || (h[4] = (m) => i.value = m),
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
            onSort: h[5] || (h[5] = (m) => e.crud.onSort({ sortField: m.sortField, sortOrder: m.sortOrder })),
            onRowExpand: h[6] || (h[6] = (m) => o("row-expand", m.data)),
            onRowCollapse: h[7] || (h[7] = (m) => o("row-collapse", m.data))
          }, nt({
            header: te(() => [
              v("div", Yo, [
                v("div", zo, [
                  e.showSearch ? (s(), I(g(Ue), { key: 0 }, {
                    default: te(() => [
                      W(g(_e), { class: "pi pi-search" }),
                      W(g(ce), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : S("", !0),
                  O(w.$slots, "toolbar-start"),
                  O(w.$slots, "toolbar-filters")
                ]),
                v("div", Wo, [
                  O(w.$slots, "toolbar-actions"),
                  e.viewToggle ? (s(), c("div", Oo, [
                    W(g(oe), {
                      icon: "pi pi-table",
                      size: "small",
                      text: !u("table"),
                      outlined: u("table"),
                      onClick: h[1] || (h[1] = (m) => k("table"))
                    }, null, 8, ["text", "outlined"]),
                    W(g(oe), {
                      icon: "pi pi-th-large",
                      size: "small",
                      text: !u("cards"),
                      outlined: u("cards"),
                      onClick: h[2] || (h[2] = (m) => k("cards"))
                    }, null, 8, ["text", "outlined"])
                  ])) : S("", !0),
                  !e.showHeader && j.value ? (s(), I(g(oe), {
                    key: 1,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: h[3] || (h[3] = (m) => e.crud.openCreateDialog())
                  })) : S("", !0)
                ])
              ])
            ]),
            empty: te(() => [
              O(w.$slots, "empty", {}, () => [
                h[14] || (h[14] = v("div", { class: "w-crud-empty" }, [
                  v("div", { class: "w-crud-empty-icon" }, [
                    v("i", { class: "pi pi-inbox" })
                  ]),
                  v("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                  v("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                ], -1))
              ])
            ]),
            default: te(() => [
              e.expandable ? (s(), I(g(Le), {
                key: 0,
                expander: "",
                style: { width: "3rem" }
              })) : S("", !0),
              (s(!0), c(le, null, se(P.value, (m) => (s(), I(g(Le), {
                key: m.field,
                field: m.field,
                header: m.header,
                sortable: m.sortable,
                style: Be(m.style),
                "header-class": B(m),
                "body-class": B(m)
              }, {
                body: te(({ data: A }) => [
                  O(w.$slots, `column-${m.field}`, {
                    data: A,
                    value: A[m.field]
                  }, () => [
                    W(Xe, {
                      column: m,
                      value: A[m.field],
                      "row-data": A
                    }, null, 8, ["column", "value", "row-data"])
                  ])
                ]),
                _: 2
              }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
              f.value ? (s(), I(g(Le), {
                key: 1,
                "header-class": "w-crud-actions-header",
                style: Be({ width: `${(Z.value.length + (g(l)["row-actions"] ? 1 : 0)) * 2.5 + 1}rem` })
              }, {
                body: te(({ data: m }) => [
                  v("div", Bo, [
                    (s(!0), c(le, null, se(Z.value, (A) => (s(), c(le, {
                      key: A.action
                    }, [
                      $(A, m) ? Pe((s(), I(g(oe), {
                        key: 0,
                        icon: A.icon,
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: A.severity,
                        disabled: V(A, m),
                        onClick: (L) => b(A, m)
                      }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                        [
                          U,
                          A.tooltip,
                          void 0,
                          { top: !0 }
                        ]
                      ]) : S("", !0)
                    ], 64))), 128)),
                    O(w.$slots, "row-actions", {
                      data: m,
                      crud: e.crud
                    })
                  ])
                ]),
                _: 3
              }, 8, ["style"])) : S("", !0)
            ]),
            _: 2
          }, [
            e.expandable ? {
              name: "expansion",
              fn: te((m) => [
                O(w.$slots, "expansion", {
                  data: m.data
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "onPage"])
        ])) : (s(), c("div", jo, [
          v("div", Uo, [
            v("div", _o, [
              e.showSearch ? (s(), I(g(Ue), { key: 0 }, {
                default: te(() => [
                  W(g(_e), { class: "pi pi-search" }),
                  W(g(ce), {
                    "model-value": e.crud.search.value,
                    placeholder: "Buscar...",
                    class: "w-72",
                    onInput: e.crud.onSearch
                  }, null, 8, ["model-value", "onInput"])
                ]),
                _: 1
              })) : S("", !0),
              O(w.$slots, "toolbar-start"),
              O(w.$slots, "toolbar-filters")
            ]),
            v("div", qo, [
              O(w.$slots, "toolbar-actions"),
              e.viewToggle ? (s(), c("div", Ho, [
                W(g(oe), {
                  icon: "pi pi-table",
                  size: "small",
                  text: !u("table"),
                  outlined: u("table"),
                  onClick: h[8] || (h[8] = (m) => k("table"))
                }, null, 8, ["text", "outlined"]),
                W(g(oe), {
                  icon: "pi pi-th-large",
                  size: "small",
                  text: !u("cards"),
                  outlined: u("cards"),
                  onClick: h[9] || (h[9] = (m) => k("cards"))
                }, null, 8, ["text", "outlined"])
              ])) : S("", !0),
              !e.showHeader && j.value ? (s(), I(g(oe), {
                key: 1,
                label: "Novo",
                icon: "pi pi-plus",
                onClick: h[10] || (h[10] = (m) => e.crud.openCreateDialog())
              })) : S("", !0)
            ])
          ]),
          e.crud.loading.value ? (s(), c("div", Ko, [...h[15] || (h[15] = [
            v("i", { class: "pi pi-spin pi-spinner" }, null, -1)
          ])])) : e.crud.items.value.length ? (s(), c("div", Go, [
            (s(!0), c(le, null, se(e.crud.items.value, (m, A) => (s(), c("div", {
              key: m[e.crud.config.pk || "id"] ?? A,
              class: "w-crud-card",
              onDblclick: (L) => e.crud.config.canEdit !== !1 && e.crud.openEditDialog(m)
            }, [
              v("div", Zo, [
                (s(!0), c(le, null, se(Y.value, (L, X) => (s(), c("div", {
                  key: L.field,
                  class: ue(["w-crud-card-row", { "w-crud-card-row--title": X === 0 }])
                }, [
                  X !== 0 ? (s(), c("span", Xo, R(L.header), 1)) : S("", !0),
                  v("span", Qo, [
                    O(w.$slots, `column-${L.field}`, {
                      data: m,
                      value: m[L.field]
                    }, () => [
                      W(Xe, {
                        column: L,
                        value: m[L.field],
                        "row-data": m
                      }, null, 8, ["column", "value", "row-data"])
                    ])
                  ])
                ], 2))), 128))
              ]),
              f.value ? (s(), c("div", en, [
                (s(!0), c(le, null, se(Z.value, (L) => (s(), c(le, {
                  key: L.action
                }, [
                  $(L, m) ? Pe((s(), I(g(oe), {
                    key: 0,
                    icon: L.icon,
                    text: "",
                    rounded: "",
                    size: "small",
                    severity: L.severity,
                    disabled: V(L, m),
                    onClick: (X) => b(L, m)
                  }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                    [
                      U,
                      L.tooltip,
                      void 0,
                      { top: !0 }
                    ]
                  ]) : S("", !0)
                ], 64))), 128)),
                O(w.$slots, "row-actions", {
                  data: m,
                  crud: e.crud
                })
              ])) : S("", !0)
            ], 40, Jo))), 128))
          ])) : O(w.$slots, "empty", { key: 1 }, () => [
            h[16] || (h[16] = Ut('<div class="w-crud-empty"><div class="w-crud-empty-icon"><i class="pi pi-inbox"></i></div><p class="w-crud-empty-title">Nenhum registro encontrado</p><p class="w-crud-empty-text">Tente ajustar sua busca ou crie um novo registro</p></div>', 1))
          ]),
          e.crud.items.value.length ? (s(), I(g(_t), {
            key: 3,
            rows: e.crud.pagination.pageSize,
            "total-records": e.crud.pagination.rows,
            first: M.value,
            "rows-per-page-options": [10, 20, 50],
            template: "CurrentPageReport PrevPageLink NextPageLink",
            "current-page-report-template": "Página {currentPage} de {totalPages}",
            class: "w-crud-paginator",
            onPage: e.crud.onPage
          }, null, 8, ["rows", "total-records", "first", "onPage"])) : S("", !0)
        ])),
        O(w.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => {
          var m;
          return [
            W(it, {
              visible: e.crud.dialogVisible.value,
              title: e.crud.dialogTitle.value,
              fields: e.crud.config.form,
              "form-data": e.crud.formData,
              "is-editing": e.crud.isEditing.value,
              saving: e.crud.saving.value,
              disabled: ((m = e.crud.viewMode) == null ? void 0 : m.value) ?? !1,
              width: e.dialogWidth,
              "onUpdate:visible": h[11] || (h[11] = (A) => {
                e.crud.dialogVisible.value = A, A || (e.crud.editingItem.value = null);
              }),
              "onUpdate:field": h[12] || (h[12] = (A, L) => e.crud.setFormField(A, L)),
              onSave: h[13] || (h[13] = (A) => e.crud.save())
            }, nt({ _: 2 }, [
              se(e.crud.config.form, (A) => ({
                name: `field-${A.field}`,
                fn: te((L) => [
                  O(w.$slots, `field-${A.field}`, lt(st(L)))
                ])
              }))
            ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "disabled", "width"])
          ];
        })
      ]);
    };
  }
}), an = /* @__PURE__ */ re({
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
    }, o = q(() => (t.map ?? a)[t.value] ?? { label: t.value, severity: "secondary" });
    return (l, r) => (s(), I(g(wt), {
      value: o.value.label,
      severity: o.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), on = { class: "w-page-header" }, nn = { class: "w-page-header-content" }, ln = { class: "w-page-header-title" }, sn = {
  key: 0,
  class: "w-page-header-subtitle"
}, rn = { class: "w-page-header-actions" }, Yl = /* @__PURE__ */ re({
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
    return (o, l) => (s(), c("div", on, [
      v("div", nn, [
        v("h2", ln, R(e.title), 1),
        e.subtitle ? (s(), c("p", sn, R(e.subtitle), 1)) : S("", !0)
      ]),
      v("div", rn, [
        O(o.$slots, "actions"),
        e.actionLabel ? (s(), I(g(oe), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: l[0] || (l[0] = (r) => a("action"))
        }, null, 8, ["label", "icon"])) : S("", !0)
      ])
    ]));
  }
}), un = { class: "w-empty-state" }, dn = { class: "w-empty-state-icon" }, cn = { class: "w-empty-state-title" }, fn = {
  key: 0,
  class: "w-empty-state-description"
}, zl = /* @__PURE__ */ re({
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
    return (o, l) => (s(), c("div", un, [
      v("div", dn, [
        v("i", {
          class: ue(e.icon)
        }, null, 2)
      ]),
      v("p", cn, R(e.title), 1),
      e.description ? (s(), c("p", fn, R(e.description), 1)) : S("", !0),
      e.actionLabel ? (s(), I(g(oe), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: l[0] || (l[0] = (r) => a("action"))
      }, null, 8, ["label", "icon"])) : S("", !0)
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
const mn = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
function pn() {
  return Ie(mn);
}
const vn = { class: "w-detail-header" }, gn = { class: "w-detail-header-left" }, hn = { class: "w-detail-header-content" }, yn = { class: "w-detail-header-title" }, bn = {
  key: 0,
  class: "w-detail-header-subtitle"
}, wn = { class: "w-detail-header-actions" }, Wl = /* @__PURE__ */ re({
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
    const t = e, a = pn();
    function o() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (l, r) => (s(), c("div", vn, [
      v("div", gn, [
        W(g(oe), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: o
        }),
        e.icon ? (s(), c("i", {
          key: 0,
          class: ue([e.icon, "w-detail-header-icon"])
        }, null, 2)) : S("", !0),
        v("div", hn, [
          v("h2", yn, R(e.title), 1),
          e.subtitle ? (s(), c("p", bn, R(e.subtitle), 1)) : S("", !0)
        ]),
        e.status ? (s(), I(an, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : S("", !0)
      ]),
      v("div", wn, [
        O(l.$slots, "actions")
      ])
    ]));
  }
}), kn = { class: "w-info-card" }, $n = {
  key: 0,
  class: "w-info-card-title"
}, Dn = { class: "w-info-card-grid" }, Cn = { class: "w-info-card-label" }, Sn = { class: "w-info-card-value" }, Ol = /* @__PURE__ */ re({
  __name: "WInfoCard",
  props: {
    title: {},
    fields: {}
  },
  setup(e) {
    const { formatCurrency: t, formatDate: a, formatNumber: o } = rt();
    function l(r) {
      const i = r.value;
      return i == null || i === "" ? "-" : r.format === "currency" ? t(Number(i)) : r.format === "date" ? a(String(i)) : r.format === "datetime" ? a(String(i), "DD/MM/YYYY HH:mm") : r.format === "number" ? o(Number(i)) : String(i);
    }
    return (r, i) => (s(), c("div", kn, [
      e.title ? (s(), c("h3", $n, R(e.title), 1)) : S("", !0),
      v("div", Dn, [
        (s(!0), c(le, null, se(e.fields, (y) => (s(), c("div", {
          key: y.label,
          class: "w-info-card-field"
        }, [
          v("span", Cn, R(y.label), 1),
          v("span", Sn, R(l(y)), 1)
        ]))), 128))
      ])
    ]));
  }
}), Pn = {
  key: 0,
  class: "w-kpi-card__loading"
}, xn = { class: "w-kpi-card__loading-content" }, Vn = { class: "w-kpi-card__header" }, En = {
  key: 0,
  class: "w-kpi-card__icon"
}, Mn = {
  key: 1,
  class: "w-kpi-card__trend"
}, Fn = { class: "w-kpi-card__content" }, An = { class: "w-kpi-card__label" }, In = { class: "w-kpi-card__value" }, Rn = {
  key: 0,
  class: "w-kpi-card__hint"
}, Tn = {
  key: 0,
  class: "w-kpi-card__footer"
}, Ln = /* @__PURE__ */ re({
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
    return (t, a) => (s(), c("article", {
      class: ue(["w-kpi-card", e.severity ? `w-kpi-card--${e.severity}` : ""])
    }, [
      e.loading ? (s(), c("div", Pn, [
        W(g(Ke), {
          shape: "circle",
          size: "2.75rem"
        }),
        v("div", xn, [
          W(g(Ke), {
            width: "6rem",
            height: "0.75rem"
          }),
          W(g(Ke), {
            width: "7.5rem",
            height: "1.5rem"
          }),
          W(g(Ke), {
            width: "5rem",
            height: "0.75rem"
          })
        ])
      ])) : (s(), c(le, { key: 1 }, [
        v("div", Vn, [
          e.icon || t.$slots.icon ? (s(), c("div", En, [
            O(t.$slots, "icon", {}, () => [
              e.icon ? (s(), c("i", {
                key: 0,
                class: ue(e.icon)
              }, null, 2)) : S("", !0)
            ])
          ])) : S("", !0),
          e.trend || t.$slots.trend ? (s(), c("div", Mn, [
            O(t.$slots, "trend", {}, () => [
              e.trend ? (s(), c("span", {
                key: 0,
                class: ue(["w-kpi-card__trend-badge", e.trend.direction ? `w-kpi-card__trend-badge--${e.trend.direction}` : ""])
              }, R(e.trend.value), 3)) : S("", !0)
            ])
          ])) : S("", !0)
        ]),
        v("div", Fn, [
          v("p", An, R(e.label), 1),
          v("div", In, [
            O(t.$slots, "value", {}, () => [
              xe(R(e.value), 1)
            ])
          ]),
          e.hint || t.$slots.hint ? (s(), c("p", Rn, [
            O(t.$slots, "hint", {}, () => [
              xe(R(e.hint), 1)
            ])
          ])) : S("", !0)
        ]),
        t.$slots.footer ? (s(), c("footer", Tn, [
          O(t.$slots, "footer")
        ])) : S("", !0)
      ], 64))
    ], 2));
  }
}), Bl = /* @__PURE__ */ re({
  __name: "WKpiGrid",
  props: {
    items: { default: () => [] },
    columns: { default: 4 },
    dense: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = q(() => [
      `w-kpi-grid--cols-${t.columns}`,
      { "w-kpi-grid--dense": t.dense }
    ]);
    return (o, l) => (s(), c("div", {
      class: ue(["w-kpi-grid", a.value])
    }, [
      o.$slots.item ? (s(!0), c(le, { key: 0 }, se(e.items, (r, i) => O(o.$slots, "item", {
        key: i,
        item: r,
        index: i
      })), 128)) : (s(!0), c(le, { key: 1 }, se(e.items, (r, i) => (s(), I(Ln, {
        key: i,
        label: r.label,
        value: r.value,
        icon: r.icon,
        severity: r.severity || "primary",
        hint: r.hint,
        trend: r.trend,
        loading: r.loading
      }, null, 8, ["label", "value", "icon", "severity", "hint", "trend", "loading"]))), 128))
    ], 2));
  }
}), Nn = { class: "w-section-header__main" }, Yn = {
  key: 0,
  class: "w-section-header__icon"
}, zn = { class: "w-section-header__content" }, Wn = { class: "w-section-header__title-row" }, On = { class: "w-section-header__title" }, Bn = {
  key: 0,
  class: "w-section-header__subtitle"
}, jn = {
  key: 0,
  class: "w-section-header__actions"
}, jl = /* @__PURE__ */ re({
  __name: "WSectionHeader",
  props: {
    title: {},
    subtitle: {},
    icon: {},
    compact: { type: Boolean }
  },
  setup(e) {
    return (t, a) => (s(), c("div", {
      class: ue(["w-section-header", { "w-section-header--compact": e.compact }])
    }, [
      v("div", Nn, [
        e.icon || t.$slots.icon ? (s(), c("div", Yn, [
          O(t.$slots, "icon", {}, () => [
            e.icon ? (s(), c("i", {
              key: 0,
              class: ue(e.icon)
            }, null, 2)) : S("", !0)
          ])
        ])) : S("", !0),
        v("div", zn, [
          v("div", Wn, [
            v("h3", On, R(e.title), 1),
            O(t.$slots, "meta")
          ]),
          e.subtitle ? (s(), c("p", Bn, R(e.subtitle), 1)) : S("", !0)
        ])
      ]),
      t.$slots.actions ? (s(), c("div", jn, [
        O(t.$slots, "actions")
      ])) : S("", !0)
    ], 2));
  }
}), Un = {
  key: 0,
  class: "w-form-section__header"
}, _n = { class: "w-form-section__content" }, qn = { class: "w-form-section__title" }, Hn = {
  key: 0,
  class: "w-form-section__description"
}, Kn = {
  key: 0,
  class: "w-form-section__actions"
}, Gn = { class: "w-form-section__body" }, Ul = /* @__PURE__ */ re({
  __name: "WFormSection",
  props: {
    title: {},
    description: {},
    variant: {}
  },
  setup(e) {
    return (t, a) => (s(), c("section", {
      class: ue(["w-form-section", e.variant ? `w-form-section--${e.variant}` : ""])
    }, [
      e.title || e.description || t.$slots.actions ? (s(), c("div", Un, [
        v("div", _n, [
          v("h3", qn, R(e.title), 1),
          e.description ? (s(), c("p", Hn, R(e.description), 1)) : S("", !0)
        ]),
        t.$slots.actions ? (s(), c("div", Kn, [
          O(t.$slots, "actions")
        ])) : S("", !0)
      ])) : S("", !0),
      v("div", Gn, [
        O(t.$slots, "default")
      ])
    ], 2));
  }
}), Jn = {
  key: 0,
  class: "w-action-bar__primary"
}, Zn = {
  key: 1,
  class: "w-action-bar__filters"
}, Xn = {
  key: 2,
  class: "w-action-bar__secondary"
}, _l = /* @__PURE__ */ re({
  __name: "WActionBar",
  props: {
    align: { default: "between" },
    stackOnMobile: { type: Boolean, default: !0 }
  },
  setup(e) {
    return (t, a) => (s(), c("div", {
      class: ue(["w-action-bar", [
        `w-action-bar--${e.align}`,
        { "w-action-bar--stack": e.stackOnMobile }
      ]])
    }, [
      t.$slots.primary || t.$slots.default ? (s(), c("div", Jn, [
        O(t.$slots, "primary", {}, () => [
          O(t.$slots, "default")
        ])
      ])) : S("", !0),
      t.$slots.filters ? (s(), c("div", Zn, [
        O(t.$slots, "filters")
      ])) : S("", !0),
      t.$slots.secondary ? (s(), c("div", Xn, [
        O(t.$slots, "secondary")
      ])) : S("", !0)
    ], 2));
  }
}), Qn = { class: "w-progress-flow__marker" }, el = { class: "w-progress-flow__content" }, tl = { class: "w-progress-flow__label" }, al = {
  key: 0,
  class: "w-progress-flow__description"
}, ql = /* @__PURE__ */ re({
  __name: "WProgressFlow",
  props: {
    steps: {},
    currentStep: {},
    orientation: { default: "horizontal" }
  },
  setup(e) {
    const t = e, a = q(
      () => t.steps.findIndex((l) => l.key === t.currentStep)
    );
    function o(l) {
      return l < a.value ? "done" : l === a.value ? "current" : "pending";
    }
    return (l, r) => (s(), c("div", {
      class: ue(["w-progress-flow", `w-progress-flow--${e.orientation}`])
    }, [
      (s(!0), c(le, null, se(e.steps, (i, y) => (s(), c("div", {
        key: i.key,
        class: ue(["w-progress-flow__step", `w-progress-flow__step--${o(y)}`])
      }, [
        O(l.$slots, "step", {
          step: i,
          index: y,
          state: o(y)
        }, () => [
          v("div", Qn, [
            v("span", null, R(y + 1), 1)
          ]),
          v("div", el, [
            v("p", tl, R(i.label), 1),
            i.description ? (s(), c("p", al, R(i.description), 1)) : S("", !0)
          ])
        ])
      ], 2))), 128))
    ], 2));
  }
});
function ol(e, t, a) {
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
function nl(e) {
  return {
    async list(t, a = {}) {
      const o = await e.get(t, { params: a });
      return ol(
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
const Hl = {
  install(e, t) {
    if (!(t != null && t.axios) && !(t != null && t.dataProvider))
      throw new Error(
        '[wPrimeVueComponents] Informe "axios" ou "dataProvider" ao registrar o WPrimeVuePlugin.'
      );
    const a = t.dataProvider ?? nl(t.axios), o = {
      axios: t.axios,
      dataProvider: a,
      defaultPageSize: t.defaultPageSize ?? 20,
      dateFormat: t.dateFormat ?? "DD/MM/YYYY",
      dateTimeFormat: t.dateTimeFormat ?? "DD/MM/YYYY HH:mm",
      locale: t.locale ?? "pt-BR",
      currency: t.currency ?? "BRL"
    };
    t.axios && e.provide(ea, t.axios), e.provide(Qe, a), e.provide(et, o), t.registerComponents !== !1 && (e.component("WCrudView", tn), e.component("WCrudFormDialog", it), e.component("WCrudColumnRenderer", Xe), e.component("WAutoCompleteFK", Rt), e.component("WMoneyInput", Tt), e.component("WTransferList", Lt));
  }
}, ll = {
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
function sl(e, t) {
  const a = {};
  for (const o of Object.keys(t))
    JSON.stringify(e[o]) !== JSON.stringify(t[o]) && (a[o] = t[o]);
  return a;
}
function Kl(e) {
  const {
    endpoint: t,
    columns: a,
    form: o,
    pk: l = "id",
    searchDebounce: r = 300,
    partialUpdate: i = !0,
    canCreate: y = !0,
    canEdit: u = !0,
    canDelete: k = !0,
    rowActions: M = void 0,
    filterParams: P = void 0,
    createDefaults: B = void 0,
    transformPayload: Y = void 0,
    onAfterSave: G = void 0,
    onAfterDelete: Z = void 0
  } = e, f = Ie(Qe);
  if (!f)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const b = f, $ = Ie(et), V = e.pageSize ?? ($ == null ? void 0 : $.defaultPageSize) ?? 20, T = { ...ll, ...e.labels }, j = At(), { confirmDelete: w } = It(), h = K([]), U = K({}), m = K(!1), A = K(!1), L = K(""), X = K(!1), d = K(!1), E = K(null), F = ve({});
  let n = null;
  const p = ve({
    page: 1,
    pageSize: V,
    rows: 0,
    totalPages: 0
  }), J = ve({
    field: null,
    order: 0
  });
  function ne() {
    const x = {};
    for (const N of o)
      x[N.field] = N.defaultValue !== void 0 ? typeof N.defaultValue == "function" ? N.defaultValue() : N.defaultValue : null;
    return x;
  }
  const Q = ne();
  for (const x of Object.keys(Q))
    F[x] = Q[x];
  const _ = q(
    () => E.value !== null && !d.value
  ), de = q(() => d.value), me = q(
    () => d.value ? T.viewTitle ?? "Visualizar Registro" : _.value ? T.editTitle : T.createTitle
  ), Ne = q(() => p.page <= 1), Ye = q(() => p.page >= p.totalPages);
  let ge = null;
  async function fe(x = {}) {
    m.value = !0;
    try {
      const N = {
        page: p.page,
        page_size: p.pageSize,
        ...x
      };
      L.value && (N.search = L.value), J.field && J.order !== 0 && (N.ordering = J.order === -1 ? `-${J.field}` : J.field), P && Object.assign(N, P());
      const H = await b.list(t, N);
      h.value = H.data, p.rows = H.rows, U.value = H.extras ?? {}, H.page && (p.page = H.page), H.page_size && (p.pageSize = H.page_size), p.totalPages = Math.ceil(p.rows / p.pageSize) || 0;
    } finally {
      m.value = !1;
    }
  }
  async function he() {
    await fe();
  }
  async function pe() {
    await fe();
  }
  function ye(x) {
    L.value = x, ge && clearTimeout(ge), ge = setTimeout(() => {
      p.page = 1, fe();
    }, r);
  }
  function Ee(x) {
    const N = x.target;
    ye(N.value);
  }
  function be(x) {
    p.page = x, fe();
  }
  function Me() {
    be(1);
  }
  function $e() {
    be(p.totalPages);
  }
  function De(x) {
    p.page = x.page + 1, p.pageSize = x.rows, fe();
  }
  function Fe(x) {
    J.field = x.sortField ?? null, J.order = x.sortOrder ?? 0, p.page = 1, fe();
  }
  function Ce() {
    const x = ne();
    for (const N of Object.keys(x))
      F[N] = x[N];
  }
  function Ae(x, N) {
    F[x] = N;
  }
  function D() {
    if (d.value = !1, E.value = null, n = null, Ce(), B) {
      const x = B();
      for (const [N, H] of Object.entries(x))
        F[N] = H;
    }
    X.value = !0;
  }
  function C(x) {
    const N = {};
    for (const H of o) {
      let ae = x[H.field] !== void 0 ? x[H.field] : null;
      ae && (H.type === "date" || H.type === "datetime") && typeof ae == "string" && (ae = Dt(ae)), F[H.field] = ae, N[H.field] = ae;
    }
    n = N;
  }
  function ee(x) {
    d.value = !1, E.value = x, C(x), X.value = !0;
  }
  function z(x) {
    d.value = !0, E.value = x, C(x), X.value = !0;
  }
  function ie(x) {
    const N = { ...x };
    for (const H of o) {
      const ae = N[H.field];
      if (H.type === "date" && ae instanceof Date ? N[H.field] = Ct(ae) : H.type === "datetime" && ae instanceof Date && (N[H.field] = St(ae)), H.type === "fk" && ae !== null && typeof ae == "object") {
        const He = H.optionValue || "id";
        N[H.field] = ae[He] ?? ae;
      }
      (H.type === "mask" || H.type === "cpf_cnpj") && typeof ae == "string" && (N[H.field] = Ve(ae));
    }
    return N;
  }
  async function Yt() {
    for (const x of o) {
      if (x.validate) {
        const N = x.validate(F[x.field]);
        if (N)
          return j.error(N), null;
      }
      if (x.required) {
        const N = F[x.field];
        if (N == null || N === "")
          return j.error(`${x.label} é obrigatório`), null;
      }
    }
    A.value = !0;
    try {
      let x = ie(F);
      if (!_.value && B && Object.assign(x, B()), _.value && i && n) {
        const we = ie(n);
        if (x = sl(we, x), Object.keys(x).length === 0 && !Y) {
          X.value = !1;
          const Se = E.value;
          return E.value = null, n = null, Se;
        }
      }
      Y && (x = Y(x, _.value));
      const N = o.some(
        (we) => we.type === "image" && x[we.field] instanceof File
      );
      let H = x, ae;
      if (N) {
        const we = new Set(
          o.filter((ke) => ke.type === "image").map((ke) => ke.field)
        ), Se = new FormData();
        for (const [ke, ze] of Object.entries(x))
          if (ze != null)
            if (ze instanceof File)
              Se.append(ke, ze);
            else {
              if (we.has(ke))
                continue;
              Se.append(ke, String(ze));
            }
        H = Se, ae = { "Content-Type": "multipart/form-data" };
      }
      const He = ae ? { headers: ae } : void 0;
      let Te;
      if (_.value && E.value) {
        const we = E.value[l];
        Te = await b.update(
          t,
          we,
          H,
          He
        );
        const Se = h.value.findIndex((ke) => ke[l] === we);
        Se !== -1 && (h.value[Se] = Te.data), j.success(T.successUpdate);
      } else
        Te = await b.create(t, H, He), h.value.unshift(Te.data), p.rows++, j.success(T.successCreate);
      return X.value = !1, E.value = null, n = null, G && G(Te.data, _.value), Te.data;
    } catch (x) {
      return j.error(qe(x, "Erro ao salvar registro")), null;
    } finally {
      A.value = !1;
    }
  }
  function zt(x) {
    w(async () => {
      try {
        const N = x[l];
        await b.delete(t, N);
        const H = h.value.findIndex((ae) => ae[l] === N);
        H !== -1 && (h.value.splice(H, 1), p.rows--), j.success(T.successDelete), Z && Z(x);
      } catch (N) {
        j.error(qe(N, "Erro ao excluir registro"));
      }
    }, T.deleteConfirmMessage);
  }
  return {
    items: h,
    extras: U,
    loading: m,
    saving: A,
    search: L,
    dialogVisible: X,
    editingItem: E,
    formData: F,
    pagination: p,
    sort: J,
    isEditing: _,
    isViewing: de,
    viewMode: d,
    dialogTitle: me,
    isFirstPage: Ne,
    isLastPage: Ye,
    init: he,
    fetchItems: fe,
    refresh: pe,
    setSearch: ye,
    onSearch: Ee,
    onPage: De,
    onSort: Fe,
    openCreateDialog: D,
    openEditDialog: ee,
    openViewDialog: z,
    save: Yt,
    confirmDelete: zt,
    setFormField: Ae,
    resetForm: Ce,
    goToPage: be,
    firstPage: Me,
    lastPage: $e,
    config: e
  };
}
function Gl(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: o = !1 } = e, l = Ie(Qe);
  if (!l)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const r = l, i = Ie(et), y = e.pageSize ?? (i == null ? void 0 : i.defaultPageSize) ?? 20, u = K([]), k = K(!1), M = K(""), P = K({}), B = ve({}), Y = ve({
    page: 1,
    pageSize: y,
    rows: 0,
    totalPages: 0
  }), G = ve({
    field: null,
    order: 0
  });
  let Z = null;
  async function f(h = {}) {
    k.value = !0;
    try {
      const U = {
        page: Y.page,
        page_size: Y.pageSize,
        ...h
      };
      M.value && (U.search = M.value), G.field && G.order !== 0 && (U.ordering = G.order === -1 ? `-${G.field}` : G.field);
      for (const [A, L] of Object.entries(B))
        L != null && L !== "" && (U[A] = L);
      const m = await r.list(t, U);
      u.value = m.data, Y.rows = m.rows, m.page && (Y.page = m.page), m.page_size && (Y.pageSize = m.page_size), Y.totalPages = Math.ceil(Y.rows / Y.pageSize) || 0, P.value = m.extras ?? {};
    } finally {
      k.value = !1;
    }
  }
  async function b() {
    await f();
  }
  function $(h) {
    M.value = h, Z && clearTimeout(Z), Z = setTimeout(() => {
      Y.page = 1, f();
    }, a);
  }
  function V(h, U) {
    B[h] = U, Y.page = 1, f();
  }
  function T() {
    for (const h of Object.keys(B))
      delete B[h];
    Y.page = 1, f();
  }
  function j(h) {
    Y.page = h.page + 1, Y.pageSize = h.rows, f();
  }
  function w(h) {
    G.field = h.sortField ?? null, G.order = h.sortOrder ?? 0, Y.page = 1, f();
  }
  return o && f(), {
    items: u,
    loading: k,
    search: M,
    pagination: Y,
    sort: G,
    extras: P,
    fetchItems: f,
    refresh: b,
    setSearch: $,
    setFilter: V,
    clearFilters: T,
    onPage: j,
    onSort: w
  };
}
function rl(e) {
  return e.split("?")[0].replace(/^\/+|\/+$/g, "").replace(/^api\/v\d+\//, "");
}
function il(e) {
  return typeof e == "string" ? { table: e } : e;
}
function Nt(e, t = 400) {
  return {
    response: {
      status: t,
      data: { detail: e }
    },
    message: e
  };
}
function ht(e) {
  if (e instanceof FormData)
    throw Nt(
      "SupabaseDataProvider nao envia FormData diretamente. Faça upload do arquivo no Storage e envie a URL/caminho no payload."
    );
  return e;
}
function We(e) {
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
function Oe(e, t) {
  var l, r;
  const a = rl(e), o = (l = t.resources) == null ? void 0 : l[a];
  if (o)
    return il(o);
  if ((r = t.allowedTables) != null && r.includes(a))
    return { table: a };
  throw Nt(
    `Recurso Supabase nao registrado para o endpoint "${e}".`,
    404
  );
}
function ul(e, t, a) {
  const o = /* @__PURE__ */ new Set(["page", "page_size", "search", "ordering"]), l = { ...a.defaultFilters, ...t };
  for (const [r, i] of Object.entries(l))
    o.has(r) || i === null || i === void 0 || i === "" || (e = e.eq(r, i));
  return e;
}
function dl(e, t, a) {
  if (typeof t != "string" || !t.trim() || !(a != null && a.length))
    return e;
  const o = t.trim().replace(/,/g, "\\,"), l = a.map((r) => `${r}.ilike.%${o}%`).join(",");
  return e.or(l);
}
function cl(e, t) {
  const a = typeof e == "string" && e ? e : t;
  return a ? {
    field: a.startsWith("-") ? a.slice(1) : a,
    ascending: !a.startsWith("-")
  } : null;
}
function fl(e, t) {
  return e ? t.mapListItem ? e.map(
    (a) => {
      var o;
      return (o = t.mapListItem) == null ? void 0 : o.call(t, a);
    }
  ) : e : [];
}
function Jl(e) {
  const t = e.defaultSelect ?? "*";
  return {
    async list(a, o = {}) {
      var B;
      const l = Oe(a, e), r = Math.max(Number(o.page ?? 1), 1), i = Math.max(Number(o.page_size ?? 20), 1), y = (r - 1) * i, u = y + i - 1;
      let k = e.client.from(l.table).select(l.select ?? t, { count: "exact" });
      k = ul(k, o, l), k = dl(k, o.search, l.searchFields);
      const M = cl(o.ordering, l.defaultOrdering);
      M && (k = k.order(M.field, { ascending: M.ascending }));
      const P = await k.range(y, u);
      return P.error && We(P.error), {
        data: fl(P.data, l),
        page: r,
        page_size: i,
        rows: P.count ?? ((B = P.data) == null ? void 0 : B.length) ?? 0,
        extras: {}
      };
    },
    async get(a, o, l) {
      const r = Oe(a, e), i = r.pk ?? "id", y = await e.client.from(r.table).select(r.select ?? t).eq(i, o).single();
      return y.error && We(y.error), { data: y.data };
    },
    async create(a, o, l) {
      const r = Oe(a, e), i = ht(o), y = r.mapPayload ? r.mapPayload(i, "create") : i, u = await e.client.from(r.table).insert(y).select(r.select ?? t).single();
      return u.error && We(u.error), { data: u.data };
    },
    async update(a, o, l, r) {
      const i = Oe(a, e), y = i.pk ?? "id", u = ht(l), k = i.mapPayload ? i.mapPayload(u, "update") : u, M = await e.client.from(i.table).update(k).eq(y, o).select(i.select ?? t).single();
      return M.error && We(M.error), { data: M.data };
    },
    async delete(a, o) {
      const l = Oe(a, e), r = l.pk ?? "id", i = l.softDelete === !0 ? { is_active: !1 } : typeof l.softDelete == "object" ? l.softDelete : null, y = i ? await e.client.from(l.table).update(i).eq(r, o) : await e.client.from(l.table).delete().eq(r, o);
      y.error && We(y.error);
    }
  };
}
export {
  ll as DEFAULT_CRUD_LABELS,
  _l as WActionBar,
  Rt as WAutoCompleteFK,
  Xe as WCrudColumnRenderer,
  it as WCrudFormDialog,
  tn as WCrudView,
  Wl as WDetailHeader,
  zl as WEmptyState,
  So as WFormRenderer,
  Ul as WFormSection,
  Ol as WInfoCard,
  Ln as WKpiCard,
  Bl as WKpiGrid,
  Tt as WMoneyInput,
  Yl as WPageHeader,
  Hl as WPrimeVuePlugin,
  ql as WProgressFlow,
  jl as WSectionHeader,
  an as WStatusTag,
  Lt as WTransferList,
  ea as W_AXIOS_KEY,
  et as W_CONFIG_KEY,
  Qe as W_DATA_PROVIDER_KEY,
  nl as createAxiosDataProvider,
  Jl as createSupabaseDataProvider,
  qe as extractApiError,
  Aa as mapApiFieldToColumnDef,
  Ea as mapApiFieldToFieldDef,
  Ia as mapApiFieldsToColumnDefs,
  Ma as mapApiFieldsToFieldDefs,
  Gl as useApi,
  Nl as useApiError,
  It as useAppConfirm,
  At as useAppToast,
  Kl as useCrudManager,
  rt as useFormatters
};
//# sourceMappingURL=index.js.map
