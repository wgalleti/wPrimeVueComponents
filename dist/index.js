import { inject as Ie, defineComponent as de, openBlock as s, createElementBlock as m, createBlock as A, unref as v, toDisplayString as T, ref as q, watch as nt, computed as H, reactive as ge, resolveDirective as kt, Fragment as le, createElementVNode as h, createVNode as O, withDirectives as fe, withCtx as ne, createCommentVNode as w, renderList as ie, normalizeStyle as je, createTextVNode as Pe, normalizeClass as re, renderSlot as Y, isRef as Ut, withModifiers as qt, createSlots as ot, normalizeProps as lt, guardReactiveProps as st, useSlots as Ht, onMounted as Kt, createStaticVNode as Gt } from "vue";
import $t from "primevue/datatable";
import ze from "primevue/column";
import ee from "primevue/button";
import me from "primevue/inputtext";
import qe from "primevue/iconfield";
import He from "primevue/inputicon";
import Jt from "primevue/paginator";
import Zt from "primevue/contextmenu";
import Ct from "primevue/tag";
import Te from "dayjs";
import Dt from "primevue/dialog";
import ct from "primevue/inputnumber";
import Xt from "primevue/textarea";
import Qt from "primevue/select";
import xt from "primevue/autocomplete";
import ft from "primevue/datepicker";
import _t from "primevue/toggleswitch";
import ea from "primevue/colorpicker";
import ta from "primevue/password";
import { useToast as aa } from "primevue/usetoast";
import { useConfirm as na } from "primevue/useconfirm";
import oa from "primevue/inputgroup";
import mt from "primevue/inputgroupaddon";
import Ge from "primevue/skeleton";
const la = Symbol("w-axios"), _e = Symbol("w-data-provider"), et = Symbol("w-config");
function sa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ze = { exports: {} }, ia = Ze.exports, pt;
function ra() {
  return pt || (pt = 1, (function(e, t) {
    (function(a, o) {
      e.exports = o();
    })(ia, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, o = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, l = /\d/, i = /\d\d/, r = /\d\d?/, y = /\d*[^-_:/,()\s\d]+/, c = {}, k = function(g) {
        return (g = +g) + (g > 68 ? 1900 : 2e3);
      }, F = function(g) {
        return function(b) {
          this[g] = +b;
        };
      }, V = [/[+-]\d\d:?(\d\d)?|Z/, function(g) {
        (this.zone || (this.zone = {})).offset = (function(b) {
          if (!b || b === "Z") return 0;
          var $ = b.match(/([+-]|\d\d)/g), x = 60 * $[1] + (+$[2] || 0);
          return x === 0 ? 0 : $[0] === "+" ? -x : x;
        })(g);
      }], W = function(g) {
        var b = c[g];
        return b && (b.indexOf ? b : b.s.concat(b.f));
      }, L = function(g, b) {
        var $, x = c.meridiem;
        if (x) {
          for (var j = 1; j <= 24; j += 1) if (g.indexOf(x(j, 0, b)) > -1) {
            $ = j > 12;
            break;
          }
        } else $ = g === (b ? "pm" : "PM");
        return $;
      }, J = { A: [y, function(g) {
        this.afternoon = L(g, !1);
      }], a: [y, function(g) {
        this.afternoon = L(g, !0);
      }], Q: [l, function(g) {
        this.month = 3 * (g - 1) + 1;
      }], S: [l, function(g) {
        this.milliseconds = 100 * +g;
      }], SS: [i, function(g) {
        this.milliseconds = 10 * +g;
      }], SSS: [/\d{3}/, function(g) {
        this.milliseconds = +g;
      }], s: [r, F("seconds")], ss: [r, F("seconds")], m: [r, F("minutes")], mm: [r, F("minutes")], H: [r, F("hours")], h: [r, F("hours")], HH: [r, F("hours")], hh: [r, F("hours")], D: [r, F("day")], DD: [i, F("day")], Do: [y, function(g) {
        var b = c.ordinal, $ = g.match(/\d+/);
        if (this.day = $[0], b) for (var x = 1; x <= 31; x += 1) b(x).replace(/\[|\]/g, "") === g && (this.day = x);
      }], w: [r, F("week")], ww: [i, F("week")], M: [r, F("month")], MM: [i, F("month")], MMM: [y, function(g) {
        var b = W("months"), $ = (W("monthsShort") || b.map((function(x) {
          return x.slice(0, 3);
        }))).indexOf(g) + 1;
        if ($ < 1) throw new Error();
        this.month = $ % 12 || $;
      }], MMMM: [y, function(g) {
        var b = W("months").indexOf(g) + 1;
        if (b < 1) throw new Error();
        this.month = b % 12 || b;
      }], Y: [/[+-]?\d+/, F("year")], YY: [i, function(g) {
        this.year = k(g);
      }], YYYY: [/\d{4}/, F("year")], Z: V, ZZ: V };
      function Z(g) {
        var b, $;
        b = g, $ = c && c.formats;
        for (var x = (g = b.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(oe, ae, _) {
          var f = _ && _.toUpperCase();
          return ae || $[_] || a[_] || $[f].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(P, u, n) {
            return u || n.slice(1);
          }));
        }))).match(o), j = x.length, U = 0; U < j; U += 1) {
          var N = x[U], K = J[N], B = K && K[0], X = K && K[1];
          x[U] = X ? { regex: B, parser: X } : N.replace(/^\[|\]$/g, "");
        }
        return function(oe) {
          for (var ae = {}, _ = 0, f = 0; _ < j; _ += 1) {
            var P = x[_];
            if (typeof P == "string") f += P.length;
            else {
              var u = P.regex, n = P.parser, p = oe.slice(f), d = u.exec(p)[0];
              n.call(ae, d), oe = oe.replace(d, "");
            }
          }
          return (function(E) {
            var R = E.afternoon;
            if (R !== void 0) {
              var G = E.hours;
              R ? G < 12 && (E.hours += 12) : G === 12 && (E.hours = 0), delete E.afternoon;
            }
          })(ae), ae;
        };
      }
      return function(g, b, $) {
        $.p.customParseFormat = !0, g && g.parseTwoDigitYear && (k = g.parseTwoDigitYear);
        var x = b.prototype, j = x.parse;
        x.parse = function(U) {
          var N = U.date, K = U.utc, B = U.args;
          this.$u = K;
          var X = B[1];
          if (typeof X == "string") {
            var oe = B[2] === !0, ae = B[3] === !0, _ = oe || ae, f = B[2];
            ae && (f = B[2]), c = this.$locale(), !oe && f && (c = $.Ls[f]), this.$d = (function(p, d, E, R) {
              try {
                if (["x", "X"].indexOf(d) > -1) return new Date((d === "X" ? 1e3 : 1) * p);
                var G = Z(d)(p), se = G.year, pe = G.month, Ne = G.day, Ye = G.hours, we = G.minutes, ke = G.seconds, ue = G.milliseconds, ve = G.zone, Ce = G.week, Ee = /* @__PURE__ */ new Date(), De = Ne || (se || pe ? 1 : Ee.getDate()), Me = se || Ee.getFullYear(), ye = 0;
                se && !pe || (ye = pe > 0 ? pe - 1 : Ee.getMonth());
                var xe, Fe = Ye || 0, Ae = we || 0, Re = ke || 0, C = ue || 0;
                return ve ? new Date(Date.UTC(Me, ye, De, Fe, Ae, Re, C + 60 * ve.offset * 1e3)) : E ? new Date(Date.UTC(Me, ye, De, Fe, Ae, Re, C)) : (xe = new Date(Me, ye, De, Fe, Ae, Re, C), Ce && (xe = R(xe).week(Ce).toDate()), xe);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(N, X, K, $), this.init(), f && f !== !0 && (this.$L = this.locale(f).$L), _ && N != this.format(X) && (this.$d = /* @__PURE__ */ new Date("")), c = {};
          } else if (X instanceof Array) for (var P = X.length, u = 1; u <= P; u += 1) {
            B[1] = X[u - 1];
            var n = $.apply(this, B);
            if (n.isValid()) {
              this.$d = n.$d, this.$L = n.$L, this.init();
              break;
            }
            u === P && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else j.call(this, U);
        };
      };
    }));
  })(Ze)), Ze.exports;
}
var ua = ra();
const da = /* @__PURE__ */ sa(ua);
Te.extend(da);
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
function ca(e, t = "DD/MM/YYYY") {
  return e ? Te(e).format(t) : "—";
}
function fa(e) {
  return e ? Te(e).format("DD/MM/YYYY HH:mm") : "—";
}
function Ve(e) {
  return e.replace(/\D/g, "");
}
function Vt(e) {
  if (!e) return "—";
  const t = Ve(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function Et(e) {
  if (!e) return "—";
  const t = Ve(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function ma(e) {
  if (!e) return "—";
  const t = Ve(e);
  return t.length === 11 ? Vt(e) : t.length === 14 ? Et(e) : e;
}
function pa(e) {
  if (!e) return "—";
  const t = Ve(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function Mt(e) {
  if (!e) return null;
  const t = Ve(e);
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
  const t = Ve(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let o = 0;
  for (let c = 0; c < 12; c++) o += parseInt(t[c]) * a[c];
  let l = o % 11;
  const i = l < 2 ? 0 : 11 - l;
  if (parseInt(t[12]) !== i) return "CNPJ inválido.";
  const r = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  o = 0;
  for (let c = 0; c < 13; c++) o += parseInt(t[c]) * r[c];
  l = o % 11;
  const y = l < 2 ? 0 : 11 - l;
  return parseInt(t[13]) !== y ? "CNPJ inválido." : null;
}
function va(e) {
  if (!e) return null;
  const t = Ve(e);
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
function ga(e, t) {
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
  function o(c) {
    return c == null ? "—" : ga(t, a).format(c);
  }
  function l(c, k = 2) {
    return c == null ? "—" : vt(t, k).format(c);
  }
  function i(c, k) {
    return ca(c, k ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function r(c) {
    return fa(c);
  }
  function y(c) {
    return c == null ? "—" : `${vt(t, 2).format(c)}%`;
  }
  return {
    formatCurrency: o,
    formatNumber: l,
    formatDate: i,
    formatDateTime: r,
    formatPercent: y,
    formatCpf: Vt,
    formatCnpj: Et,
    formatCpfCnpj: ma,
    formatTelefone: pa,
    validateCpf: Mt,
    validateCnpj: Ft,
    validateCpfCnpj: va,
    parseDate: it,
    toDateString: St,
    toDateTimeString: Pt
  };
}
const ha = {
  key: 0,
  class: "text-muted-color text-xs"
}, ya = ["src", "alt"], ba = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, wa = {
  key: 4,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, ka = {
  key: 5,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, $a = {
  key: 6,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, Ca = {
  key: 7,
  class: "text-[0.8125rem]"
}, Qe = /* @__PURE__ */ de({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: o, formatNumber: l } = rt();
    return (i, r) => e.value == null ? (s(), m("span", ha, "—")) : e.column.type === "image" ? (s(), m("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, ya)) : e.column.type === "boolean" ? (s(), A(v(Ct), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (s(), m("span", ba, T(v(t)(e.value)), 1)) : e.column.type === "datetime" ? (s(), m("span", wa, T(v(a)(e.value)), 1)) : e.column.type === "currency" ? (s(), m("span", ka, T(v(o)(e.value)), 1)) : e.column.type === "number" ? (s(), m("span", $a, T(e.column.format ? e.column.format(e.value, e.rowData) : v(l)(e.value, e.column.decimals ?? 0)), 1)) : (s(), m("span", Ca, T(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var Da = Object.defineProperty, xa = (e, t, a) => t in e ? Da(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, Ue = (e, t, a) => xa(e, typeof t != "symbol" ? t + "" : t, a);
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
}, Sa = (e, t = !0, a) => {
  var o, l, i, r;
  const y = ((o = a.number) == null ? void 0 : o.unsigned) !== !0 && e.startsWith("-") ? "-" : "", c = ((l = a.number) == null ? void 0 : l.fraction) ?? 0;
  let k = yt(0, c, a);
  const F = k.formatToParts(1000.12), V = ((i = F.find((g) => g.type === "group")) == null ? void 0 : i.value) ?? " ", W = ((r = F.find((g) => g.type === "decimal")) == null ? void 0 : r.value) ?? ".", L = ht(e, V, W);
  if (Number.isNaN(parseFloat(L))) return y;
  const J = L.split(".");
  if (J[1] != null && J[1].length >= 1) {
    const g = J[1].length <= c ? J[1].length : c;
    k = yt(g, c, a);
  }
  let Z = k.format(parseFloat(L));
  return t ? c > 0 && L.endsWith(".") && !L.slice(0, -1).includes(".") && (Z += W) : Z = ht(Z, V, W), y + Z;
}, At = (e) => JSON.parse(e.replaceAll("'", '"')), Pa = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = Va(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = Je(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = Je(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = Je(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = Ea(e.dataset.maskaTokens));
  const o = {};
  return e.dataset.maskaNumberLocale != null && (o.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (o.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (o.unsigned = Je(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(o).length > 0) && (a.number = o), a;
}, Je = (e) => e !== "" ? !!JSON.parse(e) : !0, Va = (e) => e.startsWith("[") && e.endsWith("]") ? At(e) : e, Ea = (e) => {
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
class Ma {
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
    if (this.opts.number != null) return Sa(t, o, this.opts);
    if (a == null) return t;
    const l = `v=${t},mr=${a},m=${o ? 1 : 0}`;
    if (this.memo.has(l)) return this.memo.get(l);
    const { mask: i, escaped: r } = this.escapeMask(a), y = [], c = this.opts.tokens != null ? this.opts.tokens : {}, k = this.isReversed() ? -1 : 1, F = this.isReversed() ? "unshift" : "push", V = this.isReversed() ? 0 : i.length - 1, W = this.isReversed() ? () => g > -1 && b > -1 : () => g < i.length && b < t.length, L = (x) => !this.isReversed() && x <= V || this.isReversed() && x >= V;
    let J, Z = -1, g = this.isReversed() ? i.length - 1 : 0, b = this.isReversed() ? t.length - 1 : 0, $ = !1;
    for (; W(); ) {
      const x = i.charAt(g), j = c[x], U = (j == null ? void 0 : j.transform) != null ? j.transform(t.charAt(b)) : t.charAt(b);
      if (!r.includes(g) && j != null ? (U.match(j.pattern) != null ? (y[F](U), j.repeated ? (Z === -1 ? Z = g : g === V && g !== Z && (g = Z - k), V === Z && (g -= k)) : j.multiple && ($ = !0, g -= k), g += k) : j.multiple ? $ && (g += k, b -= k, $ = !1) : U === J ? J = void 0 : j.optional && (g += k, b -= k), b += k) : (o && !this.isEager() && y[F](x), U === x && !this.isEager() ? b += k : J = x, this.isEager() || (g += k)), this.isEager())
        for (; L(g) && (c[i.charAt(g)] == null || r.includes(g)); ) {
          if (o) {
            if (y[F](i.charAt(g)), t.charAt(b) === i.charAt(g)) {
              g += k, b += k;
              continue;
            }
          } else i.charAt(g) === t.charAt(b) && (b += k);
          g += k;
        }
    }
    return this.memo.set(l, y.join("")), this.memo.get(l);
  }
}
class Fa {
  constructor(t, a = {}) {
    Ue(this, "items", /* @__PURE__ */ new Map()), Ue(this, "eventAbortController"), Ue(this, "onInput", (o) => {
      if (o instanceof CustomEvent && o.type === "input" && !o.isTrusted && !o.bubbles)
        return;
      const l = o.target, i = this.items.get(l);
      if (i === void 0) return;
      const r = "inputType" in o && o.inputType.startsWith("delete"), y = i.isEager(), c = r && y && i.unmasked(l.value) === "" ? "" : l.value;
      this.fixCursor(l, r, () => this.setValue(l, c));
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
      const l = new Ma(Pa(o, a));
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
    const c = t.value, k = y.slice(0, r), F = c.slice(0, r), V = (l = this.processInput(t, k)) == null ? void 0 : l.unmasked, W = (i = this.processInput(t, F)) == null ? void 0 : i.unmasked;
    if (V === void 0 || W === void 0) return;
    let L = r;
    k !== F && (L += a ? c.length - y.length : V.length - W.length), t.setSelectionRange(L, L);
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
const tt = /* @__PURE__ */ new WeakMap(), Aa = (e, t) => {
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
      Aa(t, y);
    };
    l.onMaska = l.onMaska == null ? i : Array.isArray(l.onMaska) ? [...l.onMaska, i] : [l.onMaska, i];
  }
  tt.has(o) ? (a = tt.get(o)) == null || a.update(l) : tt.set(o, new Fa(o, l));
}, Ra = {
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
function Ia(e) {
  var o;
  const t = Ra[e.type] ?? "text", a = {
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
function Ta(e) {
  return e.filter((t) => !t.read_only && t.name !== "id").map(Ia);
}
const La = {
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
  decimal: "number",
  float: "number",
  integer: "number"
};
function za(e) {
  return {
    field: e.type === "fk" ? `${e.name}_nome` : e.name,
    header: e.label,
    type: La[e.type],
    sortable: !0
  };
}
function Na(e, t = 6) {
  return e.filter((a) => !a.read_only && a.name !== "id").slice(0, t).map(za);
}
function It() {
  const e = aa();
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
  const e = na();
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
function Ya(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function Oa(e) {
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
      const i = Ya(o);
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
  return Oa(l) || t;
}
function Zl() {
  return { extractApiError: Ke };
}
const Ba = { class: "w-autocompletefk" }, Wa = ["disabled"], ja = { class: "w-autocompletefk-toolbar" }, Ua = { class: "w-autocompletefk-toolbar-actions" }, qa = { class: "flex items-center justify-end gap-1" }, Ha = { class: "w-autocompletefk-footer" }, Lt = /* @__PURE__ */ de({
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
    const i = l, r = It(), { confirmDelete: y } = Tt(), c = q(null), k = q([]), F = q(!1);
    let V = null;
    async function W(C) {
      try {
        const S = await i.get(a.endpoint, C);
        c.value = S.data;
      } catch {
        c.value = null;
      }
    }
    async function L(C) {
      F.value = !0;
      try {
        const S = {
          page_size: 20,
          ...a.endpointParams
        };
        C && (S.search = C);
        const te = await i.list(a.endpoint, S);
        k.value = te.data;
      } catch {
        k.value = [];
      } finally {
        F.value = !1;
      }
    }
    function J(C) {
      const S = C.query || "";
      if (S.length < a.minLength) {
        k.value = [];
        return;
      }
      V && clearTimeout(V), V = setTimeout(() => L(S), 300);
    }
    function Z(C) {
      c.value = C.value, o("update:modelValue", C.value);
    }
    function g() {
      c.value = null, o("update:modelValue", null);
    }
    nt(
      () => a.modelValue,
      async (C) => {
        if (C != null) {
          if (typeof C == "object" && C !== null && a.optionLabel in C) {
            c.value = C;
            return;
          }
          (!c.value || c.value[a.optionValue] !== C) && await W(C);
        } else
          c.value = null;
      },
      { immediate: !0 }
    );
    const b = q(!1), $ = q([]), x = q(!1), j = q(""), U = q(1), N = q(15), K = q(0), B = q(null), X = q(null), oe = q(0);
    let ae = null;
    const _ = q([]), f = H(() => {
      var C;
      return (C = a.crudFields) != null && C.length ? !0 : _.value.length > 0;
    }), P = H(() => a.canCreate ?? f.value), u = H(() => a.canEdit ?? f.value), n = H(() => a.canDelete ?? f.value), p = H(() => u.value || n.value), d = H(() => {
      var C;
      return (C = a.crudFields) != null && C.length ? a.crudFields : Ta(_.value);
    }), E = H(() => {
      var C, S;
      return (C = a.crudColumns) != null && C.length ? a.crudColumns : (S = a.columns) != null && S.length ? a.columns.map((te) => ({
        field: te.field,
        header: te.header,
        sortable: !0
      })) : _.value.length ? Na(_.value) : [
        { field: a.optionLabel, header: a.optionLabel, sortable: !0 }
      ];
    });
    async function R() {
      var C, S, te;
      x.value = !0;
      try {
        const z = {
          page: U.value,
          page_size: N.value,
          ...a.endpointParams
        };
        j.value && (z.search = j.value), X.value && oe.value !== 0 && (z.ordering = oe.value === -1 ? `-${X.value}` : X.value);
        const ce = await i.list(a.endpoint, z);
        $.value = ce.data, K.value = ce.rows, (C = ce.extras) != null && C.fields && !((S = a.columns) != null && S.length) && !((te = a.crudFields) != null && te.length) && (_.value = ce.extras.fields);
      } catch {
        $.value = [], K.value = 0;
      } finally {
        x.value = !1;
      }
    }
    function G() {
      a.disabled || (j.value = "", U.value = 1, X.value = null, oe.value = 0, B.value = null, b.value = !0, R());
    }
    function se(C) {
      U.value = C.page + 1, N.value = C.rows, R();
    }
    function pe(C) {
      X.value = C.sortField ?? null, oe.value = C.sortOrder ?? 0, U.value = 1, R();
    }
    function Ne() {
      B.value && (c.value = B.value, o("update:modelValue", B.value), b.value = !1);
    }
    function Ye(C) {
      c.value = C.data, o("update:modelValue", C.data), b.value = !1;
    }
    nt(j, () => {
      ae && clearTimeout(ae), ae = setTimeout(() => {
        U.value = 1, R();
      }, 300);
    });
    const we = q(!1), ke = q(!1), ue = q(null), ve = ge({}), Ce = H(() => ue.value !== null), Ee = H(
      () => Ce.value ? "Editar Registro" : "Novo Registro"
    );
    function De() {
      const C = {};
      for (const S of d.value)
        C[S.field] = S.defaultValue !== void 0 ? typeof S.defaultValue == "function" ? S.defaultValue() : S.defaultValue : null;
      return C;
    }
    function Me() {
      const C = De();
      for (const S of Object.keys(ve))
        delete ve[S];
      for (const [S, te] of Object.entries(C))
        ve[S] = te;
    }
    function ye() {
      ue.value = null, Me(), we.value = !0;
    }
    function xe(C) {
      ue.value = C;
      for (const S of d.value)
        ve[S.field] = C[S.field] !== void 0 ? C[S.field] : null;
      we.value = !0;
    }
    function Fe(C, S) {
      ve[C] = S;
    }
    async function Ae() {
      ke.value = !0;
      try {
        const C = { ...ve };
        for (const te of d.value) {
          const z = C[te.field];
          if (te.type === "fk" && z !== null && typeof z == "object") {
            const ce = te.optionValue || "id";
            C[te.field] = z[ce] ?? z;
          }
        }
        let S;
        if (Ce.value && ue.value) {
          const te = ue.value[a.optionValue];
          S = await i.update(
            a.endpoint,
            te,
            C
          );
          const z = $.value.findIndex((ce) => ce[a.optionValue] === te);
          z !== -1 && ($.value[z] = S.data), r.success("Registro atualizado com sucesso");
        } else
          S = await i.create(a.endpoint, C), $.value.unshift(S.data), K.value++, r.success("Registro criado com sucesso");
        we.value = !1, ue.value = null, B.value = S.data;
      } catch (C) {
        r.error(Ke(C, "Erro ao salvar registro"));
      } finally {
        ke.value = !1;
      }
    }
    function Re(C) {
      y(async () => {
        try {
          const S = C[a.optionValue];
          await i.delete(a.endpoint, S);
          const te = $.value.findIndex((z) => z[a.optionValue] === S);
          te !== -1 && ($.value.splice(te, 1), K.value--), c.value && c.value[a.optionValue] === S && (c.value = null, o("update:modelValue", null)), B.value && B.value[a.optionValue] === S && (B.value = null), r.success("Registro excluído com sucesso");
        } catch (S) {
          r.error(Ke(S, "Erro ao excluir registro"));
        }
      });
    }
    return (C, S) => {
      const te = kt("tooltip");
      return s(), m(le, null, [
        h("div", Ba, [
          O(v(xt), {
            "model-value": c.value,
            suggestions: k.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: F.value,
            fluid: "",
            onComplete: J,
            onItemSelect: Z,
            onClear: g
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          fe((s(), m("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: G
          }, [...S[6] || (S[6] = [
            h("i", { class: "pi pi-search" }, null, -1)
          ])], 8, Wa)), [
            [
              te,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        O(v(Dt), {
          visible: b.value,
          "onUpdate:visible": S[4] || (S[4] = (z) => b.value = z),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: ne(() => [
            h("div", Ha, [
              O(v(ee), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: S[3] || (S[3] = (z) => b.value = !1)
              }),
              O(v(ee), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !B.value,
                onClick: Ne
              }, null, 8, ["disabled"])
            ])
          ]),
          default: ne(() => [
            h("div", ja, [
              O(v(qe), { class: "w-autocompletefk-toolbar-search" }, {
                default: ne(() => [
                  O(v(He), { class: "pi pi-search" }),
                  O(v(me), {
                    modelValue: j.value,
                    "onUpdate:modelValue": S[0] || (S[0] = (z) => j.value = z),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              h("div", Ua, [
                P.value ? (s(), A(v(ee), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: ye
                })) : w("", !0)
              ])
            ]),
            O(v($t), {
              selection: B.value,
              "onUpdate:selection": S[1] || (S[1] = (z) => B.value = z),
              value: $.value,
              loading: x.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: N.value,
              "total-records": K.value,
              "sort-field": X.value ?? void 0,
              "sort-order": oe.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: se,
              onSort: S[2] || (S[2] = (z) => pe({ sortField: z.sortField, sortOrder: z.sortOrder })),
              onRowDblclick: Ye
            }, {
              empty: ne(() => [...S[7] || (S[7] = [
                h("div", { class: "w-autocompletefk-empty" }, "Nenhum registro encontrado", -1)
              ])]),
              default: ne(() => [
                O(v(ze), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (s(!0), m(le, null, ie(E.value, (z) => (s(), A(v(ze), {
                  key: z.field,
                  field: z.field,
                  header: z.header,
                  sortable: z.sortable ?? !0,
                  style: je(z.style)
                }, {
                  body: ne(({ data: ce }) => [
                    z.type ? (s(), A(Qe, {
                      key: 0,
                      column: z,
                      value: ce[z.field],
                      "row-data": ce
                    }, null, 8, ["column", "value", "row-data"])) : (s(), m(le, { key: 1 }, [
                      Pe(T(ce[z.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                p.value ? (s(), A(v(ze), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: ne(({ data: z }) => [
                    h("div", qa, [
                      u.value ? fe((s(), A(v(ee), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (ce) => xe(z)
                      }, null, 8, ["onClick"])), [
                        [
                          te,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : w("", !0),
                      n.value ? fe((s(), A(v(ee), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (ce) => Re(z)
                      }, null, 8, ["onClick"])), [
                        [
                          te,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : w("", !0)
                    ])
                  ]),
                  _: 1
                })) : w("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        f.value ? (s(), A(ut, {
          key: 0,
          visible: we.value,
          title: Ee.value,
          fields: d.value,
          "form-data": ve,
          "is-editing": Ce.value,
          saving: ke.value,
          width: e.dialogWidth,
          "onUpdate:visible": S[5] || (S[5] = (z) => {
            we.value = z, z || (ue.value = null);
          }),
          "onUpdate:field": Fe,
          onSave: Ae
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : w("", !0)
      ], 64);
    };
  }
}), zt = /* @__PURE__ */ de({
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
      const c = a.modelValue;
      return c == null || Number.isNaN(c) ? "" : new Intl.NumberFormat(a.locale, {
        minimumFractionDigits: a.decimals,
        maximumFractionDigits: a.decimals
      }).format(c);
    });
    function y(c) {
      const k = c.target.value.replace(/\D/g, "");
      if (!k) {
        o("update:modelValue", null);
        return;
      }
      const F = Number(k) / Math.pow(10, a.decimals);
      o("update:modelValue", F);
    }
    return (c, k) => i.value ? (s(), A(v(oa), {
      key: 0,
      class: "w-money-input"
    }, {
      default: ne(() => [
        l.value ? (s(), A(v(mt), { key: 0 }, {
          default: ne(() => [
            Pe(T(l.value), 1)
          ]),
          _: 1
        })) : w("", !0),
        O(v(me), {
          "model-value": r.value,
          inputmode: "numeric",
          class: "w-money-input__field",
          placeholder: e.placeholder,
          disabled: e.disabled,
          invalid: e.invalid,
          onInput: y
        }, null, 8, ["model-value", "placeholder", "disabled", "invalid"]),
        e.suffix ? (s(), A(v(mt), { key: 1 }, {
          default: ne(() => [
            Pe(T(e.suffix), 1)
          ]),
          _: 1
        })) : w("", !0)
      ]),
      _: 1
    })) : (s(), A(v(me), {
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
}), Ka = { class: "w-transfer__pane" }, Ga = { class: "w-transfer__head" }, Ja = { class: "w-transfer__count" }, Za = { class: "w-transfer__list" }, Xa = ["onClick"], Qa = {
  key: 0,
  class: "w-transfer__empty"
}, _a = { class: "w-transfer__controls" }, en = { class: "w-transfer__pane" }, tn = { class: "w-transfer__head" }, an = { class: "w-transfer__count" }, nn = { class: "w-transfer__list" }, on = ["onClick"], ln = {
  key: 0,
  class: "w-transfer__empty"
}, Nt = /* @__PURE__ */ de({
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
    function c(b) {
      return b[a.trackBy];
    }
    function k(b) {
      return String(b[a.optionLabel] ?? "");
    }
    function F(b, $) {
      if (!$) return !0;
      const x = $.toLowerCase();
      return y.value.some(
        (j) => String(b[j] ?? "").toLowerCase().includes(x)
      );
    }
    const V = H(
      () => a.source.filter(
        (b) => !r.value.has(c(b)) && F(b, l.value)
      )
    ), W = H(
      () => a.source.filter(
        (b) => r.value.has(c(b)) && F(b, i.value)
      )
    );
    function L(b) {
      a.disabled || o("update:selected", [...a.selected, c(b)]);
    }
    function J(b) {
      if (a.disabled) return;
      const $ = c(b);
      o("update:selected", a.selected.filter((x) => x !== $));
    }
    function Z() {
      a.disabled || o("update:selected", a.source.map(c));
    }
    function g() {
      a.disabled || o("update:selected", []);
    }
    return (b, $) => (s(), m("div", {
      class: re(["w-transfer", { "w-transfer--disabled": e.disabled }])
    }, [
      h("div", Ka, [
        h("div", Ga, [
          $[2] || ($[2] = h("span", { class: "w-transfer__title" }, "Disponíveis", -1)),
          h("span", Ja, T(V.value.length), 1)
        ]),
        O(v(qe), { class: "w-transfer__search" }, {
          default: ne(() => [
            O(v(He), { class: "pi pi-search" }),
            O(v(me), {
              modelValue: l.value,
              "onUpdate:modelValue": $[0] || ($[0] = (x) => l.value = x),
              placeholder: "Buscar...",
              fluid: ""
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        h("ul", Za, [
          (s(!0), m(le, null, ie(V.value, (x) => (s(), m("li", {
            key: `a-${c(x)}`,
            class: "w-transfer__item",
            onClick: (j) => L(x)
          }, [
            h("span", null, T(k(x)), 1),
            $[3] || ($[3] = h("i", { class: "pi pi-angle-right" }, null, -1))
          ], 8, Xa))), 128)),
          V.value.length ? w("", !0) : (s(), m("li", Qa, "Nenhum item"))
        ])
      ]),
      h("div", _a, [
        O(v(ee), {
          type: "button",
          icon: "pi pi-angle-double-right",
          text: "",
          rounded: "",
          disabled: e.disabled || !V.value.length,
          onClick: Z
        }, null, 8, ["disabled"]),
        O(v(ee), {
          type: "button",
          icon: "pi pi-angle-double-left",
          text: "",
          rounded: "",
          disabled: e.disabled || !e.selected.length,
          onClick: g
        }, null, 8, ["disabled"])
      ]),
      h("div", en, [
        h("div", tn, [
          $[4] || ($[4] = h("span", { class: "w-transfer__title" }, "Selecionados", -1)),
          h("span", an, T(W.value.length), 1)
        ]),
        O(v(qe), { class: "w-transfer__search" }, {
          default: ne(() => [
            O(v(He), { class: "pi pi-search" }),
            O(v(me), {
              modelValue: i.value,
              "onUpdate:modelValue": $[1] || ($[1] = (x) => i.value = x),
              placeholder: "Buscar...",
              fluid: ""
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        h("ul", nn, [
          (s(!0), m(le, null, ie(W.value, (x) => (s(), m("li", {
            key: `s-${c(x)}`,
            class: "w-transfer__item",
            onClick: (j) => J(x)
          }, [
            $[5] || ($[5] = h("i", { class: "pi pi-angle-left" }, null, -1)),
            h("span", null, T(k(x)), 1)
          ], 8, on))), 128)),
          W.value.length ? w("", !0) : (s(), m("li", ln, "Nenhum item"))
        ])
      ])
    ], 2));
  }
});
async function sn(e) {
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
const rn = { class: "w-crud-form" }, un = {
  key: 0,
  class: "w-crud-form-group-header"
}, dn = { class: "w-crud-form-group-title" }, cn = {
  key: 0,
  class: "w-crud-form-group-desc"
}, fn = { class: "w-crud-form-fields" }, mn = {
  key: 0,
  class: "w-crud-form-switch"
}, pn = { class: "w-crud-form-switch-label" }, vn = {
  key: 1,
  class: "w-crud-form-col-full"
}, gn = { class: "w-crud-form-label" }, hn = {
  key: 0,
  class: "w-crud-form-required"
}, yn = { class: "w-crud-form-color-row" }, bn = {
  key: 2,
  class: "w-crud-form-col-full"
}, wn = { class: "w-crud-form-label" }, kn = ["accept", "disabled", "onChange"], $n = {
  key: 3,
  class: "w-crud-form-col-full"
}, Cn = { class: "w-crud-form-label" }, Dn = {
  key: 0,
  class: "w-crud-form-required"
}, xn = { class: "w-crud-form-label" }, Sn = {
  key: 0,
  class: "w-crud-form-required"
}, Pn = {
  key: 1,
  class: "pi pi-spin pi-spinner w-crud-form-cep-spinner"
}, Vn = {
  key: 16,
  class: "w-crud-form-cep-error"
}, En = {
  key: 17,
  class: "w-crud-form-error"
}, Mn = /* @__PURE__ */ de({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const o = e, l = a, i = ge({}), r = ge({}), y = ge({}), c = ge({});
    function k(f, P) {
      const u = P.target.value, n = u.replace(/\D/g, "");
      l("update:field", f.field, u), y[f.field] = null, c[f.field] && (clearTimeout(c[f.field]), c[f.field] = null), n.length === 8 && (c[f.field] = setTimeout(async () => {
        r[f.field] = !0, y[f.field] = null;
        try {
          const p = await sn(n);
          if (!p)
            y[f.field] = "CEP não encontrado. Preencha os campos manualmente.";
          else {
            const d = f.cepFields || {}, E = Object.keys(d);
            for (const R of E) {
              const G = d[R];
              if (!G) continue;
              const se = o.formData[G];
              (se == null || se === "") && l("update:field", G, p[R] ?? "");
            }
          }
        } finally {
          r[f.field] = !1;
        }
      }, 400));
    }
    const F = H(
      () => o.fields.filter((f) => f.visible === void 0 || f.visible === !0 ? !0 : typeof f.visible == "function" ? f.visible(o.formData, o.isEditing) : f.visible)
    );
    function V(f) {
      return o.disabled || f.disabledOnEdit && o.isEditing ? !0 : typeof f.disabled == "function" ? f.disabled(o.formData, o.isEditing) : !!f.disabled;
    }
    function W(f) {
      return Ut(f) ? f.value : f;
    }
    const L = H(() => {
      const f = o.isEditing ? "edit" : "create", P = o.fields.find(
        (n) => n.autofocus === !0 || n.autofocus === f
      );
      if (P) return P.field;
      const u = F.value.find((n) => !(n.type === "switch" || n.type === "fk" || n.type === "select" || n.type === "image" || n.disabled === !0 || n.disabledOnEdit && o.isEditing));
      return (u == null ? void 0 : u.field) ?? null;
    });
    function J(f) {
      return f.field === L.value;
    }
    function Z(f) {
      if (f)
        return f.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function g(f) {
      if (!f) return "";
      const P = String(f).replace(/\D/g, "").slice(0, 14);
      return P.length <= 11 ? P.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : P.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function b(f, P) {
      const u = P.target.value.replace(/\D/g, "").slice(0, 14);
      l("update:field", f, u);
    }
    const $ = ge({});
    function x(f) {
      const P = o.formData[f.field];
      if (P == null) return null;
      const u = f.optionValue || "value";
      return (W(f.options) || []).find(
        (p) => p[u] === P
      ) ?? null;
    }
    function j(f) {
      return $[f.field] || [];
    }
    function U(f, P) {
      const u = (P.query || "").toLowerCase(), n = W(f.options) || [], p = f.optionLabel || "label";
      $[f.field] = n.filter(
        (d) => String(d[p] || "").toLowerCase().includes(u)
      );
    }
    function N(f, P) {
      const u = f.optionValue || "value";
      l("update:field", f.field, P.value[u]);
    }
    function K(f) {
      const P = o.formData[f.field];
      return P ? String(P).replace("#", "") : "FFFFFF";
    }
    function B(f, P) {
      l("update:field", f.field, `#${P}`);
    }
    function X(f) {
      if (typeof f.validate == "function") {
        const P = f.validate(o.formData[f.field]);
        i[f.field] = P || null;
      }
    }
    function oe() {
      const f = [];
      for (const P of o.fields)
        if (typeof P.validate == "function") {
          const u = P.validate(o.formData[P.field]);
          i[P.field] = u || null, u && f.push(u);
        }
      return f;
    }
    function ae() {
      Object.keys(i).forEach((f) => delete i[f]);
    }
    const _ = H(() => {
      var n, p, d, E;
      const f = /* @__PURE__ */ new Map(), P = [], u = /* @__PURE__ */ new Map();
      for (const R of F.value) {
        const G = ((n = R.fieldGroup) == null ? void 0 : n.id) ?? "__default__";
        f.has(G) || (f.set(G, {
          id: G,
          title: (p = R.fieldGroup) == null ? void 0 : p.title,
          description: (d = R.fieldGroup) == null ? void 0 : d.description,
          fields: []
        }), P.push(G), ((E = R.fieldGroup) == null ? void 0 : E.order) != null && u.set(G, R.fieldGroup.order)), f.get(G).fields.push(R);
      }
      return P.slice().sort((R, G) => {
        const se = u.get(R), pe = u.get(G);
        return se != null && pe != null ? se - pe : se != null ? -1 : pe != null ? 1 : P.indexOf(R) - P.indexOf(G);
      }).map((R) => f.get(R));
    });
    return t({ validateAll: oe, clearErrors: ae }), (f, P) => (s(), m("div", rn, [
      (s(!0), m(le, null, ie(_.value, (u) => (s(), m("div", {
        key: u.id,
        class: "w-crud-form-group"
      }, [
        u.title ? (s(), m("div", un, [
          h("h3", dn, T(u.title), 1),
          u.description ? (s(), m("p", cn, T(u.description), 1)) : w("", !0)
        ])) : w("", !0),
        h("div", fn, [
          (s(!0), m(le, null, ie(u.fields, (n) => Y(f.$slots, `field-${n.field}`, {
            key: n.field,
            field: n,
            formData: e.formData,
            isEditing: e.isEditing,
            setFormField: (p, d) => l("update:field", p, d)
          }, () => [
            n.type === "switch" ? (s(), m("div", mn, [
              O(v(_t), {
                "model-value": e.formData[n.field],
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
              h("label", pn, T(n.switchLabel || n.label), 1)
            ])) : n.type === "color" ? (s(), m("div", vn, [
              h("label", gn, [
                Pe(T(n.label) + " ", 1),
                n.required ? (s(), m("span", hn, "*")) : w("", !0)
              ]),
              h("div", yn, [
                O(v(ea), {
                  "model-value": K(n),
                  disabled: V(n),
                  "onUpdate:modelValue": (p) => B(n, p)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                O(v(me), {
                  "model-value": e.formData[n.field],
                  class: "w-28",
                  maxlength: "7",
                  placeholder: "#000000",
                  disabled: V(n),
                  "onUpdate:modelValue": (p) => l("update:field", n.field, p)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
              ])
            ])) : n.type === "image" ? (s(), m("div", bn, [
              h("label", wn, T(n.label), 1),
              Y(f.$slots, `image-${n.field}`, {
                field: n,
                formData: e.formData
              }, () => [
                h("input", {
                  type: "file",
                  accept: n.accept || "image/*",
                  disabled: V(n),
                  onChange: (p) => {
                    var E;
                    const d = ((E = p.target.files) == null ? void 0 : E[0]) ?? null;
                    l("update:field", n.field, d);
                  }
                }, null, 40, kn)
              ])
            ])) : n.type === "transfer" ? (s(), m("div", $n, [
              h("label", Cn, [
                Pe(T(n.label) + " ", 1),
                n.required ? (s(), m("span", Dn, "*")) : w("", !0)
              ]),
              O(Nt, {
                source: W(n.options) || [],
                selected: e.formData[n.field] || [],
                "track-by": n.optionValue || "id",
                "option-label": n.optionLabel || "nome",
                "search-fields": n.searchFields,
                disabled: V(n),
                "onUpdate:selected": (p) => l("update:field", n.field, p)
              }, null, 8, ["source", "selected", "track-by", "option-label", "search-fields", "disabled", "onUpdate:selected"])
            ])) : (s(), m("div", {
              key: 4,
              class: re(n.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
            }, [
              h("label", xn, [
                Pe(T(n.label) + " ", 1),
                n.required ? (s(), m("span", Sn, "*")) : w("", !0),
                r[n.field] ? (s(), m("i", Pn)) : w("", !0)
              ]),
              (!n.type || n.type === "text") && n.mask ? fe((s(), A(v(me), {
                key: 0,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: J(n) || void 0,
                placeholder: n.placeholder,
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
                [v(at), { mask: Z(n.mask) }]
              ]) : !n.type || n.type === "text" ? (s(), A(v(me), {
                key: 1,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: J(n) || void 0,
                placeholder: n.placeholder,
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "email" ? (s(), A(v(me), {
                key: 2,
                "model-value": e.formData[n.field],
                type: "email",
                fluid: "",
                autofocus: J(n) || void 0,
                placeholder: n.placeholder,
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "password" ? (s(), A(v(ta), {
                key: 3,
                "model-value": e.formData[n.field],
                fluid: "",
                "toggle-mask": "",
                feedback: n.feedback !== !1,
                placeholder: n.placeholder,
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "number" ? (s(), A(v(ct), {
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
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "currency" && n.fillFromRight ? (s(), A(zt, {
                key: 5,
                "model-value": e.formData[n.field],
                decimals: n.decimals ?? 2,
                currency: "",
                prefix: n.prefix,
                suffix: n.suffix,
                placeholder: n.placeholder,
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "decimals", "prefix", "suffix", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "currency" ? (s(), A(v(ct), {
                key: 6,
                "model-value": e.formData[n.field],
                fluid: "",
                mode: "currency",
                currency: "BRL",
                locale: "pt-BR",
                min: n.min,
                max: n.max,
                placeholder: n.placeholder,
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "select" ? (s(), A(v(Qt), {
                key: 7,
                "model-value": e.formData[n.field],
                fluid: "",
                options: W(n.options),
                "option-label": n.optionLabel || "label",
                "option-value": n.optionValue || "value",
                "show-clear": n.showClear !== !1,
                placeholder: n.placeholder,
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "autocomplete" ? (s(), A(v(xt), {
                key: 8,
                "model-value": x(n),
                fluid: "",
                suggestions: j(n),
                "option-label": n.optionLabel || "label",
                placeholder: n.placeholder,
                disabled: V(n),
                onComplete: (p) => U(n, p),
                onItemSelect: (p) => N(n, p),
                onClear: (p) => l("update:field", n.field, null)
              }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : n.type === "fk" ? (s(), A(Lt, {
                key: 9,
                "model-value": e.formData[n.field],
                endpoint: n.endpoint,
                "endpoint-params": n.endpointParams,
                "option-label": n.optionLabel || "nome",
                placeholder: n.placeholder,
                disabled: V(n),
                "show-clear": n.showClear !== !1,
                "dialog-header": n.label,
                "crud-fields": n.crudFields,
                "crud-columns": n.crudColumns,
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "endpoint", "endpoint-params", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : n.type === "date" ? (s(), A(v(ft), {
                key: 10,
                "model-value": e.formData[n.field],
                fluid: "",
                "date-format": n.dateFormat || "dd/mm/yy",
                placeholder: n.placeholder,
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "datetime" ? (s(), A(v(ft), {
                key: 11,
                "model-value": e.formData[n.field],
                fluid: "",
                "show-time": "",
                "hour-format": n.hourFormat || "24",
                "date-format": n.dateFormat || "dd/mm/yy",
                placeholder: n.placeholder,
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "cpf_cnpj" ? (s(), A(v(me), {
                key: 12,
                "model-value": g(e.formData[n.field]),
                fluid: "",
                maxlength: "18",
                placeholder: n.placeholder || "000.000.000-00",
                disabled: V(n),
                invalid: !!i[n.field],
                onInput: (p) => b(n.field, p),
                onBlur: (p) => X(n)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : n.type === "mask" ? fe((s(), A(v(me), {
                key: 13,
                "model-value": e.formData[n.field],
                fluid: "",
                placeholder: n.placeholder,
                disabled: V(n),
                invalid: !!i[n.field],
                "onUpdate:modelValue": (p) => l("update:field", n.field, p),
                onBlur: (p) => X(n)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
                [v(at), { mask: Z(n.mask) }]
              ]) : n.type === "cep" ? fe((s(), A(v(me), {
                key: 14,
                "model-value": e.formData[n.field],
                fluid: "",
                placeholder: n.placeholder || "00000-000",
                disabled: V(n),
                invalid: !!y[n.field],
                onInput: (p) => k(n, p)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput"])), [
                [v(at), { mask: "#####-###" }]
              ]) : n.type === "textarea" ? (s(), A(v(Xt), {
                key: 15,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: J(n) || void 0,
                rows: n.rows || 3,
                placeholder: n.placeholder,
                disabled: V(n),
                "onUpdate:modelValue": (p) => l("update:field", n.field, p)
              }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : w("", !0),
              y[n.field] ? (s(), m("small", Vn, T(y[n.field]), 1)) : i[n.field] ? (s(), m("small", En, T(i[n.field]), 1)) : w("", !0)
            ], 2))
          ])), 128))
        ])
      ]))), 128))
    ]));
  }
}), Fn = { class: "w-crud-form-footer" }, ut = /* @__PURE__ */ de({
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
    ), (r, y) => (s(), A(v(Dt), {
      visible: e.visible,
      header: e.title,
      style: je({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": y[2] || (y[2] = (c) => o("update:visible", c))
    }, {
      default: ne(() => [
        h("form", {
          class: "w-crud-form",
          onSubmit: qt(i, ["prevent"])
        }, [
          O(Mn, {
            ref_key: "rendererRef",
            ref: l,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            disabled: e.disabled,
            "onUpdate:field": y[0] || (y[0] = (c, k) => o("update:field", c, k))
          }, ot({ _: 2 }, [
            ie(e.fields, (c) => ({
              name: `field-${c.field}`,
              fn: ne((k) => [
                Y(r.$slots, `field-${c.field}`, lt(st(k)))
              ])
            })),
            ie(e.fields.filter((c) => c.type === "image"), (c) => ({
              name: `image-${c.field}`,
              fn: ne((k) => [
                Y(r.$slots, `image-${c.field}`, lt(st(k)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing", "disabled"]),
          h("div", Fn, [
            Y(r.$slots, "footer", {
              saving: e.saving,
              disabled: e.disabled
            }, () => [
              O(v(ee), {
                type: "button",
                label: e.disabled ? "Fechar" : "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: y[1] || (y[1] = (c) => o("update:visible", !1))
              }, null, 8, ["label", "disabled"]),
              e.disabled ? w("", !0) : (s(), A(v(ee), {
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
function An(e, t) {
  const a = t[e.field];
  return e.format ? e.format(a, t) : a == null ? "" : typeof a == "boolean" ? a ? "Sim" : "Não" : String(a);
}
function bt(e, t) {
  return e.includes('"') || e.includes(t) || e.includes(`
`) || e.includes("\r") ? `"${e.replace(/"/g, '""')}"` : e;
}
function Rn(e, t, a = {}) {
  const o = a.separator ?? ";", l = t.map((r) => bt(r.header, o)).join(o), i = e.map(
    (r) => t.map((y) => bt(An(y, r), o)).join(o)
  );
  return "\uFEFF" + [l, ...i].join(`\r
`);
}
function In(e, t = "export.csv") {
  const a = new Blob([e], { type: "text/csv;charset=utf-8;" }), o = URL.createObjectURL(a), l = document.createElement("a");
  l.href = o, l.download = t, document.body.appendChild(l), l.click(), document.body.removeChild(l), URL.revokeObjectURL(o);
}
const Tn = { class: "w-crud" }, Ln = {
  key: 0,
  class: "w-crud-header"
}, zn = { class: "w-crud-header-content" }, Nn = { class: "w-crud-title" }, Yn = {
  key: 0,
  class: "w-crud-subtitle"
}, On = { class: "w-crud-header-actions" }, Bn = {
  key: 0,
  class: "w-crud-kpis"
}, Wn = { class: "w-crud-kpi-content" }, jn = { class: "w-crud-kpi-label" }, Un = { class: "w-crud-kpi-value" }, qn = { class: "w-crud-content-main" }, Hn = {
  key: 0,
  class: "w-crud-table"
}, Kn = { class: "w-crud-toolbar" }, Gn = { class: "w-crud-toolbar-start" }, Jn = { class: "w-crud-toolbar-end" }, Zn = {
  key: 1,
  class: "w-crud-view-toggle"
}, Xn = { class: "w-crud-actions" }, Qn = {
  key: 1,
  class: "w-crud-cards-wrap"
}, _n = { class: "w-crud-toolbar w-crud-toolbar--standalone" }, eo = { class: "w-crud-toolbar-start" }, to = { class: "w-crud-toolbar-end" }, ao = {
  key: 1,
  class: "w-crud-view-toggle"
}, no = {
  key: 0,
  class: "w-crud-cards-loading"
}, oo = {
  key: 2,
  class: "w-crud-cards"
}, lo = ["onClick", "onDblclick", "onContextmenu"], so = { class: "w-crud-card-body" }, io = {
  key: 0,
  class: "w-crud-card-label"
}, ro = { class: "w-crud-card-value" }, uo = {
  key: 0,
  class: "w-crud-card-actions"
}, co = {
  key: 0,
  class: "w-crud-rail"
}, fo = {
  key: 1,
  class: "w-crud-rail-sep"
}, mo = {
  key: 2,
  class: "w-crud-rail-sep"
}, po = /* @__PURE__ */ de({
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
    showPrint: { type: Boolean, default: !1 },
    exportCsv: { type: Boolean, default: !0 },
    csvFilename: { default: "export.csv" },
    csvScope: { default: "all" },
    csvPageSize: { default: 200 }
  },
  emits: ["row-expand", "row-collapse", "print"],
  setup(e, { emit: t }) {
    const a = e, o = t, l = Ht(), { formatNumber: i } = rt(), r = q({}), y = q(a.defaultView);
    function c(u) {
      return y.value === u;
    }
    function k(u) {
      y.value = u;
    }
    const F = H(
      () => (a.crud.pagination.page - 1) * a.crud.pagination.pageSize
    ), V = H(
      () => a.crud.config.columns.filter((u) => u.visible !== !1).map((u) => u.type === "number" && !u.align ? { ...u, align: "right" } : u.type === "currency" && !u.align ? { ...u, align: "right" } : u)
    );
    function W(u) {
      if (u.align === "right") return "text-right";
      if (u.align === "center") return "text-center";
    }
    const L = H(() => V.value.slice(0, a.cardFields)), J = H(() => {
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
    }), Z = H(
      () => a.crud.config.rowActions ?? J.value
    ), g = H(() => Z.value.length > 0 || !!l["row-actions"]);
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
    function x(u, n) {
      return u.disabled ? u.disabled(n) : !1;
    }
    const j = H(() => {
      const u = [];
      return a.showKpi && u.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: i(a.crud.pagination.rows, 0)
      }), u.push(...a.extraKpis), u;
    });
    H(() => a.crud.config.labels ?? {});
    const U = H(() => a.crud.config.canCreate !== !1), N = q(null), K = q(null);
    function B(u) {
      N.value = u;
    }
    function X(u) {
      var n;
      a.contextMenu && (N.value = u.data, (n = K.value) == null || n.show(u.originalEvent));
    }
    function oe(u, n) {
      var p;
      a.contextMenu && (u.preventDefault(), N.value = n, (p = K.value) == null || p.show(u));
    }
    const ae = H(() => {
      const u = N.value;
      if (!u) return [];
      const n = [
        {
          label: "Ver detalhes",
          icon: "pi pi-eye",
          command: () => a.crud.openViewDialog(u)
        }
      ];
      for (const p of Z.value)
        $(p, u) && n.push({
          label: p.tooltip ?? p.action,
          icon: p.icon,
          class: p.severity === "danger" ? "w-crud-ctx-danger" : void 0,
          disabled: x(p, u),
          command: () => b(p, u)
        });
      return a.showPrint && n.push({
        label: "Imprimir",
        icon: "pi pi-print",
        command: () => o("print", u)
      }), a.exportCsv && (n.push({ separator: !0 }), n.push({
        label: a.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
        icon: "pi pi-download",
        command: () => P()
      })), n;
    });
    function _() {
      N.value && o("print", N.value);
    }
    const f = q(!1);
    async function P() {
      if (!f.value) {
        f.value = !0;
        try {
          const u = a.csvScope === "page" ? a.crud.items.value : await a.crud.fetchAll(a.csvPageSize), n = Rn(u, V.value);
          In(n, a.csvFilename);
        } finally {
          f.value = !1;
        }
      }
    }
    return Kt(() => {
      a.autoInit && a.crud.init();
    }), (u, n) => {
      const p = kt("tooltip");
      return s(), m("div", Tn, [
        e.showHeader ? (s(), m("div", Ln, [
          h("div", zn, [
            h("h1", Nn, T(e.title), 1),
            e.subtitle ? (s(), m("p", Yn, T(e.subtitle), 1)) : w("", !0)
          ]),
          h("div", On, [
            Y(u.$slots, "header-actions"),
            U.value && !e.actionRail ? (s(), A(v(ee), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: n[0] || (n[0] = (d) => e.crud.openCreateDialog())
            })) : w("", !0)
          ])
        ])) : w("", !0),
        Y(u.$slots, "before-table", {}, () => [
          j.value.length ? (s(), m("div", Bn, [
            (s(!0), m(le, null, ie(j.value, (d, E) => (s(), m("div", {
              key: E,
              class: "w-crud-kpi"
            }, [
              h("div", {
                class: re(["w-crud-kpi-icon", d.severity ? `w-crud-kpi-icon--${d.severity}` : ""])
              }, [
                h("i", {
                  class: re([d.icon]),
                  style: je(d.color ? `color: ${d.color}` : "")
                }, null, 6)
              ], 2),
              h("div", Wn, [
                h("div", jn, T(d.label), 1),
                h("div", Un, T(d.value), 1)
              ])
            ]))), 128))
          ])) : w("", !0)
        ]),
        h("div", {
          class: re(["w-crud-content", { "w-crud-content--rail": e.actionRail }])
        }, [
          h("div", qn, [
            y.value === "table" ? (s(), m("div", Hn, [
              O(v($t), {
                value: e.crud.items.value,
                loading: e.crud.loading.value,
                "expanded-rows": r.value,
                "onUpdate:expandedRows": n[4] || (n[4] = (d) => r.value = d),
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
                selection: e.actionRail || e.contextMenu ? N.value : void 0,
                "selection-mode": e.actionRail || e.contextMenu ? "single" : void 0,
                "context-menu": e.contextMenu,
                "context-menu-selection": e.contextMenu ? N.value : void 0,
                "onUpdate:selection": n[5] || (n[5] = (d) => N.value = d),
                "onUpdate:contextMenuSelection": n[6] || (n[6] = (d) => N.value = d),
                onRowContextmenu: X,
                onPage: e.crud.onPage,
                onSort: n[7] || (n[7] = (d) => e.crud.onSort({ sortField: d.sortField, sortOrder: d.sortOrder })),
                onRowExpand: n[8] || (n[8] = (d) => o("row-expand", d.data)),
                onRowCollapse: n[9] || (n[9] = (d) => o("row-collapse", d.data))
              }, ot({
                header: ne(() => [
                  h("div", Kn, [
                    h("div", Gn, [
                      e.showSearch ? (s(), A(v(qe), { key: 0 }, {
                        default: ne(() => [
                          O(v(He), { class: "pi pi-search" }),
                          O(v(me), {
                            "model-value": e.crud.search.value,
                            placeholder: "Buscar...",
                            class: "w-72",
                            onInput: e.crud.onSearch
                          }, null, 8, ["model-value", "onInput"])
                        ]),
                        _: 1
                      })) : w("", !0),
                      Y(u.$slots, "toolbar-start"),
                      Y(u.$slots, "toolbar-filters")
                    ]),
                    h("div", Jn, [
                      Y(u.$slots, "toolbar-actions"),
                      e.exportCsv ? fe((s(), A(v(ee), {
                        key: 0,
                        icon: "pi pi-download",
                        text: "",
                        size: "small",
                        loading: f.value,
                        onClick: P
                      }, null, 8, ["loading"])), [
                        [
                          p,
                          e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : w("", !0),
                      e.viewToggle ? (s(), m("div", Zn, [
                        O(v(ee), {
                          icon: "pi pi-table",
                          size: "small",
                          text: !c("table"),
                          outlined: c("table"),
                          onClick: n[1] || (n[1] = (d) => k("table"))
                        }, null, 8, ["text", "outlined"]),
                        O(v(ee), {
                          icon: "pi pi-th-large",
                          size: "small",
                          text: !c("cards"),
                          outlined: c("cards"),
                          onClick: n[2] || (n[2] = (d) => k("cards"))
                        }, null, 8, ["text", "outlined"])
                      ])) : w("", !0),
                      !e.showHeader && U.value && !e.actionRail ? (s(), A(v(ee), {
                        key: 2,
                        label: "Novo",
                        icon: "pi pi-plus",
                        onClick: n[3] || (n[3] = (d) => e.crud.openCreateDialog())
                      })) : w("", !0)
                    ])
                  ])
                ]),
                empty: ne(() => [
                  Y(u.$slots, "empty", {}, () => [
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
                  e.expandable ? (s(), A(v(ze), {
                    key: 0,
                    expander: "",
                    style: { width: "3rem" }
                  })) : w("", !0),
                  (s(!0), m(le, null, ie(V.value, (d) => (s(), A(v(ze), {
                    key: d.field,
                    field: d.field,
                    header: d.header,
                    sortable: d.sortable,
                    style: je(d.style),
                    "header-class": W(d),
                    "body-class": W(d)
                  }, {
                    body: ne(({ data: E }) => [
                      Y(u.$slots, `column-${d.field}`, {
                        data: E,
                        value: E[d.field]
                      }, () => [
                        O(Qe, {
                          column: d,
                          value: E[d.field],
                          "row-data": E
                        }, null, 8, ["column", "value", "row-data"])
                      ])
                    ]),
                    _: 2
                  }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
                  g.value && !e.actionRail ? (s(), A(v(ze), {
                    key: 1,
                    "header-class": "w-crud-actions-header",
                    style: je({ width: `${(Z.value.length + (v(l)["row-actions"] ? 1 : 0)) * 2.5 + 1}rem` })
                  }, {
                    body: ne(({ data: d }) => [
                      h("div", Xn, [
                        (s(!0), m(le, null, ie(Z.value, (E) => (s(), m(le, {
                          key: E.action
                        }, [
                          $(E, d) ? fe((s(), A(v(ee), {
                            key: 0,
                            icon: E.icon,
                            text: "",
                            rounded: "",
                            size: "small",
                            severity: E.severity,
                            disabled: x(E, d),
                            onClick: (R) => b(E, d)
                          }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                            [
                              p,
                              E.tooltip,
                              void 0,
                              { top: !0 }
                            ]
                          ]) : w("", !0)
                        ], 64))), 128)),
                        Y(u.$slots, "row-actions", {
                          data: d,
                          crud: e.crud
                        })
                      ])
                    ]),
                    _: 3
                  }, 8, ["style"])) : w("", !0)
                ]),
                _: 2
              }, [
                e.expandable ? {
                  name: "expansion",
                  fn: ne((d) => [
                    Y(u.$slots, "expansion", {
                      data: d.data
                    })
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "selection", "selection-mode", "context-menu", "context-menu-selection", "onPage"])
            ])) : (s(), m("div", Qn, [
              h("div", _n, [
                h("div", eo, [
                  e.showSearch ? (s(), A(v(qe), { key: 0 }, {
                    default: ne(() => [
                      O(v(He), { class: "pi pi-search" }),
                      O(v(me), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : w("", !0),
                  Y(u.$slots, "toolbar-start"),
                  Y(u.$slots, "toolbar-filters")
                ]),
                h("div", to, [
                  Y(u.$slots, "toolbar-actions"),
                  e.exportCsv ? fe((s(), A(v(ee), {
                    key: 0,
                    icon: "pi pi-download",
                    text: "",
                    size: "small",
                    loading: f.value,
                    onClick: P
                  }, null, 8, ["loading"])), [
                    [
                      p,
                      e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                      void 0,
                      { top: !0 }
                    ]
                  ]) : w("", !0),
                  e.viewToggle ? (s(), m("div", ao, [
                    O(v(ee), {
                      icon: "pi pi-table",
                      size: "small",
                      text: !c("table"),
                      outlined: c("table"),
                      onClick: n[10] || (n[10] = (d) => k("table"))
                    }, null, 8, ["text", "outlined"]),
                    O(v(ee), {
                      icon: "pi pi-th-large",
                      size: "small",
                      text: !c("cards"),
                      outlined: c("cards"),
                      onClick: n[11] || (n[11] = (d) => k("cards"))
                    }, null, 8, ["text", "outlined"])
                  ])) : w("", !0),
                  !e.showHeader && U.value && !e.actionRail ? (s(), A(v(ee), {
                    key: 2,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: n[12] || (n[12] = (d) => e.crud.openCreateDialog())
                  })) : w("", !0)
                ])
              ]),
              e.crud.loading.value ? (s(), m("div", no, [...n[18] || (n[18] = [
                h("i", { class: "pi pi-spin pi-spinner" }, null, -1)
              ])])) : e.crud.items.value.length ? (s(), m("div", oo, [
                (s(!0), m(le, null, ie(e.crud.items.value, (d, E) => (s(), m("div", {
                  key: d[e.crud.config.pk || "id"] ?? E,
                  class: re(["w-crud-card", { "w-crud-card--selected": N.value === d }]),
                  onClick: (R) => B(d),
                  onDblclick: (R) => e.crud.config.canEdit !== !1 && e.crud.openEditDialog(d),
                  onContextmenu: (R) => oe(R, d)
                }, [
                  h("div", so, [
                    (s(!0), m(le, null, ie(L.value, (R, G) => (s(), m("div", {
                      key: R.field,
                      class: re(["w-crud-card-row", { "w-crud-card-row--title": G === 0 }])
                    }, [
                      G !== 0 ? (s(), m("span", io, T(R.header), 1)) : w("", !0),
                      h("span", ro, [
                        Y(u.$slots, `column-${R.field}`, {
                          data: d,
                          value: d[R.field]
                        }, () => [
                          O(Qe, {
                            column: R,
                            value: d[R.field],
                            "row-data": d
                          }, null, 8, ["column", "value", "row-data"])
                        ])
                      ])
                    ], 2))), 128))
                  ]),
                  g.value && !e.actionRail ? (s(), m("div", uo, [
                    (s(!0), m(le, null, ie(Z.value, (R) => (s(), m(le, {
                      key: R.action
                    }, [
                      $(R, d) ? fe((s(), A(v(ee), {
                        key: 0,
                        icon: R.icon,
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: R.severity,
                        disabled: x(R, d),
                        onClick: (G) => b(R, d)
                      }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                        [
                          p,
                          R.tooltip,
                          void 0,
                          { top: !0 }
                        ]
                      ]) : w("", !0)
                    ], 64))), 128)),
                    Y(u.$slots, "row-actions", {
                      data: d,
                      crud: e.crud
                    })
                  ])) : w("", !0)
                ], 42, lo))), 128))
              ])) : Y(u.$slots, "empty", { key: 1 }, () => [
                n[19] || (n[19] = Gt('<div class="w-crud-empty"><div class="w-crud-empty-icon"><i class="pi pi-inbox"></i></div><p class="w-crud-empty-title">Nenhum registro encontrado</p><p class="w-crud-empty-text">Tente ajustar sua busca ou crie um novo registro</p></div>', 1))
              ]),
              e.crud.items.value.length ? (s(), A(v(Jt), {
                key: 3,
                rows: e.crud.pagination.pageSize,
                "total-records": e.crud.pagination.rows,
                first: F.value,
                "rows-per-page-options": [10, 20, 50],
                template: "CurrentPageReport PrevPageLink NextPageLink",
                "current-page-report-template": "Página {currentPage} de {totalPages}",
                class: "w-crud-paginator",
                onPage: e.crud.onPage
              }, null, 8, ["rows", "total-records", "first", "onPage"])) : w("", !0)
            ]))
          ]),
          e.actionRail ? (s(), m("aside", co, [
            U.value ? fe((s(), A(v(ee), {
              key: 0,
              icon: "pi pi-plus",
              rounded: "",
              onClick: n[13] || (n[13] = (d) => e.crud.openCreateDialog())
            }, null, 512)), [
              [
                p,
                "Novo",
                void 0,
                { left: !0 }
              ]
            ]) : w("", !0),
            U.value && Z.value.length ? (s(), m("div", fo)) : w("", !0),
            (s(!0), m(le, null, ie(Z.value, (d) => (s(), m(le, {
              key: d.action
            }, [
              !N.value || $(d, N.value) ? fe((s(), A(v(ee), {
                key: 0,
                icon: d.icon,
                text: "",
                rounded: "",
                severity: d.severity,
                disabled: !N.value || x(d, N.value),
                onClick: (E) => N.value && b(d, N.value)
              }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                [
                  p,
                  d.tooltip,
                  void 0,
                  { left: !0 }
                ]
              ]) : w("", !0)
            ], 64))), 128)),
            Y(u.$slots, "rail-actions", {
              selected: N.value,
              crud: e.crud
            }),
            e.showPrint || e.exportCsv ? (s(), m("div", mo)) : w("", !0),
            e.showPrint ? fe((s(), A(v(ee), {
              key: 3,
              icon: "pi pi-print",
              text: "",
              rounded: "",
              disabled: !N.value,
              onClick: _
            }, null, 8, ["disabled"])), [
              [
                p,
                "Imprimir",
                void 0,
                { left: !0 }
              ]
            ]) : w("", !0),
            e.exportCsv ? fe((s(), A(v(ee), {
              key: 4,
              icon: "pi pi-download",
              text: "",
              rounded: "",
              loading: f.value,
              onClick: P
            }, null, 8, ["loading"])), [
              [
                p,
                e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                void 0,
                { left: !0 }
              ]
            ]) : w("", !0)
          ])) : w("", !0)
        ], 2),
        e.contextMenu ? (s(), A(v(Zt), {
          key: 1,
          ref_key: "cm",
          ref: K,
          model: ae.value
        }, null, 8, ["model"])) : w("", !0),
        Y(u.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => {
          var d;
          return [
            O(ut, {
              visible: e.crud.dialogVisible.value,
              title: e.crud.dialogTitle.value,
              fields: e.crud.config.form,
              "form-data": e.crud.formData,
              "is-editing": e.crud.isEditing.value,
              saving: e.crud.saving.value,
              disabled: ((d = e.crud.viewMode) == null ? void 0 : d.value) ?? !1,
              width: e.dialogWidth,
              "onUpdate:visible": n[14] || (n[14] = (E) => {
                e.crud.dialogVisible.value = E, E || (e.crud.editingItem.value = null);
              }),
              "onUpdate:field": n[15] || (n[15] = (E, R) => e.crud.setFormField(E, R)),
              onSave: n[16] || (n[16] = (E) => e.crud.save())
            }, ot({ _: 2 }, [
              ie(e.crud.config.form, (E) => ({
                name: `field-${E.field}`,
                fn: ne((R) => [
                  Y(u.$slots, `field-${E.field}`, lt(st(R)))
                ])
              }))
            ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "disabled", "width"])
          ];
        })
      ]);
    };
  }
}), vo = /* @__PURE__ */ de({
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
    return (l, i) => (s(), A(v(Ct), {
      value: o.value.label,
      severity: o.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), go = { class: "w-page-header" }, ho = { class: "w-page-header-content" }, yo = { class: "w-page-header-title" }, bo = {
  key: 0,
  class: "w-page-header-subtitle"
}, wo = { class: "w-page-header-actions" }, Xl = /* @__PURE__ */ de({
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
    return (o, l) => (s(), m("div", go, [
      h("div", ho, [
        h("h2", yo, T(e.title), 1),
        e.subtitle ? (s(), m("p", bo, T(e.subtitle), 1)) : w("", !0)
      ]),
      h("div", wo, [
        Y(o.$slots, "actions"),
        e.actionLabel ? (s(), A(v(ee), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: l[0] || (l[0] = (i) => a("action"))
        }, null, 8, ["label", "icon"])) : w("", !0)
      ])
    ]));
  }
}), ko = { class: "w-empty-state" }, $o = { class: "w-empty-state-icon" }, Co = { class: "w-empty-state-title" }, Do = {
  key: 0,
  class: "w-empty-state-description"
}, Ql = /* @__PURE__ */ de({
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
    return (o, l) => (s(), m("div", ko, [
      h("div", $o, [
        h("i", {
          class: re(e.icon)
        }, null, 2)
      ]),
      h("p", Co, T(e.title), 1),
      e.description ? (s(), m("p", Do, T(e.description), 1)) : w("", !0),
      e.actionLabel ? (s(), A(v(ee), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: l[0] || (l[0] = (i) => a("action"))
      }, null, 8, ["label", "icon"])) : w("", !0)
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
const xo = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
function So() {
  return Ie(xo);
}
const Po = { class: "w-detail-header" }, Vo = { class: "w-detail-header-left" }, Eo = { class: "w-detail-header-content" }, Mo = { class: "w-detail-header-title" }, Fo = {
  key: 0,
  class: "w-detail-header-subtitle"
}, Ao = { class: "w-detail-header-actions" }, _l = /* @__PURE__ */ de({
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
    const t = e, a = So();
    function o() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (l, i) => (s(), m("div", Po, [
      h("div", Vo, [
        O(v(ee), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: o
        }),
        e.icon ? (s(), m("i", {
          key: 0,
          class: re([e.icon, "w-detail-header-icon"])
        }, null, 2)) : w("", !0),
        h("div", Eo, [
          h("h2", Mo, T(e.title), 1),
          e.subtitle ? (s(), m("p", Fo, T(e.subtitle), 1)) : w("", !0)
        ]),
        e.status ? (s(), A(vo, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : w("", !0)
      ]),
      h("div", Ao, [
        Y(l.$slots, "actions")
      ])
    ]));
  }
}), Ro = { class: "w-info-card" }, Io = {
  key: 0,
  class: "w-info-card-title"
}, To = { class: "w-info-card-grid" }, Lo = { class: "w-info-card-label" }, zo = { class: "w-info-card-value" }, es = /* @__PURE__ */ de({
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
    return (i, r) => (s(), m("div", Ro, [
      e.title ? (s(), m("h3", Io, T(e.title), 1)) : w("", !0),
      h("div", To, [
        (s(!0), m(le, null, ie(e.fields, (y) => (s(), m("div", {
          key: y.label,
          class: "w-info-card-field"
        }, [
          h("span", Lo, T(y.label), 1),
          h("span", zo, T(l(y)), 1)
        ]))), 128))
      ])
    ]));
  }
}), No = {
  key: 0,
  class: "w-kpi-card__loading"
}, Yo = { class: "w-kpi-card__loading-content" }, Oo = { class: "w-kpi-card__header" }, Bo = {
  key: 0,
  class: "w-kpi-card__icon"
}, Wo = {
  key: 1,
  class: "w-kpi-card__trend"
}, jo = { class: "w-kpi-card__content" }, Uo = { class: "w-kpi-card__label" }, qo = { class: "w-kpi-card__value" }, Ho = {
  key: 0,
  class: "w-kpi-card__hint"
}, Ko = {
  key: 0,
  class: "w-kpi-card__footer"
}, Go = /* @__PURE__ */ de({
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
    return (t, a) => (s(), m("article", {
      class: re(["w-kpi-card", e.severity ? `w-kpi-card--${e.severity}` : ""])
    }, [
      e.loading ? (s(), m("div", No, [
        O(v(Ge), {
          shape: "circle",
          size: "2.75rem"
        }),
        h("div", Yo, [
          O(v(Ge), {
            width: "6rem",
            height: "0.75rem"
          }),
          O(v(Ge), {
            width: "7.5rem",
            height: "1.5rem"
          }),
          O(v(Ge), {
            width: "5rem",
            height: "0.75rem"
          })
        ])
      ])) : (s(), m(le, { key: 1 }, [
        h("div", Oo, [
          e.icon || t.$slots.icon ? (s(), m("div", Bo, [
            Y(t.$slots, "icon", {}, () => [
              e.icon ? (s(), m("i", {
                key: 0,
                class: re(e.icon)
              }, null, 2)) : w("", !0)
            ])
          ])) : w("", !0),
          e.trend || t.$slots.trend ? (s(), m("div", Wo, [
            Y(t.$slots, "trend", {}, () => [
              e.trend ? (s(), m("span", {
                key: 0,
                class: re(["w-kpi-card__trend-badge", e.trend.direction ? `w-kpi-card__trend-badge--${e.trend.direction}` : ""])
              }, T(e.trend.value), 3)) : w("", !0)
            ])
          ])) : w("", !0)
        ]),
        h("div", jo, [
          h("p", Uo, T(e.label), 1),
          h("div", qo, [
            Y(t.$slots, "value", {}, () => [
              Pe(T(e.value), 1)
            ])
          ]),
          e.hint || t.$slots.hint ? (s(), m("p", Ho, [
            Y(t.$slots, "hint", {}, () => [
              Pe(T(e.hint), 1)
            ])
          ])) : w("", !0)
        ]),
        t.$slots.footer ? (s(), m("footer", Ko, [
          Y(t.$slots, "footer")
        ])) : w("", !0)
      ], 64))
    ], 2));
  }
}), ts = /* @__PURE__ */ de({
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
    return (o, l) => (s(), m("div", {
      class: re(["w-kpi-grid", a.value])
    }, [
      o.$slots.item ? (s(!0), m(le, { key: 0 }, ie(e.items, (i, r) => Y(o.$slots, "item", {
        key: r,
        item: i,
        index: r
      })), 128)) : (s(!0), m(le, { key: 1 }, ie(e.items, (i, r) => (s(), A(Go, {
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
}), Jo = { class: "w-section-header__main" }, Zo = {
  key: 0,
  class: "w-section-header__icon"
}, Xo = { class: "w-section-header__content" }, Qo = { class: "w-section-header__title-row" }, _o = { class: "w-section-header__title" }, el = {
  key: 0,
  class: "w-section-header__subtitle"
}, tl = {
  key: 0,
  class: "w-section-header__actions"
}, as = /* @__PURE__ */ de({
  __name: "WSectionHeader",
  props: {
    title: {},
    subtitle: {},
    icon: {},
    compact: { type: Boolean }
  },
  setup(e) {
    return (t, a) => (s(), m("div", {
      class: re(["w-section-header", { "w-section-header--compact": e.compact }])
    }, [
      h("div", Jo, [
        e.icon || t.$slots.icon ? (s(), m("div", Zo, [
          Y(t.$slots, "icon", {}, () => [
            e.icon ? (s(), m("i", {
              key: 0,
              class: re(e.icon)
            }, null, 2)) : w("", !0)
          ])
        ])) : w("", !0),
        h("div", Xo, [
          h("div", Qo, [
            h("h3", _o, T(e.title), 1),
            Y(t.$slots, "meta")
          ]),
          e.subtitle ? (s(), m("p", el, T(e.subtitle), 1)) : w("", !0)
        ])
      ]),
      t.$slots.actions ? (s(), m("div", tl, [
        Y(t.$slots, "actions")
      ])) : w("", !0)
    ], 2));
  }
}), al = {
  key: 0,
  class: "w-form-section__header"
}, nl = { class: "w-form-section__content" }, ol = { class: "w-form-section__title" }, ll = {
  key: 0,
  class: "w-form-section__description"
}, sl = {
  key: 0,
  class: "w-form-section__actions"
}, il = { class: "w-form-section__body" }, ns = /* @__PURE__ */ de({
  __name: "WFormSection",
  props: {
    title: {},
    description: {},
    variant: {}
  },
  setup(e) {
    return (t, a) => (s(), m("section", {
      class: re(["w-form-section", e.variant ? `w-form-section--${e.variant}` : ""])
    }, [
      e.title || e.description || t.$slots.actions ? (s(), m("div", al, [
        h("div", nl, [
          h("h3", ol, T(e.title), 1),
          e.description ? (s(), m("p", ll, T(e.description), 1)) : w("", !0)
        ]),
        t.$slots.actions ? (s(), m("div", sl, [
          Y(t.$slots, "actions")
        ])) : w("", !0)
      ])) : w("", !0),
      h("div", il, [
        Y(t.$slots, "default")
      ])
    ], 2));
  }
}), rl = {
  key: 0,
  class: "w-action-bar__primary"
}, ul = {
  key: 1,
  class: "w-action-bar__filters"
}, dl = {
  key: 2,
  class: "w-action-bar__secondary"
}, os = /* @__PURE__ */ de({
  __name: "WActionBar",
  props: {
    align: { default: "between" },
    stackOnMobile: { type: Boolean, default: !0 }
  },
  setup(e) {
    return (t, a) => (s(), m("div", {
      class: re(["w-action-bar", [
        `w-action-bar--${e.align}`,
        { "w-action-bar--stack": e.stackOnMobile }
      ]])
    }, [
      t.$slots.primary || t.$slots.default ? (s(), m("div", rl, [
        Y(t.$slots, "primary", {}, () => [
          Y(t.$slots, "default")
        ])
      ])) : w("", !0),
      t.$slots.filters ? (s(), m("div", ul, [
        Y(t.$slots, "filters")
      ])) : w("", !0),
      t.$slots.secondary ? (s(), m("div", dl, [
        Y(t.$slots, "secondary")
      ])) : w("", !0)
    ], 2));
  }
}), cl = { class: "w-progress-flow__marker" }, fl = { class: "w-progress-flow__content" }, ml = { class: "w-progress-flow__label" }, pl = {
  key: 0,
  class: "w-progress-flow__description"
}, ls = /* @__PURE__ */ de({
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
    return (l, i) => (s(), m("div", {
      class: re(["w-progress-flow", `w-progress-flow--${e.orientation}`])
    }, [
      (s(!0), m(le, null, ie(e.steps, (r, y) => (s(), m("div", {
        key: r.key,
        class: re(["w-progress-flow__step", `w-progress-flow__step--${o(y)}`])
      }, [
        Y(l.$slots, "step", {
          step: r,
          index: y,
          state: o(y)
        }, () => [
          h("div", cl, [
            h("span", null, T(y + 1), 1)
          ]),
          h("div", fl, [
            h("p", ml, T(r.label), 1),
            r.description ? (s(), m("p", pl, T(r.description), 1)) : w("", !0)
          ])
        ])
      ], 2))), 128))
    ], 2));
  }
});
function vl(e, t, a) {
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
function gl(e) {
  return {
    async list(t, a = {}) {
      const o = await e.get(t, { params: a });
      return vl(
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
const ss = {
  install(e, t) {
    if (!(t != null && t.axios) && !(t != null && t.dataProvider))
      throw new Error(
        '[wPrimeVueComponents] Informe "axios" ou "dataProvider" ao registrar o WPrimeVuePlugin.'
      );
    const a = t.dataProvider ?? gl(t.axios), o = {
      axios: t.axios,
      dataProvider: a,
      defaultPageSize: t.defaultPageSize ?? 20,
      dateFormat: t.dateFormat ?? "DD/MM/YYYY",
      dateTimeFormat: t.dateTimeFormat ?? "DD/MM/YYYY HH:mm",
      locale: t.locale ?? "pt-BR",
      currency: t.currency ?? "BRL"
    };
    t.axios && e.provide(la, t.axios), e.provide(_e, a), e.provide(et, o), t.registerComponents !== !1 && (e.component("WCrudView", po), e.component("WCrudFormDialog", ut), e.component("WCrudColumnRenderer", Qe), e.component("WAutoCompleteFK", Lt), e.component("WMoneyInput", zt), e.component("WTransferList", Nt));
  }
}, hl = {
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
function yl(e, t) {
  const a = {};
  for (const o of Object.keys(t))
    JSON.stringify(e[o]) !== JSON.stringify(t[o]) && (a[o] = t[o]);
  return a;
}
function is(e) {
  const {
    endpoint: t,
    columns: a,
    form: o,
    pk: l = "id",
    searchDebounce: i = 300,
    partialUpdate: r = !0,
    refetchOnSave: y = !0,
    canCreate: c = !0,
    canEdit: k = !0,
    canDelete: F = !0,
    rowActions: V = void 0,
    filterParams: W = void 0,
    createDefaults: L = void 0,
    transformPayload: J = void 0,
    onAfterSave: Z = void 0,
    onAfterDelete: g = void 0
  } = e, b = Ie(_e);
  if (!b)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const $ = b, x = Ie(et), j = e.pageSize ?? (x == null ? void 0 : x.defaultPageSize) ?? 20, U = { ...hl, ...e.labels }, N = It(), { confirmDelete: K } = Tt(), B = q([]), X = q({}), oe = q(!1), ae = q(!1), _ = q(""), f = q(!1), P = q(!1), u = q(null), n = ge({});
  let p = null;
  const d = ge({
    page: 1,
    pageSize: j,
    rows: 0,
    totalPages: 0
  }), E = ge({
    field: null,
    order: 0
  });
  function R() {
    const D = {};
    for (const M of o)
      D[M.field] = M.defaultValue !== void 0 ? typeof M.defaultValue == "function" ? M.defaultValue() : M.defaultValue : null;
    return D;
  }
  const G = R();
  for (const D of Object.keys(G))
    n[D] = G[D];
  const se = H(
    () => u.value !== null && !P.value
  ), pe = H(() => P.value), Ne = H(
    () => P.value ? U.viewTitle ?? "Visualizar Registro" : se.value ? U.editTitle : U.createTitle
  ), Ye = H(() => d.page <= 1), we = H(() => d.page >= d.totalPages);
  let ke = null;
  async function ue(D = {}) {
    oe.value = !0;
    try {
      const M = {
        page: d.page,
        page_size: d.pageSize,
        ...D
      };
      _.value && (M.search = _.value), E.field && E.order !== 0 && (M.ordering = E.order === -1 ? `-${E.field}` : E.field), W && Object.assign(M, W());
      const I = await $.list(t, M);
      B.value = I.data, d.rows = I.rows, X.value = I.extras ?? {}, I.page && (d.page = I.page), I.page_size && (d.pageSize = I.page_size), d.totalPages = Math.ceil(d.rows / d.pageSize) || 0;
    } finally {
      oe.value = !1;
    }
  }
  async function ve() {
    await ue();
  }
  async function Ce() {
    await ue();
  }
  async function Ee(D = 200) {
    const M = {};
    _.value && (M.search = _.value), E.field && E.order !== 0 && (M.ordering = E.order === -1 ? `-${E.field}` : E.field), W && Object.assign(M, W());
    const I = [];
    let Q = 1;
    const Le = 1e4;
    for (; Q <= Le; ) {
      const be = await $.list(t, {
        ...M,
        page: Q,
        page_size: D
      });
      I.push(...be.data);
      const he = be.rows ?? I.length;
      if (be.data.length === 0 || I.length >= he) break;
      Q++;
    }
    return I;
  }
  function De(D) {
    _.value = D, ke && clearTimeout(ke), ke = setTimeout(() => {
      d.page = 1, ue();
    }, i);
  }
  function Me(D) {
    const M = D.target;
    De(M.value);
  }
  function ye(D) {
    d.page = D, ue();
  }
  function xe() {
    ye(1);
  }
  function Fe() {
    ye(d.totalPages);
  }
  function Ae(D) {
    d.page = D.page + 1, d.pageSize = D.rows, ue();
  }
  function Re(D) {
    E.field = D.sortField ?? null, E.order = D.sortOrder ?? 0, d.page = 1, ue();
  }
  function C() {
    const D = R();
    for (const M of Object.keys(D))
      n[M] = D[M];
  }
  function S(D, M) {
    n[D] = M;
  }
  function te() {
    if (P.value = !1, u.value = null, p = null, C(), L) {
      const D = L();
      for (const [M, I] of Object.entries(D))
        n[M] = I;
    }
    f.value = !0;
  }
  function z(D) {
    const M = {};
    for (const I of o) {
      let Q = D[I.field] !== void 0 ? D[I.field] : null;
      Q && (I.type === "date" || I.type === "datetime") && typeof Q == "string" && (Q = it(Q)), n[I.field] = Q, M[I.field] = Q;
    }
    p = M;
  }
  function ce(D) {
    P.value = !1, u.value = D, z(D), f.value = !0;
  }
  function Ot(D) {
    P.value = !0, u.value = D, z(D), f.value = !0;
  }
  function Bt(D) {
    P.value = !1, u.value = null, p = null, C();
    for (const M of o) {
      if (M.field === l) continue;
      let I = D[M.field] !== void 0 ? D[M.field] : n[M.field];
      I && (M.type === "date" || M.type === "datetime") && typeof I == "string" && (I = it(I)), n[M.field] = I;
    }
    if (L) {
      const M = L();
      for (const [I, Q] of Object.entries(M))
        n[I] = Q;
    }
    f.value = !0;
  }
  function dt(D) {
    const M = { ...D };
    for (const I of o) {
      const Q = M[I.field];
      if (I.type === "date" && Q instanceof Date ? M[I.field] = St(Q) : I.type === "datetime" && Q instanceof Date && (M[I.field] = Pt(Q)), I.type === "fk" && Q !== null && typeof Q == "object") {
        const Le = I.optionValue || "id";
        M[I.field] = Q[Le] ?? Q;
      }
      (I.type === "mask" || I.type === "cpf_cnpj") && typeof Q == "string" && (M[I.field] = Ve(Q));
    }
    return M;
  }
  async function Wt() {
    for (const D of o) {
      if (D.validate) {
        const M = D.validate(n[D.field]);
        if (M)
          return N.error(M), null;
      }
      if (D.required) {
        const M = n[D.field];
        if (M == null || M === "")
          return N.error(`${D.label} é obrigatório`), null;
      }
    }
    ae.value = !0;
    try {
      let D = dt(n);
      if (!se.value && L && Object.assign(D, L()), se.value && r && p) {
        const he = dt(p);
        if (D = yl(he, D), Object.keys(D).length === 0 && !J) {
          f.value = !1;
          const Se = u.value;
          return u.value = null, p = null, Se;
        }
      }
      J && (D = J(D, se.value));
      const M = o.some(
        (he) => he.type === "image" && D[he.field] instanceof File
      );
      let I = D, Q;
      if (M) {
        const he = new Set(
          o.filter(($e) => $e.type === "image").map(($e) => $e.field)
        ), Se = new FormData();
        for (const [$e, Oe] of Object.entries(D))
          if (Oe != null)
            if (Oe instanceof File)
              Se.append($e, Oe);
            else {
              if (he.has($e))
                continue;
              Se.append($e, String(Oe));
            }
        I = Se, Q = { "Content-Type": "multipart/form-data" };
      }
      const Le = Q ? { headers: Q } : void 0;
      let be;
      if (se.value && u.value) {
        const he = u.value[l];
        if (be = await $.update(
          t,
          he,
          I,
          Le
        ), !y) {
          const Se = B.value.findIndex(
            ($e) => $e[l] === he
          );
          Se !== -1 && (B.value[Se] = be.data);
        }
        N.success(U.successUpdate);
      } else
        be = await $.create(t, I, Le), y || (B.value.unshift(be.data), d.rows++), N.success(U.successCreate);
      return f.value = !1, u.value = null, p = null, y && await ue(), Z && Z(be.data, se.value), be.data;
    } catch (D) {
      return N.error(Ke(D, "Erro ao salvar registro")), null;
    } finally {
      ae.value = !1;
    }
  }
  function jt(D) {
    K(async () => {
      try {
        const M = D[l];
        await $.delete(t, M);
        const I = B.value.findIndex((Q) => Q[l] === M);
        I !== -1 && (B.value.splice(I, 1), d.rows--), N.success(U.successDelete), g && g(D);
      } catch (M) {
        N.error(Ke(M, "Erro ao excluir registro"));
      }
    }, U.deleteConfirmMessage);
  }
  return {
    items: B,
    extras: X,
    loading: oe,
    saving: ae,
    search: _,
    dialogVisible: f,
    editingItem: u,
    formData: n,
    pagination: d,
    sort: E,
    isEditing: se,
    isViewing: pe,
    viewMode: P,
    dialogTitle: Ne,
    isFirstPage: Ye,
    isLastPage: we,
    init: ve,
    fetchItems: ue,
    fetchAll: Ee,
    refresh: Ce,
    setSearch: De,
    onSearch: Me,
    onPage: Ae,
    onSort: Re,
    openCreateDialog: te,
    openEditDialog: ce,
    openViewDialog: Ot,
    openDuplicateDialog: Bt,
    save: Wt,
    confirmDelete: jt,
    setFormField: S,
    resetForm: C,
    goToPage: ye,
    firstPage: xe,
    lastPage: Fe,
    config: e
  };
}
function rs(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: o = !1 } = e, l = Ie(_e);
  if (!l)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const i = l, r = Ie(et), y = e.pageSize ?? (r == null ? void 0 : r.defaultPageSize) ?? 20, c = q([]), k = q(!1), F = q(""), V = q({}), W = ge({}), L = ge({
    page: 1,
    pageSize: y,
    rows: 0,
    totalPages: 0
  }), J = ge({
    field: null,
    order: 0
  });
  let Z = null;
  async function g(K = {}) {
    k.value = !0;
    try {
      const B = {
        page: L.page,
        page_size: L.pageSize,
        ...K
      };
      F.value && (B.search = F.value), J.field && J.order !== 0 && (B.ordering = J.order === -1 ? `-${J.field}` : J.field);
      for (const [oe, ae] of Object.entries(W))
        ae != null && ae !== "" && (B[oe] = ae);
      const X = await i.list(t, B);
      c.value = X.data, L.rows = X.rows, X.page && (L.page = X.page), X.page_size && (L.pageSize = X.page_size), L.totalPages = Math.ceil(L.rows / L.pageSize) || 0, V.value = X.extras ?? {};
    } finally {
      k.value = !1;
    }
  }
  async function b() {
    await g();
  }
  function $(K) {
    F.value = K, Z && clearTimeout(Z), Z = setTimeout(() => {
      L.page = 1, g();
    }, a);
  }
  function x(K, B) {
    W[K] = B, L.page = 1, g();
  }
  function j() {
    for (const K of Object.keys(W))
      delete W[K];
    L.page = 1, g();
  }
  function U(K) {
    L.page = K.page + 1, L.pageSize = K.rows, g();
  }
  function N(K) {
    J.field = K.sortField ?? null, J.order = K.sortOrder ?? 0, L.page = 1, g();
  }
  return o && g(), {
    items: c,
    loading: k,
    search: F,
    pagination: L,
    sort: J,
    extras: V,
    fetchItems: g,
    refresh: b,
    setSearch: $,
    setFilter: x,
    clearFilters: j,
    onPage: U,
    onSort: N
  };
}
function bl(e) {
  return e.split("?")[0].replace(/^\/+|\/+$/g, "").replace(/^api\/v\d+\//, "");
}
function wl(e) {
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
  const a = bl(e), o = (l = t.resources) == null ? void 0 : l[a];
  if (o)
    return wl(o);
  if ((i = t.allowedTables) != null && i.includes(a))
    return { table: a };
  throw Yt(
    `Recurso Supabase nao registrado para o endpoint "${e}".`,
    404
  );
}
function kl(e, t, a) {
  const o = /* @__PURE__ */ new Set(["page", "page_size", "search", "ordering"]), l = { ...a.defaultFilters, ...t };
  for (const [i, r] of Object.entries(l))
    o.has(i) || r === null || r === void 0 || r === "" || (e = e.eq(i, r));
  return e;
}
function $l(e, t, a) {
  if (typeof t != "string" || !t.trim() || !(a != null && a.length))
    return e;
  const o = t.trim().replace(/,/g, "\\,"), l = a.map((i) => `${i}.ilike.%${o}%`).join(",");
  return e.or(l);
}
function Cl(e, t) {
  const a = typeof e == "string" && e ? e : t;
  return a ? {
    field: a.startsWith("-") ? a.slice(1) : a,
    ascending: !a.startsWith("-")
  } : null;
}
function Dl(e, t) {
  return e ? t.mapListItem ? e.map(
    (a) => {
      var o;
      return (o = t.mapListItem) == null ? void 0 : o.call(t, a);
    }
  ) : e : [];
}
function us(e) {
  const t = e.defaultSelect ?? "*";
  return {
    async list(a, o = {}) {
      var W;
      const l = We(a, e), i = Math.max(Number(o.page ?? 1), 1), r = Math.max(Number(o.page_size ?? 20), 1), y = (i - 1) * r, c = y + r - 1;
      let k = e.client.from(l.table).select(l.select ?? t, { count: "exact" });
      k = kl(k, o, l), k = $l(k, o.search, l.searchFields);
      const F = Cl(o.ordering, l.defaultOrdering);
      F && (k = k.order(F.field, { ascending: F.ascending }));
      const V = await k.range(y, c);
      return V.error && Be(V.error), {
        data: Dl(V.data, l),
        page: i,
        page_size: r,
        rows: V.count ?? ((W = V.data) == null ? void 0 : W.length) ?? 0,
        extras: {}
      };
    },
    async get(a, o, l) {
      const i = We(a, e), r = i.pk ?? "id", y = await e.client.from(i.table).select(i.select ?? t).eq(r, o).single();
      return y.error && Be(y.error), { data: y.data };
    },
    async create(a, o, l) {
      const i = We(a, e), r = wt(o), y = i.mapPayload ? i.mapPayload(r, "create") : r, c = await e.client.from(i.table).insert(y).select(i.select ?? t).single();
      return c.error && Be(c.error), { data: c.data };
    },
    async update(a, o, l, i) {
      const r = We(a, e), y = r.pk ?? "id", c = wt(l), k = r.mapPayload ? r.mapPayload(c, "update") : c, F = await e.client.from(r.table).update(k).eq(y, o).select(r.select ?? t).single();
      return F.error && Be(F.error), { data: F.data };
    },
    async delete(a, o) {
      const l = We(a, e), i = l.pk ?? "id", r = l.softDelete === !0 ? { is_active: !1 } : typeof l.softDelete == "object" ? l.softDelete : null, y = r ? await e.client.from(l.table).update(r).eq(i, o) : await e.client.from(l.table).delete().eq(i, o);
      y.error && Be(y.error);
    }
  };
}
export {
  hl as DEFAULT_CRUD_LABELS,
  os as WActionBar,
  Lt as WAutoCompleteFK,
  Qe as WCrudColumnRenderer,
  ut as WCrudFormDialog,
  po as WCrudView,
  _l as WDetailHeader,
  Ql as WEmptyState,
  Mn as WFormRenderer,
  ns as WFormSection,
  es as WInfoCard,
  Go as WKpiCard,
  ts as WKpiGrid,
  zt as WMoneyInput,
  Xl as WPageHeader,
  ss as WPrimeVuePlugin,
  ls as WProgressFlow,
  as as WSectionHeader,
  vo as WStatusTag,
  Nt as WTransferList,
  la as W_AXIOS_KEY,
  et as W_CONFIG_KEY,
  _e as W_DATA_PROVIDER_KEY,
  gl as createAxiosDataProvider,
  us as createSupabaseDataProvider,
  In as downloadCsv,
  Ke as extractApiError,
  za as mapApiFieldToColumnDef,
  Ia as mapApiFieldToFieldDef,
  Na as mapApiFieldsToColumnDefs,
  Ta as mapApiFieldsToFieldDefs,
  Rn as toCsv,
  rs as useApi,
  Zl as useApiError,
  Tt as useAppConfirm,
  It as useAppToast,
  is as useCrudManager,
  rt as useFormatters
};
//# sourceMappingURL=index.js.map
