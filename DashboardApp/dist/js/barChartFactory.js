class BarChartFactory{
	constructor(){

	}

	getBarChart(type,id,column,dataframe){
		if(type ==="min"){
			return new MinBarChart(id,column,dataFrame);
		}
		else if(type ==="max"){
			return new MaxBarChart(id,column,dataFrame);

		}else if(type ==="avg"){
			return new AvgBarChart(id,column,dataFrame);

		}

	}
}