import { inject as Me, defineComponent as Ie, openBlock as h, createElementBlock as j, createBlock as T, unref as w, toDisplayString as X, ref as I, watch as Ne, computed as W, reactive as ie, resolveDirective as et, Fragment as ge, createElementVNode as F, createVNode as q, withDirectives as Se, withCtx as J, createCommentVNode as H, renderList as xe, normalizeStyle as Fe, createTextVNode as Be, withModifiers as kt, renderSlot as G, normalizeClass as tt, isRef as wt, onMounted as Dt, createSlots as qe, normalizeProps as Ct, guardReactiveProps as $t } from "vue";
import at from "primevue/datatable";
import Pe from "primevue/column";
import se from "primevue/button";
import ve from "primevue/inputtext";
import ot from "primevue/iconfield";
import lt from "primevue/inputicon";
import xt from "primevue/tag";
import Ce from "dayjs";
import nt from "primevue/dialog";
import He from "primevue/inputnumber";
import St from "primevue/textarea";
import Pt from "primevue/select";
import rt from "primevue/autocomplete";
import Ke from "primevue/datepicker";
import Mt from "primevue/toggleswitch";
import Vt from "primevue/colorpicker";
import At from "primevue/password";
import { useToast as Ft } from "primevue/usetoast";
import { useConfirm as Et } from "primevue/useconfirm";
const je = Symbol("w-axios"), ze = Symbol("w-config");
function Yt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Re = { exports: {} }, Tt = Re.exports, Ze;
function Rt() {
  return Ze || (Ze = 1, (function(e, a) {
    (function(t, l) {
      e.exports = l();
    })(Tt, (function() {
      var t = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, l = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, r = /\d/, c = /\d\d/, u = /\d\d?/, V = /\d*[^-_:/,()\s\d]+/, v = {}, D = function(n) {
        return (n = +n) + (n > 68 ? 1900 : 2e3);
      }, x = function(n) {
        return function(d) {
          this[n] = +d;
        };
      }, z = [/[+-]\d\d:?(\d\d)?|Z/, function(n) {
        (this.zone || (this.zone = {})).offset = (function(d) {
          if (!d || d === "Z") return 0;
          var C = d.match(/([+-]|\d\d)/g), s = 60 * C[1] + (+C[2] || 0);
          return s === 0 ? 0 : C[0] === "+" ? -s : s;
        })(n);
      }], U = function(n) {
        var d = v[n];
        return d && (d.indexOf ? d : d.s.concat(d.f));
      }, P = function(n, d) {
        var C, s = v.meridiem;
        if (s) {
          for (var b = 1; b <= 24; b += 1) if (n.indexOf(s(b, 0, d)) > -1) {
            C = b > 12;
            break;
          }
        } else C = n === (d ? "pm" : "PM");
        return C;
      }, R = { A: [V, function(n) {
        this.afternoon = P(n, !1);
      }], a: [V, function(n) {
        this.afternoon = P(n, !0);
      }], Q: [r, function(n) {
        this.month = 3 * (n - 1) + 1;
      }], S: [r, function(n) {
        this.milliseconds = 100 * +n;
      }], SS: [c, function(n) {
        this.milliseconds = 10 * +n;
      }], SSS: [/\d{3}/, function(n) {
        this.milliseconds = +n;
      }], s: [u, x("seconds")], ss: [u, x("seconds")], m: [u, x("minutes")], mm: [u, x("minutes")], H: [u, x("hours")], h: [u, x("hours")], HH: [u, x("hours")], hh: [u, x("hours")], D: [u, x("day")], DD: [c, x("day")], Do: [V, function(n) {
        var d = v.ordinal, C = n.match(/\d+/);
        if (this.day = C[0], d) for (var s = 1; s <= 31; s += 1) d(s).replace(/\[|\]/g, "") === n && (this.day = s);
      }], w: [u, x("week")], ww: [c, x("week")], M: [u, x("month")], MM: [c, x("month")], MMM: [V, function(n) {
        var d = U("months"), C = (U("monthsShort") || d.map((function(s) {
          return s.slice(0, 3);
        }))).indexOf(n) + 1;
        if (C < 1) throw new Error();
        this.month = C % 12 || C;
      }], MMMM: [V, function(n) {
        var d = U("months").indexOf(n) + 1;
        if (d < 1) throw new Error();
        this.month = d % 12 || d;
      }], Y: [/[+-]?\d+/, x("year")], YY: [c, function(n) {
        this.year = D(n);
      }], YYYY: [/\d{4}/, x("year")], Z: z, ZZ: z };
      function L(n) {
        var d, C;
        d = n, C = v && v.formats;
        for (var s = (n = d.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(f, M, $) {
          var E = $ && $.toUpperCase();
          return M || C[$] || t[$] || C[E].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(_, Q, Z) {
            return Q || Z.slice(1);
          }));
        }))).match(l), b = s.length, A = 0; A < b; A += 1) {
          var K = s[A], i = R[K], g = i && i[0], o = i && i[1];
          s[A] = o ? { regex: g, parser: o } : K.replace(/^\[|\]$/g, "");
        }
        return function(f) {
          for (var M = {}, $ = 0, E = 0; $ < b; $ += 1) {
            var _ = s[$];
            if (typeof _ == "string") E += _.length;
            else {
              var Q = _.regex, Z = _.parser, ue = f.slice(E), ee = Q.exec(ue)[0];
              Z.call(M, ee), f = f.replace(ee, "");
            }
          }
          return (function(oe) {
            var te = oe.afternoon;
            if (te !== void 0) {
              var O = oe.hours;
              te ? O < 12 && (oe.hours += 12) : O === 12 && (oe.hours = 0), delete oe.afternoon;
            }
          })(M), M;
        };
      }
      return function(n, d, C) {
        C.p.customParseFormat = !0, n && n.parseTwoDigitYear && (D = n.parseTwoDigitYear);
        var s = d.prototype, b = s.parse;
        s.parse = function(A) {
          var K = A.date, i = A.utc, g = A.args;
          this.$u = i;
          var o = g[1];
          if (typeof o == "string") {
            var f = g[2] === !0, M = g[3] === !0, $ = f || M, E = g[2];
            M && (E = g[2]), v = this.$locale(), !f && E && (v = C.Ls[E]), this.$d = (function(ue, ee, oe, te) {
              try {
                if (["x", "X"].indexOf(ee) > -1) return new Date((ee === "X" ? 1e3 : 1) * ue);
                var O = L(ee)(ue), ye = O.year, de = O.month, $e = O.day, Ve = O.hours, le = O.minutes, be = O.seconds, ne = O.milliseconds, ae = O.zone, ce = O.week, fe = /* @__PURE__ */ new Date(), ke = $e || (ye || de ? 1 : fe.getDate()), we = ye || fe.getFullYear(), me = 0;
                ye && !de || (me = de > 0 ? de - 1 : fe.getMonth());
                var pe, De = Ve || 0, y = le || 0, S = be || 0, m = ne || 0;
                return ae ? new Date(Date.UTC(we, me, ke, De, y, S, m + 60 * ae.offset * 1e3)) : oe ? new Date(Date.UTC(we, me, ke, De, y, S, m)) : (pe = new Date(we, me, ke, De, y, S, m), ce && (pe = te(pe).week(ce).toDate()), pe);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(K, o, i, C), this.init(), E && E !== !0 && (this.$L = this.locale(E).$L), $ && K != this.format(o) && (this.$d = /* @__PURE__ */ new Date("")), v = {};
          } else if (o instanceof Array) for (var _ = o.length, Q = 1; Q <= _; Q += 1) {
            g[1] = o[Q - 1];
            var Z = C.apply(this, g);
            if (Z.isValid()) {
              this.$d = Z.$d, this.$L = Z.$L, this.init();
              break;
            }
            Q === _ && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else b.call(this, A);
        };
      };
    }));
  })(Re)), Re.exports;
}
var Lt = Rt();
const It = /* @__PURE__ */ Yt(Lt);
Ce.extend(It);
function st(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const a = Ce(e, "YYYY-MM-DD", !0);
  return a.isValid() ? a.toDate() : Ce(e).toDate();
}
function it(e) {
  return e ? typeof e == "string" ? e : Ce(e).format("YYYY-MM-DD") : null;
}
function ut(e) {
  return e ? typeof e == "string" ? e : Ce(e).toISOString() : null;
}
function jt(e, a = "DD/MM/YYYY") {
  return e ? Ce(e).format(a) : "—";
}
function zt(e) {
  return e ? Ce(e).format("DD/MM/YYYY HH:mm") : "—";
}
function he(e) {
  return e.replace(/\D/g, "");
}
function dt(e) {
  if (!e) return "—";
  const a = he(e);
  return a.length !== 11 ? e : a.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function ct(e) {
  if (!e) return "—";
  const a = he(e);
  return a.length !== 14 ? e : a.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function Ut(e) {
  if (!e) return "—";
  const a = he(e);
  return a.length === 11 ? dt(e) : a.length === 14 ? ct(e) : e;
}
function Nt(e) {
  if (!e) return "—";
  const a = he(e);
  return a.length === 11 ? a.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : a.length === 10 ? a.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function ft(e) {
  if (!e) return null;
  const a = he(e);
  if (a.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(a)) return "CPF inválido.";
  let t = 0;
  for (let u = 0; u < 9; u++) t += parseInt(a[u]) * (10 - u);
  let l = t % 11;
  const r = l < 2 ? 0 : 11 - l;
  if (parseInt(a[9]) !== r) return "CPF inválido.";
  t = 0;
  for (let u = 0; u < 10; u++) t += parseInt(a[u]) * (11 - u);
  l = t % 11;
  const c = l < 2 ? 0 : 11 - l;
  return parseInt(a[10]) !== c ? "CPF inválido." : null;
}
function mt(e) {
  if (!e) return null;
  const a = he(e);
  if (a.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(a)) return "CNPJ inválido.";
  const t = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let l = 0;
  for (let v = 0; v < 12; v++) l += parseInt(a[v]) * t[v];
  let r = l % 11;
  const c = r < 2 ? 0 : 11 - r;
  if (parseInt(a[12]) !== c) return "CNPJ inválido.";
  const u = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  l = 0;
  for (let v = 0; v < 13; v++) l += parseInt(a[v]) * u[v];
  r = l % 11;
  const V = r < 2 ? 0 : 11 - r;
  return parseInt(a[13]) !== V ? "CNPJ inválido." : null;
}
function Bt(e) {
  if (!e) return null;
  const a = he(e);
  return a.length === 11 ? ft(e) : a.length === 14 ? mt(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const Le = /* @__PURE__ */ new Map();
function Je(e, a) {
  const t = `${e}-${a}`;
  let l = Le.get(t);
  return l || (l = new Intl.NumberFormat(e, {
    minimumFractionDigits: a,
    maximumFractionDigits: a
  }), Le.set(t, l)), l;
}
function Ot(e, a) {
  const t = `${e}-${a}`;
  let l = Le.get(t);
  return l || (l = new Intl.NumberFormat(e, {
    style: "currency",
    currency: a
  }), Le.set(t, l)), l;
}
function pt() {
  const e = Me(ze, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), a = (e == null ? void 0 : e.locale) ?? "pt-BR", t = (e == null ? void 0 : e.currency) ?? "BRL";
  function l(v) {
    return v == null ? "—" : Ot(a, t).format(v);
  }
  function r(v, D = 2) {
    return v == null ? "—" : Je(a, D).format(v);
  }
  function c(v, D) {
    return jt(v, D ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function u(v) {
    return zt(v);
  }
  function V(v) {
    return v == null ? "—" : `${Je(a, 2).format(v)}%`;
  }
  return {
    formatCurrency: l,
    formatNumber: r,
    formatDate: c,
    formatDateTime: u,
    formatPercent: V,
    formatCpf: dt,
    formatCnpj: ct,
    formatCpfCnpj: Ut,
    formatTelefone: Nt,
    validateCpf: ft,
    validateCnpj: mt,
    validateCpfCnpj: Bt,
    parseDate: st,
    toDateString: it,
    toDateTimeString: ut
  };
}
const Wt = {
  key: 0,
  class: "text-muted-color text-xs"
}, qt = ["src", "alt"], Ht = {
  key: 3,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, Kt = {
  key: 4,
  class: "text-muted-color tabular-nums text-[0.8125rem]"
}, Zt = {
  key: 5,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, Jt = {
  key: 6,
  class: "font-semibold tabular-nums text-[0.8125rem]"
}, Xt = {
  key: 7,
  class: "text-[0.8125rem]"
}, Oe = /* @__PURE__ */ Ie({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: a, formatDateTime: t, formatCurrency: l, formatNumber: r } = pt();
    return (c, u) => e.value == null ? (h(), j("span", Wt, "—")) : e.column.type === "image" ? (h(), j("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, qt)) : e.column.type === "boolean" ? (h(), T(w(xt), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (h(), j("span", Ht, X(w(a)(e.value)), 1)) : e.column.type === "datetime" ? (h(), j("span", Kt, X(w(t)(e.value)), 1)) : e.column.type === "currency" ? (h(), j("span", Zt, X(w(l)(e.value)), 1)) : e.column.type === "number" ? (h(), j("span", Jt, X(e.column.format ? e.column.format(e.value, e.rowData) : w(r)(e.value, e.column.decimals ?? 0)), 1)) : (h(), j("span", Xt, X(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var Qt = Object.defineProperty, Gt = (e, a, t) => a in e ? Qt(e, a, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[a] = t, Ee = (e, a, t) => Gt(e, typeof a != "symbol" ? a + "" : a, t);
const Xe = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, Qe = (e, a, t) => e.replaceAll(a, "").replace(t, ".").replace("..", ".").replace(/[^.\d]/g, ""), Ge = (e, a, t) => {
  var l;
  return new Intl.NumberFormat(((l = t.number) == null ? void 0 : l.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: a,
    roundingMode: "trunc"
  });
}, _t = (e, a = !0, t) => {
  var l, r, c, u;
  const V = ((l = t.number) == null ? void 0 : l.unsigned) !== !0 && e.startsWith("-") ? "-" : "", v = ((r = t.number) == null ? void 0 : r.fraction) ?? 0;
  let D = Ge(0, v, t);
  const x = D.formatToParts(1000.12), z = ((c = x.find((n) => n.type === "group")) == null ? void 0 : c.value) ?? " ", U = ((u = x.find((n) => n.type === "decimal")) == null ? void 0 : u.value) ?? ".", P = Qe(e, z, U);
  if (Number.isNaN(parseFloat(P))) return V;
  const R = P.split(".");
  if (R[1] != null && R[1].length >= 1) {
    const n = R[1].length <= v ? R[1].length : v;
    D = Ge(n, v, t);
  }
  let L = D.format(parseFloat(P));
  return a ? v > 0 && P.endsWith(".") && !P.slice(0, -1).includes(".") && (L += U) : L = Qe(L, z, U), V + L;
}, vt = (e) => JSON.parse(e.replaceAll("'", '"')), ea = (e, a = {}) => {
  const t = { ...a };
  e.dataset.maska != null && e.dataset.maska !== "" && (t.mask = ta(e.dataset.maska)), e.dataset.maskaEager != null && (t.eager = Te(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (t.reversed = Te(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (t.tokensReplace = Te(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (t.tokens = aa(e.dataset.maskaTokens));
  const l = {};
  return e.dataset.maskaNumberLocale != null && (l.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (l.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (l.unsigned = Te(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(l).length > 0) && (t.number = l), t;
}, Te = (e) => e !== "" ? !!JSON.parse(e) : !0, ta = (e) => e.startsWith("[") && e.endsWith("]") ? vt(e) : e, aa = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return vt(e);
  const a = {};
  return e.split("|").forEach((t) => {
    const l = t.split(":");
    a[l[0]] = {
      pattern: gt() ? new RegExp(l[1], "u") : new RegExp(l[1]),
      optional: l[2] === "optional",
      multiple: l[2] === "multiple",
      repeated: l[2] === "repeated"
    };
  }), a;
}, gt = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class oa {
  constructor(a = {}) {
    Ee(this, "opts", {}), Ee(this, "memo", /* @__PURE__ */ new Map());
    const t = { ...a };
    if (t.tokens != null) {
      t.tokens = t.tokensReplace ? { ...t.tokens } : { ...Xe, ...t.tokens };
      for (const l of Object.values(t.tokens))
        typeof l.pattern == "string" && (l.pattern = gt() ? new RegExp(l.pattern, "u") : new RegExp(l.pattern));
    } else
      t.tokens = Xe;
    Array.isArray(t.mask) && (t.mask.length > 1 ? t.mask = [...t.mask].sort((l, r) => l.length - r.length) : t.mask = t.mask[0] ?? ""), t.mask === "" && (t.mask = null), this.opts = t;
  }
  masked(a) {
    return this.process(String(a), this.findMask(String(a)));
  }
  unmasked(a) {
    return this.process(String(a), this.findMask(String(a)), !1);
  }
  isEager() {
    return this.opts.eager === !0;
  }
  isReversed() {
    return this.opts.reversed === !0;
  }
  completed(a) {
    const t = this.findMask(String(a));
    if (this.opts.mask == null || t == null) return !1;
    const l = this.process(String(a), t).length;
    return typeof this.opts.mask == "string" ? l >= this.opts.mask.length : l >= t.length;
  }
  findMask(a) {
    const t = this.opts.mask;
    if (t == null)
      return null;
    if (typeof t == "string")
      return t;
    if (typeof t == "function")
      return t(a);
    const l = this.process(a, t.slice(-1).pop() ?? "", !1);
    return t.find((r) => this.process(a, r, !1).length >= l.length) ?? "";
  }
  escapeMask(a) {
    const t = [], l = [];
    return a.split("").forEach((r, c) => {
      r === "!" && a[c - 1] !== "!" ? l.push(c - l.length) : t.push(r);
    }), { mask: t.join(""), escaped: l };
  }
  process(a, t, l = !0) {
    if (this.opts.number != null) return _t(a, l, this.opts);
    if (t == null) return a;
    const r = `v=${a},mr=${t},m=${l ? 1 : 0}`;
    if (this.memo.has(r)) return this.memo.get(r);
    const { mask: c, escaped: u } = this.escapeMask(t), V = [], v = this.opts.tokens != null ? this.opts.tokens : {}, D = this.isReversed() ? -1 : 1, x = this.isReversed() ? "unshift" : "push", z = this.isReversed() ? 0 : c.length - 1, U = this.isReversed() ? () => n > -1 && d > -1 : () => n < c.length && d < a.length, P = (s) => !this.isReversed() && s <= z || this.isReversed() && s >= z;
    let R, L = -1, n = this.isReversed() ? c.length - 1 : 0, d = this.isReversed() ? a.length - 1 : 0, C = !1;
    for (; U(); ) {
      const s = c.charAt(n), b = v[s], A = (b == null ? void 0 : b.transform) != null ? b.transform(a.charAt(d)) : a.charAt(d);
      if (!u.includes(n) && b != null ? (A.match(b.pattern) != null ? (V[x](A), b.repeated ? (L === -1 ? L = n : n === z && n !== L && (n = L - D), z === L && (n -= D)) : b.multiple && (C = !0, n -= D), n += D) : b.multiple ? C && (n += D, d -= D, C = !1) : A === R ? R = void 0 : b.optional && (n += D, d -= D), d += D) : (l && !this.isEager() && V[x](s), A === s && !this.isEager() ? d += D : R = s, this.isEager() || (n += D)), this.isEager())
        for (; P(n) && (v[c.charAt(n)] == null || u.includes(n)); ) {
          if (l) {
            if (V[x](c.charAt(n)), a.charAt(d) === c.charAt(n)) {
              n += D, d += D;
              continue;
            }
          } else c.charAt(n) === a.charAt(d) && (d += D);
          n += D;
        }
    }
    return this.memo.set(r, V.join("")), this.memo.get(r);
  }
}
class la {
  constructor(a, t = {}) {
    Ee(this, "items", /* @__PURE__ */ new Map()), Ee(this, "eventAbortController"), Ee(this, "onInput", (l) => {
      if (l instanceof CustomEvent && l.type === "input" && !l.isTrusted && !l.bubbles)
        return;
      const r = l.target, c = this.items.get(r);
      if (c === void 0) return;
      const u = "inputType" in l && l.inputType.startsWith("delete"), V = c.isEager(), v = u && V && c.unmasked(r.value) === "" ? "" : r.value;
      this.fixCursor(r, u, () => this.setValue(r, v));
    }), this.options = t, this.eventAbortController = new AbortController(), this.init(this.getInputs(a));
  }
  update(a = {}) {
    this.options = { ...a }, this.init(Array.from(this.items.keys()));
  }
  updateValue(a) {
    var t;
    a.value !== "" && a.value !== ((t = this.processInput(a)) == null ? void 0 : t.masked) && this.setValue(a, a.value);
  }
  destroy() {
    this.eventAbortController.abort(), this.items.clear();
  }
  init(a) {
    const t = this.getOptions(this.options);
    for (const l of a) {
      if (!this.items.has(l)) {
        const { signal: c } = this.eventAbortController;
        l.addEventListener("input", this.onInput, { capture: !0, signal: c });
      }
      const r = new oa(ea(l, t));
      this.items.set(l, r), queueMicrotask(() => this.updateValue(l)), l.selectionStart === null && r.isEager() && console.warn("Maska: input of `%s` type is not supported", l.type);
    }
  }
  getInputs(a) {
    return typeof a == "string" ? Array.from(document.querySelectorAll(a)) : "length" in a ? Array.from(a) : [a];
  }
  getOptions(a) {
    const { onMaska: t, preProcess: l, postProcess: r, ...c } = a;
    return c;
  }
  fixCursor(a, t, l) {
    var r, c;
    const u = a.selectionStart, V = a.value;
    if (l(), u === null || u === V.length && !t) return;
    const v = a.value, D = V.slice(0, u), x = v.slice(0, u), z = (r = this.processInput(a, D)) == null ? void 0 : r.unmasked, U = (c = this.processInput(a, x)) == null ? void 0 : c.unmasked;
    if (z === void 0 || U === void 0) return;
    let P = u;
    D !== x && (P += t ? v.length - V.length : z.length - U.length), a.setSelectionRange(P, P);
  }
  setValue(a, t) {
    const l = this.processInput(a, t);
    l !== void 0 && (a.value = l.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((r) => r(l)) : this.options.onMaska(l)), a.dispatchEvent(new CustomEvent("maska", { detail: l })), a.dispatchEvent(new CustomEvent("input", { detail: l.masked })));
  }
  processInput(a, t) {
    const l = this.items.get(a);
    if (l === void 0) return;
    let r = t ?? a.value;
    this.options.preProcess != null && (r = this.options.preProcess(r));
    let c = l.masked(r);
    return this.options.postProcess != null && (c = this.options.postProcess(c)), {
      masked: c,
      unmasked: l.unmasked(r),
      completed: l.completed(r)
    };
  }
}
const Ue = /* @__PURE__ */ new WeakMap(), na = (e, a) => {
  if (e.arg == null || e.instance == null) return;
  const t = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = a : t && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, _e = (e, a) => {
  var t;
  const l = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (l == null || (l == null ? void 0 : l.type) === "file") return;
  let r = {};
  if (a.value != null && (r = typeof a.value == "string" ? { mask: a.value } : { ...a.value }), a.arg != null) {
    const c = (u) => {
      const V = a.modifiers.unmasked ? u.unmasked : a.modifiers.completed ? u.completed : u.masked;
      na(a, V);
    };
    r.onMaska = r.onMaska == null ? c : Array.isArray(r.onMaska) ? [...r.onMaska, c] : [r.onMaska, c];
  }
  Ue.has(l) ? (t = Ue.get(l)) == null || t.update(r) : Ue.set(l, new la(l, r));
}, ra = {
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
function sa(e) {
  var l;
  const a = ra[e.type] ?? "text", t = {
    field: e.name,
    label: e.label,
    type: a,
    required: e.required ?? !1
  };
  return (e.type === "decimal" || e.type === "float") && (t.minFractionDigits = 2, t.maxFractionDigits = 2), e.type === "boolean" && (t.defaultValue = !1), e.type === "choice" && ((l = e.choices) != null && l.length) && (t.options = e.choices.map((r) => ({
    label: r.label,
    value: r.value
  }))), e.type === "fk" && (t.endpoint = e.endpoint, e.option_label && (t.optionLabel = e.option_label), e.option_value && (t.optionValue = e.option_value)), t;
}
function ia(e) {
  return e.filter((a) => !a.read_only && a.name !== "id").map(sa);
}
const ua = {
  boolean: "boolean",
  date: "date",
  datetime: "datetime",
  decimal: "number",
  float: "number",
  integer: "number"
};
function da(e) {
  return {
    field: e.type === "fk" ? `${e.name}_nome` : e.name,
    header: e.label,
    type: ua[e.type],
    sortable: !0
  };
}
function ca(e, a = 6) {
  return e.filter((t) => !t.read_only && t.name !== "id").slice(0, a).map(da);
}
function ht() {
  const e = Ft();
  function a(c, u = "Sucesso") {
    e.add({ severity: "success", summary: u, detail: c, life: 3e3 });
  }
  function t(c, u = "Erro") {
    e.add({ severity: "error", summary: u, detail: c, life: 5e3 });
  }
  function l(c, u = "Atenção") {
    e.add({ severity: "warn", summary: u, detail: c, life: 4e3 });
  }
  function r(c, u = "Info") {
    e.add({ severity: "info", summary: u, detail: c, life: 3e3 });
  }
  return { success: a, error: t, warn: l, info: r };
}
function yt() {
  const e = Et();
  function a(l, r = "Deseja realmente excluir este registro?") {
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
      accept: l
    });
  }
  function t(l, r, c = "Confirmação") {
    e.require({
      message: l,
      header: c,
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
  return { confirmDelete: a, confirmAction: t };
}
function fa(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (a) => a.toUpperCase());
}
function ma(e) {
  if (typeof e == "string")
    return e;
  if (Array.isArray(e)) {
    const a = e.filter((t) => typeof t == "string");
    return a.length > 0 ? a.join(" ") : null;
  }
  if (typeof e == "object" && e !== null) {
    const a = e;
    if (Array.isArray(a.non_field_errors) && a.non_field_errors.length > 0)
      return a.non_field_errors.filter((l) => typeof l == "string").join(" ");
    const t = [];
    for (const [l, r] of Object.entries(a)) {
      if (l === "non_field_errors") continue;
      const c = fa(l);
      if (Array.isArray(r)) {
        const u = r.filter((V) => typeof V == "string");
        u.length > 0 && t.push(`${c}: ${u.join(" ")}`);
      } else typeof r == "string" && t.push(`${c}: ${r}`);
    }
    return t.length > 0 ? t.join(`
`) : null;
  }
  return null;
}
function Ye(e, a = "Erro inesperado") {
  var c;
  if (!e || typeof e != "object") return a;
  const t = e, l = (c = t.response) == null ? void 0 : c.data;
  if (!l || typeof l != "object")
    return t.message || a;
  const r = l.detail ?? l;
  return ma(r) || a;
}
function bo() {
  return { extractApiError: Ye };
}
const pa = { class: "w-autocompletefk" }, va = ["disabled"], ga = { class: "w-autocompletefk-toolbar" }, ha = { class: "w-autocompletefk-toolbar-actions" }, ya = { class: "flex items-center justify-end gap-1" }, ba = { class: "w-autocompletefk-footer" }, bt = /* @__PURE__ */ Ie({
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
  setup(e, { emit: a }) {
    const t = e, l = a, r = Me(je);
    if (!r)
      throw new Error("[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin.");
    const c = r, u = ht(), { confirmDelete: V } = yt(), v = I(null), D = I([]), x = I(!1);
    let z = null;
    async function U(m) {
      try {
        const p = await c.get(`${t.endpoint}${m}/`);
        v.value = p.data;
      } catch {
        v.value = null;
      }
    }
    async function P(m) {
      x.value = !0;
      try {
        const p = { page_size: 20 };
        m && (p.search = m);
        const k = (await c.get(t.endpoint, { params: p })).data;
        D.value = k.data ?? k.results ?? k;
      } catch {
        D.value = [];
      } finally {
        x.value = !1;
      }
    }
    function R(m) {
      const p = m.query || "";
      if (p.length < t.minLength) {
        D.value = [];
        return;
      }
      z && clearTimeout(z), z = setTimeout(() => P(p), 300);
    }
    function L(m) {
      v.value = m.value, l("update:modelValue", m.value);
    }
    function n() {
      v.value = null, l("update:modelValue", null);
    }
    Ne(
      () => t.modelValue,
      async (m) => {
        if (m != null) {
          if (typeof m == "object" && m !== null && t.optionLabel in m) {
            v.value = m;
            return;
          }
          (!v.value || v.value[t.optionValue] !== m) && await U(m);
        } else
          v.value = null;
      },
      { immediate: !0 }
    );
    const d = I(!1), C = I([]), s = I(!1), b = I(""), A = I(1), K = I(15), i = I(0), g = I(null), o = I(null), f = I(0);
    let M = null;
    const $ = I([]), E = W(() => {
      var m;
      return (m = t.crudFields) != null && m.length ? !0 : $.value.length > 0;
    }), _ = W(() => t.canCreate ?? E.value), Q = W(() => t.canEdit ?? E.value), Z = W(() => t.canDelete ?? E.value), ue = W(() => Q.value || Z.value), ee = W(() => {
      var m;
      return (m = t.crudFields) != null && m.length ? t.crudFields : ia($.value);
    }), oe = W(() => {
      var m, p;
      return (m = t.crudColumns) != null && m.length ? t.crudColumns : (p = t.columns) != null && p.length ? t.columns.map((N) => ({
        field: N.field,
        header: N.header,
        sortable: !0
      })) : $.value.length ? ca($.value) : [{ field: t.optionLabel, header: t.optionLabel, sortable: !0 }];
    });
    async function te() {
      var m, p, N;
      s.value = !0;
      try {
        const k = {
          page: A.value,
          page_size: K.value
        };
        b.value && (k.search = b.value), o.value && f.value !== 0 && (k.ordering = f.value === -1 ? `-${o.value}` : o.value);
        const B = (await c.get(t.endpoint, { params: k })).data;
        C.value = B.data ?? B.results ?? B, i.value = B.count ?? B.rows ?? 0, (m = B.extras) != null && m.fields && !((p = t.columns) != null && p.length) && !((N = t.crudFields) != null && N.length) && ($.value = B.extras.fields);
      } catch {
        C.value = [], i.value = 0;
      } finally {
        s.value = !1;
      }
    }
    function O() {
      t.disabled || (b.value = "", A.value = 1, o.value = null, f.value = 0, g.value = null, d.value = !0, te());
    }
    function ye(m) {
      A.value = m.page + 1, K.value = m.rows, te();
    }
    function de(m) {
      o.value = m.sortField ?? null, f.value = m.sortOrder ?? 0, A.value = 1, te();
    }
    function $e() {
      g.value && (v.value = g.value, l("update:modelValue", g.value), d.value = !1);
    }
    function Ve(m) {
      v.value = m.data, l("update:modelValue", m.data), d.value = !1;
    }
    Ne(b, () => {
      M && clearTimeout(M), M = setTimeout(() => {
        A.value = 1, te();
      }, 300);
    });
    const le = I(!1), be = I(!1), ne = I(null), ae = ie({}), ce = W(() => ne.value !== null), fe = W(
      () => ce.value ? "Editar Registro" : "Novo Registro"
    );
    function ke() {
      const m = {};
      for (const p of ee.value)
        m[p.field] = p.defaultValue !== void 0 ? typeof p.defaultValue == "function" ? p.defaultValue() : p.defaultValue : null;
      return m;
    }
    function we() {
      const m = ke();
      for (const p of Object.keys(ae))
        delete ae[p];
      for (const [p, N] of Object.entries(m))
        ae[p] = N;
    }
    function me() {
      ne.value = null, we(), le.value = !0;
    }
    function pe(m) {
      ne.value = m;
      for (const p of ee.value)
        ae[p.field] = m[p.field] !== void 0 ? m[p.field] : null;
      le.value = !0;
    }
    function De(m, p) {
      ae[m] = p;
    }
    async function y() {
      be.value = !0;
      try {
        const m = { ...ae };
        for (const N of ee.value) {
          const k = m[N.field];
          if (N.type === "fk" && k !== null && typeof k == "object") {
            const Y = N.optionValue || "id";
            m[N.field] = k[Y] ?? k;
          }
        }
        let p;
        if (ce.value && ne.value) {
          const N = ne.value[t.optionValue];
          p = await c.patch(
            `${t.endpoint}${N}/`,
            m
          );
          const k = C.value.findIndex(
            (Y) => Y[t.optionValue] === N
          );
          k !== -1 && (C.value[k] = p.data), u.success("Registro atualizado com sucesso");
        } else
          p = await c.post(t.endpoint, m), C.value.unshift(p.data), i.value++, u.success("Registro criado com sucesso");
        le.value = !1, ne.value = null, g.value = p.data;
      } catch (m) {
        u.error(Ye(m, "Erro ao salvar registro"));
      } finally {
        be.value = !1;
      }
    }
    function S(m) {
      V(async () => {
        try {
          const p = m[t.optionValue];
          await c.delete(`${t.endpoint}${p}/`);
          const N = C.value.findIndex(
            (k) => k[t.optionValue] === p
          );
          N !== -1 && (C.value.splice(N, 1), i.value--), v.value && v.value[t.optionValue] === p && (v.value = null, l("update:modelValue", null)), g.value && g.value[t.optionValue] === p && (g.value = null), u.success("Registro excluído com sucesso");
        } catch (p) {
          u.error(Ye(p, "Erro ao excluir registro"));
        }
      });
    }
    return (m, p) => {
      const N = et("tooltip");
      return h(), j(ge, null, [
        F("div", pa, [
          q(w(rt), {
            "model-value": v.value,
            suggestions: D.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: x.value,
            fluid: "",
            onComplete: R,
            onItemSelect: L,
            onClear: n
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          Se((h(), j("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: O
          }, [...p[6] || (p[6] = [
            F("i", { class: "pi pi-search" }, null, -1)
          ])], 8, va)), [
            [
              N,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        q(w(nt), {
          visible: d.value,
          "onUpdate:visible": p[4] || (p[4] = (k) => d.value = k),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: J(() => [
            F("div", ba, [
              q(w(se), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: p[3] || (p[3] = (k) => d.value = !1)
              }),
              q(w(se), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !g.value,
                onClick: $e
              }, null, 8, ["disabled"])
            ])
          ]),
          default: J(() => [
            F("div", ga, [
              q(w(ot), { class: "w-autocompletefk-toolbar-search" }, {
                default: J(() => [
                  q(w(lt), { class: "pi pi-search" }),
                  q(w(ve), {
                    modelValue: b.value,
                    "onUpdate:modelValue": p[0] || (p[0] = (k) => b.value = k),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              F("div", ha, [
                _.value ? (h(), T(w(se), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: me
                })) : H("", !0)
              ])
            ]),
            q(w(at), {
              selection: g.value,
              "onUpdate:selection": p[1] || (p[1] = (k) => g.value = k),
              value: C.value,
              loading: s.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: K.value,
              "total-records": i.value,
              "sort-field": o.value ?? void 0,
              "sort-order": f.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: ye,
              onSort: p[2] || (p[2] = (k) => de({ sortField: k.sortField, sortOrder: k.sortOrder })),
              onRowDblclick: Ve
            }, {
              empty: J(() => [...p[7] || (p[7] = [
                F("div", { class: "w-autocompletefk-empty" }, " Nenhum registro encontrado ", -1)
              ])]),
              default: J(() => [
                q(w(Pe), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (h(!0), j(ge, null, xe(oe.value, (k) => (h(), T(w(Pe), {
                  key: k.field,
                  field: k.field,
                  header: k.header,
                  sortable: k.sortable ?? !0,
                  style: Fe(k.style)
                }, {
                  body: J(({ data: Y }) => [
                    k.type ? (h(), T(Oe, {
                      key: 0,
                      column: k,
                      value: Y[k.field],
                      "row-data": Y
                    }, null, 8, ["column", "value", "row-data"])) : (h(), j(ge, { key: 1 }, [
                      Be(X(Y[k.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                ue.value ? (h(), T(w(Pe), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: J(({ data: k }) => [
                    F("div", ya, [
                      Q.value ? Se((h(), T(w(se), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (Y) => pe(k)
                      }, null, 8, ["onClick"])), [
                        [
                          N,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : H("", !0),
                      Z.value ? Se((h(), T(w(se), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (Y) => S(k)
                      }, null, 8, ["onClick"])), [
                        [
                          N,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : H("", !0)
                    ])
                  ]),
                  _: 1
                })) : H("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        E.value ? (h(), T(We, {
          key: 0,
          visible: le.value,
          title: fe.value,
          fields: ee.value,
          "form-data": ae,
          "is-editing": ce.value,
          saving: be.value,
          width: e.dialogWidth,
          "onUpdate:visible": p[5] || (p[5] = (k) => {
            le.value = k, k || (ne.value = null);
          }),
          "onUpdate:field": De,
          onSave: y
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : H("", !0)
      ], 64);
    };
  }
}), ka = { class: "w-crud-form-fields" }, wa = {
  key: 0,
  class: "w-crud-form-switch"
}, Da = { class: "w-crud-form-switch-label" }, Ca = {
  key: 1,
  class: "w-crud-form-col-full"
}, $a = { class: "w-crud-form-label" }, xa = {
  key: 0,
  class: "w-crud-form-required"
}, Sa = { class: "w-crud-form-color-row" }, Pa = {
  key: 2,
  class: "w-crud-form-col-full"
}, Ma = { class: "w-crud-form-label" }, Va = ["accept", "disabled", "onChange"], Aa = { class: "w-crud-form-label" }, Fa = {
  key: 0,
  class: "w-crud-form-required"
}, Ea = {
  key: 14,
  class: "w-crud-form-error"
}, Ya = { class: "w-crud-form-footer" }, We = /* @__PURE__ */ Ie({
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
  setup(e, { emit: a }) {
    const t = e, l = a, r = ie({}), c = W(
      () => t.fields.filter((i) => i.visible === void 0 || i.visible === !0 ? !0 : typeof i.visible == "function" ? i.visible(t.formData, t.isEditing) : i.visible)
    );
    function u(i) {
      return i.disabledOnEdit && t.isEditing ? !0 : typeof i.disabled == "function" ? i.disabled(t.formData, t.isEditing) : !!i.disabled;
    }
    function V(i) {
      return wt(i) ? i.value : i;
    }
    const v = W(() => {
      const i = t.isEditing ? "edit" : "create", g = t.fields.find(
        (f) => f.autofocus === !0 || f.autofocus === i
      );
      if (g) return g.field;
      const o = c.value.find((f) => !(f.type === "switch" || f.type === "fk" || f.type === "select" || f.type === "image" || f.disabled === !0 || f.disabledOnEdit && t.isEditing));
      return (o == null ? void 0 : o.field) ?? null;
    });
    function D(i) {
      return i.field === v.value;
    }
    function x(i) {
      if (i)
        return i.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function z(i) {
      if (!i) return "";
      const g = String(i).replace(/\D/g, "").slice(0, 14);
      return g.length <= 11 ? g.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : g.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function U(i, g) {
      const o = g.target.value.replace(/\D/g, "").slice(0, 14);
      l("update:field", i, o);
    }
    const P = ie({});
    function R(i) {
      const g = t.formData[i.field];
      if (g == null) return null;
      const o = i.optionValue || "value";
      return (V(i.options) || []).find(
        (M) => M[o] === g
      ) ?? null;
    }
    function L(i) {
      return P[i.field] || [];
    }
    function n(i, g) {
      const o = (g.query || "").toLowerCase(), f = V(i.options) || [], M = i.optionLabel || "label";
      P[i.field] = f.filter(
        ($) => String($[M] || "").toLowerCase().includes(o)
      );
    }
    function d(i, g) {
      const o = i.optionValue || "value";
      l("update:field", i.field, g.value[o]);
    }
    function C(i) {
      const g = t.formData[i.field];
      return g ? String(g).replace("#", "") : "FFFFFF";
    }
    function s(i, g) {
      l("update:field", i.field, `#${g}`);
    }
    function b(i) {
      if (typeof i.validate == "function") {
        const g = i.validate(t.formData[i.field]);
        r[i.field] = g || null;
      }
    }
    function A() {
      let i = !0;
      for (const g of t.fields)
        if (typeof g.validate == "function") {
          const o = g.validate(t.formData[g.field]);
          r[g.field] = o || null, o && (i = !1);
        }
      return i;
    }
    function K() {
      A() && l("save");
    }
    return Ne(
      () => t.visible,
      (i) => {
        i && Object.keys(r).forEach((g) => delete r[g]);
      }
    ), (i, g) => (h(), T(w(nt), {
      visible: e.visible,
      header: e.title,
      style: Fe({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": g[1] || (g[1] = (o) => l("update:visible", o))
    }, {
      default: J(() => [
        F("form", {
          class: "w-crud-form",
          onSubmit: kt(K, ["prevent"])
        }, [
          F("div", ka, [
            (h(!0), j(ge, null, xe(c.value, (o) => G(i.$slots, `field-${o.field}`, {
              key: o.field,
              field: o,
              formData: e.formData,
              isEditing: e.isEditing,
              setFormField: (f, M) => l("update:field", f, M)
            }, () => [
              o.type === "switch" ? (h(), j("div", wa, [
                q(w(Mt), {
                  "model-value": e.formData[o.field],
                  disabled: u(o),
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                F("label", Da, X(o.switchLabel || o.label), 1)
              ])) : o.type === "color" ? (h(), j("div", Ca, [
                F("label", $a, [
                  Be(X(o.label) + " ", 1),
                  o.required ? (h(), j("span", xa, "*")) : H("", !0)
                ]),
                F("div", Sa, [
                  q(w(Vt), {
                    "model-value": C(o),
                    disabled: u(o),
                    "onUpdate:modelValue": (f) => s(o, f)
                  }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                  q(w(ve), {
                    "model-value": e.formData[o.field],
                    class: "w-28",
                    maxlength: "7",
                    placeholder: "#000000",
                    disabled: u(o),
                    "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                  }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
                ])
              ])) : o.type === "image" ? (h(), j("div", Pa, [
                F("label", Ma, X(o.label), 1),
                G(i.$slots, `image-${o.field}`, {
                  field: o,
                  formData: e.formData
                }, () => [
                  F("input", {
                    type: "file",
                    accept: o.accept || "image/*",
                    disabled: u(o),
                    onChange: (f) => {
                      var $;
                      const M = (($ = f.target.files) == null ? void 0 : $[0]) ?? null;
                      l("update:field", o.field, M);
                    }
                  }, null, 40, Va)
                ])
              ])) : (h(), j("div", {
                key: 3,
                class: tt(o.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
              }, [
                F("label", Aa, [
                  Be(X(o.label) + " ", 1),
                  o.required ? (h(), j("span", Fa, "*")) : H("", !0)
                ]),
                (!o.type || o.type === "text") && o.mask ? Se((h(), T(w(ve), {
                  key: 0,
                  "model-value": e.formData[o.field],
                  fluid: "",
                  autofocus: D(o) || void 0,
                  placeholder: o.placeholder,
                  disabled: u(o),
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
                  [w(_e), { mask: x(o.mask) }]
                ]) : !o.type || o.type === "text" ? (h(), T(w(ve), {
                  key: 1,
                  "model-value": e.formData[o.field],
                  fluid: "",
                  autofocus: D(o) || void 0,
                  placeholder: o.placeholder,
                  disabled: u(o),
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "email" ? (h(), T(w(ve), {
                  key: 2,
                  "model-value": e.formData[o.field],
                  type: "email",
                  fluid: "",
                  autofocus: D(o) || void 0,
                  placeholder: o.placeholder,
                  disabled: u(o),
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "password" ? (h(), T(w(At), {
                  key: 3,
                  "model-value": e.formData[o.field],
                  fluid: "",
                  "toggle-mask": "",
                  feedback: o.feedback !== !1,
                  placeholder: o.placeholder,
                  disabled: u(o),
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "number" ? (h(), T(w(He), {
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
                  disabled: u(o),
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "currency" ? (h(), T(w(He), {
                  key: 5,
                  "model-value": e.formData[o.field],
                  fluid: "",
                  mode: "currency",
                  currency: "BRL",
                  locale: "pt-BR",
                  min: o.min,
                  max: o.max,
                  placeholder: o.placeholder,
                  disabled: u(o),
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "select" ? (h(), T(w(Pt), {
                  key: 6,
                  "model-value": e.formData[o.field],
                  fluid: "",
                  options: V(o.options),
                  "option-label": o.optionLabel || "label",
                  "option-value": o.optionValue || "value",
                  "show-clear": o.showClear !== !1,
                  placeholder: o.placeholder,
                  disabled: u(o),
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "autocomplete" ? (h(), T(w(rt), {
                  key: 7,
                  "model-value": R(o),
                  fluid: "",
                  suggestions: L(o),
                  "option-label": o.optionLabel || "label",
                  dropdown: "",
                  placeholder: o.placeholder,
                  disabled: u(o),
                  onComplete: (f) => n(o, f),
                  onItemSelect: (f) => d(o, f),
                  onClear: (f) => l("update:field", o.field, null)
                }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : o.type === "fk" ? (h(), T(bt, {
                  key: 8,
                  "model-value": e.formData[o.field],
                  endpoint: o.endpoint,
                  "option-label": o.optionLabel || "nome",
                  placeholder: o.placeholder,
                  disabled: u(o),
                  "show-clear": o.showClear !== !1,
                  "dialog-header": o.label,
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "endpoint", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "onUpdate:modelValue"])) : o.type === "date" ? (h(), T(w(Ke), {
                  key: 9,
                  "model-value": e.formData[o.field],
                  fluid: "",
                  "date-format": o.dateFormat || "dd/mm/yy",
                  placeholder: o.placeholder,
                  disabled: u(o),
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "datetime" ? (h(), T(w(Ke), {
                  key: 10,
                  "model-value": e.formData[o.field],
                  fluid: "",
                  "show-time": "",
                  "hour-format": o.hourFormat || "24",
                  "date-format": o.dateFormat || "dd/mm/yy",
                  placeholder: o.placeholder,
                  disabled: u(o),
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "cpf_cnpj" ? (h(), T(w(ve), {
                  key: 11,
                  "model-value": z(e.formData[o.field]),
                  fluid: "",
                  maxlength: "18",
                  placeholder: o.placeholder || "000.000.000-00",
                  disabled: u(o),
                  invalid: !!r[o.field],
                  onInput: (f) => U(o.field, f),
                  onBlur: (f) => b(o)
                }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : o.type === "mask" ? Se((h(), T(w(ve), {
                  key: 12,
                  "model-value": e.formData[o.field],
                  fluid: "",
                  placeholder: o.placeholder,
                  disabled: u(o),
                  invalid: !!r[o.field],
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f),
                  onBlur: (f) => b(o)
                }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
                  [w(_e), { mask: x(o.mask) }]
                ]) : o.type === "textarea" ? (h(), T(w(St), {
                  key: 13,
                  "model-value": e.formData[o.field],
                  fluid: "",
                  autofocus: D(o) || void 0,
                  rows: o.rows || 3,
                  placeholder: o.placeholder,
                  disabled: u(o),
                  "onUpdate:modelValue": (f) => l("update:field", o.field, f)
                }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : H("", !0),
                r[o.field] ? (h(), j("small", Ea, X(r[o.field]), 1)) : H("", !0)
              ], 2))
            ])), 128))
          ]),
          F("div", Ya, [
            G(i.$slots, "footer", { saving: e.saving }, () => [
              q(w(se), {
                type: "button",
                label: "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: g[0] || (g[0] = (o) => l("update:visible", !1))
              }, null, 8, ["disabled"]),
              q(w(se), {
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
}), Ta = { class: "w-crud" }, Ra = {
  key: 0,
  class: "w-crud-header"
}, La = { class: "w-crud-header-content" }, Ia = { class: "w-crud-title" }, ja = {
  key: 0,
  class: "w-crud-subtitle"
}, za = { class: "w-crud-header-actions" }, Ua = {
  key: 0,
  class: "w-crud-kpis"
}, Na = { class: "w-crud-kpi-icon" }, Ba = { class: "w-crud-kpi-content" }, Oa = { class: "w-crud-kpi-label" }, Wa = { class: "w-crud-kpi-value" }, qa = { class: "w-crud-table" }, Ha = { class: "w-crud-toolbar" }, Ka = { class: "w-crud-toolbar-start" }, Za = { class: "w-crud-toolbar-end" }, Ja = { class: "w-crud-actions" }, Xa = /* @__PURE__ */ Ie({
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
  setup(e, { emit: a }) {
    const t = e, l = a, { formatNumber: r } = pt(), c = I({}), u = W(
      () => t.crud.config.columns.filter((n) => n.visible !== !1).map((n) => n.type === "number" && !n.align ? { ...n, align: "right" } : n.type === "currency" && !n.align ? { ...n, align: "right" } : n)
    );
    function V(n) {
      if (n.align === "right") return "text-right";
      if (n.align === "center") return "text-center";
    }
    const v = W(() => {
      const n = [];
      return t.crud.config.canCreate !== !1 && t.crud.config.canEdit !== !1 && n.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), t.crud.config.canDelete !== !1 && n.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), n;
    }), D = W(
      () => t.crud.config.rowActions ?? v.value
    ), x = W(() => D.value.length > 0);
    function z(n, d) {
      n.action === "edit" ? t.crud.openEditDialog(d) : n.action === "delete" ? t.crud.confirmDelete(d) : n.handler && n.handler(d);
    }
    function U(n, d) {
      return n.visible ? n.visible(d) : !0;
    }
    function P(n, d) {
      return n.disabled ? n.disabled(d) : !1;
    }
    const R = W(() => {
      const n = [];
      return t.showKpi && n.push({
        icon: t.kpiIcon,
        label: t.kpiLabel,
        value: r(t.crud.pagination.rows, 0)
      }), n.push(...t.extraKpis), n;
    });
    W(() => t.crud.config.labels ?? {});
    const L = W(() => t.crud.config.canCreate !== !1);
    return Dt(() => {
      t.autoInit && t.crud.init();
    }), (n, d) => {
      const C = et("tooltip");
      return h(), j("div", Ta, [
        e.showHeader ? (h(), j("div", Ra, [
          F("div", La, [
            F("h1", Ia, X(e.title), 1),
            e.subtitle ? (h(), j("p", ja, X(e.subtitle), 1)) : H("", !0)
          ]),
          F("div", za, [
            G(n.$slots, "header-actions"),
            L.value ? (h(), T(w(se), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: d[0] || (d[0] = (s) => e.crud.openCreateDialog())
            })) : H("", !0)
          ])
        ])) : H("", !0),
        G(n.$slots, "before-table", {}, () => [
          R.value.length ? (h(), j("div", Ua, [
            (h(!0), j(ge, null, xe(R.value, (s, b) => (h(), j("div", {
              key: b,
              class: "w-crud-kpi"
            }, [
              F("div", Na, [
                F("i", {
                  class: tt([s.icon]),
                  style: Fe(s.color ? `color: ${s.color}` : "")
                }, null, 6)
              ]),
              F("div", Ba, [
                F("div", Oa, X(s.label), 1),
                F("div", Wa, X(s.value), 1)
              ])
            ]))), 128))
          ])) : H("", !0)
        ]),
        F("div", qa, [
          q(w(at), {
            value: e.crud.items.value,
            loading: e.crud.loading.value,
            "expanded-rows": c.value,
            "onUpdate:expandedRows": d[2] || (d[2] = (s) => c.value = s),
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
            onSort: d[3] || (d[3] = (s) => e.crud.onSort({ sortField: s.sortField, sortOrder: s.sortOrder })),
            onRowExpand: d[4] || (d[4] = (s) => l("row-expand", s.data)),
            onRowCollapse: d[5] || (d[5] = (s) => l("row-collapse", s.data))
          }, qe({
            header: J(() => [
              F("div", Ha, [
                F("div", Ka, [
                  e.showSearch ? (h(), T(w(ot), { key: 0 }, {
                    default: J(() => [
                      q(w(lt), { class: "pi pi-search" }),
                      q(w(ve), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : H("", !0),
                  G(n.$slots, "toolbar-start"),
                  G(n.$slots, "toolbar-filters")
                ]),
                F("div", Za, [
                  G(n.$slots, "toolbar-actions"),
                  !e.showHeader && L.value ? (h(), T(w(se), {
                    key: 0,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: d[1] || (d[1] = (s) => e.crud.openCreateDialog())
                  })) : H("", !0)
                ])
              ])
            ]),
            empty: J(() => [
              G(n.$slots, "empty", {}, () => [
                d[9] || (d[9] = F("div", { class: "w-crud-empty" }, [
                  F("div", { class: "w-crud-empty-icon" }, [
                    F("i", { class: "pi pi-inbox" })
                  ]),
                  F("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                  F("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                ], -1))
              ])
            ]),
            default: J(() => [
              e.expandable ? (h(), T(w(Pe), {
                key: 0,
                expander: "",
                style: { width: "3rem" }
              })) : H("", !0),
              (h(!0), j(ge, null, xe(u.value, (s) => (h(), T(w(Pe), {
                key: s.field,
                field: s.field,
                header: s.header,
                sortable: s.sortable,
                style: Fe(s.style),
                "header-class": V(s),
                "body-class": V(s)
              }, {
                body: J(({ data: b }) => [
                  G(n.$slots, `column-${s.field}`, {
                    data: b,
                    value: b[s.field]
                  }, () => [
                    q(Oe, {
                      column: s,
                      value: b[s.field],
                      "row-data": b
                    }, null, 8, ["column", "value", "row-data"])
                  ])
                ]),
                _: 2
              }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
              x.value ? (h(), T(w(Pe), {
                key: 1,
                "header-class": "w-crud-actions-header",
                style: Fe({ width: `${D.value.length * 2.5 + 1}rem` })
              }, {
                body: J(({ data: s }) => [
                  G(n.$slots, "row-actions", {
                    data: s,
                    crud: e.crud
                  }, () => [
                    F("div", Ja, [
                      (h(!0), j(ge, null, xe(D.value, (b) => (h(), j(ge, {
                        key: b.action
                      }, [
                        U(b, s) ? Se((h(), T(w(se), {
                          key: 0,
                          icon: b.icon,
                          text: "",
                          rounded: "",
                          size: "small",
                          severity: b.severity,
                          disabled: P(b, s),
                          onClick: (A) => z(b, s)
                        }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                          [
                            C,
                            b.tooltip,
                            void 0,
                            { top: !0 }
                          ]
                        ]) : H("", !0)
                      ], 64))), 128))
                    ])
                  ])
                ]),
                _: 3
              }, 8, ["style"])) : H("", !0)
            ]),
            _: 2
          }, [
            e.expandable ? {
              name: "expansion",
              fn: J((s) => [
                G(n.$slots, "expansion", {
                  data: s.data
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "onPage"])
        ]),
        G(n.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => [
          q(We, {
            visible: e.crud.dialogVisible.value,
            title: e.crud.dialogTitle.value,
            fields: e.crud.config.form,
            "form-data": e.crud.formData,
            "is-editing": e.crud.isEditing.value,
            saving: e.crud.saving.value,
            width: e.dialogWidth,
            "onUpdate:visible": d[6] || (d[6] = (s) => {
              e.crud.dialogVisible.value = s, s || (e.crud.editingItem.value = null);
            }),
            "onUpdate:field": d[7] || (d[7] = (s, b) => e.crud.setFormField(s, b)),
            onSave: d[8] || (d[8] = (s) => e.crud.save())
          }, qe({ _: 2 }, [
            xe(e.crud.config.form, (s) => ({
              name: `field-${s.field}`,
              fn: J((b) => [
                G(n.$slots, `field-${s.field}`, Ct($t(b)))
              ])
            }))
          ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])
        ])
      ]);
    };
  }
}), ko = {
  install(e, a) {
    if (!(a != null && a.axios))
      throw new Error(
        '[wPrimeVueComponents] A opção "axios" é obrigatória. Passe sua instância axios configurada.'
      );
    const t = {
      axios: a.axios,
      defaultPageSize: a.defaultPageSize ?? 20,
      dateFormat: a.dateFormat ?? "DD/MM/YYYY",
      dateTimeFormat: a.dateTimeFormat ?? "DD/MM/YYYY HH:mm",
      locale: a.locale ?? "pt-BR",
      currency: a.currency ?? "BRL"
    };
    e.provide(je, a.axios), e.provide(ze, t), a.registerComponents !== !1 && (e.component("WCrudView", Xa), e.component("WCrudFormDialog", We), e.component("WCrudColumnRenderer", Oe), e.component("WAutoCompleteFK", bt));
  }
}, Qa = {
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
function wo(e) {
  const {
    endpoint: a,
    columns: t,
    form: l,
    pk: r = "id",
    searchDebounce: c = 300,
    canCreate: u = !0,
    canEdit: V = !0,
    canDelete: v = !0,
    rowActions: D = void 0,
    filterParams: x = void 0,
    transformPayload: z = void 0,
    onAfterSave: U = void 0,
    onAfterDelete: P = void 0
  } = e, R = Me(je);
  if (!R)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const L = R, n = Me(ze), d = e.pageSize ?? (n == null ? void 0 : n.defaultPageSize) ?? 20, C = { ...Qa, ...e.labels }, s = ht(), { confirmDelete: b } = yt(), A = I([]), K = I(!1), i = I(!1), g = I(""), o = I(!1), f = I(null), M = ie({}), $ = ie({
    page: 1,
    pageSize: d,
    rows: 0,
    totalPages: 0
  }), E = ie({
    field: null,
    order: 0
  });
  function _() {
    const y = {};
    for (const S of l)
      y[S.field] = S.defaultValue !== void 0 ? typeof S.defaultValue == "function" ? S.defaultValue() : S.defaultValue : null;
    return y;
  }
  const Q = _();
  for (const y of Object.keys(Q))
    M[y] = Q[y];
  const Z = W(() => f.value !== null), ue = W(
    () => Z.value ? C.editTitle : C.createTitle
  ), ee = W(() => $.page <= 1), oe = W(() => $.page >= $.totalPages);
  let te = null;
  async function O(y = {}) {
    K.value = !0;
    try {
      const S = {
        page: $.page,
        page_size: $.pageSize,
        ...y
      };
      g.value && (S.search = g.value), E.field && E.order !== 0 && (S.ordering = E.order === -1 ? `-${E.field}` : E.field), x && Object.assign(S, x());
      const p = (await L.get(a, { params: S })).data;
      Array.isArray(p.results) ? (A.value = p.results, $.rows = p.count ?? 0) : (A.value = p.data ?? [], $.rows = p.rows ?? 0), p.page && ($.page = p.page), p.page_size && ($.pageSize = p.page_size), $.totalPages = Math.ceil($.rows / $.pageSize) || 0;
    } finally {
      K.value = !1;
    }
  }
  async function ye() {
    await O();
  }
  async function de() {
    await O();
  }
  function $e(y) {
    g.value = y, te && clearTimeout(te), te = setTimeout(() => {
      $.page = 1, O();
    }, c);
  }
  function Ve(y) {
    const S = y.target;
    $e(S.value);
  }
  function le(y) {
    $.page = y, O();
  }
  function be() {
    le(1);
  }
  function ne() {
    le($.totalPages);
  }
  function ae(y) {
    $.page = y.page + 1, $.pageSize = y.rows, O();
  }
  function ce(y) {
    E.field = y.sortField ?? null, E.order = y.sortOrder ?? 0, $.page = 1, O();
  }
  function fe() {
    const y = _();
    for (const S of Object.keys(y))
      M[S] = y[S];
  }
  function ke(y, S) {
    M[y] = S;
  }
  function we() {
    f.value = null, fe(), o.value = !0;
  }
  function me(y) {
    f.value = y;
    for (const S of l) {
      let m = y[S.field] !== void 0 ? y[S.field] : null;
      m && (S.type === "date" || S.type === "datetime") && typeof m == "string" && (m = st(m)), M[S.field] = m;
    }
    o.value = !0;
  }
  async function pe() {
    for (const y of l) {
      if (y.validate) {
        const S = y.validate(M[y.field]);
        if (S)
          return s.error(S), null;
      }
      if (y.required) {
        const S = M[y.field];
        if (S == null || S === "")
          return s.error(`${y.label} é obrigatório`), null;
      }
    }
    i.value = !0;
    try {
      let y = { ...M };
      for (const Y of l) {
        const B = y[Y.field];
        if (Y.type === "date" && B instanceof Date ? y[Y.field] = it(B) : Y.type === "datetime" && B instanceof Date && (y[Y.field] = ut(B)), Y.type === "fk" && B !== null && typeof B == "object") {
          const re = Y.optionValue || "id";
          y[Y.field] = B[re] ?? B;
        }
        (Y.type === "mask" || Y.type === "cpf_cnpj") && typeof B == "string" && (y[Y.field] = he(B));
      }
      z && (y = z(y, Z.value));
      const S = l.some(
        (Y) => Y.type === "image" && y[Y.field] instanceof File
      );
      let m = y, p;
      if (S) {
        const Y = new Set(
          l.filter((re) => re.type === "image").map((re) => re.field)
        ), B = new FormData();
        for (const [re, Ae] of Object.entries(y))
          if (Ae != null)
            if (Ae instanceof File)
              B.append(re, Ae);
            else {
              if (Y.has(re))
                continue;
              B.append(re, String(Ae));
            }
        m = B, p = { "Content-Type": "multipart/form-data" };
      }
      const N = p ? { headers: p } : void 0;
      let k;
      if (Z.value && f.value) {
        const Y = f.value[r];
        k = await L.patch(
          `${a}${Y}/`,
          m,
          N
        );
        const B = A.value.findIndex(
          (re) => re[r] === Y
        );
        B !== -1 && (A.value[B] = k.data), s.success(C.successUpdate);
      } else
        k = await L.post(a, m, N), A.value.unshift(k.data), $.rows++, s.success(C.successCreate);
      return o.value = !1, f.value = null, U && U(k.data, Z.value), k.data;
    } catch (y) {
      return s.error(Ye(y, "Erro ao salvar registro")), null;
    } finally {
      i.value = !1;
    }
  }
  function De(y) {
    b(async () => {
      try {
        const S = y[r];
        await L.delete(`${a}${S}/`);
        const m = A.value.findIndex(
          (p) => p[r] === S
        );
        m !== -1 && (A.value.splice(m, 1), $.rows--), s.success(C.successDelete), P && P(y);
      } catch (S) {
        s.error(Ye(S, "Erro ao excluir registro"));
      }
    }, C.deleteConfirmMessage);
  }
  return {
    items: A,
    loading: K,
    saving: i,
    search: g,
    dialogVisible: o,
    editingItem: f,
    formData: M,
    pagination: $,
    sort: E,
    isEditing: Z,
    dialogTitle: ue,
    isFirstPage: ee,
    isLastPage: oe,
    init: ye,
    fetchItems: O,
    refresh: de,
    setSearch: $e,
    onSearch: Ve,
    onPage: ae,
    onSort: ce,
    openCreateDialog: we,
    openEditDialog: me,
    save: pe,
    confirmDelete: De,
    setFormField: ke,
    resetForm: fe,
    goToPage: le,
    firstPage: be,
    lastPage: ne,
    config: e
  };
}
function Do(e) {
  const { endpoint: a, searchDebounce: t = 300, immediate: l = !1 } = e, r = Me(je);
  if (!r)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const c = r, u = Me(ze), V = e.pageSize ?? (u == null ? void 0 : u.defaultPageSize) ?? 20, v = I([]), D = I(!1), x = I(""), z = I({}), U = ie({}), P = ie({
    page: 1,
    pageSize: V,
    rows: 0,
    totalPages: 0
  }), R = ie({
    field: null,
    order: 0
  });
  let L = null;
  async function n(i = {}) {
    D.value = !0;
    try {
      const g = {
        page: P.page,
        page_size: P.pageSize,
        ...i
      };
      x.value && (g.search = x.value), R.field && R.order !== 0 && (g.ordering = R.order === -1 ? `-${R.field}` : R.field);
      for (const [$, E] of Object.entries(U))
        E != null && E !== "" && (g[$] = E);
      const M = (await c.get(a, {
        params: g
      })).data;
      Array.isArray(M.results) ? (v.value = M.results, P.rows = M.count ?? 0) : (v.value = M.data ?? [], P.rows = M.rows ?? 0), M.page && (P.page = M.page), M.page_size && (P.pageSize = M.page_size), P.totalPages = Math.ceil(P.rows / P.pageSize) || 0, z.value = M.extras ?? {};
    } finally {
      D.value = !1;
    }
  }
  async function d() {
    await n();
  }
  function C(i) {
    x.value = i, L && clearTimeout(L), L = setTimeout(() => {
      P.page = 1, n();
    }, t);
  }
  function s(i, g) {
    U[i] = g, P.page = 1, n();
  }
  function b() {
    for (const i of Object.keys(U))
      delete U[i];
    P.page = 1, n();
  }
  function A(i) {
    P.page = i.page + 1, P.pageSize = i.rows, n();
  }
  function K(i) {
    R.field = i.sortField ?? null, R.order = i.sortOrder ?? 0, P.page = 1, n();
  }
  return l && n(), {
    items: v,
    loading: D,
    search: x,
    pagination: P,
    sort: R,
    extras: z,
    fetchItems: n,
    refresh: d,
    setSearch: C,
    setFilter: s,
    clearFilters: b,
    onPage: A,
    onSort: K
  };
}
export {
  Qa as DEFAULT_CRUD_LABELS,
  bt as WAutoCompleteFK,
  Oe as WCrudColumnRenderer,
  We as WCrudFormDialog,
  Xa as WCrudView,
  ko as WPrimeVuePlugin,
  je as W_AXIOS_KEY,
  ze as W_CONFIG_KEY,
  Ye as extractApiError,
  da as mapApiFieldToColumnDef,
  sa as mapApiFieldToFieldDef,
  ca as mapApiFieldsToColumnDefs,
  ia as mapApiFieldsToFieldDefs,
  Do as useApi,
  bo as useApiError,
  yt as useAppConfirm,
  ht as useAppToast,
  wo as useCrudManager,
  pt as useFormatters
};
//# sourceMappingURL=index.js.map
