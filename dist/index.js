import { inject as Ae, defineComponent as ne, openBlock as i, createElementBlock as v, createBlock as T, unref as D, toDisplayString as R, ref as O, watch as Je, computed as q, reactive as me, resolveDirective as pt, Fragment as re, createElementVNode as w, createVNode as Q, withDirectives as Ve, withCtx as ae, createCommentVNode as A, renderList as ue, normalizeStyle as Ne, createTextVNode as Oe, renderSlot as Y, normalizeClass as se, isRef as Rt, withModifiers as Tt, createSlots as Xe, normalizeProps as Qe, guardReactiveProps as et, useSlots as It, onMounted as Yt } from "vue";
import vt from "primevue/datatable";
import Te from "primevue/column";
import ie from "primevue/button";
import be from "primevue/inputtext";
import gt from "primevue/iconfield";
import ht from "primevue/inputicon";
import yt from "primevue/tag";
import Fe from "dayjs";
import bt from "primevue/dialog";
import lt from "primevue/inputnumber";
import Lt from "primevue/textarea";
import zt from "primevue/select";
import wt from "primevue/autocomplete";
import rt from "primevue/datepicker";
import Nt from "primevue/toggleswitch";
import Wt from "primevue/colorpicker";
import Ot from "primevue/password";
import { useToast as jt } from "primevue/usetoast";
import { useConfirm as Bt } from "primevue/useconfirm";
import Be from "primevue/skeleton";
const Ut = Symbol("w-axios"), _e = Symbol("w-data-provider"), Ke = Symbol("w-config");
function qt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qe = { exports: {} }, Ht = qe.exports, it;
function _t() {
  return it || (it = 1, (function(e, t) {
    (function(a, o) {
      e.exports = o();
    })(Ht, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, o = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, s = /\d/, l = /\d\d/, r = /\d\d?/, h = /\d*[^-_:/,()\s\d]+/, f = {}, S = function(m) {
        return (m = +m) + (m > 68 ? 1900 : 2e3);
      }, x = function(m) {
        return function(u) {
          this[m] = +u;
        };
      }, E = [/[+-]\d\d:?(\d\d)?|Z/, function(m) {
        (this.zone || (this.zone = {})).offset = (function(u) {
          if (!u || u === "Z") return 0;
          var g = u.match(/([+-]|\d\d)/g), V = 60 * g[1] + (+g[2] || 0);
          return V === 0 ? 0 : g[0] === "+" ? -V : V;
        })(m);
      }], z = function(m) {
        var u = f[m];
        return u && (u.indexOf ? u : u.s.concat(u.f));
      }, F = function(m, u) {
        var g, V = f.meridiem;
        if (V) {
          for (var p = 1; p <= 24; p += 1) if (m.indexOf(V(p, 0, u)) > -1) {
            g = p > 12;
            break;
          }
        } else g = m === (u ? "pm" : "PM");
        return g;
      }, N = { A: [h, function(m) {
        this.afternoon = F(m, !1);
      }], a: [h, function(m) {
        this.afternoon = F(m, !0);
      }], Q: [s, function(m) {
        this.month = 3 * (m - 1) + 1;
      }], S: [s, function(m) {
        this.milliseconds = 100 * +m;
      }], SS: [l, function(m) {
        this.milliseconds = 10 * +m;
      }], SSS: [/\d{3}/, function(m) {
        this.milliseconds = +m;
      }], s: [r, x("seconds")], ss: [r, x("seconds")], m: [r, x("minutes")], mm: [r, x("minutes")], H: [r, x("hours")], h: [r, x("hours")], HH: [r, x("hours")], hh: [r, x("hours")], D: [r, x("day")], DD: [l, x("day")], Do: [h, function(m) {
        var u = f.ordinal, g = m.match(/\d+/);
        if (this.day = g[0], u) for (var V = 1; V <= 31; V += 1) u(V).replace(/\[|\]/g, "") === m && (this.day = V);
      }], w: [r, x("week")], ww: [l, x("week")], M: [r, x("month")], MM: [l, x("month")], MMM: [h, function(m) {
        var u = z("months"), g = (z("monthsShort") || u.map((function(V) {
          return V.slice(0, 3);
        }))).indexOf(m) + 1;
        if (g < 1) throw new Error();
        this.month = g % 12 || g;
      }], MMMM: [h, function(m) {
        var u = z("months").indexOf(m) + 1;
        if (u < 1) throw new Error();
        this.month = u % 12 || u;
      }], Y: [/[+-]?\d+/, x("year")], YY: [l, function(m) {
        this.year = S(m);
      }], YYYY: [/\d{4}/, x("year")], Z: E, ZZ: E };
      function U(m) {
        var u, g;
        u = m, g = f && f.formats;
        for (var V = (m = u.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(ee, J, _) {
          var c = _ && _.toUpperCase();
          return J || g[_] || a[_] || g[c].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(P, k, n) {
            return k || n.slice(1);
          }));
        }))).match(o), p = V.length, M = 0; M < p; M += 1) {
          var H = V[M], L = N[H], I = L && L[0], W = L && L[1];
          V[M] = W ? { regex: I, parser: W } : H.replace(/^\[|\]$/g, "");
        }
        return function(ee) {
          for (var J = {}, _ = 0, c = 0; _ < p; _ += 1) {
            var P = V[_];
            if (typeof P == "string") c += P.length;
            else {
              var k = P.regex, n = P.parser, b = ee.slice(c), K = k.exec(b)[0];
              n.call(J, K), ee = ee.replace(K, "");
            }
          }
          return (function(X) {
            var Z = X.afternoon;
            if (Z !== void 0) {
              var j = X.hours;
              Z ? j < 12 && (X.hours += 12) : j === 12 && (X.hours = 0), delete X.afternoon;
            }
          })(J), J;
        };
      }
      return function(m, u, g) {
        g.p.customParseFormat = !0, m && m.parseTwoDigitYear && (S = m.parseTwoDigitYear);
        var V = u.prototype, p = V.parse;
        V.parse = function(M) {
          var H = M.date, L = M.utc, I = M.args;
          this.$u = L;
          var W = I[1];
          if (typeof W == "string") {
            var ee = I[2] === !0, J = I[3] === !0, _ = ee || J, c = I[2];
            J && (c = I[2]), f = this.$locale(), !ee && c && (f = g.Ls[c]), this.$d = (function(b, K, X, Z) {
              try {
                if (["x", "X"].indexOf(K) > -1) return new Date((K === "X" ? 1e3 : 1) * b);
                var j = U(K)(b), le = j.year, ce = j.month, $e = j.day, pe = j.hours, he = j.minutes, De = j.seconds, de = j.milliseconds, fe = j.zone, ge = j.week, Ce = /* @__PURE__ */ new Date(), Se = $e || (le || ce ? 1 : Ce.getDate()), Pe = le || Ce.getFullYear(), we = 0;
                le && !ce || (we = ce > 0 ? ce - 1 : Ce.getMonth());
                var ye, xe = pe || 0, Ee = he || 0, Me = De || 0, y = de || 0;
                return fe ? new Date(Date.UTC(Pe, we, Se, xe, Ee, Me, y + 60 * fe.offset * 1e3)) : X ? new Date(Date.UTC(Pe, we, Se, xe, Ee, Me, y)) : (ye = new Date(Pe, we, Se, xe, Ee, Me, y), ge && (ye = Z(ye).week(ge).toDate()), ye);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(H, W, L, g), this.init(), c && c !== !0 && (this.$L = this.locale(c).$L), _ && H != this.format(W) && (this.$d = /* @__PURE__ */ new Date("")), f = {};
          } else if (W instanceof Array) for (var P = W.length, k = 1; k <= P; k += 1) {
            I[1] = W[k - 1];
            var n = g.apply(this, I);
            if (n.isValid()) {
              this.$d = n.$d, this.$L = n.$L, this.init();
              break;
            }
            k === P && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else p.call(this, M);
        };
      };
    }));
  })(qe)), qe.exports;
}
var Kt = _t();
const Zt = /* @__PURE__ */ qt(Kt);
Fe.extend(Zt);
function tt(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const t = Fe(e, "YYYY-MM-DD", !0);
  return t.isValid() ? t.toDate() : Fe(e).toDate();
}
function kt(e) {
  return e ? typeof e == "string" ? e : Fe(e).format("YYYY-MM-DD") : null;
}
function $t(e) {
  return e ? typeof e == "string" ? e : Fe(e).toISOString() : null;
}
function Gt(e, t = "DD/MM/YYYY") {
  return e ? Fe(e).format(t) : "—";
}
function Jt(e) {
  return e ? Fe(e).format("DD/MM/YYYY HH:mm") : "—";
}
function ke(e) {
  return e.replace(/\D/g, "");
}
function Dt(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function Ct(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function Xt(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length === 11 ? Dt(e) : t.length === 14 ? Ct(e) : e;
}
function Qt(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function St(e) {
  if (!e) return null;
  const t = ke(e);
  if (t.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(t)) return "CPF inválido.";
  let a = 0;
  for (let r = 0; r < 9; r++) a += parseInt(t[r]) * (10 - r);
  let o = a % 11;
  const s = o < 2 ? 0 : 11 - o;
  if (parseInt(t[9]) !== s) return "CPF inválido.";
  a = 0;
  for (let r = 0; r < 10; r++) a += parseInt(t[r]) * (11 - r);
  o = a % 11;
  const l = o < 2 ? 0 : 11 - o;
  return parseInt(t[10]) !== l ? "CPF inválido." : null;
}
function Pt(e) {
  if (!e) return null;
  const t = ke(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let o = 0;
  for (let f = 0; f < 12; f++) o += parseInt(t[f]) * a[f];
  let s = o % 11;
  const l = s < 2 ? 0 : 11 - s;
  if (parseInt(t[12]) !== l) return "CNPJ inválido.";
  const r = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  o = 0;
  for (let f = 0; f < 13; f++) o += parseInt(t[f]) * r[f];
  s = o % 11;
  const h = s < 2 ? 0 : 11 - s;
  return parseInt(t[13]) !== h ? "CNPJ inválido." : null;
}
function ea(e) {
  if (!e) return null;
  const t = ke(e);
  return t.length === 11 ? St(e) : t.length === 14 ? Pt(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const He = /* @__PURE__ */ new Map();
function ut(e, t) {
  const a = `${e}-${t}`;
  let o = He.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }), He.set(a, o)), o;
}
function ta(e, t) {
  const a = `${e}-${t}`;
  let o = He.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    style: "currency",
    currency: t
  }), He.set(a, o)), o;
}
function at() {
  const e = Ae(Ke, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), t = (e == null ? void 0 : e.locale) ?? "pt-BR", a = (e == null ? void 0 : e.currency) ?? "BRL";
  function o(f) {
    return f == null ? "—" : ta(t, a).format(f);
  }
  function s(f, S = 2) {
    return f == null ? "—" : ut(t, S).format(f);
  }
  function l(f, S) {
    return Gt(f, S ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function r(f) {
    return Jt(f);
  }
  function h(f) {
    return f == null ? "—" : `${ut(t, 2).format(f)}%`;
  }
  return {
    formatCurrency: o,
    formatNumber: s,
    formatDate: l,
    formatDateTime: r,
    formatPercent: h,
    formatCpf: Dt,
    formatCnpj: Ct,
    formatCpfCnpj: Xt,
    formatTelefone: Qt,
    validateCpf: St,
    validateCnpj: Pt,
    validateCpfCnpj: ea,
    parseDate: tt,
    toDateString: kt,
    toDateTimeString: $t
  };
}
const aa = {
  key: 0,
  class: "text-muted-color text-xs"
}, oa = ["src", "alt"], na = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, sa = {
  key: 4,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, la = {
  key: 5,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, ra = {
  key: 6,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, ia = {
  key: 7,
  class: "text-[0.8125rem]"
}, ot = /* @__PURE__ */ ne({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: o, formatNumber: s } = at();
    return (l, r) => e.value == null ? (i(), v("span", aa, "—")) : e.column.type === "image" ? (i(), v("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, oa)) : e.column.type === "boolean" ? (i(), T(D(yt), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (i(), v("span", na, R(D(t)(e.value)), 1)) : e.column.type === "datetime" ? (i(), v("span", sa, R(D(a)(e.value)), 1)) : e.column.type === "currency" ? (i(), v("span", la, R(D(o)(e.value)), 1)) : e.column.type === "number" ? (i(), v("span", ra, R(e.column.format ? e.column.format(e.value, e.rowData) : D(s)(e.value, e.column.decimals ?? 0)), 1)) : (i(), v("span", ia, R(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var ua = Object.defineProperty, ca = (e, t, a) => t in e ? ua(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, We = (e, t, a) => ca(e, typeof t != "symbol" ? t + "" : t, a);
const ct = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, dt = (e, t, a) => e.replaceAll(t, "").replace(a, ".").replace("..", ".").replace(/[^.\d]/g, ""), ft = (e, t, a) => {
  var o;
  return new Intl.NumberFormat(((o = a.number) == null ? void 0 : o.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
}, da = (e, t = !0, a) => {
  var o, s, l, r;
  const h = ((o = a.number) == null ? void 0 : o.unsigned) !== !0 && e.startsWith("-") ? "-" : "", f = ((s = a.number) == null ? void 0 : s.fraction) ?? 0;
  let S = ft(0, f, a);
  const x = S.formatToParts(1000.12), E = ((l = x.find((m) => m.type === "group")) == null ? void 0 : l.value) ?? " ", z = ((r = x.find((m) => m.type === "decimal")) == null ? void 0 : r.value) ?? ".", F = dt(e, E, z);
  if (Number.isNaN(parseFloat(F))) return h;
  const N = F.split(".");
  if (N[1] != null && N[1].length >= 1) {
    const m = N[1].length <= f ? N[1].length : f;
    S = ft(m, f, a);
  }
  let U = S.format(parseFloat(F));
  return t ? f > 0 && F.endsWith(".") && !F.slice(0, -1).includes(".") && (U += z) : U = dt(U, E, z), h + U;
}, xt = (e) => JSON.parse(e.replaceAll("'", '"')), fa = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = ma(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = Ue(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = Ue(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = Ue(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = pa(e.dataset.maskaTokens));
  const o = {};
  return e.dataset.maskaNumberLocale != null && (o.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (o.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (o.unsigned = Ue(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(o).length > 0) && (a.number = o), a;
}, Ue = (e) => e !== "" ? !!JSON.parse(e) : !0, ma = (e) => e.startsWith("[") && e.endsWith("]") ? xt(e) : e, pa = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return xt(e);
  const t = {};
  return e.split("|").forEach((a) => {
    const o = a.split(":");
    t[o[0]] = {
      pattern: Et() ? new RegExp(o[1], "u") : new RegExp(o[1]),
      optional: o[2] === "optional",
      multiple: o[2] === "multiple",
      repeated: o[2] === "repeated"
    };
  }), t;
}, Et = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class va {
  constructor(t = {}) {
    We(this, "opts", {}), We(this, "memo", /* @__PURE__ */ new Map());
    const a = { ...t };
    if (a.tokens != null) {
      a.tokens = a.tokensReplace ? { ...a.tokens } : { ...ct, ...a.tokens };
      for (const o of Object.values(a.tokens))
        typeof o.pattern == "string" && (o.pattern = Et() ? new RegExp(o.pattern, "u") : new RegExp(o.pattern));
    } else
      a.tokens = ct;
    Array.isArray(a.mask) && (a.mask.length > 1 ? a.mask = [...a.mask].sort((o, s) => o.length - s.length) : a.mask = a.mask[0] ?? ""), a.mask === "" && (a.mask = null), this.opts = a;
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
    return a.find((s) => this.process(t, s, !1).length >= o.length) ?? "";
  }
  escapeMask(t) {
    const a = [], o = [];
    return t.split("").forEach((s, l) => {
      s === "!" && t[l - 1] !== "!" ? o.push(l - o.length) : a.push(s);
    }), { mask: a.join(""), escaped: o };
  }
  process(t, a, o = !0) {
    if (this.opts.number != null) return da(t, o, this.opts);
    if (a == null) return t;
    const s = `v=${t},mr=${a},m=${o ? 1 : 0}`;
    if (this.memo.has(s)) return this.memo.get(s);
    const { mask: l, escaped: r } = this.escapeMask(a), h = [], f = this.opts.tokens != null ? this.opts.tokens : {}, S = this.isReversed() ? -1 : 1, x = this.isReversed() ? "unshift" : "push", E = this.isReversed() ? 0 : l.length - 1, z = this.isReversed() ? () => m > -1 && u > -1 : () => m < l.length && u < t.length, F = (V) => !this.isReversed() && V <= E || this.isReversed() && V >= E;
    let N, U = -1, m = this.isReversed() ? l.length - 1 : 0, u = this.isReversed() ? t.length - 1 : 0, g = !1;
    for (; z(); ) {
      const V = l.charAt(m), p = f[V], M = (p == null ? void 0 : p.transform) != null ? p.transform(t.charAt(u)) : t.charAt(u);
      if (!r.includes(m) && p != null ? (M.match(p.pattern) != null ? (h[x](M), p.repeated ? (U === -1 ? U = m : m === E && m !== U && (m = U - S), E === U && (m -= S)) : p.multiple && (g = !0, m -= S), m += S) : p.multiple ? g && (m += S, u -= S, g = !1) : M === N ? N = void 0 : p.optional && (m += S, u -= S), u += S) : (o && !this.isEager() && h[x](V), M === V && !this.isEager() ? u += S : N = V, this.isEager() || (m += S)), this.isEager())
        for (; F(m) && (f[l.charAt(m)] == null || r.includes(m)); ) {
          if (o) {
            if (h[x](l.charAt(m)), t.charAt(u) === l.charAt(m)) {
              m += S, u += S;
              continue;
            }
          } else l.charAt(m) === t.charAt(u) && (u += S);
          m += S;
        }
    }
    return this.memo.set(s, h.join("")), this.memo.get(s);
  }
}
class ga {
  constructor(t, a = {}) {
    We(this, "items", /* @__PURE__ */ new Map()), We(this, "eventAbortController"), We(this, "onInput", (o) => {
      if (o instanceof CustomEvent && o.type === "input" && !o.isTrusted && !o.bubbles)
        return;
      const s = o.target, l = this.items.get(s);
      if (l === void 0) return;
      const r = "inputType" in o && o.inputType.startsWith("delete"), h = l.isEager(), f = r && h && l.unmasked(s.value) === "" ? "" : s.value;
      this.fixCursor(s, r, () => this.setValue(s, f));
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
        const { signal: l } = this.eventAbortController;
        o.addEventListener("input", this.onInput, { capture: !0, signal: l });
      }
      const s = new va(fa(o, a));
      this.items.set(o, s), queueMicrotask(() => this.updateValue(o)), o.selectionStart === null && s.isEager() && console.warn("Maska: input of `%s` type is not supported", o.type);
    }
  }
  getInputs(t) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t];
  }
  getOptions(t) {
    const { onMaska: a, preProcess: o, postProcess: s, ...l } = t;
    return l;
  }
  fixCursor(t, a, o) {
    var s, l;
    const r = t.selectionStart, h = t.value;
    if (o(), r === null || r === h.length && !a) return;
    const f = t.value, S = h.slice(0, r), x = f.slice(0, r), E = (s = this.processInput(t, S)) == null ? void 0 : s.unmasked, z = (l = this.processInput(t, x)) == null ? void 0 : l.unmasked;
    if (E === void 0 || z === void 0) return;
    let F = r;
    S !== x && (F += a ? f.length - h.length : E.length - z.length), t.setSelectionRange(F, F);
  }
  setValue(t, a) {
    const o = this.processInput(t, a);
    o !== void 0 && (t.value = o.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((s) => s(o)) : this.options.onMaska(o)), t.dispatchEvent(new CustomEvent("maska", { detail: o })), t.dispatchEvent(new CustomEvent("input", { detail: o.masked })));
  }
  processInput(t, a) {
    const o = this.items.get(t);
    if (o === void 0) return;
    let s = a ?? t.value;
    this.options.preProcess != null && (s = this.options.preProcess(s));
    let l = o.masked(s);
    return this.options.postProcess != null && (l = this.options.postProcess(l)), {
      masked: l,
      unmasked: o.unmasked(s),
      completed: o.completed(s)
    };
  }
}
const Ze = /* @__PURE__ */ new WeakMap(), ha = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, Ge = (e, t) => {
  var a;
  const o = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (o == null || (o == null ? void 0 : o.type) === "file") return;
  let s = {};
  if (t.value != null && (s = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const l = (r) => {
      const h = t.modifiers.unmasked ? r.unmasked : t.modifiers.completed ? r.completed : r.masked;
      ha(t, h);
    };
    s.onMaska = s.onMaska == null ? l : Array.isArray(s.onMaska) ? [...s.onMaska, l] : [s.onMaska, l];
  }
  Ze.has(o) ? (a = Ze.get(o)) == null || a.update(s) : Ze.set(o, new ga(o, s));
}, ya = {
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
function ba(e) {
  var o;
  const t = ya[e.type] ?? "text", a = {
    field: e.name,
    label: e.label,
    type: t,
    required: e.required ?? !1
  };
  return (e.type === "decimal" || e.type === "float") && (a.minFractionDigits = 2, a.maxFractionDigits = 2), e.type === "boolean" && (a.defaultValue = !1), e.type === "choice" && ((o = e.choices) != null && o.length) && (a.options = e.choices.map((s) => ({
    label: s.label,
    value: s.value
  }))), e.type === "fk" && (a.endpoint = e.endpoint, e.option_label && (a.optionLabel = e.option_label), e.option_value && (a.optionValue = e.option_value)), a;
}
function wa(e) {
  return e.filter((t) => !t.read_only && t.name !== "id").map(ba);
}
const ka = {
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
  decimal: "number",
  float: "number",
  integer: "number"
};
function $a(e) {
  return {
    field: e.type === "fk" ? `${e.name}_nome` : e.name,
    header: e.label,
    type: ka[e.type],
    sortable: !0
  };
}
function Da(e, t = 6) {
  return e.filter((a) => !a.read_only && a.name !== "id").slice(0, t).map($a);
}
function Mt() {
  const e = jt();
  function t(l, r = "Sucesso") {
    e.add({ severity: "success", summary: r, detail: l, life: 3e3 });
  }
  function a(l, r = "Erro") {
    e.add({ severity: "error", summary: r, detail: l, life: 5e3 });
  }
  function o(l, r = "Atenção") {
    e.add({ severity: "warn", summary: r, detail: l, life: 4e3 });
  }
  function s(l, r = "Info") {
    e.add({ severity: "info", summary: r, detail: l, life: 3e3 });
  }
  return { success: t, error: a, warn: o, info: s };
}
function Vt() {
  const e = Bt();
  function t(o, s = "Deseja realmente excluir este registro?") {
    e.require({
      message: s,
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
  function a(o, s, l = "Confirmação") {
    e.require({
      message: o,
      header: l,
      icon: "pi pi-question-circle",
      rejectLabel: "Cancelar",
      rejectProps: {
        severity: "secondary",
        text: !0
      },
      acceptLabel: "Confirmar",
      accept: s
    });
  }
  return { confirmDelete: t, confirmAction: a };
}
function Ca(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function Sa(e) {
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
    for (const [o, s] of Object.entries(t)) {
      if (o === "non_field_errors") continue;
      const l = Ca(o);
      if (Array.isArray(s)) {
        const r = s.filter((h) => typeof h == "string");
        r.length > 0 && a.push(`${l}: ${r.join(" ")}`);
      } else typeof s == "string" && a.push(`${l}: ${s}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function je(e, t = "Erro inesperado") {
  var l;
  if (!e || typeof e != "object") return t;
  const a = e, o = (l = a.response) == null ? void 0 : l.data;
  if (!o || typeof o != "object")
    return a.message || t;
  const s = o.detail ?? o;
  return Sa(s) || t;
}
function Kn() {
  return { extractApiError: je };
}
const Pa = { class: "w-autocompletefk" }, xa = ["disabled"], Ea = { class: "w-autocompletefk-toolbar" }, Ma = { class: "w-autocompletefk-toolbar-actions" }, Va = { class: "flex items-center justify-end gap-1" }, Aa = { class: "w-autocompletefk-footer" }, At = /* @__PURE__ */ ne({
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
    const a = e, o = t, s = Ae(_e);
    if (!s)
      throw new Error(
        "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin."
      );
    const l = s, r = Mt(), { confirmDelete: h } = Vt(), f = O(null), S = O([]), x = O(!1);
    let E = null;
    async function z(y) {
      try {
        const $ = await l.get(a.endpoint, y);
        f.value = $.data;
      } catch {
        f.value = null;
      }
    }
    async function F(y) {
      x.value = !0;
      try {
        const $ = {
          page_size: 20,
          ...a.endpointParams
        };
        y && ($.search = y);
        const G = await l.list(a.endpoint, $);
        S.value = G.data;
      } catch {
        S.value = [];
      } finally {
        x.value = !1;
      }
    }
    function N(y) {
      const $ = y.query || "";
      if ($.length < a.minLength) {
        S.value = [];
        return;
      }
      E && clearTimeout(E), E = setTimeout(() => F($), 300);
    }
    function U(y) {
      f.value = y.value, o("update:modelValue", y.value);
    }
    function m() {
      f.value = null, o("update:modelValue", null);
    }
    Je(
      () => a.modelValue,
      async (y) => {
        if (y != null) {
          if (typeof y == "object" && y !== null && a.optionLabel in y) {
            f.value = y;
            return;
          }
          (!f.value || f.value[a.optionValue] !== y) && await z(y);
        } else
          f.value = null;
      },
      { immediate: !0 }
    );
    const u = O(!1), g = O([]), V = O(!1), p = O(""), M = O(1), H = O(15), L = O(0), I = O(null), W = O(null), ee = O(0);
    let J = null;
    const _ = O([]), c = q(() => {
      var y;
      return (y = a.crudFields) != null && y.length ? !0 : _.value.length > 0;
    }), P = q(() => a.canCreate ?? c.value), k = q(() => a.canEdit ?? c.value), n = q(() => a.canDelete ?? c.value), b = q(() => k.value || n.value), K = q(() => {
      var y;
      return (y = a.crudFields) != null && y.length ? a.crudFields : wa(_.value);
    }), X = q(() => {
      var y, $;
      return (y = a.crudColumns) != null && y.length ? a.crudColumns : ($ = a.columns) != null && $.length ? a.columns.map((G) => ({
        field: G.field,
        header: G.header,
        sortable: !0
      })) : _.value.length ? Da(_.value) : [
        { field: a.optionLabel, header: a.optionLabel, sortable: !0 }
      ];
    });
    async function Z() {
      var y, $, G;
      V.value = !0;
      try {
        const d = {
          page: M.value,
          page_size: H.value,
          ...a.endpointParams
        };
        p.value && (d.search = p.value), W.value && ee.value !== 0 && (d.ordering = ee.value === -1 ? `-${W.value}` : W.value);
        const C = await l.list(a.endpoint, d);
        g.value = C.data, L.value = C.rows, (y = C.extras) != null && y.fields && !(($ = a.columns) != null && $.length) && !((G = a.crudFields) != null && G.length) && (_.value = C.extras.fields);
      } catch {
        g.value = [], L.value = 0;
      } finally {
        V.value = !1;
      }
    }
    function j() {
      a.disabled || (p.value = "", M.value = 1, W.value = null, ee.value = 0, I.value = null, u.value = !0, Z());
    }
    function le(y) {
      M.value = y.page + 1, H.value = y.rows, Z();
    }
    function ce(y) {
      W.value = y.sortField ?? null, ee.value = y.sortOrder ?? 0, M.value = 1, Z();
    }
    function $e() {
      I.value && (f.value = I.value, o("update:modelValue", I.value), u.value = !1);
    }
    function pe(y) {
      f.value = y.data, o("update:modelValue", y.data), u.value = !1;
    }
    Je(p, () => {
      J && clearTimeout(J), J = setTimeout(() => {
        M.value = 1, Z();
      }, 300);
    });
    const he = O(!1), De = O(!1), de = O(null), fe = me({}), ge = q(() => de.value !== null), Ce = q(
      () => ge.value ? "Editar Registro" : "Novo Registro"
    );
    function Se() {
      const y = {};
      for (const $ of K.value)
        y[$.field] = $.defaultValue !== void 0 ? typeof $.defaultValue == "function" ? $.defaultValue() : $.defaultValue : null;
      return y;
    }
    function Pe() {
      const y = Se();
      for (const $ of Object.keys(fe))
        delete fe[$];
      for (const [$, G] of Object.entries(y))
        fe[$] = G;
    }
    function we() {
      de.value = null, Pe(), he.value = !0;
    }
    function ye(y) {
      de.value = y;
      for (const $ of K.value)
        fe[$.field] = y[$.field] !== void 0 ? y[$.field] : null;
      he.value = !0;
    }
    function xe(y, $) {
      fe[y] = $;
    }
    async function Ee() {
      De.value = !0;
      try {
        const y = { ...fe };
        for (const G of K.value) {
          const d = y[G.field];
          if (G.type === "fk" && d !== null && typeof d == "object") {
            const C = G.optionValue || "id";
            y[G.field] = d[C] ?? d;
          }
        }
        let $;
        if (ge.value && de.value) {
          const G = de.value[a.optionValue];
          $ = await l.update(
            a.endpoint,
            G,
            y
          );
          const d = g.value.findIndex((C) => C[a.optionValue] === G);
          d !== -1 && (g.value[d] = $.data), r.success("Registro atualizado com sucesso");
        } else
          $ = await l.create(a.endpoint, y), g.value.unshift($.data), L.value++, r.success("Registro criado com sucesso");
        he.value = !1, de.value = null, I.value = $.data;
      } catch (y) {
        r.error(je(y, "Erro ao salvar registro"));
      } finally {
        De.value = !1;
      }
    }
    function Me(y) {
      h(async () => {
        try {
          const $ = y[a.optionValue];
          await l.delete(a.endpoint, $);
          const G = g.value.findIndex((d) => d[a.optionValue] === $);
          G !== -1 && (g.value.splice(G, 1), L.value--), f.value && f.value[a.optionValue] === $ && (f.value = null, o("update:modelValue", null)), I.value && I.value[a.optionValue] === $ && (I.value = null), r.success("Registro excluído com sucesso");
        } catch ($) {
          r.error(je($, "Erro ao excluir registro"));
        }
      });
    }
    return (y, $) => {
      const G = pt("tooltip");
      return i(), v(re, null, [
        w("div", Pa, [
          Q(D(wt), {
            "model-value": f.value,
            suggestions: S.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: x.value,
            fluid: "",
            onComplete: N,
            onItemSelect: U,
            onClear: m
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          Ve((i(), v("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: j
          }, [...$[6] || ($[6] = [
            w("i", { class: "pi pi-search" }, null, -1)
          ])], 8, xa)), [
            [
              G,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        Q(D(bt), {
          visible: u.value,
          "onUpdate:visible": $[4] || ($[4] = (d) => u.value = d),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: ae(() => [
            w("div", Aa, [
              Q(D(ie), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: $[3] || ($[3] = (d) => u.value = !1)
              }),
              Q(D(ie), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !I.value,
                onClick: $e
              }, null, 8, ["disabled"])
            ])
          ]),
          default: ae(() => [
            w("div", Ea, [
              Q(D(gt), { class: "w-autocompletefk-toolbar-search" }, {
                default: ae(() => [
                  Q(D(ht), { class: "pi pi-search" }),
                  Q(D(be), {
                    modelValue: p.value,
                    "onUpdate:modelValue": $[0] || ($[0] = (d) => p.value = d),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              w("div", Ma, [
                P.value ? (i(), T(D(ie), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: we
                })) : A("", !0)
              ])
            ]),
            Q(D(vt), {
              selection: I.value,
              "onUpdate:selection": $[1] || ($[1] = (d) => I.value = d),
              value: g.value,
              loading: V.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: H.value,
              "total-records": L.value,
              "sort-field": W.value ?? void 0,
              "sort-order": ee.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: le,
              onSort: $[2] || ($[2] = (d) => ce({ sortField: d.sortField, sortOrder: d.sortOrder })),
              onRowDblclick: pe
            }, {
              empty: ae(() => [...$[7] || ($[7] = [
                w("div", { class: "w-autocompletefk-empty" }, "Nenhum registro encontrado", -1)
              ])]),
              default: ae(() => [
                Q(D(Te), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (i(!0), v(re, null, ue(X.value, (d) => (i(), T(D(Te), {
                  key: d.field,
                  field: d.field,
                  header: d.header,
                  sortable: d.sortable ?? !0,
                  style: Ne(d.style)
                }, {
                  body: ae(({ data: C }) => [
                    d.type ? (i(), T(ot, {
                      key: 0,
                      column: d,
                      value: C[d.field],
                      "row-data": C
                    }, null, 8, ["column", "value", "row-data"])) : (i(), v(re, { key: 1 }, [
                      Oe(R(C[d.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                b.value ? (i(), T(D(Te), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: ae(({ data: d }) => [
                    w("div", Va, [
                      k.value ? Ve((i(), T(D(ie), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (C) => ye(d)
                      }, null, 8, ["onClick"])), [
                        [
                          G,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : A("", !0),
                      n.value ? Ve((i(), T(D(ie), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (C) => Me(d)
                      }, null, 8, ["onClick"])), [
                        [
                          G,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : A("", !0)
                    ])
                  ]),
                  _: 1
                })) : A("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        c.value ? (i(), T(nt, {
          key: 0,
          visible: he.value,
          title: Ce.value,
          fields: K.value,
          "form-data": fe,
          "is-editing": ge.value,
          saving: De.value,
          width: e.dialogWidth,
          "onUpdate:visible": $[5] || ($[5] = (d) => {
            he.value = d, d || (de.value = null);
          }),
          "onUpdate:field": xe,
          onSave: Ee
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : A("", !0)
      ], 64);
    };
  }
});
async function Fa(e) {
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
const Ra = { class: "w-crud-form" }, Ta = {
  key: 0,
  class: "w-crud-form-group-header"
}, Ia = { class: "w-crud-form-group-title" }, Ya = {
  key: 0,
  class: "w-crud-form-group-desc"
}, La = { class: "w-crud-form-fields" }, za = {
  key: 0,
  class: "w-crud-form-switch"
}, Na = { class: "w-crud-form-switch-label" }, Wa = {
  key: 1,
  class: "w-crud-form-col-full"
}, Oa = { class: "w-crud-form-label" }, ja = {
  key: 0,
  class: "w-crud-form-required"
}, Ba = { class: "w-crud-form-color-row" }, Ua = {
  key: 2,
  class: "w-crud-form-col-full"
}, qa = { class: "w-crud-form-label" }, Ha = ["accept", "disabled", "onChange"], _a = { class: "w-crud-form-label" }, Ka = {
  key: 0,
  class: "w-crud-form-required"
}, Za = {
  key: 1,
  class: "pi pi-spin pi-spinner w-crud-form-cep-spinner"
}, Ga = {
  key: 15,
  class: "w-crud-form-cep-error"
}, Ja = {
  key: 16,
  class: "w-crud-form-error"
}, Xa = /* @__PURE__ */ ne({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const o = e, s = a, l = me({}), r = me({}), h = me({}), f = me({});
    function S(c, P) {
      const k = P.target.value, n = k.replace(/\D/g, "");
      s("update:field", c.field, k), h[c.field] = null, f[c.field] && (clearTimeout(f[c.field]), f[c.field] = null), n.length === 8 && (f[c.field] = setTimeout(async () => {
        r[c.field] = !0, h[c.field] = null;
        try {
          const b = await Fa(n);
          if (!b)
            h[c.field] = "CEP não encontrado. Preencha os campos manualmente.";
          else {
            const K = c.cepFields || {}, X = Object.keys(K);
            for (const Z of X) {
              const j = K[Z];
              if (!j) continue;
              const le = o.formData[j];
              (le == null || le === "") && s("update:field", j, b[Z] ?? "");
            }
          }
        } finally {
          r[c.field] = !1;
        }
      }, 400));
    }
    const x = q(
      () => o.fields.filter((c) => c.visible === void 0 || c.visible === !0 ? !0 : typeof c.visible == "function" ? c.visible(o.formData, o.isEditing) : c.visible)
    );
    function E(c) {
      return o.disabled || c.disabledOnEdit && o.isEditing ? !0 : typeof c.disabled == "function" ? c.disabled(o.formData, o.isEditing) : !!c.disabled;
    }
    function z(c) {
      return Rt(c) ? c.value : c;
    }
    const F = q(() => {
      const c = o.isEditing ? "edit" : "create", P = o.fields.find(
        (n) => n.autofocus === !0 || n.autofocus === c
      );
      if (P) return P.field;
      const k = x.value.find((n) => !(n.type === "switch" || n.type === "fk" || n.type === "select" || n.type === "image" || n.disabled === !0 || n.disabledOnEdit && o.isEditing));
      return (k == null ? void 0 : k.field) ?? null;
    });
    function N(c) {
      return c.field === F.value;
    }
    function U(c) {
      if (c)
        return c.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function m(c) {
      if (!c) return "";
      const P = String(c).replace(/\D/g, "").slice(0, 14);
      return P.length <= 11 ? P.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : P.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function u(c, P) {
      const k = P.target.value.replace(/\D/g, "").slice(0, 14);
      s("update:field", c, k);
    }
    const g = me({});
    function V(c) {
      const P = o.formData[c.field];
      if (P == null) return null;
      const k = c.optionValue || "value";
      return (z(c.options) || []).find(
        (b) => b[k] === P
      ) ?? null;
    }
    function p(c) {
      return g[c.field] || [];
    }
    function M(c, P) {
      const k = (P.query || "").toLowerCase(), n = z(c.options) || [], b = c.optionLabel || "label";
      g[c.field] = n.filter(
        (K) => String(K[b] || "").toLowerCase().includes(k)
      );
    }
    function H(c, P) {
      const k = c.optionValue || "value";
      s("update:field", c.field, P.value[k]);
    }
    function L(c) {
      const P = o.formData[c.field];
      return P ? String(P).replace("#", "") : "FFFFFF";
    }
    function I(c, P) {
      s("update:field", c.field, `#${P}`);
    }
    function W(c) {
      if (typeof c.validate == "function") {
        const P = c.validate(o.formData[c.field]);
        l[c.field] = P || null;
      }
    }
    function ee() {
      const c = [];
      for (const P of o.fields)
        if (typeof P.validate == "function") {
          const k = P.validate(o.formData[P.field]);
          l[P.field] = k || null, k && c.push(k);
        }
      return c;
    }
    function J() {
      Object.keys(l).forEach((c) => delete l[c]);
    }
    const _ = q(() => {
      var n, b, K, X;
      const c = /* @__PURE__ */ new Map(), P = [], k = /* @__PURE__ */ new Map();
      for (const Z of x.value) {
        const j = ((n = Z.fieldGroup) == null ? void 0 : n.id) ?? "__default__";
        c.has(j) || (c.set(j, {
          id: j,
          title: (b = Z.fieldGroup) == null ? void 0 : b.title,
          description: (K = Z.fieldGroup) == null ? void 0 : K.description,
          fields: []
        }), P.push(j), ((X = Z.fieldGroup) == null ? void 0 : X.order) != null && k.set(j, Z.fieldGroup.order)), c.get(j).fields.push(Z);
      }
      return P.slice().sort((Z, j) => {
        const le = k.get(Z), ce = k.get(j);
        return le != null && ce != null ? le - ce : le != null ? -1 : ce != null ? 1 : P.indexOf(Z) - P.indexOf(j);
      }).map((Z) => c.get(Z));
    });
    return t({ validateAll: ee, clearErrors: J }), (c, P) => (i(), v("div", Ra, [
      (i(!0), v(re, null, ue(_.value, (k) => (i(), v("div", {
        key: k.id,
        class: "w-crud-form-group"
      }, [
        k.title ? (i(), v("div", Ta, [
          w("h3", Ia, R(k.title), 1),
          k.description ? (i(), v("p", Ya, R(k.description), 1)) : A("", !0)
        ])) : A("", !0),
        w("div", La, [
          (i(!0), v(re, null, ue(k.fields, (n) => Y(c.$slots, `field-${n.field}`, {
            key: n.field,
            field: n,
            formData: e.formData,
            isEditing: e.isEditing,
            setFormField: (b, K) => s("update:field", b, K)
          }, () => [
            n.type === "switch" ? (i(), v("div", za, [
              Q(D(Nt), {
                "model-value": e.formData[n.field],
                disabled: E(n),
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
              w("label", Na, R(n.switchLabel || n.label), 1)
            ])) : n.type === "color" ? (i(), v("div", Wa, [
              w("label", Oa, [
                Oe(R(n.label) + " ", 1),
                n.required ? (i(), v("span", ja, "*")) : A("", !0)
              ]),
              w("div", Ba, [
                Q(D(Wt), {
                  "model-value": L(n),
                  disabled: E(n),
                  "onUpdate:modelValue": (b) => I(n, b)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                Q(D(be), {
                  "model-value": e.formData[n.field],
                  class: "w-28",
                  maxlength: "7",
                  placeholder: "#000000",
                  disabled: E(n),
                  "onUpdate:modelValue": (b) => s("update:field", n.field, b)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
              ])
            ])) : n.type === "image" ? (i(), v("div", Ua, [
              w("label", qa, R(n.label), 1),
              Y(c.$slots, `image-${n.field}`, {
                field: n,
                formData: e.formData
              }, () => [
                w("input", {
                  type: "file",
                  accept: n.accept || "image/*",
                  disabled: E(n),
                  onChange: (b) => {
                    var X;
                    const K = ((X = b.target.files) == null ? void 0 : X[0]) ?? null;
                    s("update:field", n.field, K);
                  }
                }, null, 40, Ha)
              ])
            ])) : (i(), v("div", {
              key: 3,
              class: se(n.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
            }, [
              w("label", _a, [
                Oe(R(n.label) + " ", 1),
                n.required ? (i(), v("span", Ka, "*")) : A("", !0),
                r[n.field] ? (i(), v("i", Za)) : A("", !0)
              ]),
              (!n.type || n.type === "text") && n.mask ? Ve((i(), T(D(be), {
                key: 0,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: N(n) || void 0,
                placeholder: n.placeholder,
                disabled: E(n),
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
                [D(Ge), { mask: U(n.mask) }]
              ]) : !n.type || n.type === "text" ? (i(), T(D(be), {
                key: 1,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: N(n) || void 0,
                placeholder: n.placeholder,
                disabled: E(n),
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "email" ? (i(), T(D(be), {
                key: 2,
                "model-value": e.formData[n.field],
                type: "email",
                fluid: "",
                autofocus: N(n) || void 0,
                placeholder: n.placeholder,
                disabled: E(n),
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "password" ? (i(), T(D(Ot), {
                key: 3,
                "model-value": e.formData[n.field],
                fluid: "",
                "toggle-mask": "",
                feedback: n.feedback !== !1,
                placeholder: n.placeholder,
                disabled: E(n),
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "number" ? (i(), T(D(lt), {
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
                disabled: E(n),
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "currency" ? (i(), T(D(lt), {
                key: 5,
                "model-value": e.formData[n.field],
                fluid: "",
                mode: "currency",
                currency: "BRL",
                locale: "pt-BR",
                min: n.min,
                max: n.max,
                placeholder: n.placeholder,
                disabled: E(n),
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "select" ? (i(), T(D(zt), {
                key: 6,
                "model-value": e.formData[n.field],
                fluid: "",
                options: z(n.options),
                "option-label": n.optionLabel || "label",
                "option-value": n.optionValue || "value",
                "show-clear": n.showClear !== !1,
                placeholder: n.placeholder,
                disabled: E(n),
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "autocomplete" ? (i(), T(D(wt), {
                key: 7,
                "model-value": V(n),
                fluid: "",
                suggestions: p(n),
                "option-label": n.optionLabel || "label",
                placeholder: n.placeholder,
                disabled: E(n),
                onComplete: (b) => M(n, b),
                onItemSelect: (b) => H(n, b),
                onClear: (b) => s("update:field", n.field, null)
              }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : n.type === "fk" ? (i(), T(At, {
                key: 8,
                "model-value": e.formData[n.field],
                endpoint: n.endpoint,
                "endpoint-params": n.endpointParams,
                "option-label": n.optionLabel || "nome",
                placeholder: n.placeholder,
                disabled: E(n),
                "show-clear": n.showClear !== !1,
                "dialog-header": n.label,
                "crud-fields": n.crudFields,
                "crud-columns": n.crudColumns,
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "endpoint", "endpoint-params", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : n.type === "date" ? (i(), T(D(rt), {
                key: 9,
                "model-value": e.formData[n.field],
                fluid: "",
                "date-format": n.dateFormat || "dd/mm/yy",
                placeholder: n.placeholder,
                disabled: E(n),
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "datetime" ? (i(), T(D(rt), {
                key: 10,
                "model-value": e.formData[n.field],
                fluid: "",
                "show-time": "",
                "hour-format": n.hourFormat || "24",
                "date-format": n.dateFormat || "dd/mm/yy",
                placeholder: n.placeholder,
                disabled: E(n),
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "cpf_cnpj" ? (i(), T(D(be), {
                key: 11,
                "model-value": m(e.formData[n.field]),
                fluid: "",
                maxlength: "18",
                placeholder: n.placeholder || "000.000.000-00",
                disabled: E(n),
                invalid: !!l[n.field],
                onInput: (b) => u(n.field, b),
                onBlur: (b) => W(n)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : n.type === "mask" ? Ve((i(), T(D(be), {
                key: 12,
                "model-value": e.formData[n.field],
                fluid: "",
                placeholder: n.placeholder,
                disabled: E(n),
                invalid: !!l[n.field],
                "onUpdate:modelValue": (b) => s("update:field", n.field, b),
                onBlur: (b) => W(n)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
                [D(Ge), { mask: U(n.mask) }]
              ]) : n.type === "cep" ? Ve((i(), T(D(be), {
                key: 13,
                "model-value": e.formData[n.field],
                fluid: "",
                placeholder: n.placeholder || "00000-000",
                disabled: E(n),
                invalid: !!h[n.field],
                onInput: (b) => S(n, b)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput"])), [
                [D(Ge), { mask: "#####-###" }]
              ]) : n.type === "textarea" ? (i(), T(D(Lt), {
                key: 14,
                "model-value": e.formData[n.field],
                fluid: "",
                autofocus: N(n) || void 0,
                rows: n.rows || 3,
                placeholder: n.placeholder,
                disabled: E(n),
                "onUpdate:modelValue": (b) => s("update:field", n.field, b)
              }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : A("", !0),
              h[n.field] ? (i(), v("small", Ga, R(h[n.field]), 1)) : l[n.field] ? (i(), v("small", Ja, R(l[n.field]), 1)) : A("", !0)
            ], 2))
          ])), 128))
        ])
      ]))), 128))
    ]));
  }
}), Qa = { class: "w-crud-form-footer" }, nt = /* @__PURE__ */ ne({
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
    const a = e, o = t, s = O(null);
    function l() {
      s.value ? s.value.validateAll().length === 0 && o("save") : o("save");
    }
    return Je(
      () => a.visible,
      (r) => {
        r && s.value && s.value.clearErrors();
      }
    ), (r, h) => (i(), T(D(bt), {
      visible: e.visible,
      header: e.title,
      style: Ne({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": h[2] || (h[2] = (f) => o("update:visible", f))
    }, {
      default: ae(() => [
        w("form", {
          class: "w-crud-form",
          onSubmit: Tt(l, ["prevent"])
        }, [
          Q(Xa, {
            ref_key: "rendererRef",
            ref: s,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            disabled: e.disabled,
            "onUpdate:field": h[0] || (h[0] = (f, S) => o("update:field", f, S))
          }, Xe({ _: 2 }, [
            ue(e.fields, (f) => ({
              name: `field-${f.field}`,
              fn: ae((S) => [
                Y(r.$slots, `field-${f.field}`, Qe(et(S)))
              ])
            })),
            ue(e.fields.filter((f) => f.type === "image"), (f) => ({
              name: `image-${f.field}`,
              fn: ae((S) => [
                Y(r.$slots, `image-${f.field}`, Qe(et(S)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing", "disabled"]),
          w("div", Qa, [
            Y(r.$slots, "footer", {
              saving: e.saving,
              disabled: e.disabled
            }, () => [
              Q(D(ie), {
                type: "button",
                label: e.disabled ? "Fechar" : "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: h[1] || (h[1] = (f) => o("update:visible", !1))
              }, null, 8, ["label", "disabled"]),
              e.disabled ? A("", !0) : (i(), T(D(ie), {
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
}), eo = { class: "w-crud" }, to = {
  key: 0,
  class: "w-crud-header"
}, ao = { class: "w-crud-header-content" }, oo = { class: "w-crud-title" }, no = {
  key: 0,
  class: "w-crud-subtitle"
}, so = { class: "w-crud-header-actions" }, lo = {
  key: 0,
  class: "w-crud-kpis"
}, ro = { class: "w-crud-kpi-content" }, io = { class: "w-crud-kpi-label" }, uo = { class: "w-crud-kpi-value" }, co = { class: "w-crud-table" }, fo = { class: "w-crud-toolbar" }, mo = { class: "w-crud-toolbar-start" }, po = { class: "w-crud-toolbar-end" }, vo = { class: "w-crud-actions" }, go = /* @__PURE__ */ ne({
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
    const a = e, o = t, s = It(), { formatNumber: l } = at(), r = O({}), h = q(
      () => a.crud.config.columns.filter((u) => u.visible !== !1).map((u) => u.type === "number" && !u.align ? { ...u, align: "right" } : u.type === "currency" && !u.align ? { ...u, align: "right" } : u)
    );
    function f(u) {
      if (u.align === "right") return "text-right";
      if (u.align === "center") return "text-center";
    }
    const S = q(() => {
      const u = [];
      return a.crud.config.canCreate !== !1 && a.crud.config.canEdit !== !1 && u.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canDelete !== !1 && u.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), u;
    }), x = q(
      () => a.crud.config.rowActions ?? S.value
    ), E = q(() => x.value.length > 0 || !!s["row-actions"]);
    function z(u, g) {
      u.action === "edit" ? a.crud.openEditDialog(g) : u.action === "view" ? a.crud.openViewDialog(g) : u.action === "delete" ? a.crud.confirmDelete(g) : u.handler && u.handler(g);
    }
    function F(u, g) {
      return u.visible ? u.visible(g) : !0;
    }
    function N(u, g) {
      return u.disabled ? u.disabled(g) : !1;
    }
    const U = q(() => {
      const u = [];
      return a.showKpi && u.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: l(a.crud.pagination.rows, 0)
      }), u.push(...a.extraKpis), u;
    });
    q(() => a.crud.config.labels ?? {});
    const m = q(() => a.crud.config.canCreate !== !1);
    return Yt(() => {
      a.autoInit && a.crud.init();
    }), (u, g) => {
      const V = pt("tooltip");
      return i(), v("div", eo, [
        e.showHeader ? (i(), v("div", to, [
          w("div", ao, [
            w("h1", oo, R(e.title), 1),
            e.subtitle ? (i(), v("p", no, R(e.subtitle), 1)) : A("", !0)
          ]),
          w("div", so, [
            Y(u.$slots, "header-actions"),
            m.value ? (i(), T(D(ie), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: g[0] || (g[0] = (p) => e.crud.openCreateDialog())
            })) : A("", !0)
          ])
        ])) : A("", !0),
        Y(u.$slots, "before-table", {}, () => [
          U.value.length ? (i(), v("div", lo, [
            (i(!0), v(re, null, ue(U.value, (p, M) => (i(), v("div", {
              key: M,
              class: "w-crud-kpi"
            }, [
              w("div", {
                class: se(["w-crud-kpi-icon", p.severity ? `w-crud-kpi-icon--${p.severity}` : ""])
              }, [
                w("i", {
                  class: se([p.icon]),
                  style: Ne(p.color ? `color: ${p.color}` : "")
                }, null, 6)
              ], 2),
              w("div", ro, [
                w("div", io, R(p.label), 1),
                w("div", uo, R(p.value), 1)
              ])
            ]))), 128))
          ])) : A("", !0)
        ]),
        w("div", co, [
          Q(D(vt), {
            value: e.crud.items.value,
            loading: e.crud.loading.value,
            "expanded-rows": r.value,
            "onUpdate:expandedRows": g[2] || (g[2] = (p) => r.value = p),
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
            onSort: g[3] || (g[3] = (p) => e.crud.onSort({ sortField: p.sortField, sortOrder: p.sortOrder })),
            onRowExpand: g[4] || (g[4] = (p) => o("row-expand", p.data)),
            onRowCollapse: g[5] || (g[5] = (p) => o("row-collapse", p.data))
          }, Xe({
            header: ae(() => [
              w("div", fo, [
                w("div", mo, [
                  e.showSearch ? (i(), T(D(gt), { key: 0 }, {
                    default: ae(() => [
                      Q(D(ht), { class: "pi pi-search" }),
                      Q(D(be), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : A("", !0),
                  Y(u.$slots, "toolbar-start"),
                  Y(u.$slots, "toolbar-filters")
                ]),
                w("div", po, [
                  Y(u.$slots, "toolbar-actions"),
                  !e.showHeader && m.value ? (i(), T(D(ie), {
                    key: 0,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: g[1] || (g[1] = (p) => e.crud.openCreateDialog())
                  })) : A("", !0)
                ])
              ])
            ]),
            empty: ae(() => [
              Y(u.$slots, "empty", {}, () => [
                g[9] || (g[9] = w("div", { class: "w-crud-empty" }, [
                  w("div", { class: "w-crud-empty-icon" }, [
                    w("i", { class: "pi pi-inbox" })
                  ]),
                  w("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                  w("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                ], -1))
              ])
            ]),
            default: ae(() => [
              e.expandable ? (i(), T(D(Te), {
                key: 0,
                expander: "",
                style: { width: "3rem" }
              })) : A("", !0),
              (i(!0), v(re, null, ue(h.value, (p) => (i(), T(D(Te), {
                key: p.field,
                field: p.field,
                header: p.header,
                sortable: p.sortable,
                style: Ne(p.style),
                "header-class": f(p),
                "body-class": f(p)
              }, {
                body: ae(({ data: M }) => [
                  Y(u.$slots, `column-${p.field}`, {
                    data: M,
                    value: M[p.field]
                  }, () => [
                    Q(ot, {
                      column: p,
                      value: M[p.field],
                      "row-data": M
                    }, null, 8, ["column", "value", "row-data"])
                  ])
                ]),
                _: 2
              }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
              E.value ? (i(), T(D(Te), {
                key: 1,
                "header-class": "w-crud-actions-header",
                style: Ne({ width: `${(x.value.length + (D(s)["row-actions"] ? 1 : 0)) * 2.5 + 1}rem` })
              }, {
                body: ae(({ data: p }) => [
                  w("div", vo, [
                    (i(!0), v(re, null, ue(x.value, (M) => (i(), v(re, {
                      key: M.action
                    }, [
                      F(M, p) ? Ve((i(), T(D(ie), {
                        key: 0,
                        icon: M.icon,
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: M.severity,
                        disabled: N(M, p),
                        onClick: (H) => z(M, p)
                      }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                        [
                          V,
                          M.tooltip,
                          void 0,
                          { top: !0 }
                        ]
                      ]) : A("", !0)
                    ], 64))), 128)),
                    Y(u.$slots, "row-actions", {
                      data: p,
                      crud: e.crud
                    })
                  ])
                ]),
                _: 3
              }, 8, ["style"])) : A("", !0)
            ]),
            _: 2
          }, [
            e.expandable ? {
              name: "expansion",
              fn: ae((p) => [
                Y(u.$slots, "expansion", {
                  data: p.data
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "onPage"])
        ]),
        Y(u.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => {
          var p;
          return [
            Q(nt, {
              visible: e.crud.dialogVisible.value,
              title: e.crud.dialogTitle.value,
              fields: e.crud.config.form,
              "form-data": e.crud.formData,
              "is-editing": e.crud.isEditing.value,
              saving: e.crud.saving.value,
              disabled: ((p = e.crud.viewMode) == null ? void 0 : p.value) ?? !1,
              width: e.dialogWidth,
              "onUpdate:visible": g[6] || (g[6] = (M) => {
                e.crud.dialogVisible.value = M, M || (e.crud.editingItem.value = null);
              }),
              "onUpdate:field": g[7] || (g[7] = (M, H) => e.crud.setFormField(M, H)),
              onSave: g[8] || (g[8] = (M) => e.crud.save())
            }, Xe({ _: 2 }, [
              ue(e.crud.config.form, (M) => ({
                name: `field-${M.field}`,
                fn: ae((H) => [
                  Y(u.$slots, `field-${M.field}`, Qe(et(H)))
                ])
              }))
            ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "disabled", "width"])
          ];
        })
      ]);
    };
  }
}), ho = /* @__PURE__ */ ne({
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
    return (s, l) => (i(), T(D(yt), {
      value: o.value.label,
      severity: o.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), yo = { class: "w-page-header" }, bo = { class: "w-page-header-content" }, wo = { class: "w-page-header-title" }, ko = {
  key: 0,
  class: "w-page-header-subtitle"
}, $o = { class: "w-page-header-actions" }, Zn = /* @__PURE__ */ ne({
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
    return (o, s) => (i(), v("div", yo, [
      w("div", bo, [
        w("h2", wo, R(e.title), 1),
        e.subtitle ? (i(), v("p", ko, R(e.subtitle), 1)) : A("", !0)
      ]),
      w("div", $o, [
        Y(o.$slots, "actions"),
        e.actionLabel ? (i(), T(D(ie), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: s[0] || (s[0] = (l) => a("action"))
        }, null, 8, ["label", "icon"])) : A("", !0)
      ])
    ]));
  }
}), Do = { class: "w-empty-state" }, Co = { class: "w-empty-state-icon" }, So = { class: "w-empty-state-title" }, Po = {
  key: 0,
  class: "w-empty-state-description"
}, Gn = /* @__PURE__ */ ne({
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
    return (o, s) => (i(), v("div", Do, [
      w("div", Co, [
        w("i", {
          class: se(e.icon)
        }, null, 2)
      ]),
      w("p", So, R(e.title), 1),
      e.description ? (i(), v("p", Po, R(e.description), 1)) : A("", !0),
      e.actionLabel ? (i(), T(D(ie), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: s[0] || (s[0] = (l) => a("action"))
      }, null, 8, ["label", "icon"])) : A("", !0)
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
function Eo() {
  return Ae(xo);
}
const Mo = { class: "w-detail-header" }, Vo = { class: "w-detail-header-left" }, Ao = { class: "w-detail-header-content" }, Fo = { class: "w-detail-header-title" }, Ro = {
  key: 0,
  class: "w-detail-header-subtitle"
}, To = { class: "w-detail-header-actions" }, Jn = /* @__PURE__ */ ne({
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
    const t = e, a = Eo();
    function o() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (s, l) => (i(), v("div", Mo, [
      w("div", Vo, [
        Q(D(ie), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: o
        }),
        e.icon ? (i(), v("i", {
          key: 0,
          class: se([e.icon, "w-detail-header-icon"])
        }, null, 2)) : A("", !0),
        w("div", Ao, [
          w("h2", Fo, R(e.title), 1),
          e.subtitle ? (i(), v("p", Ro, R(e.subtitle), 1)) : A("", !0)
        ]),
        e.status ? (i(), T(ho, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : A("", !0)
      ]),
      w("div", To, [
        Y(s.$slots, "actions")
      ])
    ]));
  }
}), Io = { class: "w-info-card" }, Yo = {
  key: 0,
  class: "w-info-card-title"
}, Lo = { class: "w-info-card-grid" }, zo = { class: "w-info-card-label" }, No = { class: "w-info-card-value" }, Xn = /* @__PURE__ */ ne({
  __name: "WInfoCard",
  props: {
    title: {},
    fields: {}
  },
  setup(e) {
    const { formatCurrency: t, formatDate: a, formatNumber: o } = at();
    function s(l) {
      const r = l.value;
      return r == null || r === "" ? "-" : l.format === "currency" ? t(Number(r)) : l.format === "date" ? a(String(r)) : l.format === "datetime" ? a(String(r), "DD/MM/YYYY HH:mm") : l.format === "number" ? o(Number(r)) : String(r);
    }
    return (l, r) => (i(), v("div", Io, [
      e.title ? (i(), v("h3", Yo, R(e.title), 1)) : A("", !0),
      w("div", Lo, [
        (i(!0), v(re, null, ue(e.fields, (h) => (i(), v("div", {
          key: h.label,
          class: "w-info-card-field"
        }, [
          w("span", zo, R(h.label), 1),
          w("span", No, R(s(h)), 1)
        ]))), 128))
      ])
    ]));
  }
}), Wo = {
  key: 0,
  class: "w-kpi-card__loading"
}, Oo = { class: "w-kpi-card__loading-content" }, jo = { class: "w-kpi-card__header" }, Bo = {
  key: 0,
  class: "w-kpi-card__icon"
}, Uo = {
  key: 1,
  class: "w-kpi-card__trend"
}, qo = { class: "w-kpi-card__content" }, Ho = { class: "w-kpi-card__label" }, _o = { class: "w-kpi-card__value" }, Ko = {
  key: 0,
  class: "w-kpi-card__hint"
}, Zo = {
  key: 0,
  class: "w-kpi-card__footer"
}, Go = /* @__PURE__ */ ne({
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
    return (t, a) => (i(), v("article", {
      class: se(["w-kpi-card", e.severity ? `w-kpi-card--${e.severity}` : ""])
    }, [
      e.loading ? (i(), v("div", Wo, [
        Q(D(Be), {
          shape: "circle",
          size: "2.75rem"
        }),
        w("div", Oo, [
          Q(D(Be), {
            width: "6rem",
            height: "0.75rem"
          }),
          Q(D(Be), {
            width: "7.5rem",
            height: "1.5rem"
          }),
          Q(D(Be), {
            width: "5rem",
            height: "0.75rem"
          })
        ])
      ])) : (i(), v(re, { key: 1 }, [
        w("div", jo, [
          e.icon || t.$slots.icon ? (i(), v("div", Bo, [
            Y(t.$slots, "icon", {}, () => [
              e.icon ? (i(), v("i", {
                key: 0,
                class: se(e.icon)
              }, null, 2)) : A("", !0)
            ])
          ])) : A("", !0),
          e.trend || t.$slots.trend ? (i(), v("div", Uo, [
            Y(t.$slots, "trend", {}, () => [
              e.trend ? (i(), v("span", {
                key: 0,
                class: se(["w-kpi-card__trend-badge", e.trend.direction ? `w-kpi-card__trend-badge--${e.trend.direction}` : ""])
              }, R(e.trend.value), 3)) : A("", !0)
            ])
          ])) : A("", !0)
        ]),
        w("div", qo, [
          w("p", Ho, R(e.label), 1),
          w("div", _o, [
            Y(t.$slots, "value", {}, () => [
              Oe(R(e.value), 1)
            ])
          ]),
          e.hint || t.$slots.hint ? (i(), v("p", Ko, [
            Y(t.$slots, "hint", {}, () => [
              Oe(R(e.hint), 1)
            ])
          ])) : A("", !0)
        ]),
        t.$slots.footer ? (i(), v("footer", Zo, [
          Y(t.$slots, "footer")
        ])) : A("", !0)
      ], 64))
    ], 2));
  }
}), Qn = /* @__PURE__ */ ne({
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
    return (o, s) => (i(), v("div", {
      class: se(["w-kpi-grid", a.value])
    }, [
      o.$slots.item ? (i(!0), v(re, { key: 0 }, ue(e.items, (l, r) => Y(o.$slots, "item", {
        key: r,
        item: l,
        index: r
      })), 128)) : (i(!0), v(re, { key: 1 }, ue(e.items, (l, r) => (i(), T(Go, {
        key: r,
        label: l.label,
        value: l.value,
        icon: l.icon,
        severity: l.severity || "primary",
        hint: l.hint,
        trend: l.trend,
        loading: l.loading
      }, null, 8, ["label", "value", "icon", "severity", "hint", "trend", "loading"]))), 128))
    ], 2));
  }
}), Jo = { class: "w-section-header__main" }, Xo = {
  key: 0,
  class: "w-section-header__icon"
}, Qo = { class: "w-section-header__content" }, en = { class: "w-section-header__title-row" }, tn = { class: "w-section-header__title" }, an = {
  key: 0,
  class: "w-section-header__subtitle"
}, on = {
  key: 0,
  class: "w-section-header__actions"
}, es = /* @__PURE__ */ ne({
  __name: "WSectionHeader",
  props: {
    title: {},
    subtitle: {},
    icon: {},
    compact: { type: Boolean }
  },
  setup(e) {
    return (t, a) => (i(), v("div", {
      class: se(["w-section-header", { "w-section-header--compact": e.compact }])
    }, [
      w("div", Jo, [
        e.icon || t.$slots.icon ? (i(), v("div", Xo, [
          Y(t.$slots, "icon", {}, () => [
            e.icon ? (i(), v("i", {
              key: 0,
              class: se(e.icon)
            }, null, 2)) : A("", !0)
          ])
        ])) : A("", !0),
        w("div", Qo, [
          w("div", en, [
            w("h3", tn, R(e.title), 1),
            Y(t.$slots, "meta")
          ]),
          e.subtitle ? (i(), v("p", an, R(e.subtitle), 1)) : A("", !0)
        ])
      ]),
      t.$slots.actions ? (i(), v("div", on, [
        Y(t.$slots, "actions")
      ])) : A("", !0)
    ], 2));
  }
}), nn = {
  key: 0,
  class: "w-form-section__header"
}, sn = { class: "w-form-section__content" }, ln = { class: "w-form-section__title" }, rn = {
  key: 0,
  class: "w-form-section__description"
}, un = {
  key: 0,
  class: "w-form-section__actions"
}, cn = { class: "w-form-section__body" }, ts = /* @__PURE__ */ ne({
  __name: "WFormSection",
  props: {
    title: {},
    description: {},
    variant: {}
  },
  setup(e) {
    return (t, a) => (i(), v("section", {
      class: se(["w-form-section", e.variant ? `w-form-section--${e.variant}` : ""])
    }, [
      e.title || e.description || t.$slots.actions ? (i(), v("div", nn, [
        w("div", sn, [
          w("h3", ln, R(e.title), 1),
          e.description ? (i(), v("p", rn, R(e.description), 1)) : A("", !0)
        ]),
        t.$slots.actions ? (i(), v("div", un, [
          Y(t.$slots, "actions")
        ])) : A("", !0)
      ])) : A("", !0),
      w("div", cn, [
        Y(t.$slots, "default")
      ])
    ], 2));
  }
}), dn = {
  key: 0,
  class: "w-action-bar__primary"
}, fn = {
  key: 1,
  class: "w-action-bar__filters"
}, mn = {
  key: 2,
  class: "w-action-bar__secondary"
}, as = /* @__PURE__ */ ne({
  __name: "WActionBar",
  props: {
    align: { default: "between" },
    stackOnMobile: { type: Boolean, default: !0 }
  },
  setup(e) {
    return (t, a) => (i(), v("div", {
      class: se(["w-action-bar", [
        `w-action-bar--${e.align}`,
        { "w-action-bar--stack": e.stackOnMobile }
      ]])
    }, [
      t.$slots.primary || t.$slots.default ? (i(), v("div", dn, [
        Y(t.$slots, "primary", {}, () => [
          Y(t.$slots, "default")
        ])
      ])) : A("", !0),
      t.$slots.filters ? (i(), v("div", fn, [
        Y(t.$slots, "filters")
      ])) : A("", !0),
      t.$slots.secondary ? (i(), v("div", mn, [
        Y(t.$slots, "secondary")
      ])) : A("", !0)
    ], 2));
  }
}), pn = { class: "w-progress-flow__marker" }, vn = { class: "w-progress-flow__content" }, gn = { class: "w-progress-flow__label" }, hn = {
  key: 0,
  class: "w-progress-flow__description"
}, os = /* @__PURE__ */ ne({
  __name: "WProgressFlow",
  props: {
    steps: {},
    currentStep: {},
    orientation: { default: "horizontal" }
  },
  setup(e) {
    const t = e, a = q(
      () => t.steps.findIndex((s) => s.key === t.currentStep)
    );
    function o(s) {
      return s < a.value ? "done" : s === a.value ? "current" : "pending";
    }
    return (s, l) => (i(), v("div", {
      class: se(["w-progress-flow", `w-progress-flow--${e.orientation}`])
    }, [
      (i(!0), v(re, null, ue(e.steps, (r, h) => (i(), v("div", {
        key: r.key,
        class: se(["w-progress-flow__step", `w-progress-flow__step--${o(h)}`])
      }, [
        Y(s.$slots, "step", {
          step: r,
          index: h,
          state: o(h)
        }, () => [
          w("div", pn, [
            w("span", null, R(h + 1), 1)
          ]),
          w("div", vn, [
            w("p", gn, R(r.label), 1),
            r.description ? (i(), v("p", hn, R(r.description), 1)) : A("", !0)
          ])
        ])
      ], 2))), 128))
    ], 2));
  }
});
function yn(e, t, a) {
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
function bn(e) {
  return {
    async list(t, a = {}) {
      const o = await e.get(t, { params: a });
      return yn(
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
    async update(t, a, o, s) {
      return { data: (await e.patch(
        `${t}${a}/`,
        o,
        s
      )).data };
    },
    async delete(t, a) {
      await e.delete(`${t}${a}/`);
    }
  };
}
const ns = {
  install(e, t) {
    if (!(t != null && t.axios) && !(t != null && t.dataProvider))
      throw new Error(
        '[wPrimeVueComponents] Informe "axios" ou "dataProvider" ao registrar o WPrimeVuePlugin.'
      );
    const a = t.dataProvider ?? bn(t.axios), o = {
      axios: t.axios,
      dataProvider: a,
      defaultPageSize: t.defaultPageSize ?? 20,
      dateFormat: t.dateFormat ?? "DD/MM/YYYY",
      dateTimeFormat: t.dateTimeFormat ?? "DD/MM/YYYY HH:mm",
      locale: t.locale ?? "pt-BR",
      currency: t.currency ?? "BRL"
    };
    t.axios && e.provide(Ut, t.axios), e.provide(_e, a), e.provide(Ke, o), t.registerComponents !== !1 && (e.component("WCrudView", go), e.component("WCrudFormDialog", nt), e.component("WCrudColumnRenderer", ot), e.component("WAutoCompleteFK", At));
  }
}, wn = {
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
function ss(e) {
  const {
    endpoint: t,
    columns: a,
    form: o,
    pk: s = "id",
    searchDebounce: l = 300,
    canCreate: r = !0,
    canEdit: h = !0,
    canDelete: f = !0,
    rowActions: S = void 0,
    filterParams: x = void 0,
    createDefaults: E = void 0,
    transformPayload: z = void 0,
    onAfterSave: F = void 0,
    onAfterDelete: N = void 0
  } = e, U = Ae(_e);
  if (!U)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const m = U, u = Ae(Ke), g = e.pageSize ?? (u == null ? void 0 : u.defaultPageSize) ?? 20, V = { ...wn, ...e.labels }, p = Mt(), { confirmDelete: M } = Vt(), H = O([]), L = O({}), I = O(!1), W = O(!1), ee = O(""), J = O(!1), _ = O(!1), c = O(null), P = me({}), k = me({
    page: 1,
    pageSize: g,
    rows: 0,
    totalPages: 0
  }), n = me({
    field: null,
    order: 0
  });
  function b() {
    const d = {};
    for (const C of o)
      d[C.field] = C.defaultValue !== void 0 ? typeof C.defaultValue == "function" ? C.defaultValue() : C.defaultValue : null;
    return d;
  }
  const K = b();
  for (const d of Object.keys(K))
    P[d] = K[d];
  const X = q(
    () => c.value !== null && !_.value
  ), Z = q(() => _.value), j = q(
    () => _.value ? V.viewTitle ?? "Visualizar Registro" : X.value ? V.editTitle : V.createTitle
  ), le = q(() => k.page <= 1), ce = q(() => k.page >= k.totalPages);
  let $e = null;
  async function pe(d = {}) {
    I.value = !0;
    try {
      const C = {
        page: k.page,
        page_size: k.pageSize,
        ...d
      };
      ee.value && (C.search = ee.value), n.field && n.order !== 0 && (C.ordering = n.order === -1 ? `-${n.field}` : n.field), x && Object.assign(C, x());
      const B = await m.list(t, C);
      H.value = B.data, k.rows = B.rows, L.value = B.extras ?? {}, B.page && (k.page = B.page), B.page_size && (k.pageSize = B.page_size), k.totalPages = Math.ceil(k.rows / k.pageSize) || 0;
    } finally {
      I.value = !1;
    }
  }
  async function he() {
    await pe();
  }
  async function De() {
    await pe();
  }
  function de(d) {
    ee.value = d, $e && clearTimeout($e), $e = setTimeout(() => {
      k.page = 1, pe();
    }, l);
  }
  function fe(d) {
    const C = d.target;
    de(C.value);
  }
  function ge(d) {
    k.page = d, pe();
  }
  function Ce() {
    ge(1);
  }
  function Se() {
    ge(k.totalPages);
  }
  function Pe(d) {
    k.page = d.page + 1, k.pageSize = d.rows, pe();
  }
  function we(d) {
    n.field = d.sortField ?? null, n.order = d.sortOrder ?? 0, k.page = 1, pe();
  }
  function ye() {
    const d = b();
    for (const C of Object.keys(d))
      P[C] = d[C];
  }
  function xe(d, C) {
    P[d] = C;
  }
  function Ee() {
    if (_.value = !1, c.value = null, ye(), E) {
      const d = E();
      for (const [C, B] of Object.entries(d))
        P[C] = B;
    }
    J.value = !0;
  }
  function Me(d) {
    _.value = !1, c.value = d;
    for (const C of o) {
      let B = d[C.field] !== void 0 ? d[C.field] : null;
      B && (C.type === "date" || C.type === "datetime") && typeof B == "string" && (B = tt(B)), P[C.field] = B;
    }
    J.value = !0;
  }
  function y(d) {
    _.value = !0, c.value = d;
    for (const C of o) {
      let B = d[C.field] !== void 0 ? d[C.field] : null;
      B && (C.type === "date" || C.type === "datetime") && typeof B == "string" && (B = tt(B)), P[C.field] = B;
    }
    J.value = !0;
  }
  async function $() {
    for (const d of o) {
      if (d.validate) {
        const C = d.validate(P[d.field]);
        if (C)
          return p.error(C), null;
      }
      if (d.required) {
        const C = P[d.field];
        if (C == null || C === "")
          return p.error(`${d.label} é obrigatório`), null;
      }
    }
    W.value = !0;
    try {
      let d = { ...P };
      !X.value && E && Object.assign(d, E());
      for (const te of o) {
        const oe = d[te.field];
        if (te.type === "date" && oe instanceof Date ? d[te.field] = kt(oe) : te.type === "datetime" && oe instanceof Date && (d[te.field] = $t(oe)), te.type === "fk" && oe !== null && typeof oe == "object") {
          const ve = te.optionValue || "id";
          d[te.field] = oe[ve] ?? oe;
        }
        (te.type === "mask" || te.type === "cpf_cnpj") && typeof oe == "string" && (d[te.field] = ke(oe));
      }
      z && (d = z(d, X.value));
      const C = o.some(
        (te) => te.type === "image" && d[te.field] instanceof File
      );
      let B = d, Ie;
      if (C) {
        const te = new Set(
          o.filter((ve) => ve.type === "image").map((ve) => ve.field)
        ), oe = new FormData();
        for (const [ve, Ye] of Object.entries(d))
          if (Ye != null)
            if (Ye instanceof File)
              oe.append(ve, Ye);
            else {
              if (te.has(ve))
                continue;
              oe.append(ve, String(Ye));
            }
        B = oe, Ie = { "Content-Type": "multipart/form-data" };
      }
      const st = Ie ? { headers: Ie } : void 0;
      let Re;
      if (X.value && c.value) {
        const te = c.value[s];
        Re = await m.update(
          t,
          te,
          B,
          st
        );
        const oe = H.value.findIndex((ve) => ve[s] === te);
        oe !== -1 && (H.value[oe] = Re.data), p.success(V.successUpdate);
      } else
        Re = await m.create(t, B, st), H.value.unshift(Re.data), k.rows++, p.success(V.successCreate);
      return J.value = !1, c.value = null, F && F(Re.data, X.value), Re.data;
    } catch (d) {
      return p.error(je(d, "Erro ao salvar registro")), null;
    } finally {
      W.value = !1;
    }
  }
  function G(d) {
    M(async () => {
      try {
        const C = d[s];
        await m.delete(t, C);
        const B = H.value.findIndex((Ie) => Ie[s] === C);
        B !== -1 && (H.value.splice(B, 1), k.rows--), p.success(V.successDelete), N && N(d);
      } catch (C) {
        p.error(je(C, "Erro ao excluir registro"));
      }
    }, V.deleteConfirmMessage);
  }
  return {
    items: H,
    extras: L,
    loading: I,
    saving: W,
    search: ee,
    dialogVisible: J,
    editingItem: c,
    formData: P,
    pagination: k,
    sort: n,
    isEditing: X,
    isViewing: Z,
    viewMode: _,
    dialogTitle: j,
    isFirstPage: le,
    isLastPage: ce,
    init: he,
    fetchItems: pe,
    refresh: De,
    setSearch: de,
    onSearch: fe,
    onPage: Pe,
    onSort: we,
    openCreateDialog: Ee,
    openEditDialog: Me,
    openViewDialog: y,
    save: $,
    confirmDelete: G,
    setFormField: xe,
    resetForm: ye,
    goToPage: ge,
    firstPage: Ce,
    lastPage: Se,
    config: e
  };
}
function ls(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: o = !1 } = e, s = Ae(_e);
  if (!s)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const l = s, r = Ae(Ke), h = e.pageSize ?? (r == null ? void 0 : r.defaultPageSize) ?? 20, f = O([]), S = O(!1), x = O(""), E = O({}), z = me({}), F = me({
    page: 1,
    pageSize: h,
    rows: 0,
    totalPages: 0
  }), N = me({
    field: null,
    order: 0
  });
  let U = null;
  async function m(L = {}) {
    S.value = !0;
    try {
      const I = {
        page: F.page,
        page_size: F.pageSize,
        ...L
      };
      x.value && (I.search = x.value), N.field && N.order !== 0 && (I.ordering = N.order === -1 ? `-${N.field}` : N.field);
      for (const [ee, J] of Object.entries(z))
        J != null && J !== "" && (I[ee] = J);
      const W = await l.list(t, I);
      f.value = W.data, F.rows = W.rows, W.page && (F.page = W.page), W.page_size && (F.pageSize = W.page_size), F.totalPages = Math.ceil(F.rows / F.pageSize) || 0, E.value = W.extras ?? {};
    } finally {
      S.value = !1;
    }
  }
  async function u() {
    await m();
  }
  function g(L) {
    x.value = L, U && clearTimeout(U), U = setTimeout(() => {
      F.page = 1, m();
    }, a);
  }
  function V(L, I) {
    z[L] = I, F.page = 1, m();
  }
  function p() {
    for (const L of Object.keys(z))
      delete z[L];
    F.page = 1, m();
  }
  function M(L) {
    F.page = L.page + 1, F.pageSize = L.rows, m();
  }
  function H(L) {
    N.field = L.sortField ?? null, N.order = L.sortOrder ?? 0, F.page = 1, m();
  }
  return o && m(), {
    items: f,
    loading: S,
    search: x,
    pagination: F,
    sort: N,
    extras: E,
    fetchItems: m,
    refresh: u,
    setSearch: g,
    setFilter: V,
    clearFilters: p,
    onPage: M,
    onSort: H
  };
}
function kn(e) {
  return e.split("?")[0].replace(/^\/+|\/+$/g, "").replace(/^api\/v\d+\//, "");
}
function $n(e) {
  return typeof e == "string" ? { table: e } : e;
}
function Ft(e, t = 400) {
  return {
    response: {
      status: t,
      data: { detail: e }
    },
    message: e
  };
}
function mt(e) {
  if (e instanceof FormData)
    throw Ft(
      "SupabaseDataProvider nao envia FormData diretamente. Faça upload do arquivo no Storage e envie a URL/caminho no payload."
    );
  return e;
}
function Le(e) {
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
function ze(e, t) {
  var s, l;
  const a = kn(e), o = (s = t.resources) == null ? void 0 : s[a];
  if (o)
    return $n(o);
  if ((l = t.allowedTables) != null && l.includes(a))
    return { table: a };
  throw Ft(
    `Recurso Supabase nao registrado para o endpoint "${e}".`,
    404
  );
}
function Dn(e, t, a) {
  const o = /* @__PURE__ */ new Set(["page", "page_size", "search", "ordering"]), s = { ...a.defaultFilters, ...t };
  for (const [l, r] of Object.entries(s))
    o.has(l) || r === null || r === void 0 || r === "" || (e = e.eq(l, r));
  return e;
}
function Cn(e, t, a) {
  if (typeof t != "string" || !t.trim() || !(a != null && a.length))
    return e;
  const o = t.trim().replace(/,/g, "\\,"), s = a.map((l) => `${l}.ilike.%${o}%`).join(",");
  return e.or(s);
}
function Sn(e, t) {
  const a = typeof e == "string" && e ? e : t;
  return a ? {
    field: a.startsWith("-") ? a.slice(1) : a,
    ascending: !a.startsWith("-")
  } : null;
}
function Pn(e, t) {
  return e ? t.mapListItem ? e.map(
    (a) => {
      var o;
      return (o = t.mapListItem) == null ? void 0 : o.call(t, a);
    }
  ) : e : [];
}
function rs(e) {
  const t = e.defaultSelect ?? "*";
  return {
    async list(a, o = {}) {
      var z;
      const s = ze(a, e), l = Math.max(Number(o.page ?? 1), 1), r = Math.max(Number(o.page_size ?? 20), 1), h = (l - 1) * r, f = h + r - 1;
      let S = e.client.from(s.table).select(s.select ?? t, { count: "exact" });
      S = Dn(S, o, s), S = Cn(S, o.search, s.searchFields);
      const x = Sn(o.ordering, s.defaultOrdering);
      x && (S = S.order(x.field, { ascending: x.ascending }));
      const E = await S.range(h, f);
      return E.error && Le(E.error), {
        data: Pn(E.data, s),
        page: l,
        page_size: r,
        rows: E.count ?? ((z = E.data) == null ? void 0 : z.length) ?? 0,
        extras: {}
      };
    },
    async get(a, o, s) {
      const l = ze(a, e), r = l.pk ?? "id", h = await e.client.from(l.table).select(l.select ?? t).eq(r, o).single();
      return h.error && Le(h.error), { data: h.data };
    },
    async create(a, o, s) {
      const l = ze(a, e), r = mt(o), h = l.mapPayload ? l.mapPayload(r, "create") : r, f = await e.client.from(l.table).insert(h).select(l.select ?? t).single();
      return f.error && Le(f.error), { data: f.data };
    },
    async update(a, o, s, l) {
      const r = ze(a, e), h = r.pk ?? "id", f = mt(s), S = r.mapPayload ? r.mapPayload(f, "update") : f, x = await e.client.from(r.table).update(S).eq(h, o).select(r.select ?? t).single();
      return x.error && Le(x.error), { data: x.data };
    },
    async delete(a, o) {
      const s = ze(a, e), l = s.pk ?? "id", r = s.softDelete === !0 ? { is_active: !1 } : typeof s.softDelete == "object" ? s.softDelete : null, h = r ? await e.client.from(s.table).update(r).eq(l, o) : await e.client.from(s.table).delete().eq(l, o);
      h.error && Le(h.error);
    }
  };
}
export {
  wn as DEFAULT_CRUD_LABELS,
  as as WActionBar,
  At as WAutoCompleteFK,
  ot as WCrudColumnRenderer,
  nt as WCrudFormDialog,
  go as WCrudView,
  Jn as WDetailHeader,
  Gn as WEmptyState,
  Xa as WFormRenderer,
  ts as WFormSection,
  Xn as WInfoCard,
  Go as WKpiCard,
  Qn as WKpiGrid,
  Zn as WPageHeader,
  ns as WPrimeVuePlugin,
  os as WProgressFlow,
  es as WSectionHeader,
  ho as WStatusTag,
  Ut as W_AXIOS_KEY,
  Ke as W_CONFIG_KEY,
  _e as W_DATA_PROVIDER_KEY,
  bn as createAxiosDataProvider,
  rs as createSupabaseDataProvider,
  je as extractApiError,
  $a as mapApiFieldToColumnDef,
  ba as mapApiFieldToFieldDef,
  Da as mapApiFieldsToColumnDefs,
  wa as mapApiFieldsToFieldDefs,
  ls as useApi,
  Kn as useApiError,
  Vt as useAppConfirm,
  Mt as useAppToast,
  ss as useCrudManager,
  at as useFormatters
};
//# sourceMappingURL=index.js.map
