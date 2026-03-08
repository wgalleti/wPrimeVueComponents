import { inject as Ee, defineComponent as ue, openBlock as g, createElementBlock as E, createBlock as F, unref as k, toDisplayString as B, ref as R, watch as qe, computed as W, reactive as ve, resolveDirective as ut, Fragment as me, createElementVNode as x, createVNode as H, withDirectives as Ae, withCtx as J, createCommentVNode as j, renderList as pe, normalizeStyle as Re, createTextVNode as He, renderSlot as Z, normalizeClass as Le, isRef as Vt, withModifiers as Et, createSlots as Ke, normalizeProps as Ze, guardReactiveProps as Je, onMounted as Pt } from "vue";
import dt from "primevue/datatable";
import Fe from "primevue/column";
import ae from "primevue/button";
import be from "primevue/inputtext";
import ct from "primevue/iconfield";
import ft from "primevue/inputicon";
import mt from "primevue/tag";
import Pe from "dayjs";
import pt from "primevue/dialog";
import tt from "primevue/inputnumber";
import Mt from "primevue/textarea";
import At from "primevue/select";
import vt from "primevue/autocomplete";
import at from "primevue/datepicker";
import Ft from "primevue/toggleswitch";
import Tt from "primevue/colorpicker";
import Yt from "primevue/password";
import { useToast as Rt } from "primevue/usetoast";
import { useConfirm as It } from "primevue/useconfirm";
const Oe = Symbol("w-axios"), We = Symbol("w-config");
function Lt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var je = { exports: {} }, Nt = je.exports, ot;
function zt() {
  return ot || (ot = 1, (function(e, t) {
    (function(a, o) {
      e.exports = o();
    })(Nt, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, o = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, r = /\d/, s = /\d\d/, u = /\d\d?/, h = /\d*[^-_:/,()\s\d]+/, m = {}, $ = function(n) {
        return (n = +n) + (n > 68 ? 1900 : 2e3);
      }, S = function(n) {
        return function(p) {
          this[n] = +p;
        };
      }, N = [/[+-]\d\d:?(\d\d)?|Z/, function(n) {
        (this.zone || (this.zone = {})).offset = (function(p) {
          if (!p || p === "Z") return 0;
          var C = p.match(/([+-]|\d\d)/g), f = 60 * C[1] + (+C[2] || 0);
          return f === 0 ? 0 : C[0] === "+" ? -f : f;
        })(n);
      }], U = function(n) {
        var p = m[n];
        return p && (p.indexOf ? p : p.s.concat(p.f));
      }, V = function(n, p) {
        var C, f = m.meridiem;
        if (f) {
          for (var w = 1; w <= 24; w += 1) if (n.indexOf(f(w, 0, p)) > -1) {
            C = w > 12;
            break;
          }
        } else C = n === (p ? "pm" : "PM");
        return C;
      }, I = { A: [h, function(n) {
        this.afternoon = V(n, !1);
      }], a: [h, function(n) {
        this.afternoon = V(n, !0);
      }], Q: [r, function(n) {
        this.month = 3 * (n - 1) + 1;
      }], S: [r, function(n) {
        this.milliseconds = 100 * +n;
      }], SS: [s, function(n) {
        this.milliseconds = 10 * +n;
      }], SSS: [/\d{3}/, function(n) {
        this.milliseconds = +n;
      }], s: [u, S("seconds")], ss: [u, S("seconds")], m: [u, S("minutes")], mm: [u, S("minutes")], H: [u, S("hours")], h: [u, S("hours")], HH: [u, S("hours")], hh: [u, S("hours")], D: [u, S("day")], DD: [s, S("day")], Do: [h, function(n) {
        var p = m.ordinal, C = n.match(/\d+/);
        if (this.day = C[0], p) for (var f = 1; f <= 31; f += 1) p(f).replace(/\[|\]/g, "") === n && (this.day = f);
      }], w: [u, S("week")], ww: [s, S("week")], M: [u, S("month")], MM: [s, S("month")], MMM: [h, function(n) {
        var p = U("months"), C = (U("monthsShort") || p.map((function(f) {
          return f.slice(0, 3);
        }))).indexOf(n) + 1;
        if (C < 1) throw new Error();
        this.month = C % 12 || C;
      }], MMMM: [h, function(n) {
        var p = U("months").indexOf(n) + 1;
        if (p < 1) throw new Error();
        this.month = p % 12 || p;
      }], Y: [/[+-]?\d+/, S("year")], YY: [s, function(n) {
        this.year = $(n);
      }], YYYY: [/\d{4}/, S("year")], Z: N, ZZ: N };
      function z(n) {
        var p, C;
        p = n, C = m && m.formats;
        for (var f = (n = p.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(l, d, A) {
          var M = A && A.toUpperCase();
          return d || C[A] || a[A] || C[M].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(Y, q, te) {
            return q || te.slice(1);
          }));
        }))).match(o), w = f.length, P = 0; P < w; P += 1) {
          var G = f[P], T = I[G], i = T && T[0], D = T && T[1];
          f[P] = D ? { regex: i, parser: D } : G.replace(/^\[|\]$/g, "");
        }
        return function(l) {
          for (var d = {}, A = 0, M = 0; A < w; A += 1) {
            var Y = f[A];
            if (typeof Y == "string") M += Y.length;
            else {
              var q = Y.regex, te = Y.parser, de = l.slice(M), X = q.exec(de)[0];
              te.call(d, X), l = l.replace(X, "");
            }
          }
          return (function(oe) {
            var le = oe.afternoon;
            if (le !== void 0) {
              var _ = oe.hours;
              le ? _ < 12 && (oe.hours += 12) : _ === 12 && (oe.hours = 0), delete oe.afternoon;
            }
          })(d), d;
        };
      }
      return function(n, p, C) {
        C.p.customParseFormat = !0, n && n.parseTwoDigitYear && ($ = n.parseTwoDigitYear);
        var f = p.prototype, w = f.parse;
        f.parse = function(P) {
          var G = P.date, T = P.utc, i = P.args;
          this.$u = T;
          var D = i[1];
          if (typeof D == "string") {
            var l = i[2] === !0, d = i[3] === !0, A = l || d, M = i[2];
            d && (M = i[2]), m = this.$locale(), !l && M && (m = C.Ls[M]), this.$d = (function(de, X, oe, le) {
              try {
                if (["x", "X"].indexOf(X) > -1) return new Date((X === "X" ? 1e3 : 1) * de);
                var _ = z(X)(de), ke = _.year, ie = _.month, ne = _.day, Te = _.hours, ce = _.minutes, ge = _.seconds, re = _.milliseconds, ee = _.zone, he = _.week, $e = /* @__PURE__ */ new Date(), De = ne || (ke || ie ? 1 : $e.getDate()), Ce = ke || $e.getFullYear(), fe = 0;
                ke && !ie || (fe = ie > 0 ? ie - 1 : $e.getMonth());
                var ye, xe = Te || 0, Se = ce || 0, Ve = ge || 0, y = re || 0;
                return ee ? new Date(Date.UTC(Ce, fe, De, xe, Se, Ve, y + 60 * ee.offset * 1e3)) : oe ? new Date(Date.UTC(Ce, fe, De, xe, Se, Ve, y)) : (ye = new Date(Ce, fe, De, xe, Se, Ve, y), he && (ye = le(ye).week(he).toDate()), ye);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(G, D, T, C), this.init(), M && M !== !0 && (this.$L = this.locale(M).$L), A && G != this.format(D) && (this.$d = /* @__PURE__ */ new Date("")), m = {};
          } else if (D instanceof Array) for (var Y = D.length, q = 1; q <= Y; q += 1) {
            i[1] = D[q - 1];
            var te = C.apply(this, i);
            if (te.isValid()) {
              this.$d = te.$d, this.$L = te.$L, this.init();
              break;
            }
            q === Y && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else w.call(this, P);
        };
      };
    }));
  })(je)), je.exports;
}
var jt = zt();
const Ut = /* @__PURE__ */ Lt(jt);
Pe.extend(Ut);
function Xe(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const t = Pe(e, "YYYY-MM-DD", !0);
  return t.isValid() ? t.toDate() : Pe(e).toDate();
}
function gt(e) {
  return e ? typeof e == "string" ? e : Pe(e).format("YYYY-MM-DD") : null;
}
function ht(e) {
  return e ? typeof e == "string" ? e : Pe(e).toISOString() : null;
}
function Ot(e, t = "DD/MM/YYYY") {
  return e ? Pe(e).format(t) : "—";
}
function Wt(e) {
  return e ? Pe(e).format("DD/MM/YYYY HH:mm") : "—";
}
function we(e) {
  return e.replace(/\D/g, "");
}
function yt(e) {
  if (!e) return "—";
  const t = we(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function bt(e) {
  if (!e) return "—";
  const t = we(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function Bt(e) {
  if (!e) return "—";
  const t = we(e);
  return t.length === 11 ? yt(e) : t.length === 14 ? bt(e) : e;
}
function qt(e) {
  if (!e) return "—";
  const t = we(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function wt(e) {
  if (!e) return null;
  const t = we(e);
  if (t.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(t)) return "CPF inválido.";
  let a = 0;
  for (let u = 0; u < 9; u++) a += parseInt(t[u]) * (10 - u);
  let o = a % 11;
  const r = o < 2 ? 0 : 11 - o;
  if (parseInt(t[9]) !== r) return "CPF inválido.";
  a = 0;
  for (let u = 0; u < 10; u++) a += parseInt(t[u]) * (11 - u);
  o = a % 11;
  const s = o < 2 ? 0 : 11 - o;
  return parseInt(t[10]) !== s ? "CPF inválido." : null;
}
function kt(e) {
  if (!e) return null;
  const t = we(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let o = 0;
  for (let m = 0; m < 12; m++) o += parseInt(t[m]) * a[m];
  let r = o % 11;
  const s = r < 2 ? 0 : 11 - r;
  if (parseInt(t[12]) !== s) return "CNPJ inválido.";
  const u = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  o = 0;
  for (let m = 0; m < 13; m++) o += parseInt(t[m]) * u[m];
  r = o % 11;
  const h = r < 2 ? 0 : 11 - r;
  return parseInt(t[13]) !== h ? "CNPJ inválido." : null;
}
function Ht(e) {
  if (!e) return null;
  const t = we(e);
  return t.length === 11 ? wt(e) : t.length === 14 ? kt(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const Ue = /* @__PURE__ */ new Map();
function lt(e, t) {
  const a = `${e}-${t}`;
  let o = Ue.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }), Ue.set(a, o)), o;
}
function Kt(e, t) {
  const a = `${e}-${t}`;
  let o = Ue.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    style: "currency",
    currency: t
  }), Ue.set(a, o)), o;
}
function Qe() {
  const e = Ee(We, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), t = (e == null ? void 0 : e.locale) ?? "pt-BR", a = (e == null ? void 0 : e.currency) ?? "BRL";
  function o(m) {
    return m == null ? "—" : Kt(t, a).format(m);
  }
  function r(m, $ = 2) {
    return m == null ? "—" : lt(t, $).format(m);
  }
  function s(m, $) {
    return Ot(m, $ ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function u(m) {
    return Wt(m);
  }
  function h(m) {
    return m == null ? "—" : `${lt(t, 2).format(m)}%`;
  }
  return {
    formatCurrency: o,
    formatNumber: r,
    formatDate: s,
    formatDateTime: u,
    formatPercent: h,
    formatCpf: yt,
    formatCnpj: bt,
    formatCpfCnpj: Bt,
    formatTelefone: qt,
    validateCpf: wt,
    validateCnpj: kt,
    validateCpfCnpj: Ht,
    parseDate: Xe,
    toDateString: gt,
    toDateTimeString: ht
  };
}
const Zt = {
  key: 0,
  class: "text-muted-color text-xs"
}, Jt = ["src", "alt"], Xt = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, Qt = {
  key: 4,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, Gt = {
  key: 5,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, _t = {
  key: 6,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, ea = {
  key: 7,
  class: "text-[0.8125rem]"
}, Ge = /* @__PURE__ */ ue({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: o, formatNumber: r } = Qe();
    return (s, u) => e.value == null ? (g(), E("span", Zt, "—")) : e.column.type === "image" ? (g(), E("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, Jt)) : e.column.type === "boolean" ? (g(), F(k(mt), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (g(), E("span", Xt, B(k(t)(e.value)), 1)) : e.column.type === "datetime" ? (g(), E("span", Qt, B(k(a)(e.value)), 1)) : e.column.type === "currency" ? (g(), E("span", Gt, B(k(o)(e.value)), 1)) : e.column.type === "number" ? (g(), E("span", _t, B(e.column.format ? e.column.format(e.value, e.rowData) : k(r)(e.value, e.column.decimals ?? 0)), 1)) : (g(), E("span", ea, B(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var ta = Object.defineProperty, aa = (e, t, a) => t in e ? ta(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, Ie = (e, t, a) => aa(e, typeof t != "symbol" ? t + "" : t, a);
const nt = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, rt = (e, t, a) => e.replaceAll(t, "").replace(a, ".").replace("..", ".").replace(/[^.\d]/g, ""), st = (e, t, a) => {
  var o;
  return new Intl.NumberFormat(((o = a.number) == null ? void 0 : o.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
}, oa = (e, t = !0, a) => {
  var o, r, s, u;
  const h = ((o = a.number) == null ? void 0 : o.unsigned) !== !0 && e.startsWith("-") ? "-" : "", m = ((r = a.number) == null ? void 0 : r.fraction) ?? 0;
  let $ = st(0, m, a);
  const S = $.formatToParts(1000.12), N = ((s = S.find((n) => n.type === "group")) == null ? void 0 : s.value) ?? " ", U = ((u = S.find((n) => n.type === "decimal")) == null ? void 0 : u.value) ?? ".", V = rt(e, N, U);
  if (Number.isNaN(parseFloat(V))) return h;
  const I = V.split(".");
  if (I[1] != null && I[1].length >= 1) {
    const n = I[1].length <= m ? I[1].length : m;
    $ = st(n, m, a);
  }
  let z = $.format(parseFloat(V));
  return t ? m > 0 && V.endsWith(".") && !V.slice(0, -1).includes(".") && (z += U) : z = rt(z, N, U), h + z;
}, $t = (e) => JSON.parse(e.replaceAll("'", '"')), la = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = na(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = ze(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = ze(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = ze(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = ra(e.dataset.maskaTokens));
  const o = {};
  return e.dataset.maskaNumberLocale != null && (o.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (o.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (o.unsigned = ze(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(o).length > 0) && (a.number = o), a;
}, ze = (e) => e !== "" ? !!JSON.parse(e) : !0, na = (e) => e.startsWith("[") && e.endsWith("]") ? $t(e) : e, ra = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return $t(e);
  const t = {};
  return e.split("|").forEach((a) => {
    const o = a.split(":");
    t[o[0]] = {
      pattern: Dt() ? new RegExp(o[1], "u") : new RegExp(o[1]),
      optional: o[2] === "optional",
      multiple: o[2] === "multiple",
      repeated: o[2] === "repeated"
    };
  }), t;
}, Dt = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class sa {
  constructor(t = {}) {
    Ie(this, "opts", {}), Ie(this, "memo", /* @__PURE__ */ new Map());
    const a = { ...t };
    if (a.tokens != null) {
      a.tokens = a.tokensReplace ? { ...a.tokens } : { ...nt, ...a.tokens };
      for (const o of Object.values(a.tokens))
        typeof o.pattern == "string" && (o.pattern = Dt() ? new RegExp(o.pattern, "u") : new RegExp(o.pattern));
    } else
      a.tokens = nt;
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
    return t.split("").forEach((r, s) => {
      r === "!" && t[s - 1] !== "!" ? o.push(s - o.length) : a.push(r);
    }), { mask: a.join(""), escaped: o };
  }
  process(t, a, o = !0) {
    if (this.opts.number != null) return oa(t, o, this.opts);
    if (a == null) return t;
    const r = `v=${t},mr=${a},m=${o ? 1 : 0}`;
    if (this.memo.has(r)) return this.memo.get(r);
    const { mask: s, escaped: u } = this.escapeMask(a), h = [], m = this.opts.tokens != null ? this.opts.tokens : {}, $ = this.isReversed() ? -1 : 1, S = this.isReversed() ? "unshift" : "push", N = this.isReversed() ? 0 : s.length - 1, U = this.isReversed() ? () => n > -1 && p > -1 : () => n < s.length && p < t.length, V = (f) => !this.isReversed() && f <= N || this.isReversed() && f >= N;
    let I, z = -1, n = this.isReversed() ? s.length - 1 : 0, p = this.isReversed() ? t.length - 1 : 0, C = !1;
    for (; U(); ) {
      const f = s.charAt(n), w = m[f], P = (w == null ? void 0 : w.transform) != null ? w.transform(t.charAt(p)) : t.charAt(p);
      if (!u.includes(n) && w != null ? (P.match(w.pattern) != null ? (h[S](P), w.repeated ? (z === -1 ? z = n : n === N && n !== z && (n = z - $), N === z && (n -= $)) : w.multiple && (C = !0, n -= $), n += $) : w.multiple ? C && (n += $, p -= $, C = !1) : P === I ? I = void 0 : w.optional && (n += $, p -= $), p += $) : (o && !this.isEager() && h[S](f), P === f && !this.isEager() ? p += $ : I = f, this.isEager() || (n += $)), this.isEager())
        for (; V(n) && (m[s.charAt(n)] == null || u.includes(n)); ) {
          if (o) {
            if (h[S](s.charAt(n)), t.charAt(p) === s.charAt(n)) {
              n += $, p += $;
              continue;
            }
          } else s.charAt(n) === t.charAt(p) && (p += $);
          n += $;
        }
    }
    return this.memo.set(r, h.join("")), this.memo.get(r);
  }
}
class ia {
  constructor(t, a = {}) {
    Ie(this, "items", /* @__PURE__ */ new Map()), Ie(this, "eventAbortController"), Ie(this, "onInput", (o) => {
      if (o instanceof CustomEvent && o.type === "input" && !o.isTrusted && !o.bubbles)
        return;
      const r = o.target, s = this.items.get(r);
      if (s === void 0) return;
      const u = "inputType" in o && o.inputType.startsWith("delete"), h = s.isEager(), m = u && h && s.unmasked(r.value) === "" ? "" : r.value;
      this.fixCursor(r, u, () => this.setValue(r, m));
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
        const { signal: s } = this.eventAbortController;
        o.addEventListener("input", this.onInput, { capture: !0, signal: s });
      }
      const r = new sa(la(o, a));
      this.items.set(o, r), queueMicrotask(() => this.updateValue(o)), o.selectionStart === null && r.isEager() && console.warn("Maska: input of `%s` type is not supported", o.type);
    }
  }
  getInputs(t) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t];
  }
  getOptions(t) {
    const { onMaska: a, preProcess: o, postProcess: r, ...s } = t;
    return s;
  }
  fixCursor(t, a, o) {
    var r, s;
    const u = t.selectionStart, h = t.value;
    if (o(), u === null || u === h.length && !a) return;
    const m = t.value, $ = h.slice(0, u), S = m.slice(0, u), N = (r = this.processInput(t, $)) == null ? void 0 : r.unmasked, U = (s = this.processInput(t, S)) == null ? void 0 : s.unmasked;
    if (N === void 0 || U === void 0) return;
    let V = u;
    $ !== S && (V += a ? m.length - h.length : N.length - U.length), t.setSelectionRange(V, V);
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
    let s = o.masked(r);
    return this.options.postProcess != null && (s = this.options.postProcess(s)), {
      masked: s,
      unmasked: o.unmasked(r),
      completed: o.completed(r)
    };
  }
}
const Be = /* @__PURE__ */ new WeakMap(), ua = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, it = (e, t) => {
  var a;
  const o = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (o == null || (o == null ? void 0 : o.type) === "file") return;
  let r = {};
  if (t.value != null && (r = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const s = (u) => {
      const h = t.modifiers.unmasked ? u.unmasked : t.modifiers.completed ? u.completed : u.masked;
      ua(t, h);
    };
    r.onMaska = r.onMaska == null ? s : Array.isArray(r.onMaska) ? [...r.onMaska, s] : [r.onMaska, s];
  }
  Be.has(o) ? (a = Be.get(o)) == null || a.update(r) : Be.set(o, new ia(o, r));
}, da = {
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
function ca(e) {
  var o;
  const t = da[e.type] ?? "text", a = {
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
function fa(e) {
  return e.filter((t) => !t.read_only && t.name !== "id").map(ca);
}
const ma = {
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
  decimal: "number",
  float: "number",
  integer: "number"
};
function pa(e) {
  return {
    field: e.type === "fk" ? `${e.name}_nome` : e.name,
    header: e.label,
    type: ma[e.type],
    sortable: !0
  };
}
function va(e, t = 6) {
  return e.filter((a) => !a.read_only && a.name !== "id").slice(0, t).map(pa);
}
function Ct() {
  const e = Rt();
  function t(s, u = "Sucesso") {
    e.add({ severity: "success", summary: u, detail: s, life: 3e3 });
  }
  function a(s, u = "Erro") {
    e.add({ severity: "error", summary: u, detail: s, life: 5e3 });
  }
  function o(s, u = "Atenção") {
    e.add({ severity: "warn", summary: u, detail: s, life: 4e3 });
  }
  function r(s, u = "Info") {
    e.add({ severity: "info", summary: u, detail: s, life: 3e3 });
  }
  return { success: t, error: a, warn: o, info: r };
}
function xt() {
  const e = It();
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
  function a(o, r, s = "Confirmação") {
    e.require({
      message: o,
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
function ga(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function ha(e) {
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
      const s = ga(o);
      if (Array.isArray(r)) {
        const u = r.filter((h) => typeof h == "string");
        u.length > 0 && a.push(`${s}: ${u.join(" ")}`);
      } else typeof r == "string" && a.push(`${s}: ${r}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function Ne(e, t = "Erro inesperado") {
  var s;
  if (!e || typeof e != "object") return t;
  const a = e, o = (s = a.response) == null ? void 0 : s.data;
  if (!o || typeof o != "object")
    return a.message || t;
  const r = o.detail ?? o;
  return ha(r) || t;
}
function Ho() {
  return { extractApiError: Ne };
}
const ya = { class: "w-autocompletefk" }, ba = ["disabled"], wa = { class: "w-autocompletefk-toolbar" }, ka = { class: "w-autocompletefk-toolbar-actions" }, $a = { class: "flex items-center justify-end gap-1" }, Da = { class: "w-autocompletefk-footer" }, St = /* @__PURE__ */ ue({
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
    const a = e, o = t, r = Ee(Oe);
    if (!r)
      throw new Error("[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin.");
    const s = r, u = Ct(), { confirmDelete: h } = xt(), m = R(null), $ = R([]), S = R(!1);
    let N = null;
    async function U(y) {
      try {
        const b = await s.get(`${a.endpoint}${y}/`);
        m.value = b.data;
      } catch {
        m.value = null;
      }
    }
    async function V(y) {
      S.value = !0;
      try {
        const b = { page_size: 20 };
        y && (b.search = y);
        const c = (await s.get(a.endpoint, { params: b })).data;
        $.value = c.data ?? c.results ?? c;
      } catch {
        $.value = [];
      } finally {
        S.value = !1;
      }
    }
    function I(y) {
      const b = y.query || "";
      if (b.length < a.minLength) {
        $.value = [];
        return;
      }
      N && clearTimeout(N), N = setTimeout(() => V(b), 300);
    }
    function z(y) {
      m.value = y.value, o("update:modelValue", y.value);
    }
    function n() {
      m.value = null, o("update:modelValue", null);
    }
    qe(
      () => a.modelValue,
      async (y) => {
        if (y != null) {
          if (typeof y == "object" && y !== null && a.optionLabel in y) {
            m.value = y;
            return;
          }
          (!m.value || m.value[a.optionValue] !== y) && await U(y);
        } else
          m.value = null;
      },
      { immediate: !0 }
    );
    const p = R(!1), C = R([]), f = R(!1), w = R(""), P = R(1), G = R(15), T = R(0), i = R(null), D = R(null), l = R(0);
    let d = null;
    const A = R([]), M = W(() => {
      var y;
      return (y = a.crudFields) != null && y.length ? !0 : A.value.length > 0;
    }), Y = W(() => a.canCreate ?? M.value), q = W(() => a.canEdit ?? M.value), te = W(() => a.canDelete ?? M.value), de = W(() => q.value || te.value), X = W(() => {
      var y;
      return (y = a.crudFields) != null && y.length ? a.crudFields : fa(A.value);
    }), oe = W(() => {
      var y, b;
      return (y = a.crudColumns) != null && y.length ? a.crudColumns : (b = a.columns) != null && b.length ? a.columns.map((v) => ({
        field: v.field,
        header: v.header,
        sortable: !0
      })) : A.value.length ? va(A.value) : [{ field: a.optionLabel, header: a.optionLabel, sortable: !0 }];
    });
    async function le() {
      var y, b, v;
      f.value = !0;
      try {
        const c = {
          page: P.value,
          page_size: G.value
        };
        w.value && (c.search = w.value), D.value && l.value !== 0 && (c.ordering = l.value === -1 ? `-${D.value}` : D.value);
        const O = (await s.get(a.endpoint, { params: c })).data;
        C.value = O.data ?? O.results ?? O, T.value = O.count ?? O.rows ?? 0, (y = O.extras) != null && y.fields && !((b = a.columns) != null && b.length) && !((v = a.crudFields) != null && v.length) && (A.value = O.extras.fields);
      } catch {
        C.value = [], T.value = 0;
      } finally {
        f.value = !1;
      }
    }
    function _() {
      a.disabled || (w.value = "", P.value = 1, D.value = null, l.value = 0, i.value = null, p.value = !0, le());
    }
    function ke(y) {
      P.value = y.page + 1, G.value = y.rows, le();
    }
    function ie(y) {
      D.value = y.sortField ?? null, l.value = y.sortOrder ?? 0, P.value = 1, le();
    }
    function ne() {
      i.value && (m.value = i.value, o("update:modelValue", i.value), p.value = !1);
    }
    function Te(y) {
      m.value = y.data, o("update:modelValue", y.data), p.value = !1;
    }
    qe(w, () => {
      d && clearTimeout(d), d = setTimeout(() => {
        P.value = 1, le();
      }, 300);
    });
    const ce = R(!1), ge = R(!1), re = R(null), ee = ve({}), he = W(() => re.value !== null), $e = W(
      () => he.value ? "Editar Registro" : "Novo Registro"
    );
    function De() {
      const y = {};
      for (const b of X.value)
        y[b.field] = b.defaultValue !== void 0 ? typeof b.defaultValue == "function" ? b.defaultValue() : b.defaultValue : null;
      return y;
    }
    function Ce() {
      const y = De();
      for (const b of Object.keys(ee))
        delete ee[b];
      for (const [b, v] of Object.entries(y))
        ee[b] = v;
    }
    function fe() {
      re.value = null, Ce(), ce.value = !0;
    }
    function ye(y) {
      re.value = y;
      for (const b of X.value)
        ee[b.field] = y[b.field] !== void 0 ? y[b.field] : null;
      ce.value = !0;
    }
    function xe(y, b) {
      ee[y] = b;
    }
    async function Se() {
      ge.value = !0;
      try {
        const y = { ...ee };
        for (const v of X.value) {
          const c = y[v.field];
          if (v.type === "fk" && c !== null && typeof c == "object") {
            const L = v.optionValue || "id";
            y[v.field] = c[L] ?? c;
          }
        }
        let b;
        if (he.value && re.value) {
          const v = re.value[a.optionValue];
          b = await s.patch(
            `${a.endpoint}${v}/`,
            y
          );
          const c = C.value.findIndex(
            (L) => L[a.optionValue] === v
          );
          c !== -1 && (C.value[c] = b.data), u.success("Registro atualizado com sucesso");
        } else
          b = await s.post(a.endpoint, y), C.value.unshift(b.data), T.value++, u.success("Registro criado com sucesso");
        ce.value = !1, re.value = null, i.value = b.data;
      } catch (y) {
        u.error(Ne(y, "Erro ao salvar registro"));
      } finally {
        ge.value = !1;
      }
    }
    function Ve(y) {
      h(async () => {
        try {
          const b = y[a.optionValue];
          await s.delete(`${a.endpoint}${b}/`);
          const v = C.value.findIndex(
            (c) => c[a.optionValue] === b
          );
          v !== -1 && (C.value.splice(v, 1), T.value--), m.value && m.value[a.optionValue] === b && (m.value = null, o("update:modelValue", null)), i.value && i.value[a.optionValue] === b && (i.value = null), u.success("Registro excluído com sucesso");
        } catch (b) {
          u.error(Ne(b, "Erro ao excluir registro"));
        }
      });
    }
    return (y, b) => {
      const v = ut("tooltip");
      return g(), E(me, null, [
        x("div", ya, [
          H(k(vt), {
            "model-value": m.value,
            suggestions: $.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: S.value,
            fluid: "",
            onComplete: I,
            onItemSelect: z,
            onClear: n
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          Ae((g(), E("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: _
          }, [...b[6] || (b[6] = [
            x("i", { class: "pi pi-search" }, null, -1)
          ])], 8, ba)), [
            [
              v,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        H(k(pt), {
          visible: p.value,
          "onUpdate:visible": b[4] || (b[4] = (c) => p.value = c),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: J(() => [
            x("div", Da, [
              H(k(ae), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: b[3] || (b[3] = (c) => p.value = !1)
              }),
              H(k(ae), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !i.value,
                onClick: ne
              }, null, 8, ["disabled"])
            ])
          ]),
          default: J(() => [
            x("div", wa, [
              H(k(ct), { class: "w-autocompletefk-toolbar-search" }, {
                default: J(() => [
                  H(k(ft), { class: "pi pi-search" }),
                  H(k(be), {
                    modelValue: w.value,
                    "onUpdate:modelValue": b[0] || (b[0] = (c) => w.value = c),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              x("div", ka, [
                Y.value ? (g(), F(k(ae), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: fe
                })) : j("", !0)
              ])
            ]),
            H(k(dt), {
              selection: i.value,
              "onUpdate:selection": b[1] || (b[1] = (c) => i.value = c),
              value: C.value,
              loading: f.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: G.value,
              "total-records": T.value,
              "sort-field": D.value ?? void 0,
              "sort-order": l.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: ke,
              onSort: b[2] || (b[2] = (c) => ie({ sortField: c.sortField, sortOrder: c.sortOrder })),
              onRowDblclick: Te
            }, {
              empty: J(() => [...b[7] || (b[7] = [
                x("div", { class: "w-autocompletefk-empty" }, " Nenhum registro encontrado ", -1)
              ])]),
              default: J(() => [
                H(k(Fe), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (g(!0), E(me, null, pe(oe.value, (c) => (g(), F(k(Fe), {
                  key: c.field,
                  field: c.field,
                  header: c.header,
                  sortable: c.sortable ?? !0,
                  style: Re(c.style)
                }, {
                  body: J(({ data: L }) => [
                    c.type ? (g(), F(Ge, {
                      key: 0,
                      column: c,
                      value: L[c.field],
                      "row-data": L
                    }, null, 8, ["column", "value", "row-data"])) : (g(), E(me, { key: 1 }, [
                      He(B(L[c.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                de.value ? (g(), F(k(Fe), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: J(({ data: c }) => [
                    x("div", $a, [
                      q.value ? Ae((g(), F(k(ae), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (L) => ye(c)
                      }, null, 8, ["onClick"])), [
                        [
                          v,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : j("", !0),
                      te.value ? Ae((g(), F(k(ae), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (L) => Ve(c)
                      }, null, 8, ["onClick"])), [
                        [
                          v,
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
        M.value ? (g(), F(_e, {
          key: 0,
          visible: ce.value,
          title: $e.value,
          fields: X.value,
          "form-data": ee,
          "is-editing": he.value,
          saving: ge.value,
          width: e.dialogWidth,
          "onUpdate:visible": b[5] || (b[5] = (c) => {
            ce.value = c, c || (re.value = null);
          }),
          "onUpdate:field": xe,
          onSave: Se
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : j("", !0)
      ], 64);
    };
  }
}), Ca = { class: "w-crud-form-fields" }, xa = {
  key: 0,
  class: "w-crud-form-switch"
}, Sa = { class: "w-crud-form-switch-label" }, Va = {
  key: 1,
  class: "w-crud-form-col-full"
}, Ea = { class: "w-crud-form-label" }, Pa = {
  key: 0,
  class: "w-crud-form-required"
}, Ma = { class: "w-crud-form-color-row" }, Aa = {
  key: 2,
  class: "w-crud-form-col-full"
}, Fa = { class: "w-crud-form-label" }, Ta = ["accept", "disabled", "onChange"], Ya = { class: "w-crud-form-label" }, Ra = {
  key: 0,
  class: "w-crud-form-required"
}, Ia = {
  key: 14,
  class: "w-crud-form-error"
}, La = /* @__PURE__ */ ue({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const o = e, r = a, s = ve({}), u = W(
      () => o.fields.filter((i) => i.visible === void 0 || i.visible === !0 ? !0 : typeof i.visible == "function" ? i.visible(o.formData, o.isEditing) : i.visible)
    );
    function h(i) {
      return o.disabled || i.disabledOnEdit && o.isEditing ? !0 : typeof i.disabled == "function" ? i.disabled(o.formData, o.isEditing) : !!i.disabled;
    }
    function m(i) {
      return Vt(i) ? i.value : i;
    }
    const $ = W(() => {
      const i = o.isEditing ? "edit" : "create", D = o.fields.find(
        (d) => d.autofocus === !0 || d.autofocus === i
      );
      if (D) return D.field;
      const l = u.value.find((d) => !(d.type === "switch" || d.type === "fk" || d.type === "select" || d.type === "image" || d.disabled === !0 || d.disabledOnEdit && o.isEditing));
      return (l == null ? void 0 : l.field) ?? null;
    });
    function S(i) {
      return i.field === $.value;
    }
    function N(i) {
      if (i)
        return i.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function U(i) {
      if (!i) return "";
      const D = String(i).replace(/\D/g, "").slice(0, 14);
      return D.length <= 11 ? D.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : D.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function V(i, D) {
      const l = D.target.value.replace(/\D/g, "").slice(0, 14);
      r("update:field", i, l);
    }
    const I = ve({});
    function z(i) {
      const D = o.formData[i.field];
      if (D == null) return null;
      const l = i.optionValue || "value";
      return (m(i.options) || []).find(
        (A) => A[l] === D
      ) ?? null;
    }
    function n(i) {
      return I[i.field] || [];
    }
    function p(i, D) {
      const l = (D.query || "").toLowerCase(), d = m(i.options) || [], A = i.optionLabel || "label";
      I[i.field] = d.filter(
        (M) => String(M[A] || "").toLowerCase().includes(l)
      );
    }
    function C(i, D) {
      const l = i.optionValue || "value";
      r("update:field", i.field, D.value[l]);
    }
    function f(i) {
      const D = o.formData[i.field];
      return D ? String(D).replace("#", "") : "FFFFFF";
    }
    function w(i, D) {
      r("update:field", i.field, `#${D}`);
    }
    function P(i) {
      if (typeof i.validate == "function") {
        const D = i.validate(o.formData[i.field]);
        s[i.field] = D || null;
      }
    }
    function G() {
      const i = [];
      for (const D of o.fields)
        if (typeof D.validate == "function") {
          const l = D.validate(o.formData[D.field]);
          s[D.field] = l || null, l && i.push(l);
        }
      return i;
    }
    function T() {
      Object.keys(s).forEach((i) => delete s[i]);
    }
    return t({ validateAll: G, clearErrors: T }), (i, D) => (g(), E("div", Ca, [
      (g(!0), E(me, null, pe(u.value, (l) => Z(i.$slots, `field-${l.field}`, {
        key: l.field,
        field: l,
        formData: e.formData,
        isEditing: e.isEditing,
        setFormField: (d, A) => r("update:field", d, A)
      }, () => [
        l.type === "switch" ? (g(), E("div", xa, [
          H(k(Ft), {
            "model-value": e.formData[l.field],
            disabled: h(l),
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
          x("label", Sa, B(l.switchLabel || l.label), 1)
        ])) : l.type === "color" ? (g(), E("div", Va, [
          x("label", Ea, [
            He(B(l.label) + " ", 1),
            l.required ? (g(), E("span", Pa, "*")) : j("", !0)
          ]),
          x("div", Ma, [
            H(k(Tt), {
              "model-value": f(l),
              disabled: h(l),
              "onUpdate:modelValue": (d) => w(l, d)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
            H(k(be), {
              "model-value": e.formData[l.field],
              class: "w-28",
              maxlength: "7",
              placeholder: "#000000",
              disabled: h(l),
              "onUpdate:modelValue": (d) => r("update:field", l.field, d)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
          ])
        ])) : l.type === "image" ? (g(), E("div", Aa, [
          x("label", Fa, B(l.label), 1),
          Z(i.$slots, `image-${l.field}`, {
            field: l,
            formData: e.formData
          }, () => [
            x("input", {
              type: "file",
              accept: l.accept || "image/*",
              disabled: h(l),
              onChange: (d) => {
                var M;
                const A = ((M = d.target.files) == null ? void 0 : M[0]) ?? null;
                r("update:field", l.field, A);
              }
            }, null, 40, Ta)
          ])
        ])) : (g(), E("div", {
          key: 3,
          class: Le(l.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
        }, [
          x("label", Ya, [
            He(B(l.label) + " ", 1),
            l.required ? (g(), E("span", Ra, "*")) : j("", !0)
          ]),
          (!l.type || l.type === "text") && l.mask ? Ae((g(), F(k(be), {
            key: 0,
            "model-value": e.formData[l.field],
            fluid: "",
            autofocus: S(l) || void 0,
            placeholder: l.placeholder,
            disabled: h(l),
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
            [k(it), { mask: N(l.mask) }]
          ]) : !l.type || l.type === "text" ? (g(), F(k(be), {
            key: 1,
            "model-value": e.formData[l.field],
            fluid: "",
            autofocus: S(l) || void 0,
            placeholder: l.placeholder,
            disabled: h(l),
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "email" ? (g(), F(k(be), {
            key: 2,
            "model-value": e.formData[l.field],
            type: "email",
            fluid: "",
            autofocus: S(l) || void 0,
            placeholder: l.placeholder,
            disabled: h(l),
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "password" ? (g(), F(k(Yt), {
            key: 3,
            "model-value": e.formData[l.field],
            fluid: "",
            "toggle-mask": "",
            feedback: l.feedback !== !1,
            placeholder: l.placeholder,
            disabled: h(l),
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "number" ? (g(), F(k(tt), {
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
            disabled: h(l),
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "currency" ? (g(), F(k(tt), {
            key: 5,
            "model-value": e.formData[l.field],
            fluid: "",
            mode: "currency",
            currency: "BRL",
            locale: "pt-BR",
            min: l.min,
            max: l.max,
            placeholder: l.placeholder,
            disabled: h(l),
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "select" ? (g(), F(k(At), {
            key: 6,
            "model-value": e.formData[l.field],
            fluid: "",
            options: m(l.options),
            "option-label": l.optionLabel || "label",
            "option-value": l.optionValue || "value",
            "show-clear": l.showClear !== !1,
            placeholder: l.placeholder,
            disabled: h(l),
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "autocomplete" ? (g(), F(k(vt), {
            key: 7,
            "model-value": z(l),
            fluid: "",
            suggestions: n(l),
            "option-label": l.optionLabel || "label",
            placeholder: l.placeholder,
            disabled: h(l),
            onComplete: (d) => p(l, d),
            onItemSelect: (d) => C(l, d),
            onClear: (d) => r("update:field", l.field, null)
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : l.type === "fk" ? (g(), F(St, {
            key: 8,
            "model-value": e.formData[l.field],
            endpoint: l.endpoint,
            "option-label": l.optionLabel || "nome",
            placeholder: l.placeholder,
            disabled: h(l),
            "show-clear": l.showClear !== !1,
            "dialog-header": l.label,
            "crud-fields": l.crudFields,
            "crud-columns": l.crudColumns,
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "endpoint", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : l.type === "date" ? (g(), F(k(at), {
            key: 9,
            "model-value": e.formData[l.field],
            fluid: "",
            "date-format": l.dateFormat || "dd/mm/yy",
            placeholder: l.placeholder,
            disabled: h(l),
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "datetime" ? (g(), F(k(at), {
            key: 10,
            "model-value": e.formData[l.field],
            fluid: "",
            "show-time": "",
            "hour-format": l.hourFormat || "24",
            "date-format": l.dateFormat || "dd/mm/yy",
            placeholder: l.placeholder,
            disabled: h(l),
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : l.type === "cpf_cnpj" ? (g(), F(k(be), {
            key: 11,
            "model-value": U(e.formData[l.field]),
            fluid: "",
            maxlength: "18",
            placeholder: l.placeholder || "000.000.000-00",
            disabled: h(l),
            invalid: !!s[l.field],
            onInput: (d) => V(l.field, d),
            onBlur: (d) => P(l)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : l.type === "mask" ? Ae((g(), F(k(be), {
            key: 12,
            "model-value": e.formData[l.field],
            fluid: "",
            placeholder: l.placeholder,
            disabled: h(l),
            invalid: !!s[l.field],
            "onUpdate:modelValue": (d) => r("update:field", l.field, d),
            onBlur: (d) => P(l)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
            [k(it), { mask: N(l.mask) }]
          ]) : l.type === "textarea" ? (g(), F(k(Mt), {
            key: 13,
            "model-value": e.formData[l.field],
            fluid: "",
            autofocus: S(l) || void 0,
            rows: l.rows || 3,
            placeholder: l.placeholder,
            disabled: h(l),
            "onUpdate:modelValue": (d) => r("update:field", l.field, d)
          }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : j("", !0),
          s[l.field] ? (g(), E("small", Ia, B(s[l.field]), 1)) : j("", !0)
        ], 2))
      ])), 128))
    ]));
  }
}), Na = { class: "w-crud-form-footer" }, _e = /* @__PURE__ */ ue({
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
    function s() {
      r.value ? r.value.validateAll().length === 0 && o("save") : o("save");
    }
    return qe(
      () => a.visible,
      (u) => {
        u && r.value && r.value.clearErrors();
      }
    ), (u, h) => (g(), F(k(pt), {
      visible: e.visible,
      header: e.title,
      style: Re({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": h[2] || (h[2] = (m) => o("update:visible", m))
    }, {
      default: J(() => [
        x("form", {
          class: "w-crud-form",
          onSubmit: Et(s, ["prevent"])
        }, [
          H(La, {
            ref_key: "rendererRef",
            ref: r,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            disabled: e.disabled,
            "onUpdate:field": h[0] || (h[0] = (m, $) => o("update:field", m, $))
          }, Ke({ _: 2 }, [
            pe(e.fields, (m) => ({
              name: `field-${m.field}`,
              fn: J(($) => [
                Z(u.$slots, `field-${m.field}`, Ze(Je($)))
              ])
            })),
            pe(e.fields.filter((m) => m.type === "image"), (m) => ({
              name: `image-${m.field}`,
              fn: J(($) => [
                Z(u.$slots, `image-${m.field}`, Ze(Je($)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing", "disabled"]),
          x("div", Na, [
            Z(u.$slots, "footer", {
              saving: e.saving,
              disabled: e.disabled
            }, () => [
              H(k(ae), {
                type: "button",
                label: e.disabled ? "Fechar" : "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: h[1] || (h[1] = (m) => o("update:visible", !1))
              }, null, 8, ["label", "disabled"]),
              e.disabled ? j("", !0) : (g(), F(k(ae), {
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
}), za = { class: "w-crud" }, ja = {
  key: 0,
  class: "w-crud-header"
}, Ua = { class: "w-crud-header-content" }, Oa = { class: "w-crud-title" }, Wa = {
  key: 0,
  class: "w-crud-subtitle"
}, Ba = { class: "w-crud-header-actions" }, qa = {
  key: 0,
  class: "w-crud-kpis"
}, Ha = { class: "w-crud-kpi-content" }, Ka = { class: "w-crud-kpi-label" }, Za = { class: "w-crud-kpi-value" }, Ja = { class: "w-crud-table" }, Xa = { class: "w-crud-toolbar" }, Qa = { class: "w-crud-toolbar-start" }, Ga = { class: "w-crud-toolbar-end" }, _a = { class: "w-crud-actions" }, eo = /* @__PURE__ */ ue({
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
    const a = e, o = t, { formatNumber: r } = Qe(), s = R({}), u = W(
      () => a.crud.config.columns.filter((n) => n.visible !== !1).map((n) => n.type === "number" && !n.align ? { ...n, align: "right" } : n.type === "currency" && !n.align ? { ...n, align: "right" } : n)
    );
    function h(n) {
      if (n.align === "right") return "text-right";
      if (n.align === "center") return "text-center";
    }
    const m = W(() => {
      const n = [];
      return a.crud.config.canCreate !== !1 && a.crud.config.canEdit !== !1 && n.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canDelete !== !1 && n.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), n;
    }), $ = W(
      () => a.crud.config.rowActions ?? m.value
    ), S = W(() => $.value.length > 0);
    function N(n, p) {
      n.action === "edit" ? a.crud.openEditDialog(p) : n.action === "view" ? a.crud.openViewDialog(p) : n.action === "delete" ? a.crud.confirmDelete(p) : n.handler && n.handler(p);
    }
    function U(n, p) {
      return n.visible ? n.visible(p) : !0;
    }
    function V(n, p) {
      return n.disabled ? n.disabled(p) : !1;
    }
    const I = W(() => {
      const n = [];
      return a.showKpi && n.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: r(a.crud.pagination.rows, 0)
      }), n.push(...a.extraKpis), n;
    });
    W(() => a.crud.config.labels ?? {});
    const z = W(() => a.crud.config.canCreate !== !1);
    return Pt(() => {
      a.autoInit && a.crud.init();
    }), (n, p) => {
      const C = ut("tooltip");
      return g(), E("div", za, [
        e.showHeader ? (g(), E("div", ja, [
          x("div", Ua, [
            x("h1", Oa, B(e.title), 1),
            e.subtitle ? (g(), E("p", Wa, B(e.subtitle), 1)) : j("", !0)
          ]),
          x("div", Ba, [
            Z(n.$slots, "header-actions"),
            z.value ? (g(), F(k(ae), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: p[0] || (p[0] = (f) => e.crud.openCreateDialog())
            })) : j("", !0)
          ])
        ])) : j("", !0),
        Z(n.$slots, "before-table", {}, () => [
          I.value.length ? (g(), E("div", qa, [
            (g(!0), E(me, null, pe(I.value, (f, w) => (g(), E("div", {
              key: w,
              class: "w-crud-kpi"
            }, [
              x("div", {
                class: Le(["w-crud-kpi-icon", f.severity ? `w-crud-kpi-icon--${f.severity}` : ""])
              }, [
                x("i", {
                  class: Le([f.icon]),
                  style: Re(f.color ? `color: ${f.color}` : "")
                }, null, 6)
              ], 2),
              x("div", Ha, [
                x("div", Ka, B(f.label), 1),
                x("div", Za, B(f.value), 1)
              ])
            ]))), 128))
          ])) : j("", !0)
        ]),
        x("div", Ja, [
          H(k(dt), {
            value: e.crud.items.value,
            loading: e.crud.loading.value,
            "expanded-rows": s.value,
            "onUpdate:expandedRows": p[2] || (p[2] = (f) => s.value = f),
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
            onSort: p[3] || (p[3] = (f) => e.crud.onSort({ sortField: f.sortField, sortOrder: f.sortOrder })),
            onRowExpand: p[4] || (p[4] = (f) => o("row-expand", f.data)),
            onRowCollapse: p[5] || (p[5] = (f) => o("row-collapse", f.data))
          }, Ke({
            header: J(() => [
              x("div", Xa, [
                x("div", Qa, [
                  e.showSearch ? (g(), F(k(ct), { key: 0 }, {
                    default: J(() => [
                      H(k(ft), { class: "pi pi-search" }),
                      H(k(be), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : j("", !0),
                  Z(n.$slots, "toolbar-start"),
                  Z(n.$slots, "toolbar-filters")
                ]),
                x("div", Ga, [
                  Z(n.$slots, "toolbar-actions"),
                  !e.showHeader && z.value ? (g(), F(k(ae), {
                    key: 0,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: p[1] || (p[1] = (f) => e.crud.openCreateDialog())
                  })) : j("", !0)
                ])
              ])
            ]),
            empty: J(() => [
              Z(n.$slots, "empty", {}, () => [
                p[9] || (p[9] = x("div", { class: "w-crud-empty" }, [
                  x("div", { class: "w-crud-empty-icon" }, [
                    x("i", { class: "pi pi-inbox" })
                  ]),
                  x("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                  x("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                ], -1))
              ])
            ]),
            default: J(() => [
              e.expandable ? (g(), F(k(Fe), {
                key: 0,
                expander: "",
                style: { width: "3rem" }
              })) : j("", !0),
              (g(!0), E(me, null, pe(u.value, (f) => (g(), F(k(Fe), {
                key: f.field,
                field: f.field,
                header: f.header,
                sortable: f.sortable,
                style: Re(f.style),
                "header-class": h(f),
                "body-class": h(f)
              }, {
                body: J(({ data: w }) => [
                  Z(n.$slots, `column-${f.field}`, {
                    data: w,
                    value: w[f.field]
                  }, () => [
                    H(Ge, {
                      column: f,
                      value: w[f.field],
                      "row-data": w
                    }, null, 8, ["column", "value", "row-data"])
                  ])
                ]),
                _: 2
              }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
              S.value ? (g(), F(k(Fe), {
                key: 1,
                "header-class": "w-crud-actions-header",
                style: Re({ width: `${$.value.length * 2.5 + 1}rem` })
              }, {
                body: J(({ data: f }) => [
                  Z(n.$slots, "row-actions", {
                    data: f,
                    crud: e.crud
                  }, () => [
                    x("div", _a, [
                      (g(!0), E(me, null, pe($.value, (w) => (g(), E(me, {
                        key: w.action
                      }, [
                        U(w, f) ? Ae((g(), F(k(ae), {
                          key: 0,
                          icon: w.icon,
                          text: "",
                          rounded: "",
                          size: "small",
                          severity: w.severity,
                          disabled: V(w, f),
                          onClick: (P) => N(w, f)
                        }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                          [
                            C,
                            w.tooltip,
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
              fn: J((f) => [
                Z(n.$slots, "expansion", {
                  data: f.data
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "onPage"])
        ]),
        Z(n.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => {
          var f;
          return [
            H(_e, {
              visible: e.crud.dialogVisible.value,
              title: e.crud.dialogTitle.value,
              fields: e.crud.config.form,
              "form-data": e.crud.formData,
              "is-editing": e.crud.isEditing.value,
              saving: e.crud.saving.value,
              disabled: ((f = e.crud.viewMode) == null ? void 0 : f.value) ?? !1,
              width: e.dialogWidth,
              "onUpdate:visible": p[6] || (p[6] = (w) => {
                e.crud.dialogVisible.value = w, w || (e.crud.editingItem.value = null);
              }),
              "onUpdate:field": p[7] || (p[7] = (w, P) => e.crud.setFormField(w, P)),
              onSave: p[8] || (p[8] = (w) => e.crud.save())
            }, Ke({ _: 2 }, [
              pe(e.crud.config.form, (w) => ({
                name: `field-${w.field}`,
                fn: J((P) => [
                  Z(n.$slots, `field-${w.field}`, Ze(Je(P)))
                ])
              }))
            ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "disabled", "width"])
          ];
        })
      ]);
    };
  }
}), to = /* @__PURE__ */ ue({
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
    return (r, s) => (g(), F(k(mt), {
      value: o.value.label,
      severity: o.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), ao = { class: "w-page-header" }, oo = { class: "w-page-header-content" }, lo = { class: "w-page-header-title" }, no = {
  key: 0,
  class: "w-page-header-subtitle"
}, ro = { class: "w-page-header-actions" }, Ko = /* @__PURE__ */ ue({
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
    return (o, r) => (g(), E("div", ao, [
      x("div", oo, [
        x("h2", lo, B(e.title), 1),
        e.subtitle ? (g(), E("p", no, B(e.subtitle), 1)) : j("", !0)
      ]),
      x("div", ro, [
        Z(o.$slots, "actions"),
        e.actionLabel ? (g(), F(k(ae), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: r[0] || (r[0] = (s) => a("action"))
        }, null, 8, ["label", "icon"])) : j("", !0)
      ])
    ]));
  }
}), so = { class: "w-empty-state" }, io = { class: "w-empty-state-icon" }, uo = { class: "w-empty-state-title" }, co = {
  key: 0,
  class: "w-empty-state-description"
}, Zo = /* @__PURE__ */ ue({
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
    return (o, r) => (g(), E("div", so, [
      x("div", io, [
        x("i", {
          class: Le(e.icon)
        }, null, 2)
      ]),
      x("p", uo, B(e.title), 1),
      e.description ? (g(), E("p", co, B(e.description), 1)) : j("", !0),
      e.actionLabel ? (g(), F(k(ae), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: r[0] || (r[0] = (s) => a("action"))
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
const fo = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
function mo() {
  return Ee(fo);
}
const po = { class: "w-detail-header" }, vo = { class: "w-detail-header-left" }, go = { class: "w-detail-header-content" }, ho = { class: "w-detail-header-title" }, yo = {
  key: 0,
  class: "w-detail-header-subtitle"
}, bo = { class: "w-detail-header-actions" }, Jo = /* @__PURE__ */ ue({
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
    const t = e, a = mo();
    function o() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (r, s) => (g(), E("div", po, [
      x("div", vo, [
        H(k(ae), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: o
        }),
        e.icon ? (g(), E("i", {
          key: 0,
          class: Le([e.icon, "w-detail-header-icon"])
        }, null, 2)) : j("", !0),
        x("div", go, [
          x("h2", ho, B(e.title), 1),
          e.subtitle ? (g(), E("p", yo, B(e.subtitle), 1)) : j("", !0)
        ]),
        e.status ? (g(), F(to, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : j("", !0)
      ]),
      x("div", bo, [
        Z(r.$slots, "actions")
      ])
    ]));
  }
}), wo = { class: "w-info-card" }, ko = {
  key: 0,
  class: "w-info-card-title"
}, $o = { class: "w-info-card-grid" }, Do = { class: "w-info-card-label" }, Co = { class: "w-info-card-value" }, Xo = /* @__PURE__ */ ue({
  __name: "WInfoCard",
  props: {
    title: {},
    fields: {}
  },
  setup(e) {
    const { formatCurrency: t, formatDate: a, formatNumber: o } = Qe();
    function r(s) {
      const u = s.value;
      return u == null || u === "" ? "-" : s.format === "currency" ? t(Number(u)) : s.format === "date" ? a(String(u)) : s.format === "datetime" ? a(String(u), "DD/MM/YYYY HH:mm") : s.format === "number" ? o(Number(u)) : String(u);
    }
    return (s, u) => (g(), E("div", wo, [
      e.title ? (g(), E("h3", ko, B(e.title), 1)) : j("", !0),
      x("div", $o, [
        (g(!0), E(me, null, pe(e.fields, (h) => (g(), E("div", {
          key: h.label,
          class: "w-info-card-field"
        }, [
          x("span", Do, B(h.label), 1),
          x("span", Co, B(r(h)), 1)
        ]))), 128))
      ])
    ]));
  }
}), Qo = {
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
    e.provide(Oe, t.axios), e.provide(We, a), t.registerComponents !== !1 && (e.component("WCrudView", eo), e.component("WCrudFormDialog", _e), e.component("WCrudColumnRenderer", Ge), e.component("WAutoCompleteFK", St));
  }
}, xo = {
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
function Go(e) {
  const {
    endpoint: t,
    columns: a,
    form: o,
    pk: r = "id",
    searchDebounce: s = 300,
    canCreate: u = !0,
    canEdit: h = !0,
    canDelete: m = !0,
    rowActions: $ = void 0,
    filterParams: S = void 0,
    transformPayload: N = void 0,
    onAfterSave: U = void 0,
    onAfterDelete: V = void 0
  } = e, I = Ee(Oe);
  if (!I)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const z = I, n = Ee(We), p = e.pageSize ?? (n == null ? void 0 : n.defaultPageSize) ?? 20, C = { ...xo, ...e.labels }, f = Ct(), { confirmDelete: w } = xt(), P = R([]), G = R({}), T = R(!1), i = R(!1), D = R(""), l = R(!1), d = R(!1), A = R(null), M = ve({}), Y = ve({
    page: 1,
    pageSize: p,
    rows: 0,
    totalPages: 0
  }), q = ve({
    field: null,
    order: 0
  });
  function te() {
    const v = {};
    for (const c of o)
      v[c.field] = c.defaultValue !== void 0 ? typeof c.defaultValue == "function" ? c.defaultValue() : c.defaultValue : null;
    return v;
  }
  const de = te();
  for (const v of Object.keys(de))
    M[v] = de[v];
  const X = W(() => A.value !== null && !d.value), oe = W(() => d.value), le = W(
    () => d.value ? C.viewTitle ?? "Visualizar Registro" : X.value ? C.editTitle : C.createTitle
  ), _ = W(() => Y.page <= 1), ke = W(() => Y.page >= Y.totalPages);
  let ie = null;
  async function ne(v = {}) {
    T.value = !0;
    try {
      const c = {
        page: Y.page,
        page_size: Y.pageSize,
        ...v
      };
      D.value && (c.search = D.value), q.field && q.order !== 0 && (c.ordering = q.order === -1 ? `-${q.field}` : q.field), S && Object.assign(c, S());
      const O = (await z.get(t, { params: c })).data;
      Array.isArray(O.results) ? (P.value = O.results, Y.rows = O.count ?? 0) : (P.value = O.data ?? [], Y.rows = O.rows ?? 0), O.extras && (G.value = O.extras), O.page && (Y.page = O.page), O.page_size && (Y.pageSize = O.page_size), Y.totalPages = Math.ceil(Y.rows / Y.pageSize) || 0;
    } finally {
      T.value = !1;
    }
  }
  async function Te() {
    await ne();
  }
  async function ce() {
    await ne();
  }
  function ge(v) {
    D.value = v, ie && clearTimeout(ie), ie = setTimeout(() => {
      Y.page = 1, ne();
    }, s);
  }
  function re(v) {
    const c = v.target;
    ge(c.value);
  }
  function ee(v) {
    Y.page = v, ne();
  }
  function he() {
    ee(1);
  }
  function $e() {
    ee(Y.totalPages);
  }
  function De(v) {
    Y.page = v.page + 1, Y.pageSize = v.rows, ne();
  }
  function Ce(v) {
    q.field = v.sortField ?? null, q.order = v.sortOrder ?? 0, Y.page = 1, ne();
  }
  function fe() {
    const v = te();
    for (const c of Object.keys(v))
      M[c] = v[c];
  }
  function ye(v, c) {
    M[v] = c;
  }
  function xe() {
    d.value = !1, A.value = null, fe(), l.value = !0;
  }
  function Se(v) {
    d.value = !1, A.value = v;
    for (const c of o) {
      let L = v[c.field] !== void 0 ? v[c.field] : null;
      L && (c.type === "date" || c.type === "datetime") && typeof L == "string" && (L = Xe(L)), M[c.field] = L;
    }
    l.value = !0;
  }
  function Ve(v) {
    d.value = !0, A.value = v;
    for (const c of o) {
      let L = v[c.field] !== void 0 ? v[c.field] : null;
      L && (c.type === "date" || c.type === "datetime") && typeof L == "string" && (L = Xe(L)), M[c.field] = L;
    }
    l.value = !0;
  }
  async function y() {
    for (const v of o) {
      if (v.validate) {
        const c = v.validate(M[v.field]);
        if (c)
          return f.error(c), null;
      }
      if (v.required) {
        const c = M[v.field];
        if (c == null || c === "")
          return f.error(`${v.label} é obrigatório`), null;
      }
    }
    i.value = !0;
    try {
      let v = { ...M };
      for (const K of o) {
        const Q = v[K.field];
        if (K.type === "date" && Q instanceof Date ? v[K.field] = gt(Q) : K.type === "datetime" && Q instanceof Date && (v[K.field] = ht(Q)), K.type === "fk" && Q !== null && typeof Q == "object") {
          const se = K.optionValue || "id";
          v[K.field] = Q[se] ?? Q;
        }
        (K.type === "mask" || K.type === "cpf_cnpj") && typeof Q == "string" && (v[K.field] = we(Q));
      }
      N && (v = N(v, X.value));
      const c = o.some(
        (K) => K.type === "image" && v[K.field] instanceof File
      );
      let L = v, O;
      if (c) {
        const K = new Set(
          o.filter((se) => se.type === "image").map((se) => se.field)
        ), Q = new FormData();
        for (const [se, Ye] of Object.entries(v))
          if (Ye != null)
            if (Ye instanceof File)
              Q.append(se, Ye);
            else {
              if (K.has(se))
                continue;
              Q.append(se, String(Ye));
            }
        L = Q, O = { "Content-Type": "multipart/form-data" };
      }
      const et = O ? { headers: O } : void 0;
      let Me;
      if (X.value && A.value) {
        const K = A.value[r];
        Me = await z.patch(
          `${t}${K}/`,
          L,
          et
        );
        const Q = P.value.findIndex(
          (se) => se[r] === K
        );
        Q !== -1 && (P.value[Q] = Me.data), f.success(C.successUpdate);
      } else
        Me = await z.post(t, L, et), P.value.unshift(Me.data), Y.rows++, f.success(C.successCreate);
      return l.value = !1, A.value = null, U && U(Me.data, X.value), Me.data;
    } catch (v) {
      return f.error(Ne(v, "Erro ao salvar registro")), null;
    } finally {
      i.value = !1;
    }
  }
  function b(v) {
    w(async () => {
      try {
        const c = v[r];
        await z.delete(`${t}${c}/`);
        const L = P.value.findIndex(
          (O) => O[r] === c
        );
        L !== -1 && (P.value.splice(L, 1), Y.rows--), f.success(C.successDelete), V && V(v);
      } catch (c) {
        f.error(Ne(c, "Erro ao excluir registro"));
      }
    }, C.deleteConfirmMessage);
  }
  return {
    items: P,
    extras: G,
    loading: T,
    saving: i,
    search: D,
    dialogVisible: l,
    editingItem: A,
    formData: M,
    pagination: Y,
    sort: q,
    isEditing: X,
    isViewing: oe,
    viewMode: d,
    dialogTitle: le,
    isFirstPage: _,
    isLastPage: ke,
    init: Te,
    fetchItems: ne,
    refresh: ce,
    setSearch: ge,
    onSearch: re,
    onPage: De,
    onSort: Ce,
    openCreateDialog: xe,
    openEditDialog: Se,
    openViewDialog: Ve,
    save: y,
    confirmDelete: b,
    setFormField: ye,
    resetForm: fe,
    goToPage: ee,
    firstPage: he,
    lastPage: $e,
    config: e
  };
}
function _o(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: o = !1 } = e, r = Ee(Oe);
  if (!r)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const s = r, u = Ee(We), h = e.pageSize ?? (u == null ? void 0 : u.defaultPageSize) ?? 20, m = R([]), $ = R(!1), S = R(""), N = R({}), U = ve({}), V = ve({
    page: 1,
    pageSize: h,
    rows: 0,
    totalPages: 0
  }), I = ve({
    field: null,
    order: 0
  });
  let z = null;
  async function n(T = {}) {
    $.value = !0;
    try {
      const i = {
        page: V.page,
        page_size: V.pageSize,
        ...T
      };
      S.value && (i.search = S.value), I.field && I.order !== 0 && (i.ordering = I.order === -1 ? `-${I.field}` : I.field);
      for (const [A, M] of Object.entries(U))
        M != null && M !== "" && (i[A] = M);
      const d = (await s.get(t, {
        params: i
      })).data;
      Array.isArray(d.results) ? (m.value = d.results, V.rows = d.count ?? 0) : (m.value = d.data ?? [], V.rows = d.rows ?? 0), d.page && (V.page = d.page), d.page_size && (V.pageSize = d.page_size), V.totalPages = Math.ceil(V.rows / V.pageSize) || 0, N.value = d.extras ?? {};
    } finally {
      $.value = !1;
    }
  }
  async function p() {
    await n();
  }
  function C(T) {
    S.value = T, z && clearTimeout(z), z = setTimeout(() => {
      V.page = 1, n();
    }, a);
  }
  function f(T, i) {
    U[T] = i, V.page = 1, n();
  }
  function w() {
    for (const T of Object.keys(U))
      delete U[T];
    V.page = 1, n();
  }
  function P(T) {
    V.page = T.page + 1, V.pageSize = T.rows, n();
  }
  function G(T) {
    I.field = T.sortField ?? null, I.order = T.sortOrder ?? 0, V.page = 1, n();
  }
  return o && n(), {
    items: m,
    loading: $,
    search: S,
    pagination: V,
    sort: I,
    extras: N,
    fetchItems: n,
    refresh: p,
    setSearch: C,
    setFilter: f,
    clearFilters: w,
    onPage: P,
    onSort: G
  };
}
export {
  xo as DEFAULT_CRUD_LABELS,
  St as WAutoCompleteFK,
  Ge as WCrudColumnRenderer,
  _e as WCrudFormDialog,
  eo as WCrudView,
  Jo as WDetailHeader,
  Zo as WEmptyState,
  La as WFormRenderer,
  Xo as WInfoCard,
  Ko as WPageHeader,
  Qo as WPrimeVuePlugin,
  to as WStatusTag,
  Oe as W_AXIOS_KEY,
  We as W_CONFIG_KEY,
  Ne as extractApiError,
  pa as mapApiFieldToColumnDef,
  ca as mapApiFieldToFieldDef,
  va as mapApiFieldsToColumnDefs,
  fa as mapApiFieldsToFieldDefs,
  _o as useApi,
  Ho as useApiError,
  xt as useAppConfirm,
  Ct as useAppToast,
  Go as useCrudManager,
  Qe as useFormatters
};
//# sourceMappingURL=index.js.map
