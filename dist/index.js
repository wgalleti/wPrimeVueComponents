import { inject as Ae, defineComponent as ae, openBlock as i, createElementBlock as g, createBlock as M, unref as $, toDisplayString as F, ref as N, watch as Ze, computed as O, reactive as ge, resolveDirective as ct, Fragment as le, createElementVNode as k, createVNode as q, withDirectives as Ye, withCtx as G, createCommentVNode as P, renderList as ue, normalizeStyle as Le, createTextVNode as We, renderSlot as Y, normalizeClass as oe, isRef as Et, withModifiers as Mt, createSlots as Je, normalizeProps as Xe, guardReactiveProps as Ge, onMounted as At } from "vue";
import ft from "primevue/datatable";
import Re from "primevue/column";
import se from "primevue/button";
import we from "primevue/inputtext";
import mt from "primevue/iconfield";
import pt from "primevue/inputicon";
import vt from "primevue/tag";
import Fe from "dayjs";
import ht from "primevue/dialog";
import ot from "primevue/inputnumber";
import Ft from "primevue/textarea";
import Tt from "primevue/select";
import gt from "primevue/autocomplete";
import nt from "primevue/datepicker";
import Yt from "primevue/toggleswitch";
import Rt from "primevue/colorpicker";
import It from "primevue/password";
import { useToast as Lt } from "primevue/usetoast";
import { useConfirm as Nt } from "primevue/useconfirm";
import je from "primevue/skeleton";
const He = Symbol("w-axios"), qe = Symbol("w-config");
function Wt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Be = { exports: {} }, zt = Be.exports, st;
function jt() {
  return st || (st = 1, (function(e, t) {
    (function(a, o) {
      e.exports = o();
    })(zt, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, o = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, s = /\d/, r = /\d\d/, d = /\d\d?/, h = /\d*[^-_:/,()\s\d]+/, v = {}, C = function(l) {
        return (l = +l) + (l > 68 ? 1900 : 2e3);
      }, x = function(l) {
        return function(f) {
          this[l] = +f;
        };
      }, W = [/[+-]\d\d:?(\d\d)?|Z/, function(l) {
        (this.zone || (this.zone = {})).offset = (function(f) {
          if (!f || f === "Z") return 0;
          var V = f.match(/([+-]|\d\d)/g), m = 60 * V[1] + (+V[2] || 0);
          return m === 0 ? 0 : V[0] === "+" ? -m : m;
        })(l);
      }], U = function(l) {
        var f = v[l];
        return f && (f.indexOf ? f : f.s.concat(f.f));
      }, E = function(l, f) {
        var V, m = v.meridiem;
        if (m) {
          for (var b = 1; b <= 24; b += 1) if (l.indexOf(m(b, 0, f)) > -1) {
            V = b > 12;
            break;
          }
        } else V = l === (f ? "pm" : "PM");
        return V;
      }, z = { A: [h, function(l) {
        this.afternoon = E(l, !1);
      }], a: [h, function(l) {
        this.afternoon = E(l, !0);
      }], Q: [s, function(l) {
        this.month = 3 * (l - 1) + 1;
      }], S: [s, function(l) {
        this.milliseconds = 100 * +l;
      }], SS: [r, function(l) {
        this.milliseconds = 10 * +l;
      }], SSS: [/\d{3}/, function(l) {
        this.milliseconds = +l;
      }], s: [d, x("seconds")], ss: [d, x("seconds")], m: [d, x("minutes")], mm: [d, x("minutes")], H: [d, x("hours")], h: [d, x("hours")], HH: [d, x("hours")], hh: [d, x("hours")], D: [d, x("day")], DD: [r, x("day")], Do: [h, function(l) {
        var f = v.ordinal, V = l.match(/\d+/);
        if (this.day = V[0], f) for (var m = 1; m <= 31; m += 1) f(m).replace(/\[|\]/g, "") === l && (this.day = m);
      }], w: [d, x("week")], ww: [r, x("week")], M: [d, x("month")], MM: [r, x("month")], MMM: [h, function(l) {
        var f = U("months"), V = (U("monthsShort") || f.map((function(m) {
          return m.slice(0, 3);
        }))).indexOf(l) + 1;
        if (V < 1) throw new Error();
        this.month = V % 12 || V;
      }], MMMM: [h, function(l) {
        var f = U("months").indexOf(l) + 1;
        if (f < 1) throw new Error();
        this.month = f % 12 || f;
      }], Y: [/[+-]?\d+/, x("year")], YY: [r, function(l) {
        this.year = C(l);
      }], YYYY: [/\d{4}/, x("year")], Z: W, ZZ: W };
      function B(l) {
        var f, V;
        f = l, V = v && v.formats;
        for (var m = (l = f.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(n, p, T) {
          var A = T && T.toUpperCase();
          return p || V[T] || a[T] || V[A].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(Z, R, J) {
            return R || J.slice(1);
          }));
        }))).match(o), b = m.length, I = 0; I < b; I += 1) {
          var K = m[I], L = z[K], c = L && L[0], S = L && L[1];
          m[I] = S ? { regex: c, parser: S } : K.replace(/^\[|\]$/g, "");
        }
        return function(n) {
          for (var p = {}, T = 0, A = 0; T < b; T += 1) {
            var Z = m[T];
            if (typeof Z == "string") A += Z.length;
            else {
              var R = Z.regex, J = Z.parser, pe = n.slice(A), ne = R.exec(pe)[0];
              J.call(p, ne), n = n.replace(ne, "");
            }
          }
          return (function(ee) {
            var de = ee.afternoon;
            if (de !== void 0) {
              var te = ee.hours;
              de ? te < 12 && (ee.hours += 12) : te === 12 && (ee.hours = 0), delete ee.afternoon;
            }
          })(p), p;
        };
      }
      return function(l, f, V) {
        V.p.customParseFormat = !0, l && l.parseTwoDigitYear && (C = l.parseTwoDigitYear);
        var m = f.prototype, b = m.parse;
        m.parse = function(I) {
          var K = I.date, L = I.utc, c = I.args;
          this.$u = L;
          var S = c[1];
          if (typeof S == "string") {
            var n = c[2] === !0, p = c[3] === !0, T = n || p, A = c[2];
            p && (A = c[2]), v = this.$locale(), !n && A && (v = V.Ls[A]), this.$d = (function(pe, ne, ee, de) {
              try {
                if (["x", "X"].indexOf(ne) > -1) return new Date((ne === "X" ? 1e3 : 1) * pe);
                var te = B(ne)(pe), $e = te.year, ye = te.month, De = te.day, ce = te.hours, ve = te.minutes, Ce = te.seconds, re = te.milliseconds, ie = te.zone, me = te.week, Se = /* @__PURE__ */ new Date(), xe = De || ($e || ye ? 1 : Se.getDate()), Pe = $e || Se.getFullYear(), be = 0;
                $e && !ye || (be = ye > 0 ? ye - 1 : Se.getMonth());
                var he, Ve = ce || 0, Ee = ve || 0, Me = Ce || 0, y = re || 0;
                return ie ? new Date(Date.UTC(Pe, be, xe, Ve, Ee, Me, y + 60 * ie.offset * 1e3)) : ee ? new Date(Date.UTC(Pe, be, xe, Ve, Ee, Me, y)) : (he = new Date(Pe, be, xe, Ve, Ee, Me, y), me && (he = de(he).week(me).toDate()), he);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(K, S, L, V), this.init(), A && A !== !0 && (this.$L = this.locale(A).$L), T && K != this.format(S) && (this.$d = /* @__PURE__ */ new Date("")), v = {};
          } else if (S instanceof Array) for (var Z = S.length, R = 1; R <= Z; R += 1) {
            c[1] = S[R - 1];
            var J = V.apply(this, c);
            if (J.isValid()) {
              this.$d = J.$d, this.$L = J.$L, this.init();
              break;
            }
            R === Z && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else b.call(this, I);
        };
      };
    }));
  })(Be)), Be.exports;
}
var Ut = jt();
const Bt = /* @__PURE__ */ Wt(Ut);
Fe.extend(Bt);
function Qe(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const t = Fe(e, "YYYY-MM-DD", !0);
  return t.isValid() ? t.toDate() : Fe(e).toDate();
}
function yt(e) {
  return e ? typeof e == "string" ? e : Fe(e).format("YYYY-MM-DD") : null;
}
function bt(e) {
  return e ? typeof e == "string" ? e : Fe(e).toISOString() : null;
}
function Ot(e, t = "DD/MM/YYYY") {
  return e ? Fe(e).format(t) : "—";
}
function Ht(e) {
  return e ? Fe(e).format("DD/MM/YYYY HH:mm") : "—";
}
function ke(e) {
  return e.replace(/\D/g, "");
}
function wt(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function kt(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function qt(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length === 11 ? wt(e) : t.length === 14 ? kt(e) : e;
}
function Kt(e) {
  if (!e) return "—";
  const t = ke(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function $t(e) {
  if (!e) return null;
  const t = ke(e);
  if (t.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(t)) return "CPF inválido.";
  let a = 0;
  for (let d = 0; d < 9; d++) a += parseInt(t[d]) * (10 - d);
  let o = a % 11;
  const s = o < 2 ? 0 : 11 - o;
  if (parseInt(t[9]) !== s) return "CPF inválido.";
  a = 0;
  for (let d = 0; d < 10; d++) a += parseInt(t[d]) * (11 - d);
  o = a % 11;
  const r = o < 2 ? 0 : 11 - o;
  return parseInt(t[10]) !== r ? "CPF inválido." : null;
}
function Dt(e) {
  if (!e) return null;
  const t = ke(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let o = 0;
  for (let v = 0; v < 12; v++) o += parseInt(t[v]) * a[v];
  let s = o % 11;
  const r = s < 2 ? 0 : 11 - s;
  if (parseInt(t[12]) !== r) return "CNPJ inválido.";
  const d = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  o = 0;
  for (let v = 0; v < 13; v++) o += parseInt(t[v]) * d[v];
  s = o % 11;
  const h = s < 2 ? 0 : 11 - s;
  return parseInt(t[13]) !== h ? "CNPJ inválido." : null;
}
function Zt(e) {
  if (!e) return null;
  const t = ke(e);
  return t.length === 11 ? $t(e) : t.length === 14 ? Dt(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const Oe = /* @__PURE__ */ new Map();
function lt(e, t) {
  const a = `${e}-${t}`;
  let o = Oe.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }), Oe.set(a, o)), o;
}
function Jt(e, t) {
  const a = `${e}-${t}`;
  let o = Oe.get(a);
  return o || (o = new Intl.NumberFormat(e, {
    style: "currency",
    currency: t
  }), Oe.set(a, o)), o;
}
function _e() {
  const e = Ae(qe, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), t = (e == null ? void 0 : e.locale) ?? "pt-BR", a = (e == null ? void 0 : e.currency) ?? "BRL";
  function o(v) {
    return v == null ? "—" : Jt(t, a).format(v);
  }
  function s(v, C = 2) {
    return v == null ? "—" : lt(t, C).format(v);
  }
  function r(v, C) {
    return Ot(v, C ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function d(v) {
    return Ht(v);
  }
  function h(v) {
    return v == null ? "—" : `${lt(t, 2).format(v)}%`;
  }
  return {
    formatCurrency: o,
    formatNumber: s,
    formatDate: r,
    formatDateTime: d,
    formatPercent: h,
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
const Xt = {
  key: 0,
  class: "text-muted-color text-xs"
}, Gt = ["src", "alt"], Qt = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, _t = {
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
}, et = /* @__PURE__ */ ae({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: o, formatNumber: s } = _e();
    return (r, d) => e.value == null ? (i(), g("span", Xt, "—")) : e.column.type === "image" ? (i(), g("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, Gt)) : e.column.type === "boolean" ? (i(), M($(vt), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (i(), g("span", Qt, F($(t)(e.value)), 1)) : e.column.type === "datetime" ? (i(), g("span", _t, F($(a)(e.value)), 1)) : e.column.type === "currency" ? (i(), g("span", ea, F($(o)(e.value)), 1)) : e.column.type === "number" ? (i(), g("span", ta, F(e.column.format ? e.column.format(e.value, e.rowData) : $(s)(e.value, e.column.decimals ?? 0)), 1)) : (i(), g("span", aa, F(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var oa = Object.defineProperty, na = (e, t, a) => t in e ? oa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, Ne = (e, t, a) => na(e, typeof t != "symbol" ? t + "" : t, a);
const rt = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, it = (e, t, a) => e.replaceAll(t, "").replace(a, ".").replace("..", ".").replace(/[^.\d]/g, ""), ut = (e, t, a) => {
  var o;
  return new Intl.NumberFormat(((o = a.number) == null ? void 0 : o.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
}, sa = (e, t = !0, a) => {
  var o, s, r, d;
  const h = ((o = a.number) == null ? void 0 : o.unsigned) !== !0 && e.startsWith("-") ? "-" : "", v = ((s = a.number) == null ? void 0 : s.fraction) ?? 0;
  let C = ut(0, v, a);
  const x = C.formatToParts(1000.12), W = ((r = x.find((l) => l.type === "group")) == null ? void 0 : r.value) ?? " ", U = ((d = x.find((l) => l.type === "decimal")) == null ? void 0 : d.value) ?? ".", E = it(e, W, U);
  if (Number.isNaN(parseFloat(E))) return h;
  const z = E.split(".");
  if (z[1] != null && z[1].length >= 1) {
    const l = z[1].length <= v ? z[1].length : v;
    C = ut(l, v, a);
  }
  let B = C.format(parseFloat(E));
  return t ? v > 0 && E.endsWith(".") && !E.slice(0, -1).includes(".") && (B += U) : B = it(B, W, U), h + B;
}, Ct = (e) => JSON.parse(e.replaceAll("'", '"')), la = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = ra(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = Ue(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = Ue(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = Ue(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = ia(e.dataset.maskaTokens));
  const o = {};
  return e.dataset.maskaNumberLocale != null && (o.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (o.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (o.unsigned = Ue(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(o).length > 0) && (a.number = o), a;
}, Ue = (e) => e !== "" ? !!JSON.parse(e) : !0, ra = (e) => e.startsWith("[") && e.endsWith("]") ? Ct(e) : e, ia = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return Ct(e);
  const t = {};
  return e.split("|").forEach((a) => {
    const o = a.split(":");
    t[o[0]] = {
      pattern: St() ? new RegExp(o[1], "u") : new RegExp(o[1]),
      optional: o[2] === "optional",
      multiple: o[2] === "multiple",
      repeated: o[2] === "repeated"
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
      a.tokens = a.tokensReplace ? { ...a.tokens } : { ...rt, ...a.tokens };
      for (const o of Object.values(a.tokens))
        typeof o.pattern == "string" && (o.pattern = St() ? new RegExp(o.pattern, "u") : new RegExp(o.pattern));
    } else
      a.tokens = rt;
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
    return t.split("").forEach((s, r) => {
      s === "!" && t[r - 1] !== "!" ? o.push(r - o.length) : a.push(s);
    }), { mask: a.join(""), escaped: o };
  }
  process(t, a, o = !0) {
    if (this.opts.number != null) return sa(t, o, this.opts);
    if (a == null) return t;
    const s = `v=${t},mr=${a},m=${o ? 1 : 0}`;
    if (this.memo.has(s)) return this.memo.get(s);
    const { mask: r, escaped: d } = this.escapeMask(a), h = [], v = this.opts.tokens != null ? this.opts.tokens : {}, C = this.isReversed() ? -1 : 1, x = this.isReversed() ? "unshift" : "push", W = this.isReversed() ? 0 : r.length - 1, U = this.isReversed() ? () => l > -1 && f > -1 : () => l < r.length && f < t.length, E = (m) => !this.isReversed() && m <= W || this.isReversed() && m >= W;
    let z, B = -1, l = this.isReversed() ? r.length - 1 : 0, f = this.isReversed() ? t.length - 1 : 0, V = !1;
    for (; U(); ) {
      const m = r.charAt(l), b = v[m], I = (b == null ? void 0 : b.transform) != null ? b.transform(t.charAt(f)) : t.charAt(f);
      if (!d.includes(l) && b != null ? (I.match(b.pattern) != null ? (h[x](I), b.repeated ? (B === -1 ? B = l : l === W && l !== B && (l = B - C), W === B && (l -= C)) : b.multiple && (V = !0, l -= C), l += C) : b.multiple ? V && (l += C, f -= C, V = !1) : I === z ? z = void 0 : b.optional && (l += C, f -= C), f += C) : (o && !this.isEager() && h[x](m), I === m && !this.isEager() ? f += C : z = m, this.isEager() || (l += C)), this.isEager())
        for (; E(l) && (v[r.charAt(l)] == null || d.includes(l)); ) {
          if (o) {
            if (h[x](r.charAt(l)), t.charAt(f) === r.charAt(l)) {
              l += C, f += C;
              continue;
            }
          } else r.charAt(l) === t.charAt(f) && (f += C);
          l += C;
        }
    }
    return this.memo.set(s, h.join("")), this.memo.get(s);
  }
}
class da {
  constructor(t, a = {}) {
    Ne(this, "items", /* @__PURE__ */ new Map()), Ne(this, "eventAbortController"), Ne(this, "onInput", (o) => {
      if (o instanceof CustomEvent && o.type === "input" && !o.isTrusted && !o.bubbles)
        return;
      const s = o.target, r = this.items.get(s);
      if (r === void 0) return;
      const d = "inputType" in o && o.inputType.startsWith("delete"), h = r.isEager(), v = d && h && r.unmasked(s.value) === "" ? "" : s.value;
      this.fixCursor(s, d, () => this.setValue(s, v));
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
      const s = new ua(la(o, a));
      this.items.set(o, s), queueMicrotask(() => this.updateValue(o)), o.selectionStart === null && s.isEager() && console.warn("Maska: input of `%s` type is not supported", o.type);
    }
  }
  getInputs(t) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t];
  }
  getOptions(t) {
    const { onMaska: a, preProcess: o, postProcess: s, ...r } = t;
    return r;
  }
  fixCursor(t, a, o) {
    var s, r;
    const d = t.selectionStart, h = t.value;
    if (o(), d === null || d === h.length && !a) return;
    const v = t.value, C = h.slice(0, d), x = v.slice(0, d), W = (s = this.processInput(t, C)) == null ? void 0 : s.unmasked, U = (r = this.processInput(t, x)) == null ? void 0 : r.unmasked;
    if (W === void 0 || U === void 0) return;
    let E = d;
    C !== x && (E += a ? v.length - h.length : W.length - U.length), t.setSelectionRange(E, E);
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
    let r = o.masked(s);
    return this.options.postProcess != null && (r = this.options.postProcess(r)), {
      masked: r,
      unmasked: o.unmasked(s),
      completed: o.completed(s)
    };
  }
}
const Ke = /* @__PURE__ */ new WeakMap(), ca = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, dt = (e, t) => {
  var a;
  const o = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (o == null || (o == null ? void 0 : o.type) === "file") return;
  let s = {};
  if (t.value != null && (s = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const r = (d) => {
      const h = t.modifiers.unmasked ? d.unmasked : t.modifiers.completed ? d.completed : d.masked;
      ca(t, h);
    };
    s.onMaska = s.onMaska == null ? r : Array.isArray(s.onMaska) ? [...s.onMaska, r] : [s.onMaska, r];
  }
  Ke.has(o) ? (a = Ke.get(o)) == null || a.update(s) : Ke.set(o, new da(o, s));
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
  var o;
  const t = fa[e.type] ?? "text", a = {
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
  function t(r, d = "Sucesso") {
    e.add({ severity: "success", summary: d, detail: r, life: 3e3 });
  }
  function a(r, d = "Erro") {
    e.add({ severity: "error", summary: d, detail: r, life: 5e3 });
  }
  function o(r, d = "Atenção") {
    e.add({ severity: "warn", summary: d, detail: r, life: 4e3 });
  }
  function s(r, d = "Info") {
    e.add({ severity: "info", summary: d, detail: r, life: 3e3 });
  }
  return { success: t, error: a, warn: o, info: s };
}
function Pt() {
  const e = Nt();
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
  function a(o, s, r = "Confirmação") {
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
      return t.non_field_errors.filter((o) => typeof o == "string").join(" ");
    const a = [];
    for (const [o, s] of Object.entries(t)) {
      if (o === "non_field_errors") continue;
      const r = ya(o);
      if (Array.isArray(s)) {
        const d = s.filter((h) => typeof h == "string");
        d.length > 0 && a.push(`${r}: ${d.join(" ")}`);
      } else typeof s == "string" && a.push(`${r}: ${s}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function ze(e, t = "Erro inesperado") {
  var r;
  if (!e || typeof e != "object") return t;
  const a = e, o = (r = a.response) == null ? void 0 : r.data;
  if (!o || typeof o != "object")
    return a.message || t;
  const s = o.detail ?? o;
  return ba(s) || t;
}
function Pn() {
  return { extractApiError: ze };
}
const wa = { class: "w-autocompletefk" }, ka = ["disabled"], $a = { class: "w-autocompletefk-toolbar" }, Da = { class: "w-autocompletefk-toolbar-actions" }, Ca = { class: "flex items-center justify-end gap-1" }, Sa = { class: "w-autocompletefk-footer" }, Vt = /* @__PURE__ */ ae({
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
    const a = e, o = t, s = Ae(He);
    if (!s)
      throw new Error("[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin.");
    const r = s, d = xt(), { confirmDelete: h } = Pt(), v = N(null), C = N([]), x = N(!1);
    let W = null;
    async function U(y) {
      try {
        const w = await r.get(`${a.endpoint}${y}/`);
        v.value = w.data;
      } catch {
        v.value = null;
      }
    }
    async function E(y) {
      x.value = !0;
      try {
        const w = { page_size: 20, ...a.endpointParams };
        y && (w.search = y);
        const u = (await r.get(a.endpoint, { params: w })).data;
        C.value = u.data ?? u.results ?? u;
      } catch {
        C.value = [];
      } finally {
        x.value = !1;
      }
    }
    function z(y) {
      const w = y.query || "";
      if (w.length < a.minLength) {
        C.value = [];
        return;
      }
      W && clearTimeout(W), W = setTimeout(() => E(w), 300);
    }
    function B(y) {
      v.value = y.value, o("update:modelValue", y.value);
    }
    function l() {
      v.value = null, o("update:modelValue", null);
    }
    Ze(
      () => a.modelValue,
      async (y) => {
        if (y != null) {
          if (typeof y == "object" && y !== null && a.optionLabel in y) {
            v.value = y;
            return;
          }
          (!v.value || v.value[a.optionValue] !== y) && await U(y);
        } else
          v.value = null;
      },
      { immediate: !0 }
    );
    const f = N(!1), V = N([]), m = N(!1), b = N(""), I = N(1), K = N(15), L = N(0), c = N(null), S = N(null), n = N(0);
    let p = null;
    const T = N([]), A = O(() => {
      var y;
      return (y = a.crudFields) != null && y.length ? !0 : T.value.length > 0;
    }), Z = O(() => a.canCreate ?? A.value), R = O(() => a.canEdit ?? A.value), J = O(() => a.canDelete ?? A.value), pe = O(() => R.value || J.value), ne = O(() => {
      var y;
      return (y = a.crudFields) != null && y.length ? a.crudFields : pa(T.value);
    }), ee = O(() => {
      var y, w;
      return (y = a.crudColumns) != null && y.length ? a.crudColumns : (w = a.columns) != null && w.length ? a.columns.map((H) => ({
        field: H.field,
        header: H.header,
        sortable: !0
      })) : T.value.length ? ga(T.value) : [{ field: a.optionLabel, header: a.optionLabel, sortable: !0 }];
    });
    async function de() {
      var y, w, H;
      m.value = !0;
      try {
        const u = {
          page: I.value,
          page_size: K.value,
          ...a.endpointParams
        };
        b.value && (u.search = b.value), S.value && n.value !== 0 && (u.ordering = n.value === -1 ? `-${S.value}` : S.value);
        const j = (await r.get(a.endpoint, { params: u })).data;
        V.value = j.data ?? j.results ?? j, L.value = j.count ?? j.rows ?? 0, (y = j.extras) != null && y.fields && !((w = a.columns) != null && w.length) && !((H = a.crudFields) != null && H.length) && (T.value = j.extras.fields);
      } catch {
        V.value = [], L.value = 0;
      } finally {
        m.value = !1;
      }
    }
    function te() {
      a.disabled || (b.value = "", I.value = 1, S.value = null, n.value = 0, c.value = null, f.value = !0, de());
    }
    function $e(y) {
      I.value = y.page + 1, K.value = y.rows, de();
    }
    function ye(y) {
      S.value = y.sortField ?? null, n.value = y.sortOrder ?? 0, I.value = 1, de();
    }
    function De() {
      c.value && (v.value = c.value, o("update:modelValue", c.value), f.value = !1);
    }
    function ce(y) {
      v.value = y.data, o("update:modelValue", y.data), f.value = !1;
    }
    Ze(b, () => {
      p && clearTimeout(p), p = setTimeout(() => {
        I.value = 1, de();
      }, 300);
    });
    const ve = N(!1), Ce = N(!1), re = N(null), ie = ge({}), me = O(() => re.value !== null), Se = O(
      () => me.value ? "Editar Registro" : "Novo Registro"
    );
    function xe() {
      const y = {};
      for (const w of ne.value)
        y[w.field] = w.defaultValue !== void 0 ? typeof w.defaultValue == "function" ? w.defaultValue() : w.defaultValue : null;
      return y;
    }
    function Pe() {
      const y = xe();
      for (const w of Object.keys(ie))
        delete ie[w];
      for (const [w, H] of Object.entries(y))
        ie[w] = H;
    }
    function be() {
      re.value = null, Pe(), ve.value = !0;
    }
    function he(y) {
      re.value = y;
      for (const w of ne.value)
        ie[w.field] = y[w.field] !== void 0 ? y[w.field] : null;
      ve.value = !0;
    }
    function Ve(y, w) {
      ie[y] = w;
    }
    async function Ee() {
      Ce.value = !0;
      try {
        const y = { ...ie };
        for (const H of ne.value) {
          const u = y[H.field];
          if (H.type === "fk" && u !== null && typeof u == "object") {
            const D = H.optionValue || "id";
            y[H.field] = u[D] ?? u;
          }
        }
        let w;
        if (me.value && re.value) {
          const H = re.value[a.optionValue];
          w = await r.patch(
            `${a.endpoint}${H}/`,
            y
          );
          const u = V.value.findIndex(
            (D) => D[a.optionValue] === H
          );
          u !== -1 && (V.value[u] = w.data), d.success("Registro atualizado com sucesso");
        } else
          w = await r.post(a.endpoint, y), V.value.unshift(w.data), L.value++, d.success("Registro criado com sucesso");
        ve.value = !1, re.value = null, c.value = w.data;
      } catch (y) {
        d.error(ze(y, "Erro ao salvar registro"));
      } finally {
        Ce.value = !1;
      }
    }
    function Me(y) {
      h(async () => {
        try {
          const w = y[a.optionValue];
          await r.delete(`${a.endpoint}${w}/`);
          const H = V.value.findIndex(
            (u) => u[a.optionValue] === w
          );
          H !== -1 && (V.value.splice(H, 1), L.value--), v.value && v.value[a.optionValue] === w && (v.value = null, o("update:modelValue", null)), c.value && c.value[a.optionValue] === w && (c.value = null), d.success("Registro excluído com sucesso");
        } catch (w) {
          d.error(ze(w, "Erro ao excluir registro"));
        }
      });
    }
    return (y, w) => {
      const H = ct("tooltip");
      return i(), g(le, null, [
        k("div", wa, [
          q($(gt), {
            "model-value": v.value,
            suggestions: C.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: x.value,
            fluid: "",
            onComplete: z,
            onItemSelect: B,
            onClear: l
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          Ye((i(), g("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: te
          }, [...w[6] || (w[6] = [
            k("i", { class: "pi pi-search" }, null, -1)
          ])], 8, ka)), [
            [
              H,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        q($(ht), {
          visible: f.value,
          "onUpdate:visible": w[4] || (w[4] = (u) => f.value = u),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: G(() => [
            k("div", Sa, [
              q($(se), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: w[3] || (w[3] = (u) => f.value = !1)
              }),
              q($(se), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !c.value,
                onClick: De
              }, null, 8, ["disabled"])
            ])
          ]),
          default: G(() => [
            k("div", $a, [
              q($(mt), { class: "w-autocompletefk-toolbar-search" }, {
                default: G(() => [
                  q($(pt), { class: "pi pi-search" }),
                  q($(we), {
                    modelValue: b.value,
                    "onUpdate:modelValue": w[0] || (w[0] = (u) => b.value = u),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              k("div", Da, [
                Z.value ? (i(), M($(se), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: be
                })) : P("", !0)
              ])
            ]),
            q($(ft), {
              selection: c.value,
              "onUpdate:selection": w[1] || (w[1] = (u) => c.value = u),
              value: V.value,
              loading: m.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: K.value,
              "total-records": L.value,
              "sort-field": S.value ?? void 0,
              "sort-order": n.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: $e,
              onSort: w[2] || (w[2] = (u) => ye({ sortField: u.sortField, sortOrder: u.sortOrder })),
              onRowDblclick: ce
            }, {
              empty: G(() => [...w[7] || (w[7] = [
                k("div", { class: "w-autocompletefk-empty" }, " Nenhum registro encontrado ", -1)
              ])]),
              default: G(() => [
                q($(Re), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (i(!0), g(le, null, ue(ee.value, (u) => (i(), M($(Re), {
                  key: u.field,
                  field: u.field,
                  header: u.header,
                  sortable: u.sortable ?? !0,
                  style: Le(u.style)
                }, {
                  body: G(({ data: D }) => [
                    u.type ? (i(), M(et, {
                      key: 0,
                      column: u,
                      value: D[u.field],
                      "row-data": D
                    }, null, 8, ["column", "value", "row-data"])) : (i(), g(le, { key: 1 }, [
                      We(F(D[u.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                pe.value ? (i(), M($(Re), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: G(({ data: u }) => [
                    k("div", Ca, [
                      R.value ? Ye((i(), M($(se), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (D) => he(u)
                      }, null, 8, ["onClick"])), [
                        [
                          H,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : P("", !0),
                      J.value ? Ye((i(), M($(se), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (D) => Me(u)
                      }, null, 8, ["onClick"])), [
                        [
                          H,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : P("", !0)
                    ])
                  ]),
                  _: 1
                })) : P("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        A.value ? (i(), M(tt, {
          key: 0,
          visible: ve.value,
          title: Se.value,
          fields: ne.value,
          "form-data": ie,
          "is-editing": me.value,
          saving: Ce.value,
          width: e.dialogWidth,
          "onUpdate:visible": w[5] || (w[5] = (u) => {
            ve.value = u, u || (re.value = null);
          }),
          "onUpdate:field": Ve,
          onSave: Ee
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : P("", !0)
      ], 64);
    };
  }
}), xa = { class: "w-crud-form-fields" }, Pa = {
  key: 0,
  class: "w-crud-form-switch"
}, Va = { class: "w-crud-form-switch-label" }, Ea = {
  key: 1,
  class: "w-crud-form-col-full"
}, Ma = { class: "w-crud-form-label" }, Aa = {
  key: 0,
  class: "w-crud-form-required"
}, Fa = { class: "w-crud-form-color-row" }, Ta = {
  key: 2,
  class: "w-crud-form-col-full"
}, Ya = { class: "w-crud-form-label" }, Ra = ["accept", "disabled", "onChange"], Ia = { class: "w-crud-form-label" }, La = {
  key: 0,
  class: "w-crud-form-required"
}, Na = {
  key: 14,
  class: "w-crud-form-error"
}, Wa = /* @__PURE__ */ ae({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const o = e, s = a, r = ge({}), d = O(
      () => o.fields.filter((c) => c.visible === void 0 || c.visible === !0 ? !0 : typeof c.visible == "function" ? c.visible(o.formData, o.isEditing) : c.visible)
    );
    function h(c) {
      return o.disabled || c.disabledOnEdit && o.isEditing ? !0 : typeof c.disabled == "function" ? c.disabled(o.formData, o.isEditing) : !!c.disabled;
    }
    function v(c) {
      return Et(c) ? c.value : c;
    }
    const C = O(() => {
      const c = o.isEditing ? "edit" : "create", S = o.fields.find(
        (p) => p.autofocus === !0 || p.autofocus === c
      );
      if (S) return S.field;
      const n = d.value.find((p) => !(p.type === "switch" || p.type === "fk" || p.type === "select" || p.type === "image" || p.disabled === !0 || p.disabledOnEdit && o.isEditing));
      return (n == null ? void 0 : n.field) ?? null;
    });
    function x(c) {
      return c.field === C.value;
    }
    function W(c) {
      if (c)
        return c.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function U(c) {
      if (!c) return "";
      const S = String(c).replace(/\D/g, "").slice(0, 14);
      return S.length <= 11 ? S.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : S.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function E(c, S) {
      const n = S.target.value.replace(/\D/g, "").slice(0, 14);
      s("update:field", c, n);
    }
    const z = ge({});
    function B(c) {
      const S = o.formData[c.field];
      if (S == null) return null;
      const n = c.optionValue || "value";
      return (v(c.options) || []).find(
        (T) => T[n] === S
      ) ?? null;
    }
    function l(c) {
      return z[c.field] || [];
    }
    function f(c, S) {
      const n = (S.query || "").toLowerCase(), p = v(c.options) || [], T = c.optionLabel || "label";
      z[c.field] = p.filter(
        (A) => String(A[T] || "").toLowerCase().includes(n)
      );
    }
    function V(c, S) {
      const n = c.optionValue || "value";
      s("update:field", c.field, S.value[n]);
    }
    function m(c) {
      const S = o.formData[c.field];
      return S ? String(S).replace("#", "") : "FFFFFF";
    }
    function b(c, S) {
      s("update:field", c.field, `#${S}`);
    }
    function I(c) {
      if (typeof c.validate == "function") {
        const S = c.validate(o.formData[c.field]);
        r[c.field] = S || null;
      }
    }
    function K() {
      const c = [];
      for (const S of o.fields)
        if (typeof S.validate == "function") {
          const n = S.validate(o.formData[S.field]);
          r[S.field] = n || null, n && c.push(n);
        }
      return c;
    }
    function L() {
      Object.keys(r).forEach((c) => delete r[c]);
    }
    return t({ validateAll: K, clearErrors: L }), (c, S) => (i(), g("div", xa, [
      (i(!0), g(le, null, ue(d.value, (n) => Y(c.$slots, `field-${n.field}`, {
        key: n.field,
        field: n,
        formData: e.formData,
        isEditing: e.isEditing,
        setFormField: (p, T) => s("update:field", p, T)
      }, () => [
        n.type === "switch" ? (i(), g("div", Pa, [
          q($(Yt), {
            "model-value": e.formData[n.field],
            disabled: h(n),
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
          k("label", Va, F(n.switchLabel || n.label), 1)
        ])) : n.type === "color" ? (i(), g("div", Ea, [
          k("label", Ma, [
            We(F(n.label) + " ", 1),
            n.required ? (i(), g("span", Aa, "*")) : P("", !0)
          ]),
          k("div", Fa, [
            q($(Rt), {
              "model-value": m(n),
              disabled: h(n),
              "onUpdate:modelValue": (p) => b(n, p)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
            q($(we), {
              "model-value": e.formData[n.field],
              class: "w-28",
              maxlength: "7",
              placeholder: "#000000",
              disabled: h(n),
              "onUpdate:modelValue": (p) => s("update:field", n.field, p)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
          ])
        ])) : n.type === "image" ? (i(), g("div", Ta, [
          k("label", Ya, F(n.label), 1),
          Y(c.$slots, `image-${n.field}`, {
            field: n,
            formData: e.formData
          }, () => [
            k("input", {
              type: "file",
              accept: n.accept || "image/*",
              disabled: h(n),
              onChange: (p) => {
                var A;
                const T = ((A = p.target.files) == null ? void 0 : A[0]) ?? null;
                s("update:field", n.field, T);
              }
            }, null, 40, Ra)
          ])
        ])) : (i(), g("div", {
          key: 3,
          class: oe(n.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
        }, [
          k("label", Ia, [
            We(F(n.label) + " ", 1),
            n.required ? (i(), g("span", La, "*")) : P("", !0)
          ]),
          (!n.type || n.type === "text") && n.mask ? Ye((i(), M($(we), {
            key: 0,
            "model-value": e.formData[n.field],
            fluid: "",
            autofocus: x(n) || void 0,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
            [$(dt), { mask: W(n.mask) }]
          ]) : !n.type || n.type === "text" ? (i(), M($(we), {
            key: 1,
            "model-value": e.formData[n.field],
            fluid: "",
            autofocus: x(n) || void 0,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "email" ? (i(), M($(we), {
            key: 2,
            "model-value": e.formData[n.field],
            type: "email",
            fluid: "",
            autofocus: x(n) || void 0,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "password" ? (i(), M($(It), {
            key: 3,
            "model-value": e.formData[n.field],
            fluid: "",
            "toggle-mask": "",
            feedback: n.feedback !== !1,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "number" ? (i(), M($(ot), {
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
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "currency" ? (i(), M($(ot), {
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
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "select" ? (i(), M($(Tt), {
            key: 6,
            "model-value": e.formData[n.field],
            fluid: "",
            options: v(n.options),
            "option-label": n.optionLabel || "label",
            "option-value": n.optionValue || "value",
            "show-clear": n.showClear !== !1,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "autocomplete" ? (i(), M($(gt), {
            key: 7,
            "model-value": B(n),
            fluid: "",
            suggestions: l(n),
            "option-label": n.optionLabel || "label",
            placeholder: n.placeholder,
            disabled: h(n),
            onComplete: (p) => f(n, p),
            onItemSelect: (p) => V(n, p),
            onClear: (p) => s("update:field", n.field, null)
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : n.type === "fk" ? (i(), M(Vt, {
            key: 8,
            "model-value": e.formData[n.field],
            endpoint: n.endpoint,
            "endpoint-params": n.endpointParams,
            "option-label": n.optionLabel || "nome",
            placeholder: n.placeholder,
            disabled: h(n),
            "show-clear": n.showClear !== !1,
            "dialog-header": n.label,
            "crud-fields": n.crudFields,
            "crud-columns": n.crudColumns,
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "endpoint", "endpoint-params", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : n.type === "date" ? (i(), M($(nt), {
            key: 9,
            "model-value": e.formData[n.field],
            fluid: "",
            "date-format": n.dateFormat || "dd/mm/yy",
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "datetime" ? (i(), M($(nt), {
            key: 10,
            "model-value": e.formData[n.field],
            fluid: "",
            "show-time": "",
            "hour-format": n.hourFormat || "24",
            "date-format": n.dateFormat || "dd/mm/yy",
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : n.type === "cpf_cnpj" ? (i(), M($(we), {
            key: 11,
            "model-value": U(e.formData[n.field]),
            fluid: "",
            maxlength: "18",
            placeholder: n.placeholder || "000.000.000-00",
            disabled: h(n),
            invalid: !!r[n.field],
            onInput: (p) => E(n.field, p),
            onBlur: (p) => I(n)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : n.type === "mask" ? Ye((i(), M($(we), {
            key: 12,
            "model-value": e.formData[n.field],
            fluid: "",
            placeholder: n.placeholder,
            disabled: h(n),
            invalid: !!r[n.field],
            "onUpdate:modelValue": (p) => s("update:field", n.field, p),
            onBlur: (p) => I(n)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
            [$(dt), { mask: W(n.mask) }]
          ]) : n.type === "textarea" ? (i(), M($(Ft), {
            key: 13,
            "model-value": e.formData[n.field],
            fluid: "",
            autofocus: x(n) || void 0,
            rows: n.rows || 3,
            placeholder: n.placeholder,
            disabled: h(n),
            "onUpdate:modelValue": (p) => s("update:field", n.field, p)
          }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : P("", !0),
          r[n.field] ? (i(), g("small", Na, F(r[n.field]), 1)) : P("", !0)
        ], 2))
      ])), 128))
    ]));
  }
}), za = { class: "w-crud-form-footer" }, tt = /* @__PURE__ */ ae({
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
    const a = e, o = t, s = N(null);
    function r() {
      s.value ? s.value.validateAll().length === 0 && o("save") : o("save");
    }
    return Ze(
      () => a.visible,
      (d) => {
        d && s.value && s.value.clearErrors();
      }
    ), (d, h) => (i(), M($(ht), {
      visible: e.visible,
      header: e.title,
      style: Le({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": h[2] || (h[2] = (v) => o("update:visible", v))
    }, {
      default: G(() => [
        k("form", {
          class: "w-crud-form",
          onSubmit: Mt(r, ["prevent"])
        }, [
          q(Wa, {
            ref_key: "rendererRef",
            ref: s,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            disabled: e.disabled,
            "onUpdate:field": h[0] || (h[0] = (v, C) => o("update:field", v, C))
          }, Je({ _: 2 }, [
            ue(e.fields, (v) => ({
              name: `field-${v.field}`,
              fn: G((C) => [
                Y(d.$slots, `field-${v.field}`, Xe(Ge(C)))
              ])
            })),
            ue(e.fields.filter((v) => v.type === "image"), (v) => ({
              name: `image-${v.field}`,
              fn: G((C) => [
                Y(d.$slots, `image-${v.field}`, Xe(Ge(C)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing", "disabled"]),
          k("div", za, [
            Y(d.$slots, "footer", {
              saving: e.saving,
              disabled: e.disabled
            }, () => [
              q($(se), {
                type: "button",
                label: e.disabled ? "Fechar" : "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: h[1] || (h[1] = (v) => o("update:visible", !1))
              }, null, 8, ["label", "disabled"]),
              e.disabled ? P("", !0) : (i(), M($(se), {
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
}), ja = { class: "w-crud" }, Ua = {
  key: 0,
  class: "w-crud-header"
}, Ba = { class: "w-crud-header-content" }, Oa = { class: "w-crud-title" }, Ha = {
  key: 0,
  class: "w-crud-subtitle"
}, qa = { class: "w-crud-header-actions" }, Ka = {
  key: 0,
  class: "w-crud-kpis"
}, Za = { class: "w-crud-kpi-content" }, Ja = { class: "w-crud-kpi-label" }, Xa = { class: "w-crud-kpi-value" }, Ga = { class: "w-crud-table" }, Qa = { class: "w-crud-toolbar" }, _a = { class: "w-crud-toolbar-start" }, eo = { class: "w-crud-toolbar-end" }, to = { class: "w-crud-actions" }, ao = /* @__PURE__ */ ae({
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
    const a = e, o = t, { formatNumber: s } = _e(), r = N({}), d = O(
      () => a.crud.config.columns.filter((l) => l.visible !== !1).map((l) => l.type === "number" && !l.align ? { ...l, align: "right" } : l.type === "currency" && !l.align ? { ...l, align: "right" } : l)
    );
    function h(l) {
      if (l.align === "right") return "text-right";
      if (l.align === "center") return "text-center";
    }
    const v = O(() => {
      const l = [];
      return a.crud.config.canCreate !== !1 && a.crud.config.canEdit !== !1 && l.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canDelete !== !1 && l.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), l;
    }), C = O(
      () => a.crud.config.rowActions ?? v.value
    ), x = O(() => C.value.length > 0);
    function W(l, f) {
      l.action === "edit" ? a.crud.openEditDialog(f) : l.action === "view" ? a.crud.openViewDialog(f) : l.action === "delete" ? a.crud.confirmDelete(f) : l.handler && l.handler(f);
    }
    function U(l, f) {
      return l.visible ? l.visible(f) : !0;
    }
    function E(l, f) {
      return l.disabled ? l.disabled(f) : !1;
    }
    const z = O(() => {
      const l = [];
      return a.showKpi && l.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: s(a.crud.pagination.rows, 0)
      }), l.push(...a.extraKpis), l;
    });
    O(() => a.crud.config.labels ?? {});
    const B = O(() => a.crud.config.canCreate !== !1);
    return At(() => {
      a.autoInit && a.crud.init();
    }), (l, f) => {
      const V = ct("tooltip");
      return i(), g("div", ja, [
        e.showHeader ? (i(), g("div", Ua, [
          k("div", Ba, [
            k("h1", Oa, F(e.title), 1),
            e.subtitle ? (i(), g("p", Ha, F(e.subtitle), 1)) : P("", !0)
          ]),
          k("div", qa, [
            Y(l.$slots, "header-actions"),
            B.value ? (i(), M($(se), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: f[0] || (f[0] = (m) => e.crud.openCreateDialog())
            })) : P("", !0)
          ])
        ])) : P("", !0),
        Y(l.$slots, "before-table", {}, () => [
          z.value.length ? (i(), g("div", Ka, [
            (i(!0), g(le, null, ue(z.value, (m, b) => (i(), g("div", {
              key: b,
              class: "w-crud-kpi"
            }, [
              k("div", {
                class: oe(["w-crud-kpi-icon", m.severity ? `w-crud-kpi-icon--${m.severity}` : ""])
              }, [
                k("i", {
                  class: oe([m.icon]),
                  style: Le(m.color ? `color: ${m.color}` : "")
                }, null, 6)
              ], 2),
              k("div", Za, [
                k("div", Ja, F(m.label), 1),
                k("div", Xa, F(m.value), 1)
              ])
            ]))), 128))
          ])) : P("", !0)
        ]),
        k("div", Ga, [
          q($(ft), {
            value: e.crud.items.value,
            loading: e.crud.loading.value,
            "expanded-rows": r.value,
            "onUpdate:expandedRows": f[2] || (f[2] = (m) => r.value = m),
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
            onRowExpand: f[4] || (f[4] = (m) => o("row-expand", m.data)),
            onRowCollapse: f[5] || (f[5] = (m) => o("row-collapse", m.data))
          }, Je({
            header: G(() => [
              k("div", Qa, [
                k("div", _a, [
                  e.showSearch ? (i(), M($(mt), { key: 0 }, {
                    default: G(() => [
                      q($(pt), { class: "pi pi-search" }),
                      q($(we), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : P("", !0),
                  Y(l.$slots, "toolbar-start"),
                  Y(l.$slots, "toolbar-filters")
                ]),
                k("div", eo, [
                  Y(l.$slots, "toolbar-actions"),
                  !e.showHeader && B.value ? (i(), M($(se), {
                    key: 0,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: f[1] || (f[1] = (m) => e.crud.openCreateDialog())
                  })) : P("", !0)
                ])
              ])
            ]),
            empty: G(() => [
              Y(l.$slots, "empty", {}, () => [
                f[9] || (f[9] = k("div", { class: "w-crud-empty" }, [
                  k("div", { class: "w-crud-empty-icon" }, [
                    k("i", { class: "pi pi-inbox" })
                  ]),
                  k("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                  k("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                ], -1))
              ])
            ]),
            default: G(() => [
              e.expandable ? (i(), M($(Re), {
                key: 0,
                expander: "",
                style: { width: "3rem" }
              })) : P("", !0),
              (i(!0), g(le, null, ue(d.value, (m) => (i(), M($(Re), {
                key: m.field,
                field: m.field,
                header: m.header,
                sortable: m.sortable,
                style: Le(m.style),
                "header-class": h(m),
                "body-class": h(m)
              }, {
                body: G(({ data: b }) => [
                  Y(l.$slots, `column-${m.field}`, {
                    data: b,
                    value: b[m.field]
                  }, () => [
                    q(et, {
                      column: m,
                      value: b[m.field],
                      "row-data": b
                    }, null, 8, ["column", "value", "row-data"])
                  ])
                ]),
                _: 2
              }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
              x.value ? (i(), M($(Re), {
                key: 1,
                "header-class": "w-crud-actions-header",
                style: Le({ width: `${C.value.length * 2.5 + 1}rem` })
              }, {
                body: G(({ data: m }) => [
                  Y(l.$slots, "row-actions", {
                    data: m,
                    crud: e.crud
                  }, () => [
                    k("div", to, [
                      (i(!0), g(le, null, ue(C.value, (b) => (i(), g(le, {
                        key: b.action
                      }, [
                        U(b, m) ? Ye((i(), M($(se), {
                          key: 0,
                          icon: b.icon,
                          text: "",
                          rounded: "",
                          size: "small",
                          severity: b.severity,
                          disabled: E(b, m),
                          onClick: (I) => W(b, m)
                        }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                          [
                            V,
                            b.tooltip,
                            void 0,
                            { top: !0 }
                          ]
                        ]) : P("", !0)
                      ], 64))), 128))
                    ])
                  ])
                ]),
                _: 3
              }, 8, ["style"])) : P("", !0)
            ]),
            _: 2
          }, [
            e.expandable ? {
              name: "expansion",
              fn: G((m) => [
                Y(l.$slots, "expansion", {
                  data: m.data
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "onPage"])
        ]),
        Y(l.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => {
          var m;
          return [
            q(tt, {
              visible: e.crud.dialogVisible.value,
              title: e.crud.dialogTitle.value,
              fields: e.crud.config.form,
              "form-data": e.crud.formData,
              "is-editing": e.crud.isEditing.value,
              saving: e.crud.saving.value,
              disabled: ((m = e.crud.viewMode) == null ? void 0 : m.value) ?? !1,
              width: e.dialogWidth,
              "onUpdate:visible": f[6] || (f[6] = (b) => {
                e.crud.dialogVisible.value = b, b || (e.crud.editingItem.value = null);
              }),
              "onUpdate:field": f[7] || (f[7] = (b, I) => e.crud.setFormField(b, I)),
              onSave: f[8] || (f[8] = (b) => e.crud.save())
            }, Je({ _: 2 }, [
              ue(e.crud.config.form, (b) => ({
                name: `field-${b.field}`,
                fn: G((I) => [
                  Y(l.$slots, `field-${b.field}`, Xe(Ge(I)))
                ])
              }))
            ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "disabled", "width"])
          ];
        })
      ]);
    };
  }
}), oo = /* @__PURE__ */ ae({
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
    }, o = O(() => (t.map ?? a)[t.value] ?? { label: t.value, severity: "secondary" });
    return (s, r) => (i(), M($(vt), {
      value: o.value.label,
      severity: o.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), no = { class: "w-page-header" }, so = { class: "w-page-header-content" }, lo = { class: "w-page-header-title" }, ro = {
  key: 0,
  class: "w-page-header-subtitle"
}, io = { class: "w-page-header-actions" }, Vn = /* @__PURE__ */ ae({
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
    return (o, s) => (i(), g("div", no, [
      k("div", so, [
        k("h2", lo, F(e.title), 1),
        e.subtitle ? (i(), g("p", ro, F(e.subtitle), 1)) : P("", !0)
      ]),
      k("div", io, [
        Y(o.$slots, "actions"),
        e.actionLabel ? (i(), M($(se), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: s[0] || (s[0] = (r) => a("action"))
        }, null, 8, ["label", "icon"])) : P("", !0)
      ])
    ]));
  }
}), uo = { class: "w-empty-state" }, co = { class: "w-empty-state-icon" }, fo = { class: "w-empty-state-title" }, mo = {
  key: 0,
  class: "w-empty-state-description"
}, En = /* @__PURE__ */ ae({
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
    return (o, s) => (i(), g("div", uo, [
      k("div", co, [
        k("i", {
          class: oe(e.icon)
        }, null, 2)
      ]),
      k("p", fo, F(e.title), 1),
      e.description ? (i(), g("p", mo, F(e.description), 1)) : P("", !0),
      e.actionLabel ? (i(), M($(se), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: s[0] || (s[0] = (r) => a("action"))
      }, null, 8, ["label", "icon"])) : P("", !0)
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
const po = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
function vo() {
  return Ae(po);
}
const ho = { class: "w-detail-header" }, go = { class: "w-detail-header-left" }, yo = { class: "w-detail-header-content" }, bo = { class: "w-detail-header-title" }, wo = {
  key: 0,
  class: "w-detail-header-subtitle"
}, ko = { class: "w-detail-header-actions" }, Mn = /* @__PURE__ */ ae({
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
    const t = e, a = vo();
    function o() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (s, r) => (i(), g("div", ho, [
      k("div", go, [
        q($(se), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: o
        }),
        e.icon ? (i(), g("i", {
          key: 0,
          class: oe([e.icon, "w-detail-header-icon"])
        }, null, 2)) : P("", !0),
        k("div", yo, [
          k("h2", bo, F(e.title), 1),
          e.subtitle ? (i(), g("p", wo, F(e.subtitle), 1)) : P("", !0)
        ]),
        e.status ? (i(), M(oo, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : P("", !0)
      ]),
      k("div", ko, [
        Y(s.$slots, "actions")
      ])
    ]));
  }
}), $o = { class: "w-info-card" }, Do = {
  key: 0,
  class: "w-info-card-title"
}, Co = { class: "w-info-card-grid" }, So = { class: "w-info-card-label" }, xo = { class: "w-info-card-value" }, An = /* @__PURE__ */ ae({
  __name: "WInfoCard",
  props: {
    title: {},
    fields: {}
  },
  setup(e) {
    const { formatCurrency: t, formatDate: a, formatNumber: o } = _e();
    function s(r) {
      const d = r.value;
      return d == null || d === "" ? "-" : r.format === "currency" ? t(Number(d)) : r.format === "date" ? a(String(d)) : r.format === "datetime" ? a(String(d), "DD/MM/YYYY HH:mm") : r.format === "number" ? o(Number(d)) : String(d);
    }
    return (r, d) => (i(), g("div", $o, [
      e.title ? (i(), g("h3", Do, F(e.title), 1)) : P("", !0),
      k("div", Co, [
        (i(!0), g(le, null, ue(e.fields, (h) => (i(), g("div", {
          key: h.label,
          class: "w-info-card-field"
        }, [
          k("span", So, F(h.label), 1),
          k("span", xo, F(s(h)), 1)
        ]))), 128))
      ])
    ]));
  }
}), Po = {
  key: 0,
  class: "w-kpi-card__loading"
}, Vo = { class: "w-kpi-card__loading-content" }, Eo = { class: "w-kpi-card__header" }, Mo = {
  key: 0,
  class: "w-kpi-card__icon"
}, Ao = {
  key: 1,
  class: "w-kpi-card__trend"
}, Fo = { class: "w-kpi-card__content" }, To = { class: "w-kpi-card__label" }, Yo = { class: "w-kpi-card__value" }, Ro = {
  key: 0,
  class: "w-kpi-card__hint"
}, Io = {
  key: 0,
  class: "w-kpi-card__footer"
}, Lo = /* @__PURE__ */ ae({
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
    return (t, a) => (i(), g("article", {
      class: oe(["w-kpi-card", e.severity ? `w-kpi-card--${e.severity}` : ""])
    }, [
      e.loading ? (i(), g("div", Po, [
        q($(je), {
          shape: "circle",
          size: "2.75rem"
        }),
        k("div", Vo, [
          q($(je), {
            width: "6rem",
            height: "0.75rem"
          }),
          q($(je), {
            width: "7.5rem",
            height: "1.5rem"
          }),
          q($(je), {
            width: "5rem",
            height: "0.75rem"
          })
        ])
      ])) : (i(), g(le, { key: 1 }, [
        k("div", Eo, [
          e.icon || t.$slots.icon ? (i(), g("div", Mo, [
            Y(t.$slots, "icon", {}, () => [
              e.icon ? (i(), g("i", {
                key: 0,
                class: oe(e.icon)
              }, null, 2)) : P("", !0)
            ])
          ])) : P("", !0),
          e.trend || t.$slots.trend ? (i(), g("div", Ao, [
            Y(t.$slots, "trend", {}, () => [
              e.trend ? (i(), g("span", {
                key: 0,
                class: oe(["w-kpi-card__trend-badge", e.trend.direction ? `w-kpi-card__trend-badge--${e.trend.direction}` : ""])
              }, F(e.trend.value), 3)) : P("", !0)
            ])
          ])) : P("", !0)
        ]),
        k("div", Fo, [
          k("p", To, F(e.label), 1),
          k("div", Yo, [
            Y(t.$slots, "value", {}, () => [
              We(F(e.value), 1)
            ])
          ]),
          e.hint || t.$slots.hint ? (i(), g("p", Ro, [
            Y(t.$slots, "hint", {}, () => [
              We(F(e.hint), 1)
            ])
          ])) : P("", !0)
        ]),
        t.$slots.footer ? (i(), g("footer", Io, [
          Y(t.$slots, "footer")
        ])) : P("", !0)
      ], 64))
    ], 2));
  }
}), Fn = /* @__PURE__ */ ae({
  __name: "WKpiGrid",
  props: {
    items: { default: () => [] },
    columns: { default: 4 },
    dense: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = O(() => [
      `w-kpi-grid--cols-${t.columns}`,
      { "w-kpi-grid--dense": t.dense }
    ]);
    return (o, s) => (i(), g("div", {
      class: oe(["w-kpi-grid", a.value])
    }, [
      o.$slots.item ? (i(!0), g(le, { key: 0 }, ue(e.items, (r, d) => Y(o.$slots, "item", {
        key: d,
        item: r,
        index: d
      })), 128)) : (i(!0), g(le, { key: 1 }, ue(e.items, (r, d) => (i(), M(Lo, {
        key: d,
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
}), No = { class: "w-section-header__main" }, Wo = {
  key: 0,
  class: "w-section-header__icon"
}, zo = { class: "w-section-header__content" }, jo = { class: "w-section-header__title-row" }, Uo = { class: "w-section-header__title" }, Bo = {
  key: 0,
  class: "w-section-header__subtitle"
}, Oo = {
  key: 0,
  class: "w-section-header__actions"
}, Tn = /* @__PURE__ */ ae({
  __name: "WSectionHeader",
  props: {
    title: {},
    subtitle: {},
    icon: {},
    compact: { type: Boolean }
  },
  setup(e) {
    return (t, a) => (i(), g("div", {
      class: oe(["w-section-header", { "w-section-header--compact": e.compact }])
    }, [
      k("div", No, [
        e.icon || t.$slots.icon ? (i(), g("div", Wo, [
          Y(t.$slots, "icon", {}, () => [
            e.icon ? (i(), g("i", {
              key: 0,
              class: oe(e.icon)
            }, null, 2)) : P("", !0)
          ])
        ])) : P("", !0),
        k("div", zo, [
          k("div", jo, [
            k("h3", Uo, F(e.title), 1),
            Y(t.$slots, "meta")
          ]),
          e.subtitle ? (i(), g("p", Bo, F(e.subtitle), 1)) : P("", !0)
        ])
      ]),
      t.$slots.actions ? (i(), g("div", Oo, [
        Y(t.$slots, "actions")
      ])) : P("", !0)
    ], 2));
  }
}), Ho = {
  key: 0,
  class: "w-form-section__header"
}, qo = { class: "w-form-section__content" }, Ko = { class: "w-form-section__title" }, Zo = {
  key: 0,
  class: "w-form-section__description"
}, Jo = {
  key: 0,
  class: "w-form-section__actions"
}, Xo = { class: "w-form-section__body" }, Yn = /* @__PURE__ */ ae({
  __name: "WFormSection",
  props: {
    title: {},
    description: {},
    variant: {}
  },
  setup(e) {
    return (t, a) => (i(), g("section", {
      class: oe(["w-form-section", e.variant ? `w-form-section--${e.variant}` : ""])
    }, [
      e.title || e.description || t.$slots.actions ? (i(), g("div", Ho, [
        k("div", qo, [
          k("h3", Ko, F(e.title), 1),
          e.description ? (i(), g("p", Zo, F(e.description), 1)) : P("", !0)
        ]),
        t.$slots.actions ? (i(), g("div", Jo, [
          Y(t.$slots, "actions")
        ])) : P("", !0)
      ])) : P("", !0),
      k("div", Xo, [
        Y(t.$slots, "default")
      ])
    ], 2));
  }
}), Go = {
  key: 0,
  class: "w-action-bar__primary"
}, Qo = {
  key: 1,
  class: "w-action-bar__filters"
}, _o = {
  key: 2,
  class: "w-action-bar__secondary"
}, Rn = /* @__PURE__ */ ae({
  __name: "WActionBar",
  props: {
    align: { default: "between" },
    stackOnMobile: { type: Boolean, default: !0 }
  },
  setup(e) {
    return (t, a) => (i(), g("div", {
      class: oe(["w-action-bar", [
        `w-action-bar--${e.align}`,
        { "w-action-bar--stack": e.stackOnMobile }
      ]])
    }, [
      t.$slots.primary || t.$slots.default ? (i(), g("div", Go, [
        Y(t.$slots, "primary", {}, () => [
          Y(t.$slots, "default")
        ])
      ])) : P("", !0),
      t.$slots.filters ? (i(), g("div", Qo, [
        Y(t.$slots, "filters")
      ])) : P("", !0),
      t.$slots.secondary ? (i(), g("div", _o, [
        Y(t.$slots, "secondary")
      ])) : P("", !0)
    ], 2));
  }
}), en = { class: "w-progress-flow__marker" }, tn = { class: "w-progress-flow__content" }, an = { class: "w-progress-flow__label" }, on = {
  key: 0,
  class: "w-progress-flow__description"
}, In = /* @__PURE__ */ ae({
  __name: "WProgressFlow",
  props: {
    steps: {},
    currentStep: {},
    orientation: { default: "horizontal" }
  },
  setup(e) {
    const t = e, a = O(
      () => t.steps.findIndex((s) => s.key === t.currentStep)
    );
    function o(s) {
      return s < a.value ? "done" : s === a.value ? "current" : "pending";
    }
    return (s, r) => (i(), g("div", {
      class: oe(["w-progress-flow", `w-progress-flow--${e.orientation}`])
    }, [
      (i(!0), g(le, null, ue(e.steps, (d, h) => (i(), g("div", {
        key: d.key,
        class: oe(["w-progress-flow__step", `w-progress-flow__step--${o(h)}`])
      }, [
        Y(s.$slots, "step", {
          step: d,
          index: h,
          state: o(h)
        }, () => [
          k("div", en, [
            k("span", null, F(h + 1), 1)
          ]),
          k("div", tn, [
            k("p", an, F(d.label), 1),
            d.description ? (i(), g("p", on, F(d.description), 1)) : P("", !0)
          ])
        ])
      ], 2))), 128))
    ], 2));
  }
}), Ln = {
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
    e.provide(He, t.axios), e.provide(qe, a), t.registerComponents !== !1 && (e.component("WCrudView", ao), e.component("WCrudFormDialog", tt), e.component("WCrudColumnRenderer", et), e.component("WAutoCompleteFK", Vt));
  }
}, nn = {
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
function Nn(e) {
  const {
    endpoint: t,
    columns: a,
    form: o,
    pk: s = "id",
    searchDebounce: r = 300,
    canCreate: d = !0,
    canEdit: h = !0,
    canDelete: v = !0,
    rowActions: C = void 0,
    filterParams: x = void 0,
    createDefaults: W = void 0,
    transformPayload: U = void 0,
    onAfterSave: E = void 0,
    onAfterDelete: z = void 0
  } = e, B = Ae(He);
  if (!B)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const l = B, f = Ae(qe), V = e.pageSize ?? (f == null ? void 0 : f.defaultPageSize) ?? 20, m = { ...nn, ...e.labels }, b = xt(), { confirmDelete: I } = Pt(), K = N([]), L = N({}), c = N(!1), S = N(!1), n = N(""), p = N(!1), T = N(!1), A = N(null), Z = ge({}), R = ge({
    page: 1,
    pageSize: V,
    rows: 0,
    totalPages: 0
  }), J = ge({
    field: null,
    order: 0
  });
  function pe() {
    const u = {};
    for (const D of o)
      u[D.field] = D.defaultValue !== void 0 ? typeof D.defaultValue == "function" ? D.defaultValue() : D.defaultValue : null;
    return u;
  }
  const ne = pe();
  for (const u of Object.keys(ne))
    Z[u] = ne[u];
  const ee = O(() => A.value !== null && !T.value), de = O(() => T.value), te = O(
    () => T.value ? m.viewTitle ?? "Visualizar Registro" : ee.value ? m.editTitle : m.createTitle
  ), $e = O(() => R.page <= 1), ye = O(() => R.page >= R.totalPages);
  let De = null;
  async function ce(u = {}) {
    c.value = !0;
    try {
      const D = {
        page: R.page,
        page_size: R.pageSize,
        ...u
      };
      n.value && (D.search = n.value), J.field && J.order !== 0 && (D.ordering = J.order === -1 ? `-${J.field}` : J.field), x && Object.assign(D, x());
      const Q = (await l.get(t, { params: D })).data;
      Array.isArray(Q.results) ? (K.value = Q.results, R.rows = Q.count ?? 0) : (K.value = Q.data ?? [], R.rows = Q.rows ?? 0), Q.extras && (L.value = Q.extras), Q.page && (R.page = Q.page), Q.page_size && (R.pageSize = Q.page_size), R.totalPages = Math.ceil(R.rows / R.pageSize) || 0;
    } finally {
      c.value = !1;
    }
  }
  async function ve() {
    await ce();
  }
  async function Ce() {
    await ce();
  }
  function re(u) {
    n.value = u, De && clearTimeout(De), De = setTimeout(() => {
      R.page = 1, ce();
    }, r);
  }
  function ie(u) {
    const D = u.target;
    re(D.value);
  }
  function me(u) {
    R.page = u, ce();
  }
  function Se() {
    me(1);
  }
  function xe() {
    me(R.totalPages);
  }
  function Pe(u) {
    R.page = u.page + 1, R.pageSize = u.rows, ce();
  }
  function be(u) {
    J.field = u.sortField ?? null, J.order = u.sortOrder ?? 0, R.page = 1, ce();
  }
  function he() {
    const u = pe();
    for (const D of Object.keys(u))
      Z[D] = u[D];
  }
  function Ve(u, D) {
    Z[u] = D;
  }
  function Ee() {
    if (T.value = !1, A.value = null, he(), W) {
      const u = W();
      for (const [D, j] of Object.entries(u))
        Z[D] = j;
    }
    p.value = !0;
  }
  function Me(u) {
    T.value = !1, A.value = u;
    for (const D of o) {
      let j = u[D.field] !== void 0 ? u[D.field] : null;
      j && (D.type === "date" || D.type === "datetime") && typeof j == "string" && (j = Qe(j)), Z[D.field] = j;
    }
    p.value = !0;
  }
  function y(u) {
    T.value = !0, A.value = u;
    for (const D of o) {
      let j = u[D.field] !== void 0 ? u[D.field] : null;
      j && (D.type === "date" || D.type === "datetime") && typeof j == "string" && (j = Qe(j)), Z[D.field] = j;
    }
    p.value = !0;
  }
  async function w() {
    for (const u of o) {
      if (u.validate) {
        const D = u.validate(Z[u.field]);
        if (D)
          return b.error(D), null;
      }
      if (u.required) {
        const D = Z[u.field];
        if (D == null || D === "")
          return b.error(`${u.label} é obrigatório`), null;
      }
    }
    S.value = !0;
    try {
      let u = { ...Z };
      !ee.value && W && Object.assign(u, W());
      for (const X of o) {
        const _ = u[X.field];
        if (X.type === "date" && _ instanceof Date ? u[X.field] = yt(_) : X.type === "datetime" && _ instanceof Date && (u[X.field] = bt(_)), X.type === "fk" && _ !== null && typeof _ == "object") {
          const fe = X.optionValue || "id";
          u[X.field] = _[fe] ?? _;
        }
        (X.type === "mask" || X.type === "cpf_cnpj") && typeof _ == "string" && (u[X.field] = ke(_));
      }
      U && (u = U(u, ee.value));
      const D = o.some(
        (X) => X.type === "image" && u[X.field] instanceof File
      );
      let j = u, Q;
      if (D) {
        const X = new Set(
          o.filter((fe) => fe.type === "image").map((fe) => fe.field)
        ), _ = new FormData();
        for (const [fe, Ie] of Object.entries(u))
          if (Ie != null)
            if (Ie instanceof File)
              _.append(fe, Ie);
            else {
              if (X.has(fe))
                continue;
              _.append(fe, String(Ie));
            }
        j = _, Q = { "Content-Type": "multipart/form-data" };
      }
      const at = Q ? { headers: Q } : void 0;
      let Te;
      if (ee.value && A.value) {
        const X = A.value[s];
        Te = await l.patch(
          `${t}${X}/`,
          j,
          at
        );
        const _ = K.value.findIndex(
          (fe) => fe[s] === X
        );
        _ !== -1 && (K.value[_] = Te.data), b.success(m.successUpdate);
      } else
        Te = await l.post(t, j, at), K.value.unshift(Te.data), R.rows++, b.success(m.successCreate);
      return p.value = !1, A.value = null, E && E(Te.data, ee.value), Te.data;
    } catch (u) {
      return b.error(ze(u, "Erro ao salvar registro")), null;
    } finally {
      S.value = !1;
    }
  }
  function H(u) {
    I(async () => {
      try {
        const D = u[s];
        await l.delete(`${t}${D}/`);
        const j = K.value.findIndex(
          (Q) => Q[s] === D
        );
        j !== -1 && (K.value.splice(j, 1), R.rows--), b.success(m.successDelete), z && z(u);
      } catch (D) {
        b.error(ze(D, "Erro ao excluir registro"));
      }
    }, m.deleteConfirmMessage);
  }
  return {
    items: K,
    extras: L,
    loading: c,
    saving: S,
    search: n,
    dialogVisible: p,
    editingItem: A,
    formData: Z,
    pagination: R,
    sort: J,
    isEditing: ee,
    isViewing: de,
    viewMode: T,
    dialogTitle: te,
    isFirstPage: $e,
    isLastPage: ye,
    init: ve,
    fetchItems: ce,
    refresh: Ce,
    setSearch: re,
    onSearch: ie,
    onPage: Pe,
    onSort: be,
    openCreateDialog: Ee,
    openEditDialog: Me,
    openViewDialog: y,
    save: w,
    confirmDelete: H,
    setFormField: Ve,
    resetForm: he,
    goToPage: me,
    firstPage: Se,
    lastPage: xe,
    config: e
  };
}
function Wn(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: o = !1 } = e, s = Ae(He);
  if (!s)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const r = s, d = Ae(qe), h = e.pageSize ?? (d == null ? void 0 : d.defaultPageSize) ?? 20, v = N([]), C = N(!1), x = N(""), W = N({}), U = ge({}), E = ge({
    page: 1,
    pageSize: h,
    rows: 0,
    totalPages: 0
  }), z = ge({
    field: null,
    order: 0
  });
  let B = null;
  async function l(L = {}) {
    C.value = !0;
    try {
      const c = {
        page: E.page,
        page_size: E.pageSize,
        ...L
      };
      x.value && (c.search = x.value), z.field && z.order !== 0 && (c.ordering = z.order === -1 ? `-${z.field}` : z.field);
      for (const [T, A] of Object.entries(U))
        A != null && A !== "" && (c[T] = A);
      const p = (await r.get(t, {
        params: c
      })).data;
      Array.isArray(p.results) ? (v.value = p.results, E.rows = p.count ?? 0) : (v.value = p.data ?? [], E.rows = p.rows ?? 0), p.page && (E.page = p.page), p.page_size && (E.pageSize = p.page_size), E.totalPages = Math.ceil(E.rows / E.pageSize) || 0, W.value = p.extras ?? {};
    } finally {
      C.value = !1;
    }
  }
  async function f() {
    await l();
  }
  function V(L) {
    x.value = L, B && clearTimeout(B), B = setTimeout(() => {
      E.page = 1, l();
    }, a);
  }
  function m(L, c) {
    U[L] = c, E.page = 1, l();
  }
  function b() {
    for (const L of Object.keys(U))
      delete U[L];
    E.page = 1, l();
  }
  function I(L) {
    E.page = L.page + 1, E.pageSize = L.rows, l();
  }
  function K(L) {
    z.field = L.sortField ?? null, z.order = L.sortOrder ?? 0, E.page = 1, l();
  }
  return o && l(), {
    items: v,
    loading: C,
    search: x,
    pagination: E,
    sort: z,
    extras: W,
    fetchItems: l,
    refresh: f,
    setSearch: V,
    setFilter: m,
    clearFilters: b,
    onPage: I,
    onSort: K
  };
}
export {
  nn as DEFAULT_CRUD_LABELS,
  Rn as WActionBar,
  Vt as WAutoCompleteFK,
  et as WCrudColumnRenderer,
  tt as WCrudFormDialog,
  ao as WCrudView,
  Mn as WDetailHeader,
  En as WEmptyState,
  Wa as WFormRenderer,
  Yn as WFormSection,
  An as WInfoCard,
  Lo as WKpiCard,
  Fn as WKpiGrid,
  Vn as WPageHeader,
  Ln as WPrimeVuePlugin,
  In as WProgressFlow,
  Tn as WSectionHeader,
  oo as WStatusTag,
  He as W_AXIOS_KEY,
  qe as W_CONFIG_KEY,
  ze as extractApiError,
  ha as mapApiFieldToColumnDef,
  ma as mapApiFieldToFieldDef,
  ga as mapApiFieldsToColumnDefs,
  pa as mapApiFieldsToFieldDefs,
  Wn as useApi,
  Pn as useApiError,
  Pt as useAppConfirm,
  xt as useAppToast,
  Nn as useCrudManager,
  _e as useFormatters
};
//# sourceMappingURL=index.js.map
