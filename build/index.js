!function(){"use strict";var t="uniform mat4 projection;uniform mat4 view;attribute vec3 vertex0Position;attribute vec2 vertex1TexCoord;varying vec2 texCoord;void main(){gl_PointSize=64.0;gl_Position=projection*view*vec4(vertex0Position,1.0);texCoord=vertex1TexCoord;}",e="precision highp float;uniform sampler2D tex;varying vec2 texCoord;void main(){vec2 texCoord=mix((vec2(16.0)*texCoord)/vec2(128.0,32.0),(vec2(16.0)*(texCoord+vec2(1.0)))/vec2(128.0,32.0),gl_PointCoord);gl_FragColor=texture2D(tex,texCoord);if(gl_FragColor.a<0.1){discard;}}",i="uniform mat4 projection;uniform mat4 view;uniform float time;attribute vec2 vertex0Position;attribute vec3 vertex1Color;attribute vec2 vertex2Velocity;attribute float vertex3Emitted;attribute float vertex4Lifetime;varying vec4 color;void main(){float age=time-vertex3Emitted;vec2 position=vertex0Position+vertex2Velocity*age;gl_PointSize=4.0;gl_Position=projection*view*vec4(position,0.9,1.0);color=vec4(vertex1Color,1.0-smoothstep(0.0,vertex4Lifetime,age));}",s="precision highp float;varying vec4 color;void main(){gl_FragColor=color;}";const r=(t,e)=>{switch(e){case t.FLOAT:return 1;case t.FLOAT_VEC2:return 2;case t.FLOAT_VEC3:return 3;case t.FLOAT_VEC4:return 4;case t.FLOAT_MAT3:return 9;case t.FLOAT_MAT4:return 16}};class h{constructor(t,e,i){this.gl=t;const s=t.createShader(t.VERTEX_SHADER);t.shaderSource(s,e),t.compileShader(s);const h=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(h,i),t.compileShader(h),this.program=t.createProgram(),t.attachShader(this.program,s),t.attachShader(this.program,h),t.linkProgram(this.program),this.uniforms=[];const a=t.getProgramParameter(this.program,t.ACTIVE_UNIFORMS);for(let e=0;e<a;e++){const i=t.getActiveUniform(this.program,e),s=t.getUniformLocation(this.program,i.name);this[i.name]=null,this.uniforms.push({type:i.type,name:i.name,location:s})}this.attributes=[],this.stride=0;const n=t.getProgramParameter(this.program,t.ACTIVE_ATTRIBUTES);for(let e=0;e<n;e++){const i=t.getActiveAttrib(this.program,e),s=t.getAttribLocation(this.program,i.name),h=r(t,i.type);this.attributes.push({name:i.name,location:s,components:h}),this.stride+=4*h}this.attributes.sort((t,e)=>t.name<e.name?-1:1)}use(){this.gl.useProgram(this.program);let t=0;for(const e of this.attributes)this.gl.enableVertexAttribArray(e.location),this.gl.vertexAttribPointer(e.location,e.components,this.gl.FLOAT,!1,this.stride,t),t+=4*e.components;for(const t of this.uniforms)switch(t.type){case this.gl.FLOAT:this.gl.uniform1f(t.location,this[t.name]);break;case this.gl.FLOAT_VEC2:this.gl.uniform2fv(t.location,this[t.name]);break;case this.gl.FLOAT_MAT2:this.gl.uniformMatrix2fv(t.location,!1,this[t.name]);break;case this.gl.FLOAT_MAT4:this.gl.uniformMatrix4fv(t.location,!1,this[t.name])}}}class a{constructor(r){const a=document.createElement("canvas");a.width=1024,a.height=600,document.body.appendChild(a),this.gl=a.getContext("webgl",{antialias:!1}),this.gl.enable(this.gl.DEPTH_TEST),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA),this.gl.clearColor(0,.53,1,1),this.spriteShader=new h(this.gl,t,e),this.particleShader=new h(this.gl,i,s),this.projection=new Float32Array([2/1024,0,0,0,0,-2/600,0,0,0,0,-1,0,-1,1,0,1]),this.view=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this.cameraX=0,this.cameraY=0,this.texture=this.gl.createTexture(),this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,new Uint8Array([0,0,255,255])),this.setUpTexture();const n=new Image;n.addEventListener("load",()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,n),this.setUpTexture(),r.started=!0}),n.crossOrigin="",n.src="textures/tiles.png"}setUpTexture(){this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST)}tileTextureU(t){return 16*t/128}tileTextureV(t){return 16*t/32}clear(){this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}update(){this.view[12]=-Math.round(this.cameraX),this.view[13]=-Math.round(this.cameraY)}draw(t,e,i,s,r,h=!1){this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i),s&&this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,s),t.projection=this.projection,t.view=this.view,t.model=e,t.use();const a=h?this.gl.POINTS:this.gl.TRIANGLES;s?this.gl.drawElements(a,r,this.gl.UNSIGNED_SHORT,0):this.gl.drawArrays(a,0,r)}}class n{constructor(t,e,i=!1){this.timeout=t,this.callback=e,this.repeating=i,this.progress=0,this.enabled=!0}update(){this.enabled&&(this.progress+=1e3/60,this.progress>=this.timeout&&(this.callback(),this.repeating?this.progress-=this.timeout:this.enabled=!1))}}class o{constructor(){this.active=!1,this.x=0,this.y=0,this.z=0,this.u=0,this.v=0}spawn(t,e,i,s,r,h,a){this.active=!0,this.x=t,this.y=e,this.z=i,this.u=s,this.v=r,h&&(h.init(this),this.controller=h),a&&(this.frames=a,this.currentFrame=0,this.frameDirection=-1,this.frameTimer=new n(100,()=>{this.currentFrame=(this.currentFrame+this.frameDirection)%this.frames.length,this.currentFrame<0&&(this.currentFrame=this.frames.length-1),this.u=this.frames[this.currentFrame][0],this.v=this.frames[this.currentFrame][1]},!0))}update(){if(this.controller&&this.controller.update(),this.frameTimer&&this.frameTimer.update(),!this.active)return!0;const t=this.oldX!==this.x||this.oldY!==this.y||this.oldZ!==this.z||this.oldU!==this.u||this.oldV!==this.v;return this.oldX=this.x,this.oldY=this.y,this.oldZ=this.z,this.oldU=this.u,this.oldV=this.v,t}}const l=8192,c=20;class d{constructor(t){this.renderer=t,this.vertexBuffer=t.gl.createBuffer(),t.gl.bindBuffer(t.gl.ARRAY_BUFFER,this.vertexBuffer),t.gl.bufferData(t.gl.ARRAY_BUFFER,l*c,t.gl.STATIC_DRAW),this.spriteVertex=new Float32Array(c/4),this.sprites=[];for(let t=0;t<l;t++)this.sprites.push(new o(t))}updateSprite(t,e){this.spriteVertex[0]=e.active?e.x+32:0,this.spriteVertex[1]=e.active?e.y+32:0,this.spriteVertex[2]=e.active?e.z:0,this.spriteVertex[3]=e.active?e.u:0,this.spriteVertex[4]=e.active?e.v:0,this.renderer.gl.bindBuffer(this.renderer.gl.ARRAY_BUFFER,this.vertexBuffer),this.renderer.gl.bufferSubData(this.renderer.gl.ARRAY_BUFFER,t*c,this.spriteVertex)}spawnSprite(t,e,i,s,r,h=null,a=null){for(let n=0;n<l;n++){const o=this.sprites[n];if(!o.active)return o.spawn(t,e,i,s,r,h,a),this.updateSprite(n,o),o}}update(){for(let t=0;t<l;t++){const e=this.sprites[t];e.active&&e.update()&&this.updateSprite(t,e)}}draw(){this.renderer.draw(this.renderer.spriteShader,null,this.vertexBuffer,null,l,!0)}}var p="11111111111111111111111111111 G 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111\n22222222222222222222222222222   22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n22222222222222222222222222222   22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n22222222222222222222222222222   22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n22222222222222222222222222222   22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n22222222222222222222222222222   22222222222              2222222222222222222222222222222222222222222222222222222222222222222222\n22222222222222      R              R    R                2222222222222222222222222222222222222222222222222222222222222222222222\n22222222222  R        D       P       D     22222222222222222222222222222222222222222222222222222222222222222222222222222222222\n22222222222     111111111111111111111111111122222222222222222222222222222222222222222222222222222222222222222222222222222222222\n22222222222     222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222222222222            222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222222222222            222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222222222222222         222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222222222222222222 D    222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n22222222222222222221111  222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n222222222222222          222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n222222222222222   D      222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n22222222222222   11111111222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2    R           22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2         D   D  22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2      1111111111222            22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222   2222222222222            22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2      2222222222222            22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2    D        D        D E   D  22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2111111111111111111111111111111122222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\n";class u{constructor(t){this.map=t,this.dx=0,this.dy=0,this.ax=0,this.ay=0,this.hitboxX=0,this.hitboxY=0,this.hitboxW=64,this.hitboxH=64}init(t){this.sprite=t}get x(){return this.sprite.x}get y(){return this.sprite.y}set x(t){this.sprite.x=t}set y(t){this.sprite.y=t}get left(){return this.x+this.hitboxX}get right(){return this.x+this.hitboxX+this.hitboxW-1}get top(){return this.y+this.hitboxY}get bottom(){return this.y+this.hitboxY+this.hitboxH-1}update(){this.dx+=this.ax*(1e3/60),this.dy+=this.ay*(1e3/60),this.dx>.5?this.dx=.5:this.dx<-.5&&(this.dx=-.5),this.dy>2?this.dy=2:this.dy<-2&&(this.dy=-2),this.x+=this.dx*(1e3/60),this.tileAt()&&(this.dx<0?this.x+=this.map.prevTileOffset(this.left):this.x-=this.map.nextTileOffset(this.right)+1),this.y+=this.dy*(1e3/60),this.tileAt()&&(this.dy<0?this.y+=this.map.prevTileOffset(this.top):this.y-=this.map.nextTileOffset(this.bottom)+1)}tileAt(t=0,e=0){return this.map.tileAt(this.left+t,this.top+e)||this.map.tileAt(this.left+t,this.bottom+e)||this.map.tileAt(this.right+t,this.top+e)||this.map.tileAt(this.right+t,this.bottom+e)}}class g extends u{constructor(t,e,i,s){super(e),this.renderer=t,this.input=i,this.particleSystem=s,this.abilities={propulsion:!1,elevation:!1},this.direction=0,this.lastDirection=0}init(t){super.init(t),this.spawnX=this.x,this.spawnY=this.y}update(){const t=this.tileAt(0,1);t?(this.ay=0,this.dy=0):this.tileAt(0,-1)?(this.ay=.002,this.dy=0):this.ay=.002,this.input.pressed(4)&&this.abilities.propulsion?(this.ax>0&&(this.ax=0),this.tileAt(-1,0)?(this.dx=0,this.ax=0):this.ax-=1e-4,this.direction=-1,this.lastDirection=0):this.input.pressed(8)&&this.abilities.propulsion?(this.ax<0&&(this.ax=0),this.tileAt(1,0)?(this.dx=0,this.ax=0):this.ax+=1e-4,this.direction=1,this.lastDirection=0):(0!==this.direction&&(this.ax=-this.ax,this.lastDirection=this.direction,this.direction=0),(this.lastDirection>0&&this.dx<.001||this.lastDirection<0&&this.dx>.001||this.tileAt(-1,0)||this.tileAt(1,0))&&(this.dx=0,this.ax=0)),this.ax>.002?this.ax=.002:this.ax<-.002&&(this.ax=-.002),this.input.justPressed(32)&&0===this.ay&&this.abilities.elevation&&(this.dy=-.9),super.update(),this.dx<-.1?this.kickUpDirt(this.x+64-2,t):this.dx>.1&&this.kickUpDirt(this.x+1,t),this.sprite.frameTimer.timeout=t?100:40,this.sprite.frameTimer.enabled=0!==this.direction,this.sprite.frameDirection=Math.sign(this.direction),this.renderer.cameraX=this.x+32-512,this.renderer.cameraY=this.y+32-300}respawn(){this.x=this.spawnX,this.y=this.spawnY,this.ax=0,this.ay=0,this.vx=0,this.vy=0,this.direction=0,this.lastDirection=0}kickUpDirt(t,e){if(!e)return;const i=2*Math.random(),s="1"==e?0:.4,r="1"==e?.8:.27,h="1"==e?.33:0,a=t<this.x+32?-1:1;for(let e=0;e<i;e++)this.particleSystem.emitParticle(t,this.y+64-1,s,r,h,a*Math.random()*.25,.25*-Math.random(),200)}}class m extends u{constructor(t,e,i){super(t),this.gib=e,this.particleSystem=i,this.hitboxX=8,this.hitboxY=4,this.hitboxW=56,this.hitboxH=20,this.falling=!1,this.xOffset=0,this.yOffset=0,this.timer=new n(200,()=>{this.falling=!0}),this.timer.enabled=!1,this.fell=!1}init(t){super.init(t),this.baseX=this.x,this.baseY=this.y}update(){if(!this.fell){if(this.timer.update(),this.gib.left-15>this.right||this.gib.right+15<this.left||this.gib.bottom<this.top||this.falling||(this.timer.enabled=!0),this.timer.enabled){const t=8*Math.random()-4,e=8*Math.random()-4;this.x=this.baseX+t,this.y=this.baseY+e}if(this.falling)if(this.tileAt(0,1)){this.ay=0,this.dy=0,this.falling=!1,this.fell=!0;for(let t=0;t<50;t++)this.particleSystem.emitParticle(this.left+this.hitboxW/2,this.top+this.hitboxH/2,.86,.53,.33,.5*(Math.random()-.5),.25*-Math.random(),700)}else this.ay=.002,this.gib.left>this.right||this.gib.right<this.left||this.gib.top>this.bottom||this.gib.bottom<this.top||this.gib.respawn()}super.update()}}class x extends u{constructor(t,e,i){super(t),this.gib=e,this.particleSystem=i,this.hitboxX=12,this.hitboxY=24,this.hitboxW=40,this.hitboxH=40}update(){if(!(this.gib.left>this.right||this.gib.right<this.left||this.gib.top>this.bottom||this.gib.bottom<this.top)){this.collected(),this.sprite.active=!1;const t=50;for(let e=0;e<t;e++){const i=2*Math.PI/t*e;this.particleSystem.emitParticle(this.left+this.hitboxW/2,this.top+this.hitboxH/2,.67,1,.93,.2*Math.cos(i)+.05*(Math.random()-.5),.2*Math.sin(i)+.05*(Math.random()-.5),1e3)}}super.update()}}class f extends x{collected(){this.gib.abilities.propulsion=!0}}class b extends x{collected(){this.gib.abilities.elevation=!0}}class v{constructor(t,e,i,s){const r=new g(t,this,i,s);this.tiles=[];const h=p.split("\n");for(let t=0;t<h.length;t++){this.tiles.push([]);for(let i=0;i<h[t].length;i++){const a=h[t][i];let n=null,o=0;switch(a){case"1":n=0;break;case"2":n=1;break;case"R":e.spawnSprite(64*i,64*t,.8,6,0,new m(this,r,s));break;case"D":e.spawnSprite(64*i,64*t,.8,0,1);break;case"G":e.spawnSprite(64*i,64*t,.7,2,0,r,[[2,0],[3,0],[4,0],[5,0]]);break;case"P":e.spawnSprite(64*i,64*t,.8,2,1,new f(this,r,s));break;case"E":e.spawnSprite(64*i,64*t,.8,3,1,new b(this,r,s))}null!==n?(e.spawnSprite(64*i,64*t,.1,n,o),this.tiles[t].push(a)):this.tiles[t].push(null)}}}tileAt(t,e){const i=this.tiles[Math.floor(e/64)];return i?i[Math.floor(t/64)]:null}prevTileOffset(t){return 64*(Math.floor(t/64)+1)-t}nextTileOffset(t){return t-64*Math.floor(t/64)}}const y="ArrowUp",A="ArrowDown",T="ArrowLeft",E="ArrowRight",R="KeyW",w="KeyS",D="KeyA",_="KeyD",P="KeyX",S="KeyZ",F="KeyK",k="KeyJ",U="Space";class B{constructor(){this.keysPressed=0,this.lastPressed=0,this.keysJustPressed=0,this.keysJustReleased=0,addEventListener("keydown",t=>{switch(t.code){case y:case R:this.keysPressed|=1,t.preventDefault();break;case A:case w:this.keysPressed|=2,t.preventDefault();break;case T:case D:this.keysPressed|=4,t.preventDefault();break;case E:case _:this.keysPressed|=8,t.preventDefault();break;case P:case F:case U:this.keysPressed|=32,t.preventDefault();break;case S:case k:this.keysPressed|=64,t.preventDefault()}}),addEventListener("keyup",t=>{switch(t.code){case y:case R:this.keysPressed&=-2,t.preventDefault();break;case A:case w:this.keysPressed&=-3,t.preventDefault();break;case T:case D:this.keysPressed&=-5,t.preventDefault();break;case E:case _:this.keysPressed&=-9,t.preventDefault();break;case P:case F:case U:this.keysPressed&=-33,t.preventDefault();break;case S:case k:this.keysPressed&=-65,t.preventDefault()}})}update(){this.keysJustPressed=this.keysPressed&~this.lastPressed,this.keysJustReleased=~this.keysPressed&this.lastPressed,this.lastPressed=this.keysPressed}pressed(t){return(this.keysPressed&t)===t}justPressed(t){return(this.keysJustPressed&t)===t}justReleased(t){return(this.keysJustReleased&t)===t}}const M=128,C=36;class V{constructor(t){this.renderer=t,this.vertexBuffer=t.gl.createBuffer(),t.gl.bindBuffer(t.gl.ARRAY_BUFFER,this.vertexBuffer),t.gl.bufferData(t.gl.ARRAY_BUFFER,M*C,t.gl.STATIC_DRAW),this.particleVertex=new Float32Array(C/4),this.nextIndex=0,this.time=0}emitParticle(t,e,i,s,r,h,a,n){this.particleVertex[0]=t,this.particleVertex[1]=e,this.particleVertex[2]=i,this.particleVertex[3]=s,this.particleVertex[4]=r,this.particleVertex[5]=h,this.particleVertex[6]=a,this.particleVertex[7]=this.time,this.particleVertex[8]=n,this.renderer.gl.bindBuffer(this.renderer.gl.ARRAY_BUFFER,this.vertexBuffer),this.renderer.gl.bufferSubData(this.renderer.gl.ARRAY_BUFFER,this.nextIndex*C,this.particleVertex),this.nextIndex=(this.nextIndex+1)%M}update(){this.time+=1e3/60}draw(){this.renderer.particleShader.time=this.time,this.renderer.draw(this.renderer.particleShader,null,this.vertexBuffer,null,M,!0)}}const L=new class{constructor(){this.renderer=new a(this),this.input=new B,this.spriteSheet=new d(this.renderer),this.particleSystem=new V(this.renderer),this.map=new v(this.renderer,this.spriteSheet,this.input,this.particleSystem),this.lastTimestamp=0,this.timeAccumulator=0,this.started=!1}update(t){const e=t-this.lastTimestamp;for(this.lastTimestamp=t,this.timeAccumulator+=e;this.timeAccumulator>=1e3/60;)this.started&&(this.input.update(),this.spriteSheet.update(),this.particleSystem.update(),this.renderer.update()),this.timeAccumulator-=1e3/60}render(){this.renderer.clear(),this.spriteSheet.draw(),this.particleSystem.draw()}},O=t=>{requestAnimationFrame(O),L.update(t),L.render()};requestAnimationFrame(O)}();
