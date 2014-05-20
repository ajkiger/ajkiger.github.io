/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function ParticleSystem(){
    
    this.BB_MAX_PARTICLES = null;
    this.activeParticles = null;
    this.objectsToRemove = null;
    this.particleUpdate = null;
    this.particlePool = null;
    this.uvCoordinates = null;
    this.vertexes = null;
    this.colors = null;
    this.normals = null;
    this.uvCoordinatesuv = null;
    this.uvCoordinatesFB = null;
    this.vertexesFB = null;
    this.colorsFB = null;
    this.normalsFB = null;
    this.uvCoordinatesuvFB = null;
    this.vertexIndex = null;
    this.partText = null;
    this.indexIncrease = null;
    this.frameRateCounter = null;
    this.emit = null;
    this.emitCounter = null;
    this.emissionRangeN = null;
    this.sizeRangeN = null;
    this.growRangeN = null;
    this.xVelocityRangeN = null;
    this.yVelocityRangeN = null;
    this.zVelocityRangeN = null;
    this.lifeRangeN = null;
    this.decayRangeN = null;
    this.emitPosition = null;
    this.lastEmitPoint = null;
    this.textureIndex = null;
    this.pType = null;
    this.killParticles = null;
};

ParticleSystem.prototype.BB_MAX_PARTICLES = null;
ParticleSystem.prototype.activeParticles = null;
ParticleSystem.prototype.objectsToRemove = null;
ParticleSystem.prototype.particleUpdate = null;
ParticleSystem.prototype.particlePool = null;
ParticleSystem.prototype.uvCoordinates = null;
ParticleSystem.prototype.vertexes = null;
ParticleSystem.prototype.colors = null;
ParticleSystem.prototype.normals = null;
ParticleSystem.prototype.uvCoordinatesuv = null;
ParticleSystem.prototype.uvCoordinatesFB = null;
ParticleSystem.prototype.vertexesFB = null;
ParticleSystem.prototype.colorsFB = null;
ParticleSystem.prototype.normalsFB = null;
ParticleSystem.prototype.vertexIndex = null;
ParticleSystem.prototype.partText = null;
ParticleSystem.prototype.indexIncrease = null;
ParticleSystem.prototype.frameRateCounter = null;
ParticleSystem.prototype.emit = null;
ParticleSystem.prototype.emitCounter = null;
ParticleSystem.prototype.emissionRangeN = null;
ParticleSystem.prototype.sizeRangeN = null;
ParticleSystem.prototype.growRangeN = null;
ParticleSystem.prototype.xVelocityRangeN = null;
ParticleSystem.prototype.yVelocityRangeN = null;
ParticleSystem.prototype.zVelocityRangeN = null;
ParticleSystem.prototype.lifeRangeN = null;
ParticleSystem.prototype.decayRangeN = null;
ParticleSystem.prototype.emitPosition = null;
ParticleSystem.prototype.lastEmitPoint = null;
ParticleSystem.prototype.textureIndex = null;
ParticleSystem.prototype.pType = null;
ParticleSystem.prototype.killParticles = null;


ParticleSystem.prototype.init = function(){
    
    this.BB_MAX_PARTICLES = 100;
    this.activeParticles = new Array();
    this.objectsToRemove = new Array();
    this.particleUpdate = new Array();
    this.particlePool = new Array();
    
    this.emissionRangeN = new BBRangeMake(1.0, 2.0);
    this.sizeRangeN = new BBRangeMake(4.0, 8.0);
    this.growRangeN = new BBRangeMake(-0.5, -0.1);
    this.xVelocityRangeN = new BBRangeMake(1.0, 3.0);
    this.yVelocityRangeN = new BBRangeMake(1.0, 3.0);
    this.zVelocityRangeN = new BBRangeMake(1.0, 3.0);
    this.lifeRangeN = new BBRangeMake(0.0, 2.0);
    this.decayRangeN = new BBRangeMake(0.05, 0.2);
    this.emit = false;
    this.emitCounter = -1;
    this.killParticles = false;
    
};


