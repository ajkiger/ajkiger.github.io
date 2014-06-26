/*
Copyright 2014 JWACK APPS
All rights reserved
jwackapps.com
Created by Andrew B. Kiger
ajkiger@gmail.com
*/





function BBPointMake(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
};
BBPointMake.prototype.x = null;
BBPointMake.prototype.y = null;
BBPointMake.prototype.z = null;


function BBRangeMake(start, length){
    this.start = start;
    this.length = length;
};
BBRangeMake.prototype.start = null;
BBRangeMake.prototype.length = null;


function BBRandomFloat(range){
    var randPercent = (Math.floor(Math.random() * 1001)) / 1000.0;
    var offset = randPercent * range.length;
    return offset + range.start;
};


function EmitterPoint(emitPoint, index, originalIndex){
    this.emitPoint = emitPoint;
    this.index = index;
    this.originalIndex = originalIndex;
};
EmitterPoint.prototype.emitPoint = null;
EmitterPoint.prototype.index = null;
EmitterPoint.prototype.originalIndex = null;




function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
};
Point.prototype.x = null;
Point.prototype.y = null;
Point.prototype.add = function(v){
    return new Point(this.x + v.x, this.y + v.y);
};
Point.prototype.clone = function(){
    return new Point(this.x, this.y);
};
Point.prototype.degreesTo = function(v){
    var dx = this.x - v.x;
    var dy = this.y - v.y;
    var angle = Math.atan2(dy, dx); // radians
    return angle * (180 / Math.PI); // degrees
};
Point.prototype.distance = function(v){
    var x = this.x - v.x;
    var y = this.y - v.y;
    return Math.sqrt(x * x + y * y);
};
Point.prototype.equals = function(toCompare){
    return this.x === toCompare.x && this.y === toCompare.y;
};
Point.prototype.interpolate = function(v, f){
    return new Point((this.x + v.x) * f, (this.y + v.y) * f);
};
Point.prototype.length = function(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
};
Point.prototype.normalize = function(thickness){
    var l = this.length();
    this.x = this.x / l * thickness;
    this.y = this.y / l * thickness;
};
Point.prototype.orbit = function(origin, arcWidth, arcHeight, degrees){
    var radians = degrees * (Math.PI / 180);
    this.x = origin.x + arcWidth * Math.cos(radians);
    this.y = origin.y + arcHeight * Math.sin(radians);
};
Point.prototype.offset = function(dx, dy){
    this.x += dx;
    this.y += dy;
};
Point.prototype.subtract = function(v){
    return new Point(this.x - v.x, this.y - v.y);
};
Point.prototype.toString = function(){
    return "(x=" + this.x + ", y=" + this.y + ")";
};
 
Point.interpolate = function(pt1, pt2, f){
    return new Point((pt1.x + pt2.x) * f, (pt1.y + pt2.y) * f);
};
Point.polar = function(len, angle){
    return new Point(len * Math.cos(angle), len * Math.sin(angle));
};
Point.distance = function(pt1, pt2){
    var x = pt1.x - pt2.x;
    var y = pt1.y - pt2.y;
    return Math.sqrt(x * x + y * y);
};




/**
 * A class to handle the height, width, and x y cordinates of a rectangle.
 * @version 1.1
 * @param {String} height Rectangle height
 * @param {String} width Rectangle width
 * @param {String} x Rectangle x coordinate
 * @param {String} y Rectangle y coordinate
 */
//Rectangle = function (height, width, x, y) {
function Rectangle(x, y, width, height) {
    if (isNaN(height) || isNaN(width) || isNaN(x) || isNaN(y)  || typeof height !== 'number' || typeof width !== 'number' || typeof x !== 'number' || typeof y !== 'number') {
            return false;
    }
    else {
            this.height = height;
            this.width = width;
            this.x = x;
            this.y = y;
    }
};
/**
 * Prototype of Rectangle
 */
