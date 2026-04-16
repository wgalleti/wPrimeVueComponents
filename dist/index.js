import { inject as Ae, defineComponent as se, openBlock as r, createElementBlock as v, createBlock as T, unref as $, toDisplayString as A, ref as j, watch as Ge, computed as q, reactive as pe, resolveDirective as dt, Fragment as ie, createElementVNode as y, createVNode as X, withDirectives as Fe, withCtx as ae, createCommentVNode as E, renderList as ce, normalizeStyle as Le, createTextVNode as We, renderSlot as R, normalizeClass as le, isRef as Mt, withModifiers as Vt, createSlots as Je, normalizeProps as _e, guardReactiveProps as Xe, onMounted as Ft } from "vue";
import ft from "primevue/datatable";
import Re from "primevue/column";
import ue from "primevue/button";
import we from "primevue/inputtext";
import mt from "primevue/iconfield";
import pt from "primevue/inputicon";
import vt from "primevue/tag";
import Te from "dayjs";
import ht from "primevue/dialog";
import nt from "primevue/inputnumber";
import At from "primevue/textarea";
import Tt from "primevue/select";
import gt from "primevue/autocomplete";
import st from "primevue/datepicker";
import Yt from "primevue/toggleswitch";
import Rt from "primevue/colorpicker";
import It from "primevue/password";
import { useToast as Lt } from "primevue/usetoast";
import { useConfirm as Nt } from "primevue/useconfirm";
import ze from "primevue/skeleton";
const He = Symbol("w-axios"), qe = Symbol("w-config");
function Wt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Be = { exports: {} }, jt = Be.exports, lt;
function zt() {
  return lt || (lt = 1, (function(e, t) {
    (function(a, n) {
      e.exports = n();
    })(jt, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, n = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, s = /\d/, i = /\d\d/, d = /\d\d?/, D = /\d*[^-_:/,()\s\d]+/, p = {}, x = function(l) {
        return (l = +l) + (l > 68 ? 1900 : 2e3);
      }, V = function(l) {
        return function(f) {
          this[l] = +f;
        };
      }, P = [/[+-]\d\d:?(\d\d)?|Z/, function(l) {
        (this.zone || (this.zone = {})).offset = (function(f) {
          if (!f || f === "Z") return 0;
          var M = f.match(/([+-]|\d\d)/g), m = 60 * M[1] + (+M[2] || 0);
          return m === 0 ? 0 : M[0] === "+" ? -m : m;
        })(l);
      }], B = function(l) {
        var f = p[l];
        return f && (f.indexOf ? f : f.s.concat(f.f));
      }, F = function(l, f) {
        var M, m = p.meridiem;
        if (m) {
          for (var w = 1; w <= 24; w += 1) if (l.indexOf(m(w, 0, f)) > -1) {
            M = w > 12;
            break;
          }
        } else M = l === (f ? "pm" : "PM");
        return M;
      }, I = { A: [D, function(l) {
        this.afternoon = F(l, !1);
      }], a: [D, function(l) {
        this.afternoon = F(l, !0);
      }], Q: [s, function(l) {
        this.month = 3 * (l - 1) + 1;
      }], S: [s, function(l) {
        this.milliseconds = 100 * +l;
      }], SS: [i, function(l) {
        this.milliseconds = 10 * +l;
      }], SSS: [/\d{3}/, function(l) {
        this.milliseconds = +l;
      }], s: [d, V("seconds")], ss: [d, V("seconds")], m: [d, V("minutes")], mm: [d, V("minutes")], H: [d, V("hours")], h: [d, V("hours")], HH: [d, V("hours")], hh: [d, V("hours")], D: [d, V("day")], DD: [i, V("day")], Do: [D, function(l) {
        var f = p.ordinal, M = l.match(/\d+/);
        if (this.day = M[0], f) for (var m = 1; m <= 31; m += 1) f(m).replace(/\[|\]/g, "") === l && (this.day = m);
      }], w: [d, V("week")], ww: [i, V("week")], M: [d, V("month")], MM: [i, V("month")], MMM: [D, function(l) {
        var f = B("months"), M = (B("monthsShort") || f.map((function(m) {
          return m.slice(0, 3);
        }))).indexOf(l) + 1;
        if (M < 1) throw new Error();
        this.month = M % 12 || M;
      }], MMMM: [D, function(l) {
        var f = B("months").indexOf(l) + 1;
        if (f < 1) throw new Error();
        this.month = f % 12 || f;
      }], Y: [/[+-]?\d+/, V("year")], YY: [i, function(l) {
        this.year = x(l);
      }], YYYY: [/\d{4}/, V("year")], Z: P, ZZ: P };
      function H(l) {
        var f, M;
        f = l, M = p && p.formats;
        for (var m = (l = f.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(ee, W, U) {
          var u = U && U.toUpperCase();
          return W || M[U] || a[U] || M[u].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(C, b, o) {
            return b || o.slice(1);
          }));
        }))).match(n), w = m.length, N = 0; N < w; N += 1) {
          var Q = m[N], L = I[Q], Y = L && L[0], J = L && L[1];
          m[N] = J ? { regex: Y, parser: J } : Q.replace(/^\[|\]$/g, "");
        }
        return function(ee) {
          for (var W = {}, U = 0, u = 0; U < w; U += 1) {
            var C = m[U];
            if (typeof C == "string") u += C.length;
            else {
              var b = C.regex, o = C.parser, g = ee.slice(u), K = b.exec(g)[0];
              o.call(W, K), ee = ee.replace(K, "");
            }
          }
          return (function(_) {
            var Z = _.afternoon;
            if (Z !== void 0) {
              var z = _.hours;
              Z ? z < 12 && (_.hours += 12) : z === 12 && (_.hours = 0), delete _.afternoon;
            }
          })(W), W;
        };
      }
      return function(l, f, M) {
        M.p.customParseFormat = !0, l && l.parseTwoDigitYear && (x = l.parseTwoDigitYear);
        var m = f.prototype, w = m.parse;
        m.parse = function(N) {
          var Q = N.date, L = N.utc, Y = N.args;
          this.$u = L;
          var J = Y[1];
          if (typeof J == "string") {
            var ee = Y[2] === !0, W = Y[3] === !0, U = ee || W, u = Y[2];
            W && (u = Y[2]), p = this.$locale(), !ee && u && (p = M.Ls[u]), this.$d = (function(g, K, _, Z) {
              try {
                if (["x", "X"].indexOf(K) > -1) return new Date((K === "X" ? 1e3 : 1) * g);
                var z = H(K)(g), re = z.year, de = z.month, De = z.day, ve = z.hours, ye = z.minutes, Ce = z.seconds, fe = z.milliseconds, me = z.zone, ge = z.week, Se = /* @__PURE__ */ new Date(), xe = De || (re || de ? 1 : Se.getDate()), Pe = re || Se.getFullYear(), ke = 0;
                re && !de || (ke = de > 0 ? de - 1 : Se.getMonth());
                var be, Ee = ve || 0, Me = ye || 0, Ve = Ce || 0, h = fe || 0;
                return me ? new Date(Date.UTC(Pe, ke, xe, Ee, Me, Ve, h + 60 * me.offset * 1e3)) : _ ? new Date(Date.UTC(Pe, ke, xe, Ee, Me, Ve, h)) : (be = new Date(Pe, ke, xe, Ee, Me, Ve, h), ge && (be = Z(be).week(ge).toDate()), be);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(Q, J, L, M), this.init(), u && u !== !0 && (this.$L = this.locale(u).$L), U && Q != this.format(J) && (this.$d = /* @__PURE__ */ new Date("")), p = {};
          } else if (J instanceof Array) for (var C = J.length, b = 1; b <= C; b += 1) {
            Y[1] = J[b - 1];
            var o = M.apply(this, Y);
            if (o.isValid()) {
              this.$d = o.$d, this.$L = o.$L, this.init();
              break;
            }
            b === C && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else w.call(this, N);
        };
      };
    }));
  })(Be)), Be.exports;
}
var Ot = zt();
const Bt = /* @__PURE__ */ Wt(Ot);
Te.extend(Bt);
function Qe(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const t = Te(e, "YYYY-MM-DD", !0);
  return t.isValid() ? t.toDate() : Te(e).toDate();
}
function yt(e) {
  return e ? typeof e == "string" ? e : Te(e).format("YYYY-MM-DD") : null;
}
function bt(e) {
  return e ? typeof e == "string" ? e : Te(e).toISOString() : null;
}
function Ut(e, t = "DD/MM/YYYY") {
  return e ? Te(e).format(t) : "—";
}
function Ht(e) {
  return e ? Te(e).format("DD/MM/YYYY HH:mm") : "—";
}
function $e(e) {
  return e.replace(/\D/g, "");
}
function wt(e) {
  if (!e) return "—";
  const t = $e(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function kt(e) {
  if (!e) return "—";
  const t = $e(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function qt(e) {
  if (!e) return "—";
  const t = $e(e);
  return t.length === 11 ? wt(e) : t.length === 14 ? kt(e) : e;
}
function Kt(e) {
  if (!e) return "—";
  const t = $e(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function $t(e) {
  if (!e) return null;
  const t = $e(e);
  if (t.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(t)) return "CPF inválido.";
  let a = 0;
  for (let d = 0; d < 9; d++) a += parseInt(t[d]) * (10 - d);
  let n = a % 11;
  const s = n < 2 ? 0 : 11 - n;
  if (parseInt(t[9]) !== s) return "CPF inválido.";
  a = 0;
  for (let d = 0; d < 10; d++) a += parseInt(t[d]) * (11 - d);
  n = a % 11;
  const i = n < 2 ? 0 : 11 - n;
  return parseInt(t[10]) !== i ? "CPF inválido." : null;
}
function Dt(e) {
  if (!e) return null;
  const t = $e(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let n = 0;
  for (let p = 0; p < 12; p++) n += parseInt(t[p]) * a[p];
  let s = n % 11;
  const i = s < 2 ? 0 : 11 - s;
  if (parseInt(t[12]) !== i) return "CNPJ inválido.";
  const d = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  n = 0;
  for (let p = 0; p < 13; p++) n += parseInt(t[p]) * d[p];
  s = n % 11;
  const D = s < 2 ? 0 : 11 - s;
  return parseInt(t[13]) !== D ? "CNPJ inválido." : null;
}
function Zt(e) {
  if (!e) return null;
  const t = $e(e);
  return t.length === 11 ? $t(e) : t.length === 14 ? Dt(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const Ue = /* @__PURE__ */ new Map();
function rt(e, t) {
  const a = `${e}-${t}`;
  let n = Ue.get(a);
  return n || (n = new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }), Ue.set(a, n)), n;
}
function Gt(e, t) {
  const a = `${e}-${t}`;
  let n = Ue.get(a);
  return n || (n = new Intl.NumberFormat(e, {
    style: "currency",
    currency: t
  }), Ue.set(a, n)), n;
}
function et() {
  const e = Ae(qe, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), t = (e == null ? void 0 : e.locale) ?? "pt-BR", a = (e == null ? void 0 : e.currency) ?? "BRL";
  function n(p) {
    return p == null ? "—" : Gt(t, a).format(p);
  }
  function s(p, x = 2) {
    return p == null ? "—" : rt(t, x).format(p);
  }
  function i(p, x) {
    return Ut(p, x ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function d(p) {
    return Ht(p);
  }
  function D(p) {
    return p == null ? "—" : `${rt(t, 2).format(p)}%`;
  }
  return {
    formatCurrency: n,
    formatNumber: s,
    formatDate: i,
    formatDateTime: d,
    formatPercent: D,
    formatCpf: wt,
    formatCnpj: kt,
    formatCpfCnpj: qt,
    formatTelefone: Kt,
    validateCpf: $t,
    validateCnpj: Dt,
    validateCpfCnpj: Zt,
    parseDate: Qe,
    toDateString: yt,
    toDateTimeString: bt
  };
}
const Jt = {
  key: 0,
  class: "text-muted-color text-xs"
}, _t = ["src", "alt"], Xt = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, Qt = {
  key: 4,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, ea = {
  key: 5,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, ta = {
  key: 6,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, aa = {
  key: 7,
  class: "text-[0.8125rem]"
}, tt = /* @__PURE__ */ se({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: n, formatNumber: s } = et();
    return (i, d) => e.value == null ? (r(), v("span", Jt, "—")) : e.column.type === "image" ? (r(), v("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, _t)) : e.column.type === "boolean" ? (r(), T($(vt), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (r(), v("span", Xt, A($(t)(e.value)), 1)) : e.column.type === "datetime" ? (r(), v("span", Qt, A($(a)(e.value)), 1)) : e.column.type === "currency" ? (r(), v("span", ea, A($(n)(e.value)), 1)) : e.column.type === "number" ? (r(), v("span", ta, A(e.column.format ? e.column.format(e.value, e.rowData) : $(s)(e.value, e.column.decimals ?? 0)), 1)) : (r(), v("span", aa, A(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var oa = Object.defineProperty, na = (e, t, a) => t in e ? oa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, Ne = (e, t, a) => na(e, typeof t != "symbol" ? t + "" : t, a);
const it = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, ut = (e, t, a) => e.replaceAll(t, "").replace(a, ".").replace("..", ".").replace(/[^.\d]/g, ""), ct = (e, t, a) => {
  var n;
  return new Intl.NumberFormat(((n = a.number) == null ? void 0 : n.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
}, sa = (e, t = !0, a) => {
  var n, s, i, d;
  const D = ((n = a.number) == null ? void 0 : n.unsigned) !== !0 && e.startsWith("-") ? "-" : "", p = ((s = a.number) == null ? void 0 : s.fraction) ?? 0;
  let x = ct(0, p, a);
  const V = x.formatToParts(1000.12), P = ((i = V.find((l) => l.type === "group")) == null ? void 0 : i.value) ?? " ", B = ((d = V.find((l) => l.type === "decimal")) == null ? void 0 : d.value) ?? ".", F = ut(e, P, B);
  if (Number.isNaN(parseFloat(F))) return D;
  const I = F.split(".");
  if (I[1] != null && I[1].length >= 1) {
    const l = I[1].length <= p ? I[1].length : p;
    x = ct(l, p, a);
  }
  let H = x.format(parseFloat(F));
  return t ? p > 0 && F.endsWith(".") && !F.slice(0, -1).includes(".") && (H += B) : H = ut(H, P, B), D + H;
}, Ct = (e) => JSON.parse(e.replaceAll("'", '"')), la = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = ra(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = Oe(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = Oe(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = Oe(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = ia(e.dataset.maskaTokens));
  const n = {};
  return e.dataset.maskaNumberLocale != null && (n.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (n.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (n.unsigned = Oe(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(n).length > 0) && (a.number = n), a;
}, Oe = (e) => e !== "" ? !!JSON.parse(e) : !0, ra = (e) => e.startsWith("[") && e.endsWith("]") ? Ct(e) : e, ia = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return Ct(e);
  const t = {};
  return e.split("|").forEach((a) => {
    const n = a.split(":");
    t[n[0]] = {
      pattern: St() ? new RegExp(n[1], "u") : new RegExp(n[1]),
      optional: n[2] === "optional",
      multiple: n[2] === "multiple",
      repeated: n[2] === "repeated"
    };
  }), t;
}, St = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class ua {
  constructor(t = {}) {
    Ne(this, "opts", {}), Ne(this, "memo", /* @__PURE__ */ new Map());
    const a = { ...t };
    if (a.tokens != null) {
      a.tokens = a.tokensReplace ? { ...a.tokens } : { ...it, ...a.tokens };
      for (const n of Object.values(a.tokens))
        typeof n.pattern == "string" && (n.pattern = St() ? new RegExp(n.pattern, "u") : new RegExp(n.pattern));
    } else
      a.tokens = it;
    Array.isArray(a.mask) && (a.mask.length > 1 ? a.mask = [...a.mask].sort((n, s) => n.length - s.length) : a.mask = a.mask[0] ?? ""), a.mask === "" && (a.mask = null), this.opts = a;
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
    return a.find((s) => this.process(t, s, !1).length >= n.length) ?? "";
  }
  escapeMask(t) {
    const a = [], n = [];
    return t.split("").forEach((s, i) => {
      s === "!" && t[i - 1] !== "!" ? n.push(i - n.length) : a.push(s);
    }), { mask: a.join(""), escaped: n };
  }
  process(t, a, n = !0) {
    if (this.opts.number != null) return sa(t, n, this.opts);
    if (a == null) return t;
    const s = `v=${t},mr=${a},m=${n ? 1 : 0}`;
    if (this.memo.has(s)) return this.memo.get(s);
    const { mask: i, escaped: d } = this.escapeMask(a), D = [], p = this.opts.tokens != null ? this.opts.tokens : {}, x = this.isReversed() ? -1 : 1, V = this.isReversed() ? "unshift" : "push", P = this.isReversed() ? 0 : i.length - 1, B = this.isReversed() ? () => l > -1 && f > -1 : () => l < i.length && f < t.length, F = (m) => !this.isReversed() && m <= P || this.isReversed() && m >= P;
    let I, H = -1, l = this.isReversed() ? i.length - 1 : 0, f = this.isReversed() ? t.length - 1 : 0, M = !1;
    for (; B(); ) {
      const m = i.charAt(l), w = p[m], N = (w == null ? void 0 : w.transform) != null ? w.transform(t.charAt(f)) : t.charAt(f);
      if (!d.includes(l) && w != null ? (N.match(w.pattern) != null ? (D[V](N), w.repeated ? (H === -1 ? H = l : l === P && l !== H && (l = H - x), P === H && (l -= x)) : w.multiple && (M = !0, l -= x), l += x) : w.multiple ? M && (l += x, f -= x, M = !1) : N === I ? I = void 0 : w.optional && (l += x, f -= x), f += x) : (n && !this.isEager() && D[V](m), N === m && !this.isEager() ? f += x : I = m, this.isEager() || (l += x)), this.isEager())
        for (; F(l) && (p[i.charAt(l)] == null || d.includes(l)); ) {
          if (n) {
            if (D[V](i.charAt(l)), t.charAt(f) === i.charAt(l)) {
              l += x, f += x;
              continue;
            }
          } else i.charAt(l) === t.charAt(f) && (f += x);
          l += x;
        }
    }
    return this.memo.set(s, D.join("")), this.memo.get(s);
  }
}
class ca {
  constructor(t, a = {}) {
    Ne(this, "items", /* @__PURE__ */ new Map()), Ne(this, "eventAbortController"), Ne(this, "onInput", (n) => {
      if (n instanceof CustomEvent && n.type === "input" && !n.isTrusted && !n.bubbles)
        return;
      const s = n.target, i = this.items.get(s);
      if (i === void 0) return;
      const d = "inputType" in n && n.inputType.startsWith("delete"), D = i.isEager(), p = d && D && i.unmasked(s.value) === "" ? "" : s.value;
      this.fixCursor(s, d, () => this.setValue(s, p));
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
        const { signal: i } = this.eventAbortController;
        n.addEventListener("input", this.onInput, { capture: !0, signal: i });
      }
      const s = new ua(la(n, a));
      this.items.set(n, s), queueMicrotask(() => this.updateValue(n)), n.selectionStart === null && s.isEager() && console.warn("Maska: input of `%s` type is not supported", n.type);
    }
  }
  getInputs(t) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t];
  }
  getOptions(t) {
    const { onMaska: a, preProcess: n, postProcess: s, ...i } = t;
    return i;
  }
  fixCursor(t, a, n) {
    var s, i;
    const d = t.selectionStart, D = t.value;
    if (n(), d === null || d === D.length && !a) return;
    const p = t.value, x = D.slice(0, d), V = p.slice(0, d), P = (s = this.processInput(t, x)) == null ? void 0 : s.unmasked, B = (i = this.processInput(t, V)) == null ? void 0 : i.unmasked;
    if (P === void 0 || B === void 0) return;
    let F = d;
    x !== V && (F += a ? p.length - D.length : P.length - B.length), t.setSelectionRange(F, F);
  }
  setValue(t, a) {
    const n = this.processInput(t, a);
    n !== void 0 && (t.value = n.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((s) => s(n)) : this.options.onMaska(n)), t.dispatchEvent(new CustomEvent("maska", { detail: n })), t.dispatchEvent(new CustomEvent("input", { detail: n.masked })));
  }
  processInput(t, a) {
    const n = this.items.get(t);
    if (n === void 0) return;
    let s = a ?? t.value;
    this.options.preProcess != null && (s = this.options.preProcess(s));
    let i = n.masked(s);
    return this.options.postProcess != null && (i = this.options.postProcess(i)), {
      masked: i,
      unmasked: n.unmasked(s),
      completed: n.completed(s)
    };
  }
}
const Ke = /* @__PURE__ */ new WeakMap(), da = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, Ze = (e, t) => {
  var a;
  const n = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (n == null || (n == null ? void 0 : n.type) === "file") return;
  let s = {};
  if (t.value != null && (s = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const i = (d) => {
      const D = t.modifiers.unmasked ? d.unmasked : t.modifiers.completed ? d.completed : d.masked;
      da(t, D);
    };
    s.onMaska = s.onMaska == null ? i : Array.isArray(s.onMaska) ? [...s.onMaska, i] : [s.onMaska, i];
  }
  Ke.has(n) ? (a = Ke.get(n)) == null || a.update(s) : Ke.set(n, new ca(n, s));
}, fa = {
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
function ma(e) {
  var n;
  const t = fa[e.type] ?? "text", a = {
    field: e.name,
    label: e.label,
    type: t,
    required: e.required ?? !1
  };
  return (e.type === "decimal" || e.type === "float") && (a.minFractionDigits = 2, a.maxFractionDigits = 2), e.type === "boolean" && (a.defaultValue = !1), e.type === "choice" && ((n = e.choices) != null && n.length) && (a.options = e.choices.map((s) => ({
    label: s.label,
    value: s.value
  }))), e.type === "fk" && (a.endpoint = e.endpoint, e.option_label && (a.optionLabel = e.option_label), e.option_value && (a.optionValue = e.option_value)), a;
}
function pa(e) {
  return e.filter((t) => !t.read_only && t.name !== "id").map(ma);
}
const va = {
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
  decimal: "number",
  float: "number",
  integer: "number"
};
function ha(e) {
  return {
    field: e.type === "fk" ? `${e.name}_nome` : e.name,
    header: e.label,
    type: va[e.type],
    sortable: !0
  };
}
function ga(e, t = 6) {
  return e.filter((a) => !a.read_only && a.name !== "id").slice(0, t).map(ha);
}
function xt() {
  const e = Lt();
  function t(i, d = "Sucesso") {
    e.add({ severity: "success", summary: d, detail: i, life: 3e3 });
  }
  function a(i, d = "Erro") {
    e.add({ severity: "error", summary: d, detail: i, life: 5e3 });
  }
  function n(i, d = "Atenção") {
    e.add({ severity: "warn", summary: d, detail: i, life: 4e3 });
  }
  function s(i, d = "Info") {
    e.add({ severity: "info", summary: d, detail: i, life: 3e3 });
  }
  return { success: t, error: a, warn: n, info: s };
}
function Pt() {
  const e = Nt();
  function t(n, s = "Deseja realmente excluir este registro?") {
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
      accept: n
    });
  }
  function a(n, s, i = "Confirmação") {
    e.require({
      message: n,
      header: i,
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
function ya(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function ba(e) {
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
    for (const [n, s] of Object.entries(t)) {
      if (n === "non_field_errors") continue;
      const i = ya(n);
      if (Array.isArray(s)) {
        const d = s.filter((D) => typeof D == "string");
        d.length > 0 && a.push(`${i}: ${d.join(" ")}`);
      } else typeof s == "string" && a.push(`${i}: ${s}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function je(e, t = "Erro inesperado") {
  var i;
  if (!e || typeof e != "object") return t;
  const a = e, n = (i = a.response) == null ? void 0 : i.data;
  if (!n || typeof n != "object")
    return a.message || t;
  const s = n.detail ?? n;
  return ba(s) || t;
}
function Yn() {
  return { extractApiError: je };
}
const wa = { class: "w-autocompletefk" }, ka = ["disabled"], $a = { class: "w-autocompletefk-toolbar" }, Da = { class: "w-autocompletefk-toolbar-actions" }, Ca = { class: "flex items-center justify-end gap-1" }, Sa = { class: "w-autocompletefk-footer" }, Et = /* @__PURE__ */ se({
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
    const a = e, n = t, s = Ae(He);
    if (!s)
      throw new Error("[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin.");
    const i = s, d = xt(), { confirmDelete: D } = Pt(), p = j(null), x = j([]), V = j(!1);
    let P = null;
    async function B(h) {
      try {
        const k = await i.get(`${a.endpoint}${h}/`);
        p.value = k.data;
      } catch {
        p.value = null;
      }
    }
    async function F(h) {
      V.value = !0;
      try {
        const k = { page_size: 20, ...a.endpointParams };
        h && (k.search = h);
        const c = (await i.get(a.endpoint, { params: k })).data;
        x.value = c.data ?? c.results ?? c;
      } catch {
        x.value = [];
      } finally {
        V.value = !1;
      }
    }
    function I(h) {
      const k = h.query || "";
      if (k.length < a.minLength) {
        x.value = [];
        return;
      }
      P && clearTimeout(P), P = setTimeout(() => F(k), 300);
    }
    function H(h) {
      p.value = h.value, n("update:modelValue", h.value);
    }
    function l() {
      p.value = null, n("update:modelValue", null);
    }
    Ge(
      () => a.modelValue,
      async (h) => {
        if (h != null) {
          if (typeof h == "object" && h !== null && a.optionLabel in h) {
            p.value = h;
            return;
          }
          (!p.value || p.value[a.optionValue] !== h) && await B(h);
        } else
          p.value = null;
      },
      { immediate: !0 }
    );
    const f = j(!1), M = j([]), m = j(!1), w = j(""), N = j(1), Q = j(15), L = j(0), Y = j(null), J = j(null), ee = j(0);
    let W = null;
    const U = j([]), u = q(() => {
      var h;
      return (h = a.crudFields) != null && h.length ? !0 : U.value.length > 0;
    }), C = q(() => a.canCreate ?? u.value), b = q(() => a.canEdit ?? u.value), o = q(() => a.canDelete ?? u.value), g = q(() => b.value || o.value), K = q(() => {
      var h;
      return (h = a.crudFields) != null && h.length ? a.crudFields : pa(U.value);
    }), _ = q(() => {
      var h, k;
      return (h = a.crudColumns) != null && h.length ? a.crudColumns : (k = a.columns) != null && k.length ? a.columns.map((G) => ({
        field: G.field,
        header: G.header,
        sortable: !0
      })) : U.value.length ? ga(U.value) : [{ field: a.optionLabel, header: a.optionLabel, sortable: !0 }];
    });
    async function Z() {
      var h, k, G;
      m.value = !0;
      try {
        const c = {
          page: N.value,
          page_size: Q.value,
          ...a.endpointParams
        };
        w.value && (c.search = w.value), J.value && ee.value !== 0 && (c.ordering = ee.value === -1 ? `-${J.value}` : J.value);
        const O = (await i.get(a.endpoint, { params: c })).data;
        M.value = O.data ?? O.results ?? O, L.value = O.count ?? O.rows ?? 0, (h = O.extras) != null && h.fields && !((k = a.columns) != null && k.length) && !((G = a.crudFields) != null && G.length) && (U.value = O.extras.fields);
      } catch {
        M.value = [], L.value = 0;
      } finally {
        m.value = !1;
      }
    }
    function z() {
      a.disabled || (w.value = "", N.value = 1, J.value = null, ee.value = 0, Y.value = null, f.value = !0, Z());
    }
    function re(h) {
      N.value = h.page + 1, Q.value = h.rows, Z();
    }
    function de(h) {
      J.value = h.sortField ?? null, ee.value = h.sortOrder ?? 0, N.value = 1, Z();
    }
    function De() {
      Y.value && (p.value = Y.value, n("update:modelValue", Y.value), f.value = !1);
    }
    function ve(h) {
      p.value = h.data, n("update:modelValue", h.data), f.value = !1;
    }
    Ge(w, () => {
      W && clearTimeout(W), W = setTimeout(() => {
        N.value = 1, Z();
      }, 300);
    });
    const ye = j(!1), Ce = j(!1), fe = j(null), me = pe({}), ge = q(() => fe.value !== null), Se = q(
      () => ge.value ? "Editar Registro" : "Novo Registro"
    );
    function xe() {
      const h = {};
      for (const k of K.value)
        h[k.field] = k.defaultValue !== void 0 ? typeof k.defaultValue == "function" ? k.defaultValue() : k.defaultValue : null;
      return h;
    }
    function Pe() {
      const h = xe();
      for (const k of Object.keys(me))
        delete me[k];
      for (const [k, G] of Object.entries(h))
        me[k] = G;
    }
    function ke() {
      fe.value = null, Pe(), ye.value = !0;
    }
    function be(h) {
      fe.value = h;
      for (const k of K.value)
        me[k.field] = h[k.field] !== void 0 ? h[k.field] : null;
      ye.value = !0;
    }
    function Ee(h, k) {
      me[h] = k;
    }
    async function Me() {
      Ce.value = !0;
      try {
        const h = { ...me };
        for (const G of K.value) {
          const c = h[G.field];
          if (G.type === "fk" && c !== null && typeof c == "object") {
            const S = G.optionValue || "id";
            h[G.field] = c[S] ?? c;
          }
        }
        let k;
        if (ge.value && fe.value) {
          const G = fe.value[a.optionValue];
          k = await i.patch(
            `${a.endpoint}${G}/`,
            h
          );
          const c = M.value.findIndex(
            (S) => S[a.optionValue] === G
          );
          c !== -1 && (M.value[c] = k.data), d.success("Registro atualizado com sucesso");
        } else
          k = await i.post(a.endpoint, h), M.value.unshift(k.data), L.value++, d.success("Registro criado com sucesso");
        ye.value = !1, fe.value = null, Y.value = k.data;
      } catch (h) {
        d.error(je(h, "Erro ao salvar registro"));
      } finally {
        Ce.value = !1;
      }
    }
    function Ve(h) {
      D(async () => {
        try {
          const k = h[a.optionValue];
          await i.delete(`${a.endpoint}${k}/`);
          const G = M.value.findIndex(
            (c) => c[a.optionValue] === k
          );
          G !== -1 && (M.value.splice(G, 1), L.value--), p.value && p.value[a.optionValue] === k && (p.value = null, n("update:modelValue", null)), Y.value && Y.value[a.optionValue] === k && (Y.value = null), d.success("Registro excluído com sucesso");
        } catch (k) {
          d.error(je(k, "Erro ao excluir registro"));
        }
      });
    }
    return (h, k) => {
      const G = dt("tooltip");
      return r(), v(ie, null, [
        y("div", wa, [
          X($(gt), {
            "model-value": p.value,
            suggestions: x.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: V.value,
            fluid: "",
            onComplete: I,
            onItemSelect: H,
            onClear: l
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          Fe((r(), v("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: z
          }, [...k[6] || (k[6] = [
            y("i", { class: "pi pi-search" }, null, -1)
          ])], 8, ka)), [
            [
              G,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        X($(ht), {
          visible: f.value,
          "onUpdate:visible": k[4] || (k[4] = (c) => f.value = c),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: ae(() => [
            y("div", Sa, [
              X($(ue), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: k[3] || (k[3] = (c) => f.value = !1)
              }),
              X($(ue), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !Y.value,
                onClick: De
              }, null, 8, ["disabled"])
            ])
          ]),
          default: ae(() => [
            y("div", $a, [
              X($(mt), { class: "w-autocompletefk-toolbar-search" }, {
                default: ae(() => [
                  X($(pt), { class: "pi pi-search" }),
                  X($(we), {
                    modelValue: w.value,
                    "onUpdate:modelValue": k[0] || (k[0] = (c) => w.value = c),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              y("div", Da, [
                C.value ? (r(), T($(ue), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: ke
                })) : E("", !0)
              ])
            ]),
            X($(ft), {
              selection: Y.value,
              "onUpdate:selection": k[1] || (k[1] = (c) => Y.value = c),
              value: M.value,
              loading: m.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: Q.value,
              "total-records": L.value,
              "sort-field": J.value ?? void 0,
              "sort-order": ee.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: re,
              onSort: k[2] || (k[2] = (c) => de({ sortField: c.sortField, sortOrder: c.sortOrder })),
              onRowDblclick: ve
            }, {
              empty: ae(() => [...k[7] || (k[7] = [
                y("div", { class: "w-autocompletefk-empty" }, " Nenhum registro encontrado ", -1)
              ])]),
              default: ae(() => [
                X($(Re), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (r(!0), v(ie, null, ce(_.value, (c) => (r(), T($(Re), {
                  key: c.field,
                  field: c.field,
                  header: c.header,
                  sortable: c.sortable ?? !0,
                  style: Le(c.style)
                }, {
                  body: ae(({ data: S }) => [
                    c.type ? (r(), T(tt, {
                      key: 0,
                      column: c,
                      value: S[c.field],
                      "row-data": S
                    }, null, 8, ["column", "value", "row-data"])) : (r(), v(ie, { key: 1 }, [
                      We(A(S[c.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                g.value ? (r(), T($(Re), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: ae(({ data: c }) => [
                    y("div", Ca, [
                      b.value ? Fe((r(), T($(ue), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (S) => be(c)
                      }, null, 8, ["onClick"])), [
                        [
                          G,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : E("", !0),
                      o.value ? Fe((r(), T($(ue), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (S) => Ve(c)
                      }, null, 8, ["onClick"])), [
                        [
                          G,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : E("", !0)
                    ])
                  ]),
                  _: 1
                })) : E("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        u.value ? (r(), T(at, {
          key: 0,
          visible: ye.value,
          title: Se.value,
          fields: K.value,
          "form-data": me,
          "is-editing": ge.value,
          saving: Ce.value,
          width: e.dialogWidth,
          "onUpdate:visible": k[5] || (k[5] = (c) => {
            ye.value = c, c || (fe.value = null);
          }),
          "onUpdate:field": Ee,
          onSave: Me
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : E("", !0)
      ], 64);
    };
  }
});
async function xa(e) {
  const t = e.replace(/\D/g, "");
  if (t.length !== 8) return null;
  try {
    const a = await fetch(`https://viacep.com.br/ws/${t}/json/`);
    if (!a.ok) return null;
    const n = await a.json();
    return n.erro ? null : n;
  } catch {
    return null;
  }
}
const Pa = { class: "w-crud-form" }, Ea = {
  key: 0,
  class: "w-crud-form-group-header"
}, Ma = { class: "w-crud-form-group-title" }, Va = {
  key: 0,
  class: "w-crud-form-group-desc"
}, Fa = { class: "w-crud-form-fields" }, Aa = {
  key: 0,
  class: "w-crud-form-switch"
}, Ta = { class: "w-crud-form-switch-label" }, Ya = {
  key: 1,
  class: "w-crud-form-col-full"
}, Ra = { class: "w-crud-form-label" }, Ia = {
  key: 0,
  class: "w-crud-form-required"
}, La = { class: "w-crud-form-color-row" }, Na = {
  key: 2,
  class: "w-crud-form-col-full"
}, Wa = { class: "w-crud-form-label" }, ja = ["accept", "disabled", "onChange"], za = { class: "w-crud-form-label" }, Oa = {
  key: 0,
  class: "w-crud-form-required"
}, Ba = {
  key: 1,
  class: "pi pi-spin pi-spinner w-crud-form-cep-spinner"
}, Ua = {
  key: 15,
  class: "w-crud-form-cep-error"
}, Ha = {
  key: 16,
  class: "w-crud-form-error"
}, qa = /* @__PURE__ */ se({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const n = e, s = a, i = pe({}), d = pe({}), D = pe({}), p = pe({});
    function x(u, C) {
      const b = C.target.value, o = b.replace(/\D/g, "");
      s("update:field", u.field, b), D[u.field] = null, p[u.field] && (clearTimeout(p[u.field]), p[u.field] = null), o.length === 8 && (p[u.field] = setTimeout(async () => {
        d[u.field] = !0, D[u.field] = null;
        try {
          const g = await xa(o);
          if (!g)
            D[u.field] = "CEP não encontrado. Preencha os campos manualmente.";
          else {
            const K = u.cepFields || {}, _ = Object.keys(K);
            for (const Z of _) {
              const z = K[Z];
              if (!z) continue;
              const re = n.formData[z];
              (re == null || re === "") && s("update:field", z, g[Z] ?? "");
            }
          }
        } finally {
          d[u.field] = !1;
        }
      }, 400));
    }
    const V = q(
      () => n.fields.filter((u) => u.visible === void 0 || u.visible === !0 ? !0 : typeof u.visible == "function" ? u.visible(n.formData, n.isEditing) : u.visible)
    );
    function P(u) {
      return n.disabled || u.disabledOnEdit && n.isEditing ? !0 : typeof u.disabled == "function" ? u.disabled(n.formData, n.isEditing) : !!u.disabled;
    }
    function B(u) {
      return Mt(u) ? u.value : u;
    }
    const F = q(() => {
      const u = n.isEditing ? "edit" : "create", C = n.fields.find(
        (o) => o.autofocus === !0 || o.autofocus === u
      );
      if (C) return C.field;
      const b = V.value.find((o) => !(o.type === "switch" || o.type === "fk" || o.type === "select" || o.type === "image" || o.disabled === !0 || o.disabledOnEdit && n.isEditing));
      return (b == null ? void 0 : b.field) ?? null;
    });
    function I(u) {
      return u.field === F.value;
    }
    function H(u) {
      if (u)
        return u.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function l(u) {
      if (!u) return "";
      const C = String(u).replace(/\D/g, "").slice(0, 14);
      return C.length <= 11 ? C.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : C.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function f(u, C) {
      const b = C.target.value.replace(/\D/g, "").slice(0, 14);
      s("update:field", u, b);
    }
    const M = pe({});
    function m(u) {
      const C = n.formData[u.field];
      if (C == null) return null;
      const b = u.optionValue || "value";
      return (B(u.options) || []).find(
        (g) => g[b] === C
      ) ?? null;
    }
    function w(u) {
      return M[u.field] || [];
    }
    function N(u, C) {
      const b = (C.query || "").toLowerCase(), o = B(u.options) || [], g = u.optionLabel || "label";
      M[u.field] = o.filter(
        (K) => String(K[g] || "").toLowerCase().includes(b)
      );
    }
    function Q(u, C) {
      const b = u.optionValue || "value";
      s("update:field", u.field, C.value[b]);
    }
    function L(u) {
      const C = n.formData[u.field];
      return C ? String(C).replace("#", "") : "FFFFFF";
    }
    function Y(u, C) {
      s("update:field", u.field, `#${C}`);
    }
    function J(u) {
      if (typeof u.validate == "function") {
        const C = u.validate(n.formData[u.field]);
        i[u.field] = C || null;
      }
    }
    function ee() {
      const u = [];
      for (const C of n.fields)
        if (typeof C.validate == "function") {
          const b = C.validate(n.formData[C.field]);
          i[C.field] = b || null, b && u.push(b);
        }
      return u;
    }
    function W() {
      Object.keys(i).forEach((u) => delete i[u]);
    }
    const U = q(() => {
      var o, g, K, _;
      const u = /* @__PURE__ */ new Map(), C = [], b = /* @__PURE__ */ new Map();
      for (const Z of V.value) {
        const z = ((o = Z.fieldGroup) == null ? void 0 : o.id) ?? "__default__";
        u.has(z) || (u.set(z, {
          id: z,
          title: (g = Z.fieldGroup) == null ? void 0 : g.title,
          description: (K = Z.fieldGroup) == null ? void 0 : K.description,
          fields: []
        }), C.push(z), ((_ = Z.fieldGroup) == null ? void 0 : _.order) != null && b.set(z, Z.fieldGroup.order)), u.get(z).fields.push(Z);
      }
      return C.slice().sort((Z, z) => {
        const re = b.get(Z), de = b.get(z);
        return re != null && de != null ? re - de : re != null ? -1 : de != null ? 1 : C.indexOf(Z) - C.indexOf(z);
      }).map((Z) => u.get(Z));
    });
    return t({ validateAll: ee, clearErrors: W }), (u, C) => (r(), v("div", Pa, [
      (r(!0), v(ie, null, ce(U.value, (b) => (r(), v("div", {
        key: b.id,
        class: "w-crud-form-group"
      }, [
        b.title ? (r(), v("div", Ea, [
          y("h3", Ma, A(b.title), 1),
          b.description ? (r(), v("p", Va, A(b.description), 1)) : E("", !0)
        ])) : E("", !0),
        y("div", Fa, [
          (r(!0), v(ie, null, ce(b.fields, (o) => R(u.$slots, `field-${o.field}`, {
            key: o.field,
            field: o,
            formData: e.formData,
            isEditing: e.isEditing,
            setFormField: (g, K) => s("update:field", g, K)
          }, () => [
            o.type === "switch" ? (r(), v("div", Aa, [
              X($(Yt), {
                "model-value": e.formData[o.field],
                disabled: P(o),
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
              y("label", Ta, A(o.switchLabel || o.label), 1)
            ])) : o.type === "color" ? (r(), v("div", Ya, [
              y("label", Ra, [
                We(A(o.label) + " ", 1),
                o.required ? (r(), v("span", Ia, "*")) : E("", !0)
              ]),
              y("div", La, [
                X($(Rt), {
                  "model-value": L(o),
                  disabled: P(o),
                  "onUpdate:modelValue": (g) => Y(o, g)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                X($(we), {
                  "model-value": e.formData[o.field],
                  class: "w-28",
                  maxlength: "7",
                  placeholder: "#000000",
                  disabled: P(o),
                  "onUpdate:modelValue": (g) => s("update:field", o.field, g)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
              ])
            ])) : o.type === "image" ? (r(), v("div", Na, [
              y("label", Wa, A(o.label), 1),
              R(u.$slots, `image-${o.field}`, {
                field: o,
                formData: e.formData
              }, () => [
                y("input", {
                  type: "file",
                  accept: o.accept || "image/*",
                  disabled: P(o),
                  onChange: (g) => {
                    var _;
                    const K = ((_ = g.target.files) == null ? void 0 : _[0]) ?? null;
                    s("update:field", o.field, K);
                  }
                }, null, 40, ja)
              ])
            ])) : (r(), v("div", {
              key: 3,
              class: le(o.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
            }, [
              y("label", za, [
                We(A(o.label) + " ", 1),
                o.required ? (r(), v("span", Oa, "*")) : E("", !0),
                d[o.field] ? (r(), v("i", Ba)) : E("", !0)
              ]),
              (!o.type || o.type === "text") && o.mask ? Fe((r(), T($(we), {
                key: 0,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: I(o) || void 0,
                placeholder: o.placeholder,
                disabled: P(o),
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
                [$(Ze), { mask: H(o.mask) }]
              ]) : !o.type || o.type === "text" ? (r(), T($(we), {
                key: 1,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: I(o) || void 0,
                placeholder: o.placeholder,
                disabled: P(o),
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "email" ? (r(), T($(we), {
                key: 2,
                "model-value": e.formData[o.field],
                type: "email",
                fluid: "",
                autofocus: I(o) || void 0,
                placeholder: o.placeholder,
                disabled: P(o),
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "password" ? (r(), T($(It), {
                key: 3,
                "model-value": e.formData[o.field],
                fluid: "",
                "toggle-mask": "",
                feedback: o.feedback !== !1,
                placeholder: o.placeholder,
                disabled: P(o),
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "number" ? (r(), T($(nt), {
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
                disabled: P(o),
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "currency" ? (r(), T($(nt), {
                key: 5,
                "model-value": e.formData[o.field],
                fluid: "",
                mode: "currency",
                currency: "BRL",
                locale: "pt-BR",
                min: o.min,
                max: o.max,
                placeholder: o.placeholder,
                disabled: P(o),
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "select" ? (r(), T($(Tt), {
                key: 6,
                "model-value": e.formData[o.field],
                fluid: "",
                options: B(o.options),
                "option-label": o.optionLabel || "label",
                "option-value": o.optionValue || "value",
                "show-clear": o.showClear !== !1,
                placeholder: o.placeholder,
                disabled: P(o),
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "autocomplete" ? (r(), T($(gt), {
                key: 7,
                "model-value": m(o),
                fluid: "",
                suggestions: w(o),
                "option-label": o.optionLabel || "label",
                placeholder: o.placeholder,
                disabled: P(o),
                onComplete: (g) => N(o, g),
                onItemSelect: (g) => Q(o, g),
                onClear: (g) => s("update:field", o.field, null)
              }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : o.type === "fk" ? (r(), T(Et, {
                key: 8,
                "model-value": e.formData[o.field],
                endpoint: o.endpoint,
                "endpoint-params": o.endpointParams,
                "option-label": o.optionLabel || "nome",
                placeholder: o.placeholder,
                disabled: P(o),
                "show-clear": o.showClear !== !1,
                "dialog-header": o.label,
                "crud-fields": o.crudFields,
                "crud-columns": o.crudColumns,
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "endpoint", "endpoint-params", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : o.type === "date" ? (r(), T($(st), {
                key: 9,
                "model-value": e.formData[o.field],
                fluid: "",
                "date-format": o.dateFormat || "dd/mm/yy",
                placeholder: o.placeholder,
                disabled: P(o),
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "datetime" ? (r(), T($(st), {
                key: 10,
                "model-value": e.formData[o.field],
                fluid: "",
                "show-time": "",
                "hour-format": o.hourFormat || "24",
                "date-format": o.dateFormat || "dd/mm/yy",
                placeholder: o.placeholder,
                disabled: P(o),
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "cpf_cnpj" ? (r(), T($(we), {
                key: 11,
                "model-value": l(e.formData[o.field]),
                fluid: "",
                maxlength: "18",
                placeholder: o.placeholder || "000.000.000-00",
                disabled: P(o),
                invalid: !!i[o.field],
                onInput: (g) => f(o.field, g),
                onBlur: (g) => J(o)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : o.type === "mask" ? Fe((r(), T($(we), {
                key: 12,
                "model-value": e.formData[o.field],
                fluid: "",
                placeholder: o.placeholder,
                disabled: P(o),
                invalid: !!i[o.field],
                "onUpdate:modelValue": (g) => s("update:field", o.field, g),
                onBlur: (g) => J(o)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
                [$(Ze), { mask: H(o.mask) }]
              ]) : o.type === "cep" ? Fe((r(), T($(we), {
                key: 13,
                "model-value": e.formData[o.field],
                fluid: "",
                placeholder: o.placeholder || "00000-000",
                disabled: P(o),
                invalid: !!D[o.field],
                onInput: (g) => x(o, g)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput"])), [
                [$(Ze), { mask: "#####-###" }]
              ]) : o.type === "textarea" ? (r(), T($(At), {
                key: 14,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: I(o) || void 0,
                rows: o.rows || 3,
                placeholder: o.placeholder,
                disabled: P(o),
                "onUpdate:modelValue": (g) => s("update:field", o.field, g)
              }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : E("", !0),
              D[o.field] ? (r(), v("small", Ua, A(D[o.field]), 1)) : i[o.field] ? (r(), v("small", Ha, A(i[o.field]), 1)) : E("", !0)
            ], 2))
          ])), 128))
        ])
      ]))), 128))
    ]));
  }
}), Ka = { class: "w-crud-form-footer" }, at = /* @__PURE__ */ se({
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
    const a = e, n = t, s = j(null);
    function i() {
      s.value ? s.value.validateAll().length === 0 && n("save") : n("save");
    }
    return Ge(
      () => a.visible,
      (d) => {
        d && s.value && s.value.clearErrors();
      }
    ), (d, D) => (r(), T($(ht), {
      visible: e.visible,
      header: e.title,
      style: Le({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": D[2] || (D[2] = (p) => n("update:visible", p))
    }, {
      default: ae(() => [
        y("form", {
          class: "w-crud-form",
          onSubmit: Vt(i, ["prevent"])
        }, [
          X(qa, {
            ref_key: "rendererRef",
            ref: s,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            disabled: e.disabled,
            "onUpdate:field": D[0] || (D[0] = (p, x) => n("update:field", p, x))
          }, Je({ _: 2 }, [
            ce(e.fields, (p) => ({
              name: `field-${p.field}`,
              fn: ae((x) => [
                R(d.$slots, `field-${p.field}`, _e(Xe(x)))
              ])
            })),
            ce(e.fields.filter((p) => p.type === "image"), (p) => ({
              name: `image-${p.field}`,
              fn: ae((x) => [
                R(d.$slots, `image-${p.field}`, _e(Xe(x)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing", "disabled"]),
          y("div", Ka, [
            R(d.$slots, "footer", {
              saving: e.saving,
              disabled: e.disabled
            }, () => [
              X($(ue), {
                type: "button",
                label: e.disabled ? "Fechar" : "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: D[1] || (D[1] = (p) => n("update:visible", !1))
              }, null, 8, ["label", "disabled"]),
              e.disabled ? E("", !0) : (r(), T($(ue), {
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
}), Za = { class: "w-crud" }, Ga = {
  key: 0,
  class: "w-crud-header"
}, Ja = { class: "w-crud-header-content" }, _a = { class: "w-crud-title" }, Xa = {
  key: 0,
  class: "w-crud-subtitle"
}, Qa = { class: "w-crud-header-actions" }, eo = {
  key: 0,
  class: "w-crud-kpis"
}, to = { class: "w-crud-kpi-content" }, ao = { class: "w-crud-kpi-label" }, oo = { class: "w-crud-kpi-value" }, no = { class: "w-crud-table" }, so = { class: "w-crud-toolbar" }, lo = { class: "w-crud-toolbar-start" }, ro = { class: "w-crud-toolbar-end" }, io = { class: "w-crud-actions" }, uo = /* @__PURE__ */ se({
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
    const a = e, n = t, { formatNumber: s } = et(), i = j({}), d = q(
      () => a.crud.config.columns.filter((l) => l.visible !== !1).map((l) => l.type === "number" && !l.align ? { ...l, align: "right" } : l.type === "currency" && !l.align ? { ...l, align: "right" } : l)
    );
    function D(l) {
      if (l.align === "right") return "text-right";
      if (l.align === "center") return "text-center";
    }
    const p = q(() => {
      const l = [];
      return a.crud.config.canCreate !== !1 && a.crud.config.canEdit !== !1 && l.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canDelete !== !1 && l.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), l;
    }), x = q(
      () => a.crud.config.rowActions ?? p.value
    ), V = q(() => x.value.length > 0);
    function P(l, f) {
      l.action === "edit" ? a.crud.openEditDialog(f) : l.action === "view" ? a.crud.openViewDialog(f) : l.action === "delete" ? a.crud.confirmDelete(f) : l.handler && l.handler(f);
    }
    function B(l, f) {
      return l.visible ? l.visible(f) : !0;
    }
    function F(l, f) {
      return l.disabled ? l.disabled(f) : !1;
    }
    const I = q(() => {
      const l = [];
      return a.showKpi && l.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: s(a.crud.pagination.rows, 0)
      }), l.push(...a.extraKpis), l;
    });
    q(() => a.crud.config.labels ?? {});
    const H = q(() => a.crud.config.canCreate !== !1);
    return Ft(() => {
      a.autoInit && a.crud.init();
    }), (l, f) => {
      const M = dt("tooltip");
      return r(), v("div", Za, [
        e.showHeader ? (r(), v("div", Ga, [
          y("div", Ja, [
            y("h1", _a, A(e.title), 1),
            e.subtitle ? (r(), v("p", Xa, A(e.subtitle), 1)) : E("", !0)
          ]),
          y("div", Qa, [
            R(l.$slots, "header-actions"),
            H.value ? (r(), T($(ue), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: f[0] || (f[0] = (m) => e.crud.openCreateDialog())
            })) : E("", !0)
          ])
        ])) : E("", !0),
        R(l.$slots, "before-table", {}, () => [
          I.value.length ? (r(), v("div", eo, [
            (r(!0), v(ie, null, ce(I.value, (m, w) => (r(), v("div", {
              key: w,
              class: "w-crud-kpi"
            }, [
              y("div", {
                class: le(["w-crud-kpi-icon", m.severity ? `w-crud-kpi-icon--${m.severity}` : ""])
              }, [
                y("i", {
                  class: le([m.icon]),
                  style: Le(m.color ? `color: ${m.color}` : "")
                }, null, 6)
              ], 2),
              y("div", to, [
                y("div", ao, A(m.label), 1),
                y("div", oo, A(m.value), 1)
              ])
            ]))), 128))
          ])) : E("", !0)
        ]),
        y("div", no, [
          X($(ft), {
            value: e.crud.items.value,
            loading: e.crud.loading.value,
            "expanded-rows": i.value,
            "onUpdate:expandedRows": f[2] || (f[2] = (m) => i.value = m),
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
            onSort: f[3] || (f[3] = (m) => e.crud.onSort({ sortField: m.sortField, sortOrder: m.sortOrder })),
            onRowExpand: f[4] || (f[4] = (m) => n("row-expand", m.data)),
            onRowCollapse: f[5] || (f[5] = (m) => n("row-collapse", m.data))
          }, Je({
            header: ae(() => [
              y("div", so, [
                y("div", lo, [
                  e.showSearch ? (r(), T($(mt), { key: 0 }, {
                    default: ae(() => [
                      X($(pt), { class: "pi pi-search" }),
                      X($(we), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : E("", !0),
                  R(l.$slots, "toolbar-start"),
                  R(l.$slots, "toolbar-filters")
                ]),
                y("div", ro, [
                  R(l.$slots, "toolbar-actions"),
                  !e.showHeader && H.value ? (r(), T($(ue), {
                    key: 0,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: f[1] || (f[1] = (m) => e.crud.openCreateDialog())
                  })) : E("", !0)
                ])
              ])
            ]),
            empty: ae(() => [
              R(l.$slots, "empty", {}, () => [
                f[9] || (f[9] = y("div", { class: "w-crud-empty" }, [
                  y("div", { class: "w-crud-empty-icon" }, [
                    y("i", { class: "pi pi-inbox" })
                  ]),
                  y("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                  y("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                ], -1))
              ])
            ]),
            default: ae(() => [
              e.expandable ? (r(), T($(Re), {
                key: 0,
                expander: "",
                style: { width: "3rem" }
              })) : E("", !0),
              (r(!0), v(ie, null, ce(d.value, (m) => (r(), T($(Re), {
                key: m.field,
                field: m.field,
                header: m.header,
                sortable: m.sortable,
                style: Le(m.style),
                "header-class": D(m),
                "body-class": D(m)
              }, {
                body: ae(({ data: w }) => [
                  R(l.$slots, `column-${m.field}`, {
                    data: w,
                    value: w[m.field]
                  }, () => [
                    X(tt, {
                      column: m,
                      value: w[m.field],
                      "row-data": w
                    }, null, 8, ["column", "value", "row-data"])
                  ])
                ]),
                _: 2
              }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
              V.value ? (r(), T($(Re), {
                key: 1,
                "header-class": "w-crud-actions-header",
                style: Le({ width: `${x.value.length * 2.5 + 1}rem` })
              }, {
                body: ae(({ data: m }) => [
                  R(l.$slots, "row-actions", {
                    data: m,
                    crud: e.crud
                  }, () => [
                    y("div", io, [
                      (r(!0), v(ie, null, ce(x.value, (w) => (r(), v(ie, {
                        key: w.action
                      }, [
                        B(w, m) ? Fe((r(), T($(ue), {
                          key: 0,
                          icon: w.icon,
                          text: "",
                          rounded: "",
                          size: "small",
                          severity: w.severity,
                          disabled: F(w, m),
                          onClick: (N) => P(w, m)
                        }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                          [
                            M,
                            w.tooltip,
                            void 0,
                            { top: !0 }
                          ]
                        ]) : E("", !0)
                      ], 64))), 128))
                    ])
                  ])
                ]),
                _: 3
              }, 8, ["style"])) : E("", !0)
            ]),
            _: 2
          }, [
            e.expandable ? {
              name: "expansion",
              fn: ae((m) => [
                R(l.$slots, "expansion", {
                  data: m.data
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "onPage"])
        ]),
        R(l.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => {
          var m;
          return [
            X(at, {
              visible: e.crud.dialogVisible.value,
              title: e.crud.dialogTitle.value,
              fields: e.crud.config.form,
              "form-data": e.crud.formData,
              "is-editing": e.crud.isEditing.value,
              saving: e.crud.saving.value,
              disabled: ((m = e.crud.viewMode) == null ? void 0 : m.value) ?? !1,
              width: e.dialogWidth,
              "onUpdate:visible": f[6] || (f[6] = (w) => {
                e.crud.dialogVisible.value = w, w || (e.crud.editingItem.value = null);
              }),
              "onUpdate:field": f[7] || (f[7] = (w, N) => e.crud.setFormField(w, N)),
              onSave: f[8] || (f[8] = (w) => e.crud.save())
            }, Je({ _: 2 }, [
              ce(e.crud.config.form, (w) => ({
                name: `field-${w.field}`,
                fn: ae((N) => [
                  R(l.$slots, `field-${w.field}`, _e(Xe(N)))
                ])
              }))
            ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "disabled", "width"])
          ];
        })
      ]);
    };
  }
}), co = /* @__PURE__ */ se({
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
    return (s, i) => (r(), T($(vt), {
      value: n.value.label,
      severity: n.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), fo = { class: "w-page-header" }, mo = { class: "w-page-header-content" }, po = { class: "w-page-header-title" }, vo = {
  key: 0,
  class: "w-page-header-subtitle"
}, ho = { class: "w-page-header-actions" }, Rn = /* @__PURE__ */ se({
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
    return (n, s) => (r(), v("div", fo, [
      y("div", mo, [
        y("h2", po, A(e.title), 1),
        e.subtitle ? (r(), v("p", vo, A(e.subtitle), 1)) : E("", !0)
      ]),
      y("div", ho, [
        R(n.$slots, "actions"),
        e.actionLabel ? (r(), T($(ue), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: s[0] || (s[0] = (i) => a("action"))
        }, null, 8, ["label", "icon"])) : E("", !0)
      ])
    ]));
  }
}), go = { class: "w-empty-state" }, yo = { class: "w-empty-state-icon" }, bo = { class: "w-empty-state-title" }, wo = {
  key: 0,
  class: "w-empty-state-description"
}, In = /* @__PURE__ */ se({
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
    return (n, s) => (r(), v("div", go, [
      y("div", yo, [
        y("i", {
          class: le(e.icon)
        }, null, 2)
      ]),
      y("p", bo, A(e.title), 1),
      e.description ? (r(), v("p", wo, A(e.description), 1)) : E("", !0),
      e.actionLabel ? (r(), T($(ue), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: s[0] || (s[0] = (i) => a("action"))
      }, null, 8, ["label", "icon"])) : E("", !0)
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
const ko = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
function $o() {
  return Ae(ko);
}
const Do = { class: "w-detail-header" }, Co = { class: "w-detail-header-left" }, So = { class: "w-detail-header-content" }, xo = { class: "w-detail-header-title" }, Po = {
  key: 0,
  class: "w-detail-header-subtitle"
}, Eo = { class: "w-detail-header-actions" }, Ln = /* @__PURE__ */ se({
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
    const t = e, a = $o();
    function n() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (s, i) => (r(), v("div", Do, [
      y("div", Co, [
        X($(ue), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: n
        }),
        e.icon ? (r(), v("i", {
          key: 0,
          class: le([e.icon, "w-detail-header-icon"])
        }, null, 2)) : E("", !0),
        y("div", So, [
          y("h2", xo, A(e.title), 1),
          e.subtitle ? (r(), v("p", Po, A(e.subtitle), 1)) : E("", !0)
        ]),
        e.status ? (r(), T(co, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : E("", !0)
      ]),
      y("div", Eo, [
        R(s.$slots, "actions")
      ])
    ]));
  }
}), Mo = { class: "w-info-card" }, Vo = {
  key: 0,
  class: "w-info-card-title"
}, Fo = { class: "w-info-card-grid" }, Ao = { class: "w-info-card-label" }, To = { class: "w-info-card-value" }, Nn = /* @__PURE__ */ se({
  __name: "WInfoCard",
  props: {
    title: {},
    fields: {}
  },
  setup(e) {
    const { formatCurrency: t, formatDate: a, formatNumber: n } = et();
    function s(i) {
      const d = i.value;
      return d == null || d === "" ? "-" : i.format === "currency" ? t(Number(d)) : i.format === "date" ? a(String(d)) : i.format === "datetime" ? a(String(d), "DD/MM/YYYY HH:mm") : i.format === "number" ? n(Number(d)) : String(d);
    }
    return (i, d) => (r(), v("div", Mo, [
      e.title ? (r(), v("h3", Vo, A(e.title), 1)) : E("", !0),
      y("div", Fo, [
        (r(!0), v(ie, null, ce(e.fields, (D) => (r(), v("div", {
          key: D.label,
          class: "w-info-card-field"
        }, [
          y("span", Ao, A(D.label), 1),
          y("span", To, A(s(D)), 1)
        ]))), 128))
      ])
    ]));
  }
}), Yo = {
  key: 0,
  class: "w-kpi-card__loading"
}, Ro = { class: "w-kpi-card__loading-content" }, Io = { class: "w-kpi-card__header" }, Lo = {
  key: 0,
  class: "w-kpi-card__icon"
}, No = {
  key: 1,
  class: "w-kpi-card__trend"
}, Wo = { class: "w-kpi-card__content" }, jo = { class: "w-kpi-card__label" }, zo = { class: "w-kpi-card__value" }, Oo = {
  key: 0,
  class: "w-kpi-card__hint"
}, Bo = {
  key: 0,
  class: "w-kpi-card__footer"
}, Uo = /* @__PURE__ */ se({
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
    return (t, a) => (r(), v("article", {
      class: le(["w-kpi-card", e.severity ? `w-kpi-card--${e.severity}` : ""])
    }, [
      e.loading ? (r(), v("div", Yo, [
        X($(ze), {
          shape: "circle",
          size: "2.75rem"
        }),
        y("div", Ro, [
          X($(ze), {
            width: "6rem",
            height: "0.75rem"
          }),
          X($(ze), {
            width: "7.5rem",
            height: "1.5rem"
          }),
          X($(ze), {
            width: "5rem",
            height: "0.75rem"
          })
        ])
      ])) : (r(), v(ie, { key: 1 }, [
        y("div", Io, [
          e.icon || t.$slots.icon ? (r(), v("div", Lo, [
            R(t.$slots, "icon", {}, () => [
              e.icon ? (r(), v("i", {
                key: 0,
                class: le(e.icon)
              }, null, 2)) : E("", !0)
            ])
          ])) : E("", !0),
          e.trend || t.$slots.trend ? (r(), v("div", No, [
            R(t.$slots, "trend", {}, () => [
              e.trend ? (r(), v("span", {
                key: 0,
                class: le(["w-kpi-card__trend-badge", e.trend.direction ? `w-kpi-card__trend-badge--${e.trend.direction}` : ""])
              }, A(e.trend.value), 3)) : E("", !0)
            ])
          ])) : E("", !0)
        ]),
        y("div", Wo, [
          y("p", jo, A(e.label), 1),
          y("div", zo, [
            R(t.$slots, "value", {}, () => [
              We(A(e.value), 1)
            ])
          ]),
          e.hint || t.$slots.hint ? (r(), v("p", Oo, [
            R(t.$slots, "hint", {}, () => [
              We(A(e.hint), 1)
            ])
          ])) : E("", !0)
        ]),
        t.$slots.footer ? (r(), v("footer", Bo, [
          R(t.$slots, "footer")
        ])) : E("", !0)
      ], 64))
    ], 2));
  }
}), Wn = /* @__PURE__ */ se({
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
    return (n, s) => (r(), v("div", {
      class: le(["w-kpi-grid", a.value])
    }, [
      n.$slots.item ? (r(!0), v(ie, { key: 0 }, ce(e.items, (i, d) => R(n.$slots, "item", {
        key: d,
        item: i,
        index: d
      })), 128)) : (r(!0), v(ie, { key: 1 }, ce(e.items, (i, d) => (r(), T(Uo, {
        key: d,
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
}), Ho = { class: "w-section-header__main" }, qo = {
  key: 0,
  class: "w-section-header__icon"
}, Ko = { class: "w-section-header__content" }, Zo = { class: "w-section-header__title-row" }, Go = { class: "w-section-header__title" }, Jo = {
  key: 0,
  class: "w-section-header__subtitle"
}, _o = {
  key: 0,
  class: "w-section-header__actions"
}, jn = /* @__PURE__ */ se({
  __name: "WSectionHeader",
  props: {
    title: {},
    subtitle: {},
    icon: {},
    compact: { type: Boolean }
  },
  setup(e) {
    return (t, a) => (r(), v("div", {
      class: le(["w-section-header", { "w-section-header--compact": e.compact }])
    }, [
      y("div", Ho, [
        e.icon || t.$slots.icon ? (r(), v("div", qo, [
          R(t.$slots, "icon", {}, () => [
            e.icon ? (r(), v("i", {
              key: 0,
              class: le(e.icon)
            }, null, 2)) : E("", !0)
          ])
        ])) : E("", !0),
        y("div", Ko, [
          y("div", Zo, [
            y("h3", Go, A(e.title), 1),
            R(t.$slots, "meta")
          ]),
          e.subtitle ? (r(), v("p", Jo, A(e.subtitle), 1)) : E("", !0)
        ])
      ]),
      t.$slots.actions ? (r(), v("div", _o, [
        R(t.$slots, "actions")
      ])) : E("", !0)
    ], 2));
  }
}), Xo = {
  key: 0,
  class: "w-form-section__header"
}, Qo = { class: "w-form-section__content" }, en = { class: "w-form-section__title" }, tn = {
  key: 0,
  class: "w-form-section__description"
}, an = {
  key: 0,
  class: "w-form-section__actions"
}, on = { class: "w-form-section__body" }, zn = /* @__PURE__ */ se({
  __name: "WFormSection",
  props: {
    title: {},
    description: {},
    variant: {}
  },
  setup(e) {
    return (t, a) => (r(), v("section", {
      class: le(["w-form-section", e.variant ? `w-form-section--${e.variant}` : ""])
    }, [
      e.title || e.description || t.$slots.actions ? (r(), v("div", Xo, [
        y("div", Qo, [
          y("h3", en, A(e.title), 1),
          e.description ? (r(), v("p", tn, A(e.description), 1)) : E("", !0)
        ]),
        t.$slots.actions ? (r(), v("div", an, [
          R(t.$slots, "actions")
        ])) : E("", !0)
      ])) : E("", !0),
      y("div", on, [
        R(t.$slots, "default")
      ])
    ], 2));
  }
}), nn = {
  key: 0,
  class: "w-action-bar__primary"
}, sn = {
  key: 1,
  class: "w-action-bar__filters"
}, ln = {
  key: 2,
  class: "w-action-bar__secondary"
}, On = /* @__PURE__ */ se({
  __name: "WActionBar",
  props: {
    align: { default: "between" },
    stackOnMobile: { type: Boolean, default: !0 }
  },
  setup(e) {
    return (t, a) => (r(), v("div", {
      class: le(["w-action-bar", [
        `w-action-bar--${e.align}`,
        { "w-action-bar--stack": e.stackOnMobile }
      ]])
    }, [
      t.$slots.primary || t.$slots.default ? (r(), v("div", nn, [
        R(t.$slots, "primary", {}, () => [
          R(t.$slots, "default")
        ])
      ])) : E("", !0),
      t.$slots.filters ? (r(), v("div", sn, [
        R(t.$slots, "filters")
      ])) : E("", !0),
      t.$slots.secondary ? (r(), v("div", ln, [
        R(t.$slots, "secondary")
      ])) : E("", !0)
    ], 2));
  }
}), rn = { class: "w-progress-flow__marker" }, un = { class: "w-progress-flow__content" }, cn = { class: "w-progress-flow__label" }, dn = {
  key: 0,
  class: "w-progress-flow__description"
}, Bn = /* @__PURE__ */ se({
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
    function n(s) {
      return s < a.value ? "done" : s === a.value ? "current" : "pending";
    }
    return (s, i) => (r(), v("div", {
      class: le(["w-progress-flow", `w-progress-flow--${e.orientation}`])
    }, [
      (r(!0), v(ie, null, ce(e.steps, (d, D) => (r(), v("div", {
        key: d.key,
        class: le(["w-progress-flow__step", `w-progress-flow__step--${n(D)}`])
      }, [
        R(s.$slots, "step", {
          step: d,
          index: D,
          state: n(D)
        }, () => [
          y("div", rn, [
            y("span", null, A(D + 1), 1)
          ]),
          y("div", un, [
            y("p", cn, A(d.label), 1),
            d.description ? (r(), v("p", dn, A(d.description), 1)) : E("", !0)
          ])
        ])
      ], 2))), 128))
    ], 2));
  }
}), Un = {
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
    e.provide(He, t.axios), e.provide(qe, a), t.registerComponents !== !1 && (e.component("WCrudView", uo), e.component("WCrudFormDialog", at), e.component("WCrudColumnRenderer", tt), e.component("WAutoCompleteFK", Et));
  }
}, fn = {
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
function Hn(e) {
  const {
    endpoint: t,
    columns: a,
    form: n,
    pk: s = "id",
    searchDebounce: i = 300,
    canCreate: d = !0,
    canEdit: D = !0,
    canDelete: p = !0,
    rowActions: x = void 0,
    filterParams: V = void 0,
    createDefaults: P = void 0,
    transformPayload: B = void 0,
    onAfterSave: F = void 0,
    onAfterDelete: I = void 0
  } = e, H = Ae(He);
  if (!H)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const l = H, f = Ae(qe), M = e.pageSize ?? (f == null ? void 0 : f.defaultPageSize) ?? 20, m = { ...fn, ...e.labels }, w = xt(), { confirmDelete: N } = Pt(), Q = j([]), L = j({}), Y = j(!1), J = j(!1), ee = j(""), W = j(!1), U = j(!1), u = j(null), C = pe({}), b = pe({
    page: 1,
    pageSize: M,
    rows: 0,
    totalPages: 0
  }), o = pe({
    field: null,
    order: 0
  });
  function g() {
    const c = {};
    for (const S of n)
      c[S.field] = S.defaultValue !== void 0 ? typeof S.defaultValue == "function" ? S.defaultValue() : S.defaultValue : null;
    return c;
  }
  const K = g();
  for (const c of Object.keys(K))
    C[c] = K[c];
  const _ = q(() => u.value !== null && !U.value), Z = q(() => U.value), z = q(
    () => U.value ? m.viewTitle ?? "Visualizar Registro" : _.value ? m.editTitle : m.createTitle
  ), re = q(() => b.page <= 1), de = q(() => b.page >= b.totalPages);
  let De = null;
  async function ve(c = {}) {
    Y.value = !0;
    try {
      const S = {
        page: b.page,
        page_size: b.pageSize,
        ...c
      };
      ee.value && (S.search = ee.value), o.field && o.order !== 0 && (S.ordering = o.order === -1 ? `-${o.field}` : o.field), V && Object.assign(S, V());
      const oe = (await l.get(t, { params: S })).data;
      Array.isArray(oe.results) ? (Q.value = oe.results, b.rows = oe.count ?? 0) : (Q.value = oe.data ?? [], b.rows = oe.rows ?? 0), oe.extras && (L.value = oe.extras), oe.page && (b.page = oe.page), oe.page_size && (b.pageSize = oe.page_size), b.totalPages = Math.ceil(b.rows / b.pageSize) || 0;
    } finally {
      Y.value = !1;
    }
  }
  async function ye() {
    await ve();
  }
  async function Ce() {
    await ve();
  }
  function fe(c) {
    ee.value = c, De && clearTimeout(De), De = setTimeout(() => {
      b.page = 1, ve();
    }, i);
  }
  function me(c) {
    const S = c.target;
    fe(S.value);
  }
  function ge(c) {
    b.page = c, ve();
  }
  function Se() {
    ge(1);
  }
  function xe() {
    ge(b.totalPages);
  }
  function Pe(c) {
    b.page = c.page + 1, b.pageSize = c.rows, ve();
  }
  function ke(c) {
    o.field = c.sortField ?? null, o.order = c.sortOrder ?? 0, b.page = 1, ve();
  }
  function be() {
    const c = g();
    for (const S of Object.keys(c))
      C[S] = c[S];
  }
  function Ee(c, S) {
    C[c] = S;
  }
  function Me() {
    if (U.value = !1, u.value = null, be(), P) {
      const c = P();
      for (const [S, O] of Object.entries(c))
        C[S] = O;
    }
    W.value = !0;
  }
  function Ve(c) {
    U.value = !1, u.value = c;
    for (const S of n) {
      let O = c[S.field] !== void 0 ? c[S.field] : null;
      O && (S.type === "date" || S.type === "datetime") && typeof O == "string" && (O = Qe(O)), C[S.field] = O;
    }
    W.value = !0;
  }
  function h(c) {
    U.value = !0, u.value = c;
    for (const S of n) {
      let O = c[S.field] !== void 0 ? c[S.field] : null;
      O && (S.type === "date" || S.type === "datetime") && typeof O == "string" && (O = Qe(O)), C[S.field] = O;
    }
    W.value = !0;
  }
  async function k() {
    for (const c of n) {
      if (c.validate) {
        const S = c.validate(C[c.field]);
        if (S)
          return w.error(S), null;
      }
      if (c.required) {
        const S = C[c.field];
        if (S == null || S === "")
          return w.error(`${c.label} é obrigatório`), null;
      }
    }
    J.value = !0;
    try {
      let c = { ...C };
      !_.value && P && Object.assign(c, P());
      for (const te of n) {
        const ne = c[te.field];
        if (te.type === "date" && ne instanceof Date ? c[te.field] = yt(ne) : te.type === "datetime" && ne instanceof Date && (c[te.field] = bt(ne)), te.type === "fk" && ne !== null && typeof ne == "object") {
          const he = te.optionValue || "id";
          c[te.field] = ne[he] ?? ne;
        }
        (te.type === "mask" || te.type === "cpf_cnpj") && typeof ne == "string" && (c[te.field] = $e(ne));
      }
      B && (c = B(c, _.value));
      const S = n.some(
        (te) => te.type === "image" && c[te.field] instanceof File
      );
      let O = c, oe;
      if (S) {
        const te = new Set(
          n.filter((he) => he.type === "image").map((he) => he.field)
        ), ne = new FormData();
        for (const [he, Ie] of Object.entries(c))
          if (Ie != null)
            if (Ie instanceof File)
              ne.append(he, Ie);
            else {
              if (te.has(he))
                continue;
              ne.append(he, String(Ie));
            }
        O = ne, oe = { "Content-Type": "multipart/form-data" };
      }
      const ot = oe ? { headers: oe } : void 0;
      let Ye;
      if (_.value && u.value) {
        const te = u.value[s];
        Ye = await l.patch(
          `${t}${te}/`,
          O,
          ot
        );
        const ne = Q.value.findIndex(
          (he) => he[s] === te
        );
        ne !== -1 && (Q.value[ne] = Ye.data), w.success(m.successUpdate);
      } else
        Ye = await l.post(t, O, ot), Q.value.unshift(Ye.data), b.rows++, w.success(m.successCreate);
      return W.value = !1, u.value = null, F && F(Ye.data, _.value), Ye.data;
    } catch (c) {
      return w.error(je(c, "Erro ao salvar registro")), null;
    } finally {
      J.value = !1;
    }
  }
  function G(c) {
    N(async () => {
      try {
        const S = c[s];
        await l.delete(`${t}${S}/`);
        const O = Q.value.findIndex(
          (oe) => oe[s] === S
        );
        O !== -1 && (Q.value.splice(O, 1), b.rows--), w.success(m.successDelete), I && I(c);
      } catch (S) {
        w.error(je(S, "Erro ao excluir registro"));
      }
    }, m.deleteConfirmMessage);
  }
  return {
    items: Q,
    extras: L,
    loading: Y,
    saving: J,
    search: ee,
    dialogVisible: W,
    editingItem: u,
    formData: C,
    pagination: b,
    sort: o,
    isEditing: _,
    isViewing: Z,
    viewMode: U,
    dialogTitle: z,
    isFirstPage: re,
    isLastPage: de,
    init: ye,
    fetchItems: ve,
    refresh: Ce,
    setSearch: fe,
    onSearch: me,
    onPage: Pe,
    onSort: ke,
    openCreateDialog: Me,
    openEditDialog: Ve,
    openViewDialog: h,
    save: k,
    confirmDelete: G,
    setFormField: Ee,
    resetForm: be,
    goToPage: ge,
    firstPage: Se,
    lastPage: xe,
    config: e
  };
}
function qn(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: n = !1 } = e, s = Ae(He);
  if (!s)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const i = s, d = Ae(qe), D = e.pageSize ?? (d == null ? void 0 : d.defaultPageSize) ?? 20, p = j([]), x = j(!1), V = j(""), P = j({}), B = pe({}), F = pe({
    page: 1,
    pageSize: D,
    rows: 0,
    totalPages: 0
  }), I = pe({
    field: null,
    order: 0
  });
  let H = null;
  async function l(L = {}) {
    x.value = !0;
    try {
      const Y = {
        page: F.page,
        page_size: F.pageSize,
        ...L
      };
      V.value && (Y.search = V.value), I.field && I.order !== 0 && (Y.ordering = I.order === -1 ? `-${I.field}` : I.field);
      for (const [U, u] of Object.entries(B))
        u != null && u !== "" && (Y[U] = u);
      const W = (await i.get(t, {
        params: Y
      })).data;
      Array.isArray(W.results) ? (p.value = W.results, F.rows = W.count ?? 0) : (p.value = W.data ?? [], F.rows = W.rows ?? 0), W.page && (F.page = W.page), W.page_size && (F.pageSize = W.page_size), F.totalPages = Math.ceil(F.rows / F.pageSize) || 0, P.value = W.extras ?? {};
    } finally {
      x.value = !1;
    }
  }
  async function f() {
    await l();
  }
  function M(L) {
    V.value = L, H && clearTimeout(H), H = setTimeout(() => {
      F.page = 1, l();
    }, a);
  }
  function m(L, Y) {
    B[L] = Y, F.page = 1, l();
  }
  function w() {
    for (const L of Object.keys(B))
      delete B[L];
    F.page = 1, l();
  }
  function N(L) {
    F.page = L.page + 1, F.pageSize = L.rows, l();
  }
  function Q(L) {
    I.field = L.sortField ?? null, I.order = L.sortOrder ?? 0, F.page = 1, l();
  }
  return n && l(), {
    items: p,
    loading: x,
    search: V,
    pagination: F,
    sort: I,
    extras: P,
    fetchItems: l,
    refresh: f,
    setSearch: M,
    setFilter: m,
    clearFilters: w,
    onPage: N,
    onSort: Q
  };
}
export {
  fn as DEFAULT_CRUD_LABELS,
  On as WActionBar,
  Et as WAutoCompleteFK,
  tt as WCrudColumnRenderer,
  at as WCrudFormDialog,
  uo as WCrudView,
  Ln as WDetailHeader,
  In as WEmptyState,
  qa as WFormRenderer,
  zn as WFormSection,
  Nn as WInfoCard,
  Uo as WKpiCard,
  Wn as WKpiGrid,
  Rn as WPageHeader,
  Un as WPrimeVuePlugin,
  Bn as WProgressFlow,
  jn as WSectionHeader,
  co as WStatusTag,
  He as W_AXIOS_KEY,
  qe as W_CONFIG_KEY,
  je as extractApiError,
  ha as mapApiFieldToColumnDef,
  ma as mapApiFieldToFieldDef,
  ga as mapApiFieldsToColumnDefs,
  pa as mapApiFieldsToFieldDefs,
  qn as useApi,
  Yn as useApiError,
  Pt as useAppConfirm,
  xt as useAppToast,
  Hn as useCrudManager,
  et as useFormatters
};
//# sourceMappingURL=index.js.map
