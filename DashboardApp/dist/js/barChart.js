
class BarChart{

	constructor(id,column,type,dataframe){
		this._id = id;
		this._column = column;
		this._type = type;
		this._dataframe = dataframe;
	}

	showGraph(){
		let dataset = this.createDataset();
		let barCanvas = document.getElementById(this._id);
		this._dataframe.show();
		this._chart = new Chart(barCanvas,{
											type: 'bar',
	data: {
    	labels: this._dataframe.unique("city").toArray("city"),
    	datasets: dataset 
			}
		});
	}

	createDataset(){
		let datasetItem = {};
		
		let columnDataSet = this._dataframe.select(this._column,"city");
		let cities = this._dataframe.unique("city").toArray("city");

		datasetItem["borderWidth"] = 1;
		datasetItem["label"] = this._type + " " + this._column;

		datasetItem["borderColor"] = [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ];
        datasetItem["backgroundColor"] = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ];

		let data =[];
		for(let i= 0; i<cities.length; i++){
			let cityDF = columnDataSet.filter(row => row.get("city") === cities[i]);
			if(this._type==="min"){
				data[i] = cityDF.stat.min(this._column);
			}
			else if(this._type == "max"){
				data[i] = cityDF.stat.max(this._column);
			}else if(this._type == "avg"){
				data[i] = cityDF.stat.mean(this._column);
			}

		}
		datasetItem["data"] = data;
		return [datasetItem];
	}

}

//let charty = new LineChart("lineCanvas","",["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],[12, 19, 3, 5, 2, 3]);


//charty.showGraph();

