import{_ as e,c as a,o as s,a as n}from"./app-DzsGjCpt.js";const t={},o=n(`<h1 id="crud-interactions-with-a-database" tabindex="-1"><a class="header-anchor" href="#crud-interactions-with-a-database"><span>CRUD interactions with a database</span></a></h1><p><strong>CRUD</strong> is the acronym for <strong>CREATE, READ, UPDATE and DELETE</strong>. These terms describe the four essential operations for creating and managing persistent data elements in relational databases.</p><h2 id="create" tabindex="-1"><a class="header-anchor" href="#create"><span>Create</span></a></h2><p>The CREATE operation <strong>adds a new record</strong> to a database. In RDBMS, a database table row is referred to as a record, while columns are called attributes or fields. The CREATE operation adds one or more new records with distinct field values in a table.</p><p>Example SQL statement:</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token operator">&lt;</span><span class="token keyword">table</span> name<span class="token operator">&gt;</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>field <span class="token keyword">value</span> <span class="token number">1</span><span class="token punctuation">,</span> field <span class="token keyword">value</span><span class="token punctuation">,</span> <span class="token number">2</span>…<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="read" tabindex="-1"><a class="header-anchor" href="#read"><span>Read</span></a></h2><p>READ returns records from a database table based on some search criteria. The READ operation can return all records and some or all fields.</p><p>Example SQL statement:</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">SELECT</span> field <span class="token number">1</span><span class="token punctuation">,</span> field <span class="token number">2</span><span class="token punctuation">,</span> …<span class="token keyword">FROM</span> <span class="token operator">&lt;</span><span class="token keyword">table</span> name<span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token keyword">WHERE</span> <span class="token operator">&lt;</span>condition<span class="token operator">&gt;</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="update" tabindex="-1"><a class="header-anchor" href="#update"><span>Update</span></a></h2><p>UPDATE is used to modify existing records in the database. For example, this can be the change of address in a customer database or price change in a product database. Similar to READ, UPDATEs can be applied across all records or only a few, based on criteria.</p><p>An UPDATE operation can modify and persist changes to a single field or to multiple fields of the record. If multiple fields are to be updated, the database system ensures they are all updated or not at all.</p><p>Example SQL statement:</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">UPDATE</span> <span class="token operator">&lt;</span><span class="token keyword">table</span> name<span class="token operator">&gt;</span> <span class="token keyword">SET</span> field1<span class="token operator">=</span>value1<span class="token punctuation">,</span> field2<span class="token operator">=</span>value2<span class="token punctuation">,</span>… <span class="token punctuation">[</span><span class="token keyword">WHERE</span> <span class="token operator">&lt;</span>condition<span class="token operator">&gt;</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="delete" tabindex="-1"><a class="header-anchor" href="#delete"><span>Delete</span></a></h2><p>DELETE operations allow the user to remove records from the database. A hard delete removes the record altogether, while a soft delete flags the record but leaves it in place. For example, this is important in payroll where employment records need to be maintained even after an employee has left the company.</p><p>Example SQL statement:</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> <span class="token operator">&lt;</span><span class="token keyword">table</span> name<span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token keyword">WHERE</span> <span class="token operator">&lt;</span>condition<span class="token operator">&gt;</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,19),r=[o];function l(p,i){return s(),a("div",null,r)}const c=e(t,[["render",l],["__file","index.html.vue"]]),u=JSON.parse('{"path":"/46_crud_db/","title":"CRUD interactions with a database","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Create","slug":"create","link":"#create","children":[]},{"level":2,"title":"Read","slug":"read","link":"#read","children":[]},{"level":2,"title":"Update","slug":"update","link":"#update","children":[]},{"level":2,"title":"Delete","slug":"delete","link":"#delete","children":[]}],"git":{"updatedTime":1680090701000,"contributors":[{"name":"ronnymees","email":"ronny.mees@vives.be","commits":1}]},"filePathRelative":"46_crud_db/README.md"}');export{c as comp,u as data};