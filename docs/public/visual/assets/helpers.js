/* ============================================================
   Shared render helpers + lightweight syntax highlighter
   Exposed as window.H
   ============================================================ */
(function () {
  const H = {};

  H.esc = (s) =>
    String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  // build a DOM node from an HTML string
  H.node = (html) => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  H.icon = (name) => (name ? `<i class="${name}"></i>` : '');

  // PrimeVue Button
  H.button = (o = {}) => {
    const c = ['p-button'];
    if (o.severity) c.push('p-button--' + o.severity);
    if (o.outlined) c.push('p-button--outlined');
    if (o.text) c.push('p-button--text');
    if (o.rounded) c.push('p-button--rounded');
    if (o.size === 'small') c.push('p-button--sm');
    if (o.size === 'large') c.push('p-button--lg');
    if (o.loading) c.push('p-button--loading');
    const iconOnly = o.icon && !o.label;
    if (iconOnly) c.push('p-button--icon');
    if (o.disabled) c.push('is-disabled');
    const ic = o.icon ? `<i class="${o.icon}"></i>` : '';
    const lb = o.label ? `<span>${H.esc(o.label)}</span>` : '';
    const inner = o.iconPos === 'right' ? lb + ic : ic + lb;
    return `<button class="${c.join(' ')}"${o.attrs || ''}>${inner}</button>`;
  };

  // PrimeVue Tag
  H.tag = (value, severity) =>
    `<span class="p-tag${severity ? ' p-tag--' + severity : ''}">${H.esc(value)}</span>`;

  // ---- syntax highlighter (vue / ts / bash) ----
  function hlGeneric(code) {
    let s = H.esc(code);
    // comments
    s = s.replace(/(\/\/[^\n]*)/g, '<span class="tok-com">$1</span>');
    s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-com">$1</span>');
    // strings
    s = s.replace(/(&quot;[^&]*?&quot;|'[^']*?'|`[^`]*?`)/g, '<span class="tok-str">$1</span>');
    // keywords
    s = s.replace(
      /\b(import|from|export|const|let|var|function|return|async|await|interface|type|extends|new|if|else|for|of|in|reactive|ref|computed|true|false|null|undefined|as)\b/g,
      '<span class="tok-key">$1</span>'
    );
    // numbers
    s = s.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="tok-num">$1</span>');
    return s;
  }

  function hlVue(code) {
    // split by lines, naive but effective: highlight tags & attrs outside of expressions
    let s = H.esc(code);
    s = s.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tok-com">$1</span>');
    // tags
    s = s.replace(/(&lt;\/?)([A-Za-z][\w-]*)/g, '$1<span class="tok-tag">$2</span>');
    // attributes (word followed by =)
    s = s.replace(/([:@]?[\w-]+)=(&quot;)/g, '<span class="tok-attr">$1</span>=$2');
    // strings inside attrs
    s = s.replace(/(&quot;[^&]*?&quot;)/g, '<span class="tok-str">$1</span>');
    // directives & interpolation keywords
    s = s.replace(/\b(v-if|v-for|v-model|v-show|v-bind|v-on|v-slot)\b/g, '<span class="tok-key">$1</span>');
    return s;
  }

  function hlBash(code) {
    let s = H.esc(code);
    s = s.replace(/(#[^\n]*)/g, '<span class="tok-com">$1</span>');
    s = s.replace(/\b(yarn|npm|npx|cd|git|add|install|link|run|dev|build)\b/g, '<span class="tok-fn">$1</span>');
    return s;
  }

  H.highlight = (code, lang) => {
    if (lang === 'vue' || lang === 'html') return hlVue(code);
    if (lang === 'bash' || lang === 'sh') return hlBash(code);
    return hlGeneric(code);
  };

  // full code block markup
  H.codeBlock = (code, lang = 'vue') => {
    const langLabel = { vue: 'vue', ts: 'typescript', js: 'javascript', bash: 'bash', html: 'html' }[lang] || lang;
    return `<div class="code">
      <div class="code__bar">
        <span class="code__lang">${langLabel}</span>
        <button class="code__copy" data-copy><i class="pi pi-copy"></i><span>Copiar</span></button>
      </div>
      <pre><code>${H.highlight(code, lang)}</code></pre>
    </div>`;
  };

  window.H = H;
})();
