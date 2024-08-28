import{_ as n,c as s,o as a,a as e}from"./app-DzsGjCpt.js";const l="/assets/containers-Bgzq_RLm.png",i={},t=e(`<h1 id="deploy-a-mysql-express-vue-project" tabindex="-1"><a class="header-anchor" href="#deploy-a-mysql-express-vue-project"><span>Deploy a MySQL, Express &amp; Vue project</span></a></h1><div class="hint-container warning"><p class="hint-container-title">🔥warning</p><p>Make sure you have prepared your VM before continuing here.</p></div><h2 id="prepare-your-project-for-deployment" tabindex="-1"><a class="header-anchor" href="#prepare-your-project-for-deployment"><span>Prepare your project for deployment</span></a></h2><p>To be able to deploy our web application on the VM we need to prepare it.</p><h3 id="create-a-github-repository-for-deployment" tabindex="-1"><a class="header-anchor" href="#create-a-github-repository-for-deployment"><span>Create a GitHub repository for deployment</span></a></h3><ul><li>create a new repository on github</li><li>create a local folder <code>&lt;projectname&gt;</code> with the subfolders <code>backend-api</code> and <code>frontend-vue</code>.</li><li>make a copy of your <strong>express</strong> project to the folder <code>backend-api</code>.</li><li>make a copy of your <strong>vue</strong> project to the folder <code>frontend-vue</code>.</li><li>open the folder <code>&lt;projectname&gt;</code> in Visual Code and open a terminal</li><li>make it a git repository by typing <code>git init</code>.</li><li>add the remote GitHub repository by typing <code>git remote add origin git@github.com:yourusername/repositoryname.git</code> (the last part is your SSH link from your GitHub repository)</li><li>make a first push</li></ul><h3 id="preparing-the-necessary-files-for-docker" tabindex="-1"><a class="header-anchor" href="#preparing-the-necessary-files-for-docker"><span>Preparing the necessary files for docker</span></a></h3><h4 id="docker-compose-file" tabindex="-1"><a class="header-anchor" href="#docker-compose-file"><span>Docker compose file</span></a></h4><p>First we will be creating the docker compose file that will contain the necessary services that need to be deployed on docker ( MySQL, PHPmyAdmin, Backend-API and Frontend-Vue).</p><p>Create a file <code>docker-compose.yml</code> in the folder <code>&lt;projectname&gt;</code> with the following content:</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span></span>
<span class="line"><span class="token key atrule">services</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">db</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql</span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> MYSQL_ROOT_PASSWORD=$<span class="token punctuation">{</span>MYSQLDB_ROOT_PASSWORD<span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">-</span> MYSQL_DATABASE=$<span class="token punctuation">{</span>MYSQLDB_DATABASE<span class="token punctuation">}</span></span>
<span class="line">    <span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> db<span class="token punctuation">:</span>/var/lib/mysql</span>
<span class="line">  <span class="token key atrule">phpmyadmin</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">image</span><span class="token punctuation">:</span> phpmyadmin/phpmyadmin</span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token string">&quot;8080:80&quot;</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> PMA_ARBITRARY=1</span>
<span class="line">      <span class="token punctuation">-</span> PMA_HOST=db</span>
<span class="line">      <span class="token punctuation">-</span> PMA_USER=root</span>
<span class="line">      <span class="token punctuation">-</span> PMA_PASSWORD=$<span class="token punctuation">{</span>MYSQLDB_ROOT_PASSWORD<span class="token punctuation">}</span></span>
<span class="line">  <span class="token key atrule">api</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> db</span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./backend<span class="token punctuation">-</span>api</span>
<span class="line">      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile</span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> 3000<span class="token punctuation">:</span><span class="token number">3000</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> DB_HOST=db</span>
<span class="line">      <span class="token punctuation">-</span> DB_USER=$<span class="token punctuation">{</span>MYSQLDB_USER<span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">-</span> DB_PASS=$<span class="token punctuation">{</span>MYSQLDB_USER_PASS<span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">-</span> DB_NAME=$<span class="token punctuation">{</span>MYSQLDB_DATABASE<span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">-</span> DB_PORT=3306</span>
<span class="line">  <span class="token key atrule">ui</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span> </span>
<span class="line">       <span class="token punctuation">-</span> api</span>
<span class="line">    <span class="token key atrule">build</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./frontend<span class="token punctuation">-</span>vue</span>
<span class="line">      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile</span>
<span class="line">    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always</span>
<span class="line">    <span class="token key atrule">ports</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token datetime number">80:80</span></span>
<span class="line">    <span class="token key atrule">environment</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> VUE_APP_API_HOST=&lt;your server ip<span class="token punctuation">-</span>adress<span class="token punctuation">&gt;</span><span class="token punctuation">:</span><span class="token number">3000</span></span>
<span class="line"><span class="token key atrule">volumes</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">db</span><span class="token punctuation">:</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Notice that the MySQL server port 3306 is not exposed, so our database is not accessable outside docker.</p><h4 id="docker-file-for-the-backend-api" tabindex="-1"><a class="header-anchor" href="#docker-file-for-the-backend-api"><span>Docker file for the backend API</span></a></h4><p>Create a file <code>Dockerfile</code> in the folder <code>backend-api</code> with the following content:</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token comment"># Development stage</span></span>
<span class="line">FROM node<span class="token punctuation">:</span>18.16<span class="token punctuation">-</span>alpine3.17 as develop<span class="token punctuation">-</span>stage</span>
<span class="line">WORKDIR /app</span>
<span class="line">COPY package<span class="token important">*.json</span> ./</span>
<span class="line">RUN npm install</span>
<span class="line">COPY . .</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Build stage</span></span>
<span class="line">FROM develop<span class="token punctuation">-</span>stage as build<span class="token punctuation">-</span>stage</span>
<span class="line">EXPOSE 3000</span>
<span class="line">CMD <span class="token punctuation">[</span><span class="token string">&quot;npm&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;run&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;start&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="docker-file-for-the-frontend-vue" tabindex="-1"><a class="header-anchor" href="#docker-file-for-the-frontend-vue"><span>Docker file for the frontend Vue</span></a></h4><p>Create a file <code>Dockerfile</code> in the folder <code>frontend-vue</code> with the following content:</p><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token comment"># Development Stage</span></span>
<span class="line">FROM node<span class="token punctuation">:</span>18.16<span class="token punctuation">-</span>alpine3.17 as develop<span class="token punctuation">-</span>stage</span>
<span class="line">WORKDIR /app</span>
<span class="line">COPY package<span class="token important">*.json</span> ./</span>
<span class="line">RUN npm install</span>
<span class="line">COPY . .</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Build Stage</span></span>
<span class="line">FROM develop<span class="token punctuation">-</span>stage as build<span class="token punctuation">-</span>stage</span>
<span class="line">RUN npm run build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Production Stage</span></span>
<span class="line">FROM nginx<span class="token punctuation">:</span>1.25.1<span class="token punctuation">-</span>alpine as production<span class="token punctuation">-</span>stage</span>
<span class="line">COPY <span class="token punctuation">-</span><span class="token punctuation">-</span>from=build<span class="token punctuation">-</span>stage /app/dist /usr/share/nginx/html</span>
<span class="line">COPY nginx.conf /etc/nginx/nginx.conf</span>
<span class="line">COPY vue<span class="token punctuation">-</span>env<span class="token punctuation">-</span>replace.sh /docker<span class="token punctuation">-</span>entrypoint.d</span>
<span class="line">EXPOSE 80</span>
<span class="line">CMD <span class="token punctuation">[</span><span class="token string">&quot;nginx&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-g&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;daemon off;&quot;</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="hosting-configuration" tabindex="-1"><a class="header-anchor" href="#hosting-configuration"><span>Hosting configuration</span></a></h4><p>We are using <code>nginx</code> to host our frontend, therefore we need to configure it by adding a <code>nginx.conf</code> file in the <code>frontend-vue</code> folder with the following content:</p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">user  nginx;</span>
<span class="line">worker_processes  1;</span>
<span class="line">error_log  /var/log/nginx/error.log warn;</span>
<span class="line">pid        /var/run/nginx.pid;</span>
<span class="line">events {</span>
<span class="line">  worker_connections  1024;</span>
<span class="line">}</span>
<span class="line">http {</span>
<span class="line">  include       /etc/nginx/mime.types;</span>
<span class="line">  default_type  application/octet-stream;</span>
<span class="line">  log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
<span class="line">                    &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
<span class="line">                    &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>
<span class="line">  access_log  /var/log/nginx/access.log  main;</span>
<span class="line">  sendfile        on;</span>
<span class="line">  keepalive_timeout  65;</span>
<span class="line">  server {</span>
<span class="line">    listen       80;</span>
<span class="line">    server_name  localhost;</span>
<span class="line">    location / {</span>
<span class="line">      root /usr/share/nginx/html;</span>
<span class="line">      index  index.html;</span>
<span class="line">      try_files $uri $uri/ /index.html;</span>
<span class="line">    }</span>
<span class="line">    error_page   500 502 503 504  /50x.html;</span>
<span class="line">    location = /50x.html {</span>
<span class="line">      root   /usr/share/nginx/html;</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="push-to-your-github-repository" tabindex="-1"><a class="header-anchor" href="#push-to-your-github-repository"><span>Push to your GitHub repository</span></a></h3><p>Now your project is ready for deployment, you can push it to GitHub.</p><h2 id="clone-and-deploy-your-project" tabindex="-1"><a class="header-anchor" href="#clone-and-deploy-your-project"><span>Clone and deploy your project</span></a></h2><p>Now we will be using our GitHub repository for deployment on Docker.</p><h3 id="clone-your-repository-on-docker" tabindex="-1"><a class="header-anchor" href="#clone-your-repository-on-docker"><span>Clone your repository on docker</span></a></h3><p>Make a remote connection to your VM using Visual Studio Code.</p><p>Open a terminal and clone your repository:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> clone <span class="token operator">&lt;</span>https <span class="token function">link</span> repo<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="environment-variables" tabindex="-1"><a class="header-anchor" href="#environment-variables"><span>Environment variables</span></a></h3><p>Open your projectfolder in remote connection of Visual Studio Code.</p><h4 id="create-the-environment-variables-file" tabindex="-1"><a class="header-anchor" href="#create-the-environment-variables-file"><span>Create the environment variables file</span></a></h4><p>Next we need to create a ´.env´ file in the folder <code>&lt;projectname&gt;</code> with the following content:</p><div class="language-env line-numbers-mode" data-highlighter="prismjs" data-ext="env" data-title="env"><pre><code><span class="line"># mySQL database</span>
<span class="line">MYSQLDB_ROOT_PASSWORD=&lt;your root password&gt;</span>
<span class="line">MYSQLDB_DATABASE=vives</span>
<span class="line">MYSQLDB_USER=&lt;a_user_for_your_database&gt;</span>
<span class="line">MYSQLDB_USER_PASS=&lt;a_password_for_this_user&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solve-a-problem-for-the-frontend" tabindex="-1"><a class="header-anchor" href="#solve-a-problem-for-the-frontend"><span>Solve a problem for the frontend</span></a></h4><p>For the Vue frontend we will have a problem that environment variables are injected into the application during the build stage. The resulting static files thus contain the respective values of those variables as hardcoded strings. To solve this we will use a script <code>vue-env-replace.sh</code> to replace all environment variables with there correct values.</p><p>You can please the <code>vue-env-replace.sh</code> in your <code>frontend-vue</code> folder with the following content:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;Replacing ENV vars before starting nginx&quot;</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token for-or-select variable">file</span> <span class="token keyword">in</span> /usr/share/nginx/html/assets/*.js<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">do</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token variable">$file</span>.tmpl.js <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token function">cp</span> <span class="token variable">$file</span> <span class="token variable">$file</span>.tmpl.js</span>
<span class="line">  <span class="token keyword">fi</span></span>
<span class="line">  envsubst <span class="token string">&#39;$VUE_APP_API_HOST&#39;</span> <span class="token operator">&lt;</span> <span class="token variable">$file</span>.tmpl.js <span class="token operator">&gt;</span> <span class="token variable">$file</span></span>
<span class="line"><span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">exit</span> <span class="token number">0</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Once you created this file, you will need to run the command <code>chmod +x vue-env-replace.sh</code> to make the script executable. The script will be executed by Docker because we have put it in the entrypoint.</p><h4 id="change-static-url-to-environment-variable" tabindex="-1"><a class="header-anchor" href="#change-static-url-to-environment-variable"><span>Change static URL to environment variable</span></a></h4><p>In your Vue frontend you need to change all <code>localhost:3000</code> to <code>\${VUE_APP_API_HOST}</code>.</p><p>Example:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;http://\${VUE_APP_API_HOST}/images&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="deploy-on-docker" tabindex="-1"><a class="header-anchor" href="#deploy-on-docker"><span>Deploy on docker</span></a></h3><p>Once we have done that, we are ready to build and run our service.</p><ul><li>use <code>docker-compose up -d</code> to deploy your container, now you get your bash prompt returned.</li><li>use <code>docker-compose up -d --build</code> to deploy your container and rebuild them after adjustments have been made.</li><li>use <code>docker-compose ps</code> to see the name of the containers and status.</li><li>use <code>docker-compose down</code> to stop and remove the docker containers.</li><li>use <code>docker-compose down -v</code> to stop and remove the docker containers and volumes.</li></ul><p><img src="`+l+`" alt="containers">exit</p><p>Should you want to open a terminal in one of the containers running on docker, you can do this by using this command:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token operator">&lt;</span>the name of the container<span class="token operator">&gt;</span> <span class="token function">sh</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>To exit just type <code>exit</code>.</p><h3 id="prepare-the-database" tabindex="-1"><a class="header-anchor" href="#prepare-the-database"><span>Prepare the database</span></a></h3><h4 id="create-a-user-for-the-application" tabindex="-1"><a class="header-anchor" href="#create-a-user-for-the-application"><span>Create a user for the application</span></a></h4><p>In your browser open PHPmyAdmin by surfing to <code>&lt;ip-adres-of-your-vm&gt;:8080</code> and run the following sql-statement:</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">USE</span> vives<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">USER</span> <span class="token string">&#39;&lt;a_user_for_your_database&gt;&#39;</span><span class="token variable">@&#39;%&#39;</span> IDENTIFIED <span class="token keyword">WITH</span> mysql_native_password <span class="token keyword">BY</span> <span class="token string">&quot;&lt;a_password_for_this_user&gt;&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> vives<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;&lt;a_user_for_your_database&gt;&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">💡tip</p><p>The user and password must be the same as you entered in your <code>.env</code> file.</p></div><h4 id="create-the-necessary-tables" tabindex="-1"><a class="header-anchor" href="#create-the-necessary-tables"><span>Create the necessary tables</span></a></h4><p>Run the SQL-statement script you made to restore your database tables.</p><p>Congratulations your project should be up and running now.</p>`,58),p=[t];function o(c,r){return a(),s("div",null,p)}const u=n(i,[["render",o],["__file","index.html.vue"]]),v=JSON.parse('{"path":"/83_docker_full/","title":"Deploy a MySQL, Express & Vue project","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Prepare your project for deployment","slug":"prepare-your-project-for-deployment","link":"#prepare-your-project-for-deployment","children":[{"level":3,"title":"Create a GitHub repository for deployment","slug":"create-a-github-repository-for-deployment","link":"#create-a-github-repository-for-deployment","children":[]},{"level":3,"title":"Preparing the necessary files for docker","slug":"preparing-the-necessary-files-for-docker","link":"#preparing-the-necessary-files-for-docker","children":[]},{"level":3,"title":"Push to your GitHub repository","slug":"push-to-your-github-repository","link":"#push-to-your-github-repository","children":[]}]},{"level":2,"title":"Clone and deploy your project","slug":"clone-and-deploy-your-project","link":"#clone-and-deploy-your-project","children":[{"level":3,"title":"Clone your repository on docker","slug":"clone-your-repository-on-docker","link":"#clone-your-repository-on-docker","children":[]},{"level":3,"title":"Environment variables","slug":"environment-variables","link":"#environment-variables","children":[]},{"level":3,"title":"Deploy on docker","slug":"deploy-on-docker","link":"#deploy-on-docker","children":[]},{"level":3,"title":"Prepare the database","slug":"prepare-the-database","link":"#prepare-the-database","children":[]}]}],"git":{"updatedTime":1700127748000,"contributors":[{"name":"ronnymees","email":"ronny.mees@vives.be","commits":3}]},"filePathRelative":"83_docker_full/README.md"}');export{u as comp,v as data};
