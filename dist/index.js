import { inject as Le, defineComponent as fe, openBlock as i, createElementBlock as m, createBlock as A, unref as g, toDisplayString as T, ref as K, computed as O, watch as Qe, reactive as we, resolveDirective as xt, Fragment as ie, createElementVNode as h, createVNode as Y, withDirectives as he, withCtx as se, createCommentVNode as S, renderList as ce, normalizeStyle as Ce, createTextVNode as Fe, normalizeClass as re, renderSlot as N, isRef as Ut, withModifiers as qt, createSlots as ut, normalizeProps as dt, guardReactiveProps as ct, useSlots as Ht, onMounted as Kt, createStaticVNode as Gt } from "vue";
import St from "primevue/datatable";
import Oe from "primevue/column";
import ae from "primevue/button";
import ye from "primevue/inputtext";
import qe from "primevue/iconfield";
import He from "primevue/inputicon";
import Jt from "primevue/paginator";
import Zt from "primevue/contextmenu";
import Pt from "primevue/tag";
import ze from "dayjs";
import Vt from "primevue/dialog";
import vt from "primevue/inputnumber";
import Xt from "primevue/textarea";
import Qt from "primevue/select";
import Mt from "primevue/autocomplete";
import gt from "primevue/datepicker";
import _t from "primevue/toggleswitch";
import ea from "primevue/colorpicker";
import ta from "primevue/password";
import { useToast as aa } from "primevue/usetoast";
import { useConfirm as na } from "primevue/useconfirm";
import oa from "primevue/inputgroup";
import ht from "primevue/inputgroupaddon";
import Ze from "primevue/skeleton";
const la = Symbol("w-axios"), at = Symbol("w-data-provider"), nt = Symbol("w-config");
function sa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var _e = { exports: {} }, ia = _e.exports, yt;
function ra() {
  return yt || (yt = 1, (function(e, a) {
    (function(t, n) {
      e.exports = n();
    })(ia, (function() {
      var t = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, n = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, s = /\d/, r = /\d\d/, u = /\d\d?/, b = /\d*[^-_:/,()\s\d]+/, d = {}, x = function(v) {
        return (v = +v) + (v > 68 ? 1900 : 2e3);
      }, F = function(v) {
        return function(D) {
          this[v] = +D;
        };
      }, E = [/[+-]\d\d:?(\d\d)?|Z/, function(v) {
        (this.zone || (this.zone = {})).offset = (function(D) {
          if (!D || D === "Z") return 0;
          var P = D.match(/([+-]|\d\d)/g), V = 60 * P[1] + (+P[2] || 0);
          return V === 0 ? 0 : P[0] === "+" ? -V : V;
        })(v);
      }], z = function(v) {
        var D = d[v];
        return D && (D.indexOf ? D : D.s.concat(D.f));
      }, I = function(v, D) {
        var P, V = d.meridiem;
        if (V) {
          for (var Z = 1; Z <= 24; Z += 1) if (v.indexOf(V(Z, 0, D)) > -1) {
            P = Z > 12;
            break;
          }
        } else P = v === (D ? "pm" : "PM");
        return P;
      }, G = { A: [b, function(v) {
        this.afternoon = I(v, !1);
      }], a: [b, function(v) {
        this.afternoon = I(v, !0);
      }], Q: [s, function(v) {
        this.month = 3 * (v - 1) + 1;
      }], S: [s, function(v) {
        this.milliseconds = 100 * +v;
      }], SS: [r, function(v) {
        this.milliseconds = 10 * +v;
      }], SSS: [/\d{3}/, function(v) {
        this.milliseconds = +v;
      }], s: [u, F("seconds")], ss: [u, F("seconds")], m: [u, F("minutes")], mm: [u, F("minutes")], H: [u, F("hours")], h: [u, F("hours")], HH: [u, F("hours")], hh: [u, F("hours")], D: [u, F("day")], DD: [r, F("day")], Do: [b, function(v) {
        var D = d.ordinal, P = v.match(/\d+/);
        if (this.day = P[0], D) for (var V = 1; V <= 31; V += 1) D(V).replace(/\[|\]/g, "") === v && (this.day = V);
      }], w: [u, F("week")], ww: [r, F("week")], M: [u, F("month")], MM: [r, F("month")], MMM: [b, function(v) {
        var D = z("months"), P = (z("monthsShort") || D.map((function(V) {
          return V.slice(0, 3);
        }))).indexOf(v) + 1;
        if (P < 1) throw new Error();
        this.month = P % 12 || P;
      }], MMMM: [b, function(v) {
        var D = z("months").indexOf(v) + 1;
        if (D < 1) throw new Error();
        this.month = D % 12 || D;
      }], Y: [/[+-]?\d+/, F("year")], YY: [r, function(v) {
        this.year = x(v);
      }], YYYY: [/\d{4}/, F("year")], Z: E, ZZ: E };
      function J(v) {
        var D, P;
        D = v, P = d && d.formats;
        for (var V = (v = D.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(oe, te, le) {
          var W = le && le.toUpperCase();
          return te || P[le] || t[le] || P[W].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(H, c, p) {
            return c || p.slice(1);
          }));
        }))).match(n), Z = V.length, X = 0; X < Z; X += 1) {
          var B = V[X], q = G[B], j = q && q[0], ee = q && q[1];
          V[X] = ee ? { regex: j, parser: ee } : B.replace(/^\[|\]$/g, "");
        }
        return function(oe) {
          for (var te = {}, le = 0, W = 0; le < Z; le += 1) {
            var H = V[le];
            if (typeof H == "string") W += H.length;
            else {
              var c = H.regex, p = H.parser, U = oe.slice(W), l = c.exec(U)[0];
              p.call(te, l), oe = oe.replace(l, "");
            }
          }
          return (function(f) {
            var k = f.afternoon;
            if (k !== void 0) {
              var o = f.hours;
              k ? o < 12 && (f.hours += 12) : o === 12 && (f.hours = 0), delete f.afternoon;
            }
          })(te), te;
        };
      }
      return function(v, D, P) {
        P.p.customParseFormat = !0, v && v.parseTwoDigitYear && (x = v.parseTwoDigitYear);
        var V = D.prototype, Z = V.parse;
        V.parse = function(X) {
          var B = X.date, q = X.utc, j = X.args;
          this.$u = q;
          var ee = j[1];
          if (typeof ee == "string") {
            var oe = j[2] === !0, te = j[3] === !0, le = oe || te, W = j[2];
            te && (W = j[2]), d = this.$locale(), !oe && W && (d = P.Ls[W]), this.$d = (function(U, l, f, k) {
              try {
                if (["x", "X"].indexOf(l) > -1) return new Date((l === "X" ? 1e3 : 1) * U);
                var o = J(l)(U), $ = o.year, ue = o.month, me = o.day, ke = o.hours, ne = o.minutes, de = o.seconds, pe = o.milliseconds, De = o.zone, Ne = o.week, Re = /* @__PURE__ */ new Date(), be = me || ($ || ue ? 1 : Re.getDate()), Se = $ || Re.getFullYear(), ve = 0;
                $ && !ue || (ve = ue > 0 ? ue - 1 : Re.getMonth());
                var ge, Pe = ke || 0, Ie = ne || 0, Te = de || 0, Ve = pe || 0;
                return De ? new Date(Date.UTC(Se, ve, be, Pe, Ie, Te, Ve + 60 * De.offset * 1e3)) : f ? new Date(Date.UTC(Se, ve, be, Pe, Ie, Te, Ve)) : (ge = new Date(Se, ve, be, Pe, Ie, Te, Ve), Ne && (ge = k(ge).week(Ne).toDate()), ge);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(B, ee, q, P), this.init(), W && W !== !0 && (this.$L = this.locale(W).$L), le && B != this.format(ee) && (this.$d = /* @__PURE__ */ new Date("")), d = {};
          } else if (ee instanceof Array) for (var H = ee.length, c = 1; c <= H; c += 1) {
            j[1] = ee[c - 1];
            var p = P.apply(this, j);
            if (p.isValid()) {
              this.$d = p.$d, this.$L = p.$L, this.init();
              break;
            }
            c === H && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else Z.call(this, X);
        };
      };
    }));
  })(_e)), _e.exports;
}
var ua = ra();
const da = /* @__PURE__ */ sa(ua);
ze.extend(da);
function ft(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const a = ze(e, "YYYY-MM-DD", !0);
  return a.isValid() ? a.toDate() : ze(e).toDate();
}
function Et(e) {
  return e ? typeof e == "string" ? e : ze(e).format("YYYY-MM-DD") : null;
}
function Ft(e) {
  return e ? typeof e == "string" ? e : ze(e).toISOString() : null;
}
function ca(e, a = "DD/MM/YYYY") {
  return e ? ze(e).format(a) : "—";
}
function fa(e) {
  return e ? ze(e).format("DD/MM/YYYY HH:mm") : "—";
}
function Ae(e) {
  return e.replace(/\D/g, "");
}
function At(e) {
  if (!e) return "—";
  const a = Ae(e);
  return a.length !== 11 ? e : a.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function Rt(e) {
  if (!e) return "—";
  const a = Ae(e);
  return a.length !== 14 ? e : a.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function ma(e) {
  if (!e) return "—";
  const a = Ae(e);
  return a.length === 11 ? At(e) : a.length === 14 ? Rt(e) : e;
}
function pa(e) {
  if (!e) return "—";
  const a = Ae(e);
  return a.length === 11 ? a.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : a.length === 10 ? a.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function It(e) {
  if (!e) return null;
  const a = Ae(e);
  if (a.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(a)) return "CPF inválido.";
  let t = 0;
  for (let u = 0; u < 9; u++) t += parseInt(a[u]) * (10 - u);
  let n = t % 11;
  const s = n < 2 ? 0 : 11 - n;
  if (parseInt(a[9]) !== s) return "CPF inválido.";
  t = 0;
  for (let u = 0; u < 10; u++) t += parseInt(a[u]) * (11 - u);
  n = t % 11;
  const r = n < 2 ? 0 : 11 - n;
  return parseInt(a[10]) !== r ? "CPF inválido." : null;
}
function Tt(e) {
  if (!e) return null;
  const a = Ae(e);
  if (a.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(a)) return "CNPJ inválido.";
  const t = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let n = 0;
  for (let d = 0; d < 12; d++) n += parseInt(a[d]) * t[d];
  let s = n % 11;
  const r = s < 2 ? 0 : 11 - s;
  if (parseInt(a[12]) !== r) return "CNPJ inválido.";
  const u = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  n = 0;
  for (let d = 0; d < 13; d++) n += parseInt(a[d]) * u[d];
  s = n % 11;
  const b = s < 2 ? 0 : 11 - s;
  return parseInt(a[13]) !== b ? "CNPJ inválido." : null;
}
function va(e) {
  if (!e) return null;
  const a = Ae(e);
  return a.length === 11 ? It(e) : a.length === 14 ? Tt(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const et = /* @__PURE__ */ new Map();
function bt(e, a) {
  const t = `${e}-${a}`;
  let n = et.get(t);
  return n || (n = new Intl.NumberFormat(e, {
    minimumFractionDigits: a,
    maximumFractionDigits: a
  }), et.set(t, n)), n;
}
function ga(e, a) {
  const t = `${e}-${a}`;
  let n = et.get(t);
  return n || (n = new Intl.NumberFormat(e, {
    style: "currency",
    currency: a
  }), et.set(t, n)), n;
}
function mt() {
  const e = Le(nt, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), a = (e == null ? void 0 : e.locale) ?? "pt-BR", t = (e == null ? void 0 : e.currency) ?? "BRL";
  function n(d) {
    return d == null ? "—" : ga(a, t).format(d);
  }
  function s(d, x = 2) {
    return d == null ? "—" : bt(a, x).format(d);
  }
  function r(d, x) {
    return ca(d, x ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function u(d) {
    return fa(d);
  }
  function b(d) {
    return d == null ? "—" : `${bt(a, 2).format(d)}%`;
  }
  return {
    formatCurrency: n,
    formatNumber: s,
    formatDate: r,
    formatDateTime: u,
    formatPercent: b,
    formatCpf: At,
    formatCnpj: Rt,
    formatCpfCnpj: ma,
    formatTelefone: pa,
    validateCpf: It,
    validateCnpj: Tt,
    validateCpfCnpj: va,
    parseDate: ft,
    toDateString: Et,
    toDateTimeString: Ft
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
}, tt = /* @__PURE__ */ fe({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: a, formatDateTime: t, formatCurrency: n, formatNumber: s } = mt();
    return (r, u) => e.value == null ? (i(), m("span", ha, "—")) : e.column.type === "image" ? (i(), m("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, ya)) : e.column.type === "boolean" ? (i(), A(g(Pt), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (i(), m("span", ba, T(g(a)(e.value)), 1)) : e.column.type === "datetime" ? (i(), m("span", wa, T(g(t)(e.value)), 1)) : e.column.type === "currency" ? (i(), m("span", ka, T(g(n)(e.value)), 1)) : e.column.type === "number" ? (i(), m("span", $a, T(e.column.format ? e.column.format(e.value, e.rowData) : g(s)(e.value, e.column.decimals ?? 0)), 1)) : (i(), m("span", Ca, T(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var Da = Object.defineProperty, xa = (e, a, t) => a in e ? Da(e, a, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[a] = t, Ue = (e, a, t) => xa(e, typeof a != "symbol" ? a + "" : a, t);
const wt = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, kt = (e, a, t) => e.replaceAll(a, "").replace(t, ".").replace("..", ".").replace(/[^.\d]/g, ""), $t = (e, a, t) => {
  var n;
  return new Intl.NumberFormat(((n = t.number) == null ? void 0 : n.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: a,
    roundingMode: "trunc"
  });
}, Sa = (e, a = !0, t) => {
  var n, s, r, u;
  const b = ((n = t.number) == null ? void 0 : n.unsigned) !== !0 && e.startsWith("-") ? "-" : "", d = ((s = t.number) == null ? void 0 : s.fraction) ?? 0;
  let x = $t(0, d, t);
  const F = x.formatToParts(1000.12), E = ((r = F.find((v) => v.type === "group")) == null ? void 0 : r.value) ?? " ", z = ((u = F.find((v) => v.type === "decimal")) == null ? void 0 : u.value) ?? ".", I = kt(e, E, z);
  if (Number.isNaN(parseFloat(I))) return b;
  const G = I.split(".");
  if (G[1] != null && G[1].length >= 1) {
    const v = G[1].length <= d ? G[1].length : d;
    x = $t(v, d, t);
  }
  let J = x.format(parseFloat(I));
  return a ? d > 0 && I.endsWith(".") && !I.slice(0, -1).includes(".") && (J += z) : J = kt(J, E, z), b + J;
}, Lt = (e) => JSON.parse(e.replaceAll("'", '"')), Pa = (e, a = {}) => {
  const t = { ...a };
  e.dataset.maska != null && e.dataset.maska !== "" && (t.mask = Va(e.dataset.maska)), e.dataset.maskaEager != null && (t.eager = Xe(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (t.reversed = Xe(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (t.tokensReplace = Xe(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (t.tokens = Ma(e.dataset.maskaTokens));
  const n = {};
  return e.dataset.maskaNumberLocale != null && (n.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (n.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (n.unsigned = Xe(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(n).length > 0) && (t.number = n), t;
}, Xe = (e) => e !== "" ? !!JSON.parse(e) : !0, Va = (e) => e.startsWith("[") && e.endsWith("]") ? Lt(e) : e, Ma = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return Lt(e);
  const a = {};
  return e.split("|").forEach((t) => {
    const n = t.split(":");
    a[n[0]] = {
      pattern: zt() ? new RegExp(n[1], "u") : new RegExp(n[1]),
      optional: n[2] === "optional",
      multiple: n[2] === "multiple",
      repeated: n[2] === "repeated"
    };
  }), a;
}, zt = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class Ea {
  constructor(a = {}) {
    Ue(this, "opts", {}), Ue(this, "memo", /* @__PURE__ */ new Map());
    const t = { ...a };
    if (t.tokens != null) {
      t.tokens = t.tokensReplace ? { ...t.tokens } : { ...wt, ...t.tokens };
      for (const n of Object.values(t.tokens))
        typeof n.pattern == "string" && (n.pattern = zt() ? new RegExp(n.pattern, "u") : new RegExp(n.pattern));
    } else
      t.tokens = wt;
    Array.isArray(t.mask) && (t.mask.length > 1 ? t.mask = [...t.mask].sort((n, s) => n.length - s.length) : t.mask = t.mask[0] ?? ""), t.mask === "" && (t.mask = null), this.opts = t;
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
    const n = this.process(String(a), t).length;
    return typeof this.opts.mask == "string" ? n >= this.opts.mask.length : n >= t.length;
  }
  findMask(a) {
    const t = this.opts.mask;
    if (t == null)
      return null;
    if (typeof t == "string")
      return t;
    if (typeof t == "function")
      return t(a);
    const n = this.process(a, t.slice(-1).pop() ?? "", !1);
    return t.find((s) => this.process(a, s, !1).length >= n.length) ?? "";
  }
  escapeMask(a) {
    const t = [], n = [];
    return a.split("").forEach((s, r) => {
      s === "!" && a[r - 1] !== "!" ? n.push(r - n.length) : t.push(s);
    }), { mask: t.join(""), escaped: n };
  }
  process(a, t, n = !0) {
    if (this.opts.number != null) return Sa(a, n, this.opts);
    if (t == null) return a;
    const s = `v=${a},mr=${t},m=${n ? 1 : 0}`;
    if (this.memo.has(s)) return this.memo.get(s);
    const { mask: r, escaped: u } = this.escapeMask(t), b = [], d = this.opts.tokens != null ? this.opts.tokens : {}, x = this.isReversed() ? -1 : 1, F = this.isReversed() ? "unshift" : "push", E = this.isReversed() ? 0 : r.length - 1, z = this.isReversed() ? () => v > -1 && D > -1 : () => v < r.length && D < a.length, I = (V) => !this.isReversed() && V <= E || this.isReversed() && V >= E;
    let G, J = -1, v = this.isReversed() ? r.length - 1 : 0, D = this.isReversed() ? a.length - 1 : 0, P = !1;
    for (; z(); ) {
      const V = r.charAt(v), Z = d[V], X = (Z == null ? void 0 : Z.transform) != null ? Z.transform(a.charAt(D)) : a.charAt(D);
      if (!u.includes(v) && Z != null ? (X.match(Z.pattern) != null ? (b[F](X), Z.repeated ? (J === -1 ? J = v : v === E && v !== J && (v = J - x), E === J && (v -= x)) : Z.multiple && (P = !0, v -= x), v += x) : Z.multiple ? P && (v += x, D -= x, P = !1) : X === G ? G = void 0 : Z.optional && (v += x, D -= x), D += x) : (n && !this.isEager() && b[F](V), X === V && !this.isEager() ? D += x : G = V, this.isEager() || (v += x)), this.isEager())
        for (; I(v) && (d[r.charAt(v)] == null || u.includes(v)); ) {
          if (n) {
            if (b[F](r.charAt(v)), a.charAt(D) === r.charAt(v)) {
              v += x, D += x;
              continue;
            }
          } else r.charAt(v) === a.charAt(D) && (D += x);
          v += x;
        }
    }
    return this.memo.set(s, b.join("")), this.memo.get(s);
  }
}
class Fa {
  constructor(a, t = {}) {
    Ue(this, "items", /* @__PURE__ */ new Map()), Ue(this, "eventAbortController"), Ue(this, "onInput", (n) => {
      if (n instanceof CustomEvent && n.type === "input" && !n.isTrusted && !n.bubbles)
        return;
      const s = n.target, r = this.items.get(s);
      if (r === void 0) return;
      const u = "inputType" in n && n.inputType.startsWith("delete"), b = r.isEager(), d = u && b && r.unmasked(s.value) === "" ? "" : s.value;
      this.fixCursor(s, u, () => this.setValue(s, d));
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
    for (const n of a) {
      if (!this.items.has(n)) {
        const { signal: r } = this.eventAbortController;
        n.addEventListener("input", this.onInput, { capture: !0, signal: r });
      }
      const s = new Ea(Pa(n, t));
      this.items.set(n, s), queueMicrotask(() => this.updateValue(n)), n.selectionStart === null && s.isEager() && console.warn("Maska: input of `%s` type is not supported", n.type);
    }
  }
  getInputs(a) {
    return typeof a == "string" ? Array.from(document.querySelectorAll(a)) : "length" in a ? Array.from(a) : [a];
  }
  getOptions(a) {
    const { onMaska: t, preProcess: n, postProcess: s, ...r } = a;
    return r;
  }
  fixCursor(a, t, n) {
    var s, r;
    const u = a.selectionStart, b = a.value;
    if (n(), u === null || u === b.length && !t) return;
    const d = a.value, x = b.slice(0, u), F = d.slice(0, u), E = (s = this.processInput(a, x)) == null ? void 0 : s.unmasked, z = (r = this.processInput(a, F)) == null ? void 0 : r.unmasked;
    if (E === void 0 || z === void 0) return;
    let I = u;
    x !== F && (I += t ? d.length - b.length : E.length - z.length), a.setSelectionRange(I, I);
  }
  setValue(a, t) {
    const n = this.processInput(a, t);
    n !== void 0 && (a.value = n.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((s) => s(n)) : this.options.onMaska(n)), a.dispatchEvent(new CustomEvent("maska", { detail: n })), a.dispatchEvent(new CustomEvent("input", { detail: n.masked })));
  }
  processInput(a, t) {
    const n = this.items.get(a);
    if (n === void 0) return;
    let s = t ?? a.value;
    this.options.preProcess != null && (s = this.options.preProcess(s));
    let r = n.masked(s);
    return this.options.postProcess != null && (r = this.options.postProcess(r)), {
      masked: r,
      unmasked: n.unmasked(s),
      completed: n.completed(s)
    };
  }
}
const it = /* @__PURE__ */ new WeakMap(), Aa = (e, a) => {
  if (e.arg == null || e.instance == null) return;
  const t = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = a : t && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, rt = (e, a) => {
  var t;
  const n = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (n == null || (n == null ? void 0 : n.type) === "file") return;
  let s = {};
  if (a.value != null && (s = typeof a.value == "string" ? { mask: a.value } : { ...a.value }), a.arg != null) {
    const r = (u) => {
      const b = a.modifiers.unmasked ? u.unmasked : a.modifiers.completed ? u.completed : u.masked;
      Aa(a, b);
    };
    s.onMaska = s.onMaska == null ? r : Array.isArray(s.onMaska) ? [...s.onMaska, r] : [s.onMaska, r];
  }
  it.has(n) ? (t = it.get(n)) == null || t.update(s) : it.set(n, new Fa(n, s));
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
  var n;
  const a = Ra[e.type] ?? "text", t = {
    field: e.name,
    label: e.label,
    type: a,
    required: e.required ?? !1
  };
  return (e.type === "decimal" || e.type === "float") && (t.minFractionDigits = 2, t.maxFractionDigits = 2), e.type === "boolean" && (t.defaultValue = !1), e.type === "choice" && ((n = e.choices) != null && n.length) && (t.options = e.choices.map((s) => ({
    label: s.label,
    value: s.value
  }))), e.type === "fk" && (t.endpoint = e.endpoint, e.option_label && (t.optionLabel = e.option_label), e.option_value && (t.optionValue = e.option_value)), t;
}
function Ta(e) {
  return e.filter((a) => !a.read_only && a.name !== "id").map(Ia);
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
function Na(e, a = 6) {
  return e.filter((t) => !t.read_only && t.name !== "id").slice(0, a).map(za);
}
function Nt() {
  const e = aa();
  function a(r, u = "Sucesso") {
    e.add({ severity: "success", summary: u, detail: r, life: 3e3 });
  }
  function t(r, u = "Erro") {
    e.add({ severity: "error", summary: u, detail: r, life: 5e3 });
  }
  function n(r, u = "Atenção") {
    e.add({ severity: "warn", summary: u, detail: r, life: 4e3 });
  }
  function s(r, u = "Info") {
    e.add({ severity: "info", summary: u, detail: r, life: 3e3 });
  }
  return { success: a, error: t, warn: n, info: s };
}
function Yt() {
  const e = na();
  function a(n, s = "Deseja realmente excluir este registro?") {
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
  function t(n, s, r = "Confirmação") {
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
  return { confirmDelete: a, confirmAction: t };
}
function Ya(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (a) => a.toUpperCase());
}
function Oa(e) {
  if (typeof e == "string")
    return e;
  if (Array.isArray(e)) {
    const a = e.filter((t) => typeof t == "string");
    return a.length > 0 ? a.join(" ") : null;
  }
  if (typeof e == "object" && e !== null) {
    const a = e;
    if (Array.isArray(a.non_field_errors) && a.non_field_errors.length > 0)
      return a.non_field_errors.filter((n) => typeof n == "string").join(" ");
    const t = [];
    for (const [n, s] of Object.entries(a)) {
      if (n === "non_field_errors") continue;
      const r = Ya(n);
      if (Array.isArray(s)) {
        const u = s.filter((b) => typeof b == "string");
        u.length > 0 && t.push(`${r}: ${u.join(" ")}`);
      } else typeof s == "string" && t.push(`${r}: ${s}`);
    }
    return t.length > 0 ? t.join(`
`) : null;
  }
  return null;
}
function Ke(e, a = "Erro inesperado") {
  var r;
  if (!e || typeof e != "object") return a;
  const t = e, n = (r = t.response) == null ? void 0 : r.data;
  if (!n || typeof n != "object")
    return t.message || a;
  const s = n.detail ?? n;
  return Oa(s) || a;
}
function ql() {
  return { extractApiError: Ke };
}
const Ba = { class: "w-autocompletefk" }, ja = ["disabled"], Wa = { class: "w-autocompletefk-toolbar" }, Ua = { class: "w-autocompletefk-toolbar-actions" }, qa = { class: "flex items-center justify-end gap-1" }, Ha = { class: "w-autocompletefk-footer" }, Ot = /* @__PURE__ */ fe({
  __name: "WAutoCompleteFK",
  props: {
    modelValue: {},
    endpoint: {},
    endpointParams: {},
    drilldown: {},
    optionLabel: { default: "nome" },
    optionValue: { default: "id" },
    placeholder: { default: "Buscar..." },
    blockedPlaceholder: {},
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
    const t = e, n = a, s = Le(at);
    if (!s)
      throw new Error(
        "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin."
      );
    const r = s, u = Nt(), { confirmDelete: b } = Yt(), d = K(null), x = K([]), F = K(!1);
    let E = null;
    function z(y) {
      return y == null || y === "";
    }
    function I(y) {
      if (y && typeof y == "object") {
        const C = y;
        return C.id ?? C.value ?? C;
      }
      return y;
    }
    const G = O(() => {
      const y = t.drilldown;
      return y ? Array.isArray(y) ? y : [y] : [];
    }), J = O(
      () => G.value.some(
        (y) => (y.required ?? !0) && z(I(y.value))
      )
    );
    function v() {
      const y = {};
      for (const C of G.value) {
        const Q = I(C.value);
        z(Q) || (y[C.field] = Q);
      }
      return y;
    }
    const D = O(
      () => J.value && t.blockedPlaceholder ? t.blockedPlaceholder : t.placeholder
    );
    async function P(y) {
      try {
        const C = await r.get(t.endpoint, y);
        d.value = C.data;
      } catch {
        d.value = null;
      }
    }
    async function V(y) {
      if (J.value) {
        x.value = [];
        return;
      }
      F.value = !0;
      try {
        const C = {
          page_size: 20,
          ...t.endpointParams,
          ...v()
        };
        y && (C.search = y);
        const Q = await r.list(t.endpoint, C);
        x.value = Q.data;
      } catch {
        x.value = [];
      } finally {
        F.value = !1;
      }
    }
    function Z(y) {
      const C = y.query || "";
      if (C.length < t.minLength) {
        x.value = [];
        return;
      }
      E && clearTimeout(E), E = setTimeout(() => V(C), 300);
    }
    function X(y) {
      d.value = y.value, n("update:modelValue", y.value);
    }
    function B() {
      d.value = null, n("update:modelValue", null);
    }
    Qe(
      () => t.modelValue,
      async (y) => {
        if (y != null) {
          if (typeof y == "object" && y !== null && t.optionLabel in y) {
            d.value = y;
            return;
          }
          (!d.value || d.value[t.optionValue] !== y) && await P(y);
        } else
          d.value = null;
      },
      { immediate: !0 }
    );
    const q = K(!1), j = K([]), ee = K(!1), oe = K(""), te = K(1), le = K(15), W = K(0), H = K(null), c = K(null), p = K(0);
    let U = null;
    const l = K([]), f = O(() => {
      var y;
      return (y = t.crudFields) != null && y.length ? !0 : l.value.length > 0;
    }), k = O(() => t.canCreate ?? f.value), o = O(() => t.canEdit ?? f.value), $ = O(() => t.canDelete ?? f.value), ue = O(() => o.value || $.value), me = O(() => {
      var y;
      return (y = t.crudFields) != null && y.length ? t.crudFields : Ta(l.value);
    }), ke = O(() => {
      var y, C;
      return (y = t.crudColumns) != null && y.length ? t.crudColumns : (C = t.columns) != null && C.length ? t.columns.map((Q) => ({
        field: Q.field,
        header: Q.header,
        sortable: !0
      })) : l.value.length ? Na(l.value) : [
        { field: t.optionLabel, header: t.optionLabel, sortable: !0 }
      ];
    });
    async function ne() {
      var y, C, Q;
      if (J.value) {
        j.value = [], W.value = 0;
        return;
      }
      ee.value = !0;
      try {
        const L = {
          page: te.value,
          page_size: le.value,
          ...t.endpointParams,
          ...v()
        };
        oe.value && (L.search = oe.value), c.value && p.value !== 0 && (L.ordering = p.value === -1 ? `-${c.value}` : c.value);
        const w = await r.list(t.endpoint, L);
        j.value = w.data, W.value = w.rows, (y = w.extras) != null && y.fields && !((C = t.columns) != null && C.length) && !((Q = t.crudFields) != null && Q.length) && (l.value = w.extras.fields);
      } catch {
        j.value = [], W.value = 0;
      } finally {
        ee.value = !1;
      }
    }
    function de() {
      t.disabled || (oe.value = "", te.value = 1, c.value = null, p.value = 0, H.value = null, q.value = !0, ne());
    }
    function pe(y) {
      te.value = y.page + 1, le.value = y.rows, ne();
    }
    function De(y) {
      c.value = y.sortField ?? null, p.value = y.sortOrder ?? 0, te.value = 1, ne();
    }
    function Ne() {
      H.value && (d.value = H.value, n("update:modelValue", H.value), q.value = !1);
    }
    function Re(y) {
      d.value = y.data, n("update:modelValue", y.data), q.value = !1;
    }
    Qe(oe, () => {
      U && clearTimeout(U), U = setTimeout(() => {
        te.value = 1, ne();
      }, 300);
    }), Qe(
      () => G.value.map((y) => I(y.value)),
      (y, C) => {
        if (q.value && (te.value = 1, ne()), !C) return;
        const Q = y.some((w, M) => w !== C[M]), L = C.some((w) => !z(w));
        Q && L && d.value && (d.value = null, n("update:modelValue", null));
      }
    );
    const be = K(!1), Se = K(!1), ve = K(null), ge = we({}), Pe = O(() => ve.value !== null), Ie = O(
      () => Pe.value ? "Editar Registro" : "Novo Registro"
    );
    function Te() {
      const y = {};
      for (const C of me.value)
        y[C.field] = C.defaultValue !== void 0 ? typeof C.defaultValue == "function" ? C.defaultValue() : C.defaultValue : null;
      return y;
    }
    function Ve() {
      const y = Te();
      for (const C of Object.keys(ge))
        delete ge[C];
      for (const [C, Q] of Object.entries(y))
        ge[C] = Q;
    }
    function Ge() {
      ve.value = null, Ve(), be.value = !0;
    }
    function ot(y) {
      ve.value = y;
      for (const C of me.value)
        ge[C.field] = y[C.field] !== void 0 ? y[C.field] : null;
      be.value = !0;
    }
    function Je(y, C) {
      ge[y] = C;
    }
    async function lt() {
      Se.value = !0;
      try {
        const y = { ...ge };
        for (const Q of me.value) {
          const L = y[Q.field];
          if (Q.type === "fk" && L !== null && typeof L == "object") {
            const w = Q.optionValue || "id";
            y[Q.field] = L[w] ?? L;
          }
        }
        let C;
        if (Pe.value && ve.value) {
          const Q = ve.value[t.optionValue];
          C = await r.update(
            t.endpoint,
            Q,
            y
          );
          const L = j.value.findIndex((w) => w[t.optionValue] === Q);
          L !== -1 && (j.value[L] = C.data), u.success("Registro atualizado com sucesso");
        } else
          C = await r.create(t.endpoint, y), j.value.unshift(C.data), W.value++, u.success("Registro criado com sucesso");
        be.value = !1, ve.value = null, H.value = C.data;
      } catch (y) {
        u.error(Ke(y, "Erro ao salvar registro"));
      } finally {
        Se.value = !1;
      }
    }
    function st(y) {
      b(async () => {
        try {
          const C = y[t.optionValue];
          await r.delete(t.endpoint, C);
          const Q = j.value.findIndex((L) => L[t.optionValue] === C);
          Q !== -1 && (j.value.splice(Q, 1), W.value--), d.value && d.value[t.optionValue] === C && (d.value = null, n("update:modelValue", null)), H.value && H.value[t.optionValue] === C && (H.value = null), u.success("Registro excluído com sucesso");
        } catch (C) {
          u.error(Ke(C, "Erro ao excluir registro"));
        }
      });
    }
    return (y, C) => {
      const Q = xt("tooltip");
      return i(), m(ie, null, [
        h("div", Ba, [
          Y(g(Mt), {
            "model-value": d.value,
            suggestions: x.value,
            "option-label": e.optionLabel,
            placeholder: D.value,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: F.value,
            fluid: "",
            onComplete: Z,
            onItemSelect: X,
            onClear: B
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          he((i(), m("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: de
          }, [...C[6] || (C[6] = [
            h("i", { class: "pi pi-search" }, null, -1)
          ])], 8, ja)), [
            [
              Q,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        Y(g(Vt), {
          visible: q.value,
          "onUpdate:visible": C[4] || (C[4] = (L) => q.value = L),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: se(() => [
            h("div", Ha, [
              Y(g(ae), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: C[3] || (C[3] = (L) => q.value = !1)
              }),
              Y(g(ae), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !H.value,
                onClick: Ne
              }, null, 8, ["disabled"])
            ])
          ]),
          default: se(() => [
            h("div", Wa, [
              Y(g(qe), { class: "w-autocompletefk-toolbar-search" }, {
                default: se(() => [
                  Y(g(He), { class: "pi pi-search" }),
                  Y(g(ye), {
                    modelValue: oe.value,
                    "onUpdate:modelValue": C[0] || (C[0] = (L) => oe.value = L),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              h("div", Ua, [
                k.value ? (i(), A(g(ae), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: Ge
                })) : S("", !0)
              ])
            ]),
            Y(g(St), {
              selection: H.value,
              "onUpdate:selection": C[1] || (C[1] = (L) => H.value = L),
              value: j.value,
              loading: ee.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: le.value,
              "total-records": W.value,
              "sort-field": c.value ?? void 0,
              "sort-order": p.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: pe,
              onSort: C[2] || (C[2] = (L) => De({ sortField: L.sortField, sortOrder: L.sortOrder })),
              onRowDblclick: Re
            }, {
              empty: se(() => [...C[7] || (C[7] = [
                h("div", { class: "w-autocompletefk-empty" }, "Nenhum registro encontrado", -1)
              ])]),
              default: se(() => [
                Y(g(Oe), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (i(!0), m(ie, null, ce(ke.value, (L) => (i(), A(g(Oe), {
                  key: L.field,
                  field: L.field,
                  header: L.header,
                  sortable: L.sortable ?? !0,
                  style: Ce(L.style)
                }, {
                  body: se(({ data: w }) => [
                    L.type ? (i(), A(tt, {
                      key: 0,
                      column: L,
                      value: w[L.field],
                      "row-data": w
                    }, null, 8, ["column", "value", "row-data"])) : (i(), m(ie, { key: 1 }, [
                      Fe(T(w[L.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                ue.value ? (i(), A(g(Oe), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: se(({ data: L }) => [
                    h("div", qa, [
                      o.value ? he((i(), A(g(ae), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (w) => ot(L)
                      }, null, 8, ["onClick"])), [
                        [
                          Q,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : S("", !0),
                      $.value ? he((i(), A(g(ae), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (w) => st(L)
                      }, null, 8, ["onClick"])), [
                        [
                          Q,
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
        f.value ? (i(), A(pt, {
          key: 0,
          visible: be.value,
          title: Ie.value,
          fields: me.value,
          "form-data": ge,
          "is-editing": Pe.value,
          saving: Se.value,
          width: e.dialogWidth,
          "onUpdate:visible": C[5] || (C[5] = (L) => {
            be.value = L, L || (ve.value = null);
          }),
          "onUpdate:field": Je,
          onSave: lt
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : S("", !0)
      ], 64);
    };
  }
}), Bt = /* @__PURE__ */ fe({
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
  setup(e, { emit: a }) {
    const t = e, n = a, s = O(
      () => t.prefix ?? (t.currency ? "R$" : void 0)
    ), r = O(() => !!s.value || !!t.suffix), u = O(() => {
      const d = t.modelValue;
      return d == null || Number.isNaN(d) ? "" : new Intl.NumberFormat(t.locale, {
        minimumFractionDigits: t.decimals,
        maximumFractionDigits: t.decimals
      }).format(d);
    });
    function b(d) {
      const x = d.target.value.replace(/\D/g, "");
      if (!x) {
        n("update:modelValue", null);
        return;
      }
      const F = Number(x) / Math.pow(10, t.decimals);
      n("update:modelValue", F);
    }
    return (d, x) => r.value ? (i(), A(g(oa), {
      key: 0,
      class: "w-money-input"
    }, {
      default: se(() => [
        s.value ? (i(), A(g(ht), { key: 0 }, {
          default: se(() => [
            Fe(T(s.value), 1)
          ]),
          _: 1
        })) : S("", !0),
        Y(g(ye), {
          "model-value": u.value,
          inputmode: "numeric",
          class: "w-money-input__field",
          placeholder: e.placeholder,
          disabled: e.disabled,
          invalid: e.invalid,
          onInput: b
        }, null, 8, ["model-value", "placeholder", "disabled", "invalid"]),
        e.suffix ? (i(), A(g(ht), { key: 1 }, {
          default: se(() => [
            Fe(T(e.suffix), 1)
          ]),
          _: 1
        })) : S("", !0)
      ]),
      _: 1
    })) : (i(), A(g(ye), {
      key: 1,
      "model-value": u.value,
      inputmode: "numeric",
      fluid: "",
      class: "w-money-input__field",
      placeholder: e.placeholder,
      disabled: e.disabled,
      invalid: e.invalid,
      onInput: b
    }, null, 8, ["model-value", "placeholder", "disabled", "invalid"]));
  }
}), Ka = { class: "w-transfer__pane" }, Ga = { class: "w-transfer__head" }, Ja = { class: "w-transfer__count" }, Za = { class: "w-transfer__list" }, Xa = ["onClick"], Qa = {
  key: 0,
  class: "w-transfer__empty"
}, _a = { class: "w-transfer__controls" }, en = { class: "w-transfer__pane" }, tn = { class: "w-transfer__head" }, an = { class: "w-transfer__count" }, nn = { class: "w-transfer__list" }, on = ["onClick"], ln = {
  key: 0,
  class: "w-transfer__empty"
}, jt = /* @__PURE__ */ fe({
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
  setup(e, { emit: a }) {
    const t = e, n = a, s = K(""), r = K(""), u = O(() => new Set(t.selected)), b = O(() => t.searchFields ?? [t.optionLabel]);
    function d(D) {
      return D[t.trackBy];
    }
    function x(D) {
      return String(D[t.optionLabel] ?? "");
    }
    function F(D, P) {
      if (!P) return !0;
      const V = P.toLowerCase();
      return b.value.some(
        (Z) => String(D[Z] ?? "").toLowerCase().includes(V)
      );
    }
    const E = O(
      () => t.source.filter(
        (D) => !u.value.has(d(D)) && F(D, s.value)
      )
    ), z = O(
      () => t.source.filter(
        (D) => u.value.has(d(D)) && F(D, r.value)
      )
    );
    function I(D) {
      t.disabled || n("update:selected", [...t.selected, d(D)]);
    }
    function G(D) {
      if (t.disabled) return;
      const P = d(D);
      n("update:selected", t.selected.filter((V) => V !== P));
    }
    function J() {
      t.disabled || n("update:selected", t.source.map(d));
    }
    function v() {
      t.disabled || n("update:selected", []);
    }
    return (D, P) => (i(), m("div", {
      class: re(["w-transfer", { "w-transfer--disabled": e.disabled }])
    }, [
      h("div", Ka, [
        h("div", Ga, [
          P[2] || (P[2] = h("span", { class: "w-transfer__title" }, "Disponíveis", -1)),
          h("span", Ja, T(E.value.length), 1)
        ]),
        Y(g(qe), { class: "w-transfer__search" }, {
          default: se(() => [
            Y(g(He), { class: "pi pi-search" }),
            Y(g(ye), {
              modelValue: s.value,
              "onUpdate:modelValue": P[0] || (P[0] = (V) => s.value = V),
              placeholder: "Buscar...",
              fluid: ""
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        h("ul", Za, [
          (i(!0), m(ie, null, ce(E.value, (V) => (i(), m("li", {
            key: `a-${d(V)}`,
            class: "w-transfer__item",
            onClick: (Z) => I(V)
          }, [
            h("span", null, T(x(V)), 1),
            P[3] || (P[3] = h("i", { class: "pi pi-angle-right" }, null, -1))
          ], 8, Xa))), 128)),
          E.value.length ? S("", !0) : (i(), m("li", Qa, "Nenhum item"))
        ])
      ]),
      h("div", _a, [
        Y(g(ae), {
          type: "button",
          icon: "pi pi-angle-double-right",
          text: "",
          rounded: "",
          disabled: e.disabled || !E.value.length,
          onClick: J
        }, null, 8, ["disabled"]),
        Y(g(ae), {
          type: "button",
          icon: "pi pi-angle-double-left",
          text: "",
          rounded: "",
          disabled: e.disabled || !e.selected.length,
          onClick: v
        }, null, 8, ["disabled"])
      ]),
      h("div", en, [
        h("div", tn, [
          P[4] || (P[4] = h("span", { class: "w-transfer__title" }, "Selecionados", -1)),
          h("span", an, T(z.value.length), 1)
        ]),
        Y(g(qe), { class: "w-transfer__search" }, {
          default: se(() => [
            Y(g(He), { class: "pi pi-search" }),
            Y(g(ye), {
              modelValue: r.value,
              "onUpdate:modelValue": P[1] || (P[1] = (V) => r.value = V),
              placeholder: "Buscar...",
              fluid: ""
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        h("ul", nn, [
          (i(!0), m(ie, null, ce(z.value, (V) => (i(), m("li", {
            key: `s-${d(V)}`,
            class: "w-transfer__item",
            onClick: (Z) => G(V)
          }, [
            P[5] || (P[5] = h("i", { class: "pi pi-angle-left" }, null, -1)),
            h("span", null, T(x(V)), 1)
          ], 8, on))), 128)),
          z.value.length ? S("", !0) : (i(), m("li", ln, "Nenhum item"))
        ])
      ])
    ], 2));
  }
});
async function sn(e) {
  const a = e.replace(/\D/g, "");
  if (a.length !== 8) return null;
  try {
    const t = await fetch(`https://viacep.com.br/ws/${a}/json/`);
    if (!t.ok) return null;
    const n = await t.json();
    return n.erro ? null : n;
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
}, fn = { class: "w-crud-form-switch-label" }, mn = { class: "w-crud-form-label" }, pn = {
  key: 0,
  class: "w-crud-form-required"
}, vn = { class: "w-crud-form-color-row" }, gn = { class: "w-crud-form-label" }, hn = ["accept", "disabled", "onChange"], yn = { class: "w-crud-form-label" }, bn = {
  key: 0,
  class: "w-crud-form-required"
}, wn = { class: "w-crud-form-label" }, kn = {
  key: 0,
  class: "w-crud-form-required"
}, $n = {
  key: 1,
  class: "pi pi-spin pi-spinner w-crud-form-cep-spinner"
}, Cn = {
  key: 16,
  class: "w-crud-form-cep-error"
}, Dn = {
  key: 17,
  class: "w-crud-form-error"
}, xn = /* @__PURE__ */ fe({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    columns: { default: 2 }
  },
  emits: ["update:field"],
  setup(e, { expose: a, emit: t }) {
    const n = e, s = t, r = we({}), u = we({}), b = we({}), d = we({});
    function x(l, f) {
      const k = f.target.value, o = k.replace(/\D/g, "");
      s("update:field", l.field, k), b[l.field] = null, d[l.field] && (clearTimeout(d[l.field]), d[l.field] = null), o.length === 8 && (d[l.field] = setTimeout(async () => {
        u[l.field] = !0, b[l.field] = null;
        try {
          const $ = await sn(o);
          if (!$)
            b[l.field] = "CEP não encontrado. Preencha os campos manualmente.";
          else {
            const ue = l.cepFields || {}, me = Object.keys(ue);
            for (const ke of me) {
              const ne = ue[ke];
              if (!ne) continue;
              const de = n.formData[ne];
              (de == null || de === "") && s("update:field", ne, $[ke] ?? "");
            }
          }
        } finally {
          u[l.field] = !1;
        }
      }, 400));
    }
    const F = O(
      () => n.fields.filter((l) => l.visible === void 0 || l.visible === !0 ? !0 : typeof l.visible == "function" ? l.visible(n.formData, n.isEditing) : l.visible)
    );
    function E(l) {
      return n.disabled || l.disabledOnEdit && n.isEditing ? !0 : typeof l.disabled == "function" ? l.disabled(n.formData, n.isEditing) : !!l.disabled;
    }
    function z(l) {
      return Ut(l) ? l.value : l;
    }
    const I = O(() => {
      const l = n.isEditing ? "edit" : "create", f = n.fields.find(
        (o) => o.autofocus === !0 || o.autofocus === l
      );
      if (f) return f.field;
      const k = F.value.find((o) => !(o.type === "switch" || o.type === "fk" || o.type === "select" || o.type === "image" || o.disabled === !0 || o.disabledOnEdit && n.isEditing));
      return (k == null ? void 0 : k.field) ?? null;
    });
    function G(l) {
      return l.field === I.value;
    }
    function J(l) {
      if (l)
        return l.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function v(l) {
      if (!l) return "";
      const f = String(l).replace(/\D/g, "").slice(0, 14);
      return f.length <= 11 ? f.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : f.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function D(l, f) {
      const k = f.target.value.replace(/\D/g, "").slice(0, 14);
      s("update:field", l, k);
    }
    const P = we({});
    function V(l) {
      const f = n.formData[l.field];
      if (f == null) return null;
      const k = l.optionValue || "value";
      return (z(l.options) || []).find(
        ($) => $[k] === f
      ) ?? null;
    }
    function Z(l) {
      return P[l.field] || [];
    }
    function X(l, f) {
      const k = (f.query || "").toLowerCase(), o = z(l.options) || [], $ = l.optionLabel || "label";
      P[l.field] = o.filter(
        (ue) => String(ue[$] || "").toLowerCase().includes(k)
      );
    }
    function B(l, f) {
      const k = l.optionValue || "value";
      s("update:field", l.field, f.value[k]);
    }
    function q(l) {
      const f = n.formData[l.field];
      return f ? String(f).replace("#", "") : "FFFFFF";
    }
    function j(l, f) {
      s("update:field", l.field, `#${f}`);
    }
    function ee(l) {
      const f = l.dependsOn;
      return f ? (Array.isArray(f) ? f : [f]).map((o) => ({
        field: o.param || o.field,
        value: n.formData[o.field],
        required: o.required
      })) : void 0;
    }
    function oe(l) {
      if (typeof l.validate == "function") {
        const f = l.validate(n.formData[l.field]);
        r[l.field] = f || null;
      }
    }
    function te() {
      const l = [];
      for (const f of n.fields)
        if (typeof f.validate == "function") {
          const k = f.validate(n.formData[f.field]);
          r[f.field] = k || null, k && l.push(k);
        }
      return l;
    }
    function le() {
      Object.keys(r).forEach((l) => delete r[l]);
    }
    function W(l) {
      return Math.max(1, Math.floor(l.columns ?? n.columns));
    }
    function H(l, f) {
      const k = l.colSpan;
      return k == null || k === "full" ? f : k === 0.5 ? Math.max(1, Math.round(f / 2)) : Math.min(Math.max(1, Math.floor(k)), f);
    }
    function c(l, f) {
      return { "--w-col-span": H(l, W(f)) };
    }
    function p(l, f) {
      return H(l, W(f)) === W(f) ? "w-crud-form-col-full" : "w-crud-form-col-half";
    }
    const U = O(() => {
      var o, $, ue, me, ke;
      const l = /* @__PURE__ */ new Map(), f = [], k = /* @__PURE__ */ new Map();
      for (const ne of F.value) {
        const de = ((o = ne.fieldGroup) == null ? void 0 : o.id) ?? "__default__";
        l.has(de) || (l.set(de, {
          id: de,
          title: ($ = ne.fieldGroup) == null ? void 0 : $.title,
          description: (ue = ne.fieldGroup) == null ? void 0 : ue.description,
          columns: (me = ne.fieldGroup) == null ? void 0 : me.columns,
          fields: []
        }), f.push(de), ((ke = ne.fieldGroup) == null ? void 0 : ke.order) != null && k.set(de, ne.fieldGroup.order)), l.get(de).fields.push(ne);
      }
      return f.slice().sort((ne, de) => {
        const pe = k.get(ne), De = k.get(de);
        return pe != null && De != null ? pe - De : pe != null ? -1 : De != null ? 1 : f.indexOf(ne) - f.indexOf(de);
      }).map((ne) => l.get(ne));
    });
    return a({ validateAll: te, clearErrors: le }), (l, f) => (i(), m("div", rn, [
      (i(!0), m(ie, null, ce(U.value, (k) => (i(), m("div", {
        key: k.id,
        class: "w-crud-form-group"
      }, [
        k.title ? (i(), m("div", un, [
          h("h3", dn, T(k.title), 1),
          k.description ? (i(), m("p", cn, T(k.description), 1)) : S("", !0)
        ])) : S("", !0),
        h("div", {
          class: "w-crud-form-fields",
          style: Ce({ "--w-form-cols": W(k) })
        }, [
          (i(!0), m(ie, null, ce(k.fields, (o) => N(l.$slots, `field-${o.field}`, {
            key: o.field,
            field: o,
            formData: e.formData,
            isEditing: e.isEditing,
            setFormField: ($, ue) => s("update:field", $, ue)
          }, () => [
            o.type === "switch" ? (i(), m("div", {
              key: 0,
              class: "w-crud-form-switch",
              style: Ce(c(o, k))
            }, [
              Y(g(_t), {
                "model-value": e.formData[o.field],
                disabled: E(o),
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
              h("label", fn, T(o.switchLabel || o.label), 1)
            ], 4)) : o.type === "color" ? (i(), m("div", {
              key: 1,
              class: re(p(o, k)),
              style: Ce(c(o, k))
            }, [
              h("label", mn, [
                Fe(T(o.label) + " ", 1),
                o.required ? (i(), m("span", pn, "*")) : S("", !0)
              ]),
              h("div", vn, [
                Y(g(ea), {
                  "model-value": q(o),
                  disabled: E(o),
                  "onUpdate:modelValue": ($) => j(o, $)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                Y(g(ye), {
                  "model-value": e.formData[o.field],
                  class: "w-28",
                  maxlength: "7",
                  placeholder: "#000000",
                  disabled: E(o),
                  "onUpdate:modelValue": ($) => s("update:field", o.field, $)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
              ])
            ], 6)) : o.type === "image" ? (i(), m("div", {
              key: 2,
              class: re(p(o, k)),
              style: Ce(c(o, k))
            }, [
              h("label", gn, T(o.label), 1),
              N(l.$slots, `image-${o.field}`, {
                field: o,
                formData: e.formData
              }, () => [
                h("input", {
                  type: "file",
                  accept: o.accept || "image/*",
                  disabled: E(o),
                  onChange: ($) => {
                    var me;
                    const ue = ((me = $.target.files) == null ? void 0 : me[0]) ?? null;
                    s("update:field", o.field, ue);
                  }
                }, null, 40, hn)
              ])
            ], 6)) : o.type === "transfer" ? (i(), m("div", {
              key: 3,
              class: re(p(o, k)),
              style: Ce(c(o, k))
            }, [
              h("label", yn, [
                Fe(T(o.label) + " ", 1),
                o.required ? (i(), m("span", bn, "*")) : S("", !0)
              ]),
              Y(jt, {
                source: z(o.options) || [],
                selected: e.formData[o.field] || [],
                "track-by": o.optionValue || "id",
                "option-label": o.optionLabel || "nome",
                "search-fields": o.searchFields,
                disabled: E(o),
                "onUpdate:selected": ($) => s("update:field", o.field, $)
              }, null, 8, ["source", "selected", "track-by", "option-label", "search-fields", "disabled", "onUpdate:selected"])
            ], 6)) : (i(), m("div", {
              key: 4,
              class: re(p(o, k)),
              style: Ce(c(o, k))
            }, [
              h("label", wn, [
                Fe(T(o.label) + " ", 1),
                o.required ? (i(), m("span", kn, "*")) : S("", !0),
                u[o.field] ? (i(), m("i", $n)) : S("", !0)
              ]),
              (!o.type || o.type === "text") && o.mask ? he((i(), A(g(ye), {
                key: 0,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: G(o) || void 0,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
                [g(rt), { mask: J(o.mask) }]
              ]) : !o.type || o.type === "text" ? (i(), A(g(ye), {
                key: 1,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: G(o) || void 0,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "email" ? (i(), A(g(ye), {
                key: 2,
                "model-value": e.formData[o.field],
                type: "email",
                fluid: "",
                autofocus: G(o) || void 0,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "password" ? (i(), A(g(ta), {
                key: 3,
                "model-value": e.formData[o.field],
                fluid: "",
                "toggle-mask": "",
                feedback: o.feedback !== !1,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "number" ? (i(), A(g(vt), {
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
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "currency" && o.fillFromRight ? (i(), A(Bt, {
                key: 5,
                "model-value": e.formData[o.field],
                decimals: o.decimals ?? 2,
                currency: "",
                prefix: o.prefix,
                suffix: o.suffix,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "decimals", "prefix", "suffix", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "currency" ? (i(), A(g(vt), {
                key: 6,
                "model-value": e.formData[o.field],
                fluid: "",
                mode: "currency",
                currency: "BRL",
                locale: "pt-BR",
                min: o.min,
                max: o.max,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "select" ? (i(), A(g(Qt), {
                key: 7,
                "model-value": e.formData[o.field],
                fluid: "",
                options: z(o.options),
                "option-label": o.optionLabel || "label",
                "option-value": o.optionValue || "value",
                "show-clear": o.showClear !== !1,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "autocomplete" ? (i(), A(g(Mt), {
                key: 8,
                "model-value": V(o),
                fluid: "",
                suggestions: Z(o),
                "option-label": o.optionLabel || "label",
                placeholder: o.placeholder,
                disabled: E(o),
                onComplete: ($) => X(o, $),
                onItemSelect: ($) => B(o, $),
                onClear: ($) => s("update:field", o.field, null)
              }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : o.type === "fk" ? (i(), A(Ot, {
                key: 9,
                "model-value": e.formData[o.field],
                endpoint: o.endpoint,
                "endpoint-params": o.endpointParams,
                drilldown: ee(o),
                "blocked-placeholder": o.blockedPlaceholder,
                "option-label": o.optionLabel || "nome",
                placeholder: o.placeholder,
                disabled: E(o),
                "show-clear": o.showClear !== !1,
                "dialog-header": o.label,
                "crud-fields": o.crudFields,
                "crud-columns": o.crudColumns,
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "endpoint", "endpoint-params", "drilldown", "blocked-placeholder", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : o.type === "date" ? (i(), A(g(gt), {
                key: 10,
                "model-value": e.formData[o.field],
                fluid: "",
                "date-format": o.dateFormat || "dd/mm/yy",
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "datetime" ? (i(), A(g(gt), {
                key: 11,
                "model-value": e.formData[o.field],
                fluid: "",
                "show-time": "",
                "hour-format": o.hourFormat || "24",
                "date-format": o.dateFormat || "dd/mm/yy",
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "cpf_cnpj" ? (i(), A(g(ye), {
                key: 12,
                "model-value": v(e.formData[o.field]),
                fluid: "",
                maxlength: "18",
                placeholder: o.placeholder || "000.000.000-00",
                disabled: E(o),
                invalid: !!r[o.field],
                onInput: ($) => D(o.field, $),
                onBlur: ($) => oe(o)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : o.type === "mask" ? he((i(), A(g(ye), {
                key: 13,
                "model-value": e.formData[o.field],
                fluid: "",
                placeholder: o.placeholder,
                disabled: E(o),
                invalid: !!r[o.field],
                "onUpdate:modelValue": ($) => s("update:field", o.field, $),
                onBlur: ($) => oe(o)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
                [g(rt), { mask: J(o.mask) }]
              ]) : o.type === "cep" ? he((i(), A(g(ye), {
                key: 14,
                "model-value": e.formData[o.field],
                fluid: "",
                placeholder: o.placeholder || "00000-000",
                disabled: E(o),
                invalid: !!b[o.field],
                onInput: ($) => x(o, $)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput"])), [
                [g(rt), { mask: "#####-###" }]
              ]) : o.type === "textarea" ? (i(), A(g(Xt), {
                key: 15,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: G(o) || void 0,
                rows: o.rows || 3,
                placeholder: o.placeholder,
                disabled: E(o),
                "onUpdate:modelValue": ($) => s("update:field", o.field, $)
              }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : S("", !0),
              b[o.field] ? (i(), m("small", Cn, T(b[o.field]), 1)) : r[o.field] ? (i(), m("small", Dn, T(r[o.field]), 1)) : S("", !0)
            ], 6))
          ])), 128))
        ], 4)
      ]))), 128))
    ]));
  }
}), Sn = { class: "w-crud-form-footer" }, pt = /* @__PURE__ */ fe({
  __name: "WCrudFormDialog",
  props: {
    visible: { type: Boolean },
    title: {},
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    saving: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    width: { default: "480px" },
    formColumns: { default: void 0 }
  },
  emits: ["update:visible", "update:field", "save"],
  setup(e, { emit: a }) {
    const t = e, n = a, s = K(null);
    function r() {
      s.value ? s.value.validateAll().length === 0 && n("save") : n("save");
    }
    return Qe(
      () => t.visible,
      (u) => {
        u && s.value && s.value.clearErrors();
      }
    ), (u, b) => (i(), A(g(Vt), {
      visible: e.visible,
      header: e.title,
      style: Ce({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": b[2] || (b[2] = (d) => n("update:visible", d))
    }, {
      default: se(() => [
        h("form", {
          class: "w-crud-form",
          onSubmit: qt(r, ["prevent"])
        }, [
          Y(xn, {
            ref_key: "rendererRef",
            ref: s,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            disabled: e.disabled,
            columns: e.formColumns,
            "onUpdate:field": b[0] || (b[0] = (d, x) => n("update:field", d, x))
          }, ut({ _: 2 }, [
            ce(e.fields, (d) => ({
              name: `field-${d.field}`,
              fn: se((x) => [
                N(u.$slots, `field-${d.field}`, dt(ct(x)))
              ])
            })),
            ce(e.fields.filter((d) => d.type === "image"), (d) => ({
              name: `image-${d.field}`,
              fn: se((x) => [
                N(u.$slots, `image-${d.field}`, dt(ct(x)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing", "disabled", "columns"]),
          h("div", Sn, [
            N(u.$slots, "footer", {
              saving: e.saving,
              disabled: e.disabled
            }, () => [
              Y(g(ae), {
                type: "button",
                label: e.disabled ? "Fechar" : "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: b[1] || (b[1] = (d) => n("update:visible", !1))
              }, null, 8, ["label", "disabled"]),
              e.disabled ? S("", !0) : (i(), A(g(ae), {
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
function Pn(e, a) {
  const t = a[e.field];
  return e.format ? e.format(t, a) : t == null ? "" : typeof t == "boolean" ? t ? "Sim" : "Não" : String(t);
}
function Ct(e, a) {
  return e.includes('"') || e.includes(a) || e.includes(`
`) || e.includes("\r") ? `"${e.replace(/"/g, '""')}"` : e;
}
function Vn(e, a, t = {}) {
  const n = t.separator ?? ";", s = a.map((u) => Ct(u.header, n)).join(n), r = e.map(
    (u) => a.map((b) => Ct(Pn(b, u), n)).join(n)
  );
  return "\uFEFF" + [s, ...r].join(`\r
`);
}
function Mn(e, a = "export.csv") {
  const t = new Blob([e], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(t), s = document.createElement("a");
  s.href = n, s.download = a, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(n);
}
const En = { class: "w-crud" }, Fn = {
  key: 0,
  class: "w-crud-header"
}, An = { class: "w-crud-header-content" }, Rn = { class: "w-crud-title" }, In = {
  key: 0,
  class: "w-crud-subtitle"
}, Tn = { class: "w-crud-header-actions" }, Ln = {
  key: 0,
  class: "w-crud-kpis"
}, zn = { class: "w-crud-kpi-content" }, Nn = { class: "w-crud-kpi-label" }, Yn = { class: "w-crud-kpi-value" }, On = { class: "w-crud-content-main" }, Bn = {
  key: 0,
  class: "w-crud-table"
}, jn = { class: "w-crud-toolbar" }, Wn = { class: "w-crud-toolbar-start" }, Un = { class: "w-crud-toolbar-end" }, qn = {
  key: 1,
  class: "w-crud-view-toggle"
}, Hn = { class: "w-crud-actions" }, Kn = {
  key: 1,
  class: "w-crud-cards-wrap"
}, Gn = { class: "w-crud-toolbar w-crud-toolbar--standalone" }, Jn = { class: "w-crud-toolbar-start" }, Zn = { class: "w-crud-toolbar-end" }, Xn = {
  key: 1,
  class: "w-crud-view-toggle"
}, Qn = {
  key: 0,
  class: "w-crud-cards-loading"
}, _n = {
  key: 2,
  class: "w-crud-cards"
}, eo = ["onClick", "onDblclick", "onContextmenu"], to = { class: "w-crud-card-body" }, ao = {
  key: 0,
  class: "w-crud-card-label"
}, no = { class: "w-crud-card-value" }, oo = {
  key: 0,
  class: "w-crud-card-actions"
}, lo = {
  key: 0,
  class: "w-crud-rail"
}, so = {
  key: 1,
  class: "w-crud-rail-sep"
}, io = {
  key: 2,
  class: "w-crud-rail-sep"
}, ro = /* @__PURE__ */ fe({
  __name: "WCrudView",
  props: {
    crud: {},
    title: {},
    subtitle: {},
    showSearch: { type: Boolean, default: !0 },
    showHeader: { type: Boolean, default: !0 },
    dialogWidth: { default: "480px" },
    formColumns: {},
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
  setup(e, { emit: a }) {
    const t = e, n = a, s = Ht(), { formatNumber: r } = mt(), u = K({}), b = K(t.defaultView);
    function d(c) {
      return b.value === c;
    }
    function x(c) {
      b.value = c;
    }
    const F = O(
      () => (t.crud.pagination.page - 1) * t.crud.pagination.pageSize
    ), E = O(
      () => t.crud.config.columns.filter((c) => c.visible !== !1).map((c) => c.type === "number" && !c.align ? { ...c, align: "right" } : c.type === "currency" && !c.align ? { ...c, align: "right" } : c)
    );
    function z(c) {
      if (c.align === "right") return "text-right";
      if (c.align === "center") return "text-center";
    }
    const I = O(() => E.value.slice(0, t.cardFields)), G = O(() => {
      const c = [];
      return t.crud.config.canEdit !== !1 && c.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), t.crud.config.canCreate !== !1 && c.push({
        action: "duplicate",
        icon: "pi pi-copy",
        tooltip: "Duplicar",
        severity: "info"
      }), t.crud.config.canDelete !== !1 && c.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), c;
    }), J = O(
      () => t.crud.config.rowActions ?? G.value
    ), v = O(() => J.value.length > 0 || !!s["row-actions"]);
    function D(c, p) {
      if (c.handler) {
        c.handler(p);
        return;
      }
      c.action === "edit" ? t.crud.openEditDialog(p) : c.action === "view" ? t.crud.openViewDialog(p) : c.action === "duplicate" ? t.crud.openDuplicateDialog(p) : c.action === "delete" && t.crud.confirmDelete(p);
    }
    function P(c, p) {
      return c.visible ? c.visible(p) : !0;
    }
    function V(c, p) {
      return c.disabled ? c.disabled(p) : !1;
    }
    const Z = O(() => {
      const c = [];
      return t.showKpi && c.push({
        icon: t.kpiIcon,
        label: t.kpiLabel,
        value: r(t.crud.pagination.rows, 0)
      }), c.push(...t.extraKpis), c;
    });
    O(() => t.crud.config.labels ?? {});
    const X = O(() => t.crud.config.canCreate !== !1), B = K(null), q = K(null);
    function j(c) {
      B.value = c;
    }
    function ee(c) {
      var p;
      t.contextMenu && (B.value = c.data, (p = q.value) == null || p.show(c.originalEvent));
    }
    function oe(c, p) {
      var U;
      t.contextMenu && (c.preventDefault(), B.value = p, (U = q.value) == null || U.show(c));
    }
    const te = O(() => {
      const c = B.value;
      if (!c) return [];
      const p = [
        {
          label: "Ver detalhes",
          icon: "pi pi-eye",
          command: () => t.crud.openViewDialog(c)
        }
      ];
      for (const U of J.value)
        P(U, c) && p.push({
          label: U.tooltip ?? U.action,
          icon: U.icon,
          class: U.severity === "danger" ? "w-crud-ctx-danger" : void 0,
          disabled: V(U, c),
          command: () => D(U, c)
        });
      return t.showPrint && p.push({
        label: "Imprimir",
        icon: "pi pi-print",
        command: () => n("print", c)
      }), t.exportCsv && (p.push({ separator: !0 }), p.push({
        label: t.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
        icon: "pi pi-download",
        command: () => H()
      })), p;
    });
    function le() {
      B.value && n("print", B.value);
    }
    const W = K(!1);
    async function H() {
      if (!W.value) {
        W.value = !0;
        try {
          const c = t.csvScope === "page" ? t.crud.items.value : await t.crud.fetchAll(t.csvPageSize), p = Vn(c, E.value);
          Mn(p, t.csvFilename);
        } finally {
          W.value = !1;
        }
      }
    }
    return Kt(() => {
      t.autoInit && t.crud.init();
    }), (c, p) => {
      const U = xt("tooltip");
      return i(), m("div", En, [
        e.showHeader ? (i(), m("div", Fn, [
          h("div", An, [
            h("h1", Rn, T(e.title), 1),
            e.subtitle ? (i(), m("p", In, T(e.subtitle), 1)) : S("", !0)
          ]),
          h("div", Tn, [
            N(c.$slots, "header-actions"),
            X.value && !e.actionRail ? (i(), A(g(ae), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: p[0] || (p[0] = (l) => e.crud.openCreateDialog())
            })) : S("", !0)
          ])
        ])) : S("", !0),
        N(c.$slots, "before-table", {}, () => [
          Z.value.length ? (i(), m("div", Ln, [
            (i(!0), m(ie, null, ce(Z.value, (l, f) => (i(), m("div", {
              key: f,
              class: "w-crud-kpi"
            }, [
              h("div", {
                class: re(["w-crud-kpi-icon", l.severity ? `w-crud-kpi-icon--${l.severity}` : ""])
              }, [
                h("i", {
                  class: re([l.icon]),
                  style: Ce(l.color ? `color: ${l.color}` : "")
                }, null, 6)
              ], 2),
              h("div", zn, [
                h("div", Nn, T(l.label), 1),
                h("div", Yn, T(l.value), 1)
              ])
            ]))), 128))
          ])) : S("", !0)
        ]),
        h("div", {
          class: re(["w-crud-content", { "w-crud-content--rail": e.actionRail }])
        }, [
          h("div", On, [
            b.value === "table" ? (i(), m("div", Bn, [
              Y(g(St), {
                value: e.crud.items.value,
                loading: e.crud.loading.value,
                "expanded-rows": u.value,
                "onUpdate:expandedRows": p[4] || (p[4] = (l) => u.value = l),
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
                selection: e.actionRail || e.contextMenu ? B.value : void 0,
                "selection-mode": e.actionRail || e.contextMenu ? "single" : void 0,
                "context-menu": e.contextMenu,
                "context-menu-selection": e.contextMenu ? B.value : void 0,
                "onUpdate:selection": p[5] || (p[5] = (l) => B.value = l),
                "onUpdate:contextMenuSelection": p[6] || (p[6] = (l) => B.value = l),
                onRowContextmenu: ee,
                onPage: e.crud.onPage,
                onSort: p[7] || (p[7] = (l) => e.crud.onSort({ sortField: l.sortField, sortOrder: l.sortOrder })),
                onRowExpand: p[8] || (p[8] = (l) => n("row-expand", l.data)),
                onRowCollapse: p[9] || (p[9] = (l) => n("row-collapse", l.data))
              }, ut({
                header: se(() => [
                  h("div", jn, [
                    h("div", Wn, [
                      e.showSearch ? (i(), A(g(qe), { key: 0 }, {
                        default: se(() => [
                          Y(g(He), { class: "pi pi-search" }),
                          Y(g(ye), {
                            "model-value": e.crud.search.value,
                            placeholder: "Buscar...",
                            class: "w-72",
                            onInput: e.crud.onSearch
                          }, null, 8, ["model-value", "onInput"])
                        ]),
                        _: 1
                      })) : S("", !0),
                      N(c.$slots, "toolbar-start"),
                      N(c.$slots, "toolbar-filters")
                    ]),
                    h("div", Un, [
                      N(c.$slots, "toolbar-actions"),
                      e.exportCsv ? he((i(), A(g(ae), {
                        key: 0,
                        icon: "pi pi-download",
                        text: "",
                        size: "small",
                        loading: W.value,
                        onClick: H
                      }, null, 8, ["loading"])), [
                        [
                          U,
                          e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : S("", !0),
                      e.viewToggle ? (i(), m("div", qn, [
                        Y(g(ae), {
                          icon: "pi pi-table",
                          size: "small",
                          text: !d("table"),
                          outlined: d("table"),
                          onClick: p[1] || (p[1] = (l) => x("table"))
                        }, null, 8, ["text", "outlined"]),
                        Y(g(ae), {
                          icon: "pi pi-th-large",
                          size: "small",
                          text: !d("cards"),
                          outlined: d("cards"),
                          onClick: p[2] || (p[2] = (l) => x("cards"))
                        }, null, 8, ["text", "outlined"])
                      ])) : S("", !0),
                      !e.showHeader && X.value && !e.actionRail ? (i(), A(g(ae), {
                        key: 2,
                        label: "Novo",
                        icon: "pi pi-plus",
                        onClick: p[3] || (p[3] = (l) => e.crud.openCreateDialog())
                      })) : S("", !0)
                    ])
                  ])
                ]),
                empty: se(() => [
                  N(c.$slots, "empty", {}, () => [
                    p[17] || (p[17] = h("div", { class: "w-crud-empty" }, [
                      h("div", { class: "w-crud-empty-icon" }, [
                        h("i", { class: "pi pi-inbox" })
                      ]),
                      h("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                      h("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                    ], -1))
                  ])
                ]),
                default: se(() => [
                  e.expandable ? (i(), A(g(Oe), {
                    key: 0,
                    expander: "",
                    style: { width: "3rem" }
                  })) : S("", !0),
                  (i(!0), m(ie, null, ce(E.value, (l) => (i(), A(g(Oe), {
                    key: l.field,
                    field: l.field,
                    header: l.header,
                    sortable: l.sortable,
                    style: Ce(l.style),
                    "header-class": z(l),
                    "body-class": z(l)
                  }, {
                    body: se(({ data: f }) => [
                      N(c.$slots, `column-${l.field}`, {
                        data: f,
                        value: f[l.field]
                      }, () => [
                        Y(tt, {
                          column: l,
                          value: f[l.field],
                          "row-data": f
                        }, null, 8, ["column", "value", "row-data"])
                      ])
                    ]),
                    _: 2
                  }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
                  v.value && !e.actionRail ? (i(), A(g(Oe), {
                    key: 1,
                    "header-class": "w-crud-actions-header",
                    style: Ce({ width: `${(J.value.length + (g(s)["row-actions"] ? 1 : 0)) * 2.5 + 1}rem` })
                  }, {
                    body: se(({ data: l }) => [
                      h("div", Hn, [
                        (i(!0), m(ie, null, ce(J.value, (f) => (i(), m(ie, {
                          key: f.action
                        }, [
                          P(f, l) ? he((i(), A(g(ae), {
                            key: 0,
                            icon: f.icon,
                            text: "",
                            rounded: "",
                            size: "small",
                            severity: f.severity,
                            disabled: V(f, l),
                            onClick: (k) => D(f, l)
                          }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                            [
                              U,
                              f.tooltip,
                              void 0,
                              { top: !0 }
                            ]
                          ]) : S("", !0)
                        ], 64))), 128)),
                        N(c.$slots, "row-actions", {
                          data: l,
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
                  fn: se((l) => [
                    N(c.$slots, "expansion", {
                      data: l.data
                    })
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "selection", "selection-mode", "context-menu", "context-menu-selection", "onPage"])
            ])) : (i(), m("div", Kn, [
              h("div", Gn, [
                h("div", Jn, [
                  e.showSearch ? (i(), A(g(qe), { key: 0 }, {
                    default: se(() => [
                      Y(g(He), { class: "pi pi-search" }),
                      Y(g(ye), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : S("", !0),
                  N(c.$slots, "toolbar-start"),
                  N(c.$slots, "toolbar-filters")
                ]),
                h("div", Zn, [
                  N(c.$slots, "toolbar-actions"),
                  e.exportCsv ? he((i(), A(g(ae), {
                    key: 0,
                    icon: "pi pi-download",
                    text: "",
                    size: "small",
                    loading: W.value,
                    onClick: H
                  }, null, 8, ["loading"])), [
                    [
                      U,
                      e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                      void 0,
                      { top: !0 }
                    ]
                  ]) : S("", !0),
                  e.viewToggle ? (i(), m("div", Xn, [
                    Y(g(ae), {
                      icon: "pi pi-table",
                      size: "small",
                      text: !d("table"),
                      outlined: d("table"),
                      onClick: p[10] || (p[10] = (l) => x("table"))
                    }, null, 8, ["text", "outlined"]),
                    Y(g(ae), {
                      icon: "pi pi-th-large",
                      size: "small",
                      text: !d("cards"),
                      outlined: d("cards"),
                      onClick: p[11] || (p[11] = (l) => x("cards"))
                    }, null, 8, ["text", "outlined"])
                  ])) : S("", !0),
                  !e.showHeader && X.value && !e.actionRail ? (i(), A(g(ae), {
                    key: 2,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: p[12] || (p[12] = (l) => e.crud.openCreateDialog())
                  })) : S("", !0)
                ])
              ]),
              e.crud.loading.value ? (i(), m("div", Qn, [...p[18] || (p[18] = [
                h("i", { class: "pi pi-spin pi-spinner" }, null, -1)
              ])])) : e.crud.items.value.length ? (i(), m("div", _n, [
                (i(!0), m(ie, null, ce(e.crud.items.value, (l, f) => (i(), m("div", {
                  key: l[e.crud.config.pk || "id"] ?? f,
                  class: re(["w-crud-card", { "w-crud-card--selected": B.value === l }]),
                  onClick: (k) => j(l),
                  onDblclick: (k) => e.crud.config.canEdit !== !1 && e.crud.openEditDialog(l),
                  onContextmenu: (k) => oe(k, l)
                }, [
                  h("div", to, [
                    (i(!0), m(ie, null, ce(I.value, (k, o) => (i(), m("div", {
                      key: k.field,
                      class: re(["w-crud-card-row", { "w-crud-card-row--title": o === 0 }])
                    }, [
                      o !== 0 ? (i(), m("span", ao, T(k.header), 1)) : S("", !0),
                      h("span", no, [
                        N(c.$slots, `column-${k.field}`, {
                          data: l,
                          value: l[k.field]
                        }, () => [
                          Y(tt, {
                            column: k,
                            value: l[k.field],
                            "row-data": l
                          }, null, 8, ["column", "value", "row-data"])
                        ])
                      ])
                    ], 2))), 128))
                  ]),
                  v.value && !e.actionRail ? (i(), m("div", oo, [
                    (i(!0), m(ie, null, ce(J.value, (k) => (i(), m(ie, {
                      key: k.action
                    }, [
                      P(k, l) ? he((i(), A(g(ae), {
                        key: 0,
                        icon: k.icon,
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: k.severity,
                        disabled: V(k, l),
                        onClick: (o) => D(k, l)
                      }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                        [
                          U,
                          k.tooltip,
                          void 0,
                          { top: !0 }
                        ]
                      ]) : S("", !0)
                    ], 64))), 128)),
                    N(c.$slots, "row-actions", {
                      data: l,
                      crud: e.crud
                    })
                  ])) : S("", !0)
                ], 42, eo))), 128))
              ])) : N(c.$slots, "empty", { key: 1 }, () => [
                p[19] || (p[19] = Gt('<div class="w-crud-empty"><div class="w-crud-empty-icon"><i class="pi pi-inbox"></i></div><p class="w-crud-empty-title">Nenhum registro encontrado</p><p class="w-crud-empty-text">Tente ajustar sua busca ou crie um novo registro</p></div>', 1))
              ]),
              e.crud.items.value.length ? (i(), A(g(Jt), {
                key: 3,
                rows: e.crud.pagination.pageSize,
                "total-records": e.crud.pagination.rows,
                first: F.value,
                "rows-per-page-options": [10, 20, 50],
                template: "CurrentPageReport PrevPageLink NextPageLink",
                "current-page-report-template": "Página {currentPage} de {totalPages}",
                class: "w-crud-paginator",
                onPage: e.crud.onPage
              }, null, 8, ["rows", "total-records", "first", "onPage"])) : S("", !0)
            ]))
          ]),
          e.actionRail ? (i(), m("aside", lo, [
            X.value ? he((i(), A(g(ae), {
              key: 0,
              icon: "pi pi-plus",
              rounded: "",
              onClick: p[13] || (p[13] = (l) => e.crud.openCreateDialog())
            }, null, 512)), [
              [
                U,
                "Novo",
                void 0,
                { left: !0 }
              ]
            ]) : S("", !0),
            X.value && J.value.length ? (i(), m("div", so)) : S("", !0),
            (i(!0), m(ie, null, ce(J.value, (l) => (i(), m(ie, {
              key: l.action
            }, [
              !B.value || P(l, B.value) ? he((i(), A(g(ae), {
                key: 0,
                icon: l.icon,
                text: "",
                rounded: "",
                severity: l.severity,
                disabled: !B.value || V(l, B.value),
                onClick: (f) => B.value && D(l, B.value)
              }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                [
                  U,
                  l.tooltip,
                  void 0,
                  { left: !0 }
                ]
              ]) : S("", !0)
            ], 64))), 128)),
            N(c.$slots, "rail-actions", {
              selected: B.value,
              crud: e.crud
            }),
            e.showPrint || e.exportCsv ? (i(), m("div", io)) : S("", !0),
            e.showPrint ? he((i(), A(g(ae), {
              key: 3,
              icon: "pi pi-print",
              text: "",
              rounded: "",
              disabled: !B.value,
              onClick: le
            }, null, 8, ["disabled"])), [
              [
                U,
                "Imprimir",
                void 0,
                { left: !0 }
              ]
            ]) : S("", !0),
            e.exportCsv ? he((i(), A(g(ae), {
              key: 4,
              icon: "pi pi-download",
              text: "",
              rounded: "",
              loading: W.value,
              onClick: H
            }, null, 8, ["loading"])), [
              [
                U,
                e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                void 0,
                { left: !0 }
              ]
            ]) : S("", !0)
          ])) : S("", !0)
        ], 2),
        e.contextMenu ? (i(), A(g(Zt), {
          key: 1,
          ref_key: "cm",
          ref: q,
          model: te.value
        }, null, 8, ["model"])) : S("", !0),
        N(c.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => {
          var l;
          return [
            Y(pt, {
              visible: e.crud.dialogVisible.value,
              title: e.crud.dialogTitle.value,
              fields: e.crud.config.form,
              "form-data": e.crud.formData,
              "is-editing": e.crud.isEditing.value,
              saving: e.crud.saving.value,
              disabled: ((l = e.crud.viewMode) == null ? void 0 : l.value) ?? !1,
              width: e.dialogWidth,
              "form-columns": e.formColumns ?? e.crud.config.formColumns,
              "onUpdate:visible": p[14] || (p[14] = (f) => {
                e.crud.dialogVisible.value = f, f || (e.crud.editingItem.value = null);
              }),
              "onUpdate:field": p[15] || (p[15] = (f, k) => e.crud.setFormField(f, k)),
              onSave: p[16] || (p[16] = (f) => e.crud.save())
            }, ut({ _: 2 }, [
              ce(e.crud.config.form, (f) => ({
                name: `field-${f.field}`,
                fn: se((k) => [
                  N(c.$slots, `field-${f.field}`, dt(ct(k)))
                ])
              }))
            ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "disabled", "width", "form-columns"])
          ];
        })
      ]);
    };
  }
}), uo = /* @__PURE__ */ fe({
  __name: "WStatusTag",
  props: {
    value: {},
    map: {}
  },
  setup(e) {
    const a = e, t = {
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
    }, n = O(() => (a.map ?? t)[a.value] ?? { label: a.value, severity: "secondary" });
    return (s, r) => (i(), A(g(Pt), {
      value: n.value.label,
      severity: n.value.severity
    }, null, 8, ["value", "severity"]));
  }
}), co = { class: "w-page-header" }, fo = { class: "w-page-header-content" }, mo = { class: "w-page-header-title" }, po = {
  key: 0,
  class: "w-page-header-subtitle"
}, vo = { class: "w-page-header-actions" }, Hl = /* @__PURE__ */ fe({
  __name: "WPageHeader",
  props: {
    title: {},
    subtitle: {},
    actionLabel: {},
    actionIcon: {}
  },
  emits: ["action"],
  setup(e, { emit: a }) {
    const t = a;
    return (n, s) => (i(), m("div", co, [
      h("div", fo, [
        h("h2", mo, T(e.title), 1),
        e.subtitle ? (i(), m("p", po, T(e.subtitle), 1)) : S("", !0)
      ]),
      h("div", vo, [
        N(n.$slots, "actions"),
        e.actionLabel ? (i(), A(g(ae), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: s[0] || (s[0] = (r) => t("action"))
        }, null, 8, ["label", "icon"])) : S("", !0)
      ])
    ]));
  }
}), go = { class: "w-empty-state" }, ho = { class: "w-empty-state-icon" }, yo = { class: "w-empty-state-title" }, bo = {
  key: 0,
  class: "w-empty-state-description"
}, Kl = /* @__PURE__ */ fe({
  __name: "WEmptyState",
  props: {
    icon: {},
    title: {},
    description: {},
    actionLabel: {},
    actionIcon: {}
  },
  emits: ["action"],
  setup(e, { emit: a }) {
    const t = a;
    return (n, s) => (i(), m("div", go, [
      h("div", ho, [
        h("i", {
          class: re(e.icon)
        }, null, 2)
      ]),
      h("p", yo, T(e.title), 1),
      e.description ? (i(), m("p", bo, T(e.description), 1)) : S("", !0),
      e.actionLabel ? (i(), A(g(ae), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: s[0] || (s[0] = (r) => t("action"))
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
const wo = Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
function ko() {
  return Le(wo);
}
const $o = { class: "w-detail-header" }, Co = { class: "w-detail-header-left" }, Do = { class: "w-detail-header-content" }, xo = { class: "w-detail-header-title" }, So = {
  key: 0,
  class: "w-detail-header-subtitle"
}, Po = { class: "w-detail-header-actions" }, Gl = /* @__PURE__ */ fe({
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
    const a = e, t = ko();
    function n() {
      a.backTo ? t.push(typeof a.backTo == "string" ? { name: a.backTo } : a.backTo) : a.backRoute ? t.push({ name: a.backRoute }) : t.back();
    }
    return (s, r) => (i(), m("div", $o, [
      h("div", Co, [
        Y(g(ae), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: n
        }),
        e.icon ? (i(), m("i", {
          key: 0,
          class: re([e.icon, "w-detail-header-icon"])
        }, null, 2)) : S("", !0),
        h("div", Do, [
          h("h2", xo, T(e.title), 1),
          e.subtitle ? (i(), m("p", So, T(e.subtitle), 1)) : S("", !0)
        ]),
        e.status ? (i(), A(uo, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : S("", !0)
      ]),
      h("div", Po, [
        N(s.$slots, "actions")
      ])
    ]));
  }
}), Vo = { class: "w-info-card" }, Mo = {
  key: 0,
  class: "w-info-card-title"
}, Eo = { class: "w-info-card-grid" }, Fo = { class: "w-info-card-label" }, Ao = { class: "w-info-card-value" }, Jl = /* @__PURE__ */ fe({
  __name: "WInfoCard",
  props: {
    title: {},
    fields: {}
  },
  setup(e) {
    const { formatCurrency: a, formatDate: t, formatNumber: n } = mt();
    function s(r) {
      const u = r.value;
      return u == null || u === "" ? "-" : r.format === "currency" ? a(Number(u)) : r.format === "date" ? t(String(u)) : r.format === "datetime" ? t(String(u), "DD/MM/YYYY HH:mm") : r.format === "number" ? n(Number(u)) : String(u);
    }
    return (r, u) => (i(), m("div", Vo, [
      e.title ? (i(), m("h3", Mo, T(e.title), 1)) : S("", !0),
      h("div", Eo, [
        (i(!0), m(ie, null, ce(e.fields, (b) => (i(), m("div", {
          key: b.label,
          class: "w-info-card-field"
        }, [
          h("span", Fo, T(b.label), 1),
          h("span", Ao, T(s(b)), 1)
        ]))), 128))
      ])
    ]));
  }
}), Ro = {
  key: 0,
  class: "w-kpi-card__loading"
}, Io = { class: "w-kpi-card__loading-content" }, To = { class: "w-kpi-card__header" }, Lo = {
  key: 0,
  class: "w-kpi-card__icon"
}, zo = {
  key: 1,
  class: "w-kpi-card__trend"
}, No = { class: "w-kpi-card__content" }, Yo = { class: "w-kpi-card__label" }, Oo = { class: "w-kpi-card__value" }, Bo = {
  key: 0,
  class: "w-kpi-card__hint"
}, jo = {
  key: 0,
  class: "w-kpi-card__footer"
}, Wo = /* @__PURE__ */ fe({
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
    return (a, t) => (i(), m("article", {
      class: re(["w-kpi-card", e.severity ? `w-kpi-card--${e.severity}` : ""])
    }, [
      e.loading ? (i(), m("div", Ro, [
        Y(g(Ze), {
          shape: "circle",
          size: "2.75rem"
        }),
        h("div", Io, [
          Y(g(Ze), {
            width: "6rem",
            height: "0.75rem"
          }),
          Y(g(Ze), {
            width: "7.5rem",
            height: "1.5rem"
          }),
          Y(g(Ze), {
            width: "5rem",
            height: "0.75rem"
          })
        ])
      ])) : (i(), m(ie, { key: 1 }, [
        h("div", To, [
          e.icon || a.$slots.icon ? (i(), m("div", Lo, [
            N(a.$slots, "icon", {}, () => [
              e.icon ? (i(), m("i", {
                key: 0,
                class: re(e.icon)
              }, null, 2)) : S("", !0)
            ])
          ])) : S("", !0),
          e.trend || a.$slots.trend ? (i(), m("div", zo, [
            N(a.$slots, "trend", {}, () => [
              e.trend ? (i(), m("span", {
                key: 0,
                class: re(["w-kpi-card__trend-badge", e.trend.direction ? `w-kpi-card__trend-badge--${e.trend.direction}` : ""])
              }, T(e.trend.value), 3)) : S("", !0)
            ])
          ])) : S("", !0)
        ]),
        h("div", No, [
          h("p", Yo, T(e.label), 1),
          h("div", Oo, [
            N(a.$slots, "value", {}, () => [
              Fe(T(e.value), 1)
            ])
          ]),
          e.hint || a.$slots.hint ? (i(), m("p", Bo, [
            N(a.$slots, "hint", {}, () => [
              Fe(T(e.hint), 1)
            ])
          ])) : S("", !0)
        ]),
        a.$slots.footer ? (i(), m("footer", jo, [
          N(a.$slots, "footer")
        ])) : S("", !0)
      ], 64))
    ], 2));
  }
}), Zl = /* @__PURE__ */ fe({
  __name: "WKpiGrid",
  props: {
    items: { default: () => [] },
    columns: { default: 4 },
    dense: { type: Boolean, default: !1 }
  },
  setup(e) {
    const a = e, t = O(() => [
      a.columns === "auto" ? "w-kpi-grid--auto" : `w-kpi-grid--cols-${a.columns}`,
      { "w-kpi-grid--dense": a.dense }
    ]);
    return (n, s) => (i(), m("div", {
      class: re(["w-kpi-grid", t.value])
    }, [
      n.$slots.item ? (i(!0), m(ie, { key: 0 }, ce(e.items, (r, u) => N(n.$slots, "item", {
        key: u,
        item: r,
        index: u
      })), 128)) : (i(!0), m(ie, { key: 1 }, ce(e.items, (r, u) => (i(), A(Wo, {
        key: u,
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
}), Uo = { class: "w-section-header__main" }, qo = {
  key: 0,
  class: "w-section-header__icon"
}, Ho = { class: "w-section-header__content" }, Ko = { class: "w-section-header__title-row" }, Go = { class: "w-section-header__title" }, Jo = {
  key: 0,
  class: "w-section-header__subtitle"
}, Zo = {
  key: 0,
  class: "w-section-header__actions"
}, Xl = /* @__PURE__ */ fe({
  __name: "WSectionHeader",
  props: {
    title: {},
    subtitle: {},
    icon: {},
    compact: { type: Boolean }
  },
  setup(e) {
    return (a, t) => (i(), m("div", {
      class: re(["w-section-header", { "w-section-header--compact": e.compact }])
    }, [
      h("div", Uo, [
        e.icon || a.$slots.icon ? (i(), m("div", qo, [
          N(a.$slots, "icon", {}, () => [
            e.icon ? (i(), m("i", {
              key: 0,
              class: re(e.icon)
            }, null, 2)) : S("", !0)
          ])
        ])) : S("", !0),
        h("div", Ho, [
          h("div", Ko, [
            h("h3", Go, T(e.title), 1),
            N(a.$slots, "meta")
          ]),
          e.subtitle ? (i(), m("p", Jo, T(e.subtitle), 1)) : S("", !0)
        ])
      ]),
      a.$slots.actions ? (i(), m("div", Zo, [
        N(a.$slots, "actions")
      ])) : S("", !0)
    ], 2));
  }
}), Xo = {
  key: 0,
  class: "w-form-section__header"
}, Qo = { class: "w-form-section__content" }, _o = { class: "w-form-section__title" }, el = {
  key: 0,
  class: "w-form-section__description"
}, tl = {
  key: 0,
  class: "w-form-section__actions"
}, al = { class: "w-form-section__body" }, Ql = /* @__PURE__ */ fe({
  __name: "WFormSection",
  props: {
    title: {},
    description: {},
    variant: {}
  },
  setup(e) {
    return (a, t) => (i(), m("section", {
      class: re(["w-form-section", e.variant ? `w-form-section--${e.variant}` : ""])
    }, [
      e.title || e.description || a.$slots.actions ? (i(), m("div", Xo, [
        h("div", Qo, [
          h("h3", _o, T(e.title), 1),
          e.description ? (i(), m("p", el, T(e.description), 1)) : S("", !0)
        ]),
        a.$slots.actions ? (i(), m("div", tl, [
          N(a.$slots, "actions")
        ])) : S("", !0)
      ])) : S("", !0),
      h("div", al, [
        N(a.$slots, "default")
      ])
    ], 2));
  }
}), nl = {
  key: 0,
  class: "w-action-bar__primary"
}, ol = {
  key: 1,
  class: "w-action-bar__filters"
}, ll = {
  key: 2,
  class: "w-action-bar__secondary"
}, _l = /* @__PURE__ */ fe({
  __name: "WActionBar",
  props: {
    align: { default: "between" },
    stackOnMobile: { type: Boolean, default: !0 }
  },
  setup(e) {
    return (a, t) => (i(), m("div", {
      class: re(["w-action-bar", [
        `w-action-bar--${e.align}`,
        { "w-action-bar--stack": e.stackOnMobile }
      ]])
    }, [
      a.$slots.primary || a.$slots.default ? (i(), m("div", nl, [
        N(a.$slots, "primary", {}, () => [
          N(a.$slots, "default")
        ])
      ])) : S("", !0),
      a.$slots.filters ? (i(), m("div", ol, [
        N(a.$slots, "filters")
      ])) : S("", !0),
      a.$slots.secondary ? (i(), m("div", ll, [
        N(a.$slots, "secondary")
      ])) : S("", !0)
    ], 2));
  }
}), sl = { class: "w-progress-flow__marker" }, il = { class: "w-progress-flow__content" }, rl = { class: "w-progress-flow__label" }, ul = {
  key: 0,
  class: "w-progress-flow__description"
}, es = /* @__PURE__ */ fe({
  __name: "WProgressFlow",
  props: {
    steps: {},
    currentStep: {},
    orientation: { default: "horizontal" }
  },
  setup(e) {
    const a = e, t = O(
      () => a.steps.findIndex((s) => s.key === a.currentStep)
    );
    function n(s) {
      return s < t.value ? "done" : s === t.value ? "current" : "pending";
    }
    return (s, r) => (i(), m("div", {
      class: re(["w-progress-flow", `w-progress-flow--${e.orientation}`])
    }, [
      (i(!0), m(ie, null, ce(e.steps, (u, b) => (i(), m("div", {
        key: u.key,
        class: re(["w-progress-flow__step", `w-progress-flow__step--${n(b)}`])
      }, [
        N(s.$slots, "step", {
          step: u,
          index: b,
          state: n(b)
        }, () => [
          h("div", sl, [
            h("span", null, T(b + 1), 1)
          ]),
          h("div", il, [
            h("p", rl, T(u.label), 1),
            u.description ? (i(), m("p", ul, T(u.description), 1)) : S("", !0)
          ])
        ])
      ], 2))), 128))
    ], 2));
  }
});
function dl(e, a, t) {
  const n = e;
  return Array.isArray(n.results) ? {
    data: n.results,
    page: n.page ?? a,
    page_size: n.page_size ?? t,
    rows: n.count ?? 0,
    extras: n.extras ?? {}
  } : Array.isArray(n.data) ? {
    data: n.data,
    page: n.page ?? a,
    page_size: n.page_size ?? t,
    rows: n.rows ?? 0,
    extras: n.extras ?? {}
  } : {
    data: Array.isArray(e) ? e : [],
    page: a,
    page_size: t,
    rows: Array.isArray(e) ? e.length : 0,
    extras: {}
  };
}
function cl(e) {
  return {
    async list(a, t = {}) {
      const n = await e.get(a, { params: t });
      return dl(
        n.data,
        Number(t.page ?? 1),
        Number(t.page_size ?? 20)
      );
    },
    async get(a, t, n) {
      return { data: (await e.get(`${a}${t}/`, n)).data };
    },
    async create(a, t, n) {
      return { data: (await e.post(a, t, n)).data };
    },
    async update(a, t, n, s) {
      return { data: (await e.patch(
        `${a}${t}/`,
        n,
        s
      )).data };
    },
    async delete(a, t) {
      await e.delete(`${a}${t}/`);
    }
  };
}
const ts = {
  install(e, a) {
    if (!(a != null && a.axios) && !(a != null && a.dataProvider))
      throw new Error(
        '[wPrimeVueComponents] Informe "axios" ou "dataProvider" ao registrar o WPrimeVuePlugin.'
      );
    const t = a.dataProvider ?? cl(a.axios), n = {
      axios: a.axios,
      dataProvider: t,
      defaultPageSize: a.defaultPageSize ?? 20,
      dateFormat: a.dateFormat ?? "DD/MM/YYYY",
      dateTimeFormat: a.dateTimeFormat ?? "DD/MM/YYYY HH:mm",
      locale: a.locale ?? "pt-BR",
      currency: a.currency ?? "BRL"
    };
    a.axios && e.provide(la, a.axios), e.provide(at, t), e.provide(nt, n), a.registerComponents !== !1 && (e.component("WCrudView", ro), e.component("WCrudFormDialog", pt), e.component("WCrudColumnRenderer", tt), e.component("WAutoCompleteFK", Ot), e.component("WMoneyInput", Bt), e.component("WTransferList", jt));
  }
}, fl = {
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
function ml(e, a) {
  const t = {};
  for (const n of Object.keys(a))
    JSON.stringify(e[n]) !== JSON.stringify(a[n]) && (t[n] = a[n]);
  return t;
}
function as(e) {
  const {
    endpoint: a,
    columns: t,
    form: n,
    pk: s = "id",
    searchDebounce: r = 300,
    partialUpdate: u = !0,
    refetchOnSave: b = !0,
    canCreate: d = !0,
    canEdit: x = !0,
    canDelete: F = !0,
    rowActions: E = void 0,
    filterParams: z = void 0,
    createDefaults: I = void 0,
    transformPayload: G = void 0,
    onAfterSave: J = void 0,
    onAfterDelete: v = void 0
  } = e, D = Le(at);
  if (!D)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const P = D, V = Le(nt), Z = e.pageSize ?? (V == null ? void 0 : V.defaultPageSize) ?? 20, X = { ...fl, ...e.labels }, B = Nt(), { confirmDelete: q } = Yt(), j = K([]), ee = K({}), oe = K(!1), te = K(!1), le = K(""), W = K(!1), H = K(!1), c = K(null), p = we({});
  let U = null;
  const l = we({
    page: 1,
    pageSize: Z,
    rows: 0,
    totalPages: 0
  }), f = we({
    field: null,
    order: 0
  });
  function k() {
    const w = {};
    for (const M of n)
      w[M.field] = M.defaultValue !== void 0 ? typeof M.defaultValue == "function" ? M.defaultValue() : M.defaultValue : null;
    return w;
  }
  const o = k();
  for (const w of Object.keys(o))
    p[w] = o[w];
  const $ = O(
    () => c.value !== null && !H.value
  ), ue = O(() => H.value), me = O(
    () => H.value ? X.viewTitle ?? "Visualizar Registro" : $.value ? X.editTitle : X.createTitle
  ), ke = O(() => l.page <= 1), ne = O(() => l.page >= l.totalPages);
  let de = null;
  async function pe(w = {}) {
    oe.value = !0;
    try {
      const M = {
        page: l.page,
        page_size: l.pageSize,
        ...w
      };
      le.value && (M.search = le.value), f.field && f.order !== 0 && (M.ordering = f.order === -1 ? `-${f.field}` : f.field), z && Object.assign(M, z());
      const R = await P.list(a, M);
      j.value = R.data, l.rows = R.rows, ee.value = R.extras ?? {}, R.page && (l.page = R.page), R.page_size && (l.pageSize = R.page_size), l.totalPages = Math.ceil(l.rows / l.pageSize) || 0;
    } finally {
      oe.value = !1;
    }
  }
  async function De() {
    await pe();
  }
  async function Ne() {
    await pe();
  }
  async function Re(w = 200) {
    const M = {};
    le.value && (M.search = le.value), f.field && f.order !== 0 && (M.ordering = f.order === -1 ? `-${f.field}` : f.field), z && Object.assign(M, z());
    const R = [];
    let _ = 1;
    const Ye = 1e4;
    for (; _ <= Ye; ) {
      const xe = await P.list(a, {
        ...M,
        page: _,
        page_size: w
      });
      R.push(...xe.data);
      const $e = xe.rows ?? R.length;
      if (xe.data.length === 0 || R.length >= $e) break;
      _++;
    }
    return R;
  }
  function be(w) {
    le.value = w, de && clearTimeout(de), de = setTimeout(() => {
      l.page = 1, pe();
    }, r);
  }
  function Se(w) {
    const M = w.target;
    be(M.value);
  }
  function ve(w) {
    l.page = w, pe();
  }
  function ge() {
    ve(1);
  }
  function Pe() {
    ve(l.totalPages);
  }
  function Ie(w) {
    l.page = w.page + 1, l.pageSize = w.rows, pe();
  }
  function Te(w) {
    f.field = w.sortField ?? null, f.order = w.sortOrder ?? 0, l.page = 1, pe();
  }
  function Ve() {
    const w = k();
    for (const M of Object.keys(w))
      p[M] = w[M];
  }
  function Ge(w, M) {
    p[w] = M;
  }
  function ot() {
    if (H.value = !1, c.value = null, U = null, Ve(), I) {
      const w = I();
      for (const [M, R] of Object.entries(w))
        p[M] = R;
    }
    W.value = !0;
  }
  function Je(w) {
    const M = {};
    for (const R of n) {
      let _ = w[R.field] !== void 0 ? w[R.field] : null;
      _ && (R.type === "date" || R.type === "datetime") && typeof _ == "string" && (_ = ft(_)), p[R.field] = _, M[R.field] = _;
    }
    U = M;
  }
  function lt(w) {
    H.value = !1, c.value = w, Je(w), W.value = !0;
  }
  function st(w) {
    H.value = !0, c.value = w, Je(w), W.value = !0;
  }
  function y(w) {
    H.value = !1, c.value = null, U = null, Ve();
    for (const M of n) {
      if (M.field === s) continue;
      let R = w[M.field] !== void 0 ? w[M.field] : p[M.field];
      R && (M.type === "date" || M.type === "datetime") && typeof R == "string" && (R = ft(R)), p[M.field] = R;
    }
    if (I) {
      const M = I();
      for (const [R, _] of Object.entries(M))
        p[R] = _;
    }
    W.value = !0;
  }
  function C(w) {
    const M = { ...w };
    for (const R of n) {
      const _ = M[R.field];
      if (R.type === "date" && _ instanceof Date ? M[R.field] = Et(_) : R.type === "datetime" && _ instanceof Date && (M[R.field] = Ft(_)), R.type === "fk" && _ !== null && typeof _ == "object") {
        const Ye = R.optionValue || "id";
        M[R.field] = _[Ye] ?? _;
      }
      (R.type === "mask" || R.type === "cpf_cnpj") && typeof _ == "string" && (M[R.field] = Ae(_));
    }
    return M;
  }
  async function Q() {
    for (const w of n) {
      if (w.validate) {
        const M = w.validate(p[w.field]);
        if (M)
          return B.error(M), null;
      }
      if (w.required) {
        const M = p[w.field];
        if (M == null || M === "")
          return B.error(`${w.label} é obrigatório`), null;
      }
    }
    te.value = !0;
    try {
      let w = C(p);
      if (!$.value && I && Object.assign(w, I()), $.value && u && U) {
        const $e = C(U);
        if (w = ml($e, w), Object.keys(w).length === 0 && !G) {
          W.value = !1;
          const Ee = c.value;
          return c.value = null, U = null, Ee;
        }
      }
      G && (w = G(w, $.value));
      const M = n.some(
        ($e) => $e.type === "image" && w[$e.field] instanceof File
      );
      let R = w, _;
      if (M) {
        const $e = new Set(
          n.filter((Me) => Me.type === "image").map((Me) => Me.field)
        ), Ee = new FormData();
        for (const [Me, Be] of Object.entries(w))
          if (Be != null)
            if (Be instanceof File)
              Ee.append(Me, Be);
            else {
              if ($e.has(Me))
                continue;
              Ee.append(Me, String(Be));
            }
        R = Ee, _ = { "Content-Type": "multipart/form-data" };
      }
      const Ye = _ ? { headers: _ } : void 0;
      let xe;
      if ($.value && c.value) {
        const $e = c.value[s];
        if (xe = await P.update(
          a,
          $e,
          R,
          Ye
        ), !b) {
          const Ee = j.value.findIndex(
            (Me) => Me[s] === $e
          );
          Ee !== -1 && (j.value[Ee] = xe.data);
        }
        B.success(X.successUpdate);
      } else
        xe = await P.create(a, R, Ye), b || (j.value.unshift(xe.data), l.rows++), B.success(X.successCreate);
      return W.value = !1, c.value = null, U = null, b && await pe(), J && J(xe.data, $.value), xe.data;
    } catch (w) {
      return B.error(Ke(w, "Erro ao salvar registro")), null;
    } finally {
      te.value = !1;
    }
  }
  function L(w) {
    q(async () => {
      try {
        const M = w[s];
        await P.delete(a, M);
        const R = j.value.findIndex((_) => _[s] === M);
        R !== -1 && (j.value.splice(R, 1), l.rows--), B.success(X.successDelete), v && v(w);
      } catch (M) {
        B.error(Ke(M, "Erro ao excluir registro"));
      }
    }, X.deleteConfirmMessage);
  }
  return {
    items: j,
    extras: ee,
    loading: oe,
    saving: te,
    search: le,
    dialogVisible: W,
    editingItem: c,
    formData: p,
    pagination: l,
    sort: f,
    isEditing: $,
    isViewing: ue,
    viewMode: H,
    dialogTitle: me,
    isFirstPage: ke,
    isLastPage: ne,
    init: De,
    fetchItems: pe,
    fetchAll: Re,
    refresh: Ne,
    setSearch: be,
    onSearch: Se,
    onPage: Ie,
    onSort: Te,
    openCreateDialog: ot,
    openEditDialog: lt,
    openViewDialog: st,
    openDuplicateDialog: y,
    save: Q,
    confirmDelete: L,
    setFormField: Ge,
    resetForm: Ve,
    goToPage: ve,
    firstPage: ge,
    lastPage: Pe,
    config: e
  };
}
function ns(e) {
  const { endpoint: a, searchDebounce: t = 300, immediate: n = !1 } = e, s = Le(at);
  if (!s)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const r = s, u = Le(nt), b = e.pageSize ?? (u == null ? void 0 : u.defaultPageSize) ?? 20, d = K([]), x = K(!1), F = K(""), E = K({}), z = we({}), I = we({
    page: 1,
    pageSize: b,
    rows: 0,
    totalPages: 0
  }), G = we({
    field: null,
    order: 0
  });
  let J = null;
  async function v(q = {}) {
    x.value = !0;
    try {
      const j = {
        page: I.page,
        page_size: I.pageSize,
        ...q
      };
      F.value && (j.search = F.value), G.field && G.order !== 0 && (j.ordering = G.order === -1 ? `-${G.field}` : G.field);
      for (const [oe, te] of Object.entries(z))
        te != null && te !== "" && (j[oe] = te);
      const ee = await r.list(a, j);
      d.value = ee.data, I.rows = ee.rows, ee.page && (I.page = ee.page), ee.page_size && (I.pageSize = ee.page_size), I.totalPages = Math.ceil(I.rows / I.pageSize) || 0, E.value = ee.extras ?? {};
    } finally {
      x.value = !1;
    }
  }
  async function D() {
    await v();
  }
  function P(q) {
    F.value = q, J && clearTimeout(J), J = setTimeout(() => {
      I.page = 1, v();
    }, t);
  }
  function V(q, j) {
    z[q] = j, I.page = 1, v();
  }
  function Z() {
    for (const q of Object.keys(z))
      delete z[q];
    I.page = 1, v();
  }
  function X(q) {
    I.page = q.page + 1, I.pageSize = q.rows, v();
  }
  function B(q) {
    G.field = q.sortField ?? null, G.order = q.sortOrder ?? 0, I.page = 1, v();
  }
  return n && v(), {
    items: d,
    loading: x,
    search: F,
    pagination: I,
    sort: G,
    extras: E,
    fetchItems: v,
    refresh: D,
    setSearch: P,
    setFilter: V,
    clearFilters: Z,
    onPage: X,
    onSort: B
  };
}
function pl(e) {
  return e.split("?")[0].replace(/^\/+|\/+$/g, "").replace(/^api\/v\d+\//, "");
}
function vl(e) {
  return typeof e == "string" ? { table: e } : e;
}
function Wt(e, a = 400) {
  return {
    response: {
      status: a,
      data: { detail: e }
    },
    message: e
  };
}
function Dt(e) {
  if (e instanceof FormData)
    throw Wt(
      "SupabaseDataProvider nao envia FormData diretamente. Faça upload do arquivo no Storage e envie a URL/caminho no payload."
    );
  return e;
}
function je(e) {
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
function We(e, a) {
  var s, r;
  const t = pl(e), n = (s = a.resources) == null ? void 0 : s[t];
  if (n)
    return vl(n);
  if ((r = a.allowedTables) != null && r.includes(t))
    return { table: t };
  throw Wt(
    `Recurso Supabase nao registrado para o endpoint "${e}".`,
    404
  );
}
function gl(e, a, t) {
  const n = /* @__PURE__ */ new Set(["page", "page_size", "search", "ordering"]), s = { ...t.defaultFilters, ...a };
  for (const [r, u] of Object.entries(s))
    n.has(r) || u === null || u === void 0 || u === "" || (e = e.eq(r, u));
  return e;
}
function hl(e, a, t) {
  if (typeof a != "string" || !a.trim() || !(t != null && t.length))
    return e;
  const n = a.trim().replace(/,/g, "\\,"), s = t.map((r) => `${r}.ilike.%${n}%`).join(",");
  return e.or(s);
}
function yl(e, a) {
  const t = typeof e == "string" && e ? e : a;
  return t ? {
    field: t.startsWith("-") ? t.slice(1) : t,
    ascending: !t.startsWith("-")
  } : null;
}
function bl(e, a) {
  return e ? a.mapListItem ? e.map(
    (t) => {
      var n;
      return (n = a.mapListItem) == null ? void 0 : n.call(a, t);
    }
  ) : e : [];
}
function os(e) {
  const a = e.defaultSelect ?? "*";
  return {
    async list(t, n = {}) {
      var z;
      const s = We(t, e), r = Math.max(Number(n.page ?? 1), 1), u = Math.max(Number(n.page_size ?? 20), 1), b = (r - 1) * u, d = b + u - 1;
      let x = e.client.from(s.table).select(s.select ?? a, { count: "exact" });
      x = gl(x, n, s), x = hl(x, n.search, s.searchFields);
      const F = yl(n.ordering, s.defaultOrdering);
      F && (x = x.order(F.field, { ascending: F.ascending }));
      const E = await x.range(b, d);
      return E.error && je(E.error), {
        data: bl(E.data, s),
        page: r,
        page_size: u,
        rows: E.count ?? ((z = E.data) == null ? void 0 : z.length) ?? 0,
        extras: {}
      };
    },
    async get(t, n, s) {
      const r = We(t, e), u = r.pk ?? "id", b = await e.client.from(r.table).select(r.select ?? a).eq(u, n).single();
      return b.error && je(b.error), { data: b.data };
    },
    async create(t, n, s) {
      const r = We(t, e), u = Dt(n), b = r.mapPayload ? r.mapPayload(u, "create") : u, d = await e.client.from(r.table).insert(b).select(r.select ?? a).single();
      return d.error && je(d.error), { data: d.data };
    },
    async update(t, n, s, r) {
      const u = We(t, e), b = u.pk ?? "id", d = Dt(s), x = u.mapPayload ? u.mapPayload(d, "update") : d, F = await e.client.from(u.table).update(x).eq(b, n).select(u.select ?? a).single();
      return F.error && je(F.error), { data: F.data };
    },
    async delete(t, n) {
      const s = We(t, e), r = s.pk ?? "id", u = s.softDelete === !0 ? { is_active: !1 } : typeof s.softDelete == "object" ? s.softDelete : null, b = u ? await e.client.from(s.table).update(u).eq(r, n) : await e.client.from(s.table).delete().eq(r, n);
      b.error && je(b.error);
    }
  };
}
export {
  fl as DEFAULT_CRUD_LABELS,
  _l as WActionBar,
  Ot as WAutoCompleteFK,
  tt as WCrudColumnRenderer,
  pt as WCrudFormDialog,
  ro as WCrudView,
  Gl as WDetailHeader,
  Kl as WEmptyState,
  xn as WFormRenderer,
  Ql as WFormSection,
  Jl as WInfoCard,
  Wo as WKpiCard,
  Zl as WKpiGrid,
  Bt as WMoneyInput,
  Hl as WPageHeader,
  ts as WPrimeVuePlugin,
  es as WProgressFlow,
  Xl as WSectionHeader,
  uo as WStatusTag,
  jt as WTransferList,
  la as W_AXIOS_KEY,
  nt as W_CONFIG_KEY,
  at as W_DATA_PROVIDER_KEY,
  cl as createAxiosDataProvider,
  os as createSupabaseDataProvider,
  Mn as downloadCsv,
  Ke as extractApiError,
  za as mapApiFieldToColumnDef,
  Ia as mapApiFieldToFieldDef,
  Na as mapApiFieldsToColumnDefs,
  Ta as mapApiFieldsToFieldDefs,
  Vn as toCsv,
  ns as useApi,
  ql as useApiError,
  Yt as useAppConfirm,
  Nt as useAppToast,
  as as useCrudManager,
  mt as useFormatters
};
//# sourceMappingURL=index.js.map
