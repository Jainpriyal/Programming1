/* classes */ 

// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                {
                //console.log("1");
                throw "color component not a number";
                }
            else if ((r<0) || (g<0) || (b<0) || (a<0))
            {
                //console.log("2"); 
                throw "color component less than 0";
            }
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
            {
                //console.log("3");
                throw "color component bigger than 255";
            }
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class

// Vector class
//taken from exercise4
class Vector { 
    constructor(x,y,z) {
        this.set(x,y,z);
    } // end constructor
    
    // sets the components of a vector
    set(x,y,z) {
        try {
            if ((typeof(x) !== "number") || (typeof(y) !== "number") || (typeof(z) !== "number"))
                throw "vector component not a number";
            else
                this.x = x; this.y = y; this.z = z; 
        } // end try
        
        catch(e) {
            console.log(e);
        }
    } // end vector set
    
    // copy the passed vector into this one
    copy(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.copy: non-vector parameter";
            else
                this.x = v.x; this.y = v.y; this.z = v.z;
        } // end try
        
        catch(e) {
            console.log(e);
        }
    }
    
    toConsole(prefix="") {
        console.log(prefix+"["+this.x+","+this.y+","+this.z+"]");
    } // end to console
    
    // static dot method
    static dot(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.dot: non-vector parameter";
            else
                return(v1.x*v2.x + v1.y*v2.y + v1.z*v2.z);
        } // end try
        
        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end dot static method
    
    // static cross method
    static cross(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.cross: non-vector parameter";
            else {
                var crossX = v1.y*v2.z - v1.z*v2.y;
                var crossY = v1.z*v2.x - v1.x*v2.z;
                var crossZ = v1.x*v2.y - v1.y*v2.x;
                return(new Vector(crossX,crossY,crossZ));
            } // endif vector params
        } // end try
        
        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end dot static method
    
    // static add method
    static add(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.add: non-vector parameter";
            else
                return(new Vector(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end add static method

    // static subtract method, v1-v2
    static subtract(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.subtract: non-vector parameter";
            else {
                var v = new Vector(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z);
                return(v);
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end subtract static method

    // static scale method
    static scale(c,v) {
        try {
            if (!(typeof(c) === "number") || !(v instanceof Vector))
                throw "Vector.scale: malformed parameter";
            else
                return(new Vector(c*v.x,c*v.y,c*v.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    
    // static normalize method
    static normalize(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.normalize: parameter not a vector";
            else {
                var lenDenom = 1/Math.sqrt(Vector.dot(v,v));
                return(Vector.scale(lenDenom,v));
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    
} // end Vector class


/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height)){
            //console.log("x:" + x + " y: " + y);
            throw "drawpixel location outside of image";
        }
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
    
// draw random pixels
function drawRandPixels(context) {
    var c = new Color(0,0,0,0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.01;
    var numPixels = (w*h)*PIXEL_DENSITY; 
    
    // Loop over 1% of the pixels in the image
    for (var x=0; x<numPixels; x++) {
        c.change(Math.random()*255,Math.random()*255,
            Math.random()*255,255); // rand color
        drawPixel(imagedata,
            Math.floor(Math.random()*w),
            Math.floor(Math.random()*h),
                c);
    } // end for x
    context.putImageData(imagedata, 0, 0);
} // end draw random pixels

// get the input ellipsoids from the standard class URL
function getInputEllipsoids() {
    const INPUT_ELLIPSOIDS_URL = 
        "https://ncsucgclass.github.io/prog1/ellipsoids.json";
        
    // load the ellipsoids file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_ELLIPSOIDS_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input ellipses file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input ellipsoids

// put random points in the ellipsoids from the class github
function drawRandPixelsInInputEllipsoids(context) {
    var inputEllipsoids = getInputEllipsoids();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.05;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputEllipsoids != String.null) { 
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var ellipsoidXRadius = 0; // init ellipsoid x radius
        var ellipsoidYRadius = 0; // init ellipsoid y radius
        var numEllipsoidPixels = 0; // init num pixels in ellipsoid
        var c = new Color(0,0,0,0); // init the ellipsoid color
        var n = inputEllipsoids.length; // the number of input ellipsoids
        //console.log("number of ellipses: " + n);

        // Loop over the ellipsoids, draw rand pixels in each
        for (var e=0; e<n; e++) {
            cx = w*inputEllipsoids[e].x; // ellipsoid center x
            cy = h*inputEllipsoids[e].y; // ellipsoid center y
            ellipsoidXRadius = Math.round(w*inputEllipsoids[e].a); // x radius
            ellipsoidYRadius = Math.round(h*inputEllipsoids[e].b); // y radius
            numEllipsoidPixels = inputEllipsoids[e].a*inputEllipsoids[e].b*Math.PI; // projected ellipsoid area
            numEllipsoidPixels *= PIXEL_DENSITY * w * h; // percentage of ellipsoid area to render to pixels
            numEllipsoidPixels = Math.round(numEllipsoidPixels);
            console.log("ellipsoid x radius: "+ellipsoidXRadius);
            console.log("ellipsoid y radius: "+ellipsoidYRadius);
            console.log("num ellipsoid pixels: "+numEllipsoidPixels);
            c.change(
                inputEllipsoids[e].diffuse[0]*255,
                inputEllipsoids[e].diffuse[1]*255,
                inputEllipsoids[e].diffuse[2]*255,
                255); // ellipsoid diffuse color
            for (var p=0; p<numEllipsoidPixels; p++) {
                do {
                    x = Math.random()*2 - 1; // in unit square 
                    y = Math.random()*2 - 1; // in unit square
                } while (Math.sqrt(x*x + y*y) > 1) // a circle is also an ellipse
                drawPixel(imagedata,
                    cx+Math.round(x*ellipsoidXRadius),
                    cy+Math.round(y*ellipsoidYRadius),c);
                //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
                //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            } // end for pixels in ellipsoid
        } // end for ellipsoids
        context.putImageData(imagedata, 0, 0);
    } // end if ellipsoids found
} // end draw rand pixels in input ellipsoids

// draw 2d projections read from the JSON file at class github
function drawInputEllipsoidsUsingArcs(context) {
    var inputEllipsoids = getInputEllipsoids();
    
    
    if (inputEllipsoids != String.null) { 
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var w = context.canvas.width;
        var h = context.canvas.height;
        var n = inputEllipsoids.length; 
        //console.log("number of ellipsoids: " + n);

        // Loop over the ellipsoids, draw each in 2d
        for (var e=0; e<n; e++) {
            context.fillStyle = 
                "rgb(" + Math.floor(inputEllipsoids[e].diffuse[0]*255)
                +","+ Math.floor(inputEllipsoids[e].diffuse[1]*255)
                +","+ Math.floor(inputEllipsoids[e].diffuse[2]*255) +")"; // diffuse color
            context.save(); // remember previous (non-) scale
            context.translate(w*inputEllipsoids[e].x,h*inputEllipsoids[e].y); // translate ellipsoid to ctr
            context.scale(1, inputEllipsoids[e].b/inputEllipsoids[e].a); // scale by ellipsoid ratio 
            context.beginPath();
            context.arc(0,0,Math.round(w*inputEllipsoids[e].a),0,2*Math.PI);
            context.restore(); // undo scale before fill so stroke width unscaled
            context.fill();
            //console.log(context.fillStyle);
            //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
            //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            //console.log("a: "+Math.round(w*inputEllipsoids[e].a));
            //console.log("b: "+Math.round(h*inputEllipsoids[e].b));
        } // end for ellipsoids
    } // end if ellipsoids found
} // end draw input ellipsoids

function getWindowPixel(canvasWidth, canvasHeight)
{
    var windowPixels = [];
    //for (var i = 0; i<= 1; i= i+ (1/canvasWidth))
    //j = j+ (1/canvasHeight)
    for (var i = 0; i< 1; i= i+0.0015)
    {
        for(var j=0; j<1; j= j+0.0015)
        {
            var pixelVal = new Vector(0,0,0);
            pixelVal.x = i;
            pixelVal.y= j;
            pixelVal.z = 0; // z ais will always be 0 
            windowPixels.push(pixelVal);
           // console.log(" pixelVal:" + "x:" + pixelVal.x + " y:" + pixelVal.y
           //     + " z:" + pixelVal.z + "pixelval: " + pixelVal)
           // console.log(" windowPixels: x:" + windowPixels[0].x + " y:" + windowPixels[0].y 
           //     + " z:" + windowPixels[0].z);
        }
    }
   // console.log("windowPixels:" + windowPixels);
    return windowPixels;
}

//function to draw ellipsoid using raycasting
function drawEllipsoidUsingRaycasting(context)
{
    var w = context.canvas.width;
    var h = context.canvas.height;
    var inputEllipsoids = getInputEllipsoids();
    var imagedata = context.createImageData(w,h);
    var backgroundColor = new Color(0,0,0,255) //background is black

    //attributes given in question
    var eye = new Vector(0.5,0.5,-0.5);
    var viewUp = new Vector(0,1,0);
    var lookat = new Vector(0,0,1);
    var windowCenter = new Vector(0.5,0.5,0);
    var lightPosition = new Vector(-1,3,-0.5);
    var lightColor = new Color(255,255,255,255); //white light

    //doubt1111111 might need to change this
    var windowpixel = getWindowPixel(w,h); 

    //step2.a determine D (P-E) vector for all pixel vectors
    // var pixelEyeDiff = [];
    // for(var i =0; i<windowpixel.length; i=i+1)
    // // for(var i =0; i<10; i=i+1)
    // {
    //     var diffVal = Vector.subtract(windowpixel[i], eye);
    //     pixelEyeDiff.push(diffVal);
    // } 

    if (inputEllipsoids != String.null) { 

        //calculate for all pixels where they are intersecting
        for(var i=0; i<windowpixel.length; i++)
        {
            pixelEyeDiff = Vector.subtract(windowpixel[i], eye);
            //check for all ellipsoid, point of intersection and target ellipsoid
            var root1 =0, root2 =0;
            var minroot = 10000000;
            var targetEllipsoid = -1;
            for(var e=0; e<inputEllipsoids.length; e++)
            {
                //calculate t for equation at2 + bt + c =0
                
                //a= D/A.D/A
                var dDivideA = new Vector(pixelEyeDiff.x/inputEllipsoids[e].a,
                    pixelEyeDiff.y/inputEllipsoids[e].b, pixelEyeDiff.z/inputEllipsoids[e].c);
                var a = Vector.dot(dDivideA, dDivideA);

                //b = 2 D/A•(E-C)/A
                var dDivideA_2= Vector.scale(2, dDivideA);
                var eyeMinusC = new Vector(eye.x - inputEllipsoids[e].x, 
                    eye.y - inputEllipsoids[e].y, eye.z - inputEllipsoids[e].z);
                var eyeMinusCdivideA = new Vector(eyeMinusC.x/inputEllipsoids[e].a, 
                    eyeMinusC.y/inputEllipsoids[e].b, eyeMinusC.z/inputEllipsoids[e].c);
                var b = Vector.dot(dDivideA_2, eyeMinusCdivideA);


                //c = (E-C)/A•(E-C)/A - 1
                var c = (Vector.dot(eyeMinusCdivideA, eyeMinusCdivideA) -1);

                var discriminant = Math.pow(b,2) - 4 * a * c;
                if(discriminant>=0)
                {
                    //console.log("greater than 0" + discriminant);
                    //calculate roots
                    var root1 = (-1*b + Math.sqrt(discriminant))/(2*a);
                    var root2 = (-1*b - Math.sqrt(discriminant))/(2*a);

                    //determine the smallest root and also greater than 1
                    if(root1>1 && root2 > 1)
                    {
                        minroot = Math.min(root1, root2);
                        targetEllipsoid = e;
                    }
                    else if(root1>1)
                    {
                        minroot = root1;
                        targetEllipsoid = e;
                    }
                    else if(root2>1)
                    {
                        minroot = root2;
                        targetEllipsoid = e;
                    }
                }
            }

            //Now we have target ellipsoid, root that will give point of intrsection
            //calculate the color to fill in
            if(targetEllipsoid>=0)
            {
                //part1: draw ellipsoid using raycasting
                var pixelColor = new Color(inputEllipsoids[targetEllipsoid].diffuse[0]*255,
                    inputEllipsoids[targetEllipsoid].diffuse[1]*255,
                    inputEllipsoids[targetEllipsoid].diffuse[2]*255, 255);
                //console.log("inputEllipsoids[targetEllipsoid].diffuse[0]*255" + inputEllipsoids[targetEllipsoid].diffuse[1]*255
                //    + "  " + typeof(inputEllipsoids[targetEllipsoid].diffuse[1]*255))
                //console.log("x window:" + windowpixel[i].x + "y window: " + windowpixel[i].y);
                //console.log("x" + (Math.round(windowpixel[i].x * w)) + "y: " + Math.round(windowpixel[i].y * h));
                drawPixel(imagedata, (Math.round(windowpixel[i].x * w)), h-Math.round(windowpixel[i].y * h),pixelColor);
            }
            else{
                //fill background color
                //console.log("black background");
                //console.log("h-(Math.round(windowpixel[i].y * h))   ***r4yiur4ur*" + h-(Math.round(windowpixel[i].y * h)));
                drawPixel(imagedata, (Math.round(windowpixel[i].x * w)), h-Math.round(windowpixel[i].y * h), backgroundColor);
            }

        }
    }
    context.putImageData(imagedata, 0, 0);
    
}

/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
 
    // Create the image
    //drawRandPixels(context);
      // shows how to draw pixels
    
    //drawRandPixelsInInputEllipsoids(context);
      // shows how to draw pixels and read input file
      
   // drawInputEllipsoidsUsingArcs(context);
      // shows how to read input file, but not how to draw pixels

    drawEllipsoidUsingRaycasting(context);
}
