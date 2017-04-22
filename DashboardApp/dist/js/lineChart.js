
class LineChart{

	constructor(id,dataframe){
		this._id = id;
		this._dataframe = dataframe;
	}

	showGraph(){
		let dataset = this.createDataset();
		console.log(dataset);
		let lineCanvas = document.getElementById(this._id);
		this._chart = new Chart(lineCanvas,{
			type: 'line',
			data: {
	    		labels: this._dataframe.toArray("date"),
	    		datasets: dataset 
				}
			});
	}

	createDataset(){
		let dataset = [];
		var columns = this._dataframe.listColumns();
		for(let i=2; i<columns.length;i++){
			let column = columns[i];
			let dataSetItem = {};
			dataSetItem["label"] = column;
			dataSetItem["data"] = this._dataframe.toArray(column);
			//hardcoded parameters
			dataSetItem["fill"] = false;
            dataSetItem["backgroundColor"] = "rgba(75,192,192,0.4)";
            dataSetItem["borderColor"] =  Util.getRandomColor();
            dataSetItem["borderCapStyle"] = 'butt';
            dataSetItem["pointRadius"] = 0;
            //dataSetItem["pointBorderColor"] = "rgba(75,192,192,1)";
            //dataSetItem["pointBackgroundColor"] =  "#fff";

			dataset[i-2] = dataSetItem;
		}
		return dataset;
	}

}

//let charty = new LineChart("lineCanvas","",["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],[12, 19, 3, 5, 2, 3]);


//charty.showGraph();

