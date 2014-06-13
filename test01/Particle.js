/*
Copyright 2014 JWACK APPS
All rights reserved
jwackapps.com
Created by Andrew B. Kiger
ajkiger@gmail.com
*/


function Particle(){
    
    this.STARPOINTS = null;
    this.position = null;
    this.velocity = null;
    this.endLocation = null;
    this.minU = null;
    this.maxU = null;
    this.minV = null;
    this.maxV = null;
    this.currentParticleAtlas = null;
    this.life = null;
    this.size = null;
    this.grow = null;
    this.decay = null;
    this.pType = null;
    this.shrinkP = null;
    this.killP = null;
};

Particle.prototype.STARPOINTS = null;
Particle.prototype.position = null;
Particle.prototype.velocity = null;
Particle.prototype.endLocation = null;
Particle.prototype.minU = null;
Particle.prototype.maxU = null;
Particle.prototype.minV = null;
Particle.prototype.maxV = null;
Particle.prototype.currentParticleAtlas = null;
Particle.prototype.life = null;
Particle.prototype.size = null;
Particle.prototype.grow = null;
Particle.prototype.decay = null;
Particle.prototype.pType = null;
Particle.prototype.shrinkP = null;
Particle.prototype.killP = null;



Particle.prototype.update = function(){

    
    var OldPosition = new BBPointMake(0, 0, 0);
    
    OldPosition.x = this.position.x;
    OldPosition.y = this.position.y;
    OldPosition.z = this.position.z;
    
    //var OldPosition = this.position;
    
    this.position.x =  OldPosition.x + this.velocity.x;
    this.position.y =  OldPosition.y + this.velocity.y;
    this.position.z =  OldPosition.z + this.velocity.z;



    //Update Particle Atlas
    if (this.pType === 0 || this.pType === 1 || this.pType === 4) //pType == 0 || 
    {
        switch (this.currentParticleAtlas)
        {
            case 0:
                this.currentParticleAtlas = this.currentParticleAtlas + 1;
                this.minU = 0.0;
                this.maxU = 0.25;
                this.minV = 0.0;
                this.maxV = 0.25;
                break;
            case 2:
                this.currentParticleAtlas = this.currentParticleAtlas + 1;
                this.minU = 0.25;
                this.maxU = 0.5;
                this.minV = 0.0;
                this.maxV = 0.25;
                break;
            case 4:
                this.currentParticleAtlas = this.currentParticleAtlas + 1;
                this.minU = 0.5;
                this.maxU = 0.75;
                this.minV = 0.0;
                this.maxV = 0.25;
                break;
            case 6:
                this.currentParticleAtlas = this.currentParticleAtlas + 1;
                this.minU = 0.75;
                this.maxU = 1.0;
                this.minV = 0.0;
                this.maxV = 0.25;
                break;
            case 8:
                this.currentParticleAtlas = this.currentParticleAtlas + 1;
                this.minU = 0.0;
                this.maxU = 0.25;
                this.minV = 0.25;
                this.maxV = 0.5;
                break;

            case 10:
                this.currentParticleAtlas = this.currentParticleAtlas + 1;
                this.minU = 0.25;
                this.maxU = 0.5;
                this.minV = 0.25;
                this.maxV = 0.5;
                break;

            case 12:
                this.currentParticleAtlas = this.currentParticleAtlas + 1;
                this.minU = 0.75;
                this.maxU = 1.0;
                this.minV = 0.25;
                this.maxV = 0.5;
                break;

            case 14:
                this.currentParticleAtlas = this.currentParticleAtlas + 1;
                this.minU = 0.0;
                this.maxU = 0.25;
                this.minV = 0.5;
                this.maxV = 0.75;
                break;
            case 16:
                this.currentParticleAtlas = this.currentParticleAtlas + 1;
                this.minU = 0.25;
                this.maxU = 0.5;
                this.minV = 0.5;
                this.maxV = 0.75;
                break;
            case 18:
                this.currentParticleAtlas = this.currentParticleAtlas + 1;
                this.minU = 0.5;
                this.maxU = 0.75;
                this.minV = 0.5;
                this.maxV = 0.75;
                break;
            case 20:
                this.currentParticleAtlas = -1;
                this.minU = 0.75;
                this.maxU = 1.0;
                this.minV = 0.5;
                this.maxV = 0.75;
                break;
            default:
                this.currentParticleAtlas = this.currentParticleAtlas + 1;
                break;
        }
    }
    else
    {
        this.minU = 1.0;
        this.minV = 1.0;
        this.maxU = 0.0;
        this.maxV = 0.0;
    }


    switch (this.pType)
    {
        case 0: //Score Stars
            if (OldPosition.x - this.endLocation.x > this.position.x - this.endLocation.x)
            {
                this.velocity.x = -this.velocity.x;
            }
            if (OldPosition.y - this.endLocation.y > this.position.y - this.endLocation.y)
            {
                this.velocity.y = -this.velocity.y;
            }


            if (OldPosition.z - this.endLocation.z > this.position.z - this.endLocation.z)
            {
                this.velocity.z = -this.velocity.z;
            }

            if (this.position.x < this.endLocation.x)
            {
                containerScale = true;
                this.velocity.x = this.velocity.x + BBRandomFloat(new BBRangeMake(-0.5 * tempScale, 2 * tempScale));
                this.velocity.x = ((gl.viewportWidth * 5 - this.position.x) / (gl.viewportWidth * 5)) * this.velocity.x * 0.98;
                
            }

            if (this.position.y < this.endLocation.y)
            {
                this.velocity.y = this.velocity.y + BBRandomFloat(new BBRangeMake(-0.5 * tempScale, 2 * tempScale));
                this.velocity.y = ((gl.viewportHeight * 5 - this.position.y) / (gl.viewportHeight * 5)) * this.velocity.y * 0.98;
                
            }


            if (this.position.x > gl.viewportWidth/2 || this.position.y > gl.viewportHeight/2 || this.position.x < gl.viewportWidth/-2 || this.position.y < gl.viewportHeight/-2)
            {
                this.life = -1;
                this.size = 0.0;
                this.scorePoints();
                
            }

            break;

        case 4: //Hint Stars
            if (OldPosition.x - this.endLocation.x > this.position.x - this.endLocation.x)
            {
                this.velocity.x = -this.velocity.x;
            }
            if (OldPosition.y - this.endLocation.y > this.position.y - this.endLocation.y)
            {
                this.velocity.y = -this.velocity.y;
            }


            if (OldPosition.z - this.endLocation.z > this.position.z - this.endLocation.z)
            {
                this.velocity.z = -this.velocity.z;
            }

            if (this.position.x < this.endLocation.x)
            {
                containerScale = true;
                this.velocity.x = this.velocity.x + BBRandomFloat(new BBRangeMake(-0.5 * tempScale, 2 * tempScale));
                this.velocity.x = ((gl.viewportWidth * 5 - this.position.x) / (gl.viewportWidth * 5)) * this.velocity.x * 0.98;
            }

            if (this.position.y < this.endLocation.y)
            {
                this.velocity.y = this.velocity.y + BBRandomFloat(new BBRangeMake(-0.5 * tempScale, 2 * tempScale));
                this.velocity.y = ((gl.viewportHeight * 5 - this.position.y) / (gl.viewportHeight * 5)) * this.velocity.y * 0.98;
            }


            if (this.position.x > gl.viewportWidth/2 || this.position.y > gl.viewportHeight/2 || this.position.x < gl.viewportWidth/-2 || this.position.y < gl.viewportHeight/-2)
            {
                this.life = -1;
                this.size = 0.0;
                this.minusPoints();

            }

            break;

        default:
            break;
    }

};



Particle.prototype.scorePoints = function(){
    
    updateGameScore(this.STARPOINTS);
    
};



Particle.prototype.minusPoints = function(){
    
    updateGameScore(-(this.STARPOINTS));
    
};



 