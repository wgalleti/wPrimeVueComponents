import { inject as Me, defineComponent as Re, openBlock as h, createElementBlock as I, createBlock as T, unref as $, toDisplayString as Q, ref as L, watch as Ne, computed as W, reactive as ie, resolveDirective as at, Fragment as ge, createElementVNode as E, createVNode as q, withDirectives as Se, withCtx as K, createCommentVNode as H, renderList as he, normalizeStyle as Fe, createTextVNode as Be, renderSlot as X, normalizeClass as ot, isRef as Dt, withModifiers as $t, createSlots as Oe, normalizeProps as We, guardReactiveProps as qe, onMounted as Ct } from "vue";
import lt from "primevue/datatable";
import Pe from "primevue/column";
import se from "primevue/button";
import ve from "primevue/inputtext";
import nt from "primevue/iconfield";
import rt from "primevue/inputicon";
import xt from "primevue/tag";
import Ce from "dayjs";
import st from "primevue/dialog";
import Ze from "primevue/inputnumber";
import St from "primevue/textarea";
import Pt from "primevue/select";
import it from "primevue/autocomplete";
import Je from "primevue/datepicker";
import Mt from "primevue/toggleswitch";
import Vt from "primevue/colorpicker";
import At from "primevue/password";
import { useToast as Ft } from "primevue/usetoast";
import { useConfirm as Et } from "primevue/useconfirm";
const je = Symbol("w-axios"), ze = Symbol("w-config");
function Yt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Le = { exports: {} }, Rt = Le.exports, Xe;
function Tt() {
  return Xe || (Xe = 1, (function(e, t) {
    (function(a, l) {
      e.exports = l();
    })(Rt, (function() {
      var a = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, l = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, r = /\d/, d = /\d\d/, m = /\d\d?/, g = /\d*[^-_:/,()\s\d]+/, c = {}, b = function(n) {
        return (n = +n) + (n > 68 ? 1900 : 2e3);
      }, S = function(n) {
        return function(f) {
          this[n] = +f;
        };
      }, j = [/[+-]\d\d:?(\d\d)?|Z/, function(n) {
        (this.zone || (this.zone = {})).offset = (function(f) {
          if (!f || f === "Z") return 0;
          var C = f.match(/([+-]|\d\d)/g), s = 60 * C[1] + (+C[2] || 0);
          return s === 0 ? 0 : C[0] === "+" ? -s : s;
        })(n);
      }], U = function(n) {
        var f = c[n];
        return f && (f.indexOf ? f : f.s.concat(f.f));
      }, M = function(n, f) {
        var C, s = c.meridiem;
        if (s) {
          for (var k = 1; k <= 24; k += 1) if (n.indexOf(s(k, 0, f)) > -1) {
            C = k > 12;
            break;
          }
        } else C = n === (f ? "pm" : "PM");
        return C;
      }, Y = { A: [g, function(n) {
        this.afternoon = M(n, !1);
      }], a: [g, function(n) {
        this.afternoon = M(n, !0);
      }], Q: [r, function(n) {
        this.month = 3 * (n - 1) + 1;
      }], S: [r, function(n) {
        this.milliseconds = 100 * +n;
      }], SS: [d, function(n) {
        this.milliseconds = 10 * +n;
      }], SSS: [/\d{3}/, function(n) {
        this.milliseconds = +n;
      }], s: [m, S("seconds")], ss: [m, S("seconds")], m: [m, S("minutes")], mm: [m, S("minutes")], H: [m, S("hours")], h: [m, S("hours")], HH: [m, S("hours")], hh: [m, S("hours")], D: [m, S("day")], DD: [d, S("day")], Do: [g, function(n) {
        var f = c.ordinal, C = n.match(/\d+/);
        if (this.day = C[0], f) for (var s = 1; s <= 31; s += 1) f(s).replace(/\[|\]/g, "") === n && (this.day = s);
      }], w: [m, S("week")], ww: [d, S("week")], M: [m, S("month")], MM: [d, S("month")], MMM: [g, function(n) {
        var f = U("months"), C = (U("monthsShort") || f.map((function(s) {
          return s.slice(0, 3);
        }))).indexOf(n) + 1;
        if (C < 1) throw new Error();
        this.month = C % 12 || C;
      }], MMMM: [g, function(n) {
        var f = U("months").indexOf(n) + 1;
        if (f < 1) throw new Error();
        this.month = f % 12 || f;
      }], Y: [/[+-]?\d+/, S("year")], YY: [d, function(n) {
        this.year = b(n);
      }], YYYY: [/\d{4}/, S("year")], Z: j, ZZ: j };
      function z(n) {
        var f, C;
        f = n, C = c && c.formats;
        for (var s = (n = f.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(o, u, x) {
          var A = x && x.toUpperCase();
          return u || C[x] || a[x] || C[A].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(_, G, J) {
            return G || J.slice(1);
          }));
        }))).match(l), k = s.length, V = 0; V < k; V += 1) {
          var Z = s[V], F = Y[Z], i = F && F[0], w = F && F[1];
          s[V] = w ? { regex: i, parser: w } : Z.replace(/^\[|\]$/g, "");
        }
        return function(o) {
          for (var u = {}, x = 0, A = 0; x < k; x += 1) {
            var _ = s[x];
            if (typeof _ == "string") A += _.length;
            else {
              var G = _.regex, J = _.parser, ue = o.slice(A), ee = G.exec(ue)[0];
              J.call(u, ee), o = o.replace(ee, "");
            }
          }
          return (function(oe) {
            var te = oe.afternoon;
            if (te !== void 0) {
              var O = oe.hours;
              te ? O < 12 && (oe.hours += 12) : O === 12 && (oe.hours = 0), delete oe.afternoon;
            }
          })(u), u;
        };
      }
      return function(n, f, C) {
        C.p.customParseFormat = !0, n && n.parseTwoDigitYear && (b = n.parseTwoDigitYear);
        var s = f.prototype, k = s.parse;
        s.parse = function(V) {
          var Z = V.date, F = V.utc, i = V.args;
          this.$u = F;
          var w = i[1];
          if (typeof w == "string") {
            var o = i[2] === !0, u = i[3] === !0, x = o || u, A = i[2];
            u && (A = i[2]), c = this.$locale(), !o && A && (c = C.Ls[A]), this.$d = (function(ue, ee, oe, te) {
              try {
                if (["x", "X"].indexOf(ee) > -1) return new Date((ee === "X" ? 1e3 : 1) * ue);
                var O = z(ee)(ue), be = O.year, de = O.month, xe = O.day, Ve = O.hours, le = O.minutes, ke = O.seconds, ne = O.milliseconds, ae = O.zone, ce = O.week, fe = /* @__PURE__ */ new Date(), we = xe || (be || de ? 1 : fe.getDate()), De = be || fe.getFullYear(), me = 0;
                be && !de || (me = de > 0 ? de - 1 : fe.getMonth());
                var pe, $e = Ve || 0, y = le || 0, P = ke || 0, p = ne || 0;
                return ae ? new Date(Date.UTC(De, me, we, $e, y, P, p + 60 * ae.offset * 1e3)) : oe ? new Date(Date.UTC(De, me, we, $e, y, P, p)) : (pe = new Date(De, me, we, $e, y, P, p), ce && (pe = te(pe).week(ce).toDate()), pe);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            })(Z, w, F, C), this.init(), A && A !== !0 && (this.$L = this.locale(A).$L), x && Z != this.format(w) && (this.$d = /* @__PURE__ */ new Date("")), c = {};
          } else if (w instanceof Array) for (var _ = w.length, G = 1; G <= _; G += 1) {
            i[1] = w[G - 1];
            var J = C.apply(this, i);
            if (J.isValid()) {
              this.$d = J.$d, this.$L = J.$L, this.init();
              break;
            }
            G === _ && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else k.call(this, V);
        };
      };
    }));
  })(Le)), Le.exports;
}
var Lt = Tt();
const It = /* @__PURE__ */ Yt(Lt);
Ce.extend(It);
function ut(e) {
  if (!e) return null;
  if (e instanceof Date) return e;
  const t = Ce(e, "YYYY-MM-DD", !0);
  return t.isValid() ? t.toDate() : Ce(e).toDate();
}
function dt(e) {
  return e ? typeof e == "string" ? e : Ce(e).format("YYYY-MM-DD") : null;
}
function ct(e) {
  return e ? typeof e == "string" ? e : Ce(e).toISOString() : null;
}
function jt(e, t = "DD/MM/YYYY") {
  return e ? Ce(e).format(t) : "—";
}
function zt(e) {
  return e ? Ce(e).format("DD/MM/YYYY HH:mm") : "—";
}
function ye(e) {
  return e.replace(/\D/g, "");
}
function ft(e) {
  if (!e) return "—";
  const t = ye(e);
  return t.length !== 11 ? e : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}
function mt(e) {
  if (!e) return "—";
  const t = ye(e);
  return t.length !== 14 ? e : t.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}