ParticleSystem.prototype.awake = function(){
    
    
    // alloc some space for our particles
    
    this.textureIndex = 0;
    // we are going to pre-alloc a whole bunch of particles so
    // we dont wast time during gameplay allocing them
    
    
    
    for (var count = 0; count < this.BB_MAX_PARTICLES; count++)
    {
            var p = new Particle();
            p.STARPOINTS = 10;
            p.killP = false;
            this.particlePool.push(p);
    }

    
    
    this.vertexes = new Array();
    this.uvCoordinates = new Array();
    
    this.colors = new Array();
    this.normals = new Array();
    this.uvCoordinatesuv = new Array();
    
    for(i = 0; i < (6 * this.BB_MAX_PARTICLES); i++){
        this.colors.push(1);
        this.colors.push(1);
        this.colors.push(1);
        this.colors.push(1);
        
        this.normals.push(0);
        this.normals.push(0);
        this.normals.push(1);
        
        this.uvCoordinatesuv.push(0);
        this.uvCoordinatesuv.push(0);
    }
    
};


ParticleSystem.prototype.setParticleX = function(particleTexture){
    
    this.partText = particleTexture;
    
};


ParticleSystem.prototype.update = function(){
    
    // build arrays
    this.buildVertexArrays();

    // generate new particles and queue them for addition
    this.emitNewParticles();

    //remove old particles
    this.clearDeadQueue();
    
};



ParticleSystem.prototype.buildVertexArrays = function(){
    
    // go through all our individual particles and add their triangles
    // to our big mesh
    this.vertexes.length = 0;
    this.uvCoordinates.length = 0;
    this.vertexIndex = 0;
    
    

    for (var i = 0; i < this.activeParticles.length; i++)
    {
        
        var particle = this.activeParticles[i];
        
        particle.update(); // first, update each particle before we use it's data

        
        // check to see if we have run out of life, or are too small to see
        // and if they are, then queue them for removal
        if ((particle.life < 0) || (particle.size < 0.3))
        {
            
            particle.killP = true;
            this.removeChildParticle(particle);
            continue; // skip to the next particle, no need to add this one
        }
        
        // for each particle, need 2 triangles, so 6 verts
        // first triangle of the quad.
        this.addVertex((particle.position.x - particle.size), 
                       (particle.position.y + particle.size), 
              particle.minU, 
              particle.minV);
        this.addVertex((particle.position.x - particle.size), 
                       (particle.position.y - particle.size), 
              particle.minU, 
              particle.maxV);
        this.addVertex((particle.position.x + particle.size), 
                       (particle.position.y - particle.size), 
              particle.maxU, 
              particle.maxV);		
        

        // second triangle of the quad
        this.addVertex((particle.position.x - particle.size), 
                       (particle.position.y + particle.size), 
              particle.minU, 
              particle.minV);
        this.addVertex((particle.position.x + particle.size), 
                       (particle.position.y + particle.size), 
              particle.maxU, 
              particle.minV);
        this.addVertex((particle.position.x + particle.size), 
                       (particle.position.y - particle.size), 
              particle.maxU, 
              particle.maxV);
        
    }
    
};


ParticleSystem.prototype.addVertex = function(x, y, u, v){
    
    
    
    this.vertexes.push(x);
    this.vertexes.push(y);
    this.vertexes.push(0.0);
    this.uvCoordinates.push(u);
    this.uvCoordinates.push(v);
    
    
    this.vertexIndex++;
    
};




