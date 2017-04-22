
class LineChart{

	constructor(id,labels,dataframe){
		this._id = id;
		this._labels = labels;
		this._dataframe = dataframe;
	}

	showGraph(){
		let dataset = createDataset();
		console.log(dataset);
		let lineCanvas = document.getElementById(this._id);
		this._chart = new Chart(lineCanvas,{
											type: 'line',
	data: {
    labels: this._labels,
    datasets: [
        {
            label: "pqr",
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            data:  [3,2,5,3,19,12],
        },
        {
            label: "abc",
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            data: [3,2,5,3,19,12],
        }
    	]
	}
										});
	}

	createDataset(){
		let dataset = [];
		var columns = this._dataframe.listColumns();
		for(let i=1; i<columns.length;i++){
			let column = columns[i];
			let dataSetItem = {};
			dataSetItem["label"] = column;
			dataSetItem["data"] = this._dataframe.select(column);

			dataset[i-1] = dataSetItem;
		}
		return dataset;
	}

}

//let charty = new LineChart("lineCanvas","",["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],[12, 19, 3, 5, 2, 3]);


//charty.showGraph();

