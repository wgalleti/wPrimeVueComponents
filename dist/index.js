import { inject as Ae, defineComponent as se, openBlock as l, createElementBlock as v, createBlock as Y, unref as $, toDisplayString as T, ref as j, watch as Ge, computed as K, reactive as pe, resolveDirective as dt, Fragment as ie, createElementVNode as b, createVNode as Q, withDirectives as Fe, withCtx as ae, createCommentVNode as V, renderList as ce, normalizeStyle as Le, createTextVNode as We, renderSlot as I, normalizeClass as le, isRef as Mt, withModifiers as Vt, createSlots as Je, normalizeProps as _e, guardReactiveProps as Xe, useSlots as Ft, onMounted as At } from "vue";
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
import Tt from "primevue/textarea";
import Yt from "primevue/select";
import gt from "primevue/autocomplete";
import st from "primevue/datepicker";
import Rt from "primevue/toggleswitch";
import It from "primevue/colorpicker";
import Lt from "primevue/password";
import { useToast as Nt } from "primevue/usetoast";
import { useConfirm as Wt } from "primevue/useconfirm";
import ze from "primevue/skeleton";
const He = Symbol("w-axios"), qe = Symbol("w-config");
function jt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Be = { exports: {} }, zt = Be.exports, lt;
function Ot() {
  return lt || (lt = 1, (function(e, t) {
    (function(a, n) {
      e.exports = n();
    })(zt, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, n = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, s = /\d/, r = /\d\d/, c = /\d\d?/, D = /\d*[^-_:/,()\s\d]+/, m = {}, P = function(f) {
        return (f = +f) + (f > 68 ? 1900 : 2e3);
      }, F = function(f) {
        return function(d) {
          this[f] = +d;
        };
      }, E = [/[+-]\d\d:?(\d\d)?|Z/, function(f) {
        (this.zone || (this.zone = {})).offset = (function(d) {
          if (!d || d === "Z") return 0;
          var h = d.match(/([+-]|\d\d)/g), M = 60 * h[1] + (+h[2] || 0);
          return M === 0 ? 0 : h[0] === "+" ? -M : M;
        })(f);
      }], B = function(f) {
        var d = m[f];
        return d && (d.indexOf ? d : d.s.concat(d.f));
      }, A = function(f, d) {
        var h, M = m.meridiem;
        if (M) {
          for (var p = 1; p <= 24; p += 1) if (f.indexOf(M(p, 0, d)) > -1) {
            h = p > 12;
            break;
          }
        } else h = f === (d ? "pm" : "PM");
        return h;
      }, N = { A: [D, function(f) {
        this.afternoon = A(f, !1);
      }], a: [D, function(f) {
        this.afternoon = A(f, !0);
      }], Q: [s, function(f) {
        this.month = 3 * (f - 1) + 1;
      }], S: [s, function(f) {
        this.milliseconds = 100 * +f;
      }], SS: [r, function(f) {
        this.milliseconds = 10 * +f;
      }], SSS: [/\d{3}/, function(f) {
        this.milliseconds = +f;
      }], s: [c, F("seconds")], ss: [c, F("seconds")], m: [c, F("minutes")], mm: [c, F("minutes")], H: [c, F("hours")], h: [c, F("hours")], HH: [c, F("hours")], hh: [c, F("hours")], D: [c, F("day")], DD: [r, F("day")], Do: [D, function(f) {
        var d = m.ordinal, h = f.match(/\d+/);
        if (this.day = h[0], d) for (var M = 1; M <= 31; M += 1) d(M).replace(/\[|\]/g, "") === f && (this.day = M);
      }], w: [c, F("week")], ww: [r, F("week")], M: [c, F("month")], MM: [r, F("month")], MMM: [D, function(f) {
        var d = B("months"), h = (B("monthsShort") || d.map((function(M) {
          return M.slice(0, 3);
        }))).indexOf(f) + 1;
        if (h < 1) throw new Error();
        this.month = h % 12 || h;
      }], MMMM: [D, function(f) {
        var d = B("months").indexOf(f) + 1;
        if (d < 1) throw new Error();
        this.month = d % 12 || d;
      }], Y: [/[+-]?\d+/, F("year")], YY: [r, function(f) {
        this.year = P(f);
      }], YYYY: [/\d{4}/, F("year")], Z: E, ZZ: E };
      function H(f) {
        var d, h;
        d = f, h = m && m.formats;
        for (var M = (f = d.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(ee, W, U) {
          var i = U && U.toUpperCase();
          return W || h[U] || a[U] || h[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(C, w, o) {
            return w || o.slice(1);
          }));
        }))).match(n), p = M.length, x = 0; x < p; x += 1) {
          var q = M[x], L = N[q], R = L && L[0], _ = L && L[1];
          M[x] = _ ? { regex: R, parser: _ } : q.replace(/^\[|\]$/g, "");
        }
        return function(ee) {
          for (var W = {}, U = 0, i = 0; U < p; U += 1) {
            var C = M[U];
            if (typeof C == "string") i += C.length;
            else {
              var w = C.regex, o = C.parser, y = ee.slice(i), Z = w.exec(y)[0];
              o.call(W, Z), ee = ee.replace(Z, "");
            }
          }
          return (function(X) {
            var G = X.afternoon;
            if (G !== void 0) {
              var z = X.hours;
              G ? z < 12 && (X.hours += 12) : z === 12 && (X.hours = 0), delete X.afternoon;
            }
          })(W), W;
        };
      }
      return function(f, d, h) {
        h.p.customParseFormat = !0, f && f.parseTwoDigitYear && (P = f.parseTwoDigitYear);
        var M = d.prototype, p = M.parse;
        M.parse = function(x) {
          var q = x.date, L = x.utc, R = x.args;
          this.$u = L;
          var _ = R[1];
          if (typeof _ == "string") {
            var ee = R[2] === !0, W = R[3] === !0, U = ee || W, i = R[2];
            W && (i = R[2]), m = this.$locale(), !ee && i && (m = h.Ls[i]), this.$d = (function(y, Z, X, G) {
              try {
                if (["x", "X"].indexOf(Z) > -1) return new Date((Z === "X" ? 1e3 : 1) * y);
                var z = H(Z)(y), re = z.year, de = z.month, De = z.day, ve = z.hours, ye = z.minutes, Ce = z.seconds, fe = z.milliseconds, me = z.zone, ge = z.week, Se = /* @__PURE__ */ new Date(), xe = De || (re || de ? 1 : Se.getDate()), Pe = re || Se.getFullYear(), ke = 0;
                re && !de || (ke = de > 0 ? de - 1 : Se.getMonth());
                var be, Ee = ve || 0, Me = ye || 0, Ve = Ce || 0, g = fe || 0;
                return me ? new Date(Date.UTC(Pe, ke, xe, Ee, Me, Ve, g + 60 * me.offset * 1e3)) : X ? new Date(Date.UTC(Pe, ke, xe, Ee, Me, Ve, g)) : (be = new Date(Pe, ke, xe, Ee, Me, Ve, g), ge && (be = G(be).week(ge).toDate()), be);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(q, _, L, h), this.init(), i && i !== !0 && (this.$L = this.locale(i).$L), U && q != this.format(_) && (this.$d = /* @__PURE__ */ new Date("")), m = {};
          } else if (_ instanceof Array) for (var C = _.length, w = 1; w <= C; w += 1) {
            R[1] = _[w - 1];
            var o = h.apply(this, R);
            if (o.isValid()) {
              this.$d = o.$d, this.$L = o.$L, this.init();
              break;
            }
            w === C && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else p.call(this, x);
        };
      };
    }));
  })(Be)), Be.exports;
}
var Bt = Ot();
const Ut = /* @__PURE__ */ jt(Bt);
Te.extend(Ut);
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
function Ht(e, t = "DD/MM/YYYY") {
  return e ? Te(e).format(t) : "—";
}
function qt(e) {
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
function Kt(e) {
  if (!e) return "—";
  const t = $e(e);
  return t.length === 11 ? wt(e) : t.length === 14 ? kt(e) : e;
}
function Zt(e) {
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
  for (let c = 0; c < 9; c++) a += parseInt(t[c]) * (10 - c);
  let n = a % 11;
  const s = n < 2 ? 0 : 11 - n;
  if (parseInt(t[9]) !== s) return "CPF inválido.";
  a = 0;
  for (let c = 0; c < 10; c++) a += parseInt(t[c]) * (11 - c);
  n = a % 11;
  const r = n < 2 ? 0 : 11 - n;
  return parseInt(t[10]) !== r ? "CPF inválido." : null;
}
function Dt(e) {
  if (!e) return null;
  const t = $e(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let n = 0;
  for (let m = 0; m < 12; m++) n += parseInt(t[m]) * a[m];
  let s = n % 11;
  const r = s < 2 ? 0 : 11 - s;
  if (parseInt(t[12]) !== r) return "CNPJ inválido.";
  const c = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  n = 0;
  for (let m = 0; m < 13; m++) n += parseInt(t[m]) * c[m];
  s = n % 11;
  const D = s < 2 ? 0 : 11 - s;
  return parseInt(t[13]) !== D ? "CNPJ inválido." : null;
}
function Gt(e) {
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
function Jt(e, t) {
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
  function n(m) {
    return m == null ? "—" : Jt(t, a).format(m);
  }
  function s(m, P = 2) {
    return m == null ? "—" : rt(t, P).format(m);
  }
  function r(m, P) {
    return Ht(m, P ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function c(m) {
    return qt(m);
  }
  function D(m) {
    return m == null ? "—" : `${rt(t, 2).format(m)}%`;
  }
  return {
    formatCurrency: n,
    formatNumber: s,
    formatDate: r,
    formatDateTime: c,
    formatPercent: D,
    formatCpf: wt,
    formatCnpj: kt,
    formatCpfCnpj: Kt,
    formatTelefone: Zt,
    validateCpf: $t,
    validateCnpj: Dt,
    validateCpfCnpj: Gt,
    parseDate: Qe,
    toDateString: yt,
    toDateTimeString: bt
  };
}
const _t = {
  key: 0,
  class: "text-muted-color text-xs"
}, Xt = ["src", "alt"], Qt = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, ea = {
  key: 4,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, ta = {
  key: 5,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, aa = {
  key: 6,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, oa = {
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
    return (r, c) => e.value == null ? (l(), v("span", _t, "—")) : e.column.type === "image" ? (l(), v("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, Xt)) : e.column.type === "boolean" ? (l(), Y($(vt), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (l(), v("span", Qt, T($(t)(e.value)), 1)) : e.column.type === "datetime" ? (l(), v("span", ea, T($(a)(e.value)), 1)) : e.column.type === "currency" ? (l(), v("span", ta, T($(n)(e.value)), 1)) : e.column.type === "number" ? (l(), v("span", aa, T(e.column.format ? e.column.format(e.value, e.rowData) : $(s)(e.value, e.column.decimals ?? 0)), 1)) : (l(), v("span", oa, T(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var na = Object.defineProperty, sa = (e, t, a) => t in e ? na(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, Ne = (e, t, a) => sa(e, typeof t != "symbol" ? t + "" : t, a);
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
}, la = (e, t = !0, a) => {
  var n, s, r, c;
  const D = ((n = a.number) == null ? void 0 : n.unsigned) !== !0 && e.startsWith("-") ? "-" : "", m = ((s = a.number) == null ? void 0 : s.fraction) ?? 0;
  let P = ct(0, m, a);
  const F = P.formatToParts(1000.12), E = ((r = F.find((f) => f.type === "group")) == null ? void 0 : r.value) ?? " ", B = ((c = F.find((f) => f.type === "decimal")) == null ? void 0 : c.value) ?? ".", A = ut(e, E, B);
  if (Number.isNaN(parseFloat(A))) return D;
  const N = A.split(".");
  if (N[1] != null && N[1].length >= 1) {
    const f = N[1].length <= m ? N[1].length : m;
    P = ct(f, m, a);
  }
  let H = P.format(parseFloat(A));
  return t ? m > 0 && A.endsWith(".") && !A.slice(0, -1).includes(".") && (H += B) : H = ut(H, E, B), D + H;
}, Ct = (e) => JSON.parse(e.replaceAll("'", '"')), ra = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = ia(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = Oe(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = Oe(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = Oe(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = ua(e.dataset.maskaTokens));
  const n = {};
  return e.dataset.maskaNumberLocale != null && (n.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (n.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (n.unsigned = Oe(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(n).length > 0) && (a.number = n), a;
}, Oe = (e) => e !== "" ? !!JSON.parse(e) : !0, ia = (e) => e.startsWith("[") && e.endsWith("]") ? Ct(e) : e, ua = (e) => {
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
class ca {
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
    return t.split("").forEach((s, r) => {
      s === "!" && t[r - 1] !== "!" ? n.push(r - n.length) : a.push(s);
    }), { mask: a.join(""), escaped: n };
  }
  process(t, a, n = !0) {
    if (this.opts.number != null) return la(t, n, this.opts);
    if (a == null) return t;
    const s = `v=${t},mr=${a},m=${n ? 1 : 0}`;
    if (this.memo.has(s)) return this.memo.get(s);
    const { mask: r, escaped: c } = this.escapeMask(a), D = [], m = this.opts.tokens != null ? this.opts.tokens : {}, P = this.isReversed() ? -1 : 1, F = this.isReversed() ? "unshift" : "push", E = this.isReversed() ? 0 : r.length - 1, B = this.isReversed() ? () => f > -1 && d > -1 : () => f < r.length && d < t.length, A = (M) => !this.isReversed() && M <= E || this.isReversed() && M >= E;
    let N, H = -1, f = this.isReversed() ? r.length - 1 : 0, d = this.isReversed() ? t.length - 1 : 0, h = !1;
    for (; B(); ) {
      const M = r.charAt(f), p = m[M], x = (p == null ? void 0 : p.transform) != null ? p.transform(t.charAt(d)) : t.charAt(d);
      if (!c.includes(f) && p != null ? (x.match(p.pattern) != null ? (D[F](x), p.repeated ? (H === -1 ? H = f : f === E && f !== H && (f = H - P), E === H && (f -= P)) : p.multiple && (h = !0, f -= P), f += P) : p.multiple ? h && (f += P, d -= P, h = !1) : x === N ? N = void 0 : p.optional && (f += P, d -= P), d += P) : (n && !this.isEager() && D[F](M), x === M && !this.isEager() ? d += P : N = M, this.isEager() || (f += P)), this.isEager())
        for (; A(f) && (m[r.charAt(f)] == null || c.includes(f)); ) {
          if (n) {
            if (D[F](r.charAt(f)), t.charAt(d) === r.charAt(f)) {
              f += P, d += P;
              continue;
            }
          } else r.charAt(f) === t.charAt(d) && (d += P);
          f += P;
        }
    }
    return this.memo.set(s, D.join("")), this.memo.get(s);
  }
}
class da {
  constructor(t, a = {}) {
    Ne(this, "items", /* @__PURE__ */ new Map()), Ne(this, "eventAbortController"), Ne(this, "onInput", (n) => {
      if (n instanceof CustomEvent && n.type === "input" && !n.isTrusted && !n.bubbles)
        return;
      const s = n.target, r = this.items.get(s);
      if (r === void 0) return;
      const c = "inputType" in n && n.inputType.startsWith("delete"), D = r.isEager(), m = c && D && r.unmasked(s.value) === "" ? "" : s.value;
      this.fixCursor(s, c, () => this.setValue(s, m));
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
        const { signal: r } = this.eventAbortController;
        n.addEventListener("input", this.onInput, { capture: !0, signal: r });
      }
      const s = new ca(ra(n, a));
      this.items.set(n, s), queueMicrotask(() => this.updateValue(n)), n.selectionStart === null && s.isEager() && console.warn("Maska: input of `%s` type is not supported", n.type);
    }
  }
  getInputs(t) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t];
  }
  getOptions(t) {
    const { onMaska: a, preProcess: n, postProcess: s, ...r } = t;
    return r;
  }
  fixCursor(t, a, n) {
    var s, r;
    const c = t.selectionStart, D = t.value;
    if (n(), c === null || c === D.length && !a) return;
    const m = t.value, P = D.slice(0, c), F = m.slice(0, c), E = (s = this.processInput(t, P)) == null ? void 0 : s.unmasked, B = (r = this.processInput(t, F)) == null ? void 0 : r.unmasked;
    if (E === void 0 || B === void 0) return;
    let A = c;
    P !== F && (A += a ? m.length - D.length : E.length - B.length), t.setSelectionRange(A, A);
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
    let r = n.masked(s);
    return this.options.postProcess != null && (r = this.options.postProcess(r)), {
      masked: r,
      unmasked: n.unmasked(s),
      completed: n.completed(s)
    };
  }
}
const Ke = /* @__PURE__ */ new WeakMap(), fa = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, Ze = (e, t) => {
  var a;
  const n = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (n == null || (n == null ? void 0 : n.type) === "file") return;
  let s = {};
  if (t.value != null && (s = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const r = (c) => {
      const D = t.modifiers.unmasked ? c.unmasked : t.modifiers.completed ? c.completed : c.masked;
      fa(t, D);
    };
    s.onMaska = s.onMaska == null ? r : Array.isArray(s.onMaska) ? [...s.onMaska, r] : [s.onMaska, r];
  }
  Ke.has(n) ? (a = Ke.get(n)) == null || a.update(s) : Ke.set(n, new da(n, s));
}, ma = {
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
function pa(e) {
  var n;
  const t = ma[e.type] ?? "text", a = {
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
function va(e) {
  return e.filter((t) => !t.read_only && t.name !== "id").map(pa);
}
const ha = {
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
  decimal: "number",
  float: "number",
  integer: "number"
};
function ga(e) {
  return {
    field: e.type === "fk" ? `${e.name}_nome` : e.name,
    header: e.label,
    type: ha[e.type],
    sortable: !0
  };
}
function ya(e, t = 6) {
  return e.filter((a) => !a.read_only && a.name !== "id").slice(0, t).map(ga);
}
function xt() {
  const e = Nt();
  function t(r, c = "Sucesso") {
    e.add({ severity: "success", summary: c, detail: r, life: 3e3 });
  }
  function a(r, c = "Erro") {
    e.add({ severity: "error", summary: c, detail: r, life: 5e3 });
  }
  function n(r, c = "Atenção") {
    e.add({ severity: "warn", summary: c, detail: r, life: 4e3 });
  }
  function s(r, c = "Info") {
    e.add({ severity: "info", summary: c, detail: r, life: 3e3 });
  }
  return { success: t, error: a, warn: n, info: s };
}
function Pt() {
  const e = Wt();
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
  function a(n, s, r = "Confirmação") {
    e.require({
      message: n,
      header: r,
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
function ba(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function wa(e) {
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
      const r = ba(n);
      if (Array.isArray(s)) {
        const c = s.filter((D) => typeof D == "string");
        c.length > 0 && a.push(`${r}: ${c.join(" ")}`);
      } else typeof s == "string" && a.push(`${r}: ${s}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function je(e, t = "Erro inesperado") {
  var r;
  if (!e || typeof e != "object") return t;
  const a = e, n = (r = a.response) == null ? void 0 : r.data;
  if (!n || typeof n != "object")
    return a.message || t;
  const s = n.detail ?? n;
  return wa(s) || t;
}
function Rn() {
  return { extractApiError: je };
}
const ka = { class: "w-autocompletefk" }, $a = ["disabled"], Da = { class: "w-autocompletefk-toolbar" }, Ca = { class: "w-autocompletefk-toolbar-actions" }, Sa = { class: "flex items-center justify-end gap-1" }, xa = { class: "w-autocompletefk-footer" }, Et = /* @__PURE__ */ se({
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
    const r = s, c = xt(), { confirmDelete: D } = Pt(), m = j(null), P = j([]), F = j(!1);
    let E = null;
    async function B(g) {
      try {
        const k = await r.get(`${a.endpoint}${g}/`);
        m.value = k.data;
      } catch {
        m.value = null;
      }
    }
    async function A(g) {
      F.value = !0;
      try {
        const k = { page_size: 20, ...a.endpointParams };
        g && (k.search = g);
        const u = (await r.get(a.endpoint, { params: k })).data;
        P.value = u.data ?? u.results ?? u;
      } catch {
        P.value = [];
      } finally {
        F.value = !1;
      }
    }
    function N(g) {
      const k = g.query || "";
      if (k.length < a.minLength) {
        P.value = [];
        return;
      }
      E && clearTimeout(E), E = setTimeout(() => A(k), 300);
    }
    function H(g) {
      m.value = g.value, n("update:modelValue", g.value);
    }
    function f() {
      m.value = null, n("update:modelValue", null);
    }
    Ge(
      () => a.modelValue,
      async (g) => {
        if (g != null) {
          if (typeof g == "object" && g !== null && a.optionLabel in g) {
            m.value = g;
            return;
          }
          (!m.value || m.value[a.optionValue] !== g) && await B(g);
        } else
          m.value = null;
      },
      { immediate: !0 }
    );
    const d = j(!1), h = j([]), M = j(!1), p = j(""), x = j(1), q = j(15), L = j(0), R = j(null), _ = j(null), ee = j(0);
    let W = null;
    const U = j([]), i = K(() => {
      var g;
      return (g = a.crudFields) != null && g.length ? !0 : U.value.length > 0;
    }), C = K(() => a.canCreate ?? i.value), w = K(() => a.canEdit ?? i.value), o = K(() => a.canDelete ?? i.value), y = K(() => w.value || o.value), Z = K(() => {
      var g;
      return (g = a.crudFields) != null && g.length ? a.crudFields : va(U.value);
    }), X = K(() => {
      var g, k;
      return (g = a.crudColumns) != null && g.length ? a.crudColumns : (k = a.columns) != null && k.length ? a.columns.map((J) => ({
        field: J.field,
        header: J.header,
        sortable: !0
      })) : U.value.length ? ya(U.value) : [{ field: a.optionLabel, header: a.optionLabel, sortable: !0 }];
    });
    async function G() {
      var g, k, J;
      M.value = !0;
      try {
        const u = {
          page: x.value,
          page_size: q.value,
          ...a.endpointParams
        };
        p.value && (u.search = p.value), _.value && ee.value !== 0 && (u.ordering = ee.value === -1 ? `-${_.value}` : _.value);
        const O = (await r.get(a.endpoint, { params: u })).data;
        h.value = O.data ?? O.results ?? O, L.value = O.count ?? O.rows ?? 0, (g = O.extras) != null && g.fields && !((k = a.columns) != null && k.length) && !((J = a.crudFields) != null && J.length) && (U.value = O.extras.fields);
      } catch {
        h.value = [], L.value = 0;
      } finally {
        M.value = !1;
      }
    }
    function z() {
      a.disabled || (p.value = "", x.value = 1, _.value = null, ee.value = 0, R.value = null, d.value = !0, G());
    }
    function re(g) {
      x.value = g.page + 1, q.value = g.rows, G();
    }
    function de(g) {
      _.value = g.sortField ?? null, ee.value = g.sortOrder ?? 0, x.value = 1, G();
    }
    function De() {
      R.value && (m.value = R.value, n("update:modelValue", R.value), d.value = !1);
    }
    function ve(g) {
      m.value = g.data, n("update:modelValue", g.data), d.value = !1;
    }
    Ge(p, () => {
      W && clearTimeout(W), W = setTimeout(() => {
        x.value = 1, G();
      }, 300);
    });
    const ye = j(!1), Ce = j(!1), fe = j(null), me = pe({}), ge = K(() => fe.value !== null), Se = K(
      () => ge.value ? "Editar Registro" : "Novo Registro"
    );
    function xe() {
      const g = {};
      for (const k of Z.value)
        g[k.field] = k.defaultValue !== void 0 ? typeof k.defaultValue == "function" ? k.defaultValue() : k.defaultValue : null;
      return g;
    }
    function Pe() {
      const g = xe();
      for (const k of Object.keys(me))
        delete me[k];
      for (const [k, J] of Object.entries(g))
        me[k] = J;
    }
    function ke() {
      fe.value = null, Pe(), ye.value = !0;
    }
    function be(g) {
      fe.value = g;
      for (const k of Z.value)
        me[k.field] = g[k.field] !== void 0 ? g[k.field] : null;
      ye.value = !0;
    }
    function Ee(g, k) {
      me[g] = k;
    }
    async function Me() {
      Ce.value = !0;
      try {
        const g = { ...me };
        for (const J of Z.value) {
          const u = g[J.field];
          if (J.type === "fk" && u !== null && typeof u == "object") {
            const S = J.optionValue || "id";
            g[J.field] = u[S] ?? u;
          }
        }
        let k;
        if (ge.value && fe.value) {
          const J = fe.value[a.optionValue];
          k = await r.patch(
            `${a.endpoint}${J}/`,
            g
          );
          const u = h.value.findIndex(
            (S) => S[a.optionValue] === J
          );
          u !== -1 && (h.value[u] = k.data), c.success("Registro atualizado com sucesso");
        } else
          k = await r.post(a.endpoint, g), h.value.unshift(k.data), L.value++, c.success("Registro criado com sucesso");
        ye.value = !1, fe.value = null, R.value = k.data;
      } catch (g) {
        c.error(je(g, "Erro ao salvar registro"));
      } finally {
        Ce.value = !1;
      }
    }
    function Ve(g) {
      D(async () => {
        try {
          const k = g[a.optionValue];
          await r.delete(`${a.endpoint}${k}/`);
          const J = h.value.findIndex(
            (u) => u[a.optionValue] === k
          );
          J !== -1 && (h.value.splice(J, 1), L.value--), m.value && m.value[a.optionValue] === k && (m.value = null, n("update:modelValue", null)), R.value && R.value[a.optionValue] === k && (R.value = null), c.success("Registro excluído com sucesso");
        } catch (k) {
          c.error(je(k, "Erro ao excluir registro"));
        }
      });
    }
    return (g, k) => {
      const J = dt("tooltip");
      return l(), v(ie, null, [
        b("div", ka, [
          Q($(gt), {
            "model-value": m.value,
            suggestions: P.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: F.value,
            fluid: "",
            onComplete: N,
            onItemSelect: H,
            onClear: f
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          Fe((l(), v("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: z
          }, [...k[6] || (k[6] = [
            b("i", { class: "pi pi-search" }, null, -1)
          ])], 8, $a)), [
            [
              J,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        Q($(ht), {
          visible: d.value,
          "onUpdate:visible": k[4] || (k[4] = (u) => d.value = u),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: ae(() => [
            b("div", xa, [
              Q($(ue), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: k[3] || (k[3] = (u) => d.value = !1)
              }),
              Q($(ue), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !R.value,
                onClick: De
              }, null, 8, ["disabled"])
            ])
          ]),
          default: ae(() => [
            b("div", Da, [
              Q($(mt), { class: "w-autocompletefk-toolbar-search" }, {
                default: ae(() => [
                  Q($(pt), { class: "pi pi-search" }),
                  Q($(we), {
                    modelValue: p.value,
                    "onUpdate:modelValue": k[0] || (k[0] = (u) => p.value = u),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              b("div", Ca, [
                C.value ? (l(), Y($(ue), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: ke
                })) : V("", !0)
              ])
            ]),
            Q($(ft), {
              selection: R.value,
              "onUpdate:selection": k[1] || (k[1] = (u) => R.value = u),
              value: h.value,
              loading: M.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: q.value,
              "total-records": L.value,
              "sort-field": _.value ?? void 0,
              "sort-order": ee.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: re,
              onSort: k[2] || (k[2] = (u) => de({ sortField: u.sortField, sortOrder: u.sortOrder })),
              onRowDblclick: ve
            }, {
              empty: ae(() => [...k[7] || (k[7] = [
                b("div", { class: "w-autocompletefk-empty" }, " Nenhum registro encontrado ", -1)
              ])]),
              default: ae(() => [
                Q($(Re), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (l(!0), v(ie, null, ce(X.value, (u) => (l(), Y($(Re), {
                  key: u.field,
                  field: u.field,
                  header: u.header,
                  sortable: u.sortable ?? !0,
                  style: Le(u.style)
                }, {
                  body: ae(({ data: S }) => [
                    u.type ? (l(), Y(tt, {
                      key: 0,
                      column: u,
                      value: S[u.field],
                      "row-data": S
                    }, null, 8, ["column", "value", "row-data"])) : (l(), v(ie, { key: 1 }, [
                      We(T(S[u.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                y.value ? (l(), Y($(Re), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: ae(({ data: u }) => [
                    b("div", Sa, [
                      w.value ? Fe((l(), Y($(ue), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (S) => be(u)
                      }, null, 8, ["onClick"])), [
                        [
                          J,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : V("", !0),
                      o.value ? Fe((l(), Y($(ue), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (S) => Ve(u)
                      }, null, 8, ["onClick"])), [
                        [
                          J,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : V("", !0)
                    ])
                  ]),
                  _: 1
                })) : V("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        i.value ? (l(), Y(at, {
          key: 0,
          visible: ye.value,
          title: Se.value,
          fields: Z.value,
          "form-data": me,
          "is-editing": ge.value,
          saving: Ce.value,
          width: e.dialogWidth,
          "onUpdate:visible": k[5] || (k[5] = (u) => {
            ye.value = u, u || (fe.value = null);
          }),
          "onUpdate:field": Ee,
          onSave: Me
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : V("", !0)
      ], 64);
    };
  }
});
async function Pa(e) {
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
const Ea = { class: "w-crud-form" }, Ma = {
  key: 0,
  class: "w-crud-form-group-header"
}, Va = { class: "w-crud-form-group-title" }, Fa = {
  key: 0,
  class: "w-crud-form-group-desc"
}, Aa = { class: "w-crud-form-fields" }, Ta = {
  key: 0,
  class: "w-crud-form-switch"
}, Ya = { class: "w-crud-form-switch-label" }, Ra = {
  key: 1,
  class: "w-crud-form-col-full"
}, Ia = { class: "w-crud-form-label" }, La = {
  key: 0,
  class: "w-crud-form-required"
}, Na = { class: "w-crud-form-color-row" }, Wa = {
  key: 2,
  class: "w-crud-form-col-full"
}, ja = { class: "w-crud-form-label" }, za = ["accept", "disabled", "onChange"], Oa = { class: "w-crud-form-label" }, Ba = {
  key: 0,
  class: "w-crud-form-required"
}, Ua = {
  key: 1,
  class: "pi pi-spin pi-spinner w-crud-form-cep-spinner"
}, Ha = {
  key: 15,
  class: "w-crud-form-cep-error"
}, qa = {
  key: 16,
  class: "w-crud-form-error"
}, Ka = /* @__PURE__ */ se({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const n = e, s = a, r = pe({}), c = pe({}), D = pe({}), m = pe({});
    function P(i, C) {
      const w = C.target.value, o = w.replace(/\D/g, "");
      s("update:field", i.field, w), D[i.field] = null, m[i.field] && (clearTimeout(m[i.field]), m[i.field] = null), o.length === 8 && (m[i.field] = setTimeout(async () => {
        c[i.field] = !0, D[i.field] = null;
        try {
          const y = await Pa(o);
          if (!y)
            D[i.field] = "CEP não encontrado. Preencha os campos manualmente.";
          else {
            const Z = i.cepFields || {}, X = Object.keys(Z);
            for (const G of X) {
              const z = Z[G];
              if (!z) continue;
              const re = n.formData[z];
              (re == null || re === "") && s("update:field", z, y[G] ?? "");
            }
          }
        } finally {
          c[i.field] = !1;
        }
      }, 400));
    }
    const F = K(
      () => n.fields.filter((i) => i.visible === void 0 || i.visible === !0 ? !0 : typeof i.visible == "function" ? i.visible(n.formData, n.isEditing) : i.visible)
    );
    function E(i) {
      return n.disabled || i.disabledOnEdit && n.isEditing ? !0 : typeof i.disabled == "function" ? i.disabled(n.formData, n.isEditing) : !!i.disabled;
    }
    function B(i) {
      return Mt(i) ? i.value : i;
    }
    const A = K(() => {
      const i = n.isEditing ? "edit" : "create", C = n.fields.find(
        (o) => o.autofocus === !0 || o.autofocus === i
      );
      if (C) return C.field;
      const w = F.value.find((o) => !(o.type === "switch" || o.type === "fk" || o.type === "select" || o.type === "image" || o.disabled === !0 || o.disabledOnEdit && n.isEditing));
      return (w == null ? void 0 : w.field) ?? null;
    });
    function N(i) {
      return i.field === A.value;
    }
    function H(i) {
      if (i)
        return i.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function f(i) {
      if (!i) return "";
      const C = String(i).replace(/\D/g, "").slice(0, 14);
      return C.length <= 11 ? C.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : C.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function d(i, C) {
      const w = C.target.value.replace(/\D/g, "").slice(0, 14);
      s("update:field", i, w);
    }
    const h = pe({});
    function M(i) {
      const C = n.formData[i.field];
      if (C == null) return null;
      const w = i.optionValue || "value";
      return (B(i.options) || []).find(
        (y) => y[w] === C
      ) ?? null;
    }
    function p(i) {
      return h[i.field] || [];
    }
    function x(i, C) {
      const w = (C.query || "").toLowerCase(), o = B(i.options) || [], y = i.optionLabel || "label";
      h[i.field] = o.filter(
        (Z) => String(Z[y] || "").toLowerCase().includes(w)
      );
    }
    function q(i, C) {
      const w = i.optionValue || "value";
      s("update:field", i.field, C.value[w]);
    }
    function L(i) {
      const C = n.formData[i.field];
      return C ? String(C).replace("#", "") : "FFFFFF";
    }
    function R(i, C) {
      s("update:field", i.field, `#${C}`);
    }
    function _(i) {
      if (typeof i.validate == "function") {
        const C = i.validate(n.formData[i.field]);
        r[i.field] = C || null;
      }
    }
    function ee() {
      const i = [];
      for (const C of n.fields)
        if (typeof C.validate == "function") {
          const w = C.validate(n.formData[C.field]);
          r[C.field] = w || null, w && i.push(w);
        }
      return i;
    }
    function W() {
      Object.keys(r).forEach((i) => delete r[i]);
    }
    const U = K(() => {
      var o, y, Z, X;
      const i = /* @__PURE__ */ new Map(), C = [], w = /* @__PURE__ */ new Map();
      for (const G of F.value) {
        const z = ((o = G.fieldGroup) == null ? void 0 : o.id) ?? "__default__";
        i.has(z) || (i.set(z, {
          id: z,
          title: (y = G.fieldGroup) == null ? void 0 : y.title,
          description: (Z = G.fieldGroup) == null ? void 0 : Z.description,
          fields: []
        }), C.push(z), ((X = G.fieldGroup) == null ? void 0 : X.order) != null && w.set(z, G.fieldGroup.order)), i.get(z).fields.push(G);
      }
      return C.slice().sort((G, z) => {
        const re = w.get(G), de = w.get(z);
        return re != null && de != null ? re - de : re != null ? -1 : de != null ? 1 : C.indexOf(G) - C.indexOf(z);
      }).map((G) => i.get(G));
    });
    return t({ validateAll: ee, clearErrors: W }), (i, C) => (l(), v("div", Ea, [
      (l(!0), v(ie, null, ce(U.value, (w) => (l(), v("div", {
        key: w.id,
        class: "w-crud-form-group"
      }, [
        w.title ? (l(), v("div", Ma, [
          b("h3", Va, T(w.title), 1),
          w.description ? (l(), v("p", Fa, T(w.description), 1)) : V("", !0)
        ])) : V("", !0),
        b("div", Aa, [
          (l(!0), v(ie, null, ce(w.fields, (o) => I(i.$slots, `field-${o.field}`, {
            key: o.field,
            field: o,
            formData: e.formData,
            isEditing: e.isEditing,
            setFormField: (y, Z) => s("update:field", y, Z)
          }, () => [
            o.type === "switch" ? (l(), v("div", Ta, [
              Q($(Rt), {
                "model-value": e.formData[o.field],
                disabled: E(o),
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
              b("label", Ya, T(o.switchLabel || o.label), 1)
            ])) : o.type === "color" ? (l(), v("div", Ra, [
              b("label", Ia, [
                We(T(o.label) + " ", 1),
                o.required ? (l(), v("span", La, "*")) : V("", !0)
              ]),
              b("div", Na, [
                Q($(It), {
                  "model-value": L(o),
                  disabled: E(o),
                  "onUpdate:modelValue": (y) => R(o, y)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                Q($(we), {
                  "model-value": e.formData[o.field],
                  class: "w-28",
                  maxlength: "7",
                  placeholder: "#000000",
                  disabled: E(o),
                  "onUpdate:modelValue": (y) => s("update:field", o.field, y)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
              ])
            ])) : o.type === "image" ? (l(), v("div", Wa, [
              b("label", ja, T(o.label), 1),
              I(i.$slots, `image-${o.field}`, {
                field: o,
                formData: e.formData
              }, () => [
                b("input", {
                  type: "file",
                  accept: o.accept || "image/*",
                  disabled: E(o),
                  onChange: (y) => {
                    var X;
                    const Z = ((X = y.target.files) == null ? void 0 : X[0]) ?? null;
                    s("update:field", o.field, Z);
                  }
                }, null, 40, za)
              ])
            ])) : (l(), v("div", {
              key: 3,
              class: le(o.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
            }, [
              b("label", Oa, [
                We(T(o.label) + " ", 1),
                o.required ? (l(), v("span", Ba, "*")) : V("", !0),
                c[o.field] ? (l(), v("i", Ua)) : V("", !0)
              ]),
              (!o.type || o.type === "text") && o.mask ? Fe((l(), Y($(we), {
                key: 0,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: N(o) || void 0,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
                [$(Ze), { mask: H(o.mask) }]
              ]) : !o.type || o.type === "text" ? (l(), Y($(we), {
                key: 1,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: N(o) || void 0,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "email" ? (l(), Y($(we), {
                key: 2,
                "model-value": e.formData[o.field],
                type: "email",
                fluid: "",
                autofocus: N(o) || void 0,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "password" ? (l(), Y($(Lt), {
                key: 3,
                "model-value": e.formData[o.field],
                fluid: "",
                "toggle-mask": "",
                feedback: o.feedback !== !1,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "number" ? (l(), Y($(nt), {
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
                disabled: E(o),
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "currency" ? (l(), Y($(nt), {
                key: 5,
                "model-value": e.formData[o.field],
                fluid: "",
                mode: "currency",
                currency: "BRL",
                locale: "pt-BR",
                min: o.min,
                max: o.max,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "select" ? (l(), Y($(Yt), {
                key: 6,
                "model-value": e.formData[o.field],
                fluid: "",
                options: B(o.options),
                "option-label": o.optionLabel || "label",
                "option-value": o.optionValue || "value",
                "show-clear": o.showClear !== !1,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "autocomplete" ? (l(), Y($(gt), {
                key: 7,
                "model-value": M(o),
                fluid: "",
                suggestions: p(o),
                "option-label": o.optionLabel || "label",
                placeholder: o.placeholder,
                disabled: E(o),
                onComplete: (y) => x(o, y),
                onItemSelect: (y) => q(o, y),
                onClear: (y) => s("update:field", o.field, null)
              }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : o.type === "fk" ? (l(), Y(Et, {
                key: 8,
                "model-value": e.formData[o.field],
                endpoint: o.endpoint,
                "endpoint-params": o.endpointParams,
                "option-label": o.optionLabel || "nome",
                placeholder: o.placeholder,
                disabled: E(o),
                "show-clear": o.showClear !== !1,
                "dialog-header": o.label,
                "crud-fields": o.crudFields,
                "crud-columns": o.crudColumns,
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "endpoint", "endpoint-params", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : o.type === "date" ? (l(), Y($(st), {
                key: 9,
                "model-value": e.formData[o.field],
                fluid: "",
                "date-format": o.dateFormat || "dd/mm/yy",
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "datetime" ? (l(), Y($(st), {
                key: 10,
                "model-value": e.formData[o.field],
                fluid: "",
                "show-time": "",
                "hour-format": o.hourFormat || "24",
                "date-format": o.dateFormat || "dd/mm/yy",
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "cpf_cnpj" ? (l(), Y($(we), {
                key: 11,
                "model-value": f(e.formData[o.field]),
                fluid: "",
                maxlength: "18",
                placeholder: o.placeholder || "000.000.000-00",
                disabled: E(o),
                invalid: !!r[o.field],
                onInput: (y) => d(o.field, y),
                onBlur: (y) => _(o)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : o.type === "mask" ? Fe((l(), Y($(we), {
                key: 12,
                "model-value": e.formData[o.field],
                fluid: "",
                placeholder: o.placeholder,
                disabled: E(o),
                invalid: !!r[o.field],
                "onUpdate:modelValue": (y) => s("update:field", o.field, y),
                onBlur: (y) => _(o)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
                [$(Ze), { mask: H(o.mask) }]
              ]) : o.type === "cep" ? Fe((l(), Y($(we), {
                key: 13,
                "model-value": e.formData[o.field],
                fluid: "",
                placeholder: o.placeholder || "00000-000",
                disabled: E(o),
                invalid: !!D[o.field],
                onInput: (y) => P(o, y)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput"])), [
                [$(Ze), { mask: "#####-###" }]
              ]) : o.type === "textarea" ? (l(), Y($(Tt), {
                key: 14,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: N(o) || void 0,
                rows: o.rows || 3,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": (y) => s("update:field", o.field, y)
              }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : V("", !0),
              D[o.field] ? (l(), v("small", Ha, T(D[o.field]), 1)) : r[o.field] ? (l(), v("small", qa, T(r[o.field]), 1)) : V("", !0)
            ], 2))
          ])), 128))
        ])
      ]))), 128))
    ]));
  }
}), Za = { class: "w-crud-form-footer" }, at = /* @__PURE__ */ se({
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
    function r() {
      s.value ? s.value.validateAll().length === 0 && n("save") : n("save");
    }
    return Ge(
      () => a.visible,
      (c) => {
        c && s.value && s.value.clearErrors();
      }
    ), (c, D) => (l(), Y($(ht), {
      visible: e.visible,
      header: e.title,
      style: Le({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": D[2] || (D[2] = (m) => n("update:visible", m))
    }, {
      default: ae(() => [
        b("form", {
          class: "w-crud-form",
          onSubmit: Vt(r, ["prevent"])
        }, [
          Q(Ka, {
            ref_key: "rendererRef",
            ref: s,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            disabled: e.disabled,
            "onUpdate:field": D[0] || (D[0] = (m, P) => n("update:field", m, P))
          }, Je({ _: 2 }, [
            ce(e.fields, (m) => ({
              name: `field-${m.field}`,
              fn: ae((P) => [
                I(c.$slots, `field-${m.field}`, _e(Xe(P)))
              ])
            })),
            ce(e.fields.filter((m) => m.type === "image"), (m) => ({
              name: `image-${m.field}`,
              fn: ae((P) => [
                I(c.$slots, `image-${m.field}`, _e(Xe(P)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing", "disabled"]),
          b("div", Za, [
            I(c.$slots, "footer", {
              saving: e.saving,
              disabled: e.disabled
            }, () => [
              Q($(ue), {
                type: "button",
                label: e.disabled ? "Fechar" : "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: D[1] || (D[1] = (m) => n("update:visible", !1))
              }, null, 8, ["label", "disabled"]),
              e.disabled ? V("", !0) : (l(), Y($(ue), {
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
}), Ga = { class: "w-crud" }, Ja = {
  key: 0,
  class: "w-crud-header"
}, _a = { class: "w-crud-header-content" }, Xa = { class: "w-crud-title" }, Qa = {
  key: 0,
  class: "w-crud-subtitle"
}, eo = { class: "w-crud-header-actions" }, to = {
  key: 0,
  class: "w-crud-kpis"
}, ao = { class: "w-crud-kpi-content" }, oo = { class: "w-crud-kpi-label" }, no = { class: "w-crud-kpi-value" }, so = { class: "w-crud-table" }, lo = { class: "w-crud-toolbar" }, ro = { class: "w-crud-toolbar-start" }, io = { class: "w-crud-toolbar-end" }, uo = { class: "w-crud-actions" }, co = /* @__PURE__ */ se({
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
    const a = e, n = t, s = Ft(), { formatNumber: r } = et(), c = j({}), D = K(
      () => a.crud.config.columns.filter((d) => d.visible !== !1).map((d) => d.type === "number" && !d.align ? { ...d, align: "right" } : d.type === "currency" && !d.align ? { ...d, align: "right" } : d)
    );
    function m(d) {
      if (d.align === "right") return "text-right";
      if (d.align === "center") return "text-center";
    }
    const P = K(() => {
      const d = [];
      return a.crud.config.canCreate !== !1 && a.crud.config.canEdit !== !1 && d.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canDelete !== !1 && d.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), d;
    }), F = K(
      () => a.crud.config.rowActions ?? P.value
    ), E = K(() => F.value.length > 0 || !!s["row-actions"]);
    function B(d, h) {
      d.action === "edit" ? a.crud.openEditDialog(h) : d.action === "view" ? a.crud.openViewDialog(h) : d.action === "delete" ? a.crud.confirmDelete(h) : d.handler && d.handler(h);
    }
    function A(d, h) {
      return d.visible ? d.visible(h) : !0;
    }
    function N(d, h) {
      return d.disabled ? d.disabled(h) : !1;
    }
    const H = K(() => {
      const d = [];
      return a.showKpi && d.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: r(a.crud.pagination.rows, 0)
      }), d.push(...a.extraKpis), d;
    });
    K(() => a.crud.config.labels ?? {});
    const f = K(() => a.crud.config.canCreate !== !1);
    return At(() => {
      a.autoInit && a.crud.init();
    }), (d, h) => {
      const M = dt("tooltip");
      return l(), v("div", Ga, [
        e.showHeader ? (l(), v("div", Ja, [
          b("div", _a, [
            b("h1", Xa, T(e.title), 1),
            e.subtitle ? (l(), v("p", Qa, T(e.subtitle), 1)) : V("", !0)
          ]),
          b("div", eo, [
            I(d.$slots, "header-actions"),
            f.value ? (l(), Y($(ue), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: h[0] || (h[0] = (p) => e.crud.openCreateDialog())
            })) : V("", !0)
          ])
        ])) : V("", !0),
        I(d.$slots, "before-table", {}, () => [
          H.value.length ? (l(), v("div", to, [
            (l(!0), v(ie, null, ce(H.value, (p, x) => (l(), v("div", {
              key: x,
              class: "w-crud-kpi"
            }, [
              b("div", {
                class: le(["w-crud-kpi-icon", p.severity ? `w-crud-kpi-icon--${p.severity}` : ""])
              }, [
                b("i", {
                  class: le([p.icon]),
                  style: Le(p.color ? `color: ${p.color}` : "")
                }, null, 6)
              ], 2),
              b("div", ao, [
                b("div", oo, T(p.label), 1),
                b("div", no, T(p.value), 1)
              ])
            ]))), 128))
          ])) : V("", !0)
        ]),
        b("div", so, [
          Q($(ft), {
            value: e.crud.items.value,
            loading: e.crud.loading.value,
            "expanded-rows": c.value,
            "onUpdate:expandedRows": h[2] || (h[2] = (p) => c.value = p),
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
            onSort: h[3] || (h[3] = (p) => e.crud.onSort({ sortField: p.sortField, sortOrder: p.sortOrder })),
            onRowExpand: h[4] || (h[4] = (p) => n("row-expand", p.data)),
            onRowCollapse: h[5] || (h[5] = (p) => n("row-collapse", p.data))
          }, Je({
            header: ae(() => [
              b("div", lo, [
                b("div", ro, [
                  e.showSearch ? (l(), Y($(mt), { key: 0 }, {
                    default: ae(() => [
                      Q($(pt), { class: "pi pi-search" }),
                      Q($(we), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : V("", !0),
                  I(d.$slots, "toolbar-start"),
                  I(d.$slots, "toolbar-filters")
                ]),
                b("div", io, [
                  I(d.$slots, "toolbar-actions"),
                  !e.showHeader && f.value ? (l(), Y($(ue), {
                    key: 0,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: h[1] || (h[1] = (p) => e.crud.openCreateDialog())
                  })) : V("", !0)
                ])
              ])
            ]),
            empty: ae(() => [
              I(d.$slots, "empty", {}, () => [
                h[9] || (h[9] = b("div", { class: "w-crud-empty" }, [
                  b("div", { class: "w-crud-empty-icon" }, [
                    b("i", { class: "pi pi-inbox" })
                  ]),
                  b("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                  b("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                ], -1))
              ])
            ]),
            default: ae(() => [
              e.expandable ? (l(), Y($(Re), {
                key: 0,
                expander: "",
                style: { width: "3rem" }
              })) : V("", !0),
              (l(!0), v(ie, null, ce(D.value, (p) => (l(), Y($(Re), {
                key: p.field,
                field: p.field,
                header: p.header,
                sortable: p.sortable,
                style: Le(p.style),
                "header-class": m(p),
                "body-class": m(p)
              }, {
                body: ae(({ data: x }) => [
                  I(d.$slots, `column-${p.field}`, {
                    data: x,
                    value: x[p.field]
                  }, () => [
                    Q(tt, {
                      column: p,
                      value: x[p.field],
                      "row-data": x
                    }, null, 8, ["column", "value", "row-data"])
                  ])
                ]),
                _: 2
              }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
              E.value ? (l(), Y($(Re), {
                key: 1,
                "header-class": "w-crud-actions-header",
                style: Le({ width: `${(F.value.length + ($(s)["row-actions"] ? 1 : 0)) * 2.5 + 1}rem` })
              }, {
                body: ae(({ data: p }) => [
                  b("div", uo, [
                    (l(!0), v(ie, null, ce(F.value, (x) => (l(), v(ie, {
                      key: x.action
                    }, [
                      A(x, p) ? Fe((l(), Y($(ue), {
                        key: 0,
                        icon: x.icon,
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: x.severity,
                        disabled: N(x, p),
                        onClick: (q) => B(x, p)
                      }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                        [
                          M,
                          x.tooltip,
                          void 0,
                          { top: !0 }
                        ]
                      ]) : V("", !0)
                    ], 64))), 128)),
                    I(d.$slots, "row-actions", {
                      data: p,
                      crud: e.crud
                    })
                  ])
                ]),
                _: 3
              }, 8, ["style"])) : V("", !0)
            ]),
            _: 2
          }, [
            e.expandable ? {
              name: "expansion",
              fn: ae((p) => [
                I(d.$slots, "expansion", {
                  data: p.data
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "onPage"])
        ]),
        I(d.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => {
          var p;
          return [
            Q(at, {
              visible: e.crud.dialogVisible.value,
              title: e.crud.dialogTitle.value,
              fields: e.crud.config.form,
              "form-data": e.crud.formData,
              "is-editing": e.crud.isEditing.value,
              saving: e.crud.saving.value,
              disabled: ((p = e.crud.viewMode) == null ? void 0 : p.value) ?? !1,
              width: e.dialogWidth,
              "onUpdate:visible": h[6] || (h[6] = (x) => {
                e.crud.dialogVisible.value = x, x || (e.crud.editingItem.value = null);
              }),
              "onUpdate:field": h[7] || (h[7] = (x, q) => e.crud.setFormField(x, q)),
              onSave: h[8] || (h[8] = (x) => e.crud.save())
            }, Je({ _: 2 }, [
              ce(e.crud.config.form, (x) => ({
                name: `field-${x.field}`,
                fn: ae((q) => [
                  I(d.$slots, `field-${x.field}`, _e(Xe(q)))
                ])
              }))
            ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "disabled", "width"])
          ];
        })
      ]);
    };
  }
}), fo = /* @__PURE__ */ se({
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
    }, n = K(() => (t.map ?? a)[t.value] ?? { label: t.value, severity: "secondary" });
    return (s, r) => (l(), Y($(vt), {
      value: n.value.label,
      severity: n.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), mo = { class: "w-page-header" }, po = { class: "w-page-header-content" }, vo = { class: "w-page-header-title" }, ho = {
  key: 0,
  class: "w-page-header-subtitle"
}, go = { class: "w-page-header-actions" }, In = /* @__PURE__ */ se({
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
    return (n, s) => (l(), v("div", mo, [
      b("div", po, [
        b("h2", vo, T(e.title), 1),
        e.subtitle ? (l(), v("p", ho, T(e.subtitle), 1)) : V("", !0)
      ]),
      b("div", go, [
        I(n.$slots, "actions"),
        e.actionLabel ? (l(), Y($(ue), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: s[0] || (s[0] = (r) => a("action"))
        }, null, 8, ["label", "icon"])) : V("", !0)
      ])
    ]));
  }
}), yo = { class: "w-empty-state" }, bo = { class: "w-empty-state-icon" }, wo = { class: "w-empty-state-title" }, ko = {
  key: 0,
  class: "w-empty-state-description"
}, Ln = /* @__PURE__ */ se({
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
    return (n, s) => (l(), v("div", yo, [
      b("div", bo, [
        b("i", {
          class: le(e.icon)
        }, null, 2)
      ]),
      b("p", wo, T(e.title), 1),
      e.description ? (l(), v("p", ko, T(e.description), 1)) : V("", !0),
      e.actionLabel ? (l(), Y($(ue), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: s[0] || (s[0] = (r) => a("action"))
      }, null, 8, ["label", "icon"])) : V("", !0)
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
const $o = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
function Do() {
  return Ae($o);
}
const Co = { class: "w-detail-header" }, So = { class: "w-detail-header-left" }, xo = { class: "w-detail-header-content" }, Po = { class: "w-detail-header-title" }, Eo = {
  key: 0,
  class: "w-detail-header-subtitle"
}, Mo = { class: "w-detail-header-actions" }, Nn = /* @__PURE__ */ se({
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
    function n() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (s, r) => (l(), v("div", Co, [
      b("div", So, [
        Q($(ue), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: n
        }),
        e.icon ? (l(), v("i", {
          key: 0,
          class: le([e.icon, "w-detail-header-icon"])
        }, null, 2)) : V("", !0),
        b("div", xo, [
          b("h2", Po, T(e.title), 1),
          e.subtitle ? (l(), v("p", Eo, T(e.subtitle), 1)) : V("", !0)
        ]),
        e.status ? (l(), Y(fo, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : V("", !0)
      ]),
      b("div", Mo, [
        I(s.$slots, "actions")
      ])
    ]));
  }
}), Vo = { class: "w-info-card" }, Fo = {
  key: 0,
  class: "w-info-card-title"
}, Ao = { class: "w-info-card-grid" }, To = { class: "w-info-card-label" }, Yo = { class: "w-info-card-value" }, Wn = /* @__PURE__ */ se({
  __name: "WInfoCard",
  props: {
    title: {},
    fields: {}
  },
  setup(e) {
    const { formatCurrency: t, formatDate: a, formatNumber: n } = et();
    function s(r) {
      const c = r.value;
      return c == null || c === "" ? "-" : r.format === "currency" ? t(Number(c)) : r.format === "date" ? a(String(c)) : r.format === "datetime" ? a(String(c), "DD/MM/YYYY HH:mm") : r.format === "number" ? n(Number(c)) : String(c);
    }
    return (r, c) => (l(), v("div", Vo, [
      e.title ? (l(), v("h3", Fo, T(e.title), 1)) : V("", !0),
      b("div", Ao, [
        (l(!0), v(ie, null, ce(e.fields, (D) => (l(), v("div", {
          key: D.label,
          class: "w-info-card-field"
        }, [
          b("span", To, T(D.label), 1),
          b("span", Yo, T(s(D)), 1)
        ]))), 128))
      ])
    ]));
  }
}), Ro = {
  key: 0,
  class: "w-kpi-card__loading"
}, Io = { class: "w-kpi-card__loading-content" }, Lo = { class: "w-kpi-card__header" }, No = {
  key: 0,
  class: "w-kpi-card__icon"
}, Wo = {
  key: 1,
  class: "w-kpi-card__trend"
}, jo = { class: "w-kpi-card__content" }, zo = { class: "w-kpi-card__label" }, Oo = { class: "w-kpi-card__value" }, Bo = {
  key: 0,
  class: "w-kpi-card__hint"
}, Uo = {
  key: 0,
  class: "w-kpi-card__footer"
}, Ho = /* @__PURE__ */ se({
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
    return (t, a) => (l(), v("article", {
      class: le(["w-kpi-card", e.severity ? `w-kpi-card--${e.severity}` : ""])
    }, [
      e.loading ? (l(), v("div", Ro, [
        Q($(ze), {
          shape: "circle",
          size: "2.75rem"
        }),
        b("div", Io, [
          Q($(ze), {
            width: "6rem",
            height: "0.75rem"
          }),
          Q($(ze), {
            width: "7.5rem",
            height: "1.5rem"
          }),
          Q($(ze), {
            width: "5rem",
            height: "0.75rem"
          })
        ])
      ])) : (l(), v(ie, { key: 1 }, [
        b("div", Lo, [
          e.icon || t.$slots.icon ? (l(), v("div", No, [
            I(t.$slots, "icon", {}, () => [
              e.icon ? (l(), v("i", {
                key: 0,
                class: le(e.icon)
              }, null, 2)) : V("", !0)
            ])
          ])) : V("", !0),
          e.trend || t.$slots.trend ? (l(), v("div", Wo, [
            I(t.$slots, "trend", {}, () => [
              e.trend ? (l(), v("span", {
                key: 0,
                class: le(["w-kpi-card__trend-badge", e.trend.direction ? `w-kpi-card__trend-badge--${e.trend.direction}` : ""])
              }, T(e.trend.value), 3)) : V("", !0)
            ])
          ])) : V("", !0)
        ]),
        b("div", jo, [
          b("p", zo, T(e.label), 1),
          b("div", Oo, [
            I(t.$slots, "value", {}, () => [
              We(T(e.value), 1)
            ])
          ]),
          e.hint || t.$slots.hint ? (l(), v("p", Bo, [
            I(t.$slots, "hint", {}, () => [
              We(T(e.hint), 1)
            ])
          ])) : V("", !0)
        ]),
        t.$slots.footer ? (l(), v("footer", Uo, [
          I(t.$slots, "footer")
        ])) : V("", !0)
      ], 64))
    ], 2));
  }
}), jn = /* @__PURE__ */ se({
  __name: "WKpiGrid",
  props: {
    items: { default: () => [] },
    columns: { default: 4 },
    dense: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = K(() => [
      `w-kpi-grid--cols-${t.columns}`,
      { "w-kpi-grid--dense": t.dense }
    ]);
    return (n, s) => (l(), v("div", {
      class: le(["w-kpi-grid", a.value])
    }, [
      n.$slots.item ? (l(!0), v(ie, { key: 0 }, ce(e.items, (r, c) => I(n.$slots, "item", {
        key: c,
        item: r,
        index: c
      })), 128)) : (l(!0), v(ie, { key: 1 }, ce(e.items, (r, c) => (l(), Y(Ho, {
        key: c,
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
}), qo = { class: "w-section-header__main" }, Ko = {
  key: 0,
  class: "w-section-header__icon"
}, Zo = { class: "w-section-header__content" }, Go = { class: "w-section-header__title-row" }, Jo = { class: "w-section-header__title" }, _o = {
  key: 0,
  class: "w-section-header__subtitle"
}, Xo = {
  key: 0,
  class: "w-section-header__actions"
}, zn = /* @__PURE__ */ se({
  __name: "WSectionHeader",
  props: {
    title: {},
    subtitle: {},
    icon: {},
    compact: { type: Boolean }
  },
  setup(e) {
    return (t, a) => (l(), v("div", {
      class: le(["w-section-header", { "w-section-header--compact": e.compact }])
    }, [
      b("div", qo, [
        e.icon || t.$slots.icon ? (l(), v("div", Ko, [
          I(t.$slots, "icon", {}, () => [
            e.icon ? (l(), v("i", {
              key: 0,
              class: le(e.icon)
            }, null, 2)) : V("", !0)
          ])
        ])) : V("", !0),
        b("div", Zo, [
          b("div", Go, [
            b("h3", Jo, T(e.title), 1),
            I(t.$slots, "meta")
          ]),
          e.subtitle ? (l(), v("p", _o, T(e.subtitle), 1)) : V("", !0)
        ])
      ]),
      t.$slots.actions ? (l(), v("div", Xo, [
        I(t.$slots, "actions")
      ])) : V("", !0)
    ], 2));
  }
}), Qo = {
  key: 0,
  class: "w-form-section__header"
}, en = { class: "w-form-section__content" }, tn = { class: "w-form-section__title" }, an = {
  key: 0,
  class: "w-form-section__description"
}, on = {
  key: 0,
  class: "w-form-section__actions"
}, nn = { class: "w-form-section__body" }, On = /* @__PURE__ */ se({
  __name: "WFormSection",
  props: {
    title: {},
    description: {},
    variant: {}
  },
  setup(e) {
    return (t, a) => (l(), v("section", {
      class: le(["w-form-section", e.variant ? `w-form-section--${e.variant}` : ""])
    }, [
      e.title || e.description || t.$slots.actions ? (l(), v("div", Qo, [
        b("div", en, [
          b("h3", tn, T(e.title), 1),
          e.description ? (l(), v("p", an, T(e.description), 1)) : V("", !0)
        ]),
        t.$slots.actions ? (l(), v("div", on, [
          I(t.$slots, "actions")
        ])) : V("", !0)
      ])) : V("", !0),
      b("div", nn, [
        I(t.$slots, "default")
      ])
    ], 2));
  }
}), sn = {
  key: 0,
  class: "w-action-bar__primary"
}, ln = {
  key: 1,
  class: "w-action-bar__filters"
}, rn = {
  key: 2,
  class: "w-action-bar__secondary"
}, Bn = /* @__PURE__ */ se({
  __name: "WActionBar",
  props: {
    align: { default: "between" },
    stackOnMobile: { type: Boolean, default: !0 }
  },
  setup(e) {
    return (t, a) => (l(), v("div", {
      class: le(["w-action-bar", [
        `w-action-bar--${e.align}`,
        { "w-action-bar--stack": e.stackOnMobile }
      ]])
    }, [
      t.$slots.primary || t.$slots.default ? (l(), v("div", sn, [
        I(t.$slots, "primary", {}, () => [
          I(t.$slots, "default")
        ])
      ])) : V("", !0),
      t.$slots.filters ? (l(), v("div", ln, [
        I(t.$slots, "filters")
      ])) : V("", !0),
      t.$slots.secondary ? (l(), v("div", rn, [
        I(t.$slots, "secondary")
      ])) : V("", !0)
    ], 2));
  }
}), un = { class: "w-progress-flow__marker" }, cn = { class: "w-progress-flow__content" }, dn = { class: "w-progress-flow__label" }, fn = {
  key: 0,
  class: "w-progress-flow__description"
}, Un = /* @__PURE__ */ se({
  __name: "WProgressFlow",
  props: {
    steps: {},
    currentStep: {},
    orientation: { default: "horizontal" }
  },
  setup(e) {
    const t = e, a = K(
      () => t.steps.findIndex((s) => s.key === t.currentStep)
    );
    function n(s) {
      return s < a.value ? "done" : s === a.value ? "current" : "pending";
    }
    return (s, r) => (l(), v("div", {
      class: le(["w-progress-flow", `w-progress-flow--${e.orientation}`])
    }, [
      (l(!0), v(ie, null, ce(e.steps, (c, D) => (l(), v("div", {
        key: c.key,
        class: le(["w-progress-flow__step", `w-progress-flow__step--${n(D)}`])
      }, [
        I(s.$slots, "step", {
          step: c,
          index: D,
          state: n(D)
        }, () => [
          b("div", un, [
            b("span", null, T(D + 1), 1)
          ]),
          b("div", cn, [
            b("p", dn, T(c.label), 1),
            c.description ? (l(), v("p", fn, T(c.description), 1)) : V("", !0)
          ])
        ])
      ], 2))), 128))
    ], 2));
  }
}), Hn = {
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
    e.provide(He, t.axios), e.provide(qe, a), t.registerComponents !== !1 && (e.component("WCrudView", co), e.component("WCrudFormDialog", at), e.component("WCrudColumnRenderer", tt), e.component("WAutoCompleteFK", Et));
  }
}, mn = {
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
function qn(e) {
  const {
    endpoint: t,
    columns: a,
    form: n,
    pk: s = "id",
    searchDebounce: r = 300,
    canCreate: c = !0,
    canEdit: D = !0,
    canDelete: m = !0,
    rowActions: P = void 0,
    filterParams: F = void 0,
    createDefaults: E = void 0,
    transformPayload: B = void 0,
    onAfterSave: A = void 0,
    onAfterDelete: N = void 0
  } = e, H = Ae(He);
  if (!H)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const f = H, d = Ae(qe), h = e.pageSize ?? (d == null ? void 0 : d.defaultPageSize) ?? 20, M = { ...mn, ...e.labels }, p = xt(), { confirmDelete: x } = Pt(), q = j([]), L = j({}), R = j(!1), _ = j(!1), ee = j(""), W = j(!1), U = j(!1), i = j(null), C = pe({}), w = pe({
    page: 1,
    pageSize: h,
    rows: 0,
    totalPages: 0
  }), o = pe({
    field: null,
    order: 0
  });
  function y() {
    const u = {};
    for (const S of n)
      u[S.field] = S.defaultValue !== void 0 ? typeof S.defaultValue == "function" ? S.defaultValue() : S.defaultValue : null;
    return u;
  }
  const Z = y();
  for (const u of Object.keys(Z))
    C[u] = Z[u];
  const X = K(() => i.value !== null && !U.value), G = K(() => U.value), z = K(
    () => U.value ? M.viewTitle ?? "Visualizar Registro" : X.value ? M.editTitle : M.createTitle
  ), re = K(() => w.page <= 1), de = K(() => w.page >= w.totalPages);
  let De = null;
  async function ve(u = {}) {
    R.value = !0;
    try {
      const S = {
        page: w.page,
        page_size: w.pageSize,
        ...u
      };
      ee.value && (S.search = ee.value), o.field && o.order !== 0 && (S.ordering = o.order === -1 ? `-${o.field}` : o.field), F && Object.assign(S, F());
      const oe = (await f.get(t, { params: S })).data;
      Array.isArray(oe.results) ? (q.value = oe.results, w.rows = oe.count ?? 0) : (q.value = oe.data ?? [], w.rows = oe.rows ?? 0), oe.extras && (L.value = oe.extras), oe.page && (w.page = oe.page), oe.page_size && (w.pageSize = oe.page_size), w.totalPages = Math.ceil(w.rows / w.pageSize) || 0;
    } finally {
      R.value = !1;
    }
  }
  async function ye() {
    await ve();
  }
  async function Ce() {
    await ve();
  }
  function fe(u) {
    ee.value = u, De && clearTimeout(De), De = setTimeout(() => {
      w.page = 1, ve();
    }, r);
  }
  function me(u) {
    const S = u.target;
    fe(S.value);
  }
  function ge(u) {
    w.page = u, ve();
  }
  function Se() {
    ge(1);
  }
  function xe() {
    ge(w.totalPages);
  }
  function Pe(u) {
    w.page = u.page + 1, w.pageSize = u.rows, ve();
  }
  function ke(u) {
    o.field = u.sortField ?? null, o.order = u.sortOrder ?? 0, w.page = 1, ve();
  }
  function be() {
    const u = y();
    for (const S of Object.keys(u))
      C[S] = u[S];
  }
  function Ee(u, S) {
    C[u] = S;
  }
  function Me() {
    if (U.value = !1, i.value = null, be(), E) {
      const u = E();
      for (const [S, O] of Object.entries(u))
        C[S] = O;
    }
    W.value = !0;
  }
  function Ve(u) {
    U.value = !1, i.value = u;
    for (const S of n) {
      let O = u[S.field] !== void 0 ? u[S.field] : null;
      O && (S.type === "date" || S.type === "datetime") && typeof O == "string" && (O = Qe(O)), C[S.field] = O;
    }
    W.value = !0;
  }
  function g(u) {
    U.value = !0, i.value = u;
    for (const S of n) {
      let O = u[S.field] !== void 0 ? u[S.field] : null;
      O && (S.type === "date" || S.type === "datetime") && typeof O == "string" && (O = Qe(O)), C[S.field] = O;
    }
    W.value = !0;
  }
  async function k() {
    for (const u of n) {
      if (u.validate) {
        const S = u.validate(C[u.field]);
        if (S)
          return p.error(S), null;
      }
      if (u.required) {
        const S = C[u.field];
        if (S == null || S === "")
          return p.error(`${u.label} é obrigatório`), null;
      }
    }
    _.value = !0;
    try {
      let u = { ...C };
      !X.value && E && Object.assign(u, E());
      for (const te of n) {
        const ne = u[te.field];
        if (te.type === "date" && ne instanceof Date ? u[te.field] = yt(ne) : te.type === "datetime" && ne instanceof Date && (u[te.field] = bt(ne)), te.type === "fk" && ne !== null && typeof ne == "object") {
          const he = te.optionValue || "id";
          u[te.field] = ne[he] ?? ne;
        }
        (te.type === "mask" || te.type === "cpf_cnpj") && typeof ne == "string" && (u[te.field] = $e(ne));
      }
      B && (u = B(u, X.value));
      const S = n.some(
        (te) => te.type === "image" && u[te.field] instanceof File
      );
      let O = u, oe;
      if (S) {
        const te = new Set(
          n.filter((he) => he.type === "image").map((he) => he.field)
        ), ne = new FormData();
        for (const [he, Ie] of Object.entries(u))
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
      if (X.value && i.value) {
        const te = i.value[s];
        Ye = await f.patch(
          `${t}${te}/`,
          O,
          ot
        );
        const ne = q.value.findIndex(
          (he) => he[s] === te
        );
        ne !== -1 && (q.value[ne] = Ye.data), p.success(M.successUpdate);
      } else
        Ye = await f.post(t, O, ot), q.value.unshift(Ye.data), w.rows++, p.success(M.successCreate);
      return W.value = !1, i.value = null, A && A(Ye.data, X.value), Ye.data;
    } catch (u) {
      return p.error(je(u, "Erro ao salvar registro")), null;
    } finally {
      _.value = !1;
    }
  }
  function J(u) {
    x(async () => {
      try {
        const S = u[s];
        await f.delete(`${t}${S}/`);
        const O = q.value.findIndex(
          (oe) => oe[s] === S
        );
        O !== -1 && (q.value.splice(O, 1), w.rows--), p.success(M.successDelete), N && N(u);
      } catch (S) {
        p.error(je(S, "Erro ao excluir registro"));
      }
    }, M.deleteConfirmMessage);
  }
  return {
    items: q,
    extras: L,
    loading: R,
    saving: _,
    search: ee,
    dialogVisible: W,
    editingItem: i,
    formData: C,
    pagination: w,
    sort: o,
    isEditing: X,
    isViewing: G,
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
    openViewDialog: g,
    save: k,
    confirmDelete: J,
    setFormField: Ee,
    resetForm: be,
    goToPage: ge,
    firstPage: Se,
    lastPage: xe,
    config: e
  };
}
function Kn(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: n = !1 } = e, s = Ae(He);
  if (!s)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const r = s, c = Ae(qe), D = e.pageSize ?? (c == null ? void 0 : c.defaultPageSize) ?? 20, m = j([]), P = j(!1), F = j(""), E = j({}), B = pe({}), A = pe({
    page: 1,
    pageSize: D,
    rows: 0,
    totalPages: 0
  }), N = pe({
    field: null,
    order: 0
  });
  let H = null;
  async function f(L = {}) {
    P.value = !0;
    try {
      const R = {
        page: A.page,
        page_size: A.pageSize,
        ...L
      };
      F.value && (R.search = F.value), N.field && N.order !== 0 && (R.ordering = N.order === -1 ? `-${N.field}` : N.field);
      for (const [U, i] of Object.entries(B))
        i != null && i !== "" && (R[U] = i);
      const W = (await r.get(t, {
        params: R
      })).data;
      Array.isArray(W.results) ? (m.value = W.results, A.rows = W.count ?? 0) : (m.value = W.data ?? [], A.rows = W.rows ?? 0), W.page && (A.page = W.page), W.page_size && (A.pageSize = W.page_size), A.totalPages = Math.ceil(A.rows / A.pageSize) || 0, E.value = W.extras ?? {};
    } finally {
      P.value = !1;
    }
  }
  async function d() {
    await f();
  }
  function h(L) {
    F.value = L, H && clearTimeout(H), H = setTimeout(() => {
      A.page = 1, f();
    }, a);
  }
  function M(L, R) {
    B[L] = R, A.page = 1, f();
  }
  function p() {
    for (const L of Object.keys(B))
      delete B[L];
    A.page = 1, f();
  }
  function x(L) {
    A.page = L.page + 1, A.pageSize = L.rows, f();
  }
  function q(L) {
    N.field = L.sortField ?? null, N.order = L.sortOrder ?? 0, A.page = 1, f();
  }
  return n && f(), {
    items: m,
    loading: P,
    search: F,
    pagination: A,
    sort: N,
    extras: E,
    fetchItems: f,
    refresh: d,
    setSearch: h,
    setFilter: M,
    clearFilters: p,
    onPage: x,
    onSort: q
  };
}
export {
  mn as DEFAULT_CRUD_LABELS,
  Bn as WActionBar,
  Et as WAutoCompleteFK,
  tt as WCrudColumnRenderer,
  at as WCrudFormDialog,
  co as WCrudView,
  Nn as WDetailHeader,
  Ln as WEmptyState,
  Ka as WFormRenderer,
  On as WFormSection,
  Wn as WInfoCard,
  Ho as WKpiCard,
  jn as WKpiGrid,
  In as WPageHeader,
  Hn as WPrimeVuePlugin,
  Un as WProgressFlow,
  zn as WSectionHeader,
  fo as WStatusTag,
  He as W_AXIOS_KEY,
  qe as W_CONFIG_KEY,
  je as extractApiError,
  ga as mapApiFieldToColumnDef,
  pa as mapApiFieldToFieldDef,
  ya as mapApiFieldsToColumnDefs,
  va as mapApiFieldsToFieldDefs,
  Kn as useApi,
  Rn as useApiError,
  Pt as useAppConfirm,
  xt as useAppToast,
  qn as useCrudManager,
  et as useFormatters
};
//# sourceMappingURL=index.js.map