function Ut(e) {
  if (!e) return "—";
  const t = ye(e);
  return t.length === 11 ? ft(e) : t.length === 14 ? mt(e) : e;
}
function Nt(e) {
  if (!e) return "—";
  const t = ye(e);
  return t.length === 11 ? t.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3") : t.length === 10 ? t.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3") : e;
}
function pt(e) {
  if (!e) return null;
  const t = ye(e);
  if (t.length !== 11) return "CPF deve ter 11 dígitos.";
  if (/^(\d)\1{10}$/.test(t)) return "CPF inválido.";
  let a = 0;
  for (let m = 0; m < 9; m++) a += parseInt(t[m]) * (10 - m);
  let l = a % 11;
  const r = l < 2 ? 0 : 11 - l;
  if (parseInt(t[9]) !== r) return "CPF inválido.";
  a = 0;
  for (let m = 0; m < 10; m++) a += parseInt(t[m]) * (11 - m);
  l = a % 11;
  const d = l < 2 ? 0 : 11 - l;
  return parseInt(t[10]) !== d ? "CPF inválido." : null;
}
function vt(e) {
  if (!e) return null;
  const t = ye(e);
  if (t.length !== 14) return "CNPJ deve ter 14 dígitos.";
  if (/^(\d)\1{13}$/.test(t)) return "CNPJ inválido.";
  const a = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let l = 0;
  for (let c = 0; c < 12; c++) l += parseInt(t[c]) * a[c];
  let r = l % 11;
  const d = r < 2 ? 0 : 11 - r;
  if (parseInt(t[12]) !== d) return "CNPJ inválido.";
  const m = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  l = 0;
  for (let c = 0; c < 13; c++) l += parseInt(t[c]) * m[c];
  r = l % 11;
  const g = r < 2 ? 0 : 11 - r;
  return parseInt(t[13]) !== g ? "CNPJ inválido." : null;
}
function Bt(e) {
  if (!e) return null;
  const t = ye(e);
  return t.length === 11 ? pt(e) : t.length === 14 ? vt(e) : "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos.";
}
const Ie = /* @__PURE__ */ new Map();
function Qe(e, t) {
  const a = `${e}-${t}`;
  let l = Ie.get(a);
  return l || (l = new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }), Ie.set(a, l)), l;
}
function Ot(e, t) {
  const a = `${e}-${t}`;
  let l = Ie.get(a);
  return l || (l = new Intl.NumberFormat(e, {
    style: "currency",
    currency: t
  }), Ie.set(a, l)), l;
}
function gt() {
  const e = Me(ze, {
    defaultPageSize: 20,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    locale: "pt-BR",
    currency: "BRL"
  }), t = (e == null ? void 0 : e.locale) ?? "pt-BR", a = (e == null ? void 0 : e.currency) ?? "BRL";
  function l(c) {
    return c == null ? "—" : Ot(t, a).format(c);
  }
  function r(c, b = 2) {
    return c == null ? "—" : Qe(t, b).format(c);
  }
  function d(c, b) {
    return jt(c, b ?? (e == null ? void 0 : e.dateFormat) ?? "DD/MM/YYYY");
  }
  function m(c) {
    return zt(c);
  }
  function g(c) {
    return c == null ? "—" : `${Qe(t, 2).format(c)}%`;
  }
  return {
    formatCurrency: l,
    formatNumber: r,
    formatDate: d,
    formatDateTime: m,
    formatPercent: g,
    formatCpf: ft,
    formatCnpj: mt,
    formatCpfCnpj: Ut,
    formatTelefone: Nt,
    validateCpf: pt,
    validateCnpj: vt,
    validateCpfCnpj: Bt,
    parseDate: ut,
    toDateString: dt,
    toDateTimeString: ct
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
}, He = /* @__PURE__ */ Re({
  __name: "WCrudColumnRenderer",
  props: {
    column: {},
    value: {},
    rowData: {}
  },
  setup(e) {
    const { formatDate: t, formatDateTime: a, formatCurrency: l, formatNumber: r } = gt();
    return (d, m) => e.value == null ? (h(), I("span", Wt, "—")) : e.column.type === "image" ? (h(), I("img", {
      key: 1,
      src: String(e.value),
      alt: e.column.header,
      class: "size-9 rounded-lg object-cover ring-1 ring-surface-200 dark:ring-surface-700"
    }, null, 8, qt)) : e.column.type === "boolean" ? (h(), T($(xt), {
      key: 2,
      value: e.column.tagValue ? e.column.tagValue(e.value, e.rowData) : e.value ? "Ativo" : "Inativo",
      severity: e.column.tagSeverity ? e.column.tagSeverity(e.value, e.rowData) : e.value ? "success" : "danger",
      class: "text-xs"
    }, null, 8, ["value", "severity"])) : e.column.type === "date" ? (h(), I("span", Ht, Q($(t)(e.value)), 1)) : e.column.type === "datetime" ? (h(), I("span", Kt, Q($(a)(e.value)), 1)) : e.column.type === "currency" ? (h(), I("span", Zt, Q($(l)(e.value)), 1)) : e.column.type === "number" ? (h(), I("span", Jt, Q(e.column.format ? e.column.format(e.value, e.rowData) : $(r)(e.value, e.column.decimals ?? 0)), 1)) : (h(), I("span", Xt, Q(e.column.format ? e.column.format(e.value, e.rowData) : e.value), 1));
  }
});
var Qt = Object.defineProperty, Gt = (e, t, a) => t in e ? Qt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a, Ee = (e, t, a) => Gt(e, typeof t != "symbol" ? t + "" : t, a);
const Ge = {
  "#": { pattern: /[0-9]/ },
  "@": { pattern: /[a-zA-Z]/ },
  "*": { pattern: /[a-zA-Z0-9]/ }
}, _e = (e, t, a) => e.replaceAll(t, "").replace(a, ".").replace("..", ".").replace(/[^.\d]/g, ""), et = (e, t, a) => {
  var l;
  return new Intl.NumberFormat(((l = a.number) == null ? void 0 : l.locale) ?? "en", {
    minimumFractionDigits: e,
    maximumFractionDigits: t,
    roundingMode: "trunc"
  });
}, _t = (e, t = !0, a) => {
  var l, r, d, m;
  const g = ((l = a.number) == null ? void 0 : l.unsigned) !== !0 && e.startsWith("-") ? "-" : "", c = ((r = a.number) == null ? void 0 : r.fraction) ?? 0;
  let b = et(0, c, a);
  const S = b.formatToParts(1000.12), j = ((d = S.find((n) => n.type === "group")) == null ? void 0 : d.value) ?? " ", U = ((m = S.find((n) => n.type === "decimal")) == null ? void 0 : m.value) ?? ".", M = _e(e, j, U);
  if (Number.isNaN(parseFloat(M))) return g;
  const Y = M.split(".");
  if (Y[1] != null && Y[1].length >= 1) {
    const n = Y[1].length <= c ? Y[1].length : c;
    b = et(n, c, a);
  }
  let z = b.format(parseFloat(M));
  return t ? c > 0 && M.endsWith(".") && !M.slice(0, -1).includes(".") && (z += U) : z = _e(z, j, U), g + z;
}, ht = (e) => JSON.parse(e.replaceAll("'", '"')), ea = (e, t = {}) => {
  const a = { ...t };
  e.dataset.maska != null && e.dataset.maska !== "" && (a.mask = ta(e.dataset.maska)), e.dataset.maskaEager != null && (a.eager = Te(e.dataset.maskaEager)), e.dataset.maskaReversed != null && (a.reversed = Te(e.dataset.maskaReversed)), e.dataset.maskaTokensReplace != null && (a.tokensReplace = Te(e.dataset.maskaTokensReplace)), e.dataset.maskaTokens != null && (a.tokens = aa(e.dataset.maskaTokens));
  const l = {};
  return e.dataset.maskaNumberLocale != null && (l.locale = e.dataset.maskaNumberLocale), e.dataset.maskaNumberFraction != null && (l.fraction = parseInt(e.dataset.maskaNumberFraction)), e.dataset.maskaNumberUnsigned != null && (l.unsigned = Te(e.dataset.maskaNumberUnsigned)), (e.dataset.maskaNumber != null || Object.values(l).length > 0) && (a.number = l), a;
}, Te = (e) => e !== "" ? !!JSON.parse(e) : !0, ta = (e) => e.startsWith("[") && e.endsWith("]") ? ht(e) : e, aa = (e) => {
  if (e.startsWith("{") && e.endsWith("}"))
    return ht(e);
  const t = {};
  return e.split("|").forEach((a) => {
    const l = a.split(":");
    t[l[0]] = {
      pattern: yt() ? new RegExp(l[1], "u") : new RegExp(l[1]),
      optional: l[2] === "optional",
      multiple: l[2] === "multiple",
      repeated: l[2] === "repeated"
    };
  }), t;
}, yt = () => {
  try {
    return new RegExp("\\p{L}", "u"), !0;
  } catch {
    return !1;
  }
};
class oa {
  constructor(t = {}) {
    Ee(this, "opts", {}), Ee(this, "memo", /* @__PURE__ */ new Map());
    const a = { ...t };
    if (a.tokens != null) {
      a.tokens = a.tokensReplace ? { ...a.tokens } : { ...Ge, ...a.tokens };
      for (const l of Object.values(a.tokens))
        typeof l.pattern == "string" && (l.pattern = yt() ? new RegExp(l.pattern, "u") : new RegExp(l.pattern));
    } else
      a.tokens = Ge;
    Array.isArray(a.mask) && (a.mask.length > 1 ? a.mask = [...a.mask].sort((l, r) => l.length - r.length) : a.mask = a.mask[0] ?? ""), a.mask === "" && (a.mask = null), this.opts = a;
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
    const l = this.process(String(t), a).length;
    return typeof this.opts.mask == "string" ? l >= this.opts.mask.length : l >= a.length;
  }
  findMask(t) {
    const a = this.opts.mask;
    if (a == null)
      return null;
    if (typeof a == "string")
      return a;
    if (typeof a == "function")
      return a(t);
    const l = this.process(t, a.slice(-1).pop() ?? "", !1);
    return a.find((r) => this.process(t, r, !1).length >= l.length) ?? "";
  }
  escapeMask(t) {
    const a = [], l = [];
    return t.split("").forEach((r, d) => {
      r === "!" && t[d - 1] !== "!" ? l.push(d - l.length) : a.push(r);
    }), { mask: a.join(""), escaped: l };
  }
  process(t, a, l = !0) {
    if (this.opts.number != null) return _t(t, l, this.opts);
    if (a == null) return t;
    const r = `v=${t},mr=${a},m=${l ? 1 : 0}`;
    if (this.memo.has(r)) return this.memo.get(r);
    const { mask: d, escaped: m } = this.escapeMask(a), g = [], c = this.opts.tokens != null ? this.opts.tokens : {}, b = this.isReversed() ? -1 : 1, S = this.isReversed() ? "unshift" : "push", j = this.isReversed() ? 0 : d.length - 1, U = this.isReversed() ? () => n > -1 && f > -1 : () => n < d.length && f < t.length, M = (s) => !this.isReversed() && s <= j || this.isReversed() && s >= j;
    let Y, z = -1, n = this.isReversed() ? d.length - 1 : 0, f = this.isReversed() ? t.length - 1 : 0, C = !1;
    for (; U(); ) {
      const s = d.charAt(n), k = c[s], V = (k == null ? void 0 : k.transform) != null ? k.transform(t.charAt(f)) : t.charAt(f);
      if (!m.includes(n) && k != null ? (V.match(k.pattern) != null ? (g[S](V), k.repeated ? (z === -1 ? z = n : n === j && n !== z && (n = z - b), j === z && (n -= b)) : k.multiple && (C = !0, n -= b), n += b) : k.multiple ? C && (n += b, f -= b, C = !1) : V === Y ? Y = void 0 : k.optional && (n += b, f -= b), f += b) : (l && !this.isEager() && g[S](s), V === s && !this.isEager() ? f += b : Y = s, this.isEager() || (n += b)), this.isEager())
        for (; M(n) && (c[d.charAt(n)] == null || m.includes(n)); ) {
          if (l) {
            if (g[S](d.charAt(n)), t.charAt(f) === d.charAt(n)) {
              n += b, f += b;
              continue;
            }
          } else d.charAt(n) === t.charAt(f) && (f += b);
          n += b;
        }
    }
    return this.memo.set(r, g.join("")), this.memo.get(r);
  }
}
class la {
  constructor(t, a = {}) {
    Ee(this, "items", /* @__PURE__ */ new Map()), Ee(this, "eventAbortController"), Ee(this, "onInput", (l) => {
      if (l instanceof CustomEvent && l.type === "input" && !l.isTrusted && !l.bubbles)
        return;
      const r = l.target, d = this.items.get(r);
      if (d === void 0) return;
      const m = "inputType" in l && l.inputType.startsWith("delete"), g = d.isEager(), c = m && g && d.unmasked(r.value) === "" ? "" : r.value;
      this.fixCursor(r, m, () => this.setValue(r, c));
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
    for (const l of t) {
      if (!this.items.has(l)) {
        const { signal: d } = this.eventAbortController;
        l.addEventListener("input", this.onInput, { capture: !0, signal: d });
      }
      const r = new oa(ea(l, a));
      this.items.set(l, r), queueMicrotask(() => this.updateValue(l)), l.selectionStart === null && r.isEager() && console.warn("Maska: input of `%s` type is not supported", l.type);
    }
  }
  getInputs(t) {
    return typeof t == "string" ? Array.from(document.querySelectorAll(t)) : "length" in t ? Array.from(t) : [t];
  }
  getOptions(t) {
    const { onMaska: a, preProcess: l, postProcess: r, ...d } = t;
    return d;
  }
  fixCursor(t, a, l) {
    var r, d;
    const m = t.selectionStart, g = t.value;
    if (l(), m === null || m === g.length && !a) return;
    const c = t.value, b = g.slice(0, m), S = c.slice(0, m), j = (r = this.processInput(t, b)) == null ? void 0 : r.unmasked, U = (d = this.processInput(t, S)) == null ? void 0 : d.unmasked;
    if (j === void 0 || U === void 0) return;
    let M = m;
    b !== S && (M += a ? c.length - g.length : j.length - U.length), t.setSelectionRange(M, M);
  }
  setValue(t, a) {
    const l = this.processInput(t, a);
    l !== void 0 && (t.value = l.masked, this.options.onMaska != null && (Array.isArray(this.options.onMaska) ? this.options.onMaska.forEach((r) => r(l)) : this.options.onMaska(l)), t.dispatchEvent(new CustomEvent("maska", { detail: l })), t.dispatchEvent(new CustomEvent("input", { detail: l.masked })));
  }
  processInput(t, a) {
    const l = this.items.get(t);
    if (l === void 0) return;
    let r = a ?? t.value;
    this.options.preProcess != null && (r = this.options.preProcess(r));
    let d = l.masked(r);
    return this.options.postProcess != null && (d = this.options.postProcess(d)), {
      masked: d,
      unmasked: l.unmasked(r),
      completed: l.completed(r)
    };
  }
}
const Ue = /* @__PURE__ */ new WeakMap(), na = (e, t) => {
  if (e.arg == null || e.instance == null) return;
  const a = "setup" in e.instance.$.type;
  e.arg in e.instance ? e.instance[e.arg] = t : a && console.warn("Maska: please expose `%s` using defineExpose", e.arg);
}, tt = (e, t) => {
  var a;
  const l = e instanceof HTMLInputElement ? e : e.querySelector("input");
  if (l == null || (l == null ? void 0 : l.type) === "file") return;
  let r = {};
  if (t.value != null && (r = typeof t.value == "string" ? { mask: t.value } : { ...t.value }), t.arg != null) {
    const d = (m) => {
      const g = t.modifiers.unmasked ? m.unmasked : t.modifiers.completed ? m.completed : m.masked;
      na(t, g);
    };
    r.onMaska = r.onMaska == null ? d : Array.isArray(r.onMaska) ? [...r.onMaska, d] : [r.onMaska, d];
  }
  Ue.has(l) ? (a = Ue.get(l)) == null || a.update(r) : Ue.set(l, new la(l, r));
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
  const t = ra[e.type] ?? "text", a = {
    field: e.name,
    label: e.label,
    type: t,
    required: e.required ?? !1
  };
  return (e.type === "decimal" || e.type === "float") && (a.minFractionDigits = 2, a.maxFractionDigits = 2), e.type === "boolean" && (a.defaultValue = !1), e.type === "choice" && ((l = e.choices) != null && l.length) && (a.options = e.choices.map((r) => ({
    label: r.label,
    value: r.value
  }))), e.type === "fk" && (a.endpoint = e.endpoint, e.option_label && (a.optionLabel = e.option_label), e.option_value && (a.optionValue = e.option_value)), a;
}
function ia(e) {
  return e.filter((t) => !t.read_only && t.name !== "id").map(sa);
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
function ca(e, t = 6) {
  return e.filter((a) => !a.read_only && a.name !== "id").slice(0, t).map(da);
}
function bt() {
  const e = Ft();
  function t(d, m = "Sucesso") {
    e.add({ severity: "success", summary: m, detail: d, life: 3e3 });
  }
  function a(d, m = "Erro") {
    e.add({ severity: "error", summary: m, detail: d, life: 5e3 });
  }
  function l(d, m = "Atenção") {
    e.add({ severity: "warn", summary: m, detail: d, life: 4e3 });
  }
  function r(d, m = "Info") {
    e.add({ severity: "info", summary: m, detail: d, life: 3e3 });
  }
  return { success: t, error: a, warn: l, info: r };
}
function kt() {
  const e = Et();
  function t(l, r = "Deseja realmente excluir este registro?") {
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
  function a(l, r, d = "Confirmação") {
    e.require({
      message: l,
      header: d,
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
function fa(e) {
  return e.replace(/_/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
function ma(e) {
  if (typeof e == "string")
    return e;
  if (Array.isArray(e)) {
    const t = e.filter((a) => typeof a == "string");
    return t.length > 0 ? t.join(" ") : null;
  }
  if (typeof e == "object" && e !== null) {
    const t = e;
    if (Array.isArray(t.non_field_errors) && t.non_field_errors.length > 0)
      return t.non_field_errors.filter((l) => typeof l == "string").join(" ");
    const a = [];
    for (const [l, r] of Object.entries(t)) {
      if (l === "non_field_errors") continue;
      const d = fa(l);
      if (Array.isArray(r)) {
        const m = r.filter((g) => typeof g == "string");
        m.length > 0 && a.push(`${d}: ${m.join(" ")}`);
      } else typeof r == "string" && a.push(`${d}: ${r}`);
    }
    return a.length > 0 ? a.join(`
`) : null;
  }
  return null;
}
function Ye(e, t = "Erro inesperado") {
  var d;
  if (!e || typeof e != "object") return t;
  const a = e, l = (d = a.response) == null ? void 0 : d.data;
  if (!l || typeof l != "object")
    return a.message || t;
  const r = l.detail ?? l;
  return ma(r) || t;
}
function ko() {
  return { extractApiError: Ye };
}
const pa = { class: "w-autocompletefk" }, va = ["disabled"], ga = { class: "w-autocompletefk-toolbar" }, ha = { class: "w-autocompletefk-toolbar-actions" }, ya = { class: "flex items-center justify-end gap-1" }, ba = { class: "w-autocompletefk-footer" }, wt = /* @__PURE__ */ Re({
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
    const a = e, l = t, r = Me(je);
    if (!r)
      throw new Error("[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin.");
    const d = r, m = bt(), { confirmDelete: g } = kt(), c = L(null), b = L([]), S = L(!1);
    let j = null;
    async function U(p) {
      try {
        const v = await d.get(`${a.endpoint}${p}/`);
        c.value = v.data;
      } catch {
        c.value = null;
      }
    }
    async function M(p) {
      S.value = !0;
      try {
        const v = { page_size: 20 };
        p && (v.search = p);
        const D = (await d.get(a.endpoint, { params: v })).data;
        b.value = D.data ?? D.results ?? D;
      } catch {
        b.value = [];
      } finally {
        S.value = !1;
      }
    }
    function Y(p) {
      const v = p.query || "";
      if (v.length < a.minLength) {
        b.value = [];
        return;
      }
      j && clearTimeout(j), j = setTimeout(() => M(v), 300);
    }
    function z(p) {
      c.value = p.value, l("update:modelValue", p.value);
    }
    function n() {
      c.value = null, l("update:modelValue", null);
    }
    Ne(
      () => a.modelValue,
      async (p) => {
        if (p != null) {
          if (typeof p == "object" && p !== null && a.optionLabel in p) {
            c.value = p;
            return;
          }
          (!c.value || c.value[a.optionValue] !== p) && await U(p);
        } else
          c.value = null;
      },
      { immediate: !0 }
    );
    const f = L(!1), C = L([]), s = L(!1), k = L(""), V = L(1), Z = L(15), F = L(0), i = L(null), w = L(null), o = L(0);
    let u = null;
    const x = L([]), A = W(() => {
      var p;
      return (p = a.crudFields) != null && p.length ? !0 : x.value.length > 0;
    }), _ = W(() => a.canCreate ?? A.value), G = W(() => a.canEdit ?? A.value), J = W(() => a.canDelete ?? A.value), ue = W(() => G.value || J.value), ee = W(() => {
      var p;
      return (p = a.crudFields) != null && p.length ? a.crudFields : ia(x.value);
    }), oe = W(() => {
      var p, v;
      return (p = a.crudColumns) != null && p.length ? a.crudColumns : (v = a.columns) != null && v.length ? a.columns.map((N) => ({
        field: N.field,
        header: N.header,
        sortable: !0
      })) : x.value.length ? ca(x.value) : [{ field: a.optionLabel, header: a.optionLabel, sortable: !0 }];
    });
    async function te() {
      var p, v, N;
      s.value = !0;
      try {
        const D = {
          page: V.value,
          page_size: Z.value
        };
        k.value && (D.search = k.value), w.value && o.value !== 0 && (D.ordering = o.value === -1 ? `-${w.value}` : w.value);
        const B = (await d.get(a.endpoint, { params: D })).data;
        C.value = B.data ?? B.results ?? B, F.value = B.count ?? B.rows ?? 0, (p = B.extras) != null && p.fields && !((v = a.columns) != null && v.length) && !((N = a.crudFields) != null && N.length) && (x.value = B.extras.fields);
      } catch {
        C.value = [], F.value = 0;
      } finally {
        s.value = !1;
      }
    }
    function O() {
      a.disabled || (k.value = "", V.value = 1, w.value = null, o.value = 0, i.value = null, f.value = !0, te());
    }
    function be(p) {
      V.value = p.page + 1, Z.value = p.rows, te();
    }
    function de(p) {
      w.value = p.sortField ?? null, o.value = p.sortOrder ?? 0, V.value = 1, te();
    }
    function xe() {
      i.value && (c.value = i.value, l("update:modelValue", i.value), f.value = !1);
    }
    function Ve(p) {
      c.value = p.data, l("update:modelValue", p.data), f.value = !1;
    }
    Ne(k, () => {
      u && clearTimeout(u), u = setTimeout(() => {
        V.value = 1, te();
      }, 300);
    });
    const le = L(!1), ke = L(!1), ne = L(null), ae = ie({}), ce = W(() => ne.value !== null), fe = W(
      () => ce.value ? "Editar Registro" : "Novo Registro"
    );
    function we() {
      const p = {};
      for (const v of ee.value)
        p[v.field] = v.defaultValue !== void 0 ? typeof v.defaultValue == "function" ? v.defaultValue() : v.defaultValue : null;
      return p;
    }
    function De() {
      const p = we();
      for (const v of Object.keys(ae))
        delete ae[v];
      for (const [v, N] of Object.entries(p))
        ae[v] = N;
    }
    function me() {
      ne.value = null, De(), le.value = !0;
    }
    function pe(p) {
      ne.value = p;
      for (const v of ee.value)
        ae[v.field] = p[v.field] !== void 0 ? p[v.field] : null;
      le.value = !0;
    }
    function $e(p, v) {
      ae[p] = v;
    }
    async function y() {
      ke.value = !0;
      try {
        const p = { ...ae };
        for (const N of ee.value) {
          const D = p[N.field];
          if (N.type === "fk" && D !== null && typeof D == "object") {
            const R = N.optionValue || "id";
            p[N.field] = D[R] ?? D;
          }
        }
        let v;
        if (ce.value && ne.value) {
          const N = ne.value[a.optionValue];
          v = await d.patch(
            `${a.endpoint}${N}/`,
            p
          );
          const D = C.value.findIndex(
            (R) => R[a.optionValue] === N
          );
          D !== -1 && (C.value[D] = v.data), m.success("Registro atualizado com sucesso");
        } else
          v = await d.post(a.endpoint, p), C.value.unshift(v.data), F.value++, m.success("Registro criado com sucesso");
        le.value = !1, ne.value = null, i.value = v.data;
      } catch (p) {
        m.error(Ye(p, "Erro ao salvar registro"));
      } finally {
        ke.value = !1;
      }
    }
    function P(p) {
      g(async () => {
        try {
          const v = p[a.optionValue];
          await d.delete(`${a.endpoint}${v}/`);
          const N = C.value.findIndex(
            (D) => D[a.optionValue] === v
          );
          N !== -1 && (C.value.splice(N, 1), F.value--), c.value && c.value[a.optionValue] === v && (c.value = null, l("update:modelValue", null)), i.value && i.value[a.optionValue] === v && (i.value = null), m.success("Registro excluído com sucesso");
        } catch (v) {
          m.error(Ye(v, "Erro ao excluir registro"));
        }
      });
    }
    return (p, v) => {
      const N = at("tooltip");
      return h(), I(ge, null, [
        E("div", pa, [
          q($(it), {
            "model-value": c.value,
            suggestions: b.value,
            "option-label": e.optionLabel,
            placeholder: e.placeholder,
            disabled: e.disabled,
            "force-selection": e.forceSelection,
            loading: S.value,
            fluid: "",
            onComplete: Y,
            onItemSelect: z,
            onClear: n
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "force-selection", "loading"]),
          Se((h(), I("button", {
            type: "button",
            disabled: e.disabled,
            class: "w-autocompletefk-trigger",
            onClick: O
          }, [...v[6] || (v[6] = [
            E("i", { class: "pi pi-search" }, null, -1)
          ])], 8, va)), [
            [
              N,
              "Pesquisar",
              void 0,
              { top: !0 }
            ]
          ])
        ]),
        q($(st), {
          visible: f.value,
          "onUpdate:visible": v[4] || (v[4] = (D) => f.value = D),
          header: e.dialogHeader || "Pesquisar",
          style: { width: "80vw" },
          modal: "",
          draggable: !1,
          class: "w-autocompletefk-dialog"
        }, {
          footer: K(() => [
            E("div", ba, [
              q($(se), {
                label: "Cancelar",
                severity: "secondary",
                text: "",
                onClick: v[3] || (v[3] = (D) => f.value = !1)
              }),
              q($(se), {
                label: "Selecionar",
                icon: "pi pi-check",
                disabled: !i.value,
                onClick: xe
              }, null, 8, ["disabled"])
            ])
          ]),
          default: K(() => [
            E("div", ga, [
              q($(nt), { class: "w-autocompletefk-toolbar-search" }, {
                default: K(() => [
                  q($(rt), { class: "pi pi-search" }),
                  q($(ve), {
                    modelValue: k.value,
                    "onUpdate:modelValue": v[0] || (v[0] = (D) => k.value = D),
                    placeholder: "Pesquisar...",
                    class: "w-full"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              E("div", ha, [
                _.value ? (h(), T($(se), {
                  key: 0,
                  label: "Novo",
                  icon: "pi pi-plus",
                  size: "small",
                  onClick: me
                })) : H("", !0)
              ])
            ]),
            q($(lt), {
              selection: i.value,
              "onUpdate:selection": v[1] || (v[1] = (D) => i.value = D),
              value: C.value,
              loading: s.value,
              paginator: "",
              lazy: "",
              "striped-rows": "",
              "removable-sort": "",
              size: "small",
              rows: Z.value,
              "total-records": F.value,
              "sort-field": w.value ?? void 0,
              "sort-order": o.value,
              "selection-mode": "single",
              "data-key": e.optionValue,
              onPage: be,
              onSort: v[2] || (v[2] = (D) => de({ sortField: D.sortField, sortOrder: D.sortOrder })),
              onRowDblclick: Ve
            }, {
              empty: K(() => [...v[7] || (v[7] = [
                E("div", { class: "w-autocompletefk-empty" }, " Nenhum registro encontrado ", -1)
              ])]),
              default: K(() => [
                q($(Pe), {
                  "selection-mode": "single",
                  "header-style": "width: 3rem"
                }),
                (h(!0), I(ge, null, he(oe.value, (D) => (h(), T($(Pe), {
                  key: D.field,
                  field: D.field,
                  header: D.header,
                  sortable: D.sortable ?? !0,
                  style: Fe(D.style)
                }, {
                  body: K(({ data: R }) => [
                    D.type ? (h(), T(He, {
                      key: 0,
                      column: D,
                      value: R[D.field],
                      "row-data": R
                    }, null, 8, ["column", "value", "row-data"])) : (h(), I(ge, { key: 1 }, [
                      Be(Q(R[D.field]), 1)
                    ], 64))
                  ]),
                  _: 2
                }, 1032, ["field", "header", "sortable", "style"]))), 128)),
                ue.value ? (h(), T($(Pe), {
                  key: 0,
                  header: "",
                  style: { width: "6rem" }
                }, {
                  body: K(({ data: D }) => [
                    E("div", ya, [
                      G.value ? Se((h(), T($(se), {
                        key: 0,
                        icon: "pi pi-pencil",
                        text: "",
                        rounded: "",
                        size: "small",
                        onClick: (R) => pe(D)
                      }, null, 8, ["onClick"])), [
                        [
                          N,
                          "Editar",
                          void 0,
                          { top: !0 }
                        ]
                      ]) : H("", !0),
                      J.value ? Se((h(), T($(se), {
                        key: 1,
                        icon: "pi pi-trash",
                        text: "",
                        rounded: "",
                        size: "small",
                        severity: "danger",
                        onClick: (R) => P(D)
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
        A.value ? (h(), T(Ke, {
          key: 0,
          visible: le.value,
          title: fe.value,
          fields: ee.value,
          "form-data": ae,
          "is-editing": ce.value,
          saving: ke.value,
          width: e.dialogWidth,
          "onUpdate:visible": v[5] || (v[5] = (D) => {
            le.value = D, D || (ne.value = null);
          }),
          "onUpdate:field": $e,
          onSave: y
        }, null, 8, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])) : H("", !0)
      ], 64);
    };
  }
}), ka = { class: "w-crud-form-fields" }, wa = {
  key: 0,
  class: "w-crud-form-switch"
}, Da = { class: "w-crud-form-switch-label" }, $a = {
  key: 1,
  class: "w-crud-form-col-full"
}, Ca = { class: "w-crud-form-label" }, xa = {
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
}, Ya = /* @__PURE__ */ Re({
  __name: "WFormRenderer",
  props: {
    fields: {},
    formData: {},
    isEditing: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:field"],
  setup(e, { expose: t, emit: a }) {
    const l = e, r = a, d = ie({}), m = W(
      () => l.fields.filter((i) => i.visible === void 0 || i.visible === !0 ? !0 : typeof i.visible == "function" ? i.visible(l.formData, l.isEditing) : i.visible)
    );
    function g(i) {
      return l.disabled || i.disabledOnEdit && l.isEditing ? !0 : typeof i.disabled == "function" ? i.disabled(l.formData, l.isEditing) : !!i.disabled;
    }
    function c(i) {
      return Dt(i) ? i.value : i;
    }
    const b = W(() => {
      const i = l.isEditing ? "edit" : "create", w = l.fields.find(
        (u) => u.autofocus === !0 || u.autofocus === i
      );
      if (w) return w.field;
      const o = m.value.find((u) => !(u.type === "switch" || u.type === "fk" || u.type === "select" || u.type === "image" || u.disabled === !0 || u.disabledOnEdit && l.isEditing));
      return (o == null ? void 0 : o.field) ?? null;
    });
    function S(i) {
      return i.field === b.value;
    }
    function j(i) {
      if (i)
        return i.replace(/9/g, "#").replace(/a/g, "S").replace(/\*/g, "X");
    }
    function U(i) {
      if (!i) return "";
      const w = String(i).replace(/\D/g, "").slice(0, 14);
      return w.length <= 11 ? w.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2") : w.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
    function M(i, w) {
      const o = w.target.value.replace(/\D/g, "").slice(0, 14);
      r("update:field", i, o);
    }
    const Y = ie({});
    function z(i) {
      const w = l.formData[i.field];
      if (w == null) return null;
      const o = i.optionValue || "value";
      return (c(i.options) || []).find(
        (x) => x[o] === w
      ) ?? null;
    }
    function n(i) {
      return Y[i.field] || [];
    }
    function f(i, w) {
      const o = (w.query || "").toLowerCase(), u = c(i.options) || [], x = i.optionLabel || "label";
      Y[i.field] = u.filter(
        (A) => String(A[x] || "").toLowerCase().includes(o)
      );
    }
    function C(i, w) {
      const o = i.optionValue || "value";
      r("update:field", i.field, w.value[o]);
    }
    function s(i) {
      const w = l.formData[i.field];
      return w ? String(w).replace("#", "") : "FFFFFF";
    }
    function k(i, w) {
      r("update:field", i.field, `#${w}`);
    }
    function V(i) {
      if (typeof i.validate == "function") {
        const w = i.validate(l.formData[i.field]);
        d[i.field] = w || null;
      }
    }
    function Z() {
      const i = [];
      for (const w of l.fields)
        if (typeof w.validate == "function") {
          const o = w.validate(l.formData[w.field]);
          d[w.field] = o || null, o && i.push(o);
        }
      return i;
    }
    function F() {
      Object.keys(d).forEach((i) => delete d[i]);
    }
    return t({ validateAll: Z, clearErrors: F }), (i, w) => (h(), I("div", ka, [
      (h(!0), I(ge, null, he(m.value, (o) => X(i.$slots, `field-${o.field}`, {
        key: o.field,
        field: o,
        formData: e.formData,
        isEditing: e.isEditing,
        setFormField: (u, x) => r("update:field", u, x)
      }, () => [
        o.type === "switch" ? (h(), I("div", wa, [
          q($(Mt), {
            "model-value": e.formData[o.field],
            disabled: g(o),
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
          E("label", Da, Q(o.switchLabel || o.label), 1)
        ])) : o.type === "color" ? (h(), I("div", $a, [
          E("label", Ca, [
            Be(Q(o.label) + " ", 1),
            o.required ? (h(), I("span", xa, "*")) : H("", !0)
          ]),
          E("div", Sa, [
            q($(Vt), {
              "model-value": s(o),
              disabled: g(o),
              "onUpdate:modelValue": (u) => k(o, u)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"]),
            q($(ve), {
              "model-value": e.formData[o.field],
              class: "w-28",
              maxlength: "7",
              placeholder: "#000000",
              disabled: g(o),
              "onUpdate:modelValue": (u) => r("update:field", o.field, u)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])
          ])
        ])) : o.type === "image" ? (h(), I("div", Pa, [
          E("label", Ma, Q(o.label), 1),
          X(i.$slots, `image-${o.field}`, {
            field: o,
            formData: e.formData
          }, () => [
            E("input", {
              type: "file",
              accept: o.accept || "image/*",
              disabled: g(o),
              onChange: (u) => {
                var A;
                const x = ((A = u.target.files) == null ? void 0 : A[0]) ?? null;
                r("update:field", o.field, x);
              }
            }, null, 40, Va)
          ])
        ])) : (h(), I("div", {
          key: 3,
          class: ot(o.colSpan === 0.5 ? "w-crud-form-col-half" : "w-crud-form-col-full")
        }, [
          E("label", Aa, [
            Be(Q(o.label) + " ", 1),
            o.required ? (h(), I("span", Fa, "*")) : H("", !0)
          ]),
          (!o.type || o.type === "text") && o.mask ? Se((h(), T($(ve), {
            key: 0,
            "model-value": e.formData[o.field],
            fluid: "",
            autofocus: S(o) || void 0,
            placeholder: o.placeholder,
            disabled: g(o),
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])), [
            [$(tt), { mask: j(o.mask) }]
          ]) : !o.type || o.type === "text" ? (h(), T($(ve), {
            key: 1,
            "model-value": e.formData[o.field],
            fluid: "",
            autofocus: S(o) || void 0,
            placeholder: o.placeholder,
            disabled: g(o),
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "email" ? (h(), T($(ve), {
            key: 2,
            "model-value": e.formData[o.field],
            type: "email",
            fluid: "",
            autofocus: S(o) || void 0,
            placeholder: o.placeholder,
            disabled: g(o),
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "autofocus", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "password" ? (h(), T($(At), {
            key: 3,
            "model-value": e.formData[o.field],
            fluid: "",
            "toggle-mask": "",
            feedback: o.feedback !== !1,
            placeholder: o.placeholder,
            disabled: g(o),
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "feedback", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "number" ? (h(), T($(Ze), {
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
            disabled: g(o),
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "min", "max", "min-fraction-digits", "max-fraction-digits", "suffix", "prefix", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "currency" ? (h(), T($(Ze), {
            key: 5,
            "model-value": e.formData[o.field],
            fluid: "",
            mode: "currency",
            currency: "BRL",
            locale: "pt-BR",
            min: o.min,
            max: o.max,
            placeholder: o.placeholder,
            disabled: g(o),
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "min", "max", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "select" ? (h(), T($(Pt), {
            key: 6,
            "model-value": e.formData[o.field],
            fluid: "",
            options: c(o.options),
            "option-label": o.optionLabel || "label",
            "option-value": o.optionValue || "value",
            "show-clear": o.showClear !== !1,
            placeholder: o.placeholder,
            disabled: g(o),
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "options", "option-label", "option-value", "show-clear", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "autocomplete" ? (h(), T($(it), {
            key: 7,
            "model-value": z(o),
            fluid: "",
            suggestions: n(o),
            "option-label": o.optionLabel || "label",
            dropdown: "",
            placeholder: o.placeholder,
            disabled: g(o),
            onComplete: (u) => f(o, u),
            onItemSelect: (u) => C(o, u),
            onClear: (u) => r("update:field", o.field, null)
          }, null, 8, ["model-value", "suggestions", "option-label", "placeholder", "disabled", "onComplete", "onItemSelect", "onClear"])) : o.type === "fk" ? (h(), T(wt, {
            key: 8,
            "model-value": e.formData[o.field],
            endpoint: o.endpoint,
            "option-label": o.optionLabel || "nome",
            placeholder: o.placeholder,
            disabled: g(o),
            "show-clear": o.showClear !== !1,
            "dialog-header": o.label,
            "crud-fields": o.crudFields,
            "crud-columns": o.crudColumns,
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "endpoint", "option-label", "placeholder", "disabled", "show-clear", "dialog-header", "crud-fields", "crud-columns", "onUpdate:modelValue"])) : o.type === "date" ? (h(), T($(Je), {
            key: 9,
            "model-value": e.formData[o.field],
            fluid: "",
            "date-format": o.dateFormat || "dd/mm/yy",
            placeholder: o.placeholder,
            disabled: g(o),
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "datetime" ? (h(), T($(Je), {
            key: 10,
            "model-value": e.formData[o.field],
            fluid: "",
            "show-time": "",
            "hour-format": o.hourFormat || "24",
            "date-format": o.dateFormat || "dd/mm/yy",
            placeholder: o.placeholder,
            disabled: g(o),
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "hour-format", "date-format", "placeholder", "disabled", "onUpdate:modelValue"])) : o.type === "cpf_cnpj" ? (h(), T($(ve), {
            key: 11,
            "model-value": U(e.formData[o.field]),
            fluid: "",
            maxlength: "18",
            placeholder: o.placeholder || "000.000.000-00",
            disabled: g(o),
            invalid: !!d[o.field],
            onInput: (u) => M(o.field, u),
            onBlur: (u) => V(o)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onInput", "onBlur"])) : o.type === "mask" ? Se((h(), T($(ve), {
            key: 12,
            "model-value": e.formData[o.field],
            fluid: "",
            placeholder: o.placeholder,
            disabled: g(o),
            invalid: !!d[o.field],
            "onUpdate:modelValue": (u) => r("update:field", o.field, u),
            onBlur: (u) => V(o)
          }, null, 8, ["model-value", "placeholder", "disabled", "invalid", "onUpdate:modelValue", "onBlur"])), [
            [$(tt), { mask: j(o.mask) }]
          ]) : o.type === "textarea" ? (h(), T($(St), {
            key: 13,
            "model-value": e.formData[o.field],
            fluid: "",
            autofocus: S(o) || void 0,
            rows: o.rows || 3,
            placeholder: o.placeholder,
            disabled: g(o),
            "onUpdate:modelValue": (u) => r("update:field", o.field, u)
          }, null, 8, ["model-value", "autofocus", "rows", "placeholder", "disabled", "onUpdate:modelValue"])) : H("", !0),
          d[o.field] ? (h(), I("small", Ea, Q(d[o.field]), 1)) : H("", !0)
        ], 2))
      ])), 128))
    ]));
  }
}), Ra = { class: "w-crud-form-footer" }, Ke = /* @__PURE__ */ Re({
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
  setup(e, { emit: t }) {
    const a = e, l = t, r = L(null);
    function d() {
      r.value ? r.value.validateAll().length === 0 && l("save") : l("save");
    }
    return Ne(
      () => a.visible,
      (m) => {
        m && r.value && r.value.clearErrors();
      }
    ), (m, g) => (h(), T($(st), {
      visible: e.visible,
      header: e.title,
      style: Fe({ width: e.width }),
      modal: "",
      draggable: !1,
      class: "w-crud-form-dialog",
      "onUpdate:visible": g[2] || (g[2] = (c) => l("update:visible", c))
    }, {
      default: K(() => [
        E("form", {
          class: "w-crud-form",
          onSubmit: $t(d, ["prevent"])
        }, [
          q(Ya, {
            ref_key: "rendererRef",
            ref: r,
            fields: e.fields,
            "form-data": e.formData,
            "is-editing": e.isEditing,
            "onUpdate:field": g[0] || (g[0] = (c, b) => l("update:field", c, b))
          }, Oe({ _: 2 }, [
            he(e.fields, (c) => ({
              name: `field-${c.field}`,
              fn: K((b) => [
                X(m.$slots, `field-${c.field}`, We(qe(b)))
              ])
            })),
            he(e.fields.filter((c) => c.type === "image"), (c) => ({
              name: `image-${c.field}`,
              fn: K((b) => [
                X(m.$slots, `image-${c.field}`, We(qe(b)))
              ])
            }))
          ]), 1032, ["fields", "form-data", "is-editing"]),
          E("div", Ra, [
            X(m.$slots, "footer", { saving: e.saving }, () => [
              q($(se), {
                type: "button",
                label: "Cancelar",
                severity: "secondary",
                text: "",
                disabled: e.saving,
                onClick: g[1] || (g[1] = (c) => l("update:visible", !1))
              }, null, 8, ["disabled"]),
              q($(se), {
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
}), Ta = { class: "w-crud" }, La = {
  key: 0,
  class: "w-crud-header"
}, Ia = { class: "w-crud-header-content" }, ja = { class: "w-crud-title" }, za = {
  key: 0,
  class: "w-crud-subtitle"
}, Ua = { class: "w-crud-header-actions" }, Na = {
  key: 0,
  class: "w-crud-kpis"
}, Ba = { class: "w-crud-kpi-icon" }, Oa = { class: "w-crud-kpi-content" }, Wa = { class: "w-crud-kpi-label" }, qa = { class: "w-crud-kpi-value" }, Ha = { class: "w-crud-table" }, Ka = { class: "w-crud-toolbar" }, Za = { class: "w-crud-toolbar-start" }, Ja = { class: "w-crud-toolbar-end" }, Xa = { class: "w-crud-actions" }, Qa = /* @__PURE__ */ Re({
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
    const a = e, l = t, { formatNumber: r } = gt(), d = L({}), m = W(
      () => a.crud.config.columns.filter((n) => n.visible !== !1).map((n) => n.type === "number" && !n.align ? { ...n, align: "right" } : n.type === "currency" && !n.align ? { ...n, align: "right" } : n)
    );
    function g(n) {
      if (n.align === "right") return "text-right";
      if (n.align === "center") return "text-center";
    }
    const c = W(() => {
      const n = [];
      return a.crud.config.canCreate !== !1 && a.crud.config.canEdit !== !1 && n.push({ action: "edit", icon: "pi pi-pencil", tooltip: "Editar" }), a.crud.config.canDelete !== !1 && n.push({
        action: "delete",
        icon: "pi pi-trash",
        tooltip: "Excluir",
        severity: "danger"
      }), n;
    }), b = W(
      () => a.crud.config.rowActions ?? c.value
    ), S = W(() => b.value.length > 0);
    function j(n, f) {
      n.action === "edit" ? a.crud.openEditDialog(f) : n.action === "delete" ? a.crud.confirmDelete(f) : n.handler && n.handler(f);
    }
    function U(n, f) {
      return n.visible ? n.visible(f) : !0;
    }
    function M(n, f) {
      return n.disabled ? n.disabled(f) : !1;
    }
    const Y = W(() => {
      const n = [];
      return a.showKpi && n.push({
        icon: a.kpiIcon,
        label: a.kpiLabel,
        value: r(a.crud.pagination.rows, 0)
      }), n.push(...a.extraKpis), n;
    });
    W(() => a.crud.config.labels ?? {});
    const z = W(() => a.crud.config.canCreate !== !1);
    return Ct(() => {
      a.autoInit && a.crud.init();
    }), (n, f) => {
      const C = at("tooltip");
      return h(), I("div", Ta, [
        e.showHeader ? (h(), I("div", La, [
          E("div", Ia, [
            E("h1", ja, Q(e.title), 1),
            e.subtitle ? (h(), I("p", za, Q(e.subtitle), 1)) : H("", !0)
          ]),
          E("div", Ua, [
            X(n.$slots, "header-actions"),
            z.value ? (h(), T($(se), {
              key: 0,
              label: "Novo",
              icon: "pi pi-plus",
              onClick: f[0] || (f[0] = (s) => e.crud.openCreateDialog())
            })) : H("", !0)
          ])
        ])) : H("", !0),
        X(n.$slots, "before-table", {}, () => [
          Y.value.length ? (h(), I("div", Na, [
            (h(!0), I(ge, null, he(Y.value, (s, k) => (h(), I("div", {
              key: k,
              class: "w-crud-kpi"
            }, [
              E("div", Ba, [
                E("i", {
                  class: ot([s.icon]),
                  style: Fe(s.color ? `color: ${s.color}` : "")
                }, null, 6)
              ]),
              E("div", Oa, [
                E("div", Wa, Q(s.label), 1),
                E("div", qa, Q(s.value), 1)
              ])
            ]))), 128))
          ])) : H("", !0)
        ]),
        E("div", Ha, [
          q($(lt), {
            value: e.crud.items.value,
            loading: e.crud.loading.value,
            "expanded-rows": d.value,
            "onUpdate:expandedRows": f[2] || (f[2] = (s) => d.value = s),
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
            onSort: f[3] || (f[3] = (s) => e.crud.onSort({ sortField: s.sortField, sortOrder: s.sortOrder })),
            onRowExpand: f[4] || (f[4] = (s) => l("row-expand", s.data)),
            onRowCollapse: f[5] || (f[5] = (s) => l("row-collapse", s.data))
          }, Oe({
            header: K(() => [
              E("div", Ka, [
                E("div", Za, [
                  e.showSearch ? (h(), T($(nt), { key: 0 }, {
                    default: K(() => [
                      q($(rt), { class: "pi pi-search" }),
                      q($(ve), {
                        "model-value": e.crud.search.value,
                        placeholder: "Buscar...",
                        class: "w-72",
                        onInput: e.crud.onSearch
                      }, null, 8, ["model-value", "onInput"])
                    ]),
                    _: 1
                  })) : H("", !0),
                  X(n.$slots, "toolbar-start"),
                  X(n.$slots, "toolbar-filters")
                ]),
                E("div", Ja, [
                  X(n.$slots, "toolbar-actions"),
                  !e.showHeader && z.value ? (h(), T($(se), {
                    key: 0,
                    label: "Novo",
                    icon: "pi pi-plus",
                    onClick: f[1] || (f[1] = (s) => e.crud.openCreateDialog())
                  })) : H("", !0)
                ])
              ])
            ]),
            empty: K(() => [
              X(n.$slots, "empty", {}, () => [
                f[9] || (f[9] = E("div", { class: "w-crud-empty" }, [
                  E("div", { class: "w-crud-empty-icon" }, [
                    E("i", { class: "pi pi-inbox" })
                  ]),
                  E("p", { class: "w-crud-empty-title" }, "Nenhum registro encontrado"),
                  E("p", { class: "w-crud-empty-text" }, "Tente ajustar sua busca ou crie um novo registro")
                ], -1))
              ])
            ]),
            default: K(() => [
              e.expandable ? (h(), T($(Pe), {
                key: 0,
                expander: "",
                style: { width: "3rem" }
              })) : H("", !0),
              (h(!0), I(ge, null, he(m.value, (s) => (h(), T($(Pe), {
                key: s.field,
                field: s.field,
                header: s.header,
                sortable: s.sortable,
                style: Fe(s.style),
                "header-class": g(s),
                "body-class": g(s)
              }, {
                body: K(({ data: k }) => [
                  X(n.$slots, `column-${s.field}`, {
                    data: k,
                    value: k[s.field]
                  }, () => [
                    q(He, {
                      column: s,
                      value: k[s.field],
                      "row-data": k
                    }, null, 8, ["column", "value", "row-data"])
                  ])
                ]),
                _: 2
              }, 1032, ["field", "header", "sortable", "style", "header-class", "body-class"]))), 128)),
              S.value ? (h(), T($(Pe), {
                key: 1,
                "header-class": "w-crud-actions-header",
                style: Fe({ width: `${b.value.length * 2.5 + 1}rem` })
              }, {
                body: K(({ data: s }) => [
                  X(n.$slots, "row-actions", {
                    data: s,
                    crud: e.crud
                  }, () => [
                    E("div", Xa, [
                      (h(!0), I(ge, null, he(b.value, (k) => (h(), I(ge, {
                        key: k.action
                      }, [
                        U(k, s) ? Se((h(), T($(se), {
                          key: 0,
                          icon: k.icon,
                          text: "",
                          rounded: "",
                          size: "small",
                          severity: k.severity,
                          disabled: M(k, s),
                          onClick: (V) => j(k, s)
                        }, null, 8, ["icon", "severity", "disabled", "onClick"])), [
                          [
                            C,
                            k.tooltip,
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
              fn: K((s) => [
                X(n.$slots, "expansion", {
                  data: s.data
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["value", "loading", "expanded-rows", "rows", "total-records", "sort-field", "sort-order", "data-key", "onPage"])
        ]),
        X(n.$slots, "form-dialog", {
          crud: e.crud,
          dialogWidth: e.dialogWidth
        }, () => [
          q(Ke, {
            visible: e.crud.dialogVisible.value,
            title: e.crud.dialogTitle.value,
            fields: e.crud.config.form,
            "form-data": e.crud.formData,
            "is-editing": e.crud.isEditing.value,
            saving: e.crud.saving.value,
            width: e.dialogWidth,
            "onUpdate:visible": f[6] || (f[6] = (s) => {
              e.crud.dialogVisible.value = s, s || (e.crud.editingItem.value = null);
            }),
            "onUpdate:field": f[7] || (f[7] = (s, k) => e.crud.setFormField(s, k)),
            onSave: f[8] || (f[8] = (s) => e.crud.save())
          }, Oe({ _: 2 }, [
            he(e.crud.config.form, (s) => ({
              name: `field-${s.field}`,
              fn: K((k) => [
                X(n.$slots, `field-${s.field}`, We(qe(k)))
              ])
            }))
          ]), 1032, ["visible", "title", "fields", "form-data", "is-editing", "saving", "width"])
        ])
      ]);
    };
  }
}), wo = {
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
    e.provide(je, t.axios), e.provide(ze, a), t.registerComponents !== !1 && (e.component("WCrudView", Qa), e.component("WCrudFormDialog", Ke), e.component("WCrudColumnRenderer", He), e.component("WAutoCompleteFK", wt));
  }
}, Ga = {
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
function Do(e) {
  const {
    endpoint: t,
    columns: a,
    form: l,
    pk: r = "id",
    searchDebounce: d = 300,
    canCreate: m = !0,
    canEdit: g = !0,
    canDelete: c = !0,
    rowActions: b = void 0,
    filterParams: S = void 0,
    transformPayload: j = void 0,
    onAfterSave: U = void 0,
    onAfterDelete: M = void 0
  } = e, Y = Me(je);
  if (!Y)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useCrudManager."
    );
  const z = Y, n = Me(ze), f = e.pageSize ?? (n == null ? void 0 : n.defaultPageSize) ?? 20, C = { ...Ga, ...e.labels }, s = bt(), { confirmDelete: k } = kt(), V = L([]), Z = L(!1), F = L(!1), i = L(""), w = L(!1), o = L(null), u = ie({}), x = ie({
    page: 1,
    pageSize: f,
    rows: 0,
    totalPages: 0
  }), A = ie({
    field: null,
    order: 0
  });
  function _() {
    const y = {};
    for (const P of l)
      y[P.field] = P.defaultValue !== void 0 ? typeof P.defaultValue == "function" ? P.defaultValue() : P.defaultValue : null;
    return y;
  }
  const G = _();
  for (const y of Object.keys(G))
    u[y] = G[y];
  const J = W(() => o.value !== null), ue = W(
    () => J.value ? C.editTitle : C.createTitle
  ), ee = W(() => x.page <= 1), oe = W(() => x.page >= x.totalPages);
  let te = null;
  async function O(y = {}) {
    Z.value = !0;
    try {
      const P = {
        page: x.page,
        page_size: x.pageSize,
        ...y
      };
      i.value && (P.search = i.value), A.field && A.order !== 0 && (P.ordering = A.order === -1 ? `-${A.field}` : A.field), S && Object.assign(P, S());
      const v = (await z.get(t, { params: P })).data;
      Array.isArray(v.results) ? (V.value = v.results, x.rows = v.count ?? 0) : (V.value = v.data ?? [], x.rows = v.rows ?? 0), v.page && (x.page = v.page), v.page_size && (x.pageSize = v.page_size), x.totalPages = Math.ceil(x.rows / x.pageSize) || 0;
    } finally {
      Z.value = !1;
    }
  }
  async function be() {
    await O();
  }
  async function de() {
    await O();
  }
  function xe(y) {
    i.value = y, te && clearTimeout(te), te = setTimeout(() => {
      x.page = 1, O();
    }, d);
  }
  function Ve(y) {
    const P = y.target;
    xe(P.value);
  }
  function le(y) {
    x.page = y, O();
  }
  function ke() {
    le(1);
  }
  function ne() {
    le(x.totalPages);
  }
  function ae(y) {
    x.page = y.page + 1, x.pageSize = y.rows, O();
  }
  function ce(y) {
    A.field = y.sortField ?? null, A.order = y.sortOrder ?? 0, x.page = 1, O();
  }
  function fe() {
    const y = _();
    for (const P of Object.keys(y))
      u[P] = y[P];
  }
  function we(y, P) {
    u[y] = P;
  }
  function De() {
    o.value = null, fe(), w.value = !0;
  }
  function me(y) {
    o.value = y;
    for (const P of l) {
      let p = y[P.field] !== void 0 ? y[P.field] : null;
      p && (P.type === "date" || P.type === "datetime") && typeof p == "string" && (p = ut(p)), u[P.field] = p;
    }
    w.value = !0;
  }
  async function pe() {
    for (const y of l) {
      if (y.validate) {
        const P = y.validate(u[y.field]);
        if (P)
          return s.error(P), null;
      }
      if (y.required) {
        const P = u[y.field];
        if (P == null || P === "")
          return s.error(`${y.label} é obrigatório`), null;
      }
    }
    F.value = !0;
    try {
      let y = { ...u };
      for (const R of l) {
        const B = y[R.field];
        if (R.type === "date" && B instanceof Date ? y[R.field] = dt(B) : R.type === "datetime" && B instanceof Date && (y[R.field] = ct(B)), R.type === "fk" && B !== null && typeof B == "object") {
          const re = R.optionValue || "id";
          y[R.field] = B[re] ?? B;
        }
        (R.type === "mask" || R.type === "cpf_cnpj") && typeof B == "string" && (y[R.field] = ye(B));
      }
      j && (y = j(y, J.value));
      const P = l.some(
        (R) => R.type === "image" && y[R.field] instanceof File
      );
      let p = y, v;
      if (P) {
        const R = new Set(
          l.filter((re) => re.type === "image").map((re) => re.field)
        ), B = new FormData();
        for (const [re, Ae] of Object.entries(y))
          if (Ae != null)
            if (Ae instanceof File)
              B.append(re, Ae);
            else {
              if (R.has(re))
                continue;
              B.append(re, String(Ae));
            }
        p = B, v = { "Content-Type": "multipart/form-data" };
      }
      const N = v ? { headers: v } : void 0;
      let D;
      if (J.value && o.value) {
        const R = o.value[r];
        D = await z.patch(
          `${t}${R}/`,
          p,
          N
        );
        const B = V.value.findIndex(
          (re) => re[r] === R
        );
        B !== -1 && (V.value[B] = D.data), s.success(C.successUpdate);
      } else
        D = await z.post(t, p, N), V.value.unshift(D.data), x.rows++, s.success(C.successCreate);
      return w.value = !1, o.value = null, U && U(D.data, J.value), D.data;
    } catch (y) {
      return s.error(Ye(y, "Erro ao salvar registro")), null;
    } finally {
      F.value = !1;
    }
  }
  function $e(y) {
    k(async () => {
      try {
        const P = y[r];
        await z.delete(`${t}${P}/`);
        const p = V.value.findIndex(
          (v) => v[r] === P
        );
        p !== -1 && (V.value.splice(p, 1), x.rows--), s.success(C.successDelete), M && M(y);
      } catch (P) {
        s.error(Ye(P, "Erro ao excluir registro"));
      }
    }, C.deleteConfirmMessage);
  }
  return {
    items: V,
    loading: Z,
    saving: F,
    search: i,
    dialogVisible: w,
    editingItem: o,
    formData: u,
    pagination: x,
    sort: A,
    isEditing: J,
    dialogTitle: ue,
    isFirstPage: ee,
    isLastPage: oe,
    init: be,
    fetchItems: O,
    refresh: de,
    setSearch: xe,
    onSearch: Ve,
    onPage: ae,
    onSort: ce,
    openCreateDialog: De,
    openEditDialog: me,
    save: pe,
    confirmDelete: $e,
    setFormField: we,
    resetForm: fe,
    goToPage: le,
    firstPage: ke,
    lastPage: ne,
    config: e
  };
}
function $o(e) {
  const { endpoint: t, searchDebounce: a = 300, immediate: l = !1 } = e, r = Me(je);
  if (!r)
    throw new Error(
      "[wPrimeVueComponents] axios não encontrado. Registre o WPrimeVuePlugin antes de usar useApi."
    );
  const d = r, m = Me(ze), g = e.pageSize ?? (m == null ? void 0 : m.defaultPageSize) ?? 20, c = L([]), b = L(!1), S = L(""), j = L({}), U = ie({}), M = ie({
    page: 1,
    pageSize: g,
    rows: 0,
    totalPages: 0
  }), Y = ie({
    field: null,
    order: 0
  });
  let z = null;
  async function n(F = {}) {
    b.value = !0;
    try {
      const i = {
        page: M.page,
        page_size: M.pageSize,
        ...F
      };
      S.value && (i.search = S.value), Y.field && Y.order !== 0 && (i.ordering = Y.order === -1 ? `-${Y.field}` : Y.field);
      for (const [x, A] of Object.entries(U))
        A != null && A !== "" && (i[x] = A);
      const u = (await d.get(t, {
        params: i
      })).data;
      Array.isArray(u.results) ? (c.value = u.results, M.rows = u.count ?? 0) : (c.value = u.data ?? [], M.rows = u.rows ?? 0), u.page && (M.page = u.page), u.page_size && (M.pageSize = u.page_size), M.totalPages = Math.ceil(M.rows / M.pageSize) || 0, j.value = u.extras ?? {};
    } finally {
      b.value = !1;
    }
  }
  async function f() {
    await n();
  }
  function C(F) {
    S.value = F, z && clearTimeout(z), z = setTimeout(() => {
      M.page = 1, n();
    }, a);
  }
  function s(F, i) {
    U[F] = i, M.page = 1, n();
  }
  function k() {
    for (const F of Object.keys(U))
      delete U[F];
    M.page = 1, n();
  }
  function V(F) {
    M.page = F.page + 1, M.pageSize = F.rows, n();
  }
  function Z(F) {
    Y.field = F.sortField ?? null, Y.order = F.sortOrder ?? 0, M.page = 1, n();
  }
  return l && n(), {
    items: c,
    loading: b,
    search: S,
    pagination: M,
    sort: Y,
    extras: j,
    fetchItems: n,
    refresh: f,
    setSearch: C,
    setFilter: s,
    clearFilters: k,
    onPage: V,
    onSort: Z
  };
}
export {
  Ga as DEFAULT_CRUD_LABELS,
  wt as WAutoCompleteFK,
  He as WCrudColumnRenderer,
  Ke as WCrudFormDialog,
  Qa as WCrudView,
  Ya as WFormRenderer,
  wo as WPrimeVuePlugin,
  je as W_AXIOS_KEY,
  ze as W_CONFIG_KEY,
  Ye as extractApiError,
  da as mapApiFieldToColumnDef,
  sa as mapApiFieldToFieldDef,
  ca as mapApiFieldsToColumnDefs,
  ia as mapApiFieldsToFieldDefs,
  $o as useApi,
  ko as useApiError,
  kt as useAppConfirm,
  bt as useAppToast,
  Do as useCrudManager,
  gt as useFormatters
};
//# sourceMappingURL=index.js.map