ParticleSystem.prototype.emitNewParticles = function(){
    
    //srandom(time(NULL));
    this.killParticles = false;
    
    if (!this.emit) return;
    if (this.emitCounter > 0)
        this.emitCounter --; // if emitCounter == -1, then emit forever
    if (this.emitCounter === 0)
        this.emit = false; // this will be our last time through the emit method


    var newParticles = BBRandomFloat(this.emissionRangeN); // grab a random number to be emitted
    var index;
    var veloX;
    var veloY;
    var veloZ;
    for (index = 0; index < newParticles; index++)
    {
        if (this.particlePool.length === 0 || this.particleUpdate.length === 0)
        {
                // if we are out of particles, then just get out early
                //return;
                break;
        } 
        // grab a premade particle and set it up with some new random numbers
        //var p = this.particlePool[this.particlePool.length - 1];
        
        var p = this.particlePool.pop();

        p.shrinkP = false;
        p.killP = false;

        var rCurrentParticle = Math.floor(Math.random() * 11); //randum number from 0 to 10
        p.currentParticleAtlas = rCurrentParticle * 2;

        p.pType = this.pType;
        if (this.pType === 0 || this.pType === 4)
        {
            //var tempP; //EmitterPoint
            
            //tempP = this.particleUpdate[this.particleUpdate.length - 1];
            var tempP = this.particleUpdate.pop();
            

            if (this.pType === 0 && tempP.index === -2)
            {
                p.position = this.lastEmitPoint;
            }
            else
            {
                p.position = tempP.emitPoint;

                this.lastEmitPoint = new BBPointMake(tempP.emitPoint.x, tempP.emitPoint.y, tempP.emitPoint.z);
                
            }

            if (this.pType === 0 && tempP.index >= 0)
            {

                highlightLetter(tempP.index, true);
            }
            if (sceneController.solveCube)
            {

                highlightLetter(tempP.originalIndex, true);
            }

            //this.particleUpdate.splice(this.particleUpdate.length - 1, 1);
            //this.particleUpdate.pop();
        }
        else if (this.pType === 1 || this.pType === 2 || this.pType === 3)
        {
            p.position = new BBPointMake(0.0, 0.0, 0.0);// emitPosition;
            
        }

        p.endLocation = new BBPointMake(gl.viewportWidth, gl.viewportHeight, 0.0);

        veloX = BBRandomFloat(this.xVelocityRangeN);
        veloY = BBRandomFloat(this.yVelocityRangeN);
        veloZ = BBRandomFloat(this.zVelocityRangeN);

        p.velocity = new BBPointMake(veloX, veloY, veloZ);

        p.life = BBRandomFloat(this.lifeRangeN);
        p.size = BBRandomFloat(this.sizeRangeN);
        p.grow = BBRandomFloat(this.growRangeN);
        p.decay = BBRandomFloat(this.decayRangeN);

        // add this particle
        this.activeParticles.push(p);
        // remove this particle from the unused array
        //this.particlePool.splice(this.particlePool.length - 1, 1);
        
    }
    
    
};




ParticleSystem.prototype.removeChildParticle = function(particle){
    
    this.objectsToRemove.push(particle);
    
};




ParticleSystem.prototype.clearDeadQueue = function(){
    
    // remove any objects that need removal
    if (!(this.objectsToRemove.length === 0)) {
        
        for(j = 0; j < this.objectsToRemove.length; j++){
            
            for(i = 0; i < this.activeParticles.length; i++){
                var partX = this.activeParticles[i];
                if(partX.killP){
                    this.activeParticles.splice(i, 1);
                    partX.killP = false;
                    this.particlePool.push(partX);
                    break;
                }
            }
            
        }
        
        this.objectsToRemove.length = 0;
        
        //activeParticles.removeAll(objectsToRemove);
        //particlePool.addAll(objectsToRemove);
        //objectsToRemove.removeAll(objectsToRemove);
        
    }
    
};



ParticleSystem.prototype.render = function(){
      
    //document.getElementById('ycoord').innerHTML = "vertex array size: " + this.vertexes.length;
    
    if(this.vertexIndex === 0){
        return;
    }
    
    mvPushMatrix();
    
    mat4.identity(mvMatrix);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, null, null);
    
    this.vertexesFB = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexesFB);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexes), gl.STATIC_DRAW);
    //this.vertexesFB.vertexSize = 3;
    
    this.uvCoordinatesFB = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvCoordinatesFB);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uvCoordinates), gl.STATIC_DRAW);
    //this.uvCoordinatesFB.uvSize = 2;
    
    this.colorsFB = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsFB);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
    //this.colorsFB.vertexSize = 4;
    
    this.normalsFB = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsFB);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
    //this.normalsFB.vertexSize = 3;
    
    this.uvCoordinatesuvFB = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvCoordinatesuvFB);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uvCoordinatesuv), gl.STATIC_DRAW);
    //this.normalsFB.vertexSize = 3;
    
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexesFB);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvCoordinatesFB);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorsFB);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsFB);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvCoordinatesuvFB);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttributeuv, 2, gl.FLOAT, false, 0, 0);
    
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.partText);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    gl.uniform1f(shaderProgram.rAngleUniform, 0);  // Do not rotate letter
    gl.uniform1f(shaderProgram.alphaUniform, 2.0);
    
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, this.vertexIndex);
    
    //gl.bindTexture(gl.TEXTURE_2D, null);
    
    mvPopMatrix();
    
};


