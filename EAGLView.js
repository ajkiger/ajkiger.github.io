/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function initContext(){
    
    
    gl.clearColor(179/255, 179/255, 179/255, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    
    
}


function EAGLViewBeginDraw(){
    
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //mat4.perspective(pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0);
    mat4.ortho(pMatrix, -gl.viewportWidth/2.0, gl.viewportWidth/2.0, -gl.viewportHeight/2.0, gl.viewportHeight/2.0, 0.1, 1000.0);
    mat4.translate(pMatrix, pMatrix, [0.0, 0.0, -500.0]); //-500
    
    
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); //gl.ONE_MINUS_SRC_ALPHA
    gl.enable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    gl.uniform1f(shaderProgram.alphaUniform, 1.0);
    
    
    gl.uniform1i(shaderProgram.useLightingUniform, true);
    gl.uniform3fv(shaderProgram.lightPositionUniform, [0, 0, 800]);
    gl.uniform3fv(shaderProgram.ambientLightColorUniform, [0.2, 0.2, 0.2]);
    gl.uniform3fv(shaderProgram.diffuseLightColorUniform, [1.3, 1.3, 1.3]);
    gl.uniform3fv(shaderProgram.specularLightColorUniform, [1.0, 1.0, 1.0]);
      
    
    
    
    //glEnable(GL_TEXTURE_2D);
    //glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA); //GL11.GL_ONE, GL11.GL_ONE_MINUS_SRC_ALPHA
    //glEnable(GL_BLEND);

    //glEnable(GL_LIGHTING);
    //glEnable(GL_LIGHT0);

    //glEnable(GL_COLOR_MATERIAL);

    //glEnable(GL_CULL_FACE);
    //glCullFace(GL_FRONT);
    //glFrontFace(GL_CCW);


    // set a clean transform
    
    //glLoadIdentity();
    
}



function EAGLViewFinishDraw(){
    
    
    
    
}