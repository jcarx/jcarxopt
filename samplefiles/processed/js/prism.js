                                                                var _self = (typeof window !== 'undefined')
? window   // if in browser
: (
(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
? self // if in worker
: {}   // if in node js
);
var Prism = (function (_self) {
var lang = /\blang(?:uage)?-([\w-]+)\b/i;
var uniqueId = 0;
var plainTextGrammar = {};
var _ = {
manual: _self.Prism && _self.Prism.manual,
disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
util: {
encode: function encode(tokens) {
if (tokens instanceof Token) {
return new Token(tokens.type, encode(tokens.content), tokens.alias);
} else if (Array.isArray(tokens)) {
return tokens.map(encode);
} else {
return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
}
},
type: function (o) {
return Object.prototype.toString.call(o).slice(8, -1);
},
objId: function (obj) {
if (!obj['__id']) {
Object.defineProperty(obj, '__id', { value: ++uniqueId });
}
return obj['__id'];
},
clone: function deepClone(o, visited) {
visited = visited || {};
var clone; var id;
switch (_.util.type(o)) {
case 'Object':
id = _.util.objId(o);
if (visited[id]) {
return visited[id];
}
clone =  ({});
visited[id] = clone;
for (var key in o) {
if (o.hasOwnProperty(key)) {
clone[key] = deepClone(o[key], visited);
}
}
return  (clone);
case 'Array':
id = _.util.objId(o);
if (visited[id]) {
return visited[id];
}
clone = [];
visited[id] = clone;
(((o))).forEach(function (v, i) {
clone[i] = deepClone(v, visited);
});
return  (clone);
default:
return o;
}
},
getLanguage: function (element) {
while (element && !lang.test(element.className)) {
element = element.parentElement;
}
if (element) {
return (element.className.match(lang) || [, 'none'])[1].toLowerCase();
}
return 'none';
},
currentScript: function () {
if (typeof document === 'undefined') {
return null;
}
if ('currentScript' in document && 1 < 2 ) {
return  (document.currentScript);
}
try {
throw new Error();
} catch (err) {
var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
if (src) {
var scripts = document.getElementsByTagName('script');
for (var i in scripts) {
if (scripts[i].src == src) {
return scripts[i];
}
}
}
return null;
}
},
isActive: function (element, className, defaultActivation) {
var no = 'no-' + className;
while (element) {
var classList = element.classList;
if (classList.contains(className)) {
return true;
}
if (classList.contains(no)) {
return false;
}
element = element.parentElement;
}
return !!defaultActivation;
}
},
languages: {
plain: plainTextGrammar,
plaintext: plainTextGrammar,
text: plainTextGrammar,
txt: plainTextGrammar,
extend: function (id, redef) {
var lang = _.util.clone(_.languages[id]);
for (var key in redef) {
lang[key] = redef[key];
}
return lang;
},
insertBefore: function (inside, before, insert, root) {
root = root ||  (_.languages);
var grammar = root[inside];
var ret = {};
for (var token in grammar) {
if (grammar.hasOwnProperty(token)) {
if (token == before) {
for (var newToken in insert) {
if (insert.hasOwnProperty(newToken)) {
ret[newToken] = insert[newToken];
}
}
}
if (!insert.hasOwnProperty(token)) {
ret[token] = grammar[token];
}
}
}
var old = root[inside];
root[inside] = ret;
_.languages.DFS(_.languages, function (key, value) {
if (value === old && key != inside) {
this[key] = ret;
}
});
return ret;
},
DFS: function DFS(o, callback, type, visited) {
visited = visited || {};
var objId = _.util.objId;
for (var i in o) {
if (o.hasOwnProperty(i)) {
callback.call(o, i, o[i], type || i);
var property = o[i];
var propertyType = _.util.type(property);
if (propertyType === 'Object' && !visited[objId(property)]) {
visited[objId(property)] = true;
DFS(property, callback, null, visited);
} else if (propertyType === 'Array' && !visited[objId(property)]) {
visited[objId(property)] = true;
DFS(property, callback, i, visited);
}
}
}
}
},
plugins: {},
highlightAll: function (async, callback) {
_.highlightAllUnder(document, async, callback);
},
highlightAllUnder: function (container, async, callback) {
var env = {
callback: callback,
container: container,
selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
};
_.hooks.run('before-highlightall', env);
env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
_.hooks.run('before-all-elements-highlight', env);
for (var i = 0, element; (element = env.elements[i++]);) {
_.highlightElement(element, async === true, env.callback);
}
},
highlightElement: function (element, async, callback) {
var language = _.util.getLanguage(element);
var grammar = _.languages[language];
element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
var parent = element.parentElement;
if (parent && parent.nodeName.toLowerCase() === 'pre') {
parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
}
var code = element.textContent;
var env = {
element: element,
language: language,
grammar: grammar,
code: code
};
function insertHighlightedCode(highlightedCode) {
env.highlightedCode = highlightedCode;
_.hooks.run('before-insert', env);
env.element.innerHTML = env.highlightedCode;
_.hooks.run('after-highlight', env);
_.hooks.run('complete', env);
callback && callback.call(env.element);
}
_.hooks.run('before-sanity-check', env);
parent = env.element.parentElement;
if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
parent.setAttribute('tabindex', '0');
}
if (!env.code) {
_.hooks.run('complete', env);
callback && callback.call(env.element);
return;
}
_.hooks.run('before-highlight', env);
if (!env.grammar) {
insertHighlightedCode(_.util.encode(env.code));
return;
}
if (async && _self.Worker) {
var worker = new Worker(_.filename);
worker.onmessage = function (evt) {
insertHighlightedCode(evt.data);
};
worker.postMessage(JSON.stringify({
language: env.language,
code: env.code,
immediateClose: true
}));
} else {
insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
}
},
highlight: function (text, grammar, language) {
var env = {
code: text,
grammar: grammar,
language: language
};
_.hooks.run('before-tokenize', env);
env.tokens = _.tokenize(env.code, env.grammar);
_.hooks.run('after-tokenize', env);
return Token.stringify(_.util.encode(env.tokens), env.language);
},
tokenize: function (text, grammar) {
var rest = grammar.rest;
if (rest) {
for (var token in rest) {
grammar[token] = rest[token];
}
delete grammar.rest;
}
var tokenList = new LinkedList();
addAfter(tokenList, tokenList.head, text);
matchGrammar(text, tokenList, grammar, tokenList.head, 0);
return toArray(tokenList);
},
hooks: {
all: {},
add: function (name, callback) {
var hooks = _.hooks.all;
hooks[name] = hooks[name] || [];
hooks[name].push(callback);
},
run: function (name, env) {
var callbacks = _.hooks.all[name];
if (!callbacks || !callbacks.length) {
return;
}
for (var i = 0, callback; (callback = callbacks[i++]);) {
callback(env);
}
}
},
Token: Token
};
_self.Prism = _;
function Token(type, content, alias, matchedStr) {
this.type = type;
this.content = content;
this.alias = alias;
this.length = (matchedStr || '').length | 0;
}
Token.stringify = function stringify(o, language) {
if (typeof o == 'string') {
return o;
}
if (Array.isArray(o)) {
var s = '';
o.forEach(function (e) {
s += stringify(e, language);
});
return s;
}
var env = {
type: o.type,
content: stringify(o.content, language),
tag: 'span',
classes: ['token', o.type],
attributes: {},
language: language
};
var aliases = o.alias;
if (aliases) {
if (Array.isArray(aliases)) {
Array.prototype.push.apply(env.classes, aliases);
} else {
env.classes.push(aliases);
}
}
_.hooks.run('wrap', env);
var attributes = '';
for (var name in env.attributes) {
attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
}
return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
};
function matchPattern(pattern, pos, text, lookbehind) {
pattern.lastIndex = pos;
var match = pattern.exec(text);
if (match && lookbehind && match[1]) {
var lookbehindLength = match[1].length;
match.index += lookbehindLength;
match[0] = match[0].slice(lookbehindLength);
}
return match;
}
function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
for (var token in grammar) {
if (!grammar.hasOwnProperty(token) || !grammar[token]) {
continue;
}
var patterns = grammar[token];
patterns = Array.isArray(patterns) ? patterns : [patterns];
for (var j = 0; j < patterns.length; ++j) {
if (rematch && rematch.cause == token + ',' + j) {
return;
}
var patternObj = patterns[j];
var inside = patternObj.inside;
var lookbehind = !!patternObj.lookbehind;
var greedy = !!patternObj.greedy;
var alias = patternObj.alias;
if (greedy && !patternObj.pattern.global) {
var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
}
var pattern = patternObj.pattern || patternObj;
for ( // iterate the token list and keep track of the current token/string position
var currentNode = startNode.next, pos = startPos;
currentNode !== tokenList.tail;
pos += currentNode.value.length, currentNode = currentNode.next
) {
if (rematch && pos >= rematch.reach) {
break;
}
var str = currentNode.value;
if (tokenList.length > text.length) {
return;
}
if (str instanceof Token) {
continue;
}
var removeCount = 1; // this is the to parameter of removeBetween
var match;
if (greedy) {
match = matchPattern(pattern, pos, text, lookbehind);
if (!match) {
break;
}
var from = match.index;
var to = match.index + match[0].length;
var p = pos;
p += currentNode.value.length;
while (from >= p) {
currentNode = currentNode.next;
p += currentNode.value.length;
}
p -= currentNode.value.length;
pos = p;
if (currentNode.value instanceof Token) {
continue;
}
for (
var k = currentNode;
k !== tokenList.tail && (p < to || typeof k.value === 'string');
k = k.next
) {
removeCount++;
p += k.value.length;
}
removeCount--;
str = text.slice(pos, p);
match.index -= pos;
} else {
match = matchPattern(pattern, 0, str, lookbehind);
if (!match) {
continue;
}
}
var from = match.index;
var matchStr = match[0];
var before = str.slice(0, from);
var after = str.slice(from + matchStr.length);
var reach = pos + str.length;
if (rematch && reach > rematch.reach) {
rematch.reach = reach;
}
var removeFrom = currentNode.prev;
if (before) {
removeFrom = addAfter(tokenList, removeFrom, before);
pos += before.length;
}
removeRange(tokenList, removeFrom, removeCount);
var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
currentNode = addAfter(tokenList, removeFrom, wrapped);
if (after) {
addAfter(tokenList, currentNode, after);
}
if (removeCount > 1) {
var nestedRematch = {
cause: token + ',' + j,
reach: reach
};
matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
if (rematch && nestedRematch.reach > rematch.reach) {
rematch.reach = nestedRematch.reach;
}
}
}
}
}
}
function LinkedList() {
var head = { value: null, prev: null, next: null };
var tail = { value: null, prev: head, next: null };
head.next = tail;
this.head = head;
this.tail = tail;
this.length = 0;
}
function addAfter(list, node, value) {
var next = node.next;
var newNode = { value: value, prev: node, next: next };
node.next = newNode;
next.prev = newNode;
list.length++;
return newNode;
}
function removeRange(list, node, count) {
var next = node.next;
for (var i = 0; i < count && next !== list.tail; i++) {
next = next.next;
}
node.next = next;
next.prev = node;
list.length -= i;
}
function toArray(list) {
var array = [];
var node = list.head.next;
while (node !== list.tail) {
array.push(node.value);
node = node.next;
}
return array;
}
if (!_self.document) {
if (!_self.addEventListener) {
return _;
}
if (!_.disableWorkerMessageHandler) {
_self.addEventListener('message', function (evt) {
var message = JSON.parse(evt.data);
var lang = message.language;
var code = message.code;
var immediateClose = message.immediateClose;
_self.postMessage(_.highlight(code, _.languages[lang], lang));
if (immediateClose) {
_self.close();
}
}, false);
}
return _;
}
var script = _.util.currentScript();
if (script) {
_.filename = script.src;
if (script.hasAttribute('data-manual')) {
_.manual = true;
}
}
function highlightAutomaticallyCallback() {
if (!_.manual) {
_.highlightAll();
}
}
if (!_.manual) {
var readyState = document.readyState;
if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
} else {
if (window.requestAnimationFrame) {
window.requestAnimationFrame(highlightAutomaticallyCallback);
} else {
window.setTimeout(highlightAutomaticallyCallback, 16);
}
}
}
return _;
}(_self));
if (typeof module !== 'undefined' && module.exports) {
module.exports = Prism;
}
if (typeof global !== 'undefined') {
global.Prism = Prism;
}
;
Prism.languages.markup = {
'comment': /<!--[\s\S]*?-->/,
'prolog': /<\?[\s\S]+?\?>/,
'doctype': {
pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
greedy: true,
inside: {
'internal-subset': {
pattern: /(\[)[\s\S]+(?=\]>$)/,
lookbehind: true,
greedy: true,
inside: null // see below
},
'string': {
pattern: /"[^"]*"|'[^']*'/,
greedy: true
},
'punctuation': /^<!|>$|[[\]]/,
'doctype-tag': /^DOCTYPE/,
'name': /[^\s<>'"]+/
}
},
'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
'tag': {
pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
greedy: true,
inside: {
'tag': {
pattern: /^<\/?[^\s>\/]+/,
inside: {
'punctuation': /^<\/?/,
'namespace': /^[^\s>\/:]+:/
}
},
'special-attr': [],
'attr-value': {
pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
inside: {
'punctuation': [
{
pattern: /^=/,
alias: 'attr-equals'
},
/"|'/
]
}
},
'punctuation': /\/?>/,
'attr-name': {
pattern: /[^\s>\/]+/,
inside: {
'namespace': /^[^\s>\/:]+:/
}
}
}
},
'entity': [
{
pattern: /&[\da-z]{1,8};/i,
alias: 'named-entity'
},
/&#x?[\da-f]{1,8};/i
]
};
Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;
Prism.hooks.add('wrap', function (env) {
if (env.type === 'entity') {
env.attributes['title'] = env.content.replace(/&amp;/, '&');
}
});
Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
value: function addInlined(tagName, lang) {
var includedCdataInside = {};
includedCdataInside['language-' + lang] = {
pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
lookbehind: true,
inside: Prism.languages[lang]
};
includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
var inside = {
'included-cdata': {
pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
inside: includedCdataInside
}
};
inside['language-' + lang] = {
pattern: /[\s\S]+/,
inside: Prism.languages[lang]
};
var def = {};
def[tagName] = {
pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
lookbehind: true,
greedy: true,
inside: inside
};
Prism.languages.insertBefore('markup', 'cdata', def);
}
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
value: function (attrName, lang) {
Prism.languages.markup.tag.inside['special-attr'].push({
pattern: RegExp(
/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
'i'
),
lookbehind: true,
inside: {
'attr-name': /^[^\s=]+/,
'attr-value': {
pattern: /=[\s\S]+/,
inside: {
'value': {
pattern: /(=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
lookbehind: true,
alias: [lang, 'language-' + lang],
inside: Prism.languages[lang]
},
'punctuation': [
{
pattern: /^=/,
alias: 'attr-equals'
},
/"|'/
]
}
}
}
});
}
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;
(function (Prism) {
var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
Prism.languages.css = {
'comment': /\/\*[\s\S]*?\*\//,
'atrule': {
pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
inside: {
'rule': /^@[\w-]+/,
'selector-function-argument': {
pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
lookbehind: true,
alias: 'selector'
},
'keyword': {
pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
lookbehind: true
}
}
},
'url': {
pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
greedy: true,
inside: {
'function': /^url/i,
'punctuation': /^\(|\)$/,
'string': {
pattern: RegExp('^' + string.source + '$'),
alias: 'url'
}
}
},
'selector': RegExp('[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
'string': {
pattern: string,
greedy: true
},
'property': /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
'important': /!important\b/i,
'function': /[-a-z0-9]+(?=\()/i,
'punctuation': /[(){};:,]/
};
Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
var markup = Prism.languages.markup;
if (markup) {
markup.tag.addInlined('style', 'css');
markup.tag.addAttribute('style', 'css');
}
}(Prism));
Prism.languages.clike = {
'comment': [
{
pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
lookbehind: true,
greedy: true
},
{
pattern: /(^|[^\\:])\/\/.*/,
lookbehind: true,
greedy: true
}
],
'string': {
pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
greedy: true
},
'class-name': {
pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
lookbehind: true,
inside: {
'punctuation': /[.\\]/
}
},
'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
'boolean': /\b(?:true|false)\b/,
'function': /\w+(?=\()/,
'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
'punctuation': /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend('clike', {
'class-name': [
Prism.languages.clike['class-name'],
{
pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
lookbehind: true
}
],
'keyword': [
{
pattern: /((?:^|})\s*)catch\b/,
lookbehind: true
},
{
pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
lookbehind: true
},
],
'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore('javascript', 'keyword', {
'regex': {
pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
lookbehind: true,
greedy: true,
inside: {
'regex-source': {
pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
lookbehind: true,
alias: 'language-regex',
inside: Prism.languages.regex
},
'regex-flags': /[a-z]+$/,
'regex-delimiter': /^\/|\/$/
}
},
'function-variable': {
pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
alias: 'function'
},
'parameter': [
{
pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
lookbehind: true,
inside: Prism.languages.javascript
},
{
pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
inside: Prism.languages.javascript
},
{
pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
lookbehind: true,
inside: Prism.languages.javascript
},
{
pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
lookbehind: true,
inside: Prism.languages.javascript
}
],
'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore('javascript', 'string', {
'hashbang': {
pattern: /^#!.*/,
greedy: true,
alias: 'comment'
},
'template-string': {
pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
greedy: true,
inside: {
'template-punctuation': {
pattern: /^`|`$/,
alias: 'string'
},
'interpolation': {
pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
lookbehind: true,
inside: {
'interpolation-punctuation': {
pattern: /^\${|}$/,
alias: 'punctuation'
},
rest: Prism.languages.javascript
}
},
'string': /[\s\S]+/
}
}
});
if (Prism.languages.markup) {
Prism.languages.markup.tag.addInlined('script', 'javascript');
Prism.languages.markup.tag.addAttribute(
/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
'javascript'
);
}
Prism.languages.js = Prism.languages.javascript;
Prism.languages.git = {
'comment': /^#.*/m,
'deleted': /^[-â].*/m,
'inserted': /^\+.*/m,
'string': /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
'command': {
pattern: /^.*\$ git .*$/m,
inside: {
'parameter': /\s--?\w+/m
}
},
'coord': /^@@.*@@$/m,
'commit-sha1': /^commit \w{40}$/m
};
(function (Prism) {
Prism.languages.http = {
'request-line': {
pattern: /^(?:GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\s(?:https?:\/\/|\/)\S*\sHTTP\/[0-9.]+/m,
inside: {
'method': {
pattern: /^[A-Z]+\b/,
alias: 'property'
},
'request-target': {
pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,
lookbehind: true,
alias: 'url',
inside: Prism.languages.uri
},
'http-version': {
pattern: /^(\s)HTTP\/[0-9.]+/,
lookbehind: true,
alias: 'property'
},
}
},
'response-status': {
pattern: /^HTTP\/[0-9.]+ \d+ .+/m,
inside: {
'http-version': {
pattern: /^HTTP\/[0-9.]+/,
alias: 'property'
},
'status-code': {
pattern: /^(\s)\d+(?=\s)/,
lookbehind: true,
alias: 'number'
},
'reason-phrase': {
pattern: /^(\s).+/,
lookbehind: true,
alias: 'string'
}
}
},
'header-name': {
pattern: /^[\w-]+:(?=.)/m,
alias: 'keyword'
}
};
var langs = Prism.languages;
var httpLanguages = {
'application/javascript': langs.javascript,
'application/json': langs.json || langs.javascript,
'application/xml': langs.xml,
'text/xml': langs.xml,
'text/html': langs.html,
'text/css': langs.css
};
var suffixTypes = {
'application/json': true,
'application/xml': true
};
function getSuffixPattern(contentType) {
var suffix = contentType.replace(/^[a-z]+\//, '');
var suffixPattern = '\\w+/(?:[\\w.-]+\\+)+' + suffix + '(?![+\\w.-])';
return '(?:' + contentType + '|' + suffixPattern + ')';
}
var options;
for (var contentType in httpLanguages) {
if (httpLanguages[contentType]) {
options = options || {};
var pattern = suffixTypes[contentType] ? getSuffixPattern(contentType) : contentType;
options[contentType.replace(/\//g, '-')] = {
pattern: RegExp('(content-type:\\s*' + pattern + '(?:(?:\\r\\n?|\\n).+)*)(?:\\r?\\n|\\r){2}[\\s\\S]*', 'i'),
lookbehind: true,
inside: httpLanguages[contentType]
};
}
}
if (options) {
Prism.languages.insertBefore('http', 'header-name', options);
}
}(Prism));
(function (Prism) {
var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
var classNamePrefix = /(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;
var className = {
pattern: RegExp(classNamePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
lookbehind: true,
inside: {
'namespace': {
pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
inside: {
'punctuation': /\./
}
},
'punctuation': /\./
}
};
Prism.languages.java = Prism.languages.extend('clike', {
'class-name': [
className,
{
pattern: RegExp(classNamePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=())])/.source),
lookbehind: true,
inside: className.inside
}
],
'keyword': keywords,
'function': [
Prism.languages.clike.function,
{
pattern: /(\:\:\s*)[a-z_]\w*/,
lookbehind: true
}
],
'number': /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
'operator': {
pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
lookbehind: true
}
});
Prism.languages.insertBefore('java', 'string', {
'triple-quoted-string': {
pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
greedy: true,
alias: 'string'
}
});
Prism.languages.insertBefore('java', 'class-name', {
'annotation': {
pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
lookbehind: true,
alias: 'punctuation'
},
'generics': {
pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
inside: {
'class-name': className,
'keyword': keywords,
'punctuation': /[<>(),.:]/,
'operator': /[?&|]/
}
},
'namespace': {
pattern: RegExp(
/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/
.source.replace(/<keyword>/g, function () { return keywords.source; })),
lookbehind: true,
inside: {
'punctuation': /\./,
}
}
});
}(Prism));
Prism.languages.sql = {
'comment': {
pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
lookbehind: true
},
'variable': [
{
pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
greedy: true
},
/@[\w.$]+/
],
'string': {
pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
greedy: true,
lookbehind: true
},
'function': /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i, // Should we highlight user defined functions too?
'keyword': /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
'boolean': /\b(?:TRUE|FALSE|NULL)\b/i,
'number': /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
'operator': /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
'punctuation': /[;[\]()`,.]/
};
(function (Prism) {
var plsql = Prism.languages.plsql = Prism.languages.extend('sql', {
'comment': [
/\/\*[\s\S]*?\*\//,
/--.*/
]
});
var keyword = plsql['keyword'];
if (!Array.isArray(keyword)) {
keyword = plsql['keyword'] = [keyword];
}
keyword.unshift(
/\b(?:ACCESS|AGENT|AGGREGATE|ARRAY|ARROW|AT|ATTRIBUTE|AUDIT|AUTHID|BFILE_BASE|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BYTE|CALLING|CHAR_BASE|CHARSET(?:FORM|ID)|CLOB_BASE|COLAUTH|COLLECT|CLUSTERS?|COMPILED|COMPRESS|CONSTANT|CONSTRUCTOR|CONTEXT|CRASH|CUSTOMDATUM|DANGLING|DATE_BASE|DEFINE|DETERMINISTIC|DURATION|ELEMENT|EMPTY|EXCEPTIONS?|EXCLUSIVE|EXTERNAL|FINAL|FORALL|FORM|FOUND|GENERAL|HEAP|HIDDEN|IDENTIFIED|IMMEDIATE|INCLUDING|INCREMENT|INDICATOR|INDEXES|INDICES|INFINITE|INITIAL|ISOPEN|INSTANTIABLE|INTERFACE|INVALIDATE|JAVA|LARGE|LEADING|LENGTH|LIBRARY|LIKE[24C]|LIMITED|LONG|LOOP|MAP|MAXEXTENTS|MAXLEN|MEMBER|MINUS|MLSLABEL|MULTISET|NAME|NAN|NATIVE|NEW|NOAUDIT|NOCOMPRESS|NOCOPY|NOTFOUND|NOWAIT|NUMBER(?:_BASE)?|OBJECT|OCI(?:COLL|DATE|DATETIME|DURATION|INTERVAL|LOBLOCATOR|NUMBER|RAW|REF|REFCURSOR|ROWID|STRING|TYPE)|OFFLINE|ONLINE|ONLY|OPAQUE|OPERATOR|ORACLE|ORADATA|ORGANIZATION|ORL(?:ANY|VARY)|OTHERS|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETERS?|PASCAL|PCTFREE|PIPE(?:LINED)?|PRAGMA|PRIOR|PRIVATE|RAISE|RANGE|RAW|RECORD|REF|REFERENCE|REM|REMAINDER|RESULT|RESOURCE|RETURNING|REVERSE|ROW(?:ID|NUM|TYPE)|SAMPLE|SB[124]|SEGMENT|SELF|SEPARATE|SEQUENCE|SHORT|SIZE(?:_T)?|SPARSE|SQL(?:CODE|DATA|NAME|STATE)|STANDARD|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUCCESSFUL|SYNONYM|SYSDATE|TABAUTH|TDO|THE|TIMEZONE_(?:ABBR|HOUR|MINUTE|REGION)|TRAILING|TRANSAC(?:TIONAL)?|TRUSTED|UB[124]|UID|UNDER|UNTRUSTED|VALIDATE|VALIST|VARCHAR2|VARIABLE|VARIANCE|VARRAY|VIEWS|VOID|WHENEVER|WRAPPED|ZONE)\b/i
);
var operator = plsql['operator'];
if (!Array.isArray(operator)) {
operator = plsql['operator'] = [operator];
}
operator.unshift(
/:=/
);
}(Prism));
