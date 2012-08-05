if (window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype.lineTo){
			CanvasRenderingContext2D.prototype.dashedLine = function(x,y,x2,y2,dashArray){
				if (!dashArray) dashArray=[10,5];
				var dashCount = dashArray.length;
				this.moveTo(x, y);
				var dx = (x2-x), dy = (y2-y);
				var slope = dy/dx;
				var distRemaining = Math.sqrt( dx*dx + dy*dy );
				var dashIndex=0, draw=true;
				while (distRemaining>=0.1 && dashIndex<10000){
					var dashLength = dashArray[dashIndex++%dashCount];
					if (dashLength > distRemaining) dashLength = distRemaining;
					var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
					x += xStep
					y += slope*xStep;
					this[draw ? 'lineTo' : 'moveTo'](x,y);
					distRemaining -= dashLength;
					draw = !draw;
				}
				// Ensure that the last segment is closed for proper stroking
				this.moveTo(0,0);
			}
		}
		
		