Rectangle.prototype = {
    /**
     * Get the height of the rectangle
     * @returns The height of the rectangle
     */
    getHeight: function () {
            return this.height;
    },
    /**
     * Get the width of the rectangle
     * @returns The width of the rectangle.
     */
    getWidth: function () {
            return this.width;
    },
    /**
     * Get the x coordinant of the rectangle
     * @returns The x coordinant of the rectangle
     */
    getX: function () {
            return this.x;
    },
    /**
     * Get the y coordinant of the rectangle
     * @returns The y coordinant of the rectangle
     */
    getY: function () {
            return this.y;
    },
    /**
     * Get the hight and width of the rectangle
     * @returns Object literal containing the height and width of the rectangle
     */
    getSize: function () {
            return {
                    height: this.height,
                    width: this.width
            };
    },
    /**
     * Get the X Y coordinants of the rectangle
     * @returns Object literal containing the X and Y coordinants of the rectangle
     */
    getLocation: function () {
            return {
                    x: this.x,
                    y: this.y
            };
    },
    /**
     * Set the height of the rectangle
     * @param {Number} height Number value to set as the height of the rectangle
     * @returns True when the height is set false when an error is encountered
     */
    setHeight: function (height) {
            if (!isNaN(height) && typeof height === 'number' && height >= 0 && height !== Infinity) {
                    this.height = height;
                    return true;
            }
            else {
                    return false;
            }
    },
    /**
     * Set the width of the rectangle
     * @param {Number} width Number value to set as the width of the rectangle
     * @returns True when the width is set false when an error is encountered
     */
    setWidth: function (width) {
            if (!isNaN(width) && typeof width === 'number' && width >= 0 && width !== Infinity) {
                    this.width = width;
                    return true;
            }
            else {
                    return false;
            }
    },
    /**
     * Set the x cooridnant of the rectangle
     * @param {Number} x Number value to set as the x cooridnant of the rectangle
     * @returns True when the x coordinant is set false when an error is encountered
     */
    setX: function (x) {
            if (!isNaN(x) && typeof x === 'number' && x >= 0 && x !== Infinity) {
                    this.x = x;
                    return true;
            }
            else {
                    return false;
            }
    },
    /**
     * Set the y cooridnant of the rectangle
     * @param {Number} y Number value to set as the y cooridnant of the rectangle
     * @returns True when the y coordinant is set false when an error is encountered
     */
    setY: function (y) {
            if (!isNaN(y) && typeof y === 'number' && y >= 0 && y !== Infinity) {
                    this.y = y;
                    return true;
            }
            else {
                    return false;
            }
    },
    /**
     * Set the height and width of the rectangle
     * @param {Number} height Height to set for the rectangle
     * @param {Number} width Width to set for the rectangle
     * @returns True if the size has been set for the rectangle and false if an error condition was met
     */
    setSize: function (height, width) {
            if (!isNaN(width) && typeof width === 'number' && width >= 0 && width !== Infinity && !isNaN(height) && typeof height === 'number' && height >= 0 && height !== Infinity) {
                    this.width = width;
                    this.height = height;
                    return true;
            }
            else {
                    return false;
            }
    },
    /**
     * Set the X and Y coordinants of the rectangle
     * @param {Number} x X coordinant to set for the rectangle
     * @param {Number} y Y coordinant to set for the rectangle
     * @returns True if the location has been set for the rectangle and false if an error condition was met
     */
    setLocation: function (x, y) {
            if (!isNaN(x) && typeof x === 'number' && x >= 0 && x !== Infinity && !isNaN(y) && typeof y === 'number'  && y >= 0 && y !== Infinity) {
                    this.y = y;
                    this.x = x;
                    return true;
            }
            else {
                    return false;
            }
    },
    /**
     * Get the center point of the rectangle
     * @returns Object literal with x & y properties containing the coordinants of the center point of the rectangle
     */
    getCenter: function () {
            return {
                    x: this.x + (this.width / 2),
                    y: this.y + (this.height / 2)
            };
    },
    /**
     * Determine if a given set of coordinants fall withing the rectangle
     * @param {Number} x X coordinant
     * @param {Object} x Object literal with x and y
     * @param {Number} y Y coordinant
     * @returns True if coordinants fall within rectangle and false if they fall outside of the rectangle
     */
    contains: function (x, y) {
            if (x.x && x.y) { /* Accept JSON */
                    y = x.y;
                    x = x.x;
            }
            if (x <= this.x || y <= this.y || y >= this.y + this.height || x >= this.x + this.width) {
                    return false;
            }
            else {
                    return true;
            }
    },
    /**
     * Determine if a given X coordinant falls within the rectangle
     * @param {Number} x X coordinant
     * @returns True if coordinants fall within rectangle and false if they fall outside of the rectangle
     */
    containsX: function (x) {
            if (x < this.x || x > this.x + this.width) {
                    return false;
            }
            else {
                    return true;
            }
    },
    /**
     * Determine if a given Y coordinant falls within the rectangle
     * @param {Number} y Y coordinant
     * @returns True if coordinants fall within rectangle and false if they fall outside of the rectangle
     */
    containsY: function (y) {
            if (y < this.y || y > this.y + this.height) {
                    return false;
            }
            else {
                    return true;
            }
    },
    
    isEmpty: function () {
            if (this.x === 0.0 && this.y === 0.0 && this.width === 0.0 && this.height === 0.0) {
                    return true;
            }
            else {
                    return false;
            }
    },
    /**
     * Returns a string representing the rectangle
     * @returns {String} representing the rectangle
     */
    toString: function () {
            return "{height: " + this.height + ", width: " + this.width + ", x: " + this.x + ", y: " + this.y + "}";
    }
};