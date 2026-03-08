import { inject as Me, defineComponent as de, openBlock as v, createElementBlock as E, createBlock as M, unref as k, toDisplayString as B, ref as R, watch as He, computed as W, reactive as ge, resolveDirective as dt, Fragment as pe, createElementVNode as C, createVNode as K, withDirectives as Te, withCtx as Q, createCommentVNode as j, renderList as ve, normalizeStyle as Ie, createTextVNode as Ke, renderSlot as X, normalizeClass as Ne, isRef as Et, withModifiers as Pt, createSlots as Ze, normalizeProps as Je, guardReactiveProps as Xe, onMounted as Mt } from "vue";
import ct from "primevue/datatable";
import Ye from "primevue/column";
import oe from "primevue/button";
import be from "primevue/inputtext";
import ft from "primevue/iconfield";
import mt from "primevue/inputicon";
import pt from "primevue/tag";
import Ae from "dayjs";
import vt from "primevue/dialog";
import at from "primevue/inputnumber";
import At from "primevue/textarea";
import Ft from "primevue/select";
import gt from "primevue/autocomplete";
import ot from "primevue/datepicker";
import Tt from "primevue/toggleswitch";
import Yt from "primevue/colorpicker";
import Rt from "primevue/password";
import { useToast as It } from "primevue/usetoast";
import { useConfirm as Lt } from "primevue/useconfirm";
const We = Symbol("w-axios"), Be = Symbol("w-config");
function Nt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ue = { exports: {} }, jt = Ue.exports, lt;
function zt() {
  return lt || (lt = 1, (function(e, t) {
    (function(a, o) {
      e.exports = o();
    })(jt, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, o = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, r = /\d/, i = /\d\d/, d = /\d\d?/, g = /\d*[^-_:/,()\s\d]+/, p = {}, $ = function(n) {
        return (n = +n) + (n > 68 ? 1900 : 2e3);
      }, x = function(n) {
        return function(c) {
          this[n] = +c;
        };
      }, I = [/[+-]\d\d:?(\d\d)?|Z/, function(n) {
        (this.zone || (this.zone = {})).offset = (function(c) {
          if (!c || c === "Z") return 0;
          var S = c.match(/([+-]|\d\d)/g), f = 60 * S[1] + (+S[2] || 0);
          return f === 0 ? 0 : S[0] === "+" ? -f : f;
        })(n);
      }], z = function(n) {
        var c = p[n];
        return c && (c.indexOf ? c : c.s.concat(c.f));
      }, V = function(n, c) {
        var S, f = p.meridiem;
        if (f) {
          for (var y = 1; y <= 24; y += 1) if (n.indexOf(f(y, 0, c)) > -1) {
            S = y > 12;
            break;
          }
        } else S = n === (c ? "pm" : "PM");
        return S;
      }, L = { A: [g, function(n) {
        this.afternoon = V(n, !1);
      }], a: [g, function(n) {
        this.afternoon = V(n, !0);
      }], Q: [r, function(n) {
        this.month = 3 * (n - 1) + 1;
      }], S: [r, function(n) {
        this.milliseconds = 100 * +n;
      }], SS: [i, function(n) {
        this.milliseconds = 10 * +n;
      }], SSS: [/\d{3}/, function(n) {
        this.milliseconds = +n;
      }], s: [d, x("seconds")], ss: [d, x("seconds")], m: [d, x("minutes")], mm: [d, x("minutes")], H: [d, x("hours")], h: [d, x("hours")], HH: [d, x("hours")], hh: [d, x("hours")], D: [d, x("day")], DD: [i, x("day")], Do: [g, function(n) {
        var c = p.ordinal, S = n.match(/\d+/);
        if (this.day = S[0], c) for (var f = 1; f <= 31; f += 1) c(f).replace(/\[|\]/g, "") === n && (this.day = f);
      }], w: [d, x("week")], ww: [i, x("week")], M: [d, x("month")], MM: [i, x("month")], MMM: [g, function(n) {
        var c = z("months"), S = (z("monthsShort") || c.map((function(f) {
          return f.slice(0, 3);
        }))).indexOf(n) + 1;
        if (S < 1) throw new Error();
        this.month = S % 12 || S;
      }], MMMM: [g, function(n) {
        var c = z("months").indexOf(n) + 1;
        if (c < 1) throw new Error();
        this.month = c % 12 || c;
      }], Y: [/[+-]?\d+/, x("year")], YY: [i, function(n) {
        this.year = $(n);
      }], YYYY: [/\d{4}/, x("year")], Z: I, ZZ: I };
      function U(n) {
        var c, S;
        c = n, S = p && p.formats;
        for (var f = (n = c.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(l, m, A) {
          var P = A && A.toUpperCase();
          return m || S[A] || a[A] || S[P].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(H, F, Z) {
            return F || Z.slice(1);
          }));
        }))).match(o), y = f.length, T = 0; T < y; T += 1) {
          var q = f[T], Y = L[q], u = Y && Y[0], D = Y && Y[1];
          f[T] = D ? { regex: u, parser: D } : q.replace(/^\[|\]$/g, "");
        }
        return function(l) {
          for (var m = {}, A = 0, P = 0; A < y; A += 1) {
            var H = f[A];
            if (typeof H == "string") P += H.length;
            else {
              var F = H.regex, Z = H.parser, ce = l.slice(P), ae = F.exec(ce)[0];
              Z.call(m, ae), l = l.replace(ae, "");
            }
          }
          return (function(ee) {
            var re = ee.afternoon;
            if (re !== void 0) {
              var te = ee.hours;
              re ? te < 12 && (ee.hours += 12) : te === 12 && (ee.hours = 0), delete ee.afternoon;
            }
          })(m), m;
        };
      }
      return function(n, c, S) {
        S.p.customParseFormat = !0, n && n.parseTwoDigitYear && ($ = n.parseTwoDigitYear);
        var f = c.prototype, y = f.parse;
        f.parse = function(T) {
          var q = T.date, Y = T.utc, u = T.args;
          this.$u = Y;
          var D = u[1];
          if (typeof D == "string") {
            var l = u[2] === !0, m = u[3] === !0, A = l || m, P = u[2];
            m && (P = u[2]), p = this.$locale(), !l && P && (p = S.Ls[P]), this.$d = (function(ce, ae, ee, re) {
              try {
                if (["x", "X"].indexOf(ae) > -1) return new Date((ae === "X" ? 1e3 : 1) * ce);
                var te = U(ae)(ce), ke = te.year, he = te.month, $e = te.day, se = te.hours, fe = te.minutes, De = te.seconds, le = te.milliseconds, ne = te.zone, ue = te.week, Ce = /* @__PURE__ */ new Date(), xe = $e || (ke || he ? 1 : Ce.getDate()), Se = ke || Ce.getFullYear(), ye = 0;
                ke && !he || (ye = he > 0 ? he - 1 : Ce.getMonth());
                var me, Ve = se || 0, Ee = fe || 0, Pe = De || 0, h = le || 0;
                return ne ? new Date(Date.UTC(Se, ye, xe, Ve, Ee, Pe, h + 60 * ne.offset * 1e3)) : ee ? new Date(Date.UTC(Se, ye, xe, Ve, Ee, Pe, h)) : (me = new Date(Se, ye, xe, Ve, Ee, Pe, h), ue && (me = re(me).week(ue).toDate()), me);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(q, D, Y, S), this.init(), P && P !== !0 && (this.$L = this.locale(P).$L), A && q != this.format(D) && (this.$d = /* @__PURE__ */ new Date("")), p = {};
          } else if (D instanceof Array) for (var H = D.length, F = 1; F <= H; F += 1) {
            u[1] = D[F - 1];
            var Z = S.apply(this, u);
            if (Z.isValid()) {
              this.$d = Z.$d, this.$L = Z.$L, this.init();
              break;
            }
            F === H && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else y.call(this, T);
        };
      };
    }));
  })(Ue)), Ue.exports;
}
var Ut = zt();
const Ot = /* @__PURE__ */ Nt(Ut);
Ae.extend(Ot);
function Qe(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const t = Ae(e, "YYYY-MM-DD", !0);
  return t.isValid() ? t.toDate() : Ae(e).toDate();
}
function ht(e) {
  return e ? typeof e == "string" ? e : Ae(e).format("YYYY-MM-DD") : null;
}
function yt(e) {
  return e ? typeof e == "string" ? e : Ae(e).toISOString() : null;
}
function Wt(e, t = "DD/MM/YYYY") {
  return e ? Ae(e).format(t) : "—";
}
function Bt(e) {
  return e ? Ae(e).format("DD/MM/YYYY HH:mm") : "—";
}
function we(e) {
  return e.replace(/\D/g, "");
}
function bt(e) {
  if (!e) return "—";
  const t = we(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function wt(e) {
  if (!e) return "—";
  const t = we(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function qt(e) {
  if (!e) return "—";
  const t = we(e);
  return t.length === 11 ? bt(e) : t.length === 14 ? wt(e) : e;
}
function Ht(e) {
  if (!e) return "—";
  const t = we(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function kt(e) {
  if (!e) return null;
  const t = we(e);
  if (t.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(t)) return "CPF inválido.";
  let a = 0;
  for (let d = 0; d < 9; d++) a += parseInt(t[d]) * (10 - d);
  let o = a % 11;
  const r = o < 2 ? 0 : 11 - o;
  if (parseInt(t[9]) !== r) return "CPF inválido.";
  a = 0;
  for (let d = 0; d < 10; d++) a += parseInt(t[d]) * (11 - d);
  o = a % 11;
  const i = o < 2 ? 0 : 11 - o;
  return parseInt(t[10]) !== i ? "CPF inválido." : null;
}
function $t(e) {
  if (!e) return null;
  const t = we(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let o = 0;
  for (let p = 0; p < 12; p++) o += parseInt(t[p]) * a[p];
  let r = o % 11;
  const i = r < 2 ? 0 : 11 - r;
  if (parseInt(t[12]) !== i) return "CNPJ inválido.";
  const d = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  o = 0;
  for (let p = 0; p < 13; p++) o += parseInt(t[p]) * d[p];
  r = o % 11;
  const g = r < 2 ? 0 : 11 - r;
  return parseInt(t[13]) !== g ? "CNPJ inválido." : null;
}
function Kt(e) {
  if (!e) return null;
  const t = we(e);
  return t.length === 11 ? kt(e) : t.length === 14 ? $t(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const Oe = /* @__PURE__ */ new Map();
function nt(e, t) {
  const a = `${e}-${t}`;
  let o = Oe.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }), Oe.set(a, o)), o;
}
function Zt(e, t) {
  const a = `${e}-${t}`;
  let o = Oe.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    style: "currency",
    currency: t
  }), Oe.set(a, o)), o;
}
function Ge() {
  const e = Me(Be, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), t = (e == null ? void 0 : e.locale) ?? "pt-BR", a = (e == null ? void 0 : e.currency) ?? "BRL";
  function o(p) {
    return p == null ? "—" : Zt(t, a).format(p);
  }
  function r(p, $ = 2) {
    return p == null ? "—" : nt(t, $).format(p);
  }
  function i(p, $) {
    return Wt(p, $ ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function d(p) {
    return Bt(p);
  }
  function g(p) {
    return p == null ? "—" : `${nt(t, 2).format(p)}%`;
  }
  return {
    formatCurrency: o,
    formatNumber: r,
    formatDate: i,
    formatDateTime: d,
    formatPercent: g,
    formatCpf: bt,
    formatCnpj: wt,
    formatCpfCnpj: qt,
    formatTelefone: Ht,
    validateCpf: kt,
    validateCnpj: $t,
    validateCpfCnpj: Kt,
    parseDate: Qe,
    toDateString: ht,
    toDateTimeString: yt
  };
}
const Jt = {
  key: 0,
  class: "text-muted-color text-xs"
}, Xt = ["src", "alt"], Qt = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, Gt = {
  key: 4,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, _t = {
  key: 5,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, ea = {
  key: 6,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, ta = {
  key: 7,
  class: "text-[0.8125rem]"
}, _e = /* @__PURE__ */ de({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: o, formatNumber: r } = Ge();
    return (i, d) => e.value == null ? (v(), E("span", Jt, "—")) : e.column.type === "image" ? (v(), E("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, Xt)) : e.column.type === "boolean" ? (v(), M(k(pt), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (v(), E("span", Qt, B(k(t)(e.value)), 1)) : e.column.type === "datetime" ? (v(), E("span", Gt, B(k(a)(e.value)), 1)) : e.column.type === "currency" ? (v(), E("span", _t, B(k(o)(e.value)), 1)) : e.column.type === "number" ? (v(), E("span", ea, B(e.column.format ? e.column.format(e.value, e.rowData) : k(r)(e.value, e.column.decimals ?? 0)), 1)) : (v(), E("span", ta, B(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var aa = Object.defineProperty, oa = (e, t, a) => t in e ? aa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, Le = (e, t, a) => oa(e, typeof t != "symbol" ? t + "" : t, a);
const rt = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, st = (e, t, a) => e.replaceAll(t, "").replace(a, ".").replace("..", ".").replace(/[^.\d]/g, ""), it = (e, t, a) => {
  var o;
  return new Intl.NumberFormat(((o = a.number) == null ? void 0 : o.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
}, la = (e, t = !0, a) => {
  var o, r, i, d;
  const g = ((o = a.number) == null ? void 0 : o.unsigned) !== !0 && e.startsWith("-") ? "-" : "", p = ((r = a.number) == null ? void 0 : r.fraction) ?? 0;
  let $ = it(0, p, a);
  const x = $.formatToParts(1000.12), I = ((i = x.find((n) => n.type === "group")) == null ? void 0 : i.value) ?? " ", z = ((d = x.find((n) => n.type === "decimal")) == null ? void 0 : d.value) ?? ".", V = st(e, I, z);
  if (Number.isNaN(parseFloat(V))) return g;
  const L = V.split(".");
  if (L[1] != null && L[1].length >= 1) {
    const n = L[1].length <= p ? L[1].length : p;
    $ = it(n, p, a);
  }
  let U = $.format(parseFloat(V));
  return t ? p > 0 && V.endsWith(".") && !V.slice(0, -1).includes(".") && (U += z) : U = st(U, I, z), g + U;
}, Dt = (e) => JSON.parse(e.replaceAll("'", '"')), na = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = ra(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = ze(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = ze(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = ze(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = sa(e.dataset.maskaTokens));
  const o = {};
  return e.dataset.maskaNumberLocale != null && (o.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (o.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (o.unsigned = ze(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(o).length > 0) && (a.number = o), a;
}, ze = (e) => e !== "" ? !!JSON.parse(e) : !0, ra = (e) => e.startsWith("[") && e.endsWith("]") ? Dt(e) : e, sa = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return Dt(e);
  const t = {};
  return e.split("|").forEach((a) => {
    const o = a.split(":");
    t[o[0]] = {
      pattern: Ct() ? new RegExp(o[1], "u") : new RegExp(o[1]),
      optional: o[2] === "optional",
      multiple: o[2] === "multiple",
      repeated: o[2] === "repeated"
    };
  }), t;
}, Ct = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class ia {
  constructor(t = {}) {
    Le(this, "opts", {}), Le(this, "memo", /* @__PURE__ */ new Map());
    const a = { ...t };
    if (a.tokens != null) {
      a.tokens = a.tokensReplace ? { ...a.tokens } : { ...rt, ...a.tokens };
      for (const o of Object.values(a.tokens))
        typeof o.pattern == "string" && (o.pattern = Ct() ? new RegExp(o.pattern, "u") : new RegExp(o.pattern));
    } else
      a.tokens = rt;
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
    if (this.opts.number != null) return la(t, o, this.opts);
    if (a == null) return t;
    const r = `v=${t},mr=${a},m=${o ? 1 : 0}`;
    if (this.memo.has(r)) return this.memo.get(r);
    const { mask: i, escaped: d } = this.escapeMask(a), g = [], p = this.opts.tokens != null ? this.opts.tokens : {}, $ = this.isReversed() ? -1 : 1, x = this.isReversed() ? "unshift" : "push", I = this.isReversed() ? 0 : i.length - 1, z = this.isReversed() ? () => n > -1 && c > -1 : () => n < i.length && c < t.length, V = (f) => !this.isReversed() && f <= I || this.isReversed() && f >= I;
    let L, U = -1, n = this.isReversed() ? i.length - 1 : 0, c = this.isReversed() ? t.length - 1 : 0, S = !1;
    for (; z(); ) {
      const f = i.charAt(n), y = p[f], T = (y == null ? void 0 : y.transform) != null ? y.transform(t.charAt(c)) : t.charAt(c);
      if (!d.includes(n) && y != null ? (T.match(y.pattern) != null ? (g[x](T), y.repeated ? (U === -1 ? U = n : n === I && n !== U && (n = U - $), I === U && (n -= $)) : y.multiple && (S = !0, n -= $), n += $) : y.multiple ? S && (n += $, c -= $, S = !1) : T === L ? L = void 0 : y.optional && (n += $, c -= $), c += $) : (o && !this.isEager() && g[x](f), T === f && !this.isEager() ? c += $ : L = f, this.isEager() || (n += $)), this.isEager())
        for (; V(n) && (p[i.charAt(n)] == null || d.includes(n)); ) {
          if (o) {
            if (g[x](i.charAt(n)), t.charAt(c) === i.charAt(n)) {
              n += $, c += $;
              continue;
            }
          } else i.charAt(n) === t.charAt(c) && (c += $);
          n += $;
        }
    }
    return this.memo.set(r, g.join("")), this.memo.get(r);
  }
}
class ua {
  constructor(t, a = {}) {
    Le(this, "items", /* @__PURE__ */ new Map()), Le(this, "eventAbortController"), Le(this, "onInput", (o) => {
      if (o instanceof CustomEvent && o.type === "input" && !o.isTrusted && !o.bubbles)
        return;
      const r = o.target, i = this.items.get(r);
      if (i === void 0) return;
      const d = "inputType" in o && o.inputType.startsWith("delete"), g = i.isEager(), p = d && g && i.unmasked(r.value) === "" ? "" : r.value;
      this.fixCursor(r, d, () => this.setValue(r, p));
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
      const r = new ia(na(o, a));
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
    const d = t.selectionStart, g = t.value;
    if (o(), d === null || d === g.length && !a) return;
    const p = t.value, $ = g.slice(0, d), x = p.slice(0, d), I = (r = this.processInput(t, $)) == null ? void 0 : r.unmasked, z = (i = this.processInput(t, x)) == null ? void 0 : i.unmasked;
    if (I === void 0 || z === void 0) return;
    let V = d;
    $ !== x && (V += a ? p.length - g.length : I.length - z.length), t.setSelectionRange(V, V);
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
const qe = /* @__PURE__ */ new WeakMap(), da = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, ut = (e, t) => {
  var a;
  const o = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (o == null || (o == null ? void 0 : o.type) === "file") return;
  let r = {};
  if (t.value != null && (r = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const i = (d) => {
      const g = t.modifiers.unmasked ? d.unmasked : t.modifiers.completed ? d.completed : d.masked;
      da(t, g);
    };
    r.onMaska = r.onMaska == null ? i : Array.isArray(r.onMaska) ? [...r.onMaska, i] : [r.onMaska, i];
  }
  qe.has(o) ? (a = qe.get(o)) == null || a.update(r) : qe.set(o, new ua(o, r));
}, ca = {
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
function fa(e) {
  var o;
  const t = ca[e.type] ?? "text", a = {
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
function ma(e) {
  return e.filter((t) => !t.read_only && t.name !== "id").map(fa);
}
const pa = {
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
  decimal: "number",
  float: "number",
  integer: "number"
};
function va(e) {
  return {
    field: e.type === "fk" ? `${e.name}_nome` : e.name,
    header: e.label,
    type: pa[e.type],
    sortable: !0
  };
}
function ga(e, t = 6) {
  return e.filter((a) => !a.read_only && a.name !== "id").slice(0, t).map(va);
}
function xt() {
  const e = It();
  function t(i, d = "Sucesso") {
    e.add({ severity: "success", summary: d, detail: i, life: 3e3 });
  }
  function a(i, d = "Erro") {
    e.add({ severity: "error", summary: d, detail: i, life: 5e3 });
  }
  function o(i, d = "Atenção") {
    e.add({ severity: "warn", summary: d, detail: i, life: 4e3 });
  }
  function r(i, d = "Info") {
    e.add({ severity: "info", summary: d, detail: i, life: 3e3 });
  }
  return { success: t, error: a, warn: o, info: r };
}
function St() {
  const e = Lt();
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
function ha(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function ya(e) {
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
      const i = ha(o);
      if (Array.isArray(r)) {
        const d = r.filter((g) => typeof g == "string");
        d.length > 0 && a.push(`${i}: ${d.join(" ")}`);
      } else typeof r == "string" && a.push(`${i}: ${r}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function je(e, t = "Erro inesperado") {
  var i;
  if (!e || typeof e != "object") return t;
  const a = e, o = (i = a.response) == null ? void 0 : i.data;
  if (!o || typeof o != "object")
    return a.message || t;
  const r = o.detail ?? o;
  return ya(r) || t;
}
function Ko() {
  return { extractApiError: je };
}
const ba = { class: "w-autocompletefk" }, wa = ["disabled"], ka = { class: "w-autocompletefk-toolbar" }, $a = { class: "w-autocompletefk-toolbar-actions" }, Da = { class: "flex items-center justify-end gap-1" }, Ca = { class: "w-autocompletefk-footer" }, Vt = /* @__PURE__ */ de({
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
    const a = e, o = t, r = Me(We);
    if (!r)
      throw new Error("[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin.");
    const i = r, d = xt(), { confirmDelete: g } = St(), p = R(null), $ = R([]), x = R(!1);
    let I = null;
    async function z(h) {
      try {
        const b = await i.get(`${a.endpoint}${h}/`);
        p.value = b.data;
      } catch {
        p.value = null;
      }
    }
    async function V(h) {
      x.value = !0;
      try {
        const b = { page_size: 20 };
        h && (b.search = h);
        const s = (await i.get(a.endpoint, { params: b })).data;
        $.value = s.data ?? s.results ?? s;
      } catch {
        $.value = [];
      } finally {
        x.value = !1;
      }
    }
    function L(h) {
      const b = h.query || "";
      if (b.length < a.minLength) {
        $.value = [];
        return;
      }
      I && clearTimeout(I), I = setTimeout(() => V(b), 300);
    }
    function U(h) {
      p.value = h.value, o("update:modelValue", h.value);
    }
    function n() {
      p.value = null, o("update:modelValue", null);
    }
    He(
      () => a.modelValue,
      async (h) => {
        if (h != null) {
          if (typeof h == "object" && h !== null && a.optionLabel in h) {
            p.value = h;
            return;
          }
          (!p.value || p.value[a.optionValue] !== h) && await z(h);
        } else
          p.value = null;
      },
      { immediate: !0 }
    );
    const c = R(!1), S = R([]), f = R(!1), y = R(""), T = R(1), q = R(15), Y = R(0), u = R(null), D = R(null), l = R(0);
    let m = null;
    const A = R([]), P = W(() => {
      var h;
      return (h = a.crudFields) != null && h.length ? !0 : A.value.length > 0;
    }), H = W(() => a.canCreate ?? P.value), F = W(() => a.canEdit ?? P.value), Z = W(() => a.canDelete ?? P.value), ce = W(() => F.value || Z.value), ae = W(() => {
      var h;
      return (h = a.crudFields) != null && h.length ? a.crudFields : ma(A.value);
    }), ee = W(() => {
      var h, b;
      return (h = a.crudColumns) != null && h.length ? a.crudColumns : (b = a.columns) != null && b.length ? a.columns.map((O) => ({
        field: O.field,
        header: O.header,
        sortable: !0
      })) : A.value.length ? ga(A.value) : [{ field: a.optionLabel, header: a.optionLabel, sortable: !0 }];
    });
    async function re() {
      var h, b, O;
      f.value = !0;
      try {
        const s = {
          page: T.value,
          page_size: q.value
        };
        y.value && (s.search = y.value), D.value && l.value !== 0 && (s.ordering = l.value === -1 ? `-${D.value}` : D.value);
        const N = (await i.get(a.endpoint, { params: s })).data;
        S.value = N.data ?? N.results ?? N, Y.value = N.count ?? N.rows ?? 0, (h = N.extras) != null && h.fields && !((b = a.columns) != null && b.length) && !((O = a.crudFields) != null && O.length) && (A.value = N.extras.fields);
      } catch {
        S.value = [], Y.value = 0;
      } finally {
        f.value = !1;
      }
    }
    function te() {
      a.disabled || (y.value = "", T.value = 1, D.value = null, l.value = 0, u.value = null, c.value = !0, re());
    }
    function ke(h) {
      T.value = h.page + 1, q.value = h.rows, re();
    }
    function he(h) {
      D.value = h.sortField ?? null, l.value = h.sortOrder ?? 0, T.value = 1, re();
    }
    function $e() {
      u.value && (p.value = u.value, o("update:modelValue", u.value), c.value = !1);
    }
    function se(h) {
      p.value = h.data, o("update:modelValue", h.data), c.value = !1;
    }
    He(y, () => {
      m && clearTimeout(m), m = setTimeout(() => {
        T.value = 1, re();
      }, 300);
    });
    const fe = R(!1), De = R(!1), le = R(null), ne = ge({}), ue = W(() => le.value !== null), Ce = W(
      () => ue.value ? "Editar Registro" : "Novo Registro"
    );
    function xe() {
      const h = {};
      for (const b of ae.value)
        h[b.field] = b.defaultValue !== void 0 ? typeof b.defaultValue == "function" ? b.defaultValue() : b.defaultValue : null;
      return h;
    }
    function Se() {
      const h = xe();
      for (const b of Object.keys(ne))
        delete ne[b];
      for (const [b, O] of Object.entries(h))
        ne[b] = O;
    }
    function ye() {
      le.value = null, Se(), fe.value = !0;
    }
    function me(h) {
      le.value = h;
      for (const b of ae.value)
        ne[b.field] = h[b.field] !== void 0 ? h[b.field] : null;
      fe.value = !0;
    }
    function Ve(h, b) {
      ne[h] = b;
    }
    async function Ee() {
      De.value = !0;
      try {
        const h = { ...ne };
        for (const O of ae.value) {
          const s = h[O.field];
          if (O.type === "fk" && s !== null && typeof s == "object") {
            const w = O.optionValue || "id";
            h[O.field] = s[w] ?? s;
          }
        }
        let b;
        if (ue.value && le.value) {
          const O = le.value[a.optionValue];
          b = await i.patch(
            `${a.endpoint}${O}/`,
            h
          );
          const s = S.value.findIndex(
            (w) => w[a.optionValue] === O
          );
          s !== -1 && (S.value[s] = b.data), d.success("Registro atualizado com sucesso");
        } else
          b = await i.post(a.endpoint, h), S.value.unshift(b.data), Y.value++, d.success("Registro criado com sucesso");
        fe.value = !1, le.value = null, u.value = b.data;
      } catch (h) {
        d.error(je(h, "Erro ao salvar registro"));
      } finally {
        De.value = !1;
      }
    }
    function Pe(h) {
      g(async () => {
        try {
          const b = h[a.optionValue];
          await i.delete(`${a.endpoint}${b}/`);
          const O = S.value.findIndex(
            (s) => s[a.optionValue] === b
          );
          O !== -1 && (S.value.splice(O, 1), Y.value--), p.value && p.value[a.optionValue] === b && (p.value = null, o("update:modelValue", null)), u.value && u.value[a.optionValue] === b && (u.value = null), d.success("Registro excluído com sucesso");
        } catch (b) {
          d.error(je(b, "Erro ao excluir registro"));
        }
      });
    }
    return (h, b) => {
      const O = dt("tooltip");
      return v(), E(pe, null, [
        C("div", ba, [
          K(k(gt), {
            "model-value": p.value,
            suggestions: $.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: x.value,
            fluid: "",
            onComplete: L,
            onItemSelect: U,
            onClear: n
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          Te((v(), E("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: te
          }, [...b[6] || (b[6] = [
            C("i", { class: "pi pi-search" }, null, -1)
          ])], 8, wa)), [
            [
              O,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        K(k(vt), {
          visible: c.value,
          "onUpdate:visible": b[4] || (b[4] = (s) => c.value = s),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: Q(() => [
            C("div", Ca, [
              K(k(oe), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: b[3] || (b[3] = (s) => c.value = !1)
              }),
              K(k(oe), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !u.value,
                onClick: $e
              }, null, 8, ["disabled"])
            ])
          ]),
          default: Q(() => [
            C("div", ka, [
              K(k(ft), { class: "w-autocompletefk-toolbar-search" }, {
                default: Q(() => [
                  K(k(mt), { class: "pi pi-search" }),
                  K(k(be), {
                    modelValue: y.value,
                    "onUpdate:modelValue": b[0] || (b[0] = (s) => y.value = s),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              C("div", $a, [
                H.value ? (v(), M(k(oe), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: ye
                })) : j("", !0)
              ])
            ]),
            K(k(ct), {
              selection: u.value,
              "onUpdate:selection": b[1] || (b[1] = (s) => u.value = s),
              value: S.value,
              loading: f.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: q.value,
              "total-records": Y.value,
              "sort-field": D.value ?? void 0,
              "sort-order": l.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: ke,
              onSort: b[2] || (b[2] = (s) => he({ sortField: s.sortField, sortOrder: s.sortOrder })),
              onRowDblclick: se
            }, {
              empty: Q(() => [...b[7] || (b[7] = [
                C("div", { class: "w-autocompletefk-empty" }, " Nenhum registro encontrado ", -1)
              ])]),
              default: Q(() => [
                K(k(Ye), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (v(!0), E(pe, null, ve(ee.value, (s) => (v(), M(k(Ye), {
                  key: s.field,
                  field: s.field,
                  header: s.header,
                  sortable: s.sortable ?? !0,
                  style: Ie(s.style)
                }, {
                  body: Q(({ data: w }) => [
                    s.type ? (v(), M(_e, {
                      key: 0,
                      column: s,
                      value: w[s.field],
                      "row-data": w
                    }, null, 8, ["column", "value", "row-data"])) : (v(), E(pe, { key: 1 }, [
                      Ke(B(w[s.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                ce.value ? (v(), M(k(Ye), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: Q(({ data: s }) => [
                    C("div", Da, [
                      F.value ? Te((v(), M(k(oe), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (w) => me(s)
                      }, null, 8, ["onClick"])), [
                        [
                          O,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : j("", !0),
                      Z.value ? Te((v(), M(k(oe), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (w) => Pe(s)
                      }, null, 8, ["onClick"])), [
                        [
                          O,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : j("", !0)
                    ])
                  ]),
                  _: 1
                })) : j("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        P.value ? (v(), M(et, {
          key: 0,
          visible: fe.value,
          title: Ce.value,
          fields: ae.value,
          "form-data": ne,
          "is-editing": ue.value,
          saving: De.value,
          width: e.dialogWidth,
          "onUpdate:visible": b[5] || (b[5] = (s) => {
            fe.value = s, s || (le.value = null);
          }),
          "onUpdate:field": Ve,
          onSave: Ee
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : j("", !0)
      ], 64);
    };
  }
}), xa = { class: "w-crud-form-fields" }, Sa = {
  key: 0,
  class: "w-crud-form-switch"
}, Va = { class: "w-crud-form-switch-label" }, Ea = {
  key: 1,
  class: "w-crud-form-col-full"
}, Pa = { class: "w-crud-form-label" }, Ma = {
  key: 0,
  class: "w-crud-form-required"
}, Aa = { class: "w-crud-form-color-row" }, Fa = {
  key: 2,
  class: "w-crud-form-col-full"
}, Ta = { class: "w-crud-form-label" }, Ya = ["accept", "disabled", "onChange"], Ra = { class: "w-crud-form-label" }, Ia = {
  key: 0,
  class: "w-crud-form-required"
}, La = {
  key: 14,
  class: "w-crud-form-error"
}, Na = /* @__PURE__ */ de({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const o = e, r = a, i = ge({}), d = W(
      () => o.fields.filter((u) => u.visible === void 0 || u.visible === !0 ? !0 : typeof u.visible == "function" ? u.visible(o.formData, o.isEditing) : u.visible)
    );
    function g(u) {
      return o.disabled || u.disabledOnEdit && o.isEditing ? !0 : typeof u.disabled == "function" ? u.disabled(o.formData, o.isEditing) : !!u.disabled;
    }
    function p(u) {
      return Et(u) ? u.value : u;
    }
    const $ = W(() => {
      const u = o.isEditing ? "edit" : "create", D = o.fields.find(
        (m) => m.autofocus === !0 || m.autofocus === u
      );
      if (D) return D.field;
      const l = d.value.find((m) => !(m.type === "switch" || m.type === "fk" || m.type === "select" || m.type === "image" || m.disabled === !0 || m.disabledOnEdit && o.isEditing));
      return (l == null ? void 0 : l.field) ?? null;
    });
    function x(u) {
      return u.field === $.value;
    }
    function I(u) {
      if (u)
        return u.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function z(u) {
      if (!u) return "";
      const D = String(u).replace(/\D/g, "").slice(0, 14);
      return D.length <= 11 ? D.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : D.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function V(u, D) {
      const l = D.target.value.replace(/\D/g, "").slice(0, 14);
      r("update:field", u, l);
    }
    const L = ge({});
    function U(u) {
      const D = o.formData[u.field];
      if (D == null) return null;
      const l = u.optionValue || "value";
      return (p(u.options) || []).find(
        (A) => A[l] === D
      ) ?? null;
    }
    function n(u) {
      return L[u.field] || [];
    }
    function c(u, D) {
      const l = (D.query || "").toLowerCase(), m = p(u.options) || [], A = u.optionLabel || "label";
      L[u.field] = m.filter(
        (P) => String(P[A] || "").toLowerCase().includes(l)
      );
    }
    function S(u, D) {
      const l = u.optionValue || "value";
      r("update:field", u.field, D.value[l]);
    }
    function f(u) {
      const D = o.formData[u.field];
      return D ? String(D).replace("#", "") : "FFFFFF";
    }
    function y(u, D) {
      r("update:field", u.field, `#${D}`);
    }
    function T(u) {
      if (typeof u.validate == "function") {
        const D = u.validate(o.formData[u.field]);
        i[u.field] = D || null;
      }
    }
    function q() {
      const u = [];
      for (const D of o.fields)
        if (typeof D.validate == "function") {
          const l = D.validate(o.formData[D.field]);
          i[D.field] = l || null, l && u.push(l);
        }
      return u;
    }
    function Y() {
      Object.keys(i).forEach((u) => delete i[u]);
    }
    return t({ validateAll: q, clearErrors: Y }), (u, D) => (v(), E("div", xa, [
      (v(!0), E(pe, null, ve(d.value, (l) => X(u.$slots, `field-${l.field}`, {
        key: l.field,
        field: l,
        formData: e.formData,
        isEditing: e.isEditing,
        setFormField: (m, A) => r("update:field", m, A)
      }, () => [
        l.type === "switch" ? (v(), E("div", Sa, [
          K(k(Tt), {
            "model-value": e.formData[l.field],
            disabled: g(l),
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
          C("label", Va, B(l.switchLabel || l.label), 1)
        ])) : l.type === "color" ? (v(), E("div", Ea, [
          C("label", Pa, [
            Ke(B(l.label) + " ", 1),
            l.required ? (v(), E("span", Ma, "*")) : j("", !0)
          ]),
          C("div", Aa, [
            K(k(Yt), {
              "model-value": f(l),
              disabled: g(l),
              "onUpdate:modelValue": (m) => y(l, m)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
            K(k(be), {
              "model-value": e.formData[l.field],
              class: "w-28",
              maxlength: "7",
              placeholder: "#000000",
              disabled: g(l),
              "onUpdate:modelValue": (m) => r("update:field", l.field, m)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
          ])
        ])) : l.type === "image" ? (v(), E("div", Fa, [
          C("label", Ta, B(l.label), 1),
          X(u.$slots, `image-${l.field}`, {
            field: l,
            formData: e.formData
          }, () => [
            C("input", {
              type: "file",
              accept: l.accept || "image/*",
              disabled: g(l),
              onChange: (m) => {
                var P;
                const A = ((P = m.target.files) == null ? void 0 : P[0]) ?? null;
                r("update:field", l.field, A);
              }
            }, null, 40, Ya)
          ])
        ])) : (v(), E("div", {
          key: 3,
          class: Ne(l.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
        }, [
          C("label", Ra, [
            Ke(B(l.label) + " ", 1),
            l.required ? (v(), E("span", Ia, "*")) : j("", !0)
          ]),
          (!l.type || l.type === "text") && l.mask ? Te((v(), M(k(be), {
            key: 0,
            "model-value": e.formData[l.field],
            fluid: "",
            autofocus: x(l) || void 0,
            placeholder: l.placeholder,
            disabled: g(l),
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
            [k(ut), { mask: I(l.mask) }]
          ]) : !l.type || l.type === "text" ? (v(), M(k(be), {
            key: 1,
            "model-value": e.formData[l.field],
            fluid: "",
            autofocus: x(l) || void 0,
            placeholder: l.placeholder,
            disabled: g(l),
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "email" ? (v(), M(k(be), {
            key: 2,
            "model-value": e.formData[l.field],
            type: "email",
            fluid: "",
            autofocus: x(l) || void 0,
            placeholder: l.placeholder,
            disabled: g(l),
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "password" ? (v(), M(k(Rt), {
            key: 3,
            "model-value": e.formData[l.field],
            fluid: "",
            "toggle-mask": "",
            feedback: l.feedback !== !1,
            placeholder: l.placeholder,
            disabled: g(l),
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "number" ? (v(), M(k(at), {
            key: 4,
            "model-value": e.formData[l.field],
            fluid: "",
            locale: "pt-BR",
            min: l.min,
            max: l.max,
            "min-fraction-digits": l.minFractionDigits,
            "max-fraction-digits": l.maxFractionDigits,
            suffix: l.suffix,
            prefix: l.prefix,
            placeholder: l.placeholder,
            disabled: g(l),
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "currency" ? (v(), M(k(at), {
            key: 5,
            "model-value": e.formData[l.field],
            fluid: "",
            mode: "currency",
            currency: "BRL",
            locale: "pt-BR",
            min: l.min,
            max: l.max,
            placeholder: l.placeholder,
            disabled: g(l),
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "select" ? (v(), M(k(Ft), {
            key: 6,
            "model-value": e.formData[l.field],
            fluid: "",
            options: p(l.options),
            "option-label": l.optionLabel || "label",
            "option-value": l.optionValue || "value",
            "show-clear": l.showClear !== !1,
            placeholder: l.placeholder,
            disabled: g(l),
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "autocomplete" ? (v(), M(k(gt), {
            key: 7,
            "model-value": U(l),
            fluid: "",
            suggestions: n(l),
            "option-label": l.optionLabel || "label",
            placeholder: l.placeholder,
            disabled: g(l),
            onComplete: (m) => c(l, m),
            onItemSelect: (m) => S(l, m),
            onClear: (m) => r("update:field", l.field, null)
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : l.type === "fk" ? (v(), M(Vt, {
            key: 8,
            "model-value": e.formData[l.field],
            endpoint: l.endpoint,
            "option-label": l.optionLabel || "nome",
            placeholder: l.placeholder,
            disabled: g(l),
            "show-clear": l.showClear !== !1,
            "dialog-header": l.label,
            "crud-fields": l.crudFields,
            "crud-columns": l.crudColumns,
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "endpoint", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : l.type === "date" ? (v(), M(k(ot), {
            key: 9,
            "model-value": e.formData[l.field],
            fluid: "",
            "date-format": l.dateFormat || "dd/mm/yy",
            placeholder: l.placeholder,
            disabled: g(l),
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "datetime" ? (v(), M(k(ot), {
            key: 10,
            "model-value": e.formData[l.field],
            fluid: "",
            "show-time": "",
            "hour-format": l.hourFormat || "24",
            "date-format": l.dateFormat || "dd/mm/yy",
            placeholder: l.placeholder,
            disabled: g(l),
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "cpf_cnpj" ? (v(), M(k(be), {
            key: 11,
            "model-value": z(e.formData[l.field]),
            fluid: "",
            maxlength: "18",
            placeholder: l.placeholder || "000.000.000-00",
            disabled: g(l),
            invalid: !!i[l.field],
            onInput: (m) => V(l.field, m),
            onBlur: (m) => T(l)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : l.type === "mask" ? Te((v(), M(k(be), {
            key: 12,
            "model-value": e.formData[l.field],
            fluid: "",
            placeholder: l.placeholder,
            disabled: g(l),
            invalid: !!i[l.field],
            "onUpdate:modelValue": (m) => r("update:field", l.field, m),
            onBlur: (m) => T(l)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
            [k(ut), { mask: I(l.mask) }]
          ]) : l.type === "textarea" ? (v(), M(k(At), {
            key: 13,
            "model-value": e.formData[l.field],
            fluid: "",
            autofocus: x(l) || void 0,
            rows: l.rows || 3,
            placeholder: l.placeholder,
            disabled: g(l),
            "onUpdate:modelValue": (m) => r("update:field", l.field, m)
          }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : j("", !0),
          i[l.field] ? (v(), E("small", La, B(i[l.field]), 1)) : j("", !0)
        ], 2))
      ])), 128))
    ]));
  }
}), ja = { class: "w-crud-form-footer" }, et = /* @__PURE__ */ de({
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
    const a = e, o = t, r = R(null);
    function i() {
      r.value ? r.value.validateAll().length === 0 && o("save") : o("save");
    }
    return He(
      () => a.visible,
      (d) => {
        d && r.value && r.value.clearErrors();
      }
    ), (d, g) => (v(), M(k(vt), {
      visible: e.visible,
      header: e.title,
      style: Ie({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": g[2] || (g[2] = (p) => o("update:visible", p))
    }, {
      default: Q(() => [
        C("form", {
          class: "w-crud-form",
          onSubmit: Pt(i, ["prevent"])
        }, [
          K(Na, {
            ref_key: "rendererRef",
            ref: r,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            disabled: e.disabled,
            "onUpdate:field": g[0] || (g[0] = (p, $) => o("update:field", p, $))
          }, Ze({ _: 2 }, [
            ve(e.fields, (p) => ({
              name: `field-${p.field}`,
              fn: Q(($) => [
                X(d.$slots, `field-${p.field}`, Je(Xe($)))
              ])
            })),
            ve(e.fields.filter((p) => p.type === "image"), (p) => ({
              name: `image-${p.field}`,
              fn: Q(($) => [
                X(d.$slots, `image-${p.field}`, Je(Xe($)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing", "disabled"]),
          C("div", ja, [
            X(d.$slots, "footer", {
              saving: e.saving,
              disabled: e.disabled
            }, () => [
              K(k(oe), {
                type: "button",
                label: e.disabled ? "Fechar" : "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: g[1] || (g[1] = (p) => o("update:visible", !1))
              }, null, 8, ["label", "disabled"]),
              e.disabled ? j("", !0) : (v(), M(k(oe), {
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
}), za = { class: "w-crud" }, Ua = {
  key: 0,
  class: "w-crud-header"
}, Oa = { class: "w-crud-header-content" }, Wa = { class: "w-crud-title" }, Ba = {
  key: 0,
  class: "w-crud-subtitle"
}, qa = { class: "w-crud-header-actions" }, Ha = {
  key: 0,
  class: "w-crud-kpis"
}, Ka = { class: "w-crud-kpi-content" }, Za = { class: "w-crud-kpi-label" }, Ja = { class: "w-crud-kpi-value" }, Xa = { class: "w-crud-table" }, Qa = { class: "w-crud-toolbar" }, Ga = { class: "w-crud-toolbar-start" }, _a = { class: "w-crud-toolbar-end" }, eo = { class: "w-crud-actions" }, to = /* @__PURE__ */ de({
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
    const a = e, o = t, { formatNumber: r } = Ge(), i = R({}), d = W(
      () => a.crud.config.columns.filter((n) => n.visible !== !1).map((n) => n.type === "number" && !n.align ? { ...n, align: "right" } : n.type === "currency" && !n.align ? { ...n, align: "right" } : n)
    );
    function g(n) {
      if (n.align === "right") return "text-right";
      if (n.align === "center") return "text-center";
    }
    const p = W(() => {
      const n = [];
      return a.crud.config.canCreate !== !1 && a.crud.config.canEdit !== !1 && n.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canDelete !== !1 && n.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), n;
    }), $ = W(
      () => a.crud.config.rowActions ?? p.value
    ), x = W(() => $.value.length > 0);
    function I(n, c) {
      n.action === "edit" ? a.crud.openEditDialog(c) : n.action === "view" ? a.crud.openViewDialog(c) : n.action === "delete" ? a.crud.confirmDelete(c) : n.handler && n.handler(c);
    }
    function z(n, c) {
      return n.visible ? n.visible(c) : !0;
    }
    function V(n, c) {
      return n.disabled ? n.disabled(c) : !1;
    }
    const L = W(() => {
      const n = [];
      return a.showKpi && n.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: r(a.crud.pagination.rows, 0)
      }), n.push(...a.extraKpis), n;
    });
    W(() => a.crud.config.labels ?? {});
    const U = W(() => a.crud.config.canCreate !== !1);
    return Mt(() => {
      a.autoInit && a.crud.init();
    }), (n, c) => {
      const S = dt("tooltip");
      return v(), E("div", za, [
        e.showHeader ? (v(), E("div", Ua, [
          C("div", Oa, [
            C("h1", Wa, B(e.title), 1),
            e.subtitle ? (v(), E("p", Ba, B(e.subtitle), 1)) : j("", !0)
          ]),
          C("div", qa, [
            X(n.$slots, "header-actions"),
            U.value ? (v(), M(k(oe), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: c[0] || (c[0] = (f) => e.crud.openCreateDialog())
            })) : j("", !0)
          ])
        ])) : j("", !0),
        X(n.$slots, "before-table", {}, () => [
          L.value.length ? (v(), E("div", Ha, [
            (v(!0), E(pe, null, ve(L.value, (f, y) => (v(), E("div", {
              key: y,
              class: "w-crud-kpi"
            }, [
              C("div", {
                class: Ne(["w-crud-kpi-icon", f.severity ? `w-crud-kpi-icon--${f.severity}` : ""])
              }, [
                C("i", {
                  class: Ne([f.icon]),
                  style: Ie(f.color ? `color: ${f.color}` : "")
                }, null, 6)
              ], 2),
              C("div", Ka, [
                C("div", Za, B(f.label), 1),
                C("div", Ja, B(f.value), 1)
              ])
            ]))), 128))
          ])) : j("", !0)
        ]),
        C("div", Xa, [
          K(k(ct), {
            value: e.crud.items.value,
            loading: e.crud.loading.value,
            "expanded-rows": i.value,
            "onUpdate:expandedRows": c[2] || (c[2] = (f) => i.value = f),
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
            onSort: c[3] || (c[3] = (f) => e.crud.onSort({ sortField: f.sortField, sortOrder: f.sortOrder })),
            onRowExpand: c[4] || (c[4] = (f) => o("row-expand", f.data)),
            onRowCollapse: c[5] || (c[5] = (f) => o("row-collapse", f.data))
          }, Ze({
            header: Q(() => [
              C("div", Qa, [
                C("div", Ga, [
                  e.showSearch ? (v(), M(k(ft), { key: 0 }, {
                    default: Q(() => [
                      K(k(mt), { class: "pi pi-search" }),
                      K(k(be), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : j("", !0),
                  X(n.$slots, "toolbar-start"),
                  X(n.$slots, "toolbar-filters")
                ]),
                C("div", _a, [
                  X(n.$slots, "toolbar-actions"),
                  !e.showHeader && U.value ? (v(), M(k(oe), {
                    key: 0,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: c[1] || (c[1] = (f) => e.crud.openCreateDialog())
                  })) : j("", !0)
                ])
              ])
            ]),
            empty: Q(() => [
              X(n.$slots, "empty", {}, () => [
                c[9] || (c[9] = C("div", { class: "w-crud-empty" }, [
                  C("div", { class: "w-crud-empty-icon" }, [
                    C("i", { class: "pi pi-inbox" })
                  ]),
                  C("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                  C("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                ], -1))
              ])
            ]),
            default: Q(() => [
              e.expandable ? (v(), M(k(Ye), {
                key: 0,
                expander: "",
                style: { width: "3rem" }
              })) : j("", !0),
              (v(!0), E(pe, null, ve(d.value, (f) => (v(), M(k(Ye), {
                key: f.field,
                field: f.field,
                header: f.header,
                sortable: f.sortable,
                style: Ie(f.style),
                "header-class": g(f),
                "body-class": g(f)
              }, {
                body: Q(({ data: y }) => [
                  X(n.$slots, `column-${f.field}`, {
                    data: y,
                    value: y[f.field]
                  }, () => [
                    K(_e, {
                      column: f,
                      value: y[f.field],
                      "row-data": y
                    }, null, 8, ["column", "value", "row-data"])
                  ])
                ]),
                _: 2
              }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
              x.value ? (v(), M(k(Ye), {
                key: 1,
                "header-class": "w-crud-actions-header",
                style: Ie({ width: `${$.value.length * 2.5 + 1}rem` })
              }, {
                body: Q(({ data: f }) => [
                  X(n.$slots, "row-actions", {
                    data: f,
                    crud: e.crud
                  }, () => [
                    C("div", eo, [
                      (v(!0), E(pe, null, ve($.value, (y) => (v(), E(pe, {
                        key: y.action
                      }, [
                        z(y, f) ? Te((v(), M(k(oe), {
                          key: 0,
                          icon: y.icon,
                          text: "",
                          rounded: "",
                          size: "small",
                          severity: y.severity,
                          disabled: V(y, f),
                          onClick: (T) => I(y, f)
                        }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                          [
                            S,
                            y.tooltip,
                            void 0,
                            { top: !0 }
                          ]
                        ]) : j("", !0)
                      ], 64))), 128))
                    ])
                  ])
                ]),
                _: 3
              }, 8, ["style"])) : j("", !0)
            ]),
            _: 2
          }, [
            e.expandable ? {
              name: "expansion",
              fn: Q((f) => [
                X(n.$slots, "expansion", {
                  data: f.data
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "onPage"])
        ]),
        X(n.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => {
          var f;
          return [
            K(et, {
              visible: e.crud.dialogVisible.value,
              title: e.crud.dialogTitle.value,
              fields: e.crud.config.form,
              "form-data": e.crud.formData,
              "is-editing": e.crud.isEditing.value,
              saving: e.crud.saving.value,
              disabled: ((f = e.crud.viewMode) == null ? void 0 : f.value) ?? !1,
              width: e.dialogWidth,
              "onUpdate:visible": c[6] || (c[6] = (y) => {
                e.crud.dialogVisible.value = y, y || (e.crud.editingItem.value = null);
              }),
              "onUpdate:field": c[7] || (c[7] = (y, T) => e.crud.setFormField(y, T)),
              onSave: c[8] || (c[8] = (y) => e.crud.save())
            }, Ze({ _: 2 }, [
              ve(e.crud.config.form, (y) => ({
                name: `field-${y.field}`,
                fn: Q((T) => [
                  X(n.$slots, `field-${y.field}`, Je(Xe(T)))
                ])
              }))
            ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "disabled", "width"])
          ];
        })
      ]);
    };
  }
}), ao = /* @__PURE__ */ de({
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
    return (r, i) => (v(), M(k(pt), {
      value: o.value.label,
      severity: o.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), oo = { class: "w-page-header" }, lo = { class: "w-page-header-content" }, no = { class: "w-page-header-title" }, ro = {
  key: 0,
  class: "w-page-header-subtitle"
}, so = { class: "w-page-header-actions" }, Zo = /* @__PURE__ */ de({
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
    return (o, r) => (v(), E("div", oo, [
      C("div", lo, [
        C("h2", no, B(e.title), 1),
        e.subtitle ? (v(), E("p", ro, B(e.subtitle), 1)) : j("", !0)
      ]),
      C("div", so, [
        X(o.$slots, "actions"),
        e.actionLabel ? (v(), M(k(oe), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: r[0] || (r[0] = (i) => a("action"))
        }, null, 8, ["label", "icon"])) : j("", !0)
      ])
    ]));
  }
}), io = { class: "w-empty-state" }, uo = { class: "w-empty-state-icon" }, co = { class: "w-empty-state-title" }, fo = {
  key: 0,
  class: "w-empty-state-description"
}, Jo = /* @__PURE__ */ de({
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
    return (o, r) => (v(), E("div", io, [
      C("div", uo, [
        C("i", {
          class: Ne(e.icon)
        }, null, 2)
      ]),
      C("p", co, B(e.title), 1),
      e.description ? (v(), E("p", fo, B(e.description), 1)) : j("", !0),
      e.actionLabel ? (v(), M(k(oe), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: r[0] || (r[0] = (i) => a("action"))
      }, null, 8, ["label", "icon"])) : j("", !0)
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
const mo = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
function po() {
  return Me(mo);
}
const vo = { class: "w-detail-header" }, go = { class: "w-detail-header-left" }, ho = { class: "w-detail-header-content" }, yo = { class: "w-detail-header-title" }, bo = {
  key: 0,
  class: "w-detail-header-subtitle"
}, wo = { class: "w-detail-header-actions" }, Xo = /* @__PURE__ */ de({
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
    const t = e, a = po();
    function o() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (r, i) => (v(), E("div", vo, [
      C("div", go, [
        K(k(oe), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: o
        }),
        e.icon ? (v(), E("i", {
          key: 0,
          class: Ne([e.icon, "w-detail-header-icon"])
        }, null, 2)) : j("", !0),
        C("div", ho, [
          C("h2", yo, B(e.title), 1),
          e.subtitle ? (v(), E("p", bo, B(e.subtitle), 1)) : j("", !0)
        ]),
        e.status ? (v(), M(ao, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : j("", !0)
      ]),
      C("div", wo, [
        X(r.$slots, "actions")
      ])
    ]));
  }
}), ko = { class: "w-info-card" }, $o = {
  key: 0,
  class: "w-info-card-title"
}, Do = { class: "w-info-card-grid" }, Co = { class: "w-info-card-label" }, xo = { class: "w-info-card-value" }, Qo = /* @__PURE__ */ de({
  __name: "WInfoCard",
  props: {
    title: {},
    fields: {}
  },
  setup(e) {
    const { formatCurrency: t, formatDate: a, formatNumber: o } = Ge();
    function r(i) {
      const d = i.value;
      return d == null || d === "" ? "-" : i.format === "currency" ? t(Number(d)) : i.format === "date" ? a(String(d)) : i.format === "datetime" ? a(String(d), "DD/MM/YYYY HH:mm") : i.format === "number" ? o(Number(d)) : String(d);
    }
    return (i, d) => (v(), E("div", ko, [
      e.title ? (v(), E("h3", $o, B(e.title), 1)) : j("", !0),
      C("div", Do, [
        (v(!0), E(pe, null, ve(e.fields, (g) => (v(), E("div", {
          key: g.label,
          class: "w-info-card-field"
        }, [
          C("span", Co, B(g.label), 1),
          C("span", xo, B(r(g)), 1)
        ]))), 128))
      ])
    ]));
  }
}), Go = {
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
    e.provide(We, t.axios), e.provide(Be, a), t.registerComponents !== !1 && (e.component("WCrudView", to), e.component("WCrudFormDialog", et), e.component("WCrudColumnRenderer", _e), e.component("WAutoCompleteFK", Vt));
  }
}, So = {
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
function _o(e) {
  const {
    endpoint: t,
    columns: a,
    form: o,
    pk: r = "id",
    searchDebounce: i = 300,
    canCreate: d = !0,
    canEdit: g = !0,
    canDelete: p = !0,
    rowActions: $ = void 0,
    filterParams: x = void 0,
    createDefaults: I = void 0,
    transformPayload: z = void 0,
    onAfterSave: V = void 0,
    onAfterDelete: L = void 0
  } = e, U = Me(We);
  if (!U)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const n = U, c = Me(Be), S = e.pageSize ?? (c == null ? void 0 : c.defaultPageSize) ?? 20, f = { ...So, ...e.labels }, y = xt(), { confirmDelete: T } = St(), q = R([]), Y = R({}), u = R(!1), D = R(!1), l = R(""), m = R(!1), A = R(!1), P = R(null), H = ge({}), F = ge({
    page: 1,
    pageSize: S,
    rows: 0,
    totalPages: 0
  }), Z = ge({
    field: null,
    order: 0
  });
  function ce() {
    const s = {};
    for (const w of o)
      s[w.field] = w.defaultValue !== void 0 ? typeof w.defaultValue == "function" ? w.defaultValue() : w.defaultValue : null;
    return s;
  }
  const ae = ce();
  for (const s of Object.keys(ae))
    H[s] = ae[s];
  const ee = W(() => P.value !== null && !A.value), re = W(() => A.value), te = W(
    () => A.value ? f.viewTitle ?? "Visualizar Registro" : ee.value ? f.editTitle : f.createTitle
  ), ke = W(() => F.page <= 1), he = W(() => F.page >= F.totalPages);
  let $e = null;
  async function se(s = {}) {
    u.value = !0;
    try {
      const w = {
        page: F.page,
        page_size: F.pageSize,
        ...s
      };
      l.value && (w.search = l.value), Z.field && Z.order !== 0 && (w.ordering = Z.order === -1 ? `-${Z.field}` : Z.field), x && Object.assign(w, x());
      const G = (await n.get(t, { params: w })).data;
      Array.isArray(G.results) ? (q.value = G.results, F.rows = G.count ?? 0) : (q.value = G.data ?? [], F.rows = G.rows ?? 0), G.extras && (Y.value = G.extras), G.page && (F.page = G.page), G.page_size && (F.pageSize = G.page_size), F.totalPages = Math.ceil(F.rows / F.pageSize) || 0;
    } finally {
      u.value = !1;
    }
  }
  async function fe() {
    await se();
  }
  async function De() {
    await se();
  }
  function le(s) {
    l.value = s, $e && clearTimeout($e), $e = setTimeout(() => {
      F.page = 1, se();
    }, i);
  }
  function ne(s) {
    const w = s.target;
    le(w.value);
  }
  function ue(s) {
    F.page = s, se();
  }
  function Ce() {
    ue(1);
  }
  function xe() {
    ue(F.totalPages);
  }
  function Se(s) {
    F.page = s.page + 1, F.pageSize = s.rows, se();
  }
  function ye(s) {
    Z.field = s.sortField ?? null, Z.order = s.sortOrder ?? 0, F.page = 1, se();
  }
  function me() {
    const s = ce();
    for (const w of Object.keys(s))
      H[w] = s[w];
  }
  function Ve(s, w) {
    H[s] = w;
  }
  function Ee() {
    if (A.value = !1, P.value = null, me(), I) {
      const s = I();
      for (const [w, N] of Object.entries(s))
        H[w] = N;
    }
    m.value = !0;
  }
  function Pe(s) {
    A.value = !1, P.value = s;
    for (const w of o) {
      let N = s[w.field] !== void 0 ? s[w.field] : null;
      N && (w.type === "date" || w.type === "datetime") && typeof N == "string" && (N = Qe(N)), H[w.field] = N;
    }
    m.value = !0;
  }
  function h(s) {
    A.value = !0, P.value = s;
    for (const w of o) {
      let N = s[w.field] !== void 0 ? s[w.field] : null;
      N && (w.type === "date" || w.type === "datetime") && typeof N == "string" && (N = Qe(N)), H[w.field] = N;
    }
    m.value = !0;
  }
  async function b() {
    for (const s of o) {
      if (s.validate) {
        const w = s.validate(H[s.field]);
        if (w)
          return y.error(w), null;
      }
      if (s.required) {
        const w = H[s.field];
        if (w == null || w === "")
          return y.error(`${s.label} é obrigatório`), null;
      }
    }
    D.value = !0;
    try {
      let s = { ...H };
      !ee.value && I && Object.assign(s, I());
      for (const J of o) {
        const _ = s[J.field];
        if (J.type === "date" && _ instanceof Date ? s[J.field] = ht(_) : J.type === "datetime" && _ instanceof Date && (s[J.field] = yt(_)), J.type === "fk" && _ !== null && typeof _ == "object") {
          const ie = J.optionValue || "id";
          s[J.field] = _[ie] ?? _;
        }
        (J.type === "mask" || J.type === "cpf_cnpj") && typeof _ == "string" && (s[J.field] = we(_));
      }
      z && (s = z(s, ee.value));
      const w = o.some(
        (J) => J.type === "image" && s[J.field] instanceof File
      );
      let N = s, G;
      if (w) {
        const J = new Set(
          o.filter((ie) => ie.type === "image").map((ie) => ie.field)
        ), _ = new FormData();
        for (const [ie, Re] of Object.entries(s))
          if (Re != null)
            if (Re instanceof File)
              _.append(ie, Re);
            else {
              if (J.has(ie))
                continue;
              _.append(ie, String(Re));
            }
        N = _, G = { "Content-Type": "multipart/form-data" };
      }
      const tt = G ? { headers: G } : void 0;
      let Fe;
      if (ee.value && P.value) {
        const J = P.value[r];
        Fe = await n.patch(
          `${t}${J}/`,
          N,
          tt
        );
        const _ = q.value.findIndex(
          (ie) => ie[r] === J
        );
        _ !== -1 && (q.value[_] = Fe.data), y.success(f.successUpdate);
      } else
        Fe = await n.post(t, N, tt), q.value.unshift(Fe.data), F.rows++, y.success(f.successCreate);
      return m.value = !1, P.value = null, V && V(Fe.data, ee.value), Fe.data;
    } catch (s) {
      return y.error(je(s, "Erro ao salvar registro")), null;
    } finally {
      D.value = !1;
    }
  }
  function O(s) {
    T(async () => {
      try {
        const w = s[r];
        await n.delete(`${t}${w}/`);
        const N = q.value.findIndex(
          (G) => G[r] === w
        );
        N !== -1 && (q.value.splice(N, 1), F.rows--), y.success(f.successDelete), L && L(s);
      } catch (w) {
        y.error(je(w, "Erro ao excluir registro"));
      }
    }, f.deleteConfirmMessage);
  }
  return {
    items: q,
    extras: Y,
    loading: u,
    saving: D,
    search: l,
    dialogVisible: m,
    editingItem: P,
    formData: H,
    pagination: F,
    sort: Z,
    isEditing: ee,
    isViewing: re,
    viewMode: A,
    dialogTitle: te,
    isFirstPage: ke,
    isLastPage: he,
    init: fe,
    fetchItems: se,
    refresh: De,
    setSearch: le,
    onSearch: ne,
    onPage: Se,
    onSort: ye,
    openCreateDialog: Ee,
    openEditDialog: Pe,
    openViewDialog: h,
    save: b,
    confirmDelete: O,
    setFormField: Ve,
    resetForm: me,
    goToPage: ue,
    firstPage: Ce,
    lastPage: xe,
    config: e
  };
}
function el(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: o = !1 } = e, r = Me(We);
  if (!r)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const i = r, d = Me(Be), g = e.pageSize ?? (d == null ? void 0 : d.defaultPageSize) ?? 20, p = R([]), $ = R(!1), x = R(""), I = R({}), z = ge({}), V = ge({
    page: 1,
    pageSize: g,
    rows: 0,
    totalPages: 0
  }), L = ge({
    field: null,
    order: 0
  });
  let U = null;
  async function n(Y = {}) {
    $.value = !0;
    try {
      const u = {
        page: V.page,
        page_size: V.pageSize,
        ...Y
      };
      x.value && (u.search = x.value), L.field && L.order !== 0 && (u.ordering = L.order === -1 ? `-${L.field}` : L.field);
      for (const [A, P] of Object.entries(z))
        P != null && P !== "" && (u[A] = P);
      const m = (await i.get(t, {
        params: u
      })).data;
      Array.isArray(m.results) ? (p.value = m.results, V.rows = m.count ?? 0) : (p.value = m.data ?? [], V.rows = m.rows ?? 0), m.page && (V.page = m.page), m.page_size && (V.pageSize = m.page_size), V.totalPages = Math.ceil(V.rows / V.pageSize) || 0, I.value = m.extras ?? {};
    } finally {
      $.value = !1;
    }
  }
  async function c() {
    await n();
  }
  function S(Y) {
    x.value = Y, U && clearTimeout(U), U = setTimeout(() => {
      V.page = 1, n();
    }, a);
  }
  function f(Y, u) {
    z[Y] = u, V.page = 1, n();
  }
  function y() {
    for (const Y of Object.keys(z))
      delete z[Y];
    V.page = 1, n();
  }
  function T(Y) {
    V.page = Y.page + 1, V.pageSize = Y.rows, n();
  }
  function q(Y) {
    L.field = Y.sortField ?? null, L.order = Y.sortOrder ?? 0, V.page = 1, n();
  }
  return o && n(), {
    items: p,
    loading: $,
    search: x,
    pagination: V,
    sort: L,
    extras: I,
    fetchItems: n,
    refresh: c,
    setSearch: S,
    setFilter: f,
    clearFilters: y,
    onPage: T,
    onSort: q
  };
}
export {
  So as DEFAULT_CRUD_LABELS,
  Vt as WAutoCompleteFK,
  _e as WCrudColumnRenderer,
  et as WCrudFormDialog,
  to as WCrudView,
  Xo as WDetailHeader,
  Jo as WEmptyState,
  Na as WFormRenderer,
  Qo as WInfoCard,
  Zo as WPageHeader,
  Go as WPrimeVuePlugin,
  ao as WStatusTag,
  We as W_AXIOS_KEY,
  Be as W_CONFIG_KEY,
  je as extractApiError,
  va as mapApiFieldToColumnDef,
  fa as mapApiFieldToFieldDef,
  ga as mapApiFieldsToColumnDefs,
  ma as mapApiFieldsToFieldDefs,
  el as useApi,
  Ko as useApiError,
  St as useAppConfirm,
  xt as useAppToast,
  _o as useCrudManager,
  Ge as useFormatters
};
//# sourceMappingURL=index.js.map
