(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Símbolo2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("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ADAAAEABQADABACACQAFAGgFAIIgFAIQgEAFgCADQgDAJAEAFQADAEAKAAIALgDIAKgBQALgBADAGQAEAGgEAJIgIAMIgPAgQgIATgEAOQgFAUALAKQALALAUgIQAOgFAagRQAGgDAHgHIAMgKQADgCAGgBQAEAAACABQADAFAAALQAAADgGAGQgIAQAFAPIAcgEQAYgEgGAaQgCAHAAAQIACAEIAFAGIAWgQQARgOAGABQAFABAKASQAHgEAHgKIAKgQQAFgIAFgBQAEAAAHAIQALAMAMAAQALAAALgMIAHgLIAGgOIADgJIAFgJQABgCADgCIAIAAIADADIADAGQABAUgQAWQgRAXgTAEQgJADgNgDIgTgGQgYAbgJACQgJADgTgPIgQAMQgLAGgJAAQgGAAgGgCgAC+87QgZgYAAgkQgBgkAZgaQAZgaAjAAQAjgBAZAYQAYAZAAAjQABAkgZAbQgZAagkAAIgBAAQghAAgYgYgAD5+6QgZABgUATQgRAUAAAbQAAAaASASQASASAZAAQAbgBASgTQATgUgBgbQAAgagSgSQgSgSgZAAIgBAAgAgx+vIgIgTQgWAJgIgCQgJgDgPgSQgWAHgJgDQgKgEgLgVQgSAJgMAAQgQABgLgNQgKgNADgRQACgHANgYIgJgDQgLgLABgOQAAgOALgMQAKgJAQgBQAPgBAKAJIADAGQACAEgCACQgBACgDACIgHABIgHgCIgHgCQgKgDgHALQgEAHACAEQADAFAHABIAHgBQAFAAADABQAKACAAAEQACAHgGAHQgQAQgHAKQgJAOAKAFQAEACAGAAQAHgBADgCQAGgCAFgFIAKgJIAGgGQAFgEADgBQADgBADABIAHACQACADgBAKIgFAKQgDAGAAAEIAAAHIAEAGQAEACAJgEQAEgBAGgIIAEgFIAFgEQAKgHAFABQAIABgDAOIgCAOIADARIAQgOIAFgIIAEgGQAIgHAIABQABABACAEIADAIIAAANIABANQAFAeATAFQAZAHAQgVQAEgGAMgXIAEgLIAFgKQABgCAEgCQAEgBACABQADAAACADQACAEAAADQABAYgTAZQgTAZgXAFQgIACgHAAQggAAgPgggA5a/dIgRAIQgNAEgJgEQgJgEgDgMQgDgMACgSQAAgCAFgDIAGgEIAFAGIACAFIABAYQAIABAGgEIAJgIQAJgJAFACQAGABAGALIACAGQANAaAQgZIAOgZQAEgIAFgDQAGgFAGACQAFACADAIQAIAaACACQABAEAEACQAFADACgBQADAAADgEQAEgCABgEQADgJADgVQAFgcAWARQANAKAEABQAMAGALgJQAIgHgFgOQgFgNADgEQADgEAOAAQAKAAAGgCQASgHgOgOQgIgGgCgEQgCgDgBgDQgBgEABgCQAGgGAIACQAJACAKALQAJAMAAAJQABAVgXAMIgRAGQAAAfgYAKQgXALgagQIgHAVQgJAYgTACQgVACgNgUIgIgNIgOAWQgJALgMACIgGABQgTAAgOgXgEgfGggNQgSgDgLgbIgDgJQgOAGgDABQgWAGgMgOQgGgHgDgMQgBgNAFgIIAFgFQAEgCADAAQAJAAgCANQgCAHAAACQAAAJAEADQAFADAIgDIAUgLQALgHAGACQAFADACANQACAQACAEQAHASAPgMQAFgEALgNIAOgSQAHgHAIACQAJABAEAJIAKAZIAPgYQAKgMAHAAQACgBAFAFIAHAJQACADADAHQAIANAKAAQAKAAAIgOIAJgWQAEgKADgCQAFgEAHABQACABACAEQACAEgBABIgJAcQgGAPgKAJQgMALgQAAQgSAAgLgPIgJgLQgSAUgLAAQgLAAgQgWIgRAUQgRATgRAAIgGgBgEgThgg5QgbgNgNgXQgMgYADgdIAAgNIAbAAQgDAFgCAJQgGAlAcAWQAgAYApgMQAZgIAPgTQAPgUgBgWQAAgMgDgEIAZAAIAAAPQACAhgWAZQgWAbgkAIQgMADgNAAQgVAAgUgJg");
	this.shape.setTransform(253,229.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Símbolo2, new cjs.Rectangle(9.6,8.8,486.79999999999995,441.5), null);


(lib.paletavioletabtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#993366").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.paletaverdeoscurobtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#003300").s().p("AjjDjIAAnFIHHAAIAAHFg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,-22.7,45.5,45.4);


(lib.paletaverdeclarobtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99CC00").s().p("AjjDjIAAnFIHHAAIAAHFg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,-22.7,45.5,45.4);


(lib.paletaverdebtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#339900").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.paletarosabtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6699").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.paletarojobtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC0000").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.paletanaranjabtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6600").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.paletamarronclarobtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ECB258").s().p("AjjDjIAAnFIHHAAIAAHFg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,-22.7,45.5,45.4);


(lib.paletamarron2btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AE8443").s().p("AjjDjIAAnFIHHAAIAAHFg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,-22.7,45.5,45.4);


(lib.paletagrisbtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.paletafucciabtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0066").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.paletacelesteclarobtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#66FFFF").s().p("AjjDjIAAnFIHHAAIAAHFg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,-22.7,45.5,45.4);


(lib.paletacelestebtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#009999").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.paletabordobtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#660000").s().p("AjjDjIAAnFIHHAAIAAHFg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.7,-22.7,45.5,45.4);


(lib.paletablancobtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.paletaazulbtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000099").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.paletaamarillobtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FEDA22").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.menuBtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("ACAAzQgIgDgFgGQgJgMAAgOQAAgQAMgLQALgKARgBQAUABAJAOQAEAHAAAHQAAAJgEAEQgEAEgFAAIghAAQAAAEAEACQAFADAEAAQAJAAAEgCIACAAIAFgBQAFAAADAGQACADAAADQAAANgeAAQgKAAgIgEgACJADQgFAEAAAFIASAAQAFgBAAgEQAAgDgCgCQgDgCgEAAQgFAAgEADgAhLAxQgJgEgGgIQgGgJAAgMQAAgQAMgLQAMgKAPgBQAPABAMAKQALALAAAQQAAAMgGAJQgGAJgIAEQgJAEgJAAQgKAAgIgFgAhDAFQgEAEAAAHQAAAHAEADQAFADAFABQAEgBAFgDQAEgDAAgIQAAgGgEgEQgEgDgFAAQgFAAgFADgABKAxIgBgDIAAgGIAAgYQAAgMgJAAQgFAAgCADQgBADAAAGIAAAYIAAAGIgCADQgCAEgJAAQgJAAgCgEIgBgDIAAgGIAAgYQAAgMgJAAQgIAAAAAMIAAAZIAAAFIgCADQgCAEgIAAQgIAAgCgEIgBgDIgBgGIAAgvIABgGIABgDQACgEAHAAQAIAAACADQACACAAAFQAHgKAJAAQAPAAAHANIADgFQACgDAFgCQAFgDAFAAQALAAAIAIQAHAJAAATIAAAYIAAAGIgBADQgCAEgJAAQgJAAgCgEgAiAAxIgBgDIAAgGIAAgYQAAgGgDgDQgEgDgFAAQgFAAgDADQgEADgBADIAAAcIAAAFIgBADQgCAEgJAAQgJAAgCgEIgBgDIAAgGIAAhSIAAgFIABgDQACgEAJAAQAJAAACAEIABADIAAAFIAAAfQAHgJAKAAQAOAAAJALQAJAKAAAPIAAAZIAAAFIgBADQgCAEgJAAQgJAAgCgEg");
	this.shape.setTransform(5.275,0.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AAKA2IAAgeIgTAAIAAAeIggAAIAAgrIgJAAIAyhAIAzBAIgJAAIAAArg");
	this.shape_1.setTransform(-19.725,0.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFAE4").s().p("AjeBgQgrAAAAg4IAAhPQAAg4ArAAIG8AAQAsAAAAA4IAABPQAAA4gsAAg");
	this.shape_2.setTransform(0,0.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#999900").s().p("ACAAzQgIgDgFgGQgJgMAAgOQAAgQAMgLQALgKARgBQAUABAJAOQAEAHAAAHQAAAJgEAEQgEAEgFAAIghAAQAAAEAEACQAFADAEAAQAJAAAEgCIACAAIAFgBQAFAAADAGQACADAAADQAAANgeAAQgKAAgIgEgACJADQgFAEAAAFIASAAQAFgBAAgEQAAgDgCgCQgDgCgEAAQgFAAgEADgAhLAxQgJgEgGgIQgGgJAAgMQAAgQAMgLQAMgKAPgBQAPABAMAKQALALAAAQQAAAMgGAJQgGAJgIAEQgJAEgJAAQgKAAgIgFgAhDAFQgEAEAAAHQAAAHAEADQAFADAFABQAEgBAFgDQAEgDAAgIQAAgGgEgEQgEgDgFAAQgFAAgFADgABKAxIgBgDIAAgGIAAgYQAAgMgJAAQgFAAgCADQgBADAAAGIAAAYIAAAGIgCADQgCAEgJAAQgJAAgCgEIgBgDIAAgGIAAgYQAAgMgJAAQgIAAAAAMIAAAZIAAAFIgCADQgCAEgIAAQgIAAgCgEIgBgDIgBgGIAAgvIABgGIABgDQACgEAHAAQAIAAACADQACACAAAFQAHgKAJAAQAPAAAHANIADgFQACgDAFgCQAFgDAFAAQALAAAIAIQAHAJAAATIAAAYIAAAGIgBADQgCAEgJAAQgJAAgCgEgAiAAxIgBgDIAAgGIAAgYQAAgGgDgDQgEgDgFAAQgFAAgDADQgEADgBADIAAAcIAAAFIgBADQgCAEgJAAQgJAAgCgEIgBgDIAAgGIAAhSIAAgFIABgDQACgEAJAAQAJAAACAEIABADIAAAFIAAAfQAHgJAKAAQAOAAAJALQAJAKAAAPIAAAZIAAAFIgBADQgCAEgJAAQgJAAgCgEg");
	this.shape_3.setTransform(5.275,0.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#999900").s().p("AgjAAIBHgpIAABTg");
	this.shape_4.setTransform(-19.225,0.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_4},{t:this.shape_3}]},1).to({state:[{t:this.shape_2}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.6,-9.6,53.2,19.299999999999997);


(lib.lines = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// lines
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AAEBMQgEgBgBgEQgYg3AMgvIAAgBIAMglQABgEADgCQAEgCAEABQAEACACADQACAEgCAEIgLAlQgKApAVAwQABADgBAEQgCAEgEACIgDABIgEgBg");
	this.shape.setTransform(93.3321,14.9554);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("ADdCUIqnAAQhQgBABhFIAAgUIAAgPIAAhJIAAACIAAgRIAAgfQgBhGBQgBIKnAAIACAAIAFAAIABAAIARACIABABIADAAQANgCAPgBIAFACID6CPQAEACABADQABADgBAEQgCADgDACIj6B+IgFABIgRgBIgFACIgCAAIgfAFIgCAAgADfCAQgXgTAAglIAAgKIrNAAIAAAQQAAAyA7AAIKpAAIAAAAgADchMIAAAfIAAAUIAABEIAAAPIAAAOQAAApAnAIIAEABIANABIDnh1IjniFQgNABgKADIgBAAQghAJABAmgAoFAmILNAAIAAhAIrNAAgAoFhMIAAAaILNAAIAAgaQAAghASgSIqkAAQg7AAAAAzg");
	this.shape_1.setTransform(53.8165,14.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFCC").s().p("AgyCFQgygHAAgzIAAiVQAAguAogKQANgEAQAAICEBMQgfBCAfA8IiEBDQgKAAgJgCg");
	this.shape_2.setTransform(84.875,14.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("ADdCUIqnAAQhQgBABhFIAAgUIAAgPIAAhJIAAACIAAgRIAAgfQgBhGBQgBIKnAAIACAAIAFAAIABAAIARACIABABIADAAQANgCAPgBIAFACID6CPQAEACABADQABADgBAEQgCADgDACIj6B+IgFABIgRgBIgFACIgCAAIgfAFIgCAAgAoFBOQAAAyA7AAIKpAAQgXgTAAglIAAgKIrNAAgADchMIAAAfIAAAUIAABEIAAAPIAAAOQAAApAnAIIAEABIANABIByg6QgUgyALgsIAAgBIAKgeIhzhDQgNABgKADIgBAAQghAJABAmgAGRgYQgKAlARArIBjgyIhig4gAoFAmILNAAIAAhAIrNAAgAoFhMIAAAaILNAAIAAgaQAAghASgSIqkAAQg7AAAAAzg");
	this.shape_3.setTransform(53.8165,14.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFCC").s().p("AgqB8IgDgBQgogHAAgpIAAgPIAAgOIAAhFIAAgTIAAggQAAglAhgKIABAAQAJgDANAAIBzBCIgKAfIAAABQgLArATAyIhxA6IgNgBg");
	this.shape_4.setTransform(84.35,14.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,107.7,29.5);


(lib.limpiarBtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#663366").s().p("AgyBCQgKgFgGgHQgLgOAAgSQAAgWAPgNQAOgOAXgBQAYABALARQAGAKAAAJQAAAMgFAFQgGAFgFABIgrAAQAAAEAGAEQAFADAHAAQAKABAGgDIACAAIAHgCQAFAAAEAHQACAGAAADQAAAQglAAQgNAAgLgFgAgmAFQgFAFAAAFIAWAAQAHAAAAgGQAAgEgDgCQgDgDgGAAQgGAAgGAFgAjUA6QgIgHgEgJQgFgKAAgLQAAgMAFgJQAEgJAIgFQAOgMASgBQAGAAAHACIAJAEIADACIAFADQAFAEAAAEQAAAFgEAFQgGAKgGAAQgDAAgHgEQgDgDgGAAQgGAAgGAEQgEAFAAAHQAAAIAEAEQAGAEAFAAQAGAAAFgDQAFgEADABQAFAAAIAJQAEAFAAAFQAAAGgKAGQgKAHgPABQgRAAgPgMgAhvBEQgNgCgFgHQgEgJAAgTIAAhVIAAgHIABgEQADgFAMAAQAKAAADAFIACAEIAAAHIAABSQAAAHABABQABABAAAAQABABAAAAQABAAAAAAQABABABAAIAFAAIADABQAEACgBALQABALgEADQgDACgIAAIgMgBgADIA9QgCgCAAgHIAAgfQAAgHgEgFQgFgEgGAAQgHAAgFAEQgEAFgBAHIAAAfIAAAHIgCAEQgBAGgMAAQgLAAgDgGIgBgEIgBgHIAAg+IABgHIABgEQADgFALAAQALAAACAFQACADAAAEIAEgEIAEgDQAHgFAHAAQASAAAMAPQAMAMAAAUIAAAfIgBAHIgBAEQgDAGgLAAQgNAAgBgIgABdBCQgDgDAAgEQgHAJgQAAQgPAAgOgOQgNgPAAgSQAAgTANgNQAOgOAQAAQAGAAAFACQAFACACACIADADQABgJANgBIALABQADACACADIABAEIAAAGIAAA+IAAAHIgBAEQgDAFgJAAQgLAAgDgCgAA9AKQgEAFAAAGQAAAGAEAFQAFAFAHgBQAGABAEgFQAFgFAAgGQAAgGgEgFQgFgFgGAAQgIAAgEAFg");
	this.shape.setTransform(-0.25,-0.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFAE4").s().p("AjeBgQgrAAAAg4IAAhPQAAg4ArAAIG8AAQAsAAAAA4IAABPQAAA4gsAAg");
	this.shape_1.setTransform(0,0.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999900").s().p("AgyBCQgKgFgGgHQgLgOAAgSQAAgWAPgNQAOgOAXgBQAYABALARQAGAKAAAJQAAAMgFAFQgGAFgFABIgrAAQAAAEAGAEQAFADAHAAQAKABAGgDIACAAIAHgCQAFAAAEAHQACAGAAADQAAAQglAAQgNAAgLgFgAgmAFQgFAFAAAFIAWAAQAHAAAAgGQAAgEgDgCQgDgDgGAAQgGAAgGAFgAjUA6QgIgHgEgJQgFgKAAgLQAAgMAFgJQAEgJAIgFQAOgMASgBQAGAAAHACIAJAEIADACIAFADQAFAEAAAEQAAAFgEAFQgGAKgGAAQgDAAgHgEQgDgDgGAAQgGAAgGAEQgEAFAAAHQAAAIAEAEQAGAEAFAAQAGAAAFgDQAFgEADABQAFAAAIAJQAEAFAAAFQAAAGgKAGQgKAHgPABQgRAAgPgMgAhvBEQgNgCgFgHQgEgJAAgTIAAhVIAAgHIABgEQADgFAMAAQAKAAADAFIACAEIAAAHIAABSQAAAHABABQABABAAAAQABABAAAAQABAAAAAAQABABABAAIAFAAIADABQAEACgBALQABALgEADQgDACgIAAIgMgBgADIA9QgCgCAAgHIAAgfQAAgHgEgFQgFgEgGAAQgHAAgFAEQgEAFgBAHIAAAfIAAAHIgCAEQgBAGgMAAQgLAAgDgGIgBgEIgBgHIAAg+IABgHIABgEQADgFALAAQALAAACAFQACADAAAEIAEgEIAEgDQAHgFAHAAQASAAAMAPQAMAMAAAUIAAAfIgBAHIgBAEQgDAGgLAAQgNAAgBgIgABdBCQgDgDAAgEQgHAJgQAAQgPAAgOgOQgNgPAAgSQAAgTANgNQAOgOAQAAQAGAAAFACQAFACACACIADADQABgJANgBIALABQADACACADIABAEIAAAGIAAA+IAAAHIgBAEQgDAFgJAAQgLAAgDgCgAA9AKQgEAFAAAGQAAAGAEAFQAFAFAHgBQAGABAEgFQAFgFAAgGQAAgGgEgFQgFgFgGAAQgIAAgEAFg");
	this.shape_2.setTransform(-0.25,-0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape_2}]},1).to({state:[{t:this.shape_1}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.6,-9.6,53.2,19.299999999999997);


(lib.colorMc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgnDAjKMAAAhGTMBOHAAAMAAABGTg");
	this.shape.setTransform(246.65,225.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.colorMc, new cjs.Rectangle(-3.3,0.1,500,449.9), null);


(lib.paletamarronbtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#663300").s().p("AipCqIAAlTIFTAAIAAFTg");
	this.shape.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17,-17,34,34);


(lib.lapiz = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// lines
	this.lines = new lib.lines();
	this.lines.name = "lines";
	this.lines.setTransform(53.8,14.8,1,1,0,0,0,53.8,14.8);

	this.timeline.addTween(cjs.Tween.get(this.lines).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AnKCKQhFgBAAg7IAAiaQAAg9BFAAIKnAAIACAAIAFAAIARACIAFACQgoALAAAuIAACUQAAAzAxAIIgGACIggAFgAGbg8IB1BCIh1A8Qgfg4AfhGg");
	mask.setTransform(53.825,14.75);

	// BG
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(35.8,1.15,0.2254,0.0759,0,0,0,163.5,47.5);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lapiz, new cjs.Rectangle(0,0,107.7,29.5), null);


(lib.area12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AJrdUIgCgBIgCgBIgCgDIgBgDIABhFQACgpAIgdQARhDgdhCQgHgPgBgPQgIh3AoiDIAAgBIAEgHIACgCIADgBIADACIABACIALAuIAAgBQAmB8AUA9QAKAiAAAaQAABOAuA0QASAVAIAfIATBZIAAADIgCACIgDABgEggJAdTIl7gRIgDgBIgCgDQgDgKgBzQQgBzOADgaIACgDIACgCIARgDQAIgCAFgDQAFgEAFgHIAAAAIAJgPIADgCIADAAQASAKAKgJIAAAAQAHgIADgaIABgDIADgCIADABQAsAUAjghQAdgdgDgwIABgDIACgCIADgBIAyAFIACAAIACACIACACIABACQANArAfBWIAAAAQAaBOALA3QAYByALBHQARBlAIBVIAOCoQAIBiAFBEQAVEmAFGbIACC7QABBrgCBPQgEEPgkDQIAAAAIgOBGIAAABIgRBFIAAABIgFAOIgCACIgCABIgBAAgAHldSInOgIQhKgCizgGQijgHhbgBQhggCkQAEQjwACifAEIAAAAQg1ABhMAEIiAAFIgVAAIgDgBIgCgDIgQhGQgni0gfkDQgRiRgYjnQgSixgFhaQgGhlACh7QAAhWAGiKQAGiJAQicQAbkQB7jtIBEiAIAAAAIAfgyQAAgBAAAAQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABABAAAAQAUAKASgKQAHgFAZgYIADgCIADABIACACIAPAcQAOAUAHAIQARAPAWgCQAWgDAPgSIAAAAIAMgSIAMgUIACgCIADAAQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAAAIAKANIAQARQAPALANgDQANgDAIgRIAGgPIACgCIACgBIADAAQAVALAJgCIAAAAQAIgDAOgWIACgCIADAAIADABIAVATQAXAPAWgJQAWgKADgbIAAAAIADgnIABgDIADgCIADAAQATAFAGgBQAHgDALgQIACgBIADgBIADACIAXATQAMAHAOgEQAOgEAJgMQAHgIAJgTIACgDIADAAIADABIAQAMIAAAAQAHAEAKAAQAHgBAIgGIAAAAIAOgPIADgBIACAAQABAAAAAAQAAAAABABQAAAAAAAAQABAAAAABQATAYAEADQAWAVAUgBQATgBATgXIAAAAQALgPATgjIACgBIADgBIADAB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");
	mask.setTransform(244.1122,187.575);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(244.15,217,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area12, new cjs.Rectangle(-0.5,0,489.2,375.2), null);


(lib.area11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EglhAF4QgjAAgEgFQgFgEAAgjIAAkAIABgDIACgCIADAAQAKAAAFAHIAHAKIAAABIAMAZQAGALAGgCIAAgBQADgBAAgDQAAgDgCgGQgNggAFgoQAAAAAAgBQABAAAAgBQAAAAAAAAQABgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAIADABQAKALACAEIAAgBIAVAxIABAAIADAIIACAFIABABQADAEADAAIAAABIAFgDIACgCIABgBIACgNQAAgNABgCIAAAAIACgXQADgPAJgJIACgBIACAAQAKABAIAHIAAABIAKANIABAAIAQAaQAEAFAEABQADgBAEgHIASgcIACgCIACAAIADABQAPAKAFAUIAEAgQACAOACAEIAAAAQACAFAGAAIACgBIAAAAIADgDIAAgBQADgHAEgRQAIgzAWgnIAAAAQAJgRAMgKQANgLAOADQAPADAJAPQASAhADAuIADAsQABAKAHAAIAAAAQAHAAADgKIAAABIALgoQAFgOADgFIABgBQAGgLAKgGIADgBIACABQAKAHAEAOIAFAVIADALQABADAEAAQAFAAADgCIABAAIAGgMIASgtIAAAAQAMgbAJgRQALgYAXgUIAAAAQAQgRANAEIAAAAQANACALATQAMAVAIAcIAIAyIAFAkIACAIQACAIAGAAQAAAAABAAQAAAAABAAQAAAAABgBQAAAAAAAAIADgIQAHgVAIgOIAAAAIAIgHIAKgHIACgBIADABIACABIAMAVIAAAAIAJAcQADALAKABQADAAADgDIAFgIQAVgvAMgXIAAgBQAJgPATgYIAAAAQAIgKAFgDQAKgHAKAEIgBAAQASAFgBAbQAAAWgFAtIAAABIgBAKIAAAIQACALAEACQADgBAIgHIAAAAIAEgFIAAgBIAFgIIABgBIAPgRIADgCIADABIADADIAIAVIAEAQQABAHACADQABADADAAQALABAFgMIALgeIAAgBIAOgZIACgCIADgBQAAAAAAAAQABAAAAABQAAAAABAAQAAAAAAABIAOAMIABABIALAPIAHAIIABABQACACADgBIAAAAQAGgDAGgNIACgMIADgNIAAgBIAHgRIAAAAQAHgLAMgEQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABAAQAAA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");
	mask.setTransform(244.625,37.6368);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(244.15,-126.2,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area11, new cjs.Rectangle(0,0,489.3,75.3), null);


(lib.area10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("ABuZzIgCgCQgWgkgLgEQgLgDgbAUIgDABIgDgBIgCgDIgHgqQgHgkgQgdQgNgVgRgEQgSgEgTAOQgTAPgPAYIAAAAQgIANgVAuIAAAAIgLAaIgCACIgEABIgDgDQgRgdgNAAIAAAAQgOAAgYAfIgDACQAAABgBAAQAAAAAAAAQgBgBAAAAQgBAAAAAAQgBAAAAgBQAAAAgBgBQAAAAAAAAQAAgBAAAAIgEgOIgJgcQgFgQgGgLQgMgYgYgEQgXgDgSAUIgBAAQgKAMgNAZIAAAAIgTAuIgDADIgDAAIgDgBQgZgdgIgBIgBAAQgIgBgTAUIgDACQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBgBQgIgEgBgEQgCgGAHgGIALgJQCdiMBEjaQAghmAVioQAcjogCkPQgFmHgFjBQgDhggQkSIgOjYQgLh5gOheQgUiLgLg5QgUhsgchUIAAABIg2iWIgIgRQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAIAOguQAAAAAAAAQAAgBAAAAQAAAAABAAQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIADAAQAZANAWgTQAIgIAEgNQACgKACgSQAAAAAAgBQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAAAAAQABgBAAAAQABAAAAAAQAAAAABAAQAdAAAHgHQAHgJAEgoIABgDIACgBIADgBIAYAEIACABIABACIAVAwQApB3BHCLQALAXAbAnIAAAAQAOAVAcALQAaALAQgUIABAAQAggpANgXIgBABIBujRIABAAIAFgJIACgCIACgBIAYgBIADABIACACIAAADIgHAfIAAAAQgFASgCAMIAAAAQgGAqAUATQAUAQAqgHIAAAAQALgCARgFIAdgKIADAAIADABIABADQACATgHAOQhABtgiA/Qh5DighEFQgaDHgEDDQgEDEACCLQACB9AUCuQAIBEAOCJIAmE9QAaDCAnCsIASBJQAqCfB/B4QAIAIACADQAGAIgGAMIgBACIgDAAQgGAAgBgBIgCAAQgKgKgMADQgMAEgIAMQgGAIgEALIAAAAIgGAVIgCADIgEAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAgBgBAAQgJgKgGgEQgJgIgKAAQgKABgIAKIgIANQgKAUgDgBIgDgBIgBgCQgJgQgJgFQgMgFgPAKIgEABIgDgBIgBgEIABgWIAAgXQgBgNgCgJQgEgZgSgGQgSgGgTAQQgOALgIAPIgkBAIAAAAIgJATIgCADIgCABIgCgBg");
	mask.setTransform(45.708,165.1583);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(214.55,130.6,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area10, new cjs.Rectangle(0,0,91.4,330.3), null);


(lib.area9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Ak3CQQgaABgIgIQgHgGgEgdIABgDQABAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQAJgEAIAEIABAAIAOAGIALAHQAFADAEACIABAAQAGACAHgDIAAgBQAFgDgDgGQgDgLgCgJQgBgLAHgFQAGgFAKAEIAAAAQACAAAPALIAGAGIAGAEQAHACAEgCIAAgBIABgDIAAgFQgBgHgFgJIAAgBIgHgRIAAAAQgJgfgBgOQgCgQAKgEIgBABQAIgHAPAHQAGAEAKAIIAbAbQAGAIACABQAKADAGgBIgBgMQgFgxAMgzQADgMADgFQAGgLALgBQALgBAJAJQAFAEAFANQAOAaAGAxIAGAlIAAAAQABAGABAEQAFAIAJgCIAAAAQACgDABgGIACgcQADgNAEgIQAFgLAMgIIADgBIADACIAQARIAAABIALAVQAEAGAGgCQAJgDABgIQAHg+AHgtQAEgZAOgLIACgBIACABQARAEAIASQAMAbAHAVIAAAAIAMA8IACAGIAAABIABACQAIAGAFABIACgBIABgHIAAAAQAFggASgZIACgCIAEAAIACABQAHAHACANIADARQAFARACADQAEAGADAAIAAAAQADgCADgFIAHgRIAmhYQAGgLAIgLQADgDAFgDIABgBQAFgDAFABQAEAAAEAIIAEAIIAAABQAEAYgBAQIAAABIgDAhIgCAhQAAAKAHAKIABACIABAAQADgBABgCIABAAIAFgOIAAAAQAMgaAbgIIADAAIABACIABACIAACbQABAYgFAEIAAAAQgFAFgXAAg");
	mask.setTransform(35.65,14.45);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(-142.25,-53.4,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area9, new cjs.Rectangle(0,0,71.3,28.9), null);


(lib.area8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("ACxDpQgzgKgqgYIgLgGIAAgBIgJgHIgEgCQgDAAgDACIABAAIgKAHQgzAlgsAAQg/ABgxgfQgXgPgJgHQgSgOgJgPIgBgDIABgCIACgCIAbgOQAHgEgBgFQgBgBAAAAQAAgBgBAAQAAgBgBAAQAAAAAAAAQgEgBgEACIAAAAIgeAOIgjAOQgVAHgOACQhFAMgxgbQgtgYggg4QgTggAVgqQA9h9CVgZQB2gVBYAkQAkAPAPARQAEAFAEAAQACgBADgGIAAgBQAQgoAWgTIAAAAQAtgqBCgKQBWgNBTA2IAAAAIAQANIABADIAAAEIgHAKIAAAAQgEAFAAAEIAAAAIAAAEIAAAAIACAEIABgBIABAAIADgBIAAgBQAJgIANgRQA0hDBPAJQATADAFAHQAEAFAAASIAAFjQAAASgDAEIAAAAQgEAEgQAFQgWAFgZgEQgRgCgcgJQgLgEgHgEIgBAAQgQgIgLAMIAAAAIgXAVQgsApg8AAQgSAAgTgDg");
	mask.setTransform(50.1987,23.6321);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(-110.25,116.2,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area8, new cjs.Rectangle(0,0,100.4,47.3), null);


(lib.area7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgOH7Qi5gLiFh9QiEh9gXi1IAAgBQgWi2BiiaQBjibCtg4QCmg1ClA9QCVA3BSB3IAAADIAAADIgDACQg8AbgbA3IgBACIgDABIgCgBQiqhai5BSQg/AcgoBBQgOAWgHAOQgZAwAdAtQAuBGA/ARQBAARA9gVQASgHAGADQAEABAPANQBbBaBvgVQAdgGAggWIAAAAQAJgHAIAAQAIAAAKAGQAUALAqATIADADQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAAAQgxCSiFBfQiEBeifAAIghgCg");
	mask.setTransform(49.1991,50.8529);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(-123.85,128.2,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area7, new cjs.Rectangle(0,0,98.4,101.7), null);


(lib.area6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("ANmdJIgBAAIgNgGIg8gnIgBgBIgBgCIgBgGIABgCQAlhFAShsIAdi+QAGgogOgtQgQgyAGgsQADgbAIgOQATgngKg0QgFgigPghIgxgbQgvgdgbgrIgwhPQgjg7gJhKIgFgbIg4AQQhkAeghAIIAAAAQhWAUhZAAIhigCIgrABIgFA7IAAABQAAAMAFAkQAOBeAJAzQAJAyASBDQACAJAPAQQAvA1gaBBQgSAwANA8QAXBqAEA6QAFA1gBAbQAABgANBEIAAABIACAbIgBADIgCACIgEAAIgbgNIgQgMIgQgMIg1gkQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBIAJgRQAkg8gHhQQgMiHgZhmQgJglgUgXQgegfgJg8IgCgXIgCgWQgKgtgJgfIgQgsIAAAAQgKgcgEgRQgIgYgIglIABAAIgNg8IgBgBIgDgVIAAgFQgHgKgEgDIgDgBIAAAAQgkA1gKAlIgPA/QgCAHgBALIAAABIgCATIgGBNQgBAiAFAdIAAAAQACALAGAPIAKAZIABABQANAhgKAmQgKAlgDBHQgEBXgDAsQgHBLATBRIAOBKIgBACIgBADIgEAAQgagBgggRIgBAAQgsgYgGgCIgCgBIgCgDIABgDIATguIAAAAQAnhkgYh/IgThcQgHgfgPgQQgVgVAJgfQAGgcAMgcQAMgagEgdIAAAAIgBgPQgCgugMg+IgUhrIgQhVQgIgxgCgmIgDgWIgCgmIABgEQAIgLgMglQg7hJghhaQgTg2ADhDQACg1ATg/QAdhigDhfQgBg2gCgYQgEgqgIgiQgXhXgbhaIg1isIAAABIgSgwIAAgBIgihkIgjhkQgdhSgghMQhHiohJjTQgNglgbg2QgYgygbggQghgngsgUIgegKIgSAKIAAAAQhLAkhLgTQhdgYhFADIhCAHIgXADQg7AIgMgRQgPgUAMgRQAJgPALgHQBOgxA6gfQA3geAcgpQAcgsBEgMQAYgEAxgFQAkgFAjgSQAegQAfgbIAygsQAJgJAQgGIAAAAQAGgDALAIIACACQABABgBAHIgEAHIAAABIgKAIIgJAIIgPAPQAYArgFAIIAAAAQgGAJgaAJIgdAVQAEALAIAKIAVAYQAcgUAlgIQABAAAAAAQABAAAAAAQABABAAAAQABAAAAAAIACADQAFAWgMATIgKAPIATATIAhAeIAhAbQAjAcApAoIBIBKQA+A/AxBHQAmA3AqBcQAnBTAnBkIAsBxQAbBLAQAlIAAAAQA0CDAjBLQAtBhA1BKIAAAAIAbApQAfAuBKBUQAhAmAjAhQAZAYAkAcQA5ArAzAiQAbATAnATIBHAdQAwAUBDARIAAAAIB1AcQBvAbAhAKQAWAHAhAOIA2AXQAmAOArAcQAXAPAyAkQAKAHAPAQIAXAXQAUASAXAaIAmAwQA1BCAaBOQAKAcAKAoIAPBFQAFAUAHApIACALIAAAAQgBAJgJAFIgDABIgCgBIgCgCIgKgTIAAgBIgohnQgehOglguQgNgPgTgSIAAAAQgFgGgFACQgEABgBAHQgIAwgaA7QgJAXgRAbIgfAvQgPAVgTAjIghA6QgOAVgKAfQgGAPgMAoIgRA8IAAAAIgDANIAoA9IAAABIAMAUQAHAMAGAHQAQAUADAaQADAUgEAdIgCAMIAAgBQgjB8AHCWQAEBjASBGIAAABIADARIAAACIgCACIgCABQgYADgbgQQghgVgGgCIgCgCIgBgDIABgIIAAgCQAlhzgqhpQgLgbgHgTQgTArgKA5IgiDUQgHAsgJBZIgCAOIAAADIgCABQgGAEgGAAIgFgBg");
	mask.setTransform(141.1457,186.5525);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(62.55,164.6,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area6, new cjs.Rectangle(0,0,282.3,373.1), null);


(lib.area5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgvAzQgTgUgBgdQAAgcAUgVQAUgVAbgBQAcAAAUAUQATAUAAAcQABAbgTAWIAAAAQgVAVgcABIgBAAQgaAAgUgTg");
	mask.setTransform(6.75,6.975);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(-30.25,144.2,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area5, new cjs.Rectangle(0,0,13.5,14), null);


(lib.area4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgxA2QgRgPgDgYIAAAAQgDgaAQgXQARgXAcgIQAZgIAWAKIABAAQAVAKAMAZIABACIgBACIgWAoIgCACQgIADgEAGIAAAAQgFAGgBAHIAAACIgCACIgfAZIgDABQgXgBgSgPg");
	mask.setTransform(7.0444,6.9393);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(80.95,107.4,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area4, new cjs.Rectangle(0,0,14.1,13.9), null);


(lib.area3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Ag2AjQgggYAHgnIAAAAQADgNAFgFIABAAQAFgFANAAIBsAAQAOAAAFAGIABABQAEAEABAPQABAYgRAUQgQAVgaAIQgPAEgMAAQgcAAgWgRg");
	mask.setTransform(8.1142,5.2306);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(116.95,168.2,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area3, new cjs.Rectangle(0,0,16.2,10.5), null);


(lib.area2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AAABOQgfAAgWgXQgXgXABggQAAggAWgWQAXgWAegBQAggBAWAXQAXAXAAAgQAAAggXAXQgWAXggAAIAAAAg");
	mask.setTransform(7.6495,7.7734);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(206.55,115.4,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area2, new cjs.Rectangle(0,0,15.3,15.6), null);


(lib.area1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("A35JdQgEgBgFgDQgFgFgBgEQgEgMAAgUIgBozIAAgNIAAhEIABn3QAAgSASAAIRWAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAABIAAASQgDAcAMAWIAAAAQAMAWAZAMQAfAOAhgIIAAAAQAjgIAVgZQAUgYgCgfIAAgSQAAgBAAAAQAAgBABAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAIASgCIFqABIALABIAvAAIAQgCIUMAAQATAAAFAHIAAAAQAGAGAAARQAAAUgMAPIAAABQgNAPgTADIgBAAIgLABQgHABAAAEQABAEAGAFIAUANIABAAQAPALgDARQgCAOgTAHQgTAFgCAEQgBAFALARQAMASACANIAAAAQAEAYgQAOQgQAPgYgHIAAAAQgHgEgEAAIgBAAQgEgCgCAEQgDADABAEIAHALIAAABQAPAdABASQACAfgZALQgLAEgeAEIgHAAIgBAAIgBgBIgCABQgJACgCAEQAAACAEAGQAFAGALAIIAAABQARAPgGARIAAABQgGARgXAAIgBAAQgQAAgRgDIAAAAIgLgCQgFAAgDAEIAAABQgDADACAEIAAAAQAAADAEAGIAAABIAKAUIAAABQAJAcgUASIAAABQgTASgUgPIgBAAIgEgEIgDAAQAAgBgBAAQAAAAgBAAQAAAAAAAAQgBAAAAABQgDABAAADIAAAAIACAJQACALAAAEIAAABQgDAQgHAEQgKAJgQgKIgBgBQgIgFgDgBQgLACAAAKQABAOgBAMIAAABQgDAagTAFQgYAHgOgTIgGgHQgEgCgDABIgBAAQgDABAAAFQgBAHAAAPIAAAAIgEAbQgCAQgEALIAAAAQgJAagWAJQgbAKgcgXQgHgGgEABIAAABIgBACIgDAJQgCAIgDASIgCADIgDABIgDgBIixiYQgBgBAAAAQAAAAAAAAQgBgBAAAAQAAAAAAgBIAAgCIAKgrQACgIgBgIQgCgNgHgFQgHgEgMACIABAAIgYAIIgXAIIgBAAIgIADIAAAAQgHACgGgIIgBgDIAAgCIACgCIALgHIAAgBIAVgMIABgBQAbgWgTgeIgHgJIgBgDQAAgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAIAXgWQAKgLACgJIAAgBQABgKgGgKQgHgLgKgEQgMgEgMAEIgBAAQgOAFgOAKQgTAOgTATQhPBPhvAEQgrABgnAWQgjATgQAbQgUAfgvAbIiPBTQggATgDAgQgCAZAQAQIAAABQAPARAZAAIAAAAQANABATgCIAigEQBGgHAKAAQA1gDBIARQAeAIAQACQBBAKA9gdQAWgLAPADIAAAAQAOADAUASIACACIAAADIgCACQgGAGgCABIAAAAQgVAEgGAYQAAADgFAFIgDABQgJACgHgGIgJgHIgHgGIAAAAQgEADgCAJIAAABIgCANQAAAJgCAGIAAAAQgFAPgKACQgKAEgMgKQgKgIgKgMIgGgJIAAAAQgBgBAAAAQgBAAAAgBQgBAAAAAAQgBAAgBABIAAAAQgEAAAAADIgBAAIgCAKIAAABIgKAcQgFALgGABQgGACgKgGIgBAAIgOgMQgFgDgDgBQgEABgDAGIABgBIgLAaQgOAcgUAAQgUACgSgbIAAAAIgJgQIAAgBQgDgEgDgBIAAAAQgDABgDAFQgDAEgDALIAAAAIgIAUQgHAKgIACQgIABgKgHIAAgBIgNgNQgFgFgDAAQgDAAgCAFIgHANIAAAAIgGAOQgQAdgJAMQgNAOgLABQgMABgQgMQgRgMgOgaQgFgJgDgBQgEAAgHAIIAAABIgNAQQgJAJgHgBQgIABgIgKIgIgMIABABQgHgJgEAAQgDABgFAJIgNAbQgNAWgQAAQgRABgNgVIgBgBIgHgPIgGgHQgDABgEAEIAAABQgBAAAAAAQAAABgBABQAAAAAAABQAAAAAAABIAAAAIgCAHIAAAAIgJATIgCACIgCABQgWgBgKgYIAAABQgEgIgGABQgHACABAKIAAAAIADAWIAAABQADAjgBAIQgDAXgQAHQgRAHgTgOQgHgGgPgTIAAAAIgGgIQgBgBAAAAQgBAAAAAAQgBgBgBAAQAAAAgBAAQgEABgBACIAAAAIgEAKIAAgBIgFAQIAAABQgFAKgLAFIgDAAIgCgBIgQgSIgHgHIAAABQgFABgEAIIAAgBQgDAIgFAUIAAAAQgGAPgJACQgKACgLgLQgGgGgTgcIAAgBIgEgIIAAAAQgCgEgDAAQgCAAgCADIgGAJIgHAMIABAAIgKASIgLASQgNARgTABQgSAAgPgQQgUgWgKgkIgBgBIgCgIIAAABQgCgDgDgBQgDAAgDACIgGAGIAAAAIgOASIgQARIAAAAQgOAKgLgFIgBAAQgKgGgBgSIAAgBIACgPIADgQIgBABQACgIgCgCIAAgBQgDgBgHADIg8AXIAAAAQgaAIgVgFQgZgGgBgWQgCgeAEgSQACgMAHgTIAKgeIABgJQgFgCgHABIgKAEIAAAAIgMAFQgMADgFgEIgBAAQgHgDgEgKQgIgUAGgYIAAAAQAFgSABgJQAAgDgCgDIgBABIgFABIgeAZIAAAAIgPAJIAAAAQgLAEgJgFIgBgBQgQgLAIgaQANgoALgaQAEgIAJgNIAMgWQADgHgCgEQAAgBAAAAQgBgBAAAAQAAAAgBAAQAAAAgBAAIAAAAQgDAAgFACIAAABQgRAFgMAGIgEAAIgDgDQAAgBAAAAQAAgBAAAAQAAAAAAgBQAAAAAAgBIAHgTIgBABQACgGgCgEQgDgBgGACIgTAHQgMADgFgFQgHgEAAgLIAAgBIACgQQAAgEgBgDIAAAAQgCgCgDgBQgGAAgEAGIgXAeIgBABIgLAIIgDABIgDAAIgCgCIgHgNIAAgCIgDgLIAAgBQgCgEgEAAQgEAAgCADQgCAEgCAIIAAABIgKAaIgBAAQgGAOgFAHQgMAOgIgCIgBAAQgIgCgHgQIAAgBQgDgEAAgGIgCgKIAAgBIgBgIIgBgGQgDgGgEgBIgCABQgBAAAAAAQgBABAAAAQgBAAAAABQAAABgBAAIgHAPIgOAdIAAAAQgKARgOACQgNADgRgMIgNgLQgFgDgCAAQgDACgBAFIAAAQIAAAAIgEAYQgCAPgFAKQgKAagdgKQgSgGgEADQgEAEACATQACAOgBAMQgDAOgKADIABAAQgKADgKgKIgLgNIgJgNIgFgIIgFgFIAAAAQgFgDgFADIgBAAIABAHIACAEIAEAIIAAAAQALAiADAMIAAABQABAMgGAOIAAABQgHAMgKADQgJADgNgHIgBAAIgQgLQgFgDgEABQgCACgBAHIABAPIAAABQgCAXgDAHQgHAVgNAFQgOAGgTgLIAAAAQgTgKgDACIAAgBQgDADABAWQAAAZgCAIQgDAZgWASQgbAXgggRIABAAQgEgBgGgGIgIgGQgJgDgDABIgCAAIAAAKQAAAFADALIAAABIAAAaIgBAEIgDABIgEAAQgJgGgFgHIAAgBIgGgNIAAgCQgBgIgBgDIAAAAQgEgFgEgBIgDACIgDAEQgBAGABAOQAAAVgDAOIAAgBQgBAEgFAGIgBAAQgFAEgDAAIgDgBgAgKACQgmAVgHAqQgFAgASAaQATAZAgAFIAOACIAAABIAJABIABAAIACgIIAAAAQADgMAFgCQADgEANACIAKACQAEAAACgBQAAgDgBgEIgBgBIgJgPIgBgDQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAAAAAIAYgGIgBAAIAFgDIgBgCIAAAAQgHgNAGgJIAAAAQADgHAMgGIAAAAQAHgEgCgFIAAgBQgRgngfgMIAAAAQgRgHgQAAQgWAAgUAMgA0KhCQgaAaAAAmQAAAkAaAaIABAAQAYAbAlAAQAlABAagbQAZgaABglQAAgmgZgaQgagbglAAQglAAgaAbgARwl9QghABgYAYIABAAQgYAZABAiQAAAiAXAXQAXAXAhgBQAiAAAXgYQAYgagBghIAAgBQgBghgWgYQgXgWggAAIgCAAg");
	mask.setTransform(155.025,60.5868);

	// Capa_2
	this.clr = new lib.colorMc();
	this.clr.name = "clr";
	this.clr.setTransform(223.35,176.2,1,1,0,0,0,244,224);

	var maskedShapeInstanceList = [this.clr];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.clr).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.area1, new cjs.Rectangle(0,0,310.1,121.2), null);


// stage content:
(lib.animalesjirafaingles = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.stop();
		
		
		areasBoton=[this.area1,this.area2,this.area3,this.area4,this.area5,this.area6,this.area7,this.area8,this.area9,this.area10,this.area11,this.area12];
		
		areasBoton[0].on('click', function(){changeColor(0);});
		areasBoton[1].on('click', function(){changeColor(1);});
		areasBoton[2].on('click', function(){changeColor(2);});
		areasBoton[3].on('click', function(){changeColor(3);});
		areasBoton[4].on('click', function(){changeColor(4);});
		areasBoton[5].on('click', function(){changeColor(5);});
		areasBoton[6].on('click', function(){changeColor(6);});
		areasBoton[7].on('click', function(){changeColor(7);});
		areasBoton[8].on('click', function(){changeColor(8);});
		areasBoton[9].on('click', function(){changeColor(9);});
		areasBoton[10].on('click', function(){changeColor(10);});
		areasBoton[11].on('click', function(){changeColor(11);});
		
		
		function changeColor(num)
		{
			var btmClr1 = new createjs.Shape(new createjs.Graphics().beginFill(pickedColor).drawRect(0,0,488,448));
			areasBoton[num].clr.addChild(btmClr1);
		}
		
		paletaArr=[this.amarilloBtn,this.naranjaBtn,this.verdeClaroBtn,this.celesteClaroBtn,this.rosaBtn,this.pielBtn,this.blancoBtn,this.rojoBtn,this.verdeBtn,this.celesteBtn,this.lilaBtn,this.marronclaroBtn,this.negroBtn,this.bordoBtn,this.verdeOscuroBtn,this.azulBtn,this.fucsiaBtn,this.marronBtn];
		
		paletaArr[0].on('click', function(){colorPicker(0,0);});
		paletaArr[1].on('click', function(){colorPicker(1,0);});
		paletaArr[2].on('click', function(){colorPicker(2,0);});
		paletaArr[3].on('click', function(){colorPicker(3,0);});
		paletaArr[4].on('click', function(){colorPicker(4,0);});
		paletaArr[5].on('click', function(){colorPicker(5,0);});
		paletaArr[6].on('click', function(){colorPicker(6,0);});
		paletaArr[7].on('click', function(){colorPicker(7,0);});
		paletaArr[8].on('click', function(){colorPicker(8,0);});
		paletaArr[9].on('click', function(){colorPicker(9,0);});
		paletaArr[10].on('click', function(){colorPicker(10,0);});
		paletaArr[11].on('click', function(){colorPicker(11,0);});
		paletaArr[12].on('click', function(){colorPicker(12,1);});
		paletaArr[13].on('click', function(){colorPicker(13,1);});
		paletaArr[14].on('click', function(){colorPicker(14,1);});
		paletaArr[15].on('click', function(){colorPicker(15,1);});
		paletaArr[16].on('click', function(){colorPicker(16,0);});
		paletaArr[17].on('click', function(){colorPicker(17,1);});
		
		erTxt=this.txt;
		colorsArr=['#FEDA22','#FF6600','#99CC00','#66FFFF','#FF6699','#ECB258','#FFFFFF','#CC0000','#339900','#009999','#993366','#AE8443','#333333','#660000','#003300','#000099','#FF0066','#663300'];
		pickedColor='';
		lapizMc=this.lapiz;
		function colorPicker(num,linesFrame)
		{
			pickedColor=colorsArr[num];
			//erTxt.text=color;
			var btmClr2 = new createjs.Shape(new createjs.Graphics().beginFill(pickedColor).drawRect(0,0,488,448));
			lapizMc.clr.addChild(btmClr2);
			lapizMc.lines.gotoAndStop(linesFrame);
			
		createjs.Sound.play("sonidoClic");
		}
		
		this.limpiar_btn.on('click', function(){clearAll();});
		function clearAll()
		{
			pickedColor='#FFFFFF';
			for(var i=0;i<areasBoton.length;i++)
			{
				var btmClr3 = new createjs.Shape(new createjs.Graphics().beginFill(pickedColor).drawRect(0,0,488,448));
				areasBoton[i].clr.addChild(btmClr3);
			}
			
			btmClr3 = new createjs.Shape(new createjs.Graphics().beginFill(pickedColor).drawRect(0,0,488,448));
			lapizMc.clr.addChild(btmClr3);
			lapizMc.lines.gotoAndStop(0)
		}
		
		
		this.menu_btn.on('click', function(){gotoMenu();});
		function gotoMenu()
		{
			window.location = "https://www.coloringpages-forkids.com";
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// marca
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#666666").s().p("AglQeQgKgEgHgHQgHgGgEgIQgJgQAAgQQAAgHADgIIAEgMIADgEIADgEQADgEAEAAQAEAAAFADQAJAGAAAFQAAADgEAFQgFAHAAALQAAALAHAKQADAEAHAEQAGADAIAAQAIAAAGgDQAGgEAEgEQAHgKAAgLIgBgJIgDgGIgCgDIgDgIQAAgFAJgGQAFgDAEAAQADAAACACIAEAFIAEAFIAEALQACAIAAAIQAAAIgCAHQgCAIgEAIQgFAJgHAGQgHAHgKAEQgKAEgMAAQgNAAgKgEgAgdOoQgMgNAAgRQAAgSAMgNQAMgNASAAQAOAAAKAHQAKAHAFAJQAFAKAAALQAAAKgFAKQgFAKgKAHQgLAHgMAAQgSAAgNgOgAgJN/QgEAFAAAGQAAAFAEAFQAEAFAGAAQAIAAAEgFQAEgFAAgFQAAgFgEgGQgEgFgIAAQgHAAgDAFgAhBNTIgGAAIgEgBQgEgCAAgLQAAgJAEgDIAEgBIAGgBIBJAAQAGAAABgBQABAAAAAAQAAgBAAAAQABgBAAAAQAAgBAAgBIAAgEIABgDQADgDAJAAQAKAAACADQADAEgCAQQgCAMgGAEQgIAEgRAAgAgdMUQgMgOAAgRQAAgRAMgOQAMgNASAAQAOAAAKAHQAKAHAFAKQAFAKAAAKQAAALgFAKQgFAKgKAGQgLAHgMAAQgSAAgNgNgAgJLqQgEAFAAAGQAAAGAEAFQAEAFAGAAQAIAAAEgFQAEgFAAgGQAAgFgEgFQgEgFgIAAQgHAAgDAEgAAeK/Ig4AAIgFAAIgEgCQgFgCAAgKQAAgKAEgCIAFgCIgCgCIgFgHQgCgFAAgEIAAgGIABgFQABgDADgDQACgBAFAAQAFAAAGADQAGADAAAFIgBAGQgBADAAAEQAAAEADAEQADAEAEAAIAhAAIAFAAIAFABQAEADAAAKQAAAIgDADQgCADgFAAIgEAAgAAeJ2Ig3AAIgGAAIgEgCQgEgCAAgKQAAgIACgDQADgDAEAAIAFAAIA3AAIAFAAIAFACQAEACAAAKQAAAKgFACIgEACIgFAAgAhBJ2IgGAAIgEgCQgEgCAAgKQAAgKAEgCIAFgCIAFAAIAGAAIAEACQACABABADIABAIIgBAIQgBADgCABIgEACIgGAAgAAeJNIg4AAIgFAAIgFgCQgEgCAAgKQAAgKAEgCQADgCAEAAIgEgDIgDgEQgEgFAAgHQAAgQANgLQAMgKAQAAIAdAAIAFAAIAEABQAFADAAAKQAAALgGACIgIABIgdAAQgFAAgEAEQgEADAAAHQAAAGAEAEQAEAEAFAAIAdAAIAFAAIAEACQAFACAAAKQAAAKgFACIgEACIgFAAgAgbHjQgNgMAAgOQAAgFACgFIAEgGIADgDQgEAAgDgDQgCgDAAgGIABgJQABgDACgBIAEgCIAGAAIBBAAQATAAALANQALANAAAQQAAAMgGALQgGALgFAAQgGAAgFgFIgEgFQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAgBQABgBAAAAQAGgIAAgJQAAgGgEgEQgFgEgHAAIgFAAQAIAGAAAOQAAANgMAMQgMALgRAAQgPAAgMgLgAgIG7QgEAEAAAGQAAAGAEAEQAEAEAEAAQAGAAAEgEQAEgEAAgGQAAgGgEgEQgEgEgGAAQgEAAgEAEgAg6GOIgGAAIgEgBQgFgDAAgKIAAgiQAAgOALgOQAFgGAIgEQAJgEAKAAQAKAAAJAEQAIAEAEAGQAKAOAAAOIAAAUIATAAIAFAAIAEACQAFACAAAKQAAALgGACIgJABgAgpFUQgDAFAAAFIAAAUIAcAAIAAgUQAAgFgDgFQgEgEgHAAQgHAAgEAEgAgbEgQgMgMAAgOQAAgGABgEQACgFACgBIADgDQgJgBAAgMIABgJQABgDADgCIAEgBIAGAAIA3AAIAFAAIAEABQAEADAAAIQAAAJgCADQgCADgEAAQAIAGAAAOQAAAOgMAMQgNAMgRAAQgPAAgNgMgAgHD3QgFAEAAAHQAAAGAFAEQAEAEAFAAQAFAAAEgEQAEgFAAgGQAAgFgEgEQgEgEgFAAQgFAAgEADgAgbDBQgNgMAAgOQAAgFACgFIAEgGIADgDQgEAAgDgDQgCgDAAgGIABgJQABgDACgBIAEgCIAGAAIBBAAQATAAALANQALANAAAQQAAAMgGALQgGALgFAAQgGAAgFgFIgEgFQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAgBQABgBAAAAQAGgIAAgJQAAgGgEgEQgFgEgHAAIgFAAQAIAGAAAOQAAANgMAMQgMALgRAAQgPAAgMgLgAgICZQgE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");
	this.shape.setTransform(284.175,436.525,1,1,90);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// marco negro
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00CC00").s().p("EgmRAjKQgGAAgEgEQgFgEAAgGMAAAhF3QAAgGAFgEQAEgEAGAAMBMjAAAQAGAAAFAEQAEAEAAAGMAAABF3QAAAGgEAEQgFAEgGAAgEgmCAiuMBMFAAAMAAAhFbMhMFAAAg");
	this.shape_1.setTransform(254.95,225);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// lineas
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AivWdQgLgKgFgSQgDgMALgLQAIgIAPAFIAHADQAPAJADAOQACAPgMAOQgFAFgIAAQgJAAgIgGgAjyUvQAVABAPAMQAUAQgSASQgIAJgLAEQgHAEAAAHQgPgpADgegAmlVTQgQgIgCgNQgCgMALgOQAFgGAFAAIALAfQAIASACAOIgWgKgAiVU7QgUgGAIgTQAHgVALgHQARAaALAKQAKAIAAAJQgKAEgLAAQgLAAgMgEgAnxU3QAGgegCgYIASAOQAUARgUAPQgKAIgKAAIgCAAgAjKUWQgJgCgGgLQgDgFgBgIIgBgQQAAgNAHgRQAEgJAIgBQAIgCAGAJQAKAOAJATQALAZgXAOQgHAEgHAAIgGgBgALGT+QgDgEADgGQAGAAABgEQABgJAIgPQAFgHgBgJIAQAXQAJAOAEALQgFAFgIADIgNAGIgFAAQgHAAgLgIgAnET7QgGgEgBgIQgCgUAMgbQADgHAGAAQAFgBAMAEIAAA6IgPAGIgHABQgEAAgDgCgAkFTaIgMgiQgIgWgDgOIARAFQAkAOgNAkIgEALQgDAGgHAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAgAJKTCQgGgDgCgIQgBgDAAgJQABgaAPgNIAIgGQAMgEAIAFQAHAFgBAOQgCAZgaAUQgEAEgFAAIgEgBgAn5SSQASAAACANQADASgQAHQgIgRABgVgAi2SfQgIgFgCgHQgCgHAEgIIAHgLQAEgGAGgCQAIAjACAXIgTgMgAKRSGQgGgMAIgKQAHgKANgBQALAAAHAFIgGAdQgEARgEALQgQgFgKgYgAIiScIgEgIIgSgnIAYABQARABAAARQABAVgOAOQgEgCgCgFgAmoSDQgPgKABgOQAAgNAQgKQAIgEAHAAQgBAMgJArIgHgEgAjxRyQgSgCABgSQACgTAHgRQAEgJAIgBQAIgCAHAGQAVATACAYQAAAJgDAEQgEAEgIABIgRABgAnyRSQgGgGAEgLQAPgjASgWQAGgIAIAGQAMAFAGAMQAFAMgEANQgEANgLAKIgWARQgDACgGAAQgMAAgGgIgAHbQRIgHgNQgEgIgCgGQAHACAHgCIALgHQASgMAPgEQALgDAGAFQAHAFAAALQAAALgBADQgIAWABAbQACAagZALQgMgSgagygAKoQwQgFgpAFgYQACgKAEgDQAEgEAJAAQAJAAANACIAUAFQgKAZgVBDIgGAQQgTgGgFgbgAJGRGQgCgHAAgKIABgfQACgRAGgNQAKgTAQAAQAMAAAEALQADAGACAOQABANACAGIgEASQgDAKgIAGIgKAKQgHAHgFADQgFACgEAAQgHAAgEgJgAk4Q3IgDgPIgIghIgFgiIAhABQAZACAAAYQgBANgMAXQgLAXgMAKQgEgGgCgIgAGSQZIgPgaIgPgaIAZAAQAMAAAEAKIAJAdQAFARgCANQgBAEgDACQgKgJgJgOgAmKQXQgVgUgEgeQgBgMAMgDQAFgBALAAIAXAAIgKAhQgGAUgHANgAjiPuQgEgEgCgGQgEgLAEgHQAFgIALgBIAUAAQAEASACAwQgTgLgRgSgAoVP/QgEgIgBgMIgEgVIgDgWQASACAOAKQALAHACAJQABAJgKAKIgKAKQgGAGgHAAIgBAAgAG6OnQgGgwABgVQAIgBANgDQAPgGAGAAQAPgDAJAEQALAFgFALQgBAEgIAKQgOASABAUQACAjgmANQgGgLgDgbgALmO8QgCgNAHgcIALgvQABgGACgEQAHgSAMgCQAKgDAQAKQADACAMAMIg2BbIgGAKQgEAGgEADQgJAAgCgNgAKFO5IgGgBQgJgBgEgGQgFgFACgIQAFgYALgLQAOgPALARQAKARACAJQAGAagbACgAkTOzQgGgCgCgFQgDgGABgHQAFgWAOgUQAFgIAGAAQAHAAAFAIIAWAdQAKALgFANQgGAMgPACIgNAAIgDAAQgIAAgOgFgAGHOsQgMgJAIgNQALgQAIgEIAGAzQgJgCgMgHgAIkOwQgNgBgMgRQgFgJgBgEQgEgMAGgHQARgXAMgJQAJgJAJAIQAFAEAHAOQAHAOAAAFQABAIgEAIIgIAMQgLASgNAAIgCAAgAoqN/IgEgqIALAKIAMAKQAEACAHAHQAIALgCAKQgBAJgMAIIgLAGQgFAEgCAHQgDgRgCgZgAnVOYQgDgGAAgIIABgZQASAKArAPQgHAMgWANQgHAFgGAAQgMAAgFgQgAFOODIgEgaQgBgGAIgCIAvgKIgBAQQAAAIgBADQgNAdgaAMQgGgJgDgPgAg9OOQAAgHADgEQAPgXAUgOQALgGAGABQAGABAGALQAKARAIAKQAFAFAAAFQgZAFgfAAIgigBgAiTOMQADgDADgGIADgLQAEgMAEgEQAKgKALABQAMACAFAMQAHARAAARIgTAAQgcAAgPgDgAlJODQgHgBgEgHQgEgHgDgKIgEgQIgCgPQgBgIgDgEQADgRAEgIQAJgOARAFQAXAGAMAOQAJAJABAGQAAAGgHALIgfAsQgFAGgGAAIgBAAgABRNmQgTABgFgRQgGgTgEgTQgBgHAFgFQAFgEAIAAQAFAAAIAFQARAKAOAQQAUAVgbANQgMAFgGAAIgCAAgAntM9QAJgRAGgHQAVgdAPAfQAQAiACAaQglgMgggagAKCNWQgXgYgQgmIgCgMQAAgIAFgLQAGgMANABQAoACAbAYQAOANgDARIgCAaQgBAMgDAHQgFAJgKADQgIADgGAAQgPAAgLgMgAhJM3QgSgEgFgOQgEgKAGgHQAPgUANgKQAQgMARAKQAPAIgBAUQgBALgIAIQgKALgGAEQgIAHgKAAQgGAAgFgCgAjtMsQgRgaAAgcQABgQAHgHQAHgGAQAAQAYACAFAJQAFAHgFAWQgDAPgNAbQgEAKgJAAIgBAAQgIAAgFgJgAHuMMIAAgJQAGgiAGgOQAEgLAIgDQAHgDAJAFQAWANAJAMQAIAJAAAIQgBAIgIAJQgFAGgHAEIggAQQgHADgFAAQgNAAgBgTgAQYMWQgTgHABgUQAAgVAKgKQADgDAFABQAFAFACAIIAEAPQAHAYABAOgAp7KJIgCgIQAGgMAUgCQASgBAQACIAZADQARABAJARQALAXAGArIABAPQAIAZgXAZIgIAHQgEAEABAFQg3g0guhfgALpMOQgDgGAAgMQAAgMAJgXQAGgPARghQADgGAFgFQAKgKAMAGQAXALAMARQAMAQgJARQgUAmgrAZIgKADIgGABQgLAAgHgMgABoMOQgVgTgNgTQgIgOALgLQAGgFAFgDQAogXAtAFQAPABAKAMQAEAGAAAGQAAAPgKAIIgZAVQgOANgMAHQgFADgGACIgIABQgIAAgGgGgAEgL5QgHAAgGgHIgcghQgEgHABgGQAAgGAHgEQAWgNAbgJIADAAQAGAAAJAEQAQAKACAQQADARgOANQgQARgGAEQgIAEgGAAIgBAAgAlDLkQgKgLABgQQABgTAVgpQAEgJAKAFIAeAVQANALgHAQQgNAcgNASQgFAHgIAAIgCAAQgMAAgKgKgAPhLWQgKgPgEgLIAPgFQALgCAHAFQAGAFAAALQABAPgJAVIgRgYgAncLCQgNgUgCgZQgDgYAXgIQAMgFAJAHQAJAGACAMIAAAJIgFAoIgDAGQgFAMgJABIgBAAQgGAAgIgLgAKeLCQgRgRgGgZQABgYAPgOQAMgKAPAEQAPADAHAPQAGANgDALQgGAVgJARQgFAMgIABIgCAAQgHAAgIgHgAmiK2QgKgNAIgQQAKgRANgTIADgDQAJgIAHABQAIABAEAKQAKATAEAgQABANgMAEIgcAHIgGABQgNAAgIgMgAFzK0QgGgDgCgKIAAgMQAAgLADgGQAEgGAKgDQAOgEASgBQANgCADAKQAEAKgIAJQgOAPgYANQgFACgEAAIgGgBgAhHK1QgOgBgGgLQgGgMAHgLQALgRAWgJQAJgEAIAIQAOAOAHAeQABAEgDAEQgEADgFAAIgZABIAAABgAImKWQgYgYgCghQAAgYAcgOQALgFAYgEIAQgEQAJgCAFAGQAGAFgBAKIgBAGQgWAzgaAcIgGAGQgFADgEAAQgEAAgEgFgAPWKSQgLgEgDgMQgDgLAIgKQAIgKAJgFQAXAhAHAWQgGACgHAAQgLAAgOgFgAjTKMQgNgJgdgdQgGgGAFgJQAJgRAWABQAgABAPAaQAGAKgBAIIAAAIQgDARgLAFIgHABQgJAAgKgHgABeKKQgGgCgFgDQgYgSgXgFQgHgCgGgFQgJgHgCgGQgBgGAEgMQALgZARgPQAUgPAZgCQAVgBAJAVQAJASABAVIAAARIABAAIAAASQgCAOgKAKQgHAGgJAAIgHgBgAMpJxQgLgLgDgVIAAgJQgBgWAKgRQAEgIAKgBQAPgBATALQAEADABAIQABAKgEAMIgPAnIgCADQgFALgIABIgCAAQgHAAgGgIgADxJ3QgGgBgDgGQgJgSgEgXQgCgKALgEQAQgFAKABIAQACQAKACAEAHQADAIgFAKQgLATgUAQQgEACgEAAIgCAAgAHHJtQgGgEABgHQACgnAcgVQAIgHAJAGQAMAIgBALIgBAFQgLAjgdAOIgGABQgEAAgCgCgALvJdQgHgDgFgFQgPgPgNgVQgLgRAHgSIAFgNQAJgWASAJQAWAMAOAQQALAMgCAKQgBAYgNAaQgEAHgHAAQgEAAgEgCgAliJWQgRgWgOgfQgDgHAEgFQAEgFAIAAQAIABAJADIAQAHQAQAHAJAKQAIAIgBAFQgBAZgTAKQgGACgFAAQgKAAgGgIgAFrJVQgHgCgDgQQgHgpAAgMIAAgIQAAgTADgEQAFgHATgEQAIgCAPAAQAXgDAMAWQAHANAGARQAFAMgIAHQgRASgKAIQgRAMgQAGQgKADgFAAIgDAAgAOlJRQgXgOgRgFQgLgDgCgGQgDgGAFgKQAEgJAOgTIALgOQAhAiAhAsQgEAAgFADIgIAGQgIADgGAAQgHAAgGgEgAhjJRQgegMgkgeQgGgFAAgHQgDggAMgUQAKgRASAAIAQAAQAWgFAXAUQAKAJATATQANAPgJATQgFALgKAMIgRAUQgFAFgJAAQgGAAgHgCgAoJJSIggAAQgKAAgIgFQgIgEgBgHQgBgIAGgGIAVgRQAVgPAHgaQAFgXAUgTQANgLAOACQAPACAIAPQAWAmACApQADAhghAFQgjAGgTAAIgKgBgAqeIbQgFgpAEgYIACgeIADADQAAABABAAQAAAAABAAQAAAAABAAQAAAAABAAIAMgIIAVgOQAggSAJAjQAFARAAALQACAfgQAWQgIALgGAQQgHAUgVAHIgOAEQgDABgCAHQgHgRgFgigAj5IlQgHAAgGgGQgRgQgFgKIgSghQgGgJABgIQAAgGAIgJQALgNAagQQAPgJAKARIAPAYIAQAYQAJANgIAPQgKAWgVAPQgHAFgFAAIgBAAgAJ7IIQgPgLgIgNQgGgKAGgIQAOgQALgFQAOgGAIALQAFAFAEAMQAEALAAAJQADAOgQAIQgFADgGAAQgGAAgHgEgADTIIQgQgDgZgQQgIgFgDgGQgDgFAAgKQAAgNAJgJQAogqAmgJQAQgDANAMQAOANgDAQQgEAQgFAIIgaArQgHAMgIADIgIABQgGAAgIgDgAISH4IgLgMQgTghgKgZQgEgJAFgJQAJgSAWgRQAKgIALAEQAmANAQAMQAIAHAEAEQAJAOgIALQgTAdgFAGQgOASgQALQgIAGgHAAIgBAAQgGAAgEgEgANNH1QgJgOAJgPIAGgKQADgGgBgGIAuAsQgKACgGADIgLAFQgIADgHAAQgIAAgEgGgAAfHbIgkgSQgGgEgEgGQgIgHAGgKQAKgQAHgLQAGgHARgEQAEgBAHABQAigCgCAiIAAAEQABAQgHAUQgEALgHADIgGAAQgFAAgHgDgAmLHYQgHgHgBgMQAAgSACgEQAGgYgJgjIgDgQQgBgdAbgMQASgHANADQAOAEALARQAJANAHAWQAGAVABATQACAYgQASQgWAcgmABIgCAAQgKAAgHgGgAL0HRQgXgdgHgTQgGgNADgIQACgIALgIIAMgFQAEABAFADIAIAFQAnAYAdAZQgIABgHAHIgLANQgKALgGAFQgJAFgIAAQgKAAgIgKgAoYGuQgEgDgEgGQgHgJgGgOIgKgXIgBgNQAAgLAFgIIAUgdQAFgIAHgBQAIgBAHAFQAaATAMASQALARgIASQgGAOgMANIgYAXQgEADgFAAQgFAAgFgEgAhKGpQgOgJgGgGQgLgKgEgLQgFgKAEgJQAIgQAJgJQAFgFADgBQAEAAAGADQAfAQgEAdQACAHgDAIIgEANQgCAKgGACIgDABQgFAAgFgDgAB+GbQgSgpgagmQgJgNAFgRQAGgSATgIIANgFIANgCQAUABAMAFQAOAGAJANIAPAVQAJANAEALQAIAYgRAPIgTASQgMALgJAGIgNAHIgJACQgLAAgEgLgAFMGfQgagJgRgZQgHgMACgKQACgMANgHQASgJAmgRIAOgBQANgCAJALQAHAKAFAOQAGAPgLAOQgSAVgOAOQgIAIgLAAQgHAAgIgDgAqKFoIAGgUQAVhTgBhFIABgGIACABQAQAEAIANQAGAJADATQAEAVABAiQABAhgTAbQgUAdghAIQABgJADgLgAJzF3QgOgDgGgOQgHgPgCgOIgEgYQAWAGAcAMIAwAWQAEABANAIQgGAEgCACQgOAQgVADIgJAAQgNAAgRgEgAjQFuQgSgIgbgUQgNgKgBgLQgBgLAIgKIATgZIASgZQAMgPASAAQASAAAMAPIANAXQAOAYAEANQAGATgHAQQgHAQgRAKQgEADgHABIgMABIgEAAQgMAAgMgGgAgCFFIgHgFQglgfgWgfQgIgLAHgNQAKgRAYgSQAEgEAFAAQAbAAAPAHQAVAKAGAZIAHAgIgEAXQgCANgFAIQgLAQgOAAQgIAAgIgEgAHXExQgIgIgHgMIgLgUQBDANAgAKIgMAGIgLAHIgRAKQgHADgHAAQgLAAgIgJgAnIEpQgLgHgMgKQgSgQgMgIIgGgDQgOgNgDgHQgDgLAMgRIARgaQAIgMAQAEIABABQAcAPAyAIQAQACAHARIADAIQgBAOgJAPQgPAUgXAXQgHAIgHAAIgDAAQgGAAgIgFgAEQEiQgkgSgPgPQgNgOgBgKQAAgLANgQQAEAAAFACIAJADQAXAIAhAJIA5APQgHABgKAMIgZAcQgJAKgMAAQgHAAgJgEgAkjDwQgGgEgSgSQgGgFABgKIAFgcQABgFAIgDQAygPAeAAIAJABQAFACACAEQACAEgCAEQgDALgGAIIgiAwQgJANgJABIgCAAQgIAAgKgIgABQDFIgGgFQgTgWgigVQgGgDgCgDQgIgGgBgGQgBgGADgJIAFgIQADgFgBgEQBBAsBEAiIgVATQgLAKgMAAQgLAAgLgJgAhuDKQglgMgQgKQgNgIABgVIANgvQAEgOAPgZQAHgNAJgBQAHgBAPAHIAIAGQASAOARAHQANAEADAGQADAGgEANQgKAZgZAvQgCAEgLAJQgFAFgFAAIgFgBgApICXIgGgFQgKgPgYgGIgFgvQgEgdgEgTIgHghQAEABAEgBIAIgDQAKgCAGACQAGADAGAIQAOAXAGAOQANAhAPARQANAPgDAVQgCALgGAIQgJAKgKAAQgHAAgIgGgAnPBmIgkgnQgIgJgEgPQgCgJAEgGQAEgGAKgBIAmAAQAWgCAkAHQARADABAPQACAegMAhQgHASgUAAQgcAAgRgTgAlBBXQgNgGACgPIAFgOQALgcAIgyQADgVANgKQALgLAWgBQALAAAGAGQAPAPAFAKQALAVgKASIgmBIQgGALgIAEQgJAEgPAAIgEAAQgJAAgLgFgAiZASQgJgBgFgEQgEgFgBgIQgBgRAEgMQAGgSAAgFIAfAdIAcAeQgXALgVAAIgFAAgAmsgkIgPgGQgqgQAQgrQAEgKAIABQAKAAAQgEQAfgJABAgIAAAHIgEAhQgEAPgOAAIgHAAgAo4g7IgOAAQgbgBgJgDQgUgHgIgQIgMgYQgKgVAGgOIAIgWQAGgLAJgHIAggaQAGgFAFgBQAFAAAGAFQATAQgBATQAAAagDALQgDALAEAHQAEAHAMAFIAHADQAKAEADAHQACAGgEAKQgLAVgTAAIgDAAgAkyhZQgLgCgGgNQgFgMABgGQAAgOgEgRIgHgfQgCgGAAgLQgBgQAPgJIAJgEQAFgEACgEIAiAvQAUAdAOARIABAEQgBAGgFAFIgJAIQgWATgHAHQgIAIgJAAIgEgBgAnOi5IgEgGQgagqgKgqQgEgTAJgNQAJgOATgCIAdAAQASABAGARQAHATgDATIgIAiQgFAUgCAOQAAAEgEAIQgGAKgJAAIgCAAQgIAAgGgIgArIjsIgJgcIgPguQgJgagEgUIAXgDQAZgGAQAUQAWAbAJAlQACAKgFAIQgUAjgXAUQgGgLgGgRgApNkiQgGgBgIgIQgJgJgJgQQgRghgEgJQgFgLAKgGIBFgfIAegJIAmAKQAQAFgHASQgFAOgSAWQgfAjgeAWQgIAHgGAAIAAAAgAm2mVQgJgEgIgQIghhFQgGgPABgGQABgGAMgKIAGgHQADgEAAgFIA2B7IAFAKQADAGAAAEIgPACQgJAAgFgDgAtBpSQgDgHACgDIAHABQAbAKAegEQAXgDAJAWQAHAUAGAWIANA1QACAJgBAOQAAASgQACQgRACgOgDIgLgCQgGAAgDAFgAqInfQgGgCgEgMIgQg8QgLg1gIgUQgEgLgBgHQgCgPAPgHQAJgDAaAAIAMAAQAZgBAKAZIAFANQAIAdAeAXQAPAKAIAQQAHAQgIAOQgaAngqALQgFABgGAAQgNAAgSgGgAn5plQgbgPgJgLQgVgZgJgQQgIgOgBgRQgDgcAYgdQAIALAGARIALAeIAdBMIAEAKQACAGAAAFIgFAAIgBAAgAtgqmQgHgMgHgUIgNghQgFgJgFgQQAbAIAlgNIAKgEQALgCAGAKQAGAKAEATQAHAcAAALQAAAOgOAGQgJADgHAAgArFrhIgPgkQgJgXgDgQIgCgLQAAgHAFgDQAIgFANAKQAeAVAIAHQAJAKAAAIQAAANgLAPQgKAQgNAFIgEABQgFAAgBgFgApnsnQgIgIgIgPQgTgigRgPQgIgIgFgMQgFgMAFgJQAFgKANgDQAJgCARgCQAHAAACgJQAWAxAZBDQgDADgBAGQgBAIgCACQgGAKgHABIgCAAQgGAAgHgHgAuptXQAOACAMgEQAIgDAEACQAEACAEAIQADAHAAAHQAAAPgOAFIgQAEgAsdtVQgTgTgIgNQgMgTABgVQAAgJAEgMIAHgUQAFgPAQACIAIABQARAAAFgDQANgFALAOQAXAdgSAjIgTAiQgFAKgMAKQgEAEgEAAQgGAAgDgDgAumuWQgIgIgDgFQgTgjgFgXIgCgOQABgNAOAAQAGAAAIAEIAkARQAPAHgDATQgFAWgOAZQgFAJgGAAQgEAAgGgFgArdvwQgGgHgDgIQgOgmAIgeQACgHACgDQADgHAEgCQAEgCAIABIAWAFQARAYAVAwIAAAGQgQAagiADIgCAAQgKAAgGgJgAtvwBIgJgZQgFgPABgNIABgKQAEgLANADIALAFQATAKAXAFQALACAEAGQAEAGAAALQAAALgCAFQgGAPgQABIgTAAQgLAAgIADIgEAAQgHAAgEgJgAvWwqQgHgBgEgIQgCgGAAgKIgBgRQABgLgCgOIgEgaIgFgWQgCgJAIgJQAFgGAGAEQAcAaALATQAKATgHAbQgFAUgSATQgFAFgFAAIgCAAgAtgyMIgwgUQgKgEAAgLIAAg+QAAgJAEgDQAEgCAJACQAcAHAHAIQAHAHAGAcIAKAtQAAAQgKAAIgHgCgAsOyaIgUgDQgMgBgEgFQgFgEAAgLQAAgZADgMIACgQIAAgRQAPANAPASQAIAKASAZIAZAnQgfgGgOgFgAvJzGQgJgCgHgKQgGgJACgJQADgPADgEQAEgGAHgCQAGgCAGADQAOAHAAAUQgBAOgOAMQgEADgCAAIgCAAgAwMzOQgEgBgCgGIgIgbIgNgxQgDgIABgLQACgIAGgDQAHgDAHAEIAXAQQAQAMgDAPQAAAQgGASIgOAfQgCAEgFAAIgCAAgAt10wIgUgBQgHABgNgFQgZgJAFgaQAFgTgCgPQAaAWAvAxIACAFIgSgCgAva1XQgSgHghgEQgFAAgJgEQgIgDgDgFQgDgEAAgKQgBgJAFgJIAKgPQAGgIAPAHQATAJAKAKQAQAQAKAaQADAFgEAEQgCACgDAAIgFgBg");
	this.shape_2.setTransform(354.7417,217.1919);

	this.instance = new lib.Símbolo2();
	this.instance.setTransform(252.9,222.95,1.0059,1.0058,0,0,0,251.6,227.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_2}]}).wait(1));

	// flash0.ai
	this.area12 = new lib.area12();
	this.area12.name = "area12";
	this.area12.setTransform(255.5,189.9,1,1,0,0,0,244.3,187.6);

	this.area11 = new lib.area11();
	this.area11.name = "area11";
	this.area11.setTransform(255.3,410.9,1,1,0,0,0,244.6,37.6);

	this.area10 = new lib.area10();
	this.area10.name = "area10";
	this.area10.setTransform(73.5,254.7,1,1,0,0,0,45.7,165.2);

	this.area9 = new lib.area9();
	this.area9.name = "area9";
	this.area9.setTransform(464.2,434.15,1,1,0,0,0,35.6,14.5);

	this.area8 = new lib.area8();
	this.area8.name = "area8";
	this.area8.setTransform(449.7,86.1,1,1,0,0,0,50.2,23.6);

	this.area7 = new lib.area7();
	this.area7.name = "area7";
	this.area7.setTransform(414.8,93.1,1,1,0,0,0,49.2,50.9);

	this.area6 = new lib.area6();
	this.area6.name = "area6";
	this.area6.setTransform(322.9,228.85,1,1,0,0,0,141.2,186.6);

	this.area5 = new lib.area5();
	this.area5.name = "area5";
	this.area5.setTransform(279.35,32.85,1,1,0,0,0,6.8,7);

	this.area4 = new lib.area4();
	this.area4.name = "area4";
	this.area4.setTransform(168.2,70.1,1,1,0,0,0,7,7);

	this.area3 = new lib.area3();
	this.area3.name = "area3";
	this.area3.setTransform(133.25,7.5,1,1,0,0,0,8.1,5.2);

	this.area2 = new lib.area2();
	this.area2.name = "area2";
	this.area2.setTransform(42.9,62.55,1,1,0,0,0,7.7,7.8);

	this.area1 = new lib.area1();
	this.area1.name = "area1";
	this.area1.setTransform(165.65,62.9,1,1,0,0,0,155,60.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.area1},{t:this.area2},{t:this.area3},{t:this.area4},{t:this.area5},{t:this.area6},{t:this.area7},{t:this.area8},{t:this.area9},{t:this.area10},{t:this.area11},{t:this.area12}]}).wait(1));

	// lapiz
	this.lapiz = new lib.lapiz();
	this.lapiz.name = "lapiz";
	this.lapiz.setTransform(69.3,513.25,1,1,0,0,0,53.8,14.8);

	this.timeline.addTween(cjs.Tween.get(this.lapiz).wait(1));

	// PALETA
	this.menu_btn = new lib.menuBtn();
	this.menu_btn.name = "menu_btn";
	this.menu_btn.setTransform(69.8,552.2,1.9986,1.9986,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.menu_btn, 0, 1, 2, false, new lib.menuBtn(), 3);

	this.limpiar_btn = new lib.limpiarBtn();
	this.limpiar_btn.name = "limpiar_btn";
	this.limpiar_btn.setTransform(69.8,475.35,1.9986,1.9986,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.limpiar_btn, 0, 1, 2, false, new lib.limpiarBtn(), 3);

	this.pielBtn = new lib.paletamarronclarobtn();
	this.pielBtn.name = "pielBtn";
	this.pielBtn.setTransform(476.05,471.65,0.8751,1.2559,-90,0,0,-0.1,0.7);
	new cjs.ButtonHelper(this.pielBtn, 0, 1, 2, false, new lib.paletamarronclarobtn(), 3);

	this.marronclaroBtn = new lib.paletamarron2btn();
	this.marronclaroBtn.name = "marronclaroBtn";
	this.marronclaroBtn.setTransform(475.2,514.45,0.8723,1.2549,-90,0,0,-0.1,0.1);
	new cjs.ButtonHelper(this.marronclaroBtn, 0, 1, 2, false, new lib.paletamarron2btn(), 3);

	this.celesteClaroBtn = new lib.paletacelesteclarobtn();
	this.celesteClaroBtn.name = "celesteClaroBtn";
	this.celesteClaroBtn.setTransform(354.75,471.65,0.8751,1.2559,-90,0,0,-0.1,0.6);
	new cjs.ButtonHelper(this.celesteClaroBtn, 0, 1, 2, false, new lib.paletacelesteclarobtn(), 3);

	this.verdeClaroBtn = new lib.paletaverdeclarobtn();
	this.verdeClaroBtn.name = "verdeClaroBtn";
	this.verdeClaroBtn.setTransform(294.15,471.65,0.8751,1.2559,-90,0,0,-0.1,0.6);
	new cjs.ButtonHelper(this.verdeClaroBtn, 0, 1, 2, false, new lib.paletaverdeclarobtn(), 3);

	this.verdeOscuroBtn = new lib.paletaverdeoscurobtn();
	this.verdeOscuroBtn.name = "verdeOscuroBtn";
	this.verdeOscuroBtn.setTransform(293.55,557.3,0.8725,1.2622,-90);
	new cjs.ButtonHelper(this.verdeOscuroBtn, 0, 1, 2, false, new lib.paletaverdeoscurobtn(), 3);

	this.bordoBtn = new lib.paletabordobtn();
	this.bordoBtn.name = "bordoBtn";
	this.bordoBtn.setTransform(233,557.3,0.8725,1.2622,-90);
	new cjs.ButtonHelper(this.bordoBtn, 0, 1, 2, false, new lib.paletabordobtn(), 3);

	this.marronBtn = new lib.paletamarronbtn();
	this.marronBtn.name = "marronBtn";
	this.marronBtn.setTransform(475,557.3,1.1668,1.6842,-90);
	new cjs.ButtonHelper(this.marronBtn, 0, 1, 2, false, new lib.paletamarronbtn(), 3);

	this.naranjaBtn = new lib.paletanaranjabtn();
	this.naranjaBtn.name = "naranjaBtn";
	this.naranjaBtn.setTransform(233.75,471.55,1.1703,1.6758,-90,0,0,0,0.5);
	new cjs.ButtonHelper(this.naranjaBtn, 0, 1, 2, false, new lib.paletanaranjabtn(), 3);

	this.amarilloBtn = new lib.paletaamarillobtn();
	this.amarilloBtn.name = "amarilloBtn";
	this.amarilloBtn.setTransform(171.6,471.5,1.1668,1.6842,-90);
	new cjs.ButtonHelper(this.amarilloBtn, 0, 1, 2, false, new lib.paletaamarillobtn(), 3);

	this.verdeBtn = new lib.paletaverdebtn();
	this.verdeBtn.name = "verdeBtn";
	this.verdeBtn.setTransform(293.45,514.35,1.1664,1.6745,-90);
	new cjs.ButtonHelper(this.verdeBtn, 0, 1, 2, false, new lib.paletaverdebtn(), 3);

	this.celesteBtn = new lib.paletacelestebtn();
	this.celesteBtn.name = "celesteBtn";
	this.celesteBtn.setTransform(354,514.35,1.1664,1.6745,-90);
	new cjs.ButtonHelper(this.celesteBtn, 0, 1, 2, false, new lib.paletacelestebtn(), 3);

	this.azulBtn = new lib.paletaazulbtn();
	this.azulBtn.name = "azulBtn";
	this.azulBtn.setTransform(353.85,557.3,1.1668,1.6842,-90);
	new cjs.ButtonHelper(this.azulBtn, 0, 1, 2, false, new lib.paletaazulbtn(), 3);

	this.negroBtn = new lib.paletagrisbtn();
	this.negroBtn.name = "negroBtn";
	this.negroBtn.setTransform(172.55,557.35,1.1639,1.6745,-90);
	new cjs.ButtonHelper(this.negroBtn, 0, 1, 2, false, new lib.paletagrisbtn(), 3);

	this.blancoBtn = new lib.paletablancobtn();
	this.blancoBtn.name = "blancoBtn";
	this.blancoBtn.setTransform(173.1,514.35,1.1677,1.6758,-90,0,0,0,0.5);
	new cjs.ButtonHelper(this.blancoBtn, 0, 1, 2, false, new lib.paletablancobtn(), 3);

	this.rosaBtn = new lib.paletarosabtn();
	this.rosaBtn.name = "rosaBtn";
	this.rosaBtn.setTransform(414.8,471.6,1.1677,1.6758,-90,0,0,-0.1,0.1);
	new cjs.ButtonHelper(this.rosaBtn, 0, 1, 2, false, new lib.paletarosabtn(), 3);

	this.lilaBtn = new lib.paletavioletabtn();
	this.lilaBtn.name = "lilaBtn";
	this.lilaBtn.setTransform(414.55,514.3,1.1639,1.6745,-90);
	new cjs.ButtonHelper(this.lilaBtn, 0, 1, 2, false, new lib.paletavioletabtn(), 3);

	this.fucsiaBtn = new lib.paletafucciabtn();
	this.fucsiaBtn.name = "fucsiaBtn";
	this.fucsiaBtn.setTransform(414.8,557.35,1.1642,1.6842,-90);
	new cjs.ButtonHelper(this.fucsiaBtn, 0, 1, 2, false, new lib.paletafucciabtn(), 3);

	this.rojoBtn = new lib.paletarojobtn();
	this.rojoBtn.name = "rojoBtn";
	this.rojoBtn.setTransform(233.05,514.2,1.1639,1.6745,-90,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.rojoBtn, 0, 1, 2, false, new lib.paletarojobtn(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.rojoBtn},{t:this.fucsiaBtn},{t:this.lilaBtn},{t:this.rosaBtn},{t:this.blancoBtn},{t:this.negroBtn},{t:this.azulBtn},{t:this.celesteBtn},{t:this.verdeBtn},{t:this.amarilloBtn},{t:this.naranjaBtn},{t:this.marronBtn},{t:this.bordoBtn},{t:this.verdeOscuroBtn},{t:this.verdeClaroBtn},{t:this.celesteClaroBtn},{t:this.marronclaroBtn},{t:this.pielBtn},{t:this.limpiar_btn},{t:this.menu_btn}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(241.7,236.1,300.2,356.19999999999993);
// library properties:
lib.properties = {
	id: '219E70574865BD49AC576B13128E6EA6',
	width: 510,
	height: 580,
	fps: 32,
	color: "#999999",
	opacity: 1.00,
	manifest: [
		{src:"sounds/sonidoClic.mp3", id:"sonidoClic"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['219E70574865BD49AC576B13128E6EA6'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;