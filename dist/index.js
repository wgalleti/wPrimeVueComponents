import { inject as ze, defineComponent as fe, openBlock as s, createElementBlock as m, createBlock as A, unref as v, toDisplayString as I, ref as U, watch as nt, computed as q, reactive as be, resolveDirective as kt, Fragment as ue, createElementVNode as y, createVNode as Y, withDirectives as ve, withCtx as oe, createCommentVNode as $, renderList as ce, normalizeStyle as $e, createTextVNode as Ee, normalizeClass as de, renderSlot as N, isRef as Ut, withModifiers as qt, createSlots as ot, normalizeProps as lt, guardReactiveProps as st, useSlots as Ht, onMounted as Kt, createStaticVNode as Gt } from "vue";
import $t from "primevue/datatable";
import Oe from "primevue/column";
import ee from "primevue/button";
import ge from "primevue/inputtext";
import qe from "primevue/iconfield";
import He from "primevue/inputicon";
import Jt from "primevue/paginator";
import Zt from "primevue/contextmenu";
import Ct from "primevue/tag";
import Ne from "dayjs";
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
    (function(a, n) {
      e.exports = n();
    })(ia, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, n = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, l = /\d/, r = /\d\d/, u = /\d\d?/, b = /\d*[^-_:/,()\s\d]+/, d = {}, C = function(g) {
        return (g = +g) + (g > 68 ? 1900 : 2e3);
      }, F = function(g) {
        return function(k) {
          this[g] = +k;
        };
      }, M = [/[+-]\d\d:?(\d\d)?|Z/, function(g) {
        (this.zone || (this.zone = {})).offset = (function(k) {
          if (!k || k === "Z") return 0;
          var D = k.match(/([+-]|\d\d)/g), P = 60 * D[1] + (+D[2] || 0);
          return P === 0 ? 0 : D[0] === "+" ? -P : P;
        })(g);
      }], B = function(g) {
        var k = d[g];
        return k && (k.indexOf ? k : k.s.concat(k.f));
      }, T = function(g, k) {
        var D, P = d.meridiem;
        if (P) {
          for (var W = 1; W <= 24; W += 1) if (g.indexOf(P(W, 0, k)) > -1) {
            D = W > 12;
            break;
          }
        } else D = g === (k ? "pm" : "PM");
        return D;
      }, K = { A: [b, function(g) {
        this.afternoon = T(g, !1);
      }], a: [b, function(g) {
        this.afternoon = T(g, !0);
      }], Q: [l, function(g) {
        this.month = 3 * (g - 1) + 1;
      }], S: [l, function(g) {
        this.milliseconds = 100 * +g;
      }], SS: [r, function(g) {
        this.milliseconds = 10 * +g;
      }], SSS: [/\d{3}/, function(g) {
        this.milliseconds = +g;
      }], s: [u, F("seconds")], ss: [u, F("seconds")], m: [u, F("minutes")], mm: [u, F("minutes")], H: [u, F("hours")], h: [u, F("hours")], HH: [u, F("hours")], hh: [u, F("hours")], D: [u, F("day")], DD: [r, F("day")], Do: [b, function(g) {
        var k = d.ordinal, D = g.match(/\d+/);
        if (this.day = D[0], k) for (var P = 1; P <= 31; P += 1) k(P).replace(/\[|\]/g, "") === g && (this.day = P);
      }], w: [u, F("week")], ww: [r, F("week")], M: [u, F("month")], MM: [r, F("month")], MMM: [b, function(g) {
        var k = B("months"), D = (B("monthsShort") || k.map((function(P) {
          return P.slice(0, 3);
        }))).indexOf(g) + 1;
        if (D < 1) throw new Error();
        this.month = D % 12 || D;
      }], MMMM: [b, function(g) {
        var k = B("months").indexOf(g) + 1;
        if (k < 1) throw new Error();
        this.month = k % 12 || k;
      }], Y: [/[+-]?\d+/, F("year")], YY: [r, function(g) {
        this.year = C(g);
      }], YYYY: [/\d{4}/, F("year")], Z: M, ZZ: M };
      function G(g) {
        var k, D;
        k = g, D = d && d.formats;
        for (var P = (g = k.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(le, ae, X) {
          var J = X && X.toUpperCase();
          return ae || D[X] || a[X] || D[J].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(Q, f, h) {
            return f || h.slice(1);
          }));
        }))).match(n), W = P.length, j = 0; j < W; j += 1) {
          var z = P[j], H = K[z], O = H && H[0], Z = H && H[1];
          P[j] = Z ? { regex: O, parser: Z } : z.replace(/^\[|\]$/g, "");
        }
        return function(le) {
          for (var ae = {}, X = 0, J = 0; X < W; X += 1) {
            var Q = P[X];
            if (typeof Q == "string") J += Q.length;
            else {
              var f = Q.regex, h = Q.parser, c = le.slice(J), i = f.exec(c)[0];
              h.call(ae, i), le = le.replace(i, "");
            }
          }
          return (function(p) {
            var o = p.afternoon;
            if (o !== void 0) {
              var w = p.hours;
              o ? w < 12 && (p.hours += 12) : w === 12 && (p.hours = 0), delete p.afternoon;
            }
          })(ae), ae;
        };
      }
      return function(g, k, D) {
        D.p.customParseFormat = !0, g && g.parseTwoDigitYear && (C = g.parseTwoDigitYear);
        var P = k.prototype, W = P.parse;
        P.parse = function(j) {
          var z = j.date, H = j.utc, O = j.args;
          this.$u = H;
          var Z = O[1];
          if (typeof Z == "string") {
            var le = O[2] === !0, ae = O[3] === !0, X = le || ae, J = O[2];
            ae && (J = O[2]), d = this.$locale(), !le && J && (d = D.Ls[J]), this.$d = (function(c, i, p, o) {
              try {
                if (["x", "X"].indexOf(i) > -1) return new Date((i === "X" ? 1e3 : 1) * c);
                var w = G(i)(c), ne = w.year, me = w.month, we = w.day, se = w.hours, ie = w.minutes, he = w.seconds, re = w.milliseconds, ye = w.zone, Se = w.week, Ae = /* @__PURE__ */ new Date(), Pe = we || (ne || me ? 1 : Ae.getDate()), Re = ne || Ae.getFullYear(), Ce = 0;
                ne && !me || (Ce = me > 0 ? me - 1 : Ae.getMonth());
                var Ve, Ie = se || 0, Te = ie || 0, Le = he || 0, x = re || 0;
                return ye ? new Date(Date.UTC(Re, Ce, Pe, Ie, Te, Le, x + 60 * ye.offset * 1e3)) : p ? new Date(Date.UTC(Re, Ce, Pe, Ie, Te, Le, x)) : (Ve = new Date(Re, Ce, Pe, Ie, Te, Le, x), Se && (Ve = o(Ve).week(Se).toDate()), Ve);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(z, Z, H, D), this.init(), J && J !== !0 && (this.$L = this.locale(J).$L), X && z != this.format(Z) && (this.$d = /* @__PURE__ */ new Date("")), d = {};
          } else if (Z instanceof Array) for (var Q = Z.length, f = 1; f <= Q; f += 1) {
            O[1] = Z[f - 1];
            var h = D.apply(this, O);
            if (h.isValid()) {
              this.$d = h.$d, this.$L = h.$L, this.init();
              break;
            }
            f === Q && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else W.call(this, j);
        };
      };
    }));
  })(Ze)), Ze.exports;
}
var ua = ra();
const da = /* @__PURE__ */ sa(ua);
Ne.extend(da);
function it(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const t = Ne(e, "YYYY-MM-DD", !0);
  return t.isValid() ? t.toDate() : Ne(e).toDate();
}
function St(e) {
  return e ? typeof e == "string" ? e : Ne(e).format("YYYY-MM-DD") : null;
}
function Pt(e) {
  return e ? typeof e == "string" ? e : Ne(e).toISOString() : null;
}
function ca(e, t = "DD/MM/YYYY") {
  return e ? Ne(e).format(t) : "—";
}
function fa(e) {
  return e ? Ne(e).format("DD/MM/YYYY HH:mm") : "—";
}
function Fe(e) {
  return e.replace(/\D/g, "");
}
function Vt(e) {
  if (!e) return "—";
  const t = Fe(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function Mt(e) {
  if (!e) return "—";
  const t = Fe(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function ma(e) {
  if (!e) return "—";
  const t = Fe(e);
  return t.length === 11 ? Vt(e) : t.length === 14 ? Mt(e) : e;
}
function pa(e) {
  if (!e) return "—";
  const t = Fe(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function Et(e) {
  if (!e) return null;
  const t = Fe(e);
  if (t.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(t)) return "CPF inválido.";
  let a = 0;
  for (let u = 0; u < 9; u++) a += parseInt(t[u]) * (10 - u);
  let n = a % 11;
  const l = n < 2 ? 0 : 11 - n;
  if (parseInt(t[9]) !== l) return "CPF inválido.";
  a = 0;
  for (let u = 0; u < 10; u++) a += parseInt(t[u]) * (11 - u);
  n = a % 11;
  const r = n < 2 ? 0 : 11 - n;
  return parseInt(t[10]) !== r ? "CPF inválido." : null;
}
function Ft(e) {
  if (!e) return null;
  const t = Fe(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let n = 0;
  for (let d = 0; d < 12; d++) n += parseInt(t[d]) * a[d];
  let l = n % 11;
  const r = l < 2 ? 0 : 11 - l;
  if (parseInt(t[12]) !== r) return "CNPJ inválido.";
  const u = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  n = 0;
  for (let d = 0; d < 13; d++) n += parseInt(t[d]) * u[d];
  l = n % 11;
  const b = l < 2 ? 0 : 11 - l;
  return parseInt(t[13]) !== b ? "CNPJ inválido." : null;
}
function va(e) {
  if (!e) return null;
  const t = Fe(e);
  return t.length === 11 ? Et(e) : t.length === 14 ? Ft(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const Xe = /* @__PURE__ */ new Map();
function vt(e, t) {
  const a = `${e}-${t}`;
  let n = Xe.get(a);
  return n || (n = new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }), Xe.set(a, n)), n;
}
function ga(e, t) {
  const a = `${e}-${t}`;
  let n = Xe.get(a);
  return n || (n = new Intl.NumberFormat(e, {
    style: "currency",
    currency: t
  }), Xe.set(a, n)), n;
}
function rt() {
  const e = ze(et, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), t = (e == null ? void 0 : e.locale) ?? "pt-BR", a = (e == null ? void 0 : e.currency) ?? "BRL";
  function n(d) {
    return d == null ? "—" : ga(t, a).format(d);
  }
  function l(d, C = 2) {
    return d == null ? "—" : vt(t, C).format(d);
  }
  function r(d, C) {
    return ca(d, C ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function u(d) {
    return fa(d);
  }
  function b(d) {
    return d == null ? "—" : `${vt(t, 2).format(d)}%`;
  }
  return {
    formatCurrency: n,
    formatNumber: l,
    formatDate: r,
    formatDateTime: u,
    formatPercent: b,
    formatCpf: Vt,
    formatCnpj: Mt,
    formatCpfCnpj: ma,
    formatTelefone: pa,
    validateCpf: Et,
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
}, Qe = /* @__PURE__ */ fe({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: n, formatNumber: l } = rt();
    return (r, u) => e.value == null ? (s(), m("span", ha, "—")) : e.column.type === "image" ? (s(), m("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, ya)) : e.column.type === "boolean" ? (s(), A(v(Ct), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (s(), m("span", ba, I(v(t)(e.value)), 1)) : e.column.type === "datetime" ? (s(), m("span", wa, I(v(a)(e.value)), 1)) : e.column.type === "currency" ? (s(), m("span", ka, I(v(n)(e.value)), 1)) : e.column.type === "number" ? (s(), m("span", $a, I(e.column.format ? e.column.format(e.value, e.rowData) : v(l)(e.value, e.column.decimals ?? 0)), 1)) : (s(), m("span", Ca, I(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var Da = Object.defineProperty, xa = (e, t, a) => t in e ? Da(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, Ue = (e, t, a) => xa(e, typeof t != "symbol" ? t + "" : t, a);
const gt = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, ht = (e, t, a) => e.replaceAll(t, "").replace(a, ".").replace("..", ".").replace(/[^.\d]/g, ""), yt = (e, t, a) => {
  var n;
  return new Intl.NumberFormat(((n = a.number) == null ? void 0 : n.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
}, Sa = (e, t = !0, a) => {
  var n, l, r, u;
  const b = ((n = a.number) == null ? void 0 : n.unsigned) !== !0 && e.startsWith("-") ? "-" : "", d = ((l = a.number) == null ? void 0 : l.fraction) ?? 0;
  let C = yt(0, d, a);
  const F = C.formatToParts(1000.12), M = ((r = F.find((g) => g.type === "group")) == null ? void 0 : r.value) ?? " ", B = ((u = F.find((g) => g.type === "decimal")) == null ? void 0 : u.value) ?? ".", T = ht(e, M, B);
  if (Number.isNaN(parseFloat(T))) return b;
  const K = T.split(".");
  if (K[1] != null && K[1].length >= 1) {
    const g = K[1].length <= d ? K[1].length : d;
    C = yt(g, d, a);
  }
  let G = C.format(parseFloat(T));
  return t ? d > 0 && T.endsWith(".") && !T.slice(0, -1).includes(".") && (G += B) : G = ht(G, M, B), b + G;
}, At = (e) => JSON.parse(e.replaceAll("'", '"')), Pa = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = Va(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = Je(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = Je(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = Je(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = Ma(e.dataset.maskaTokens));
  const n = {};
  return e.dataset.maskaNumberLocale != null && (n.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (n.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (n.unsigned = Je(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(n).length > 0) && (a.number = n), a;
}, Je = (e) => e !== "" ? !!JSON.parse(e) : !0, Va = (e) => e.startsWith("[") && e.endsWith("]") ? At(e) : e, Ma = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return At(e);
  const t = {};
  return e.split("|").forEach((a) => {
    const n = a.split(":");
    t[n[0]] = {
      pattern: Rt() ? new RegExp(n[1], "u") : new RegExp(n[1]),
      optional: n[2] === "optional",
      multiple: n[2] === "multiple",
      repeated: n[2] === "repeated"
    };
  }), t;
}, Rt = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class Ea {
  constructor(t = {}) {
    Ue(this, "opts", {}), Ue(this, "memo", /* @__PURE__ */ new Map());
    const a = { ...t };
    if (a.tokens != null) {
      a.tokens = a.tokensReplace ? { ...a.tokens } : { ...gt, ...a.tokens };
      for (const n of Object.values(a.tokens))
        typeof n.pattern == "string" && (n.pattern = Rt() ? new RegExp(n.pattern, "u") : new RegExp(n.pattern));
    } else
      a.tokens = gt;
    Array.isArray(a.mask) && (a.mask.length > 1 ? a.mask = [...a.mask].sort((n, l) => n.length - l.length) : a.mask = a.mask[0] ?? ""), a.mask === "" && (a.mask = null), this.opts = a;
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
    return a.find((l) => this.process(t, l, !1).length >= n.length) ?? "";
  }
  escapeMask(t) {
    const a = [], n = [];
    return t.split("").forEach((l, r) => {
      l === "!" && t[r - 1] !== "!" ? n.push(r - n.length) : a.push(l);
    }), { mask: a.join(""), escaped: n };
  }
  process(t, a, n = !0) {
    if (this.opts.number != null) return Sa(t, n, this.opts);
    if (a == null) return t;
    const l = `v=${t},mr=${a},m=${n ? 1 : 0}`;
    if (this.memo.has(l)) return this.memo.get(l);
    const { mask: r, escaped: u } = this.escapeMask(a), b = [], d = this.opts.tokens != null ? this.opts.tokens : {}, C = this.isReversed() ? -1 : 1, F = this.isReversed() ? "unshift" : "push", M = this.isReversed() ? 0 : r.length - 1, B = this.isReversed() ? () => g > -1 && k > -1 : () => g < r.length && k < t.length, T = (P) => !this.isReversed() && P <= M || this.isReversed() && P >= M;
    let K, G = -1, g = this.isReversed() ? r.length - 1 : 0, k = this.isReversed() ? t.length - 1 : 0, D = !1;
    for (; B(); ) {
      const P = r.charAt(g), W = d[P], j = (W == null ? void 0 : W.transform) != null ? W.transform(t.charAt(k)) : t.charAt(k);
      if (!u.includes(g) && W != null ? (j.match(W.pattern) != null ? (b[F](j), W.repeated ? (G === -1 ? G = g : g === M && g !== G && (g = G - C), M === G && (g -= C)) : W.multiple && (D = !0, g -= C), g += C) : W.multiple ? D && (g += C, k -= C, D = !1) : j === K ? K = void 0 : W.optional && (g += C, k -= C), k += C) : (n && !this.isEager() && b[F](P), j === P && !this.isEager() ? k += C : K = P, this.isEager() || (g += C)), this.isEager())
        for (; T(g) && (d[r.charAt(g)] == null || u.includes(g)); ) {
          if (n) {
            if (b[F](r.charAt(g)), t.charAt(k) === r.charAt(g)) {
              g += C, k += C;
              continue;
            }
          } else r.charAt(g) === t.charAt(k) && (k += C);
          g += C;
        }
    }
    return this.memo.set(l, b.join("")), this.memo.get(l);
  }
}
class Fa {
  constructor(t, a = {}) {
    Ue(this, "items", /* @__PURE__ */ new Map()), Ue(this, "eventAbortController"), Ue(this, "onInput", (n) => {
      if (n instanceof CustomEvent && n.type === "input" && !n.isTrusted && !n.bubbles)
        return;
      const l = n.target, r = this.items.get(l);
      if (r === void 0) return;
      const u = "inputType" in n && n.inputType.startsWith("delete"), b = r.isEager(), d = u && b && r.unmasked(l.value) === "" ? "" : l.value;
      this.fixCursor(l, u, () => this.setValue(l, d));
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
      const l = new Ea(Pa(n, a));
      this.items.set(n, l), queueMicrotask(() => this.updateValue(n)), n.selectionStart === null && l.isEager() && console.warn("Maska: input of `%s` type is not supported", n.type);
    }
  }
  getInputs(t) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t];
  }
  getOptions(t) {
    const { onMaska: a, preProcess: n, postProcess: l, ...r } = t;
    return r;
  }
  fixCursor(t, a, n) {
    var l, r;
    const u = t.selectionStart, b = t.value;
    if (n(), u === null || u === b.length && !a) return;
    const d = t.value, C = b.slice(0, u), F = d.slice(0, u), M = (l = this.processInput(t, C)) == null ? void 0 : l.unmasked, B = (r = this.processInput(t, F)) == null ? void 0 : r.unmasked;
    if (M === void 0 || B === void 0) return;
    let T = u;
    C !== F && (T += a ? d.length - b.length : M.length - B.length), t.setSelectionRange(T, T);
  }
  setValue(t, a) {
    const n = this.processInput(t, a);
    n !== void 0 && (t.value = n.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((l) => l(n)) : this.options.onMaska(n)), t.dispatchEvent(new CustomEvent("maska", { detail: n })), t.dispatchEvent(new CustomEvent("input", { detail: n.masked })));
  }
  processInput(t, a) {
    const n = this.items.get(t);
    if (n === void 0) return;
    let l = a ?? t.value;
    this.options.preProcess != null && (l = this.options.preProcess(l));
    let r = n.masked(l);
    return this.options.postProcess != null && (r = this.options.postProcess(r)), {
      masked: r,
      unmasked: n.unmasked(l),
      completed: n.completed(l)
    };
  }
}
const tt = /* @__PURE__ */ new WeakMap(), Aa = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, at = (e, t) => {
  var a;
  const n = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (n == null || (n == null ? void 0 : n.type) === "file") return;
  let l = {};
  if (t.value != null && (l = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const r = (u) => {
      const b = t.modifiers.unmasked ? u.unmasked : t.modifiers.completed ? u.completed : u.masked;
      Aa(t, b);
    };
    l.onMaska = l.onMaska == null ? r : Array.isArray(l.onMaska) ? [...l.onMaska, r] : [l.onMaska, r];
  }
  tt.has(n) ? (a = tt.get(n)) == null || a.update(l) : tt.set(n, new Fa(n, l));
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
  const t = Ra[e.type] ?? "text", a = {
    field: e.name,
    label: e.label,
    type: t,
    required: e.required ?? !1
  };
  return (e.type === "decimal" || e.type === "float") && (a.minFractionDigits = 2, a.maxFractionDigits = 2), e.type === "boolean" && (a.defaultValue = !1), e.type === "choice" && ((n = e.choices) != null && n.length) && (a.options = e.choices.map((l) => ({
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
  function t(r, u = "Sucesso") {
    e.add({ severity: "success", summary: u, detail: r, life: 3e3 });
  }
  function a(r, u = "Erro") {
    e.add({ severity: "error", summary: u, detail: r, life: 5e3 });
  }
  function n(r, u = "Atenção") {
    e.add({ severity: "warn", summary: u, detail: r, life: 4e3 });
  }
  function l(r, u = "Info") {
    e.add({ severity: "info", summary: u, detail: r, life: 3e3 });
  }
  return { success: t, error: a, warn: n, info: l };
}
function Tt() {
  const e = na();
  function t(n, l = "Deseja realmente excluir este registro?") {
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
      accept: n
    });
  }
  function a(n, l, r = "Confirmação") {
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
      return t.non_field_errors.filter((n) => typeof n == "string").join(" ");
    const a = [];
    for (const [n, l] of Object.entries(t)) {
      if (n === "non_field_errors") continue;
      const r = Ya(n);
      if (Array.isArray(l)) {
        const u = l.filter((b) => typeof b == "string");
        u.length > 0 && a.push(`${r}: ${u.join(" ")}`);
      } else typeof l == "string" && a.push(`${r}: ${l}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function Ke(e, t = "Erro inesperado") {
  var r;
  if (!e || typeof e != "object") return t;
  const a = e, n = (r = a.response) == null ? void 0 : r.data;
  if (!n || typeof n != "object")
    return a.message || t;
  const l = n.detail ?? n;
  return Oa(l) || t;
}
function ql() {
  return { extractApiError: Ke };
}
const Ba = { class: "w-autocompletefk" }, Wa = ["disabled"], ja = { class: "w-autocompletefk-toolbar" }, Ua = { class: "w-autocompletefk-toolbar-actions" }, qa = { class: "flex items-center justify-end gap-1" }, Ha = { class: "w-autocompletefk-footer" }, Lt = /* @__PURE__ */ fe({
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
    const a = e, n = t, l = ze(_e);
    if (!l)
      throw new Error(
        "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin."
      );
    const r = l, u = It(), { confirmDelete: b } = Tt(), d = U(null), C = U([]), F = U(!1);
    let M = null;
    async function B(x) {
      try {
        const V = await r.get(a.endpoint, x);
        d.value = V.data;
      } catch {
        d.value = null;
      }
    }
    async function T(x) {
      F.value = !0;
      try {
        const V = {
          page_size: 20,
          ...a.endpointParams
        };
        x && (V.search = x);
        const te = await r.list(a.endpoint, V);
        C.value = te.data;
      } catch {
        C.value = [];
      } finally {
        F.value = !1;
      }
    }
    function K(x) {
      const V = x.query || "";
      if (V.length < a.minLength) {
        C.value = [];
        return;
      }
      M && clearTimeout(M), M = setTimeout(() => T(V), 300);
    }
    function G(x) {
      d.value = x.value, n("update:modelValue", x.value);
    }
    function g() {
      d.value = null, n("update:modelValue", null);
    }
    nt(
      () => a.modelValue,
      async (x) => {
        if (x != null) {
          if (typeof x == "object" && x !== null && a.optionLabel in x) {
            d.value = x;
            return;
          }
          (!d.value || d.value[a.optionValue] !== x) && await B(x);
        } else
          d.value = null;
      },
      { immediate: !0 }
    );
    const k = U(!1), D = U([]), P = U(!1), W = U(""), j = U(1), z = U(15), H = U(0), O = U(null), Z = U(null), le = U(0);
    let ae = null;
    const X = U([]), J = q(() => {
      var x;
      return (x = a.crudFields) != null && x.length ? !0 : X.value.length > 0;
    }), Q = q(() => a.canCreate ?? J.value), f = q(() => a.canEdit ?? J.value), h = q(() => a.canDelete ?? J.value), c = q(() => f.value || h.value), i = q(() => {
      var x;
      return (x = a.crudFields) != null && x.length ? a.crudFields : Ta(X.value);
    }), p = q(() => {
      var x, V;
      return (x = a.crudColumns) != null && x.length ? a.crudColumns : (V = a.columns) != null && V.length ? a.columns.map((te) => ({
        field: te.field,
        header: te.header,
        sortable: !0
      })) : X.value.length ? Na(X.value) : [
        { field: a.optionLabel, header: a.optionLabel, sortable: !0 }
      ];
    });
    async function o() {
      var x, V, te;
      P.value = !0;
      try {
        const L = {
          page: j.value,
          page_size: z.value,
          ...a.endpointParams
        };
        W.value && (L.search = W.value), Z.value && le.value !== 0 && (L.ordering = le.value === -1 ? `-${Z.value}` : Z.value);
        const pe = await r.list(a.endpoint, L);
        D.value = pe.data, H.value = pe.rows, (x = pe.extras) != null && x.fields && !((V = a.columns) != null && V.length) && !((te = a.crudFields) != null && te.length) && (X.value = pe.extras.fields);
      } catch {
        D.value = [], H.value = 0;
      } finally {
        P.value = !1;
      }
    }
    function w() {
      a.disabled || (W.value = "", j.value = 1, Z.value = null, le.value = 0, O.value = null, k.value = !0, o());
    }
    function ne(x) {
      j.value = x.page + 1, z.value = x.rows, o();
    }
    function me(x) {
      Z.value = x.sortField ?? null, le.value = x.sortOrder ?? 0, j.value = 1, o();
    }
    function we() {
      O.value && (d.value = O.value, n("update:modelValue", O.value), k.value = !1);
    }
    function se(x) {
      d.value = x.data, n("update:modelValue", x.data), k.value = !1;
    }
    nt(W, () => {
      ae && clearTimeout(ae), ae = setTimeout(() => {
        j.value = 1, o();
      }, 300);
    });
    const ie = U(!1), he = U(!1), re = U(null), ye = be({}), Se = q(() => re.value !== null), Ae = q(
      () => Se.value ? "Editar Registro" : "Novo Registro"
    );
    function Pe() {
      const x = {};
      for (const V of i.value)
        x[V.field] = V.defaultValue !== void 0 ? typeof V.defaultValue == "function" ? V.defaultValue() : V.defaultValue : null;
      return x;
    }
    function Re() {
      const x = Pe();
      for (const V of Object.keys(ye))
        delete ye[V];
      for (const [V, te] of Object.entries(x))
        ye[V] = te;
    }
    function Ce() {
      re.value = null, Re(), ie.value = !0;
    }
    function Ve(x) {
      re.value = x;
      for (const V of i.value)
        ye[V.field] = x[V.field] !== void 0 ? x[V.field] : null;
      ie.value = !0;
    }
    function Ie(x, V) {
      ye[x] = V;
    }
    async function Te() {
      he.value = !0;
      try {
        const x = { ...ye };
        for (const te of i.value) {
          const L = x[te.field];
          if (te.type === "fk" && L !== null && typeof L == "object") {
            const pe = te.optionValue || "id";
            x[te.field] = L[pe] ?? L;
          }
        }
        let V;
        if (Se.value && re.value) {
          const te = re.value[a.optionValue];
          V = await r.update(
            a.endpoint,
            te,
            x
          );
          const L = D.value.findIndex((pe) => pe[a.optionValue] === te);
          L !== -1 && (D.value[L] = V.data), u.success("Registro atualizado com sucesso");
        } else
          V = await r.create(a.endpoint, x), D.value.unshift(V.data), H.value++, u.success("Registro criado com sucesso");
        ie.value = !1, re.value = null, O.value = V.data;
      } catch (x) {
        u.error(Ke(x, "Erro ao salvar registro"));
      } finally {
        he.value = !1;
      }
    }
    function Le(x) {
      b(async () => {
        try {
          const V = x[a.optionValue];
          await r.delete(a.endpoint, V);
          const te = D.value.findIndex((L) => L[a.optionValue] === V);
          te !== -1 && (D.value.splice(te, 1), H.value--), d.value && d.value[a.optionValue] === V && (d.value = null, n("update:modelValue", null)), O.value && O.value[a.optionValue] === V && (O.value = null), u.success("Registro excluído com sucesso");
        } catch (V) {
          u.error(Ke(V, "Erro ao excluir registro"));
        }
      });
    }
    return (x, V) => {
      const te = kt("tooltip");
      return s(), m(ue, null, [
        y("div", Ba, [
          Y(v(xt), {
            "model-value": d.value,
            suggestions: C.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: F.value,
            fluid: "",
            onComplete: K,
            onItemSelect: G,
            onClear: g
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          ve((s(), m("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: w
          }, [...V[6] || (V[6] = [
            y("i", { class: "pi pi-search" }, null, -1)
          ])], 8, Wa)), [
            [
              te,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        Y(v(Dt), {
          visible: k.value,
          "onUpdate:visible": V[4] || (V[4] = (L) => k.value = L),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: oe(() => [
            y("div", Ha, [
              Y(v(ee), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: V[3] || (V[3] = (L) => k.value = !1)
              }),
              Y(v(ee), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !O.value,
                onClick: we
              }, null, 8, ["disabled"])
            ])
          ]),
          default: oe(() => [
            y("div", ja, [
              Y(v(qe), { class: "w-autocompletefk-toolbar-search" }, {
                default: oe(() => [
                  Y(v(He), { class: "pi pi-search" }),
                  Y(v(ge), {
                    modelValue: W.value,
                    "onUpdate:modelValue": V[0] || (V[0] = (L) => W.value = L),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              y("div", Ua, [
                Q.value ? (s(), A(v(ee), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: Ce
                })) : $("", !0)
              ])
            ]),
            Y(v($t), {
              selection: O.value,
              "onUpdate:selection": V[1] || (V[1] = (L) => O.value = L),
              value: D.value,
              loading: P.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: z.value,
              "total-records": H.value,
              "sort-field": Z.value ?? void 0,
              "sort-order": le.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: ne,
              onSort: V[2] || (V[2] = (L) => me({ sortField: L.sortField, sortOrder: L.sortOrder })),
              onRowDblclick: se
            }, {
              empty: oe(() => [...V[7] || (V[7] = [
                y("div", { class: "w-autocompletefk-empty" }, "Nenhum registro encontrado", -1)
              ])]),
              default: oe(() => [
                Y(v(Oe), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (s(!0), m(ue, null, ce(p.value, (L) => (s(), A(v(Oe), {
                  key: L.field,
                  field: L.field,
                  header: L.header,
                  sortable: L.sortable ?? !0,
                  style: $e(L.style)
                }, {
                  body: oe(({ data: pe }) => [
                    L.type ? (s(), A(Qe, {
                      key: 0,
                      column: L,
                      value: pe[L.field],
                      "row-data": pe
                    }, null, 8, ["column", "value", "row-data"])) : (s(), m(ue, { key: 1 }, [
                      Ee(I(pe[L.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                c.value ? (s(), A(v(Oe), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: oe(({ data: L }) => [
                    y("div", qa, [
                      f.value ? ve((s(), A(v(ee), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (pe) => Ve(L)
                      }, null, 8, ["onClick"])), [
                        [
                          te,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : $("", !0),
                      h.value ? ve((s(), A(v(ee), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (pe) => Le(L)
                      }, null, 8, ["onClick"])), [
                        [
                          te,
                          "Excluir",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : $("", !0)
                    ])
                  ]),
                  _: 1
                })) : $("", !0)
              ]),
              _: 1
            }, 8, ["selection", "value", "loading", "rows", "total-records", "sort-field", "sort-order", "data-key"])
          ]),
          _: 1
        }, 8, ["visible", "header"]),
        J.value ? (s(), A(ut, {
          key: 0,
          visible: ie.value,
          title: Ae.value,
          fields: i.value,
          "form-data": ye,
          "is-editing": Se.value,
          saving: he.value,
          width: e.dialogWidth,
          "onUpdate:visible": V[5] || (V[5] = (L) => {
            ie.value = L, L || (re.value = null);
          }),
          "onUpdate:field": Ie,
          onSave: Te
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : $("", !0)
      ], 64);
    };
  }
}), zt = /* @__PURE__ */ fe({
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
    const a = e, n = t, l = q(
      () => a.prefix ?? (a.currency ? "R$" : void 0)
    ), r = q(() => !!l.value || !!a.suffix), u = q(() => {
      const d = a.modelValue;
      return d == null || Number.isNaN(d) ? "" : new Intl.NumberFormat(a.locale, {
        minimumFractionDigits: a.decimals,
        maximumFractionDigits: a.decimals
      }).format(d);
    });
    function b(d) {
      const C = d.target.value.replace(/\D/g, "");
      if (!C) {
        n("update:modelValue", null);
        return;
      }
      const F = Number(C) / Math.pow(10, a.decimals);
      n("update:modelValue", F);
    }
    return (d, C) => r.value ? (s(), A(v(oa), {
      key: 0,
      class: "w-money-input"
    }, {
      default: oe(() => [
        l.value ? (s(), A(v(mt), { key: 0 }, {
          default: oe(() => [
            Ee(I(l.value), 1)
          ]),
          _: 1
        })) : $("", !0),
        Y(v(ge), {
          "model-value": u.value,
          inputmode: "numeric",
          class: "w-money-input__field",
          placeholder: e.placeholder,
          disabled: e.disabled,
          invalid: e.invalid,
          onInput: b
        }, null, 8, ["model-value", "placeholder", "disabled", "invalid"]),
        e.suffix ? (s(), A(v(mt), { key: 1 }, {
          default: oe(() => [
            Ee(I(e.suffix), 1)
          ]),
          _: 1
        })) : $("", !0)
      ]),
      _: 1
    })) : (s(), A(v(ge), {
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
}, Nt = /* @__PURE__ */ fe({
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
    const a = e, n = t, l = U(""), r = U(""), u = q(() => new Set(a.selected)), b = q(() => a.searchFields ?? [a.optionLabel]);
    function d(k) {
      return k[a.trackBy];
    }
    function C(k) {
      return String(k[a.optionLabel] ?? "");
    }
    function F(k, D) {
      if (!D) return !0;
      const P = D.toLowerCase();
      return b.value.some(
        (W) => String(k[W] ?? "").toLowerCase().includes(P)
      );
    }
    const M = q(
      () => a.source.filter(
        (k) => !u.value.has(d(k)) && F(k, l.value)
      )
    ), B = q(
      () => a.source.filter(
        (k) => u.value.has(d(k)) && F(k, r.value)
      )
    );
    function T(k) {
      a.disabled || n("update:selected", [...a.selected, d(k)]);
    }
    function K(k) {
      if (a.disabled) return;
      const D = d(k);
      n("update:selected", a.selected.filter((P) => P !== D));
    }
    function G() {
      a.disabled || n("update:selected", a.source.map(d));
    }
    function g() {
      a.disabled || n("update:selected", []);
    }
    return (k, D) => (s(), m("div", {
      class: de(["w-transfer", { "w-transfer--disabled": e.disabled }])
    }, [
      y("div", Ka, [
        y("div", Ga, [
          D[2] || (D[2] = y("span", { class: "w-transfer__title" }, "Disponíveis", -1)),
          y("span", Ja, I(M.value.length), 1)
        ]),
        Y(v(qe), { class: "w-transfer__search" }, {
          default: oe(() => [
            Y(v(He), { class: "pi pi-search" }),
            Y(v(ge), {
              modelValue: l.value,
              "onUpdate:modelValue": D[0] || (D[0] = (P) => l.value = P),
              placeholder: "Buscar...",
              fluid: ""
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        y("ul", Za, [
          (s(!0), m(ue, null, ce(M.value, (P) => (s(), m("li", {
            key: `a-${d(P)}`,
            class: "w-transfer__item",
            onClick: (W) => T(P)
          }, [
            y("span", null, I(C(P)), 1),
            D[3] || (D[3] = y("i", { class: "pi pi-angle-right" }, null, -1))
          ], 8, Xa))), 128)),
          M.value.length ? $("", !0) : (s(), m("li", Qa, "Nenhum item"))
        ])
      ]),
      y("div", _a, [
        Y(v(ee), {
          type: "button",
          icon: "pi pi-angle-double-right",
          text: "",
          rounded: "",
          disabled: e.disabled || !M.value.length,
          onClick: G
        }, null, 8, ["disabled"]),
        Y(v(ee), {
          type: "button",
          icon: "pi pi-angle-double-left",
          text: "",
          rounded: "",
          disabled: e.disabled || !e.selected.length,
          onClick: g
        }, null, 8, ["disabled"])
      ]),
      y("div", en, [
        y("div", tn, [
          D[4] || (D[4] = y("span", { class: "w-transfer__title" }, "Selecionados", -1)),
          y("span", an, I(B.value.length), 1)
        ]),
        Y(v(qe), { class: "w-transfer__search" }, {
          default: oe(() => [
            Y(v(He), { class: "pi pi-search" }),
            Y(v(ge), {
              modelValue: r.value,
              "onUpdate:modelValue": D[1] || (D[1] = (P) => r.value = P),
              placeholder: "Buscar...",
              fluid: ""
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }),
        y("ul", nn, [
          (s(!0), m(ue, null, ce(B.value, (P) => (s(), m("li", {
            key: `s-${d(P)}`,
            class: "w-transfer__item",
            onClick: (W) => K(P)
          }, [
            D[5] || (D[5] = y("i", { class: "pi pi-angle-left" }, null, -1)),
            y("span", null, I(C(P)), 1)
          ], 8, on))), 128)),
          B.value.length ? $("", !0) : (s(), m("li", ln, "Nenhum item"))
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
    const n = await a.json();
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
  setup(e, { expose: t, emit: a }) {
    const n = e, l = a, r = be({}), u = be({}), b = be({}), d = be({});
    function C(c, i) {
      const p = i.target.value, o = p.replace(/\D/g, "");
      l("update:field", c.field, p), b[c.field] = null, d[c.field] && (clearTimeout(d[c.field]), d[c.field] = null), o.length === 8 && (d[c.field] = setTimeout(async () => {
        u[c.field] = !0, b[c.field] = null;
        try {
          const w = await sn(o);
          if (!w)
            b[c.field] = "CEP não encontrado. Preencha os campos manualmente.";
          else {
            const ne = c.cepFields || {}, me = Object.keys(ne);
            for (const we of me) {
              const se = ne[we];
              if (!se) continue;
              const ie = n.formData[se];
              (ie == null || ie === "") && l("update:field", se, w[we] ?? "");
            }
          }
        } finally {
          u[c.field] = !1;
        }
      }, 400));
    }
    const F = q(
      () => n.fields.filter((c) => c.visible === void 0 || c.visible === !0 ? !0 : typeof c.visible == "function" ? c.visible(n.formData, n.isEditing) : c.visible)
    );
    function M(c) {
      return n.disabled || c.disabledOnEdit && n.isEditing ? !0 : typeof c.disabled == "function" ? c.disabled(n.formData, n.isEditing) : !!c.disabled;
    }
    function B(c) {
      return Ut(c) ? c.value : c;
    }
    const T = q(() => {
      const c = n.isEditing ? "edit" : "create", i = n.fields.find(
        (o) => o.autofocus === !0 || o.autofocus === c
      );
      if (i) return i.field;
      const p = F.value.find((o) => !(o.type === "switch" || o.type === "fk" || o.type === "select" || o.type === "image" || o.disabled === !0 || o.disabledOnEdit && n.isEditing));
      return (p == null ? void 0 : p.field) ?? null;
    });
    function K(c) {
      return c.field === T.value;
    }
    function G(c) {
      if (c)
        return c.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function g(c) {
      if (!c) return "";
      const i = String(c).replace(/\D/g, "").slice(0, 14);
      return i.length <= 11 ? i.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : i.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function k(c, i) {
      const p = i.target.value.replace(/\D/g, "").slice(0, 14);
      l("update:field", c, p);
    }
    const D = be({});
    function P(c) {
      const i = n.formData[c.field];
      if (i == null) return null;
      const p = c.optionValue || "value";
      return (B(c.options) || []).find(
        (w) => w[p] === i
      ) ?? null;
    }
    function W(c) {
      return D[c.field] || [];
    }
    function j(c, i) {
      const p = (i.query || "").toLowerCase(), o = B(c.options) || [], w = c.optionLabel || "label";
      D[c.field] = o.filter(
        (ne) => String(ne[w] || "").toLowerCase().includes(p)
      );
    }
    function z(c, i) {
      const p = c.optionValue || "value";
      l("update:field", c.field, i.value[p]);
    }
    function H(c) {
      const i = n.formData[c.field];
      return i ? String(i).replace("#", "") : "FFFFFF";
    }
    function O(c, i) {
      l("update:field", c.field, `#${i}`);
    }
    function Z(c) {
      if (typeof c.validate == "function") {
        const i = c.validate(n.formData[c.field]);
        r[c.field] = i || null;
      }
    }
    function le() {
      const c = [];
      for (const i of n.fields)
        if (typeof i.validate == "function") {
          const p = i.validate(n.formData[i.field]);
          r[i.field] = p || null, p && c.push(p);
        }
      return c;
    }
    function ae() {
      Object.keys(r).forEach((c) => delete r[c]);
    }
    function X(c) {
      return Math.max(1, Math.floor(c.columns ?? n.columns));
    }
    function J(c, i) {
      const p = c.colSpan;
      return p == null || p === "full" ? i : p === 0.5 ? Math.max(1, Math.round(i / 2)) : Math.min(Math.max(1, Math.floor(p)), i);
    }
    function Q(c, i) {
      return { "--w-col-span": J(c, X(i)) };
    }
    function f(c, i) {
      return J(c, X(i)) === X(i) ? "w-crud-form-col-full" : "w-crud-form-col-half";
    }
    const h = q(() => {
      var o, w, ne, me, we;
      const c = /* @__PURE__ */ new Map(), i = [], p = /* @__PURE__ */ new Map();
      for (const se of F.value) {
        const ie = ((o = se.fieldGroup) == null ? void 0 : o.id) ?? "__default__";
        c.has(ie) || (c.set(ie, {
          id: ie,
          title: (w = se.fieldGroup) == null ? void 0 : w.title,
          description: (ne = se.fieldGroup) == null ? void 0 : ne.description,
          columns: (me = se.fieldGroup) == null ? void 0 : me.columns,
          fields: []
        }), i.push(ie), ((we = se.fieldGroup) == null ? void 0 : we.order) != null && p.set(ie, se.fieldGroup.order)), c.get(ie).fields.push(se);
      }
      return i.slice().sort((se, ie) => {
        const he = p.get(se), re = p.get(ie);
        return he != null && re != null ? he - re : he != null ? -1 : re != null ? 1 : i.indexOf(se) - i.indexOf(ie);
      }).map((se) => c.get(se));
    });
    return t({ validateAll: le, clearErrors: ae }), (c, i) => (s(), m("div", rn, [
      (s(!0), m(ue, null, ce(h.value, (p) => (s(), m("div", {
        key: p.id,
        class: "w-crud-form-group"
      }, [
        p.title ? (s(), m("div", un, [
          y("h3", dn, I(p.title), 1),
          p.description ? (s(), m("p", cn, I(p.description), 1)) : $("", !0)
        ])) : $("", !0),
        y("div", {
          class: "w-crud-form-fields",
          style: $e({ "--w-form-cols": X(p) })
        }, [
          (s(!0), m(ue, null, ce(p.fields, (o) => N(c.$slots, `field-${o.field}`, {
            key: o.field,
            field: o,
            formData: e.formData,
            isEditing: e.isEditing,
            setFormField: (w, ne) => l("update:field", w, ne)
          }, () => [
            o.type === "switch" ? (s(), m("div", {
              key: 0,
              class: "w-crud-form-switch",
              style: $e(Q(o, p))
            }, [
              Y(v(_t), {
                "model-value": e.formData[o.field],
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
              y("label", fn, I(o.switchLabel || o.label), 1)
            ], 4)) : o.type === "color" ? (s(), m("div", {
              key: 1,
              class: de(f(o, p)),
              style: $e(Q(o, p))
            }, [
              y("label", mn, [
                Ee(I(o.label) + " ", 1),
                o.required ? (s(), m("span", pn, "*")) : $("", !0)
              ]),
              y("div", vn, [
                Y(v(ea), {
                  "model-value": H(o),
                  disabled: M(o),
                  "onUpdate:modelValue": (w) => O(o, w)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
                Y(v(ge), {
                  "model-value": e.formData[o.field],
                  class: "w-28",
                  maxlength: "7",
                  placeholder: "#000000",
                  disabled: M(o),
                  "onUpdate:modelValue": (w) => l("update:field", o.field, w)
                }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
              ])
            ], 6)) : o.type === "image" ? (s(), m("div", {
              key: 2,
              class: de(f(o, p)),
              style: $e(Q(o, p))
            }, [
              y("label", gn, I(o.label), 1),
              N(c.$slots, `image-${o.field}`, {
                field: o,
                formData: e.formData
              }, () => [
                y("input", {
                  type: "file",
                  accept: o.accept || "image/*",
                  disabled: M(o),
                  onChange: (w) => {
                    var me;
                    const ne = ((me = w.target.files) == null ? void 0 : me[0]) ?? null;
                    l("update:field", o.field, ne);
                  }
                }, null, 40, hn)
              ])
            ], 6)) : o.type === "transfer" ? (s(), m("div", {
              key: 3,
              class: de(f(o, p)),
              style: $e(Q(o, p))
            }, [
              y("label", yn, [
                Ee(I(o.label) + " ", 1),
                o.required ? (s(), m("span", bn, "*")) : $("", !0)
              ]),
              Y(Nt, {
                source: B(o.options) || [],
                selected: e.formData[o.field] || [],
                "track-by": o.optionValue || "id",
                "option-label": o.optionLabel || "nome",
                "search-fields": o.searchFields,
                disabled: M(o),
                "onUpdate:selected": (w) => l("update:field", o.field, w)
              }, null, 8, ["source", "selected", "track-by", "option-label", "search-fields", "disabled", "onUpdate:selected"])
            ], 6)) : (s(), m("div", {
              key: 4,
              class: de(f(o, p)),
              style: $e(Q(o, p))
            }, [
              y("label", wn, [
                Ee(I(o.label) + " ", 1),
                o.required ? (s(), m("span", kn, "*")) : $("", !0),
                u[o.field] ? (s(), m("i", $n)) : $("", !0)
              ]),
              (!o.type || o.type === "text") && o.mask ? ve((s(), A(v(ge), {
                key: 0,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: K(o) || void 0,
                placeholder: o.placeholder,
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
                [v(at), { mask: G(o.mask) }]
              ]) : !o.type || o.type === "text" ? (s(), A(v(ge), {
                key: 1,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: K(o) || void 0,
                placeholder: o.placeholder,
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "email" ? (s(), A(v(ge), {
                key: 2,
                "model-value": e.formData[o.field],
                type: "email",
                fluid: "",
                autofocus: K(o) || void 0,
                placeholder: o.placeholder,
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "password" ? (s(), A(v(ta), {
                key: 3,
                "model-value": e.formData[o.field],
                fluid: "",
                "toggle-mask": "",
                feedback: o.feedback !== !1,
                placeholder: o.placeholder,
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "number" ? (s(), A(v(ct), {
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
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "currency" && o.fillFromRight ? (s(), A(zt, {
                key: 5,
                "model-value": e.formData[o.field],
                decimals: o.decimals ?? 2,
                currency: "",
                prefix: o.prefix,
                suffix: o.suffix,
                placeholder: o.placeholder,
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "decimals", "prefix", "suffix", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "currency" ? (s(), A(v(ct), {
                key: 6,
                "model-value": e.formData[o.field],
                fluid: "",
                mode: "currency",
                currency: "BRL",
                locale: "pt-BR",
                min: o.min,
                max: o.max,
                placeholder: o.placeholder,
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "select" ? (s(), A(v(Qt), {
                key: 7,
                "model-value": e.formData[o.field],
                fluid: "",
                options: B(o.options),
                "option-label": o.optionLabel || "label",
                "option-value": o.optionValue || "value",
                "show-clear": o.showClear !== !1,
                placeholder: o.placeholder,
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "autocomplete" ? (s(), A(v(xt), {
                key: 8,
                "model-value": P(o),
                fluid: "",
                suggestions: W(o),
                "option-label": o.optionLabel || "label",
                placeholder: o.placeholder,
                disabled: M(o),
                onComplete: (w) => j(o, w),
                onItemSelect: (w) => z(o, w),
                onClear: (w) => l("update:field", o.field, null)
              }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : o.type === "fk" ? (s(), A(Lt, {
                key: 9,
                "model-value": e.formData[o.field],
                endpoint: o.endpoint,
                "endpoint-params": o.endpointParams,
                "option-label": o.optionLabel || "nome",
                placeholder: o.placeholder,
                disabled: M(o),
                "show-clear": o.showClear !== !1,
                "dialog-header": o.label,
                "crud-fields": o.crudFields,
                "crud-columns": o.crudColumns,
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "endpoint", "endpoint-params", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : o.type === "date" ? (s(), A(v(ft), {
                key: 10,
                "model-value": e.formData[o.field],
                fluid: "",
                "date-format": o.dateFormat || "dd/mm/yy",
                placeholder: o.placeholder,
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "datetime" ? (s(), A(v(ft), {
                key: 11,
                "model-value": e.formData[o.field],
                fluid: "",
                "show-time": "",
                "hour-format": o.hourFormat || "24",
                "date-format": o.dateFormat || "dd/mm/yy",
                placeholder: o.placeholder,
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "cpf_cnpj" ? (s(), A(v(ge), {
                key: 12,
                "model-value": g(e.formData[o.field]),
                fluid: "",
                maxlength: "18",
                placeholder: o.placeholder || "000.000.000-00",
                disabled: M(o),
                invalid: !!r[o.field],
                onInput: (w) => k(o.field, w),
                onBlur: (w) => Z(o)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : o.type === "mask" ? ve((s(), A(v(ge), {
                key: 13,
                "model-value": e.formData[o.field],
                fluid: "",
                placeholder: o.placeholder,
                disabled: M(o),
                invalid: !!r[o.field],
                "onUpdate:modelValue": (w) => l("update:field", o.field, w),
                onBlur: (w) => Z(o)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
                [v(at), { mask: G(o.mask) }]
              ]) : o.type === "cep" ? ve((s(), A(v(ge), {
                key: 14,
                "model-value": e.formData[o.field],
                fluid: "",
                placeholder: o.placeholder || "00000-000",
                disabled: M(o),
                invalid: !!b[o.field],
                onInput: (w) => C(o, w)
              }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput"])), [
                [v(at), { mask: "#####-###" }]
              ]) : o.type === "textarea" ? (s(), A(v(Xt), {
                key: 15,
                "model-value": e.formData[o.field],
                fluid: "",
                autofocus: K(o) || void 0,
                rows: o.rows || 3,
                placeholder: o.placeholder,
                disabled: M(o),
                "onUpdate:modelValue": (w) => l("update:field", o.field, w)
              }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : $("", !0),
              b[o.field] ? (s(), m("small", Cn, I(b[o.field]), 1)) : r[o.field] ? (s(), m("small", Dn, I(r[o.field]), 1)) : $("", !0)
            ], 6))
          ])), 128))
        ], 4)
      ]))), 128))
    ]));
  }
}), Sn = { class: "w-crud-form-footer" }, ut = /* @__PURE__ */ fe({
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
  setup(e, { emit: t }) {
    const a = e, n = t, l = U(null);
    function r() {
      l.value ? l.value.validateAll().length === 0 && n("save") : n("save");
    }
    return nt(
      () => a.visible,
      (u) => {
        u && l.value && l.value.clearErrors();
      }
    ), (u, b) => (s(), A(v(Dt), {
      visible: e.visible,
      header: e.title,
      style: $e({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": b[2] || (b[2] = (d) => n("update:visible", d))
    }, {
      default: oe(() => [
        y("form", {
          class: "w-crud-form",
          onSubmit: qt(r, ["prevent"])
        }, [
          Y(xn, {
            ref_key: "rendererRef",
            ref: l,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            disabled: e.disabled,
            columns: e.formColumns,
            "onUpdate:field": b[0] || (b[0] = (d, C) => n("update:field", d, C))
          }, ot({ _: 2 }, [
            ce(e.fields, (d) => ({
              name: `field-${d.field}`,
              fn: oe((C) => [
                N(u.$slots, `field-${d.field}`, lt(st(C)))
              ])
            })),
            ce(e.fields.filter((d) => d.type === "image"), (d) => ({
              name: `image-${d.field}`,
              fn: oe((C) => [
                N(u.$slots, `image-${d.field}`, lt(st(C)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing", "disabled", "columns"]),
          y("div", Sn, [
            N(u.$slots, "footer", {
              saving: e.saving,
              disabled: e.disabled
            }, () => [
              Y(v(ee), {
                type: "button",
                label: e.disabled ? "Fechar" : "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: b[1] || (b[1] = (d) => n("update:visible", !1))
              }, null, 8, ["label", "disabled"]),
              e.disabled ? $("", !0) : (s(), A(v(ee), {
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
function Pn(e, t) {
  const a = t[e.field];
  return e.format ? e.format(a, t) : a == null ? "" : typeof a == "boolean" ? a ? "Sim" : "Não" : String(a);
}
function bt(e, t) {
  return e.includes('"') || e.includes(t) || e.includes(`
`) || e.includes("\r") ? `"${e.replace(/"/g, '""')}"` : e;
}
function Vn(e, t, a = {}) {
  const n = a.separator ?? ";", l = t.map((u) => bt(u.header, n)).join(n), r = e.map(
    (u) => t.map((b) => bt(Pn(b, u), n)).join(n)
  );
  return "\uFEFF" + [l, ...r].join(`\r
`);
}
function Mn(e, t = "export.csv") {
  const a = new Blob([e], { type: "text/csv;charset=utf-8;" }), n = URL.createObjectURL(a), l = document.createElement("a");
  l.href = n, l.download = t, document.body.appendChild(l), l.click(), document.body.removeChild(l), URL.revokeObjectURL(n);
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
}, Wn = { class: "w-crud-toolbar" }, jn = { class: "w-crud-toolbar-start" }, Un = { class: "w-crud-toolbar-end" }, qn = {
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
  setup(e, { emit: t }) {
    const a = e, n = t, l = Ht(), { formatNumber: r } = rt(), u = U({}), b = U(a.defaultView);
    function d(f) {
      return b.value === f;
    }
    function C(f) {
      b.value = f;
    }
    const F = q(
      () => (a.crud.pagination.page - 1) * a.crud.pagination.pageSize
    ), M = q(
      () => a.crud.config.columns.filter((f) => f.visible !== !1).map((f) => f.type === "number" && !f.align ? { ...f, align: "right" } : f.type === "currency" && !f.align ? { ...f, align: "right" } : f)
    );
    function B(f) {
      if (f.align === "right") return "text-right";
      if (f.align === "center") return "text-center";
    }
    const T = q(() => M.value.slice(0, a.cardFields)), K = q(() => {
      const f = [];
      return a.crud.config.canEdit !== !1 && f.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canCreate !== !1 && f.push({
        action: "duplicate",
        icon: "pi pi-copy",
        tooltip: "Duplicar",
        severity: "info"
      }), a.crud.config.canDelete !== !1 && f.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), f;
    }), G = q(
      () => a.crud.config.rowActions ?? K.value
    ), g = q(() => G.value.length > 0 || !!l["row-actions"]);
    function k(f, h) {
      if (f.handler) {
        f.handler(h);
        return;
      }
      f.action === "edit" ? a.crud.openEditDialog(h) : f.action === "view" ? a.crud.openViewDialog(h) : f.action === "duplicate" ? a.crud.openDuplicateDialog(h) : f.action === "delete" && a.crud.confirmDelete(h);
    }
    function D(f, h) {
      return f.visible ? f.visible(h) : !0;
    }
    function P(f, h) {
      return f.disabled ? f.disabled(h) : !1;
    }
    const W = q(() => {
      const f = [];
      return a.showKpi && f.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: r(a.crud.pagination.rows, 0)
      }), f.push(...a.extraKpis), f;
    });
    q(() => a.crud.config.labels ?? {});
    const j = q(() => a.crud.config.canCreate !== !1), z = U(null), H = U(null);
    function O(f) {
      z.value = f;
    }
    function Z(f) {
      var h;
      a.contextMenu && (z.value = f.data, (h = H.value) == null || h.show(f.originalEvent));
    }
    function le(f, h) {
      var c;
      a.contextMenu && (f.preventDefault(), z.value = h, (c = H.value) == null || c.show(f));
    }
    const ae = q(() => {
      const f = z.value;
      if (!f) return [];
      const h = [
        {
          label: "Ver detalhes",
          icon: "pi pi-eye",
          command: () => a.crud.openViewDialog(f)
        }
      ];
      for (const c of G.value)
        D(c, f) && h.push({
          label: c.tooltip ?? c.action,
          icon: c.icon,
          class: c.severity === "danger" ? "w-crud-ctx-danger" : void 0,
          disabled: P(c, f),
          command: () => k(c, f)
        });
      return a.showPrint && h.push({
        label: "Imprimir",
        icon: "pi pi-print",
        command: () => n("print", f)
      }), a.exportCsv && (h.push({ separator: !0 }), h.push({
        label: a.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
        icon: "pi pi-download",
        command: () => Q()
      })), h;
    });
    function X() {
      z.value && n("print", z.value);
    }
    const J = U(!1);
    async function Q() {
      if (!J.value) {
        J.value = !0;
        try {
          const f = a.csvScope === "page" ? a.crud.items.value : await a.crud.fetchAll(a.csvPageSize), h = Vn(f, M.value);
          Mn(h, a.csvFilename);
        } finally {
          J.value = !1;
        }
      }
    }
    return Kt(() => {
      a.autoInit && a.crud.init();
    }), (f, h) => {
      const c = kt("tooltip");
      return s(), m("div", En, [
        e.showHeader ? (s(), m("div", Fn, [
          y("div", An, [
            y("h1", Rn, I(e.title), 1),
            e.subtitle ? (s(), m("p", In, I(e.subtitle), 1)) : $("", !0)
          ]),
          y("div", Tn, [
            N(f.$slots, "header-actions"),
            j.value && !e.actionRail ? (s(), A(v(ee), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: h[0] || (h[0] = (i) => e.crud.openCreateDialog())
            })) : $("", !0)
          ])
        ])) : $("", !0),
        N(f.$slots, "before-table", {}, () => [
          W.value.length ? (s(), m("div", Ln, [
            (s(!0), m(ue, null, ce(W.value, (i, p) => (s(), m("div", {
              key: p,
              class: "w-crud-kpi"
            }, [
              y("div", {
                class: de(["w-crud-kpi-icon", i.severity ? `w-crud-kpi-icon--${i.severity}` : ""])
              }, [
                y("i", {
                  class: de([i.icon]),
                  style: $e(i.color ? `color: ${i.color}` : "")
                }, null, 6)
              ], 2),
              y("div", zn, [
                y("div", Nn, I(i.label), 1),
                y("div", Yn, I(i.value), 1)
              ])
            ]))), 128))
          ])) : $("", !0)
        ]),
        y("div", {
          class: de(["w-crud-content", { "w-crud-content--rail": e.actionRail }])
        }, [
          y("div", On, [
            b.value === "table" ? (s(), m("div", Bn, [
              Y(v($t), {
                value: e.crud.items.value,
                loading: e.crud.loading.value,
                "expanded-rows": u.value,
                "onUpdate:expandedRows": h[4] || (h[4] = (i) => u.value = i),
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
                selection: e.actionRail || e.contextMenu ? z.value : void 0,
                "selection-mode": e.actionRail || e.contextMenu ? "single" : void 0,
                "context-menu": e.contextMenu,
                "context-menu-selection": e.contextMenu ? z.value : void 0,
                "onUpdate:selection": h[5] || (h[5] = (i) => z.value = i),
                "onUpdate:contextMenuSelection": h[6] || (h[6] = (i) => z.value = i),
                onRowContextmenu: Z,
                onPage: e.crud.onPage,
                onSort: h[7] || (h[7] = (i) => e.crud.onSort({ sortField: i.sortField, sortOrder: i.sortOrder })),
                onRowExpand: h[8] || (h[8] = (i) => n("row-expand", i.data)),
                onRowCollapse: h[9] || (h[9] = (i) => n("row-collapse", i.data))
              }, ot({
                header: oe(() => [
                  y("div", Wn, [
                    y("div", jn, [
                      e.showSearch ? (s(), A(v(qe), { key: 0 }, {
                        default: oe(() => [
                          Y(v(He), { class: "pi pi-search" }),
                          Y(v(ge), {
                            "model-value": e.crud.search.value,
                            placeholder: "Buscar...",
                            class: "w-72",
                            onInput: e.crud.onSearch
                          }, null, 8, ["model-value", "onInput"])
                        ]),
                        _: 1
                      })) : $("", !0),
                      N(f.$slots, "toolbar-start"),
                      N(f.$slots, "toolbar-filters")
                    ]),
                    y("div", Un, [
                      N(f.$slots, "toolbar-actions"),
                      e.exportCsv ? ve((s(), A(v(ee), {
                        key: 0,
                        icon: "pi pi-download",
                        text: "",
                        size: "small",
                        loading: J.value,
                        onClick: Q
                      }, null, 8, ["loading"])), [
                        [
                          c,
                          e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : $("", !0),
                      e.viewToggle ? (s(), m("div", qn, [
                        Y(v(ee), {
                          icon: "pi pi-table",
                          size: "small",
                          text: !d("table"),
                          outlined: d("table"),
                          onClick: h[1] || (h[1] = (i) => C("table"))
                        }, null, 8, ["text", "outlined"]),
                        Y(v(ee), {
                          icon: "pi pi-th-large",
                          size: "small",
                          text: !d("cards"),
                          outlined: d("cards"),
                          onClick: h[2] || (h[2] = (i) => C("cards"))
                        }, null, 8, ["text", "outlined"])
                      ])) : $("", !0),
                      !e.showHeader && j.value && !e.actionRail ? (s(), A(v(ee), {
                        key: 2,
                        label: "Novo",
                        icon: "pi pi-plus",
                        onClick: h[3] || (h[3] = (i) => e.crud.openCreateDialog())
                      })) : $("", !0)
                    ])
                  ])
                ]),
                empty: oe(() => [
                  N(f.$slots, "empty", {}, () => [
                    h[17] || (h[17] = y("div", { class: "w-crud-empty" }, [
                      y("div", { class: "w-crud-empty-icon" }, [
                        y("i", { class: "pi pi-inbox" })
                      ]),
                      y("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                      y("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                    ], -1))
                  ])
                ]),
                default: oe(() => [
                  e.expandable ? (s(), A(v(Oe), {
                    key: 0,
                    expander: "",
                    style: { width: "3rem" }
                  })) : $("", !0),
                  (s(!0), m(ue, null, ce(M.value, (i) => (s(), A(v(Oe), {
                    key: i.field,
                    field: i.field,
                    header: i.header,
                    sortable: i.sortable,
                    style: $e(i.style),
                    "header-class": B(i),
                    "body-class": B(i)
                  }, {
                    body: oe(({ data: p }) => [
                      N(f.$slots, `column-${i.field}`, {
                        data: p,
                        value: p[i.field]
                      }, () => [
                        Y(Qe, {
                          column: i,
                          value: p[i.field],
                          "row-data": p
                        }, null, 8, ["column", "value", "row-data"])
                      ])
                    ]),
                    _: 2
                  }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
                  g.value && !e.actionRail ? (s(), A(v(Oe), {
                    key: 1,
                    "header-class": "w-crud-actions-header",
                    style: $e({ width: `${(G.value.length + (v(l)["row-actions"] ? 1 : 0)) * 2.5 + 1}rem` })
                  }, {
                    body: oe(({ data: i }) => [
                      y("div", Hn, [
                        (s(!0), m(ue, null, ce(G.value, (p) => (s(), m(ue, {
                          key: p.action
                        }, [
                          D(p, i) ? ve((s(), A(v(ee), {
                            key: 0,
                            icon: p.icon,
                            text: "",
                            rounded: "",
                            size: "small",
                            severity: p.severity,
                            disabled: P(p, i),
                            onClick: (o) => k(p, i)
                          }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                            [
                              c,
                              p.tooltip,
                              void 0,
                              { top: !0 }
                            ]
                          ]) : $("", !0)
                        ], 64))), 128)),
                        N(f.$slots, "row-actions", {
                          data: i,
                          crud: e.crud
                        })
                      ])
                    ]),
                    _: 3
                  }, 8, ["style"])) : $("", !0)
                ]),
                _: 2
              }, [
                e.expandable ? {
                  name: "expansion",
                  fn: oe((i) => [
                    N(f.$slots, "expansion", {
                      data: i.data
                    })
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "selection", "selection-mode", "context-menu", "context-menu-selection", "onPage"])
            ])) : (s(), m("div", Kn, [
              y("div", Gn, [
                y("div", Jn, [
                  e.showSearch ? (s(), A(v(qe), { key: 0 }, {
                    default: oe(() => [
                      Y(v(He), { class: "pi pi-search" }),
                      Y(v(ge), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : $("", !0),
                  N(f.$slots, "toolbar-start"),
                  N(f.$slots, "toolbar-filters")
                ]),
                y("div", Zn, [
                  N(f.$slots, "toolbar-actions"),
                  e.exportCsv ? ve((s(), A(v(ee), {
                    key: 0,
                    icon: "pi pi-download",
                    text: "",
                    size: "small",
                    loading: J.value,
                    onClick: Q
                  }, null, 8, ["loading"])), [
                    [
                      c,
                      e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                      void 0,
                      { top: !0 }
                    ]
                  ]) : $("", !0),
                  e.viewToggle ? (s(), m("div", Xn, [
                    Y(v(ee), {
                      icon: "pi pi-table",
                      size: "small",
                      text: !d("table"),
                      outlined: d("table"),
                      onClick: h[10] || (h[10] = (i) => C("table"))
                    }, null, 8, ["text", "outlined"]),
                    Y(v(ee), {
                      icon: "pi pi-th-large",
                      size: "small",
                      text: !d("cards"),
                      outlined: d("cards"),
                      onClick: h[11] || (h[11] = (i) => C("cards"))
                    }, null, 8, ["text", "outlined"])
                  ])) : $("", !0),
                  !e.showHeader && j.value && !e.actionRail ? (s(), A(v(ee), {
                    key: 2,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: h[12] || (h[12] = (i) => e.crud.openCreateDialog())
                  })) : $("", !0)
                ])
              ]),
              e.crud.loading.value ? (s(), m("div", Qn, [...h[18] || (h[18] = [
                y("i", { class: "pi pi-spin pi-spinner" }, null, -1)
              ])])) : e.crud.items.value.length ? (s(), m("div", _n, [
                (s(!0), m(ue, null, ce(e.crud.items.value, (i, p) => (s(), m("div", {
                  key: i[e.crud.config.pk || "id"] ?? p,
                  class: de(["w-crud-card", { "w-crud-card--selected": z.value === i }]),
                  onClick: (o) => O(i),
                  onDblclick: (o) => e.crud.config.canEdit !== !1 && e.crud.openEditDialog(i),
                  onContextmenu: (o) => le(o, i)
                }, [
                  y("div", to, [
                    (s(!0), m(ue, null, ce(T.value, (o, w) => (s(), m("div", {
                      key: o.field,
                      class: de(["w-crud-card-row", { "w-crud-card-row--title": w === 0 }])
                    }, [
                      w !== 0 ? (s(), m("span", ao, I(o.header), 1)) : $("", !0),
                      y("span", no, [
                        N(f.$slots, `column-${o.field}`, {
                          data: i,
                          value: i[o.field]
                        }, () => [
                          Y(Qe, {
                            column: o,
                            value: i[o.field],
                            "row-data": i
                          }, null, 8, ["column", "value", "row-data"])
                        ])
                      ])
                    ], 2))), 128))
                  ]),
                  g.value && !e.actionRail ? (s(), m("div", oo, [
                    (s(!0), m(ue, null, ce(G.value, (o) => (s(), m(ue, {
                      key: o.action
                    }, [
                      D(o, i) ? ve((s(), A(v(ee), {
                        key: 0,
                        icon: o.icon,
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: o.severity,
                        disabled: P(o, i),
                        onClick: (w) => k(o, i)
                      }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                        [
                          c,
                          o.tooltip,
                          void 0,
                          { top: !0 }
                        ]
                      ]) : $("", !0)
                    ], 64))), 128)),
                    N(f.$slots, "row-actions", {
                      data: i,
                      crud: e.crud
                    })
                  ])) : $("", !0)
                ], 42, eo))), 128))
              ])) : N(f.$slots, "empty", { key: 1 }, () => [
                h[19] || (h[19] = Gt('<div class="w-crud-empty"><div class="w-crud-empty-icon"><i class="pi pi-inbox"></i></div><p class="w-crud-empty-title">Nenhum registro encontrado</p><p class="w-crud-empty-text">Tente ajustar sua busca ou crie um novo registro</p></div>', 1))
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
              }, null, 8, ["rows", "total-records", "first", "onPage"])) : $("", !0)
            ]))
          ]),
          e.actionRail ? (s(), m("aside", lo, [
            j.value ? ve((s(), A(v(ee), {
              key: 0,
              icon: "pi pi-plus",
              rounded: "",
              onClick: h[13] || (h[13] = (i) => e.crud.openCreateDialog())
            }, null, 512)), [
              [
                c,
                "Novo",
                void 0,
                { left: !0 }
              ]
            ]) : $("", !0),
            j.value && G.value.length ? (s(), m("div", so)) : $("", !0),
            (s(!0), m(ue, null, ce(G.value, (i) => (s(), m(ue, {
              key: i.action
            }, [
              !z.value || D(i, z.value) ? ve((s(), A(v(ee), {
                key: 0,
                icon: i.icon,
                text: "",
                rounded: "",
                severity: i.severity,
                disabled: !z.value || P(i, z.value),
                onClick: (p) => z.value && k(i, z.value)
              }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                [
                  c,
                  i.tooltip,
                  void 0,
                  { left: !0 }
                ]
              ]) : $("", !0)
            ], 64))), 128)),
            N(f.$slots, "rail-actions", {
              selected: z.value,
              crud: e.crud
            }),
            e.showPrint || e.exportCsv ? (s(), m("div", io)) : $("", !0),
            e.showPrint ? ve((s(), A(v(ee), {
              key: 3,
              icon: "pi pi-print",
              text: "",
              rounded: "",
              disabled: !z.value,
              onClick: X
            }, null, 8, ["disabled"])), [
              [
                c,
                "Imprimir",
                void 0,
                { left: !0 }
              ]
            ]) : $("", !0),
            e.exportCsv ? ve((s(), A(v(ee), {
              key: 4,
              icon: "pi pi-download",
              text: "",
              rounded: "",
              loading: J.value,
              onClick: Q
            }, null, 8, ["loading"])), [
              [
                c,
                e.csvScope === "all" ? "Exportar tudo (CSV)" : "Exportar página (CSV)",
                void 0,
                { left: !0 }
              ]
            ]) : $("", !0)
          ])) : $("", !0)
        ], 2),
        e.contextMenu ? (s(), A(v(Zt), {
          key: 1,
          ref_key: "cm",
          ref: H,
          model: ae.value
        }, null, 8, ["model"])) : $("", !0),
        N(f.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => {
          var i;
          return [
            Y(ut, {
              visible: e.crud.dialogVisible.value,
              title: e.crud.dialogTitle.value,
              fields: e.crud.config.form,
              "form-data": e.crud.formData,
              "is-editing": e.crud.isEditing.value,
              saving: e.crud.saving.value,
              disabled: ((i = e.crud.viewMode) == null ? void 0 : i.value) ?? !1,
              width: e.dialogWidth,
              "form-columns": e.formColumns ?? e.crud.config.formColumns,
              "onUpdate:visible": h[14] || (h[14] = (p) => {
                e.crud.dialogVisible.value = p, p || (e.crud.editingItem.value = null);
              }),
              "onUpdate:field": h[15] || (h[15] = (p, o) => e.crud.setFormField(p, o)),
              onSave: h[16] || (h[16] = (p) => e.crud.save())
            }, ot({ _: 2 }, [
              ce(e.crud.config.form, (p) => ({
                name: `field-${p.field}`,
                fn: oe((o) => [
                  N(f.$slots, `field-${p.field}`, lt(st(o)))
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
    return (l, r) => (s(), A(v(Ct), {
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
  setup(e, { emit: t }) {
    const a = t;
    return (n, l) => (s(), m("div", co, [
      y("div", fo, [
        y("h2", mo, I(e.title), 1),
        e.subtitle ? (s(), m("p", po, I(e.subtitle), 1)) : $("", !0)
      ]),
      y("div", vo, [
        N(n.$slots, "actions"),
        e.actionLabel ? (s(), A(v(ee), {
          key: 0,
          label: e.actionLabel,
          icon: e.actionIcon,
          onClick: l[0] || (l[0] = (r) => a("action"))
        }, null, 8, ["label", "icon"])) : $("", !0)
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
  setup(e, { emit: t }) {
    const a = t;
    return (n, l) => (s(), m("div", go, [
      y("div", ho, [
        y("i", {
          class: de(e.icon)
        }, null, 2)
      ]),
      y("p", yo, I(e.title), 1),
      e.description ? (s(), m("p", bo, I(e.description), 1)) : $("", !0),
      e.actionLabel ? (s(), A(v(ee), {
        key: 1,
        label: e.actionLabel,
        icon: e.actionIcon,
        size: "small",
        class: "mt-3",
        onClick: l[0] || (l[0] = (r) => a("action"))
      }, null, 8, ["label", "icon"])) : $("", !0)
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
  return ze(wo);
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
    const t = e, a = ko();
    function n() {
      t.backTo ? a.push(typeof t.backTo == "string" ? { name: t.backTo } : t.backTo) : t.backRoute ? a.push({ name: t.backRoute }) : a.back();
    }
    return (l, r) => (s(), m("div", $o, [
      y("div", Co, [
        Y(v(ee), {
          icon: "pi pi-arrow-left",
          text: "",
          rounded: "",
          onClick: n
        }),
        e.icon ? (s(), m("i", {
          key: 0,
          class: de([e.icon, "w-detail-header-icon"])
        }, null, 2)) : $("", !0),
        y("div", Do, [
          y("h2", xo, I(e.title), 1),
          e.subtitle ? (s(), m("p", So, I(e.subtitle), 1)) : $("", !0)
        ]),
        e.status ? (s(), A(uo, {
          key: 1,
          value: e.status,
          map: e.statusMap
        }, null, 8, ["value", "map"])) : $("", !0)
      ]),
      y("div", Po, [
        N(l.$slots, "actions")
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
    const { formatCurrency: t, formatDate: a, formatNumber: n } = rt();
    function l(r) {
      const u = r.value;
      return u == null || u === "" ? "-" : r.format === "currency" ? t(Number(u)) : r.format === "date" ? a(String(u)) : r.format === "datetime" ? a(String(u), "DD/MM/YYYY HH:mm") : r.format === "number" ? n(Number(u)) : String(u);
    }
    return (r, u) => (s(), m("div", Vo, [
      e.title ? (s(), m("h3", Mo, I(e.title), 1)) : $("", !0),
      y("div", Eo, [
        (s(!0), m(ue, null, ce(e.fields, (b) => (s(), m("div", {
          key: b.label,
          class: "w-info-card-field"
        }, [
          y("span", Fo, I(b.label), 1),
          y("span", Ao, I(l(b)), 1)
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
}, Wo = {
  key: 0,
  class: "w-kpi-card__footer"
}, jo = /* @__PURE__ */ fe({
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
      class: de(["w-kpi-card", e.severity ? `w-kpi-card--${e.severity}` : ""])
    }, [
      e.loading ? (s(), m("div", Ro, [
        Y(v(Ge), {
          shape: "circle",
          size: "2.75rem"
        }),
        y("div", Io, [
          Y(v(Ge), {
            width: "6rem",
            height: "0.75rem"
          }),
          Y(v(Ge), {
            width: "7.5rem",
            height: "1.5rem"
          }),
          Y(v(Ge), {
            width: "5rem",
            height: "0.75rem"
          })
        ])
      ])) : (s(), m(ue, { key: 1 }, [
        y("div", To, [
          e.icon || t.$slots.icon ? (s(), m("div", Lo, [
            N(t.$slots, "icon", {}, () => [
              e.icon ? (s(), m("i", {
                key: 0,
                class: de(e.icon)
              }, null, 2)) : $("", !0)
            ])
          ])) : $("", !0),
          e.trend || t.$slots.trend ? (s(), m("div", zo, [
            N(t.$slots, "trend", {}, () => [
              e.trend ? (s(), m("span", {
                key: 0,
                class: de(["w-kpi-card__trend-badge", e.trend.direction ? `w-kpi-card__trend-badge--${e.trend.direction}` : ""])
              }, I(e.trend.value), 3)) : $("", !0)
            ])
          ])) : $("", !0)
        ]),
        y("div", No, [
          y("p", Yo, I(e.label), 1),
          y("div", Oo, [
            N(t.$slots, "value", {}, () => [
              Ee(I(e.value), 1)
            ])
          ]),
          e.hint || t.$slots.hint ? (s(), m("p", Bo, [
            N(t.$slots, "hint", {}, () => [
              Ee(I(e.hint), 1)
            ])
          ])) : $("", !0)
        ]),
        t.$slots.footer ? (s(), m("footer", Wo, [
          N(t.$slots, "footer")
        ])) : $("", !0)
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
    const t = e, a = q(() => [
      `w-kpi-grid--cols-${t.columns}`,
      { "w-kpi-grid--dense": t.dense }
    ]);
    return (n, l) => (s(), m("div", {
      class: de(["w-kpi-grid", a.value])
    }, [
      n.$slots.item ? (s(!0), m(ue, { key: 0 }, ce(e.items, (r, u) => N(n.$slots, "item", {
        key: u,
        item: r,
        index: u
      })), 128)) : (s(!0), m(ue, { key: 1 }, ce(e.items, (r, u) => (s(), A(jo, {
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
    return (t, a) => (s(), m("div", {
      class: de(["w-section-header", { "w-section-header--compact": e.compact }])
    }, [
      y("div", Uo, [
        e.icon || t.$slots.icon ? (s(), m("div", qo, [
          N(t.$slots, "icon", {}, () => [
            e.icon ? (s(), m("i", {
              key: 0,
              class: de(e.icon)
            }, null, 2)) : $("", !0)
          ])
        ])) : $("", !0),
        y("div", Ho, [
          y("div", Ko, [
            y("h3", Go, I(e.title), 1),
            N(t.$slots, "meta")
          ]),
          e.subtitle ? (s(), m("p", Jo, I(e.subtitle), 1)) : $("", !0)
        ])
      ]),
      t.$slots.actions ? (s(), m("div", Zo, [
        N(t.$slots, "actions")
      ])) : $("", !0)
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
    return (t, a) => (s(), m("section", {
      class: de(["w-form-section", e.variant ? `w-form-section--${e.variant}` : ""])
    }, [
      e.title || e.description || t.$slots.actions ? (s(), m("div", Xo, [
        y("div", Qo, [
          y("h3", _o, I(e.title), 1),
          e.description ? (s(), m("p", el, I(e.description), 1)) : $("", !0)
        ]),
        t.$slots.actions ? (s(), m("div", tl, [
          N(t.$slots, "actions")
        ])) : $("", !0)
      ])) : $("", !0),
      y("div", al, [
        N(t.$slots, "default")
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
    return (t, a) => (s(), m("div", {
      class: de(["w-action-bar", [
        `w-action-bar--${e.align}`,
        { "w-action-bar--stack": e.stackOnMobile }
      ]])
    }, [
      t.$slots.primary || t.$slots.default ? (s(), m("div", nl, [
        N(t.$slots, "primary", {}, () => [
          N(t.$slots, "default")
        ])
      ])) : $("", !0),
      t.$slots.filters ? (s(), m("div", ol, [
        N(t.$slots, "filters")
      ])) : $("", !0),
      t.$slots.secondary ? (s(), m("div", ll, [
        N(t.$slots, "secondary")
      ])) : $("", !0)
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
    const t = e, a = q(
      () => t.steps.findIndex((l) => l.key === t.currentStep)
    );
    function n(l) {
      return l < a.value ? "done" : l === a.value ? "current" : "pending";
    }
    return (l, r) => (s(), m("div", {
      class: de(["w-progress-flow", `w-progress-flow--${e.orientation}`])
    }, [
      (s(!0), m(ue, null, ce(e.steps, (u, b) => (s(), m("div", {
        key: u.key,
        class: de(["w-progress-flow__step", `w-progress-flow__step--${n(b)}`])
      }, [
        N(l.$slots, "step", {
          step: u,
          index: b,
          state: n(b)
        }, () => [
          y("div", sl, [
            y("span", null, I(b + 1), 1)
          ]),
          y("div", il, [
            y("p", rl, I(u.label), 1),
            u.description ? (s(), m("p", ul, I(u.description), 1)) : $("", !0)
          ])
        ])
      ], 2))), 128))
    ], 2));
  }
});
function dl(e, t, a) {
  const n = e;
  return Array.isArray(n.results) ? {
    data: n.results,
    page: n.page ?? t,
    page_size: n.page_size ?? a,
    rows: n.count ?? 0,
    extras: n.extras ?? {}
  } : Array.isArray(n.data) ? {
    data: n.data,
    page: n.page ?? t,
    page_size: n.page_size ?? a,
    rows: n.rows ?? 0,
    extras: n.extras ?? {}
  } : {
    data: Array.isArray(e) ? e : [],
    page: t,
    page_size: a,
    rows: Array.isArray(e) ? e.length : 0,
    extras: {}
  };
}
function cl(e) {
  return {
    async list(t, a = {}) {
      const n = await e.get(t, { params: a });
      return dl(
        n.data,
        Number(a.page ?? 1),
        Number(a.page_size ?? 20)
      );
    },
    async get(t, a, n) {
      return { data: (await e.get(`${t}${a}/`, n)).data };
    },
    async create(t, a, n) {
      return { data: (await e.post(t, a, n)).data };
    },
    async update(t, a, n, l) {
      return { data: (await e.patch(
        `${t}${a}/`,
        n,
        l
      )).data };
    },
    async delete(t, a) {
      await e.delete(`${t}${a}/`);
    }
  };
}
const ts = {
  install(e, t) {
    if (!(t != null && t.axios) && !(t != null && t.dataProvider))
      throw new Error(
        '[wPrimeVueComponents] Informe "axios" ou "dataProvider" ao registrar o WPrimeVuePlugin.'
      );
    const a = t.dataProvider ?? cl(t.axios), n = {
      axios: t.axios,
      dataProvider: a,
      defaultPageSize: t.defaultPageSize ?? 20,
      dateFormat: t.dateFormat ?? "DD/MM/YYYY",
      dateTimeFormat: t.dateTimeFormat ?? "DD/MM/YYYY HH:mm",
      locale: t.locale ?? "pt-BR",
      currency: t.currency ?? "BRL"
    };
    t.axios && e.provide(la, t.axios), e.provide(_e, a), e.provide(et, n), t.registerComponents !== !1 && (e.component("WCrudView", ro), e.component("WCrudFormDialog", ut), e.component("WCrudColumnRenderer", Qe), e.component("WAutoCompleteFK", Lt), e.component("WMoneyInput", zt), e.component("WTransferList", Nt));
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
function ml(e, t) {
  const a = {};
  for (const n of Object.keys(t))
    JSON.stringify(e[n]) !== JSON.stringify(t[n]) && (a[n] = t[n]);
  return a;
}
function as(e) {
  const {
    endpoint: t,
    columns: a,
    form: n,
    pk: l = "id",
    searchDebounce: r = 300,
    partialUpdate: u = !0,
    refetchOnSave: b = !0,
    canCreate: d = !0,
    canEdit: C = !0,
    canDelete: F = !0,
    rowActions: M = void 0,
    filterParams: B = void 0,
    createDefaults: T = void 0,
    transformPayload: K = void 0,
    onAfterSave: G = void 0,
    onAfterDelete: g = void 0
  } = e, k = ze(_e);
  if (!k)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const D = k, P = ze(et), W = e.pageSize ?? (P == null ? void 0 : P.defaultPageSize) ?? 20, j = { ...fl, ...e.labels }, z = It(), { confirmDelete: H } = Tt(), O = U([]), Z = U({}), le = U(!1), ae = U(!1), X = U(""), J = U(!1), Q = U(!1), f = U(null), h = be({});
  let c = null;
  const i = be({
    page: 1,
    pageSize: W,
    rows: 0,
    totalPages: 0
  }), p = be({
    field: null,
    order: 0
  });
  function o() {
    const S = {};
    for (const E of n)
      S[E.field] = E.defaultValue !== void 0 ? typeof E.defaultValue == "function" ? E.defaultValue() : E.defaultValue : null;
    return S;
  }
  const w = o();
  for (const S of Object.keys(w))
    h[S] = w[S];
  const ne = q(
    () => f.value !== null && !Q.value
  ), me = q(() => Q.value), we = q(
    () => Q.value ? j.viewTitle ?? "Visualizar Registro" : ne.value ? j.editTitle : j.createTitle
  ), se = q(() => i.page <= 1), ie = q(() => i.page >= i.totalPages);
  let he = null;
  async function re(S = {}) {
    le.value = !0;
    try {
      const E = {
        page: i.page,
        page_size: i.pageSize,
        ...S
      };
      X.value && (E.search = X.value), p.field && p.order !== 0 && (E.ordering = p.order === -1 ? `-${p.field}` : p.field), B && Object.assign(E, B());
      const R = await D.list(t, E);
      O.value = R.data, i.rows = R.rows, Z.value = R.extras ?? {}, R.page && (i.page = R.page), R.page_size && (i.pageSize = R.page_size), i.totalPages = Math.ceil(i.rows / i.pageSize) || 0;
    } finally {
      le.value = !1;
    }
  }
  async function ye() {
    await re();
  }
  async function Se() {
    await re();
  }
  async function Ae(S = 200) {
    const E = {};
    X.value && (E.search = X.value), p.field && p.order !== 0 && (E.ordering = p.order === -1 ? `-${p.field}` : p.field), B && Object.assign(E, B());
    const R = [];
    let _ = 1;
    const Ye = 1e4;
    for (; _ <= Ye; ) {
      const De = await D.list(t, {
        ...E,
        page: _,
        page_size: S
      });
      R.push(...De.data);
      const ke = De.rows ?? R.length;
      if (De.data.length === 0 || R.length >= ke) break;
      _++;
    }
    return R;
  }
  function Pe(S) {
    X.value = S, he && clearTimeout(he), he = setTimeout(() => {
      i.page = 1, re();
    }, r);
  }
  function Re(S) {
    const E = S.target;
    Pe(E.value);
  }
  function Ce(S) {
    i.page = S, re();
  }
  function Ve() {
    Ce(1);
  }
  function Ie() {
    Ce(i.totalPages);
  }
  function Te(S) {
    i.page = S.page + 1, i.pageSize = S.rows, re();
  }
  function Le(S) {
    p.field = S.sortField ?? null, p.order = S.sortOrder ?? 0, i.page = 1, re();
  }
  function x() {
    const S = o();
    for (const E of Object.keys(S))
      h[E] = S[E];
  }
  function V(S, E) {
    h[S] = E;
  }
  function te() {
    if (Q.value = !1, f.value = null, c = null, x(), T) {
      const S = T();
      for (const [E, R] of Object.entries(S))
        h[E] = R;
    }
    J.value = !0;
  }
  function L(S) {
    const E = {};
    for (const R of n) {
      let _ = S[R.field] !== void 0 ? S[R.field] : null;
      _ && (R.type === "date" || R.type === "datetime") && typeof _ == "string" && (_ = it(_)), h[R.field] = _, E[R.field] = _;
    }
    c = E;
  }
  function pe(S) {
    Q.value = !1, f.value = S, L(S), J.value = !0;
  }
  function Ot(S) {
    Q.value = !0, f.value = S, L(S), J.value = !0;
  }
  function Bt(S) {
    Q.value = !1, f.value = null, c = null, x();
    for (const E of n) {
      if (E.field === l) continue;
      let R = S[E.field] !== void 0 ? S[E.field] : h[E.field];
      R && (E.type === "date" || E.type === "datetime") && typeof R == "string" && (R = it(R)), h[E.field] = R;
    }
    if (T) {
      const E = T();
      for (const [R, _] of Object.entries(E))
        h[R] = _;
    }
    J.value = !0;
  }
  function dt(S) {
    const E = { ...S };
    for (const R of n) {
      const _ = E[R.field];
      if (R.type === "date" && _ instanceof Date ? E[R.field] = St(_) : R.type === "datetime" && _ instanceof Date && (E[R.field] = Pt(_)), R.type === "fk" && _ !== null && typeof _ == "object") {
        const Ye = R.optionValue || "id";
        E[R.field] = _[Ye] ?? _;
      }
      (R.type === "mask" || R.type === "cpf_cnpj") && typeof _ == "string" && (E[R.field] = Fe(_));
    }
    return E;
  }
  async function Wt() {
    for (const S of n) {
      if (S.validate) {
        const E = S.validate(h[S.field]);
        if (E)
          return z.error(E), null;
      }
      if (S.required) {
        const E = h[S.field];
        if (E == null || E === "")
          return z.error(`${S.label} é obrigatório`), null;
      }
    }
    ae.value = !0;
    try {
      let S = dt(h);
      if (!ne.value && T && Object.assign(S, T()), ne.value && u && c) {
        const ke = dt(c);
        if (S = ml(ke, S), Object.keys(S).length === 0 && !K) {
          J.value = !1;
          const Me = f.value;
          return f.value = null, c = null, Me;
        }
      }
      K && (S = K(S, ne.value));
      const E = n.some(
        (ke) => ke.type === "image" && S[ke.field] instanceof File
      );
      let R = S, _;
      if (E) {
        const ke = new Set(
          n.filter((xe) => xe.type === "image").map((xe) => xe.field)
        ), Me = new FormData();
        for (const [xe, Be] of Object.entries(S))
          if (Be != null)
            if (Be instanceof File)
              Me.append(xe, Be);
            else {
              if (ke.has(xe))
                continue;
              Me.append(xe, String(Be));
            }
        R = Me, _ = { "Content-Type": "multipart/form-data" };
      }
      const Ye = _ ? { headers: _ } : void 0;
      let De;
      if (ne.value && f.value) {
        const ke = f.value[l];
        if (De = await D.update(
          t,
          ke,
          R,
          Ye
        ), !b) {
          const Me = O.value.findIndex(
            (xe) => xe[l] === ke
          );
          Me !== -1 && (O.value[Me] = De.data);
        }
        z.success(j.successUpdate);
      } else
        De = await D.create(t, R, Ye), b || (O.value.unshift(De.data), i.rows++), z.success(j.successCreate);
      return J.value = !1, f.value = null, c = null, b && await re(), G && G(De.data, ne.value), De.data;
    } catch (S) {
      return z.error(Ke(S, "Erro ao salvar registro")), null;
    } finally {
      ae.value = !1;
    }
  }
  function jt(S) {
    H(async () => {
      try {
        const E = S[l];
        await D.delete(t, E);
        const R = O.value.findIndex((_) => _[l] === E);
        R !== -1 && (O.value.splice(R, 1), i.rows--), z.success(j.successDelete), g && g(S);
      } catch (E) {
        z.error(Ke(E, "Erro ao excluir registro"));
      }
    }, j.deleteConfirmMessage);
  }
  return {
    items: O,
    extras: Z,
    loading: le,
    saving: ae,
    search: X,
    dialogVisible: J,
    editingItem: f,
    formData: h,
    pagination: i,
    sort: p,
    isEditing: ne,
    isViewing: me,
    viewMode: Q,
    dialogTitle: we,
    isFirstPage: se,
    isLastPage: ie,
    init: ye,
    fetchItems: re,
    fetchAll: Ae,
    refresh: Se,
    setSearch: Pe,
    onSearch: Re,
    onPage: Te,
    onSort: Le,
    openCreateDialog: te,
    openEditDialog: pe,
    openViewDialog: Ot,
    openDuplicateDialog: Bt,
    save: Wt,
    confirmDelete: jt,
    setFormField: V,
    resetForm: x,
    goToPage: Ce,
    firstPage: Ve,
    lastPage: Ie,
    config: e
  };
}
function ns(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: n = !1 } = e, l = ze(_e);
  if (!l)
    throw new Error(
      "[wPrimeVueComponents] dataProvider não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const r = l, u = ze(et), b = e.pageSize ?? (u == null ? void 0 : u.defaultPageSize) ?? 20, d = U([]), C = U(!1), F = U(""), M = U({}), B = be({}), T = be({
    page: 1,
    pageSize: b,
    rows: 0,
    totalPages: 0
  }), K = be({
    field: null,
    order: 0
  });
  let G = null;
  async function g(H = {}) {
    C.value = !0;
    try {
      const O = {
        page: T.page,
        page_size: T.pageSize,
        ...H
      };
      F.value && (O.search = F.value), K.field && K.order !== 0 && (O.ordering = K.order === -1 ? `-${K.field}` : K.field);
      for (const [le, ae] of Object.entries(B))
        ae != null && ae !== "" && (O[le] = ae);
      const Z = await r.list(t, O);
      d.value = Z.data, T.rows = Z.rows, Z.page && (T.page = Z.page), Z.page_size && (T.pageSize = Z.page_size), T.totalPages = Math.ceil(T.rows / T.pageSize) || 0, M.value = Z.extras ?? {};
    } finally {
      C.value = !1;
    }
  }
  async function k() {
    await g();
  }
  function D(H) {
    F.value = H, G && clearTimeout(G), G = setTimeout(() => {
      T.page = 1, g();
    }, a);
  }
  function P(H, O) {
    B[H] = O, T.page = 1, g();
  }
  function W() {
    for (const H of Object.keys(B))
      delete B[H];
    T.page = 1, g();
  }
  function j(H) {
    T.page = H.page + 1, T.pageSize = H.rows, g();
  }
  function z(H) {
    K.field = H.sortField ?? null, K.order = H.sortOrder ?? 0, T.page = 1, g();
  }
  return n && g(), {
    items: d,
    loading: C,
    search: F,
    pagination: T,
    sort: K,
    extras: M,
    fetchItems: g,
    refresh: k,
    setSearch: D,
    setFilter: P,
    clearFilters: W,
    onPage: j,
    onSort: z
  };
}
function pl(e) {
  return e.split("?")[0].replace(/^\/+|\/+$/g, "").replace(/^api\/v\d+\//, "");
}
function vl(e) {
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
function je(e, t) {
  var l, r;
  const a = pl(e), n = (l = t.resources) == null ? void 0 : l[a];
  if (n)
    return vl(n);
  if ((r = t.allowedTables) != null && r.includes(a))
    return { table: a };
  throw Yt(
    `Recurso Supabase nao registrado para o endpoint "${e}".`,
    404
  );
}
function gl(e, t, a) {
  const n = /* @__PURE__ */ new Set(["page", "page_size", "search", "ordering"]), l = { ...a.defaultFilters, ...t };
  for (const [r, u] of Object.entries(l))
    n.has(r) || u === null || u === void 0 || u === "" || (e = e.eq(r, u));
  return e;
}
function hl(e, t, a) {
  if (typeof t != "string" || !t.trim() || !(a != null && a.length))
    return e;
  const n = t.trim().replace(/,/g, "\\,"), l = a.map((r) => `${r}.ilike.%${n}%`).join(",");
  return e.or(l);
}
function yl(e, t) {
  const a = typeof e == "string" && e ? e : t;
  return a ? {
    field: a.startsWith("-") ? a.slice(1) : a,
    ascending: !a.startsWith("-")
  } : null;
}
function bl(e, t) {
  return e ? t.mapListItem ? e.map(
    (a) => {
      var n;
      return (n = t.mapListItem) == null ? void 0 : n.call(t, a);
    }
  ) : e : [];
}
function os(e) {
  const t = e.defaultSelect ?? "*";
  return {
    async list(a, n = {}) {
      var B;
      const l = je(a, e), r = Math.max(Number(n.page ?? 1), 1), u = Math.max(Number(n.page_size ?? 20), 1), b = (r - 1) * u, d = b + u - 1;
      let C = e.client.from(l.table).select(l.select ?? t, { count: "exact" });
      C = gl(C, n, l), C = hl(C, n.search, l.searchFields);
      const F = yl(n.ordering, l.defaultOrdering);
      F && (C = C.order(F.field, { ascending: F.ascending }));
      const M = await C.range(b, d);
      return M.error && We(M.error), {
        data: bl(M.data, l),
        page: r,
        page_size: u,
        rows: M.count ?? ((B = M.data) == null ? void 0 : B.length) ?? 0,
        extras: {}
      };
    },
    async get(a, n, l) {
      const r = je(a, e), u = r.pk ?? "id", b = await e.client.from(r.table).select(r.select ?? t).eq(u, n).single();
      return b.error && We(b.error), { data: b.data };
    },
    async create(a, n, l) {
      const r = je(a, e), u = wt(n), b = r.mapPayload ? r.mapPayload(u, "create") : u, d = await e.client.from(r.table).insert(b).select(r.select ?? t).single();
      return d.error && We(d.error), { data: d.data };
    },
    async update(a, n, l, r) {
      const u = je(a, e), b = u.pk ?? "id", d = wt(l), C = u.mapPayload ? u.mapPayload(d, "update") : d, F = await e.client.from(u.table).update(C).eq(b, n).select(u.select ?? t).single();
      return F.error && We(F.error), { data: F.data };
    },
    async delete(a, n) {
      const l = je(a, e), r = l.pk ?? "id", u = l.softDelete === !0 ? { is_active: !1 } : typeof l.softDelete == "object" ? l.softDelete : null, b = u ? await e.client.from(l.table).update(u).eq(r, n) : await e.client.from(l.table).delete().eq(r, n);
      b.error && We(b.error);
    }
  };
}
export {
  fl as DEFAULT_CRUD_LABELS,
  _l as WActionBar,
  Lt as WAutoCompleteFK,
  Qe as WCrudColumnRenderer,
  ut as WCrudFormDialog,
  ro as WCrudView,
  Gl as WDetailHeader,
  Kl as WEmptyState,
  xn as WFormRenderer,
  Ql as WFormSection,
  Jl as WInfoCard,
  jo as WKpiCard,
  Zl as WKpiGrid,
  zt as WMoneyInput,
  Hl as WPageHeader,
  ts as WPrimeVuePlugin,
  es as WProgressFlow,
  Xl as WSectionHeader,
  uo as WStatusTag,
  Nt as WTransferList,
  la as W_AXIOS_KEY,
  et as W_CONFIG_KEY,
  _e as W_DATA_PROVIDER_KEY,
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
  Tt as useAppConfirm,
  It as useAppToast,
  as as useCrudManager,
  rt as useFormatters
};
//# sourceMappingURL=index.js.map
