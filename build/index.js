!function(){"use strict";var t="uniform mat4 projection;uniform mat4 view;uniform mat4 model;attribute vec2 vertexPosition;attribute vec2 vertexTexCoord;varying vec2 texCoord;void main(){gl_Position=projection*view*model*vec4(vertexPosition,0.0,1.0);texCoord=vertexTexCoord;}",e="precision mediump float;uniform sampler2D tex;varying vec2 texCoord;void main(){gl_FragColor=texture2D(tex,texCoord);}";class i{constructor(i){this.gl=i;const r=i.createShader(i.VERTEX_SHADER);i.shaderSource(r,t),i.compileShader(r);const s=i.createShader(i.FRAGMENT_SHADER);i.shaderSource(s,e),i.compileShader(s),this.program=i.createProgram(),i.attachShader(this.program,r),i.attachShader(this.program,s),i.linkProgram(this.program),this.projection=i.getUniformLocation(this.program,"projection"),this.view=i.getUniformLocation(this.program,"view"),this.model=i.getUniformLocation(this.program,"model"),this.vertexPosition=i.getAttribLocation(this.program,"vertexPosition"),this.vertexTexCoord=i.getAttribLocation(this.program,"vertexTexCoord")}use(t,e){this.gl.useProgram(this.program),this.gl.enableVertexAttribArray(this.vertexPosition),this.gl.enableVertexAttribArray(this.vertexTexCoord),this.gl.vertexAttribPointer(this.vertexPosition,2,this.gl.FLOAT,!1,16,0),this.gl.vertexAttribPointer(this.vertexTexCoord,2,this.gl.FLOAT,!1,16,8),this.gl.uniformMatrix4fv(this.projection,!1,t),this.gl.uniformMatrix4fv(this.view,!1,e)}}class r{constructor(t,e){this.width=t,this.height=e;const r=document.createElement("canvas");r.width=t,r.height=e,document.body.appendChild(r),this.gl=r.getContext("webgl"),this.shader=new i(this.gl),this.projection=new Float32Array([2/(t-1),0,0,0,0,-2/(e-1),0,0,0,0,-1,0,-1,1,0,1]),this.view=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this.texture=this.gl.createTexture(),this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,2,2,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,new Uint8Array([0,0,255,255,255,0,0,255,0,255,0,255,255,0,255,255])),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST)}clear(){this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.shader.use(this.projection,this.view)}draw(t,e,i,r){this.shader.use(this.projection,this.view),this.gl.uniformMatrix4fv(this.shader.model,!1,t),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,i),this.gl.drawElements(this.gl.TRIANGLES,r,this.gl.UNSIGNED_SHORT,0)}}class s{constructor(t,e,i,r,s,h,o){this.renderer=t,this.width=e,this.height=i,this.x=r,this.y=s,this.dx=h,this.dy=o;const a=new Float32Array([0,0,0,0,0,i,0,1,e,0,1,0,e,i,1,1]),n=new Uint16Array([0,1,2,2,1,3]);this.vertexBuffer=t.gl.createBuffer(),t.gl.bindBuffer(t.gl.ARRAY_BUFFER,this.vertexBuffer),t.gl.bufferData(t.gl.ARRAY_BUFFER,a,t.gl.STATIC_DRAW),this.indexBuffer=t.gl.createBuffer(),t.gl.bindBuffer(t.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.gl.bufferData(t.gl.ELEMENT_ARRAY_BUFFER,n,t.gl.STATIC_DRAW),this.model=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,r,s,0,1])}update(t){this.x+=this.dx*t,this.y+=this.dy*t,this.model[12]=this.x,this.model[13]=this.y}draw(){this.renderer.draw(this.model,this.vertexBuffer,this.indexBuffer,6)}}const h=800,o=600;const a=new class{constructor(){this.renderer=new r(h,o),this.sprites=[],this.sprites.push(new s(this.renderer,100,50,150,100,.05,.01)),this.sprites.push(new s(this.renderer,10,10,600,100,-.05,-.01)),this.sprites.push(new s(this.renderer,100,100,10,380,.05,-.01)),this.sprites.push(new s(this.renderer,30,70,450,350,-.05,.01)),this.sprites.push(new s(this.renderer,200,10,100,400,.05,-.01)),this.lastTimestamp=performance.now()}update(t){const e=t-this.lastTimestamp;this.sprites.forEach(t=>t.update(e)),this.lastTimestamp=t}render(){this.renderer.clear(),this.sprites.forEach(t=>t.draw())}},n=t=>{requestAnimationFrame(n),a.update(t),a.render()};requestAnimationFrame(n)}();
